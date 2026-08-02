// Lot 3 : +50 questions théoriques sourcées sur kubernetes.io (scan de la doc).
// Chaque question porte why[] par option, explain (synthèse) et ref (doc officielle),
// plus la traduction en:{q,choices}. Répartition par pondération CKA.
(function () {
  const Q = window.CKA.questions;
  const DATA = [
  {
    "id": "t3-a1",
    "domain": "architecture",
    "difficulty": "easy",
    "q": "Dans quel namespace se trouvent les objets Lease utilisés par les kubelets pour envoyer leur heartbeat vers l'API server ?",
    "choices": [
      "kube-system",
      "kube-node-lease",
      "kube-public",
      "default"
    ],
    "correct": [
      1
    ],
    "why": [
      "Faux : kube-system héberge les composants du control plane, pas les Lease de heartbeat des nœuds.",
      "Correct : chaque Node possède un objet Lease de même nom dans le namespace kube-node-lease.",
      "Faux : kube-public est un namespace lisible par tous, sans rapport avec les heartbeats des nœuds.",
      "Faux : default est le namespace par défaut des objets utilisateur, pas celui des Lease de heartbeat."
    ],
    "explain": "Pour chaque Node, kubelet met à jour un objet Lease de même nom dans le namespace kube-node-lease (champ spec.renewTime) : c'est le mécanisme de heartbeat léger utilisé par le control plane pour déterminer la disponibilité du nœud.",
    "ref": "https://kubernetes.io/docs/concepts/architecture/leases/#node-heartbeats",
    "en": {
      "q": "In which namespace do the Lease objects used by kubelets to send their heartbeat to the API server live?",
      "choices": [
        "kube-system",
        "kube-node-lease",
        "kube-public",
        "default"
      ]
    }
  },
  {
    "id": "t3-a2",
    "domain": "architecture",
    "difficulty": "medium",
    "q": "Quels composants du control plane utilisent typiquement l'API Lease pour l'élection de leader (leader election) en configuration haute disponibilité ?",
    "choices": [
      "kube-scheduler",
      "kube-controller-manager",
      "kube-proxy",
      "CoreDNS"
    ],
    "correct": [
      0,
      1
    ],
    "why": [
      "Correct : en HA, plusieurs instances de kube-scheduler se disputent le lease de leader ; une seule est active.",
      "Correct : de même, kube-controller-manager utilise le mécanisme de leader election basé sur les Lease.",
      "Faux : kube-proxy n'effectue pas d'élection de leader via Lease, il tourne indépendamment sur chaque nœud.",
      "Faux : CoreDNS n'utilise pas ce mécanisme de leader election par Lease décrit dans la documentation."
    ],
    "explain": "Les Lease permettent d'assurer qu'une seule instance active existe pour des composants comme kube-scheduler ou kube-controller-manager en configuration HA : les instances en veille attendent de pouvoir acquérir le lease si le leader tombe.",
    "ref": "https://kubernetes.io/docs/concepts/architecture/leases/#leader-election",
    "en": {
      "q": "Which control plane components typically use the Lease API for leader election in a highly-available setup?",
      "choices": [
        "kube-scheduler",
        "kube-controller-manager",
        "kube-proxy",
        "CoreDNS"
      ]
    }
  },
  {
    "id": "t3-a3",
    "domain": "architecture",
    "difficulty": "easy",
    "q": "Quelle est la différence fondamentale entre un objet Role et un objet ClusterRole en RBAC ?",
    "choices": [
      "Un Role ne peut contenir que des verbes en lecture, un ClusterRole peut contenir tous les verbes",
      "Un Role est limité à un namespace, un ClusterRole est une ressource non-namespaced (portée cluster)",
      "Un Role s'applique aux ServiceAccount, un ClusterRole s'applique uniquement aux utilisateurs humains",
      "Il n'y a aucune différence, ce sont deux noms pour le même objet"
    ],
    "correct": [
      1
    ],
    "why": [
      "Faux : rien n'empêche un Role de contenir n'importe quel verbe (get, create, delete...).",
      "Correct : un Role définit des permissions dans un namespace donné, alors qu'un ClusterRole est une ressource cluster-wide, non namespaced.",
      "Faux : Role et ClusterRole s'appliquent aussi bien aux utilisateurs qu'aux ServiceAccount via des (Cluster)RoleBinding.",
      "Faux : ce sont deux types distincts avec une portée différente."
    ],
    "explain": "Un Role est toujours namespaced et ne donne des droits que dans ce namespace. Un ClusterRole est une ressource non-namespaced, utilisable pour des droits cluster-wide, sur des ressources non-namespaced (comme les Node), ou sur des endpoints non-resource.",
    "ref": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole",
    "en": {
      "q": "What is the fundamental difference between a Role object and a ClusterRole object in RBAC?",
      "choices": [
        "A Role can only contain read verbs, a ClusterRole can contain all verbs",
        "A Role is limited to a namespace, a ClusterRole is a non-namespaced (cluster-scoped) resource",
        "A Role applies to ServiceAccounts, a ClusterRole applies only to human users",
        "There is no difference, they are two names for the same object"
      ]
    }
  },
  {
    "id": "t3-a4",
    "domain": "architecture",
    "difficulty": "hard",
    "q": "À quoi sert le champ `aggregationRule` sur un objet ClusterRole ?",
    "choices": [
      "Il permet de fusionner automatiquement les règles d'autres ClusterRole sélectionnés par label, dans le champ rules du ClusterRole agrégateur",
      "Il permet de dupliquer un ClusterRole dans tous les namespaces du cluster",
      "Il définit un quota maximum de règles RBAC autorisées pour ce ClusterRole",
      "Il force la rotation automatique du ClusterRole toutes les 24h"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : aggregationRule.clusterRoleSelectors sélectionne d'autres ClusterRole par leurs labels ; leurs règles sont automatiquement combinées dans rules du ClusterRole agrégateur, géré par le control plane.",
      "Faux : ClusterRole est déjà une ressource non-namespaced, il n'y a pas de notion de duplication par namespace.",
      "Faux : aggregationRule ne définit aucun quota, seulement un mécanisme de composition.",
      "Faux : aucune rotation automatique n'est liée à ce champ."
    ],
    "explain": "Un ClusterRole peut porter un aggregationRule avec des clusterRoleSelectors (matchLabels) : le control plane calcule alors automatiquement le champ rules en combinant les règles de tous les ClusterRole dont les labels correspondent, ce qui permet de composer des rôles de façon modulaire (ex. extension des rôles par défaut admin/edit/view).",
    "ref": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#aggregated-clusterroles",
    "en": {
      "q": "What is the purpose of the `aggregationRule` field on a ClusterRole object?",
      "choices": [
        "It automatically merges the rules of other label-selected ClusterRoles into the aggregating ClusterRole's rules field",
        "It duplicates a ClusterRole into every namespace in the cluster",
        "It sets a maximum quota of RBAC rules allowed for that ClusterRole",
        "It forces automatic rotation of the ClusterRole every 24 hours"
      ]
    }
  },
  {
    "id": "t3-a5",
    "domain": "architecture",
    "difficulty": "easy",
    "q": "Que permet de vérifier la commande `kubectl auth can-i` ?",
    "choices": [
      "Si un certificat client va bientôt expirer",
      "Si un utilisateur ou ServiceAccount donné est autorisé à effectuer une action (verbe) sur une ressource donnée",
      "Si le cluster respecte la version minimale supportée pour l'upgrade",
      "Si un pod passe les vérifications de liveness/readiness"
    ],
    "correct": [
      1
    ],
    "why": [
      "Faux : la vérification d'expiration de certificat se fait via d'autres commandes (ex. kubeadm certs check-expiration).",
      "Correct : kubectl auth can-i VERB RESOURCE interroge l'API server pour savoir si l'action serait autorisée par RBAC, éventuellement pour un autre utilisateur via --as.",
      "Faux : ce n'est pas lié à la compatibilité de version d'upgrade.",
      "Faux : ce n'est pas un contrôle de probes, mais d'autorisation RBAC."
    ],
    "explain": "kubectl auth can-i VERB [RESOURCE] interroge le SubjectAccessReview de l'API server pour répondre yes/no à la question « cet utilisateur/ServiceAccount peut-il effectuer cette action ? », en s'appuyant sur --as pour tester un autre sujet que soi-même.",
    "ref": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#checking-api-access",
    "en": {
      "q": "What does the `kubectl auth can-i` command let you check?",
      "choices": [
        "Whether a client certificate is about to expire",
        "Whether a given user or ServiceAccount is allowed to perform a given action (verb) on a given resource",
        "Whether the cluster meets the minimum supported version for an upgrade",
        "Whether a pod passes its liveness/readiness checks"
      ]
    }
  },
  {
    "id": "t3-a6",
    "domain": "architecture",
    "difficulty": "medium",
    "q": "Quelle est la durée de vie par défaut d'un token de ServiceAccount projeté (projected volume) monté automatiquement dans un Pod ?",
    "choices": [
      "15 minutes",
      "1 heure (3600 secondes)",
      "24 heures",
      "90 jours"
    ],
    "correct": [
      1
    ],
    "why": [
      "Faux : ce n'est pas la valeur par défaut documentée.",
      "Correct : par défaut, expirationSeconds vaut 3600 (1h) pour un token de ServiceAccount projeté, et kubelet le renouvelle automatiquement avant expiration.",
      "Faux : 24h n'est pas la durée par défaut du token projeté.",
      "Faux : bien trop long par rapport au comportement par défaut documenté."
    ],
    "explain": "Un token de ServiceAccount monté via un volume projected a par défaut expirationSeconds: 3600, soit 1 heure ; kubelet le régénère automatiquement avant expiration tant que le Pod existe.",
    "ref": "https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/",
    "en": {
      "q": "What is the default lifetime of a projected ServiceAccount token automatically mounted into a Pod?",
      "choices": [
        "15 minutes",
        "1 hour (3600 seconds)",
        "24 hours",
        "90 days"
      ]
    }
  },
  {
    "id": "t3-a7",
    "domain": "architecture",
    "difficulty": "hard",
    "q": "Que permet de faire l'option `--bound-object-kind=Pod --bound-object-name=<pod>` de la commande `kubectl create token` ?",
    "choices": [
      "Elle force le token à être stocké dans un Secret persistant lié au Pod",
      "Elle lie la validité du token au cycle de vie du Pod indiqué : le token devient invalide si ce Pod est supprimé",
      "Elle attribue le token comme variable d'environnement dans le Pod cible",
      "Elle change le namespace du ServiceAccount pour celui du Pod"
    ],
    "correct": [
      1
    ],
    "why": [
      "Faux : kubectl create token génère un token à la volée via l'API TokenRequest, il n'est pas stocké dans un Secret.",
      "Correct : lier le token à un objet (boundObjectRef) fait que le token devient invalide si l'objet référencé (ici le Pod) est supprimé, ou peu après sa suppression.",
      "Faux : la commande retourne le token en sortie, elle ne l'injecte pas comme variable d'environnement.",
      "Faux : le ServiceAccount garde son propre namespace, indépendant du Pod référencé."
    ],
    "explain": "L'API TokenRequest sous-jacente à kubectl create token accepte un boundObjectRef (Pod, Secret, ou Node) : le token émis devient invalide si l'objet référencé est supprimé, ce qui permet de lier la durée de vie effective du token à celle de cet objet.",
    "ref": "https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/",
    "en": {
      "q": "What does the `--bound-object-kind=Pod --bound-object-name=<pod>` option of `kubectl create token` do?",
      "choices": [
        "It forces the token to be stored in a persistent Secret tied to the Pod",
        "It binds the token's validity to the lifecycle of the given Pod: the token becomes invalid if that Pod is deleted",
        "It injects the token as an environment variable into the target Pod",
        "It changes the ServiceAccount's namespace to the Pod's namespace"
      ]
    }
  },
  {
    "id": "t3-a8",
    "domain": "architecture",
    "difficulty": "easy",
    "q": "Sur un nœud du control plane installé avec kubeadm, où se trouvent par défaut le certificat et la clé de l'autorité de certification (CA) du cluster ?",
    "choices": [
      "/etc/kubernetes/manifests/ca.crt et ca.key",
      "/etc/kubernetes/pki/ca.crt et /etc/kubernetes/pki/ca.key",
      "/var/lib/kubelet/pki/ca.crt et ca.key",
      "/root/.kube/ca.crt et ca.key"
    ],
    "correct": [
      1
    ],
    "why": [
      "Faux : /etc/kubernetes/manifests contient les manifests de static pods, pas les certificats.",
      "Correct : le répertoire de certificats par défaut est /etc/kubernetes/pki, qui contient notamment ca.crt (certificat public) et ca.key (clé privée) de la CA du cluster.",
      "Faux : /var/lib/kubelet/pki contient des certificats liés au kubelet (bootstrap, rotation), pas la CA principale du cluster.",
      "Faux : ~/.kube contient généralement le kubeconfig de l'utilisateur, pas les fichiers de la CA du cluster."
    ],
    "explain": "kubeadm stocke par défaut tous les certificats et clés du cluster dans /etc/kubernetes/pki (répertoire modifiable via --cert-dir), dont ca.crt/ca.key qui forment l'autorité de certification racine du cluster.",
    "ref": "https://kubernetes.io/docs/tasks/administer-cluster/certificates/",
    "en": {
      "q": "On a kubeadm-installed control plane node, where are the cluster's Certificate Authority (CA) certificate and key stored by default?",
      "choices": [
        "/etc/kubernetes/manifests/ca.crt and ca.key",
        "/etc/kubernetes/pki/ca.crt and /etc/kubernetes/pki/ca.key",
        "/var/lib/kubelet/pki/ca.crt and ca.key",
        "/root/.kube/ca.crt and ca.key"
      ]
    }
  },
  {
    "id": "t3-a9",
    "domain": "architecture",
    "difficulty": "medium",
    "q": "Que permet de faire la commande `kubeadm init phase` ?",
    "choices": [
      "Elle liste uniquement les erreurs rencontrées lors d'un kubeadm init précédent",
      "Elle exécute individuellement une phase précise du processus kubeadm init (ex. certs, kubeconfig, control-plane), au lieu de tout exécuter d'un coup",
      "Elle met en pause l'initialisation du cluster pendant une durée donnée",
      "Elle bascule le cluster d'une phase alpha à une phase stable"
    ],
    "correct": [
      1
    ],
    "why": [
      "Faux : ce n'est pas un outil de diagnostic d'erreurs passées.",
      "Correct : kubeadm init est découpé en phases (preflight, certs, kubeconfig, etcd, control-plane, kubelet-start, upload-certs, addon...) que l'on peut exécuter individuellement avec kubeadm init phase <nom>, utile pour personnaliser ou déboguer l'initialisation.",
      "Faux : il n'y a pas de notion de pause programmée.",
      "Faux : rien à voir avec un statut de maturité de fonctionnalité (feature gate)."
    ],
    "explain": "kubeadm init exécute une séquence de phases (certs, kubeconfig, etcd, control-plane, kubelet-start, upload-certs, mark-control-plane, bootstrap-token, addon...) ; kubeadm init phase <nom> permet de rejouer ou personnaliser une seule de ces étapes.",
    "ref": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/",
    "en": {
      "q": "What does the `kubeadm init phase` command let you do?",
      "choices": [
        "It only lists errors encountered during a previous kubeadm init run",
        "It runs a specific phase of the kubeadm init process individually (e.g. certs, kubeconfig, control-plane), instead of running everything at once",
        "It pauses cluster initialization for a given duration",
        "It switches the cluster from an alpha stage to a stable stage"
      ]
    }
  },
  {
    "id": "t3-a10",
    "domain": "architecture",
    "difficulty": "medium",
    "q": "À quoi sert le flag `--upload-certs` de `kubeadm init` ?",
    "choices": [
      "Il chiffre puis stocke les certificats du control plane dans un Secret (kubeadm-certs) afin que d'autres nœuds control-plane puissent rejoindre le cluster sans copie manuelle des certificats",
      "Il envoie une copie des certificats à un service cloud externe pour sauvegarde",
      "Il force le renouvellement immédiat de tous les certificats du cluster",
      "Il publie les certificats publics du cluster sur un registre d'images container"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : --upload-certs chiffre les certificats du control plane et les stocke dans le Secret kubeadm-certs ; combiné à --certificate-key lors du join, cela évite de copier les certificats manuellement sur les nœuds control-plane additionnels.",
      "Faux : aucun envoi vers un service cloud externe n'est effectué.",
      "Faux : cela n'a pas de lien avec le renouvellement des certificats (voir plutôt kubeadm certs renew).",
      "Faux : les certificats ne sont pas publiés sur un registre d'images."
    ],
    "explain": "--upload-certs (avec --certificate-key en option) permet de partager de façon chiffrée les certificats du control plane via le Secret kubeadm-certs, pour simplifier l'ajout d'autres nœuds control-plane en configuration HA avec kubeadm join --control-plane.",
    "ref": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/#upload-certs",
    "en": {
      "q": "What is the purpose of the `--upload-certs` flag of `kubeadm init`?",
      "choices": [
        "It encrypts and stores the control plane certificates in a Secret (kubeadm-certs) so other control-plane nodes can join the cluster without manually copying certificates",
        "It sends a copy of the certificates to an external cloud service for backup",
        "It forces the immediate renewal of all cluster certificates",
        "It publishes the cluster's public certificates to a container image registry"
      ]
    }
  },
  {
    "id": "t3-a11",
    "domain": "architecture",
    "difficulty": "easy",
    "q": "Lors de la mise à jour (upgrade) d'un worker node avec kubeadm, dans quel ordre doit-on effectuer le drain et l'uncordon du nœud ?",
    "choices": [
      "kubectl drain avant l'upgrade du kubelet, puis kubectl uncordon une fois l'upgrade terminé",
      "kubectl uncordon avant l'upgrade, puis kubectl drain après",
      "Ni drain ni uncordon ne sont nécessaires pour un upgrade mineur",
      "kubectl drain et kubectl uncordon doivent être exécutés simultanément"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la doc précise que pour un upgrade mineur du kubelet, il faut d'abord drainer le nœud, puis l'upgrader, redémarrer le kubelet, et enfin uncordon pour le remettre schedulable.",
      "Faux : uncordon avant l'upgrade laisserait de nouveaux pods se faire scheduler sur un nœud en cours de mise à jour.",
      "Faux : la documentation indique explicitement qu'il faut drainer le nœud avant un upgrade mineur du kubelet.",
      "Faux : ce sont deux étapes séquentielles distinctes, pas simultanées."
    ],
    "explain": "La procédure documentée est : kubectl drain <node> --ignore-daemonsets avant l'upgrade des paquets kubeadm/kubelet/kubectl et le redémarrage du kubelet, puis kubectl uncordon <node> une fois le nœud vérifié opérationnel, pour le remettre disponible au scheduling.",
    "ref": "https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/#upgrade-worker-nodes",
    "en": {
      "q": "When upgrading a worker node with kubeadm, in what order should you drain and uncordon the node?",
      "choices": [
        "kubectl drain before upgrading the kubelet, then kubectl uncordon once the upgrade is complete",
        "kubectl uncordon before the upgrade, then kubectl drain afterwards",
        "Neither drain nor uncordon is necessary for a minor upgrade",
        "kubectl drain and kubectl uncordon must be run simultaneously"
      ]
    }
  },
  {
    "id": "t3-a12",
    "domain": "architecture",
    "difficulty": "medium",
    "q": "Comment se déroule, en deux étapes, la sélection d'un nœud par kube-scheduler pour un Pod donné ?",
    "choices": [
      "D'abord le scoring de tous les nœuds, puis le filtering des nœuds les mieux notés",
      "D'abord le filtering, qui élimine les nœuds où le Pod ne peut pas être schedulé, puis le scoring, qui classe les nœuds restants pour choisir le meilleur",
      "D'abord l'admission webhook, puis le filtering uniquement",
      "D'abord le binding du Pod, puis la vérification a posteriori des ressources du nœud"
    ],
    "correct": [
      1
    ],
    "why": [
      "Faux : l'ordre est inversé par rapport à la documentation : le filtering précède toujours le scoring.",
      "Correct : kube-scheduler filtre d'abord les nœuds faisables (Filtering) puis note (Scoring) les nœuds restants pour choisir celui avec le meilleur score.",
      "Faux : les admission webhooks ne font pas partie de ce processus en deux étapes décrit pour le scheduler.",
      "Faux : le binding intervient après la sélection du nœud, pas avant filtering/scoring."
    ],
    "explain": "kube-scheduler sélectionne un nœud pour un Pod en deux étapes : Filtering (élimine les nœuds infaisables, ex. ressources insuffisantes) puis Scoring (classe les nœuds restants) ; le nœud avec le meilleur score est choisi, un tirage aléatoire départageant les ex-aequo.",
    "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/",
    "en": {
      "q": "How does kube-scheduler's two-step process for selecting a node for a given Pod work?",
      "choices": [
        "First scoring of all nodes, then filtering of the highest-scored nodes",
        "First filtering, which eliminates nodes where the Pod cannot be scheduled, then scoring, which ranks the remaining nodes to pick the best one",
        "First an admission webhook, then filtering only",
        "First binding the Pod, then a post-hoc check of the node's resources"
      ]
    }
  },
  {
    "id": "t3-w1",
    "domain": "workloads",
    "difficulty": "easy",
    "q": "Dans un Deployment, à quoi sert le champ `.spec.revisionHistoryLimit` et quelle est sa valeur par défaut si il n'est pas spécifié ?",
    "choices": [
      "Il limite le nombre d'anciens ReplicaSets conservés pour permettre un rollback ; valeur par défaut : 10",
      "Il limite le nombre de Pods historiques conservés pour l'audit ; valeur par défaut : 5",
      "Il définit le nombre de tentatives de rollout avant abandon ; valeur par défaut : 3",
      "Il limite le nombre de versions d'image Docker conservées dans le registre ; valeur par défaut : 0"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : ce champ conserve un nombre d'anciens ReplicaSets pour permettre le rollback ; la valeur par défaut est 10.",
      "Faux : il ne s'agit pas de Pods mais de ReplicaSets, et la valeur par défaut n'est pas 5.",
      "Faux : ce champ ne concerne pas les tentatives de rollout mais l'historique des ReplicaSets.",
      "Faux : Kubernetes ne gère pas le registre d'images ; ce champ concerne les ReplicaSets du Deployment."
    ],
    "explain": "Le champ `revisionHistoryLimit` permet de contrôler combien d'anciens ReplicaSets sont conservés dans l'historique d'un Deployment, ce qui permet de faire un rollback vers une révision antérieure. Par défaut, si le champ n'est pas renseigné, sa valeur est 10.",
    "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#revision-history-limit",
    "en": {
      "q": "In a Deployment, what does the `.spec.revisionHistoryLimit` field do, and what is its default value if unspecified?",
      "choices": [
        "It limits the number of old ReplicaSets retained to allow rollback; default value: 10",
        "It limits the number of historical Pods retained for auditing; default value: 5",
        "It defines the number of rollout retry attempts before giving up; default value: 3",
        "It limits the number of Docker image versions retained in the registry; default value: 0"
      ]
    }
  },
  {
    "id": "t3-w2",
    "domain": "workloads",
    "difficulty": "medium",
    "q": "Quelle commande permet de faire un rollback d'un Deployment vers une révision spécifique (par exemple la révision 2) ?",
    "choices": [
      "kubectl rollout undo deployment/<nom> --to-revision=2",
      "kubectl rollout restart deployment/<nom> --revision=2",
      "kubectl set image deployment/<nom> --revision=2",
      "kubectl scale deployment/<nom> --to-revision=2"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : `kubectl rollout undo` avec l'option `--to-revision` permet de revenir à une révision précise de l'historique du Deployment.",
      "Faux : `rollout restart` redémarre les Pods avec l'image courante ; ce n'est pas un rollback vers une révision antérieure et cette commande n'accepte pas `--revision`.",
      "Faux : `set image` change l'image du conteneur, ce n'est pas un mécanisme de rollback vers une révision.",
      "Faux : `scale` modifie le nombre de replicas, elle n'a aucun rapport avec les révisions."
    ],
    "explain": "La commande `kubectl rollout undo deployment/<nom> --to-revision=<N>` permet de revenir à une révision précédente précise, visible via `kubectl rollout history deployment/<nom>`. Sans l'option `--to-revision`, la commande revient simplement à la révision précédente immédiate.",
    "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-to-a-previous-revision",
    "en": {
      "q": "Which command rolls back a Deployment to a specific revision (e.g. revision 2)?",
      "choices": [
        "kubectl rollout undo deployment/<name> --to-revision=2",
        "kubectl rollout restart deployment/<name> --revision=2",
        "kubectl set image deployment/<name> --revision=2",
        "kubectl scale deployment/<name> --to-revision=2"
      ]
    }
  },
  {
    "id": "t3-w3",
    "domain": "workloads",
    "difficulty": "medium",
    "q": "Concernant le déploiement des Pods d'un StatefulSet, que garantit Kubernetes par défaut (podManagementPolicy: OrderedReady) ?",
    "choices": [
      "Les Pods sont créés dans l'ordre croissant de leur index ordinal, chacun devant être Running et Ready avant que le suivant ne soit créé",
      "Tous les Pods sont créés simultanément pour accélérer le démarrage",
      "Les Pods sont créés dans un ordre aléatoire déterminé par le scheduler",
      "Les Pods sont créés dans l'ordre décroissant de leur index ordinal"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : avec la politique par défaut `OrderedReady`, les Pods sont déployés séquentiellement (0, 1, 2…) et chaque Pod doit être Running et Ready avant la création du suivant.",
      "Faux : c'est le comportement de la politique `Parallel`, pas celui par défaut.",
      "Faux : l'ordre n'est pas aléatoire, il suit strictement l'index ordinal.",
      "Faux : l'ordre croissant est utilisé pour le déploiement ; l'ordre décroissant est utilisé lors de la terminaison (scale-down)."
    ],
    "explain": "Par défaut (`podManagementPolicy: OrderedReady`), un StatefulSet déploie ses Pods de façon séquentielle et ordonnée : le Pod d'indice N n'est créé qu'après que le Pod d'indice N-1 soit Running et Ready. Lors d'une réduction d'échelle, les Pods sont terminés dans l'ordre inverse. La politique `Parallel` permet de créer/supprimer tous les Pods simultanément sans attendre.",
    "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#deployment-and-scaling-guarantees",
    "en": {
      "q": "Regarding StatefulSet Pod deployment, what does Kubernetes guarantee by default (podManagementPolicy: OrderedReady)?",
      "choices": [
        "Pods are created in increasing ordinal order, each one must be Running and Ready before the next is created",
        "All Pods are created simultaneously to speed up startup",
        "Pods are created in a random order determined by the scheduler",
        "Pods are created in decreasing ordinal order"
      ]
    }
  },
  {
    "id": "t3-w4",
    "domain": "workloads",
    "difficulty": "easy",
    "q": "Pourquoi un StatefulSet nécessite-t-il un Headless Service (`clusterIP: None`) ?",
    "choices": [
      "Parce que ce Service est responsable de l'identité réseau des Pods et permet de leur attribuer des enregistrements DNS stables individuels",
      "Parce que Kubernetes l'exige pour tous les objets de type Controller, y compris les Deployments",
      "Parce que cela permet de load-balancer le trafic de façon aléatoire entre les Pods du StatefulSet",
      "Parce que cela désactive automatiquement les PersistentVolumeClaims"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation précise que les StatefulSets nécessitent un Headless Service responsable de l'identité réseau des Pods ; c'est à l'utilisateur de le créer.",
      "Faux : seuls les StatefulSets ont cette exigence, pas les Deployments.",
      "Faux : un Headless Service (clusterIP: None) ne fait justement pas de load-balancing ; il fournit des enregistrements DNS individuels par Pod.",
      "Faux : le Headless Service n'a aucun rapport avec les PersistentVolumeClaims."
    ],
    "explain": "Un Headless Service (avec `clusterIP: None`) est requis par le StatefulSet pour fournir l'identité réseau stable des Pods : chaque Pod obtient un enregistrement DNS de la forme `<nom-pod>.<service>.<namespace>.svc.cluster.local`. C'est l'utilisateur qui doit créer ce Service ; Kubernetes ne le crée pas automatiquement.",
    "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#limitations",
    "en": {
      "q": "Why does a StatefulSet require a Headless Service (`clusterIP: None`)?",
      "choices": [
        "Because this Service is responsible for the network identity of the Pods and gives them individual stable DNS records",
        "Because Kubernetes requires it for all Controller objects, including Deployments",
        "Because it randomly load-balances traffic across the StatefulSet's Pods",
        "Because it automatically disables PersistentVolumeClaims"
      ]
    }
  },
  {
    "id": "t3-w5",
    "domain": "workloads",
    "difficulty": "hard",
    "q": "Le contrôleur DaemonSet ajoute automatiquement certaines tolerations aux Pods qu'il crée. Quel effet de taint est associé par défaut à la toleration `node.kubernetes.io/memory-pressure` ajoutée automatiquement ?",
    "choices": [
      "NoSchedule",
      "NoExecute",
      "PreferNoSchedule",
      "Aucune toleration n'est ajoutée automatiquement pour ce taint"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la toleration `node.kubernetes.io/memory-pressure` ajoutée automatiquement aux Pods d'un DaemonSet a l'effet `NoSchedule`, afin que ces Pods puissent quand même être planifiés sur un nœud sous pression mémoire.",
      "Faux : NoExecute est utilisé pour `node.kubernetes.io/not-ready` et `node.kubernetes.io/unreachable`, pas pour memory-pressure.",
      "Faux : PreferNoSchedule n'est pas utilisé parmi les tolerations automatiques du DaemonSet.",
      "Faux : le contrôleur DaemonSet ajoute bien automatiquement cette toleration."
    ],
    "explain": "Le contrôleur DaemonSet ajoute automatiquement plusieurs tolerations à ses Pods, notamment `node.kubernetes.io/not-ready` et `node.kubernetes.io/unreachable` avec l'effet `NoExecute`, ainsi que `node.kubernetes.io/disk-pressure`, `node.kubernetes.io/memory-pressure`, `node.kubernetes.io/pid-pressure` et `node.kubernetes.io/unschedulable` avec l'effet `NoSchedule`. Cela garantit que les Pods gérés par le DaemonSet (souvent des agents système) continuent de tourner malgré ces conditions sur le nœud.",
    "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/#taints-and-tolerations",
    "en": {
      "q": "The DaemonSet controller automatically adds certain tolerations to the Pods it creates. Which taint effect is associated by default with the automatically added `node.kubernetes.io/memory-pressure` toleration?",
      "choices": [
        "NoSchedule",
        "NoExecute",
        "PreferNoSchedule",
        "No toleration is automatically added for this taint"
      ]
    }
  },
  {
    "id": "t3-w6",
    "domain": "workloads",
    "difficulty": "medium",
    "q": "Dans la spec d'un Job, quelle est la différence entre les champs `parallelism` et `completions` ?",
    "choices": [
      "`completions` définit le nombre de Pods qui doivent se terminer avec succès pour que le Job soit considéré comme complet, tandis que `parallelism` définit le nombre maximal de Pods pouvant s'exécuter simultanément",
      "`parallelism` définit le nombre de Pods qui doivent réussir, tandis que `completions` définit combien de Pods peuvent tourner en même temps",
      "Les deux champs sont synonymes et interchangeables",
      "`completions` limite le nombre de nœuds utilisables, tandis que `parallelism` limite le nombre de conteneurs par Pod"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : `completions` est l'objectif du nombre de complétions réussies, `parallelism` est le nombre de Pods exécutés en parallèle à un instant donné.",
      "Faux : c'est l'inverse de la définition réelle des deux champs.",
      "Faux : ce sont deux champs distincts avec des rôles différents.",
      "Faux : ni l'un ni l'autre ne concerne les nœuds ou le nombre de conteneurs par Pod."
    ],
    "explain": "Un Job peut exécuter des Pods en parallèle. Le champ `completions` indique combien de Pods doivent se terminer avec succès pour que le Job soit complet, tandis que `parallelism` indique combien de Pods peuvent tourner simultanément à tout moment. Par exemple, avec `completions: 5` et `parallelism: 2`, le Job lance au maximum 2 Pods à la fois jusqu'à ce que 5 se soient terminés avec succès.",
    "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/job/#parallel-jobs",
    "en": {
      "q": "In a Job spec, what is the difference between the `parallelism` and `completions` fields?",
      "choices": [
        "`completions` defines the number of Pods that must complete successfully for the Job to be considered complete, while `parallelism` defines the maximum number of Pods that can run simultaneously",
        "`parallelism` defines the number of Pods that must succeed, while `completions` defines how many Pods can run at the same time",
        "Both fields are synonyms and interchangeable",
        "`completions` limits the number of usable nodes, while `parallelism` limits the number of containers per Pod"
      ]
    }
  },
  {
    "id": "t3-w7",
    "domain": "workloads",
    "difficulty": "medium",
    "q": "Parmi les affirmations suivantes sur les effets de taint, laquelle est correcte ?",
    "choices": [
      "`NoExecute` évince immédiatement les Pods déjà en cours d'exécution qui ne tolèrent pas le taint, en plus d'empêcher le scheduling de nouveaux Pods",
      "`NoSchedule` évince les Pods déjà en cours d'exécution sur le nœud qui ne tolèrent pas le taint",
      "`PreferNoSchedule` est une garantie stricte : aucun Pod intolérant ne sera jamais placé sur le nœud",
      "`NoSchedule` et `NoExecute` ont exactement le même comportement vis-à-vis des Pods déjà en cours d'exécution"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : l'effet `NoExecute` évince les Pods déjà présents qui ne tolèrent pas le taint, en plus d'empêcher la planification de nouveaux Pods.",
      "Faux : `NoSchedule` empêche seulement la planification de nouveaux Pods ; les Pods déjà en cours d'exécution sur le nœud ne sont pas évincés.",
      "Faux : `PreferNoSchedule` est une préférence « best effort », pas une garantie stricte : le control plane essaie d'éviter le nœud, sans garantie.",
      "Faux : contrairement à `NoExecute`, `NoSchedule` n'évince pas les Pods déjà présents sur le nœud."
    ],
    "explain": "Les trois effets de taint ont des comportements différents : `NoSchedule` empêche uniquement le placement de nouveaux Pods intolérants (les Pods déjà présents restent) ; `PreferNoSchedule` est une version « soft » de `NoSchedule`, sans garantie ; `NoExecute` empêche le placement de nouveaux Pods ET évince les Pods déjà en cours d'exécution qui ne tolèrent pas le taint (immédiatement, ou après `tolerationSeconds` si ce champ est spécifié).",
    "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#concepts",
    "en": {
      "q": "Which of the following statements about taint effects is correct?",
      "choices": [
        "`NoExecute` immediately evicts already-running Pods that do not tolerate the taint, in addition to preventing scheduling of new Pods",
        "`NoSchedule` evicts already-running Pods on the node that do not tolerate the taint",
        "`PreferNoSchedule` is a strict guarantee: no intolerant Pod will ever be placed on the node",
        "`NoSchedule` and `NoExecute` behave exactly the same way toward already-running Pods"
      ]
    }
  },
  {
    "id": "t3-w8",
    "domain": "workloads",
    "difficulty": "medium",
    "q": "Dans une règle `podAntiAffinity`, à quoi sert le champ `topologyKey` ?",
    "choices": [
      "Il désigne la clé d'un label de nœud qui définit le domaine topologique (par ex. `kubernetes.io/hostname` ou une zone) utilisé pour déterminer si des Pods sont co-localisés",
      "Il définit le nom du label à appliquer sur les Pods créés",
      "Il indique la priorité de scheduling du Pod par rapport aux autres",
      "Il spécifie le nombre maximal de Pods autorisés par nœud"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : `topologyKey` est la clé d'un label de nœud (par exemple `kubernetes.io/hostname` au niveau nœud, ou `topology.kubernetes.io/zone` au niveau zone) qui définit le domaine topologique dans lequel la règle d'affinité/anti-affinité est évaluée.",
      "Faux : il ne s'agit pas d'un label appliqué aux Pods créés, mais d'une clé de label déjà présente sur les nœuds.",
      "Faux : ce champ ne concerne pas une priorité de scheduling.",
      "Faux : c'est `topologySpreadConstraints` (avec `maxSkew`) qui gère la répartition, pas `topologyKey` seul dans podAntiAffinity."
    ],
    "explain": "Le champ `topologyKey` d'une règle `podAffinity`/`podAntiAffinity` correspond à la clé d'un label présent sur les nœuds (ex : `kubernetes.io/hostname`, `topology.kubernetes.io/zone`) : il définit le domaine topologique (nœud, zone, région...) utilisé par le scheduler pour évaluer la co-localisation ou la séparation des Pods entre eux.",
    "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity",
    "en": {
      "q": "In a `podAntiAffinity` rule, what is the purpose of the `topologyKey` field?",
      "choices": [
        "It designates the key of a node label that defines the topology domain (e.g. `kubernetes.io/hostname` or a zone) used to determine whether Pods are co-located",
        "It defines the name of the label to apply to the created Pods",
        "It indicates the scheduling priority of the Pod relative to others",
        "It specifies the maximum number of Pods allowed per node"
      ]
    }
  },
  {
    "id": "t3-n1",
    "domain": "networking",
    "difficulty": "medium",
    "q": "Un Service de type NodePort utilise `externalTrafficPolicy: Local`. Aucune Pod backend ne tourne sur le nœud qui reçoit le trafic externe. Que se passe-t-il ?",
    "choices": [
      "kube-proxy route le trafic vers un endpoint sur un autre nœud",
      "kube-proxy ne transfère aucun trafic pour ce Service (le trafic n'est pas relayé)",
      "Le trafic est automatiquement redirigé vers un comportement `externalTrafficPolicy: Cluster`",
      "Le nœud renvoie une erreur HTTP 503 au client"
    ],
    "correct": [
      1
    ],
    "why": [
      "Faux : avec `Local`, seuls les endpoints locaux au nœud sont utilisés ; il n'y a pas de re-routage vers un autre nœud.",
      "Correct : la documentation précise que si la politique est `Local` et qu'il n'existe aucun endpoint local à ce nœud, kube-proxy ne transfère aucun trafic pour ce Service.",
      "Faux : il n'existe pas de bascule automatique entre `Local` et `Cluster`.",
      "Faux : ce n'est pas kube-proxy qui génère une réponse HTTP applicative ; le trafic est simplement non relayé, sans réponse HTTP construite."
    ],
    "explain": "`externalTrafficPolicy` contrôle le routage du trafic provenant de sources externes. Avec `Cluster` (par défaut), le trafic est réparti vers tous les endpoints prêts du cluster. Avec `Local`, seuls les endpoints prêts et locaux au nœud sont utilisés ; s'il n'y en a aucun, kube-proxy ne transfère aucun trafic pour ce Service sur ce nœud.",
    "ref": "https://kubernetes.io/docs/reference/networking/virtual-ips/#external-traffic-policy",
    "en": {
      "q": "A NodePort Service uses `externalTrafficPolicy: Local`. No backend Pod is running on the node receiving the external traffic. What happens?",
      "choices": [
        "kube-proxy routes the traffic to an endpoint on another node",
        "kube-proxy does not forward any traffic for this Service (the traffic is not relayed)",
        "Traffic is automatically redirected to `externalTrafficPolicy: Cluster` behavior",
        "The node returns an HTTP 503 error to the client"
      ]
    }
  },
  {
    "id": "t3-n2",
    "domain": "networking",
    "difficulty": "medium",
    "q": "Pour un Service Kubernetes avec `sessionAffinity: ClientIP`, quelle est la valeur par défaut de `.spec.sessionAffinityConfig.clientIP.timeoutSeconds` ?",
    "choices": [
      "10800 secondes (3 heures)",
      "3600 secondes (1 heure)",
      "30 secondes",
      "Aucune valeur par défaut, le champ est obligatoire"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation indique explicitement que la valeur par défaut est 10800, soit 3 heures.",
      "Faux : ce n'est pas la valeur par défaut documentée.",
      "Faux : 30 secondes ne correspond à aucun champ documenté ici.",
      "Faux : le champ a bien une valeur par défaut ; il n'est pas obligatoire de le renseigner."
    ],
    "explain": "Par défaut, `sessionAffinity` vaut `None`. En le positionnant à `ClientIP`, les connexions d'un même client sont dirigées vers le même Pod. La durée maximale de cette collante se règle via `sessionAffinityConfig.clientIP.timeoutSeconds`, dont la valeur par défaut documentée est 10800 secondes. À noter : ce réglage n'est pas supporté sur Windows.",
    "ref": "https://kubernetes.io/docs/reference/networking/virtual-ips/#session-affinity",
    "en": {
      "q": "For a Kubernetes Service with `sessionAffinity: ClientIP`, what is the default value of `.spec.sessionAffinityConfig.clientIP.timeoutSeconds`?",
      "choices": [
        "10800 seconds (3 hours)",
        "3600 seconds (1 hour)",
        "30 seconds",
        "There is no default value, the field is required"
      ]
    }
  },
  {
    "id": "t3-n3",
    "domain": "networking",
    "difficulty": "easy",
    "q": "Un Service expose deux ports (80 et 443) vers des Pods backend. D'après la documentation, quelle règle s'applique aux ports d'un Service multi-port ?",
    "choices": [
      "Chaque port du Service doit avoir un `name` pour lever toute ambiguïté",
      "Seul le premier port peut avoir un nom, les suivants sont numérotés automatiquement",
      "Il est impossible de définir plusieurs ports sur un même Service",
      "Les ports doivent obligatoirement utiliser des protocoles différents"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : « When using multiple ports for a Service, you must give all of your ports names so that these are unambiguous ».",
      "Faux : il n'y a pas de numérotation automatique ; chaque port doit être nommé explicitement.",
      "Faux : Kubernetes prend justement en charge plusieurs définitions de port sur un même Service (« Multi-port Services »).",
      "Faux : chaque définition de port peut avoir le même protocole ou un protocole différent, ce n'est pas une obligation qu'ils diffèrent."
    ],
    "explain": "Quand un Service expose plus d'un port, chaque port doit porter un `name` unique (caractères alphanumériques minuscules et `-`, devant commencer et finir par un alphanumérique) afin de lever toute ambiguïté entre les définitions de port.",
    "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#multi-port-services",
    "en": {
      "q": "A Service exposes two ports (80 and 443) to backend Pods. According to the documentation, which rule applies to a multi-port Service's ports?",
      "choices": [
        "Each port on the Service must have a `name` to remove ambiguity",
        "Only the first port may have a name, the others are numbered automatically",
        "It is impossible to define more than one port on a single Service",
        "The ports must use different protocols"
      ]
    }
  },
  {
    "id": "t3-n4",
    "domain": "networking",
    "difficulty": "medium",
    "q": "Vous créez un Service sans champ `selector`. Que se passe-t-il concernant les EndpointSlices ?",
    "choices": [
      "Les EndpointSlices sont créées automatiquement en scannant tous les Pods du namespace",
      "Aucune EndpointSlice n'est créée automatiquement ; il faut en créer une manuellement en la liant via le label `kubernetes.io/service-name`",
      "Le Service ne peut jamais recevoir de trafic",
      "Kubernetes convertit automatiquement le Service en type ExternalName"
    ],
    "correct": [
      1
    ],
    "why": [
      "Faux : sans selector, le contrôleur ne peut pas déterminer quels Pods cibler, donc rien n'est créé automatiquement.",
      "Correct : « Because this Service has no selector, the corresponding EndpointSlice objects are not created automatically. You can map the Service to the network address and port... by adding an EndpointSlice object manually », en positionnant le label `kubernetes.io/service-name`.",
      "Faux : le Service peut recevoir du trafic dès lors qu'une EndpointSlice manuelle correctement liée existe.",
      "Faux : ExternalName est un type de Service distinct et explicite (`spec.type: ExternalName`), il n'y a pas de conversion automatique."
    ],
    "explain": "Un Service peut abstraire des backends hors sélecteur (base de données externe, autre namespace/cluster, migration progressive). Comme aucune EndpointSlice n'est générée automatiquement, on en crée une soi-même avec le label `kubernetes.io/service-name` pointant vers le nom du Service, ainsi que les adresses et ports des endpoints.",
    "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#services-without-selectors",
    "en": {
      "q": "You create a Service without a `selector` field. What happens regarding EndpointSlices?",
      "choices": [
        "EndpointSlices are created automatically by scanning all Pods in the namespace",
        "No EndpointSlice is created automatically; you must create one manually and link it via the `kubernetes.io/service-name` label",
        "The Service can never receive traffic",
        "Kubernetes automatically converts the Service to type ExternalName"
      ]
    }
  },
  {
    "id": "t3-n5",
    "domain": "networking",
    "difficulty": "hard",
    "q": "Une règle Ingress définit `path: /foo/bar` avec `pathType: Prefix`. Selon la documentation, quelle affirmation est correcte ?",
    "choices": [
      "La requête `/foo/bar/baz` correspond, mais `/foo/barbaz` ne correspond PAS",
      "Les deux requêtes `/foo/bar/baz` et `/foo/barbaz` correspondent",
      "Aucune des deux requêtes ne correspond ; seul `/foo/bar` exact correspond",
      "Seule `/foo/barbaz` correspond, car `Prefix` fait un simple préfixe de chaîne de caractères"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation précise explicitement que `/foo/bar` matche `/foo/bar/baz` mais ne matche pas `/foo/barbaz`, car le dernier élément du path (`bar`) n'est qu'une sous-chaîne du dernier élément de la requête (`barbaz`), pas un élément de chemin complet.",
      "Faux : `/foo/barbaz` ne correspond pas, car `Prefix` matche élément de chemin par élément de chemin (séparés par `/`), pas en simple sous-chaîne.",
      "Faux : `/foo/bar/baz` correspond bien, car c'est un sous-chemin valide de `/foo/bar`.",
      "Faux : `Prefix` n'est justement PAS un simple préfixe de chaîne — c'est un match élément par élément découpé par `/`."
    ],
    "explain": "Le matching `Prefix` se fait élément de chemin par élément de chemin (split par `/`), pas en préfixe de chaîne brute. Ainsi `/foo/bar` matche `/foo/bar/baz` (sous-chemin) mais PAS `/foo/barbaz` : le dernier élément du path (`bar`) n'est qu'une sous-chaîne du dernier élément de la requête (`barbaz`), ce qui ne compte pas comme match.",
    "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types",
    "en": {
      "q": "An Ingress rule defines `path: /foo/bar` with `pathType: Prefix`. According to the documentation, which statement is correct?",
      "choices": [
        "The request `/foo/bar/baz` matches, but `/foo/barbaz` does NOT match",
        "Both `/foo/bar/baz` and `/foo/barbaz` match",
        "Neither request matches, only the exact `/foo/bar` matches",
        "Only `/foo/barbaz` matches, because Prefix does simple string-prefix matching"
      ]
    }
  },
  {
    "id": "t3-n6",
    "domain": "networking",
    "difficulty": "medium",
    "q": "Dans un objet Ingress, si `.spec.rules` n'est pas défini du tout, que faut-il obligatoirement spécifier d'après la documentation ?",
    "choices": [
      ".spec.defaultBackend",
      ".spec.ingressClassName",
      ".spec.tls",
      "Rien, un Ingress sans rules est invalide"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : « If no .spec.rules are specified, .spec.defaultBackend must be specified ».",
      "Faux : `ingressClassName` est recommandé/optionnel (un défaut peut s'appliquer), ce n'est pas lié à l'absence de rules.",
      "Faux : `tls` est indépendant des règles ; il n'est pas requis en absence de rules.",
      "Faux : un Ingress sans rules est valide s'il définit un `defaultBackend`, il n'est pas automatiquement invalide."
    ],
    "explain": "Un Ingress sans règles envoie tout le trafic vers un unique backend par défaut. `.spec.defaultBackend` désigne ce backend. Si aucune règle n'est présente, ce champ doit être renseigné ; sinon, la gestion des requêtes non appariées dépend de l'implémentation du contrôleur Ingress.",
    "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/#default-backend",
    "en": {
      "q": "In an Ingress object, if `.spec.rules` is not defined at all, what must be specified according to the documentation?",
      "choices": [
        ".spec.defaultBackend",
        ".spec.ingressClassName",
        ".spec.tls",
        "Nothing, an Ingress without rules is invalid"
      ]
    }
  },
  {
    "id": "t3-n7",
    "domain": "networking",
    "difficulty": "medium",
    "q": "Comment marque-t-on une IngressClass comme la classe par défaut du cluster ?",
    "choices": [
      "En ajoutant l'annotation `ingressclass.kubernetes.io/is-default-class: \"true\"` sur la ressource IngressClass",
      "En nommant l'IngressClass `default`",
      "En définissant `spec.default: true` dans l'IngressClass",
      "Ce n'est pas possible, `ingressClassName` doit toujours être précisé explicitement sur chaque Ingress"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : « Setting the ingressclass.kubernetes.io/is-default-class annotation to true on an IngressClass resource will ensure that new Ingresses without an ingressClassName field specified will be assigned this default IngressClass ».",
      "Faux : le nom de la ressource n'a pas d'effet particulier, c'est l'annotation qui compte.",
      "Faux : il n'existe pas de champ `spec.default` dans l'API IngressClass.",
      "Faux : marquer une IngressClass par défaut permet justement d'omettre `ingressClassName` sur les Ingress."
    ],
    "explain": "En posant l'annotation `ingressclass.kubernetes.io/is-default-class: \"true\"` sur une ressource IngressClass, tout nouvel Ingress créé sans `ingressClassName` se voit automatiquement assigné cette classe. Attention : si plus d'une IngressClass est marquée par défaut, l'admission controller empêche la création de nouveaux Ingress sans `ingressClassName` explicite.",
    "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/#default-ingress-class",
    "en": {
      "q": "How do you mark an IngressClass as the cluster's default class?",
      "choices": [
        "By adding the annotation `ingressclass.kubernetes.io/is-default-class: \"true\"` on the IngressClass resource",
        "By naming the IngressClass `default`",
        "By setting `spec.default: true` in the IngressClass",
        "It is not possible, `ingressClassName` must always be explicitly specified on every Ingress"
      ]
    }
  },
  {
    "id": "t3-n8",
    "domain": "networking",
    "difficulty": "hard",
    "q": "Dans une NetworkPolicy, une entrée `from` combine `namespaceSelector` ET `podSelector` au sein du MÊME élément de la liste. Quel est l'effet ?",
    "choices": [
      "Seuls les Pods correspondant au `podSelector` ET situés dans un namespace correspondant au `namespaceSelector` sont autorisés (ET logique)",
      "Tous les Pods correspondant au `podSelector`, OU tout Pod dans un namespace correspondant au `namespaceSelector`, sont autorisés (OU logique)",
      "Seul le `podSelector` est pris en compte, le `namespaceSelector` est ignoré",
      "La policy est invalide : on ne peut pas combiner les deux sélecteurs dans une même entrée"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : « A single to/from entry that specifies both namespaceSelector and podSelector selects particular Pods within particular namespaces » — c'est une combinaison ET.",
      "Faux : la logique OU s'obtient en mettant les deux sélecteurs comme deux éléments SÉPARÉS dans le tableau `from`, pas dans la même entrée.",
      "Faux : les deux sélecteurs sont bien pris en compte simultanément.",
      "Faux : cette combinaison dans une même entrée est parfaitement valide et documentée."
    ],
    "explain": "Quand `namespaceSelector` et `podSelector` figurent dans la MÊME entrée du tableau `from`/`to`, ils s'appliquent en ET : seuls les Pods qui matchent le `podSelector` ET qui se trouvent dans un namespace matchant le `namespaceSelector` sont sélectionnés. Pour obtenir un OU, il faut écrire deux entrées séparées dans le tableau.",
    "ref": "https://kubernetes.io/docs/concepts/services-networking/network-policies/#behavior-of-to-and-from-selectors",
    "en": {
      "q": "In a NetworkPolicy, a `from` entry combines `namespaceSelector` AND `podSelector` within the SAME list element. What is the effect?",
      "choices": [
        "Only Pods matching the `podSelector` AND located in a namespace matching the `namespaceSelector` are allowed (logical AND)",
        "All Pods matching the `podSelector`, OR any Pod in a namespace matching the `namespaceSelector`, are allowed (logical OR)",
        "Only the `podSelector` is taken into account, the `namespaceSelector` is ignored",
        "The policy is invalid: you cannot combine both selectors in the same entry"
      ]
    }
  },
  {
    "id": "t3-n9",
    "domain": "networking",
    "difficulty": "medium",
    "q": "Dans une NetworkPolicy, un bloc `ipBlock` est défini ainsi : `cidr: 172.17.0.0/16` avec `except: [172.17.1.0/24]`. Quel trafic est autorisé ?",
    "choices": [
      "Tout le CIDR `172.17.0.0/16` sauf la plage `172.17.1.0/24`",
      "Uniquement la plage `172.17.1.0/24`",
      "Aucun trafic, `except` bloque tout le bloc",
      "Tout le CIDR `172.17.0.0/16`, `except` n'a aucun effet dans `ipBlock`"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : l'exemple documenté couvre les adresses IP de `172.17.0.0`–`172.17.0.255` et `172.17.2.0`–`172.17.255.255`, c'est-à-dire tout `172.17.0.0/16` sauf `172.17.1.0/24`.",
      "Faux : c'est l'inverse, cette plage est justement exclue.",
      "Faux : `except` retire seulement les sous-plages listées du CIDR global, il n'annule pas tout le bloc.",
      "Faux : `except` a bien un effet, c'est un champ optionnel du sélecteur `ipBlock` qui exclut des sous-plages CIDR."
    ],
    "explain": "Le sélecteur `ipBlock` permet de définir des plages d'adresses IP (typiquement pour du trafic hors cluster) via `cidr`, avec un champ optionnel `except` qui liste des sous-plages CIDR à exclure de la plage principale.",
    "ref": "https://kubernetes.io/docs/concepts/services-networking/network-policies/#the-networkpolicy-resource",
    "en": {
      "q": "In a NetworkPolicy, an `ipBlock` is defined as: `cidr: 172.17.0.0/16` with `except: [172.17.1.0/24]`. What traffic is allowed?",
      "choices": [
        "All of the CIDR `172.17.0.0/16` except the range `172.17.1.0/24`",
        "Only the range `172.17.1.0/24`",
        "No traffic, `except` blocks the entire block",
        "All of the CIDR `172.17.0.0/16`, `except` has no effect within `ipBlock`"
      ]
    }
  },
  {
    "id": "t3-n10",
    "domain": "networking",
    "difficulty": "medium",
    "q": "Dans l'API Gateway (successeur d'Ingress), quel rôle joue la ressource `GatewayClass` ?",
    "choices": [
      "Elle définit un ensemble de Gateways partageant une configuration commune, gérées par un contrôleur donné (`spec.controllerName`)",
      "Elle décrit le routage HTTP détaillé (hôtes, chemins, backends) d'un listener vers des Services",
      "Elle représente une instance concrète d'infrastructure de traitement du trafic avec ses listeners réseau",
      "Elle remplace directement l'objet `Service` pour exposer des Pods"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : `GatewayClass` définit un ensemble de Gateways avec une configuration commune, gérée par un contrôleur identifié via `spec.controllerName`.",
      "Faux : c'est le rôle de `HTTPRoute`, qui spécifie le comportement de routage HTTP d'un listener Gateway vers les backends.",
      "Faux : c'est le rôle de `Gateway`, qui décrit une instance d'infrastructure définissant un endpoint réseau avec ses listeners.",
      "Faux : Gateway API est un complément à Service/Ingress, elle ne remplace pas l'objet Service pour l'exposition des Pods."
    ],
    "explain": "Gateway API définit plusieurs types principaux : `GatewayClass` (configuration commune gérée par un contrôleur), `Gateway` (instance d'infrastructure de traitement du trafic, avec ses listeners réseau), `HTTPRoute` (règles de routage HTTP d'un listener vers des backends), et `GRPCRoute` (équivalent pour gRPC).",
    "ref": "https://kubernetes.io/docs/concepts/services-networking/gateway/#api-kind-gatewayclass",
    "en": {
      "q": "In the Gateway API (successor to Ingress), what role does the `GatewayClass` resource play?",
      "choices": [
        "It defines a set of Gateways sharing a common configuration, managed by a given controller (`spec.controllerName`)",
        "It describes the detailed HTTP routing (hosts, paths, backends) of a listener to Services",
        "It represents a concrete instance of traffic-handling infrastructure with its network listeners",
        "It directly replaces the `Service` object for exposing Pods"
      ]
    }
  },
  {
    "id": "t3-s1",
    "domain": "storage",
    "difficulty": "medium",
    "q": "Dans un objet StorageClass, à quoi sert le champ `volumeBindingMode: WaitForFirstConsumer` ?",
    "choices": [
      "Il retarde la liaison (binding) et le provisioning du PersistentVolume jusqu'à la création d'un Pod qui utilise la PVC",
      "Il force la création immédiate du PV dès la création de la PVC, sans attendre de Pod",
      "Il empêche définitivement le provisioning dynamique pour cette StorageClass",
      "Il autorise l'expansion du volume après sa création"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : c'est exactement la définition documentée du mode WaitForFirstConsumer.",
      "C'est la définition du mode `Immediate`, qui est le comportement par défaut lorsque le champ n'est pas défini.",
      "Ce n'est pas le rôle de `volumeBindingMode` ; le provisioning dynamique se désactive via `storageClassName: \"\"` sur la PVC, pas sur la StorageClass elle-même.",
      "L'expansion de volume est contrôlée par le champ `allowVolumeExpansion`, pas par `volumeBindingMode`."
    ],
    "explain": "Le champ `volumeBindingMode` d'une StorageClass contrôle quand la liaison et le provisioning du PV ont lieu. En mode `Immediate` (comportement par défaut si le champ n'est pas défini), le binding et le provisioning se font dès la création de la PVC, sans connaître les contraintes de scheduling du Pod, ce qui peut produire des Pods non planifiables pour un stockage contraint par la topologie. En mode `WaitForFirstConsumer`, Kubernetes attend qu'un Pod utilisant la PVC soit créé pour sélectionner ou provisionner un PV conforme aux contraintes de scheduling de ce Pod.",
    "ref": "https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode",
    "en": {
      "q": "In a StorageClass object, what does the `volumeBindingMode: WaitForFirstConsumer` field do?",
      "choices": [
        "It delays the binding and provisioning of the PersistentVolume until a Pod using the PVC is created",
        "It forces immediate creation of the PV as soon as the PVC is created, without waiting for a Pod",
        "It permanently disables dynamic provisioning for that StorageClass",
        "It enables volume expansion after the volume is created"
      ]
    }
  },
  {
    "id": "t3-s2",
    "domain": "storage",
    "difficulty": "medium",
    "q": "Parmi les accessModes suivants, lequel garantit que le volume ne peut être monté en lecture-écriture que par un seul Pod à la fois (et non simplement par un seul nœud) ?",
    "choices": [
      "ReadWriteOnce (RWO)",
      "ReadWriteOncePod (RWOP)",
      "ReadOnlyMany (ROX)",
      "ReadWriteMany (RWX)"
    ],
    "correct": [
      1
    ],
    "why": [
      "RWO garantit un montage read-write par un seul *nœud* : plusieurs Pods colocalisés sur ce même nœud peuvent toujours monter le volume simultanément.",
      "Correct : la documentation définit ReadWriteOncePod comme « the volume can be mounted as read-write by a single Pod », garantissant l'exclusivité au niveau du Pod, pas seulement du nœud.",
      "ROX permet un montage en lecture seule par plusieurs nœuds simultanément, pas un accès exclusif à un seul Pod.",
      "RWX permet un montage en lecture-écriture par plusieurs nœuds simultanément, pas un accès exclusif à un seul Pod."
    ],
    "explain": "La documentation officielle liste quatre accessModes : ReadWriteOnce (lecture-écriture par un seul nœud), ReadOnlyMany (lecture seule par plusieurs nœuds), ReadWriteMany (lecture-écriture par plusieurs nœuds) et ReadWriteOncePod (lecture-écriture par un seul Pod). RWOP est plus strict que RWO : avec RWO, plusieurs Pods co-localisés sur le même nœud peuvent monter le volume simultanément, alors qu'avec RWOP un seul Pod dans tout le cluster a accès en écriture.",
    "ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes",
    "en": {
      "q": "Among the following accessModes, which one guarantees that the volume can only be mounted read-write by a single Pod at a time (not just a single node)?",
      "choices": [
        "ReadWriteOnce (RWO)",
        "ReadWriteOncePod (RWOP)",
        "ReadOnlyMany (ROX)",
        "ReadWriteMany (RWX)"
      ]
    }
  },
  {
    "id": "t3-s3",
    "domain": "storage",
    "difficulty": "medium",
    "q": "Concernant le champ `volumeMode` d'un PersistentVolume, quelle affirmation est correcte ?",
    "choices": [
      "`Filesystem` est la valeur par défaut ; `Block` expose le volume comme un périphérique bloc brut au conteneur, sans système de fichiers",
      "`Block` est la valeur par défaut pour tous les PV",
      "`volumeMode` détermine uniquement le mode d'accès (RWO/RWX) du volume",
      "`volumeMode` remplace le champ `accessModes` depuis Kubernetes v1.20"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : Filesystem est le mode par défaut ; en mode Block, le volume est présenté tel quel comme un device bloc, sans formatage ni montage d'un système de fichiers.",
      "C'est l'inverse : Filesystem est la valeur par défaut, pas Block.",
      "Le mode d'accès est géré par le champ distinct `accessModes`, indépendant de `volumeMode`.",
      "`volumeMode` et `accessModes` sont deux champs indépendants qui coexistent toujours ; l'un ne remplace pas l'autre."
    ],
    "explain": "Le champ `volumeMode` d'un PersistentVolume peut valoir `Filesystem` (valeur par défaut, le volume est monté dans un répertoire) ou `Block` (le volume est exposé comme périphérique bloc brut, pour un accès direct sans système de fichiers, décrit dans la section Raw Block Volume Support de la documentation).",
    "ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#volume-mode",
    "en": {
      "q": "Regarding the `volumeMode` field of a PersistentVolume, which statement is correct?",
      "choices": [
        "`Filesystem` is the default value; `Block` exposes the volume as a raw block device to the container, with no filesystem",
        "`Block` is the default value for all PVs",
        "`volumeMode` only determines the volume's access mode (RWO/RWX)",
        "`volumeMode` has replaced the `accessModes` field since Kubernetes v1.20"
      ]
    }
  },
  {
    "id": "t3-s4",
    "domain": "storage",
    "difficulty": "easy",
    "q": "Si le champ `reclaimPolicy` n'est pas spécifié lors de la création d'un objet StorageClass, quelle politique est appliquée par défaut ?",
    "choices": [
      "Retain",
      "Delete",
      "Recycle",
      "Aucune politique n'est appliquée tant qu'elle n'est pas définie explicitement"
    ],
    "correct": [
      1
    ],
    "why": [
      "Retain est une valeur possible pour `reclaimPolicy`, mais ce n'est pas la valeur par défaut d'une StorageClass.",
      "Correct : la documentation précise que si `reclaimPolicy` n'est pas spécifié à la création d'une StorageClass, il vaut `Delete` par défaut.",
      "Recycle n'est pas la politique par défaut d'une StorageClass et n'est même pas l'une des deux valeurs possibles pour ce champ (Delete ou Retain).",
      "Une valeur par défaut est bien appliquée automatiquement par Kubernetes, même en l'absence de spécification explicite."
    ],
    "explain": "Selon la documentation, les PersistentVolumes créés dynamiquement par une StorageClass héritent de la reclaim policy spécifiée dans le champ `reclaimPolicy` de la classe, qui peut être `Delete` ou `Retain`. Si aucune `reclaimPolicy` n'est spécifiée à la création de l'objet StorageClass, elle vaut `Delete` par défaut.",
    "ref": "https://kubernetes.io/docs/concepts/storage/storage-classes/#reclaim-policy",
    "en": {
      "q": "If the `reclaimPolicy` field is not specified when creating a StorageClass object, which policy is applied by default?",
      "choices": [
        "Retain",
        "Delete",
        "Recycle",
        "No policy is applied until one is explicitly set"
      ]
    }
  },
  {
    "id": "t3-s5",
    "domain": "storage",
    "difficulty": "hard",
    "q": "Dans le `spec` d'une PersistentVolumeClaim, que produit `storageClassName: \"\"` (chaîne vide) ?",
    "choices": [
      "Cela désactive le provisioning dynamique pour cette PVC : elle ne peut être liée qu'à un PV existant sans StorageClass",
      "Cela sélectionne la StorageClass marquée par défaut (annotation is-default-class)",
      "Cela provoque une erreur de validation au moment de la création de la PVC",
      "Cela équivaut à omettre complètement le champ `storageClassName`"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation précise que les claims demandant la classe `\"\"` désactivent effectivement le provisioning dynamique pour elles-mêmes.",
      "Sélectionner la StorageClass par défaut correspond à ne PAS renseigner `storageClassName` du tout, pas à y mettre une chaîne vide.",
      "`storageClassName: \"\"` est une valeur valide et documentée ; elle ne déclenche pas d'erreur de validation.",
      "Omettre le champ et y mettre une chaîne vide ont des effets différents : l'omission peut déclencher la StorageClass par défaut du cluster, tandis que `\"\"` désactive explicitement le provisioning dynamique."
    ],
    "explain": "La documentation indique que les claims demandant la classe `\"\"` désactivent effectivement le provisioning dynamique pour elles-mêmes. Autrement dit, une PVC avec `storageClassName: \"\"` doit être liée manuellement à un PV existant sans classe de stockage — c'est différent d'omettre le champ, ce qui peut déclencher l'utilisation de la StorageClass par défaut du cluster si une annotation `is-default-class` est présente sur une StorageClass.",
    "ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#class-1",
    "en": {
      "q": "In the `spec` of a PersistentVolumeClaim, what does `storageClassName: \"\"` (empty string) do?",
      "choices": [
        "It disables dynamic provisioning for that PVC: it can only bind to an existing PV with no StorageClass",
        "It selects the StorageClass marked as default (is-default-class annotation)",
        "It causes a validation error when the PVC is created",
        "It is equivalent to omitting the `storageClassName` field entirely"
      ]
    }
  },
  {
    "id": "t3-s6",
    "domain": "storage",
    "difficulty": "medium",
    "q": "Dans un StatefulSet, à quoi sert le champ `.spec.volumeClaimTemplates` ?",
    "choices": [
      "Il crée automatiquement une PersistentVolumeClaim dédiée pour chaque Pod du StatefulSet, fournissant un stockage stable et persistant",
      "Il définit un unique PersistentVolume partagé en lecture-écriture par tous les Pods du StatefulSet",
      "Il remplace la nécessité de définir des `volumeMounts` dans les conteneurs du Pod",
      "Il configure uniquement des volumes `emptyDir` éphémères pour chaque Pod"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation précise que `.spec.volumeClaimTemplates` permet de créer une PersistentVolumeClaim fournissant un stockage stable au StatefulSet.",
      "Chaque Pod du StatefulSet obtient sa propre PVC générée à partir du template ; ce n'est pas un volume unique partagé par tous les Pods.",
      "Les `volumeMounts` restent nécessaires dans la spec du conteneur pour monter le volume issu de la PVC ; `volumeClaimTemplates` ne les remplace pas.",
      "`volumeClaimTemplates` génère des PersistentVolumeClaims, donc un stockage persistant, et non des volumes éphémères de type `emptyDir`."
    ],
    "explain": "Le champ `.spec.volumeClaimTemplates` d'un StatefulSet permet de créer une PersistentVolumeClaim pour fournir un stockage stable au StatefulSet, à condition que la StorageClass indiquée utilise le provisioning dynamique, ou qu'un PV correspondant existe déjà avec suffisamment d'espace disponible. Chaque Pod du StatefulSet reçoit sa propre PVC générée à partir du template, ce qui, combiné aux identifiants stables des Pods, facilite le rattachement des volumes existants aux Pods de remplacement en cas de défaillance.",
    "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#volume-claim-templates",
    "en": {
      "q": "In a StatefulSet, what does the `.spec.volumeClaimTemplates` field do?",
      "choices": [
        "It automatically creates a dedicated PersistentVolumeClaim for each Pod in the StatefulSet, providing stable, persistent storage",
        "It defines a single PersistentVolume shared read-write by all Pods in the StatefulSet",
        "It removes the need to define `volumeMounts` in the Pod's containers",
        "It only configures ephemeral `emptyDir` volumes for each Pod"
      ]
    }
  },
  {
    "id": "t3-t1",
    "domain": "troubleshooting",
    "difficulty": "easy",
    "q": "Selon la documentation Kubernetes, que signifie la phase (status.phase) « Running » d'un Pod ?",
    "choices": [
      "Le Pod a été lié (bound) à un nœud et tous ses conteneurs ont été créés ; au moins un conteneur est en cours d'exécution, ou en train de démarrer/redémarrer.",
      "Le Pod a été accepté par le cluster, mais un ou plusieurs conteneurs n'ont pas encore été configurés et rendus prêts à s'exécuter.",
      "Tous les conteneurs du Pod se sont terminés avec succès et ne seront pas redémarrés.",
      "L'état du Pod n'a pas pu être obtenu, généralement à cause d'une erreur de communication avec le nœud."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : c'est la définition exacte de la valeur « Running » donnée par la documentation.",
      "C'est la définition de la phase « Pending », pas « Running ».",
      "C'est la définition de la phase « Succeeded », pas « Running ».",
      "C'est la définition de la phase « Unknown », pas « Running »."
    ],
    "explain": "Le champ status.phase d'un Pod est un résumé de haut niveau, avec 5 valeurs possibles : Pending, Running, Succeeded, Failed, Unknown. « Running » signifie que le Pod est lié à un nœud, que tous ses conteneurs ont été créés, et qu'au moins un est en cours d'exécution ou en train de démarrer/redémarrer. La documentation précise aussi que CrashLoopBackOff et Terminating sont des valeurs affichées par kubectl dans le champ Status (pour l'intuition de l'utilisateur), et ne doivent pas être confondues avec la phase officielle du Pod.",
    "ref": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-phase",
    "en": {
      "q": "According to the Kubernetes documentation, what does the Pod phase (status.phase) \"Running\" mean?",
      "choices": [
        "The Pod has been bound to a node, and all of its containers have been created; at least one container is still running, or is in the process of starting or restarting.",
        "The Pod has been accepted by the cluster, but one or more containers have not yet been set up and made ready to run.",
        "All containers in the Pod have terminated in success and will not be restarted.",
        "The state of the Pod could not be obtained, typically due to an error communicating with the node."
      ]
    }
  },
  {
    "id": "t3-t2",
    "domain": "troubleshooting",
    "difficulty": "medium",
    "q": "Un Pod a restartPolicy: OnFailure. Que se passe-t-il si un de ses conteneurs se termine avec le code de sortie 0 (succès) ?",
    "choices": [
      "Le conteneur n'est pas redémarré.",
      "Le conteneur est redémarré automatiquement, comme avec Always.",
      "Le Pod entier passe immédiatement en phase Failed.",
      "Le kubelet redémarre le conteneur uniquement si restartPolicy vaut Never."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : d'après le tableau de comportement de la documentation, avec OnFailure et un exit code 0 (succès), le conteneur ne redémarre pas.",
      "C'est le comportement de restartPolicy: Always, pas OnFailure : Always redémarre le conteneur quel que soit le code de sortie.",
      "La documentation ne décrit pas ce comportement ; le champ restartPolicy s'applique aux conteneurs, pas à un passage automatique du Pod en Failed sur un exit code 0.",
      "Avec restartPolicy: Never, le conteneur n'est jamais redémarré automatiquement, quel que soit le code de sortie ; ce n'est pas une condition pour OnFailure."
    ],
    "explain": "Le spec d'un Pod a un champ restartPolicy avec les valeurs possibles Always, OnFailure et Never (valeur par défaut : Always). D'après le tableau « Restart behavior comparison » de la documentation, pour un exit code 0 (Success) : Always redémarre le conteneur, OnFailure ne le redémarre pas, et Never ne le redémarre pas non plus. Pour un exit code non nul (Failure), Always et OnFailure redémarrent le conteneur, tandis que Never ne le redémarre pas.",
    "ref": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy",
    "en": {
      "q": "A Pod has restartPolicy: OnFailure. What happens if one of its containers terminates with exit code 0 (success)?",
      "choices": [
        "The container is not restarted.",
        "The container is automatically restarted, just like with Always.",
        "The whole Pod immediately transitions to the Failed phase.",
        "The kubelet only restarts the container if restartPolicy is Never."
      ]
    }
  },
  {
    "id": "t3-t3",
    "domain": "troubleshooting",
    "difficulty": "medium",
    "q": "D'après la documentation, quelles informations kubectl affiche-t-il lorsqu'un conteneur est dans l'état (state) Terminated ?",
    "choices": [
      "Une raison (reason), un code de sortie (exit code), ainsi que les heures de début et de fin d'exécution du conteneur.",
      "Uniquement le nom de l'image du conteneur et son ID.",
      "Le nombre de redémarrages restants avant que le conteneur ne passe en CrashLoopBackOff.",
      "La quantité de mémoire encore allouée au conteneur au moment de sa terminaison."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation indique explicitement qu'en interrogeant un Pod dont un conteneur est Terminated, on voit une reason, un exit code, ainsi que les heures de début et de fin.",
      "L'état Terminated donne bien plus que le nom d'image et l'ID : reason, exit code et horodatages.",
      "La documentation ne décrit pas de compteur de redémarrages restants associé à l'état Terminated.",
      "La documentation ne mentionne pas d'information sur la mémoire allouée dans l'état Terminated."
    ],
    "explain": "Un conteneur dans l'état Terminated a démarré son exécution puis soit s'est terminé avec succès, soit a échoué. La documentation précise que si le conteneur a un preStop hook configuré, celui-ci s'exécute avant que le conteneur n'entre dans l'état Terminated. Ces informations (reason, exitCode, startedAt, finishedAt) sont visibles via kubectl, notamment dans le champ lastState.terminated d'un kubectl describe pod ou d'un kubectl get pod -o yaml.",
    "ref": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-state-terminated",
    "en": {
      "q": "According to the documentation, what information does kubectl display when a container is in the Terminated state?",
      "choices": [
        "A reason, an exit code, and the start and finish time for that container's period of execution.",
        "Only the container image name and its ID.",
        "The number of restarts remaining before the container enters CrashLoopBackOff.",
        "The amount of memory still allocated to the container at the time it terminated."
      ]
    }
  },
  {
    "id": "t3-t4",
    "domain": "troubleshooting",
    "difficulty": "hard",
    "q": "Le champ terminationMessagePolicy d'un conteneur est réglé sur FallbackToLogsOnError. Quel est le comportement décrit par la documentation ?",
    "choices": [
      "Si le fichier de message de terminaison est vide et que le conteneur s'est terminé en erreur, Kubernetes utilise le dernier fragment des logs du conteneur (limité à 2048 octets ou 80 lignes, la plus petite des deux valeurs).",
      "Kubernetes ignore complètement terminationMessagePath et utilise toujours les logs du conteneur, même en cas de succès.",
      "Kubernetes écrit automatiquement les logs du conteneur dans /dev/termination-log à chaque redémarrage, qu'il y ait erreur ou non.",
      "Le kubelet applique un backoff exponentiel plus court avant de redémarrer le conteneur lorsque la policy vaut FallbackToLogsOnError."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : c'est exactement le comportement décrit — fallback vers les logs, limité à 2048 octets ou 80 lignes, uniquement si le fichier de message est vide et qu'il y a eu une erreur.",
      "La policy File reste utilisée en priorité ; le fallback vers les logs n'intervient que si le fichier est vide ET que le conteneur s'est terminé en erreur, pas systématiquement.",
      "La documentation ne décrit pas d'écriture automatique des logs dans /dev/termination-log ; c'est au conteneur d'écrire ce fichier lui-même si besoin.",
      "terminationMessagePolicy ne modifie pas le comportement de backoff des redémarrages ; ce sont deux mécanismes distincts."
    ],
    "explain": "Kubernetes récupère les messages de terminaison depuis le fichier indiqué par terminationMessagePath (par défaut /dev/termination-log, non modifiable après le lancement du Pod). Le champ terminationMessagePolicy vaut par défaut File (message récupéré uniquement depuis ce fichier). En le réglant sur FallbackToLogsOnError, Kubernetes utilise le dernier fragment des logs du conteneur si le fichier de message est vide et que le conteneur s'est terminé en erreur, ce fragment étant limité à 2048 octets ou 80 lignes. Par ailleurs, chaque message de terminaison est tronqué au-delà de 4096 octets, et la taille totale pour tous les conteneurs d'un Pod est limitée à 12 KiB, répartie équitablement.",
    "ref": "https://kubernetes.io/docs/tasks/debug/debug-application/determine-reason-pod-failure/#customizing-the-termination-message",
    "en": {
      "q": "A container's terminationMessagePolicy is set to FallbackToLogsOnError. What behavior does the documentation describe?",
      "choices": [
        "If the termination message file is empty and the container exited with an error, Kubernetes uses the last chunk of the container's log output (limited to 2048 bytes or 80 lines, whichever is smaller).",
        "Kubernetes completely ignores terminationMessagePath and always uses the container logs, even on success.",
        "Kubernetes automatically writes the container's logs to /dev/termination-log on every restart, regardless of error.",
        "The kubelet applies a shorter exponential backoff before restarting the container when the policy is FallbackToLogsOnError."
      ]
    }
  },
  {
    "id": "t3-t5",
    "domain": "troubleshooting",
    "difficulty": "easy",
    "q": "Un Pod myapp contient plusieurs conteneurs. Quelle commande, documentée dans le guide de débogage des Pods, affiche les logs du conteneur nommé sidecar ?",
    "choices": [
      "kubectl logs myapp -c sidecar",
      "kubectl logs myapp --container-name=sidecar",
      "kubectl describe pod myapp -c sidecar",
      "kubectl exec myapp -c sidecar -- logs"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : c'est exactement la syntaxe documentée, kubectl logs ${POD_NAME} -c ${CONTAINER_NAME}, pour examiner les logs d'un conteneur précis.",
      "--container-name n'est pas le nom du flag documenté pour kubectl logs ; le flag court est -c.",
      "kubectl describe pod n'accepte pas de flag -c pour cibler un conteneur et n'affiche pas les logs applicatifs.",
      "kubectl exec sert à exécuter une commande dans le conteneur, pas à récupérer ses logs ; ce n'est pas la commande documentée pour examiner les logs."
    ],
    "explain": "La première étape recommandée pour déboguer un Pod qui s'exécute mais se comporte mal est d'examiner les logs du conteneur affecté avec kubectl logs ${POD_NAME} -c ${CONTAINER_NAME}. Le flag -c (--container) permet de cibler un conteneur précis dans un Pod multi-conteneurs.",
    "ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#examine-pod-logs",
    "en": {
      "q": "A Pod myapp contains several containers. Which command, as documented in the Pod debugging guide, shows the logs of the container named sidecar?",
      "choices": [
        "kubectl logs myapp -c sidecar",
        "kubectl logs myapp --container-name=sidecar",
        "kubectl describe pod myapp -c sidecar",
        "kubectl exec myapp -c sidecar -- logs"
      ]
    }
  },
  {
    "id": "t3-t6",
    "domain": "troubleshooting",
    "difficulty": "medium",
    "q": "Vous exécutez kubectl debug -it ephemeral-demo --image=busybox:1.28 --target=ephemeral-demo sur un Pod dont le conteneur d'origine ne partage pas l'espace de noms de processus. Que fait le paramètre --target ici, selon la documentation ?",
    "choices": [
      "Il fait cibler par le conteneur éphémère l'espace de noms de processus (process namespace) du conteneur nommé, ce qui est nécessaire car kubectl run n'active pas le partage de l'espace de noms de processus par défaut.",
      "Il définit le nœud sur lequel le conteneur de débogage doit être planifié.",
      "Il indique l'image cible à utiliser pour le conteneur de débogage.",
      "Il force le conteneur ciblé à redémarrer avant d'attacher le conteneur de débogage."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation précise que --target cible l'espace de noms de processus d'un autre conteneur, nécessaire ici car kubectl run n'active pas le partage de l'espace de noms de processus dans le Pod qu'il crée.",
      "--target ne concerne pas le placement sur un nœud ; ce n'est pas un flag de scheduling.",
      "L'image du conteneur de débogage est fournie par --image, pas par --target.",
      "La documentation ne décrit aucun redémarrage forcé du conteneur ciblé par --target."
    ],
    "explain": "Les conteneurs éphémères (ephemeral containers, stables depuis Kubernetes v1.25) sont utiles pour le débogage interactif quand kubectl exec est insuffisant, par exemple si le conteneur a planté ou si son image ne contient pas d'utilitaires de débogage (images distroless). La documentation illustre le flag --target avec kubectl debug -it ephemeral-demo --image=busybox:1.28 --target=ephemeral-demo : ce paramètre cible l'espace de noms de processus d'un autre conteneur, ce qui est nécessaire ici car kubectl run n'active pas le partage de l'espace de noms de processus. Le --target doit être supporté par le container runtime ; sinon, le conteneur éphémère peut ne pas démarrer, ou démarrer avec un espace de noms de processus isolé.",
    "ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#ephemeral-container",
    "en": {
      "q": "You run kubectl debug -it ephemeral-demo --image=busybox:1.28 --target=ephemeral-demo on a Pod whose original container does not share the process namespace. What does the --target parameter do here, according to the documentation?",
      "choices": [
        "It makes the ephemeral container target the process namespace of the named container, which is necessary here because kubectl run does not enable process namespace sharing by default.",
        "It sets the node on which the debug container should be scheduled.",
        "It specifies the target image to use for the debug container.",
        "It forces the targeted container to restart before the debug container is attached."
      ]
    }
  },
  {
    "id": "t3-t7",
    "domain": "troubleshooting",
    "difficulty": "medium",
    "q": "Que fait l'option --copy-to de kubectl debug, par exemple kubectl debug myapp -it --image=ubuntu --share-processes --copy-to=myapp-debug ?",
    "choices": [
      "Elle crée une copie du Pod (ici nommée myapp-debug) à laquelle un nouveau conteneur de débogage est ajouté, sans modifier le Pod original.",
      "Elle copie les logs du Pod myapp vers un nouveau Pod myapp-debug.",
      "Elle duplique le Pod myapp sur tous les nœuds du cluster pour comparer leur comportement.",
      "Elle remplace en place le conteneur du Pod myapp par l'image ubuntu, sans créer de nouveau Pod."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation décrit --copy-to comme créant une copie du Pod à laquelle un nouveau conteneur de débogage est ajouté, laissant le Pod original intact.",
      "--copy-to crée un Pod, il ne s'agit pas d'une copie de logs.",
      "La documentation ne décrit aucune duplication sur tous les nœuds du cluster.",
      "--copy-to crée justement un nouveau Pod séparé au lieu de modifier en place le Pod original."
    ],
    "explain": "Ajouter un nouveau conteneur via une copie du Pod est utile quand l'application tourne mais se comporte mal et qu'on veut ajouter des utilitaires de débogage absents de l'image d'origine (par exemple une image basée sur busybox). La commande kubectl debug myapp -it --image=ubuntu --share-processes --copy-to=myapp-debug crée une copie de myapp nommée myapp-debug avec un nouveau conteneur Ubuntu ajouté. Le flag -i attache automatiquement la session au nouveau conteneur (désactivable avec --attach=false), et --share-processes permet aux conteneurs de ce Pod de voir les processus des autres conteneurs. La documentation rappelle qu'il faut ensuite nettoyer manuellement avec kubectl delete pod myapp myapp-debug.",
    "ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#copying-a-pod-while-adding-a-new-container",
    "en": {
      "q": "What does the --copy-to option of kubectl debug do, for example kubectl debug myapp -it --image=ubuntu --share-processes --copy-to=myapp-debug ?",
      "choices": [
        "It creates a copy of the Pod (here named myapp-debug) with a new debugging container added to it, without modifying the original Pod.",
        "It copies the logs of the myapp Pod into a new myapp-debug Pod.",
        "It duplicates the myapp Pod onto every node in the cluster to compare their behavior.",
        "It replaces the container of the myapp Pod in place with the ubuntu image, without creating a new Pod."
      ]
    }
  },
  {
    "id": "t3-t8",
    "domain": "troubleshooting",
    "difficulty": "medium",
    "q": "Que fait la commande kubectl debug node/mynode -it --image=ubuntu d'après la documentation ?",
    "choices": [
      "Elle crée un Pod de débogage planifié sur le nœud mynode et ouvre un shell interactif, avec le système de fichiers racine du nœud monté sous /host.",
      "Elle ouvre un shell directement dans le processus du kubelet de mynode, sans créer de nouveau Pod.",
      "Elle redémarre le nœud mynode en mode maintenance (single-user mode).",
      "Elle liste tous les Pods en erreur actuellement planifiés sur le nœud mynode."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation décrit exactement ce comportement — un Pod de débogage est créé sur le nœud, avec le système de fichiers racine du nœud monté sous /host.",
      "Aucun shell n'est ouvert dans le kubelet lui-même ; kubectl debug node/<node> crée bien un nouveau Pod sur ce nœud.",
      "La documentation ne décrit aucun redémarrage du nœud ; il s'agit uniquement de créer un Pod de débogage.",
      "Ce n'est pas une commande de listing de Pods en erreur ; elle sert à obtenir un shell interactif sur le nœud."
    ],
    "explain": "Quand aucune autre approche de débogage ne fonctionne, on peut trouver le nœud sur lequel le Pod s'exécute et créer un Pod qui tourne sur ce nœud. La commande kubectl debug node/mynode -it --image=ubuntu crée un Pod de débogage (nommé automatiquement à partir du nom du nœud, par exemple node-debugger-mynode-pdx84) et ouvre une session interactive. Le système de fichiers racine du nœud est monté sous /host, et le conteneur s'exécute dans les espaces de noms IPC, réseau et PID de l'hôte, mais le Pod n'est pas privilégié (certaines informations de processus peuvent donc être inaccessibles, et chroot /host peut échouer) — pour un Pod privilégié, il faut utiliser le flag --profile=sysadmin. Il faut penser à supprimer le Pod de débogage une fois le travail terminé.",
    "ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#node-shell-session",
    "en": {
      "q": "What does the command kubectl debug node/mynode -it --image=ubuntu do, according to the documentation?",
      "choices": [
        "It creates a debugging Pod scheduled on the mynode node and opens an interactive shell, with the node's root filesystem mounted at /host.",
        "It opens a shell directly inside the kubelet process on mynode, without creating a new Pod.",
        "It reboots the mynode node into maintenance (single-user) mode.",
        "It lists every failing Pod currently scheduled on the mynode node."
      ]
    }
  },
  {
    "id": "t3-t9",
    "domain": "troubleshooting",
    "difficulty": "easy",
    "q": "D'après le kubectl Quick Reference, à quoi sert l'option -o wide sur kubectl get pods ?",
    "choices": [
      "Elle liste tous les Pods du namespace courant avec davantage de détails (more details).",
      "Elle affiche uniquement les Pods en erreur, avec la raison de l'erreur.",
      "Elle exporte la liste des Pods au format YAML complet.",
      "Elle liste les Pods de tous les namespaces du cluster."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : c'est exactement le commentaire donné dans la documentation pour kubectl get pods -o wide.",
      "-o wide ne filtre pas sur les Pods en erreur ; elle liste tous les Pods avec plus de colonnes.",
      "Le format YAML complet s'obtient avec -o yaml, pas -o wide.",
      "Lister tous les namespaces se fait avec --all-namespaces, un flag distinct de -o wide."
    ],
    "explain": "Le kubectl Quick Reference documente kubectl get pods -o wide avec le commentaire « List all pods in the current namespace, with more details ». C'est un format de sortie différent de -o yaml (YAML complet) ou de --all-namespaces (qui liste les Pods de tous les namespaces).",
    "ref": "https://kubernetes.io/docs/reference/kubectl/quick-reference/#viewing-and-finding-resources",
    "en": {
      "q": "According to the kubectl Quick Reference, what does the -o wide option do on kubectl get pods ?",
      "choices": [
        "It lists all Pods in the current namespace, with more details.",
        "It shows only failing Pods, along with the failure reason.",
        "It exports the full list of Pods in YAML format.",
        "It lists Pods across every namespace in the cluster."
      ]
    }
  },
  {
    "id": "t3-t10",
    "domain": "troubleshooting",
    "difficulty": "easy",
    "q": "À quoi sert la commande kubectl explain pods, selon le kubectl Quick Reference ?",
    "choices": [
      "Elle affiche la documentation des champs du manifeste (manifest) pour la ressource Pod.",
      "Elle affiche la liste de tous les Pods existants avec une explication de leur état.",
      "Elle génère automatiquement un manifeste YAML vide prêt à être rempli pour un nouveau Pod.",
      "Elle explique pourquoi un Pod donné est actuellement en phase Pending."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : c'est exactement le commentaire de la documentation, « get the documentation for pod manifests ».",
      "kubectl explain ne liste pas les Pods existants ; c'est kubectl get pods qui fait cela.",
      "kubectl explain documente les champs, mais ne génère pas de manifeste YAML prêt à l'emploi.",
      "kubectl explain ne diagnostique pas un Pod précis ; pour cela on utilise plutôt kubectl describe pod."
    ],
    "explain": "Le kubectl Quick Reference liste kubectl explain pods avec le commentaire « get the documentation for pod manifests », dans la section consacrée à la visualisation et à la recherche de ressources (Viewing and finding resources). C'est un outil de référence sur les champs d'un type de ressource, à ne pas confondre avec kubectl get ou kubectl describe qui portent sur des objets réels du cluster.",
    "ref": "https://kubernetes.io/docs/reference/kubectl/quick-reference/#viewing-and-finding-resources",
    "en": {
      "q": "What does the kubectl explain pods command do, according to the kubectl Quick Reference?",
      "choices": [
        "It shows the documentation for the fields of the Pod manifest.",
        "It lists all existing Pods along with an explanation of their state.",
        "It automatically generates an empty YAML manifest ready to be filled in for a new Pod.",
        "It explains why a given Pod is currently in the Pending phase."
      ]
    }
  },
  {
    "id": "t3-t11",
    "domain": "troubleshooting",
    "difficulty": "medium",
    "q": "Quelle commande, documentée dans le kubectl Quick Reference, liste les Pods triés par leur nombre de redémarrages (restart count) ?",
    "choices": [
      "kubectl get pods --sort-by='.status.containerStatuses[0].restartCount'",
      "kubectl get pods --sort-by=restarts",
      "kubectl top pods --sort-by=restartCount",
      "kubectl get events --sort-by=.status.restartCount"
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : c'est exactement l'exemple de commande donné par la documentation pour trier les Pods par restart count, via une expression JSONPath.",
      "restarts n'est pas un nom de champ valide pour --sort-by dans la documentation ; il faut une expression JSONPath comme .status.containerStatuses[0].restartCount.",
      "kubectl top ne dispose pas de flag --sort-by documenté dans cette section ; c'est kubectl get qui l'utilise.",
      "La documentation illustre --sort-by sur kubectl get services, kubectl get pods et kubectl get pv, pas sur kubectl get events pour le restartCount."
    ],
    "explain": "La section « Viewing and finding resources » du kubectl Quick Reference documente plusieurs exemples de tri avec --sort-by, en utilisant une expression JSONPath : kubectl get services --sort-by=.metadata.name pour trier les Services par nom, kubectl get pods --sort-by='.status.containerStatuses[0].restartCount' pour trier les Pods par nombre de redémarrages, et kubectl get pv --sort-by=.spec.capacity.storage pour trier les PersistentVolumes par capacité.",
    "ref": "https://kubernetes.io/docs/reference/kubectl/quick-reference/#viewing-and-finding-resources",
    "en": {
      "q": "Which command, documented in the kubectl Quick Reference, lists Pods sorted by their restart count?",
      "choices": [
        "kubectl get pods --sort-by='.status.containerStatuses[0].restartCount'",
        "kubectl get pods --sort-by=restarts",
        "kubectl top pods --sort-by=restartCount",
        "kubectl get events --sort-by=.status.restartCount"
      ]
    }
  },
  {
    "id": "t3-t12",
    "domain": "troubleshooting",
    "difficulty": "medium",
    "q": "Selon la documentation, d'où kubectl top node et kubectl top pod obtiennent-ils leurs métriques CPU/mémoire ?",
    "choices": [
      "Du metrics-server, léger et en mémoire, qui interroge le kubelet de chaque nœud et expose les métriques agrégées via l'API metrics.k8s.io.",
      "Directement du serveur API Kubernetes, qui stocke en base les métriques historiques de chaque conteneur.",
      "D'un agent Prometheus installé par défaut sur chaque nœud du cluster.",
      "Du plan de contrôle (etcd), qui journalise l'utilisation CPU/mémoire de chaque Pod."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation décrit précisément ce pipeline — metrics-server interroge chaque kubelet et expose les métriques agrégées via l'API metrics.k8s.io.",
      "Le serveur API Kubernetes ne stocke pas d'historique de métriques de conteneurs ; c'est le rôle du metrics-server (données en mémoire, court terme) et non du plan de contrôle.",
      "La documentation ne mentionne pas Prometheus comme composant par défaut du pipeline de métriques de ressources ; Prometheus relève du « full metrics pipeline », hors du périmètre documenté ici.",
      "etcd n'est pas mentionné comme source de métriques CPU/mémoire dans le pipeline de métriques de ressources documenté."
    ],
    "explain": "Le « resource metrics pipeline » fournit un ensemble limité de métriques (utilisées notamment par le Horizontal Pod Autoscaler et par kubectl top), collectées par le metrics-server, léger, en mémoire et à court terme, et exposées via l'API metrics.k8s.io. Le metrics-server découvre tous les nœuds du cluster et interroge le kubelet de chaque nœud pour l'usage CPU et mémoire ; le kubelet récupère lui-même les statistiques d'usage des conteneurs via l'interface du container runtime (ou via cAdvisor si le runtime ne les publie pas), puis expose les statistiques agrégées par Pod via l'API Resource Metrics.",
    "ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-usage-monitoring/#resource-metrics-pipeline",
    "en": {
      "q": "According to the documentation, where do kubectl top node and kubectl top pod get their CPU/memory metrics from?",
      "choices": [
        "From the lightweight, in-memory metrics-server, which queries each node's kubelet and exposes aggregated metrics via the metrics.k8s.io API.",
        "Directly from the Kubernetes API server, which stores historical metrics for every container in a database.",
        "From a Prometheus agent installed by default on every node in the cluster.",
        "From the control plane (etcd), which logs CPU/memory usage for every Pod."
      ]
    }
  },
  {
    "id": "t3-t13",
    "domain": "troubleshooting",
    "difficulty": "hard",
    "q": "Dans un exemple de la documentation, kubectl describe node kube-worker-1 montre les conditions MemoryPressure, DiskPressure, PIDPressure et Ready toutes à Unknown, avec la raison NodeStatusUnknown et le message « Kubelet stopped posting node status ». Que faut-il en déduire d'après la documentation ?",
    "choices": [
      "Le kubelet du nœud a cessé de communiquer son statut à l'apiserver ; toutes les conditions du nœud (pas seulement Ready) basculent alors à Unknown, ce qui correspond au scénario d'un nœud injoignable/down.",
      "Le nœud manque réellement de mémoire, d'espace disque et de PID disponibles au moment de l'observation.",
      "Il s'agit d'un état normal et transitoire qui n'a aucun impact sur les Pods planifiés sur ce nœud.",
      "Ces conditions Unknown signifient que le nœud a été mis en cordon (kubectl cordon) manuellement par un administrateur."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : la documentation présente cet exemple précisément comme un cas de débogage d'un nœud down/injoignable, où le kubelet a cessé de poster son statut, faisant basculer toutes les conditions à Unknown.",
      "Unknown signifie que l'état n'a pas pu être déterminé (faute de rapport du kubelet), pas que le nœud manque réellement de ces ressources — ce serait plutôt un status True pour une pression réelle.",
      "La documentation précise au contraire que les Pods sur ce nœud sont évincés après cinq minutes de statut NotReady, ce qui a un impact réel.",
      "La documentation associe cet exemple à un nœud déconnecté du réseau ou dont le kubelet est mort, pas à une action manuelle de cordon."
    ],
    "explain": "La documentation illustre le débogage d'un nœud down ou injoignable avec kubectl describe node : quand le kubelet cesse de poster son statut (nœud déconnecté du réseau, ou kubelet qui meurt et ne redémarre pas), les conditions NetworkUnavailable, MemoryPressure, DiskPressure, PIDPressure et Ready passent à Unknown, avec la raison NodeStatusUnknown et le message « Kubelet stopped posting node status ». Le nœud apparaît alors NotReady dans kubectl get nodes, et les Pods qui y tournent sont évincés après cinq minutes de statut NotReady.",
    "ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/#example-debugging-a-down-unreachable-node",
    "en": {
      "q": "In a documentation example, kubectl describe node kube-worker-1 shows the MemoryPressure, DiskPressure, PIDPressure and Ready conditions all as Unknown, with reason NodeStatusUnknown and message \"Kubelet stopped posting node status\". What should you conclude, per the documentation?",
      "choices": [
        "The node's kubelet has stopped reporting its status to the apiserver; all node conditions (not just Ready) flip to Unknown, matching the scenario of a down/unreachable node.",
        "The node is genuinely short on memory, disk space, and available PIDs at the time of observation.",
        "This is a normal, transient state with no impact on the Pods scheduled on that node.",
        "These Unknown conditions mean the node was manually cordoned (kubectl cordon) by an administrator."
      ]
    }
  },
  {
    "id": "t3-t14",
    "domain": "troubleshooting",
    "difficulty": "hard",
    "q": "Comment la documentation recommande-t-elle de capturer et d'analyser le trafic réseau d'un nœud ou d'un Pod pour déboguer un problème réseau, avec kubectl debug ?",
    "choices": [
      "En lançant une session de débogage avec kubectl debug --profile=sysadmin node/<NODE_NAME> -it --image=ubuntu:latest (ou pod/<POD_NAME>), puis en installant et en exécutant tcpdump à l'intérieur du conteneur de débogage.",
      "En activant l'option --capture-traffic de kubectl logs, qui enregistre automatiquement les paquets réseau du Pod.",
      "En utilisant kubectl exec avec l'option --network-trace pour streamer le trafic réseau du conteneur.",
      "En consultant directement les métriques metrics.k8s.io exposées par metrics-server, qui incluent le trafic réseau par Pod."
    ],
    "correct": [
      0
    ],
    "why": [
      "Correct : c'est exactement la procédure décrite dans la documentation, avec le flag --profile=sysadmin puis l'installation et l'exécution de tcpdump.",
      "kubectl logs ne possède pas de flag --capture-traffic documenté ; ce n'est pas la méthode décrite.",
      "kubectl exec ne possède pas de flag --network-trace documenté pour capturer du trafic réseau.",
      "La documentation précise explicitement que le pipeline de métriques de ressources (metrics.k8s.io via metrics-server) ne couvre que le CPU et la mémoire, pas le trafic réseau."
    ],
    "explain": "Pour capturer et analyser le trafic réseau lors du débogage de problèmes de connectivité, de résolution DNS ou de comportement réseau inattendu, la documentation recommande d'utiliser kubectl debug avec le flag --profile=sysadmin sur un nœud (kubectl debug --profile=sysadmin node/${NODE_NAME} -it --image=ubuntu:latest) ou sur un Pod (kubectl debug --profile=sysadmin pod/${POD_NAME} -n ${NAMESPACE} -it --image=ubuntu:latest), puis d'installer et d'exécuter tcpdump à l'intérieur du conteneur de débogage. Il faut penser à supprimer le Pod de débogage une fois terminé.",
    "ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#capturing-and-analyzing-node-pod-traffic",
    "en": {
      "q": "How does the documentation recommend capturing and analyzing network traffic on a node or Pod to debug a networking issue, using kubectl debug ?",
      "choices": [
        "By starting a debugging session with kubectl debug --profile=sysadmin node/<NODE_NAME> -it --image=ubuntu:latest (or pod/<POD_NAME>), then installing and running tcpdump inside the debug container.",
        "By enabling the --capture-traffic option of kubectl logs, which automatically records the Pod's network packets.",
        "By using kubectl exec with the --network-trace option to stream the container's network traffic.",
        "By directly querying the metrics.k8s.io metrics exposed by metrics-server, which include per-Pod network traffic."
      ]
    }
  }
];
  DATA.forEach((o) => Q.push(Object.assign({ type: "theory" }, o)));
  window.CKA._t3 = DATA.length;
})();
