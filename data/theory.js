// Questions théoriques (QCM). correct = tableau d'index (multi si length>1).
(function () {
  const Q = window.CKA.questions;
  const T = (o) => Q.push(Object.assign({ type: "theory" }, o));
  const K = "https://kubernetes.io/docs/";

  /* ===================== ARCHITECTURE (25 %) ===================== */
  T({ id: "th-arch-1", domain: "architecture", difficulty: "easy",
    q: "Quel composant du control plane stocke l'état de tout le cluster ?",
    choices: ["kube-scheduler", "etcd", "kubelet", "kube-proxy"], correct: [1],
    explain: "etcd est le magasin clé-valeur cohérent et distribué qui persiste tout l'état du cluster. Sa sauvegarde/restauration est un point clé du CKA.",
    ref: K + "concepts/overview/components/#etcd" });

  T({ id: "th-arch-2", domain: "architecture", difficulty: "easy",
    q: "Quel composant décide sur quel nœud un Pod nouvellement créé doit s'exécuter ?",
    choices: ["kube-controller-manager", "kube-apiserver", "kube-scheduler", "etcd"], correct: [2],
    explain: "kube-scheduler observe les Pods sans nœud assigné et choisit un nœud en fonction des ressources, taints/tolerations, affinités, etc.",
    ref: K + "concepts/scheduling-eviction/kube-scheduler/" });

  T({ id: "th-arch-3", domain: "architecture", difficulty: "medium",
    q: "Sur un nœud, quels composants s'exécutent obligatoirement pour qu'il rejoigne et serve le cluster ? (plusieurs réponses)",
    choices: ["kubelet", "kube-proxy", "kube-scheduler", "etcd"], correct: [0, 1],
    explain: "Chaque nœud exécute kubelet (gère les Pods/containers) et kube-proxy (règles réseau des Services). scheduler et etcd sont des composants du control plane.",
    ref: K + "concepts/overview/components/" });

  T({ id: "th-arch-4", domain: "architecture", difficulty: "medium",
    q: "Avec kubeadm, quelle commande génère une nouvelle commande de jointure pour ajouter un worker ?",
    choices: ["kubeadm token create --print-join-command", "kubeadm join --generate", "kubeadm init --join", "kubectl join node"], correct: [0],
    explain: "`kubeadm token create --print-join-command` crée un token et imprime la commande `kubeadm join` complète (avec le hash du CA).",
    ref: K + "reference/setup-tools/kubeadm/kubeadm-token/" });

  T({ id: "th-arch-5", domain: "architecture", difficulty: "medium",
    q: "Où sont, par défaut, les manifests des Static Pods du control plane installé par kubeadm ?",
    choices: ["/etc/kubernetes/manifests", "/var/lib/kubelet/pods", "/etc/kubernetes/static", "/opt/kubernetes/manifests"], correct: [0],
    explain: "Le kubelet surveille /etc/kubernetes/manifests. Y déposer/retirer un YAML crée/supprime un Static Pod (api-server, etcd, controller-manager, scheduler).",
    ref: K + "tasks/configure-pod-container/static-pod/" });

  T({ id: "th-arch-6", domain: "architecture", difficulty: "hard",
    q: "Quelle commande sauvegarde etcd dans un snapshot ?",
    choices: ["etcdctl snapshot save snap.db", "etcdctl backup --dir", "kubectl etcd save", "etcdctl dump > snap.db"], correct: [0],
    explain: "`ETCDCTL_API=3 etcdctl snapshot save snap.db` (avec --endpoints, --cacert, --cert, --key). La restauration se fait avec `snapshot restore`.",
    ref: K + "tasks/administer-cluster/configure-upgrade-etcd/" });

  T({ id: "th-arch-7", domain: "architecture", difficulty: "medium",
    q: "Un ServiceAccount sert principalement à :",
    choices: ["Authentifier un utilisateur humain", "Fournir une identité aux processus qui tournent dans un Pod", "Chiffrer etcd", "Router le trafic des Services"], correct: [1],
    explain: "Les ServiceAccounts donnent une identité aux Pods pour appeler l'API. Les utilisateurs humains ne sont pas des objets K8s (certificats/OIDC).",
    ref: K + "concepts/security/service-accounts/" });

  T({ id: "th-arch-8", domain: "architecture", difficulty: "medium",
    q: "En RBAC, quel objet lie un Role (namespacé) à un sujet dans un namespace ?",
    choices: ["ClusterRoleBinding", "RoleBinding", "ClusterRole", "PodSecurityPolicy"], correct: [1],
    explain: "Un RoleBinding accorde les permissions d'un Role (ou d'un ClusterRole) dans un namespace précis. ClusterRoleBinding agit au niveau cluster.",
    ref: K + "reference/access-authn-authz/rbac/" });

  T({ id: "th-arch-9", domain: "architecture", difficulty: "hard",
    q: "Lors d'un upgrade kubeadm, dans quel ordre agir ?",
    choices: ["worker puis control plane", "control plane (kubeadm upgrade apply) puis kubelet, puis workers", "kubelet partout puis kubeadm", "tout en même temps"], correct: [1],
    explain: "On met à niveau d'abord le control plane (`kubeadm upgrade plan/apply`), puis kubelet+kubectl du control plane, puis chaque worker (`kubeadm upgrade node` + drain/upgrade kubelet/uncordon).",
    ref: K + "tasks/administer-cluster/kubeadm/kubeadm-upgrade/" });

  T({ id: "th-arch-10", domain: "architecture", difficulty: "easy",
    q: "Quel est le point d'entrée unique de toutes les commandes kubectl et de tous les composants ?",
    choices: ["kubelet", "kube-apiserver", "etcd", "coredns"], correct: [1],
    explain: "kube-apiserver expose l'API REST : c'est le seul composant qui parle directement à etcd et le hub de communication du cluster.",
    ref: K + "concepts/overview/components/#kube-apiserver" });

  T({ id: "th-arch-11", domain: "architecture", difficulty: "medium",
    q: "Quelle commande vérifie les permissions effectives de l'utilisateur courant ?",
    choices: ["kubectl auth can-i", "kubectl rbac check", "kubectl describe role", "kubectl whoami"], correct: [0],
    explain: "`kubectl auth can-i <verbe> <ressource>` teste l'autorisation. Avec `--as` on peut usurper (impersonate) un autre sujet.",
    ref: K + "reference/access-authn-authz/authorization/#checking-api-access" });

  T({ id: "th-arch-12", domain: "architecture", difficulty: "hard",
    q: "Le certificat client d'un kubeconfig admin a expiré. Quel répertoire contient le CA du cluster pour en signer un nouveau (kubeadm) ?",
    choices: ["/etc/kubernetes/pki", "/var/lib/kubernetes", "/etc/ssl/k8s", "/root/.kube"], correct: [0],
    explain: "kubeadm place les CA et clés dans /etc/kubernetes/pki (ca.crt, ca.key…). `kubeadm certs renew` renouvelle les certificats.",
    ref: K + "tasks/administer-cluster/kubeadm/kubeadm-certs/" });

  /* ===================== WORKLOADS & SCHEDULING (15 %) ===================== */
  T({ id: "th-work-1", domain: "workloads", difficulty: "easy",
    q: "Quel contrôleur garantit qu'un nombre donné de répliques d'un Pod tourne en permanence et gère les rolling updates ?",
    choices: ["ReplicaSet", "Deployment", "DaemonSet", "Job"], correct: [1],
    explain: "Le Deployment gère des ReplicaSets et orchestre les mises à jour progressives et rollbacks. Un ReplicaSet seul maintient le compte mais sans stratégie de mise à jour.",
    ref: K + "concepts/workloads/controllers/deployment/" });

  T({ id: "th-work-2", domain: "workloads", difficulty: "easy",
    q: "Quel objet exécute un Pod sur chaque nœud (ex. agent de logs) ?",
    choices: ["Deployment", "StatefulSet", "DaemonSet", "ReplicaSet"], correct: [2],
    explain: "Un DaemonSet planifie une copie du Pod sur chaque nœud (ou sur un sous-ensemble via nodeSelector/affinités).",
    ref: K + "concepts/workloads/controllers/daemonset/" });

  T({ id: "th-work-3", domain: "workloads", difficulty: "medium",
    q: "Quelle stratégie de mise à jour permet à un Deployment de ne jamais tomber à zéro Pod disponible ?",
    choices: ["Recreate", "RollingUpdate", "OnDelete", "Blue-Green natif"], correct: [1],
    explain: "RollingUpdate (par défaut) remplace les Pods progressivement selon maxSurge/maxUnavailable. Recreate supprime tout avant de recréer.",
    ref: K + "concepts/workloads/controllers/deployment/#strategy" });

  T({ id: "th-work-4", domain: "workloads", difficulty: "medium",
    q: "Comment forcer un Pod à ne PAS être planifié sur les nœuds control-plane taintés `NoSchedule` ?",
    choices: ["Ajouter une toleration", "Ne rien faire : sans toleration correspondante il sera exclu", "Utiliser un nodeSelector", "Le taint n'a aucun effet sur les Pods"], correct: [1],
    explain: "Un taint NoSchedule repousse les Pods qui n'ont PAS la toleration correspondante. Sans toleration, le Pod est naturellement exclu de ces nœuds.",
    ref: K + "concepts/scheduling-eviction/taint-and-toleration/" });

  T({ id: "th-work-5", domain: "workloads", difficulty: "medium",
    q: "Différence clé entre nodeSelector et nodeAffinity ?",
    choices: ["Aucune", "nodeAffinity permet des règles souples (preferred) et des opérateurs (In, NotIn…)", "nodeSelector est plus récent", "nodeAffinity ne fonctionne que sur les DaemonSets"], correct: [1],
    explain: "nodeSelector = correspondance exacte de labels. nodeAffinity offre required/preferred et des opérateurs d'ensemble, donc plus expressif.",
    ref: K + "concepts/scheduling-eviction/assign-pod-node/" });

  T({ id: "th-work-6", domain: "workloads", difficulty: "hard",
    q: "Un Pod demande `requests.cpu: 500m` et `limits.cpu: 1`. Que signifie 500m ?",
    choices: ["500 cœurs", "0,5 cœur (500 milliCPU)", "500 Mo", "500 % d'un cœur"], correct: [1],
    explain: "1000m = 1 vCPU. 500m = 0,5 cœur. Les requests servent au scheduling ; les limits plafonnent l'usage (throttling CPU).",
    ref: K + "concepts/configuration/manage-resources-containers/" });

  T({ id: "th-work-7", domain: "workloads", difficulty: "medium",
    q: "Comment injecter une valeur d'un ConfigMap comme variable d'environnement ?",
    choices: ["valueFrom.configMapKeyRef", "envFrom.secretRef", "volumeMounts", "configMapGenerator uniquement"], correct: [0],
    explain: "`env: - name: X valueFrom: configMapKeyRef: {name, key}` injecte une clé. `envFrom.configMapRef` injecte toutes les clés d'un coup.",
    ref: K + "tasks/configure-pod-container/configure-pod-configmap/" });

  T({ id: "th-work-8", domain: "workloads", difficulty: "easy",
    q: "Quel objet est conçu pour une tâche qui s'exécute jusqu'à complétion puis s'arrête ?",
    choices: ["Deployment", "Job", "DaemonSet", "Service"], correct: [1],
    explain: "Un Job crée un ou plusieurs Pods et suit leur exécution jusqu'au nombre de complétions demandé. CronJob planifie des Jobs dans le temps.",
    ref: K + "concepts/workloads/controllers/job/" });

  T({ id: "th-work-9", domain: "workloads", difficulty: "hard",
    q: "Quelle option de `kubectl create deployment` puis d'édition permet d'obtenir rapidement un YAML sans l'appliquer ?",
    choices: ["--dry-run=client -o yaml", "--export", "--no-apply", "--yaml-only"], correct: [0],
    explain: "`kubectl create deploy web --image=nginx --dry-run=client -o yaml > d.yaml` génère le manifeste sans créer l'objet — indispensable au CKA pour aller vite.",
    ref: K + "reference/kubectl/conventions/" });

  /* ===================== SERVICES & NETWORKING (20 %) ===================== */
  T({ id: "th-net-1", domain: "networking", difficulty: "easy",
    q: "Quel type de Service expose un Pod uniquement à l'intérieur du cluster via une IP virtuelle stable ?",
    choices: ["NodePort", "LoadBalancer", "ClusterIP", "ExternalName"], correct: [2],
    explain: "ClusterIP (par défaut) donne une IP interne stable, load-balancée vers les Pods du selector. NodePort/LoadBalancer exposent à l'extérieur.",
    ref: K + "concepts/services-networking/service/" });

  T({ id: "th-net-2", domain: "networking", difficulty: "medium",
    q: "Un Service NodePort ouvre un port sur :",
    choices: ["chaque nœud du cluster", "uniquement le control plane", "le Pod directement", "l'apiserver"], correct: [0],
    explain: "NodePort réserve un port (30000–32767) sur TOUS les nœuds et route vers le Service ClusterIP sous-jacent.",
    ref: K + "concepts/services-networking/service/#type-nodeport" });

  T({ id: "th-net-3", domain: "networking", difficulty: "medium",
    q: "Quel composant assure la résolution DNS des Services (ex. my-svc.my-ns.svc.cluster.local) ?",
    choices: ["kube-proxy", "CoreDNS", "etcd", "kubelet"], correct: [1],
    explain: "CoreDNS (déployé dans kube-system) fournit le DNS interne. Un Service `svc` dans `ns` est joignable via `svc.ns.svc.cluster.local`.",
    ref: K + "concepts/services-networking/dns-pod-service/" });

  T({ id: "th-net-4", domain: "networking", difficulty: "hard",
    q: "Par défaut, sans NetworkPolicy, quel est le comportement du trafic entre Pods ?",
    choices: ["Tout est bloqué", "Tout est autorisé (flat network)", "Seul le même namespace communique", "Seul le trafic sortant est permis"], correct: [1],
    explain: "Le modèle réseau K8s est plat : sans NetworkPolicy, tous les Pods peuvent se joindre. Une NetworkPolicy qui sélectionne un Pod bascule celui-ci en 'deny par défaut' pour la direction concernée.",
    ref: K + "concepts/services-networking/network-policies/" });

  T({ id: "th-net-5", domain: "networking", difficulty: "medium",
    q: "Une NetworkPolicy avec `policyTypes: [Ingress]` et aucune règle `ingress` fait quoi ?",
    choices: ["Autorise tout l'ingress", "Bloque tout l'ingress vers les Pods sélectionnés", "N'a aucun effet", "Bloque l'egress"], correct: [1],
    explain: "Sélectionner des Pods avec Ingress mais 0 règle = deny all ingress pour ces Pods. C'est le pattern classique d'isolation.",
    ref: K + "concepts/services-networking/network-policies/#default-deny-all-ingress-traffic" });

  T({ id: "th-net-6", domain: "networking", difficulty: "medium",
    q: "Quel objet gère le routage HTTP/HTTPS L7 (hôtes, chemins) vers des Services ?",
    choices: ["Service LoadBalancer", "Ingress", "Endpoint", "NodePort"], correct: [1],
    explain: "Un Ingress définit des règles L7 (host/path). Il nécessite un Ingress Controller (nginx, traefik…) pour être effectif.",
    ref: K + "concepts/services-networking/ingress/" });

  T({ id: "th-net-7", domain: "networking", difficulty: "hard",
    q: "Un Service ClusterIP n'envoie aucun trafic. Quelle cause est la plus probable ?",
    choices: ["Le selector du Service ne correspond à aucun label de Pod", "CoreDNS est éteint", "Le namespace est plein", "Il manque un Ingress"], correct: [0],
    explain: "Si le selector ne matche aucun Pod prêt, les Endpoints sont vides. Vérifier avec `kubectl get endpoints <svc>`.",
    ref: K + "concepts/services-networking/service/#defining-a-service" });

  T({ id: "th-net-8", domain: "networking", difficulty: "easy",
    q: "Quelle plage de ports est réservée par défaut aux NodePort ?",
    choices: ["1–1024", "8080–9090", "30000–32767", "40000–50000"], correct: [2],
    explain: "Par défaut, les NodePort sont alloués dans 30000–32767 (configurable via --service-node-port-range).",
    ref: K + "concepts/services-networking/service/#type-nodeport" });

  T({ id: "th-net-9", domain: "networking", difficulty: "medium",
    q: "Comment un Service découvre-t-il les Pods cibles ?",
    choices: ["Par leur nom", "Via un label selector qui remplit ses Endpoints", "Par ordre de création", "Via l'annotation service/target"], correct: [1],
    explain: "Le selector du Service matche les labels des Pods ; le controller met à jour l'objet Endpoints/EndpointSlice correspondant.",
    ref: K + "concepts/services-networking/service/" });

  /* ===================== STORAGE (10 %) ===================== */
  T({ id: "th-sto-1", domain: "storage", difficulty: "easy",
    q: "Quel objet représente une demande de stockage par un utilisateur/Pod ?",
    choices: ["PersistentVolume", "PersistentVolumeClaim", "StorageClass", "VolumeMount"], correct: [1],
    explain: "Le PVC est la 'demande' (taille, accessMode, storageClass). Le PV est la ressource réelle. Le PVC se lie (Bound) à un PV compatible.",
    ref: K + "concepts/storage/persistent-volumes/" });

  T({ id: "th-sto-2", domain: "storage", difficulty: "medium",
    q: "Quel objet permet le provisionnement DYNAMIQUE de PV à la demande ?",
    choices: ["StorageClass", "ConfigMap", "PersistentVolume statique", "Node"], correct: [0],
    explain: "Une StorageClass décrit un 'provisioner' et des paramètres ; un PVC qui la référence déclenche la création automatique d'un PV.",
    ref: K + "concepts/storage/storage-classes/" });

  T({ id: "th-sto-3", domain: "storage", difficulty: "medium",
    q: "Quel accessMode autorise la lecture/écriture par un seul nœud à la fois ?",
    choices: ["ReadWriteOnce (RWO)", "ReadOnlyMany (ROX)", "ReadWriteMany (RWX)", "ReadWriteOncePod"], correct: [0],
    explain: "RWO = monté en lecture-écriture par un seul nœud. RWX = plusieurs nœuds. ReadWriteOncePod = un seul Pod. ROX = lecture seule multi-nœuds.",
    ref: K + "concepts/storage/persistent-volumes/#access-modes" });

  T({ id: "th-sto-4", domain: "storage", difficulty: "hard",
    q: "Que se passe-t-il à la suppression d'un PVC si la reclaimPolicy du PV est 'Delete' ?",
    choices: ["Le PV et le stockage sous-jacent sont supprimés", "Le PV reste Available", "Rien", "Le Pod est recréé"], correct: [0],
    explain: "Reclaim 'Delete' supprime le PV et le volume réel. 'Retain' conserve le PV (état Released) pour récupération manuelle des données.",
    ref: K + "concepts/storage/persistent-volumes/#reclaiming" });

  T({ id: "th-sto-5", domain: "storage", difficulty: "easy",
    q: "Quel type de volume est éphémère et partagé entre les containers d'un même Pod, effacé quand le Pod disparaît ?",
    choices: ["emptyDir", "hostPath", "persistentVolumeClaim", "nfs"], correct: [0],
    explain: "emptyDir est créé au démarrage du Pod, partagé par ses containers, et détruit avec le Pod. Utile pour du scratch/cache.",
    ref: K + "concepts/storage/volumes/#emptydir" });

  T({ id: "th-sto-6", domain: "storage", difficulty: "medium",
    q: "Un PVC reste en état 'Pending'. Cause fréquente ?",
    choices: ["Aucun PV compatible ni provisionnement dynamique disponible", "Le Pod est Running", "Le namespace n'existe pas", "Trop de CPU demandé"], correct: [0],
    explain: "Pending = pas de PV correspondant (taille/accessMode/storageClass) et pas de StorageClass capable de provisionner dynamiquement.",
    ref: K + "concepts/storage/persistent-volumes/#lifecycle-of-a-volume-and-claim" });

  /* ===================== TROUBLESHOOTING (30 %) ===================== */
  T({ id: "th-ts-1", domain: "troubleshooting", difficulty: "easy",
    q: "Quelle commande affiche les logs d'un container d'un Pod ?",
    choices: ["kubectl logs <pod>", "kubectl describe logs", "kubectl get logs", "kubectl trace"], correct: [0],
    explain: "`kubectl logs <pod> [-c container] [--previous]`. `--previous` lit les logs de l'instance précédente après un crash.",
    ref: K + "reference/generated/kubectl/kubectl-commands#logs" });

  T({ id: "th-ts-2", domain: "troubleshooting", difficulty: "medium",
    q: "Un Pod est en 'CrashLoopBackOff'. Que signifie cet état ?",
    choices: ["Image introuvable", "Le container démarre puis plante en boucle", "Pas de nœud disponible", "Le PVC est Pending"], correct: [1],
    explain: "Le container démarre, se termine (souvent code ≠ 0), et K8s le redémarre avec un back-off croissant. Diagnostiquer via logs --previous et describe (events).",
    ref: K + "tasks/debug/debug-application/debug-pods/" });

  T({ id: "th-ts-3", domain: "troubleshooting", difficulty: "medium",
    q: "Un Pod reste 'Pending'. Quelle commande révèle le plus souvent la cause (ressources, taints, affinités) ?",
    choices: ["kubectl logs", "kubectl describe pod <pod> (section Events)", "kubectl top pod", "kubectl get cm"], correct: [1],
    explain: "`kubectl describe pod` affiche les Events du scheduler (ex. 'Insufficient cpu', 'node(s) had taint'), qui expliquent le Pending.",
    ref: K + "tasks/debug/debug-application/debug-pods/" });

  T({ id: "th-ts-4", domain: "troubleshooting", difficulty: "hard",
    q: "Le statut 'ImagePullBackOff' indique :",
    choices: ["Un crash applicatif", "L'échec du téléchargement de l'image (nom/tag/credentials)", "Un manque de CPU", "Un problème DNS interne"], correct: [1],
    explain: "K8s n'arrive pas à pull l'image : faute de frappe sur le nom/tag, registre privé sans imagePullSecret, ou registre injoignable.",
    ref: K + "concepts/containers/images/#troubleshooting" });

  T({ id: "th-ts-5", domain: "troubleshooting", difficulty: "medium",
    q: "Un nœud est 'NotReady'. Quel service systemd vérifier en priorité sur ce nœud ?",
    choices: ["kubelet", "etcd", "kube-scheduler", "coredns"], correct: [0],
    explain: "Le kubelet rend le nœud Ready. `systemctl status kubelet` + `journalctl -u kubelet` révèlent souvent le problème (config, CNI, certificats).",
    ref: K + "tasks/debug/debug-cluster/" });

  T({ id: "th-ts-6", domain: "troubleshooting", difficulty: "medium",
    q: "Quelle commande affiche l'utilisation CPU/mémoire des Pods (metrics-server requis) ?",
    choices: ["kubectl top pod", "kubectl usage", "kubectl metrics", "kubectl describe node"], correct: [0],
    explain: "`kubectl top pod` / `kubectl top node` s'appuient sur le metrics-server. Sans lui, la commande échoue.",
    ref: K + "tasks/debug/debug-cluster/resource-usage-monitoring/" });

  T({ id: "th-ts-7", domain: "troubleshooting", difficulty: "hard",
    q: "kubectl renvoie 'The connection to the server localhost:8080 was refused'. Cause typique ?",
    choices: ["Le KUBECONFIG n'est pas défini / mauvais fichier", "Le Pod est Pending", "Le Service n'a pas d'Endpoints", "Le PV est Retain"], correct: [0],
    explain: "kubectl retombe sur localhost:8080 quand aucun kubeconfig valide n'est chargé (variable KUBECONFIG ou ~/.kube/config manquant/incorrect).",
    ref: K + "tasks/access-application-cluster/configure-access-multiple-clusters/" });

  T({ id: "th-ts-8", domain: "troubleshooting", difficulty: "medium",
    q: "Pour voir les événements récents de tout un namespace triés par date :",
    choices: ["kubectl get events --sort-by=.metadata.creationTimestamp", "kubectl logs --all", "kubectl describe ns", "kubectl top events"], correct: [0],
    explain: "`kubectl get events --sort-by=.metadata.creationTimestamp` (ou -A) est le réflexe pour corréler les incidents récents.",
    ref: K + "tasks/debug/debug-application/" });

  T({ id: "th-ts-9", domain: "troubleshooting", difficulty: "hard",
    q: "Un container manque d'outils réseau pour déboguer sans le redéployer. Quelle fonctionnalité utiliser ?",
    choices: ["kubectl debug (ephemeral container)", "kubectl exec --root", "kubectl cp", "kubectl attach"], correct: [0],
    explain: "`kubectl debug -it <pod> --image=busybox --target=<container>` injecte un ephemeral container partageant les namespaces, sans redémarrer le Pod.",
    ref: K + "tasks/debug/debug-application/debug-running-pod/" });

  T({ id: "th-ts-10", domain: "troubleshooting", difficulty: "easy",
    q: "Quelle commande ouvre un shell interactif dans un container en cours d'exécution ?",
    choices: ["kubectl exec -it <pod> -- sh", "kubectl shell <pod>", "kubectl run -it", "kubectl ssh <pod>"], correct: [0],
    explain: "`kubectl exec -it <pod> [-c container] -- sh` (ou bash) ouvre un shell dans le container déjà lancé.",
    ref: K + "tasks/debug/debug-application/get-shell-running-container/" });
})();
