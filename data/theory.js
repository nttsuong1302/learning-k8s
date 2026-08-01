// Questions théoriques (QCM). correct = tableau d'index (multi si length>1).
// why = explication PAR OPTION (pourquoi chaque choix est bon/mauvais).
(function () {
  const Q = window.CKA.questions;
  const T = (o) => Q.push(Object.assign({ type: "theory" }, o));
  const K = "https://kubernetes.io/docs/";

  /* ===================== ARCHITECTURE (25 %) ===================== */
  T({ id: "th-arch-1", domain: "architecture", difficulty: "easy",
    q: "Quel composant du control plane stocke l'état de tout le cluster ?",
    choices: ["kube-scheduler", "etcd", "kubelet", "kube-proxy"], correct: [1],
    why: [
      "Faux : le scheduler décide seulement du placement des Pods ; il ne stocke rien.",
      "Correct : etcd est le magasin clé-valeur cohérent et distribué qui persiste tout l'état du cluster.",
      "Faux : le kubelet est un agent de nœud qui exécute les Pods, sans stockage global.",
      "Faux : kube-proxy programme les règles réseau des Services, il ne stocke pas d'état.",
    ],
    explain: "etcd est la source de vérité du cluster ; sa sauvegarde/restauration (snapshot) est un point clé du CKA.",
    ref: K + "concepts/overview/components/#etcd" });

  T({ id: "th-arch-2", domain: "architecture", difficulty: "easy",
    q: "Quel composant décide sur quel nœud un Pod nouvellement créé doit s'exécuter ?",
    choices: ["kube-controller-manager", "kube-apiserver", "kube-scheduler", "etcd"], correct: [2],
    why: [
      "Faux : le controller-manager exécute les boucles de contrôle, pas le placement.",
      "Faux : l'API server expose l'API ; il n'attribue pas les nœuds.",
      "Correct : le kube-scheduler observe les Pods sans nœud et en choisit un (ressources, taints, affinités).",
      "Faux : etcd ne fait que stocker l'état.",
    ],
    explain: "Le scheduler filtre puis score les nœuds candidats avant d'affecter le Pod.",
    ref: K + "concepts/scheduling-eviction/kube-scheduler/" });

  T({ id: "th-arch-3", domain: "architecture", difficulty: "medium",
    q: "Sur un nœud, quels composants s'exécutent obligatoirement pour qu'il rejoigne et serve le cluster ? (plusieurs réponses)",
    choices: ["kubelet", "kube-proxy", "kube-scheduler", "etcd"], correct: [0, 1],
    why: [
      "Correct : le kubelet gère les Pods/containers du nœud et le rend Ready.",
      "Correct : kube-proxy programme les règles réseau des Services sur le nœud.",
      "Faux : le scheduler est un composant du control plane, pas de chaque worker.",
      "Faux : etcd tourne côté control plane, pas sur les workers.",
    ],
    explain: "Chaque nœud exécute kubelet + kube-proxy ; scheduler et etcd sont côté control plane.",
    ref: K + "concepts/overview/components/" });

  T({ id: "th-arch-4", domain: "architecture", difficulty: "medium",
    q: "Avec kubeadm, quelle commande génère une nouvelle commande de jointure pour ajouter un worker ?",
    choices: ["kubeadm token create --print-join-command", "kubeadm join --generate", "kubeadm init --join", "kubectl join node"], correct: [0],
    why: [
      "Correct : crée un token et imprime la commande `kubeadm join` complète (avec hash du CA).",
      "Faux : `kubeadm join` s'exécute sur le worker pour rejoindre, il ne génère pas de commande.",
      "Faux : `kubeadm init` initialise le control plane, il ne joint pas de worker.",
      "Faux : `kubectl join node` n'existe pas.",
    ],
    explain: "Le token de jointure expire après 24h ; on en régénère un avec cette commande.",
    ref: K + "reference/setup-tools/kubeadm/kubeadm-token/" });

  T({ id: "th-arch-5", domain: "architecture", difficulty: "medium",
    q: "Où sont, par défaut, les manifests des Static Pods du control plane installé par kubeadm ?",
    choices: ["/etc/kubernetes/manifests", "/var/lib/kubelet/pods", "/etc/kubernetes/static", "/opt/kubernetes/manifests"], correct: [0],
    why: [
      "Correct : le kubelet surveille /etc/kubernetes/manifests (api-server, etcd, scheduler, controller-manager).",
      "Faux : /var/lib/kubelet contient l'état d'exécution du kubelet, pas les manifests source.",
      "Faux : ce chemin n'est pas utilisé par kubeadm.",
      "Faux : chemin inexistant par défaut.",
    ],
    explain: "Déposer/retirer un YAML dans ce dossier crée/supprime un Static Pod.",
    ref: K + "tasks/configure-pod-container/static-pod/" });

  T({ id: "th-arch-6", domain: "architecture", difficulty: "hard",
    q: "Quelle commande sauvegarde etcd dans un snapshot ?",
    choices: ["etcdctl snapshot save snap.db", "etcdctl backup --dir", "kubectl etcd save", "etcdctl dump > snap.db"], correct: [0],
    why: [
      "Correct : `ETCDCTL_API=3 etcdctl snapshot save snap.db` (avec --endpoints/--cacert/--cert/--key).",
      "Faux : `backup` est l'ancienne API v2, dépréciée pour les snapshots v3.",
      "Faux : kubectl ne pilote pas etcd directement.",
      "Faux : `dump` n'est pas une sous-commande de snapshot.",
    ],
    explain: "La restauration se fait avec `etcdctl snapshot restore` dans un nouveau data-dir.",
    ref: K + "tasks/administer-cluster/configure-upgrade-etcd/" });

  T({ id: "th-arch-7", domain: "architecture", difficulty: "medium",
    q: "Un ServiceAccount sert principalement à :",
    choices: ["Authentifier un utilisateur humain", "Fournir une identité aux processus qui tournent dans un Pod", "Chiffrer etcd", "Router le trafic des Services"], correct: [1],
    why: [
      "Faux : les humains s'authentifient via certificats/OIDC, pas via ServiceAccount.",
      "Correct : un ServiceAccount donne une identité aux Pods pour appeler l'API.",
      "Faux : le chiffrement d'etcd est une config de l'API server (encryption at rest).",
      "Faux : le routage est assuré par les Services/kube-proxy.",
    ],
    explain: "Les utilisateurs ne sont pas des objets K8s ; les ServiceAccounts, si.",
    ref: K + "concepts/security/service-accounts/" });

  T({ id: "th-arch-8", domain: "architecture", difficulty: "medium",
    q: "En RBAC, quel objet lie un Role (namespacé) à un sujet dans un namespace ?",
    choices: ["ClusterRoleBinding", "RoleBinding", "ClusterRole", "PodSecurityPolicy"], correct: [1],
    why: [
      "Faux : un ClusterRoleBinding agit au niveau cluster, pas dans un namespace précis.",
      "Correct : un RoleBinding accorde les permissions d'un Role (ou ClusterRole) dans un namespace.",
      "Faux : un ClusterRole définit des permissions mais ne les lie pas à un sujet.",
      "Faux : PodSecurityPolicy (supprimée) concernait la sécurité des Pods, pas RBAC.",
    ],
    explain: "Un RoleBinding peut référencer un ClusterRole pour le limiter à un namespace.",
    ref: K + "reference/access-authn-authz/rbac/" });

  T({ id: "th-arch-9", domain: "architecture", difficulty: "hard",
    q: "Lors d'un upgrade kubeadm, dans quel ordre agir ?",
    choices: ["worker puis control plane", "control plane (kubeadm upgrade apply) puis kubelet, puis workers", "kubelet partout puis kubeadm", "tout en même temps"], correct: [1],
    why: [
      "Faux : on ne met jamais à niveau les workers avant le control plane.",
      "Correct : d'abord `kubeadm upgrade apply` (control plane), puis kubelet/kubectl, puis chaque worker.",
      "Faux : mettre à jour kubelet avant kubeadm/control plane casse la compatibilité.",
      "Faux : un upgrade simultané n'est pas supporté et risque une indisponibilité.",
    ],
    explain: "Sur chaque worker : drain → `kubeadm upgrade node` → upgrade kubelet → uncordon.",
    ref: K + "tasks/administer-cluster/kubeadm/kubeadm-upgrade/" });

  T({ id: "th-arch-10", domain: "architecture", difficulty: "easy",
    q: "Quel est le point d'entrée unique de toutes les commandes kubectl et de tous les composants ?",
    choices: ["kubelet", "kube-apiserver", "etcd", "coredns"], correct: [1],
    why: [
      "Faux : le kubelet est un agent de nœud, pas le point d'entrée de l'API.",
      "Correct : kube-apiserver expose l'API REST et est le seul à parler à etcd.",
      "Faux : etcd n'est accédé que par l'API server, pas par kubectl directement.",
      "Faux : CoreDNS ne fait que la résolution DNS.",
    ],
    explain: "Tout passe par l'API server : c'est le hub de communication du cluster.",
    ref: K + "concepts/overview/components/#kube-apiserver" });

  T({ id: "th-arch-11", domain: "architecture", difficulty: "medium",
    q: "Quelle commande vérifie les permissions effectives de l'utilisateur courant ?",
    choices: ["kubectl auth can-i", "kubectl rbac check", "kubectl describe role", "kubectl whoami"], correct: [0],
    why: [
      "Correct : `kubectl auth can-i <verbe> <ressource>` teste l'autorisation (avec --as pour usurper).",
      "Faux : `kubectl rbac check` n'existe pas.",
      "Faux : describe role montre un Role mais pas ce que PEUT faire l'utilisateur courant.",
      "Faux : `kubectl whoami` n'est pas une commande standard.",
    ],
    explain: "`--as=<user>` permet de tester les droits d'un autre sujet (impersonation).",
    ref: K + "reference/access-authn-authz/authorization/#checking-api-access" });

  T({ id: "th-arch-12", domain: "architecture", difficulty: "hard",
    q: "Le certificat client d'un kubeconfig admin a expiré. Quel répertoire contient le CA du cluster (kubeadm) ?",
    choices: ["/etc/kubernetes/pki", "/var/lib/kubernetes", "/etc/ssl/k8s", "/root/.kube"], correct: [0],
    why: [
      "Correct : kubeadm place CA et clés dans /etc/kubernetes/pki (ca.crt, ca.key…).",
      "Faux : chemin non utilisé par kubeadm.",
      "Faux : /etc/ssl est générique, pas le PKI du cluster kubeadm.",
      "Faux : ~/.kube contient le kubeconfig, pas le CA du cluster.",
    ],
    explain: "`kubeadm certs renew all` renouvelle les certificats à partir de ce PKI.",
    ref: K + "tasks/administer-cluster/kubeadm/kubeadm-certs/" });

  /* ===================== WORKLOADS & SCHEDULING (15 %) ===================== */
  T({ id: "th-work-1", domain: "workloads", difficulty: "easy",
    q: "Quel contrôleur garantit un nombre de répliques ET gère les rolling updates ?",
    choices: ["ReplicaSet", "Deployment", "DaemonSet", "Job"], correct: [1],
    why: [
      "Faux : un ReplicaSet maintient le compte mais ne gère pas les mises à jour/rollbacks.",
      "Correct : le Deployment pilote des ReplicaSets et orchestre updates progressifs et rollbacks.",
      "Faux : un DaemonSet vise un Pod par nœud, pas un nombre de répliques.",
      "Faux : un Job exécute une tâche jusqu'à complétion, pas un service durable.",
    ],
    explain: "Le Deployment est l'abstraction standard pour les applis sans état.",
    ref: K + "concepts/workloads/controllers/deployment/" });

  T({ id: "th-work-2", domain: "workloads", difficulty: "easy",
    q: "Quel objet exécute un Pod sur chaque nœud (ex. agent de logs) ?",
    choices: ["Deployment", "StatefulSet", "DaemonSet", "ReplicaSet"], correct: [2],
    why: [
      "Faux : un Deployment place N répliques librement, pas une par nœud.",
      "Faux : un StatefulSet gère des Pods à identité stable, pas un-par-nœud.",
      "Correct : un DaemonSet planifie une copie du Pod sur chaque nœud (ou un sous-ensemble).",
      "Faux : un ReplicaSet maintient un nombre de répliques, pas une par nœud.",
    ],
    explain: "On restreint via nodeSelector/affinités si besoin d'un sous-ensemble de nœuds.",
    ref: K + "concepts/workloads/controllers/daemonset/" });

  T({ id: "th-work-3", domain: "workloads", difficulty: "medium",
    q: "Quelle stratégie évite de tomber à zéro Pod disponible pendant une mise à jour ?",
    choices: ["Recreate", "RollingUpdate", "OnDelete", "Blue-Green natif"], correct: [1],
    why: [
      "Faux : Recreate supprime tous les Pods avant d'en recréer (interruption).",
      "Correct : RollingUpdate remplace progressivement selon maxSurge/maxUnavailable.",
      "Faux : OnDelete (StatefulSet/DaemonSet) n'update qu'à la suppression manuelle.",
      "Faux : le blue-green n'est pas une stratégie native du Deployment.",
    ],
    explain: "RollingUpdate est la stratégie par défaut d'un Deployment.",
    ref: K + "concepts/workloads/controllers/deployment/#strategy" });

  T({ id: "th-work-4", domain: "workloads", difficulty: "medium",
    q: "Comment empêcher qu'un Pod soit planifié sur les nœuds control-plane taintés NoSchedule ?",
    choices: ["Ajouter une toleration", "Ne rien faire : sans toleration il est exclu", "Utiliser un nodeSelector", "Le taint n'a aucun effet"], correct: [1],
    why: [
      "Faux : ajouter une toleration AUTORISERAIT justement le Pod sur ces nœuds.",
      "Correct : un taint NoSchedule repousse tout Pod sans la toleration correspondante.",
      "Faux : un nodeSelector cible par label, il ne gère pas les taints.",
      "Faux : le taint a bien un effet — il exclut les Pods non tolérants.",
    ],
    explain: "Taint (nœud) + toleration (Pod) fonctionnent en paire.",
    ref: K + "concepts/scheduling-eviction/taint-and-toleration/" });

  T({ id: "th-work-5", domain: "workloads", difficulty: "medium",
    q: "Différence clé entre nodeSelector et nodeAffinity ?",
    choices: ["Aucune", "nodeAffinity permet des règles souples (preferred) et des opérateurs (In, NotIn…)", "nodeSelector est plus récent", "nodeAffinity ne marche que sur les DaemonSets"], correct: [1],
    why: [
      "Faux : ils diffèrent nettement en expressivité.",
      "Correct : nodeAffinity offre required/preferred et des opérateurs d'ensemble ; nodeSelector = match exact.",
      "Faux : nodeSelector est l'ancienne forme, plus simple.",
      "Faux : nodeAffinity s'applique à tous les Pods, pas qu'aux DaemonSets.",
    ],
    explain: "nodeAffinity permet des préférences non bloquantes, impossibles avec nodeSelector.",
    ref: K + "concepts/scheduling-eviction/assign-pod-node/" });

  T({ id: "th-work-6", domain: "workloads", difficulty: "hard",
    q: "Un Pod demande requests.cpu: 500m. Que signifie 500m ?",
    choices: ["500 cœurs", "0,5 cœur (500 milliCPU)", "500 Mo", "500 % d'un cœur"], correct: [1],
    why: [
      "Faux : 500 cœurs serait énorme et irréaliste.",
      "Correct : 1000m = 1 vCPU, donc 500m = 0,5 cœur.",
      "Faux : les Mo concernent la mémoire, pas le CPU.",
      "Faux : 500m = 50 % d'un cœur, pas 500 %.",
    ],
    explain: "Les requests servent au scheduling ; les limits plafonnent (throttling CPU).",
    ref: K + "concepts/configuration/manage-resources-containers/" });

  T({ id: "th-work-7", domain: "workloads", difficulty: "medium",
    q: "Comment injecter une valeur d'un ConfigMap comme variable d'environnement ?",
    choices: ["valueFrom.configMapKeyRef", "envFrom.secretRef", "volumeMounts", "configMapGenerator uniquement"], correct: [0],
    why: [
      "Correct : `env.valueFrom.configMapKeyRef: {name, key}` injecte une clé précise.",
      "Faux : secretRef concerne les Secrets, pas les ConfigMaps.",
      "Faux : volumeMounts monte un volume, ce n'est pas une variable d'env.",
      "Faux : configMapGenerator est un outil Kustomize, pas le mécanisme d'injection en env.",
    ],
    explain: "`envFrom.configMapRef` injecte d'un coup toutes les clés d'un ConfigMap.",
    ref: K + "tasks/configure-pod-container/configure-pod-configmap/" });

  T({ id: "th-work-8", domain: "workloads", difficulty: "easy",
    q: "Quel objet exécute une tâche jusqu'à complétion puis s'arrête ?",
    choices: ["Deployment", "Job", "DaemonSet", "Service"], correct: [1],
    why: [
      "Faux : un Deployment maintient des Pods en continu.",
      "Correct : un Job lance des Pods et suit leur exécution jusqu'au nombre de complétions.",
      "Faux : un DaemonSet fait tourner un Pod par nœud en permanence.",
      "Faux : un Service expose des Pods, il n'exécute pas de tâche.",
    ],
    explain: "CronJob planifie des Jobs dans le temps (cron 5 champs).",
    ref: K + "concepts/workloads/controllers/job/" });

  T({ id: "th-work-9", domain: "workloads", difficulty: "hard",
    q: "Quelle option génère rapidement un YAML sans créer l'objet ?",
    choices: ["--dry-run=client -o yaml", "--export", "--no-apply", "--yaml-only"], correct: [0],
    why: [
      "Correct : `--dry-run=client -o yaml` produit le manifeste sans rien appliquer.",
      "Faux : `--export` a été supprimé.",
      "Faux : `--no-apply` n'existe pas.",
      "Faux : `--yaml-only` n'existe pas.",
    ],
    explain: "Réflexe CKA : `kubectl create ... --dry-run=client -o yaml > f.yaml` puis éditer.",
    ref: K + "reference/kubectl/conventions/" });

  /* ===================== SERVICES & NETWORKING (20 %) ===================== */
  T({ id: "th-net-1", domain: "networking", difficulty: "easy",
    q: "Quel type de Service expose un Pod uniquement à l'intérieur du cluster via une IP stable ?",
    choices: ["NodePort", "LoadBalancer", "ClusterIP", "ExternalName"], correct: [2],
    why: [
      "Faux : NodePort ouvre un port sur chaque nœud, donc accessible de l'extérieur.",
      "Faux : LoadBalancer provisionne un équilibreur externe (cloud).",
      "Correct : ClusterIP (défaut) donne une IP interne stable, non exposée dehors.",
      "Faux : ExternalName crée un alias CNAME vers un DNS externe.",
    ],
    explain: "ClusterIP load-balance vers les Pods du selector, en interne.",
    ref: K + "concepts/services-networking/service/" });

  T({ id: "th-net-2", domain: "networking", difficulty: "medium",
    q: "Un Service NodePort ouvre un port sur :",
    choices: ["chaque nœud du cluster", "uniquement le control plane", "le Pod directement", "l'apiserver"], correct: [0],
    why: [
      "Correct : NodePort réserve un port (30000–32767) sur TOUS les nœuds.",
      "Faux : ce n'est pas limité au control plane.",
      "Faux : il route vers le Service, pas directement vers un Pod unique.",
      "Faux : l'API server n'est pas concerné.",
    ],
    explain: "Le NodePort route vers le ClusterIP sous-jacent, puis vers les Pods.",
    ref: K + "concepts/services-networking/service/#type-nodeport" });

  T({ id: "th-net-3", domain: "networking", difficulty: "medium",
    q: "Quel composant assure la résolution DNS des Services ?",
    choices: ["kube-proxy", "CoreDNS", "etcd", "kubelet"], correct: [1],
    why: [
      "Faux : kube-proxy programme le réseau des Services, pas le DNS.",
      "Correct : CoreDNS (kube-system) fournit le DNS interne du cluster.",
      "Faux : etcd stocke l'état, il ne résout pas les noms.",
      "Faux : le kubelet gère les Pods, pas le DNS de cluster.",
    ],
    explain: "Un Service `svc` dans `ns` est joignable via svc.ns.svc.cluster.local.",
    ref: K + "concepts/services-networking/dns-pod-service/" });

  T({ id: "th-net-4", domain: "networking", difficulty: "hard",
    q: "Sans NetworkPolicy, quel est le comportement du trafic entre Pods ?",
    choices: ["Tout est bloqué", "Tout est autorisé (réseau plat)", "Seul le même namespace communique", "Seul le sortant est permis"], correct: [1],
    why: [
      "Faux : K8s n'est pas deny-par-défaut sans NetworkPolicy.",
      "Correct : le modèle réseau est plat : tous les Pods peuvent se joindre.",
      "Faux : les namespaces n'isolent pas le réseau par défaut.",
      "Faux : entrant et sortant sont tous deux permis par défaut.",
    ],
    explain: "Sélectionner un Pod par une NetworkPolicy le bascule en deny-par-défaut pour la direction visée.",
    ref: K + "concepts/services-networking/network-policies/" });

  T({ id: "th-net-5", domain: "networking", difficulty: "medium",
    q: "Une NetworkPolicy avec policyTypes: [Ingress] et aucune règle ingress fait quoi ?",
    choices: ["Autorise tout l'ingress", "Bloque tout l'ingress vers les Pods sélectionnés", "N'a aucun effet", "Bloque l'egress"], correct: [1],
    why: [
      "Faux : elle n'autorise pas — l'absence de règle signifie 'rien d'autorisé'.",
      "Correct : sélection + Ingress sans règle = deny-all ingress pour ces Pods.",
      "Faux : elle a un effet dès qu'elle sélectionne des Pods.",
      "Faux : elle vise l'ingress, pas l'egress (non déclaré ici).",
    ],
    explain: "C'est le pattern classique d'isolation 'default deny ingress'.",
    ref: K + "concepts/services-networking/network-policies/#default-deny-all-ingress-traffic" });

  T({ id: "th-net-6", domain: "networking", difficulty: "medium",
    q: "Quel objet gère le routage HTTP/HTTPS L7 (hôtes, chemins) vers des Services ?",
    choices: ["Service LoadBalancer", "Ingress", "Endpoint", "NodePort"], correct: [1],
    why: [
      "Faux : un Service LoadBalancer expose en L4, sans routage par host/path.",
      "Correct : un Ingress définit des règles L7 (host/path) vers des Services.",
      "Faux : un Endpoint liste les cibles d'un Service, il ne route pas en L7.",
      "Faux : NodePort est du L4 par port.",
    ],
    explain: "Un Ingress nécessite un Ingress Controller (nginx, traefik…) pour agir.",
    ref: K + "concepts/services-networking/ingress/" });

  T({ id: "th-net-7", domain: "networking", difficulty: "hard",
    q: "Un Service ClusterIP n'envoie aucun trafic. Cause la plus probable ?",
    choices: ["Le selector ne correspond à aucun label de Pod", "CoreDNS est éteint", "Le namespace est plein", "Il manque un Ingress"], correct: [0],
    why: [
      "Correct : sans Pod prêt correspondant au selector, les Endpoints sont vides.",
      "Faux : un souci DNS empêcherait la résolution, pas le routage vers Pods.",
      "Faux : il n'y a pas de notion de namespace 'plein'.",
      "Faux : un ClusterIP fonctionne sans Ingress.",
    ],
    explain: "Diagnostic : `kubectl get endpoints <svc>` — s'il est vide, le selector/readiness est en cause.",
    ref: K + "concepts/services-networking/service/#defining-a-service" });

  T({ id: "th-net-8", domain: "networking", difficulty: "easy",
    q: "Quelle plage de ports est réservée par défaut aux NodePort ?",
    choices: ["1–1024", "8080–9090", "30000–32767", "40000–50000"], correct: [2],
    why: [
      "Faux : 1–1024 sont les ports 'privilégiés' système.",
      "Faux : plage arbitraire non liée aux NodePort.",
      "Correct : 30000–32767 par défaut (configurable via --service-node-port-range).",
      "Faux : hors plage par défaut.",
    ],
    explain: "On peut élargir la plage au niveau de l'API server.",
    ref: K + "concepts/services-networking/service/#type-nodeport" });

  T({ id: "th-net-9", domain: "networking", difficulty: "medium",
    q: "Comment un Service découvre-t-il les Pods cibles ?",
    choices: ["Par leur nom", "Via un label selector qui remplit ses Endpoints", "Par ordre de création", "Via l'annotation service/target"], correct: [1],
    why: [
      "Faux : les Pods sont volatils ; on ne cible pas par nom.",
      "Correct : le selector matche les labels des Pods ; le controller met à jour Endpoints/EndpointSlice.",
      "Faux : l'ordre de création n'intervient pas.",
      "Faux : cette annotation n'existe pas.",
    ],
    explain: "Un Service sans selector permet de gérer les Endpoints manuellement.",
    ref: K + "concepts/services-networking/service/" });

  /* ===================== STORAGE (10 %) ===================== */
  T({ id: "th-sto-1", domain: "storage", difficulty: "easy",
    q: "Quel objet représente une demande de stockage par un utilisateur/Pod ?",
    choices: ["PersistentVolume", "PersistentVolumeClaim", "StorageClass", "VolumeMount"], correct: [1],
    why: [
      "Faux : le PV est la ressource de stockage réelle, pas la demande.",
      "Correct : le PVC exprime la demande (taille, accessMode, storageClass).",
      "Faux : la StorageClass décrit un type de stockage/provisioner.",
      "Faux : volumeMount monte un volume dans un conteneur.",
    ],
    explain: "Le PVC se lie (Bound) à un PV compatible.",
    ref: K + "concepts/storage/persistent-volumes/" });

  T({ id: "th-sto-2", domain: "storage", difficulty: "medium",
    q: "Quel objet permet le provisionnement DYNAMIQUE de PV à la demande ?",
    choices: ["StorageClass", "ConfigMap", "PersistentVolume statique", "Node"], correct: [0],
    why: [
      "Correct : une StorageClass décrit un provisioner qui crée les PV automatiquement.",
      "Faux : un ConfigMap stocke de la configuration, pas du stockage.",
      "Faux : un PV statique est créé manuellement, pas dynamiquement.",
      "Faux : un Node est une machine, pas un provisionneur de volumes.",
    ],
    explain: "Un PVC référençant la StorageClass déclenche la création du PV.",
    ref: K + "concepts/storage/storage-classes/" });

  T({ id: "th-sto-3", domain: "storage", difficulty: "medium",
    q: "Quel accessMode autorise la lecture/écriture par un seul nœud à la fois ?",
    choices: ["ReadWriteOnce (RWO)", "ReadOnlyMany (ROX)", "ReadWriteMany (RWX)", "ReadWriteOncePod"], correct: [0],
    why: [
      "Correct : RWO = monté en lecture-écriture par un seul nœud.",
      "Faux : ROX = lecture seule par plusieurs nœuds.",
      "Faux : RWX = lecture-écriture par plusieurs nœuds.",
      "Faux : ReadWriteOncePod restreint à un seul Pod, plus strict que RWO.",
    ],
    explain: "Le mode conditionne combien de nœuds/Pods peuvent monter le volume.",
    ref: K + "concepts/storage/persistent-volumes/#access-modes" });

  T({ id: "th-sto-4", domain: "storage", difficulty: "hard",
    q: "Que se passe-t-il à la suppression d'un PVC si la reclaimPolicy du PV est 'Delete' ?",
    choices: ["Le PV et le stockage sous-jacent sont supprimés", "Le PV reste Available", "Rien", "Le Pod est recréé"], correct: [0],
    why: [
      "Correct : Delete supprime le PV et le volume réel sous-jacent.",
      "Faux : ce serait le cas avec Retain (le PV passe Released, pas Available).",
      "Faux : la suppression a bien un effet.",
      "Faux : la reclaimPolicy ne recrée pas de Pod.",
    ],
    explain: "Retain conserve le PV (Released) pour une récupération manuelle des données.",
    ref: K + "concepts/storage/persistent-volumes/#reclaiming" });

  T({ id: "th-sto-5", domain: "storage", difficulty: "easy",
    q: "Quel volume est éphémère, partagé entre les containers d'un Pod, effacé avec lui ?",
    choices: ["emptyDir", "hostPath", "persistentVolumeClaim", "nfs"], correct: [0],
    why: [
      "Correct : emptyDir est créé au démarrage du Pod et détruit avec lui.",
      "Faux : hostPath monte un chemin du nœud, persistant au-delà du Pod.",
      "Faux : un PVC est du stockage persistant.",
      "Faux : NFS est un stockage réseau persistant.",
    ],
    explain: "emptyDir sert de scratch/cache partagé entre containers.",
    ref: K + "concepts/storage/volumes/#emptydir" });

  T({ id: "th-sto-6", domain: "storage", difficulty: "medium",
    q: "Un PVC reste en état 'Pending'. Cause fréquente ?",
    choices: ["Aucun PV compatible ni provisionnement dynamique disponible", "Le Pod est Running", "Le namespace n'existe pas", "Trop de CPU demandé"], correct: [0],
    why: [
      "Correct : Pending = pas de PV correspondant et pas de StorageClass qui provisionne.",
      "Faux : l'état du Pod n'explique pas un PVC Pending.",
      "Faux : un PVC est créé dans un namespace existant, sinon la commande échoue.",
      "Faux : le CPU n'a rien à voir avec le stockage.",
    ],
    explain: "Vérifier taille/accessMode/storageClassName et la disponibilité d'un provisioner.",
    ref: K + "concepts/storage/persistent-volumes/#lifecycle-of-a-volume-and-claim" });

  /* ===================== TROUBLESHOOTING (30 %) ===================== */
  T({ id: "th-ts-1", domain: "troubleshooting", difficulty: "easy",
    q: "Quelle commande affiche les logs d'un container d'un Pod ?",
    choices: ["kubectl logs <pod>", "kubectl describe logs", "kubectl get logs", "kubectl trace"], correct: [0],
    why: [
      "Correct : `kubectl logs <pod> [-c ctr] [--previous]` affiche la sortie du container.",
      "Faux : `describe logs` n'existe pas.",
      "Faux : `get logs` n'existe pas (logs n'est pas une ressource).",
      "Faux : `kubectl trace` n'est pas une commande standard.",
    ],
    explain: "`--previous` lit les logs de l'instance précédente après un crash.",
    ref: K + "reference/generated/kubectl/kubectl-commands#logs" });

  T({ id: "th-ts-2", domain: "troubleshooting", difficulty: "medium",
    q: "Un Pod est en 'CrashLoopBackOff'. Que signifie cet état ?",
    choices: ["Image introuvable", "Le container démarre puis plante en boucle", "Pas de nœud disponible", "Le PVC est Pending"], correct: [1],
    why: [
      "Faux : une image introuvable donne ImagePullBackOff, pas CrashLoopBackOff.",
      "Correct : le container démarre, se termine (souvent code ≠ 0) et redémarre en boucle.",
      "Faux : l'absence de nœud donne un Pod Pending.",
      "Faux : un PVC Pending bloque le démarrage, ce n'est pas un CrashLoop.",
    ],
    explain: "Diagnostiquer via `logs --previous` et les Events du describe.",
    ref: K + "tasks/debug/debug-application/debug-pods/" });

  T({ id: "th-ts-3", domain: "troubleshooting", difficulty: "medium",
    q: "Un Pod reste 'Pending'. Quelle commande révèle le plus souvent la cause ?",
    choices: ["kubectl logs", "kubectl describe pod <pod> (Events)", "kubectl top pod", "kubectl get cm"], correct: [1],
    why: [
      "Faux : sans container démarré, il n'y a pas de logs applicatifs utiles.",
      "Correct : les Events du describe montrent FailedScheduling (ressources, taints, affinités).",
      "Faux : top affiche la conso, pas la raison du Pending.",
      "Faux : lister des ConfigMaps n'aide pas ici.",
    ],
    explain: "Ex. d'Events : 'Insufficient cpu', 'node(s) had untolerated taint'.",
    ref: K + "tasks/debug/debug-application/debug-pods/" });

  T({ id: "th-ts-4", domain: "troubleshooting", difficulty: "hard",
    q: "Le statut 'ImagePullBackOff' indique :",
    choices: ["Un crash applicatif", "L'échec du téléchargement de l'image (nom/tag/credentials)", "Un manque de CPU", "Un problème DNS interne"], correct: [1],
    why: [
      "Faux : un crash applicatif donne CrashLoopBackOff.",
      "Correct : K8s n'arrive pas à pull l'image (nom/tag erroné, registre privé, injoignable).",
      "Faux : un manque de CPU maintient le Pod Pending.",
      "Faux : le DNS interne concerne les Services, pas le pull d'image.",
    ],
    explain: "Vérifier le nom/tag et, pour un registre privé, l'imagePullSecret.",
    ref: K + "concepts/containers/images/#troubleshooting" });

  T({ id: "th-ts-5", domain: "troubleshooting", difficulty: "medium",
    q: "Un nœud est 'NotReady'. Quel service systemd vérifier en priorité sur ce nœud ?",
    choices: ["kubelet", "etcd", "kube-scheduler", "coredns"], correct: [0],
    why: [
      "Correct : le kubelet rend le nœud Ready ; `systemctl status kubelet` + journalctl.",
      "Faux : etcd tourne côté control plane.",
      "Faux : le scheduler ne s'exécute pas sur les workers.",
      "Faux : CoreDNS est un Pod, pas un service systemd du nœud.",
    ],
    explain: "Causes fréquentes : config kubelet, CNI, certificats.",
    ref: K + "tasks/debug/debug-cluster/" });

  T({ id: "th-ts-6", domain: "troubleshooting", difficulty: "medium",
    q: "Quelle commande affiche l'utilisation CPU/mémoire des Pods ?",
    choices: ["kubectl top pod", "kubectl usage", "kubectl metrics", "kubectl describe node"], correct: [0],
    why: [
      "Correct : `kubectl top pod` s'appuie sur le metrics-server.",
      "Faux : `kubectl usage` n'existe pas.",
      "Faux : `kubectl metrics` n'est pas une commande.",
      "Faux : describe node montre des infos nœud, pas la conso live des Pods.",
    ],
    explain: "Sans metrics-server installé, `kubectl top` échoue.",
    ref: K + "tasks/debug/debug-cluster/resource-usage-monitoring/" });

  T({ id: "th-ts-7", domain: "troubleshooting", difficulty: "hard",
    q: "kubectl renvoie 'connection to the server localhost:8080 was refused'. Cause typique ?",
    choices: ["Le KUBECONFIG n'est pas défini / mauvais fichier", "Le Pod est Pending", "Le Service n'a pas d'Endpoints", "Le PV est Retain"], correct: [0],
    why: [
      "Correct : sans kubeconfig valide, kubectl retombe sur localhost:8080.",
      "Faux : un Pod Pending n'affecte pas la connexion à l'API.",
      "Faux : un Service sans endpoints donne un autre symptôme (pas de trafic).",
      "Faux : la reclaimPolicy d'un PV n'a aucun lien.",
    ],
    explain: "Vérifier la variable KUBECONFIG ou ~/.kube/config.",
    ref: K + "tasks/access-application-cluster/configure-access-multiple-clusters/" });

  T({ id: "th-ts-8", domain: "troubleshooting", difficulty: "medium",
    q: "Pour voir les événements récents d'un namespace triés par date :",
    choices: ["kubectl get events --sort-by=.metadata.creationTimestamp", "kubectl logs --all", "kubectl describe ns", "kubectl top events"], correct: [0],
    why: [
      "Correct : trie les events par date pour corréler les incidents (ajouter -A pour tout).",
      "Faux : `logs --all` n'est pas valide ainsi.",
      "Faux : describe ns décrit le namespace, pas la chronologie des events.",
      "Faux : `top events` n'existe pas.",
    ],
    explain: "C'est le réflexe pour retracer ce qui s'est passé récemment.",
    ref: K + "tasks/debug/debug-application/" });

  T({ id: "th-ts-9", domain: "troubleshooting", difficulty: "hard",
    q: "Un container manque d'outils réseau pour déboguer sans le redéployer. Quelle fonctionnalité ?",
    choices: ["kubectl debug (ephemeral container)", "kubectl exec --root", "kubectl cp", "kubectl attach"], correct: [0],
    why: [
      "Correct : `kubectl debug` injecte un ephemeral container partageant les namespaces.",
      "Faux : `exec --root` n'ajoute pas d'outils absents de l'image.",
      "Faux : `cp` copie des fichiers, il n'ouvre pas d'outils de debug.",
      "Faux : `attach` se connecte au process existant, sans nouveaux outils.",
    ],
    explain: "Ex. : `kubectl debug -it <pod> --image=busybox --target=<ctr>`.",
    ref: K + "tasks/debug/debug-application/debug-running-pod/" });

  T({ id: "th-ts-10", domain: "troubleshooting", difficulty: "easy",
    q: "Quelle commande ouvre un shell interactif dans un container en cours d'exécution ?",
    choices: ["kubectl exec -it <pod> -- sh", "kubectl shell <pod>", "kubectl run -it", "kubectl ssh <pod>"], correct: [0],
    why: [
      "Correct : `kubectl exec -it <pod> [-c ctr] -- sh` ouvre un shell dans le container existant.",
      "Faux : `kubectl shell` n'existe pas.",
      "Faux : `kubectl run -it` crée un NOUVEAU Pod, il n'entre pas dans l'existant.",
      "Faux : `kubectl ssh` n'existe pas.",
    ],
    explain: "Utiliser `-c <container>` si le Pod a plusieurs containers.",
    ref: K + "tasks/debug/debug-application/get-shell-running-container/" });
})();
