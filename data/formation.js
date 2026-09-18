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
  "id": "f-j1-cncf-maturity",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "CNCF : niveaux de maturité, Landscape et CLOMonitor",
  "lead": "Le repère utilisé en formation pour juger si une techno cloud native vaut le coup d'être adoptée — et un exemple concret d'auto-correction en direct (Velero).",
  "body": [
    "3 niveaux de maturité CNCF, officiels : Sandbox — « experimental projects not yet widely tested in production on the bleeding edge of technology » ; Incubating — « projects used successfully in production by a small number [of] users with a healthy pool of contributors » ; Graduated — « projects considered stable, widely adopted, and production ready, attracting thousands of contributors »."
  ],
  "points": [
    "Exemples déjà croisés dans ces notes — Graduated : CRI-O, Cilium, Kyverno, OPA (Gatekeeper), Prometheus, Istio (12 juillet 2023), Linkerd (28 juillet 2021). Incubating : Thanos. Sandbox : Velero (accepté à la CNCF le 11 mars 2026, PAS graduated malgré son usage très répandu — une confusion faite puis corrigée en direct pendant la formation, en repartant vérifier sur le site officiel).",
    "CNCF Landscape (landscape.cncf.io) — « a comprehensive categorical overview of projects and product offerings in the cloud native space », utile pour évaluer d'un coup d'œil quelles technos existent par catégorie et quel est leur niveau de maturité avant de les adopter dans son parc.",
    "CLOMonitor — l'outil qui note objectivement la santé d'un projet CNCF sur 4 axes : documentation (README, guide de contribution, mainteneurs, changelog, gouvernance), licensing (licence approuvée, identifiants SPDX), bonnes pratiques (badge de sécurité, canaux communautaires, fréquence des releases, CLA), et sécurité (checks automatisés via OpenSSF Scorecard — revue de code, gestion des dépendances, releases signées, politique de sécurité)."
  ],
  "note": [
    "Le point de vigilance soulevé en formation (retour d'expérience, pas une règle officielle) : le temps passé à un niveau de maturité varie énormément d'un projet à l'autre — Linkerd est passé Graduated relativement vite après son entrée en Incubating (2018→2021), alors qu'Istio, arrivé plus tard à la CNCF, y est resté moins longtemps avant de graduer (2022→2023). Le niveau de maturité seul ne dit donc pas tout sur l'ancienneté réelle ou la qualité d'un projet — croiser avec CLOMonitor et le Landscape reste utile."
  ],
  "refs": [
    "https://www.cncf.io/projects/",
    "https://www.cncf.io/projects/velero/",
    "https://www.cncf.io/projects/linkerd/",
    "https://www.cncf.io/projects/istio/",
    "https://clomonitor.io/docs/topics/checks/"
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
  "id": "f-j1-loadbalancer-service",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Service type LoadBalancer : cloud, MetalLB en on-prem, et pourquoi ça ne suffit pas",
  "lead": "Un Service LoadBalancer, ça marche tout seul dans le cloud — sur un cluster on-prem, il faut lui trouver un remplaçant. Et de toute façon, il reste limité au niveau 4.",
  "body": [
    "Ce qui se passe quand tu déclares `type: LoadBalancer` (déjà vu dans la note « Managed Kubernetes ») : le cloud-controller-manager (via le Service controller) provisionne un vrai load balancer cloud (AWS ELB, Azure LB, Google Cloud LB…). Le provisioning est totalement asynchrone : l'`EXTERNAL-IP` du Service reste `<pending>` tant que le load balancer cloud n'est pas prêt. Une fois prêt, il redirige le trafic vers un NodePort ouvert sur les nœuds — de façon totalement transparente pour le workload."
  ],
  "points": [
    "Sur un cluster on-prem, pas de cloud provider = pas de LoadBalancer automatique — le Service resterait bloqué en `<pending>` indéfiniment. MetalLB comble ce trou : « a load-balancer implementation for bare metal Kubernetes clusters, using standard routing protocols », qui permet aux Services LoadBalancer de fonctionner sans dépendre d'un cloud. Statut officiel : toujours en beta, mais « known to be stable and reliable » selon le projet lui-même.",
    "Autres solutions on-prem citées en formation — HAProxy, F5 (passerelle via un boîtier Big IP externe au cluster), Cilium (déjà vu, capable de jouer ce rôle en plus de ses fonctions CNI). Limite commune à ces solutions non gérées nativement par Kubernetes : il faut un accès de gestion à ces load balancers (SSH ou interface d'admin) pour les configurer.",
    "La vraie limite structurelle des Services — ils opèrent au niveau 4 (TCP/UDP) : « Services operate at Layer 4 and primarily handle TCP/UDP protocols. » Pas de routage par nom d'hôte, pas de routage par chemin d'URL, pas de terminaison TLS.",
    "D'où l'Ingress — « An Ingress does not expose arbitrary ports or protocols » : c'est un objet dédié au HTTP/HTTPS (niveau 7), qui ajoute le routage par hostname, par path, et la terminaison TLS — exactement ce qui manque à un Service brut."
  ],
  "note": [
    "Résumé de la chaîne : Service ClusterIP/NodePort (interne) → Service LoadBalancer (expose au niveau 4, via cloud ou MetalLB en on-prem) → Ingress (ajoute le niveau 7 par-dessus, un seul point d'entrée pour plusieurs services HTTP)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/services-networking/service/",
    "https://metallb.io/",
    "https://kubernetes.io/docs/concepts/services-networking/ingress/"
  ]
},
{
  "id": "f-j1-ingress-resource-class",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Ingress : resource + controller, et IngressClass",
  "lead": "Suite de « Service LoadBalancer » : l'Ingress ajoute le niveau 7 — mais c'est une ressource native, pas une CRD, et ça ne fait RIEN sans un controller qui l'implémente.",
  "body": [
    "Précision par rapport à une formulation entendue en formation (l'Ingress présenté comme « l'instanciation d'une CRD ») : Ingress est en réalité une ressource NATIVE de l'API Kubernetes (`apiVersion: networking.k8s.io/v1`, `kind: Ingress`, stable depuis la v1.19) — pas une Custom Resource Definition. Les vraies CRD, ce sont certains controllers tiers qui en ajoutent PAR-DESSUS (Traefik avec `IngressRoute`, par exemple — voir plus bas).",
    "Le modèle en 2 parties, officiel : « An Ingress controller is responsible for fulfilling the Ingress, usually with a load balancer. » Et surtout : « Only creating an Ingress resource has no effect » — sans controller installé, l'objet `Ingress` existe dans l'API mais ne route rien du tout."
  ],
  "points": [
    "Une règle d'Ingress, dans les grandes lignes — host (nom de domaine), path (préfixe ou exact), port et Service cible. Exemple du type vu en formation : `myapp.mydomain.com/catalogue` → Service catalogue ; `myapp.mydomain.com/login` → un autre Service (ex. Keycloak) sur un autre port — plusieurs règles, plusieurs backends, un seul point d'entrée.",
    "IngressClass — sélectionne QUEL controller traite un `Ingress` donné (champ `spec.ingressClassName`), utile dès qu'un cluster a plusieurs controllers installés en parallèle (une classe publique, une privée, une pour du testing…). Si `ingressClassName` est omis, c'est la classe par défaut du cluster qui s'applique.",
    "Pourquoi plusieurs controllers en parallèle — isolation applicative (une appli très gourmande qui met un controller à genoux ne doit pas impacter les autres, donc son propre « tuyau » séparé) ou isolation multi-tenant (plusieurs clients sur un seul cluster, chacun avec son controller + namespace + resource limits + NetworkPolicy dédiés, en alternative à des clusters séparés).",
    "Déploiement mécanique d'un controller — un Deployment + un Service (NodePort, mappé ensuite via un load balancer externe, cloud ou MetalLB — voir note « Service LoadBalancer »). Piège à connaître : l'IP à joindre pour atteindre une appli via Ingress, c'est l'IP PUBLIQUE du controller, jamais l'IP interne du Service applicatif.",
    "Configuration, le pattern dominant — « 95 % » des Ingress controllers (chiffre de formation) se configurent via des ANNOTATIONS sur l'objet `Ingress` (chaque controller documente les siennes, ce qui rend le switch d'un controller à l'autre non trivial). Traefik s'en écarte en proposant ses propres CRDs (`IngressRoute`, `Middleware`, `TraefikService`, `TLSOptions`, `ServersTransport`) comme « building blocks that you can assemble according to your needs » — plus modulaire, mais spécifique à Traefik."
  ],
  "note": [
    "À relier à « Solution réseau (CNI) » et « Service LoadBalancer » : la chaîne complète devient Service ClusterIP (interne) → Service LoadBalancer/NodePort (expose au niveau 4) → Ingress + IngressClass + controller (ajoute le niveau 7 : host/path routing, TLS)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/services-networking/ingress/",
    "https://doc.traefik.io/traefik/reference/install-configuration/providers/kubernetes/kubernetes-crd/"
  ]
},
{
  "id": "f-j1-ingress-controllers-market",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Ingress controllers : le marché, et la retraite officielle d'ingress-nginx",
  "lead": "Le paysage cité en formation (Traefik, Nginx, Contour, Istio, Kong, HAProxy, F5) — avec une confirmation lourde de conséquences : ingress-nginx est officiellement mort.",
  "body": [
    "Vérification à jour, et elle change la donne : le projet `ingress-nginx` a été retiré du support actif. Annonce officielle : « Best-effort maintenance will continue until March 2026. Afterward, there will be no further releases, no bugfixes, and no updates to resolve any security vulnerabilities that may be discovered. » Le README ajoute : « If you are not already using ingress-nginx, you should not be deploying it as it is not being developed. » Le dépôt a été archivé (lecture seule) le 24 mars 2026. Ça confirme très concrètement le point soulevé en formation sur la bascule vers Traefik comme alternative open source principale."
  ],
  "points": [
    "Traefik — l'alternative open source qui a le plus profité de ce vide, selon le constat fait en formation (pas un classement officiel, mais cohérent avec la retraite confirmée d'ingress-nginx ci-dessus).",
    "Contour, Kong, HAProxy, F5 (Big IP) — autres controllers cités, avec des maturités et fonctionnalités variables ; F5 s'appuie sur un boîtier matériel externe au cluster (déjà vu dans la note « Service LoadBalancer »).",
    "Istio à part — c'est avant tout une solution de service mesh (déjà vu : injection de sidecar Envoy via mutating webhook). Un admin qui installe Istio ne le fait généralement pas juste pour de l'Ingress simple, mais pour ce qu'il ajoute en plus (chiffrement mTLS interne au cluster, observabilité fine du trafic est-ouest).",
    "Comment choisir (retour de formation, pas une checklist officielle) — le protocole nécessaire, le niveau de contrôle voulu sur le trafic, les besoins d'observabilité, et si des intégrations custom sont nécessaires ou si le controller les couvre nativement."
  ],
  "note": [
    "Pattern avancé cité en formation, utile en upgrade majeur : un load balancer EN AMONT de plusieurs Ingress controllers/clusters, avec une IP unique et stable côté DNS. En cas de breaking change lourd sur une version Kubernetes, on construit un NOUVEAU cluster, on y migre les applis, on bascule le pool du load balancer vers ce nouveau cluster (sans changer le DNS), puis on détruit l'ancien — jugé plus sûr qu'un upgrade in-place. S'applique aussi bien on-prem que sur du cloud public."
  ],
  "refs": [
    "https://github.com/kubernetes/ingress-nginx",
    "https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/"
  ]
},
{
  "id": "f-j1-traefik-detail",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Traefik en détail : HTTPRoute vs IngressRoute, EntryPoints, Middleware",
  "lead": "Traefik peut router avec un Ingress classique + annotations, ou avec ses propres objets pour aller plus loin — deux familles à ne pas confondre.",
  "body": [
    "Précision par rapport à une formulation entendue en formation (« HTTP routes... sont des objets définis dans Traffic ») : `HTTPRoute` n'est PAS un objet propre à Traefik — c'est une ressource de la Gateway API, un standard Kubernetes cross-vendor (supporté par plusieurs Ingress controllers, pas seulement Traefik). Traefik la supporte : « Traefik fully supports all HTTPRoute core and some extended features, like BackendTLSPolicy, GRPCRoute, and TLSRoute resources » (spec Gateway API v1.6.1). L'objet réellement PROPRE à Traefik, c'est `IngressRoute` (déjà vu dans la note « Ingress : resource + controller »)."
  ],
  "points": [
    "EntryPoints — « Listening for Incoming Connections/Requests », le port (et optionnellement le nom d'hôte) sur lequel Traefik écoute. Un router référence un entrypoint par son nom (ex. `websecure` pour du HTTPS) : entrypoints = OÙ Traefik écoute, règles de routage = COMMENT la requête est traitée une fois reçue. Équivalent en Ingress classique : l'annotation `traefik.ingress.kubernetes.io/router.entrypoints`.",
    "Middleware — « pieces of middleware are a means of tweaking the requests before they are sent to your backend servers (or before the answer is sent to the clients) ». Concrètement : auth (basic/digest), IP allowlisting, rate limiting, réécriture de path/headers, compression, retry, redirections — chaînables, applicables au niveau router ou service.",
    "3 façons de router avec Traefik, du plus simple au plus poussé — Ingress classique + annotations (portable, mais limité aux fonctionnalités couvertes par les annotations) ; `HTTPRoute` (Gateway API, standard, portable vers d'autres controllers compatibles) ; `IngressRoute` (propre à Traefik, accès à l'intégralité de ses fonctionnalités natives, mais non portable)."
  ],
  "note": [
    "À relier à « Ingress : resource + controller » : ces 3 approches ne sont pas exclusives — un même cluster Traefik peut faire cohabiter des Ingress classiques (legacy/simples) et des IngressRoute (besoins avancés)."
  ],
  "refs": [
    "https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/gateway-api/",
    "https://doc.traefik.io/traefik/reference/install-configuration/entrypoints/",
    "https://doc.traefik.io/traefik/reference/routing-configuration/http/middlewares/overview/"
  ]
},
{
  "id": "f-j1-ingress-tls",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Terminaison TLS d'un Ingress : cert-manager vs Cloudflare",
  "lead": "Deux façons opposées de gérer le HTTPS d'une appli exposée : automatiser le cycle de vie des certificats DANS le cluster, ou ne jamais avoir à le faire en sortant la terminaison TLS du cluster.",
  "body": [
    "cert-manager — « creates TLS certificates for workloads in your Kubernetes or OpenShift cluster and renews the certificates before they expire. » Il s'intègre directement aux objets `Ingress` (tutoriel officiel dédié à la sécurisation d'ingress-nginx — voir note sur sa retraite), gère plusieurs autorités de certification (dont Let's Encrypt), et supporte les certificats wildcard via la validation ACME DNS01 (chez plusieurs fournisseurs DNS : Route53, Cloudflare, Google Cloud DNS…)."
  ],
  "points": [
    "Ce que ça change pour l'Ingress controller — une fois cert-manager en place, l'Ingress controller gère lui-même tout le cycle de vie du certificat (émission, renouvellement automatique avant expiration), sans intervention manuelle.",
    "Alternative citée en formation : terminer le TLS chez Cloudflare — un filtre HTTP est placé entre Cloudflare et l'Ingress du cluster ; toute la terminaison SSL se fait côté Cloudflare, le cluster n'a alors PLUS besoin de gérer de certificats du tout en interne."
  ],
  "note": [
    "cert-manager n'est qu'une solution parmi d'autres pour ce besoin (texte du formateur) — le vrai choix structurant, c'est où le TLS se termine : dans le cluster (cert-manager + Let's Encrypt ou une autre CA) ou à l'extérieur, chez un edge/CDN comme Cloudflare."
  ],
  "refs": [
    "https://cert-manager.io/docs/"
  ]
},
{
  "id": "f-j1-httproute-canary",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "HTTPRoute en pratique : deux règles sur le même path, départagées par un query parameter",
  "lead": "TP : un `HTTPRoute` avec une règle par défaut vers `v1` et une règle plus spécifique (path + query param `TEST=v2`) vers `v2` — comment Gateway API choisit laquelle appliquer.",
  "body": [
    "Rappel de structure (voir note « Traefik en détail ») : un `HTTPRoute` porte une liste de `rules`, chaque `rule` porte une liste de `matches` et une liste de `backendRefs`. Sémantique officielle des `matches` : « Multiple match types are ANDed together, i.e. the match will evaluate to true only if all conditions are satisfied » (AND entre les critères d'UN même match — path, headers, queryParams…) et « Each match is independent, i.e. this rule will be matched if any one of the matches is satisfied » (OR entre plusieurs `matches` d'UNE même règle) (spec Gateway API)."
  ],
  "points": [
    "TP concret : namespace `shopping`, deux couples Deployment+Service (`demo-gateway-v1` / `demo-gateway-v2`, mêmes probes `/.healthcheck` et `/.readicheck`), et un `HTTPRoute` à 2 règles — règle 1 : `path.type: PathPrefix`, `value: /` → Service `demo-gateway-v1` ; règle 2 : même `path.type: PathPrefix`/`value: /` MAIS avec en plus un `queryParams` nommé `TEST` valant `v2` → Service `demo-gateway-v2`.",
    "Terminologie : le kind officiel s'écrit `HTTPRoute` (tout en majuscules sur HTTP), pas `HttpRoute`.",
    "`HTTPQueryParamMatch` — champs `name` (nom du paramètre), `value` (valeur attendue), `type` (par défaut `Exact` : comparaison exacte, sensible à la casse ; alternative : `RegularExpression`).",
    "Pourquoi ça fonctionne même si la règle 1 est déclarée EN PREMIER dans le YAML : Gateway API ne priorise PAS par ordre d'écriture des règles, mais par spécificité — « Proxy or Load Balancer routing configuration generated from HTTPRoutes MUST prioritize rules based on the following criteria, continuing on ties » : caractères d'un hostname non-wildcard, puis d'un hostname, puis d'un path, puis les header matches, puis les query parameter matches (spec Gateway API). Les deux règles du TP ont le même path — donc à égalité sur les 3 premiers critères — mais seule la règle 2 a un query parameter match : sur une requête `?TEST=v2`, c'est donc bien elle qui l'emporte, indépendamment de sa position dans la liste `rules`."
  ],
  "note": [
    "Ce comportement de priorité par spécificité (et non par ordre) est ce qui rend ce pattern « route par défaut + route plus spécifique en query param » fiable pour un canary/A-B testing simple, sans avoir besoin d'un outil de traffic-splitting dédié."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/services-networking/gateway/",
    "https://gateway-api.sigs.k8s.io/references/spec/"
  ]
},
{
  "id": "f-j1-gateway-api-successeur",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Gateway API : le successeur (recommandé) de l'Ingress",
  "lead": "L'Ingress n'est pas mort, mais son développement s'est arrêté — toutes les nouvelles fonctionnalités arrivent désormais côté Gateway API.",
  "body": [
    "Position officielle, sans ambiguïté : « The Kubernetes project recommends using Gateway instead of Ingress. The Ingress API has been frozen. » Frozen = « The Ingress API is generally available and subject to stability guarantees for generally available APIs. Kubernetes has no plans to remove Ingress » MAIS « The Ingress API is no longer being developed, with no further changes or updates planned » — donc l'objet reste utilisable et stable, il n'accueillera juste plus rien de neuf.",
    "Modèle d'objets (voir aussi note « HTTPRoute en pratique ») : une `GatewayClass` (ressource cluster-scoped fournie par l'implémentation, ex. Traefik) est le lien vers le contrôleur ; une ou plusieurs `Gateway` s'y rattachent ; une ou plusieurs ressources `*Route` (`HTTPRoute`, `GRPCRoute`, `TLSRoute`, `TCPRoute`, `UDPRoute`) s'attachent ensuite à ces `Gateway` — « A Gateway object is associated with exactly one GatewayClass... One or more route kinds such as HTTPRoute, are then associated to Gateways »."
  ],
  "points": [
    "Pourquoi migrer, concrètement (retour d'expérience formateur) : (1) un Ingress ne gère nativement QUE de la terminaison TLS/HTTP(S) — pas de gRPC, pas de TCP/UDP brut ; pour du gRPC il fallait contourner l'Ingress en exposant directement des Services. C'est un fait structurel confirmé côté doc : l'API `networking.k8s.io/v1` Ingress ne définit que des règles host/path HTTP(S), alors que Gateway API ajoute des kinds dédiés (`GRPCRoute`, `TCPRoute`, `UDPRoute`, `TLSRoute`) pour ces cas — voir point suivant sur leur statut GA. (2) Au quotidien, un Ingress avec beaucoup de règles pousse à empiler l'info dans des annotations (spécifiques à chaque provider/contrôleur, donc non portables) — un objet Kubernetes a une limite documentée : « the total size of all annotations (keys and values combined) must not exceed 256 KiB » — un Ingress avec beaucoup de règles/annotations peut donc être refusé par l'API server une fois cette limite atteinte (l'anecdote GKE du formateur est un cas vécu de cette limite générale, pas une restriction spécifique à GKE).",
    "Précision par rapport à une formulation entendue en formation (« TCP, UDP et TLS restent encore en alpha ») : c'était vrai il y a peu, mais ce n'est plus le cas aujourd'hui — Gateway API a sa PROPRE numérotation de version, indépendante des numéros de version de Kubernetes (pas de lien avec « Kube 1.26 ») : `GatewayClass`/`Gateway`/`HTTPRoute` GA (Standard) depuis la v1.0 (31 oct. 2023), `GRPCRoute` GA depuis la v1.1 (mai 2024), `TLSRoute` GA depuis la v1.5, et `TCPRoute`/`UDPRoute` viennent tout juste de passer GA (Standard) avec la v1.6 (30 juin 2026) — les 6 types de routes sont donc désormais tous en canal Standard/GA.",
    "Les 2 canaux de release du projet : « Standard Channel » (API graduées en Beta/GA — ce qu'on installe en prod) et « Experimental Channel » (tout ce qui est encore en Alpha + les nouveaux champs pas encore graduated)."
  ],
  "note": [
    "Le scepticisme du formateur sur le « forever » du freeze (« on a déjà vu des objets en GA dépréciés puis supprimés ») est un retour d'expérience personnel, pas une position officielle — la doc Kubernetes est explicite : aucun projet de suppression de l'Ingress."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/services-networking/ingress/",
    "https://kubernetes.io/docs/concepts/services-networking/gateway/",
    "https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/",
    "https://kubernetes.io/blog/2023/10/31/gateway-api-ga/",
    "https://kubernetes.io/blog/2026/08/03/gateway-api-v1-6-release/",
    "https://gateway-api.sigs.k8s.io/docs/concepts/versioning/",
    "https://gateway-api.sigs.k8s.io/reference/api-types/tlsroute/"
  ]
},
{
  "id": "f-j1-gateway-listeners-class",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Gateway : listeners, TLS et GatewayClass",
  "lead": "Là où un Ingress mélange host, TLS et règles de routage dans UN seul objet, Gateway API éclate ça en plusieurs objets agrégés au runtime.",
  "body": [
    "« A Gateway is 1:1 with the lifecycle of the configuration of infrastructure. » Ses `listeners` — « Define the hostnames, ports, protocol, termination, TLS settings and which routes can be attached to a listener » — portent le port d'écoute (ex. 80 pour HTTP, 443 pour HTTPS) et, pour du HTTPS, une référence TLS vers un certificat.",
    "Différence structurelle avec l'Ingress : dans un Ingress classique, host + TLS + règles de path vivent dans le MÊME objet. Avec Gateway API, le `Gateway` porte les listeners + le TLS, et les règles de routage vivent dans des objets séparés (`HTTPRoute`, `GRPCRoute`…) qui référencent le `Gateway` via `parentRefs` — le contrôleur les agrège au runtime."
  ],
  "points": [
    "TLS : le listener référence un certificat via `certificateRefs`, qui pointe vers un `Secret` — soit dans le même namespace que la `Gateway`, soit dans un namespace dédié (ex. `cert-manager`) si le contrôleur/`ReferenceGrant` l'autorise. cert-manager (voir note « Terminaison TLS d'un Ingress ») fonctionne à l'identique avec Gateway API : il génère/renouvelle le certificat dans le `Secret`, que le listener référence.",
    "`GatewayClass` — « a cluster-scoped resource defined by the infrastructure provider. This resource represents a class of Gateways that can be instantiated. » Le champ `spec.controller` (« The GatewayClass.spec.controller field determines the controller implementation responsible for managing the GatewayClass ») fait exactement le même rôle que le champ `spec.controller` d'une `IngressClass` : c'est le nom du contrôleur (ex. Traefik) qui doit gérer les `Gateway` de cette classe."
  ],
  "note": [
    "À relier à « Ingress : resource + controller » : `GatewayClass` est donc l'équivalent direct d'`IngressClass`, juste appliqué au nouvel objet `Gateway`."
  ],
  "refs": [
    "https://gateway-api.sigs.k8s.io/reference/api-types/gateway/",
    "https://gateway-api.sigs.k8s.io/reference/api-types/gatewayclass/"
  ]
},
{
  "id": "f-j1-httproute-filters-redirect",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "HTTPRoute : matching par header vs filters (redirection HTTP → HTTPS)",
  "lead": "Deux mécanismes différents à ne pas confondre sous l'étiquette commune « filtering » : matcher une requête (condition) et transformer une requête/réponse (action).",
  "body": [
    "Précision par rapport à une formulation entendue en formation (tout regroupé sous « HTTP filtering ») : matcher sur un header HTTP est une CONDITION — ça se fait dans `rules[].matches[].headers` (voir note « HTTPRoute en pratique » pour la sémantique AND/OR des `matches`), au même titre qu'un `path` ou un `queryParams`. Un `filter`, lui, est une ACTION appliquée à la requête ou à la réponse — c'est un champ séparé, `rules[].filters`."
  ],
  "points": [
    "Exemple vérifié pour la redirection HTTP → HTTPS : « RequestRedirect rule filters instruct Gateways to emit a redirect response to requests matching a filtered HTTPRoute rule », avec `type: RequestRedirect` et `requestRedirect: { scheme: https, statusCode: 301 }` sur la règle."
  ],
  "note": [
    "Autres types de `filters` existants côté spec (non détaillés en formation) : `RequestHeaderModifier` (ajout/suppression/réécriture de headers), `URLRewrite`, `RequestMirror`, `ExtensionRef` — un `filter` transforme, un `match` sélectionne."
  ],
  "refs": [
    "https://gateway-api.sigs.k8s.io/guides/http-redirect-rewrite/"
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
  "id": "f-j1-aggregation-layer",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "API Aggregation Layer : étendre l'API sans passer par une CRD",
  "lead": "Utile quand tu veux exposer une API Kubernetes-native SANS forcément stocker la donnée dans etcd — typiquement pour des métriques.",
  "body": [
    "Suite de la note « Controllers, CRD et Operator » : la CRD n'est pas la seule façon d'étendre l'API. « The aggregation layer runs in-process with the kube-apiserver […] The aggregation layer is different from Custom Resource Definitions, which are a way to make the kube-apiserver recognise new kinds of object. » La différence clé : une CRD sert à faire reconnaître et STOCKER un nouveau type d'objet ; l'aggregation layer sert à exposer une API qui n'a pas forcément besoin d'être stockée dans etcd — le cas d'école étant les métriques (calculées à la volée, pas persistées).",
    "Comment ça marche — un objet `APIService` « claims » un chemin d'URL (ex. `/apis/myextension.mycompany.io/v1/…`) dans l'API Kubernetes. Une fois enregistré, « the aggregation layer will proxy anything sent to that API path […] to the registered APIService » : kube-apiserver agit comme un reverse proxy vers un service backend (ton « extension API server », qui tourne dans des Pods du cluster)."
  ],
  "points": [
    "APIService — objet cluster-scoped (pas namespaced), donc il doit toujours préciser le `namespace` du Service cible dans son `spec.service` (avec `name`, `namespace`, `group`, `version`). Le nom de l'objet suit le format `<version>.<group>`.",
    "Activer la couche d'agrégation, kube-apiserver a besoin de deux catégories de flags — les certificats (`--proxy-client-cert-file`, `--proxy-client-key-file`, `--requestheader-client-ca-file`, plus les headers `--requestheader-*`) pour sécuriser la communication kube-apiserver ↔ extension API server, ET `--enable-aggregator-routing=true` pour activer le routage lui-même.",
    "Exigence de perf — « Extension API servers should have low latency networking to and from the kube-apiserver. Discovery requests are required to round-trip from the kube-apiserver in five seconds or less. »",
    "Exemple concret : Metrics Server & HPA — « You must enable the API aggregation layer and register an APIService for the metrics.k8s.io API. » Le Metrics Server « implements the Metrics API […] to feed resource usage metrics to K8s autoscaler components. » Le HorizontalPodAutoscaler lit ensuite le CPU/mémoire via cette API agrégée — sans jamais interroger etcd pour ça.",
    "Métriques custom — pour aller au-delà de CPU/mémoire (des métriques business, ou issues de Prometheus), la doc renvoie vers « a second metrics pipeline that uses the Custom Metrics API », complémentaire à l'API Metrics simple — c'est ce qui permet à HPA de scaler sur des métriques qui ne sont pas juste des ressources."
  ],
  "note": [
    "Résumé du formateur, à retenir dans l'ordre : Controller (boucle de contrôle qui réconcilie) → CRD (étend l'API, avec stockage) → Operator (CRD + controller combinés pour automatiser une appli) → Admission controllers/webhooks (interceptent CHAQUE requête à l'API server pour valider/muter, voir note « Admission webhooks ») → Aggregation layer (étend l'API SANS forcément stocker, cette fiche)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/apiserver-aggregation/",
    "https://kubernetes.io/docs/tasks/extend-kubernetes/configure-aggregation-layer/",
    "https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/"
  ]
},
{
  "id": "f-j1-logging",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Logs & observabilité : le 12-Factor App, l'écosystème, et les pièges de volumétrie",
  "lead": "Pourquoi le SSH + `docker ps`/logs ne suffit plus, ce que Kubernetes fait (et ne fait pas) pour toi, et pourquoi la manière de logger a un vrai coût.",
  "body": [
    "Pourquoi on ne peut plus faire comme avant : se connecter en SSH sur une machine pour faire un `docker ps`/`crictl ps` puis lire les logs ne marche plus dès qu'on a des Pods répartis sur plein de nœuds — pas d'accès partagé, pas d'approche « cloud native ».",
    "Le manifeste de référence, le 12-Factor App (facteur XI, « Logs ») : « A twelve-factor app never concerns itself with routing or storage of its output stream. It should not attempt to write to or manage logfiles. Instead, each running process writes its event stream, unbuffered, to stdout. » L'appli n'a qu'une seule responsabilité : écrire son flux sur la sortie standard ; router/stocker/archiver, c'est le rôle de l'environnement d'exécution — jamais de l'appli elle-même.",
    "Ce que Kubernetes fait, précisément : « Kubernetes does not provide a native storage solution for log data. Instead, there are many logging solutions that integrate with Kubernetes. » Kubernetes capture bien le stdout/stderr de chaque conteneur (format standardisé « CRI logging format » entre le container runtime et le kubelet, qui gère aussi la rotation via `containerLogMaxSize`/`containerLogMaxFiles`) — mais l'agrégation, le stockage long terme et la recherche, ce n'est PAS fourni nativement."
  ],
  "points": [
    "Pattern officiel : le node-level logging agent — un agent tourne sur CHAQUE nœud, collecte les logs des conteneurs et les transmet à un backend centralisé de stockage/analyse (c'est le modèle derrière Fluentd/Fluent Bit, Loki, etc.).",
    "L'écosystème des stacks de logging (vu en formation) — Elastic Stack (Elasticsearch/Logstash/Kibana), historiquement la stack la plus répandue on-prem ; Grafana + Loki, très courant en contexte Kubernetes ; solutions natives des cloud providers (CloudWatch, Cloud Logging, Log Analytics) ; certaines distributions embarquent leur propre stack (ex. OpenShift) ou se branchent facilement sur le marché (ex. Rancher avec Syslog, Kafka, Splunk, Elasticsearch, Loki…). Ce point récapitule des repères de terrain donnés en formation, pas une liste officiellement documentée par kubernetes.io.",
    "Ce qu'il faut monitorer sur un cluster vanilla — les composants système : kubelet, nœuds, kube-apiserver, kube-controller-manager, kube-scheduler (confirmé par la doc officielle) ; plus, côté addons (déployés comme des workloads), le réseau, le stockage, et tout ce qui est ingress/gateway/service mesh.",
    "Le piège du bruit — les sondes de liveness/readiness qui loguent à chaque passage (« tout va bien » toutes les quelques secondes) noient les vrais signaux ; la bonne pratique de terrain est de filtrer par sévérité et de ne garder que ce qui sert vraiment au debug ou à l'audit utilisateur, pas la verbosité systématique.",
    "Le piège du multi-ligne — beaucoup de systèmes de collecte comptent CHAQUE retour à la ligne comme un nouveau log : une stack trace Java de 20 lignes devient 20 « logs » séparés au lieu d'un seul événement, ce qui casse la lisibilité (impossible de relier début/fin) et peut faire exploser la facture d'un outil facturé au volume de lignes. Retour d'expérience cité en formation : un simple travail de reformatage/concaténation des stack traces Java a permis une réduction de 80 % de la facture Datadog sur une mission — anecdote professionnelle, pas un chiffre garanti ni sourcé officiellement."
  ],
  "note": [
    "Deux points de cette fiche restent volontairement non sourcés officiellement ici (fidèle à la règle du projet : pas d'invention, mais pas de silence non plus sur ce qui vient de l'expérience de terrain du formateur) : le comparatif des stacks/distributions, et l'anecdote chiffrée Datadog. Le socle (12-Factor App + doc Kubernetes sur les logs) est, lui, entièrement sourcé."
  ],
  "refs": [
    "https://12factor.net/logs",
    "https://kubernetes.io/docs/concepts/cluster-administration/logging/"
  ]
},
{
  "id": "f-j1-logging-stacks-deploy",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Déployer une stack de logs : Loki vs Elastic Stack, et le piège du disque plein",
  "lead": "Suite de « Logs & observabilité » : comment ces stacks se déploient concrètement (DaemonSet, StatefulSet, Deployment), et pourquoi surveiller l'espace disque des nœuds n'est pas optionnel.",
  "body": [
    "Grafana Loki, l'alternative à l'Elastic Stack — « Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by Prometheus. » Différence fondamentale avec Elasticsearch : « Loki does not index the contents of the logs, but only indexes metadata about your logs as a set of labels for each log stream » — les données compressées vont dans du stockage objet (S3, GCS…), seul l'index de métadonnées reste léger. D'où un coût d'exploitation bien plus faible. Interrogé via LogQL (calqué sur PromQL) et exposé dans Grafana comme datasource, exactement comme Prometheus."
  ],
  "points": [
    "Filebeat en DaemonSet — « You deploy Filebeat as a DaemonSet to ensure there's a running instance on each node of the cluster. » Un Pod par nœud, pour lire directement les logs des conteneurs écrits localement sur le nœud (`/var/log/containers`).",
    "Elasticsearch en StatefulSet — « The chart deploys a StatefulSet and by default will do an automated rolling update of your cluster » (Helm chart officiel). Un StatefulSet parce qu'Elasticsearch a besoin de stockage persistant et d'une identité stable par instance. Alternative : le déployer HORS du cluster, sur des machines dédiées gérées comme un service standard.",
    "Kibana — la couche de visualisation, la plus simple des trois : un Deployment classique (stateless), rien à persister.",
    "ECK (Elastic Cloud on Kubernetes) — « Built on the Kubernetes Operator pattern, Elastic Cloud on Kubernetes (ECK) extends the basic Kubernetes orchestration capabilities to support the setup and management of Elasticsearch, Kibana, APM Server, Beats, Elastic Agent… » — un Operator (voir note « Controllers, CRD et Operator ») qui déploie et gère toute la stack (Elasticsearch/Kibana/Beats) sans configuration manuelle poussée. La config de Filebeat se fait alors en YAML, dans le champ `config` de la CRD `Beats`.",
    "Le piège du disque plein sur les nœuds — deux gros consommateurs locaux : les LOGS et les IMAGES de conteneurs. Sans nettoyage régulier, le nœud atteint la condition `DiskPressure` (surveillée par le kubelet via `nodefs.available`/`nodefs.inodesFree`) : « The kubelet attempts to reclaim node-level resources before it terminates end-user pods. For example, it removes unused container images when disk resources are starved. » Si ça ne suffit pas, le kubelet évince des Pods, et dans les cas sévères le nœud peut passer `NotReady` — plus aucun nouveau conteneur ne peut y démarrer."
  ],
  "note": [
    "À relier à « Logs & observabilité » (le pourquoi/le socle 12-Factor) et à « Controllers, CRD et Operator » (ECK en est un exemple concret, comme CloudNativePG pour PostgreSQL)."
  ],
  "refs": [
    "https://grafana.com/docs/loki/latest/get-started/overview/",
    "https://www.elastic.co/guide/en/beats/filebeat/current/running-on-kubernetes.html",
    "https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-overview.html",
    "https://github.com/elastic/helm-charts/tree/main/elasticsearch",
    "https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/"
  ]
},
{
  "id": "f-j1-eck-practice",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "ECK en pratique : 3 CRD pour toute la stack, et l'alternative Loki/Grafana",
  "lead": "Ce qu'il reste à faire une fois la stack déployée, comment ECK automatise tout ça avec 3 CRD, et le prix à payer si un composant part en vrille.",
  "body": [
    "Suite de « Déployer une stack de logs » : une fois Filebeat/Elasticsearch/Kibana en place, il reste du travail manuel — configurer Kibana (bons datasets, bonnes vues, bons dashboards), et gérer des users dans chaque composant, faute d'IAM unifié entre eux nativement. C'est exactement ce que l'opérateur ECK automatise.",
    "ECK (Elastic Cloud on Kubernetes) — le code est ouvert (« The ECK code is open »), déployé comme un Operator (voir note « Controllers, CRD et Operator ») qui installe et gère la stack Elastic complète, avec autoscaling et autoconfiguration selon les patterns définis."
  ],
  "points": [
    "3 CRD, dans l'ordre — un objet `Elasticsearch` (version, config, nombre de nœuds) fait créer par l'opérateur les StatefulSets associés, le stockage (PV/PVC — la doc dédie une section « Volume claim templates » à ce sujet), les certificats TLS (section « TLS/SSL Certificates » dédiée dans la doc) et les comptes de service ; un objet `Kibana` (version, nombre de replicas) s'enregistre automatiquement auprès de l'Elasticsearch créé juste avant ; un objet `Beats` (type `filebeat`, service Elasticsearch cible, version, config) fait créer le DaemonSet Filebeat qui lui est associé.",
    "Une fois les 3 CRD posées, l'opérateur fait le reste — StatefulSets, DaemonSets, PV/PVC, certificats, comptes de service, Kibana fonctionnel branché sur l'Elasticsearch créé.",
    "Le prix à payer — comme tout Operator, ECK applique la boucle de contrôle en continu (voir note « Controllers, CRD et Operator ») : si un des 3 composants part en erreur, éditer les objets à la main pour « bricoler » une solution devient vite compliqué, car l'opérateur réconcilie sans arrêt vers l'état désiré et annule ce genre de correctifs manuels.",
    "Alternative : Loki + Grafana (déjà vue) — Loki joue le rôle de stockage des logs, Grafana celui de visualisation. Côté collecte, deux outils actuels : Filebeat, ou Grafana Alloy — le nouveau collecteur unifié de Grafana Labs. Les anciens outils (Grafana Agent, Promtail) sont en fin de vie : Promtail est explicitement noté « end of life (EOL) as of March 2, 2026 » par la doc officielle, tout le développement futur se fait désormais dans Alloy.",
    "Peu importe la stack choisie (Elastic ou Loki) — il faut de toute façon prévoir la gestion de la RÉTENTION (agréger différents pots de données selon des rétentions différentes), et pour les métriques (Prometheus), un backend de type Thanos (déjà vu) pour ne pas se retrouver à court d'espace/d'historique rapidement."
  ],
  "note": [
    "Repère de terrain cité en formation, à prendre comme telle (pas une donnée officiellement chiffrée) : avant l'existence d'ECK, ce genre d'orchestration (rolling updates de la stack Elastic compris) se faisait à la main — un gain opérationnel important pour qui l'a connu."
  ],
  "refs": [
    "https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-overview.html",
    "https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-elasticsearch-specification.html",
    "https://www.elastic.co/elastic-cloud-kubernetes",
    "https://grafana.com/docs/alloy/latest/",
    "https://grafana.com/docs/loki/latest/send-data/promtail/"
  ]
},
{
  "id": "f-j1-metrics-server",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Metrics Server & le Resource Metrics Pipeline",
  "lead": "Kubernetes expose lui-même un minimum de métriques via l'API — pas besoin d'outil tiers pour ça, mais ça reste volontairement très limité.",
  "body": [
    "Deux pipelines de métriques bien distincts, officiellement nommés — « The Metrics API, and the metrics pipeline that it enables, only offers the minimum CPU and memory metrics to enable automatic scaling using HPA and/or VPA. » C'est le Resource Metrics Pipeline (minimal, natif). Pour aller plus loin, « you can complement the simpler Metrics API by deploying a second metrics pipeline that uses the Custom Metrics API » — le Full Metrics Pipeline, qui lui nécessite un outil tiers (Prometheus, Datadog…).",
    "Metrics Server, le composant qui alimente le Resource Metrics Pipeline — « the metrics-server fetches resource metrics from the kubelets and exposes them in the Kubernetes API server through the Metrics API for use by the HPA and VPA. » Concrètement, il interroge l'endpoint `/metrics/resource` de chaque kubelet."
  ],
  "points": [
    "Pas de stockage long terme — Metrics Server garde tout en cache mémoire (pas dans etcd, pas persisté), justement pour ne pas surcharger etcd. Aucun historique : à peine collectée, une métrique remplace la précédente.",
    "Une seule instance par cluster, par défaut — le mode HA (plusieurs replicas) existe mais reste une configuration spécifique nécessitant au moins 2 nœuds, pas le mode standard.",
    "Utilisé par `kubectl top node` / `kubectl top pod` (avec `-A` pour tous les namespaces), et par le HorizontalPodAutoscaler / VerticalPodAutoscaler.",
    "Métriques « core » uniquement — CPU et mémoire, rien d'autre (pas de disque, pas de réseau, pas de consommation applicative interne). Tout le reste (I/O disque/réseau, consommation de process, filesystem…) relève du Full Metrics Pipeline, pas de Metrics Server.",
    "Limite importante — Metrics Server ne voit que le conteneur de l'extérieur (via kubelet/cgroups), jamais l'intérieur de l'appli. Pour des métriques applicatives (ex. JVM), il faut que l'appli expose elle-même un endpoint dédié — beaucoup de frameworks en fournissent un nativement, scrappable ensuite par Prometheus (voir note dédiée)."
  ],
  "note": [
    "Précision par rapport à une affirmation entendue en formation : sans Metrics Server, le scheduler continue de fonctionner normalement (il se base sur les requests/limits déclarés et la capacité des Node, pas sur Metrics Server) — seuls le HPA/VPA et `kubectl top` sont réellement bloqués sans lui. Déjà vu dans la note « API Aggregation Layer » : c'est via `metrics.k8s.io` (APIService) que tout ça est exposé."
  ],
  "refs": [
    "https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/",
    "https://github.com/kubernetes-sigs/metrics-server"
  ]
},
{
  "id": "f-j1-prometheus-architecture",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Prometheus : architecture (scraping, Pushgateway, Alertmanager)",
  "lead": "Le Full Metrics Pipeline en pratique — comment Prometheus va chercher la donnée, la stocke, et la transforme en alertes.",
  "body": [
    "« Prometheus scrapes metrics from instrumented jobs, either directly or via an intermediary push gateway for short-lived jobs. It stores all scraped samples locally and runs rules over this data to either aggregate and record new time series from existing data or generate alerts. » Le mode par défaut est le PULL (le serveur Prometheus va chercher la donnée en HTTP sur des cibles) — la Pushgateway est l'exception, réservée aux jobs trop courts pour être scrapés à temps."
  ],
  "points": [
    "Service discovery — Prometheus peut découvrir automatiquement ses cibles de scraping (ex. les Services d'un cluster Kubernetes) plutôt que de tout lister statiquement.",
    "Format d'exposition — les métriques Prometheus suivent un format standard, celui sur lequel s'appuie OpenMetrics ; énormément de bibliothèques clientes existent pour l'exposer depuis quasi n'importe quel langage/framework.",
    "PromQL — le langage de requête, indispensable pour extraire une donnée pertinente du time series stocké.",
    "Alertmanager — un second projet open source, séparé de Prometheus, qui route les notifications. Une alerte = une requête PromQL + un seuil + une destination de notification (email, Slack, PagerDuty, etc.).",
    "Vue d'ensemble — Prometheus server (retrieval + stockage local + serveur HTTP) → interrogé via PromQL par Grafana ou tout autre client API. « Each Prometheus server operat[es] autonomously without requiring distributed storage or remote dependencies » — d'où le besoin d'un Thanos (voir note dédiée) si on veut de la rétention longue durée ou une vue multi-Prometheus."
  ],
  "note": [
    "À relier à « Metrics Server & le Resource Metrics Pipeline » : c'est justement Prometheus (+ un adaptateur de métriques custom) qui alimente la Custom Metrics API évoquée dans la note « API Aggregation Layer », pour permettre au HPA de scaler sur des métriques métier plutôt que juste CPU/mémoire."
  ],
  "refs": [
    "https://prometheus.io/docs/introduction/overview/",
    "https://prometheus.io/docs/concepts/data_model/"
  ]
},
{
  "id": "f-j1-prometheus-data-model",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Prometheus : data model, types de métriques et exporters",
  "lead": "Un nom de métrique + des labels = un time series unique. 4 types de métriques. Et une métrique n'a pas besoin de venir de ton code — les exporters existent pour ça.",
  "body": [
    "Le data model, précisément — « Prometheus fundamentally stores all data as time series: streams of timestamped values belonging to the same metric and the same set of labeled dimensions. » Chaque time series est identifié de façon unique par un nom de métrique + des labels, ex. `api_http_requests_total{method=\"POST\", handler=\"/messages\"}`. Chaque échantillon porte une valeur + un timestamp précis à la milliseconde."
  ],
  "points": [
    "Counter — « a cumulative metric that represents a single monotonically increasing counter whose value can only increase or be reset to zero on restart. » Ne peut que monter (ou repartir à zéro au redémarrage) : nombre de requêtes servies, de tâches terminées, d'erreurs.",
    "Gauge — « a metric that represents a single numerical value that can arbitrarily go up and down. » Typiquement des ressources : CPU, RAM, espace disque, nombre de requêtes concurrentes.",
    "Histogram — « records observations […] by counting them in configurable buckets. It also provides a sum of all observed values. » Pense durées de requêtes ou tailles de réponses réparties par tranches (buckets configurables), avec la somme de toutes les observations.",
    "Summary — « samples observations […] it calculates configurable quantiles over a sliding time window. » Proche de l'histogram, mais calcule des quantiles configurables sur une fenêtre de temps glissante plutôt que des buckets fixes.",
    "Exporters — deux grandes familles pour récupérer une métrique SANS instrumenter le code toi-même : hardware/host (node exporter pour le matériel générique, mais aussi des exporters spécialisés type NVIDIA pour du GPU, ou des exporters constructeur) et software (les binaires connus — serveurs web, messaging, bases de données, stockage — et les composants Kubernetes eux-mêmes, comme etcd, qui exposent tous un endpoint métriques nativement).",
    "Métriques custom — rien n'empêche de créer ses propres time series pour du métier (nombre de commandes passées, taux d'échec d'un pipeline de commandes…), via les mêmes bibliothèques clientes Prometheus utilisées pour les métriques techniques."
  ],
  "note": [
    "Confirmé en formation, cohérent avec la note « Metrics Server & le Resource Metrics Pipeline » : Metrics Server ne stocke RIEN, ni dans etcd ni en local — à chaque redémarrage, ses gauges repartent de zéro. C'est purement du temps réel, comme un `htop` du cluster."
  ],
  "refs": [
    "https://prometheus.io/docs/concepts/metric_types/",
    "https://prometheus.io/docs/concepts/data_model/"
  ]
},
{
  "id": "f-j1-prometheus-operator",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Fondamentaux",
  "title": "Prometheus Operator : 4 CRD, et l'auto-discovery par label",
  "lead": "Encore un Operator (voir note dédiée) : 4 CRD à poser, et Prometheus se reconfigure tout seul dès qu'une appli avec le bon label apparaît.",
  "body": [
    "Le Prometheus Operator gère 4 Custom Resources : `Prometheus` (« sets up a Prometheus instance in a Kubernetes cluster » — version, stockage…), `ServiceMonitor` (« defines how a dynamic set of services should be monitored »), `Alertmanager` (« sets up an Alertmanager instance »), et `PrometheusRule` (« allows the definition of alerting and recording rules to be consumed by Prometheus or Thanos Ruler instances » — encore un pont avec Thanos)."
  ],
  "points": [
    "ServiceMonitor, la vraie magie — « It identifies services through their labels and automatically discovers the corresponding pods […] Prometheus automatically adjusts its targets accordingly » dès qu'un Pod matchant le label apparaît ou disparaît. Concrètement, un `ServiceMonitor` porte un sélecteur de labels (ex. `team: frontend`) + le nom du port qui expose les métriques (le port peut être un entier ou un alias comme `web`) — plus besoin d'ajouter une target à la main à chaque nouvelle appli.",
    "Astuce de terrain (retour d'expérience formateur, pas une doc officielle) — poser systématiquement un label `monitor: true` sur les workloads, ajouté automatiquement via un mutating admission webhook (voir note « Admission webhooks ») à tout ce qui transite par l'API server. Résultat : toute nouvelle appli est monitorée sans action de l'équipe applicative."
  ],
  "note": [
    "À relier à « Admission webhooks : mutating vs validating » : cet exemple de label auto-injecté est un cas concret de plus, dans la même veine que l'injection de sidecar Istio ou de secrets Vault déjà vues."
  ],
  "refs": [
    "https://prometheus-operator.dev/docs/getting-started/design/"
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
  "id": "f-j1-backup-restore-static-pods",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "Backup/restore du cluster : ce qu'on sauvegarde vraiment (et le cas des static Pods)",
  "lead": "Le vrai usage d'un restore etcd selon un débat de formateurs, ce qui doit vraiment être sauvegardé, et pourquoi les manifestes de Pods statiques sont le trou noir des sauvegardes.",
  "body": [
    "Ce que dit la doc officielle, sans ambiguïté : « If your Kubernetes cluster uses etcd as its backing store, make sure you have a back up plan for the data. » etcd étant la source de vérité du cluster (voir note « Control plane »), sa stabilité est jugée critique : « Keeping etcd clusters stable is critical to the stability of Kubernetes clusters. »",
    "Débat entre formateurs (retour d'expérience, à prendre comme un avis de terrain, pas une prescription officielle) : trois usages étaient évoqués pour restaurer un backup etcd — disaster recovery, créer un environnement ISO pour tester des upgrades, et répliquer un environnement ailleurs. Consensus des deux formateurs : seul le disaster recovery est un « vrai » cas d'usage clair. Pour tester des upgrades ou répliquer, restaurer etcd pose problème concret — noms de nœuds différents, logs/états non pertinents qui polluent — et il est jugé préférable de RECONSTRUIRE un cluster iso via de l'Infrastructure as Code (Terraform/Ansible, cité comme la méthode de provisioning d'« environ 95 % » des clusters rencontrés par l'un des formateurs) plutôt que de restaurer un snapshot."
  ],
  "points": [
    "Opinion partagée par les deux formateurs (pas une recommandation kubernetes.io) : Kubernetes n'est pas la solution idéale pour héberger du stateful/stockage lourd — gérer des bascules d'état interne au cluster (bases de données internes, etc.) devient vite complexe. Conseil donné : « keep it simple ».",
    "Ce qu'il faut sauvegarder, sans débat — les certificats racine (CA) et leurs clés (sans eux, un incident oblige à réonboarder tout le cluster, bien plus long que de remettre des fichiers en place) ; les données etcd (snapshot officiel, voir doc kubeadm/etcd) ; les données des volumes de stockage, en particulier si le stockage est hébergé sur une baie externe/distribuée (il suffit alors de la remonter ailleurs pour récupérer la donnée).",
    "Pourquoi on NE sauvegarde PAS les manifestes applicatifs — dans l'écosystème décrit (GitOps ou charts Helm versionnés), les manifestes sont déjà persistés dans Git : « ils sont persistés quelque part », donc le risque de les perdre est faible.",
    "Le vrai trou noir : les manifestes de Pods statiques — ils vivent sur les nœuds eux-mêmes (`/etc/kubernetes/manifests`, voir note kubeadm), PAS dans Git, et sont rarement sauvegardés. Pourquoi les static Pods existent : « Static Pods are started by the kubelet before the API server is available, which makes them suitable for bootstrapping control plane components. DaemonSets require a running control plane. » C'est exactement pour ça que kubeadm les utilise pour apiserver/etcd/scheduler/controller-manager (voir note « Control plane »).",
    "Les vraies limites d'un static Pod, qui expliquent pourquoi c'est un cas niche — « The spec of a static Pod cannot refer to other API objects, such as ServiceAccount, ConfigMap, or Secret. » Donc pas de ConfigMap, pas de Secret, pas de ServiceAccount, pas de gestion via des Services/Ingress. Et surtout : « Static Pods are not managed by the control plane, so they cannot be rolled out, rolled back, or scaled using standard Kubernetes mechanisms » — le kubelet gère seul le cycle de vie, sans aucun des outils habituels de Kubernetes. Conclusion officielle : « If you are running clustered Kubernetes and are using static Pods to run a Pod on every node, you should probably be using a DaemonSet instead! »",
    "Backup stateful vs stateless — pour du stateful, on sauvegarde les données (volumes). Pour du stateless, l'état ET la config sont déjà entièrement dans etcd (manifestes, Deployments, ReplicaSets, avec tout l'historique) : une fois etcd restauré sur un cluster, le scheduler reprend la main tout seul et replace les Pods/Deployments à leur place — pas besoin de backup séparé pour ça."
  ],
  "note": [
    "Anecdote de terrain (non officielle) sur un AUTRE usage de static Pod, plus rare : un Pod statique déployé sur tous les nœuds pour exposer une console web SSH de secours/debug — utile ponctuellement, remplacé depuis par une vraie stack d'observabilité (voir notes « Logs & observabilité »). Les cas d'usage réellement documentés par kubernetes.io restent centrés sur le bootstrap du control plane."
  ],
  "refs": [
    "https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/",
    "https://kubernetes.io/docs/concepts/workloads/pods/static-pods/",
    "https://kubernetes.io/docs/tasks/configure-pod-container/static-pod/"
  ]
},
{
  "id": "f-j1-etcdctl-etcdutl",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "etcdctl vs etcdutl : sauvegarder et restaurer etcd en pratique",
  "lead": "Deux outils, deux rôles bien distincts — l'un parle à un etcd vivant sur le réseau, l'autre travaille hors-ligne sur un fichier.",
  "body": [
    "Précision par rapport à une inversion entendue en formation : c'est bien `etcdctl` qui prend le snapshot d'un cluster etcd EN VIE, via le réseau — `ETCDCTL_API=3 etcdctl --endpoints $ENDPOINT snapshot save snapshot.db`. C'est en revanche `etcdutl` (l'outil « offline ») qui inspecte et restaure un snapshot déjà sur disque : `etcdutl snapshot status snapshot.db -w table` (hash, révision, nombre de clés, taille) et `etcdutl snapshot restore snapshot.db --data-dir output-dir`."
  ],
  "points": [
    "Pré-requis pour `etcdctl` (accès réseau à un etcd vivant) — le certificat de l'autorité racine générée par etcd, un certificat client (CRT) + sa clé signés par cette autorité, et l'endpoint à joindre (port client par défaut : `2379`).",
    "`etcdctl endpoint status` — récupère l'état du cluster etcd cible, à faire avant de lancer un snapshot.",
    "Snapshot planifié — rien n'empêche de brancher `etcdctl snapshot save` sur un CronJob pour sauvegarder régulièrement vers un stockage distant.",
    "Restauration — `etcdutl snapshot restore` réinitialise dans un NOUVEAU répertoire de données (`--data-dir`) à partir du snapshot ; c'est ce nouveau répertoire qui sert ensuite à redémarrer un etcd fonctionnel, sans avoir besoin de reconstruire toute l'infra machine derrière."
  ],
  "note": [
    "À relier à la note « Backup/restore du cluster » : une fois cet etcd restauré et redémarré, c'est le scheduler qui reprend la main et replace tous les objets stateless — c'est etcd qui fait tout le travail de mémoire, pas le processus de restauration en lui-même."
  ],
  "refs": [
    "https://etcd.io/docs/v3.5/op-guide/recovery/"
  ]
},
{
  "id": "f-j1-velero",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "Velero : backup, restore et migration de ressources Kubernetes",
  "lead": "Contrairement à etcdctl/etcdutl (qui ne voient qu'etcd), Velero sauvegarde les objets K8s ET les volumes persistants — et sert aussi à migrer entre clusters.",
  "body": [
    "Ce que Velero sauvegarde : les objets Kubernetes (exportés vers du stockage objet cloud) et les volumes persistants (via des snapshots de l'API du fournisseur cloud). « You can back up or restore all objects in your cluster, or you can filter objects by type, namespace, and/or label. »"
  ],
  "points": [
    "3 cas d'usage officiels — disaster recovery (restaurer un cluster après une panne), migration de cluster (déplacer des ressources d'un cluster à l'autre, avec remapping de namespace possible), et snapshot pré-opération : « Velero is ideal for the disaster recovery use case, as well as for snapshotting your application state, prior to performing system operations on your cluster, like upgrades. »",
    "Architecture client-serveur — un serveur tourne dans (ou hors de) le cluster, piloté depuis un poste via une CLI. Chaque opération (backup à la demande, backup planifié, restore) est un objet Custom Resource (CRD) — encore un exemple du pattern Controller/CRD déjà vu.",
    "Stockage supporté — nativement le stockage objet cloud (S3 et compatibles, Azure Blob, Google Cloud Storage…) et les snapshots natifs des fournisseurs (EBS, Managed Disks…). En local/test, Velero se branche sur MinIO comme stockage S3-compatible auto-hébergé.",
    "Backup planifié et filtré — syntaxe proche de Kubernetes (sélecteurs par labels), planification au format cron classique, possibilité d'inclure/exclure des namespaces et de filtrer les ressources cluster-scoped à embarquer ou non dans un backup.",
    "Filtrage en détail — `--include-namespaces`/`--exclude-namespaces` (motifs glob), `--include-resources`/`--exclude-resources` par type de ressource, `--selector <clé>=<valeur>` (et `--or-selector` pour matcher plusieurs conditions), et une distinction explicite cluster-scoped vs namespace-scoped via `--include-cluster-scoped-resources`/`--include-namespace-scoped-resources`.",
    "Resource policies — un mécanisme plus fin, défini dans une ConfigMap (référencée via `--resource-policies-configmap` ou `spec.resourcePolicy`) : « Velero provides resource policies […] to define fine-grained resource filters and volume handling rules », avec des sections `namespacedFilterPolicies`, `clusterScopedFilterPolicy`, `volumePolicies` et `includeExcludePolicy` dans un seul fichier YAML."
  ],
  "note": [
    "Velero et etcdctl/etcdutl ne sont pas concurrents mais complémentaires : etcd(ctl/utl) restaure l'état ET la configuration du cluster lui-même (voir note dédiée), Velero se concentre sur les ressources + les données des volumes — et sert en plus d'outil de migration entre clusters, un usage qu'etcd seul ne couvre pas.",
    "Statut CNCF, vérifié (voir note « CNCF : niveaux de maturité ») : Velero est en Sandbox — PAS Graduated — malgré son usage très répandu en formation/en entreprise. Un rappel utile que popularité perçue et maturité CNCF officielle ne coïncident pas toujours."
  ],
  "refs": [
    "https://velero.io/docs/main/how-velero-works/",
    "https://velero.io/docs/main/resource-filtering/",
    "https://www.cncf.io/projects/velero/"
  ]
},
{
  "id": "f-j1-garbage-collection",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Control plane & etcd",
  "title": "Garbage collection : kubelet GC vs TTL Controller — deux mécanismes distincts",
  "lead": "Nettoyer des images/conteneurs morts sur un nœud n'a rien à voir avec nettoyer un Job terminé dans etcd — deux composants différents, deux échelles différentes.",
  "body": [
    "Précision par rapport à une formulation entendue en formation (les deux étaient présentés comme UN seul « garbage collector » à deux niveaux) : ce sont en réalité deux mécanismes bien distincts, portés par deux composants différents.",
    "1. Garbage collection du kubelet, au niveau du NŒUD — « The kubelet performs garbage collection on unused images every five minutes and on unused containers every minute. » Configurable via `HighThresholdPercent`/`LowThresholdPercent` (seuils d'usage disque qui déclenchent/arrêtent le nettoyage)."
  ],
  "points": [
    "2. TTL-after-finished Controller, au niveau du CLUSTER — « only supported for Jobs » (pas pour tout objet Kubernetes). Le champ `.spec.ttlSecondsAfterFinished` d'un Job démarre un minuteur dès que le Job passe `Complete` ou `Failed` ; une fois expiré, le Job (et ses Pods) devient éligible à une suppression en cascade, effacé d'etcd.",
    "Qui fait quoi — le kubelet gère la GC d'images/conteneurs SUR CHAQUE nœud (fichiers locaux) ; le TTL Controller, lui, tourne dans le kube-controller-manager (control plane), pas sur les nœuds — il agit directement sur les objets API (donc sur etcd), pas sur le disque local.",
    "Éviction et grace period (déjà vue dans la note « QoS classes ») — une fois un Pod marqué pour suppression (éviction ou TTL expiré), il reste visible un court instant avant sa suppression effective, le temps que le `terminationGracePeriodSeconds` s'écoule (0s en cas de seuil d'éviction « hard »).",
    "3. Garbage collection par ownerReferences, au niveau du CLUSTER aussi — « Owner references tell the control plane which objects are dependent on others. Kubernetes uses owner references to give the control plane […] the opportunity to clean up related resources before deleting an object. » Exemple classique : un Pod référence son ReplicaSet, qui référence son Deployment. Les owner references sont gérées automatiquement par Kubernetes, et ne peuvent jamais traverser un namespace (un objet cluster-scoped ne peut être owner que d'objets cluster-scoped ; un objet namespaced, que d'objets du même namespace).",
    "3 politiques de suppression en cascade — Background (par défaut) : le parent est supprimé IMMÉDIATEMENT, le garbage collector nettoie les enfants en arrière-plan de façon asynchrone. Foreground : le parent passe en « deletion in progress » (`metadata.deletionTimestamp` posé + finalizer `foregroundDeletion`), reste visible dans l'API tant que tous ses enfants portant `blockOwnerDeletion: true` n'ont pas été supprimés — le parent est donc supprimé EN DERNIER, après ses enfants. Orphan : le parent est supprimé immédiatement, mais les enfants restent intacts, sans owner — le garbage collector les ignore complètement."
  ],
  "note": [
    "À retenir : « garbage collection » dans Kubernetes n'est pas UN mécanisme, mais un terme générique qui recouvre 3 nettoyages indépendants selon la ressource concernée — images/conteneurs via le kubelet (niveau nœud), Jobs terminés via le TTL Controller (niveau cluster, kube-controller-manager), et suppression en cascade des objets liés via ownerReferences (niveau cluster aussi, mais piloté par le garbage collector controller, avec un choix de politique Background/Foreground/Orphan)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/architecture/garbage-collection/",
    "https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/"
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
  "id": "f-j1-requests-limits",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "Requests & Limits : le vrai carburant du filtering (et pourquoi kubectl top ne suffit pas)",
  "lead": "kubectl top donne une photo à l'instant T — inutilisable pour du capacity planning. Les requests/limits, elles, pilotent directement les décisions du scheduler et du kubelet.",
  "body": [
    "Pourquoi `kubectl top node`/`kubectl top pod` ne servent pas au capacity planning : c'est une vue temps réel (voir note « Metrics Server »), donc si des workloads s'éteignent/s'allument entre-temps, la vue devient obsolète — aucun historique, aucune tendance.",
    "Requests et Limits, la définition officielle : « When you specify a resource request for containers in a Pod, the kube-scheduler uses this information to decide which node to place the Pod on. » Et : « When you specify a resource limit for a container, the kubelet enforces those limits so that the running container is not allowed to use more of that resource than the limit you set. The kubelet also reserves at least the request amount of that system resource specifically for that container to use. »"
  ],
  "points": [
    "Unités CPU — en millicores (`500m` = 0,5 cœur) ou en cœurs entiers/décimaux (`0.5`, `1`, `1.5`) : les deux notations sont équivalentes et interchangeables.",
    "Unités mémoire — une unité est OBLIGATOIRE : décimal (`E`, `P`, `T`, `G`, `M`, `k`) ou binaire (`Ei`, `Pi`, `Ti`, `Gi`, `Mi`, `Ki`) — `128Mi` ≠ `128M`.",
    "Qui utilise quoi — le scheduler (étape Filter, voir note « Filtering en détail ») se base sur les REQUESTS pour décider si un Pod rentre sur un nœud (bin-packing) ; le kubelet, lui, applique les LIMITS pendant l'exécution.",
    "Ce qui se passe en cas de dépassement — CPU : throttling (le noyau restreint l'accès au CPU, le conteneur continue de tourner, juste plus lentement). Mémoire : OOMKilled (le noyau peut tuer le conteneur — l'application peut dépasser temporairement sa limite mémoire, mais risque la terminaison si ça persiste). Retenir l'image : la limite CPU ralentit, la limite mémoire tue.",
    "Zéro nœud avec assez de ressources → le Pod reste `Pending`, et `kubectl describe pod` affiche un event `FailedScheduling` expliquant la raison exacte (« Insufficient cpu », par exemple) — confirmé par la doc officielle de troubleshooting."
  ],
  "note": [
    "Point de vigilance entendu en formation (retour d'expérience, pas une recommandation kubernetes.io) : sur des workloads très intensifs (IA/ML), poser des requests/limits très élevées peut rendre le recalcul de placement par le scheduler contre-productif — plus de temps passé à calculer qu'à effectivement placer les Pods. Dans un tout autre registre, la doc officielle documente bien un vrai levier de perf scheduler pour les GROS clusters (`percentageOfNodesToScore`, dans « Scheduler performance tuning ») — mais ce mécanisme répond à un problème de nombre de nœuds, pas spécifiquement au profil de ressources des Pods décrit en formation."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/",
    "https://kubernetes.io/docs/concepts/scheduling-eviction/scheduler-perf-tuning/"
  ]
},
{
  "id": "f-j1-qos-classes",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "QoS classes : Guaranteed, Burstable, BestEffort",
  "lead": "Le « burst » entre ta request et ta limite n'est pas juste une image — c'est littéralement la classe de qualité de service Burstable de Kubernetes.",
  "body": [
    "3 classes, entièrement dérivées de tes requests/limites (rien à déclarer explicitement) :",
    "Guaranteed — « every Container in the Pod must have a memory limit and memory request, both greater than zero » ET « the memory limit must equal the memory request », même chose pour le CPU. La classe la plus protégée : « guaranteed not to be killed until they exceed their limits or there are no lower-priority Pods that can be preempted »."
  ],
  "points": [
    "Burstable — le Pod ne remplit pas les critères Guaranteed, mais au moins un conteneur a une request OU une limite de CPU/mémoire déclarée. C'est LA zone de « burst » : le Pod démarre garanti au niveau de sa request, et peut grimper jusqu'à sa limite si des ressources sont disponibles. Évincé seulement après TOUS les Pods BestEffort.",
    "BestEffort — aucun conteneur du Pod n'a de request NI de limite CPU/mémoire déclarée. Utilise ce qui reste des autres classes. « The kubelet prefers to evict these Pods first when node resources are scarce » — les premiers sacrifiés en cas de pénurie.",
    "Bien dimensionner, ce n'est PAS minimiser — sous-provisionner (requests trop basses) expose à l'éviction/OOMKill/throttling ; sur-provisionner gaspille de la capacité (moins de Pods par nœud, plus de nœuds que nécessaire, donc plus cher). L'objectif : une request/limite en adéquation avec l'usage réel du workload.",
    "Bénéfices d'un bon dimensionnement (retour de formation, cohérent avec les classes QoS officielles) — meilleure utilisation des nœuds, comportement d'éviction prévisible (on sait qui saute en premier grâce à la QoS), scheduling plus efficace, densité de cluster optimale.",
    "Ordre d'éviction officiel, confirmé — sous pression sur un nœud, le kubelet évince dans cet ordre : BestEffort en premier, puis Burstable, puis Guaranteed en dernier. « Guaranteed pods are only evicted when cluster or system integrity is at risk. » Exemple concret cité en formation : si les composants du control plane tournent en Pods statiques sur un nœud sous pression, ils ne sont normalement PAS évincés — sauf cas particulier où leur manifeste static Pod a une priorité plus basse que d'autres Pods du control plane, auquel cas le kubelet peut ne pas réussir à leur faire de la place."
  ],
  "note": [
    "Outils pour objectiver le dimensionnement, cités en formation : `kubectl top pod` (instantané), la stack Prometheus/Grafana (comparer usage réel vs déclaré dans le temps — voir notes dédiées), les jauges d'usage des cloud providers, et le VPA en mode recommandation (voir note « VPA en pratique »).",
    "Nuance officielle importante sur l'éviction par pression : contrairement à une terminaison normale, elle NE respecte PAS le PodDisruptionBudget ni le `terminationGracePeriodSeconds` — grace period de 0s en cas de seuil « hard » (arrêt immédiat)."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/",
    "https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/"
  ]
},
{
  "id": "f-j1-vpa-practice",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "VPA en pratique : update modes, resourcePolicy et Goldilocks",
  "lead": "Le VPA ne décide jamais tout seul de grandir à l'infini — c'est toi qui poses les bornes. Et il ne répare rien, il ajuste juste les requests/limites.",
  "body": [
    "Le VPA « frees users from the necessity of setting up-to-date resource requests for the containers in their pods » en les ajustant automatiquement selon l'usage réel observé — mais toujours DANS des bornes que tu définis toi-même, jamais de façon totalement autonome."
  ],
  "points": [
    "4 update modes officiels — `Off` (« the recommender still sets the recommended resources in the VerticalPodAutoscaler object » sans jamais les appliquer — c'est le mode « recommandation seule » utilisé par Goldilocks), `Initial` (assigne les ressources uniquement à la création du Pod, jamais après), `Recreate` (ajuste aussi en cours de vie, en supprimant/recréant le Pod), `Auto` (déprécié, se comporte comme Recreate).",
    "resourcePolicy / containerPolicies — `minAllowed`/`maxAllowed` (bornes basse/haute que le VPA ne dépassera jamais pour un conteneur donné — ex. jamais sous 100 millicores, jamais au-dessus de 2 vCPU), `controlledResources` (CPU et/ou mémoire, les deux par défaut), `controlledValues` : `RequestsOnly` (seule la request bouge) ou `RequestsAndLimits` (les deux bougent ensemble, proportionnellement).",
    "Goldilocks — « a utility that can help you identify a starting point for resource requests and limits », qui « uses the kubernetes vertical-pod-autoscaler in recommendation mode » : il génère un VPA par workload dans un namespace, interroge ses recommandations, et les affiche dans un dashboard — sans jamais rien appliquer lui-même."
  ],
  "note": [
    "Ce que le VPA ne fait PAS (retour de formation, à valider au cas par cas) : ce n'est pas un outil de self-healing — il ne « répare » rien tout seul. Il peut réagir après coup à un OOMKill en augmentant requests/limites au redémarrage suivant pour limiter la récidive, mais il ne détecte pas une fuite mémoire progressive comme un problème à corriger — il ne fait qu'ajuster des chiffres de resources, jamais le comportement de l'application elle-même."
  ],
  "refs": [
    "https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/README.md",
    "https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/docs/api.md",
    "https://goldilocks.docs.fairwinds.com/"
  ]
},
{
  "id": "f-j1-node-allocatable",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "Node Capacity vs Allocatable : le delta qu'on oublie",
  "lead": "Un nœud avec « 2 vCPU » n'offre jamais 2 vCPU aux Pods — une partie est toujours réservée pour que le nœud lui-même reste vivant.",
  "body": [
    "« 'Allocatable' on a Kubernetes node is defined as the amount of compute resources that are available for pods. The scheduler does not over-subscribe 'Allocatable'. » Sans réservation, « pods can consume all the available capacity on a node by default […] nodes typically run quite a few system daemons that power the OS and Kubernetes itself. Unless resources are set aside for these system daemons, pods and system daemons compete for resources and lead to resource starvation issues on the node. »"
  ],
  "points": [
    "La formule officielle — `Allocatable = Capacity − Reserved`, avec 3 composantes réservées : `kubeReserved` (kubelet, container runtime), `systemReserved` (démons OS — sshd, udev, mémoire noyau), et `evictionHardThresholds` (marge de sécurité contre la famine de ressources au niveau du nœud).",
    "Concret — un nœud « 2 vCPU » peut, selon la config, avoir seulement ~1,8 vCPU réellement allocatable aux Pods (chiffre d'exemple cité en formation, PAS une valeur fixe universelle) : la différence part dans le fonctionnement du nœud lui-même.",
    "Ça varie — le montant exact réservé dépend de la distribution Kubernetes utilisée (kubeadm, RKE2, EKS…) et peut même différer légèrement d'une version de Kubernetes à l'autre pour une même distribution."
  ],
  "note": [
    "Conséquence directe pour le scheduler (voir note « Requests & Limits ») : c'est bien sur l'ALLOCATABLE, pas sur la capacité brute affichée, que se fait le calcul de bin-packing — un Pod peut rester `Pending` alors que la capacité totale du nœud semblait suffisante, simplement parce que la réserve système grignote la marge disponible."
  ],
  "refs": [
    "https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/"
  ]
},
{
  "id": "f-j1-node-conditions-eviction",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "MemoryPressure & DiskPressure : les seuils d'éviction par défaut",
  "lead": "Deux Node Conditions visibles au `kubectl describe node`, qui déclenchent l'éviction de Pods dès que le kubelet manque de marge sur le disque ou la mémoire.",
  "body": [
    "Configuration des seuils d'éviction, deux façons : via des flags au démarrage du kubelet, ou directement dans son fichier de config YAML (`KubeletConfiguration`).",
    "Seuils « hard » par défaut (déclenchement immédiat, grace period 0s) — `memory.available` : 100Mi ; `nodefs.available` : 10 % (ou 1Gi, le plus grand des deux) ; `nodefs.inodesFree` : 5 % (ou 200Ki, le plus grand des deux)."
  ],
  "points": [
    "MemoryPressure — condition déclenchée par le signal `memory.available` (calculé comme `capacity[memory] − stats.memory.workingSet`).",
    "DiskPressure — condition déclenchée par PLUSIEURS signaux : `nodefs.available`/`nodefs.inodesFree` (système de fichiers du nœud) ET `imagefs.available`/`imagefs.inodesFree` (système de fichiers dédié aux images de conteneurs, si distinct) — c'est ce qui permet au kubelet de purger son filesystem quand les images prennent trop de place.",
    "Visible via `kubectl describe node` — section `Conditions`, avec `Status: False` + raison `KubeletHasSufficientMemory`/`KubeletHasSufficientDisk` en temps normal, basculant à `Status: True` + `KubeletMemoryPressure`/`KubeletDiskPressure` une fois le seuil atteint.",
    "Ordre de réaction du kubelet — d'abord réclamer des ressources SANS toucher aux Pods utilisateur (supprimer Pods/conteneurs morts, purger les images inutilisées) ; seulement si ça ne suffit pas, évincer des Pods, dans l'ordre QoS déjà vu (BestEffort → Burstable → Guaranteed, le plus gros consommateur d'abord dans chaque classe).",
    "Auto-réparation — si les Pods évincés étaient gérés par un Deployment/StatefulSet, « the control plane (kube-controller-manager) creates new pods in place of the evicted pods » ailleurs dans le cluster : pas d'intervention manuelle nécessaire pour les workloads managés."
  ],
  "note": [
    "Rappel déjà vu dans « QoS classes » : l'éviction par pression NE respecte PAS le `PodDisruptionBudget` ni le `terminationGracePeriodSeconds` du Pod — seul le `eviction-max-pod-grace-period` du kubelet s'applique, et seulement pour les seuils « soft »."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/"
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
  "id": "f-j1-node-affinity",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "Node affinity : preferred vs required, et les opérateurs",
  "lead": "Une préférence de nœud n'est pas un prérequis — sauf si on demande explicitement le mode strict, et alors le Pod reste Pending plutôt que d'être placé ailleurs.",
  "body": [
    "Les deux modes officiels : `requiredDuringSchedulingIgnoredDuringExecution` — « The scheduler can't schedule the Pod unless the rule is met. This functions like nodeSelector, but with a more expressive syntax » (si aucun nœud ne matche, le Pod reste `Pending`, il n'est PAS replacé ailleurs) — et `preferredDuringSchedulingIgnoredDuringExecution` — « The scheduler tries to find a node that meets the rule. If a matching node is not available, the scheduler still schedules the Pod » (c'est un souhait, pas un requirement). `IgnoredDuringExecution` dans les deux cas : « if the node labels change after Kubernetes schedules the Pod, the Pod continues to run » — l'affinité n'est vérifiée qu'AU moment du scheduling, jamais réévaluée après coup."
  ],
  "points": [
    "Se définit dans `spec.affinity.nodeAffinity`, via un `matchExpressions` qui matche un label de nœud (pas une annotation).",
    "Opérateurs disponibles (liste officielle complète) : `In`, `NotIn`, `Exists`, `DoesNotExist`, `Gt`, `Lt`."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/"
  ]
},
{
  "id": "f-j1-pod-affinity-antiaffinity",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "Pod affinity / anti-affinity : co-localiser ou séparer via topologyKey",
  "lead": "Même logique preferred/required que node affinity, mais le critère matché n'est plus un label de NŒUD — c'est un label d'AUTRES PODS.",
  "body": [
    "« You can constrain a Pod using labels on other Pods running on the node (or other topological domain), instead of just node labels, which allows you to define rules for which Pods can be co-located on a node. » Deux règles symétriques : `podAffinity` (je veux tourner sur le même domaine topologique que tel ensemble de Pods) et `podAntiAffinity` (je NE veux PAS tourner sur le même domaine que tel ensemble de Pods) — chacune avec les mêmes variantes `required`/`preferred` que node affinity.",
    "`topologyKey` — le label de NŒUD qui définit le périmètre du \"même endroit\" : ex. `kubernetes.io/hostname` (même nœud précisément) ou `topology.kubernetes.io/zone` (même zone, plusieurs nœuds). Nœuds portant la même valeur pour ce label = même domaine topologique ; le scheduler compare les Pods matchés par `labelSelector` à l'intérieur de ce domaine."
  ],
  "points": [
    "Cas d'usage officiels — affinity : co-localiser deux services qui communiquent beaucoup pour réduire la latence. Anti-affinity : répartir les réplicas d'une appli sur différents nœuds/zones pour la haute disponibilité.",
    "Retour d'expérience formateur (pas une doc officielle, mais cohérent avec le cas d'usage HA ci-dessus) : concentrer tous les Pods d'une même base de données à fort IO sur un seul nœud peut faire compétition de ressources avec les autres Pods du même nœud — les séparer via `podAntiAffinity` limite ce risque en plus d'apporter de la résilience."
  ],
  "note": [
    "À relier à la note suivante « topologySpreadConstraints » : pod affinity/anti-affinity contrôle un PLACEMENT relatif (avec/sans tel autre Pod), mais ne garantit PAS une distribution équilibrée entre domaines — pour ça, il faut `topologySpreadConstraints`."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/"
  ]
},
{
  "id": "f-j1-topology-spread-constraints",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "topologySpreadConstraints : distribuer les Pods entre zones (maxSkew)",
  "lead": "Le mécanisme dédié pour garantir une distribution équilibrée entre domaines topologiques (nœuds, zones, régions) — ce que l'anti-affinity seule ne garantit pas.",
  "body": [
    "`topologyKey` — « the key of node labels. Nodes that have a label with this key and identical values are considered to be in the same topology. We call each instance of a topology (in other words, a <key, value> pair) a domain. The scheduler will try to put a balanced number of pods into each domain. » Les labels bien connus `topology.kubernetes.io/zone` et `topology.kubernetes.io/region` sont typiquement fournis nativement par les cloud providers (à définir soi-même si le cluster est self-managed).",
    "`maxSkew` — « describes the degree to which Pods may be unevenly distributed » : avec `whenUnsatisfiable: DoNotSchedule` (valeur par défaut), c'est « the maximum permitted difference between the number of matching pods in the target topology and the global minimum » (ex. 3 zones à 2/2/1 Pods matchés → minimum global = 1, skew de la zone à 2 = 1)."
  ],
  "points": [
    "`whenUnsatisfiable` — `DoNotSchedule` (défaut) : « tells the scheduler not to schedule it » (le Pod reste `Pending` si la contrainte n'est pas respectable) ; `ScheduleAnyway` : « tells the scheduler to still schedule it while prioritizing nodes that minimize the skew » (best-effort).",
    "`labelSelector` — « used to find matching Pods. Pods that match this label selector are counted to determine the number of Pods in their corresponding topology domain » : sans lui, AUCUN Pod n'est compté et la contrainte ne fait rien.",
    "Exemple repris en formation : Pods `app=myapp`, `topologyKey: topology.kubernetes.io/zone`, `maxSkew: 1`, `whenUnsatisfiable: DoNotSchedule` — avec 3 zones disponibles, le scheduler pose au plus 1 Pod de plus dans une zone que dans la zone la moins peuplée ; une fois cet écart atteint partout, tout Pod supplémentaire reste `Pending` tant qu'aucune zone ne peut l'absorber sans dépasser `maxSkew`."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/"
  ]
},
{
  "id": "f-j1-poddisruptionbudget",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "PodDisruptionBudget : protéger la dispo pendant les opérations volontaires",
  "lead": "Anti-affinity et topologySpreadConstraints distribuent les Pods, mais ne protègent pas contre le fait qu'une opération de maintenance en vide plusieurs à la fois — c'est le rôle du PodDisruptionBudget.",
  "body": [
    "Distinction officielle disruption involontaire / volontaire. Involontaire (subie, ex. panne matérielle du nœud, VM supprimée par erreur, panne hyperviseur/cloud provider, kernel panic, nœud disparaissant du cluster suite à une partition réseau) vs volontaire (déclenchée par l'admin/le propriétaire de l'appli : suppression d'un déploiement, mise à jour du pod template, suppression directe d'un Pod, `drain` d'un nœud pour réparation/upgrade/scale down).",
    "« A PDB limits the number of Pods of a replicated application that are down simultaneously from voluntary disruptions. » Exemple officiel : « a Deployment which has .spec.replicas: 5 is supposed to have 5 pods at any given time. If its PDB allows for there to be 4 at a time, then the Eviction API will allow voluntary disruption of one (but not two) pods at a time. »"
  ],
  "points": [
    "`kubectl drain` respecte le PDB en passant par l'API d'éviction — « Cluster managers and hosting providers should use tools which respect PodDisruptionBudgets by calling the Eviction API instead of directly deleting pods. » « The eviction request... may be temporarily rejected, so the tool periodically retries all failed requests until all Pods on the target node are terminated. » Concrètement (exemple repris en formation) : un PDB `minAvailable: 1` sur les Pods `app=kube-dns` garantit qu'au moins une instance DNS reste up pendant qu'un `drain` vide les nœuds les uns après les autres.",
    "Confirmation d'une affirmation entendue en formation (« si vous supprimez la ressource, ça ne va pas vous en empêcher ») : c'est exact et documenté — « Not all voluntary disruptions are constrained by Pod Disruption Budgets. For example, deleting deployments or pods bypasses Pod Disruption Budgets. » Seules les opérations qui passent par l'Eviction API (comme `kubectl drain`) sont bloquées par le PDB ; un `kubectl delete pod`/`delete deployment` direct l'ignore totalement.",
    "Mitigation des disruptions INVOLONTAIRES (le PDB ne peut rien faire ici — il ne couvre que le volontaire) : « Ensure your pod requests the resources it needs. Replicate your application if you need higher availability. For even higher availability... spread applications across racks (using anti-affinity) or across zones » — exactement les 3 leviers cités en formation (ressources, réplication, répartition), voir notes « Requests & Limits » et « Pod affinity / anti-affinity »."
  ],
  "note": [
    "Cohérence interne : si le déploiement entier est supprimé, le `labelSelector` du PDB ne matche plus aucun Pod — le PDB devient de facto sans effet, ce qui explique le \"retour en incident\" mentionné en formation dans ce cas."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/workloads/pods/disruptions/"
  ]
},
{
  "id": "f-j1-taints-tolerations",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Scheduler",
  "title": "Taints & Tolerations : réserver des nœuds à un usage (les 3 niveaux)",
  "lead": "Un taint REPOUSSE les Pods qui n'ont pas la tolérance associée — le mécanisme exactement inverse de l'affinity, qui ATTIRE.",
  "body": [
    "« Node affinity is a property of Pods that attracts them to a set of nodes. Taints are the opposite -- they allow a node to repel a set of pods. » Un taint se définit par `key`, `value`, `effect` (ex. `kubectl taint nodes node1 key1=value1:NoSchedule`)."
  ],
  "points": [
    "Les 3 effets confirment exactement les 3 niveaux décrits en formation : `NoExecute` — « Pods that do not tolerate the taint are evicted immediately » (les Pods déjà présents SANS tolérance sont virés) ; `NoSchedule` — « No new Pods will be scheduled on the tainted node unless they have a matching toleration » MAIS « Pods currently running on the node are NOT evicted » (les nouveaux sont bloqués, les existants restent) ; `PreferNoSchedule` — « soft version of NoSchedule » : « the control plane will try to avoid placing a Pod... but it is not guaranteed ».",
    "Toleration — champs `key`, `operator` (`Exists` : pas de `value` requise ; `Equal` : `value` obligatoire), `effect` (doit matcher celui du taint), et `tolerationSeconds` — « optional field that dictates how long a pod will stay bound to the node after a NoExecute taint is added. After this duration expires, the pod is evicted » (uniquement pertinent avec `NoExecute`).",
    "Confirmation d'une affirmation entendue en formation (concaténer nodeSelector + taint/toleration pour un nœud \"quasi exclusivement dédié\") : c'est cohérent avec la doc — un taint seul REPOUSSE les Pods sans tolérance, mais n'empêche PAS un autre Pod qui AURAIT la même tolérance de s'y poser ; pour garantir qu'un nœud n'héberge QUE les Pods voulus, il faut en plus les ATTIRER explicitement via `nodeSelector`/`nodeAffinity` — taint/toleration et affinity sont complémentaires, pas substituables l'un à l'autre.",
    "Cas d'usage concrets cités en formation pour des node pools dédiés : (1) workloads IA (besoin de GPU + SSD haute perf — pas de sens à les mélanger avec un Nginx) ; (2) outils de sauvegarde (Velero/MinIO) co-localisés via pod affinity sur des nœuds \"stockage\" (peu de RAM/disques locaux, mais beaucoup de points de montage) ; (3) stack d'observabilité isolée sur ses propres nœuds quand créer un cluster dédié n'est pas envisageable. Le point (2) est étayé côté doc officielle : « the maximum number of volumes that can be attached to a node is cloud provider specific » (ex. 39 par défaut sur EBS, jusqu'à 127 sur GCP PD selon le type de nœud) — regrouper les workloads à fort besoin de volumes sur des nœuds dédiés est une vraie réponse à cette limite documentée, pas seulement une préférence d'organisation."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
    "https://kubernetes.io/docs/concepts/storage/storage-limits/"
  ]
},
{
  "id": "f-j1-serviceaccount-vs-user",
  "day": "Jour 1 — 16 sept. 2026",
  "section": "Secrets & sécurité",
  "title": "ServiceAccount vs utilisateur humain : pourquoi Kubernetes ne gère pas les deux pareil",
  "lead": "Un Pod n'a aucune identité en dehors du cluster ; un humain, lui, a presque toujours déjà une identité gérée ailleurs (LDAP, OIDC…) — Kubernetes en tire une distinction structurelle.",
  "body": [
    "« Kubernetes does not have objects which represent normal user accounts. Normal users cannot be added to a cluster through an API call. » Kubernetes part du principe qu'un système d'identité INDÉPENDANT DU CLUSTER gère déjà les humains — « It is assumed that a cluster-independent service manages normal users in the following ways: an administrator distributing private keys; a user store like Keystone or Google Accounts; a file with a list of usernames and passwords. » Kubernetes ne réinvente donc pas la gestion d'utilisateurs : il fait confiance à un certificat signé par la CA du cluster (le nom d'utilisateur vient alors du `CN` du certificat, ex. `/CN=bob`) ou à un jeton OIDC, puis laisse RBAC décider des droits.",
    "« In contrast, service accounts are users managed by the Kubernetes API. They are bound to specific namespaces, and created automatically by the API server or manually through API calls. Service accounts are tied to a set of credentials stored as Secrets, which are mounted into pods allowing in-cluster processes to talk to the Kubernetes API. » Un Pod naît et meurt avec le cluster : il lui fallait un mécanisme d'identité NATIF, automatisable, créé/détruit par l'API server lui-même — pas un système externe."
  ],
  "points": [
    "Tableau de comparaison officiel : `ServiceAccount` — objet de l'API Kubernetes, prévu pour les workloads/l'automatisation. `User`/`group` — externe au cluster, prévu pour les personnes.",
    "Dans les deux cas, l'identité authentifiée passe ensuite par le MÊME système d'autorisation : RBAC. La différence porte uniquement sur COMMENT l'identité est établie (authentification), pas sur comment les droits lui sont ensuite attribués."
  ],
  "refs": [
    "https://kubernetes.io/docs/concepts/security/service-accounts/",
    "https://kubernetes.io/docs/reference/access-authn-authz/authentication/"
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
