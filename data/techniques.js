// Catalogue de techniques Kubernetes / CKA, à parcourir une par une.
// { id, domain, title, summary, points:[...], cmds:[...], ref }
(function () {
  window.CKA = window.CKA || {};
  const L = window.CKA.techniques = window.CKA.techniques || [];
  const T = (o) => L.push(o);
  const K = "https://kubernetes.io/docs/";

  /* ===================== ARCHITECTURE ===================== */
  T({ id: "tk-kubeadm-init", domain: "architecture", title: "Initialiser un cluster avec kubeadm",
    summary: "Amorcer le control plane, installer un CNI, puis joindre les workers.",
    points: [
      "`kubeadm init` initialise le control plane et imprime la commande de jointure.",
      "Configurer kubectl : copier /etc/kubernetes/admin.conf vers ~/.kube/config.",
      "Installer un plugin réseau (CNI) sinon les nœuds restent NotReady.",
      "Joindre chaque worker avec la commande `kubeadm join` fournie.",
    ],
    cmds: ["kubeadm init --pod-network-cidr=10.244.0.0/16", "mkdir -p ~/.kube && sudo cp /etc/kubernetes/admin.conf ~/.kube/config", "kubectl apply -f <cni.yaml>", "kubeadm token create --print-join-command"],
    ref: K + "setup/production-environment/tools/kubeadm/create-cluster-kubeadm/" });

  T({ id: "tk-etcd-backup", domain: "architecture", title: "Sauvegarder et restaurer etcd",
    summary: "etcd contient tout l'état du cluster : savoir le sauvegarder/restaurer est incontournable au CKA.",
    points: [
      "Snapshot avec etcdctl (API v3) + certificats de /etc/kubernetes/pki/etcd.",
      "Restaurer dans un nouveau data-dir, puis pointer le static pod etcd dessus.",
      "Vérifier l'état du snapshot avant restauration.",
    ],
    cmds: [
      "ETCDCTL_API=3 etcdctl snapshot save /opt/snap.db \\\n  --endpoints=https://127.0.0.1:2379 \\\n  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\n  --cert=/etc/kubernetes/pki/etcd/server.crt \\\n  --key=/etc/kubernetes/pki/etcd/server.key",
      "ETCDCTL_API=3 etcdctl snapshot status /opt/snap.db -w table",
      "ETCDCTL_API=3 etcdctl snapshot restore /opt/snap.db --data-dir=/var/lib/etcd-restore",
    ],
    ref: K + "tasks/administer-cluster/configure-upgrade-etcd/" });

  T({ id: "tk-upgrade", domain: "architecture", title: "Mettre à niveau un cluster (kubeadm upgrade)",
    summary: "Upgrade d'abord le control plane, puis les workers un par un (drain → upgrade → uncordon).",
    points: [
      "Control plane : `kubeadm upgrade plan` puis `kubeadm upgrade apply vX.Y.Z`.",
      "Sur chaque nœud : mettre à jour le paquet kubeadm, `kubeadm upgrade node`, puis kubelet/kubectl.",
      "Toujours drainer un worker avant, le uncordon après.",
    ],
    cmds: ["kubeadm upgrade plan", "kubeadm upgrade apply v1.31.1", "kubectl drain <node> --ignore-daemonsets", "kubeadm upgrade node", "systemctl restart kubelet", "kubectl uncordon <node>"],
    ref: K + "tasks/administer-cluster/kubeadm/kubeadm-upgrade/" });

  T({ id: "tk-rbac", domain: "architecture", title: "RBAC : Roles, Bindings et auth can-i",
    summary: "Autoriser des sujets (users, groups, ServiceAccounts) à agir sur des ressources, par namespace ou cluster.",
    points: [
      "Role/RoleBinding = namespacé ; ClusterRole/ClusterRoleBinding = cluster.",
      "Un RoleBinding peut référencer un ClusterRole pour le limiter à un namespace.",
      "Tester avec `kubectl auth can-i`, usurper avec `--as`.",
    ],
    cmds: ["kubectl create role dev --verb=get,list,watch --resource=pods", "kubectl create rolebinding dev-bind --role=dev --user=alice", "kubectl auth can-i list pods --as=alice"],
    ref: K + "reference/access-authn-authz/rbac/" });

  T({ id: "tk-sa", domain: "architecture", title: "ServiceAccounts et tokens",
    summary: "Donner une identité aux Pods pour appeler l'API, et lui associer des droits RBAC.",
    points: [
      "Un SA par défaut existe dans chaque namespace ; on peut en créer un dédié.",
      "Référencer le SA via `spec.serviceAccountName` dans le Pod.",
      "Générer un token à la demande avec `kubectl create token`.",
    ],
    cmds: ["kubectl create serviceaccount app-sa", "kubectl create token app-sa", "kubectl set serviceaccount deployment/web app-sa"],
    ref: K + "concepts/security/service-accounts/" });

  T({ id: "tk-static-pod", domain: "architecture", title: "Static Pods",
    summary: "Pods gérés directement par le kubelet via des manifests sur le nœud, sans passer par l'API.",
    points: [
      "Le kubelet surveille /etc/kubernetes/manifests (composants du control plane y vivent).",
      "Déposer/retirer un YAML crée/supprime le Static Pod.",
      "Un 'mirror pod' apparaît dans l'API en lecture seule.",
    ],
    cmds: ["kubectl run nginx --image=nginx --dry-run=client -o yaml > /etc/kubernetes/manifests/nginx.yaml", "systemctl status kubelet"],
    ref: K + "tasks/configure-pod-container/static-pod/" });

  T({ id: "tk-certs", domain: "architecture", title: "Certificats et kubeconfig",
    summary: "Renouveler les certificats du cluster et gérer les contextes kubectl.",
    points: [
      "Les PKI kubeadm sont dans /etc/kubernetes/pki ; `kubeadm certs renew all`.",
      "kubeconfig = clusters + users + contexts ; `kubectl config use-context`.",
      "KUBECONFIG peut agréger plusieurs fichiers.",
    ],
    cmds: ["kubeadm certs check-expiration", "kubeadm certs renew all", "kubectl config get-contexts", "kubectl config use-context <ctx>"],
    ref: K + "tasks/administer-cluster/kubeadm/kubeadm-certs/" });

  T({ id: "tk-node-maint", domain: "architecture", title: "Maintenance de nœud (cordon/drain)",
    summary: "Sortir un nœud du scheduling et évacuer ses Pods pour une opération de maintenance.",
    points: [
      "`cordon` marque non planifiable ; `drain` cordon + évacue les Pods.",
      "`--ignore-daemonsets` et parfois `--force` / `--delete-emptydir-data` nécessaires.",
      "`uncordon` réautorise le scheduling après maintenance.",
    ],
    cmds: ["kubectl cordon node01", "kubectl drain node01 --ignore-daemonsets --delete-emptydir-data", "kubectl uncordon node01"],
    ref: K + "tasks/administer-cluster/safely-drain-node/" });

  /* ===================== WORKLOADS ===================== */
  T({ id: "tk-deploy", domain: "workloads", title: "Deployments : rollout, update, rollback",
    summary: "Gérer des applications sans état avec mises à jour progressives et retours arrière.",
    points: [
      "RollingUpdate par défaut (maxSurge / maxUnavailable).",
      "Suivre/piloter avec `kubectl rollout status|history|undo`.",
      "Changer l'image sans éditer le YAML via `set image`.",
    ],
    cmds: ["kubectl create deployment web --image=nginx --replicas=3", "kubectl set image deployment/web nginx=nginx:1.26", "kubectl rollout status deployment/web", "kubectl rollout undo deployment/web"],
    ref: K + "concepts/workloads/controllers/deployment/" });

  T({ id: "tk-scale-hpa", domain: "workloads", title: "Scaling manuel et autoscaling (HPA)",
    summary: "Ajuster le nombre de répliques manuellement ou automatiquement selon la charge.",
    points: [
      "Scaling manuel immédiat avec `kubectl scale`.",
      "HPA ajuste les répliques selon CPU/mémoire (metrics-server requis).",
    ],
    cmds: ["kubectl scale deployment web --replicas=5", "kubectl autoscale deployment web --min=2 --max=10 --cpu-percent=80", "kubectl get hpa"],
    ref: K + "tasks/run-application/horizontal-pod-autoscale/" });

  T({ id: "tk-daemonset", domain: "workloads", title: "DaemonSet",
    summary: "Exécuter un Pod sur chaque nœud (agents de logs, monitoring, réseau).",
    points: [
      "Une copie par nœud (ou sous-ensemble via nodeSelector/affinités).",
      "Tolère souvent les taints control-plane pour couvrir tous les nœuds.",
    ],
    cmds: ["kubectl get daemonset -A", "kubectl describe ds <nom> -n kube-system"],
    ref: K + "concepts/workloads/controllers/daemonset/" });

  T({ id: "tk-job", domain: "workloads", title: "Jobs et CronJobs",
    summary: "Tâches ponctuelles (Job) ou planifiées (CronJob) qui s'exécutent jusqu'à complétion.",
    points: [
      "Job : completions/parallelism ; backoffLimit pour les échecs.",
      "CronJob : schedule cron + Jobs générés dans le temps.",
    ],
    cmds: ["kubectl create job pi --image=perl -- perl -Mbignum -e 'print bpi(200)'", "kubectl create cronjob report --image=busybox --schedule='*/5 * * * *' -- date"],
    ref: K + "concepts/workloads/controllers/job/" });

  T({ id: "tk-config-secret", domain: "workloads", title: "ConfigMaps et Secrets",
    summary: "Externaliser la configuration et les données sensibles, injectées en env ou en volume.",
    points: [
      "Créer depuis des littéraux, fichiers ou dossiers.",
      "Injecter en variables (`envFrom`/`valueFrom`) ou monter en volume.",
      "Secrets encodés base64 (pas chiffrés par défaut — activer l'encryption at rest).",
    ],
    cmds: ["kubectl create configmap app-cfg --from-literal=LOG=debug", "kubectl create secret generic db --from-literal=password=S3cr3t", "kubectl set env deployment/web --from=configmap/app-cfg"],
    ref: K + "tasks/configure-pod-container/configure-pod-configmap/" });

  T({ id: "tk-resources", domain: "workloads", title: "Requests, limits et QoS",
    summary: "Réserver et plafonner CPU/mémoire ; influence le scheduling et l'éviction.",
    points: [
      "requests = garanti (scheduling) ; limits = plafond (throttling/OOMKill).",
      "Classes QoS : Guaranteed, Burstable, BestEffort.",
      "LimitRange/ResourceQuota encadrent un namespace.",
    ],
    cmds: ["kubectl set resources deployment web --requests=cpu=200m,memory=256Mi --limits=cpu=500m,memory=512Mi", "kubectl describe pod <pod> | grep -A3 Requests"],
    ref: K + "concepts/configuration/manage-resources-containers/" });

  T({ id: "tk-scheduling", domain: "workloads", title: "Scheduling : nodeSelector, affinité, taints",
    summary: "Contrôler où les Pods atterrissent grâce aux labels, affinités et taints/tolerations.",
    points: [
      "nodeSelector = match exact de labels ; nodeAffinity = règles required/preferred.",
      "podAffinity/antiAffinity = co-localiser/séparer des Pods.",
      "Taint (nœud) + toleration (Pod) : repousser/autoriser.",
    ],
    cmds: ["kubectl label node node01 disk=ssd", "kubectl taint node node01 gpu=true:NoSchedule", "kubectl get pods -o wide"],
    ref: K + "concepts/scheduling-eviction/assign-pod-node/" });

  T({ id: "tk-dryrun", domain: "workloads", title: "Générer des manifests rapidement (--dry-run)",
    summary: "Produire un YAML de base sans créer l'objet — réflexe pour aller vite au CKA.",
    points: [
      "`--dry-run=client -o yaml` génère le manifeste à éditer.",
      "`kubectl explain <ressource>` documente les champs.",
      "`kubectl create`/`run` supportent la plupart des raccourcis.",
    ],
    cmds: ["kubectl create deployment web --image=nginx --dry-run=client -o yaml > web.yaml", "kubectl run pod --image=nginx --dry-run=client -o yaml", "kubectl explain deployment.spec.strategy"],
    ref: K + "reference/kubectl/conventions/" });

  /* ===================== NETWORKING ===================== */
  T({ id: "tk-services", domain: "networking", title: "Services : ClusterIP, NodePort, LoadBalancer",
    summary: "Exposer un ensemble de Pods derrière une IP/nom stable, en interne ou en externe.",
    points: [
      "ClusterIP (interne), NodePort (port sur chaque nœud), LoadBalancer (cloud).",
      "Le selector du Service remplit les Endpoints ciblés.",
      "`kubectl expose` crée un Service depuis un Deployment/Pod.",
    ],
    cmds: ["kubectl expose deployment web --port=80 --target-port=8080", "kubectl expose deployment web --type=NodePort --port=80", "kubectl get svc,endpoints web"],
    ref: K + "concepts/services-networking/service/" });

  T({ id: "tk-svc-debug", domain: "networking", title: "Diagnostiquer un Service sans trafic",
    summary: "Vérifier selector, Endpoints et DNS quand un Service ne route rien.",
    points: [
      "Endpoints vides = selector qui ne matche aucun Pod prêt.",
      "Tester le DNS interne : <svc>.<ns>.svc.cluster.local.",
      "Vérifier readinessProbe : un Pod non Ready n'est pas ajouté aux Endpoints.",
    ],
    cmds: ["kubectl get endpoints <svc>", "kubectl get pods --show-labels", "kubectl run tmp --image=busybox -it --rm -- nslookup <svc>.<ns>"],
    ref: K + "concepts/services-networking/service/#defining-a-service" });

  T({ id: "tk-ingress", domain: "networking", title: "Ingress (routage L7)",
    summary: "Router HTTP/HTTPS par host et path vers des Services, via un Ingress Controller.",
    points: [
      "Nécessite un Ingress Controller (nginx, traefik…).",
      "Règles host/path → service:port ; IngressClass sélectionne le controller.",
      "TLS via un Secret de type kubernetes.io/tls.",
    ],
    cmds: ["kubectl create ingress web --rule='app.exemple.com/*=web:80'", "kubectl get ingress", "kubectl describe ingress web"],
    ref: K + "concepts/services-networking/ingress/" });

  T({ id: "tk-netpol", domain: "networking", title: "NetworkPolicy",
    summary: "Filtrer le trafic entre Pods (par défaut tout est permis) via des règles ingress/egress.",
    points: [
      "Sélectionner des Pods + définir policyTypes bascule en deny-par-défaut pour la direction.",
      "Autoriser par podSelector, namespaceSelector, ipBlock, ports.",
      "Nécessite un CNI qui supporte les NetworkPolicies (Calico, Cilium…).",
    ],
    cmds: ["kubectl get networkpolicy -A", "kubectl describe netpol <nom> -n <ns>"],
    ref: K + "concepts/services-networking/network-policies/" });

  T({ id: "tk-dns", domain: "networking", title: "DNS interne (CoreDNS)",
    summary: "Résolution des Services et Pods dans le cluster par CoreDNS.",
    points: [
      "Service : <svc>.<ns>.svc.cluster.local. Pod A-record optionnel.",
      "CoreDNS tourne dans kube-system ; sa Corefile est un ConfigMap.",
      "Débogage DNS depuis un Pod de test (busybox/dnsutils).",
    ],
    cmds: ["kubectl get pods -n kube-system -l k8s-app=kube-dns", "kubectl -n kube-system get cm coredns -o yaml", "kubectl run test --image=busybox:1.28 -it --rm -- nslookup kubernetes.default"],
    ref: K + "concepts/services-networking/dns-pod-service/" });

  T({ id: "tk-portforward", domain: "networking", title: "port-forward et accès direct",
    summary: "Accéder temporairement à un Pod/Service depuis la machine locale sans l'exposer.",
    points: [
      "`kubectl port-forward` mappe un port local vers un Pod/Service.",
      "Pratique pour tester une appli non exposée.",
    ],
    cmds: ["kubectl port-forward deployment/web 8080:80", "kubectl port-forward svc/web 8080:80"],
    ref: K + "tasks/access-application-cluster/port-forward-access-application-cluster/" });

  /* ===================== STORAGE ===================== */
  T({ id: "tk-volumes", domain: "storage", title: "Volumes éphémères (emptyDir, hostPath)",
    summary: "Stockage lié au Pod ou au nœud, sans persistance durable côté cluster.",
    points: [
      "emptyDir : scratch partagé entre containers, effacé avec le Pod.",
      "hostPath : monte un chemin du nœud (attention sécurité/portabilité).",
    ],
    cmds: ["kubectl explain pod.spec.volumes.emptyDir", "kubectl describe pod <pod> | grep -A4 Volumes"],
    ref: K + "concepts/storage/volumes/" });

  T({ id: "tk-pv-pvc", domain: "storage", title: "PV / PVC : cycle de vie",
    summary: "Le PVC (demande) se lie à un PV (ressource) ; le Pod monte le PVC.",
    points: [
      "Binding selon taille, accessModes et storageClassName.",
      "États PVC : Pending → Bound ; PV : Available → Bound → Released.",
      "Un PVC Pending = pas de PV compatible ni provisionnement dynamique.",
    ],
    cmds: ["kubectl get pv,pvc", "kubectl describe pvc <nom>", "kubectl get pvc -o wide"],
    ref: K + "concepts/storage/persistent-volumes/" });

  T({ id: "tk-storageclass", domain: "storage", title: "StorageClass et provisionnement dynamique",
    summary: "Créer des PV à la demande quand un PVC référence une StorageClass.",
    points: [
      "provisioner + parameters + reclaimPolicy + volumeBindingMode.",
      "Une StorageClass 'default' est utilisée si le PVC n'en précise pas.",
    ],
    cmds: ["kubectl get storageclass", "kubectl describe sc <nom>", "kubectl patch storageclass <sc> -p '{\"metadata\":{\"annotations\":{\"storageclass.kubernetes.io/is-default-class\":\"true\"}}}'"],
    ref: K + "concepts/storage/storage-classes/" });

  T({ id: "tk-accessmodes", domain: "storage", title: "Access modes et reclaim policy",
    summary: "Comment un volume peut être monté et ce qu'il devient après suppression du PVC.",
    points: [
      "RWO (1 nœud), ROX (lecture multi-nœuds), RWX (écriture multi-nœuds), RWOP (1 Pod).",
      "Reclaim : Retain (conserve), Delete (supprime), (Recycle déprécié).",
    ],
    cmds: ["kubectl get pv -o custom-columns=NAME:.metadata.name,MODES:.spec.accessModes,RECLAIM:.spec.persistentVolumeReclaimPolicy"],
    ref: K + "concepts/storage/persistent-volumes/#access-modes" });

  T({ id: "tk-mount-config", domain: "storage", title: "Monter un ConfigMap/Secret en volume",
    summary: "Exposer des fichiers de configuration ou des secrets dans le système de fichiers du container.",
    points: [
      "Chaque clé devient un fichier dans le répertoire monté.",
      "subPath pour monter une seule clé sans masquer le dossier.",
    ],
    cmds: ["kubectl create configmap nginx-conf --from-file=nginx.conf", "kubectl describe pod <pod> | grep -A6 Mounts"],
    ref: K + "tasks/configure-pod-container/configure-pod-configmap/#add-configmap-data-to-a-volume" });

  /* ===================== TROUBLESHOOTING ===================== */
  T({ id: "tk-debug-pod", domain: "troubleshooting", title: "Déboguer un Pod (describe, logs, events)",
    summary: "La démarche de base : Events du describe, logs (dont --previous), état des containers.",
    points: [
      "`describe pod` → section Events (scheduling, pull, probes).",
      "`logs --previous` pour l'instance crashée précédente.",
      "`get events --sort-by` pour la chronologie du namespace.",
    ],
    cmds: ["kubectl describe pod <pod>", "kubectl logs <pod> -c <container> --previous", "kubectl get events --sort-by=.metadata.creationTimestamp"],
    ref: K + "tasks/debug/debug-application/debug-pods/" });

  T({ id: "tk-crashloop", domain: "troubleshooting", title: "CrashLoopBackOff / ImagePullBackOff",
    summary: "Distinguer un crash applicatif d'un problème d'image, et le corriger.",
    points: [
      "CrashLoopBackOff : le process sort en erreur → logs --previous, command/args, probes.",
      "ImagePullBackOff : nom/tag erroné, registre privé sans imagePullSecret.",
    ],
    cmds: ["kubectl get pod <pod> -o jsonpath='{.status.containerStatuses[0].state}'", "kubectl describe pod <pod> | grep -A5 Events"],
    ref: K + "tasks/debug/debug-application/debug-pods/" });

  T({ id: "tk-node-notready", domain: "troubleshooting", title: "Nœud NotReady",
    summary: "Un nœud NotReady vient souvent du kubelet ou du CNI.",
    points: [
      "Vérifier kubelet : `systemctl status kubelet`, `journalctl -u kubelet`.",
      "Vérifier le CNI et la connectivité vers l'API server.",
      "`kubectl describe node` → Conditions (MemoryPressure, DiskPressure…).",
    ],
    cmds: ["kubectl get nodes", "kubectl describe node <node>", "systemctl status kubelet"],
    ref: K + "tasks/debug/debug-cluster/" });

  T({ id: "tk-controlplane", domain: "troubleshooting", title: "Panne d'un composant du control plane",
    summary: "Les composants kubeadm sont des Static Pods : diagnostiquer via leurs manifests et logs.",
    points: [
      "Manifests dans /etc/kubernetes/manifests (api-server, etcd, scheduler, controller-manager).",
      "Une erreur de YAML fait disparaître le Pod : vérifier la syntaxe.",
      "Logs via `crictl` ou `kubectl -n kube-system logs` selon le composant.",
    ],
    cmds: ["kubectl get pods -n kube-system", "kubectl -n kube-system logs kube-apiserver-<node>", "cat /etc/kubernetes/manifests/kube-apiserver.yaml"],
    ref: K + "tasks/debug/debug-cluster/" });

  T({ id: "tk-kubectl-debug", domain: "troubleshooting", title: "kubectl debug (ephemeral containers)",
    summary: "Injecter un container d'outils dans un Pod en cours sans le redéployer.",
    points: [
      "`kubectl debug` ajoute un ephemeral container partageant les namespaces.",
      "Utile quand l'image applicative n'a pas de shell/outils.",
      "`--copy-to` pour déboguer sur une copie du Pod.",
    ],
    cmds: ["kubectl debug -it <pod> --image=busybox --target=<container>", "kubectl debug node/<node> -it --image=busybox"],
    ref: K + "tasks/debug/debug-application/debug-running-pod/" });

  T({ id: "tk-metrics", domain: "troubleshooting", title: "Usage ressources (top) et exec",
    summary: "Mesurer la consommation et entrer dans un container pour investiguer.",
    points: [
      "`kubectl top` nécessite metrics-server.",
      "`kubectl exec -it` ouvre un shell dans un container en cours.",
      "`kubectl cp` copie des fichiers vers/depuis un Pod.",
    ],
    cmds: ["kubectl top pod -A", "kubectl top node", "kubectl exec -it <pod> -- sh"],
    ref: K + "tasks/debug/debug-cluster/resource-usage-monitoring/" });
})();
