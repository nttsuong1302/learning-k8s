// Notes de formation Kubernetes (pas des QCM — juste des notes de cours organisées et sourcées).
// window.CKA.formation : liste de fiches { id, day, section, title, lead, body[], points[], note[], refs[] }.
window.CKA = window.CKA || {};
window.CKA.formation = window.CKA.formation || [];
(function () {
  const F = window.CKA.formation;
  const DATA = [
{
  "id": "f-j1-vanilla",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Kubernetes « vanilla »",
  "lead": "Le Kubernetes « nature », sans surcouche d'un fournisseur.",
  "body": [
    "« Vanilla » (ou « upstream ») désigne un cluster installé tel que défini par le projet open source Kubernetes (CNCF), sans les ajouts propriétaires d'une distribution : pas d'outillage, d'UI, de politiques réseau ou de sécurité spécifiques à un vendeur.",
    "Ce n'est pas un terme officiel du site kubernetes.io, mais la doc officielle distingue bien les mêmes catégories :"
  ],
  "points": [
    "Cluster auto-géré (« vanilla ») — installé avec kubeadm, tu configures toi-même le réseau (CNI), le stockage, l'ingress…",
    "Distributions — Rancher/RKE2, OpenShift, k3s, Tanzu… ajoutent leur propre tooling par-dessus l'API Kubernetes standard.",
    "Turnkey Cloud Solutions — EKS, GKE, AKS : le control plane est géré par le cloud, l'API reste conforme upstream."
  ],
  "note": [
    "À retenir : « vanilla » = conformité maximale avec l'API et la doc officielles (utile pour le CKA/CKAD), mais rien n'est préconfiguré pour toi."
  ],
  "refs": [
    "https://kubernetes.io/docs/setup/production-environment/",
    "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/",
    "https://kubernetes.io/docs/setup/production-environment/turnkey-solutions/"
  ]
},
{
  "id": "f-j1-kubespray",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Kubespray",
  "lead": "Un outil Ansible pour déployer un cluster Kubernetes « vanilla » en production, alternative à kubeadm seul.",
  "body": [
    "La doc officielle liste Kubespray parmi les outils pour un cluster auto-géré (« vanilla ») en production, aux côtés de kubeadm et kOps : « A composition of Ansible playbooks, inventory, provisioning tools, and domain knowledge for generic OS/Kubernetes clusters configuration management tasks. »",
    "C'est un projet officiel de la communauté Kubernetes (kubernetes-sigs/kubespray), qui automatise via Ansible l'installation d'un cluster complet (control plane + nœuds) plutôt que de le faire nœud par nœud comme avec kubeadm seul. Sa description sur GitHub : « Deploy a Production Ready Kubernetes Cluster »."
  ],
  "points": [
    "Highly available cluster — support natif du mode haute disponibilité",
    "Composable — choix du plugin réseau (CNI), entre autres options",
    "Supporte la plupart des distributions Linux populaires",
    "Déploie sur AWS, GCE, Azure, OpenStack, vSphere, Equinix Metal (bare metal), Oracle Cloud Infrastructure (expérimental), ou en bare metal",
    "Inclut un mode Vagrant pour tester en local avant un déploiement réel"
  ],
  "note": [
    "À situer par rapport à la note « Kubernetes vanilla » : Kubespray reste dans la catégorie « cluster auto-géré » (tu gardes la main sur le réseau, le stockage, l'ingress…), c'est juste l'outillage d'installation qui change — Ansible orchestrant plusieurs machines, plutôt que kubeadm exécuté manuellement nœud par nœud."
  ],
  "refs": [
    "https://kubernetes.io/docs/setup/production-environment/tools/",
    "https://kubespray.io/",
    "https://github.com/kubernetes-sigs/kubespray"
  ]
},
{
  "id": "f-j1-distributions",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Distributions Kubernetes : les critères de choix",
  "lead": "Ce qui différencie les façons d'installer/exploiter Kubernetes — au-delà de la distinction « vanilla » vue dans la note précédente.",
  "body": [
    "La doc officielle range les façons d'obtenir un cluster en 3 grandes catégories (« Setup » sur kubernetes.io) : environnement d'apprentissage (poste local), environnement de production auto-géré (kubeadm et les outils vus dans les notes « Kubernetes vanilla »/« Kubespray »), et solutions clé-en-main gérées par un fournisseur. Le support de formation liste des critères concrets pour comparer les options à l'intérieur de ces catégories :"
  ],
  "points": [
    "Poste de dev, nœud unique — pour apprendre/tester en local, la doc officielle recommande kind (« runs Kubernetes clusters using Docker containers as nodes […] works great for learning ») ou minikube (« runs a single-node Kubernetes cluster on your local machine »), avant de passer à un vrai kubeadm.",
    "Haute disponibilité automatique du control plane — voir la note « Fault tolérance du control plane » : kubeadm sait initialiser/joindre plusieurs nœuds control-plane, mais ne « pilote » pas une bascule automatique en cas de panne à ta place ; certaines distributions/plateformes en font plus dans ce sens.",
    "Control plane auto-géré vs délégué — même distinction que « vanilla » vs « turnkey cloud solutions » (EKS, GKE, AKS…) : soit tu opères toi-même apiserver/etcd/scheduler, soit le fournisseur s'en charge et tu gardes une API conforme upstream.",
    "Console web de management — Kubernetes propose officiellement un addon Dashboard (« deploy containerized applications […], troubleshoot […], and manage the cluster resources ») ; ATTENTION : ce projet est aujourd'hui archivé/non maintenu par la doc officielle, qui oriente plutôt vers des alternatives comme Headlamp. Certaines distributions (ex. Rancher, OpenShift) intègrent leur propre console — non détaillé ici, hors périmètre kubernetes.io.",
    "Installation automatisée — kubeadm (l'outil officiel de base), Cluster API (« declarative APIs and tooling to simplify provisioning, upgrading, and operating multiple Kubernetes clusters »), kOps (« an automated cluster provisioning tool »), Kubespray (voir note dédiée).",
  ],
  "note": [
    "Deux critères du support de formation n'ont pas d'équivalent vérifiable sur kubernetes.io aujourd'hui, donc pas de détail technique inventé ici : la « fédération de clusters » (l'ancien projet kubefed/« Cluster Federation » n'apparaît plus dans la doc officielle actuelle), et « l'intégration d'une chaîne d'intégration continue » (fonctionnalité propre à certaines distributions, ex. OpenShift Pipelines — pas un concept documenté par le projet Kubernetes lui-même)."
  ],
  "refs": [
    "https://kubernetes.io/docs/setup/",
    "https://kubernetes.io/docs/setup/learning-environment/",
    "https://kubernetes.io/docs/setup/production-environment/tools/",
    "https://kubernetes.io/docs/setup/production-environment/turnkey-solutions/",
    "https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/"
  ]
},
{
  "id": "f-j1-managed-k8s",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Managed Kubernetes chez les cloud providers",
  "lead": "Ce que le fournisseur cloud gère à ta place, ce qu'il te laisse gérer, et comment le lien avec l'infra cloud est fait techniquement.",
  "body": [
    "Suite de la note « Distributions Kubernetes » (point « control plane auto-géré vs délégué ») : les offres « clé-en-main » des clouds (EKS chez AWS, GKE chez Google Cloud, AKS chez Azure — cf. note « Kubernetes vanilla ») retirent l'exploitation du control plane de tes épaules."
  ],
  "points": [
    "Géré par le fournisseur — kube-apiserver, etcd, kube-scheduler, kube-controller-manager : leur disponibilité, leurs mises à jour de version, leurs correctifs de sécurité, la HA entre zones… tout ce que tu ferais toi-même avec kubeadm (cf. notes « Installer un control plane » et « Fault tolérance du control plane »).",
    "Ce qu'il te reste à gérer — en général les workers/node pools (taille, autoscaling, mises à jour), tes workloads (Deployments, Services…), le RBAC, la configuration réseau applicative (Ingress, NetworkPolicy…). Tu gardes une API conforme upstream, donc kubectl/manifests standards fonctionnent sans changement.",
    "cloud-controller-manager — le composant qui « lets you link your cluster into your cloud provider's API, and separates out the components that interact with that cloud platform from components that only interact with your cluster ». Il embarque 3 contrôleurs : Node controller (annote/retire les Node selon l'état réel des instances cloud), Route controller (« configuring routes in the cloud […] so that containers on different nodes […] can communicate »), Service controller (« Services integrate with cloud infrastructure components such as managed load balancers, IP addresses, network packet filtering, and target health checking »).",
    "Conséquence concrète — c'est le Service controller qui fait qu'un `Service` de type `LoadBalancer` sur un cluster managé provisionne automatiquement une vraie load balancer cloud (ELB/NLB, Google Cloud Load Balancer, Azure Load Balancer…), sans action manuelle côté infra cloud."
  ],
  "note": [
    "Le compromis : moins d'opérations (pas de certificats kubeadm à renouveler, pas de quorum etcd à surveiller toi-même), mais moins de contrôle fin sur le control plane (version exacte, flags d'apiserver, timing des upgrades) — à mettre en balance avec les critères vus dans la note « Distributions Kubernetes »."
  ],
  "refs": [
    "https://kubernetes.io/docs/setup/production-environment/turnkey-solutions/",
    "https://kubernetes.io/docs/concepts/architecture/cloud-controller/"
  ]
},
{
  "id": "f-j1-sonobuoy",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Sonobuoy",
  "lead": "L'outil de diagnostic qui vérifie qu'un cluster est réellement conforme à la spec Kubernetes — et la techno derrière la certification CNCF.",
  "body": [
    "Sonobuoy est « a diagnostic tool that makes it easier to understand the state of a Kubernetes cluster by running a choice of configuration tests in an accessible and non-destructive manner ». Projet open source porté par VMware — ce n'est pas un outil du projet Kubernetes lui-même.",
    "Le lien concret avec la certification : le dépôt officiel du programme CNCF Certified Kubernetes le confirme noir sur blanc — « For a number of years Sonobuoy has been used to generate both the e2e.log and junit_01.xml », les fichiers de résultats requis pour obtenir le badge « CNCF Certified Kubernetes »."
  ],
  "points": [
    "Conformance testing — vérifie que le cluster respecte la spec Kubernetes officielle (les tests e2e de conformité).",
    "Debugging de workloads — génère des diagnostics accessibles pour un workload qui pose problème.",
    "Tests personnalisés — extensible via un système de plugins.",
    "Non-destructif — les tests tournent sans modifier durablement l'état du cluster.",
    "Workflow de base : `sonobuoy run --wait` (lance les tests et attend la fin) → `sonobuoy status` (état de chaque plugin) → `sonobuoy retrieve` (récupère les résultats) → `sonobuoy results` (liste les tests en échec) → `sonobuoy logs` (logs des conteneurs Sonobuoy) → `sonobuoy delete --wait` (nettoie les ressources créées)."
  ],
  "note": [
    "À ne pas confondre avec kubeadm/Kubespray (notes précédentes) : ceux-là installent un cluster, Sonobuoy vérifie après coup qu'un cluster déjà en place se comporte comme un vrai Kubernetes conforme."
  ],
  "refs": [
    "https://sonobuoy.io/docs/latest/",
    "https://github.com/cncf/k8s-conformance"
  ]
},
{
  "id": "f-j1-thanos",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Thanos",
  "lead": "L'extension la plus courante de Prometheus sur Kubernetes, pour dépasser ses limites natives de rétention et de vue globale.",
  "body": [
    "Thanos est « open source, highly available Prometheus setup with long term storage capabilities. » Ce n'est pas un outil Kubernetes en soi, mais l'extension la plus répandue de Prometheus dans ce contexte."
  ],
  "points": [
    "Global Query View — interroger les métriques à travers plusieurs serveurs Prometheus (et plusieurs clusters) comme une seule source.",
    "Stockage long terme — Prometheus seul a une rétention courte par design ; Thanos l'étend indéfiniment via du stockage objet (S3, GCS, Azure Blob, Swift, Tencent COS).",
    "Haute disponibilité — architecture distribuée, plus résiliente qu'un Prometheus unique.",
    "Sidecar — se connecte à Prometheus, lit ses données pour les requêtes et/ou les upload vers le stockage cloud.",
    "Store Gateway — sert les métriques historiques depuis le stockage objet, même API gRPC que le Sidecar.",
    "Querier/Query — implémente l'API v1 de Prometheus, agrège les données de tous les composants sous-jacents (point d'entrée pour Grafana, par exemple).",
    "Compactor — compacte, downsample et applique la rétention sur les données du bucket cloud.",
    "Receiver — reçoit les données via le « remote write » de Prometheus, les expose et/ou les upload.",
    "Ruler/Rule — évalue règles/alertes quand il faut une vision globale ou une rétention au-delà d'une seule instance Prometheus."
  ],
  "note": [
    "Statut CNCF Incubating — un cran en dessous de CRI-O et Cilium (Graduated, voir notes dédiées), licence Apache 2.0, fondé initialement par Improbable. Sujet plus proche de l'observabilité que de l'admin cluster pur — hors périmètre strict CKA, mais utile en contexte réel."
  ],
  "refs": [
    "https://thanos.io/",
    "https://thanos.io/tip/thanos/quick-tutorial.md/"
  ]
},
{
  "id": "f-j1-container-runtime",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Container runtime : définition & CRI-O",
  "lead": "Le logiciel qui exécute réellement les conteneurs sur chaque nœud — et un runtime pensé spécifiquement pour Kubernetes.",
  "body": [
    "« The container runtime is the software that is responsible for running containers. » Sur chaque nœud, c'est lui qui démarre les processus des conteneurs et s'interface avec les cgroups pour appliquer les limites de ressources.",
    "Pourquoi on en a besoin : « You need a working container runtime on each Node in your cluster, so that the kubelet can launch Pods and their containers. » Sans lui, le kubelet ne peut littéralement rien démarrer. C'est un prérequis obligatoire que kubeadm n'installe PAS (voir note « kubeadm : ce qu'il fait / ne fait pas »).",
    "Kubernetes ne sait pas exécuter de conteneurs lui-même : il délègue entièrement ça via un protocole standard, le CRI (Container Runtime Interface) — « the main gRPC protocol for the communication between the kubelet and Container Runtime ». Le kubelet est client gRPC, le runtime est le serveur en face. Cette séparation permet de changer de runtime sans recompiler Kubernetes."
  ],
  "points": [
    "Runtimes officiellement documentés — containerd, CRI-O, Docker Engine (via l'adaptateur cri-dockerd), Mirantis Container Runtime.",
    "CRI-O — « an implementation of the Kubernetes Container Runtime Interface (CRI) that will allow Kubernetes to directly launch and manage Open Container Initiative (OCI) containers ». Conçu spécifiquement pour Kubernetes (pas un outil généraliste comme containerd, qui sert aussi Docker et d'autres usages).",
    "CRI-O délègue plutôt que de tout refaire — `runc` (runtime OCI) pour l'exécution des conteneurs, des bibliothèques dédiées pour images/stockage, CNI pour le réseau.",
    "Gouvernance — projet CNCF graduated (le plus haut niveau de maturité CNCF), maintenu par une communauté incluant Red Hat, Intel, SUSE, IBM…",
    "Alignement de version avec Kubernetes — CRI-O suit exactement le cycle de versions mineures de Kubernetes (`CRIO_VERSION=v1.32` avec `KUBERNETES_VERSION=v1.32`) et applique la même politique de compatibilité n-2 (version courante + 2 précédentes)."
  ],
  "note": [
    "containerd/CRI-O sont déjà cités dans la note « Control plane » comme runtimes typiques côté worker — cette fiche détaille pourquoi ils existent et ce qui différencie CRI-O des runtimes plus généralistes."
  ],
  "refs": [
    "https://kubernetes.io/docs/setup/production-environment/container-runtimes/",
    "https://kubernetes.io/docs/concepts/architecture/cri/",
    "https://cri-o.io/",
    "https://github.com/cri-o/cri-o"
  ]
},
{
  "id": "f-j1-network-solution",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Solution réseau (CNI) : pourquoi c'est indispensable",
  "lead": "Kubernetes impose un modèle réseau « plat » — mais ne l'implémente pas lui-même : c'est le rôle de la solution réseau (plugin CNI).",
  "body": [
    "Le modèle réseau officiel : « Each pod in a cluster gets its own unique cluster-wide IP address. » et « All pods can communicate with all other pods, whether they are on the same node or on different nodes. Pods can communicate with each other directly, without the use of proxies or address translation (NAT). »",
    "Pourquoi ce modèle existe : « In older container systems, there was no automatic connectivity between containers on different hosts, and so it was often necessary to explicitly create links between containers, or to map container ports to host ports to make them reachable by containers on other hosts. This is not needed in Kubernetes ». Chaque Pod se comporte comme une VM ou une machine physique à part entière (IP propre, joignable directement), ce qui simplifie le service discovery, le load balancing, la migration…"
  ],
  "points": [
    "Kubernetes impose CE modèle (le contrat : IP par Pod, pas de NAT entre Pods) mais ne l'implémente pas lui-même.",
    "L'implémentation réelle revient au container runtime de chaque nœud, via des plugins CNI (Container Network Interface) : « The network model is implemented by the container runtime on each node. The most common container runtimes use Container Network Interface (CNI) plugins to manage their network and security capabilities. »",
    "Conséquence très concrète (déjà vue à l'étape 4 de « Installer un control plane avec kubeadm ») : sans solution réseau installée après `kubeadm init`, les Pods — y compris CoreDNS — restent bloqués. C'est la seule pièce du puzzle qui n'est ni fournie par kubeadm, ni par le container runtime seul."
  ],
  "note": [
    "À relier à la note « Container runtime : définition & CRI-O » : les deux sont des prérequis obligatoires que kubeadm ne pose pas à ta place — le container runtime pour exécuter les conteneurs, la solution réseau (CNI) pour qu'ils puissent se parler entre nœuds."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/cluster-administration/networking/",
    "https://kubernetes.io/docs/concepts/services-networking/"
  ]
},
{
  "id": "f-j1-native-routing",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Native routing vs overlay (VXLAN/IPIP)",
  "lead": "Deux façons pour un CNI de faire circuler le trafic Pod-à-Pod entre nœuds — Kubernetes ne tranche pas, c'est le choix (et le mérite) de la solution réseau.",
  "body": [
    "« Native routing » n'est pas un terme du projet Kubernetes lui-même — kubernetes.io délègue entièrement le *comment* router les paquets aux plugins CNI (voir note « Solution réseau (CNI) »). C'est un terme d'usage courant en formation pour désigner ce que Calico (le CNI le plus documenté sur le sujet) appelle officiellement « running without network overlay/encapsulation ».",
    "Overlay (encapsulation) — le trafic entre Pods est encapsulé (VXLAN, IP-in-IP) pour transiter par-dessus le réseau physique sans que celui-ci connaisse les IP des Pods. Native routing / sans overlay — au contraire, « the underlying network acts as an L3 routing » : le réseau physique route directement les IP des Pods, sans encapsulation."
  ],
  "points": [
    "Comment ça marche (BGP) — Calico « peer[s] with the physical network (typically top of rack routers) to exchange routes », rendant les IP des Pods directement routables sur l'infra réseau.",
    "Deux façons d'y arriver — BGP peering avec le réseau physique (routeurs top-of-rack), ou une adjacence L2 (même réseau de niveau 2) avec BGP peering seulement entre les nœuds.",
    "Sur le cloud — l'équivalent « natif » s'appuie sur le réseau natif du fournisseur (AWS VPC, Azure VNet, Google Cloud Alias IPs) plutôt que du BGP classique.",
    "Pourquoi c'est recommandé par défaut — « we recommend running Calico without network overlay/encapsulation. This gives you the highest performance and simplest network » : pas d'en-têtes d'encapsulation supplémentaires, donc moins d'overhead.",
    "Quand l'overlay redevient utile — quand le réseau sous-jacent ne peut pas connaître les IP des workloads (ex. AWS entre plusieurs VPC/subnets) : Calico peut alors n'encapsuler que le trafic inter-VPC et router nativement à l'intérieur de chaque VPC/subnet (« cross-subnet » encapsulation)."
  ],
  "note": [
    "À relier à la note « Solution réseau (CNI) » : ceci est un exemple concret de ce que « la solution réseau implémente le modèle imposé par Kubernetes » veut dire en pratique — le choix overlay vs native routing est une décision du CNI (ici Calico), pas de Kubernetes."
  ],
  "refs": [
    "https://docs.tigera.io/calico/latest/networking/determine-best-networking",
    "https://docs.tigera.io/calico/latest/networking/configuring/vxlan-ipip"
  ]
},
{
  "id": "f-j1-network-policies",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "NetworkPolicy : le firewall au niveau des Pods",
  "lead": "Par défaut, tout Pod parle à tout le monde. NetworkPolicy change ça — mais seulement si le CNI sait l'appliquer.",
  "body": [
    "« If you want to control traffic flow at the IP address or port level (OSI layer 3 or 4), NetworkPolicies allow you to specify rules for traffic flow within your cluster, and also between Pods and the outside world. » C'est un « application-centric construct which allow you to specify how a pod is allowed to communicate with various network \"entities\" over the network. »",
    "Comportement par défaut, SANS NetworkPolicy : un Pod est non-isolé — toutes les connexions entrantes (ingress) ET sortantes (egress) sont autorisées. Du tout-ouvert."
  ],
  "points": [
    "Une fois qu'un Pod est sélectionné par une NetworkPolicy — « A pod is isolated for ingress if there is any NetworkPolicy that both selects the pod and has \"Ingress\" in its policyTypes. » Seules les connexions explicitement autorisées par la liste `ingress` (+ le trafic venant du nœud du Pod) passent ensuite. Même logique côté `egress`.",
    "C'est du deny-by-default localisé — dès qu'une policy sélectionne le Pod, pas globalement pour tout le cluster.",
    "Prérequis crucial (relié à la note « Solution réseau (CNI) ») : « Network policies are implemented by the network plugin. To use network policies, you must be using a networking solution which supports NetworkPolicy. Creating a NetworkPolicy resource without a controller that implements it will have no effect. » — Kubernetes stocke juste l'objet, c'est le CNI qui doit l'appliquer réellement (Calico, Cilium le font).",
    "Structure de base — `podSelector` (quels Pods la policy cible), `policyTypes` (Ingress et/ou Egress), `ingress`/`egress` (listes de règles `from`/`to` + `ports`)."
  ],
  "note": [
    "À relier à « Native routing vs overlay » et « Cilium » : le choix du CNI n'affecte pas que le routage, il détermine aussi si NetworkPolicy fonctionne du tout — et jusqu'à quel niveau (Cilium va jusqu'au L7, au-delà du simple L3/L4 de la spec NetworkPolicy standard)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
  ]
},
{
  "id": "f-j1-coredns",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "CoreDNS : le DNS interne de Kubernetes",
  "lead": "Ce qui permet aux Pods de se trouver par nom plutôt que par IP.",
  "body": [
    "« kubelet configures Pods' DNS so that running containers can look up Services by name rather than IP. » CoreDNS est le serveur DNS « cluster » déployé par défaut qui fait ces résolutions."
  ],
  "points": [
    "Déploiement — lancé automatiquement comme addon du cluster (voir la phase `addon` dans la note « kubeadm : ce qu'il fait »), tourne comme un Deployment Kubernetes classique, exposé via un Service nommé `kube-dns` (compatibilité historique avec l'ancien DNS de Kubernetes) ; son IP est passée au kubelet via `--cluster-dns=<ip>`.",
    "Services normaux — enregistrement `my-svc.my-namespace.svc.cluster.local`, résout vers la ClusterIP du Service.",
    "Services headless (sans ClusterIP) — même format de nom, mais résout vers TOUTES les IPs des Pods sélectionnés par le Service.",
    "Pods — `<ip-avec-tirets>.<namespace>.pod.cluster.local` (ex : `172-17-0-3.default.pod.cluster.local`).",
    "Ports nommés — enregistrements SRV : `_port-name._port-protocol.my-svc.my-namespace.svc.cluster.local`.",
    "Configuration côté Pod — le kubelet écrit automatiquement le `/etc/resolv.conf` de chaque Pod : `nameserver <ip-coredns>`, `search <namespace>.svc.cluster.local svc.cluster.local cluster.local`, `options ndots:5`. C'est ce `search` qui permet d'appeler juste `data` (même namespace) ou `data.prod` (autre namespace) sans taper le nom complet."
  ],
  "note": [
    "Conséquence pratique déjà vue dans « Installer un control plane avec kubeadm » : sans solution réseau (CNI) installée, CoreDNS reste bloqué (Pending/ContainerCreating) — donc pas de résolution DNS possible tant que le CNI n'est pas en place."
  ],
  "refs": [
    "https://kubernetes.io/docs/tasks/administer-cluster/dns-custom-nameservers/",
    "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/"
  ]
},
{
  "id": "f-j1-cilium-rancher-cni",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Cilium, et le CNI utilisé par Rancher",
  "lead": "Un CNI construit sur eBPF qui va bien au-delà du réseau — et quel CNI tourne réellement derrière un cluster Rancher.",
  "body": [
    "Cilium est « open source software for transparently securing the network connectivity between application services deployed using Linux container management platforms like Docker and Kubernetes ». Construit sur eBPF, une technologie noyau Linux qui « enables the dynamic insertion of powerful security visibility and control logic within Linux itself »."
  ],
  "points": [
    "Networking — fonctionnalités CNI classiques, avec overlay, native routing (voir note « Native routing vs overlay ») et options de routage flexibles.",
    "Remplace kube-proxy — via du load balancing distribué (est-ouest et nord-sud) implémenté en eBPF, au lieu des règles iptables/IPVS classiques.",
    "Sécurité — politiques réseau basées sur l'identité, du L3 au L7 (donc au-delà des simples IP/ports — filtrage applicatif possible, ex. HTTP).",
    "Observabilité — intégré avec Hubble, pour visualiser en détail les communications entre services.",
    "Statut CNCF — projet Graduated (accepté en Incubating le 13 oct. 2021, passé Graduated le 11 oct. 2023), comme CRI-O.",
    "CNI utilisé par Rancher — Rancher pilote des clusters RKE2 (ou K3s), et c'est RKE2 qui embarque le choix des CNI : « RKE2 bundles four primary CNI Plugins: Canal, Cilium, Calico, and Flannel », avec Canal comme CNI par défaut, et Multus disponible en CNI secondaire (à activer en plus d'un CNI primaire).",
    "Détail pratique — seuls Calico et Flannel supportent les nœuds Windows ; Canal et Cilium ne le supportent pas actuellement."
  ],
  "note": [
    "Rancher n'a donc pas « son » CNI propriétaire : c'est RKE2 (la distribution Kubernetes sous-jacente) qui propose le choix, avec Canal en défaut — Cilium en fait partie si tu veux les fonctionnalités eBPF/Hubble vues ci-dessus."
  ],
  "refs": [
    "https://docs.cilium.io/en/stable/overview/intro/",
    "https://www.cncf.io/projects/cilium/",
    "https://docs.rke2.io/networking/basic_network_options"
  ]
},
{
  "id": "f-j1-rke2-vs-rancher",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "RKE2 : la distribution, et sa différence avec Rancher",
  "lead": "RKE2 installe UN cluster ; Rancher pilote PLUSIEURS clusters, RKE2 ou non — deux niveaux différents, à ne pas confondre.",
  "body": [
    "RKE2 est « Rancher's enterprise-ready next-generation Kubernetes distribution », « a fully conformant Kubernetes distribution that focuses on security and compliance within the U.S. Federal Government sector. » Il combine la facilité opérationnelle de K3s (installateur simple, services systemd) et l'alignement strict sur Kubernetes upstream de RKE1 — sans dépendre de Docker, contrairement à RKE1 (containerd est le runtime embarqué)."
  ],
  "points": [
    "Sécurité/conformité, son vrai argument différenciant — configuration durcie permettant de passer le CIS Kubernetes Benchmark avec un minimum d'intervention, support FIPS 140-2, scan de CVE régulier via trivy.",
    "Architecture — composants du control plane en Pods statiques gérés par le kubelet (comme avec kubeadm), containerd en runtime embarqué.",
    "Installation & rôles — script `curl -sfL https://get.rke2.io | sh -` ; deux rôles de nœud, `server` (control plane, écoute sur le port 9345 pour l'enregistrement de nouveaux nœuds) et `agent` (worker, via `INSTALL_RKE2_TYPE=\"agent\"`). Maintenu par SUSE/Rancher.",
    "Rancher, un niveau au-dessus — « Rancher is a Kubernetes management tool to deploy and run clusters anywhere and on any provider. » Il peut provisionner des clusters depuis des fournisseurs managés (EKS, GKE, AKS), monter de l'infra et y installer Kubernetes (via RKE2 ou K3s), ou importer des clusters existants — plus authentification/RBAC centralisés, monitoring/logs, Helm, Fleet (déploiement multi-cluster), CI/CD optionnel.",
    "RKE2 n'est PAS obligatoire pour Rancher — Rancher est agnostique de la distribution. Mais il y a deux endroits où RKE2/K3s interviennent quand même : le serveur Rancher lui-même tourne sur un cluster Kubernetes (la doc recommande RKE2 ou K3s, en HA pour la prod), et RKE2 est l'une des distributions que Rancher peut provisionner pour les clusters qu'il gère."
  ],
  "note": [
    "En une phrase : RKE2 = un moteur pour créer UN cluster ; Rancher = le tableau de bord qui peut piloter PLUSIEURS clusters, qu'ils soient RKE2 ou non — et qui, accessoirement, tourne lui-même sur un cluster RKE2/K3s."
  ],
  "refs": [
    "https://docs.rke2.io/",
    "https://docs.rke2.io/install/quickstart",
    "https://ranchermanager.docs.rancher.com/v2.15/rancher-manager",
    "https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade"
  ]
},
{
  "id": "f-j1-orchestrateur",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Orchestrateur : à quoi ça sert ?",
  "lead": "Automatiser ce qu'on ferait sinon à la main, container par container, serveur par serveur.",
  "body": [
    "Kubernetes se définit officiellement comme « a portable, extensible, open source platform for managing containerized workloads and services that facilitates both declarative configuration and automation. »",
    "Concrètement, un orchestrateur prend en charge :"
  ],
  "points": [
    "Déploiement & rollout/rollback automatisés — mise à jour progressive avec surveillance de l'état de santé",
    "Scaling — horizontal et vertical, manuel ou automatique (HPA/VPA)",
    "Self-healing — redémarre/replace automatiquement les conteneurs défaillants",
    "Service discovery & load balancing — DNS interne, répartition de charge entre Pods",
    "Bin packing automatique — placement intelligent des conteneurs selon les ressources disponibles",
    "Orchestration du stockage — montage automatique (local, cloud, réseau)",
    "Gestion de la config & des secrets — sans reconstruire les images ni exposer les secrets"
  ],
  "note": [
    "En résumé : on décrit un état désiré (déclaratif), et Kubernetes travaille en continu pour que la réalité corresponde à cet état."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/overview/",
    "https://kubernetes.io/"
  ]
},
{
  "id": "f-j1-os-datacenter",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "L'orchestrateur comme « OS du datacenter »",
  "lead": "Kubernetes fait pour un cluster de machines ce qu'un OS fait pour une seule machine.",
  "body": [
    "Un système d'exploitation classique alloue le CPU, la mémoire et le disque aux processus d'une machine. Kubernetes fait la même chose à l'échelle d'un cluster : il abstrait un ensemble de serveurs (nœuds) en une seule ressource de calcul, et place les workloads (Pods) sur les nœuds selon les ressources disponibles — c'est le kube-scheduler.",
    "La doc officielle parle d'une plateforme « for managing containerized workloads across a cluster of machines at datacenter scale » — l'analogie « OS du datacenter » est une façon courante (hors doc officielle) de résumer cette idée : l'app ne « voit » plus un serveur précis, elle s'exécute quelque part dans le cluster, et Kubernetes gère le placement, l'allocation et la récupération des ressources."
  ],
  "points": [
    "Control plane (le « noyau ») — kube-apiserver, kube-scheduler, kube-controller-manager, etcd : décide et mémorise l'état du cluster",
    "Nœuds (les « cœurs CPU ») — kubelet + runtime conteneur exécutent réellement les workloads"
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/architecture/",
    "https://kubernetes.io/docs/concepts/overview/components/"
  ]
},
{
  "id": "f-j1-pod-phase",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Pod phase",
  "lead": "Une vue « haut niveau » du cycle de vie d'un Pod — pas un diagnostic complet à elle seule.",
  "body": [
    "Le champ status.phase d'un Pod résume où il en est dans son cycle de vie. La doc officielle définit 5 valeurs possibles :"
  ],
  "points": [
    "Pending — « The Pod has been accepted by the Kubernetes cluster, but one or more of the containers has not been set up and made ready to run. » (en attente de scheduling, de pull d'image, etc.)",
    "Running — « The Pod has been bound to a node, and all of the containers have been created. At least one container is still running, or is in the process of starting or restarting. »",
    "Succeeded — « All containers in the Pod have terminated in success, and will not be restarted. »",
    "Failed — « All containers in the Pod have terminated, and at least one container has terminated in failure. »",
    "Unknown — « For some reason the state of the Pod could not be obtained. This phase typically occurs due to an error in communicating with the node where the Pod should be running. »"
  ],
  "note": [
    "Nuance importante : la phase ne dit pas tout. Un Pod peut être Running sans être prêt à recevoir du trafic — pour ça, Kubernetes expose des Pod Conditions plus fines : PodScheduled, PodReadyToStartContainers, Initialized, ContainersReady, Ready (celle regardée par les Services/Endpoints)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
  ]
},
{
  "id": "f-j1-node-specs",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Installation : specs des nœuds",
  "lead": "Ce qu'il faut avoir en tête côté machines avant d'installer un cluster : type de machine, architecture CPU, et dimensionnement control plane / workers.",
  "body": [
    "Les nœuds peuvent être des machines virtuelles ou physiques. Une VM se migre plus facilement qu'une machine physique — un argument pour héberger le control plane sur des VMs plutôt que du bare metal.",
    "Architectures CPU supportées par Kubernetes (binaires et images de conteneurs officiels) : amd64 (x86_64), arm64, ainsi que 386, arm (32-bit), ppc64le et s390x."
  ],
  "points": [
    "Control plane — le support de formation indique qu'au moins 1 cœur et 1 Go de RAM suffisent pour kube-apiserver et etcd sur un cluster de quelques dizaines de nœuds. À noter : le minimum officiel documenté par kubeadm pour une machine de control plane est plus élevé — 2 CPU et 2 Go de RAM par machine (voir note ci-dessous).",
    "Workers — les nœuds n'ont pas besoin d'être identiques entre eux (CPU, mémoire…) ; chaque worker peut avoir un profil différent selon les workloads qu'il héberge.",
    "Bien choisir la taille des nœuds : plus de nœuds = plus de overhead d'infrastructure répété sur chaque machine (DaemonSets, agents de monitoring/logging…) ; moins de nœuds = moins de flexibilité et de résilience (perdre un nœud retire une plus grosse part de la capacité du cluster)."
  ],
  "note": [
    "Écart de source à garder en tête : la doc officielle kubeadm (install-kubeadm) fixe un minimum général de 2 CPU et 2 Go de RAM par machine du cluster — je n'ai pas retrouvé le chiffre « 1 cœur / 1 Go pour api-server + etcd » du support de formation directement sur kubernetes.io ; il vient probablement d'un outil/calculateur tiers (voir lien learnkube.com ci-dessous, qui n'est PAS de la documentation officielle Kubernetes). Les deux chiffres ne se contredisent pas forcément (l'un est un plancher par machine, l'autre semble cibler les composants api-server/etcd spécifiquement), mais seul le chiffre kubeadm est vérifié sur une source officielle."
  ],
  "refs": [
    "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/",
    "https://kubernetes.io/releases/download/",
    "https://learnkube.com/kubernetes-instance-calculator"
  ]
},
{
  "id": "f-j1-cluster-sizing",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Dimensionner un cluster en nombre de nœuds",
  "lead": "Les limites officielles de support d'un cluster Kubernetes, et comment le control plane doit suivre quand le nombre de nœuds augmente.",
  "body": [
    "La doc officielle (« Considerations for large clusters ») définit des critères de support pour un cluster Kubernetes : au-delà, le cluster n'est plus dans le périmètre testé/supporté par le projet."
  ],
  "points": [
    "No more than 110 Pods per node.",
    "No more than 5,000 nodes.",
    "No more than 150,000 total Pods.",
    "No more than 300,000 total containers.",
    "Scaling du control plane : « you would run one or two control plane instances per failure zone, scaling those instances vertically first and then scaling horizontally after reaching the point of falling returns to (vertical) scale » — donc on augmente d'abord les ressources (CPU/RAM) des instances existantes, puis on en ajoute de nouvelles seulement une fois les gains de la verticale épuisés.",
    "Tolérance de panne : garder au moins une instance de control plane par zone de disponibilité.",
    "Pour les très gros clusters, la doc recommande de stocker les objets Event dans une instance etcd séparée dédiée, pour ne pas dégrader les performances de l'etcd principal (qui porte Pods, Deployments, etc.)."
  ],
  "note": [
    "À relier à la note « Installation : specs des nœuds » : le compromis « plus de nœuds = plus d'overhead d'infra / moins de nœuds = moins de résilience » y était évoqué de façon générale — ici ce sont les vrais plafonds chiffrés du projet."
  ],
  "refs": [
    "https://kubernetes.io/docs/setup/best-practices/cluster-large/"
  ]
},
{
  "id": "f-j1-controllers-crd-operator",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Controllers, CRD et Operator",
  "lead": "Le patron de base de tout Kubernetes (Controller), comment on ajoute de nouveaux types d'objets (CRD), et comment on combine les deux pour automatiser une appli entière (Operator).",
  "body": [
    "Controller — « controllers are control loops that watch the state of your cluster, then make or request changes where needed. Each controller tries to move the current cluster state closer to the desired state. » Chaque controller suit au moins un type de ressource, qui porte un champ `spec` représentant l'état désiré.",
    "Point clé : les controllers ne se parlent JAMAIS directement entre eux — ils passent tous par l'API server. Exemple du Job controller : « The Job controller does not run any Pods or containers itself. Instead, the Job controller tells the API server to create or remove Pods. » D'autres composants (scheduler, kubelet) observent ensuite ces changements et exécutent le travail — un système découplé et résilient."
  ],
  "points": [
    "CRD (CustomResourceDefinition) — le mécanisme pour ajouter de nouveaux types d'objets à l'API Kubernetes. Une « custom resource » est « an extension of the Kubernetes API that is not necessarily available in a default Kubernetes installation ». Une fois la CRD installée, tu la manipules avec `kubectl` exactement comme un objet natif (mêmes conventions `.spec`/`.status`/`.metadata`).",
    "Deux façons d'étendre l'API — CRD (plus simple, la voie la plus courante) ou API aggregation (plus flexible, plus complexe, plus de contrôle sur les chemins REST).",
    "Operator — « the operator pattern aims to capture the key aim of a human operator who is managing a service or set of services. » Techniquement : « Operators are clients of the Kubernetes API that act as controllers for a Custom Resource » — donc Operator = CRD (l'objet que tu déclares) + un controller qui applique la boucle de contrôle dessus.",
    "Ce qu'un Operator peut automatiser (exemples officiels) — déployer une appli à la demande, prendre/restaurer des backups, gérer les upgrades (code + schéma/config ensemble), publier des Services pour des applis qui ne connaissent pas l'API Kubernetes, simuler des pannes pour tester la résilience, élire un leader pour une appli distribuée sans mécanisme d'élection interne."
  ],
  "note": [
    "CloudNativePG (le sujet complémentaire « hors CKA » de ce trainer) EST justement un Operator PostgreSQL : une CRD `Cluster` (entre autres) + un controller qui gère tout le cycle de vie (HA, backups, upgrades…) — l'exemple concret de tout ce que cette fiche décrit."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/architecture/controller/",
    "https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/",
    "https://kubernetes.io/docs/concepts/extend-kubernetes/operator/"
  ]
},
{
  "id": "f-j1-schema-infra",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "Schéma : infrastructure d'un cluster Kubernetes",
  "lead": "Vue d'ensemble control plane / nœud — qui parle à qui, et qui fait quoi.",
  "diagram": "img/formation-control-plane.svg",
  "body": [
    "Reprend les composants déjà détaillés dans la note « Control plane » et leur pendant côté nœud (kubelet, kube-proxy, container runtime — déjà cité dans la note « 📌 À retenir » de cette même fiche « Control plane ») — ici en schéma pour visualiser les relations entre eux.",
    "L'idée à retenir du schéma : kube-apiserver est le SEUL point d'entrée du cluster. Tous les autres composants (scheduler, controller-manager, cloud-controller-manager, kubelet sur chaque nœud) ne parlent qu'à lui — jamais directement entre eux, ni directement à etcd (seul kube-apiserver lit/écrit dans etcd)."
  ],
  "points": [
    "Control plane — kube-apiserver (hub central), etcd (source de vérité), kube-scheduler (place les Pods), kube-controller-manager (boucles de contrôle), cloud-controller-manager (optionnel, lien avec le cloud).",
    "Nœud (worker) — kubelet (fait tourner les Pods, dialogue avec l'apiserver : reçoit les PodSpecs, remonte le statut), kube-proxy (règles réseau des Services), container runtime (démarre les conteneurs des Pods).",
    "Un cluster a généralement plusieurs nœuds workers (d'où le « × N » sur le schéma) — et peut avoir plusieurs nœuds control-plane en HA (voir note « Fault tolérance du control plane »)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/overview/components/",
    "https://kubernetes.io/docs/concepts/architecture/"
  ]
},
{
  "id": "f-j1-control-plane",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "Control plane",
  "lead": "Le « cerveau » du cluster : il décide, les nœuds exécutent.",
  "body": [
    "Le control plane prend les décisions globales sur le cluster (scheduling, réaction aux événements) et détecte/répond quand un état ne correspond plus à l'état désiré. Il peut tourner sur une seule machine ou être répliqué sur plusieurs (HA) — un cluster de production a généralement au moins 3 nœuds de control plane pour la tolérance aux pannes.",
    "Ses composants, avec leur rôle exact (doc officielle) :"
  ],
  "points": [
    "kube-apiserver — « the core component server that exposes the Kubernetes HTTP API » : le point d'entrée unique, tout (kubectl, contrôleurs, kubelet…) passe par lui",
    "etcd — « consistent and highly-available key value store for all API server data » : la base de données du cluster, la source de vérité",
    "kube-scheduler — « looks for Pods not yet bound to a node, and assigns each Pod to a suitable node » : décide où placer chaque Pod",
    "kube-controller-manager — exécute les boucles de contrôle (controllers) qui implémentent le comportement de l'API Kubernetes (ex : Node controller, Job controller…)",
    "cloud-controller-manager — « integrates with underlying cloud provider(s) » : optionnel, fait le lien avec l'API du cloud (LoadBalancer, volumes, nœuds…)"
  ],
  "note": [
    "En face, chaque nœud (worker) fait tourner : kubelet (« ensures that Pods are running, including their containers »), kube-proxy (règles réseau pour les Services), et le container runtime (containerd, CRI-O…)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/overview/components/",
    "https://kubernetes.io/docs/concepts/architecture/"
  ]
},
{
  "id": "f-j1-kubeadm",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "kubeadm : à quoi ça sert (et ce qui n'est pas dans son périmètre)",
  "lead": "L'outil officiel pour bootstrapper un cluster « best-practice » — rien de plus, rien de moins.",
  "body": [
    "kubeadm est « a tool built to provide kubeadm init and kubeadm join as best-practice \"fast paths\" for creating Kubernetes clusters ».",
    "Sa promesse est volontairement limitée : « kubeadm performs the actions necessary to get a minimum viable cluster up and running. By design, it cares only about bootstrapping, not about provisioning machines. » C'est pour ça que dans la note « Kubernetes vanilla », kubeadm reste l'outil de référence du cluster « auto-géré » — et que Kubespray (voir note dédiée) s'appuie dessus (ou l'automatise) pour aller plus loin, à l'échelle de plusieurs machines."
  ],
  "points": [
    "kubeadm init génère la chaîne de certificats du cluster (phase `certs`) — CA Kubernetes, CA etcd, CA front-proxy, certificats de kube-apiserver, certificats client du kubelet, certificats etcd, clé de signature des service accounts.",
    "kubeadm init configure et démarre le kubelet sur le nœud (phase `kubelet-start`) — et `kubeadm join` fait l'équivalent sur chaque nœud rejoint. Nuance importante : il n'installe PAS le binaire kubelet lui-même, qui doit être pré-installé sur la machine (cf. prérequis dans « Installer un control plane avec kubeadm »).",
    "kubeadm init déploie etcd (membre local ou externe) et les composants du control plane (apiserver, controller-manager, scheduler) en Pods statiques (phases `etcd` et `control-plane`).",
    "kubeadm join fournit un moyen simple de rattacher un worker (ou un nœud control-plane supplémentaire en HA) au cluster, via un bootstrap token généré par `kubeadm init`/`kubeadm token`.",
    "kubeadm installe aussi CoreDNS et kube-proxy automatiquement (phase `addon`) — seul le plugin réseau des Pods (CNI) reste à installer manuellement, voir l'étape 4 de « Installer un control plane avec kubeadm ».",
    "kubeadm upgrade fait monter de version un cluster déjà initialisé ; kubeadm certs et kubeadm token gèrent certificats et tokens après coup ; kubeadm reset annule ce que `init`/`join` a fait sur un hôte."
  ],
  "note": [
    "Ce que kubeadm NE fait PAS, à dessein (« it cares only about bootstrapping, not about provisioning machines ») : créer les machines/VMs, configurer l'infrastructure réseau sous-jacente — le plugin CNI reste une installation manuelle —, et installer le container runtime sur les machines, un prérequis à poser toi-même avant `kubeadm init`/`join`. Il ne gère pas non plus les addons « nice-to-have » comme le Dashboard ou le monitoring (« installing various nice-to-have addons […] is not in scope »)."
  ],
  "refs": [
    "https://kubernetes.io/docs/reference/setup-tools/kubeadm/",
    "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/",
    "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init-phase/",
    "https://kubernetes.io/docs/setup/production-environment/container-runtimes/"
  ]
},
{
  "id": "f-j1-control-plane-install",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "Installer un control plane avec kubeadm — étapes clés",
  "lead": "5 étapes pour passer de zéro à un control plane fonctionnel (topologie stacked).",
  "body": [
    "Suite de la note « Control plane » : voici comment le mettre en place concrètement avec kubeadm (l'outil « vanilla » vu dans la note « Kubernetes vanilla »)."
  ],
  "points": [
    "1. Prérequis sur chaque machine — OS Linux compatible deb/rpm, ≥ 2 GiB RAM, ≥ 2 CPU sur le nœud control-plane, connectivité réseau complète entre les machines, un container runtime installé (containerd, CRI-O…), et kubeadm + kubelet + kubectl installés sur tous les hôtes.",
    "2. Initialiser le control plane — `kubeadm init --apiserver-advertise-address=<ip> --pod-network-cidr=<cidr>`. En une seule commande : préflight checks, génération des certificats/clés, démarrage des composants du control plane (apiserver, scheduler, controller-manager, etcd local par défaut en topologie stacked), et génération du token de bootstrap pour les workers.",
    "3. Configurer l'accès kubectl — copier /etc/kubernetes/admin.conf vers $HOME/.kube/config (`mkdir -p $HOME/.kube && sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config && sudo chown $(id -u):$(id -g) $HOME/.kube/config`), ou exporter `KUBECONFIG=/etc/kubernetes/admin.conf`.",
    "4. Installer un plugin réseau de Pods (CNI) — obligatoire : sans lui, les Pods (dont CoreDNS) restent bloqués. `kubectl apply -f <manifest-du-CNI-choisi>`.",
    "5. Joindre les workers (ou d'autres nœuds control-plane en HA) — générer le token via `kubeadm token create --print-join-command`, puis exécuter la commande `kubeadm join <ip>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>` sur chaque nœud à rejoindre."
  ],
  "note": [
    "Pour repartir de zéro sur un nœud : `kubeadm reset`. Pour retirer un nœud proprement : `kubectl drain <node> --delete-emptydir-data --force --ignore-daemonsets` puis `kubectl delete node <node>`."
  ],
  "refs": [
    "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/",
    "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/"
  ]
},
{
  "id": "f-j1-controller-manager",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "kube-controller-manager",
  "lead": "« a daemon that embeds the core control loops shipped with Kubernetes » — le muscle qui fait converger l'état réel vers l'état désiré.",
  "body": [
    "Un control loop est défini par la doc comme « a non-terminating loop that regulates the state of the system » — l'analogie officielle est un thermostat : on fixe une température désirée, la boucle observe la température actuelle et agit pour réduire l'écart.",
    "Chaque contrôleur suit ce même schéma pour une ressource Kubernetes donnée, et il n'agit jamais directement sur les conteneurs : il passe systématiquement par le kube-apiserver (ex : le Job controller « does not run any Pods or containers itself. Instead, the Job controller tells the API server to create or remove Pods. »).",
    "Le kube-controller-manager regroupe plusieurs de ces boucles en un seul processus binaire (pour simplifier l'opération), parmi lesquelles :"
  ],
  "points": [
    "Node controller — surveille l'état des nœuds",
    "Replication controller — maintient le bon nombre de Pods pour un ReplicationController",
    "Endpoints controller — peuple les objets Endpoints (lie Services ↔ Pods)",
    "Namespace / ServiceAccount controllers — créent les comptes et jetons par défaut d'un namespace",
    "+ des contrôleurs de plus haut niveau (souvent configurables) : Deployment, StatefulSet, Job, DaemonSet, HorizontalPodAutoscaler…"
  ],
  "note": [
    "Le flag --controllers permet d'activer/désactiver individuellement ces boucles."
  ],
  "refs": [
    "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/",
    "https://kubernetes.io/docs/concepts/architecture/controller/"
  ]
},
{
  "id": "f-j1-etcd-bagotte",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "Si etcd bagotte, tout le cluster tombe ?",
  "lead": "Non, pas instantanément — mais le control plane se « gèle » si le quorum est perdu.",
  "body": [
    "etcd est « the consistent and highly-available key value store used as Kubernetes' backing store for all cluster data » — donc s'il devient instable, le control plane a du mal à lire/écrire l'état du cluster. Mais la conséquence dépend de la gravité :"
  ],
  "points": [
    "Instabilité légère (latence, un membre lent) — élections de leader plus fréquentes, API server plus lent/timeouts occasionnels. Dégradé, mais pas mort.",
    "Perte du quorum (majorité des membres etcd injoignables) — etcd n'accepte plus les écritures (et parfois les lectures) → l'API server ne peut plus persister d'état → plus aucun nouveau scheduling, déploiement, scaling, reconciliation par les controllers."
  ],
  "note": [
    "etcd utilise Raft : il faut une majorité (n/2)+1 de membres vivants pour continuer à fonctionner. D'où la recommandation officielle : nombre impair de membres (ajouter un membre pour passer à un nombre pair n'apporte aucune tolérance en plus), et généralement 3 ou 5 en pratique (5 = bon compromis résilience/perf en écriture).",
    "Le nombre de membres etcd est un choix de dimensionnement fixé au départ, pas un paramètre à faire varier au gré des besoins comme le nombre de workers : la FAQ etcd prévient explicitement que redimensionner à chaud est risqué — « If the cluster is in a state where it can't tolerate any more failures, adding a node before removing nodes is dangerous because if the new node fails to register with the cluster [...], quorum will be permanently lost. » Pour remplacer un membre, la règle est de retirer l'ancien avant d'ajouter le nouveau : « When replacing an etcd node, it's important to remove the member first and then add its replacement. »",
    "Important — les Pods déjà lancés ne s'arrêtent pas immédiatement : chaque kubelet continue de gérer les conteneurs déjà assignés à son nœud indépendamment de l'API server. Donc le trafic déjà en cours continue globalement de tourner ; ce qui s'arrête, c'est tout ce qui nécessite une décision/écriture côté control plane (nouveaux déploiements, self-healing avancé, scaling, mises à jour…).",
    "Pour limiter le risque : etcd en HA répartie sur plusieurs zones de panne, topologie stacked (etcd sur les mêmes nœuds que le control plane, plus simple) ou external (etcd sur des nœuds dédiés, meilleure isolation), et surtout — la doc insiste dessus — avoir un plan de sauvegarde des données etcd."
  ],
  "refs": [
    "https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/",
    "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/ha-topology/",
    "https://etcd.io/docs/v3.6/faq/"
  ]
},
{
  "id": "f-j1-fault-tolerance",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "Fault tolérance du control plane",
  "lead": "On ne rend pas qu'etcd résilient — tout le control plane se réplique.",
  "body": [
    "Suite logique du point précédent : pour qu'une panne d'un nœud (ou d'une zone) ne mette pas le cluster en péril, la doc officielle kubeadm recommande de répliquer l'intégralité du control plane, pas seulement etcd :"
  ],
  "points": [
    "≥ 3 nœuds de control plane, en nombre impair — « an odd number of control plane nodes can help with leader selection in the case of machine or zone failure »",
    "Chaque nœud fait tourner sa propre instance de kube-apiserver, kube-scheduler, kube-controller-manager (et etcd si topologie stacked)",
    "Load balancer devant les kube-apiserver : les clients (kubectl, kubelets…) ne parlent pas à un apiserver précis mais à un ControlPlaneEndpoint (DNS) pointant vers un load balancer TCP qui fait un health check sur le port 6443 de chaque apiserver, route uniquement vers les instances saines, et utilise un nom DNS plutôt qu'une IP fixe (recommandé, surtout en cloud)"
  ],
  "note": [
    "Et le scheduler / controller-manager ? Contrairement à l'apiserver (actif sur tous les nœuds en même temps), kube-scheduler et kube-controller-manager utilisent une élection de leader basée sur les objets Lease (API group coordination.k8s.io) : un seul est actif à la fois, les autres sont en standby et prennent le relais si le leader disparaît.",
    "Communication nœuds ↔ control plane : architecture « hub-and-spoke », tout passe par l'apiserver, connexions chiffrées par défaut (HTTPS + certificats). Pour les connexions control plane → nœud (logs, exec, port-forward), le Konnectivity service (proxy TCP moderne) a remplacé les anciens tunnels SSH."
  ],
  "refs": [
    "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/",
    "https://kubernetes.io/docs/concepts/architecture/leases/",
    "https://kubernetes.io/docs/concepts/architecture/control-plane-node-communication/"
  ]
},
{
  "id": "f-j1-etcd-topology-install",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "etcd : topologie stacked (local) vs external — étapes d'installation",
  "lead": "Deux topologies possibles avec kubeadm, avec des étapes d'installation très différentes.",
  "body": [
    "Suite de la note « Fault tolérance du control plane » : kubeadm propose deux topologies pour placer etcd.",
    "Stacked (local) — topologie par défaut : « This is the default topology in kubeadm. A local etcd member is created automatically on control plane nodes when using kubeadm init and kubeadm join --control-plane. » etcd tourne colocalisé avec kube-apiserver/kube-scheduler/kube-controller-manager, sur les mêmes nœuds. Avantage : « simpler to set up than a cluster with external etcd nodes, and simpler to manage for replication. » Inconvénient : « A stacked cluster runs the risk of failed coupling. If one node goes down, both an etcd member and a control plane instance are lost, and redundancy is compromised » — d'où la recommandation d'un minimum de 3 nœuds de control plane.",
    "External — etcd sur des hôtes dédiés, séparés du control plane. Avantage : « This topology decouples the control plane and etcd member [...] losing a control plane instance or an etcd member has less impact. » Inconvénient : « This topology requires twice the number of hosts as the stacked HA topology » — minimum 3 hôtes control plane + 3 hôtes etcd = 6 nœuds. Étapes d'installation (guide dédié kubeadm) :"
  ],
  "points": [
    "Sur chaque hôte etcd : configurer le kubelet comme gestionnaire des static pods (staticPodPath, cgroupDriver…)",
    "Générer la CA etcd : `kubeadm init phase certs etcd-ca`",
    "Générer par hôte les certificats serveur/peer/healthcheck-client/apiserver-etcd-client : `kubeadm init phase certs etcd-server|etcd-peer|etcd-healthcheck-client|apiserver-etcd-client --config=...`",
    "Distribuer les certificats sur chaque hôte (ne garder que ca.crt/ca.key sur l'hôte d'origine)",
    "Générer le manifeste static pod etcd sur chaque hôte : `kubeadm init phase etcd local --config=...`",
    "Côté control plane, référencer ce cluster externe dans la ClusterConfiguration via le champ `etcd.external` (endpoints, caFile, certFile, keyFile)"
  ],
  "note": [
    "Comparatif rapide : stacked = plus simple, moins de machines, mais panne couplée (control plane + etcd) ; external = plus résilient (découplé), mais deux fois plus d'hôtes à gérer."
  ],
  "refs": [
    "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/ha-topology/",
    "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/setup-ha-etcd-with-kubeadm/"
  ]
},
{
  "id": "f-j1-etcd-raft",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "etcd & le protocole Raft",
  "lead": "Le mécanisme qui permet aux membres d'etcd de rester d'accord entre eux, même en cas de panne.",
  "body": [
    "Note : Raft n'est pas un projet kubernetes.io — c'est l'algorithme de consensus utilisé par etcd (raft.github.io, papier de Diego Ongaro). Conçu pour être « easy to understand » (contrairement à Paxos), il repose sur des state machines répliquées : chaque membre tient un log identique, et un algorithme de consensus garantit que tous les membres appliquent exactement les mêmes commandes, dans le même ordre.",
    "Les rôles : à tout moment, chaque nœud etcd est leader, follower ou candidate (en cours d'élection). Un seul leader à la fois traite les écritures.",
    "Vocabulaire officiel (glossaire etcd) :"
  ],
  "points": [
    "Term — « a monotonically increasing integer that is associated with each leader election [...] For a term there can only be one elected leader and term is incremented on leader change »",
    "Election — « the etcd cluster holds elections among its members to choose a leader as part of the raft consensus protocol »",
    "Quorum — « the number of active members needed for consensus to modify the cluster state. etcd requires a member majority to reach quorum » (voir la note « Si etcd bagotte » pour les chiffres)"
  ],
  "note": [
    "En pratique, si le leader tombe : les followers détectent l'absence de heartbeat (timeout d'élection), un ou plusieurs deviennent candidate, déclenchent une nouvelle élection (nouveau term), et le premier à obtenir la majorité des votes devient le nouveau leader."
  ],
  "refs": [
    "https://raft.github.io/",
    "https://etcd.io/docs/v3.8/learning/glossary/",
    "https://raft.github.io/raft.pdf"
  ]
},
{
  "id": "f-j1-scheduler-filter-score",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "kube-scheduler : filtering & scoring",
  "lead": "Comment le scheduler choisit LE bon nœud pour un Pod, en 2 étapes.",
  "body": [
    "Le scheduler surveille en continu les Pods sans nœud assigné (nodeName vide) et décide, pour chacun, du « meilleur » nœud. Processus officiel en deux temps :"
  ],
  "points": [
    "Filtering — « finds the set of Nodes where it's feasible to schedule the Pod ». Élimine les nœuds incompatibles : pas assez de ressources (CPU/RAM), taints non tolérés, affinité/anti-affinité non respectée, port déjà utilisé… Si aucun nœud ne passe, le Pod reste Pending.",
    "Scoring — « the scheduler assigns a score to each Node that survived filtering, basing this score on the active scoring rules ». Les nœuds restants sont classés (répartition de charge, affinité préférée, spread de topologie…). Le Pod part sur le nœud avec le meilleur score (aléatoire en cas d'égalité), puis le scheduler notifie l'apiserver via un binding."
  ],
  "note": [
    "Personnalisable via : Scheduling Policies (Predicates/Priorities, ancienne approche) ou Scheduling Profiles (Plugins sur les étapes Filter/Score/Bind, approche actuelle — la « Scheduling Framework »)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/",
    "https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/"
  ]
},
{
  "id": "f-j1-filtering-detail",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "Filtering en détail",
  "lead": "Zoom sur l'étape 1 du scheduler : éliminer les nœuds qui ne PEUVENT pas faire tourner le Pod.",
  "body": [
    "Définition officielle : « these plugins are used to filter out nodes that cannot run the Pod. » Le scheduler appelle chaque filter plugin, dans l'ordre configuré, pour chaque nœud candidat. Dès qu'un plugin déclare un nœud infaisable, les plugins suivants ne sont même pas évalués pour ce nœud (court-circuit) — les nœuds peuvent être évalués en parallèle.",
    "La suite d'étapes autour du Filter :"
  ],
  "points": [
    "PreFilter — prépare les infos et vérifie l'état général du cluster/Pod avant de filtrer ; si erreur ici, tout le cycle de scheduling est annulé",
    "Filter — élimine les nœuds infaisables",
    "PostFilter — ne s'exécute que si aucun nœud n'a survécu au filtering ; peut tenter une remédiation, typiquement la préemption (évincer un Pod de priorité plus faible pour libérer de la place)"
  ],
  "note": [
    "Ce qui rend un nœud « infeasible » (contraintes dures) : ressources insuffisantes (CPU/mémoire), nodeSelector (labels exigés absents), Node affinity required (requiredDuringSchedulingIgnoredDuringExecution) non satisfaite, taints non tolérés, ports déjà occupés, volumes non montables sur ce nœud, etc.",
    "Piège classique : l'affinité preferred (preferredDuringSchedulingIgnoredDuringExecution) n'intervient PAS ici — c'est une préférence « souple » gérée à l'étape Score, pas au Filter. Seule la version required peut éliminer un nœud.",
    "Et nodeName dans le spec du Pod court-circuite tout le scheduler (filtering + scoring) : le Pod va directement sur ce nœud, sans vérification.",
    "Si zéro nœud ne passe le filtering → le Pod reste Pending (visible avec kubectl describe pod, event « FailedScheduling »), en attendant PostFilter/préemption ou qu'un nœud se libère."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/",
    "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/",
    "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/"
  ]
},
{
  "id": "f-j1-filtering-volumes",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "Filtering (2/2) : contraintes de volumes",
  "lead": "Suite de la note « Filtering en détail » : un nœud peut aussi être éliminé à cause du stockage qu'il ne peut pas satisfaire.",
  "body": [
    "À côté du CPU/mémoire, des labels et des taints, le scheduler vérifie aussi que les volumes demandés par le Pod peuvent effectivement être attachés/montés sur le nœud candidat. Ces vérifications portaient historiquement des noms de Predicates (ancien mécanisme de Scheduling Policy, déprécié depuis Kubernetes v1.23, remplacé par des filter plugins de la Scheduling Framework) :"
  ],
  "points": [
    "VolumeRestrictions — vérifie que les volumes montés respectent les restrictions propres à leur provider de stockage",
    "VolumeBinding — vérifie si le nœud a, ou peut obtenir, les volumes demandés (bind du PVC)",
    "VolumeZone — vérifie que les volumes demandés respectent leurs contraintes de zone (ex. un disque créé en eu-west-1a ne peut pas être monté sur un nœud d'une autre zone)",
    "EBSLimits / GCEPDLimits / AzureDiskLimits — vérifient que les limites de volumes AWS EBS / GCP PD / Azure Disk du nœud ne sont pas dépassées (legacy, spécifiques à un cloud)",
    "NodeVolumeLimits — équivalent générique CSI des trois précédents : vérifie les limites de volumes CSI du nœud"
  ],
  "note": [
    "Pourquoi c'est important : chaque cloud limite le nombre de volumes attachables à une seule machine. La doc officielle est explicite : « it is important for Kubernetes to respect those limits. Otherwise, Pods scheduled on a Node could get stuck waiting for volumes to attach. » D'où l'intérêt de filtrer avant de placer le Pod plutôt que de le laisser bloqué en ContainerCreating.",
    "À retenir : les 3 limites « legacy » par cloud (EBS/GCE PD/Azure) sont progressivement remplacées par NodeVolumeLimits, générique et basé sur CSI — la tendance générale de Kubernetes est de sortir le code spécifique aux clouds du cœur du projet."
  ],
  "refs": [
    "https://kubernetes.io/docs/reference/scheduling/policies/",
    "https://kubernetes.io/docs/concepts/storage/storage-limits/"
  ]
},
{
  "id": "f-j1-ranking-scoring",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "Ranking / scoring en détail",
  "lead": "Le filtering élimine ; le scoring classe ce qui reste pour choisir LE meilleur nœud.",
  "body": [
    "Pipeline officiel pour chaque nœud ayant survécu au filtering :"
  ],
  "points": [
    "PreScore — travail préparatoire, génère un état partagé réutilisé par les plugins de score suivants (erreur ici = cycle de scheduling annulé)",
    "Score — chaque plugin attribue une note à chaque nœud, « a well defined range of integers representing the minimum and maximum scores » (typiquement 0 à un NodeScoreMax, souvent 100)",
    "NormalizeScore — ramène les scores bruts d'un plugin sur l'échelle commune avant le classement final (ex. mise à l'échelle proportionnelle au meilleur score obtenu)"
  ],
  "note": [
    "Le scheduler combine les scores de tous les plugins selon leurs poids configurés (« plugin weights ») → score total par nœud → le meilleur gagne (aléatoire en cas d'égalité).",
    "Le plugin clé : NodeResourcesFit — LeastAllocated (comportement par défaut) favorise les nœuds les moins utilisés → étale la charge sur le cluster ; MostAllocated favorise les nœuds déjà bien remplis (bin packing), utile pour consolider et libérer des nœuds entiers à scale-down (économies cloud) ; RequestedToCapacityRatio permet une courbe de scoring personnalisable, avec un poids par type de ressource.",
    "Autres signaux de scoring courants (contraintes « souples », contrairement au filtering) : node affinity preferred, inter-pod affinity/anti-affinity, PodTopologySpreadConstraints, et ImageLocality (favorise un nœud qui a déjà l'image du conteneur en cache → démarrage plus rapide)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/",
    "https://kubernetes.io/docs/concepts/scheduling-eviction/resource-bin-packing/"
  ]
},
{
  "id": "f-j1-plugins-extension",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "Plugins & extension points",
  "lead": "Le scheduler n'est pas une boîte noire : c'est un pipeline de plugins, extensible bout en bout.",
  "body": [
    "Vue d'ensemble officielle : « these APIs allow most scheduling features to be implemented as plugins, while keeping the scheduling 'core' lightweight and maintainable. » Chaque étape déjà vue (Filter, Score, PreFilter…) n'est en fait qu'un extension point parmi 13, appelés dans l'ordre à chaque cycle de scheduling.",
    "Scheduling Profiles : « you can configure a set of plugins as a scheduler profile and then define multiple profiles to fit various kinds of workload » — un seul binaire kube-scheduler peut faire tourner plusieurs profils (combinaisons de plugins activés/désactivés/pondérés), chacun choisi via schedulerName dans le Pod. Il est aussi possible de déployer un second scheduler complet en parallèle du défaut (doc « Configure Multiple Schedulers »)."
  ],
  "note": [
    "Aller plus loin : au-delà des plugins in-tree, l'écosystème kubernetes-sigs/scheduler-plugins fournit des plugins out-of-tree pour des besoins non couverts nativement (coscheduling / gang scheduling, contraintes NUMA/topologie…)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/",
    "https://kubernetes.io/docs/tasks/extend-kubernetes/configure-multiple-schedulers/"
  ]
},
{
  "id": "f-j1-secrets-base64",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Secrets & sécurité",
  "title": "Secrets : encodé ≠ chiffré",
  "lead": "Piège classique : un Secret Kubernetes n'est pas illisible par défaut.",
  "body": [
    "Par défaut, la valeur d'un Secret est simplement encodée en base64, pas chiffrée. Le base64 est réversible instantanément — ce n'est pas une protection, juste un format qui permet de stocker du binaire dans du JSON/YAML.",
    "Conséquence : quiconque a accès à l'API (avec les droits get sur les secrets) ou à etcd directement peut lire la valeur en clair en une commande.",
    "Comment se protéger réellement :"
  ],
  "points": [
    "Chiffrement au repos (encryption at rest) — activer une EncryptionConfiguration côté kube-apiserver avec un provider (aescbc, kms, secretbox — identity = pas de chiffrement, c'est le défaut). S'ajoute au chiffrement disque/etcd, ne le remplace pas.",
    "RBAC strict — limiter qui peut faire get/list/watch sur les secrets (principe du moindre privilège)",
    "Sécuriser etcd — accès réseau restreint, chiffrement disque du stockage etcd",
    "Audit logging — tracer les accès aux secrets"
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/configuration/secret/",
    "https://kubernetes.io/docs/concepts/security/secrets-good-practices/",
    "https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/"
  ]
},
{
  "id": "f-j1-eso",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Secrets & sécurité",
  "title": "External Secrets Operator (ESO)",
  "lead": "Fait le pont entre un coffre-fort externe (Vault, AWS Secrets Manager…) et les Secrets Kubernetes.",
  "body": [
    "Note : ESO n'est pas un projet kubernetes.io — c'est un opérateur open source séparé (external-secrets.io), couramment utilisé en formation/en entreprise pour combler le problème du base64 vu juste au-dessus (les secrets ne doivent pas vivre en clair dans les manifests/Git).",
    "Le principe : au lieu d'écrire la vraie valeur d'un Secret dans un YAML, on décrit où aller la chercher. ESO la récupère régulièrement et crée/synchronise le Secret Kubernetes natif à ta place."
  ],
  "points": [
    "SecretStore (namespacé) / ClusterSecretStore (cluster-wide) — définit comment s'authentifier auprès du provider externe",
    "ExternalSecret — définit quelles données aller chercher, référence un SecretStore, gère le templating",
    "Le controller crée un Secret Kubernetes standard, tenu à jour automatiquement en cas de rotation côté provider",
    "Providers supportés (40+) : AWS Secrets Manager/Parameter Store, HashiCorp Vault, Azure Key Vault, GCP Secret Manager, 1Password, Bitwarden, GitHub/GitLab, etc."
  ],
  "note": [
    "Limite à garder en tête : le Secret K8s résultant reste un Secret K8s classique — donc toujours « juste » en base64 côté etcd tant que l'encryption at rest n'est pas activée. ESO résout « où vit la vérité » (le vault externe), pas le stockage dans etcd."
  ],
  "refs": [
    "https://external-secrets.io/latest/introduction/overview/",
    "https://github.com/external-secrets/external-secrets"
  ]
},
{
  "id": "f-j1-vault",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Secrets & sécurité",
  "title": "Comment Vault interagit avec Kubernetes",
  "lead": "D'abord s'authentifier, ensuite récupérer/injecter les secrets — plusieurs façons de faire selon HashiCorp.",
  "body": [
    "1. S'authentifier — la méthode d'auth Kubernetes. Un Pod prouve son identité à Vault avec son propre service account token : il lit son JWT (token du ServiceAccount) monté dans /var/run/secrets/kubernetes.io/serviceaccount/token, l'envoie à l'endpoint de login de Vault avec un nom de role ; Vault vérifie ce JWT auprès de l'API TokenReview de Kubernetes (donc Vault doit avoir les droits pour appeler l'API K8s). Si valide, Vault renvoie un token Vault de courte durée, avec les permissions du role.",
    "2. Récupérer les secrets — 3 méthodes comparées (doc officielle HashiCorp) :"
  ],
  "points": [
    "Vault Secrets Operator (VSO) — synchronise les secrets Vault vers de vrais Secrets Kubernetes natifs via des CRDs. Approche « Kubernetes-native », la moins gourmande (charge sur Vault mutualisée). C'est le pendant HashiCorp d'ESO, mais spécifique à Vault.",
    "Vault CSI Provider — monte les secrets comme volumes éphémères via le driver Secrets Store CSI (standard, multi-vendeurs). Une connexion Vault par Pod → charge plus élevée.",
    "Vault Agent Injector — injecte un sidecar « Vault Agent » dans le Pod, qui s'authentifie et écrit les secrets dans un volume mémoire partagé. Pratique si plusieurs secrets/templates ou méthodes d'auth variées par appli, mais le plus coûteux en ressources."
  ],
  "note": [
    "À retenir : contrairement à ESO (secret réellement recréé en Secret K8s), CSI et Agent Injector évitent parfois de matérialiser le secret dans etcd — un angle en plus de la protection vue avec « Secrets : encodé ≠ chiffré »."
  ],
  "refs": [
    "https://developer.hashicorp.com/vault/docs/auth/kubernetes",
    "https://developer.hashicorp.com/vault/docs/deploy/kubernetes/comparisons"
  ]
},
{
  "id": "f-j1-admission-webhooks",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Secrets & sécurité",
  "title": "Admission webhooks : mutating vs validating, en pratique",
  "lead": "Le dernier filtre avant etcd — et le mécanisme qui permet à des outils tiers (Istio, Vault...) de modifier ou bloquer tes ressources à la volée.",
  "body": [
    "Suite de la note « Admission controllers » vue en discussion : le flux exact, dans l'ordre — « Mutating admission webhooks are invoked first, and can modify objects sent to the API server to enforce custom defaults. After all object modifications are complete, and after the incoming object is validated by the API server, validating admission webhooks are invoked and can reject requests to enforce custom policies. » Donc : authentification → autorisation (RBAC) → admission MUTATING (intégrés + webhooks) → validation du schéma de l'objet par l'API server → admission VALIDATING (intégrés + webhooks) → persistance dans etcd.",
    "Piège à connaître : un objet peut encore être modifié après être passé devant un mutating webhook (par un autre mutating webhook ensuite) — un webhook qui a besoin de voir l'état VRAIMENT final doit donc être un validating webhook, pas mutating."
  ],
  "points": [
    "Configuration d'un webhook — un objet `MutatingWebhookConfiguration` ou `ValidatingWebhookConfiguration` définit : `rules` (quelles opérations/ressources déclenchent l'appel, ex. CREATE sur des pods), `clientConfig.service` (namespace + nom du Service qui expose le webhook), `caBundle` (le certificat CA pour valider le serveur du webhook), `timeoutSeconds` (10s par défaut).",
    "Istio (sidecar injection) — « Sidecars can be automatically added to applicable Kubernetes pods using a mutating webhook admission controller provided by Istio. » En labellisant un namespace `istio-injection=enabled`, chaque nouveau Pod reçoit automatiquement le sidecar Envoy (le proxy qui gère le trafic réseau et le chiffrement mTLS du service mesh) — sans toucher aux manifests des Deployments.",
    "Vault Agent Injector (déjà vu dans la note « Comment Vault interagit avec Kubernetes ») — « The Vault Agent Injector alters pod specifications to include Vault Agent containers that render Vault secrets to a shared memory volume. » Techniquement, c'est un « Kubernetes Mutation Webhook Controller » : il intercepte la création/mise à jour de Pods et ajoute un init container (pré-remplit les secrets) + un sidecar (les maintient à jour), pilotés par des annotations sur le Pod.",
    "Autres cas d'usage courants (mentionnés en formation, à prendre comme illustrations pratiques plutôt que comme faits officiellement documentés ici) — des fournisseurs cloud ou des équipes plateforme utilisent des mutating webhooks pour imposer des bonnes pratiques par défaut sur TOUT ce qui transite (ex. forcer des requests/limits CPU/RAM absents, ou injecter automatiquement un label de coût/équipe pour du FinOps quand les développeurs ne l'ont pas mis eux-mêmes)."
  ],
  "note": [
    "Le webhook lui-même n'est qu'un service HTTP que TU écris et déploies (le CA bundle doit correspondre à son certificat serveur) — Kubernetes ne fait qu'appeler ce service à chaque event matchant les `rules`. D'où l'existence de « policy engines » prêts à l'emploi (Kyverno, OPA Gatekeeper — voir note dédiée) pour éviter d'écrire ce service soi-même."
  ],
  "refs": [
    "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/",
    "https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/",
    "https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/",
    "https://developer.hashicorp.com/vault/docs/platform/k8s/injector"
  ]
},
{
  "id": "f-j1-policy-engines",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Secrets & sécurité",
  "title": "Policy engines : Kyverno & OPA Gatekeeper",
  "lead": "Plutôt que d'écrire ton propre admission webhook, ces outils jouent ce rôle pour toi — tu déclares des règles, pas du code.",
  "body": [
    "Suite de la note « Admission webhooks » : écrire et opérer son propre service de webhook (cert, déploiement, disponibilité...) est lourd pour chaque règle voulue. Les policy engines résolvent ça : ils SONT le webhook (mutating et/ou validating), et tu leur donnes des règles déclaratives plutôt que du code."
  ],
  "points": [
    "Kyverno — « Secure, automate, and operate all your infrastructure and applications with YAML and CEL based policies. » Les policies s'écrivent en YAML (+ CEL, Common Expression Language) — pas de nouveau langage à apprendre. Projet CNCF Graduated.",
    "OPA Gatekeeper — « a validating and mutating webhook that enforces CRD-based policies executed by Open Policy Agent, a policy engine for Cloud Native environments. » Gatekeeper = l'intégration Kubernetes-native d'OPA (policy engine généraliste, pas spécifique à K8s) : CRDs `ConstraintTemplate` (le modèle de règle) et `Constraint` (son application concrète), plus audit et mutation. OPA (le moteur sous-jacent) est un projet CNCF Graduated.",
    "Rego, le langage d'OPA/Gatekeeper — « OPA is purpose built for policy evaluation and uses its declarative language Rego to reason about structured data like API requests, infrastructure-as-code files, and configuration data. » Inspiré de Datalog, étendu pour manipuler des documents structurés type JSON. C'est un langage purement déclaratif/syntaxique, pas un langage généraliste (pas de comparaison directe avec C/Java/Python) — la principale différence pratique avec Kyverno.",
    "Exemples de règles typiques avec l'un ou l'autre — interdire la création de Pods dans certains namespaces, exiger des requests/limits sur tous les Pods, n'autoriser que des images venant d'un registre approuvé."
  ],
  "note": [
    "La différence pratique la plus citée entre les deux : Kyverno reste en YAML/CEL (courbe d'apprentissage plus douce), OPA Gatekeeper impose d'apprendre Rego (plus expressif mais plus syntaxique, moins « évolué » qu'un langage généraliste)."
  ],
  "refs": [
    "https://kyverno.io/",
    "https://open-policy-agent.github.io/gatekeeper/website/docs/",
    "https://www.openpolicyagent.org/docs/policy-language"
  ]
},
{
  "id": "f-j1-pvc-storageclass",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Storage",
  "title": "PersistentVolumeClaim : « similaire à un Pod »",
  "lead": "PVC consomme du stockage comme un Pod consomme du CPU/mémoire — et StorageClass, c'est le catalogue que l'administrateur expose pour ça.",
  "body": [
    "L'analogie officielle : « A PersistentVolumeClaim (PVC) is a request for storage by a user. It is similar to a Pod. Pods consume node resources and PVCs consume PV resources. Pods can request specific levels of resources (CPU and Memory). Claims can request specific size and access modes (e.g., they can be mounted ReadWriteOnce, ReadOnlyMany, ReadWriteMany, or ReadWriteOncePod). »"
  ],
  "points": [
    "PersistentVolume (PV) — « a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes. It is a resource in the cluster just like a node is a cluster resource. » Son cycle de vie est indépendant de tout Pod qui l'utilise.",
    "PersistentVolumeClaim (PVC) — la demande faite par l'utilisateur, comme un Pod demande du CPU/mémoire, un PVC demande une taille et un access mode.",
    "Les 4 access modes officiels — ReadWriteOnce (RWO, lecture-écriture par un seul nœud), ReadOnlyMany (ROX, lecture seule par plusieurs nœuds), ReadWriteMany (RWX, lecture-écriture par plusieurs nœuds), ReadWriteOncePod (RWOP, lecture-écriture par un seul Pod — plus restrictif que RWO, qui autorise plusieurs Pods sur le même nœud).",
    "StorageClass — « provides a way for administrators to describe the classes of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators. » Kubernetes lui-même n'a pas d'avis sur ce que représentent ces classes — la doc compare ça aux « profiles » d'autres systèmes de stockage. « This provisioning is based on StorageClasses: the PVC must request a storage class and the administrator must have created and configured that class » — au moins une StorageClass est donc nécessaire pour satisfaire des PVC en provisioning dynamique.",
    "Champs d'une StorageClass, et ce qui est VRAIMENT obligatoire — seul `provisioner` doit être spécifié (« This field must be specified. »). `parameters` (config spécifique au provisioner) et `reclaimPolicy` (défaut : `Delete` si absent) sont documentés ensemble mais restent optionnels ; `allowVolumeExpansion`, `volumeBindingMode` (défaut : `Immediate`) et `allowedTopologies` aussi.",
    "Le nom d'une StorageClass compte — c'est ce que l'utilisateur indique dans son PVC (`storageClassName`) pour demander cette classe précise.",
    "Provisioners tiers, deux exemples concrets — NetApp Trident (« designed from the ground up to help you meet your containerized applications' persistence demands using industry-standard interfaces, such as the Container Storage Interface (CSI) » ; supporte ONTAP, Element/SolidFire, Azure NetApp Files, Google Cloud NetApp Volumes, Amazon FSx for ONTAP) et Portworx (« Portworx implements a CSI driver that integrates with the Kubernetes storage framework, enabling dynamic provisioning, snapshotting, cloning, and volume expansion » ; va au-delà avec Portworx Backup et Disaster Recovery).",
    "Pré-provisionné (statique) — « A cluster administrator creates a number of PVs. They carry the details of the real storage, which is available for use by cluster users. They exist in the Kubernetes API and are available for consumption. » L'admin prépare le stock de PV à l'avance, une PVC vient ensuite matcher dessus (taille, access mode…).",
    "Provisionné dynamiquement — « When none of the static PVs the administrator created match a user's PersistentVolumeClaim, the cluster may try to dynamically provision a volume specially for the PVC. » Le PV n'existe pas encore : il est créé à la demande via la StorageClass référencée par la PVC. Prérequis : l'admission controller `DefaultStorageClass` doit être activé sur l'API server.",
    "Si rien ne matche — « Claims will remain unbound indefinitely if a matching volume does not exist. » La PVC reste `Pending` indéfiniment. Détail piège : une PVC avec `storageClassName: \"\"` désactive explicitement le provisioning dynamique pour elle-même — elle attend forcément un PV statique."
  ],
  "note": [
    "Lien StorageClass ↔ CSI, très concret : le champ `provisioner` d'une StorageClass EST le nom du CSI driver à utiliser (ex. NetApp Trident ou Portworx). La chaîne complète : PVC → StorageClass → provisioner (= CSI driver, voir note « CSI : définition & CSI driver ») → PV créé."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/storage/persistent-volumes/",
    "https://kubernetes.io/docs/concepts/storage/storage-classes/",
    "https://github.com/NetApp/trident",
    "https://docs.portworx.com/portworx-enterprise/operations/operate-kubernetes/storage-operations/csi",
    "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#provisioning"
  ]
},
{
  "id": "f-j1-csi",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Storage",
  "title": "CSI : définition & CSI driver",
  "lead": "Le standard qui permet à n'importe quel système de stockage de s'intégrer à Kubernetes sans toucher au code du projet.",
  "body": [
    "CSI (Container Storage Interface) est défini comme « a standard for exposing arbitrary block and file storage systems to containerized workloads on Container Orchestration Systems (COs) like Kubernetes ».",
    "Avant CSI, les pilotes de stockage étaient intégrés directement dans le code de Kubernetes (« in-tree »). CSI a changé ça : il permet à des fournisseurs de stockage tiers de « write and deploy plugins exposing new storage systems in Kubernetes without ever having to touch the core Kubernetes code »."
  ],
  "points": [
    "Pourquoi l'in-tree n'était pas tenable — chaque fournisseur devait implémenter son plugin dans le code cœur de CHAQUE orchestrateur (Kubernetes, Mesos, Docker...) : prolifération ingérable (fournisseurs × orchestrateurs), mises à jour du plugin couplées au cycle de release de l'orchestrateur, et charge de maintenance hors du périmètre du projet. CSI standardise : un fournisseur « develop[s] a plugin once and have it work across a number of container orchestration (CO) systems ».",
    "CSI driver — implémente les services Identity, Node, et optionnellement Controller définis par la spécification CSI ; c'est une application conteneurisée, développée et déployée librement par chaque fournisseur de stockage.",
    "Controller Plugin — déployé en Deployment ou StatefulSet, sur n'importe quel nœud du cluster : « generally does not need direct access to the host and can perform all its operations through the Kubernetes API » (provisioning, attachment des volumes…).",
    "Node Plugin — déployé en DaemonSet, sur CHAQUE nœud du cluster, car il lui faut « direct access to the host for making block devices and/or filesystem mounts available to the Kubernetes kubelet ».",
    "Architecture réelle des Pods — le conteneur CSI driver n'est jamais seul : des « sidecar containers » officiels, développés par la communauté kubernetes-csi (pas par le fournisseur de stockage), sont « bundled with third-party CSI driver containers and deployed together as pods », pour « watch the Kubernetes API, trigger appropriate operations against the \"CSI volume driver\" container, and update the Kubernetes API as appropriate ». Le fournisseur se concentre sur l'implémentation de l'interface CSI, les sidecars gèrent toute la logique Kubernetes.",
    "Sidecars du Controller Plugin — « external-provisioner, external-attacher, external-snapshotter, and external-resizer » : ils surveillent respectivement les PVC (déclenchent CreateVolume), les VolumeAttachment (déclenchent ControllerPublishVolume), les demandes de snapshot, et les demandes de redimensionnement — plus souvent un `livenessprobe`.",
    "Sidecar du Node Plugin — un seul : le `node-driver-registrar`, qui « consists of the CSI driver that implements the CSI Node service and the node-driver-registrar sidecar container » — il enregistre le driver CSI auprès du kubelet de CHAQUE nœud pour qu'il sache le découvrir et lui parler.",
    "Les opérations CSI (RPC Controller/Node) — CreateVolume/DeleteVolume (provisionner/déprovisionner), ControllerPublishVolume (rendre le volume disponible pour un nœud donné), NodeStageVolume/NodePublishVolume (préparer puis monter le volume dans le namespace du conteneur — le « Mount/Unmount » des notes de cours), CreateSnapshot/DeleteSnapshot (capturer/supprimer un snapshot), ControllerExpandVolume/NodeExpandVolume (agrandir la capacité côté stockage, puis étendre le filesystem pour en profiter).",
    "CSIDriver — objet Kubernetes qui décrit les capacités et exigences d'un driver CSI donné, déployé par le fournisseur de stockage.",
    "Dans le spec d'un Pod, un volume `csi` référence : `driver` (le nom du CSI driver), `volumeAttributes` (attributs passés au driver), `fsType`, `readOnly`, et `nodePublishSecretRef` (secret pour l'authentification)."
  ],
  "note": [
    "À relier à la note « Filtering (2/2) : contraintes de volumes » (Scheduler) : c'est justement ce driver CSI, via l'objet CSIStorageCapacity, que le scheduler interroge pour savoir si un nœud peut réellement obtenir le volume demandé avant d'y placer le Pod."
  ],
  "refs": [
    "https://kubernetes-csi.github.io/docs/",
    "https://kubernetes-csi.github.io/docs/deploying.html",
    "https://kubernetes-csi.github.io/docs/sidecar-containers.html",
    "https://kubernetes.io/docs/concepts/storage/volumes/",
    "https://raw.githubusercontent.com/container-storage-interface/spec/master/spec.md"
  ]
}
  ];
  DATA.forEach((o) => F.push(o));
})();
