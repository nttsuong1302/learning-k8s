// Lot 6 : +50 questions théoriques sourcées sur kubernetes.io (scan de la doc).
// Chaque question porte why[] par option, explain (synthèse) et ref (doc officielle),
// plus la traduction en:{q,choices}. Répartition par pondération CKA.
(function () {
  const Q = window.CKA.questions;
  const DATA = [
{
  "id": "t6-a1",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Que permet de faire un objet ValidatingAdmissionPolicy dans Kubernetes ?",
  "choices": [
    "Définir des règles de validation déclaratives via des expressions CEL, évaluées directement par l'API server sans appeler de service externe",
    "Remplacer entièrement les webhooks de mutation (MutatingAdmissionWebhook)",
    "Modifier automatiquement les objets non conformes avant leur persistance en etcd",
    "Chiffrer les Secrets au repos dans etcd"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est une alternative in-process aux webhooks de validation, basée sur CEL (groupe admissionregistration.k8s.io/v1).",
    "Faux : ValidatingAdmissionPolicy est une alternative aux webhooks de VALIDATION, pas de mutation ; elle ne modifie pas les objets.",
    "Faux : une politique de validation rejette ou avertit, elle ne mute pas l'objet.",
    "Faux : le chiffrement au repos relève d'EncryptionConfiguration, sujet distinct."
  ],
  "explain": "Une ValidatingAdmissionPolicy déclare des règles CEL (champ spec.validations) évaluées en interne par l'API server, avec un failurePolicy par défaut à Fail. Elle est liée à des ressources via une ValidatingAdmissionPolicyBinding qui définit notamment validationActions (Deny, Warn, Audit).",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy/",
  "en": {
    "q": "What does a ValidatingAdmissionPolicy object let you do in Kubernetes?",
    "choices": [
      "Define declarative validation rules using CEL expressions, evaluated directly by the API server without calling an external service",
      "Fully replace mutating admission webhooks (MutatingAdmissionWebhook)",
      "Automatically modify non-compliant objects before they are persisted to etcd",
      "Encrypt Secrets at rest in etcd"
    ]
  }
},
{
  "id": "t6-a10",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Quel flag du kube-apiserver définit la plage d'adresses IP CIDR utilisée pour attribuer les ClusterIP des Services ?",
  "choices": [
    "--service-cluster-ip-range",
    "--cluster-cidr",
    "--pod-network-cidr",
    "--etcd-servers"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : --service-cluster-ip-range est le flag du kube-apiserver pour la plage CIDR des ClusterIP de Services.",
    "Faux : --cluster-cidr concerne le CIDR des Pods côté kube-controller-manager/kube-proxy, pas les ClusterIP.",
    "Faux : --pod-network-cidr est un flag de kubeadm init, pas un flag du kube-apiserver.",
    "Faux : --etcd-servers liste les URL des serveurs etcd, sans rapport avec les IP de Service."
  ],
  "explain": "--service-cluster-ip-range est une plage CIDR qui ne doit pas chevaucher les plages d'IP attribuées aux nœuds pour les Pods. --etcd-servers, autre flag du kube-apiserver, liste séparément les URL vers les serveurs etcd du cluster.",
  "ref": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/",
  "en": {
    "q": "Which kube-apiserver flag sets the CIDR IP range used to assign Service ClusterIPs?",
    "choices": [
      "--service-cluster-ip-range",
      "--cluster-cidr",
      "--pod-network-cidr",
      "--etcd-servers"
    ]
  }
},
{
  "id": "t6-a11",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Dans le mécanisme d'authentification par proxy (authenticating proxy) utilisé notamment par la couche d'agrégation (aggregation layer), à quoi sert le flag --requestheader-client-ca-file du kube-apiserver ?",
  "choices": [
    "Il fournit le bundle de certificats CA utilisé pour vérifier le certificat client présenté par le proxy, avant de faire confiance aux en-têtes d'identité qu'il transmet",
    "Il fournit le certificat client que l'API server utilise pour s'authentifier auprès des kubelets",
    "Il définit la liste des en-têtes HTTP contenant le nom d'utilisateur transmis par le proxy",
    "Il chiffre les en-têtes X-Remote-User avant leur transmission au proxy"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : ce CA valide le certificat client du front-proxy ; seul un proxy présentant un certificat signé par cette CA (et dont le CN figure dans --requestheader-allowed-names) est de confiance.",
    "Faux : cela décrit plutôt les certificats client kubelet de l'API server, un mécanisme distinct.",
    "Faux : la liste des en-têtes de username est définie par --requestheader-username-headers, pas par --requestheader-client-ca-file.",
    "Faux : le mécanisme ne chiffre pas les en-têtes ; la confiance repose sur la validation du certificat client TLS du proxy."
  ],
  "explain": "L'authenticating proxy transmet l'identité de l'utilisateur via des en-têtes HTTP (X-Remote-User, X-Remote-Group...). L'API server ne fait confiance à ces en-têtes que si la requête provient d'un proxy dont le certificat client est validé par --requestheader-client-ca-file (typiquement front-proxy-ca.crt sous kubeadm) et dont le CN est autorisé par --requestheader-allowed-names.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/authentication/#authenticating-proxy",
  "en": {
    "q": "In the authenticating proxy mechanism used notably by the aggregation layer, what is the purpose of the kube-apiserver --requestheader-client-ca-file flag?",
    "choices": [
      "It supplies the CA certificate bundle used to verify the client certificate presented by the proxy, before trusting the identity headers it forwards",
      "It supplies the client certificate the API server uses to authenticate to kubelets",
      "It defines the list of HTTP headers carrying the username forwarded by the proxy",
      "It encrypts the X-Remote-User headers before they are sent to the proxy"
    ]
  }
},
{
  "id": "t6-a12",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Concernant l'EncryptionConfiguration utilisée pour le chiffrement au repos des Secrets dans etcd, quelles affirmations sont correctes ? (plusieurs réponses)",
  "choices": [
    "C'est le PREMIER provider listé pour une ressource donnée qui est utilisé pour chiffrer les nouvelles écritures",
    "Tous les providers listés peuvent être utilisés pour déchiffrer les données existantes, essayés dans l'ordre de la liste",
    "Changer la configuration de chiffrement rechiffre automatiquement, en arrière-plan, toutes les ressources déjà stockées dans etcd",
    "Le provider identity stocke la ressource en clair, sans chiffrement"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : seul le premier provider de la liste chiffre les nouvelles données ; les suivants ne servent qu'au déchiffrement de compatibilité.",
    "Correct : lors de la lecture, chaque provider est essayé dans l'ordre pour tenter de déchiffrer la donnée stockée.",
    "Faux : changer la configuration ne rechiffre rien automatiquement ; il faut réécrire les ressources existantes, par exemple via kubectl get secrets --all-namespaces -o json suivi de kubectl replace -f -.",
    "Correct : identity signifie stockage en clair ; s'il est premier dans la liste, la ressource n'est pas chiffrée."
  ],
  "explain": "L'EncryptionConfiguration (fournie via --encryption-provider-config du kube-apiserver) liste des providers par ressource (secrets, configmaps...). Seul le premier provider chiffre les nouvelles écritures ; tous sont candidats au déchiffrement dans l'ordre. Un changement de configuration ne s'applique qu'aux futures écritures : il faut réécrire explicitement les ressources existantes pour les rechiffrer.",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/",
  "en": {
    "q": "Regarding the EncryptionConfiguration used for at-rest encryption of Secrets in etcd, which statements are correct? (multiple answers)",
    "choices": [
      "The FIRST provider listed for a given resource is the one used to encrypt new writes",
      "All listed providers can be used to decrypt existing data, tried in list order",
      "Changing the encryption configuration automatically re-encrypts, in the background, all resources already stored in etcd",
      "The identity provider stores the resource in plain text, with no encryption"
    ]
  }
},
{
  "id": "t6-a2",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Concernant l'API Priority and Fairness (APF) du kube-apiserver, quelle affirmation est correcte ?",
  "choices": [
    "Un objet FlowSchema classe les requêtes entrantes et les associe à un PriorityLevelConfiguration",
    "APF rejette immédiatement toute requête qui dépasse la limite de concurrence de son niveau de priorité",
    "APF supprime totalement l'utilité des flags --max-requests-inflight et --max-mutating-requests-inflight, qui ne sont plus utilisés du tout",
    "Les requêtes de longue durée comme l'exécution de commandes distantes (exec) sont filtrées par APF comme les autres requêtes"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : le FlowSchema classifie une requête selon ses attributs et l'affecte à un niveau de priorité.",
    "Faux : APF met en file d'attente (queue) les requêtes en excès plutôt que de les rejeter immédiatement, pour absorber les pics de trafic.",
    "Faux : la somme de ces deux flags reste utilisée comme base, mais elle est répartie entre les niveaux de priorité par APF.",
    "Faux : les requêtes de longue durée (exec, log tailing) sont exemptées du filtrage APF."
  ],
  "explain": "L'API Priority and Fairness isole la concurrence entre catégories de requêtes via des FlowSchema (classification) et des PriorityLevelConfiguration (limites de concurrence et mise en file d'attente équitable), afin qu'un client ne puisse pas affamer les requêtes système critiques (élection de leader, contrôleurs).",
  "ref": "https://kubernetes.io/docs/concepts/cluster-administration/flow-control/",
  "en": {
    "q": "Regarding kube-apiserver's API Priority and Fairness (APF), which statement is correct?",
    "choices": [
      "A FlowSchema classifies incoming requests and assigns them to a PriorityLevelConfiguration",
      "APF immediately rejects any request that exceeds its priority level's concurrency limit",
      "APF makes the --max-requests-inflight and --max-mutating-requests-inflight flags completely unused",
      "Long-running requests such as remote exec are filtered by APF just like other requests"
    ]
  }
},
{
  "id": "t6-a3",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Concernant la structure et la résolution d'un fichier kubeconfig, quelles affirmations sont correctes ? (plusieurs réponses)",
  "choices": [
    "Le fichier définit trois types d'entrées : clusters, users et contexts",
    "Si le flag --kubeconfig est fourni, il est utilisé seul, sans fusion avec d'autres fichiers",
    "Quand plusieurs fichiers sont listés dans la variable KUBECONFIG, c'est le dernier fichier de la liste qui l'emporte en cas de clé en conflit",
    "En l'absence de --kubeconfig et de la variable KUBECONFIG, kubectl utilise par défaut le fichier $HOME/.kube/config"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : chaque contexte associe un cluster et un user, éventuellement avec un namespace par défaut.",
    "Correct : --kubeconfig a la priorité la plus haute et désigne un unique fichier, sans fusion.",
    "Faux : c'est le PREMIER fichier de la liste KUBECONFIG qui l'emporte pour une clé donnée ; les fichiers suivants ne peuvent pas écraser une valeur déjà définie.",
    "Correct : c'est l'emplacement par défaut, priorité la plus basse."
  ],
  "explain": "kubectl résout le kubeconfig dans cet ordre de priorité : --kubeconfig (fichier unique), puis la variable KUBECONFIG (fusion de plusieurs fichiers, où le premier fichier à définir une clé donnée l'emporte), puis enfin $HOME/.kube/config par défaut. Un fichier organise clusters, users et contexts séparément.",
  "ref": "https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/",
  "en": {
    "q": "Regarding the structure and resolution of a kubeconfig file, which statements are correct? (multiple answers)",
    "choices": [
      "The file defines three types of entries: clusters, users, and contexts",
      "If the --kubeconfig flag is given, it is used alone, with no merging of other files",
      "When several files are listed in the KUBECONFIG variable, the LAST file in the list wins on a conflicting key",
      "Without --kubeconfig and without the KUBECONFIG variable, kubectl defaults to $HOME/.kube/config"
    ]
  }
},
{
  "id": "t6-a4",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Pour qu'un utilisateur puisse exécuter avec succès `kubectl certificate approve` sur une CertificateSigningRequest utilisant un signer donné, quel verbe RBAC doit-il posséder sur la ressource `signers` du groupe API certificates.k8s.io ?",
  "choices": [
    "approve",
    "update",
    "create",
    "bind"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : le verbe approve sur la ressource signers (avec resourceNames ciblant le signer, par exemple example.com/*) autorise l'approbation pour ce signer.",
    "Faux : update est requis séparément sur le sous-objet certificatesigningrequests/approval, mais pas sur signers.",
    "Faux : create n'est pas le verbe utilisé pour approuver un CSR existant.",
    "Faux : bind concerne l'attribution de rôles RBAC, sans rapport avec les CSR."
  ],
  "explain": "L'approbation d'une CertificateSigningRequest nécessite get/list/watch sur certificatesigningrequests, update sur le sous-objet certificatesigningrequests/approval, ET le verbe approve sur la ressource signers (restreint via resourceNames au signer concerné). kubectl certificate approve met simplement à jour cette condition d'approbation.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/",
  "en": {
    "q": "For a user to successfully run `kubectl certificate approve` on a CertificateSigningRequest using a given signer, which RBAC verb must they have on the `signers` resource in the certificates.k8s.io API group?",
    "choices": [
      "approve",
      "update",
      "create",
      "bind"
    ]
  }
},
{
  "id": "t6-a5",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Un bootstrap token kubeadm est stocké sous forme de Secret Kubernetes. Quelles affirmations sont correctes ? (plusieurs réponses)",
  "choices": [
    "Le Secret est de type bootstrap.kubernetes.io/token et vit dans le namespace kube-system",
    "Le nom du Secret doit être de la forme bootstrap-token- suivi du token-id",
    "Le token complet est composé d'un identifiant de 6 caractères et d'un secret de 16 caractères, séparés par un point",
    "Le Secret authentifie le porteur du token sous l'identité system:node suivie du nom du nœud"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : type bootstrap.kubernetes.io/token, namespace kube-system obligatoires.",
    "Correct : la convention de nommage exige ce préfixe suivi du token-id.",
    "Correct : format id.secret respectant [a-z0-9]{6}.[a-z0-9]{16}, par exemple 07401b.f395accd246ae52d.",
    "Faux : l'identité obtenue est system:bootstrap: suivie du token-id, dans le groupe system:bootstrappers, pas system:node."
  ],
  "explain": "Un bootstrap token kubeadm est représenté par un Secret nommé bootstrap-token- suivi du token-id, dans le namespace kube-system, de type bootstrap.kubernetes.io/token. Une fois authentifié comme bearer token (--enable-bootstrap-token-auth côté API server), il donne l'identité system:bootstrap: suivie du token-id, dans le groupe system:bootstrappers.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/bootstrap-tokens/",
  "en": {
    "q": "A kubeadm bootstrap token is stored as a Kubernetes Secret. Which statements are correct? (multiple answers)",
    "choices": [
      "The Secret has type bootstrap.kubernetes.io/token and lives in the kube-system namespace",
      "The Secret's name must be of the form bootstrap-token- followed by the token-id",
      "The full token consists of a 6-character id and a 16-character secret, separated by a dot",
      "The Secret authenticates the bearer as identity system:node followed by the node name"
    ]
  }
},
{
  "id": "t6-a6",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "À quoi sert le flag --service-account-issuer du kube-apiserver ?",
  "choices": [
    "Il définit la valeur de la revendication (claim) iss inscrite dans les tokens de ServiceAccount émis par l'API server",
    "Il définit l'adresse d'un serveur OIDC externe qui remplace complètement l'authentification par ServiceAccount",
    "Il désactive la création de tokens de ServiceAccount projetés (projected volumes)",
    "Il définit la durée de vie par défaut de tous les tokens de ServiceAccount, y compris ceux créés via TokenRequest"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : --service-account-issuer fixe l'issuer (iss) des JWT de ServiceAccount, utilisé par les vérificateurs de tokens externes.",
    "Faux : il ne remplace pas l'authentification ServiceAccount, il configure l'identité de l'émetteur de ses tokens.",
    "Faux : les tokens projetés continuent de fonctionner ; le flag ne les désactive pas.",
    "Faux : la durée de vie est configurée via expirationSeconds sur le volume projeté ou --duration de kubectl create token, pas via --service-account-issuer."
  ],
  "explain": "L'API TokenRequest permet de générer des tokens de ServiceAccount à courte durée de vie, liés à un objet (Pod, Secret, Node...). --service-account-issuer positionne le claim iss de ces JWT afin que des systèmes externes puissent valider leur authenticité.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/",
  "en": {
    "q": "What is the purpose of the kube-apiserver --service-account-issuer flag?",
    "choices": [
      "It sets the value of the iss claim written into ServiceAccount tokens issued by the API server",
      "It sets the address of an external OIDC server that completely replaces ServiceAccount authentication",
      "It disables the creation of projected ServiceAccount tokens",
      "It sets the default lifetime of all ServiceAccount tokens, including ones created via TokenRequest"
    ]
  }
},
{
  "id": "t6-a7",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Concernant l'audit logging du kube-apiserver, quelles affirmations sont correctes ? (plusieurs réponses)",
  "choices": [
    "Les stages (RequestReceived, ResponseStarted, ResponseComplete, Panic) décrivent à quel MOMENT du traitement de la requête un événement est généré",
    "Les levels (None, Metadata, Request, RequestResponse) décrivent quelle QUANTITÉ d'information est enregistrée dans l'événement",
    "Le level RequestResponse enregistre le corps de la requête mais jamais le corps de la réponse",
    "Le flag --audit-policy-file est obligatoire pour activer l'audit logging, et une politique sans aucune règle (rules) est invalide"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : les stages correspondent à des instants du cycle de vie de la requête (reçue, réponse démarrée, réponse terminée, panique).",
    "Correct : les levels graduent la quantité de détail, de rien (None) jusqu'à requête + réponse (RequestResponse).",
    "Faux : RequestResponse enregistre le corps de la requête ET celui de la réponse ; Request n'enregistre que la requête.",
    "Correct : --audit-policy-file est requis pour activer l'audit, et le champ rules doit être présent et non vide."
  ],
  "explain": "Deux axes distincts structurent l'audit Kubernetes : les stages indiquent QUAND l'événement est capturé dans le traitement de la requête, tandis que les levels (None/Metadata/Request/RequestResponse) indiquent QUOI est enregistré. La politique est fournie via --audit-policy-file et les événements écrits via --audit-log-path.",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/",
  "en": {
    "q": "Regarding kube-apiserver audit logging, which statements are correct? (multiple answers)",
    "choices": [
      "Stages (RequestReceived, ResponseStarted, ResponseComplete, Panic) describe WHEN in request processing an event is generated",
      "Levels (None, Metadata, Request, RequestResponse) describe HOW MUCH information is recorded in the event",
      "The RequestResponse level records the request body but never the response body",
      "The --audit-policy-file flag is required to enable audit logging, and a policy with no rules at all is invalid"
    ]
  }
},
{
  "id": "t6-a8",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Concernant les feature gates dans Kubernetes, quelle affirmation est correcte ?",
  "choices": [
    "Une fonctionnalité au stade Beta est activée par défaut, alors qu'une fonctionnalité au stade Alpha est désactivée par défaut",
    "Le flag --feature-gates n'est disponible que sur le kube-apiserver",
    "Une fonctionnalité au stade Stable (GA) peut toujours être désactivée via --feature-gates",
    "--feature-gates n'accepte qu'un seul couple clé=valeur par invocation, sans liste possible"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : Alpha = désactivé par défaut, Beta = activé par défaut.",
    "Faux : kube-apiserver, kube-controller-manager, kube-scheduler, kube-proxy et kubelet acceptent tous --feature-gates.",
    "Faux : une fonctionnalité Stable (GA) est toujours activée et ne peut plus être désactivée.",
    "Faux : --feature-gates accepte une liste de couples clé=valeur séparés par des virgules."
  ],
  "explain": "Les feature gates suivent un cycle de vie Alpha (désactivé par défaut) → Beta (activé par défaut) → Stable/GA (toujours activé, non désactivable). Le flag --feature-gates=Feature1=true,Feature2=false est accepté par plusieurs composants du plan de contrôle et le kubelet.",
  "ref": "https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/",
  "en": {
    "q": "Regarding feature gates in Kubernetes, which statement is correct?",
    "choices": [
      "A Beta-stage feature is enabled by default, whereas an Alpha-stage feature is disabled by default",
      "The --feature-gates flag is only available on kube-apiserver",
      "A Stable (GA) feature can still be disabled via --feature-gates",
      "--feature-gates only accepts a single key=value pair per invocation, no list is possible"
    ]
  }
},
{
  "id": "t6-a9",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Pourquoi faut-il exécuter une défragmentation (etcdutl/etcdctl defrag) après une compaction etcd ?",
  "choices": [
    "Parce que la compaction supprime les révisions historiques mais ne libère pas immédiatement l'espace disque du fichier de base de données ; la défragmentation réécrit ce fichier pour récupérer cet espace",
    "Parce que la compaction chiffre les données et que la défragmentation les déchiffre",
    "Parce que --auto-compaction-retention supprime le fichier de données etcd, qu'il faut ensuite recréer par défragmentation",
    "Parce que la défragmentation modifie l'algorithme de consensus Raft utilisé par le cluster"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la compaction retire l'historique des révisions, mais l'espace disque du fichier bbolt n'est pas rendu au système tant qu'une défragmentation n'est pas effectuée.",
    "Faux : compaction et chiffrement sont deux sujets indépendants.",
    "Faux : --auto-compaction-retention pilote la fréquence de compaction, il ne supprime pas le fichier de données.",
    "Faux : la défragmentation est une opération de stockage, elle ne touche pas au protocole Raft."
  ],
  "explain": "La compaction retire les anciennes révisions selon la politique --auto-compaction-retention, mais l'espace resté libre dans le fichier de base de données n'est récupéré qu'après une défragmentation, qui réécrit le fichier. Il est recommandé de défragmenter les membres un par un pour ne pas dégrader la disponibilité du cluster.",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/",
  "en": {
    "q": "Why is defragmentation (etcdutl/etcdctl defrag) needed after etcd compaction?",
    "choices": [
      "Because compaction removes historical revisions but does not immediately free the database file's disk space; defragmentation rewrites the file to reclaim that space",
      "Because compaction encrypts the data and defragmentation decrypts it",
      "Because --auto-compaction-retention deletes the etcd data file, which then must be recreated by defragmentation",
      "Because defragmentation changes the Raft consensus algorithm used by the cluster"
    ]
  }
},
{
  "id": "t6-w1",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Quels sont les avantages documentés de marquer un ConfigMap comme immuable (`immutable: true`) sur un cluster qui en utilise massivement ? (plusieurs réponses)",
  "choices": [
    "Cela protège contre des mises à jour accidentelles ou non voulues pouvant causer une panne applicative",
    "Cela améliore les performances du cluster en réduisant fortement la charge sur le kube-apiserver, car les watches sur ces ConfigMaps sont fermés",
    "Cela permet de modifier les données du ConfigMap plus rapidement qu'un ConfigMap classique",
    "Cela permet de repasser le champ `immutable` à `false` si besoin de modifier les données plus tard"
  ],
  "correct": [
    0,
    1
  ],
  "why": [
    "Vrai : la doc liste explicitement la protection contre les mises à jour accidentelles/non voulues qui pourraient provoquer des pannes applicatives.",
    "Vrai : la doc indique une amélioration de performance du cluster par réduction significative de la charge sur le kube-apiserver, grâce à la fermeture des watches sur les ConfigMaps marqués immuables.",
    "Faux : un ConfigMap immuable ne peut plus voir ses données modifiées du tout, ce n'est pas plus rapide, c'est interdit.",
    "Faux : une fois marqué immuable, il est impossible de revenir en arrière ; il faut supprimer et recréer le ConfigMap."
  ],
  "explain": "Depuis la stable v1.21, le champ `immutable: true` sur un ConfigMap (ou Secret) empêche toute modification du contenu (`data`/`binaryData`). Pour les clusters à forte volumétrie de ConfigMaps montés dans des Pods, cela apporte deux bénéfices documentés : protection contre les changements accidentels causant des pannes, et réduction de charge sur le kube-apiserver (fin des watches sur ces objets). Une fois immuable, le champ ne peut plus être annulé : il faut supprimer et recréer l'objet (et recréer les Pods qui le montent).",
  "ref": "https://kubernetes.io/docs/concepts/configuration/configmap/#configmap-immutable",
  "en": {
    "q": "What documented advantages does marking a ConfigMap as immutable (`immutable: true`) provide on a cluster that uses ConfigMaps extensively? (select all that apply)",
    "choices": [
      "It protects against accidental or unwanted updates that could cause application outages",
      "It improves cluster performance by significantly reducing load on the kube-apiserver, since watches for these ConfigMaps are closed",
      "It lets you modify the ConfigMap's data faster than a regular ConfigMap",
      "It lets you set the `immutable` field back to `false` later if you need to change the data"
    ]
  }
},
{
  "id": "t6-w2",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Un Pod utilise le champ suivant :\n```\nenvFrom:\n- configMapRef:\n    name: myconfigmap\n```\nQue fait ce champ `envFrom` ?",
  "choices": [
    "Il crée une variable d'environnement pour chaque paire clé/valeur du ConfigMap `myconfigmap`, en une seule fois",
    "Il monte le ConfigMap `myconfigmap` comme un volume en lecture seule dans le conteneur",
    "Il ne crée qu'une seule variable d'environnement contenant tout le ConfigMap sérialisé en JSON",
    "Il exécute la commande définie dans le ConfigMap comme point d'entrée du conteneur"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc précise que le champ `envFrom` indique à Kubernetes de créer des variables d'environnement à partir des sources qu'il contient ; `configMapRef` sélectionne toutes les paires clé/valeur du ConfigMap référencé.",
    "Faux : c'est le rôle d'un volume de type `configMap`, pas de `envFrom`.",
    "Faux : chaque clé du ConfigMap devient sa propre variable d'environnement, il n'y a pas de sérialisation JSON unique.",
    "Faux : `envFrom`/`configMapRef` ne concerne que les variables d'environnement, pas la commande du conteneur."
  ],
  "explain": "`envFrom` permet d'injecter en une seule déclaration toutes les paires clé/valeur d'un ConfigMap (ou Secret) comme variables d'environnement d'un conteneur, via `configMapRef` (ou `secretRef`), sans avoir à lister chaque clé individuellement avec `valueFrom.configMapKeyRef`.",
  "ref": "https://kubernetes.io/docs/concepts/configuration/configmap/#configmaps-and-pods",
  "en": {
    "q": "A Pod uses the following field:\n```\nenvFrom:\n- configMapRef:\n    name: myconfigmap\n```\nWhat does this `envFrom` field do?",
    "choices": [
      "It creates one environment variable for every key/value pair in the `myconfigmap` ConfigMap, all at once",
      "It mounts the `myconfigmap` ConfigMap as a read-only volume in the container",
      "It creates a single environment variable containing the whole ConfigMap serialized as JSON",
      "It runs the command defined in the ConfigMap as the container's entrypoint"
    ]
  }
},
{
  "id": "t6-w3",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Un ConfigMap contient une clé `my-key` (valide) et une clé `my.invalid-key!` (ne respectant pas les règles de nom de variable d'environnement). Un Pod le référence via `envFrom`. Que se passe-t-il, d'après la documentation ?",
  "choices": [
    "Le Pod démarre normalement, seule la clé invalide n'est pas exposée comme variable d'environnement",
    "Le Pod ne peut pas démarrer tant que la clé invalide n'est pas corrigée ou supprimée du ConfigMap",
    "Kubernetes renomme automatiquement la clé invalide pour la rendre conforme avant de l'exposer",
    "Toutes les clés du ConfigMap, y compris `my-key`, sont ignorées dès qu'une seule clé est invalide"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc précise que si des clés ne respectent pas les règles de nommage des variables d'environnement, elles ne sont pas rendues disponibles dans le conteneur, mais le Pod est autorisé à démarrer.",
    "Faux : le Pod démarre quand même, seule la clé fautive est ignorée.",
    "Faux : Kubernetes ne renomme rien automatiquement, il ignore simplement la clé non conforme.",
    "Faux : seules les clés invalides sont exclues, les clés valides du même ConfigMap restent exposées."
  ],
  "explain": "Le nommage des variables d'environnement dans les Pods est contraint. D'après la doc ConfigMap, si une ou plusieurs clés ne respectent pas ces règles, ces clés précises ne sont pas rendues disponibles au conteneur via `envFrom`, mais cela n'empêche pas le Pod de démarrer.",
  "ref": "https://kubernetes.io/docs/concepts/configuration/configmap/#configmaps-and-pods",
  "en": {
    "q": "A ConfigMap contains a valid key `my-key` and an invalid key `my.invalid-key!` (it does not follow environment variable naming rules). A Pod references it via `envFrom`. What happens, according to the documentation?",
    "choices": [
      "The Pod starts normally, only the invalid key is not exposed as an environment variable",
      "The Pod cannot start until the invalid key is fixed or removed from the ConfigMap",
      "Kubernetes automatically renames the invalid key to make it compliant before exposing it",
      "All keys in the ConfigMap, including `my-key`, are skipped as soon as one key is invalid"
    ]
  }
},
{
  "id": "t6-w4",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Quel type de Secret Kubernetes intégré est utilisé pour stocker les identifiants nécessaires pour tirer une image depuis un registre privé (`~/.docker/config.json`) ?",
  "choices": [
    "kubernetes.io/dockerconfigjson",
    "kubernetes.io/tls",
    "kubernetes.io/basic-auth",
    "kubernetes.io/service-account-token"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : ce type stocke un fichier `~/.docker/config.json` sérialisé, utilisé notamment pour les `imagePullSecrets`.",
    "Faux : ce type stocke des données pour un client/serveur TLS (certificat + clé), pas des identifiants de registre.",
    "Faux : ce type stocke des identifiants pour une authentification basique (utilisateur/mot de passe génériques), pas spécifiquement un registre d'images.",
    "Faux : ce type est utilisé par le plan de contrôle pour les jetons de ServiceAccount, sans rapport avec le pull d'images."
  ],
  "explain": "Kubernetes définit plusieurs types de Secret intégrés identifiés par leur champ `type`. `kubernetes.io/dockerconfigjson` sert à stocker un fichier `~/.docker/config.json` sérialisé, typiquement utilisé pour authentifier des pulls d'images depuis un registre privé.",
  "ref": "https://kubernetes.io/docs/concepts/configuration/secret/#secret-types",
  "en": {
    "q": "Which built-in Kubernetes Secret type is used to store credentials for pulling an image from a private registry (a serialized `~/.docker/config.json` file)?",
    "choices": [
      "kubernetes.io/dockerconfigjson",
      "kubernetes.io/tls",
      "kubernetes.io/basic-auth",
      "kubernetes.io/service-account-token"
    ]
  }
},
{
  "id": "t6-w5",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Que signifie le champ `.spec.minReadySeconds` d'un Deployment, et quelle est sa valeur par défaut ?",
  "choices": [
    "Le nombre minimum de secondes pendant lesquelles un Pod nouvellement créé doit être prêt sans qu'aucun conteneur ne plante, pour être considéré comme disponible ; par défaut 0",
    "Le délai maximum toléré avant qu'un Pod ne soit programmé sur un nœud ; par défaut 0",
    "Le nombre minimum de secondes que le rollout attend avant de créer le premier nouveau Pod ; par défaut 10",
    "Le temps minimum pendant lequel un ancien ReplicaSet est conservé avant suppression ; par défaut 600"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : c'est la définition exacte donnée par la documentation pour `.spec.minReadySeconds`, avec une valeur par défaut de 0 (le Pod est considéré disponible dès qu'il est prêt).",
    "Faux : ce champ ne concerne pas la programmation sur un nœud, c'est une notion de disponibilité du Pod après création.",
    "Faux : `minReadySeconds` ne retarde pas la création du premier Pod, il conditionne quand un Pod déjà créé est considéré disponible.",
    "Faux : la rétention des anciens ReplicaSets est gérée par `.spec.revisionHistoryLimit`, pas par `minReadySeconds`."
  ],
  "explain": "`.spec.minReadySeconds` est un champ optionnel qui définit le nombre minimum de secondes pendant lesquelles un Pod nouvellement créé doit rester prêt (ready), sans qu'aucun de ses conteneurs ne plante, pour être considéré comme disponible. Sa valeur par défaut est 0, ce qui signifie qu'un Pod est considéré disponible dès qu'il devient prêt.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#min-ready-seconds",
  "en": {
    "q": "What does a Deployment's `.spec.minReadySeconds` field mean, and what is its default value?",
    "choices": [
      "The minimum number of seconds a newly created Pod should be ready without any of its containers crashing, for it to be considered available; defaults to 0",
      "The maximum time tolerated before a Pod gets scheduled onto a node; defaults to 0",
      "The minimum number of seconds the rollout waits before creating the first new Pod; defaults to 10",
      "The minimum time an old ReplicaSet is kept before deletion; defaults to 600"
    ]
  }
},
{
  "id": "t6-w6",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "D'après la documentation, quelle est la seule différence entre un Deployment avec `.spec.paused: true` et un Deployment non mis en pause ?",
  "choices": [
    "Les modifications du PodTemplateSpec d'un Deployment en pause ne déclenchent pas de nouveau rollout tant qu'il reste en pause",
    "Un Deployment en pause supprime immédiatement tous ses Pods existants",
    "Un Deployment en pause ne peut plus être supprimé tant qu'il n'est pas repris",
    "Un Deployment en pause repasse automatiquement à la stratégie Recreate"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc indique explicitement que la seule différence est que les changements du PodTemplateSpec ne déclenchent pas de nouveau rollout tant que le Deployment est en pause.",
    "Faux : mettre en pause un Deployment ne supprime aucun Pod existant, les Pods en cours continuent de tourner.",
    "Faux : rien dans la doc n'empêche de supprimer un Deployment en pause.",
    "Faux : la mise en pause n'altère pas la stratégie de déploiement configurée."
  ],
  "explain": "`.spec.paused` est un champ booléen optionnel permettant de mettre en pause / reprendre un Deployment. D'après la doc, la seule différence entre un Deployment en pause et un Deployment normal est que les modifications apportées au PodTemplateSpec du Deployment en pause ne déclenchent pas de nouveaux rollouts tant qu'il reste en pause. Un Deployment n'est pas en pause par défaut à sa création.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#paused",
  "en": {
    "q": "According to the documentation, what is the only difference between a Deployment with `.spec.paused: true` and one that is not paused?",
    "choices": [
      "Changes to the paused Deployment's PodTemplateSpec do not trigger new rollouts as long as it stays paused",
      "A paused Deployment immediately deletes all of its existing Pods",
      "A paused Deployment can no longer be deleted until it is resumed",
      "A paused Deployment automatically switches to the Recreate strategy"
    ]
  }
},
{
  "id": "t6-w7",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Un Job a `completionMode: Indexed` avec `completions: 5`. Quelles affirmations sont exactes d'après la documentation ? (plusieurs réponses)",
  "choices": [
    "Chaque Pod se voit assigner un index de complétion, exposé notamment via l'annotation `batch.kubernetes.io/job-completion-index`",
    "L'index du Pod est aussi automatiquement rendu disponible via la variable d'environnement `JOB_COMPLETION_INDEX`",
    "Avec `completionMode: Indexed`, tous les Pods du Job partagent obligatoirement le même index",
    "L'index de complétion peut être exposé à un conteneur via la Downward API en référant l'annotation `batch.kubernetes.io/job-completion-index`"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Vrai : c'est le mécanisme documenté du mode Indexed, chaque Pod reçoit un index reflété par cette annotation.",
    "Vrai : la doc indique que le contrôleur expose automatiquement cet index via la variable d'environnement `JOB_COMPLETION_INDEX`.",
    "Faux : c'est l'inverse, chaque Pod obtient un index distinct (0, 1, 2, 3, 4 pour 5 completions), ce qui permet une répartition statique du travail.",
    "Vrai : la Downward API peut exposer l'annotation d'index dans un fichier monté dans le conteneur."
  ],
  "explain": "En mode `completionMode: Indexed`, le plan de contrôle assigne à chaque Pod un index de complétion distinct (reflété dans l'annotation `batch.kubernetes.io/job-completion-index`), ce qui permet une répartition statique du travail entre Pods. Cet index est automatiquement exposé via la variable d'environnement `JOB_COMPLETION_INDEX`, et peut aussi être exposé via la Downward API en référençant l'annotation correspondante.",
  "ref": "https://kubernetes.io/docs/tasks/job/indexed-parallel-processing-static/",
  "en": {
    "q": "A Job has `completionMode: Indexed` with `completions: 5`. Which statements are correct according to the documentation? (select all that apply)",
    "choices": [
      "Each Pod is assigned a completion index, reflected notably in the `batch.kubernetes.io/job-completion-index` annotation",
      "The Pod's index is also automatically made available via the `JOB_COMPLETION_INDEX` environment variable",
      "With `completionMode: Indexed`, all Pods of the Job must share the same index",
      "The completion index can be exposed to a container via the Downward API by referencing the `batch.kubernetes.io/job-completion-index` annotation"
    ]
  }
},
{
  "id": "t6-w8",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Un Job est mis en pause via `.spec.suspend: true` alors que des Pods sont déjà en cours d'exécution. Que se passe-t-il, d'après la documentation ?",
  "choices": [
    "Le Job supprime ses Pods actifs, qui seront recréés seulement quand le Job sera repris (suspend remis à false)",
    "Les Pods actifs continuent de tourner jusqu'à leur fin naturelle, mais aucun nouveau Pod n'est créé",
    "Le Job entier est supprimé, y compris son historique et ses conditions de statut",
    "La mise en pause n'a aucun effet sur les Pods déjà en cours d'exécution, seulement sur les futurs Jobs créés par un CronJob"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la doc indique explicitement que suspendre un Job supprime ses Pods actifs, jusqu'à ce que le Job soit à nouveau repris.",
    "Faux : les Pods actifs sont bien supprimés lors de la suspension, ils ne finissent pas leur exécution naturellement.",
    "Faux : c'est l'objet Job qui reste, seuls ses Pods actifs sont supprimés ; le Job lui-même n'est pas supprimé.",
    "Faux : `.spec.suspend` agit directement sur le Job concerné et ses Pods actifs, pas seulement sur des Jobs futurs d'un CronJob."
  ],
  "explain": "Le champ `.spec.suspend` (stable depuis v1.24) permet de suspendre temporairement l'exécution d'un Job. D'après la doc : « Suspending a Job will delete its active Pods until the Job is resumed again. » Le Job lui-même n'est pas supprimé, seuls ses Pods actifs le sont, et aucun nouveau Pod n'est créé tant que le Job reste suspendu.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/job/#suspending-a-job",
  "en": {
    "q": "A Job is suspended via `.spec.suspend: true` while some of its Pods are already running. What happens, according to the documentation?",
    "choices": [
      "The Job deletes its active Pods, which will only be recreated once the Job is resumed (suspend set back to false)",
      "Active Pods keep running until they finish naturally, but no new Pod is created",
      "The whole Job is deleted, including its history and status conditions",
      "Suspending has no effect on already-running Pods, it only affects future Jobs created by a CronJob"
    ]
  }
},
{
  "id": "t6-n1",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Un Service definit spec.externalIPs: [\"192.0.2.10\"]. D'apres la documentation Kubernetes, qui est responsable de garantir que le trafic arrive bien sur un noeud du cluster via cette IP ?",
  "choices": [
    "Kubernetes gere automatiquement le routage de cette IP vers les noeuds",
    "L'utilisateur / l'administrateur du cluster est responsable d'acheminer le trafic vers un noeud portant cette IP",
    "Le cloud provider cree automatiquement un load balancer pour cette IP",
    "kube-proxy annonce automatiquement cette IP via BGP"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : Kubernetes ne gere ni n'annonce ces IP, il fait seulement en sorte qu'un Service qui les porte accepte le trafic qui y arrive.",
    "Correct : la documentation precise que les externalIPs ne sont pas gerees par Kubernetes ; c'est a l'administrateur du cluster de faire en sorte que le trafic arrive sur un noeud avec cette IP.",
    "Faux : externalIPs n'est pas un mecanisme de provisioning cloud, contrairement au type LoadBalancer.",
    "Faux : aucune annonce BGP automatique n'est documentee pour ce champ."
  ],
  "explain": "Le champ spec.externalIPs liste des IP sur lesquelles le Service accepte le trafic, en plus de ses IP habituelles (ClusterIP, etc.). Ces IP ne sont pas gerees par Kubernetes : c'est a l'administrateur du cluster de s'assurer que le trafic destine a ces IP atteint effectivement un noeud du cluster (routage externe, materiel reseau, etc.).",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#external-ips",
  "en": {
    "q": "A Service sets spec.externalIPs: [\"192.0.2.10\"]. According to the Kubernetes documentation, who is responsible for making sure traffic actually reaches a cluster node via this IP?",
    "choices": [
      "Kubernetes automatically manages routing for this IP to the nodes",
      "The user / cluster administrator is responsible for making sure traffic reaches a node with this IP",
      "The cloud provider automatically creates a load balancer for this IP",
      "kube-proxy automatically advertises this IP via BGP"
    ]
  }
},
{
  "id": "t6-n10",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Le control plane Kubernetes pose automatiquement un label immuable sur tous les namespaces. Quel est ce label, et a quoi sert-il typiquement avec un namespaceSelector de NetworkPolicy ?",
  "choices": [
    "kubernetes.io/metadata.name, dont la valeur est le nom du namespace, ce qui permet de cibler precisement un namespace par son nom dans un namespaceSelector",
    "kubernetes.io/namespace-id, un identifiant aleatoire unique attribue a chaque namespace",
    "kubernetes.io/metadata.name, mais ce label peut etre librement modifie par les utilisateurs",
    "Ce label n'existe qu'en version alpha depuis une version tres recente de Kubernetes"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : la documentation indique que le control plane pose le label immuable kubernetes.io/metadata.name sur tous les namespaces, avec pour valeur le nom du namespace, ce qui permet de le cibler precisement via namespaceSelector.",
    "Faux : ce nom de label n'est pas documente, et le vrai label porte le nom du namespace, pas un identifiant aleatoire.",
    "Faux : la documentation precise explicitement que ce label est immuable.",
    "Faux : cette fonctionnalite est stable depuis Kubernetes v1.22, pas en alpha recente."
  ],
  "explain": "Le control plane pose automatiquement le label immuable kubernetes.io/metadata.name sur tous les namespaces, dont la valeur est le nom du namespace lui-meme. Cela permet, entre autres dans une NetworkPolicy, d'utiliser un namespaceSelector avec matchLabels: {kubernetes.io/metadata.name: mon-namespace} pour cibler un namespace precis par son nom, sans avoir besoin d'y poser un label personnalise.",
  "ref": "https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/#automatic-labelling",
  "en": {
    "q": "The Kubernetes control plane automatically sets an immutable label on all namespaces. What is this label, and what is it typically used for with a NetworkPolicy namespaceSelector?",
    "choices": [
      "kubernetes.io/metadata.name, whose value is the namespace's name, allowing a namespaceSelector to target a specific namespace by name",
      "kubernetes.io/namespace-id, a random unique identifier assigned to each namespace",
      "kubernetes.io/metadata.name, but this label can be freely modified by users",
      "This label only exists in alpha as of a very recent Kubernetes version"
    ]
  }
},
{
  "id": "t6-n2",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Le champ spec.healthCheckNodePort d'un Service ne s'applique que dans quelles conditions, d'apres la documentation ?",
  "choices": [
    "type: ClusterIP, sans autre condition",
    "type: LoadBalancer combine avec externalTrafficPolicy: Local",
    "type: NodePort combine avec sessionAffinity: ClientIP",
    "Tous les types de Service, sans condition particuliere"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : un Service ClusterIP n'a pas de nodePort exterieur a verifier de cette maniere.",
    "Correct : healthCheckNodePort ne s'applique que lorsque type vaut LoadBalancer et externalTrafficPolicy vaut Local ; il indique le port utilise par les systemes externes pour verifier qu'un noeud possede des endpoints locaux.",
    "Faux : sessionAffinity ne conditionne pas ce champ.",
    "Faux : ce champ n'a de sens que pour ce cas precis (LoadBalancer + Local)."
  ],
  "explain": "healthCheckNodePort specifie le nodePort de health check du Service. Il n'a d'effet que si le type du Service est LoadBalancer et que externalTrafficPolicy vaut Local : un load-balancer externe interroge ce port sur chaque noeud pour savoir s'il possede des endpoints locaux avant de lui router du trafic.",
  "ref": "https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip",
  "en": {
    "q": "The spec.healthCheckNodePort field of a Service only applies under which conditions, according to the documentation?",
    "choices": [
      "type: ClusterIP, with no other condition",
      "type: LoadBalancer combined with externalTrafficPolicy: Local",
      "type: NodePort combined with sessionAffinity: ClientIP",
      "Any Service type, unconditionally"
    ]
  }
},
{
  "id": "t6-n3",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Concernant externalTrafficPolicy sur un Service de type NodePort ou LoadBalancer, quelles affirmations sont exactes d'apres la documentation ? (plusieurs reponses)",
  "choices": [
    "La valeur par defaut du champ est Cluster",
    "Avec Local, le trafic n'est envoye qu'aux Pods du noeud qui a recu la requete, sans SNAT, ce qui preserve l'IP source du client",
    "Avec Cluster, le trafic peut etre redistribue vers un Pod situe sur un autre noeud, ce qui peut impliquer un SNAT masquant l'IP source du client",
    "Local garantit toujours qu'un endpoint local est disponible sur le noeud qui recoit la requete"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : Cluster est la valeur par defaut d'externalTrafficPolicy.",
    "Correct : c'est precisement l'interet de Local, documente pour preserver l'adresse IP source du client.",
    "Correct : avec Cluster, le routage vers un noeud distant necessite un SNAT, ce qui masque l'IP source d'origine.",
    "Faux : si aucun endpoint local n'existe sur le noeud, le trafic est abandonne (drop) plutot que redirige ailleurs, contrairement a Cluster."
  ],
  "explain": "externalTrafficPolicy vaut Cluster par defaut : le trafic peut etre reparti vers n'importe quel Pod du cluster, au prix d'un SNAT qui masque l'IP source. La valeur Local restreint le trafic aux Pods locaux au noeud recepteur, preservant ainsi l'IP source du client, mais sans garantie d'endpoint local : si aucun Pod local n'existe, le trafic est simplement rejete.",
  "ref": "https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip",
  "en": {
    "q": "Regarding externalTrafficPolicy on a NodePort or LoadBalancer Service, which statements are correct according to the documentation? (multiple answers)",
    "choices": [
      "The field defaults to Cluster",
      "With Local, traffic is only sent to Pods on the node that received the request, without SNAT, preserving the client's source IP",
      "With Cluster, traffic can be forwarded to a Pod on another node, which may involve SNAT that masks the client's original source IP",
      "Local always guarantees a local endpoint is available on the node that receives the request"
    ]
  }
},
{
  "id": "t6-n4",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Que permet de specifier le champ appProtocol sur un port de Service (miroite sur l'EndpointSlice correspondant), d'apres la documentation Kubernetes ?",
  "choices": [
    "Le protocole de transport (TCP/UDP/SCTP) utilise par le port",
    "Le protocole applicatif du port, via un nom IANA non prefixe ou un nom prefixe kubernetes.io/... comme kubernetes.io/h2c, kubernetes.io/ws ou kubernetes.io/wss",
    "La version de l'API Kubernetes exposee par le Service",
    "L'algorithme de repartition de charge applique par kube-proxy pour ce port"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : le protocole de transport est deja porte par le champ protocol (TCP/UDP/SCTP), distinct d'appProtocol.",
    "Correct : appProtocol sert de hint sur le protocole applicatif (niveau 7), avec des noms IANA non prefixes ou des noms prefixes kubernetes.io/ pour des cas comme HTTP/2 en clair ou WebSocket.",
    "Faux : aucun lien documente avec une version d'API.",
    "Faux : appProtocol n'est pas un mecanisme de repartition de charge, c'est une information de protocole pour les implementations (ex. Gateway API)."
  ],
  "explain": "appProtocol permet de preciser le protocole applicatif d'un port de Service, comme indice pour les implementations qui savent en tirer parti (ex. Gateway API). Sa valeur est soit un nom IANA standard non prefixe, soit un nom prefixe defini par Kubernetes tel que kubernetes.io/h2c, kubernetes.io/ws ou kubernetes.io/wss. Cette valeur est aussi reportee sur l'EndpointSlice correspondant.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/service/#application-protocol",
  "en": {
    "q": "What does the appProtocol field on a Service port (mirrored onto the corresponding EndpointSlice) let you specify, according to the Kubernetes documentation?",
    "choices": [
      "The transport protocol (TCP/UDP/SCTP) used by the port",
      "The application protocol for the port, via an unprefixed IANA name or a kubernetes.io/... prefixed name such as kubernetes.io/h2c, kubernetes.io/ws, or kubernetes.io/wss",
      "The Kubernetes API version exposed by the Service",
      "The load-balancing algorithm kube-proxy applies for that port"
    ]
  }
},
{
  "id": "t6-n5",
  "domain": "networking",
  "difficulty": "medium",
  "q": "A quoi sert le champ spec.loadBalancerSourceRanges d'un Service de type LoadBalancer, selon la documentation ?",
  "choices": [
    "Il liste les IP des Pods backend autorises a recevoir du trafic",
    "S'il est specifie et supporte par la plateforme, il restreint le trafic passant par le load-balancer du cloud provider aux IP clientes indiquees",
    "Il definit les IP internes utilisees par kube-proxy pour effectuer le NAT",
    "Il remplace obligatoirement le champ externalIPs sur tout Service"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : ce champ ne concerne pas les Pods backend mais les clients autorises a atteindre le load-balancer.",
    "Correct : c'est la definition documentee du champ, avec la condition explicite du support par la plateforme cloud.",
    "Faux : aucun lien documente avec le fonctionnement interne du NAT de kube-proxy.",
    "Faux : les deux champs sont independants, aucune obligation de remplacement n'est documentee."
  ],
  "explain": "spec.loadBalancerSourceRanges est un tableau de plages CIDR : si le champ est renseigne et que la plateforme cloud le supporte, il restreint l'acces au load-balancer du Service aux seules IP clientes appartenant a ces plages.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/service-resources/service-v1/",
  "en": {
    "q": "What does the spec.loadBalancerSourceRanges field of a LoadBalancer-type Service do, according to the documentation?",
    "choices": [
      "It lists the IPs of backend Pods allowed to receive traffic",
      "If specified and supported by the platform, it restricts traffic through the cloud provider's load balancer to the given client IPs",
      "It defines the internal IPs kube-proxy uses to perform NAT",
      "It mandatorily replaces the externalIPs field on any Service"
    ]
  }
},
{
  "id": "t6-n6",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Dans un EndpointSlice, quelle est la difference entre les conditions serving et ready d'un endpoint, d'apres la documentation ?",
  "choices": [
    "Elles sont strictement identiques, ready n'etant qu'un alias historique de serving",
    "ready est un raccourci equivalent a \"serving ET NOT terminating\", tandis que serving reflete l'etat Ready du Pod independamment de sa terminaison",
    "serving ne s'applique qu'aux Pods Windows, ready qu'aux Pods Linux",
    "ready est calcule par kube-proxy alors que serving est calcule par le kubelet"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la documentation distingue explicitement les deux conditions, elles ne sont pas equivalentes en toute circonstance.",
    "Correct : ready equivaut a serving ET NOT terminating (sauf exception avec publishNotReadyAddresses), alors que serving indique seulement que l'endpoint repond, y compris pendant sa terminaison.",
    "Faux : rien dans la documentation ne restreint ces conditions a un systeme d'exploitation particulier.",
    "Faux : ces conditions sont portees par l'objet EndpointSlice lui-meme, pas calculees separement par kube-proxy et le kubelet de cette maniere."
  ],
  "explain": "L'EndpointSlice porte trois conditions par endpoint : serving indique que l'endpoint sert activement des reponses (correspond au Ready du Pod), terminating indique que l'endpoint est en cours de terminaison, et ready est un raccourci historique pour \"serving ET NOT terminating\" (toujours vrai si publishNotReadyAddresses est actif). Cela permet aux proxies de continuer a router vers des endpoints serving-et-terminating quand tous les endpoints disponibles terminent, evitant une perte de trafic lors des rolling updates.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/#conditions",
  "en": {
    "q": "In an EndpointSlice, what is the documented difference between the serving and ready conditions of an endpoint?",
    "choices": [
      "They are strictly identical, ready being just a historical alias for serving",
      "ready is a shortcut equivalent to \"serving AND NOT terminating\", while serving reflects the Pod's Ready state regardless of termination",
      "serving only applies to Windows Pods, ready only to Linux Pods",
      "ready is computed by kube-proxy while serving is computed by the kubelet"
    ]
  }
},
{
  "id": "t6-n7",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Un objet Ingress definit des spec.rules, mais une requete entrante ne correspond a aucune regle, et spec.defaultBackend n'est pas configure. D'apres la documentation, comment cette requete est-elle traitee ?",
  "choices": [
    "Elle est automatiquement rejetee avec une erreur 404 generee par le kube-apiserver",
    "Sa gestion est deleguee a la configuration par defaut propre au controleur Ingress",
    "Elle est routee vers le premier Service liste dans les rules",
    "Le controleur cree automatiquement un defaultBackend pointant vers CoreDNS"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : le kube-apiserver ne traite pas le trafic applicatif de l'Ingress, ce n'est pas lui qui repond aux requetes HTTP.",
    "Correct : d'apres la documentation, si defaultBackend n'est pas defini, la gestion des requetes non appariees est laissee a la configuration du controleur Ingress.",
    "Faux : aucun mecanisme de repli implicite vers la premiere regle n'est documente.",
    "Faux : CoreDNS gere la resolution de noms, pas le routage HTTP de secours d'un Ingress."
  ],
  "explain": "defaultBackend sert a traiter les requetes qui ne correspondent a aucune regle de l'Ingress. S'il n'est pas specifie, la documentation indique que la gestion de ces requetes non appariees est deleguee au controleur Ingress lui-meme, via sa propre configuration par defaut.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/#default-backend",
  "en": {
    "q": "An Ingress object defines spec.rules, but an incoming request matches none of the rules, and spec.defaultBackend is not configured. According to the documentation, how is this request handled?",
    "choices": [
      "It is automatically rejected with a 404 error generated by the kube-apiserver",
      "Handling it is delegated to the Ingress controller's own default configuration",
      "It is routed to the first Service listed in the rules",
      "The controller automatically creates a defaultBackend pointing to CoreDNS"
    ]
  }
},
{
  "id": "t6-n8",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Concernant le champ .spec.parameters d'une IngressClass, qui reference une IngressClassParametersReference, quelles affirmations sont exactes d'apres la documentation ? (plusieurs reponses)",
  "choices": [
    "Le champ scope peut valoir Cluster (valeur par defaut) ou Namespace",
    "Si scope vaut Namespace, le champ namespace doit etre renseigne",
    "Si scope vaut Cluster, le champ namespace doit obligatoirement etre renseigne aussi",
    "Le champ kind est obligatoire pour identifier le type de la ressource referencee"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : scope vaut Cluster par defaut, ou Namespace, d'apres la documentation de l'API.",
    "Correct : quand scope vaut Namespace, le champ namespace de la reference est requis.",
    "Faux : c'est l'inverse -- quand scope vaut Cluster, le champ namespace doit rester non renseigne.",
    "Correct : kind est un champ requis de IngressClassParametersReference pour identifier le type de ressource pointee."
  ],
  "explain": "IngressClassParametersReference permet a une IngressClass de pointer vers une ressource de configuration additionnelle pour son controleur. Le champ scope indique si cette ressource est de portee Cluster (valeur par defaut) ou Namespace ; dans ce dernier cas, namespace est requis, alors qu'il doit rester absent pour une portee Cluster. kind et name sont des champs requis pour identifier la ressource.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/networking/ingress-class-v1/",
  "en": {
    "q": "Regarding the .spec.parameters field of an IngressClass, which references an IngressClassParametersReference, which statements are correct according to the documentation? (multiple answers)",
    "choices": [
      "The scope field can be Cluster (the default) or Namespace",
      "If scope is Namespace, the namespace field must be set",
      "If scope is Cluster, the namespace field must also be set",
      "The kind field is required to identify the type of the referenced resource"
    ]
  }
},
{
  "id": "t6-n9",
  "domain": "networking",
  "difficulty": "medium",
  "q": "D'apres la documentation, quel est un avantage documente du mode IPVS de kube-proxy par rapport au mode iptables ?",
  "choices": [
    "IPVS ne fonctionne que sous Windows alors qu'iptables ne fonctionne que sous Linux",
    "IPVS propose plusieurs algorithmes de repartition de charge, alors qu'iptables selectionne un backend de maniere aleatoire (ou par affinite de session)",
    "IPVS supprime completement le besoin d'executer kube-proxy sur les noeuds",
    "IPVS ne necessite aucun module noyau, contrairement au mode iptables"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : les deux modes, iptables et IPVS, sont documentes comme disponibles uniquement sur des noeuds Linux.",
    "Correct : la documentation indique qu'IPVS s'appuie sur le sous-systeme IPVS du noyau Linux et propose plusieurs algorithmes de repartition de charge, alors qu'iptables choisit un backend au hasard par defaut.",
    "Faux : IPVS est un mode de kube-proxy, il ne le remplace pas.",
    "Faux : c'est l'inverse, IPVS necessite que des modules noyau specifiques soient disponibles sur le noeud."
  ],
  "explain": "Le mode iptables de kube-proxy configure des regles de forwarding via le sous-systeme netfilter et selectionne un Pod backend au hasard (ou selon l'affinite de session), sans reecriture NAT particuliere pour le choix d'algorithme. Le mode IPVS s'appuie sur le sous-systeme IPVS du noyau Linux, plus efficace a grande echelle et proposant plusieurs algorithmes de repartition de charge ; il requiert cependant que les modules noyau necessaires soient disponibles.",
  "ref": "https://kubernetes.io/docs/reference/networking/virtual-ips/",
  "en": {
    "q": "According to the documentation, what is a documented advantage of kube-proxy's IPVS mode over its iptables mode?",
    "choices": [
      "IPVS only works on Windows while iptables only works on Linux",
      "IPVS offers multiple load-balancing algorithms, while iptables selects a backend at random (or via session affinity)",
      "IPVS completely removes the need to run kube-proxy on nodes",
      "IPVS requires no kernel modules at all, unlike iptables mode"
    ]
  }
},
{
  "id": "t6-s1",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Dans un volumeMount, à quoi sert le champ subPath ?",
  "choices": [
    "À monter un fichier ou un sous-répertoire du volume au lieu du volume entier",
    "À définir le sous-réseau autorisé à monter le volume",
    "À chiffrer une partie seulement du volume",
    "À limiter la taille du volume monté"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : subPath permet de monter un fichier ou un sous-répertoire d'un volume, plutôt que sa racine, dans le conteneur.",
    "subPath ne concerne pas le réseau, uniquement le chemin monté à l'intérieur du volume.",
    "subPath n'a aucun rôle de chiffrement.",
    "subPath ne limite pas la taille, il sélectionne un chemin dans le volume."
  ],
  "explain": "subPath permet à un même volume d'être partagé par plusieurs usages : par exemple monter un seul ConfigMap ou volume à plusieurs endroits différents en n'exposant qu'un sous-chemin à chaque fois. Un container utilisant un ConfigMap ou la downward API via subPath ne reçoit pas les mises à jour ultérieures de ces sources sur ce chemin.",
  "ref": "https://kubernetes.io/docs/concepts/storage/volumes/#using-subpath",
  "en": {
    "q": "In a volumeMount, what does the subPath field do?",
    "choices": [
      "It mounts a file or subdirectory of the volume instead of the whole volume",
      "It defines the subnet allowed to mount the volume",
      "It encrypts only part of the volume",
      "It limits the size of the mounted volume"
    ]
  }
},
{
  "id": "t6-s2",
  "domain": "storage",
  "difficulty": "hard",
  "q": "À quoi sert subPathExpr dans un volumeMount, par rapport à subPath ?",
  "choices": [
    "Il permet de construire le chemin monté dynamiquement à partir de variables d'environnement issues de la downward API",
    "Il chiffre le chemin du sous-volume avec une expression régulière",
    "Il autorise le suivi des liens symboliques (symlinks) dans le sous-chemin",
    "Il force le montage en lecture seule du sous-chemin"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : subPathExpr est la version dynamique de subPath, qui résout le chemin à partir de variables d'environnement de la downward API (ex. nom du Pod).",
    "subPathExpr ne fait aucun chiffrement.",
    "Les liens symboliques ne sont pas permis dans le chemin résolu par subPath/subPathExpr, quel que soit le champ utilisé.",
    "subPathExpr ne force pas la lecture seule, il calcule seulement le chemin."
  ],
  "explain": "subPathExpr permet d'exprimer le sous-chemin monté sous forme d'expression utilisant des variables d'environnement de la downward API (par exemple le nom du Pod), ce qui est utile quand un même volume est partagé par plusieurs réplicas ayant chacun besoin d'un sous-répertoire propre. Les liens symboliques ne sont pas permis dans ce chemin.",
  "ref": "https://kubernetes.io/docs/concepts/storage/volumes/#using-subpath-expanded-environment",
  "en": {
    "q": "What does subPathExpr do in a volumeMount, compared to subPath?",
    "choices": [
      "It lets the mounted path be built dynamically from downward API environment variables",
      "It encrypts the sub-volume path using a regular expression",
      "It allows following symbolic links (symlinks) in the sub-path",
      "It forces the sub-path to be mounted read-only"
    ]
  }
},
{
  "id": "t6-s3",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Le champ securityContext.fsGroupChangePolicy défini à 'OnRootMismatch' pour un Pod signifie que Kubernetes :",
  "choices": [
    "Ne change la propriété/permissions du volume que si la racine du volume ne correspond pas déjà au fsGroup attendu",
    "Change systématiquement la propriété du volume à chaque démarrage du Pod",
    "Refuse de démarrer le Pod si fsGroup n'est pas défini",
    "Applique fsGroup uniquement au conteneur, jamais au volume"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : OnRootMismatch évite un changement récursif de propriété si la racine du volume correspond déjà au fsGroup demandé, ce qui est plus efficace sur de gros volumes.",
    "C'est le comportement de la valeur 'Always', pas 'OnRootMismatch'.",
    "fsGroupChangePolicy ne bloque pas le démarrage du Pod, il ajuste juste le comportement du changement de propriété.",
    "fsGroup s'applique au volume (propriété des fichiers/répertoires), pas uniquement au conteneur."
  ],
  "explain": "fsGroupChangePolicy contrôle comment Kubernetes applique fsGroup aux volumes montés dans un Pod. 'OnRootMismatch' ne relance le changement récursif de propriété que si la racine du volume ne correspond pas déjà au groupe attendu, ce qui optimise les démarrages successifs sur un même volume. 'Always' réapplique systématiquement le changement.",
  "ref": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#configure-volume-permission-and-ownership-change-policy-for-pods",
  "en": {
    "q": "Setting securityContext.fsGroupChangePolicy to 'OnRootMismatch' for a Pod means Kubernetes:",
    "choices": [
      "Only changes the volume's ownership/permissions if the volume's root does not already match the expected fsGroup",
      "Always changes the volume's ownership every time the Pod starts",
      "Refuses to start the Pod if fsGroup is not set",
      "Applies fsGroup only to the container, never to the volume"
    ]
  }
},
{
  "id": "t6-s4",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Que garantit l'accessMode ReadWriteOncePod sur un volume, à la différence de ReadWriteOnce ?",
  "choices": [
    "Le volume ne peut être monté en lecture-écriture que par un seul Pod dans tout le cluster, alors que ReadWriteOnce autorise plusieurs Pods du même nœud",
    "Le volume peut être écrit simultanément par plusieurs Pods sur plusieurs nœuds",
    "Le volume devient accessible uniquement en lecture seule pour tous les Pods",
    "Le volume est automatiquement répliqué sur tous les nœuds du cluster"
  ],
  "correct": [
    0
  ],
  "why": [
    "Correct : ReadWriteOncePod restreint l'accès en lecture-écriture à un seul Pod du cluster, alors que ReadWriteOnce permet à plusieurs Pods d'un même nœud d'y accéder simultanément.",
    "C'est l'inverse : ReadWriteOncePod restreint l'accès, il ne l'étend pas à plusieurs nœuds.",
    "ReadWriteOncePod autorise la lecture-écriture, pas seulement la lecture.",
    "Aucun accessMode ne réplique automatiquement les données entre nœuds."
  ],
  "explain": "Les claims peuvent demander différents accessModes : ReadWriteOnce, ReadOnlyMany, ReadWriteMany ou ReadWriteOncePod. ReadWriteOncePod garantit que seul un Pod dans tout le cluster peut lire et écrire sur le PVC, offrant une garantie plus stricte que ReadWriteOnce (qui autorise plusieurs Pods sur le même nœud).",
  "ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes",
  "en": {
    "q": "What does the ReadWriteOncePod access mode guarantee for a volume, unlike ReadWriteOnce?",
    "choices": [
      "The volume can be mounted read-write by only a single Pod in the whole cluster, whereas ReadWriteOnce allows multiple Pods on the same node",
      "The volume can be written simultaneously by multiple Pods across multiple nodes",
      "The volume becomes read-only for all Pods",
      "The volume is automatically replicated across every node in the cluster"
    ]
  }
},
{
  "id": "t6-s5",
  "domain": "storage",
  "difficulty": "hard",
  "q": "Concernant un volume CSI éphémère « inline » déclaré directement dans le spec d'un Pod (champ csi), quelles affirmations sont correctes ? (plusieurs réponses)",
  "choices": [
    "Le driver CSI doit déclarer son support de ce mode dans le champ ephemeral de l'objet CSIDriver",
    "Le volume est créé et détruit avec le cycle de vie du Pod, sans PersistentVolume/PersistentVolumeClaim séparé",
    "Ce type de volume nécessite obligatoirement un StorageClass et une reclaimPolicy définis",
    "Le volume peut être configuré via un champ volumeAttributes propre au Pod"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : seul un driver CSI dont l'objet CSIDriver déclare le support ephemeral peut être utilisé en volume inline dans un Pod.",
    "Correct : un volume CSI éphémère inline est directement défini dans la spec du Pod et suit le cycle de vie de celui-ci, sans PV/PVC dédiés.",
    "Faux : c'est justement l'intérêt de ce mode de ne pas passer par une PersistentVolumeClaim, un PersistentVolume ni une StorageClass.",
    "Correct : le champ volumeAttributes du volume csi permet de passer une configuration au driver directement depuis le Pod."
  ],
  "explain": "Les volumes CSI éphémères inline permettent d'utiliser un volume CSI directement dans la spec d'un Pod (type csi), sans créer de PersistentVolume ni de PersistentVolumeClaim. Le volume est lié au cycle de vie du Pod. Seuls les drivers CSI déclarant explicitement leur support de ce mode (champ ephemeral de l'objet CSIDriver) peuvent être utilisés ainsi, et la configuration passe par volumeAttributes.",
  "ref": "https://kubernetes.io/docs/concepts/storage/volumes/#csi",
  "en": {
    "q": "Regarding an inline ephemeral CSI volume declared directly in a Pod spec (csi field), which statements are correct? (multiple answers)",
    "choices": [
      "The CSI driver must declare support for this mode via the ephemeral field of the CSIDriver object",
      "The volume is created and destroyed with the Pod's lifecycle, without a separate PersistentVolume/PersistentVolumeClaim",
      "This kind of volume mandatorily requires a StorageClass and a reclaimPolicy to be defined",
      "The volume can be configured via a volumeAttributes field on the Pod"
    ]
  }
},
{
  "id": "t6-s6",
  "domain": "storage",
  "difficulty": "hard",
  "q": "À propos du champ dataSourceRef d'une PersistentVolumeClaim, par rapport à dataSource, quelles affirmations sont correctes ? (plusieurs réponses)",
  "choices": [
    "dataSourceRef peut référencer n'importe quel objet dans le même namespace (y compris une ressource personnalisée définie par un CRD), pas seulement une PVC ou un VolumeSnapshot",
    "dataSource ignore silencieusement une valeur invalide, alors que dataSourceRef génère une erreur dans ce cas",
    "Référencer une autre namespace via dataSourceRef ne nécessite aucune configuration particulière au niveau du cluster",
    "Activer la référence cross-namespace via dataSourceRef nécessite les feature gates AnyVolumeDataSource et CrossNamespaceVolumeDataSource, ainsi qu'un ReferenceGrant dans la namespace cible"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : contrairement à dataSource limité à une PVC ou un VolumeSnapshot, dataSourceRef peut référencer tout objet du même namespace, y compris une ressource personnalisée gérée par un contrôleur populateur.",
    "Correct : dataSource ignore une valeur invalide comme si le champ était vide, alors que dataSourceRef renvoie une erreur pour une valeur invalide.",
    "Faux : une référence cross-namespace nécessite d'activer des feature gates sur le kube-apiserver et le kube-controller-manager, et un ReferenceGrant dans l'autre namespace.",
    "Correct : les feature gates AnyVolumeDataSource et CrossNamespaceVolumeDataSource doivent être activés, et Kubernetes vérifie la présence d'un ReferenceGrant dans la namespace référencée avant d'accepter la référence."
  ],
  "explain": "dataSourceRef étend dataSource : il peut pointer vers n'importe quel objet du même namespace (pas seulement PVC/VolumeSnapshot), y compris des ressources personnalisées utilisées par des populateurs de volumes, et il génère une erreur (au lieu de l'ignorer) sur une valeur invalide. Pour référencer un objet d'une autre namespace, il faut activer les feature gates AnyVolumeDataSource et CrossNamespaceVolumeDataSource sur le kube-apiserver et le kube-controller-manager, et disposer d'un ReferenceGrant (issu de la Gateway API) dans la namespace cible.",
  "ref": "https://kubernetes.io/docs/concepts/storage/volume-populators-and-data-sources/",
  "en": {
    "q": "Regarding the dataSourceRef field of a PersistentVolumeClaim, compared to dataSource, which statements are correct? (multiple answers)",
    "choices": [
      "dataSourceRef can reference any object in the same namespace (including a custom resource defined by a CRD), not just a PVC or VolumeSnapshot",
      "dataSource silently ignores an invalid value, while dataSourceRef raises an error in that case",
      "Referencing another namespace via dataSourceRef requires no particular cluster-level configuration",
      "Enabling cross-namespace reference via dataSourceRef requires the AnyVolumeDataSource and CrossNamespaceVolumeDataSource feature gates, plus a ReferenceGrant in the target namespace"
    ]
  }
},
{
  "id": "t6-t1",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "À quoi sert la commande `kubectl api-resources` d'après la documentation officielle ?",
  "choices": [
    "Afficher les ressources API prises en charge par le serveur (groupe API, portée namespaced, verbes supportés...)",
    "Afficher les versions d'API disponibles sur le cluster",
    "Lister les objets Pod du namespace courant",
    "Afficher la documentation intégrée d'un champ d'une ressource (comme kubectl explain)"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la documentation décrit cette commande comme 'Print the supported API resources on the server'.",
    "C'est le rôle de kubectl api-versions, une commande distincte.",
    "C'est le rôle de kubectl get pods, pas d'api-resources.",
    "C'est le rôle de kubectl explain, une commande distincte."
  ],
  "explain": "kubectl api-resources affiche les ressources API supportées par le serveur : elle permet de découvrir les kinds disponibles, leur groupe API, s'ils sont namespaced, et les verbes autorisés. Des options existent pour filtrer, par exemple --namespaced=true/false, --api-group=... ou --sort-by=name.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_api-resources/",
  "en": {
    "q": "According to the official documentation, what does the `kubectl api-resources` command do?",
    "choices": [
      "Print the supported API resources on the server (API group, namespaced scope, supported verbs...)",
      "Print the available API versions on the cluster",
      "List the Pod objects in the current namespace",
      "Show the built-in documentation for a resource field (like kubectl explain)"
    ]
  }
},
{
  "id": "t6-t10",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Pour tester la résolution DNS interne au cluster, la documentation recommande de créer un Pod dnsutils puis d'exécuter quelle commande ?",
  "choices": [
    "kubectl exec -i -t dnsutils -- nslookup kubernetes.default",
    "kubectl logs dnsutils --follow",
    "kubectl port-forward dnsutils 53:53",
    "kubectl get svc kube-dns -o wide"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : c'est la commande documentée pour tester la résolution DNS du service kubernetes.default depuis le Pod de test dnsutils.",
    "Cela affiche les logs du Pod, mais ne teste aucune résolution DNS.",
    "Le port-forward ne sert pas à tester la résolution de nom, uniquement à rediriger un port réseau.",
    "Cela renseigne sur le Service kube-dns, mais ne teste pas une résolution de nom depuis un Pod."
  ],
  "explain": "La documentation sur le débogage DNS propose de déployer le Pod d'exemple dnsutils (kubectl apply -f https://k8s.io/examples/admin/dns/dnsutils.yaml) puis de lancer kubectl exec -i -t dnsutils -- nslookup kubernetes.default pour vérifier que la résolution DNS du Service kubernetes fonctionne, avec une sortie attendue indiquant le serveur DNS (ex. 10.0.0.10) et l'adresse résolue.",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/",
  "en": {
    "q": "To test in-cluster DNS resolution, the documentation recommends creating a dnsutils Pod and then running which command?",
    "choices": [
      "kubectl exec -i -t dnsutils -- nslookup kubernetes.default",
      "kubectl logs dnsutils --follow",
      "kubectl port-forward dnsutils 53:53",
      "kubectl get svc kube-dns -o wide"
    ]
  }
},
{
  "id": "t6-t11",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Comment la documentation explique-t-elle d'activer la journalisation des requêtes (query logging) de CoreDNS pour déboguer un problème DNS ?",
  "choices": [
    "En ajoutant le plugin `log` au Corefile via `kubectl -n kube-system edit configmap coredns`",
    "En redémarrant kube-dns avec l'option --v=9",
    "En activant un feature gate CoreDNSQueryLogging sur le kube-apiserver",
    "En créant un Pod sidecar 'coredns-logger' à côté de chaque Pod applicatif"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la doc montre l'édition de la ConfigMap coredns pour insérer le plugin log dans le bloc Corefile.",
    "--v=9 est un niveau de verbosité kubectl, sans rapport avec la configuration de CoreDNS.",
    "Aucun feature gate de ce nom n'est documenté pour ce besoin.",
    "Ce mécanisme n'est pas celui documenté ; CoreDNS journalise via son propre Corefile, pas via un sidecar par Pod."
  ],
  "explain": "Pour activer la journalisation des requêtes CoreDNS, la doc indique d'éditer la ConfigMap avec kubectl -n kube-system edit configmap coredns et d'ajouter la directive `log` dans le bloc Corefile (avant errors, health, kubernetes...). Après sauvegarde, la propagation vers les Pods CoreDNS peut prendre une à deux minutes.",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/",
  "en": {
    "q": "How does the documentation explain enabling CoreDNS query logging to debug a DNS problem?",
    "choices": [
      "By adding the `log` plugin to the Corefile via `kubectl -n kube-system edit configmap coredns`",
      "By restarting kube-dns with the --v=9 option",
      "By enabling a CoreDNSQueryLogging feature gate on the kube-apiserver",
      "By creating a 'coredns-logger' sidecar Pod next to every application Pod"
    ]
  }
},
{
  "id": "t6-t12",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Que fait la commande (expérimentale) `kubectl auth whoami` selon la documentation ?",
  "choices": [
    "Elle vérifie qui vous êtes et vos attributs (groupes, extra), utile notamment quand une authentification dynamique (webhook de token, proxy d'auth, fournisseur OIDC) est activée",
    "Elle liste tous les utilisateurs déclarés dans les ClusterRoleBindings du cluster",
    "Elle affiche le mot de passe ou le token du kubeconfig courant",
    "Elle crée un nouveau ServiceAccount pour l'utilisateur courant"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la doc décrit whoami comme permettant de 'check who you are and your attributes (groups, extra)', utile en particulier avec une authentification dynamique.",
    "Ce n'est pas son rôle : elle ne renseigne que sur l'identité courante, pas sur tous les utilisateurs du cluster.",
    "La commande n'expose jamais de secret d'authentification, seulement l'identité résolue côté serveur.",
    "auth whoami ne crée aucun objet, elle interroge seulement l'identité courante."
  ],
  "explain": "kubectl auth whoami (expérimentale) permet de vérifier son identité et ses attributs tels que vus par l'API server (username, groups, extra), en particulier utile quand l'authentification passe par un webhook de token, un proxy d'authentification ou un fournisseur OIDC. Elle prend en charge plusieurs formats de sortie via -o (json, yaml...).",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_auth/kubectl_auth_whoami/",
  "en": {
    "q": "What does the (experimental) `kubectl auth whoami` command do, according to the documentation?",
    "choices": [
      "It checks who you are and your attributes (groups, extra), especially useful when dynamic authentication (token webhook, auth proxy, OIDC provider) is enabled",
      "It lists every user declared in the cluster's ClusterRoleBindings",
      "It displays the password or token from the current kubeconfig",
      "It creates a new ServiceAccount for the current user"
    ]
  }
},
{
  "id": "t6-t13",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "D'après le kubectl Quick Reference, à quoi correspond le niveau de verbosité --v=7 pour le débogage kubectl ?",
  "choices": [
    "Afficher les en-têtes (headers) de la requête HTTP",
    "Afficher le contenu de la requête HTTP",
    "Afficher les ressources demandées",
    "Afficher le contenu de la requête HTTP sans troncature"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la doc associe --v=7 à 'Display HTTP request headers'.",
    "C'est --v=8 qui est documenté pour afficher le contenu de la requête HTTP.",
    "C'est --v=6 qui est documenté pour afficher les ressources demandées.",
    "C'est --v=9 qui est documenté pour afficher le contenu sans troncature."
  ],
  "explain": "Le tableau de verbosité du kubectl Quick Reference associe chaque niveau à un usage : --v=6 affiche les ressources demandées, --v=7 affiche les en-têtes HTTP, --v=8 affiche le contenu de la requête HTTP, et --v=9 affiche ce contenu sans troncature. Ces niveaux élevés servent au débogage fin des échanges entre kubectl et l'API server.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/quick-reference/",
  "en": {
    "q": "According to the kubectl Quick Reference, what does verbosity level --v=7 correspond to for kubectl debugging?",
    "choices": [
      "Display HTTP request headers",
      "Display HTTP request contents",
      "Display requested resources",
      "Display HTTP request contents without truncation"
    ]
  }
},
{
  "id": "t6-t14",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Au-delà de l'endpoint /metrics classique, quels endpoints supplémentaires la documentation indique-t-elle que le kubelet expose ? (plusieurs réponses)",
  "choices": [
    "/metrics/cadvisor",
    "/metrics/resource",
    "/metrics/probes",
    "/metrics/scheduler"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : documenté comme endpoint supplémentaire exposé par le kubelet.",
    "Correct : documenté comme endpoint supplémentaire exposé par le kubelet.",
    "Correct : documenté comme endpoint supplémentaire exposé par le kubelet.",
    "Incorrect : cet endpoint n'est pas documenté pour le kubelet ; les métriques du scheduler sont exposées par le composant kube-scheduler lui-même, sur son propre /metrics."
  ],
  "explain": "La documentation sur les métriques des composants système précise que la plupart des composants (dont le kubelet) exposent leurs métriques au format Prometheus sur /metrics, et note que le kubelet expose en plus des métriques sur /metrics/cadvisor, /metrics/resource et /metrics/probes, ces métriques n'ayant pas le même cycle de vie que celles de /metrics.",
  "ref": "https://kubernetes.io/docs/concepts/cluster-administration/system-metrics/",
  "en": {
    "q": "Beyond the standard /metrics endpoint, which additional endpoints does the documentation say the kubelet exposes? (multiple answers)",
    "choices": [
      "/metrics/cadvisor",
      "/metrics/resource",
      "/metrics/probes",
      "/metrics/scheduler"
    ]
  }
},
{
  "id": "t6-t2",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait la commande `kubectl cluster-info dump` selon la documentation ?",
  "choices": [
    "Elle affiche uniquement l'adresse du control plane et des services DNS/proxy du cluster",
    "Elle extrait des informations utiles au debug et diagnostic du cluster, y compris les logs de tous les Pods, vers stdout par défaut ou vers un dossier avec --output-directory",
    "Elle redémarre tous les composants du control plane pour forcer un vidage mémoire",
    "Elle supprime les anciens logs des Pods du namespace kube-system"
  ],
  "correct": [
    1
  ],
  "why": [
    "C'est le rôle de kubectl cluster-info (sans dump), une commande plus simple et distincte.",
    "Exact : la documentation précise qu'elle dump des informations de debug, y compris les logs de tous les Pods du cluster, organisés par namespace et nom de Pod.",
    "La commande ne redémarre aucun composant, elle ne fait que lire et exporter de l'information.",
    "La commande ne supprime jamais de logs, elle les collecte."
  ],
  "explain": "D'après la doc : 'Dump cluster information out suitable for debugging and diagnosing cluster problems. By default, dumps everything to stdout. You can optionally specify a directory with --output-directory (...). By default, only dumps things in the current namespace and kube-system namespace, but you can (...) specify --all-namespaces (...). The command also dumps the logs of all of the pods in the cluster.'",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cluster-info/kubectl_cluster-info_dump/",
  "en": {
    "q": "What does the `kubectl cluster-info dump` command do, according to the documentation?",
    "choices": [
      "It only prints the address of the control plane and the cluster's DNS/proxy services",
      "It dumps information useful for debugging and diagnosing the cluster, including logs of all Pods, to stdout by default or to a directory with --output-directory",
      "It restarts every control plane component to force a memory dump",
      "It deletes old Pod logs in the kube-system namespace"
    ]
  }
},
{
  "id": "t6-t3",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Dans la procédure kubeadm pour mettre en place un cluster etcd en haute disponibilité, quelle commande la documentation donne-t-elle en exemple pour vérifier la santé d'un membre etcd ?",
  "choices": [
    "etcdctl --cert=peer.crt --key=peer.key --cacert=ca.crt --endpoints=https://HOST0:2379 endpoint health",
    "kubectl get componentstatuses etcd-0",
    "crictl inspect etcd --health",
    "kubectl describe pod etcd-HOST0 -n kube-system --health"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : c'est la forme documentée dans le guide kubeadm pour une configuration etcd HA, utilisant les certificats peer et la CA.",
    "componentstatuses n'est pas l'outil documenté pour vérifier la santé d'un membre etcd individuel.",
    "crictl inspecte les conteneurs du runtime CRI mais n'a pas de sous-commande --health documentée pour etcd.",
    "describe ne propose pas de flag --health ; ce n'est pas une commande valide."
  ],
  "explain": "La documentation kubeadm pour une configuration etcd HA montre l'usage d'ETCDCTL_API=3 etcdctl avec --cert (peer.crt), --key (peer.key), --cacert (ca.crt) et --endpoints, suivi du sous-verbe endpoint health. La sortie attendue ressemble à 'https://HOST:2379 is healthy: successfully committed proposal: took = ...'.",
  "ref": "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/setup-ha-etcd-with-kubeadm/",
  "en": {
    "q": "In the kubeadm guide for setting up a highly-available etcd cluster, which command does the documentation give as an example to check the health of an etcd member?",
    "choices": [
      "etcdctl --cert=peer.crt --key=peer.key --cacert=ca.crt --endpoints=https://HOST0:2379 endpoint health",
      "kubectl get componentstatuses etcd-0",
      "crictl inspect etcd --health",
      "kubectl describe pod etcd-HOST0 -n kube-system --health"
    ]
  }
},
{
  "id": "t6-t4",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "D'après la documentation sur le node-pressure eviction, lesquels de ces seuils font partie des seuils d'éviction « hard » par défaut du kubelet ? (plusieurs réponses)",
  "choices": [
    "memory.available inférieur à 100Mi",
    "nodefs.available inférieur à 10%",
    "imagefs.available inférieur à 15%",
    "pid.available inférieur à 10%"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Correct : c'est l'un des quatre seuils hard par défaut documentés.",
    "Correct : c'est l'un des quatre seuils hard par défaut documentés.",
    "Correct : c'est l'un des quatre seuils hard par défaut documentés.",
    "Incorrect : pid.available n'a pas de valeur par défaut pour le seuil hard, contrairement aux trois autres."
  ],
  "explain": "Le kubelet applique par défaut les seuils d'éviction hard suivants : memory.available inférieur à 100Mi, nodefs.available inférieur à 10%, nodefs.inodesFree inférieur à 5% et imagefs.available inférieur à 15%. Le signal pid.available n'a pas de seuil par défaut : il doit être configuré explicitement via --eviction-hard si on veut l'activer.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/",
  "en": {
    "q": "According to the node-pressure eviction documentation, which of these are among the kubelet's default hard eviction thresholds? (multiple answers)",
    "choices": [
      "memory.available below 100Mi",
      "nodefs.available below 10%",
      "imagefs.available below 15%",
      "pid.available below 10%"
    ]
  }
},
{
  "id": "t6-t5",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Selon la documentation, quels signaux d'éviction peuvent faire passer la Condition de nœud à DiskPressure ? (plusieurs réponses)",
  "choices": [
    "nodefs.available",
    "imagefs.available",
    "memory.available",
    "pid.available"
  ],
  "correct": [
    0,
    1
  ],
  "why": [
    "Correct : nodefs.available fait partie des signaux surveillés pour DiskPressure.",
    "Correct : imagefs.available fait partie des signaux surveillés pour DiskPressure.",
    "Incorrect : memory.available est le signal associé à la Condition MemoryPressure.",
    "Incorrect : pid.available est le signal associé à la Condition PIDPressure."
  ],
  "explain": "La documentation associe chaque Condition de nœud à des signaux précis : MemoryPressure repose sur memory.available ; DiskPressure repose sur nodefs.available, nodefs.inodesFree, imagefs.available et imagefs.inodesFree ; PIDPressure repose sur pid.available.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/",
  "en": {
    "q": "According to the documentation, which eviction signals can drive the node Condition to DiskPressure? (multiple answers)",
    "choices": [
      "nodefs.available",
      "imagefs.available",
      "memory.available",
      "pid.available"
    ]
  }
},
{
  "id": "t6-t6",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Concernant la commande `kubectl drain`, quelles affirmations sont exactes selon la documentation ? (plusieurs réponses)",
  "choices": [
    "Le flag --ignore-daemonsets est nécessaire car le contrôleur DaemonSet recrée immédiatement les Pods DaemonSet supprimés",
    "Le flag --delete-emptydir-data permet de continuer même si des Pods utilisent un volume emptyDir, dont les données seront supprimées",
    "kubectl drain doit toujours cibler tous les nœuds du cluster en une seule commande",
    "Après la maintenance, on relance l'ordonnancement des Pods sur le nœud avec kubectl uncordon"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Correct : la doc explique que sans ce flag, le contrôleur DaemonSet remplace immédiatement les Pods supprimés, ce qui bloquerait le drain.",
    "Correct : c'est la description documentée du flag ('Continue even if there are pods using emptyDir...').",
    "Incorrect : la documentation précise que kubectl drain ne doit être émis que pour un seul nœud à la fois (des drains en parallèle sur des nœuds différents sont possibles).",
    "Correct : c'est l'étape documentée du workflow de maintenance, après le drain."
  ],
  "explain": "La doc sur le drain sécurisé d'un nœud indique : le drain sans --ignore-daemonsets échoue car le contrôleur DaemonSet recrée les Pods retirés ; --delete-emptydir-data ('Continue even if there are pods using emptyDir (local data that will be deleted when the node is drained)') autorise le drain malgré des volumes emptyDir ; kubectl drain ne doit être émis que pour un seul nœud à la fois ; enfin, une fois la maintenance terminée, kubectl uncordon restaure l'ordonnancement sur le nœud.",
  "ref": "https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/",
  "en": {
    "q": "Regarding the `kubectl drain` command, which statements are correct according to the documentation? (multiple answers)",
    "choices": [
      "The --ignore-daemonsets flag is needed because the DaemonSet controller immediately replaces deleted DaemonSet pods",
      "The --delete-emptydir-data flag allows draining to continue even if pods use an emptyDir volume, whose data will be deleted",
      "kubectl drain must always target every node in the cluster in a single command",
      "After maintenance, scheduling is resumed on the node with kubectl uncordon"
    ]
  }
},
{
  "id": "t6-t7",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "Quand un nœud devient NotReady ou Unreachable, l'API server ajoute automatiquement une tolérance par défaut aux Pods qui n'en ont pas définie explicitement pour les taints node.kubernetes.io/not-ready et node.kubernetes.io/unreachable. Quelle est la valeur par défaut de tolerationSeconds ?",
  "choices": [
    "0 seconde (éviction immédiate)",
    "300 secondes (5 minutes)",
    "60 secondes (1 minute)",
    "3600 secondes (1 heure)"
  ],
  "correct": [
    1
  ],
  "why": [
    "Incorrect : une éviction immédiate contredirait le principe de la tolérance automatique par défaut décrite dans la doc.",
    "Exact : la documentation précise que Kubernetes ajoute automatiquement une tolérance de tolerationSeconds=300 pour ces deux taints, sauf si l'utilisateur ou un contrôleur en définit une explicitement.",
    "Cette valeur n'est pas celle documentée pour ce mécanisme par défaut.",
    "Cette valeur n'est pas celle documentée pour ce mécanisme par défaut."
  ],
  "explain": "D'après la documentation sur les taints et tolerations, Kubernetes ajoute automatiquement des tolérances pour node.kubernetes.io/not-ready et node.kubernetes.io/unreachable avec tolerationSeconds=300, sauf si le Pod ou un contrôleur définit déjà une tolérance explicite. Ces Pods restent donc liés au nœud pendant 5 minutes après détection du problème, avant éviction.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
  "en": {
    "q": "When a node becomes NotReady or Unreachable, the API server automatically adds a default toleration to Pods that don't already have one for the node.kubernetes.io/not-ready and node.kubernetes.io/unreachable taints. What is the default tolerationSeconds value?",
    "choices": [
      "0 seconds (immediate eviction)",
      "300 seconds (5 minutes)",
      "60 seconds (1 minute)",
      "3600 seconds (1 hour)"
    ]
  }
},
{
  "id": "t6-t8",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait `kubectl rollout status deployment/nginx` d'après la documentation ?",
  "choices": [
    "Elle supprime le déploiement en cours",
    "Par défaut, elle surveille (watch) le statut du dernier rollout jusqu'à ce qu'il soit terminé",
    "Elle affiche uniquement l'historique des révisions passées, sans suivi en temps réel",
    "Elle force un redémarrage immédiat de tous les Pods du Deployment"
  ],
  "correct": [
    1
  ],
  "why": [
    "rollout status n'a aucun effet destructeur, elle ne fait qu'observer.",
    "Exact : la doc précise que 'by default rollout status will watch the status of the latest rollout until it's done', avec --watch=false pour désactiver ce comportement.",
    "C'est plutôt le rôle de kubectl rollout history.",
    "Ce n'est pas ce que fait rollout status ; kubectl rollout restart aurait cet effet."
  ],
  "explain": "kubectl rollout status affiche l'état d'avancement d'un rollout. Par défaut elle observe en continu jusqu'à la fin du dernier rollout ; --watch=false permet de ne pas attendre, et --revision=N permet de suivre une révision précise et d'abandonner si une autre révision la dépasse.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_status/",
  "en": {
    "q": "What does `kubectl rollout status deployment/nginx` do, according to the documentation?",
    "choices": [
      "It deletes the current deployment",
      "By default, it watches the status of the latest rollout until it is done",
      "It only prints the history of past revisions, without live tracking",
      "It forces an immediate restart of every Pod in the Deployment"
    ]
  }
},
{
  "id": "t6-t9",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Que fait le flag --to-revision de `kubectl rollout undo` si on ne le précise pas ?",
  "choices": [
    "Il vaut 0 par défaut, ce qui revient à la révision précédente immédiate",
    "Il empêche tout rollback tant qu'il n'est pas fourni explicitement",
    "Il revient toujours à la toute première révision créée",
    "Il déclenche un rollback vers la révision la plus récente disponible, identique à l'état actuel"
  ],
  "correct": [
    0
  ],
  "why": [
    "Exact : la doc précise 'The revision to rollback to. Default to 0 (last revision)', ce qui correspond à la révision précédente.",
    "Le rollback fonctionne bien sans préciser --to-revision, avec sa valeur par défaut.",
    "Ce comportement correspondrait à une valeur explicite de --to-revision=1, pas au défaut.",
    "Cela n'aurait aucun effet utile ; ce n'est pas le comportement documenté."
  ],
  "explain": "kubectl rollout undo permet de revenir à un rollout précédent. Le flag --to-revision a pour description documentée : 'The revision to rollback to. Default to 0 (last revision)'. Sans le préciser, la commande revient donc à la révision immédiatement précédente, par exemple `kubectl rollout undo deployment/abc`.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_undo/",
  "en": {
    "q": "What happens with the --to-revision flag of `kubectl rollout undo` when it is not specified?",
    "choices": [
      "It defaults to 0, which means rolling back to the immediately previous revision",
      "It prevents any rollback until it is explicitly provided",
      "It always rolls back to the very first revision ever created",
      "It triggers a rollback to the most recent available revision, identical to the current state"
    ]
  }
}
  ];
  DATA.forEach((o) => Q.push(Object.assign({ type: "theory" }, o)));
  window.CKA._t6 = DATA.length;
})();
