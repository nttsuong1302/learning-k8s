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
    "CSI driver — implémente les services Identity, Node, et optionnellement Controller définis par la spécification CSI ; c'est une application conteneurisée, développée et déployée librement par chaque fournisseur de stockage.",
    "Controller Plugin — déployé en Deployment ou StatefulSet, sur n'importe quel nœud du cluster : « generally does not need direct access to the host and can perform all its operations through the Kubernetes API » (provisioning, attachment des volumes…).",
    "Node Plugin — déployé en DaemonSet, sur CHAQUE nœud du cluster, car il lui faut « direct access to the host for making block devices and/or filesystem mounts available to the Kubernetes kubelet ».",
    "CSIDriver — objet Kubernetes qui décrit les capacités et exigences d'un driver CSI donné, déployé par le fournisseur de stockage.",
    "Dans le spec d'un Pod, un volume `csi` référence : `driver` (le nom du CSI driver), `volumeAttributes` (attributs passés au driver), `fsType`, `readOnly`, et `nodePublishSecretRef` (secret pour l'authentification)."
  ],
  "note": [
    "À relier à la note « Filtering (2/2) : contraintes de volumes » (Scheduler) : c'est justement ce driver CSI, via l'objet CSIStorageCapacity, que le scheduler interroge pour savoir si un nœud peut réellement obtenir le volume demandé avant d'y placer le Pod."
  ],
  "refs": [
    "https://kubernetes-csi.github.io/docs/",
    "https://kubernetes-csi.github.io/docs/deploying.html",
    "https://kubernetes.io/docs/concepts/storage/volumes/"
  ]
}
  ];
  DATA.forEach((o) => F.push(o));
})();
