// Lot 10 : +50 questions théoriques sourcées sur kubernetes.io (scan de la doc).
// Chaque question porte why[] par option, explain (synthèse) et ref (doc officielle),
// plus la traduction en:{q,choices}. Répartition par pondération CKA.
(function () {
  const Q = window.CKA.questions;
  const DATA = [
{
  "id": "t10-a1",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Depuis Kubernetes v1.22, comment un Pod obtient-il par défaut le token de son ServiceAccount, par rapport au comportement des versions antérieures à 1.22 ?",
  "choices": [
    "Kubernetes obtient un token court-vécu et auto-rotatif via la TokenRequest API, monté comme volume projeté ; avant 1.22, un token statique et long-vécu était fourni via un Secret",
    "Aucun changement n'a eu lieu, le comportement est identique depuis les débuts de Kubernetes",
    "Depuis 1.22, le token n'est plus monté du tout dans le Pod par défaut",
    "Depuis 1.22, le token est stocké en clair dans les variables d'environnement du conteneur"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « In v1.22 and later, Kubernetes gets a short-lived, automatically rotating token using the TokenRequest API and mounts the token as a projected volume » contre « In versions earlier than 1.22, Kubernetes provides a long-lived, static token to the Pod as a Secret. »",
    "Faux : il y a bien eu un changement de mécanisme documenté à partir de la 1.22.",
    "Faux : un token continue d'être monté par défaut, mais via un mécanisme différent (projected volume).",
    "Faux : le token n'est jamais exposé via des variables d'environnement par ce mécanisme, il est monté en fichier."
  ],
  "explain": "Depuis Kubernetes v1.22, le token de ServiceAccount monté par défaut dans un Pod est un token court-vécu, automatiquement renouvelé via la TokenRequest API et monté comme volume projeté, remplaçant l'ancien mécanisme de token statique stocké dans un Secret.",
  "ref": "https://kubernetes.io/docs/concepts/security/service-accounts/",
  "en": {
    "q": "Since Kubernetes v1.22, how does a Pod get its ServiceAccount token by default, compared to versions before 1.22?",
    "choices": [
      "Kubernetes gets a short-lived, auto-rotating token via the TokenRequest API, mounted as a projected volume; before 1.22, a long-lived static token was provided via a Secret",
      "No change has occurred, the behavior has been identical since Kubernetes' early days",
      "Since 1.22, the token is no longer mounted into the Pod at all by default",
      "Since 1.22, the token is stored in clear text in the container's environment variables"
    ]
  }
},
{
  "id": "t10-a10",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Concernant l'API Priority and Fairness (APF), que dit la documentation à propos des requêtes « long-running » (comme l'exécution de commande à distance ou le suivi de logs) ?",
  "choices": [
    "Elles sont soumises aux mêmes limites de concurrence que toutes les autres requêtes",
    "Elles ne sont PAS soumises au filtre API Priority and Fairness",
    "Elles sont automatiquement placées dans le PriorityLevelConfiguration de plus haute priorité",
    "Elles sont systématiquement rejetées par APF pour préserver les ressources du cluster"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est l'inverse, elles échappent justement à ce filtre.",
    "Vrai : la doc précise « Some requests classified as \"long-running\"—such as remote command execution or log tailing—are not subject to the API Priority and Fairness filter. »",
    "Faux : elles ne passent pas du tout par la classification de priorité d'APF, plutôt que d'être placées dans une priorité spécifique.",
    "Faux : APF ne rejette pas ces requêtes, il ne les filtre simplement pas."
  ],
  "explain": "Certaines requêtes qualifiées de « long-running » (exécution de commande distante via kubectl exec, suivi de logs, etc.) échappent entièrement au filtrage de l'API Priority and Fairness, qui ne s'applique donc pas à ce type de trafic.",
  "ref": "https://kubernetes.io/docs/concepts/cluster-administration/flow-control/",
  "en": {
    "q": "Regarding API Priority and Fairness (APF), what does the documentation say about \"long-running\" requests (such as remote command execution or log tailing)?",
    "choices": [
      "They are subject to the same concurrency limits as all other requests",
      "They are NOT subject to the API Priority and Fairness filter",
      "They are automatically placed in the highest-priority PriorityLevelConfiguration",
      "They are systematically rejected by APF to preserve cluster resources"
    ]
  }
},
{
  "id": "t10-a11",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Lors d'un upgrade de cluster avec kubeadm, sur quels nœuds exécute-t-on `kubeadm upgrade node` plutôt que `kubeadm upgrade apply` ?",
  "choices": [
    "Uniquement sur le tout premier nœud control-plane",
    "Sur les autres nœuds control-plane (après le premier) ET sur tous les nœuds workers",
    "Uniquement sur les nœuds workers, jamais sur un nœud control-plane",
    "kubeadm upgrade node et kubeadm upgrade apply sont strictement interchangeables sur n'importe quel nœud"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est justement l'inverse — kubeadm upgrade apply est réservé au premier nœud control-plane.",
    "Vrai : la doc précise « For the other control plane nodes, you should run kubeadm upgrade node instead of kubeadm upgrade apply » et « On worker nodes, run kubeadm upgrade node. »",
    "Faux : kubeadm upgrade node s'utilise aussi sur les nœuds control-plane additionnels, pas seulement sur les workers.",
    "Faux : les deux commandes ont des usages distincts et ne sont pas interchangeables."
  ],
  "explain": "`kubeadm upgrade apply` ne s'exécute que sur le premier nœud control-plane à mettre à niveau ; tous les autres nœuds — control-plane additionnels comme workers — utilisent ensuite `kubeadm upgrade node`.",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/",
  "en": {
    "q": "During a kubeadm cluster upgrade, on which nodes do you run `kubeadm upgrade node` instead of `kubeadm upgrade apply`?",
    "choices": [
      "Only on the very first control-plane node",
      "On the other control-plane nodes (after the first) AND on all worker nodes",
      "Only on worker nodes, never on a control-plane node",
      "kubeadm upgrade node and kubeadm upgrade apply are strictly interchangeable on any node"
    ]
  }
},
{
  "id": "t10-a12",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Parmi les contrôleurs d'admission suivants, lesquels font partie de la liste documentée comme activés PAR DÉFAUT sur le kube-apiserver ? (plusieurs réponses)",
  "choices": [
    "NamespaceLifecycle",
    "ResourceQuota",
    "PodSecurity",
    "DenyServiceExternalIPs"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Vrai : NamespaceLifecycle fait partie de la liste documentée des admission plugins activés par défaut.",
    "Vrai : ResourceQuota fait partie de la liste documentée des admission plugins activés par défaut.",
    "Vrai : PodSecurity (remplaçant de PodSecurityPolicy) fait partie de la liste documentée des admission plugins activés par défaut.",
    "Faux : DenyServiceExternalIPs n'apparaît pas dans la liste documentée des plugins activés par défaut."
  ],
  "explain": "La documentation liste les admission plugins activés par défaut sur un kube-apiserver récent, incluant notamment CertificateApproval, DefaultStorageClass, LimitRanger, MutatingAdmissionWebhook, NamespaceLifecycle, PodSecurity, Priority, ResourceQuota, RuntimeClass, ServiceAccount, ValidatingAdmissionPolicy et ValidatingAdmissionWebhook ; certains plugins existent mais ne sont pas activés par défaut et doivent être ajoutés explicitement via --enable-admission-plugins.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/",
  "en": {
    "q": "Which of the following admission controllers are part of the documented list of plugins enabled BY DEFAULT on the kube-apiserver? (select all that apply)",
    "choices": [
      "NamespaceLifecycle",
      "ResourceQuota",
      "PodSecurity",
      "DenyServiceExternalIPs"
    ]
  }
},
{
  "id": "t10-a2",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Quand l'accès anonyme est activé sur le kube-apiserver, quel username et quel groupe sont attribués à une requête non authentifiée par ailleurs ?",
  "choices": [
    "username: system:anonymous, groupe: system:unauthenticated",
    "username: anonymous, groupe: system:guests",
    "username: system:unauthenticated, groupe: system:anonymous",
    "Aucun username n'est attribué, la requête est simplement journalisée"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « requests that are not rejected by other configured authentication methods are treated as anonymous requests, and given a username of system:anonymous and a group of system:unauthenticated ».",
    "Faux : ce ne sont pas les noms documentés.",
    "Faux : c'est l'inverse — system:anonymous est le username, system:unauthenticated est le groupe.",
    "Faux : une requête anonyme reçoit bien une identité (username + groupe), elle n'est pas simplement journalisée sans identité."
  ],
  "explain": "Une requête acceptée comme anonyme (accès anonyme activé, aucune autre méthode d'authentification ne l'a rejetée) se voit attribuer le username system:anonymous et le groupe system:unauthenticated ; l'accès anonyme peut être désactivé via --anonymous-auth=false sur le kube-apiserver, et il est activé par défaut dès qu'un mode d'autorisation autre qu'AlwaysAllow est utilisé.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/authentication/",
  "en": {
    "q": "When anonymous access is enabled on the kube-apiserver, what username and group are assigned to a request not otherwise authenticated?",
    "choices": [
      "username: system:anonymous, group: system:unauthenticated",
      "username: anonymous, group: system:guests",
      "username: system:unauthenticated, group: system:anonymous",
      "No username is assigned, the request is simply logged"
    ]
  }
},
{
  "id": "t10-a3",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Sur un objet FlowSchema (API Priority and Fairness), le champ `matchingPrecedence` vaut 100 pour un FlowSchema A et 500 pour un FlowSchema B, tous deux pouvant matcher une requête donnée. Lequel est effectivement choisi ?",
  "choices": [
    "FlowSchema B, car une valeur numérique plus élevée l'emporte",
    "FlowSchema A, car une valeur numérique plus basse est considérée comme logiquement la plus haute précédence",
    "Les deux s'appliquent simultanément, leurs règles sont fusionnées",
    "Aucun des deux, car matchingPrecedence doit être strictement égal entre FlowSchemas concurrents"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est l'inverse — une valeur plus basse l'emporte, pas plus élevée.",
    "Vrai : la doc précise « The chosen FlowSchema is among those with the numerically lowest (which we take to be logically highest) MatchingPrecedence ».",
    "Faux : un seul FlowSchema est choisi par requête, il n'y a pas de fusion.",
    "Faux : rien n'exige l'égalité des valeurs entre FlowSchemas candidats."
  ],
  "explain": "matchingPrecedence est un entier compris entre 1 et 10000 (1000 par défaut) : parmi tous les FlowSchemas correspondant à une requête, celui ayant la valeur numérique la PLUS BASSE est choisi, cette valeur basse étant interprétée comme la précédence logiquement la plus élevée.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/policy-resources/flow-schema-v1/",
  "en": {
    "q": "On a FlowSchema object (API Priority and Fairness), field `matchingPrecedence` is 100 for FlowSchema A and 500 for FlowSchema B, both able to match a given request. Which one is actually chosen?",
    "choices": [
      "FlowSchema B, because a higher numeric value wins",
      "FlowSchema A, because a lower numeric value is considered logically the highest precedence",
      "Both apply simultaneously, their rules are merged",
      "Neither, because matchingPrecedence must be strictly equal between competing FlowSchemas"
    ]
  }
},
{
  "id": "t10-a4",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Que fait le flag `--duration` de `kubectl create token` ?",
  "choices": [
    "Il définit la durée de vie demandée pour le token émis ; si non précisé ou à 0, le serveur détermine automatiquement la durée",
    "Il définit le délai avant que la commande n'échoue si le ServiceAccount n'existe pas",
    "Il force le token à être valide indéfiniment, sans expiration",
    "Il n'existe pas de flag --duration pour cette commande"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « Requested lifetime of the issued token. If not set or if set to 0, the lifetime will be determined by the server automatically. »",
    "Faux : ce n'est pas un timeout de commande, mais la durée de vie du token lui-même.",
    "Faux : le serveur peut retourner un token avec une durée de vie plus courte ou plus longue que celle demandée ; rien ne garantit une validité indéfinie.",
    "Faux : ce flag existe bel et bien et est documenté."
  ],
  "explain": "`--duration` sur `kubectl create token` demande une durée de vie spécifique pour le token émis (ex. --duration 10m) ; si omis ou à 0, c'est le serveur qui détermine automatiquement la durée, qui peut différer de ce qui a été demandé.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_token/",
  "en": {
    "q": "What does the `--duration` flag of `kubectl create token` do?",
    "choices": [
      "It sets the requested lifetime for the issued token; if not set or 0, the server determines the lifetime automatically",
      "It sets the timeout before the command fails if the ServiceAccount doesn't exist",
      "It forces the token to be valid indefinitely, with no expiration",
      "There is no --duration flag for this command"
    ]
  }
},
{
  "id": "t10-a5",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "D'après la politique de dépréciation des API Kubernetes, que dit la règle concernant une version d'API GA (stable) une fois dépréciée ?",
  "choices": [
    "Elle peut être marquée dépréciée, mais ne doit pas être supprimée au sein d'une même version majeure de Kubernetes",
    "Elle doit être supprimée dans les 9 mois ou 3 releases mineures suivant sa dépréciation, comme pour beta",
    "Elle est immédiatement supprimée dès qu'une alternative existe",
    "Les API GA ne peuvent jamais être dépréciées, seules les API beta et alpha le peuvent"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « GA API versions may be marked as deprecated, but must not be removed within a major version of Kubernetes ».",
    "Faux : cette règle des 9 mois/3 releases s'applique aux API beta, pas aux API GA.",
    "Faux : aucune suppression immédiate n'est prévue pour les API GA.",
    "Faux : les API GA peuvent bien être marquées dépréciées, contrairement à ce qu'affirme cette option."
  ],
  "explain": "Contrairement aux API beta (dépréciées puis supprimées après 9 mois ou 3 releases mineures) ou alpha (supprimables sans préavis), une API GA peut être marquée dépréciée mais ne doit pas être supprimée au sein de la même version majeure de Kubernetes — la doc précise même qu'aucune version majeure supprimant des API GA n'est actuellement prévue.",
  "ref": "https://kubernetes.io/docs/reference/using-api/deprecation-policy/",
  "en": {
    "q": "According to the Kubernetes API deprecation policy, what does the rule say about a GA (stable) API version once deprecated?",
    "choices": [
      "It may be marked as deprecated, but must not be removed within the same major version of Kubernetes",
      "It must be removed within 9 months or 3 minor releases after deprecation, just like beta",
      "It is immediately removed as soon as an alternative exists",
      "GA APIs can never be deprecated, only beta and alpha APIs can"
    ]
  }
},
{
  "id": "t10-a6",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "À quels types d'objets un LimitRange peut-il s'appliquer, d'après la documentation ?",
  "choices": [
    "Uniquement aux Pods",
    "Container, Pod, et PersistentVolumeClaim",
    "Uniquement aux Namespaces eux-mêmes",
    "Uniquement aux Deployments et StatefulSets"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : un LimitRange peut cibler plus que les seuls Pods.",
    "Vrai : la doc décrit un LimitRange comme contraignant les ressources « for each applicable object kind (such as Pod or PersistentVolumeClaim) », avec un exemple explicite de type: Container, et une contrainte de stockage min/max par PersistentVolumeClaim.",
    "Faux : un LimitRange ne cible pas le Namespace lui-même en tant qu'objet, mais les objets qu'il contient.",
    "Faux : Deployment et StatefulSet ne sont pas des types ciblés directement par un LimitRange."
  ],
  "explain": "Un LimitRange peut définir des contraintes de ressources (min/max/défaut) selon trois types d'objets : Container (CPU/mémoire par conteneur), Pod (CPU/mémoire agrégés du Pod), et PersistentVolumeClaim (stockage demandé).",
  "ref": "https://kubernetes.io/docs/concepts/policy/limit-range/",
  "en": {
    "q": "Which object types can a LimitRange apply to, according to the documentation?",
    "choices": [
      "Only Pods",
      "Container, Pod, and PersistentVolumeClaim",
      "Only Namespaces themselves",
      "Only Deployments and StatefulSets"
    ]
  }
},
{
  "id": "t10-a7",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Quand PodSecurityPolicy a-t-il été déprécié puis supprimé de Kubernetes, et par quoi est-il remplacé ?",
  "choices": [
    "Déprécié en v1.21, supprimé en v1.25 ; remplacé par Pod Security Admission (ou un plugin d'admission tiers)",
    "Déprécié en v1.16, supprimé en v1.20 ; remplacé par les NetworkPolicies",
    "PodSecurityPolicy n'a jamais été déprécié, il est toujours utilisable aujourd'hui",
    "Déprécié en v1.25, sera supprimé en v1.30 ; remplacé par RuntimeClass"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « PodSecurityPolicy was deprecated in Kubernetes v1.21, and removed from Kubernetes in v1.25 », avec Pod Security Admission comme remplacement recommandé.",
    "Faux : ce ne sont pas les bonnes versions, et les NetworkPolicies n'ont aucun rapport avec PodSecurityPolicy.",
    "Faux : PodSecurityPolicy a bien été déprécié puis supprimé.",
    "Faux : ce ne sont pas les bonnes versions, et RuntimeClass n'est pas le remplacement de PodSecurityPolicy."
  ],
  "explain": "PodSecurityPolicy a été déprécié en Kubernetes v1.21 puis totalement supprimé en v1.25 ; la doc recommande de le remplacer par Pod Security Admission (intégré nativement) ou par un plugin d'admission tiers pour appliquer des contraintes de sécurité équivalentes sur les Pods.",
  "ref": "https://kubernetes.io/docs/concepts/security/pod-security-policy/",
  "en": {
    "q": "When was PodSecurityPolicy deprecated and then removed from Kubernetes, and what replaces it?",
    "choices": [
      "Deprecated in v1.21, removed in v1.25; replaced by Pod Security Admission (or a third-party admission plugin)",
      "Deprecated in v1.16, removed in v1.20; replaced by NetworkPolicies",
      "PodSecurityPolicy was never deprecated, it is still usable today",
      "Deprecated in v1.25, will be removed in v1.30; replaced by RuntimeClass"
    ]
  }
},
{
  "id": "t10-a8",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "À quoi sert le flag `--certificate-key` de `kubeadm init` ?",
  "choices": [
    "Il définit la clé privée du CA racine du cluster",
    "Il fournit la clé (chaîne hexadécimale, clé AES de 32 octets) utilisée pour chiffrer les certificats du control plane stockés dans le Secret kubeadm-certs",
    "Il définit le mot de passe du compte admin de kubeconfig",
    "Il spécifie l'algorithme de signature des certificats (RSA vs ECDSA)"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : ce n'est pas la clé du CA racine elle-même, mais une clé de chiffrement pour le Secret kubeadm-certs.",
    "Vrai : la doc précise « Key used to encrypt the control-plane certificates in the kubeadm-certs Secret. The certificate key is a hex encoded string that is an AES key of size 32 bytes. »",
    "Faux : aucun mot de passe de compte admin n'est concerné par ce flag.",
    "Faux : ce flag ne configure pas l'algorithme de signature des certificats."
  ],
  "explain": "`--certificate-key` fournit une clé AES (encodée en hexadécimal, 32 octets) utilisée pour chiffrer les certificats du control plane stockés temporairement dans le Secret kubeadm-certs, généralement en combinaison avec --upload-certs pour permettre à d'autres nœuds control-plane de rejoindre le cluster.",
  "ref": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/",
  "en": {
    "q": "What is the `--certificate-key` flag of `kubeadm init` used for?",
    "choices": [
      "It sets the private key of the cluster's root CA",
      "It provides the key (a hex-encoded 32-byte AES key) used to encrypt the control-plane certificates stored in the kubeadm-certs Secret",
      "It sets the password of the admin kubeconfig account",
      "It specifies the certificate signing algorithm (RSA vs ECDSA)"
    ]
  }
},
{
  "id": "t10-a9",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Concernant les champs `spec.podCIDR` et `spec.unschedulable` d'un objet Node, quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "spec.podCIDR représente la plage d'adresses IP de Pods assignée à ce nœud",
    "spec.unschedulable contrôle si de nouveaux Pods peuvent être planifiés sur le nœud ; par défaut, un nœud est schedulable",
    "spec.unschedulable expulse immédiatement tous les Pods déjà présents sur le nœud dès qu'il passe à true",
    "spec.podCIDR est modifiable librement à tout moment sans redémarrer le nœud"
  ],
  "correct": [
    0,
    1
  ],
  "why": [
    "Vrai : la doc précise « PodCIDR represents the pod IP range assigned to the node. »",
    "Vrai : la doc précise « Unschedulable controls node schedulability of new pods. By default, node is schedulable. »",
    "Faux : unschedulable empêche seulement la planification de NOUVEAUX Pods, il n'expulse pas les Pods déjà en cours d'exécution (c'est le rôle de kubectl drain, distinct de cordon/unschedulable).",
    "Faux : podCIDR est généralement assigné une fois par le control plane et n'est pas destiné à être modifié librement en routine."
  ],
  "explain": "spec.podCIDR définit la plage d'adresses IP réservée aux Pods de ce nœud, tandis que spec.unschedulable (positionné notamment par kubectl cordon) contrôle uniquement l'admissibilité de NOUVEAUX Pods sur le nœud — il ne provoque pas l'éviction des Pods déjà présents.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/cluster-resources/node-v1/",
  "en": {
    "q": "Regarding the `spec.podCIDR` and `spec.unschedulable` fields of a Node object, which statements are correct? (select all that apply)",
    "choices": [
      "spec.podCIDR represents the pod IP range assigned to this node",
      "spec.unschedulable controls whether new Pods can be scheduled on the node; by default, a node is schedulable",
      "spec.unschedulable immediately evicts all Pods already present on the node as soon as it becomes true",
      "spec.podCIDR can be freely changed at any time without restarting the node"
    ]
  }
},
{
  "id": "t10-w1",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Dans une toleration, quelle est la valeur par défaut du champ `operator` si on ne le précise pas, et que change-t-elle par rapport à `Exists` ?",
  "choices": [
    "Equal par défaut : la value de la toleration doit être égale à celle du taint ; Exists ne nécessite aucune value (il vérifie juste l'existence de la clé)",
    "Exists par défaut : aucune value n'est nécessaire ; Equal exige au contraire une correspondance stricte de clé uniquement",
    "Il n'y a pas de valeur par défaut, operator est un champ obligatoire",
    "Equal et Exists sont strictement synonymes, sans différence de comportement"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « The default value for operator is Equal » et qu'avec Exists, « no value should be specified ».",
    "Faux : c'est l'inverse, Equal est la valeur par défaut, pas Exists.",
    "Faux : operator a bien une valeur par défaut documentée (Equal).",
    "Faux : Equal exige une correspondance de value en plus de la clé, contrairement à Exists qui ne vérifie que la présence de la clé."
  ],
  "explain": "Le champ operator d'une toleration vaut Equal par défaut, ce qui exige que la value de la toleration corresponde exactement à celle du taint ; avec Exists, aucune value n'est nécessaire, seule la présence de la clé (et de l'effet) suffit à faire correspondre la toleration au taint.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
  "en": {
    "q": "On a toleration, what is the default value of the `operator` field if not specified, and how does it differ from `Exists`?",
    "choices": [
      "Equal by default: the toleration's value must equal the taint's value; Exists needs no value (it only checks that the key exists)",
      "Exists by default: no value is needed; Equal instead only requires a key match",
      "There is no default value, operator is a required field",
      "Equal and Exists are strictly synonymous, with no behavioral difference"
    ]
  }
},
{
  "id": "t10-w2",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Quelles sont les valeurs par défaut de `.spec.successfulJobsHistoryLimit` et `.spec.failedJobsHistoryLimit` d'un CronJob ?",
  "choices": [
    "3 pour les Jobs réussis, 1 pour les Jobs échoués",
    "1 pour les Jobs réussis, 3 pour les Jobs échoués",
    "0 pour les deux (aucun historique conservé par défaut)",
    "Illimité pour les deux par défaut"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « successfulJobsHistoryLimit: ... The default value is 3 » et « failedJobsHistoryLimit: ... The default value is 1 ».",
    "Faux : les valeurs sont inversées par rapport à la documentation.",
    "Faux : positionner ces champs à 0 désactiverait la conservation, mais ce n'est pas le comportement par défaut.",
    "Faux : un nombre fini et documenté de Jobs est conservé par défaut, pas un historique illimité."
  ],
  "explain": "Par défaut, un CronJob conserve 3 Jobs terminés avec succès (successfulJobsHistoryLimit: 3) et 1 Job échoué (failedJobsHistoryLimit: 1) ; positionner l'un de ces champs à 0 désactive complètement la conservation de cette catégorie de Jobs.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/",
  "en": {
    "q": "What are the default values of `.spec.successfulJobsHistoryLimit` and `.spec.failedJobsHistoryLimit` on a CronJob?",
    "choices": [
      "3 for successful Jobs, 1 for failed Jobs",
      "1 for successful Jobs, 3 for failed Jobs",
      "0 for both (no history kept by default)",
      "Unlimited for both by default"
    ]
  }
},
{
  "id": "t10-w3",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Sur un Job, le champ `podReplacementPolicy: TerminatingOrFailed` (une des deux valeurs possibles avec `Failed`) signifie quoi ?",
  "choices": [
    "Un Pod de remplacement n'est créé qu'une fois le Pod précédent totalement terminé (phase Failed ou Succeeded)",
    "Un Pod de remplacement est créé dès que le Pod précédent est en cours de terminaison (deletionTimestamp positionné) ou déjà en échec, sans attendre la terminaison complète",
    "Aucun Pod de remplacement n'est jamais créé avec cette valeur",
    "Cette valeur ne peut être utilisée qu'en combinaison avec podFailurePolicy"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est la définition de la valeur Failed, pas de TerminatingOrFailed.",
    "Vrai : la doc précise « TerminatingOrFailed means that we recreate pods when they are terminating (has a metadata.deletionTimestamp) or failed. »",
    "Faux : les deux valeurs mènent bien à la création de Pods de remplacement, seul le moment diffère.",
    "Faux : c'est l'inverse — quand podFailurePolicy est utilisée, seule la valeur Failed est autorisée, pas TerminatingOrFailed."
  ],
  "explain": "podReplacementPolicy contrôle le moment de création d'un Pod de remplacement : TerminatingOrFailed recrée dès que le Pod précédent commence sa terminaison ou échoue, tandis que Failed attend que le Pod précédent soit totalement terminé (Failed ou Succeeded) ; quand podFailurePolicy est utilisée, seule la valeur Failed est autorisée.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/job-v1/",
  "en": {
    "q": "On a Job, what does `podReplacementPolicy: TerminatingOrFailed` (one of two possible values along with `Failed`) mean?",
    "choices": [
      "A replacement Pod is only created once the previous Pod is fully terminated (phase Failed or Succeeded)",
      "A replacement Pod is created as soon as the previous Pod is terminating (has a deletionTimestamp) or already failed, without waiting for full termination",
      "No replacement Pod is ever created with this value",
      "This value can only be used together with podFailurePolicy"
    ]
  }
},
{
  "id": "t10-w4",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Dans une règle `preferredDuringSchedulingIgnoredDuringExecution` de nodeAffinity, quelle plage de valeurs est autorisée pour le champ `weight`, et à quoi sert-il ?",
  "choices": [
    "Entre 1 et 100 ; le scheduler additionne les weight des règles préférées satisfaites par chaque nœud pour les classer entre eux",
    "Entre 0 et 1 (valeur décimale) ; il représente une probabilité de sélection du nœud",
    "Entre -100 et 100 ; une valeur négative exclut définitivement le nœud",
    "weight n'existe pas pour nodeAffinity, seulement pour podAffinity"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « You can specify a weight between 1 and 100 for each instance of the preferredDuringSchedulingIgnoredDuringExecution affinity type » et que le scheduler « iterates through every preferred rule that the node satisfies and adds the value of the weight for that expression to a sum ».",
    "Faux : ce n'est pas une plage décimale entre 0 et 1, mais un entier entre 1 et 100.",
    "Faux : aucune valeur négative n'est documentée pour ce champ.",
    "Faux : weight existe bien pour nodeAffinity (comme pour podAffinity)."
  ],
  "explain": "Pour chaque règle preferredDuringSchedulingIgnoredDuringExecution, on peut définir un weight entre 1 et 100 ; le scheduler additionne les weight de toutes les règles préférées satisfaites par un nœud donné pour établir un score de classement entre les nœuds candidats, sans jamais exclure un nœud qui ne satisferait pas ces préférences (contrairement à requiredDuringScheduling).",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/",
  "en": {
    "q": "In a `preferredDuringSchedulingIgnoredDuringExecution` nodeAffinity rule, what value range is allowed for the `weight` field, and what is it used for?",
    "choices": [
      "Between 1 and 100; the scheduler sums the weights of preferred rules satisfied by each node to rank them against each other",
      "Between 0 and 1 (a decimal value); it represents a selection probability for the node",
      "Between -100 and 100; a negative value permanently excludes the node",
      "weight doesn't exist for nodeAffinity, only for podAffinity"
    ]
  }
},
{
  "id": "t10-w5",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Concernant le champ `resizePolicy` d'un conteneur (redimensionnement CPU/mémoire en place), quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "NotRequired (valeur par défaut) applique le changement de ressource sans redémarrer le conteneur",
    "RestartContainer redémarre le conteneur pour appliquer les nouvelles valeurs de ressources",
    "Si le Pod a restartPolicy: Never, tous ses conteneurs doivent avoir resizePolicy.cpu ET resizePolicy.memory à NotRequired, sinon la requête de resize échoue",
    "resizePolicy ne peut être défini que pour la ressource CPU, jamais pour la mémoire"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Vrai : NotRequired est la valeur par défaut et permet un resize sans redémarrage.",
    "Vrai : RestartContainer force un redémarrage du conteneur pour appliquer les nouvelles valeurs.",
    "Vrai : la doc précise « If a Pod's restartPolicy is Never, then all containers in that Pod must have resizePolicy.cpu and resizePolicy.memory set to NotRequired or the resize request will fail. »",
    "Faux : resizePolicy peut être configuré indépendamment pour cpu ET memory."
  ],
  "explain": "resizePolicy permet de choisir, par ressource (cpu et memory), si un redimensionnement en place se fait sans redémarrage (NotRequired, défaut) ou en redémarrant le conteneur (RestartContainer) ; sur un Pod avec restartPolicy: Never, tout resize impliquant un redémarrage serait contradictoire, donc NotRequired est obligatoire pour les deux ressources dans ce cas.",
  "ref": "https://kubernetes.io/docs/tasks/configure-pod-container/resize-container-resources/",
  "en": {
    "q": "Regarding a container's `resizePolicy` field (in-place CPU/memory resize), which statements are correct? (select all that apply)",
    "choices": [
      "NotRequired (the default) applies the resource change without restarting the container",
      "RestartContainer restarts the container to apply the new resource values",
      "If the Pod has restartPolicy: Never, all its containers must have resizePolicy.cpu AND resizePolicy.memory set to NotRequired, or the resize request fails",
      "resizePolicy can only be set for the CPU resource, never for memory"
    ]
  }
},
{
  "id": "t10-w6",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Sur un Job avec `completionMode: Indexed`, à quoi sert le champ `backoffLimitPerIndex` ?",
  "choices": [
    "Il limite le nombre total de retries pour l'ensemble du Job, tous index confondus",
    "Il limite le nombre de retries autorisés au sein d'un même index avant de marquer cet index précis comme failed ; requiert completionMode=Indexed et restartPolicy: Never",
    "Il définit le nombre d'index parallèles maximum exécutés simultanément",
    "Il s'applique uniquement aux CronJobs, jamais aux Jobs simples"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le rôle du backoffLimit global du Job, pas de backoffLimitPerIndex.",
    "Vrai : la doc précise « Specifies the limit for the number of retries within an index before marking this index as failed... It can only be set when Job's completionMode=Indexed, and the Pod's restart policy is Never. »",
    "Faux : c'est le rôle de parallelism, sans rapport avec backoffLimitPerIndex.",
    "Faux : backoffLimitPerIndex est un champ de JobSpec, pas spécifique aux CronJobs."
  ],
  "explain": "backoffLimitPerIndex plafonne le nombre de tentatives autorisées pour un index individuel d'un Job Indexed avant que cet index précis (et non le Job entier) soit marqué failed ; le nombre d'échecs par index est suivi via l'annotation batch.kubernetes.io/job-index-failure-count, et ce champ n'est utilisable qu'avec completionMode=Indexed et restartPolicy: Never, et est immuable après création.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/job-v1/",
  "en": {
    "q": "On a Job with `completionMode: Indexed`, what is the `backoffLimitPerIndex` field used for?",
    "choices": [
      "It limits the total number of retries for the whole Job, across all indexes",
      "It limits the number of retries allowed within a single index before marking that specific index as failed; requires completionMode=Indexed and restartPolicy: Never",
      "It sets the maximum number of parallel indexes executed simultaneously",
      "It only applies to CronJobs, never to plain Jobs"
    ]
  }
},
{
  "id": "t10-w7",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Dans le comportement par défaut d'un HorizontalPodAutoscaler, quelle est la valeur de `stabilizationWindowSeconds` pour le scaleUp, et en quoi diffère-t-elle du scaleDown ?",
  "choices": [
    "0 pour scaleUp (pas de fenêtre de stabilisation, scale immédiat) contre 300 pour scaleDown",
    "300 pour scaleUp contre 0 pour scaleDown",
    "300 pour les deux directions, aucune différence",
    "0 pour les deux directions, aucune fenêtre de stabilisation n'existe par défaut"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : par défaut, scaleUp a stabilizationWindowSeconds à 0 (le scale s'effectue immédiatement dès que la métrique l'indique), tandis que scaleDown a une fenêtre de 300 secondes pour éviter des oscillations.",
    "Faux : c'est l'inverse — c'est scaleDown qui a la fenêtre de 300s, pas scaleUp.",
    "Faux : les deux directions n'ont pas la même valeur par défaut.",
    "Faux : scaleDown a bien une fenêtre par défaut de 300 secondes, contrairement à scaleUp."
  ],
  "explain": "Par défaut, un HPA n'applique aucune fenêtre de stabilisation au scaleUp (stabilizationWindowSeconds: 0), permettant une réaction immédiate à une charge croissante, alors que le scaleDown utilise une fenêtre de 300 secondes par défaut pour éviter des réductions de capacité trop réactives face à des fluctuations temporaires.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/",
  "en": {
    "q": "In the default behavior of a HorizontalPodAutoscaler, what is the `stabilizationWindowSeconds` value for scaleUp, and how does it differ from scaleDown?",
    "choices": [
      "0 for scaleUp (no stabilization window, immediate scaling) versus 300 for scaleDown",
      "300 for scaleUp versus 0 for scaleDown",
      "300 for both directions, no difference",
      "0 for both directions, no stabilization window exists by default"
    ]
  }
},
{
  "id": "t10-w8",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Si le champ `strategy.type` d'un Deployment n'est pas précisé, quelle est sa valeur par défaut ?",
  "choices": [
    "Recreate",
    "RollingUpdate",
    "BlueGreen",
    "Aucune valeur par défaut, le champ est obligatoire"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : Recreate est une valeur possible, mais ce n'est pas le défaut.",
    "Vrai : la doc précise « Type of deployment. Can be \"Recreate\" or \"RollingUpdate\". Default is RollingUpdate. »",
    "Faux : BlueGreen n'est pas une valeur reconnue de strategy.type sur un Deployment Kubernetes natif.",
    "Faux : strategy.type est optionnel et prend RollingUpdate par défaut si omis."
  ],
  "explain": "Le champ strategy.type d'un Deployment accepte seulement Recreate ou RollingUpdate, avec RollingUpdate comme valeur par défaut si le champ est omis, garantissant une mise à jour progressive sans interruption totale du service.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/deployment-v1/",
  "en": {
    "q": "If a Deployment's `strategy.type` field is not specified, what is its default value?",
    "choices": [
      "Recreate",
      "RollingUpdate",
      "BlueGreen",
      "There is no default, the field is required"
    ]
  }
},
{
  "id": "t10-n1",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Dans l'API Gateway, un objet `Gateway` accepte-t-il par défaut les Routes (HTTPRoute, GRPCRoute...) situées dans d'autres namespaces que le sien ?",
  "choices": [
    "Oui, par défaut toutes les Routes de tous les namespaces sont acceptées sans restriction",
    "Non, par défaut un Gateway n'accepte que les Routes du MÊME namespace ; les Routes cross-namespace nécessitent de configurer allowedRoutes",
    "Non, les Routes cross-namespace sont totalement impossibles quelle que soit la configuration",
    "Cela dépend uniquement du GatewayClass utilisé, jamais du Gateway lui-même"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est l'inverse du comportement par défaut documenté.",
    "Vrai : la doc précise « By default, a Gateway only accepts Routes from the same namespace. Cross-namespace Routes require configuring allowedRoutes. »",
    "Faux : les Routes cross-namespace sont possibles, à condition de configurer allowedRoutes.",
    "Faux : c'est bien la configuration allowedRoutes du Gateway lui-même (au niveau de chaque listener) qui contrôle ce comportement, pas le GatewayClass."
  ],
  "explain": "Par défaut, un Gateway limite l'attachement des Routes au namespace où il est défini ; pour autoriser des Routes provenant d'autres namespaces, il faut explicitement configurer le champ allowedRoutes sur le(s) listener(s) du Gateway.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/gateway/",
  "en": {
    "q": "In the Gateway API, does a `Gateway` object accept Routes (HTTPRoute, GRPCRoute...) from other namespaces than its own by default?",
    "choices": [
      "Yes, by default all Routes from all namespaces are accepted without restriction",
      "No, by default a Gateway only accepts Routes from the SAME namespace; cross-namespace Routes require configuring allowedRoutes",
      "No, cross-namespace Routes are entirely impossible regardless of configuration",
      "It depends only on the GatewayClass used, never on the Gateway itself"
    ]
  }
},
{
  "id": "t10-n10",
  "domain": "networking",
  "difficulty": "medium",
  "q": "D'après les principes de conception de l'API Gateway, quels cas d'usage de routage de trafic sont explicitement cités comme supportés ?",
  "choices": [
    "Le correspondance basée sur les en-têtes (header-based matching) et la pondération de trafic (traffic weighting), entre autres",
    "Uniquement le routage basé sur l'adresse IP source, rien d'autre",
    "Seule la correspondance exacte de chemin (path exact match) est supportée, sans autre mécanisme",
    "L'API Gateway ne supporte aucun cas d'usage de routage avancé, contrairement à Ingress"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc décrit l'API Gateway comme « Expressive » et supportant « common traffic routing use cases such as header-based matching, traffic weighting, and others ».",
    "Faux : le routage par IP source n'est pas le cas d'usage mis en avant par ce principe de conception.",
    "Faux : la correspondance de chemin n'est qu'un des mécanismes, pas le seul.",
    "Faux : l'API Gateway est justement conçue pour supporter DAVANTAGE de cas d'usage de routage qu'Ingress, pas moins."
  ],
  "explain": "L'un des principes de conception de l'API Gateway est d'être « Expressive », c'est-à-dire de supporter nativement des cas d'usage de routage courants tels que la correspondance basée sur les en-têtes et la pondération de trafic entre plusieurs backends, des besoins qu'Ingress ne couvrait pas nativement.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/gateway/",
  "en": {
    "q": "According to the Gateway API's design principles, which traffic routing use cases are explicitly cited as supported?",
    "choices": [
      "Header-based matching and traffic weighting, among others",
      "Only source IP-based routing, nothing else",
      "Only exact path matching is supported, with no other mechanism",
      "The Gateway API supports no advanced routing use cases, unlike Ingress"
    ]
  }
},
{
  "id": "t10-n2",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Quelle est la différence documentée entre les ressources `HTTPRoute` et `GRPCRoute` de l'API Gateway ?",
  "choices": [
    "HTTPRoute route les requêtes HTTP ; GRPCRoute route les requêtes gRPC, ce qui exige que le Gateway supporte HTTP/2 sans upgrade initial depuis HTTP/1",
    "Il n'existe aucune différence, GRPCRoute est un simple alias historique de HTTPRoute",
    "GRPCRoute ne peut être utilisé qu'avec un GatewayClass spécifique nommé « grpc »",
    "HTTPRoute est déprécié au profit de GRPCRoute pour tout type de trafic"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « The HTTPRoute kind specifies routing behavior of HTTP requests... The GRPCRoute kind specifies routing behavior of gRPC requests... Gateways supporting GRPCRoute are required to support HTTP/2 without an initial upgrade from HTTP/1 ».",
    "Faux : ce sont deux kinds distincts avec des rôles différents, pas un alias.",
    "Faux : aucune contrainte de nommage de GatewayClass n'est associée à GRPCRoute.",
    "Faux : HTTPRoute n'est pas déprécié, les deux kinds coexistent pour des protocoles différents."
  ],
  "explain": "HTTPRoute et GRPCRoute sont deux kinds distincts de l'API Gateway routant respectivement du trafic HTTP et gRPC ; comme gRPC s'appuie sur HTTP/2, un Gateway supportant GRPCRoute doit garantir le support de HTTP/2 sans négociation d'upgrade depuis HTTP/1, pour que le trafic gRPC circule correctement.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/gateway/",
  "en": {
    "q": "What is the documented difference between the `HTTPRoute` and `GRPCRoute` Gateway API resources?",
    "choices": [
      "HTTPRoute routes HTTP requests; GRPCRoute routes gRPC requests, which requires the Gateway to support HTTP/2 without an initial upgrade from HTTP/1",
      "There is no difference, GRPCRoute is just a historical alias for HTTPRoute",
      "GRPCRoute can only be used with a specific GatewayClass named \"grpc\"",
      "HTTPRoute is deprecated in favor of GRPCRoute for all traffic types"
    ]
  }
},
{
  "id": "t10-n3",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Dans la configuration du mode iptables de kube-proxy, à quoi sert le paramètre `minSyncPeriod`, et que se passe-t-il s'il vaut `0s` ?",
  "choices": [
    "Il définit la durée minimale entre deux resynchronisations des règles iptables ; à 0s, kube-proxy resynchronise immédiatement à chaque changement de Service ou d'EndpointSlice",
    "Il définit le temps maximum qu'un paquet peut rester en attente dans la file iptables avant d'être abandonné",
    "Il contrôle la fréquence des health checks HTTP envoyés par kube-proxy",
    "Il n'a aucun effet en mode iptables, uniquement en mode IPVS"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise que si minSyncPeriod vaut « 0s, then kube-proxy will always immediately synchronize the rules every time any Service or EndpointSlice changes ».",
    "Faux : ce n'est pas un paramètre de gestion de file d'attente de paquets.",
    "Faux : minSyncPeriod ne concerne pas des health checks HTTP.",
    "Faux : minSyncPeriod est bien un paramètre du mode iptables de kube-proxy."
  ],
  "explain": "minSyncPeriod fixe la durée minimale entre deux resynchronisations des règles iptables par kube-proxy ; à 0s, chaque changement de Service ou d'EndpointSlice déclenche une resynchronisation immédiate, ce qui fonctionne pour de petits clusters mais peut générer un travail redondant si beaucoup d'événements arrivent en peu de temps — une valeur plus élevée permet d'agréger plusieurs changements pour réduire la charge CPU.",
  "ref": "https://kubernetes.io/docs/reference/networking/virtual-ips/",
  "en": {
    "q": "In kube-proxy's iptables mode configuration, what is the `minSyncPeriod` parameter for, and what happens when it's set to `0s`?",
    "choices": [
      "It sets the minimum duration between iptables rule resyncs; at 0s, kube-proxy immediately resyncs on every Service or EndpointSlice change",
      "It sets the maximum time a packet can wait in the iptables queue before being dropped",
      "It controls the frequency of HTTP health checks sent by kube-proxy",
      "It has no effect in iptables mode, only in IPVS mode"
    ]
  }
},
{
  "id": "t10-n4",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Si le champ `protocol` d'un port de Service n'est pas précisé, quelle est sa valeur par défaut ?",
  "choices": [
    "UDP",
    "TCP",
    "SCTP",
    "Il n'y a pas de valeur par défaut, le champ est obligatoire"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : UDP n'est pas la valeur par défaut.",
    "Vrai : le champ protocol d'un ServicePort accepte TCP, UDP et SCTP, avec TCP comme valeur par défaut si non précisé.",
    "Faux : SCTP n'est pas la valeur par défaut.",
    "Faux : le champ est optionnel et prend TCP par défaut."
  ],
  "explain": "Un port de Service accepte les protocoles TCP, UDP et SCTP ; si le champ protocol est omis, TCP est utilisé par défaut.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/service-resources/service-v1/",
  "en": {
    "q": "If a Service port's `protocol` field is not specified, what is its default value?",
    "choices": [
      "UDP",
      "TCP",
      "SCTP",
      "There is no default, the field is required"
    ]
  }
},
{
  "id": "t10-n5",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Dans une règle ingress de NetworkPolicy, que se passe-t-il si le champ `from` est vide ou absent ?",
  "choices": [
    "La règle ne matche AUCUNE source, bloquant tout le trafic entrant décrit par cette règle",
    "La règle matche TOUTES les sources (le trafic n'est pas restreint par la source)",
    "La NetworkPolicy entière est rejetée comme invalide par l'API server",
    "Le comportement est indéfini et dépend du plugin CNI utilisé"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est l'inverse — un champ vide autorise tout plutôt que de tout bloquer.",
    "Vrai : la doc précise « from is a list of sources... If this field is empty or missing, this rule matches all sources (traffic not restricted by source). »",
    "Faux : une NetworkPolicy avec un from vide reste parfaitement valide.",
    "Faux : ce comportement est documenté au niveau de l'API Kubernetes elle-même, indépendamment du plugin CNI."
  ],
  "explain": "Dans une règle ingress (ou to pour egress) de NetworkPolicy, un champ from (ou to) vide ou absent signifie que la règle s'applique à toutes les sources (ou destinations) possibles, sans restriction — le même principe s'applique au champ ports vide, qui autorise alors tous les ports.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/policy-resources/network-policy-v1/",
  "en": {
    "q": "In a NetworkPolicy ingress rule, what happens if the `from` field is empty or missing?",
    "choices": [
      "The rule matches NO sources, blocking all incoming traffic described by that rule",
      "The rule matches ALL sources (traffic is not restricted by source)",
      "The entire NetworkPolicy is rejected as invalid by the API server",
      "The behavior is undefined and depends on the CNI plugin used"
    ]
  }
},
{
  "id": "t10-n6",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Vous créez un Service NodePort en précisant explicitement `nodePort: 30080`, mais ce port est déjà utilisé par un autre Service du cluster. Que se passe-t-il ?",
  "choices": [
    "Le nouveau Service est créé mais reste sans nodePort fonctionnel",
    "La création échoue : un nodePort explicitement spécifié doit être dans la plage valide ET non déjà utilisé, sinon l'opération échoue",
    "Kubernetes réattribue automatiquement un autre port libre sans erreur",
    "Les deux Services partagent silencieusement le même nodePort"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : ce n'est pas le comportement documenté, la création échoue purement et simplement.",
    "Vrai : d'après l'API reference, si une valeur nodePort est spécifiée, en plage valide et non utilisée, elle sera utilisée, sinon l'opération échoue.",
    "Faux : la réattribution automatique ne s'applique que lorsqu'aucune valeur n'est explicitement demandée (ou nodePort: 0).",
    "Faux : deux Services ne peuvent pas partager le même nodePort, ce qui cause précisément l'échec de création."
  ],
  "explain": "Quand une valeur nodePort explicite est demandée, Kubernetes exige qu'elle soit dans la plage valide et non déjà allouée à un autre Service ; en cas de conflit, la création du Service échoue plutôt que de silencieusement réattribuer un autre port (ce comportement automatique ne s'applique que si nodePort est omis ou vaut 0).",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/service-resources/service-v1/",
  "en": {
    "q": "You create a NodePort Service explicitly specifying `nodePort: 30080`, but that port is already used by another Service in the cluster. What happens?",
    "choices": [
      "The new Service is created but is left without a functional nodePort",
      "Creation fails: an explicitly specified nodePort must be in the valid range AND not already in use, otherwise the operation fails",
      "Kubernetes automatically reassigns another free port with no error",
      "Both Services silently share the same nodePort"
    ]
  }
},
{
  "id": "t10-n7",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Quels champs de topologie un endpoint au sein d'un EndpointSlice peut-il porter, d'après la documentation ?",
  "choices": [
    "nodeName (le nœud où tourne l'endpoint) et zone (la zone de disponibilité de l'endpoint)",
    "region uniquement, sans information de nœud",
    "rack et datacenter, des champs propriétaires spécifiques à chaque cloud",
    "Aucune information de topologie n'est disponible au niveau d'un endpoint individuel"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc liste « nodeName - The name of the Node this endpoint is on. » et « zone - The zone this endpoint is in. » comme champs de topologie par endpoint.",
    "Faux : c'est zone, pas region, qui est le champ documenté à ce niveau.",
    "Faux : rack et datacenter ne sont pas des champs documentés d'un endpoint d'EndpointSlice.",
    "Faux : nodeName et zone sont bien deux champs de topologie disponibles par endpoint."
  ],
  "explain": "Chaque endpoint d'un EndpointSlice peut porter des informations de topologie via les champs nodeName (le nœud hébergeant l'endpoint) et zone (la zone de disponibilité), utilisées notamment pour le routage topology-aware.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/",
  "en": {
    "q": "Which topology fields can an endpoint within an EndpointSlice carry, according to the documentation?",
    "choices": [
      "nodeName (the node the endpoint runs on) and zone (the endpoint's availability zone)",
      "region only, with no node information",
      "rack and datacenter, cloud-specific proprietary fields",
      "No topology information is available at the individual endpoint level"
    ]
  }
},
{
  "id": "t10-n8",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Sur la plupart des systèmes Linux, quelle limite pratique s'applique au nombre de domaines dans la liste `search` du `/etc/resolv.conf` d'un Pod, et que se passe-t-il si elle est dépassée ?",
  "choices": [
    "Aucune limite n'existe côté Linux, seul Kubernetes impose une limite (32 domaines)",
    "La plupart des systèmes Linux limitent à 6 domaines de recherche (et 256 caractères au total) ; au-delà, Kubernetes retient 6 domaines et ignore les autres avec un avertissement",
    "La limite est de 100 domaines de recherche, sans avertissement en cas de dépassement",
    "Le Pod refuse de démarrer dès que la limite est dépassée"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : Linux impose bien une limite pratique inférieure à celle, plus permissive, de Kubernetes lui-même.",
    "Vrai : la plupart des systèmes Linux limitent à 6 domaines de recherche et 256 caractères au total ; au-delà, Kubernetes ne conserve que 6 domaines et ignore le reste avec un avertissement.",
    "Faux : ce n'est pas la limite pratique documentée liée aux systèmes Linux.",
    "Faux : le dépassement de cette limite ne bloque pas le démarrage du Pod, il tronque simplement la liste avec un avertissement."
  ],
  "explain": "Bien que Kubernetes lui-même tolère une liste search plus longue (jusqu'à 32 domaines / 2048 caractères), la plupart des systèmes Linux sous-jacents limitent le nombre effectif de domaines de recherche à 6 et leur longueur totale à 256 caractères ; si cette limite Linux est dépassée, Kubernetes retient 6 domaines et ignore les autres, avec un message d'avertissement.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
  "en": {
    "q": "On most Linux systems, what practical limit applies to the number of domains in a Pod's `/etc/resolv.conf` `search` list, and what happens if it's exceeded?",
    "choices": [
      "There is no limit on the Linux side, only Kubernetes imposes a limit (32 domains)",
      "Most Linux systems limit search domains to 6 (and 256 total characters); beyond that, Kubernetes keeps 6 domains and ignores the rest with a warning",
      "The limit is 100 search domains, with no warning if exceeded",
      "The Pod refuses to start once the limit is exceeded"
    ]
  }
},
{
  "id": "t10-n9",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Sur un cluster Kubernetes v1.37, quel est le mode de fonctionnement PAR DÉFAUT de kube-proxy, et qu'annonce la documentation pour l'avenir ?",
  "choices": [
    "iptables par défaut en 1.37 ; une future version de Kubernetes changera le défaut vers nftables",
    "nftables par défaut en 1.37 ; iptables sera réintroduit comme défaut plus tard",
    "IPVS par défaut en 1.37, sans changement prévu",
    "userspace par défaut en 1.37, mode historique toujours utilisé"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « In Kubernetes 1.37, this is iptables, but a future version of Kubernetes will change the default to nftables. »",
    "Faux : c'est l'inverse de ce qu'annonce la documentation.",
    "Faux : IPVS n'est pas le mode par défaut en 1.37.",
    "Faux : le mode userspace est un mode historique très ancien, non utilisé par défaut."
  ],
  "explain": "En Kubernetes 1.37, iptables reste le mode par défaut de kube-proxy, mais la documentation indique explicitement qu'une future version de Kubernetes changera ce défaut vers le mode nftables, plus récent.",
  "ref": "https://kubernetes.io/docs/reference/networking/virtual-ips/",
  "en": {
    "q": "On a Kubernetes v1.37 cluster, what is kube-proxy's DEFAULT operating mode, and what does the documentation announce for the future?",
    "choices": [
      "iptables by default in 1.37; a future Kubernetes version will change the default to nftables",
      "nftables by default in 1.37; iptables will be reintroduced as the default later",
      "IPVS by default in 1.37, with no planned change",
      "userspace by default in 1.37, the historical mode still in use"
    ]
  }
},
{
  "id": "t10-s1",
  "domain": "storage",
  "difficulty": "hard",
  "q": "Que représente un objet `VolumeAttachment` dans Kubernetes ?",
  "choices": [
    "Il capture l'intention d'attacher ou de détacher un volume spécifié vers/depuis un nœud spécifié ; c'est un objet non-namespacé",
    "Il représente le montage effectif d'un volume dans le système de fichiers d'un conteneur",
    "C'est un alias namespacé pour un PersistentVolumeClaim",
    "Il définit les règles de rétention d'un VolumeSnapshot"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « VolumeAttachment captures the intent to attach or detach the specified volume to/from the specified node » et « VolumeAttachment objects are non-namespaced. »",
    "Faux : VolumeAttachment concerne l'attachement du volume au NŒUD (au niveau infrastructure), pas le montage dans un conteneur.",
    "Faux : ce n'est pas un alias de PVC, et il est justement non-namespacé, contrairement aux PVC.",
    "Faux : les règles de rétention de VolumeSnapshot sont définies par VolumeSnapshotClass, pas par VolumeAttachment."
  ],
  "explain": "Un VolumeAttachment capture l'intention (généralement gérée par le contrôleur CSI external-attacher) d'attacher ou de détacher un volume spécifique à un nœud spécifique ; le champ attacher identifie le driver CSI responsable, source pointe vers le volume concerné (généralement un PersistentVolume), et l'objet est cluster-scoped (non-namespacé).",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/volume-attachment-v1/",
  "en": {
    "q": "What does a `VolumeAttachment` object represent in Kubernetes?",
    "choices": [
      "It captures the intent to attach or detach the specified volume to/from the specified node; it's a non-namespaced object",
      "It represents the actual mount of a volume inside a container's filesystem",
      "It's a namespaced alias for a PersistentVolumeClaim",
      "It defines the retention rules of a VolumeSnapshot"
    ]
  }
},
{
  "id": "t10-s2",
  "domain": "storage",
  "difficulty": "hard",
  "q": "À quoi sert un objet `VolumeAttributesClass` ?",
  "choices": [
    "Il permet aux administrateurs de décrire des « classes » de stockage mutables, permettant de modifier des attributs (comme IOPS ou throughput) d'un volume existant sans le recréer",
    "Il définit uniquement le mode d'accès (accessMode) par défaut d'une StorageClass",
    "C'est un remplacement complet de StorageClass, qui devient obsolète",
    "Il sert exclusivement à chiffrer les volumes au repos"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « A VolumeAttributesClass provides a way for administrators to describe the mutable \"classes\" of storage they offer », avec un exemple de bascule d'une classe silver (iops 3000) vers une classe gold (iops 4000) sur un PVC existant.",
    "Faux : VolumeAttributesClass ne concerne pas les accessModes.",
    "Faux : StorageClass reste utilisée pour le provisionnement initial ; VolumeAttributesClass s'y ajoute pour la modification post-provisionnement.",
    "Faux : rien dans la doc ne limite VolumeAttributesClass au chiffrement."
  ],
  "explain": "VolumeAttributesClass permet de modifier dynamiquement des attributs mutables d'un volume déjà provisionné (comme les IOPS ou le débit) en changeant simplement la référence de classe sur le PVC, sans recréer le volume — cette fonctionnalité s'appuie sur le contrôleur kubernetes-csi/external-resizer et l'API ModifyVolume du driver CSI.",
  "ref": "https://kubernetes.io/docs/concepts/storage/volume-attributes-classes/",
  "en": {
    "q": "What is a `VolumeAttributesClass` object used for?",
    "choices": [
      "It lets administrators describe mutable storage \"classes\", allowing attributes (like IOPS or throughput) of an existing volume to be modified without recreating it",
      "It only defines the default accessMode of a StorageClass",
      "It's a full replacement for StorageClass, which becomes obsolete",
      "It is used exclusively to encrypt volumes at rest"
    ]
  }
},
{
  "id": "t10-s3",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Sur un objet CSIDriver, que signifie une liste `volumeLifecycleModes` vide, et quelle est l'autre valeur possible avec ce champ ?",
  "choices": [
    "Une liste vide équivaut à \"Persistent\" (usage classique via PV/PVC) ; l'autre valeur possible est \"Ephemeral\" (volume défini en ligne dans le Pod, lié au cycle de vie du Pod)",
    "Une liste vide signifie que le driver ne supporte AUCUN mode de volume",
    "Une liste vide équivaut à \"Ephemeral\" par défaut, \"Persistent\" devant être ajouté explicitement",
    "volumeLifecycleModes ne peut contenir qu'une seule valeur, jamais les deux simultanément"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise que « The default if the list is empty is \"Persistent\"... implemented in Kubernetes via the usual PV/PVC mechanism » et que l'autre mode, « Ephemeral », concerne des volumes définis en ligne via CSIVolumeSource, liés au cycle de vie du Pod.",
    "Faux : une liste vide ne bloque rien, elle équivaut au mode Persistent par défaut.",
    "Faux : c'est l'inverse — Persistent est le défaut d'une liste vide, pas Ephemeral.",
    "Faux : un driver peut supporter les deux modes simultanément (Persistent ET Ephemeral)."
  ],
  "explain": "Si volumeLifecycleModes est vide, le mode Persistent (usage classique via PV/PVC) s'applique par défaut ; l'autre valeur possible, Ephemeral, permet de définir des volumes directement dans le spec du Pod (via CSIVolumeSource), leur cycle de vie étant alors lié à celui du Pod — un driver peut supporter les deux modes à la fois.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/csi-driver-v1/",
  "en": {
    "q": "On a CSIDriver object, what does an empty `volumeLifecycleModes` list mean, and what is the other possible value for this field?",
    "choices": [
      "An empty list means \"Persistent\" (classic usage via PV/PVC); the other possible value is \"Ephemeral\" (volume defined inline in the Pod, tied to the Pod's lifecycle)",
      "An empty list means the driver supports NO volume mode at all",
      "An empty list defaults to \"Ephemeral\", with \"Persistent\" needing to be added explicitly",
      "volumeLifecycleModes can only ever contain a single value, never both"
    ]
  }
},
{
  "id": "t10-s4",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Sur un PersistentVolume, à quoi sert le champ `claimRef`, et quel champ est décrit comme « autoritaire » pour le binding PV/PVC ?",
  "choices": [
    "claimRef fait partie du binding bidirectionnel PV/PVC ; c'est claim.VolumeName (sur la PVC) qui est décrit comme le lien autoritaire du binding",
    "claimRef est le seul champ utilisé pour le binding, spec.volumeName de la PVC n'a aucun rôle",
    "claimRef sert à définir la reclaimPolicy du PV",
    "claimRef n'existe que sur les PVC, jamais sur les PV"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « claimRef is part of a bi-directional binding between PersistentVolume and PersistentVolumeClaim... claim.VolumeName is the authoritative bind between PV and PVC. »",
    "Faux : c'est justement claim.VolumeName (côté PVC) qui est désigné comme autoritaire, pas claimRef seul.",
    "Faux : claimRef n'a aucun rapport avec reclaimPolicy, qui est un champ distinct.",
    "Faux : claimRef existe bien sur le PersistentVolume, dans le sens PV → PVC."
  ],
  "explain": "Le binding entre un PV et une PVC est bidirectionnel : le PV référence la PVC via claimRef, et la PVC référence le PV via spec.volumeName ; la documentation précise que c'est ce dernier (claim.VolumeName) qui fait autorité pour établir le binding effectif.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/persistent-volume-v1/",
  "en": {
    "q": "On a PersistentVolume, what is the `claimRef` field for, and which field is described as \"authoritative\" for the PV/PVC binding?",
    "choices": [
      "claimRef is part of the bi-directional PV/PVC binding; claim.VolumeName (on the PVC) is described as the authoritative bind",
      "claimRef is the only field used for binding, the PVC's spec.volumeName plays no role",
      "claimRef is used to set the PV's reclaimPolicy",
      "claimRef only exists on PVCs, never on PVs"
    ]
  }
},
{
  "id": "t10-s5",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Un cluster ne dispose que de PersistentVolumes de 50Gi. Une PVC demande 100Gi (spec.resources.requests.storage: 100Gi). Un PV de 150Gi est ensuite ajouté au cluster et se lie à la PVC. D'après la documentation, que peut-on affirmer ?",
  "choices": [
    "La liaison échoue car 150Gi ne correspond pas exactement aux 100Gi demandés",
    "La liaison réussit ; l'utilisateur obtient toujours au moins ce qu'il a demandé, mais le volume peut dépasser la capacité demandée",
    "Kubernetes redimensionne automatiquement le PV à exactement 100Gi avant de le lier",
    "La PVC reste indéfiniment Pending tant qu'un PV d'exactement 100Gi n'est pas disponible"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la liaison ne nécessite pas une correspondance exacte, un PV plus grand que la demande peut tout à fait se lier.",
    "Vrai : la doc précise « the user will always get at least what they asked for, but the volume may be in excess of what was requested. »",
    "Faux : Kubernetes ne redimensionne pas le PV lors du binding, la PVC reçoit la capacité réelle du PV lié.",
    "Faux : c'est l'inverse du comportement documenté — un PV plus grand suffit à débloquer le binding."
  ],
  "explain": "Le binding PVC/PV n'exige pas une correspondance exacte de capacité : un PV dont la capacité est égale ou supérieure à la demande peut se lier à la PVC, l'utilisateur obtenant alors une capacité au moins égale à ce qu'il a demandé, potentiellement supérieure.",
  "ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/",
  "en": {
    "q": "A cluster only has 50Gi PersistentVolumes. A PVC requests 100Gi (spec.resources.requests.storage: 100Gi). A 150Gi PV is then added to the cluster and binds to the PVC. According to the documentation, what can be said?",
    "choices": [
      "The binding fails because 150Gi doesn't exactly match the requested 100Gi",
      "The binding succeeds; the user always gets at least what they asked for, but the volume may exceed what was requested",
      "Kubernetes automatically resizes the PV to exactly 100Gi before binding it",
      "The PVC stays Pending indefinitely until a PV of exactly 100Gi is available"
    ]
  }
},
{
  "id": "t10-s6",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Un utilisateur exécute `kubectl delete pvc mypvc` alors que la PVC est activement utilisée par un Pod en cours d'exécution. D'après la fonctionnalité « Storage Object in Use Protection », que se passe-t-il ?",
  "choices": [
    "La PVC est supprimée immédiatement, et le Pod qui l'utilisait plante aussitôt",
    "La suppression de la PVC est reportée : elle reste visible (Terminating, avec le finalizer kubernetes.io/pvc-protection) jusqu'à ce qu'elle ne soit plus utilisée par aucun Pod",
    "La commande échoue immédiatement avec une erreur de permission",
    "Le Pod qui utilise la PVC est automatiquement supprimé pour permettre la suppression de la PVC"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la suppression n'est pas immédiate, elle est justement reportée par cette protection.",
    "Vrai : la doc précise « If a user deletes a PVC in active use by a Pod, the PVC is not removed immediately. PVC removal is postponed until the PVC is no longer actively used by any Pods », visible via le finalizer kubernetes.io/pvc-protection et le statut Terminating.",
    "Faux : la commande est acceptée (deletionTimestamp positionné), ce n'est pas une erreur de permission.",
    "Faux : le Pod n'est pas automatiquement supprimé pour débloquer la PVC, c'est l'inverse qui doit se produire naturellement."
  ],
  "explain": "La fonctionnalité Storage Object in Use Protection ajoute le finalizer kubernetes.io/pvc-protection à toute PVC activement utilisée par un Pod (et un mécanisme équivalent pour les PV liés à une PVC) : la suppression demandée reste en attente (état Terminating) tant que la ressource est encore utilisée, évitant ainsi une perte de données.",
  "ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/",
  "en": {
    "q": "A user runs `kubectl delete pvc mypvc` while the PVC is actively used by a running Pod. According to the \"Storage Object in Use Protection\" feature, what happens?",
    "choices": [
      "The PVC is deleted immediately, and the Pod using it crashes right away",
      "The PVC deletion is postponed: it stays visible (Terminating, with the kubernetes.io/pvc-protection finalizer) until no Pod uses it anymore",
      "The command fails immediately with a permission error",
      "The Pod using the PVC is automatically deleted to allow the PVC to be removed"
    ]
  }
},
{
  "id": "t10-t1",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait `kubectl rollout restart deployment/nginx` ?",
  "choices": [
    "Elle annule le dernier rollout et revient à la révision précédente",
    "Elle redémarre la ressource en déclenchant un nouveau rollout, sans changer sa spec",
    "Elle supprime puis recrée entièrement l'objet Deployment",
    "Elle met le Deployment en pause jusqu'à une reprise manuelle"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le rôle de `kubectl rollout undo`, pas de `restart`.",
    "Vrai : la doc décrit la commande comme « Restart a resource » et précise « Resource rollout will be restarted », permettant de redémarrer les Pods sans modifier la spec du Deployment.",
    "Faux : la commande ne supprime pas l'objet Deployment, elle déclenche un nouveau rollout de ses Pods.",
    "Faux : c'est le rôle de `kubectl rollout pause`, pas de `restart`."
  ],
  "explain": "`kubectl rollout restart` déclenche un nouveau rollout d'une ressource (Deployment, DaemonSet, StatefulSet...) pour forcer le redémarrage de ses Pods, sans modifier sa spec — utile par exemple pour recharger un Secret ou ConfigMap monté sans en changer le nom.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_restart/",
  "en": {
    "q": "What does `kubectl rollout restart deployment/nginx` do?",
    "choices": [
      "It undoes the last rollout and reverts to the previous revision",
      "It restarts the resource by triggering a new rollout, without changing its spec",
      "It deletes and fully recreates the Deployment object",
      "It pauses the Deployment until a manual resume"
    ]
  }
},
{
  "id": "t10-t10",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait la commande `kubectl set image deployment/nginx nginx=nginx:1.9.1` ?",
  "choices": [
    "Elle crée un nouveau Deployment nommé nginx utilisant l'image nginx:1.9.1",
    "Elle met à jour l'image du conteneur nommé nginx dans le template de Pod du Deployment nginx",
    "Elle liste toutes les images utilisées par le Deployment nginx",
    "Elle télécharge (pull) l'image nginx:1.9.1 sur tous les nœuds sans modifier le Deployment"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la commande modifie un Deployment existant, elle n'en crée pas un nouveau.",
    "Vrai : la doc décrit `kubectl set image` comme permettant de « update existing container image(s) of resources », avec l'exemple exact de mise à jour d'un conteneur nginx à la version 1.9.1.",
    "Faux : ce n'est pas une commande de listing, elle applique une modification.",
    "Faux : elle modifie bel et bien la spec du Deployment, ce qui déclenche ensuite le pull par le kubelet lors du déploiement des nouveaux Pods."
  ],
  "explain": "`kubectl set image TYPE/NAME CONTAINER=IMAGE` met à jour directement l'image d'un ou plusieurs conteneurs nommés dans le template de Pod de la ressource ciblée (Deployment, DaemonSet, StatefulSet, etc.), déclenchant un rollout de la nouvelle version.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_set/kubectl_set_image/",
  "en": {
    "q": "What does the `kubectl set image deployment/nginx nginx=nginx:1.9.1` command do?",
    "choices": [
      "It creates a new Deployment named nginx using the nginx:1.9.1 image",
      "It updates the image of the container named nginx in the nginx Deployment's Pod template",
      "It lists all images used by the nginx Deployment",
      "It pulls the nginx:1.9.1 image on all nodes without modifying the Deployment"
    ]
  }
},
{
  "id": "t10-t11",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Sur `kubectl rollout status deployment/nginx --timeout=2m`, que fait précisément le flag `--timeout` ?",
  "choices": [
    "Il définit la durée d'attente avant que la commande n'arrête le watch ; une valeur de 0 signifie ne jamais s'arrêter",
    "Il annule automatiquement le rollout si celui-ci dépasse la durée indiquée",
    "Il définit le temps d'attente avant de redémarrer un Pod bloqué en CrashLoopBackOff",
    "Ce flag n'existe pas pour kubectl rollout status"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « The length of time to wait before ending watch, zero means never. Any other values should contain a corresponding time unit (e.g. 1s, 2m, 3h). »",
    "Faux : --timeout n'annule pas le rollout lui-même, il arrête seulement le suivi (watch) de la commande.",
    "Faux : ce flag n'a aucun rapport avec CrashLoopBackOff.",
    "Faux : --timeout est un flag bien réel et documenté de kubectl rollout status."
  ],
  "explain": "--timeout sur `kubectl rollout status` contrôle uniquement la durée pendant laquelle la commande reste à observer (watch) la progression du rollout avant de rendre la main ; une valeur de 0 signifie qu'elle attendra indéfiniment, sans jamais impacter le rollout du Deployment lui-même côté cluster.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_status/",
  "en": {
    "q": "On `kubectl rollout status deployment/nginx --timeout=2m`, what exactly does the `--timeout` flag do?",
    "choices": [
      "It sets how long to wait before ending the watch; a value of 0 means never end it",
      "It automatically cancels the rollout if it exceeds the given duration",
      "It sets the wait time before restarting a Pod stuck in CrashLoopBackOff",
      "This flag does not exist for kubectl rollout status"
    ]
  }
},
{
  "id": "t10-t12",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Quelle est la valeur par défaut du flag `--show-events` de `kubectl describe`, et cette valeur change-t-elle selon le contexte ?",
  "choices": [
    "Toujours true, quel que soit le nombre d'objets décrits",
    "Défaut true pour un seul objet décrit, mais false pour plusieurs objets ou en cas de correspondance par préfixe",
    "Toujours false par défaut, il faut l'activer explicitement",
    "Ce flag n'existe pas pour kubectl describe"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la valeur par défaut n'est pas constante, elle dépend du contexte (un seul objet vs plusieurs).",
    "Vrai : la doc précise « Defaults to true for a single object, false for multiple objects and prefix matching. »",
    "Faux : le défaut est true dans le cas le plus courant (un seul objet décrit).",
    "Faux : --show-events est un flag bien réel et documenté de kubectl describe."
  ],
  "explain": "--show-events de kubectl describe contrôle l'affichage de la section Events liée à l'objet décrit ; son comportement par défaut est contextuel : true quand un seul objet est décrit, mais false dès lors que plusieurs objets sont décrits simultanément (ou via une correspondance par préfixe de nom).",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/",
  "en": {
    "q": "What is the default value of the `--show-events` flag of `kubectl describe`, and does it change depending on context?",
    "choices": [
      "Always true, regardless of how many objects are described",
      "Defaults to true for a single described object, but false for multiple objects or prefix matching",
      "Always false by default, it must be explicitly enabled",
      "This flag does not exist for kubectl describe"
    ]
  }
},
{
  "id": "t10-t13",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Que produit la commande `kubectl get pod test-pod -o custom-columns=CONTAINER:.spec.containers[0].name,IMAGE:.spec.containers[0].image` ?",
  "choices": [
    "Un tableau avec deux colonnes nommées CONTAINER et IMAGE, affichant respectivement le nom et l'image du premier conteneur du Pod",
    "Une erreur, car custom-columns ne supporte pas les expressions JSONPath avec index de tableau",
    "La sortie complète du Pod en JSON, sans filtrage",
    "Un export CSV avec des colonnes nommées CONTAINER et IMAGE"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la syntaxe -o custom-columns=HEADER1:JSONPath1,HEADER2:JSONPath2 génère exactement un tableau avec les en-têtes CONTAINER et IMAGE, remplis via les chemins JSONPath indiqués.",
    "Faux : custom-columns supporte bien les expressions JSONPath avec index, comme le montre cet exemple documenté.",
    "Faux : custom-columns produit un affichage tabulaire filtré, pas la sortie JSON complète.",
    "Faux : le format de sortie de custom-columns est un tableau texte aligné, pas un export CSV."
  ],
  "explain": "Le format de sortie -o custom-columns=HEADER:JSONPath[,HEADER:JSONPath...] permet de définir des colonnes personnalisées à partir de chemins JSONPath précis dans l'objet, ici le nom et l'image du premier conteneur (index [0]) du Pod ciblé.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
  "en": {
    "q": "What does the command `kubectl get pod test-pod -o custom-columns=CONTAINER:.spec.containers[0].name,IMAGE:.spec.containers[0].image` produce?",
    "choices": [
      "A table with two columns named CONTAINER and IMAGE, showing respectively the name and image of the Pod's first container",
      "An error, because custom-columns doesn't support JSONPath expressions with array indexes",
      "The Pod's full JSON output, unfiltered",
      "A CSV export with columns named CONTAINER and IMAGE"
    ]
  }
},
{
  "id": "t10-t14",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait le flag `--timestamps` de `kubectl logs` ?",
  "choices": [
    "Il n'affiche que les logs produits après un certain timestamp",
    "Il inclut un horodatage sur chaque ligne de la sortie de log",
    "Il trie les lignes de log par ordre chronologique inverse",
    "Il convertit les timestamps en fuseau horaire local automatiquement"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le rôle de --since ou --since-time, pas de --timestamps.",
    "Vrai : la doc précise « Include timestamps on each line in the log output ».",
    "Faux : --timestamps n'affecte pas l'ordre d'affichage des lignes.",
    "Faux : aucune conversion de fuseau horaire n'est documentée pour ce flag."
  ],
  "explain": "--timestamps ajoute simplement un horodatage au début de chaque ligne des logs affichés par kubectl logs, sans filtrer ni réordonner les lignes — utile pour corréler des événements dans le temps lors d'un débogage.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/",
  "en": {
    "q": "What does the `--timestamps` flag of `kubectl logs` do?",
    "choices": [
      "It only shows logs produced after a certain timestamp",
      "It includes a timestamp on each line of the log output",
      "It sorts log lines in reverse chronological order",
      "It automatically converts timestamps to the local timezone"
    ]
  }
},
{
  "id": "t10-t2",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Quelle est la valeur par défaut du flag `--profile` de `kubectl debug`, et quelles sont les autres valeurs possibles ?",
  "choices": [
    "Défaut « general » ; autres valeurs possibles : baseline, restricted, netadmin, sysadmin",
    "Défaut « restricted » ; autres valeurs possibles : general, baseline, admin",
    "Défaut « sysadmin » ; c'est la seule valeur documentée",
    "Il n'existe pas de flag --profile pour kubectl debug"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « Options are \"general\", \"baseline\", \"restricted\", \"netadmin\" or \"sysadmin\". Defaults to \"general\" ».",
    "Faux : ce n'est pas restricted qui est la valeur par défaut, mais general.",
    "Faux : sysadmin n'est ni la valeur par défaut ni la seule valeur possible.",
    "Faux : --profile est un flag bien réel et documenté de kubectl debug."
  ],
  "explain": "Le flag --profile de kubectl debug définit le niveau de sécurité/capacités du conteneur de debug créé, avec « general » comme valeur par défaut ; les autres profils documentés sont baseline, restricted, netadmin et sysadmin, chacun ajustant les permissions accordées au conteneur éphémère de débogage.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_debug/",
  "en": {
    "q": "What is the default value of the `--profile` flag of `kubectl debug`, and what are the other possible values?",
    "choices": [
      "Default \"general\"; other possible values: baseline, restricted, netadmin, sysadmin",
      "Default \"restricted\"; other possible values: general, baseline, admin",
      "Default \"sysadmin\"; it's the only documented value",
      "There is no --profile flag for kubectl debug"
    ]
  }
},
{
  "id": "t10-t3",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "Concernant l'Eviction API (utilisée en interne par `kubectl drain`), quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "Créer un objet Eviction équivaut à un DELETE contrôlé par policy sur le Pod, via le sous-endpoint pods/eviction",
    "Contrairement à un DELETE direct, une éviction via cette API respecte les PodDisruptionBudgets configurés",
    "Si le PDB ne permet pas l'éviction actuellement, l'API répond 429 Too Many Requests",
    "Si le Pod ne fait partie d'aucun workload avec PodDisruptionBudget, l'éviction est toujours refusée (403 Forbidden)"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Vrai : la doc précise « Using the API to create an Eviction object for a Pod is like performing a policy-controlled DELETE operation on the Pod » via l'endpoint .../pods/{name}/eviction.",
    "Vrai : la doc précise « API-initiated evictions respect your configured PodDisruptionBudgets and terminationGracePeriodSeconds ».",
    "Vrai : la doc documente ce code de retour précis en cas de PDB bloquant l'éviction.",
    "Faux : c'est l'inverse — la doc précise que sans PDB associé, l'API server retourne toujours 200 OK et autorise l'éviction."
  ],
  "explain": "L'Eviction API (endpoint /api/v1/namespaces/{ns}/pods/{name}/eviction) permet une suppression de Pod respectant les PodDisruptionBudgets configurés, contrairement à un DELETE direct ; elle renvoie 200 OK si l'éviction est autorisée, 429 si un PDB s'y oppose temporairement, et toujours 200 OK si le Pod n'est couvert par aucun PDB.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/api-eviction/",
  "en": {
    "q": "Regarding the Eviction API (used internally by `kubectl drain`), which statements are correct? (select all that apply)",
    "choices": [
      "Creating an Eviction object is like a policy-controlled DELETE on the Pod, via the pods/eviction sub-endpoint",
      "Unlike a direct DELETE, an eviction through this API respects configured PodDisruptionBudgets",
      "If the PDB doesn't currently allow eviction, the API responds 429 Too Many Requests",
      "If the Pod isn't part of any workload with a PodDisruptionBudget, eviction is always refused (403 Forbidden)"
    ]
  }
},
{
  "id": "t10-t4",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Que fait le flag `--max-log-requests` de `kubectl logs`, et quelle est sa valeur par défaut ?",
  "choices": [
    "Il limite le nombre maximal de lignes affichées par requête de log ; défaut 100",
    "Il limite le nombre maximal de requêtes de logs concurrentes lors de l'utilisation d'un sélecteur (-l) sur plusieurs Pods ; défaut 5",
    "Il limite la taille en Mo de chaque fichier de log récupéré ; défaut 10",
    "Ce flag n'existe pas pour kubectl logs"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : ce n'est pas un flag de limitation du nombre de lignes, --tail joue ce rôle.",
    "Vrai : la doc précise « Specify maximum number of concurrent logs to follow when using by a selector. Defaults to 5. »",
    "Faux : il ne s'agit pas d'une limite de taille de fichier.",
    "Faux : --max-log-requests est un flag bien réel et documenté."
  ],
  "explain": "Quand on récupère les logs de plusieurs Pods simultanément via -l/--selector, --max-log-requests plafonne le nombre de requêtes de logs concurrentes (5 par défaut), évitant de surcharger le cluster si le sélecteur cible un grand nombre de Pods.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/",
  "en": {
    "q": "What does the `--max-log-requests` flag of `kubectl logs` do, and what is its default value?",
    "choices": [
      "It limits the maximum number of lines shown per log request; default 100",
      "It limits the maximum number of concurrent log requests when using a selector (-l) across multiple Pods; default 5",
      "It limits the size in MB of each retrieved log file; default 10",
      "This flag does not exist for kubectl logs"
    ]
  }
},
{
  "id": "t10-t5",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Sur `kubectl top node`, que fait le flag `--show-capacity` ?",
  "choices": [
    "Il affiche l'utilisation des ressources en pourcentage de la Capacity du nœud plutôt que de son Allocatable",
    "Il affiche uniquement les nœuds ayant atteint leur capacité maximale",
    "Il ajoute une colonne indiquant le nombre de Pods maximum autorisés sur le nœud",
    "Ce flag n'existe pas pour kubectl top node"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise que --show-capacity permet d'afficher les métriques en se basant sur la Capacity du nœud plutôt que sur ses ressources Allocatable.",
    "Faux : ce n'est pas un filtre sur les nœuds saturés.",
    "Faux : ce flag ne concerne pas le nombre maximum de Pods.",
    "Faux : --show-capacity est un flag documenté de kubectl top node."
  ],
  "explain": "Par défaut, `kubectl top node` calcule les pourcentages d'utilisation par rapport aux ressources Allocatable du nœud (ce qui reste après réservation système/kubelet) ; --show-capacity bascule ce calcul sur la Capacity totale du nœud, une base de comparaison différente.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_top/kubectl_top_node/",
  "en": {
    "q": "On `kubectl top node`, what does the `--show-capacity` flag do?",
    "choices": [
      "It shows resource usage as a percentage of the node's Capacity rather than its Allocatable resources",
      "It only shows nodes that have reached their maximum capacity",
      "It adds a column showing the maximum number of Pods allowed on the node",
      "This flag does not exist for kubectl top node"
    ]
  }
},
{
  "id": "t10-t6",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait la commande `kubectl explain pods.spec.containers` ?",
  "choices": [
    "Elle liste tous les Pods du cluster ayant au moins un conteneur",
    "Elle affiche la documentation du champ containers, imbriqué sous spec, du type de ressource pods",
    "Elle explique uniquement les conteneurs en cours d'exécution (runtime), pas leur définition",
    "C'est une syntaxe invalide, kubectl explain n'accepte qu'un seul niveau (ex. pods.spec)"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : kubectl explain ne liste pas d'instances de Pods, seulement de la documentation de schéma.",
    "Vrai : la doc illustre exactement cet exemple comme moyen d'obtenir « the documentation of a specific field of a resource », via un chemin pointé TYPE.FIELDNAME[.FIELDNAME].",
    "Faux : kubectl explain documente le schéma de l'API, pas l'état runtime des conteneurs.",
    "Faux : la syntaxe pointée accepte plusieurs niveaux d'imbrication, comme le montre justement cet exemple à deux niveaux."
  ],
  "explain": "kubectl explain accepte un chemin de champs séparés par des points (TYPE.FIELDNAME[.FIELDNAME]) pour naviguer directement vers la documentation d'un champ imbriqué du schéma d'une ressource, ici le champ containers sous spec pour le type pods, sans avoir à parcourir toute la doc du Pod.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_explain/",
  "en": {
    "q": "What does the `kubectl explain pods.spec.containers` command do?",
    "choices": [
      "It lists all Pods in the cluster that have at least one container",
      "It shows the documentation for the containers field, nested under spec, of the pods resource type",
      "It only explains running (runtime) containers, not their definition",
      "This is invalid syntax, kubectl explain only accepts a single level (e.g. pods.spec)"
    ]
  }
},
{
  "id": "t10-t7",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Sans le flag `--overwrite`, que se passe-t-il si `kubectl label pods foo status=unhealthy` tente de modifier une valeur de label déjà existante sur ce Pod ?",
  "choices": [
    "La valeur est silencieusement écrasée par la nouvelle",
    "La commande échoue avec une erreur, car la modification d'un label existant est rejetée sans --overwrite",
    "Le nouveau label est ajouté en plus de l'ancien, les deux coexistent",
    "Kubernetes fusionne automatiquement les deux valeurs en une liste"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est justement le comportement que --overwrite doit activer explicitement.",
    "Vrai : la doc précise « If --overwrite is true, then existing labels can be overwritten, otherwise attempting to overwrite a label will result in an error. »",
    "Faux : un label est une paire clé/valeur unique, pas une liste ; il n'y a pas de coexistence de deux valeurs pour la même clé.",
    "Faux : aucune fusion en liste n'est documentée pour les labels."
  ],
  "explain": "Par défaut, kubectl label rejette avec une erreur toute tentative de modification de la valeur d'un label déjà présent sur l'objet, pour éviter un écrasement accidentel ; il faut passer explicitement --overwrite pour autoriser ce remplacement.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_label/",
  "en": {
    "q": "Without the `--overwrite` flag, what happens if `kubectl label pods foo status=unhealthy` tries to change an already-existing label value on that Pod?",
    "choices": [
      "The value is silently overwritten with the new one",
      "The command fails with an error, since modifying an existing label is rejected without --overwrite",
      "The new label is added alongside the old one, both coexist",
      "Kubernetes automatically merges both values into a list"
    ]
  }
},
{
  "id": "t10-t8",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait le flag `--show-labels` de `kubectl get` ?",
  "choices": [
    "Il affiche tous les labels comme dernière colonne du tableau (masqués par défaut)",
    "Il filtre les ressources qui n'ont aucun label",
    "Il affiche uniquement le nombre de labels par ressource, sans leur contenu",
    "Il trie les résultats par ordre alphabétique de label"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « When printing, show all labels as the last column (default hide labels column) ».",
    "Faux : --show-labels n'est pas un filtre, c'est un affichage additionnel.",
    "Faux : ce flag affiche le contenu complet des labels, pas seulement leur nombre.",
    "Faux : --show-labels ne trie rien, c'est le rôle de --sort-by."
  ],
  "explain": "Par défaut, kubectl get masque la colonne des labels ; --show-labels l'ajoute en dernière position du tableau affiché, montrant l'ensemble des labels de chaque ressource listée.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
  "en": {
    "q": "What does the `--show-labels` flag of `kubectl get` do?",
    "choices": [
      "It shows all labels as the last column of the table (hidden by default)",
      "It filters out resources that have no labels",
      "It only shows the count of labels per resource, not their content",
      "It sorts results alphabetically by label"
    ]
  }
},
{
  "id": "t10-t9",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait la commande `kubectl api-versions` ?",
  "choices": [
    "Elle liste les types de ressources disponibles sur le cluster",
    "Elle affiche les versions d'API supportées par le serveur, sous la forme group/version",
    "Elle affiche la version du serveur kubectl installé localement",
    "Elle liste les versions de Kubernetes compatibles pour une mise à niveau"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le rôle de `kubectl api-resources`, distinct de `api-versions`.",
    "Vrai : la doc décrit la commande comme « Print the supported API versions on the server, in the form of \"group/version\" ».",
    "Faux : ce n'est pas la version du binaire kubectl, mais les API versions supportées côté serveur.",
    "Faux : cette commande ne fournit aucune information de compatibilité pour un upgrade de cluster."
  ],
  "explain": "`kubectl api-versions` affiche la liste des groupes/versions d'API (format group/version, ex. apps/v1) supportés par le serveur Kubernetes courant, une commande distincte de `kubectl api-resources` qui liste plutôt les types de ressources.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_api-versions/",
  "en": {
    "q": "What does the `kubectl api-versions` command do?",
    "choices": [
      "It lists the resource types available on the cluster",
      "It prints the API versions supported by the server, in group/version form",
      "It shows the version of the locally installed kubectl binary",
      "It lists Kubernetes versions compatible for an upgrade"
    ]
  }
}
  ];
  DATA.forEach((o) => Q.push(Object.assign({ type: "theory" }, o)));
  window.CKA._t10 = DATA.length;
})();
