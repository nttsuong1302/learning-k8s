// Lot 8 : +50 questions théoriques sourcées sur kubernetes.io (scan de la doc).
// Chaque question porte why[] par option, explain (synthèse) et ref (doc officielle),
// plus la traduction en:{q,choices}. Répartition par pondération CKA.
(function () {
  const Q = window.CKA.questions;
  const DATA = [
{
  "id": "t8-a1",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "A quoi sert un objet RuntimeClass dans Kubernetes ?",
  "choices": [
    "A selectionner une configuration de container runtime differente pour un Pod (equilibre performance/securite/isolation)",
    "A definir le CIDR reseau des Pods pour un nœud",
    "A limiter la consommation CPU/memoire agregee d'un namespace",
    "A signer les certificats du control plane"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : RuntimeClass permet de choisir la configuration CRI a utiliser pour executer un Pod donne.",
    "Faux : le CIDR des Pods se configure via kubeadm (--pod-network-cidr) ou la configuration reseau du cluster, pas via RuntimeClass.",
    "Faux : c'est le role d'un ResourceQuota, pas de RuntimeClass.",
    "Faux : la signature des certificats releve du controleur CSR, sans lien avec RuntimeClass."
  ],
  "explain": "RuntimeClass permet de selectionner la configuration du container runtime (CRI) utilisee pour executer les containers d'un Pod, afin d'equilibrer performance, securite et isolation (par exemple executer des workloads sensibles avec une virtualisation materielle).",
  "ref": "https://kubernetes.io/docs/concepts/containers/runtime-class/",
  "en": {
    "q": "What is the purpose of a RuntimeClass object in Kubernetes?",
    "choices": [
      "To select a different container runtime configuration for a Pod (balancing performance/security/isolation)",
      "To define the Pod network CIDR for a node",
      "To limit the aggregate CPU/memory consumption of a namespace",
      "To sign control plane certificates"
    ]
  }
},
{
  "id": "t8-a10",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Un administrateur execute `kubectl delete pod static-web-my-node1` ou `static-web-my-node1` est le mirror Pod d'un Static Pod. Que se passe-t-il ?",
  "choices": [
    "Le mirror Pod est supprime dans l'API mais le kubelet le recree presque aussitot, car le Static Pod reel est gere par le manifeste local sur le nœud, pas par l'API",
    "Le Static Pod est definitivement supprime du nœud et ne redemarre jamais",
    "La commande echoue immediatement avec une erreur de permission",
    "Le mirror Pod est supprime et le kubelet cesse de le recreer tant que le manifeste n'est pas modifie"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : le mirror Pod est une simple representation en lecture seule dans l'API ; sa suppression via kubectl ne supprime pas le Static Pod reel, que le kubelet recree presque immediatement.",
    "Faux : seule la suppression ou le deplacement du fichier manifeste sur le nœud arrete effectivement le Static Pod.",
    "Faux : la suppression via l'API n'echoue pas techniquement, mais elle n'a pas d'effet durable.",
    "Faux : le kubelet continue de surveiller le manifeste local et recree le mirror Pod tant que celui-ci existe sur le disque."
  ],
  "explain": "Le mirror Pod n'est qu'une representation en lecture seule du Static Pod dans l'API Kubernetes. Le supprimer via `kubectl delete` ne supprime pas le Static Pod reel : le kubelet, qui gere ce dernier a partir du manifeste local (par ex. `/etc/kubernetes/manifests/`), recree le mirror Pod presque immediatement. Pour reellement arreter le Static Pod, il faut deplacer ou supprimer son fichier manifeste sur le nœud.",
  "ref": "https://kubernetes.io/docs/tasks/configure-pod-container/static-pod/",
  "en": {
    "q": "An administrator runs `kubectl delete pod static-web-my-node1` where `static-web-my-node1` is the mirror Pod of a Static Pod. What happens?",
    "choices": [
      "The mirror Pod is deleted from the API but the kubelet recreates it almost immediately, because the actual Static Pod is managed by the local manifest on the node, not by the API",
      "The Static Pod is permanently removed from the node and never restarts",
      "The command fails immediately with a permission error",
      "The mirror Pod is deleted and the kubelet stops recreating it until the manifest is changed"
    ]
  }
},
{
  "id": "t8-a11",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Concernant le flag kubelet `--node-ip`, que se passe-t-il si on ne le renseigne pas dans un cluster mono-pile (single-stack) IPv4 ?",
  "choices": [
    "Le kubelet utilise l'adresse IPv4 par defaut du nœud ; si celui-ci n'en a aucune, il utilise son adresse IPv6 par defaut",
    "Le kubelet refuse de demarrer tant que `--node-ip` n'est pas explicitement defini",
    "Le kubelet attribue automatiquement une adresse IP virtuelle issue du CIDR des Pods",
    "Le kubelet desactive l'enregistrement automatique du nœud aupres de l'API server"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : en l'absence de `--node-ip`, le kubelet retient l'adresse IPv4 par defaut du nœud, ou a defaut son adresse IPv6 par defaut.",
    "Faux : `--node-ip` est optionnel, le kubelet demarre normalement sans cette valeur explicite.",
    "Faux : l'attribution d'adresses issues du CIDR des Pods concerne les Pods, pas l'adresse du nœud lui-meme.",
    "Faux : l'enregistrement automatique aupres de l'API server est controle par le flag distinct `--register-node`, pas par `--node-ip`."
  ],
  "explain": "Le flag `--node-ip` du kubelet precise l'adresse (ou les adresses, une par famille) a utiliser pour le nœud. S'il n'est pas fourni, le kubelet utilise par defaut l'adresse IPv4 du nœud, ou son adresse IPv6 par defaut si aucune adresse IPv4 n'est disponible.",
  "ref": "https://kubernetes.io/docs/concepts/architecture/nodes/",
  "en": {
    "q": "Regarding the kubelet flag `--node-ip`, what happens if it is not set on a single-stack IPv4 cluster?",
    "choices": [
      "The kubelet uses the node's default IPv4 address; if the node has none, it uses its default IPv6 address",
      "The kubelet refuses to start until `--node-ip` is explicitly set",
      "The kubelet automatically assigns a virtual IP address from the Pod CIDR",
      "The kubelet disables automatic node registration with the API server"
    ]
  }
},
{
  "id": "t8-a12",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "A quoi servent respectivement `kubeadm config images list` et `kubeadm config images pull` ?",
  "choices": [
    "La premiere liste les images de conteneurs necessaires a `kubeadm init` (par ex. pour un environnement air-gapped), la seconde les telecharge localement avant l'initialisation",
    "Les deux commandes font exactement la meme chose : afficher les images utilisees",
    "Elles servent uniquement a supprimer les images inutilisees du nœud",
    "Elles configurent le registre d'images par defaut du cluster de facon permanente"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : `images list` affiche les images requises par kubeadm, utile pour preparer un miroir/registre prive ou un environnement sans acces internet ; `images pull` les telecharge effectivement avant `kubeadm init`.",
    "Faux : `list` affiche seulement les noms, tandis que `pull` effectue le telechargement reel des images.",
    "Faux : aucune des deux commandes ne supprime des images, elles servent a les lister ou les recuperer.",
    "Faux : ces commandes ne modifient pas de configuration permanente du cluster, elles operent au moment de la preparation de l'init."
  ],
  "explain": "`kubeadm config images list` liste les images de conteneurs qu'utilisera `kubeadm init`, ce qui est particulierement utile pour preparer un environnement air-gapped ou un registre prive. `kubeadm config images pull` telecharge effectivement ces images sur le nœud avant de lancer l'initialisation du cluster.",
  "ref": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/",
  "en": {
    "q": "What do `kubeadm config images list` and `kubeadm config images pull` respectively do?",
    "choices": [
      "The first lists the container images required by `kubeadm init` (e.g. for an air-gapped environment), the second downloads them locally before initialization",
      "Both commands do exactly the same thing: display the images used",
      "They are only used to remove unused images from the node",
      "They permanently configure the cluster's default image registry"
    ]
  }
},
{
  "id": "t8-a2",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Dans un objet RuntimeClass, quel champ est OBLIGATOIRE et identifie la configuration CRI a utiliser ?",
  "choices": [
    "handler",
    "scheduling",
    "overhead",
    "runtimeClassName"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : `handler` est le champ obligatoire qui reference la configuration CRI correspondante sur les nœuds.",
    "Faux : `scheduling` est optionnel, il sert a contraindre le placement des Pods sur des nœuds compatibles.",
    "Faux : `overhead` est optionnel, il declare la surcharge de ressources associee au runtime.",
    "Faux : `runtimeClassName` est le champ du Pod (pas de la RuntimeClass) qui reference son nom."
  ],
  "explain": "Le champ `handler` d'une RuntimeClass est requis et doit correspondre a un nom de configuration valide du CRI (containerd, CRI-O, etc.) present sur les nœuds ; c'est ce nom que le kubelet transmet au runtime pour executer le Pod.",
  "ref": "https://kubernetes.io/docs/concepts/containers/runtime-class/",
  "en": {
    "q": "In a RuntimeClass object, which field is REQUIRED and identifies the CRI configuration to use?",
    "choices": [
      "handler",
      "scheduling",
      "overhead",
      "runtimeClassName"
    ]
  }
},
{
  "id": "t8-a3",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Quelle commande permet d'appliquer directement au cluster les ressources generees par une kustomization (dossier contenant un `kustomization.yaml`) ?",
  "choices": [
    "kubectl apply -k DOSSIER",
    "kubectl apply -f DOSSIER",
    "kubectl apply -k DOSSIER --dry-run",
    "kubectl kustomize apply DOSSIER"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : le flag `-k` indique a kubectl de traiter le dossier comme une kustomization et d'appliquer le resultat.",
    "Faux : `-f` applique un fichier/manifest brut, pas une kustomization.",
    "Faux : `--dry-run` empeche l'application reelle, ce n'est pas la commande demandee.",
    "Faux : `kubectl kustomize apply` n'existe pas ; `kubectl kustomize` affiche seulement le rendu sans l'appliquer."
  ],
  "explain": "Depuis Kubernetes 1.14, kubectl integre nativement Kustomize : `kubectl apply -k DOSSIER` applique au cluster les objets generes a partir du `kustomization.yaml` du dossier indique.",
  "ref": "https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/",
  "en": {
    "q": "Which command applies directly to the cluster the resources generated from a kustomization (a directory containing a `kustomization.yaml`)?",
    "choices": [
      "kubectl apply -k DIRECTORY",
      "kubectl apply -f DIRECTORY",
      "kubectl apply -k DIRECTORY --dry-run",
      "kubectl kustomize apply DIRECTORY"
    ]
  }
},
{
  "id": "t8-a4",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Dans une CustomResourceDefinition avec plusieurs `versions`, quelle regle s'applique au champ `storage` ?",
  "choices": [
    "Exactement une version doit avoir `storage: true` : c'est celle sous laquelle les objets sont enregistres dans etcd",
    "Toutes les versions doivent avoir `storage: true` pour etre lisibles",
    "`storage: true` signifie que la version n'est plus accessible aux clients",
    "Le champ `storage` n'a aucun effet, seul `served` compte pour la persistance"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : une seule version peut porter `storage: true`, les objets y sont stockes ; les autres versions sont servies via conversion.",
    "Faux : au contraire, une seule version doit avoir `storage: true` a la fois.",
    "Faux : c'est `served: false` qui rend une version inaccessible aux clients, pas `storage`.",
    "Faux : `storage` determine bien la version de persistance en etcd, independamment de `served`."
  ],
  "explain": "Dans `spec.versions` d'une CRD, exactement une version doit avoir `storage: true` : c'est la version sous laquelle les objets sont effectivement stockes dans etcd, les autres versions etant servies via conversion depuis/vers cette version de stockage.",
  "ref": "https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/",
  "en": {
    "q": "In a CustomResourceDefinition with multiple `versions`, which rule applies to the `storage` field?",
    "choices": [
      "Exactly one version must have `storage: true`: that is the one under which objects are stored in etcd",
      "All versions must have `storage: true` to be readable",
      "`storage: true` means the version is no longer accessible to clients",
      "The `storage` field has no effect, only `served` matters for persistence"
    ]
  }
},
{
  "id": "t8-a5",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Concernant la conversion entre versions d'une CustomResourceDefinition, quelles affirmations sont correctes ? (plusieurs reponses)",
  "choices": [
    "La strategie `None` ne fait que modifier le champ `apiVersion`, adaptee quand toutes les versions partagent le meme schema",
    "La strategie `Webhook` delegue la conversion a un service qui applique une logique personnalisee entre schemas differents",
    "Mettre `served: false` sur une version empeche les clients de la lire ou l'ecrire, sans forcement la retirer de `spec.versions`",
    "Une CRD ne peut jamais servir plus d'une version simultanement aux clients"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : la strategie `None` (par defaut) suppose des schemas identiques et ne change que l'`apiVersion`.",
    "Correct : la strategie `Webhook` s'appuie sur un webhook de conversion pour transformer les objets entre versions au schema different.",
    "Correct : `served: false` desactive l'acces client a une version, en general comme etape avant sa suppression definitive.",
    "Faux : une CRD peut tres bien exposer plusieurs versions `served: true` simultanement pour permettre une migration progressive."
  ],
  "explain": "Une CRD peut definir plusieurs versions servies simultanement. La conversion entre versions suit soit la strategie `None` (schemas identiques, seul `apiVersion` change), soit `Webhook` (schemas differents, conversion via un service webhook). Le champ `served` controle l'acces client independamment du retrait de la version de `spec.versions`.",
  "ref": "https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/",
  "en": {
    "q": "Regarding conversion between versions of a CustomResourceDefinition, which statements are correct? (multiple answers)",
    "choices": [
      "The `None` strategy only changes the `apiVersion` field, suitable when all versions share the same schema",
      "The `Webhook` strategy delegates conversion to a service that applies custom logic between different schemas",
      "Setting `served: false` on a version prevents clients from reading or writing it, without necessarily removing it from `spec.versions`",
      "A CRD can never serve more than one version simultaneously to clients"
    ]
  }
},
{
  "id": "t8-a6",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Quelle est la difference principale entre la Resource Metrics API et la Custom Metrics API dans Kubernetes ?",
  "choices": [
    "La Resource Metrics API expose seulement CPU/memoire des nœuds et Pods (typiquement via metrics-server), tandis que la Custom Metrics API expose des metriques applicatives specifiques",
    "La Resource Metrics API expose des metriques provenant de systemes externes au cluster, contrairement a la Custom Metrics API",
    "Les deux APIs sont strictement identiques et interchangeables",
    "La Custom Metrics API remplace entierement la Resource Metrics API depuis Kubernetes 1.20"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la Resource Metrics API fournit un socle minimal CPU/memoire (utilise par `kubectl top`, HPA/VPA de base), typiquement implemente par metrics-server ; la Custom Metrics API complete ce pipeline avec des metriques propres a l'application.",
    "Faux : c'est le role de l'External Metrics API d'exposer des metriques issues de systemes externes au cluster.",
    "Faux : elles ont des groupes API et des roles distincts (`metrics.k8s.io` vs `custom.metrics.k8s.io`).",
    "Faux : la Custom Metrics API complemente la Resource Metrics API, elle ne l'a jamais remplacee."
  ],
  "explain": "La Resource Metrics API (groupe `metrics.k8s.io`, typiquement metrics-server) fournit uniquement CPU/memoire pour nœuds et Pods, base minimale pour l'autoscaling. Pour des metriques applicatives plus riches, on deploie un second pipeline exposant la Custom Metrics API (`custom.metrics.k8s.io`).",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/",
  "en": {
    "q": "What is the main difference between the Resource Metrics API and the Custom Metrics API in Kubernetes?",
    "choices": [
      "The Resource Metrics API only exposes node/Pod CPU and memory (typically via metrics-server), while the Custom Metrics API exposes application-specific metrics",
      "The Resource Metrics API exposes metrics from systems external to the cluster, unlike the Custom Metrics API",
      "Both APIs are strictly identical and interchangeable",
      "The Custom Metrics API entirely replaced the Resource Metrics API since Kubernetes 1.20"
    ]
  }
},
{
  "id": "t8-a7",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "A quoi correspond le taint `node.cloudprovider.kubernetes.io/uninitialized` applique par le cloud-controller-manager ?",
  "choices": [
    "Il est place sur un nœud fraichement cree pour empecher la planification de Pods avant que le node controller n'ait renseigne ses informations cloud, puis retire une fois l'initialisation terminee",
    "Il est place de facon permanente sur tous les nœuds workers pour interdire tout Pod applicatif",
    "Il signale qu'un nœud a echoue son upgrade kubeadm",
    "Il empeche uniquement le scheduling des Pods systeme (kube-system)"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : ce taint protege temporairement le nœud tant que le node controller du cloud-controller-manager n'a pas complete son initialisation (identifiant cloud, labels de region/ressources, etc.).",
    "Faux : ce taint est temporaire et retire une fois le nœud initialise, pas permanent.",
    "Faux : ce taint n'est pas lie a un echec d'upgrade kubeadm.",
    "Faux : il bloque la planification de tous les Pods sur ce nœud, pas seulement ceux de kube-system."
  ],
  "explain": "Quand un nœud est cree dans un environnement cloud, le cloud-controller-manager (via le node controller) lui applique ce taint le temps de recuperer l'identifiant du serveur aupres du fournisseur cloud et d'annoter/labelliser le Node avec les informations specifiques (region, ressources...). Le taint est retire une fois cette initialisation terminee, rendant le nœud disponible pour le scheduling.",
  "ref": "https://kubernetes.io/docs/concepts/architecture/cloud-controller/",
  "en": {
    "q": "What does the taint `node.cloudprovider.kubernetes.io/uninitialized`, applied by the cloud-controller-manager, correspond to?",
    "choices": [
      "It is placed on a freshly created node to prevent Pod scheduling until the node controller has filled in its cloud information, then removed once initialization completes",
      "It is placed permanently on all worker nodes to forbid any application Pod",
      "It signals that a node failed its kubeadm upgrade",
      "It only prevents scheduling of system Pods (kube-system)"
    ]
  }
},
{
  "id": "t8-a8",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Parmi les ClusterRoles utilisateur integrees de Kubernetes, laquelle donne un acces en lecture/ecriture sur la plupart des ressources d'un namespace mais NE PERMET PAS de creer ou modifier des Roles/RoleBindings dans ce namespace ?",
  "choices": [
    "edit",
    "view",
    "admin",
    "cluster-admin"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : `edit` autorise a creer/modifier/supprimer la plupart des ressources applicatives d'un namespace, mais exclut deliberement la gestion des Roles/RoleBindings pour eviter l'escalade de privileges.",
    "Faux : `view` est en lecture seule et ne permet aucune modification.",
    "Faux : `admin`, contrairement a `edit`, peut justement creer/modifier des Roles et RoleBindings dans le namespace.",
    "Faux : `cluster-admin` donne un acces illimite a l'ensemble du cluster, bien au-dela d'un simple namespace."
  ],
  "explain": "La ClusterRole `edit` permet lecture/ecriture sur la plupart des objets d'un namespace, mais n'inclut pas la capacite de creer ou modifier des Roles et RoleBindings, contrairement a `admin` qui les inclut : cette restriction previent l'escalade de privileges via `edit`.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
  "en": {
    "q": "Among Kubernetes built-in user-facing ClusterRoles, which one gives read/write access to most namespace resources but does NOT allow creating or modifying Roles/RoleBindings in that namespace?",
    "choices": [
      "edit",
      "view",
      "admin",
      "cluster-admin"
    ]
  }
},
{
  "id": "t8-a9",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Dans un volume `projected` de type `serviceAccountToken` monte dans un Pod, a quoi sert le champ `audience` ?",
  "choices": [
    "A restreindre la validite du token emis aux destinataires (audiences) correspondant a la valeur indiquee, limitant son usage a un service specifique",
    "A definir la duree de validite en secondes du token",
    "A choisir le namespace du ServiceAccount utilise",
    "A forcer la rotation immediate du token existant"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : `audience` precise le ou les destinataires prevus du token ; celui-ci n'est valide que lorsqu'il est presente a un service correspondant a cette audience, limitant les risques en cas de fuite.",
    "Faux : la duree de validite se configure via le champ `expirationSeconds`, distinct de `audience`.",
    "Faux : le namespace du ServiceAccount est determine par `spec.serviceAccountName` du Pod et son propre namespace, pas par `audience`.",
    "Faux : `audience` ne declenche aucune rotation, il conditionne seulement la portee de validite du token."
  ],
  "explain": "Le champ `audience` du volume projected `serviceAccountToken` restreint le token emis a une ou plusieurs audiences precises : il n'est alors accepte que par les services correspondant a cette audience, ce qui limite l'impact d'une fuite eventuelle du token. Sans ce champ, le token utilise par defaut l'audience du kube-apiserver.",
  "ref": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/",
  "en": {
    "q": "In a `projected` volume of type `serviceAccountToken` mounted in a Pod, what is the purpose of the `audience` field?",
    "choices": [
      "To restrict the issued token's validity to the recipients (audiences) matching the given value, limiting its use to a specific service",
      "To set the token's validity duration in seconds",
      "To choose the namespace of the ServiceAccount used",
      "To force immediate rotation of the existing token"
    ]
  }
},
{
  "id": "t8-w1",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Dans l'API Kubernetes, à quoi correspond l'objet `PodTemplate` (kind: PodTemplate) ?",
  "choices": [
    "Il décrit un modèle réutilisable permettant de créer des copies d'un Pod prédéfini",
    "Il remplace le champ .spec.template d'un Deployment lors des mises à jour",
    "Il définit la politique de quota de ressources appliquée aux Pods d'un namespace",
    "Il stocke l'historique des révisions (ReplicaSets) d'un Deployment"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la documentation le définit ainsi, avec un champ `template` de type PodTemplateSpec.",
    "Incorrect : PodTemplate est un objet API à part entière, indépendant du Deployment.",
    "Incorrect : c'est le rôle de ResourceQuota, pas de PodTemplate.",
    "Incorrect : c'est le rôle du ReplicaSet, pas de PodTemplate."
  ],
  "explain": "L'objet API `PodTemplate` (apiVersion v1) est décrit comme un modèle pour créer des copies d'un Pod prédéfini : il contient des métadonnées et un `template` (PodTemplateSpec) réutilisable. C'est un objet API à part entière, distinct du champ `.spec.template` embarqué dans un Deployment ou un Job.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-template-v1/",
  "en": {
    "q": "In the Kubernetes API, what does the `PodTemplate` object (kind: PodTemplate) represent?",
    "choices": [
      "It describes a reusable template for creating copies of a predefined Pod",
      "It replaces the .spec.template field of a Deployment during updates",
      "It defines the resource quota policy applied to Pods in a namespace",
      "It stores the revision history (ReplicaSets) of a Deployment"
    ]
  }
},
{
  "id": "t8-w2",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Un Pod définit plusieurs `initContainers`, dont certains ont `restartPolicy: Always` (sidecars natifs). D'après la documentation, quand le kubelet démarre-t-il l'initContainer suivant de la liste `.spec.initContainers` ?",
  "choices": [
    "Dès que le conteneur précédent atteint le statut `started: true` (processus lancé sans startupProbe, ou startupProbe réussie)",
    "Seulement après que le conteneur précédent devienne Ready (readinessProbe réussie)",
    "Seulement après que le conteneur précédent se termine avec un code de sortie 0",
    "Tous les initContainers ayant restartPolicy: Always démarrent en parallèle, sans ordre garanti"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la documentation précise que le kubelet passe au suivant une fois le statut `started` à true.",
    "Incorrect : le passage au conteneur suivant dépend du statut `started`, pas de la readiness.",
    "Incorrect : un sidecar (restartPolicy: Always) continue de s'exécuter, il ne se termine pas.",
    "Incorrect : les initContainers, y compris les sidecars, gardent l'ordre séquentiel de la liste."
  ],
  "explain": "Les initContainers avec restartPolicy: Always bénéficient des mêmes garanties d'ordre séquentiel que les initContainers classiques. La documentation précise : après qu'un tel conteneur est en cours d'exécution (le kubelet a mis son statut `started` à true), le kubelet démarre l'initContainer suivant de la liste. Ce statut devient vrai soit parce qu'un process tourne sans startupProbe définie, soit parce que la startupProbe réussit — pas la readinessProbe.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/",
  "en": {
    "q": "A Pod defines several `initContainers`, some with `restartPolicy: Always` (native sidecars). According to the documentation, when does the kubelet start the next init container in the `.spec.initContainers` list?",
    "choices": [
      "As soon as the previous container reaches `started: true` (a process is running with no startupProbe, or the startupProbe succeeds)",
      "Only after the previous container becomes Ready (readinessProbe succeeds)",
      "Only after the previous container exits with status code 0",
      "All init containers with restartPolicy: Always start in parallel, with no guaranteed order"
    ]
  }
},
{
  "id": "t8-w3",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "À l'arrêt d'un Pod contenant un conteneur sidecar natif (initContainer avec `restartPolicy: Always`), que fait le kubelet d'après la documentation ?",
  "choices": [
    "Il attend que les conteneurs applicatifs principaux soient complètement arrêtés avant de terminer les sidecars, puis les arrête dans l'ordre inverse de leur déclaration",
    "Il arrête d'abord les sidecars, puis les conteneurs applicatifs principaux",
    "Il envoie un seul signal SIGTERM global qui arrête tous les conteneurs simultanément",
    "Il arrête les sidecars dans le même ordre que leur déclaration, avant les conteneurs principaux"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est exactement ce que décrit la documentation sur la terminaison des sidecars.",
    "Incorrect : c'est l'inverse — les sidecars sont arrêtés après les conteneurs principaux.",
    "Incorrect : la terminaison suit un ordre précis, pas un signal global simultané.",
    "Incorrect : l'ordre d'arrêt des sidecars est inverse de leur ordre de déclaration."
  ],
  "explain": "D'après la documentation : « à la terminaison du Pod, le kubelet retarde l'arrêt des conteneurs sidecar jusqu'à ce que le conteneur applicatif principal soit complètement arrêté. Les conteneurs sidecar sont ensuite arrêtés dans l'ordre inverse de leur apparition dans la spécification du Pod. » Si le temps de grâce est consommé par les conteneurs principaux, les sidecars reçoivent SIGTERM puis SIGKILL sans avoir eu le temps de s'arrêter proprement.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/",
  "en": {
    "q": "When a Pod containing a native sidecar container (an init container with `restartPolicy: Always`) is terminated, what does the kubelet do according to the documentation?",
    "choices": [
      "It postpones terminating the sidecars until the main application containers have fully stopped, then shuts sidecars down in the reverse order of their declaration",
      "It stops the sidecars first, then the main application containers",
      "It sends a single global SIGTERM signal that stops all containers simultaneously",
      "It stops the sidecars in the same order as their declaration, before the main containers"
    ]
  }
},
{
  "id": "t8-w4",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Concernant le champ `.spec.selector` d'un Deployment, que dit/implique la documentation officielle ?",
  "choices": [
    "Il doit correspondre aux labels définis dans `.spec.template.metadata.labels`, et il ne peut pas être modifié après la création du Deployment (champ immuable)",
    "Il peut être modifié librement après création ; Kubernetes recrée alors automatiquement un nouveau ReplicaSet",
    "Il est optionnel : en son absence, le Deployment sélectionne tous les Pods du namespace",
    "Il définit les labels que doivent porter les nœuds éligibles pour héberger les Pods du Deployment"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la référence API précise qu'il doit matcher les labels du template ; toute tentative de modification après création est rejetée par l'API (« field is immutable »).",
    "Incorrect : une modification de ce champ après création est refusée par l'API.",
    "Incorrect : `.spec.selector` est un champ requis (marqué obligatoire dans la référence API).",
    "Incorrect : le selector cible des Pods via leurs labels, pas des nœuds."
  ],
  "explain": "La référence API du Deployment indique que `.spec.selector` est un sélecteur de labels pour les Pods et qu'il « doit correspondre aux labels du template de Pod » (« It must match the pod template's labels »). Ce champ est requis, et une fois le Deployment créé, l'API rejette toute tentative de le modifier (erreur de validation « field is immutable »), car changer le selector orphelinerait les Pods déjà gérés par le ReplicaSet existant.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
  "en": {
    "q": "Regarding the `.spec.selector` field of a Deployment, what does/implies the official documentation say?",
    "choices": [
      "It must match the labels defined in `.spec.template.metadata.labels`, and it cannot be changed after the Deployment is created (immutable field)",
      "It can be freely changed after creation; Kubernetes then automatically recreates a new ReplicaSet",
      "It is optional: without it, the Deployment selects every Pod in the namespace",
      "It defines the labels that eligible nodes must carry to host the Deployment's Pods"
    ]
  }
},
{
  "id": "t8-w5",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Concernant `strategy.rollingUpdate.maxSurge` et `maxUnavailable` d'un Deployment, quelles affirmations sont exactes d'après la documentation ? (plusieurs réponses)",
  "choices": [
    "Leur valeur par défaut est 25 % chacun",
    "Ils acceptent soit un nombre absolu de Pods, soit un pourcentage du nombre de réplicas souhaité",
    "maxSurge ne peut pas valoir 0 si maxUnavailable vaut aussi 0",
    "Quand un pourcentage est converti en nombre absolu, les deux champs arrondissent toujours vers le bas"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : la référence API indique explicitement « Defaults to 25% » pour les deux champs.",
    "Correct : les deux champs sont de type IntOrString (nombre absolu ex: 5, ou pourcentage ex: 10%).",
    "Correct : la documentation précise que maxSurge ne peut pas être 0 si maxUnavailable est 0 (et vice versa).",
    "Incorrect : maxSurge arrondit vers le haut (rounding up) alors que maxUnavailable arrondit vers le bas (rounding down)."
  ],
  "explain": "D'après la référence API du Deployment : maxSurge « Defaults to 25%... Absolute number is calculated from percentage by rounding up » et maxUnavailable « Defaults to 25%... Absolute number is calculated from percentage by rounding down ». Les deux champs sont de type IntOrString et chacun ne peut valoir 0 que si l'autre ne vaut pas 0 également.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/deployment-v1/",
  "en": {
    "q": "Regarding `strategy.rollingUpdate.maxSurge` and `maxUnavailable` on a Deployment, which statements are correct according to the documentation? (multiple answers)",
    "choices": [
      "Their default value is 25% each",
      "They accept either an absolute number of Pods or a percentage of the desired replica count",
      "maxSurge cannot be 0 if maxUnavailable is also 0",
      "When converting a percentage to an absolute number, both fields always round down"
    ]
  }
},
{
  "id": "t8-w6",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Concernant les scopes `Terminating`, `NotTerminating` et `BestEffort` d'une ResourceQuota, quelles affirmations sont exactes d'après la documentation ? (plusieurs réponses)",
  "choices": [
    "Le scope Terminating regroupe les Pods dont `spec.activeDeadlineSeconds` est défini",
    "Le scope NotTerminating regroupe les Pods dont `spec.activeDeadlineSeconds` n'est pas défini",
    "Le scope BestEffort regroupe les Pods de classe QoS BestEffort (sans requête ni limite de ressources de calcul)",
    "Le scope NotBestEffort ne peut être utilisé qu'en combinaison obligatoire avec le scope Terminating"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : la documentation définit ce scope par la présence de `spec.activeDeadlineSeconds`.",
    "Correct : c'est le scope complémentaire, pour les Pods sans `activeDeadlineSeconds`.",
    "Correct : la documentation relie ce scope à la classe QoS BestEffort (aucune requête de CPU/mémoire).",
    "Incorrect : aucune dépendance de ce type n'est documentée ; chaque scope s'applique indépendamment."
  ],
  "explain": "La documentation des ResourceQuota définit un pod comme « terminating » si `spec.activeDeadlineSeconds` est défini (scope Terminating), le scope NotTerminating étant son complément. Le scope BestEffort correspond aux Pods de la classe QoS best-effort, c'est-à-dire ceux qui ne définissent aucune requête ni limite de ressources de calcul. Ces scopes sont indépendants les uns des autres, sans obligation de combinaison.",
  "ref": "https://kubernetes.io/docs/concepts/policy/resource-quotas/",
  "en": {
    "q": "Regarding the `Terminating`, `NotTerminating`, and `BestEffort` ResourceQuota scopes, which statements are correct according to the documentation? (multiple answers)",
    "choices": [
      "The Terminating scope matches Pods whose `spec.activeDeadlineSeconds` is set",
      "The NotTerminating scope matches Pods whose `spec.activeDeadlineSeconds` is not set",
      "The BestEffort scope matches Pods with BestEffort QoS class (no compute resource requests or limits)",
      "The NotBestEffort scope can only be used together with the Terminating scope"
    ]
  }
},
{
  "id": "t8-w7",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Dans un namespace où s'applique un LimitRange définissant `default` et `defaultRequest` pour le CPU, que se passe-t-il pour un conteneur qui ne spécifie ni `requests` ni `limits` de CPU ?",
  "choices": [
    "L'admission controller LimitRange lui applique automatiquement les valeurs `default` (comme limit) et `defaultRequest` (comme request)",
    "La création du Pod est refusée tant que le conteneur ne définit pas explicitement ses requests/limits",
    "Le conteneur est créé sans aucune requête ni limite de CPU ; le LimitRange ne s'applique qu'aux conteneurs qui déclarent déjà des valeurs",
    "Le conteneur hérite des requests/limits d'un autre conteneur du même Pod qui, lui, les définit"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est le rôle documenté de l'admission controller LimitRange.",
    "Incorrect : le LimitRange comble l'absence de valeurs, il ne bloque pas la création du Pod pour cette raison.",
    "Incorrect : c'est l'inverse — le LimitRange s'applique justement aux conteneurs qui n'ont pas défini de valeurs.",
    "Incorrect : les valeurs par défaut viennent du LimitRange du namespace, pas d'un autre conteneur."
  ],
  "explain": "La documentation indique : « the LimitRange admission controller applies default request and limit values for all Pods (and their containers) that do not set compute resource requirements ». Concrètement, un conteneur sans requests/limits explicites reçoit les valeurs `defaultRequest` et `default` définies dans le LimitRange du namespace.",
  "ref": "https://kubernetes.io/docs/concepts/policy/limit-range/",
  "en": {
    "q": "In a namespace with a LimitRange defining `default` and `defaultRequest` for CPU, what happens to a container that specifies neither CPU `requests` nor `limits`?",
    "choices": [
      "The LimitRange admission controller automatically applies the `default` value (as limit) and `defaultRequest` value (as request)",
      "Pod creation is rejected until the container explicitly sets its requests/limits",
      "The container is created with no CPU request or limit at all; LimitRange only applies to containers that already declare values",
      "The container inherits the requests/limits of another container in the same Pod that does define them"
    ]
  }
},
{
  "id": "t8-w8",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Si un Job ne spécifie ni `.spec.completions` ni `.spec.parallelism`, quelles valeurs apparaissent dans son statut, d'après l'exemple de référence de la documentation Kubernetes (Job non parallèle) ?",
  "choices": [
    "completions: 1 et parallelism: 1",
    "completions: null (illimité) et parallelism: 1",
    "completions: 1 et parallelism: illimité (aucune limite)",
    "Les deux champs sont obligatoires ; un Job qui ne les précise pas est rejeté par l'API"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est ce que montre l'exemple officiel (Job simple sans ces champs, dont le statut affiche completions: 1, parallelism: 1).",
    "Incorrect : c'est le comportement si `completions` est explicitement mis à `null`, pas le cas par défaut de l'exemple simple.",
    "Incorrect : `parallelism` n'est pas illimité par défaut, il vaut 1.",
    "Incorrect : ces deux champs sont optionnels dans la spec du Job."
  ],
  "explain": "Dans l'exemple de Job simple (non parallèle) de la documentation, la spec ne renseigne ni `completions` ni `parallelism`, et le statut résultant affiche `completionMode: NonIndexed`, `completions: 1`, `parallelism: 1` : pour un Job standard, ces deux champs sont donc considérés par défaut comme valant 1 chacun.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/job/",
  "en": {
    "q": "If a Job specifies neither `.spec.completions` nor `.spec.parallelism`, what values show up in its status, according to the Kubernetes documentation's reference example (non-parallel Job)?",
    "choices": [
      "completions: 1 and parallelism: 1",
      "completions: null (unlimited) and parallelism: 1",
      "completions: 1 and parallelism: unlimited (no cap)",
      "Both fields are required; a Job that omits them is rejected by the API"
    ]
  }
},
{
  "id": "t8-n1",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Un objet Ingress contient plusieurs paths qui correspondent tous à une même requête entrante. Selon la section « Multiple matches » de la documentation Kubernetes, quel path est retenu en priorité ?",
  "choices": [
    "Le path le plus long qui correspond ; en cas d'égalité, le pathType Exact est préféré au pathType Prefix",
    "Le premier path déclaré dans le fichier YAML, dans l'ordre où il apparaît",
    "Le path le plus court, considéré comme la règle la plus générale et donc prioritaire",
    "Le comportement est totalement indéfini : aucune règle de précédence n'est documentée, tout dépend du contrôleur Ingress"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc dit explicitement « precedence will be given first to the longest matching path. If two paths are still equally matched, precedence will be given to paths with an exact path type over prefix path type ».",
    "Faux : l'ordre d'écriture dans le YAML n'entre pas en jeu dans la règle de précédence documentée.",
    "Faux : c'est l'inverse — le path le plus long (le plus spécifique) l'emporte, pas le plus court.",
    "Faux : la documentation générique de l'Ingress définit bien une règle de précédence commune (« Multiple matches »), même si chaque contrôleur doit ensuite l'implémenter."
  ],
  "explain": "Quand plusieurs paths d'un même Ingress correspondent à une requête, Kubernetes documente une règle de précédence en deux temps : d'abord le path dont la correspondance est la plus longue l'emporte ; en cas d'égalité de longueur, un pathType Exact est préféré à un pathType Prefix.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/#multiple-matches",
  "en": {
    "q": "An Ingress object has several paths that all match the same incoming request. According to the \"Multiple matches\" section of the Kubernetes documentation, which path takes precedence?",
    "choices": [
      "The longest matching path; if two paths are still equally matched, the Exact pathType is preferred over Prefix",
      "The first path declared in the YAML file, in the order it appears",
      "The shortest path, since it is treated as the more general rule and therefore prioritized",
      "The behavior is entirely undefined: no precedence rule is documented, it depends solely on the Ingress controller"
    ]
  }
},
{
  "id": "t8-n10",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Le contrôleur EndpointSlice doit ajouter 10 nouveaux endpoints à un Service. Il existe déjà 2 EndpointSlices ayant chacune de la place pour 5 endpoints supplémentaires. D'après la logique de distribution documentée, que fait le contrôleur ?",
  "choices": [
    "Il crée une nouvelle EndpointSlice plutôt que de remplir les 2 slices existantes, car limiter le nombre de mises à jour d'EndpointSlices existantes est prioritaire sur une distribution parfaitement pleine",
    "Il répartit les 10 endpoints à parts égales dans les 2 slices existantes (5 dans chacune)",
    "Il rejette l'ajout des endpoints tant qu'aucune slice supplémentaire n'a été créée manuellement par l'administrateur",
    "Il fusionne les 2 EndpointSlices existantes en une seule plus grande pour faire de la place"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : « if there are 10 new endpoints to add and 2 EndpointSlices with room for 5 more endpoints each, this approach will create a new EndpointSlice instead of filling up the 2 existing EndpointSlices. In other words, a single EndpointSlice creation is preferable to multiple EndpointSlice updates. »",
    "Faux : c'est le comportement intuitif, mais la doc précise explicitement que ce n'est pas ce choix qui est fait.",
    "Faux : le contrôleur ne bloque jamais l'ajout d'endpoints en attendant une intervention manuelle.",
    "Faux : la doc ne décrit aucune fusion d'EndpointSlices existantes dans ce mécanisme."
  ],
  "explain": "Le contrôleur EndpointSlice privilégie la limitation du nombre de mises à jour envoyées à chaque nœud (via kube-proxy) plutôt qu'une distribution parfaitement compacte : une création de nouvelle slice est préférée à la mise à jour de plusieurs slices existantes, même si cela laisse ces dernières partiellement remplies.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/#distribution-of-endpointslices",
  "en": {
    "q": "The EndpointSlice controller needs to add 10 new endpoints to a Service. There are already 2 EndpointSlices, each with room for 5 more endpoints. According to the documented distribution logic, what does the controller do?",
    "choices": [
      "It creates a new EndpointSlice instead of filling up the 2 existing ones, because limiting the number of updates to existing EndpointSlices takes priority over a perfectly full distribution",
      "It splits the 10 endpoints evenly across the 2 existing slices (5 in each)",
      "It rejects adding the endpoints until an administrator manually creates an additional slice",
      "It merges the 2 existing EndpointSlices into one larger slice to make room"
    ]
  }
},
{
  "id": "t8-n2",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Dans un même objet Ingress, le path `/foo` est déclaré deux fois : une fois avec `pathType: Prefix` et une fois avec `pathType: Exact`. D'après le tableau d'exemples de correspondance de la documentation, quel type de match est retenu pour une requête sur `/foo` ?",
  "choices": [
    "Prefix, car il apparaît généralement en premier dans les exemples de la spec",
    "Exact, car en cas de correspondance de longueur égale la documentation donne la priorité à Exact sur Prefix",
    "Aucun des deux : l'Ingress est rejeté à la validation car le même path est dupliqué",
    "Les deux règles s'appliquent en même temps et la requête est envoyée aux deux backends"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : rien dans la doc n'indique une priorité liée à l'ordre d'apparition dans un tableau d'exemples.",
    "Correct : la table des exemples de path types indique littéralement « Mixed — /foo (Prefix), /foo (Exact) — /foo — Yes, prefers Exact ».",
    "Faux : la validation d'un Ingress n'interdit pas d'avoir deux pathType différents sur le même path littéral.",
    "Faux : une requête HTTP est routée vers un seul backend déterminé par la règle de précédence, pas dupliquée vers plusieurs."
  ],
  "explain": "La table d'exemples de la doc Ingress illustre le cas « Mixed » : quand un même path est défini à la fois en Prefix et en Exact, et que la requête correspond aux deux, c'est la correspondance Exact qui est préférée — application directe de la règle « exact path type over prefix path type » en cas d'égalité de longueur.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types",
  "en": {
    "q": "Within the same Ingress object, the path `/foo` is declared twice: once with `pathType: Prefix` and once with `pathType: Exact`. According to the documentation's path-matching examples table, which match type wins for a request to `/foo`?",
    "choices": [
      "Prefix, since it is usually listed first in the spec examples",
      "Exact, because for equally matched paths the documentation gives precedence to Exact over Prefix",
      "Neither: the Ingress fails validation because the same path is duplicated",
      "Both rules apply at once and the request is sent to both backends"
    ]
  }
},
{
  "id": "t8-n3",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Pour un Service de type LoadBalancer, une fois que le load balancer externe a été provisionné par le fournisseur cloud, où la documentation dit-elle que cette information (par exemple l'IP externe) est publiée ?",
  "choices": [
    "Dans le champ `.status.loadBalancer` du Service, par exemple `status.loadBalancer.ingress` avec une IP",
    "Dans une ConfigMap créée automatiquement dans le namespace kube-system",
    "Dans une annotation ajoutée automatiquement sur chaque Pod backend du Service",
    "Dans le champ `.spec.clusterIP` du Service, qui est remplacé par l'IP publique"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc précise que « information about the provisioned balancer is published in the Service's .status.loadBalancer field », avec l'exemple `status: loadBalancer: ingress: - ip: 192.0.2.127`.",
    "Faux : aucune ConfigMap n'est créée pour publier cette information.",
    "Faux : ce n'est pas une annotation de Pod, c'est un champ de statut du Service lui-même.",
    "Faux : `.spec.clusterIP` reste l'IP interne du cluster ; l'IP du load balancer externe est un champ de statut distinct."
  ],
  "explain": "La création du load balancer est asynchrone : Kubernetes publie ensuite l'adresse fournie par le cloud provider dans `.status.loadBalancer` du Service (champ `ingress`, avec typiquement une IP), consultable via `kubectl get service` (colonne EXTERNAL-IP).",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer",
  "en": {
    "q": "For a Service of type LoadBalancer, once the external load balancer has been provisioned by the cloud provider, where does the documentation say this information (e.g. the external IP) is published?",
    "choices": [
      "In the Service's `.status.loadBalancer` field, for example `status.loadBalancer.ingress` with an IP",
      "In a ConfigMap automatically created in the kube-system namespace",
      "In an annotation automatically added to each backend Pod of the Service",
      "In the Service's `.spec.clusterIP` field, which gets replaced by the public IP"
    ]
  }
},
{
  "id": "t8-n4",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Un Service `db` ne définit pas de champ `selector` (ses EndpointSlices sont gérées manuellement). Un utilisateur exécute `kubectl port-forward service/db 5432:5432`. D'après la documentation, que se passe-t-il ?",
  "choices": [
    "La commande échoue : le serveur API n'autorise pas de proxy vers des endpoints qui ne sont pas mappés à des Pods",
    "La commande fonctionne exactement comme pour n'importe quel Service avec un selector",
    "La commande fonctionne, mais redirige toujours vers le premier Pod du cluster trouvé par ordre alphabétique",
    "La commande crée automatiquement un Pod proxy temporaire pour relayer la connexion vers l'endpoint manuel"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : « The Kubernetes API server does not allow proxying to endpoints that are not mapped to pods. Actions such as kubectl port-forward service/SERVICE-NAME ... where the service has no selector will fail due to this constraint. »",
    "Faux : c'est précisément l'inverse pour un Service sans selector, dont les endpoints ne pointent pas forcément vers des Pods.",
    "Faux : la doc ne décrit aucun repli automatique vers un Pod arbitraire.",
    "Faux : aucun Pod proxy temporaire n'est créé ; la commande échoue simplement."
  ],
  "explain": "Le port-forwarding via `kubectl port-forward service/...` s'appuie sur le serveur API pour établir un tunnel vers un Pod ; pour un Service sans selector, dont les endpoints peuvent pointer vers des adresses hors cluster, le serveur API refuse ce proxy afin d'éviter qu'il ne serve de relais vers des cibles non autorisées.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#accessing-a-service-without-a-selector",
  "en": {
    "q": "A Service named `db` has no `selector` field (its EndpointSlices are managed manually). A user runs `kubectl port-forward service/db 5432:5432`. According to the documentation, what happens?",
    "choices": [
      "The command fails: the API server does not allow proxying to endpoints that are not mapped to Pods",
      "The command works exactly as it would for any Service with a selector",
      "The command works, but always forwards to the first Pod in the cluster in alphabetical order",
      "The command automatically creates a temporary proxy Pod to relay the connection to the manual endpoint"
    ]
  }
},
{
  "id": "t8-n5",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Un Service headless (`clusterIP: None`) est créé SANS champ `selector`. D'après la documentation, quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "Le plan de contrôle ne crée pas d'objets EndpointSlice automatiquement pour ce Service",
    "Pour tout type de Service autre qu'ExternalName, le DNS crée des enregistrements A/AAAA pour les IP des endpoints ready",
    "Le port déclaré sur le Service doit être identique au targetPort",
    "Le DNS crée systématiquement un enregistrement CNAME, quel que soit le type du Service"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : « For headless Services that do not define selectors, the control plane does not create EndpointSlice objects. »",
    "Correct : « DNS A / AAAA records for all IP addresses of the Service's ready endpoints, for all Service types other than ExternalName. »",
    "Correct : « When you define a headless Service without a selector, the port must match the targetPort. »",
    "Faux : le CNAME n'est créé que « for type: ExternalName Services » ; pour les autres types ce sont des enregistrements A/AAAA."
  ],
  "explain": "Contrairement au cas « avec selector » (où le contrôleur d'endpoints crée des EndpointSlices), un Service headless sans selector ne génère aucun EndpointSlice automatique ; le DNS publie directement soit un CNAME (pour ExternalName), soit des A/AAAA vers les endpoints ready pour tout autre type, et le port du Service doit alors égaler le targetPort.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#headless-services",
  "en": {
    "q": "A headless Service (`clusterIP: None`) is created WITHOUT a `selector` field. According to the documentation, which statements are correct? (select all that apply)",
    "choices": [
      "The control plane does not automatically create EndpointSlice objects for this Service",
      "For any Service type other than ExternalName, DNS creates A/AAAA records for the IP addresses of ready endpoints",
      "The port declared on the Service must be identical to the targetPort",
      "DNS always creates a CNAME record, regardless of the Service type"
    ]
  }
},
{
  "id": "t8-n6",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Concernant le champ `addressType` d'un objet EndpointSlice, quelles affirmations sont exactes selon la documentation ? (plusieurs réponses)",
  "choices": [
    "Les EndpointSlices supportent deux types d'adresses : IPv4 et IPv6",
    "Un objet EndpointSlice donné ne représente qu'un seul type d'adresse à la fois",
    "FQDN est documenté comme un troisième addressType, utilisé pour représenter les Services de type ExternalName",
    "Un Service disponible à la fois en IPv4 et en IPv6 nécessite au moins deux objets EndpointSlice"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : « EndpointSlices support two address types: IPv4, IPv6 ».",
    "Correct : « Each EndpointSlice object represents a specific IP address type. »",
    "Faux : la documentation ne mentionne que deux address types (IPv4, IPv6) ; FQDN n'y figure pas.",
    "Correct : « If you have a Service that is available via IPv4 and IPv6, there will be at least two EndpointSlice objects (one for IPv4, and one for IPv6). »"
  ],
  "explain": "La doc EndpointSlices liste exactement deux valeurs possibles pour `addressType` (IPv4 et IPv6), chaque objet EndpointSlice ne représentant qu'un seul type d'adresse à la fois ; un Service dual-stack donne donc lieu à au moins deux EndpointSlices distincts, un par famille d'adresse.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/#address-types",
  "en": {
    "q": "Regarding the `addressType` field of an EndpointSlice object, which statements are correct according to the documentation? (select all that apply)",
    "choices": [
      "EndpointSlices support two address types: IPv4 and IPv6",
      "A given EndpointSlice object represents only one address type at a time",
      "FQDN is documented as a third addressType, used to represent ExternalName Services",
      "A Service that is available over both IPv4 and IPv6 requires at least two EndpointSlice objects"
    ]
  }
},
{
  "id": "t8-n7",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Une règle ingress d'une NetworkPolicy définit `from` avec trois éléments SÉPARÉS du tableau : un `ipBlock` (cidr 172.17.0.0/16, except 172.17.1.0/24), un `namespaceSelector` (project=myproject) et un `podSelector` (role=frontend). D'après l'exemple officiel de la documentation, comment ces trois sources sont-elles combinées ?",
  "choices": [
    "Avec un OR (union) : le trafic est autorisé s'il correspond à au moins UNE des trois sources",
    "Avec un AND : le trafic doit correspondre simultanément aux trois conditions à la fois",
    "Seule la dernière entrée du tableau `from` est effectivement appliquée, les précédentes sont ignorées",
    "C'est une erreur de validation : on ne peut pas combiner ipBlock, namespaceSelector et podSelector dans un même bloc `from`"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc explique que cet exemple « allows connections ... from: any pod in the default namespace with the label role=frontend, any pod in a namespace with the label project=myproject, [ou] IP addresses in the ranges ... » — trois sources indépendantes réunies par un OR car ce sont des éléments séparés du tableau.",
    "Faux : l'AND s'applique quand plusieurs sélecteurs sont combinés DANS UN MÊME élément de `from`, pas quand ils sont dans des éléments séparés.",
    "Faux : chaque élément du tableau `from` est bien pris en compte, pas seulement le dernier.",
    "Faux : la documentation fournit précisément cet exemple combinant les trois types de sélecteurs dans un même `from`, ce qui est valide."
  ],
  "explain": "Dans une NetworkPolicy, les éléments d'un même tableau `from` (ou `to`) sont combinés en OR : le trafic est autorisé s'il correspond à au moins un des éléments listés. C'est différent du cas où `namespaceSelector` et `podSelector` figurent DANS le même élément de la liste, auquel cas ils sont combinés en AND.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
  "en": {
    "q": "A NetworkPolicy ingress rule defines `from` with three SEPARATE items in the array: an `ipBlock` (cidr 172.17.0.0/16, except 172.17.1.0/24), a `namespaceSelector` (project=myproject), and a `podSelector` (role=frontend). According to the official documentation example, how are these three sources combined?",
    "choices": [
      "With an OR (union): traffic is allowed if it matches at least ONE of the three sources",
      "With an AND: traffic must match all three conditions simultaneously",
      "Only the last entry in the `from` array is actually applied; earlier ones are ignored",
      "It is a validation error: you cannot combine ipBlock, namespaceSelector, and podSelector within the same `from` block"
    ]
  }
},
{
  "id": "t8-n8",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Pour un Service de type NodePort, quelle différence la documentation décrit-elle entre le mode iptables et le mode nftables de kube-proxy concernant les adresses de nœud sur lesquelles le NodePort est exposé par défaut ?",
  "choices": [
    "En mode iptables, le NodePort est exposé sur toutes les IP du nœud par défaut ; en mode nftables, il n'est exposé par défaut que sur l'IP primaire du nœud (ou les IP primaires en dual-stack)",
    "Les deux modes exposent le NodePort uniquement sur l'IP primaire du nœud par défaut",
    "En mode nftables le NodePort est exposé sur toutes les IP du nœud, alors qu'en mode iptables il ne l'est que sur l'IP primaire",
    "Le mode nftables de kube-proxy n'implémente pas du tout les Services de type NodePort"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : « When using kube-proxy in iptables mode, NodePort Services are available on all node IPs by default. When using nftables mode, they are only available only on the node's primary IP (or dual-stack primary IPs) by default. »",
    "Faux : c'est le comportement du seul mode nftables, pas d'iptables (qui utilise « all » par défaut).",
    "Faux : c'est l'inverse de ce que documente la page Service.",
    "Faux : le mode nftables gère bien les Services NodePort, avec un comportement d'adressage par défaut différent d'iptables."
  ],
  "explain": "Le champ/mot-clé de configuration `nodePortAddresses` a des valeurs par défaut différentes selon le mode de kube-proxy : `all` (toutes les IP) pour iptables et ipvs, mais `primary` (IP primaire du nœud uniquement) pour nftables.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#ip-address-configuration-for-type-nodeport-services",
  "en": {
    "q": "For a Service of type NodePort, what difference does the documentation describe between kube-proxy's iptables mode and nftables mode regarding the node addresses on which the NodePort is exposed by default?",
    "choices": [
      "In iptables mode, the NodePort is available on all node IPs by default; in nftables mode, it is only available on the node's primary IP (or dual-stack primary IPs) by default",
      "Both modes expose the NodePort only on the node's primary IP by default",
      "In nftables mode the NodePort is exposed on all node IPs, whereas in iptables mode it is only exposed on the primary IP",
      "kube-proxy's nftables mode does not implement NodePort Services at all"
    ]
  }
},
{
  "id": "t8-n9",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Depuis Kubernetes v1.37, une fonctionnalité alpha permet de rendre des Services NodePort accessibles via localhost quand kube-proxy tourne en mode nftables. D'après la documentation, quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "Elle est désactivée par défaut et nécessite d'activer la feature gate KubeProxyNFTablesLocalhostNodePorts",
    "Il faut aussi que `nodePortAddresses` inclue explicitement le mot-clé `localhost` ; mettre juste `all` ne suffit pas",
    "Elle est implémentée en redirigeant les connexions NodePort localhost via un proxy en espace utilisateur (userspace), donc moins efficace qu'un proxy de service normal",
    "Cette fonctionnalité est activée par défaut dès qu'on utilise le mode nftables en 1.37"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : « Feature State: Alpha since Kubernetes v1.37; disabled by default ».",
    "Correct : « --nodeport-addresses is set to a value that explicitly includes localhost. (Setting it to just all will not enable localhost NodePort Services.) »",
    "Correct : « This is implemented by redirecting localhost NodePort connections through a userspace proxy, so it is not as efficient as ordinary service proxying. »",
    "Faux : la fonctionnalité est à l'état alpha et désactivée par défaut, elle doit être explicitement activée."
  ],
  "explain": "En mode iptables, les NodePort ne sont normalement pas disponibles sur localhost (sauf configuration spécifique) et en mode ipvs jamais ; en mode nftables, une fonctionnalité alpha (1.37, désactivée par défaut) permet de les exposer sur localhost via un proxy userspace, à condition d'activer la feature gate et de configurer `nodePortAddresses` en conséquence.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport-services-via-localhost",
  "en": {
    "q": "Since Kubernetes v1.37, an alpha feature makes NodePort Services reachable via localhost when kube-proxy runs in nftables mode. According to the documentation, which statements are correct? (select all that apply)",
    "choices": [
      "It is disabled by default and requires enabling the KubeProxyNFTablesLocalhostNodePorts feature gate",
      "It also requires `nodePortAddresses` to explicitly include the `localhost` keyword; setting it to just `all` is not enough",
      "It is implemented by redirecting localhost NodePort connections through a userspace proxy, making it less efficient than ordinary service proxying",
      "This feature is enabled by default as soon as nftables mode is used in 1.37"
    ]
  }
},
{
  "id": "t8-s1",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Un PersistentVolume existe déjà avec reclaimPolicy 'Delete'. Comment passer sa politique à 'Retain' SANS recréer l'objet PV ?",
  "choices": [
    "kubectl patch pv NOM-PV -p '{\"spec\":{\"persistentVolumeReclaimPolicy\":\"Retain\"}}'",
    "kubectl edit storageclass NOM-SC et changer reclaimPolicy, ce qui met à jour tous les PV existants",
    "Il est impossible de modifier reclaimPolicy après création : il faut supprimer et recréer le PV",
    "kubectl replace pv NOM-PV --reclaim-policy=Retain"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : le champ spec.persistentVolumeReclaimPolicy d'un PV peut être modifié en direct via kubectl patch, sans recréation de l'objet.",
    "Faux : modifier une StorageClass ne change pas rétroactivement les PV déjà provisionnés, elle ne s'applique qu'aux futurs provisionnements.",
    "Faux : la documentation officielle décrit précisément cette procédure de patch en direct.",
    "Faux : ce n'est pas la syntaxe kubectl ; 'replace' remplacerait l'objet entier et --reclaim-policy n'est pas un flag valide de cette commande."
  ],
  "explain": "La tâche officielle « Change the Reclaim Policy of a PersistentVolume » décrit comment patcher en direct le champ spec.persistentVolumeReclaimPolicy d'un PV existant (Bound ou Released), sans le recréer, via kubectl patch pv NOM-PV -p '{\"spec\":{\"persistentVolumeReclaimPolicy\":\"Retain\"}}'. C'est utile pour protéger des données avant de supprimer un PVC.",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/change-pv-reclaim-policy/",
  "en": {
    "q": "A PersistentVolume already exists with reclaimPolicy 'Delete'. How do you change its policy to 'Retain' WITHOUT recreating the object?",
    "choices": [
      "kubectl patch pv PV-NAME -p '{\"spec\":{\"persistentVolumeReclaimPolicy\":\"Retain\"}}'",
      "kubectl edit storageclass SC-NAME and change reclaimPolicy, which updates all existing PVs",
      "It is impossible to change reclaimPolicy after creation: the PV must be deleted and recreated",
      "kubectl replace pv PV-NAME --reclaim-policy=Retain"
    ]
  }
},
{
  "id": "t8-s2",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Concernant l'expansion d'une PersistentVolumeClaim dont le volumeMode est 'Block' (volume brut, sans système de fichiers), quelle affirmation est correcte ?",
  "choices": [
    "La condition allowVolumeExpansion: true sur la StorageClass reste requise, mais aucune étape de redimensionnement de système de fichiers n'est nécessaire puisqu'il n'y en a pas",
    "Les volumes en mode Block ne peuvent jamais être agrandis, seuls les volumes en mode Filesystem le peuvent",
    "L'expansion d'un volume Block se fait uniquement via un système de fichiers XFS, Ext3 ou Ext4 monté à l'intérieur",
    "Il faut recréer le PVC en mode Filesystem avant de pouvoir demander une expansion"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : allowVolumeExpansion doit être activé sur la StorageClass ; pour un volume brut (Block), il n'y a pas de système de fichiers à agrandir côté nœud, seul le redimensionnement côté backend de stockage s'applique.",
    "Faux : les volumes Block supportent l'expansion, au même titre que les volumes Filesystem, dès lors que le provisioner/StorageClass l'autorise.",
    "Faux : la restriction aux systèmes de fichiers XFS/Ext3/Ext4 concerne le redimensionnement du système de fichiers pour les volumes en mode Filesystem, pas les volumes Block qui n'en ont pas.",
    "Faux : le volumeMode d'un PVC n'a pas besoin d'être changé pour bénéficier de l'expansion."
  ],
  "explain": "L'expansion de volume nécessite allowVolumeExpansion: true sur la StorageClass, quel que soit le volumeMode. Pour les volumes Filesystem, kubernetes.io précise que le redimensionnement du système de fichiers (XFS, Ext3, Ext4) intervient après l'expansion côté stockage, lors du (re)montage. Pour un volume Block, il n'y a pas de système de fichiers : cette étape supplémentaire est simplement absente.",
  "ref": "https://kubernetes.io/docs/concepts/storage/storage-classes/#allow-volume-expansion",
  "en": {
    "q": "Regarding expanding a PersistentVolumeClaim whose volumeMode is 'Block' (raw volume, no filesystem), which statement is correct?",
    "choices": [
      "allowVolumeExpansion: true is still required on the StorageClass, but no filesystem-resizing step is needed since there is no filesystem",
      "Block-mode volumes can never be expanded, only Filesystem-mode volumes can",
      "Expanding a Block volume only works via an XFS, Ext3, or Ext4 filesystem mounted inside it",
      "The PVC must be recreated in Filesystem mode before an expansion can be requested"
    ]
  }
},
{
  "id": "t8-s3",
  "domain": "storage",
  "difficulty": "easy",
  "q": "Dans le spec d'une PersistentVolumeClaim, à quoi sert le champ volumeName ?",
  "choices": [
    "Il lie explicitement la PVC à un PersistentVolume nommé, en court-circuitant l'algorithme normal de correspondance par storageClassName/selector",
    "Il définit le nom du volume tel qu'il sera monté dans le conteneur",
    "Il indique le nom du provisioner CSI qui doit créer dynamiquement le PV",
    "Il sert uniquement d'étiquette d'affichage dans kubectl get pvc, sans effet sur le binding"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : en renseignant volumeName avec le nom d'un PV existant, la PVC se lie directement à ce PV précis, indépendamment de la correspondance habituelle par classe/sélecteur (le PV doit rester compatible en capacité et accessModes).",
    "Faux : le nom de montage dans un conteneur est défini par volumeMounts.name/mountPath au niveau du Pod, pas par ce champ de la PVC.",
    "Faux : le nom du provisioner est porté par le champ provisioner de la StorageClass, pas par volumeName.",
    "Faux : ce champ a un effet réel sur le processus de binding, ce n'est pas un simple libellé."
  ],
  "explain": "Le champ spec.volumeName d'une PersistentVolumeClaim permet un binding manuel et explicite vers un PersistentVolume donné, utile pour rattacher une PVC à un PV pré-provisionné précis plutôt que de laisser le contrôleur choisir un PV compatible.",
  "ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims",
  "en": {
    "q": "In a PersistentVolumeClaim spec, what is the volumeName field used for?",
    "choices": [
      "It explicitly binds the PVC to a named PersistentVolume, bypassing the normal storageClassName/selector matching process",
      "It sets the name the volume will have when mounted inside the container",
      "It specifies the CSI provisioner that must dynamically create the PV",
      "It is only a display label shown by kubectl get pvc, with no effect on binding"
    ]
  }
},
{
  "id": "t8-s4",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Sur un objet VolumeSnapshotClass, le champ deletionPolicy est requis. Que se passe-t-il lorsque le VolumeSnapshot associé est supprimé, selon la valeur de ce champ ?",
  "choices": [
    "Avec 'Delete', le VolumeSnapshotContent et le snapshot physique sous-jacent sont supprimés ; avec 'Retain', les deux sont conservés",
    "'Delete' et 'Retain' ont le même effet sur le snapshot physique, seule la ressource Kubernetes VolumeSnapshotContent diffère",
    "deletionPolicy contrôle uniquement la suppression du PVC source, jamais celle du snapshot",
    "'Retain' supprime immédiatement le snapshot physique mais conserve l'objet VolumeSnapshotContent comme trace"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : deletionPolicy: Delete propage la suppression au VolumeSnapshotContent et au snapshot physique côté stockage ; Retain conserve les deux après suppression du VolumeSnapshot.",
    "Faux : c'est précisément l'inverse d'un comportement identique, tout l'intérêt du champ est de différencier ces deux comportements.",
    "Faux : deletionPolicy concerne le devenir du snapshot (et de son VolumeSnapshotContent), pas celui du PVC source du snapshot.",
    "Faux : avec Retain, le snapshot physique ET le VolumeSnapshotContent restent tous les deux présents, rien n'est supprimé immédiatement."
  ],
  "explain": "Le champ deletionPolicy d'une VolumeSnapshotClass (requis, valeurs Delete ou Retain) détermine si la suppression d'un VolumeSnapshot entraîne aussi la suppression du VolumeSnapshotContent et du snapshot physique correspondant sur le backend de stockage.",
  "ref": "https://kubernetes.io/docs/concepts/storage/volume-snapshot-classes/",
  "en": {
    "q": "On a VolumeSnapshotClass object, the deletionPolicy field is required. What happens when the associated VolumeSnapshot is deleted, depending on this field's value?",
    "choices": [
      "With 'Delete', the VolumeSnapshotContent and the underlying physical snapshot are deleted; with 'Retain', both are kept",
      "'Delete' and 'Retain' have the same effect on the physical snapshot, only the VolumeSnapshotContent Kubernetes resource differs",
      "deletionPolicy only controls deletion of the source PVC, never the snapshot",
      "'Retain' immediately deletes the physical snapshot but keeps the VolumeSnapshotContent object as a trace"
    ]
  }
},
{
  "id": "t8-s5",
  "domain": "storage",
  "difficulty": "hard",
  "q": "Parmi ces trois types de volumes éphémères, lequel/lesquels peuvent bénéficier de snapshots et de resizing (si le driver de stockage les supporte) ? (plusieurs réponses possibles)",
  "choices": [
    "emptyDir",
    "generic ephemeral volume",
    "volume CSI éphémère « inline »",
    "Aucun des trois ne supporte jamais le resizing ni les snapshots"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : emptyDir est de l'espace disque/RAM local géré par le kubelet, sans StorageClass ni driver externe : ni snapshot ni resize ne s'appliquent.",
    "Correct : un generic ephemeral volume crée une PVC (via volumeClaimTemplate) provisionnée dynamiquement par une StorageClass ; il hérite donc des capacités du driver, y compris snapshots et resizing si celui-ci les supporte.",
    "Faux : un volume CSI éphémère inline est créé et détruit localement par le driver CSI sans passer par une PVC/StorageClass ; il ne supporte ni les snapshots, ni le resizing, ni le suivi de capacité.",
    "Faux : le generic ephemeral volume peut supporter ces deux fonctionnalités selon le driver utilisé."
  ],
  "explain": "Les trois types de volumes éphémères diffèrent par leur mode de provisionnement : emptyDir est purement local au kubelet (aucune fonctionnalité de StorageClass) ; le CSI éphémère inline est géré directement par le driver CSI sans PVC, donc sans snapshot ni resize ; seul le generic ephemeral volume passe par une PVC dynamique et bénéficie ainsi des fonctionnalités du driver de stockage sous-jacent (snapshots, resizing, StorageClass) si celui-ci les propose.",
  "ref": "https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/",
  "en": {
    "q": "Among these three types of ephemeral volumes, which one(s) can benefit from snapshots and resizing (if the storage driver supports them)? (multiple answers possible)",
    "choices": [
      "emptyDir",
      "generic ephemeral volume",
      "CSI ephemeral volume (\"inline\")",
      "None of the three ever supports resizing or snapshots"
    ]
  }
},
{
  "id": "t8-s6",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Un StatefulSet ne définit PAS le champ persistentVolumeClaimRetentionPolicy. Que devient une PVC créée via volumeClaimTemplates lorsque le StatefulSet est supprimé ou mis à l'échelle (scale down) ?",
  "choices": [
    "Elle est conservée (comportement par défaut : équivalent à Retain), afin de protéger les données",
    "Elle est automatiquement supprimée dans les deux cas, pour éviter d'accumuler du stockage orphelin",
    "Elle est supprimée à la suppression du StatefulSet mais conservée lors d'un scale down",
    "Le comportement par défaut dépend uniquement de la reclaimPolicy du PV lié, jamais du StatefulSet"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : sans persistentVolumeClaimRetentionPolicy explicite, le comportement historique et par défaut équivaut à whenDeleted: Retain et whenScaled: Retain, la doc précisant que supprimer ou réduire un StatefulSet ne supprime pas les volumes associés, par sécurité des données.",
    "Faux : c'est l'inverse du comportement par défaut ; il faudrait positionner explicitement whenDeleted/whenScaled à Delete pour obtenir une suppression automatique.",
    "Faux : par défaut les deux cas (suppression et scale down) conservent la PVC, il n'y a pas de dissymétrie sans configuration explicite.",
    "Faux : ce comportement est piloté par le champ persistentVolumeClaimRetentionPolicy du StatefulSet lui-même (whenDeleted/whenScaled), indépendamment de la reclaimPolicy du PV."
  ],
  "explain": "Le champ .spec.persistentVolumeClaimRetentionPolicy d'un StatefulSet comporte deux sous-champs, whenDeleted et whenScaled, chacun pouvant valoir Retain ou Delete. Par défaut (champ absent), Kubernetes conserve les PVC issues de volumeClaimTemplates aussi bien à la suppression du StatefulSet qu'au scale down, afin de ne jamais perdre de données automatiquement.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#persistentvolumeclaim-retention",
  "en": {
    "q": "A StatefulSet does NOT set the persistentVolumeClaimRetentionPolicy field. What happens to a PVC created via volumeClaimTemplates when the StatefulSet is deleted or scaled down?",
    "choices": [
      "It is retained (default behavior: equivalent to Retain), to protect data",
      "It is automatically deleted in both cases, to avoid accumulating orphaned storage",
      "It is deleted when the StatefulSet is deleted but retained on scale down",
      "The default behavior depends only on the reclaimPolicy of the bound PV, never on the StatefulSet"
    ]
  }
},
{
  "id": "t8-t1",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait l'option --recursive (-R) de la commande kubectl explain, selon la documentation officielle ?",
  "choices": [
    "Elle affiche les champs des champs (un niveau d'imbrication supplémentaire), la profondeur pouvant être limitée avec --max-depth",
    "Elle liste récursivement tous les objets existants de ce type dans le cluster",
    "Elle affiche l'historique des versions de l'API pour la ressource",
    "Elle exporte la ressource en YAML avec tous les champs renseignés par défaut"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc décrit -R/--recursive comme « Print the fields of fields. Use --max-depth to cap the recursion depth. »",
    "Faux : kubectl explain documente les champs d'un type de ressource (schéma), pas les objets existants dans le cluster",
    "Faux : ce n'est pas le rôle documenté de kubectl explain ni de son flag --recursive",
    "Faux : kubectl explain affiche de la documentation sur les champs, ce n'est pas un export d'objet (get -o yaml)"
  ],
  "explain": "D'après la documentation, le flag -R/--recursive de kubectl explain « Print the fields of fields. Use --max-depth to cap the recursion depth. » Exemple documenté : kubectl explain pods --recursive (et kubectl explain pods --recursive --max-depth=2 pour limiter la profondeur).",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_explain/",
  "en": {
    "q": "According to the official documentation, what does the --recursive (-R) flag of kubectl explain do?",
    "choices": [
      "It prints the fields of fields (one extra level of nesting), and the depth can be capped with --max-depth",
      "It recursively lists every existing object of that type in the cluster",
      "It shows the API version history for the resource",
      "It exports the resource as YAML with every field populated with its default value"
    ]
  }
},
{
  "id": "t8-t10",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "La commande kubectl get endpointslices -l kubernetes.io/service-name=NOM-DU-SERVICE affiche une colonne ENDPOINTS vide (aucune adresse). D'après le guide officiel de débogage des Services, quelles causes possibles sont citées ? (plusieurs réponses)",
  "choices": [
    "Le sélecteur (label selector) du Service ne correspond pas aux labels des Pods",
    "Vous êtes dans un namespace différent et le sélecteur du Service ne correspond donc pas pour cette raison",
    "targetPort sur le Service ne correspond pas au port réellement écouté par l'application dans les Pods",
    "Le Service est de type LoadBalancer au lieu de ClusterIP"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : citée telle quelle comme cause possible dans la doc",
    "Correct : citée telle quelle comme cause possible (namespace différent)",
    "Correct : citée telle quelle comme cause possible (targetPort ne correspond pas au port écouté)",
    "Faux : le type de Service (LoadBalancer/ClusterIP) n'est pas cité comme cause d'un ENDPOINTS vide dans ce guide"
  ],
  "explain": "Le guide Debug Services liste, si la colonne ENDPOINTS est vide : « The label selector on the Service does not match the labels on your Pods », « You are in a different Namespace and the Service selector is not matching because of that », et « targetPort on your Service does not match the actual port that the application inside the Pods is listening on ».",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/",
  "en": {
    "q": "kubectl get endpointslices -l kubernetes.io/service-name=SERVICE-NAME shows an empty ENDPOINTS column (no addresses). According to the official Service debugging guide, which possible causes are listed? (multiple answers)",
    "choices": [
      "The Service's label selector does not match the Pods' labels",
      "You are in a different namespace, so the Service selector does not match for that reason",
      "The Service's targetPort does not match the port the application inside the Pods is actually listening on",
      "The Service is of type LoadBalancer instead of ClusterIP"
    ]
  }
},
{
  "id": "t8-t11",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Le Service définit targetPort: 9376, mais les conteneurs du Pod écoutent en réalité sur le port 8080 (containerPort: 8080). D'après l'exemple documenté dans le guide de débogage des Services, quel symptôme observe-t-on typiquement ?",
  "choices": [
    "Selon la configuration réseau, on obtient une connexion refusée ou un timeout, et aucun trafic n'apparaît dans les logs du Pod",
    "Kubernetes ajuste automatiquement targetPort pour qu'il corresponde au containerPort réel",
    "Le Service refuse d'être créé tant que targetPort ne correspond pas exactement au containerPort",
    "Le trafic est routé normalement car kube-proxy ignore la valeur de targetPort"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc dit « The request would go to 9376, where nothing is listening. Depending on the networking setup, you might get 'Connection refused' or the request might time out. You would also see no traffic in the Pods' logs. »",
    "Faux : Kubernetes ne corrige pas automatiquement une incohérence entre targetPort et containerPort",
    "Faux : rien dans la doc n'indique que la création du Service est bloquée dans ce cas",
    "Faux : c'est justement l'inverse : le mauvais targetPort empêche le trafic d'atteindre l'application"
  ],
  "explain": "Dans l'exemple officiel de débogage, une incohérence entre targetPort du Service et containerPort réellement écouté aboutit à : « The request would go to 9376, where nothing is listening. Depending on the networking setup, you might get 'Connection refused' or the request might time out. You would also see no traffic in the Pods' logs. »",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/",
  "en": {
    "q": "The Service defines targetPort: 9376, but the Pod's containers actually listen on port 8080 (containerPort: 8080). According to the documented example in the Service debugging guide, what symptom is typically observed?",
    "choices": [
      "Depending on the networking setup, you get connection refused or a timeout, and no traffic shows up in the Pod's logs",
      "Kubernetes automatically adjusts targetPort to match the actual containerPort",
      "The Service refuses to be created until targetPort exactly matches containerPort",
      "Traffic is routed normally because kube-proxy ignores the targetPort value"
    ]
  }
},
{
  "id": "t8-t12",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "D'après l'exemple documenté de kubectl describe services dans le tutoriel Connecting Applications with Services, lesquels de ces champs figurent dans la sortie affichée ? (plusieurs réponses)",
  "choices": [
    "Endpoints (liste des adresses IP:port des Pods backend)",
    "Session Affinity",
    "IP Family Policy",
    "Rate Limit (limite de requêtes par seconde)"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : la sortie documentée affiche une ligne Endpoints avec les adresses des Pods backend",
    "Correct : la sortie documentée affiche une ligne Session Affinity",
    "Correct : la sortie documentée affiche une ligne IP Family Policy",
    "Faux : aucune ligne Rate Limit n'apparaît dans l'exemple documenté de kubectl describe services"
  ],
  "explain": "L'exemple officiel de kubectl describe services affiche notamment : Name, Namespace, Labels, Annotations, Selector, Type, IP Family Policy, IP Families, IP, IPs, Port, TargetPort, Endpoints, Session Affinity et Events. Aucune notion de Rate Limit n'y figure.",
  "ref": "https://kubernetes.io/docs/tutorials/services/connect-applications-service/",
  "en": {
    "q": "According to the documented kubectl describe services example in the Connecting Applications with Services tutorial, which of these fields appear in the output? (multiple answers)",
    "choices": [
      "Endpoints (list of backend Pod IP:port addresses)",
      "Session Affinity",
      "IP Family Policy",
      "Rate Limit (requests-per-second limit)"
    ]
  }
},
{
  "id": "t8-t13",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Aucune NetworkPolicy du namespace n'a Ingress dans son policyTypes et ne sélectionne un Pod donné. D'après la documentation officielle, le trafic entrant vers ce Pod est-il bloqué ?",
  "choices": [
    "Non : par défaut un Pod est non isolé en ingress, donc toutes les connexions entrantes sont autorisées",
    "Oui : par défaut tout le trafic entrant est refusé tant qu'aucune NetworkPolicy ne l'autorise explicitement",
    "Cela dépend uniquement du plugin CNI utilisé ; la documentation ne définit aucun comportement par défaut",
    "Oui, mais seulement pour le trafic provenant d'un autre namespace"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc dit « By default, a pod is non-isolated for ingress; all inbound connections are allowed. »",
    "Faux : c'est l'inverse du comportement par défaut documenté (deny-all n'est obtenu qu'en créant une NetworkPolicy explicite)",
    "Faux : la spécification Kubernetes NetworkPolicy définit bien un comportement par défaut clair, indépendant du CNI",
    "Faux : sans NetworkPolicy Ingress sélectionnant le Pod, tout trafic entrant est autorisé, peu importe son origine"
  ],
  "explain": "La documentation des NetworkPolicy précise : « By default, a pod is non-isolated for ingress; all inbound connections are allowed. A pod is isolated for ingress if there is any NetworkPolicy that both selects the pod and has 'Ingress' in its policyTypes ». Donc si aucune NetworkPolicy ne sélectionne le Pod côté Ingress, le trafic entrant n'est pas bloqué par NetworkPolicy — ce n'est pas la cause du problème.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
  "en": {
    "q": "No NetworkPolicy in the namespace has Ingress in its policyTypes and selects a given Pod. According to the official documentation, is inbound traffic to that Pod blocked?",
    "choices": [
      "No: by default a Pod is non-isolated for ingress, so all inbound connections are allowed",
      "Yes: by default all inbound traffic is denied until a NetworkPolicy explicitly allows it",
      "It depends solely on the CNI plugin used; the documentation defines no default behavior",
      "Yes, but only for traffic coming from another namespace"
    ]
  }
},
{
  "id": "t8-t14",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "Vous exécutez kubectl delete deployment nginx-deployment --cascade=orphan. D'après la documentation officielle sur la suppression en cascade, que deviennent le ReplicaSet et les Pods gérés par ce Deployment ?",
  "choices": [
    "Ils restent dans le cluster, orphelins, et continuent de fonctionner sans être gérés par ce Deployment",
    "Ils sont supprimés immédiatement en même temps que le Deployment",
    "Ils sont automatiquement recréés sous un nouveau Deployment portant le même nom",
    "Le ReplicaSet est supprimé mais ses Pods restent en cours d'exécution sans aucun ReplicaSet"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : après kubectl delete deployment nginx-deployment --cascade=orphan, la doc fait vérifier avec kubectl get pods -l app=nginx que « the Pods managed by the Deployment are still running » — ils sont orphelins mais actifs",
    "Faux : c'est le comportement par défaut (cascade background), pas celui de --cascade=orphan",
    "Faux : rien dans la doc n'indique une recréation automatique d'un Deployment",
    "Faux : la doc montre que ce sont les Pods (gérés via le ReplicaSet) qui restent actifs, orphelins du Deployment supprimé, pas un ReplicaSet supprimé isolément"
  ],
  "explain": "La documentation sur la suppression en cascade explique que « By default, when you tell Kubernetes to delete an object, the controller also deletes dependent objects. You can make Kubernetes orphan these dependents » via --cascade=orphan. L'exemple officiel exécute kubectl delete deployment nginx-deployment --cascade=orphan puis vérifie avec kubectl get pods -l app=nginx que les Pods gérés par le Deployment continuent de tourner, désormais orphelins (le ReplicaSet reste également present, non géré par un Deployment).",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/use-cascading-deletion/",
  "en": {
    "q": "You run kubectl delete deployment nginx-deployment --cascade=orphan. According to the official documentation on cascading deletion, what happens to the ReplicaSet and Pods managed by that Deployment?",
    "choices": [
      "They remain in the cluster as orphans and keep running, no longer managed by that Deployment",
      "They are deleted immediately along with the Deployment",
      "They are automatically recreated under a new Deployment with the same name",
      "The ReplicaSet is deleted but its Pods keep running with no ReplicaSet at all"
    ]
  }
},
{
  "id": "t8-t2",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Une commande kubectl cp échoue vers un Pod basé sur une image minimale (sans outils). D'après la documentation officielle, quelle est la cause la plus probable ?",
  "choices": [
    "kubectl cp nécessite que le binaire tar soit présent dans l'image du conteneur ; s'il est absent, la commande échoue",
    "kubectl cp nécessite que le Pod dispose d'un shell bash installé",
    "kubectl cp ne fonctionne que si le conteneur tourne en tant qu'utilisateur root",
    "kubectl cp nécessite que le cluster expose un volume NFS partagé"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc précise « Requires that the 'tar' binary is present in your container image. If 'tar' is not present, 'kubectl cp' will fail. »",
    "Faux : un shell bash n'est pas mentionné comme prérequis documenté de kubectl cp",
    "Faux : l'utilisateur root n'est pas cité comme prérequis documenté",
    "Faux : aucun volume NFS n'est requis ; kubectl cp transfère les données via l'API et un tar interne au conteneur"
  ],
  "explain": "La doc de kubectl cp indique explicitement : « Requires that the 'tar' binary is present in your container image. If 'tar' is not present, 'kubectl cp' will fail. » Sur une image distroless/minimale sans tar, la commande échoue pour cette raison.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cp/",
  "en": {
    "q": "A kubectl cp command fails against a Pod running a minimal image (no tools). According to the official documentation, what is the most likely cause?",
    "choices": [
      "kubectl cp requires that the tar binary be present in the container image; if tar is missing, the command fails",
      "kubectl cp requires that the Pod have a bash shell installed",
      "kubectl cp only works if the container runs as the root user",
      "kubectl cp requires the cluster to expose a shared NFS volume"
    ]
  }
},
{
  "id": "t8-t3",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Pour des cas avancés (liens symboliques, expansion de wildcards, préservation des modes de fichiers), que recommande la documentation officielle de kubectl cp au lieu de kubectl cp ?",
  "choices": [
    "Utiliser kubectl exec (par exemple en combinaison avec tar via un pipe) plutôt que kubectl cp",
    "Augmenter le timeout du client avec --request-timeout",
    "Monter un volume partagé entre le poste local et le Pod",
    "Utiliser kubectl cp avec une option --preserve=true"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc dit « For advanced use cases, such as symlinks, wildcard expansion or file mode preservation, consider using 'kubectl exec'. »",
    "Faux : --request-timeout n'est pas la solution documentée à ces limitations",
    "Faux : ce n'est pas la recommandation officielle documentée pour ces cas avancés",
    "Faux : kubectl cp ne documente pas d'option --preserve=true"
  ],
  "explain": "La documentation de kubectl cp précise que pour les cas avancés (symlinks, expansion de wildcards, préservation des modes de fichiers), il faut envisager kubectl exec — les exemples officiels montrent d'ailleurs des usages de tar via kubectl exec en pipe pour ces situations.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cp/",
  "en": {
    "q": "For advanced use cases (symlinks, wildcard expansion, file mode preservation), what does the official kubectl cp documentation recommend instead of kubectl cp?",
    "choices": [
      "Using kubectl exec (for example piping tar through it) instead of kubectl cp",
      "Increasing the client timeout with --request-timeout",
      "Mounting a shared volume between the local machine and the Pod",
      "Using kubectl cp with a --preserve=true option"
    ]
  }
},
{
  "id": "t8-t4",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "D'après la documentation officielle, à quoi sert le flag --revision de la commande kubectl rollout history ?",
  "choices": [
    "Il affiche les détails, y compris le podTemplate, de la révision de rollout indiquée",
    "Il effectue automatiquement un rollback vers la révision indiquée",
    "Il supprime définitivement les révisions antérieures à celle indiquée",
    "Il modifie le nombre maximal de révisions conservées dans l'historique"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc du flag précise « --revision int : See the details, including podTemplate of the revision specified »",
    "Faux : c'est kubectl rollout undo --to-revision qui effectue un rollback, pas kubectl rollout history --revision",
    "Faux : kubectl rollout history ne supprime aucune révision, il consulte l'historique",
    "Faux : ce réglage relève de revisionHistoryLimit sur le Deployment, pas de ce flag de lecture"
  ],
  "explain": "kubectl rollout history « View previous rollout revisions and configurations. » Son flag --revision (int) est documenté ainsi : « See the details, including podTemplate of the revision specified » — il sert donc à consulter, pas à revenir en arrière (cela reste le rôle de kubectl rollout undo).",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_history/",
  "en": {
    "q": "According to the official documentation, what does the --revision flag of kubectl rollout history do?",
    "choices": [
      "It shows the details, including the podTemplate, of the specified rollout revision",
      "It automatically rolls back to the specified revision",
      "It permanently deletes revisions older than the specified one",
      "It changes the maximum number of revisions kept in history"
    ]
  }
},
{
  "id": "t8-t5",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "Concernant la commande kubectl api-resources, quelles affirmations sont exactes selon la documentation officielle ? (plusieurs réponses)",
  "choices": [
    "L'option -o wide affiche les ressources API supportées avec davantage d'informations",
    "Le flag --namespaced vaut true par défaut, donc les ressources namespacées sont retournées par défaut",
    "Le flag --sort-by n'accepte que les valeurs name ou kind",
    "Le flag --verbs permet de limiter l'affichage aux ressources qui supportent les verbes indiqués"
  ],
  "correct": [
    0,
    1,
    2,
    3
  ],
  "why": [
    "Correct : l'exemple documenté « Print the supported API resources with more information » correspond à kubectl api-resources -o wide",
    "Correct : la doc indique --namespaced (Default: true) : « otherwise returning namespaced resources by default »",
    "Correct : la doc précise « The field can be either 'name' or 'kind' » pour --sort-by",
    "Correct : la doc de --verbs dit « Limit to resources that support the specified verbs »"
  ],
  "explain": "D'après la doc générée de kubectl api-resources : -o/--output accepte notamment wide (« Print the supported API resources with more information »), --namespaced vaut true par défaut, --sort-by n'accepte que 'name' ou 'kind', et --verbs limite aux ressources supportant les verbes indiqués.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_api-resources/",
  "en": {
    "q": "Regarding the kubectl api-resources command, which statements are accurate according to the official documentation? (multiple answers)",
    "choices": [
      "The -o wide option prints the supported API resources with more information",
      "The --namespaced flag defaults to true, so namespaced resources are returned by default",
      "The --sort-by flag only accepts the values name or kind",
      "The --verbs flag limits the output to resources that support the specified verbs"
    ]
  }
},
{
  "id": "t8-t6",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Selon le kubectl Quick Reference, quelle est la syntaxe raccourcie documentée pour lister par exemple les events de tous les namespaces ?",
  "choices": [
    "kubectl get events -A",
    "kubectl get events --everywhere",
    "kubectl get events *",
    "kubectl get events --namespace=all"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc dit « Appending --all-namespaces happens frequently enough that you should be aware of the shorthand for --all-namespaces: kubectl -A », applicable à n'importe quelle commande get comme get events",
    "Faux : ce flag n'existe pas dans la documentation kubectl",
    "Faux : ce n'est pas une syntaxe documentée",
    "Faux : la valeur 'all' n'est pas documentée pour --namespace ; c'est --all-namespaces (ou -A) qu'il faut utiliser"
  ],
  "explain": "Le kubectl Quick Reference documente -A comme raccourci de --all-namespaces : « Appending --all-namespaces happens frequently enough that you should be aware of the shorthand for --all-namespaces: kubectl -A ». On peut donc écrire kubectl get events -A pour voir les events de tous les namespaces.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/quick-reference/",
  "en": {
    "q": "According to the kubectl Quick Reference, what is the documented shorthand syntax for, for example, listing events across all namespaces?",
    "choices": [
      "kubectl get events -A",
      "kubectl get events --everywhere",
      "kubectl get events *",
      "kubectl get events --namespace=all"
    ]
  }
},
{
  "id": "t8-t7",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Un Pod tolère un taint à effet NoExecute avec tolerationSeconds: 300. D'après la documentation officielle, que se passe-t-il une fois ce délai écoulé, si le taint n'a pas été retiré entre-temps ?",
  "choices": [
    "Le node lifecycle controller évince le Pod du nœud",
    "Le Pod reste lié indéfiniment au nœud puisqu'il tolère le taint",
    "Le kubelet redémarre simplement le conteneur du Pod sur le même nœud",
    "Le scheduler replanifie immédiatement le Pod, sans attendre l'expiration du délai"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc dit « Pods that tolerate the taint with a specified tolerationSeconds remain bound for the specified amount of time. After that time elapses, the node lifecycle controller evicts the Pods from the node. »",
    "Faux : cela ne serait vrai que si tolerationSeconds n'était pas précisé du tout",
    "Faux : la doc parle d'éviction du Pod par le node lifecycle controller, pas d'un simple redémarrage du conteneur",
    "Faux : la doc précise justement que le Pod reste lié pendant tolerationSeconds avant l'éviction, pas de replanification immédiate"
  ],
  "explain": "Selon la documentation sur les taints et tolerations : un toleration NoExecute avec tolerationSeconds fait que « le pod restera lié au nœud pendant 3600 secondes (exemple), puis sera évincé » ; « After that time elapses, the node lifecycle controller evicts the Pods from the node ». Si le taint est retiré avant, aucune éviction n'a lieu.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
  "en": {
    "q": "A Pod tolerates a NoExecute taint with tolerationSeconds: 300. According to the official documentation, what happens once that time elapses, if the taint was not removed in the meantime?",
    "choices": [
      "The node lifecycle controller evicts the Pod from the node",
      "The Pod remains bound to the node indefinitely because it tolerates the taint",
      "The kubelet simply restarts the Pod's container on the same node",
      "The scheduler immediately reschedules the Pod, without waiting for the time to elapse"
    ]
  }
},
{
  "id": "t8-t8",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "D'après la documentation officielle sur les taints à effet NoExecute, quelles affirmations sont exactes concernant les Pods déjà en cours d'exécution sur un nœud auquel ce taint vient d'être ajouté ? (plusieurs réponses)",
  "choices": [
    "Les Pods qui ne tolèrent pas le taint sont évincés immédiatement",
    "Les Pods qui tolèrent le taint sans préciser tolerationSeconds restent liés au nœud indéfiniment",
    "Les Pods qui tolèrent le taint avec un tolerationSeconds restent liés pendant la durée indiquée, puis sont évincés",
    "Tous les Pods, qu'ils tolèrent ou non le taint, sont évincés après exactement 300 secondes"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : la doc dit « Pods that do not tolerate the taint are evicted immediately »",
    "Correct : la doc dit « Pods that tolerate the taint without specifying tolerationSeconds in their toleration specification remain bound forever »",
    "Correct : la doc dit « Pods that tolerate the taint with a specified tolerationSeconds remain bound for the specified amount of time » avant éviction",
    "Faux : il n'y a pas de délai fixe universel de 300 secondes pour tous les Pods ; le comportement dépend de la présence et de la valeur de tolerationSeconds"
  ],
  "explain": "La documentation distingue trois cas pour un taint NoExecute ajouté à un nœud : les Pods qui ne tolèrent pas le taint sont évincés immédiatement ; ceux qui le tolèrent sans tolerationSeconds restent liés pour toujours ; ceux qui le tolèrent avec un tolerationSeconds restent liés pour la durée indiquée puis sont évincés par le node lifecycle controller.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
  "en": {
    "q": "According to the official documentation on NoExecute taints, which statements are accurate about Pods already running on a node that this taint is added to? (multiple answers)",
    "choices": [
      "Pods that do not tolerate the taint are evicted immediately",
      "Pods that tolerate the taint without specifying tolerationSeconds remain bound to the node forever",
      "Pods that tolerate the taint with a specified tolerationSeconds remain bound for that amount of time, then get evicted",
      "All Pods, whether they tolerate the taint or not, are evicted after exactly 300 seconds"
    ]
  }
},
{
  "id": "t8-t9",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "D'après la page officielle de débogage des Services (Debug Services), quelle vérification la documentation place-t-elle juste après « Does the Service exist? » (le Service existe-t-il) ?",
  "choices": [
    "La revue d'éventuelles règles Ingress de NetworkPolicy affectant les Pods cibles",
    "La vérification que kube-proxy fonctionne correctement sur les nœuds",
    "La vérification des EndpointSlices du Service",
    "La vérification de la résolution DNS du nom du Service"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la page enchaîne, juste après « Does the Service exist? », sur « Any Network Policy Ingress rules affecting the target Pods? »",
    "Faux : la vérification de kube-proxy vient bien plus tard dans le guide, après les vérifications de définition et d'endpoints",
    "Faux : la vérification des EndpointSlices vient après les vérifications DNS/IP/définition du Service",
    "Faux : la vérification DNS vient après la vérification des NetworkPolicy dans l'ordre documenté"
  ],
  "explain": "L'ordre des sections de la page officielle Debug Services est, dans cet ordre : Does the Service exist ?, puis Any Network Policy Ingress rules affecting the target Pods ?, puis Does the Service work by DNS name ?, puis Does the Service work by IP ?, puis Is the Service defined correctly ?, puis Does the Service have any EndpointSlices ?, puis Are the Pods working ?, puis Is the kube-proxy working ?",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/",
  "en": {
    "q": "According to the official Debug Services page, which check does the documentation place right after 'Does the Service exist?'",
    "choices": [
      "Reviewing any NetworkPolicy Ingress rules that may affect the target Pods",
      "Checking that kube-proxy is running correctly on the nodes",
      "Checking the Service's EndpointSlices",
      "Checking DNS resolution of the Service name"
    ]
  }
}
  ];
  DATA.forEach((o) => Q.push(Object.assign({ type: "theory" }, o)));
  window.CKA._t8 = DATA.length;
})();
