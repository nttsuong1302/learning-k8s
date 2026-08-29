// Lot 7 : +50 questions théoriques sourcées sur kubernetes.io (scan de la doc).
// Chaque question porte why[] par option, explain (synthèse) et ref (doc officielle),
// plus la traduction en:{q,choices}. Répartition par pondération CKA.
(function () {
  const Q = window.CKA.questions;
  const DATA = [
{
  "id": "t7-a1",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Quelle commande kubeadm permet de lister les images de conteneurs qui seront utilisées lors de l'initialisation du cluster, sans les télécharger ?",
  "choices": [
    "kubeadm config images list",
    "kubeadm config images pull",
    "kubeadm init --dry-run",
    "kubeadm config print init-defaults"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : cette commande imprime la liste des images requises par kubeadm.",
    "Incorrect : `pull` télécharge réellement les images depuis le registre.",
    "Incorrect : ce n'est pas l'usage documenté de `--dry-run` pour lister les images.",
    "Incorrect : cette commande affiche la configuration par défaut, pas la liste d'images."
  ],
  "explain": "`kubeadm config images list` imprime la liste des images qu'utilisera kubeadm ; on peut cibler une version avec `--kubernetes-version` ou un registre avec `--image-repository`. `kubeadm config images pull` accepte les mêmes options mais télécharge réellement les images (utile pour préparer un environnement air-gapped).",
  "ref": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-config/",
  "en": {
    "q": "Which kubeadm command prints the list of container images that will be used during cluster initialization, without downloading them?",
    "choices": [
      "kubeadm config images list",
      "kubeadm config images pull",
      "kubeadm init --dry-run",
      "kubeadm config print init-defaults"
    ]
  }
},
{
  "id": "t7-a10",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Quel flag du kubelet est utilisé pour spécifier l'endpoint (socket) du runtime de conteneurs conforme CRI, par exemple `unix:///run/containerd/containerd.sock` pour containerd ?",
  "choices": [
    "--container-runtime-endpoint",
    "--docker-endpoint",
    "--cri-socket",
    "--runtime-request-timeout"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est le flag documenté pour indiquer au kubelet le socket CRI à utiliser.",
    "Incorrect : ce flag n'existe pas dans l'API du kubelet (Docker n'est plus supporté via dockershim).",
    "Incorrect : `--cri-socket` est un flag de kubeadm, pas du kubelet.",
    "Incorrect : ce flag existe mais définit un délai d'attente, pas l'endpoint du runtime."
  ],
  "explain": "Le kubelet communique avec le runtime de conteneurs via le Container Runtime Interface (CRI). On indique le socket à utiliser avec `--container-runtime-endpoint`, par exemple `unix:///run/containerd/containerd.sock` pour containerd (chemin par défaut sous Linux) ou `unix:///run/crio/crio.sock` pour CRI-O. Depuis Kubernetes v1.26, seule la v1 de l'API CRI est supportée : sans elle, le kubelet ne peut pas s'enregistrer comme nœud.",
  "ref": "https://kubernetes.io/docs/setup/production-environment/container-runtimes/",
  "en": {
    "q": "Which kubelet flag is used to specify the endpoint (socket) of the CRI-conformant container runtime, e.g. `unix:///run/containerd/containerd.sock` for containerd?",
    "choices": [
      "--container-runtime-endpoint",
      "--docker-endpoint",
      "--cri-socket",
      "--runtime-request-timeout"
    ]
  }
},
{
  "id": "t7-a11",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Concernant les device plugins Kubernetes (utilisés pour exposer des ressources matérielles spécialisées comme les GPU), quelles affirmations sont correctes (plusieurs réponses) ?",
  "choices": [
    "Un device plugin s'enregistre auprès du kubelet via le service gRPC de Registration, en se connectant au socket /var/lib/kubelet/device-plugins/kubelet.sock",
    "Les ressources qu'il annonce suivent le schéma de nommage vendor-domain/resourcetype, par exemple nvidia.com/gpu",
    "Un même device peut être partagé (overcommit) entre plusieurs conteneurs en fractionnant sa capacité",
    "Le plugin doit démarrer son propre service gRPC AVANT de s'enregistrer auprès du kubelet"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : c'est le mécanisme documenté d'enregistrement du device plugin.",
    "Correct : c'est le format de nommage documenté des extended resources.",
    "Incorrect : la doc précise que les devices ne peuvent pas être partagés ni fractionnés, uniquement alloués en nombre entier.",
    "Correct : la doc précise explicitement que le plugin doit servir son service gRPC avant de s'enregistrer, sous peine d'échec de l'enregistrement."
  ],
  "explain": "Un device plugin démarre un service gRPC sous /var/lib/kubelet/device-plugins/, puis s'enregistre auprès du kubelet en se connectant au socket kubelet.sock du même répertoire (le plugin DOIT servir son service avant de s'enregistrer). Les ressources sont annoncées selon le schéma vendor-domain/resourcetype (ex. nvidia.com/gpu) et sont toujours allouées en entiers, sans surallocation ni partage entre conteneurs.",
  "ref": "https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/",
  "en": {
    "q": "Regarding Kubernetes device plugins (used to expose specialized hardware resources such as GPUs), which statements are correct (select all that apply)?",
    "choices": [
      "A device plugin registers with the kubelet via the Registration gRPC service, connecting to the /var/lib/kubelet/device-plugins/kubelet.sock socket",
      "The resources it advertises follow the vendor-domain/resourcetype naming scheme, e.g. nvidia.com/gpu",
      "A single device can be shared (overcommitted) between multiple containers by fractioning its capacity",
      "The plugin must start its own gRPC service BEFORE registering with the kubelet"
    ]
  }
},
{
  "id": "t7-a12",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Concernant le champ `globalDefault` d'un objet PriorityClass, quelles affirmations sont correctes (plusieurs réponses) ?",
  "choices": [
    "Sa valeur est utilisée comme priorité par défaut pour les Pods qui ne spécifient pas de priorityClassName",
    "Un seul PriorityClass avec globalDefault=true peut exister dans le système",
    "Ajouter un PriorityClass globalDefault modifie rétroactivement la priorité des Pods déjà en cours d'exécution",
    "En l'absence de tout PriorityClass globalDefault, un Pod sans priorityClassName reçoit une priorité de zéro"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : c'est la définition documentée du champ globalDefault.",
    "Correct : la doc précise qu'un seul PriorityClass avec globalDefault=true peut exister.",
    "Incorrect : la doc précise explicitement que l'ajout d'un globalDefault ne modifie pas la priorité des Pods déjà créés, seulement celle des Pods créés après coup.",
    "Correct : sans PriorityClass globalDefault, la priorité par défaut des Pods sans priorityClassName est zéro."
  ],
  "explain": "Le champ `globalDefault` d'une PriorityClass indique que sa valeur doit servir de priorité par défaut aux Pods sans `priorityClassName`. Un seul PriorityClass globalDefault=true peut exister dans le cluster. La documentation précise aussi que l'ajout d'un tel PriorityClass ne change pas la priorité des Pods déjà existants (seulement celle des Pods créés ensuite), et qu'en l'absence de globalDefault, les Pods sans priorityClassName reçoivent une priorité de zéro.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/",
  "en": {
    "q": "Regarding the `globalDefault` field of a PriorityClass object, which statements are correct (select all that apply)?",
    "choices": [
      "Its value is used as the default priority for Pods that don't specify a priorityClassName",
      "Only one PriorityClass with globalDefault=true can exist in the system",
      "Adding a globalDefault PriorityClass retroactively changes the priority of Pods already running",
      "With no globalDefault PriorityClass at all, a Pod without priorityClassName gets a priority of zero"
    ]
  }
},
{
  "id": "t7-a2",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Parmi les éléments suivants, lesquels ne sont PAS supprimés/nettoyés automatiquement par `kubeadm reset` sur un nœud (plusieurs réponses) ?",
  "choices": [
    "La configuration CNI dans /etc/cni/net.d",
    "Les fichiers sous /etc/kubernetes/",
    "Les règles iptables/IPVS installées par kube-proxy",
    "Le fichier kubeconfig $HOME/.kube/config"
  ],
  "correct": [
    0,
    2,
    3
  ],
  "why": [
    "Correct : la doc précise que la configuration CNI doit être nettoyée manuellement.",
    "Incorrect : les fichiers sous /etc/kubernetes/ (certificats, manifests...) sont bien nettoyés par kubeadm reset.",
    "Correct : les règles réseau posées par kube-proxy ne sont pas supprimées par reset.",
    "Correct : le kubeconfig utilisateur n'est pas supprimé, il reste valide et doit être retiré manuellement."
  ],
  "explain": "`kubeadm reset` fait un « best-effort » de retour en arrière : il nettoie les fichiers créés par kubeadm sous /etc/kubernetes/ et retire le membre etcd local, mais la doc précise explicitement qu'il NE nettoie PAS la configuration CNI, ni les règles iptables/IPVS de kube-proxy, ni le kubeconfig $HOME/.kube/config — ces éléments demandent un nettoyage manuel.",
  "ref": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-reset/",
  "en": {
    "q": "Which of the following are NOT automatically removed/cleaned up by `kubeadm reset` on a node (select all that apply)?",
    "choices": [
      "The CNI configuration under /etc/cni/net.d",
      "Files under /etc/kubernetes/",
      "The iptables/IPVS rules installed by kube-proxy",
      "The $HOME/.kube/config kubeconfig file"
    ]
  }
},
{
  "id": "t7-a3",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "À quoi sert la phase `upload-config` de `kubeadm init` ?",
  "choices": [
    "Elle télécharge les images de conteneurs nécessaires au control plane",
    "Elle sauvegarde la configuration utilisée pour kubeadm et pour le kubelet dans des ConfigMaps du cluster",
    "Elle envoie les certificats vers un Secret pour les autres control-plane nodes",
    "Elle installe les add-ons DNS et kube-proxy"
  ],
  "correct": [
    1
  ],
  "why": [
    "Incorrect : ce n'est pas le rôle de cette phase, il n'y a pas de téléchargement d'images ici.",
    "Correct : la phase upload-config comporte deux sous-phases (kubeadm et kubelet) qui sauvegardent la configuration dans des ConfigMaps.",
    "Incorrect : c'est le rôle de la phase/flag `upload-certs`, pas `upload-config`.",
    "Incorrect : c'est le rôle de la phase `addon`."
  ],
  "explain": "La phase `upload-config` de `kubeadm init` comporte deux sous-phases : `upload-config kubeadm`, qui enregistre la configuration kubeadm utilisée dans un ConfigMap, et `upload-config kubelet`, qui enregistre la configuration du kubelet dans un ConfigMap, afin qu'elles puissent être consultées ultérieurement (par exemple pour joindre d'autres nœuds ou faire un upgrade).",
  "ref": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init-phase/",
  "en": {
    "q": "What does the `upload-config` phase of `kubeadm init` do?",
    "choices": [
      "It downloads the container images needed by the control plane",
      "It saves the configuration used for kubeadm and for the kubelet into ConfigMaps in the cluster",
      "It uploads certificates into a Secret for the other control-plane nodes",
      "It installs the DNS and kube-proxy add-ons"
    ]
  }
},
{
  "id": "t7-a4",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Qu'est-ce qu'un objet `StorageVersionMigration` (API group `storagemigration.k8s.io`) permet de faire ?",
  "choices": [
    "Migrer les données stockées dans etcd d'une ressource vers la version de stockage préférée actuelle (par exemple après un changement de schéma ou une rotation de clé de chiffrement)",
    "Sauvegarder et restaurer un snapshot complet d'etcd",
    "Convertir automatiquement les manifests YAML d'une ancienne apiVersion vers une nouvelle avant application",
    "Basculer etcd d'une topologie stacked vers une topologie externe"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est exactement le rôle documenté de la ressource StorageVersionMigration.",
    "Incorrect : la sauvegarde/restauration d'etcd se fait via etcdctl/etcdutl snapshot, pas via cette ressource.",
    "Incorrect : ce n'est pas un outil de conversion de manifests côté client.",
    "Incorrect : cette ressource ne change pas la topologie de déploiement d'etcd."
  ],
  "explain": "Kubernetes doit parfois ré-écrire activement des objets stockés dans etcd pour des opérations de maintenance : changement de version de stockage préférée pour une ressource, ou rotation des clés de chiffrement au repos. On déclare un objet `StorageVersionMigration` (apiVersion `storagemigration.k8s.io/v1`) ciblant un `group`/`resource`, et son `status.conditions` indique la progression (`Running`, `Succeeded`). Nécessite le feature gate `StorageVersionMigrator`.",
  "ref": "https://kubernetes.io/docs/tasks/manage-kubernetes-objects/storage-version-migration/",
  "en": {
    "q": "What does a `StorageVersionMigration` object (API group `storagemigration.k8s.io`) let you do?",
    "choices": [
      "Migrate the data stored in etcd for a resource to the current preferred storage version (for example after a schema change or an encryption key rotation)",
      "Back up and restore a full etcd snapshot",
      "Automatically convert YAML manifests from an old apiVersion to a new one before applying them",
      "Switch etcd from a stacked topology to an external topology"
    ]
  }
},
{
  "id": "t7-a5",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Selon la politique de dépréciation des API Kubernetes, une fois qu'une version API **beta** (ex. v1beta1) est dépréciée, pendant combien de temps minimum doit-elle rester supportée avant de pouvoir être supprimée ?",
  "choices": [
    "9 mois ou 3 releases mineures après la dépréciation, selon la plus longue des deux durées",
    "Elle peut être supprimée immédiatement dans la release suivante",
    "1 mois, le temps de publier un correctif",
    "Indéfiniment : une API beta ne peut jamais être supprimée"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est la règle documentée pour la durée de support minimale après dépréciation d'une API beta.",
    "Incorrect : une suppression immédiate violerait la politique de dépréciation.",
    "Incorrect : la durée minimale documentée est bien plus longue qu'un mois.",
    "Incorrect : contrairement aux API GA, les API beta peuvent bien être supprimées après la période de support."
  ],
  "explain": "La politique de dépréciation des API Kubernetes prévoit que les API beta doivent être supportées pendant 9 mois ou 3 releases mineures après leur introduction (la plus longue des deux), et une fois dépréciées, elles ne sont supprimées qu'après une période équivalente de dépréciation. Les API GA (v1), elles, ne sont jamais supprimées au sein d'une même version majeure ; les API alpha peuvent être supprimées sans préavis.",
  "ref": "https://kubernetes.io/docs/reference/using-api/deprecation-policy/",
  "en": {
    "q": "Under the Kubernetes API deprecation policy, once a beta API version (e.g. v1beta1) is deprecated, what is the minimum time it must remain supported before it can be removed?",
    "choices": [
      "9 months or 3 minor releases after deprecation, whichever is longer",
      "It can be removed immediately in the very next release",
      "1 month, to allow a patch release",
      "Indefinitely: a beta API can never be removed"
    ]
  }
},
{
  "id": "t7-a6",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Concernant l'extension de l'API Kubernetes, quelle affirmation distingue correctement un extension API server (enregistré via un objet `APIService`, couche d'agrégation) d'une CustomResourceDefinition (CRD) ?",
  "choices": [
    "Un extension API server est un service séparé que le kube-apiserver proxy via un objet APIService, tandis qu'une CRD est gérée directement par le kube-apiserver sans déploiement séparé",
    "Une CRD nécessite obligatoirement le déploiement d'un service HTTPS séparé, contrairement à un extension API server",
    "Un objet APIService ne peut être utilisé que pour des ressources déjà définies comme CRD",
    "Les CRD et les extension API servers utilisent tous deux obligatoirement etcd comme backend de stockage personnalisé"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est la distinction fondamentale documentée entre les deux mécanismes d'extension.",
    "Incorrect : c'est l'inverse, c'est l'extension API server qui nécessite un service séparé avec certificats.",
    "Incorrect : un APIService sert justement à enregistrer un serveur d'API personnalisé indépendant des CRD.",
    "Incorrect : un extension API server peut utiliser un backend de stockage totalement différent d'etcd."
  ],
  "explain": "Avec la couche d'agrégation, on déploie son propre serveur d'API (comme un Service Kubernetes avec certificats HTTPS) puis on l'enregistre via un objet `APIService` : le kube-apiserver proxy alors les requêtes vers ce service. Une CRD, elle, ne nécessite aucun service séparé : le kube-apiserver gère directement le stockage (etcd) et la validation de schéma pour la ressource personnalisée, ce qui la rend beaucoup plus simple à mettre en œuvre mais moins flexible qu'un extension API server pour de la logique/stockage personnalisés.",
  "ref": "https://kubernetes.io/docs/tasks/extend-kubernetes/setup-extension-api-server/",
  "en": {
    "q": "Regarding Kubernetes API extension, which statement correctly distinguishes an extension API server (registered via an `APIService` object, aggregation layer) from a CustomResourceDefinition (CRD)?",
    "choices": [
      "An extension API server is a separate service that the kube-apiserver proxies to via an APIService object, while a CRD is handled directly by the kube-apiserver with no separate deployment",
      "A CRD requires deploying a separate HTTPS service, unlike an extension API server",
      "An APIService object can only be used for resources that are already defined as a CRD",
      "Both CRDs and extension API servers always require etcd as a custom storage backend"
    ]
  }
},
{
  "id": "t7-a7",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Dans la `LeaderElectionConfiguration` utilisée par les composants du control plane (kube-scheduler, kube-controller-manager) pour l'élection de leader via des objets Lease, à quoi correspond le champ `leaseDuration` ?",
  "choices": [
    "La durée pendant laquelle les candidats non-leaders attendent, après avoir constaté l'absence de renouvellement, avant de tenter d'acquérir le leadership — c'est-à-dire la durée maximale pendant laquelle un leader arrêté peut rester non remplacé",
    "L'intervalle entre deux tentatives de renouvellement du leadership par le leader en place",
    "La durée pendant laquelle un client attend entre deux tentatives d'acquisition ou de renouvellement du leadership",
    "La durée de validité du certificat TLS utilisé par le composant pour s'authentifier auprès de l'API server"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est la définition documentée du champ leaseDuration.",
    "Incorrect : cette définition correspond au champ renewDeadline.",
    "Incorrect : cette définition correspond au champ retryPeriod.",
    "Incorrect : leaseDuration concerne l'élection de leader, pas la validité d'un certificat TLS."
  ],
  "explain": "La `LeaderElectionConfiguration` documente trois durées : `leaseDuration` (durée max. avant qu'un leader arrêté soit remplacé par un autre candidat), `renewDeadline` (intervalle pendant lequel le leader en place tente de renouveler son bail avant d'abandonner, doit être inférieur ou égal à leaseDuration) et `retryPeriod` (durée d'attente des clients entre deux tentatives d'acquisition/renouvellement). Ces paramètres s'appliquent uniquement si l'élection de leader est activée.",
  "ref": "https://kubernetes.io/docs/reference/config-api/kube-scheduler-config.v1/",
  "en": {
    "q": "In the `LeaderElectionConfiguration` used by control plane components (kube-scheduler, kube-controller-manager) for Lease-based leader election, what does the `leaseDuration` field represent?",
    "choices": [
      "The duration that non-leader candidates wait, after observing no renewal, before attempting to acquire leadership — i.e. the maximum time a stopped leader can go unreplaced",
      "The interval between renewal attempts by the current leader",
      "The duration a client waits between attempts to acquire or renew leadership",
      "The validity period of the TLS certificate the component uses to authenticate to the API server"
    ]
  }
},
{
  "id": "t7-a8",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Quel problème NodeLocal DNSCache résout-il principalement dans un cluster Kubernetes ?",
  "choices": [
    "Il réduit la latence et les problèmes liés aux entrées de conntrack en faisant tourner un cache DNS local sur chaque nœud, évitant que les Pods à fort débit de requêtes DNS ne dépendent d'un Pod CoreDNS potentiellement sur un autre nœud",
    "Il remplace complètement CoreDNS et gère seul toute la résolution DNS externe du cluster",
    "Il chiffre les requêtes DNS internes entre les Pods et le control plane",
    "Il attribue automatiquement une adresse IP statique à chaque Service de type ClusterIP"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est exactement l'objectif documenté de NodeLocal DNSCache.",
    "Incorrect : NodeLocal DNSCache s'appuie sur CoreDNS en cas de cache miss, il ne le remplace pas.",
    "Incorrect : ce n'est pas un mécanisme de chiffrement des requêtes DNS.",
    "Incorrect : cela n'a rien à voir avec l'attribution des ClusterIP."
  ],
  "explain": "NodeLocal DNSCache déploie un agent CoreDNS en mode cache sous forme de DaemonSet sur chaque nœud. Les Pods interrogent ce cache local (via une adresse locale, évitant les règles DNAT/conntrack de kube-proxy) plutôt que le Service CoreDNS distant ; en cas de cache miss, l'agent local interroge le Service CoreDNS via TCP, ce qui limite les timeouts UDP coûteux (jusqu'à 30 s) et réduit la latence et la charge sur conntrack.",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/",
  "en": {
    "q": "What problem does NodeLocal DNSCache mainly solve in a Kubernetes cluster?",
    "choices": [
      "It reduces latency and conntrack issues by running a local DNS cache on each node, so that Pods with a high DNS query rate don't depend on a CoreDNS Pod that might be on a different node",
      "It completely replaces CoreDNS and handles all external DNS resolution for the cluster on its own",
      "It encrypts internal DNS queries between Pods and the control plane",
      "It automatically assigns a static IP address to every ClusterIP Service"
    ]
  }
},
{
  "id": "t7-a9",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Si un paramètre du kubelet est défini à la fois dans un fichier `KubeletConfiguration` (via `--config`) et comme flag en ligne de commande, lequel prévaut ?",
  "choices": [
    "Le flag en ligne de commande, qui a une priorité plus haute que le fichier de configuration",
    "Le fichier de configuration prévaut toujours sur les flags",
    "Le kubelet refuse de démarrer en cas de conflit entre les deux",
    "C'est la valeur la plus restrictive des deux qui est appliquée automatiquement"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc précise explicitement que les flags en ligne de commande écrasent la valeur définie dans le fichier de configuration.",
    "Incorrect : c'est l'inverse qui est documenté.",
    "Incorrect : le kubelet ne refuse pas de démarrer, il applique une règle de priorité.",
    "Incorrect : il n'y a pas de logique de fusion « valeur la plus restrictive », c'est une priorité stricte."
  ],
  "explain": "La documentation indique que les flags en ligne de commande qui ciblent la même valeur qu'un fichier de configuration écrasent (override) cette valeur, afin de préserver la compatibilité ascendante avec l'API en ligne de commande historique du kubelet. L'ordre de priorité (du plus bas au plus haut) est : feature gates en ligne de commande, KubeletConfiguration, fichiers de configuration en drop-in, puis les arguments en ligne de commande (hors feature gates), qui ont la priorité la plus haute.",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/",
  "en": {
    "q": "If a kubelet parameter is set both in a `KubeletConfiguration` file (via `--config`) and as a command-line flag, which one wins?",
    "choices": [
      "The command-line flag, which has higher precedence than the config file",
      "The config file always wins over flags",
      "The kubelet refuses to start when there is a conflict between the two",
      "The most restrictive of the two values is applied automatically"
    ]
  }
},
{
  "id": "t7-w1",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Un Pod existant, sans ownerReference de type Controller, porte les mêmes labels que le sélecteur d'un ReplicaSet nouvellement créé. Que se passe-t-il d'après la documentation ?",
  "choices": [
    "Le ReplicaSet ignore ce Pod car il existait avant lui",
    "Le ReplicaSet acquiert immédiatement le Pod et devient son propriétaire via le champ ownerReferences du Pod",
    "Kubernetes refuse la création du ReplicaSet tant que ce Pod existe",
    "Le Pod est automatiquement supprimé puis recréé à l'identique par le ReplicaSet"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : un Pod sans owner Controller qui correspond au sélecteur n'est pas ignoré, il est acquis.",
    "Correct : la doc précise qu'un Pod sans OwnerReference (ou dont l'owner n'est pas un Controller) qui correspond au sélecteur du ReplicaSet est immédiatement acquis par celui-ci.",
    "Faux : rien n'empêche la création du ReplicaSet, l'acquisition se fait ensuite automatiquement.",
    "Faux : le Pod existant est adopté tel quel, il n'est ni supprimé ni recréé lors de l'acquisition."
  ],
  "explain": "Un ReplicaSet identifie les Pods à acquérir grâce à son sélecteur de labels. Si un Pod n'a pas d'OwnerReference, ou si son owner n'est pas un Controller, et qu'il correspond au sélecteur, il est immédiatement acquis par le ReplicaSet : le champ metadata.ownerReferences du Pod est alors renseigné avec les informations du ReplicaSet propriétaire.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/",
  "en": {
    "q": "An existing Pod, with no Controller ownerReference, carries the same labels as a newly created ReplicaSet's selector. What happens according to the documentation?",
    "choices": [
      "The ReplicaSet ignores the Pod because it existed before it",
      "The ReplicaSet immediately acquires the Pod and becomes its owner via the Pod's ownerReferences field",
      "Kubernetes refuses to create the ReplicaSet while this Pod exists",
      "The Pod is automatically deleted and recreated identically by the ReplicaSet"
    ]
  }
},
{
  "id": "t7-w2",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Concernant les champs requests et limits d'un conteneur, quelle affirmation est correcte selon la documentation ?",
  "choices": [
    "Le kube-scheduler utilise les limits pour choisir le nœud d'exécution du Pod",
    "Le kube-scheduler utilise les requests pour choisir le nœud, et le kubelet fait respecter les limits",
    "Le kubelet fait respecter les requests, et le scheduler se base sur les limits",
    "Requests et limits sont utilisés indifféremment par le scheduler pour la planification"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est la request, pas la limit, que le scheduler exploite pour placer le Pod.",
    "Correct : la doc indique que le kube-scheduler utilise la request pour décider sur quel nœud placer le Pod, tandis que le kubelet fait respecter la limit.",
    "Faux : c'est l'inverse — le scheduler se base sur les requests, pas sur les limits.",
    "Faux : seules les requests entrent dans la décision de placement du scheduler."
  ],
  "explain": "Quand une resource request est spécifiée pour un conteneur, le kube-scheduler l'utilise pour décider sur quel nœud placer le Pod (le kubelet réserve au moins ce montant pour le conteneur). Quand une resource limit est spécifiée, c'est le kubelet (avec le container runtime) qui l'applique afin que le conteneur en cours d'exécution ne dépasse pas cette valeur, l'application finale étant assurée par le noyau.",
  "ref": "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
  "en": {
    "q": "Regarding a container's requests and limits fields, which statement is correct according to the documentation?",
    "choices": [
      "The kube-scheduler uses limits to choose which node runs the Pod",
      "The kube-scheduler uses requests to choose the node, and the kubelet enforces limits",
      "The kubelet enforces requests, and the scheduler relies on limits",
      "Requests and limits are used interchangeably by the scheduler for placement"
    ]
  }
},
{
  "id": "t7-w3",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Concernant les deux types de nodeAffinity, quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "requiredDuringSchedulingIgnoredDuringExecution empêche la planification du Pod si la règle n'est satisfaite par aucun nœud",
    "preferredDuringSchedulingIgnoredDuringExecution empêche aussi la planification si aucun nœud ne correspond à la règle",
    "Pour preferredDuringSchedulingIgnoredDuringExecution, on peut définir un poids (weight) compris entre 1 et 100 pour chaque règle",
    "IgnoredDuringExecution signifie que le Pod est expulsé si les labels du nœud changent après sa planification"
  ],
  "correct": [
    0,
    2
  ],
  "why": [
    "Correct : la doc dit explicitement que le scheduler ne peut pas planifier le Pod tant que la règle required n'est pas satisfaite.",
    "Faux : avec preferred, le scheduler essaie de trouver un nœud correspondant mais planifie quand même le Pod si aucun n'est trouvé.",
    "Correct : un weight entre 1 et 100 peut être attribué à chaque règle preferred, la somme des poids des règles satisfaites s'ajoutant au score du nœud.",
    "Faux : IgnoredDuringExecution signifie au contraire que si les labels du nœud changent après la planification, le Pod continue de tourner sans être expulsé."
  ],
  "explain": "requiredDuringSchedulingIgnoredDuringExecution est une contrainte dure : sans nœud satisfaisant la règle, le Pod n'est pas planifié. preferredDuringSchedulingIgnoredDuringExecution est une contrainte souple : le scheduler tente de satisfaire la préférence (pondérée par un weight de 1 à 100 qui s'ajoute au score du nœud) mais planifie le Pod même en son absence. Dans les deux cas, IgnoredDuringExecution signifie qu'un changement de labels du nœud après la planification n'affecte pas un Pod déjà en cours d'exécution.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/",
  "en": {
    "q": "Regarding the two types of nodeAffinity, which statements are correct? (multiple answers)",
    "choices": [
      "requiredDuringSchedulingIgnoredDuringExecution prevents the Pod from being scheduled if no node satisfies the rule",
      "preferredDuringSchedulingIgnoredDuringExecution also prevents scheduling if no node matches the rule",
      "For preferredDuringSchedulingIgnoredDuringExecution, you can set a weight between 1 and 100 for each rule",
      "IgnoredDuringExecution means the Pod is evicted if the node's labels change after it was scheduled"
    ]
  }
},
{
  "id": "t7-w4",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Que permet la podAffinity, par opposition à la podAntiAffinity, d'après la documentation ?",
  "choices": [
    "D'empêcher deux Pods d'être planifiés sur le même nœud",
    "De contraindre la planification d'un Pod en fonction des labels d'autres Pods déjà présents dans un domaine topologique (par ex. le même nœud), afin de favoriser leur co-localisation",
    "De réserver un nœud exclusivement à un seul Pod",
    "De définir un ordre de priorité de planification entre plusieurs Pods"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le rôle de la podAntiAffinity, pas de la podAffinity.",
    "Correct : la podAffinity utilise les labels d'autres Pods pour définir des règles de co-localisation dans un domaine topologique donné.",
    "Faux : la podAffinity ne réserve pas un nœud exclusivement, elle influence le placement relatif des Pods.",
    "Faux : ce n'est pas un mécanisme de PriorityClass, mais une contrainte de planification basée sur les labels d'autres Pods."
  ],
  "explain": "L'inter-pod affinity/anti-affinity permet de contraindre un Pod en fonction des labels d'autres Pods s'exécutant sur un nœud (ou un autre domaine topologique), plutôt que sur les seuls labels du nœud. La podAffinity sert à définir quels Pods peuvent être co-localisés, contrairement à la podAntiAffinity qui vise l'effet inverse.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity",
  "en": {
    "q": "What does podAffinity allow, as opposed to podAntiAffinity, according to the documentation?",
    "choices": [
      "Preventing two Pods from being scheduled on the same node",
      "Constraining a Pod's scheduling based on the labels of other Pods already running in a topology domain (e.g. the same node), to favor their co-location",
      "Reserving a node exclusively for a single Pod",
      "Defining a scheduling priority order between several Pods"
    ]
  }
},
{
  "id": "t7-w5",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Un Pod utilise une RuntimeClass dont le champ overhead.podFixed déclare 250m de CPU et 120Mi de mémoire. Les conteneurs du Pod demandent au total 2000m de CPU et 200Mi de mémoire en requests. Que fait le scheduler d'après la documentation ?",
  "choices": [
    "Il ignore l'overhead et ne prend en compte que 2000m de CPU et 200Mi de mémoire",
    "Il additionne l'overhead aux requests des conteneurs et cherche un nœud disposant d'au moins 2250m de CPU et 320Mi de mémoire disponibles",
    "Il soustrait l'overhead des requests des conteneurs avant de chercher un nœud",
    "L'overhead n'est jamais pris en compte par le scheduler, seulement par le kubelet lors de l'éviction"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : l'overhead du Pod est bien pris en compte en plus des requests, il n'est pas ignoré.",
    "Correct : la doc précise que l'overhead du Pod s'ajoute à la somme des requests des conteneurs lors de la planification, le scheduler cherchant ici un nœud avec 2,25 CPU et 320Mi de mémoire disponibles.",
    "Faux : l'overhead s'ajoute, il ne se soustrait pas.",
    "Faux : l'overhead est pris en compte à la fois par le scheduler pour le placement, et par le kubelet pour le dimensionnement du cgroup et le classement lors des évictions."
  ],
  "explain": "Le Pod Overhead représente les ressources consommées par l'infrastructure du Pod en plus des requests/limits des conteneurs ; il est défini au niveau de la RuntimeClass (overhead.podFixed) et appliqué au moment de l'admission. Lors de la planification, le scheduler additionne cet overhead à la somme des requests des conteneurs pour déterminer les ressources totales nécessaires sur le nœud cible.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/pod-overhead/",
  "en": {
    "q": "A Pod uses a RuntimeClass whose overhead.podFixed field declares 250m CPU and 120Mi memory. The Pod's containers request a total of 2000m CPU and 200Mi memory. What does the scheduler do according to the documentation?",
    "choices": [
      "It ignores the overhead and only accounts for 2000m CPU and 200Mi memory",
      "It adds the overhead to the containers' requests and looks for a node with at least 2250m CPU and 320Mi memory available",
      "It subtracts the overhead from the containers' requests before finding a node",
      "The overhead is never considered by the scheduler, only by the kubelet during eviction"
    ]
  }
},
{
  "id": "t7-w6",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "À quoi sert le champ .spec.schedulingGates d'un Pod ?",
  "choices": [
    "Il limite le nombre de nœuds éligibles pour la planification du Pod",
    "Il contient une liste de critères devant tous être retirés avant que le Pod soit considéré comme planifiable par le scheduler",
    "Il définit un délai après lequel le Pod est supprimé s'il n'a pas été planifié",
    "Il empêche la suppression du Pod tant que celui-ci n'est pas Ready"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : les schedulingGates ne restreignent pas un ensemble de nœuds, ils bloquent la planification elle-même.",
    "Correct : chaque chaîne du champ schedulingGates est un critère que le Pod doit satisfaire (via le retrait de la gate) avant d'être considéré comme planifiable.",
    "Faux : rien dans la doc n'associe schedulingGates à une suppression automatique après délai.",
    "Faux : ce champ concerne la planification, pas la protection contre la suppression."
  ],
  "explain": "En spécifiant ou en retirant les entrées de .spec.schedulingGates, on contrôle quand un Pod est prêt à être considéré pour la planification : tant qu'au moins une gate est présente, le Pod reste à l'état SchedulingGated et le scheduler ne le traite pas. Le champ ne peut être initialisé qu'à la création du Pod ; ensuite, les gates peuvent être retirées dans n'importe quel ordre, mais il est interdit d'en ajouter de nouvelles.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/pod-scheduling-readiness/",
  "en": {
    "q": "What is the .spec.schedulingGates field of a Pod used for?",
    "choices": [
      "It limits the number of nodes eligible for scheduling the Pod",
      "It holds a list of criteria that must all be removed before the Pod is considered schedulable by the scheduler",
      "It defines a deadline after which the Pod is deleted if it has not been scheduled",
      "It prevents the Pod from being deleted until it becomes Ready"
    ]
  }
},
{
  "id": "t7-w7",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Concernant le champ .spec.timeZone d'un CronJob, quelle affirmation est correcte d'après la documentation ?",
  "choices": [
    "S'il n'est pas renseigné, le planning est interprété selon le fuseau horaire local du kube-controller-manager",
    "Il accepte n'importe quelle chaîne libre, sans validation particulière",
    "Il est obligatoire pour tout CronJob depuis la création de cette ressource",
    "Il ne peut être défini qu'une seule fois pour l'ensemble du cluster, pas par CronJob"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc indique que pour les CronJobs sans fuseau horaire spécifié, le kube-controller-manager interprète le planning selon son propre fuseau horaire local.",
    "Faux : la valeur doit être le nom d'un fuseau horaire valide de la base IANA, ce n'est pas une chaîne libre.",
    "Faux : le champ est optionnel, avec le repli décrit ci-dessus s'il est absent.",
    "Faux : timeZone se configure au niveau de chaque CronJob, dans son .spec."
  ],
  "explain": "Le champ .spec.timeZone permet de préciser, pour un CronJob donné, le nom d'un fuseau horaire valide de la base de données IANA (par ex. Etc/UTC) afin que son planning soit interprété par rapport à ce fuseau. En son absence, le planning est interprété selon le fuseau horaire local du kube-controller-manager. Cette fonctionnalité est stable depuis Kubernetes v1.27.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/",
  "en": {
    "q": "Regarding a CronJob's .spec.timeZone field, which statement is correct according to the documentation?",
    "choices": [
      "If unset, the schedule is interpreted relative to the kube-controller-manager's local time zone",
      "It accepts any free-form string, without particular validation",
      "It has been mandatory for every CronJob since this resource was created",
      "It can only be set once for the whole cluster, not per CronJob"
    ]
  }
},
{
  "id": "t7-w8",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Concernant l'enchaînement de la terminaison d'un Pod dont un conteneur définit un hook preStop, quelles affirmations sont exactes selon la documentation ? (plusieurs réponses)",
  "choices": [
    "Le décompte du terminationGracePeriodSeconds commence avant l'exécution du hook preStop, pas après",
    "Le signal SIGTERM n'est envoyé au conteneur qu'une fois l'exécution du hook preStop terminée",
    "Si l'exécution du hook preStop plus l'arrêt normal du conteneur dépassent au total le terminationGracePeriodSeconds, le conteneur peut être tué (SIGKILL) avant d'avoir fini de s'arrêter proprement",
    "Le hook preStop s'exécute de façon asynchrone par rapport à l'envoi du signal d'arrêt au conteneur"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : la doc précise explicitement que le décompte du terminationGracePeriodSeconds du Pod commence avant l'exécution du hook preStop.",
    "Correct : les hooks preStop ne sont pas asynchrones par rapport au signal d'arrêt — le hook doit terminer son exécution avant que le signal TERM puisse être envoyé.",
    "Correct : c'est exactement l'exemple donné par la doc (grace period de 60s, hook de 55s, arrêt normal de 10s) : le conteneur est tué avant d'avoir fini de s'arrêter normalement puisque 55+10 dépasse 60.",
    "Faux : c'est l'inverse, le hook preStop est bloquant et synchrone vis-à-vis de l'envoi du signal TERM."
  ],
  "explain": "Le compte à rebours du terminationGracePeriodSeconds démarre dès le passage du Pod en Terminating, avant même que le hook preStop ne s'exécute. Ce hook est bloquant : le signal SIGTERM n'est envoyé au conteneur qu'une fois son exécution terminée. Si la somme du temps d'exécution du hook et du temps d'arrêt normal du conteneur dépasse la grace period totale, le conteneur est tué par SIGKILL avant d'avoir pu s'arrêter proprement — d'où l'exemple documenté d'une grace period de 60s, un hook de 55s et un arrêt de 10s, où le conteneur est tué avant la fin de son arrêt normal.",
  "ref": "https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/",
  "en": {
    "q": "Regarding the termination sequence of a Pod whose container defines a preStop hook, which statements are correct according to the documentation? (multiple answers)",
    "choices": [
      "The terminationGracePeriodSeconds countdown begins before the preStop hook runs, not after",
      "SIGTERM is only sent to the container once the preStop hook has finished executing",
      "If the preStop hook execution plus the container's normal shutdown together exceed terminationGracePeriodSeconds, the container can be killed (SIGKILL) before it finishes shutting down cleanly",
      "The preStop hook runs asynchronously relative to sending the stop signal to the container"
    ]
  }
},
{
  "id": "t7-n1",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Un Ingress définit spec.tls: [{hosts: [\"https-example.foo.com\"], secretName: \"testsecret-tls\"}]. Comment le trafic HTTPS pour cet hôte est-il distingué des autres hôtes qui partagent le même port 443 ?",
  "choices": [
    "Par multiplexage TLS via l'extension SNI (Server Name Indication), à condition que le contrôleur Ingress la supporte",
    "Le Secret testsecret-tls ouvre automatiquement un port TCP dédié pour cet hôte",
    "kube-proxy route le trafic selon l'en-tête HTTP Host, lu avant le handshake TLS",
    "Chaque hôte listé dans spec.tls[].hosts reçoit une adresse de LoadBalancer distincte"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la documentation précise que si la section TLS spécifie des hôtes différents, ils sont multiplexés sur le même port selon le nom d'hôte indiqué via SNI, si le contrôleur le supporte.",
    "Faux : un Secret TLS contient seulement la clé privée et le certificat, il n'ouvre aucun port.",
    "Faux : l'en-tête HTTP Host n'est visible qu'après déchiffrement TLS, donc pas utilisable pour ce multiplexage au niveau TLS.",
    "Faux : le multiplexage se fait sur une même adresse/port, pas via des IP distinctes par hôte."
  ],
  "explain": "D'après la doc Ingress : on peut sécuriser un Ingress en spécifiant un Secret contenant une clé privée TLS et un certificat. Si la section TLS de l'Ingress référence des hôtes différents, ils sont multiplexés sur le même port selon le nom d'hôte indiqué via l'extension SNI du protocole TLS (à condition que le contrôleur Ingress la supporte). Le champ secretName désigne le Secret utilisé pour terminer le TLS sur le port 443.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/#tls",
  "en": {
    "q": "An Ingress defines spec.tls: [{hosts: [\"https-example.foo.com\"], secretName: \"testsecret-tls\"}]. How is HTTPS traffic for this host distinguished from other hosts sharing the same port 443?",
    "choices": [
      "By TLS multiplexing via the SNI (Server Name Indication) extension, provided the Ingress controller supports it",
      "The testsecret-tls Secret automatically opens a dedicated TCP port for this host",
      "kube-proxy routes traffic based on the HTTP Host header, read before the TLS handshake",
      "Each host listed in spec.tls[].hosts is assigned a distinct LoadBalancer address"
    ]
  }
},
{
  "id": "t7-n10",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Dans l'API Gateway, une ressource Gateway définit des listeners, chacun pouvant porter un champ allowedRoutes. D'après la documentation, quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "Par défaut, un Gateway n'accepte les Routes (par ex. une HTTPRoute) que depuis son propre namespace",
    "Pour accepter des Routes situées dans d'autres namespaces, il faut configurer explicitement allowedRoutes",
    "allowedRoutes est obligatoire même pour n'accepter que les Routes du même namespace que le Gateway",
    "Un listener peut préciser un hostname, un protocol et un port d'écoute"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Exact : la documentation précise que par défaut, un Gateway n'accepte que les Routes du même namespace.",
    "Exact : les Routes cross-namespace nécessitent une configuration explicite du champ allowedRoutes.",
    "Faux : le comportement par défaut (même namespace) s'applique sans qu'il soit nécessaire de renseigner allowedRoutes.",
    "Exact : l'exemple documenté d'un listener montre bien les champs name, protocol, port et hostname."
  ],
  "explain": "Une ressource Gateway décrit une instance d'infrastructure de traitement du trafic et définit un ou plusieurs listeners (avec par exemple hostname, protocol, port). Par défaut, un Gateway n'accepte les Routes que depuis son propre namespace ; les Routes cross-namespace nécessitent de configurer explicitement le champ allowedRoutes sur le listener concerné.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/gateway/",
  "en": {
    "q": "In the Gateway API, a Gateway resource defines listeners, each of which can carry an allowedRoutes field. According to the documentation, which statements are correct? (multiple answers)",
    "choices": [
      "By default, a Gateway only accepts Routes (e.g. an HTTPRoute) from its own namespace",
      "Accepting Routes located in other namespaces requires explicitly configuring allowedRoutes",
      "allowedRoutes is mandatory even just to accept Routes from the same namespace as the Gateway",
      "A listener can specify a hostname, a protocol, and a listening port"
    ]
  }
},
{
  "id": "t7-n2",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Dans une NetworkPolicy, que sélectionne un podSelector: {} (vide) ?",
  "choices": [
    "Tous les Pods du namespace de la NetworkPolicy",
    "Aucun Pod (la policy est alors ignorée par le contrôle plane)",
    "Uniquement les Pods sans aucun label défini",
    "Tous les Pods de tous les namespaces du cluster"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la documentation indique explicitement qu'un podSelector vide sélectionne tous les Pods du namespace.",
    "Faux : la policy s'applique bien, elle ne sont pas ignorée.",
    "Faux : un selector vide correspond à tous les Pods, labellisés ou non, pas seulement ceux sans label.",
    "Faux : une NetworkPolicy est un objet namespacé, sa portée reste limitée à son propre namespace."
  ],
  "explain": "La documentation NetworkPolicy est explicite : un podSelector vide sélectionne tous les Pods du namespace dans lequel la NetworkPolicy est définie.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
  "en": {
    "q": "In a NetworkPolicy, what does an empty podSelector: {} select?",
    "choices": [
      "All Pods in the NetworkPolicy's namespace",
      "No Pods at all (the policy is then ignored by the control plane)",
      "Only Pods that have no labels defined",
      "All Pods across every namespace in the cluster"
    ]
  }
},
{
  "id": "t7-n3",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Une NetworkPolicy default-deny-all est définie ainsi : podSelector: {}, policyTypes: [Ingress, Egress], sans aucune règle ingress ni egress. D'après la documentation, quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "Elle isole tous les Pods du namespace à la fois pour l'ingress et pour l'egress",
    "Aucune connexion entrante n'est autorisée vers ces Pods, en dehors de celles permises par une autre NetworkPolicy qui s'applique aussi à eux",
    "Aucune connexion sortante n'est autorisée depuis ces Pods, en dehors de celles permises par une autre NetworkPolicy qui s'applique aussi à eux",
    "Cette policy n'a aucun effet réel tant qu'on n'y ajoute pas au moins une règle ingress explicite"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Exact : podSelector: {} cible tous les Pods, et policyTypes: [Ingress, Egress] rend la policy applicable aux deux directions.",
    "Exact : un Pod isolé pour l'ingress sans règle ingress qui l'autorise n'accepte aucune connexion entrante (hors trafic du nœud).",
    "Exact : de la même façon, un Pod isolé pour l'egress sans règle egress n'émet aucune connexion sortante autorisée.",
    "Faux : c'est justement l'absence de règles qui produit l'effet deny-all recherché ; ajouter une règle ingress reviendrait à autoriser sélectivement du trafic, pas à activer la policy."
  ],
  "explain": "C'est l'exemple documenté de politique deny-all par défaut. podSelector: {} cible tous les Pods du namespace ; policyTypes: [Ingress, Egress] isole ces Pods pour les deux directions. Sans liste ingress ni egress, aucune connexion entrante ni sortante n'est autorisée, hormis ce qui est explicitement permis par une autre NetworkPolicy qui s'applique aussi au Pod.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/network-policies/#default-policies",
  "en": {
    "q": "A default-deny-all NetworkPolicy is defined as: podSelector: {}, policyTypes: [Ingress, Egress], with no ingress or egress rules at all. According to the documentation, which statements are correct? (multiple answers)",
    "choices": [
      "It isolates every Pod in the namespace for both ingress and egress",
      "No inbound connection is allowed to these Pods, except what is permitted by another NetworkPolicy that also applies to them",
      "No outbound connection is allowed from these Pods, except what is permitted by another NetworkPolicy that also applies to them",
      "This policy has no real effect until at least one explicit ingress rule is added to it"
    ]
  }
},
{
  "id": "t7-n4",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Sur un Service Kubernetes, quelle est la relation entre les champs spec.clusterIPs et spec.clusterIP ?",
  "choices": [
    "spec.clusterIPs est le champ principal (il peut contenir une IPv4 et une IPv6 en dual-stack) ; spec.clusterIP est un champ secondaire dont la valeur est calculée à partir de clusterIPs",
    "spec.clusterIP est le champ principal ; clusterIPs n'existe que pour la rétrocompatibilité et n'est jamais renseigné automatiquement",
    "Les deux champs sont indépendants et peuvent contenir des valeurs différentes pour une même famille d'adresses",
    "spec.clusterIPs ne peut contenir qu'une seule adresse IP, même sur un cluster dual-stack"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la documentation précise que .spec.clusterIPs est le champ principal contenant les IP assignées, et .spec.clusterIP est un champ secondaire calculé à partir de clusterIPs.",
    "Faux : c'est l'inverse, clusterIPs est le champ primaire.",
    "Faux : clusterIP est dérivé de clusterIPs, ils ne sont pas indépendants.",
    "Faux : sur un cluster dual-stack avec PreferDualStack, clusterIPs contient à la fois une adresse IPv4 et une adresse IPv6."
  ],
  "explain": "La documentation dual-stack indique que le champ .spec.clusterIPs est le champ principal et contient les deux adresses assignées en dual-stack ; .spec.clusterIP est un champ secondaire dont la valeur est calculée à partir de .spec.clusterIPs (il reprend l'adresse de la famille correspondant à la première plage de cluster IP du Service).",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/dual-stack/",
  "en": {
    "q": "On a Kubernetes Service, what is the relationship between the spec.clusterIPs and spec.clusterIP fields?",
    "choices": [
      "spec.clusterIPs is the primary field (it can hold one IPv4 and one IPv6 address in dual-stack); spec.clusterIP is a secondary field whose value is calculated from clusterIPs",
      "spec.clusterIP is the primary field; clusterIPs exists only for backward compatibility and is never populated automatically",
      "The two fields are independent and can hold different values for the same address family",
      "spec.clusterIPs can only ever contain a single IP address, even on a dual-stack cluster"
    ]
  }
},
{
  "id": "t7-n5",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Un Service se nomme example. Quelle commande liste toutes les EndpointSlices qui lui appartiennent, en s'appuyant sur le label documenté à cet effet ?",
  "choices": [
    "kubectl get endpointslices -l kubernetes.io/service-name=example",
    "kubectl get endpointslices --field-selector service=example",
    "kubectl get endpoints example -o wide",
    "kubectl get endpointslices -l app=example"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la documentation indique que chaque EndpointSlice porte un label kubernetes.io/service-name qui permet des recherches simples de toutes les EndpointSlices d'un Service.",
    "Faux : ce field-selector n'est pas celui documenté pour cet usage.",
    "Faux : cette commande cible l'objet Endpoints (singulier, agrégé), pas les EndpointSlices.",
    "Faux : app=example est un label applicatif arbitraire, pas le label standard utilisé par le contrôleur EndpointSlice."
  ],
  "explain": "D'après la documentation, les EndpointSlices appartenant à un Service portent une référence de propriétaire ainsi qu'un label kubernetes.io/service-name, qui permet des recherches simples de toutes les EndpointSlices appartenant à un Service donné, via un sélecteur de label kubectl standard.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/",
  "en": {
    "q": "A Service is named example. Which command lists all the EndpointSlices that belong to it, using the label documented for that purpose?",
    "choices": [
      "kubectl get endpointslices -l kubernetes.io/service-name=example",
      "kubectl get endpointslices --field-selector service=example",
      "kubectl get endpoints example -o wide",
      "kubectl get endpointslices -l app=example"
    ]
  }
},
{
  "id": "t7-n6",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Un client interroge le DNS pour un Service de type ExternalName (avec externalName: foo.bar.example.com). Que reçoit-il, d'après la documentation ?",
  "choices": [
    "Un enregistrement CNAME pointant vers foo.bar.example.com, sans qu'aucun proxying ne soit mis en place côté cluster",
    "Un enregistrement A pointant vers l'IP du Pod backend, résolue au préalable par CoreDNS",
    "Une erreur NXDOMAIN, car un Service ExternalName ne publie pas de résolution DNS",
    "Un enregistrement SRV listant les ports exposés par le Service"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la documentation précise que le système DNS configure un enregistrement CNAME pour un Service de type ExternalName, qui mappe simplement vers le contenu du champ externalName, sans proxying d'aucune sorte.",
    "Faux : un ExternalName n'a pas de selector ni de Pods backend à résoudre, il n'y a pas d'enregistrement A vers un Pod.",
    "Faux : le DNS répond bien avec une résolution, via un CNAME.",
    "Faux : les enregistrements SRV concernent les ports nommés des Services normaux, pas le mécanisme ExternalName."
  ],
  "explain": "Un Service ExternalName est un cas particulier sans selector, qui mappe le Service vers le contenu du champ externalName en renvoyant un enregistrement DNS CNAME. Aucun proxying n'est mis en place par le cluster : la résolution finale se fait côté client, via la chaîne CNAME.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#externalname",
  "en": {
    "q": "A client queries DNS for a Service of type ExternalName (with externalName: foo.bar.example.com). What does it receive, according to the documentation?",
    "choices": [
      "A CNAME record pointing to foo.bar.example.com, with no proxying set up on the cluster side",
      "An A record pointing to the backend Pod's IP, pre-resolved by CoreDNS",
      "An NXDOMAIN error, because an ExternalName Service does not publish DNS resolution",
      "An SRV record listing the ports exposed by the Service"
    ]
  }
},
{
  "id": "t7-n7",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Concernant l'annotation dépréciée kubernetes.io/ingress.class face au champ spec.ingressClassName, quelles affirmations sont exactes selon la documentation ? (plusieurs réponses)",
  "choices": [
    "L'annotation kubernetes.io/ingress.class est dépréciée au profit du champ ingressClassName et de la ressource IngressClass",
    "ingressClassName référence un objet IngressClass, qui peut porter une configuration supplémentaire (dont le nom du contrôleur) ; ce n'est pas un remplacement strictement équivalent à l'ancienne annotation",
    "L'ancienne annotation était généralement utilisée pour référencer directement le nom du contrôleur Ingress à utiliser",
    "Les deux mécanismes sont totalement interchangeables et produisent toujours exactement le même comportement"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Exact : la documentation identifie une section dédiée à cette annotation dépréciée, remplacée par ingressClassName / IngressClass.",
    "Exact : ingressClassName référence une ressource IngressClass qui porte notamment le contrôleur et de la configuration additionnelle ; ce n'est pas un simple remplacement 1 pour 1.",
    "Exact : historiquement l'annotation servait à indiquer directement quel contrôleur Ingress devait traiter la ressource.",
    "Faux : la documentation précise justement que ce n'est pas un remplacement strictement équivalent."
  ],
  "explain": "Avant l'introduction de la ressource IngressClass et du champ ingressClassName, la classe d'un Ingress était indiquée via l'annotation kubernetes.io/ingress.class, référençant en général directement le nom du contrôleur. Cette annotation est désormais dépréciée : ingressClassName référence un objet IngressClass, qui peut porter une configuration supplémentaire au-delà du simple nom de contrôleur, donc ce n'est pas un remplacement strictement équivalent.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/#deprecated-annotation",
  "en": {
    "q": "Regarding the deprecated kubernetes.io/ingress.class annotation versus the spec.ingressClassName field, which statements are correct according to the documentation? (multiple answers)",
    "choices": [
      "The kubernetes.io/ingress.class annotation is deprecated in favor of the ingressClassName field and the IngressClass resource",
      "ingressClassName references an IngressClass object, which can carry additional configuration (including the controller name); it is not a strictly equivalent replacement for the old annotation",
      "The old annotation was generally used to directly reference the name of the Ingress controller to use",
      "The two mechanisms are fully interchangeable and always produce exactly the same behavior"
    ]
  }
},
{
  "id": "t7-n8",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Dans une règle egress d'une NetworkPolicy, un bloc est défini par ipBlock: {cidr: 10.0.0.0/24, except: [10.0.0.1/32]}. Que signifie le champ except d'après la documentation ?",
  "choices": [
    "Il exclut la plage indiquée (ici 10.0.0.1/32) du bloc cidr autorisé : le trafic vers cette plage exclue n'est pas permis par cette règle",
    "Il ajoute des adresses supplémentaires autorisées, en plus du cidr principal",
    "Il désactive entièrement la règle ipBlock dès qu'une seule IP y correspond",
    "Il ne s'applique qu'aux règles ingress, jamais aux règles egress"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : le champ except décrit des CIDR à ne pas inclure dans le bloc cidr autorisé — ils sont retranchés de la plage.",
    "Faux : except retire des adresses, il n'en ajoute pas.",
    "Faux : seule la plage exceptée est exclue, le reste du bloc cidr reste autorisé.",
    "Faux : le champ ipBlock, y compris except, a la même structure qu'il soit utilisé dans une règle from (ingress) ou to (egress)."
  ],
  "explain": "Le champ except d'un ipBlock décrit des plages CIDR qui ne doivent pas être incluses dans le bloc cidr de la règle : elles sont exclues du trafic autorisé (ou bloqué, selon le contexte). Cette structure ipBlock/except est identique qu'elle soit utilisée dans une règle ingress (from) ou egress (to).",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
  "en": {
    "q": "In an egress rule of a NetworkPolicy, a block is defined as ipBlock: {cidr: 10.0.0.0/24, except: [10.0.0.1/32]}. What does the except field mean, according to the documentation?",
    "choices": [
      "It excludes the listed range (here 10.0.0.1/32) from the allowed cidr block: traffic to that excluded range is not permitted by this rule",
      "It adds extra allowed addresses on top of the main cidr",
      "It disables the entire ipBlock rule as soon as a single IP matches it",
      "It only applies to ingress rules, never to egress rules"
    ]
  }
},
{
  "id": "t7-n9",
  "domain": "networking",
  "difficulty": "medium",
  "q": "À quoi sert le champ nodePortAddresses de la configuration de kube-proxy ?",
  "choices": [
    "Il restreint l'ensemble des adresses IP de nœud sur lesquelles les Services de type NodePort sont exposés, via une liste de blocs CIDR (ex: 192.168.0.0/24) ou des mots-clés comme primary",
    "Il définit la plage de ports NodePort autorisée (30000-32767 par défaut)",
    "Il force kube-proxy à utiliser le mode IPVS au lieu d'iptables pour les Services NodePort",
    "Il attribue une adresse IP externe statique à chaque Service NodePort"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la documentation indique qu'on peut changer l'ensemble des IP de nœud sur lesquelles les Services NodePort sont disponibles avec le champ nodePortAddresses, qui accepte une liste de blocs CIDR ou des mots-clés comme primary/localhost/all.",
    "Faux : la plage de ports NodePort est un paramètre distinct (souvent --service-node-port-range côté API server), pas nodePortAddresses.",
    "Faux : ce champ ne pilote pas le choix du mode de proxy.",
    "Faux : nodePortAddresses restreint les IP locales sur lesquelles écouter, il n'attribue aucune IP externe."
  ],
  "explain": "D'après la documentation, on peut changer l'ensemble des IP de nœud sur lesquelles les Services NodePort sont disponibles grâce au champ nodePortAddresses de la configuration de kube-proxy. Il accepte une liste de blocs CIDR séparés par des virgules (par exemple 192.168.0.0/24) ou des mots-clés comme primary, localhost ou all ; si un bloc comme 192.168.0.0/24 est indiqué, kube-proxy ne sert les Services NodePort que via une IP locale trouvée dans ce sous-réseau sur chaque nœud.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport",
  "en": {
    "q": "What is the purpose of the nodePortAddresses field in kube-proxy's configuration?",
    "choices": [
      "It restricts the set of node IP addresses on which NodePort Services are exposed, via a list of CIDR blocks (e.g. 192.168.0.0/24) or keywords such as primary",
      "It defines the allowed NodePort port range (30000-32767 by default)",
      "It forces kube-proxy to use IPVS mode instead of iptables for NodePort Services",
      "It assigns a static external IP address to each NodePort Service"
    ]
  }
},
{
  "id": "t7-s1",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Que représente un objet CSIStorageCapacity dans Kubernetes ?",
  "choices": [
    "Un objet produit par un pilote CSI, contenant l'information de capacité disponible pour une StorageClass donnée et les nœuds y ayant accès",
    "Un objet créé par l'utilisateur pour réserver manuellement de l'espace disque sur un nœud précis",
    "Une ressource qui remplace définitivement les StorageClass pour tout provisionnement dynamique",
    "Un quota global limitant le nombre total de PersistentVolumeClaims dans le cluster"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc précise que ces objets 'get produced by a CSI driver' et que chacun contient la capacité pour une storage class et les nœuds concernés.",
    "Incorrect : c'est le pilote CSI qui publie ces objets, pas l'utilisateur manuellement.",
    "Incorrect : CSIStorageCapacity complète les StorageClass, il ne les remplace pas.",
    "Incorrect : ce n'est pas un mécanisme de quota de PVC."
  ],
  "explain": "Un objet CSIStorageCapacity est produit par un pilote CSI dans le namespace où il est installé ; chaque objet contient l'information de capacité pour une storage class et indique quels nœuds ont accès à cette capacité. Le scheduler l'utilise quand un Pod référence un volume pas encore créé, avec une StorageClass en mode WaitForFirstConsumer et un CSIDriver ayant StorageCapacity=true : il ne retient alors que les nœuds ayant assez de capacité déclarée.",
  "ref": "https://kubernetes.io/docs/concepts/storage/storage-capacity/",
  "en": {
    "q": "What does a CSIStorageCapacity object represent in Kubernetes?",
    "choices": [
      "An object produced by a CSI driver, holding capacity information for a given StorageClass and which nodes have access to it",
      "An object created manually by users to reserve disk space on a specific node",
      "A resource that permanently replaces StorageClasses for all dynamic provisioning",
      "A global quota limiting the total number of PersistentVolumeClaims in the cluster"
    ]
  }
},
{
  "id": "t7-s2",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Le scheduler utilise l'information de capacité de stockage (CSIStorageCapacity) pour placer un Pod uniquement si :",
  "choices": [
    "Le Pod utilise un volume pas encore créé, référençant une StorageClass avec un pilote CSI en volumeBindingMode WaitForFirstConsumer, et le CSIDriver a StorageCapacity=true",
    "Le cluster ne comporte qu'un seul nœud disponible pour l'ensemble des workloads",
    "Le Pod demande explicitement un volume hostPath au lieu d'un volume CSI",
    "La StorageClass a un provisioner in-tree (non CSI) avec volumeBindingMode Immediate"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc liste précisément ces trois conditions cumulatives (volume non créé, StorageClass CSI en WaitForFirstConsumer, CSIDriver.storageCapacity=true).",
    "Incorrect : le nombre de nœuds n'est pas une condition documentée.",
    "Incorrect : hostPath n'est pas concerné par le mécanisme CSIStorageCapacity.",
    "Incorrect : le mécanisme concerne les pilotes CSI, pas les provisioners in-tree, et nécessite WaitForFirstConsumer, pas Immediate."
  ],
  "explain": "D'après la documentation, l'information de capacité de stockage est utilisée par le scheduler si un Pod utilise un volume pas encore créé, que ce volume utilise une StorageClass référençant un pilote CSI avec volumeBindingMode WaitForFirstConsumer, et que l'objet CSIDriver correspondant a StorageCapacity=true. Le scheduler ne retient alors que les nœuds ayant suffisamment de capacité déclarée dans les objets CSIStorageCapacity dont la topologie inclut le nœud.",
  "ref": "https://kubernetes.io/docs/concepts/storage/storage-capacity/",
  "en": {
    "q": "The scheduler uses storage capacity information (CSIStorageCapacity) to place a Pod only when:",
    "choices": [
      "The Pod uses a volume that has not been created yet, referencing a StorageClass with a CSI driver in WaitForFirstConsumer volume binding mode, and the CSIDriver has StorageCapacity=true",
      "The cluster has only a single node available for all workloads",
      "The Pod explicitly requests a hostPath volume instead of a CSI volume",
      "The StorageClass uses an in-tree (non-CSI) provisioner with volumeBindingMode Immediate"
    ]
  }
},
{
  "id": "t7-s3",
  "domain": "storage",
  "difficulty": "easy",
  "q": "À quoi sert le champ `parameters` d'une StorageClass ?",
  "choices": [
    "À décrire des paramètres spécifiques au provisioner, transmis tels quels pour configurer les volumes provisionnés dynamiquement (ex. type de volume, IOPS...)",
    "À définir la taille par défaut de tous les PersistentVolumeClaims créés dans le cluster",
    "À lister les namespaces autorisés à créer des PVC avec cette StorageClass",
    "À fixer une politique RBAC restreignant qui peut consommer la StorageClass"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : les StorageClass ont des paramètres qui décrivent les volumes qu'elles gèrent ; différents provisioners acceptent différents paramètres, propres au backend de stockage.",
    "Incorrect : `parameters` ne fixe pas une taille par défaut de PVC, la taille est demandée dans le PVC lui-même.",
    "Incorrect : ce n'est pas un mécanisme de restriction par namespace.",
    "Incorrect : `parameters` ne gère pas le RBAC."
  ],
  "explain": "Le champ `parameters` d'une StorageClass décrit les volumes appartenant à cette classe : ces paramètres sont propres à chaque provisioner (par exemple un paramètre `type` pour un provisioner de disques cloud). Un maximum de 512 paramètres est autorisé, une fois définis ils ne peuvent plus être mis à jour après la création de l'objet.",
  "ref": "https://kubernetes.io/docs/concepts/storage/storage-classes/#parameters",
  "en": {
    "q": "What is the `parameters` field of a StorageClass used for?",
    "choices": [
      "To describe provisioner-specific parameters, passed through as-is to configure dynamically provisioned volumes (e.g. volume type, IOPS...)",
      "To set the default size for every PersistentVolumeClaim created in the cluster",
      "To list the namespaces allowed to create PVCs against this StorageClass",
      "To set an RBAC policy restricting who can consume the StorageClass"
    ]
  }
},
{
  "id": "t7-s4",
  "domain": "storage",
  "difficulty": "hard",
  "q": "Un PersistentVolume définit directement (et non via sa StorageClass) le champ `mountOptions` avec une option non supportée par le système de fichiers cible. Que se passe-t-il ?",
  "choices": [
    "Rien n'est validé à la création du PV : le montage du volume échouera seulement au moment où le volume est effectivement monté",
    "L'API server rejette la création du PV avec une erreur de validation explicite",
    "L'option invalide est ignorée silencieusement et le volume est monté avec les options par défaut",
    "Le kubelet corrige automatiquement l'option en se basant sur le type de système de fichiers détecté"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc est explicite — 'Mount Options are not validated – if a mount option is invalid, the mount will just fail.'",
    "Incorrect : il n'y a pas de validation à la création de l'objet.",
    "Incorrect : l'option n'est pas ignorée, elle provoque un échec du montage.",
    "Incorrect : aucune correction automatique n'est documentée."
  ],
  "explain": "Un PersistentVolume peut spécifier des options de montage additionnelles avec `mountOptions` (les options non supportées par le volume choisi sont ignorées par le disque mais la doc précise surtout : les options de montage ne sont pas validées à la création — une option invalide ne fera échouer que le montage effectif du volume.",
  "ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options",
  "en": {
    "q": "A PersistentVolume sets `mountOptions` directly (not via its StorageClass) with an option unsupported by the target filesystem. What happens?",
    "choices": [
      "Nothing is validated at PV creation time: the volume mount will only fail when the volume is actually mounted",
      "The API server rejects the PV creation with an explicit validation error",
      "The invalid option is silently ignored and the volume is mounted with default options",
      "The kubelet automatically corrects the option based on the detected filesystem type"
    ]
  }
},
{
  "id": "t7-s5",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Une PersistentVolumeClaim (PVC) définit un champ `selector` avec `matchLabels: {release: \"stable\"}`. Quel est l'effet sur la liaison (binding) ?",
  "choices": [
    "Seuls les PersistentVolumes portant le label `release: stable` (en plus des critères habituels de taille/accessMode/storageClassName) pourront être liés à ce PVC",
    "Le `selector` remplace entièrement les critères de taille et d'accessMode : seul le label compte pour le binding",
    "Le `selector` s'applique aux Pods consommateurs du PVC, pas aux PersistentVolumes candidats",
    "Le `selector` ne peut être utilisé qu'avec des volumes provisionnés dynamiquement, jamais avec des PV statiques"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc indique qu'une claim peut spécifier un label selector pour filtrer davantage l'ensemble des volumes ; seuls les volumes dont les labels correspondent au selector peuvent être liés à la claim.",
    "Incorrect : le selector s'ajoute aux critères existants, il ne les remplace pas.",
    "Incorrect : le selector porte sur les PV candidats, pas sur les Pods.",
    "Incorrect : le selector est justement l'outil typique pour cibler un PV provisionné statiquement précis, pas une restriction au provisionnement dynamique."
  ],
  "explain": "Le champ `selector` d'un PVC (avec `matchLabels` et/ou `matchExpressions`) permet de filtrer davantage l'ensemble des volumes candidats : seuls les PersistentVolumes dont les labels correspondent au selector peuvent être liés à la claim. C'est la technique documentée pour lier un PVC à un PV statique spécifique parmi plusieurs PV compatibles en taille et accessMode.",
  "ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#selector",
  "en": {
    "q": "A PersistentVolumeClaim (PVC) sets a `selector` field with `matchLabels: {release: \"stable\"}`. What is the effect on binding?",
    "choices": [
      "Only PersistentVolumes carrying the label `release: stable` (in addition to the usual size/accessMode/storageClassName criteria) can bind to this PVC",
      "The `selector` entirely replaces the size and accessMode criteria: only the label matters for binding",
      "The `selector` applies to the Pods consuming the PVC, not to the candidate PersistentVolumes",
      "The `selector` can only be used with dynamically provisioned volumes, never with static PVs"
    ]
  }
},
{
  "id": "t7-s6",
  "domain": "storage",
  "difficulty": "hard",
  "q": "Concernant le type de volume `local` (Kubernetes), quelles affirmations sont correctes ? (plusieurs réponses)",
  "choices": [
    "Un volume `local` ne peut être utilisé que via un PersistentVolume créé statiquement ; le provisionnement dynamique n'est pas supporté",
    "Le champ `nodeAffinity` est obligatoire sur le PersistentVolume pour indiquer sur quel(s) nœud(s) le stockage local est accessible",
    "Un volume `local` peut être monté simultanément depuis n'importe quel nœud du cluster, comme un volume réseau",
    "Il est recommandé d'utiliser une StorageClass avec `volumeBindingMode: WaitForFirstConsumer` pour retarder la décision de binding du PVC"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : la doc précise que les volumes local ne peuvent être utilisés que comme un PersistentVolume créé statiquement, le provisionnement dynamique n'étant pas supporté.",
    "Correct : la doc indique qu'il faut définir la nodeAffinity du PersistentVolume pour ce type de volume ; le scheduler utilise cette nodeAffinity pour planifier les Pods sur le bon nœud.",
    "Incorrect : un volume local représente un disque ou une partition montée localement sur un seul nœud, il n'est accessible que depuis ce nœud, contrairement à un volume réseau.",
    "Correct : la doc recommande de créer une StorageClass avec volumeBindingMode WaitForFirstConsumer pour retarder le binding du PVC, afin que la décision tienne compte des autres contraintes de placement du Pod."
  ],
  "explain": "D'après la documentation sur les volumes, un volume `local` représente un disque ou une partition de stockage local monté. Il ne peut être utilisé que via un PersistentVolume créé statiquement (pas de provisionnement dynamique), et il faut définir le champ `nodeAffinity` du PersistentVolume pour que le scheduler sache planifier correctement les Pods sur le nœud où réside ce stockage. Il est également recommandé de créer une StorageClass pour les volumes locaux avec `volumeBindingMode` réglé sur `WaitForFirstConsumer`, afin de retarder le binding et tenir compte des autres contraintes du Pod (ressources, sélecteurs, affinités).",
  "ref": "https://kubernetes.io/docs/concepts/storage/volumes/#local",
  "en": {
    "q": "Regarding the `local` volume type in Kubernetes, which statements are correct? (select all that apply)",
    "choices": [
      "A `local` volume can only be used as a statically created PersistentVolume; dynamic provisioning is not supported",
      "The `nodeAffinity` field is required on the PersistentVolume to indicate which node(s) the local storage is accessible from",
      "A `local` volume can be mounted simultaneously from any node in the cluster, like a network volume",
      "It is recommended to use a StorageClass with `volumeBindingMode: WaitForFirstConsumer` to delay the PVC binding decision"
    ]
  }
},
{
  "id": "t7-t1",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "D'après la documentation Kubernetes sur le node-pressure eviction, quelle est la différence de comportement entre un hard eviction threshold et un soft eviction threshold du kubelet ?",
  "choices": [
    "Le hard threshold entraine une éviction avec un grace period de 0s (arrêt immédiat), tandis que le soft threshold respecte un grace period configurable (eviction-soft-grace-period / eviction-max-pod-grace-period).",
    "Le soft threshold provoque toujours une éviction plus rapide que le hard threshold.",
    "Seul le hard threshold peut porter sur la mémoire ; le soft threshold ne concerne que l'espace disque.",
    "Les deux types de seuils ignorent totalement le grace period et tuent systématiquement le Pod à l'instant T."
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact selon la doc : hard = grace period 0s (immédiat) ; soft = le kubelet respecte le grace period configuré.",
    "Faux, c'est l'inverse : le hard threshold est le plus rapide (immédiat), pas le soft.",
    "Faux, les deux types de seuils peuvent être configurés sur mémoire, disque, PID, etc.",
    "Faux, c'est justement le hard threshold qui ignore le grace period ; le soft threshold en respecte un."
  ],
  "explain": "La documentation sur le node-pressure eviction précise : si le hard eviction threshold est atteint, le kubelet utilise un grace period de 0s (arrêt immédiat) ; si c'est un soft eviction threshold, le kubelet respecte le eviction-max-pod-grace-period configuré (lui-même borné par eviction-soft-grace-period par signal).",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/",
  "en": {
    "q": "According to the Kubernetes documentation on node-pressure eviction, what is the documented difference in behavior between a kubelet hard eviction threshold and a soft eviction threshold?",
    "choices": [
      "A hard threshold results in eviction with a 0s grace period (immediate shutdown), while a soft threshold respects a configurable grace period (eviction-soft-grace-period / eviction-max-pod-grace-period).",
      "A soft threshold always evicts faster than a hard threshold.",
      "Only the hard threshold can be set on memory; the soft threshold only applies to disk space.",
      "Both threshold types ignore the grace period entirely and always kill the Pod instantly."
    ]
  }
},
{
  "id": "t7-t10",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Depuis quelle version de Kubernetes l'API ComponentStatus (utilisée par kubectl get componentstatuses / cs) est-elle documentée comme dépréciée ?",
  "choices": [
    "v1.19+",
    "v1.10+",
    "v1.25+",
    "Elle n'a jamais été dépréciée"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact, la référence API précise : 'Deprecated: This API is deprecated in v1.19+'.",
    "Faux, ce n'est pas la version documentée.",
    "Faux, ce n'est pas la version documentée.",
    "Faux, la référence API mentionne explicitement une dépréciation."
  ],
  "explain": "La référence API ComponentStatus indique explicitement que cette API est dépréciée depuis la version v1.19+ de Kubernetes ; elle servait à exposer l'état de santé de composants du control plane comme le scheduler ou le controller-manager.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/core/component-status-v1/",
  "en": {
    "q": "Since which Kubernetes version is the ComponentStatus API (used by kubectl get componentstatuses / cs) documented as deprecated?",
    "choices": [
      "v1.19+",
      "v1.10+",
      "v1.25+",
      "It has never been deprecated"
    ]
  }
},
{
  "id": "t7-t11",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "D'après la documentation officielle, quelles affirmations sur kubectl cordon sont exactes ?",
  "choices": [
    "Il marque le Node comme non planifiable (unschedulable), empêchant le scheduler d'y placer de nouveaux Pods, sans affecter les Pods déjà en cours d'exécution.",
    "Les Pods d'un DaemonSet tolèrent un Node marqué non planifiable (unschedulable).",
    "kubectl cordon supprime immédiatement tous les Pods présents sur le Node.",
    "kubectl cordon est réservé aux Nodes du control plane."
  ],
  "correct": [
    0,
    1
  ],
  "why": [
    "Exact, c'est la description documentée : cordon empêche le scheduler de placer de nouveaux Pods, sans toucher aux Pods existants.",
    "Exact, la documentation précise que les Pods de DaemonSet tolèrent un Node non planifiable car ils fournissent des services locaux au nœud.",
    "Faux, cordon ne supprime aucun Pod ; c'est kubectl drain qui évacue les Pods.",
    "Faux, cordon peut être utilisé sur n'importe quel Node, worker ou control plane."
  ],
  "explain": "kubectl cordon marque un nœud comme non planifiable (préparation avant maintenance/reboot) : plus aucun nouveau Pod n'y est placé, mais les Pods existants continuent de tourner. Les Pods de DaemonSet, eux, tolèrent explicitement un nœud non planifiable puisqu'ils doivent rester présents sur chaque nœud.",
  "ref": "https://kubernetes.io/docs/concepts/architecture/nodes/",
  "en": {
    "q": "According to the official documentation, which statements about kubectl cordon are correct?",
    "choices": [
      "It marks the Node as unschedulable, preventing the scheduler from placing new Pods on it, without affecting Pods already running there.",
      "DaemonSet Pods tolerate running on an unschedulable Node.",
      "kubectl cordon immediately deletes every Pod running on the Node.",
      "kubectl cordon is reserved for control-plane Nodes only."
    ]
  }
},
{
  "id": "t7-t12",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Quelle commande liste uniquement les Pods dont la phase est Running, en utilisant un sélecteur de champ documenté par kubectl get ?",
  "choices": [
    "kubectl get pods --field-selector=status.phase=Running",
    "kubectl get pods --selector=status.phase=Running",
    "kubectl get pods --filter=phase:Running",
    "kubectl get pods --status=Running"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact, --field-selector est le flag documenté pour filtrer sur un champ comme status.phase, avec l'exemple explicite key1=value1.",
    "Faux, --selector (-l) filtre sur les labels, pas sur des champs comme status.phase.",
    "Faux, --filter n'est pas un flag documenté de kubectl get.",
    "Faux, --status n'est pas un flag documenté de kubectl get."
  ],
  "explain": "kubectl get documente --field-selector comme un sélecteur de requête sur des champs ('supports =, ==, and !='), utilisable par exemple pour ne récupérer que les Pods en phase Running via --field-selector=status.phase=Running.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
  "en": {
    "q": "Which command lists only the Pods whose phase is Running, using a field selector documented by kubectl get?",
    "choices": [
      "kubectl get pods --field-selector=status.phase=Running",
      "kubectl get pods --selector=status.phase=Running",
      "kubectl get pods --filter=phase:Running",
      "kubectl get pods --status=Running"
    ]
  }
},
{
  "id": "t7-t13",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "D'après la documentation officielle, quelles syntaxes sont valides pour le flag --for de kubectl wait ?",
  "choices": [
    "--for=condition=Ready",
    "--for=delete",
    "--for=create",
    "--for=restart"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Exact, --for=condition=condition-name[=condition-value] est une syntaxe documentée, par exemple --for=condition=Ready.",
    "Exact, --for=delete est documenté pour attendre la suppression de la ressource.",
    "Exact, --for=create est documenté pour attendre la création de la ressource.",
    "Faux, --for=restart n'est pas une valeur documentée pour ce flag."
  ],
  "explain": "kubectl wait attend qu'une condition apparaisse dans le champ Status d'une ressource. Le flag --for documente notamment les formats --for=condition=nom[=valeur], --for=create, --for=delete et --for=jsonpath='...'=valeur.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_wait/",
  "en": {
    "q": "According to the official documentation, which syntaxes are valid for the --for flag of kubectl wait?",
    "choices": [
      "--for=condition=Ready",
      "--for=delete",
      "--for=create",
      "--for=restart"
    ]
  }
},
{
  "id": "t7-t14",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "D'après les exemples documentés de kubectl debug, que fait l'option --set-image=*=busybox utilisée avec --copy-to lors de la copie d'un Pod ?",
  "choices": [
    "Elle change l'image de TOUS les conteneurs de la copie du Pod vers busybox.",
    "Elle ajoute un nouveau conteneur nommé busybox, sans toucher aux images des autres conteneurs.",
    "Elle change uniquement l'image du premier conteneur du Pod.",
    "Elle nécessite de lister explicitement le nom de chaque conteneur ; le caractère générique * n'est pas supporté."
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact, l'exemple documenté 'kubectl debug mypod --copy-to=my-debugger --set-image=*=busybox' est décrit comme changeant toutes les images de conteneurs vers busybox.",
    "Faux, --set-image change des images existantes, il n'ajoute pas de nouveau conteneur (c'est --image qui ajoute un conteneur de debug).",
    "Faux, avec le caractère *, ce sont tous les conteneurs qui sont concernés, pas seulement le premier.",
    "Faux, la documentation montre justement l'usage du caractère générique * pour cibler tous les conteneurs (set-image=*=busybox)."
  ],
  "explain": "Parmi les exemples officiels de kubectl debug figure 'Create a copy of mypod changing all container images to busybox' réalisé avec kubectl debug mypod --copy-to=my-debugger --set-image=*=busybox : le caractère * cible tous les conteneurs de la copie et remplace leur image par busybox, ce qui permet de déboguer un Pod dont l'image d'origine ne contient aucun outil.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_debug/",
  "en": {
    "q": "Based on the documented kubectl debug examples, what does the --set-image=*=busybox option do when used with --copy-to while copying a Pod?",
    "choices": [
      "It changes the image of ALL containers in the copied Pod to busybox.",
      "It adds a new container named busybox, without touching the other containers' images.",
      "It changes only the first container's image.",
      "It requires listing every container name explicitly; the wildcard * is not supported."
    ]
  }
},
{
  "id": "t7-t2",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Selon la documentation officielle, quelles valeurs le flag --sort-by de la commande kubectl top pod accepte-t-il ?",
  "choices": [
    "'cpu' ou 'memory'",
    "'name' ou 'restarts'",
    "'age' ou 'status'",
    "'node' ou 'namespace'"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la doc précise 'If non-empty, sort pods list using specified field. The field can be either cpu or memory'.",
    "Faux, ce ne sont pas des valeurs documentées pour --sort-by de kubectl top pod.",
    "Faux, idem.",
    "Faux, idem."
  ],
  "explain": "La référence kubectl top pod documente le flag --sort-by comme n'acceptant que deux valeurs : 'cpu' ou 'memory', pour trier la liste des Pods selon leur consommation de ressources.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_top/kubectl_top_pod/",
  "en": {
    "q": "According to the official documentation, which values does the --sort-by flag of kubectl top pod accept?",
    "choices": [
      "'cpu' or 'memory'",
      "'name' or 'restarts'",
      "'age' or 'status'",
      "'node' or 'namespace'"
    ]
  }
},
{
  "id": "t7-t3",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait le flag --watch (-w) de kubectl get, selon la documentation officielle ?",
  "choices": [
    "Après avoir listé/récupéré l'objet demandé, il surveille les changements (watch for changes).",
    "Il force systématiquement l'affichage au format YAML complet.",
    "Il relance automatiquement la commande kubectl toutes les 5 secondes.",
    "Il n'affiche que les objets modifiés durant la dernière minute."
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la doc décrit --watch comme 'After listing/getting the requested object, watch for changes.'",
    "Faux, --watch n'impose aucun format de sortie particulier.",
    "Faux, ce n'est pas un polling à intervalle fixe mais un flux d'événements watch de l'API.",
    "Faux, --watch affiche en continu les changements à partir du moment où on l'exécute, sans fenêtre de temps fixe."
  ],
  "explain": "kubectl get --watch (ou -w) affiche d'abord l'état courant de l'objet demandé, puis continue à streamer les événements de changement via l'API Kubernetes, ce qui est très utile pour suivre l'évolution d'un Pod en cours de dépannage.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
  "en": {
    "q": "According to the official documentation, what does the --watch (-w) flag of kubectl get do?",
    "choices": [
      "After listing/getting the requested object, it watches for changes.",
      "It forces output to always be full YAML.",
      "It automatically reruns the kubectl command every 5 seconds.",
      "It only shows objects modified within the last minute."
    ]
  }
},
{
  "id": "t7-t4",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Parmi les éléments suivants, lesquels font partie des Pod conditions documentées dans le cycle de vie d'un Pod (tableau status.conditions) ?",
  "choices": [
    "PodScheduled",
    "Initialized",
    "ContainersReady",
    "Unschedulable"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Exact, PodScheduled est une Pod condition documentée : le Pod a été planifié sur un nœud.",
    "Exact, Initialized est une Pod condition documentée : tous les init containers ont démarré avec succès.",
    "Exact, ContainersReady est une Pod condition documentée : tous les conteneurs du Pod sont prêts.",
    "Faux, Unschedulable n'est pas une Pod condition : c'est un concept lié aux Nodes (spec.unschedulable) ou aux événements du scheduler, pas une entrée du tableau status.conditions d'un Pod."
  ],
  "explain": "La documentation sur le cycle de vie des Pods liste quatre Pod conditions possibles dans status.conditions : PodScheduled, Initialized, ContainersReady et Ready. Chacune porte un champ status (True/False/Unknown). 'Unschedulable' n'en fait pas partie.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/",
  "en": {
    "q": "Which of the following are documented Pod conditions found in a Pod's lifecycle (the status.conditions array)?",
    "choices": [
      "PodScheduled",
      "Initialized",
      "ContainersReady",
      "Unschedulable"
    ]
  }
},
{
  "id": "t7-t5",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Pour diagnostiquer un Pod bloqué en Pending à cause d'une contrainte de placement (taint non toléré, nodeSelector), quels champs la sortie de kubectl describe pod affiche-t-elle nativement, d'après le guide officiel de débogage des Pods ?",
  "choices": [
    "Tolerations et Node-Selectors",
    "Uniquement les Labels du Pod",
    "Uniquement les OwnerReferences",
    "Uniquement le champ Status.Phase"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : le guide de débogage des Pods documente que la sortie de kubectl describe pod inclut, entre autres, les champs Tolerations et Node-Selectors, utiles pour vérifier une contrainte de placement.",
    "Faux, les Labels seuls ne renseignent pas sur les tolerations ou le nodeSelector du Pod.",
    "Faux, les OwnerReferences renseignent sur le contrôleur propriétaire, pas sur le placement.",
    "Faux, Status.Phase seul ne donne pas le détail des contraintes de scheduling."
  ],
  "explain": "kubectl describe pod affiche notamment les sections Tolerations et Node-Selectors du Pod, en plus des Events. En les comparant aux Taints du nœud (visibles via kubectl describe node), on peut identifier pourquoi le scheduler refuse de placer le Pod.",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/",
  "en": {
    "q": "To diagnose a Pod stuck Pending because of a placement constraint (an untolerated taint, a nodeSelector), which fields does kubectl describe pod natively show, according to the official Pod debugging guide?",
    "choices": [
      "Tolerations and Node-Selectors",
      "Only the Pod's Labels",
      "Only the OwnerReferences",
      "Only the Status.Phase field"
    ]
  }
},
{
  "id": "t7-t6",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "D'après la documentation de kubectl exec, si l'option -c/--container n'est pas précisée sur un Pod multi-conteneurs, quel conteneur est utilisé pour exécuter la commande ?",
  "choices": [
    "Celui indiqué par l'annotation kubectl.kubernetes.io/default-container, ou à défaut le premier conteneur du Pod.",
    "Le dernier conteneur défini dans le manifeste du Pod.",
    "Le conteneur ayant le plus grand nombre de redémarrages (restarts).",
    "kubectl exec refuse systématiquement de s'exécuter tant que -c n'est pas fourni."
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la doc précise que -c/--container utilise, si omis, l'annotation kubectl.kubernetes.io/default-container ou le premier conteneur du Pod.",
    "Faux, ce n'est pas le dernier conteneur qui est choisi par défaut.",
    "Faux, le nombre de restarts n'entre pas en compte dans ce choix.",
    "Faux, kubectl exec fonctionne sans -c sur un Pod multi-conteneurs, il choisit un conteneur par défaut."
  ],
  "explain": "La référence kubectl exec documente que le flag -c/--container sert à choisir le conteneur cible ; s'il est omis, kubectl utilise l'annotation kubectl.kubernetes.io/default-container si elle est présente sur le Pod, sinon le premier conteneur déclaré.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/",
  "en": {
    "q": "According to the kubectl exec documentation, if -c/--container is not specified on a multi-container Pod, which container is used to run the command?",
    "choices": [
      "The one indicated by the kubectl.kubernetes.io/default-container annotation, or otherwise the first container in the Pod.",
      "The last container defined in the Pod manifest.",
      "The container with the highest restart count.",
      "kubectl exec always refuses to run until -c is provided."
    ]
  }
},
{
  "id": "t7-t7",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "D'après la documentation sur le débogage des nœuds Kubernetes avec crictl, quelles affirmations sont exactes ?",
  "choices": [
    "crictl est une interface en ligne de commande pour les runtimes compatibles CRI, utilisée pour inspecter et déboguer les conteneurs et le runtime sur un nœud.",
    "crictl ps liste les conteneurs en cours d'exécution sur le nœud.",
    "crictl logs affiche les logs d'un conteneur et accepte une option --tail pour limiter le nombre de lignes.",
    "crictl remplace kubectl pour créer des objets de haut niveau comme des Deployments."
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Exact, c'est la définition documentée de crictl.",
    "Exact, crictl ps liste les conteneurs, comme le montrent les exemples de la documentation.",
    "Exact, l'exemple documenté 'crictl logs --tail=1 <id>' confirme ce comportement.",
    "Faux, crictl agit au niveau du runtime CRI sur un nœud (conteneurs/images), pas au niveau des objets Kubernetes de haut niveau comme les Deployments."
  ],
  "explain": "La documentation présente crictl comme un outil d'inspection/débogage des runtimes compatibles CRI sur un nœud, avec des sous-commandes comme crictl ps (lister les conteneurs) et crictl logs (dont l'option --tail). Il ne se substitue pas à kubectl pour piloter les objets de l'API Kubernetes.",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/",
  "en": {
    "q": "According to the documentation on debugging Kubernetes nodes with crictl, which statements are correct?",
    "choices": [
      "crictl is a command-line interface for CRI-compatible container runtimes, used to inspect and debug containers and the runtime on a node.",
      "crictl ps lists the containers currently running on the node.",
      "crictl logs shows a container's logs and accepts a --tail option to limit the number of lines.",
      "crictl replaces kubectl for creating high-level objects such as Deployments."
    ]
  }
},
{
  "id": "t7-t8",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que font les flags suivants de kubectl logs, selon la documentation officielle ?",
  "choices": [
    "-p/--previous : affiche les logs de l'instance précédente du conteneur dans un Pod, si elle existe.",
    "--all-containers : récupère les logs de tous les conteneurs du/des Pod(s).",
    "--previous supprime définitivement les anciens logs stockés dans le cluster.",
    "--all-containers ne peut être utilisé qu'avec un seul conteneur à la fois."
  ],
  "correct": [
    0,
    1
  ],
  "why": [
    "Exact, c'est la description documentée de --previous.",
    "Exact, c'est la description documentée de --all-containers.",
    "Faux, --previous ne fait que lire les logs de l'instance précédente, il ne supprime rien.",
    "Faux, --all-containers sert justement à récupérer les logs de plusieurs conteneurs simultanément."
  ],
  "explain": "kubectl logs documente -p/--previous ('print the logs for the previous instance of the container in a pod if it exists') et --all-containers ('Get all containers' logs in the pod(s)'), deux flags très utiles pour diagnostiquer un CrashLoopBackOff sur un Pod multi-conteneurs.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/",
  "en": {
    "q": "What do the following kubectl logs flags do, according to the official documentation?",
    "choices": [
      "-p/--previous: prints the logs for the previous instance of the container in a Pod, if it exists.",
      "--all-containers: gets all containers' logs in the Pod(s).",
      "--previous permanently deletes the old logs stored in the cluster.",
      "--all-containers can only be used with a single container at a time."
    ]
  }
},
{
  "id": "t7-t9",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Un Pod CoreDNS est en CrashLoopBackOff. D'après la documentation sur le débogage de la résolution DNS, quel plugin du Corefile est chargé de détecter une boucle de forwarding pouvant provoquer ce crash ?",
  "choices": [
    "Le plugin loop",
    "Le plugin cache",
    "Le plugin health",
    "Le plugin prometheus"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact, le Corefile par défaut de CoreDNS inclut le plugin loop, chargé de détecter les boucles de forwarding DNS.",
    "Faux, cache gère la mise en cache des réponses DNS, pas la détection de boucle.",
    "Faux, health expose un endpoint de santé pour CoreDNS, sans lien avec la détection de boucle.",
    "Faux, prometheus expose des métriques sur le port 9153, sans lien avec la détection de boucle."
  ],
  "explain": "Le Corefile de CoreDNS documenté contient la directive loop, dont le rôle est de détecter une boucle infinie dans la chaîne de forwarding DNS (par exemple un forward mal configuré) ; une telle boucle est une cause connue de CrashLoopBackOff sur les Pods CoreDNS.",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/",
  "en": {
    "q": "A CoreDNS Pod is in CrashLoopBackOff. According to the documentation on debugging DNS resolution, which Corefile plugin is responsible for detecting a forwarding loop that can cause this crash?",
    "choices": [
      "The loop plugin",
      "The cache plugin",
      "The health plugin",
      "The prometheus plugin"
    ]
  }
}
  ];
  DATA.forEach((o) => Q.push(Object.assign({ type: "theory" }, o)));
  window.CKA._t7 = DATA.length;
})();
