// Lot 9 : +50 questions théoriques sourcées sur kubernetes.io (scan de la doc).
// Chaque question porte why[] par option, explain (synthèse) et ref (doc officielle),
// plus la traduction en:{q,choices}. Répartition par pondération CKA.
(function () {
  const Q = window.CKA.questions;
  const DATA = [
{
  "id": "t9-a1",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Avec kubeadm, que fait la commande `kubeadm certs renew all` ?",
  "choices": [
    "Elle renouvelle uniquement les certificats déjà expirés",
    "Elle renouvelle tous les certificats connus du control plane, sans condition liée à leur date d'expiration",
    "Elle régénère une nouvelle autorité de certification (CA) racine pour tout le cluster",
    "Elle exige le flag --old-config pour fonctionner"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la doc précise que les renouvellements sont exécutés « unconditionally, regardless of expiration date » — tous les certificats sont renouvelés, expirés ou non.",
    "Vrai : `kubeadm certs renew all` renouvelle tous les certificats connus nécessaires au control plane, sans condition d'expiration.",
    "Faux : le renouvellement réutilise la CA locale existante (ou l'API de certificats K8s), il ne régénère pas de nouvelle CA racine.",
    "Faux : --old-config est un flag de `kubeadm config migrate`, sans rapport avec `kubeadm certs renew`."
  ],
  "explain": "`kubeadm certs renew` propose une sous-commande par certificat (apiserver, apiserver-etcd-client, front-proxy-client, etc.) ainsi qu'une sous-commande `all`. Le renouvellement est toujours exécuté sans regarder la date d'expiration actuelle.",
  "ref": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-certs/",
  "en": {
    "q": "With kubeadm, what does the `kubeadm certs renew all` command do?",
    "choices": [
      "It renews only certificates that have already expired",
      "It renews all known control-plane certificates, unconditionally regardless of expiration date",
      "It regenerates a brand-new root Certificate Authority (CA) for the whole cluster",
      "It requires the --old-config flag to work"
    ]
  }
},
{
  "id": "t9-a10",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Un ValidatingWebhookConfiguration cible `apiGroups: [apps], apiVersions: [v1], resources: [deployments]`. Avec `matchPolicy: Equivalent` (valeur par défaut), que se passe-t-il pour une requête modifiant un Deployment via `apps/v1beta1` ?",
  "choices": [
    "La requête n'est pas envoyée au webhook, car seule la version exacte apps/v1 correspond",
    "La requête est convertie vers apps/v1 puis envoyée au webhook",
    "La requête est automatiquement rejetée car apps/v1beta1 n'est pas listée dans les rules",
    "matchPolicy n'a aucun effet dès lors que la resource est un Deployment"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : ce comportement décrit matchPolicy: Exact, pas Equivalent.",
    "Vrai : la doc illustre exactement ce cas — avec Equivalent, une requête sur apps/v1beta1 « would be converted to apps/v1 and sent to the webhook ».",
    "Faux : Equivalent ne rejette pas la requête, il la convertit et l'envoie normalement au webhook.",
    "Faux : matchPolicy affecte bien la manière dont les rules du webhook s'appliquent, y compris pour les Deployments."
  ],
  "explain": "`matchPolicy: Equivalent` (le défaut) fait correspondre une requête aux rules du webhook même si elle passe par une autre version de la même ressource : la requête est convertie vers la version listée dans les rules avant d'être envoyée au webhook. `Exact` n'aurait fait correspondre que la version explicitement listée.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/admissionregistration/validating-webhook-configuration-v1/",
  "en": {
    "q": "A ValidatingWebhookConfiguration targets `apiGroups: [apps], apiVersions: [v1], resources: [deployments]`. With `matchPolicy: Equivalent` (the default), what happens to a request modifying a Deployment via `apps/v1beta1`?",
    "choices": [
      "The request is not sent to the webhook, since only the exact apps/v1 version matches",
      "The request is converted to apps/v1 and then sent to the webhook",
      "The request is automatically rejected because apps/v1beta1 is not listed in the rules",
      "matchPolicy has no effect as long as the resource is a Deployment"
    ]
  }
},
{
  "id": "t9-a11",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Pourquoi ne peut-on pas accorder l'accès à un nonResourceURL (comme `/healthz`) via un objet Role namespacé ?",
  "choices": [
    "Parce que les endpoints non-resource ne sont pas rattachés à un namespace : cette capacité est propre aux ClusterRole, qui sont cluster-scoped",
    "Parce qu'un Role ne peut contenir que le verbe get",
    "Parce que /healthz nécessite obligatoirement un ServiceAccount dédié",
    "En réalité, un Role namespacé peut aussi cibler des nonResourceURLs, au même titre qu'un ClusterRole"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc indique que les ClusterRole, étant cluster-scoped, permettent d'accorder l'accès à des « non-resource endpoints (like /healthz) », une capacité que les Role namespacés n'ont pas.",
    "Faux : un Role peut contenir n'importe quel verbe RBAC standard, la restriction ne porte pas sur les verbes.",
    "Faux : rien n'exige de ServiceAccount particulier pour accéder à /healthz.",
    "Faux : c'est l'inverse — nonResourceURLs est une capacité réservée aux ClusterRole."
  ],
  "explain": "Les nonResourceURLs (comme /healthz, /metrics) ne sont pas rattachées à un namespace ; seuls les ClusterRole, de portée cluster, peuvent donc les référencer dans leurs rules.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
  "en": {
    "q": "Why can't access to a nonResourceURL (like `/healthz`) be granted via a namespaced Role object?",
    "choices": [
      "Because non-resource endpoints aren't tied to a namespace: this capability is specific to ClusterRoles, which are cluster-scoped",
      "Because a Role can only contain the get verb",
      "Because /healthz requires a dedicated ServiceAccount",
      "In fact, a namespaced Role can also target nonResourceURLs, just like a ClusterRole"
    ]
  }
},
{
  "id": "t9-a12",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Concernant le verbe RBAC `impersonate`, quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "Il peut s'appliquer aux ressources users, groups, serviceaccounts, ainsi qu'à uids et userextras/* (sous le apiGroup authentication.k8s.io)",
    "Impersoner un autre utilisateur nécessite d'envoyer l'en-tête HTTP Impersonate-User",
    "L'en-tête Impersonate-Uid ne peut être utilisé que si Impersonate-User est également fourni",
    "Le verbe impersonate ne peut jamais s'appliquer qu'à des ServiceAccounts, jamais à des utilisateurs humains"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Vrai : la doc liste explicitement users, groups, serviceaccounts, ainsi que uids et userextras/[field-name] sous authentication.k8s.io comme ressources ciblables par impersonate.",
    "Vrai : impersoner nécessite de fournir l'en-tête Impersonate-User (« The username to act as »).",
    "Vrai : la doc précise qu'Impersonate-Uid « requires Impersonate-User » pour être utilisé.",
    "Faux : le verbe impersonate s'applique justement à la ressource users pour impersoner des utilisateurs humains, en plus des serviceaccounts."
  ],
  "explain": "Le verbe RBAC `impersonate` peut cibler users, groups, serviceaccounts, ainsi que uids et userextras/* (ces deux derniers sous le apiGroup authentication.k8s.io). L'impersonation se déclenche via l'en-tête Impersonate-User, et les en-têtes complémentaires (Impersonate-Group, Impersonate-Uid, Impersonate-Extra-*) exigent tous la présence d'Impersonate-User.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/user-impersonation/",
  "en": {
    "q": "Regarding the RBAC `impersonate` verb, which statements are correct? (select all that apply)",
    "choices": [
      "It can apply to the users, groups, serviceaccounts resources, as well as uids and userextras/* (under the authentication.k8s.io apiGroup)",
      "Impersonating another user requires sending the Impersonate-User HTTP header",
      "The Impersonate-Uid header can only be used if Impersonate-User is also provided",
      "The impersonate verb can only ever apply to ServiceAccounts, never to human users"
    ]
  }
},
{
  "id": "t9-a2",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Concernant `kubeadm certs renew`, quelles affirmations sont correctes ? (plusieurs réponses)",
  "choices": [
    "Les attributs comme les SAN (Subject Alternative Names) sont repris du certificat/fichier existant : il n'est pas nécessaire de les refournir",
    "Un redémarrage des composants du control plane est nécessaire pour que le renouvellement prenne effet",
    "Le renouvellement met automatiquement à jour le kubeconfig de tous les nœuds workers du cluster",
    "Seule la sous-commande `all` existe ; il n'y a pas de sous-commande dédiée par certificat"
  ],
  "correct": [
    0,
    1
  ],
  "why": [
    "Vrai : la doc précise « extra attributes such as SANs will be based on the existing file/certificates, there is no need to resupply them ».",
    "Vrai : la doc indique qu'il est « required to restart control-plane components » après renouvellement pour que les changements soient effectifs.",
    "Faux : le renouvellement agit sur le control plane local ; il ne propage rien automatiquement vers les workers.",
    "Faux : kubeadm propose des sous-commandes par certificat (apiserver, etcd-peer, front-proxy-client, admin.conf, etc.) en plus de `all`."
  ],
  "explain": "Le renouvellement kubeadm réutilise les attributs existants (dont les SAN) sans qu'il faille les repréciser, mais il exige un redémarrage manuel des composants du control plane (et une redistribution du certificat si utilisé ailleurs) pour être effectif.",
  "ref": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-certs/",
  "en": {
    "q": "Regarding `kubeadm certs renew`, which statements are correct? (select all that apply)",
    "choices": [
      "Attributes such as SANs are taken from the existing file/certificate: there is no need to resupply them",
      "Control-plane components must be restarted for the renewal to take effect",
      "The renewal automatically updates the kubeconfig on every worker node in the cluster",
      "Only the `all` subcommand exists; there is no dedicated per-certificate subcommand"
    ]
  }
},
{
  "id": "t9-a3",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Quel flag est obligatoire pour la commande `kubeadm config migrate` ?",
  "choices": [
    "--new-config",
    "--old-config",
    "--v1beta3",
    "--dry-run"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : --new-config est optionnel — s'il n'est pas fourni, la sortie va sur stdout.",
    "Vrai : la doc indique « This flag is mandatory » pour --old-config, le chemin du fichier de config à convertir.",
    "Faux : ce n'est pas un flag existant de cette commande.",
    "Faux : `kubeadm config migrate` n'a pas de mode --dry-run documenté."
  ],
  "explain": "`kubeadm config migrate` lit un fichier de config kubeadm d'une ancienne version API (--old-config, obligatoire), le désérialise, l'applique les valeurs par défaut, le convertit et le réécrit vers --new-config ou stdout si ce flag optionnel n'est pas fourni.",
  "ref": "https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-config/",
  "en": {
    "q": "Which flag is mandatory for the `kubeadm config migrate` command?",
    "choices": [
      "--new-config",
      "--old-config",
      "--v1beta3",
      "--dry-run"
    ]
  }
},
{
  "id": "t9-a4",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Quelle est la valeur par défaut du flag `--audit-log-maxage` du kube-apiserver ?",
  "choices": [
    "30",
    "100",
    "366",
    "0 (aucune limite)"
  ],
  "correct": [
    2
  ],
  "why": [
    "Faux : ce n'est pas la valeur documentée.",
    "Faux : 100 est la valeur par défaut de --audit-log-maxbackup (et de --audit-log-maxsize en Mo), pas de --audit-log-maxage.",
    "Vrai : la doc indique un défaut de 366 jours pour la rétention des fichiers de log d'audit basée sur leur timestamp.",
    "Faux : une valeur de 0 signifierait qu'aucune suppression par âge n'est appliquée, ce n'est pas le défaut."
  ],
  "explain": "`--audit-log-maxage` définit le nombre maximal de jours de rétention des anciens fichiers de log d'audit (défaut 366) ; --audit-log-maxbackup (défaut 100) et --audit-log-maxsize (défaut 100 Mo) sont des flags voisins mais distincts.",
  "ref": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/",
  "en": {
    "q": "What is the default value of the kube-apiserver flag `--audit-log-maxage`?",
    "choices": [
      "30",
      "100",
      "366",
      "0 (no limit)"
    ]
  }
},
{
  "id": "t9-a5",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Concernant `kubectl config set-credentials`, quelles méthodes d'authentification documentées peut-on configurer ? (plusieurs réponses)",
  "choices": [
    "Certificat client, via --client-certificate et --client-key",
    "Nom d'utilisateur et mot de passe, via --username et --password",
    "Clé privée SSH, via --ssh-key",
    "Un jeton d'API cloud générique, via --cloud-token"
  ],
  "correct": [
    0,
    1
  ],
  "why": [
    "Vrai : la doc montre l'exemple `set-credentials developer --client-certificate=... --client-key=...`.",
    "Vrai : la doc montre l'exemple `set-credentials experimenter --username=exp --password=some-password`, avec un avertissement sur le risque de stocker des mots de passe en clair.",
    "Faux : --ssh-key n'est pas un flag documenté de cette commande.",
    "Faux : --cloud-token n'existe pas ; ce n'est pas un mécanisme générique documenté ici."
  ],
  "explain": "`kubectl config set-credentials` supporte notamment l'authentification par certificat client (--client-certificate/--client-key) et par identifiants username/password, cette dernière étant déconseillée par la doc au profit d'un plugin d'identifiants séparé.",
  "ref": "https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/",
  "en": {
    "q": "Regarding `kubectl config set-credentials`, which documented authentication methods can be configured? (select all that apply)",
    "choices": [
      "Client certificate, via --client-certificate and --client-key",
      "Username and password, via --username and --password",
      "SSH private key, via --ssh-key",
      "A generic cloud API token, via --cloud-token"
    ]
  }
},
{
  "id": "t9-a6",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Que fait l'option `--minify` de `kubectl config view` ?",
  "choices": [
    "Elle supprime les certificats du kubeconfig affiché",
    "Elle affiche uniquement les informations de configuration associées au contexte courant",
    "Elle compresse le fichier kubeconfig sur le disque",
    "Elle fusionne plusieurs fichiers kubeconfig en un seul fichier"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : --minify ne touche pas au contenu des certificats, seulement à la portée des objets affichés.",
    "Vrai : la doc précise « To see only the configuration information associated with the current context, use the --minify flag ».",
    "Faux : ce n'est pas une opération de compression de fichier.",
    "Faux : la fusion de plusieurs fichiers kubeconfig se fait via la variable KUBECONFIG, pas via --minify."
  ],
  "explain": "`kubectl config view --minify` restreint la sortie (clusters, contexts, users, preferences) aux seuls éléments pertinents pour le contexte actuellement actif, au lieu d'afficher tout le fichier de configuration.",
  "ref": "https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/",
  "en": {
    "q": "What does the `--minify` option of `kubectl config view` do?",
    "choices": [
      "It removes the certificates from the displayed kubeconfig",
      "It shows only the configuration information associated with the current context",
      "It compresses the kubeconfig file on disk",
      "It merges several kubeconfig files into a single file"
    ]
  }
},
{
  "id": "t9-a7",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Concernant les heartbeats de Node basés sur l'objet Lease, quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "Chaque heartbeat du kubelet est une requête de mise à jour du champ spec.renewTime de l'objet Lease",
    "Ces objets Lease résident dans le namespace kube-node-lease",
    "Il existe un seul objet Lease partagé par tous les nœuds du cluster",
    "Le control plane utilise le timestamp de renewTime pour évaluer la disponibilité du Node"
  ],
  "correct": [
    0,
    1,
    3
  ],
  "why": [
    "Vrai : la doc précise « every kubelet heartbeat is an update request to this Lease object, updating the spec.renewTime field ».",
    "Vrai : « For every Node, there is a Lease object with a matching name in the kube-node-lease namespace ».",
    "Faux : il y a un objet Lease par Node, pas un objet partagé pour tout le cluster.",
    "Vrai : « The Kubernetes control plane uses the time stamp of this field to determine the availability of this Node »."
  ],
  "explain": "Chaque Node possède son propre objet Lease dans le namespace kube-node-lease ; le kubelet met à jour spec.renewTime à chaque heartbeat, et le control plane s'appuie sur ce timestamp pour juger de la disponibilité du Node.",
  "ref": "https://kubernetes.io/docs/concepts/architecture/leases/",
  "en": {
    "q": "Regarding Node heartbeats based on the Lease object, which statements are correct? (select all that apply)",
    "choices": [
      "Every kubelet heartbeat is an update request to the spec.renewTime field of the Lease object",
      "These Lease objects live in the kube-node-lease namespace",
      "There is a single Lease object shared by all nodes in the cluster",
      "The control plane uses the renewTime timestamp to determine Node availability"
    ]
  }
},
{
  "id": "t9-a8",
  "domain": "architecture",
  "difficulty": "easy",
  "q": "Dans le traitement d'une requête par les webhooks d'admission, quel est l'ordre d'exécution ?",
  "choices": [
    "Les validating webhooks s'exécutent avant les mutating webhooks",
    "Les mutating webhooks s'exécutent en premier ; une fois l'objet validé par l'API server, les validating webhooks s'exécutent",
    "Les deux types de webhooks s'exécutent en parallèle, sans ordre garanti",
    "L'ordre dépend de l'ordre alphabétique des noms de webhook"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est l'inverse — les mutating webhooks passent en premier.",
    "Vrai : la doc précise « Mutating admission webhooks are invoked first... After all object modifications are complete, and after the incoming object is validated by the API server, validating admission webhooks are invoked ».",
    "Faux : l'ordre est bien défini, pas parallèle et non garanti.",
    "Faux : l'ordre n'est pas basé sur le nom des webhooks."
  ],
  "explain": "Les mutating admission webhooks s'exécutent en premier pour appliquer d'éventuelles modifications par défaut, puis, une fois l'objet résultant validé en interne par l'API server, les validating admission webhooks s'exécutent pour appliquer des politiques de rejet.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/",
  "en": {
    "q": "When the API server processes a request through admission webhooks, what is the execution order?",
    "choices": [
      "Validating webhooks run before mutating webhooks",
      "Mutating webhooks run first; once the object is validated by the API server, validating webhooks run",
      "Both types of webhooks run in parallel, with no guaranteed order",
      "The order depends on the alphabetical order of webhook names"
    ]
  }
},
{
  "id": "t9-a9",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Sur un webhook d'admission, que signifie `failurePolicy: Ignore`, et quelle est la valeur par défaut de ce champ ?",
  "choices": [
    "Ignore : une erreur lors de l'appel au webhook est ignorée (la requête d'admission n'échoue pas pour autant) ; la valeur par défaut du champ est Fail",
    "Ignore : la requête est systématiquement rejetée en cas d'erreur ; la valeur par défaut est Ignore",
    "Ignore : le webhook est totalement désactivé côté API server ; la valeur par défaut est Fail",
    "Ignore et Fail ont exactement le même comportement ; le champ n'a pas de valeur par défaut"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « \"Ignore\" means that an error calling the webhook is ignored » et « Defaults to Fail ».",
    "Faux : c'est la définition de Fail, pas d'Ignore, et la valeur par défaut du champ est Fail, pas Ignore.",
    "Faux : Ignore ne désactive pas le webhook, il change seulement le comportement en cas d'échec d'appel.",
    "Faux : Fail fait échouer l'admission sur erreur du webhook, ce qui diffère clairement d'Ignore ; le champ a bien un défaut (Fail)."
  ],
  "explain": "`failurePolicy` définit comment une erreur d'appel au webhook (timeout, indisponibilité) est traitée : `Fail` (valeur par défaut) fait échouer l'admission, `Ignore` laisse passer la requête comme si le webhook n'existait pas.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/admissionregistration/validating-webhook-configuration-v1/",
  "en": {
    "q": "On an admission webhook, what does `failurePolicy: Ignore` mean, and what is the field's default value?",
    "choices": [
      "Ignore: an error calling the webhook is ignored (the admission request does not fail because of it); the field defaults to Fail",
      "Ignore: the request is always rejected on error; the field defaults to Ignore",
      "Ignore: the webhook is fully disabled on the API server side; the field defaults to Fail",
      "Ignore and Fail behave exactly the same; the field has no default value"
    ]
  }
},
{
  "id": "t9-w1",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Que fait le champ `activeDeadlineSeconds` défini directement dans le spec d'un Pod (hors contexte Job) ?",
  "choices": [
    "Il limite le nombre de redémarrages autorisés pour les conteneurs du Pod",
    "Il définit une durée, relative au StartTime, au-delà de laquelle le système tente activement de marquer le Pod comme failed et de tuer ses conteneurs",
    "Il définit le délai de grâce de terminaison lors d'un `kubectl delete`",
    "Il n'a d'effet que si le Pod est géré par un CronJob"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le rôle de backoffLimit (au niveau Job) ou de la politique de redémarrage du conteneur, pas d'activeDeadlineSeconds.",
    "Vrai : la doc précise « Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers ».",
    "Faux : c'est le rôle de terminationGracePeriodSeconds.",
    "Faux : ce champ existe au niveau du PodSpec lui-même, indépendamment d'un CronJob ou d'un Job."
  ],
  "explain": "`activeDeadlineSeconds` au niveau Pod plafonne la durée totale d'activité du Pod depuis son démarrage : une fois ce délai dépassé, le système marque le Pod failed et termine ses conteneurs, indépendamment du champ homonyme utilisé au niveau Job.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/",
  "en": {
    "q": "What does the `activeDeadlineSeconds` field do when set directly in a Pod's spec (outside of a Job context)?",
    "choices": [
      "It limits the number of allowed restarts for the Pod's containers",
      "It defines a duration, relative to StartTime, after which the system actively tries to mark the Pod failed and kill its containers",
      "It defines the termination grace period used during `kubectl delete`",
      "It only has an effect if the Pod is managed by a CronJob"
    ]
  }
},
{
  "id": "t9-w2",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Concernant le hook de cycle de vie `preStop` d'un conteneur, que se passe-t-il si le hook reste bloqué indéfiniment ?",
  "choices": [
    "Le signal TERM est envoyé immédiatement au conteneur en parallèle, sans attendre le hook",
    "Le Pod reste en phase Terminating jusqu'à ce qu'il soit tué à l'expiration de terminationGracePeriodSeconds",
    "Kubernetes ignore automatiquement le hook après 5 secondes et termine le conteneur",
    "Le kubelet redémarre le conteneur immédiatement pour débloquer la situation"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la doc précise que preStop n'est pas exécuté de façon asynchrone par rapport à l'envoi du signal — le hook doit terminer avant que TERM ne puisse être envoyé.",
    "Vrai : « If a PreStop hook hangs during execution, the Pod's phase will be Terminating and remain there until the Pod is killed after its terminationGracePeriodSeconds expires ».",
    "Faux : aucun délai fixe de 5 secondes n'est documenté pour interrompre un hook preStop bloqué.",
    "Faux : le kubelet ne redémarre pas le conteneur dans ce cas, il attend l'expiration du terminationGracePeriodSeconds."
  ],
  "explain": "Le hook `preStop` est exécuté de façon synchrone avant l'envoi du signal TERM au conteneur. S'il reste bloqué, le Pod reste visible en phase Terminating jusqu'à expiration de son terminationGracePeriodSeconds, moment où il est tué de force.",
  "ref": "https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/",
  "en": {
    "q": "Regarding a container's `preStop` lifecycle hook, what happens if the hook hangs indefinitely?",
    "choices": [
      "The TERM signal is sent to the container immediately in parallel, without waiting for the hook",
      "The Pod stays in the Terminating phase until it is killed once its terminationGracePeriodSeconds expires",
      "Kubernetes automatically skips the hook after 5 seconds and terminates the container",
      "The kubelet immediately restarts the container to unblock the situation"
    ]
  }
},
{
  "id": "t9-w3",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Que fait l'action `Sleep` disponible pour les hooks de cycle de vie d'un conteneur (postStart/preStop) ?",
  "choices": [
    "Elle exécute une commande shell arbitraire dans le conteneur",
    "Elle met le conteneur en pause pour une durée spécifiée",
    "Elle envoie une requête HTTP après un délai donné",
    "Elle redémarre le conteneur après un délai donné"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le rôle du handler `exec`, distinct de `sleep`.",
    "Vrai : la doc décrit l'action Sleep comme « Pauses the container for a specified duration ».",
    "Faux : c'est le rôle du handler `httpGet`, distinct de `sleep`.",
    "Faux : sleep met en pause, il ne redémarre pas le conteneur."
  ],
  "explain": "Parmi les handlers disponibles pour les hooks postStart/preStop (exec, httpGet, sleep), l'action Sleep se contente de mettre le conteneur en pause pendant la durée indiquée, utile par exemple pour laisser le temps à un load balancer de retirer le Pod avant l'arrêt effectif.",
  "ref": "https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/",
  "en": {
    "q": "What does the `Sleep` action available for a container's lifecycle hooks (postStart/preStop) do?",
    "choices": [
      "It runs an arbitrary shell command inside the container",
      "It pauses the container for a specified duration",
      "It sends an HTTP request after a given delay",
      "It restarts the container after a given delay"
    ]
  }
},
{
  "id": "t9-w4",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Un Pod a `spec.setHostnameAsFQDN: true`. Que fait le kubelet, et quelle contrainte peut faire échouer le démarrage du Pod ?",
  "choices": [
    "Le kubelet écrit le FQDN du Pod comme hostname ; si ce FQDN dépasse 64 caractères, le Pod reste en Pending",
    "Le kubelet ignore ce champ si le Pod n'a pas de subdomain défini, sans conséquence",
    "Le kubelet écrit le FQDN uniquement dans /etc/hosts, jamais comme hostname noyau",
    "Ce champ ne peut être utilisé qu'avec des Services headless, sinon le Pod échoue à la validation"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : « the kubelet writes the Pod's FQDN into the hostname for that Pod's namespace » ; et le champ nodename du noyau Linux est limité à 64 caractères, donc si le FQDN dépasse 64 caractères le Pod échoue à démarrer et reste Pending.",
    "Faux : sans subdomain, le comportement par défaut du hostname s'applique, mais ce n'est pas décrit comme une simple absence de conséquence liée à ce cas précis.",
    "Faux : le FQDN est écrit comme hostname du Pod lui-même (résultat visible via la commande hostname), pas seulement dans /etc/hosts.",
    "Faux : rien n'exige un Service headless pour utiliser setHostnameAsFQDN."
  ],
  "explain": "Avec `setHostnameAsFQDN: true`, le kubelet fixe le hostname du Pod à son FQDN complet plutôt qu'au hostname court. Le champ nodename du noyau Linux étant limité à 64 caractères, un FQDN plus long provoque l'échec du démarrage du Pod, qui reste en Pending.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
  "en": {
    "q": "A Pod has `spec.setHostnameAsFQDN: true`. What does the kubelet do, and what constraint can prevent the Pod from starting?",
    "choices": [
      "The kubelet writes the Pod's FQDN as its hostname; if that FQDN exceeds 64 characters, the Pod stays Pending",
      "The kubelet ignores this field if the Pod has no subdomain defined, with no other consequence",
      "The kubelet writes the FQDN only into /etc/hosts, never as the kernel hostname",
      "This field can only be used with headless Services, otherwise the Pod fails validation"
    ]
  }
},
{
  "id": "t9-w5",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Un Pod définit `.spec.os.name: windows`. Quel est l'effet réel de ce champ sur le placement du Pod par le scheduler ?",
  "choices": [
    "Le scheduler place automatiquement le Pod sur un nœud Windows correspondant, sans configuration supplémentaire",
    "Le scheduler n'utilise PAS la valeur de .spec.os.name pour assigner les Pods aux nœuds : il faut utiliser taints/tolerations et nodeSelector pour cibler les nœuds Windows",
    "Le champ empêche simplement la création du Pod si aucun nœud Windows n'existe dans le cluster",
    "Il remplace complètement le besoin de nodeSelector pour les workloads Windows"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est précisément ce que le champ NE fait PAS, selon la documentation.",
    "Vrai : la doc affirme explicitement « The scheduler does not use the value of .spec.os.name when assigning Pods to nodes » et recommande d'utiliser taints/tolerations et node selectors pour ce placement.",
    "Faux : aucune vérification d'existence de nœud Windows n'est documentée comme bloquant la création du Pod pour ce champ.",
    "Faux : c'est l'inverse — il faut continuer à utiliser nodeSelector, ce champ ne le remplace pas."
  ],
  "explain": "`.spec.os.name` sert uniquement à documenter/valider le système d'exploitation ciblé par les conteneurs du Pod (linux ou windows) ; il n'influence pas la décision de placement du scheduler, qui doit continuer à s'appuyer sur les mécanismes standards (taints/tolerations, nodeSelector) pour orienter les workloads Windows vers les bons nœuds.",
  "ref": "https://kubernetes.io/docs/concepts/windows/user-guide/",
  "en": {
    "q": "A Pod sets `.spec.os.name: windows`. What is the actual effect of this field on the scheduler's Pod placement?",
    "choices": [
      "The scheduler automatically places the Pod on a matching Windows node, with no extra configuration",
      "The scheduler does NOT use the value of .spec.os.name to assign Pods to nodes: taints/tolerations and nodeSelector must be used to target Windows nodes",
      "The field simply prevents the Pod from being created if no Windows node exists in the cluster",
      "It fully replaces the need for nodeSelector for Windows workloads"
    ]
  }
},
{
  "id": "t9-w6",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Concernant `.spec.podManagementPolicy` d'un StatefulSet, quelle affirmation est correcte ?",
  "choices": [
    "`Parallel` est la valeur par défaut et crée tous les Pods en même temps",
    "`OrderedReady` est la valeur par défaut : le contrôleur attend qu'un Pod soit Running et Ready avant de créer le suivant, et termine dans l'ordre inverse en scale-down",
    "`OrderedReady` crée les Pods dans le désordre mais les termine toujours dans l'ordre",
    "Le podManagementPolicy n'affecte que la suppression des Pods, jamais leur création"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est OrderedReady qui est la valeur par défaut, pas Parallel.",
    "Vrai : avec OrderedReady (le défaut), les Pods sont créés/terminés selon leur index ordinal, le contrôleur attendant chaque Pod Running et Ready avant de passer au suivant.",
    "Faux : OrderedReady respecte l'ordre à la fois en création et en terminaison.",
    "Faux : le podManagementPolicy affecte le comportement de création ET de suppression des Pods."
  ],
  "explain": "`OrderedReady`, la politique par défaut d'un StatefulSet, crée et termine les Pods de façon strictement séquentielle selon leur index ordinal, en attendant chaque étape. `Parallel` permet de créer/supprimer les Pods sans attendre cet ordre, accélérant les opérations de scaling au prix des garanties d'ordonnancement.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/",
  "en": {
    "q": "Regarding a StatefulSet's `.spec.podManagementPolicy`, which statement is correct?",
    "choices": [
      "`Parallel` is the default value and creates all Pods at the same time",
      "`OrderedReady` is the default value: the controller waits for a Pod to be Running and Ready before creating the next one, and terminates Pods in reverse order when scaling down",
      "`OrderedReady` creates Pods out of order but always terminates them in order",
      "podManagementPolicy only affects Pod deletion, never Pod creation"
    ]
  }
},
{
  "id": "t9-w7",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Parmi les valeurs suivantes, lesquelles sont des `type` valides d'un `DeploymentCondition` dans `.status.conditions` d'un Deployment ? (plusieurs réponses)",
  "choices": [
    "Available",
    "Progressing",
    "ReplicaFailure",
    "Healthy"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Vrai : Available est un type de condition documenté d'un Deployment.",
    "Vrai : Progressing est un type de condition documenté d'un Deployment.",
    "Vrai : ReplicaFailure est un type de condition documenté d'un Deployment.",
    "Faux : Healthy n'est pas un type de DeploymentCondition documenté par l'API Kubernetes."
  ],
  "explain": "Un DeploymentCondition (dans .status.conditions) possède un champ `type` dont les valeurs documentées sont Available, Progressing et ReplicaFailure ; « Healthy » n'existe pas comme type de condition Kubernetes standard.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/deployment-v1/",
  "en": {
    "q": "Which of the following are valid `type` values of a `DeploymentCondition` in a Deployment's `.status.conditions`? (select all that apply)",
    "choices": [
      "Available",
      "Progressing",
      "ReplicaFailure",
      "Healthy"
    ]
  }
},
{
  "id": "t9-w8",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Concernant la valeur numérique (`value`) d'un objet PriorityClass, quelle affirmation est correcte ?",
  "choices": [
    "Un PriorityClass défini par un utilisateur peut avoir n'importe quelle valeur entière 32 bits inférieure ou égale à 1 milliard (1 000 000 000)",
    "La valeur maximale autorisée pour un PriorityClass utilisateur est 100",
    "Toutes les valeurs de PriorityClass, y compris celles des classes système, doivent rester sous 1000",
    "Il n'existe aucune limite supérieure à la valeur d'un PriorityClass, quel qu'il soit"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « A PriorityClass object can have any 32-bit integer value smaller than or equal to 1 billion », soit une plage de -2147483648 à 1000000000 inclus.",
    "Faux : 100 n'est pas la limite documentée ; elle est bien plus élevée (1 milliard).",
    "Faux : les PriorityClass système (system-cluster-critical, system-node-critical) utilisent des valeurs bien supérieures à 1000 (de l'ordre de 2 milliards).",
    "Faux : les valeurs utilisateur sont plafonnées à 1 milliard ; au-delà, la plage est réservée aux PriorityClass système intégrées."
  ],
  "explain": "Un PriorityClass utilisateur peut prendre toute valeur entière 32 bits jusqu'à 1 milliard inclus ; les valeurs supérieures sont réservées aux PriorityClass système critiques (par exemple 2 000 000 000 pour system-cluster-critical et 2 000 001 000 pour system-node-critical en v1.37).",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/",
  "en": {
    "q": "Regarding the numeric `value` of a PriorityClass object, which statement is correct?",
    "choices": [
      "A user-defined PriorityClass can have any 32-bit integer value less than or equal to 1 billion (1,000,000,000)",
      "The maximum allowed value for a user PriorityClass is 100",
      "All PriorityClass values, including system ones, must stay under 1000",
      "There is no upper limit at all to a PriorityClass value, of any kind"
    ]
  }
},
{
  "id": "t9-n1",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Pour un port nommé d'un Service, quel est le format d'un enregistrement DNS SRV créé automatiquement ?",
  "choices": [
    "_port-name._port-protocol.my-svc.my-namespace.svc.cluster-domain.example",
    "my-svc._port-name.my-namespace.svc.cluster-domain.example",
    "port-name.port-protocol.my-svc.my-namespace.cluster-domain.example",
    "Aucun enregistrement SRV n'est créé pour les ports nommés d'un Service"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « For each named port, the SRV record has the form _port-name._port-protocol.my-svc.my-namespace.svc.cluster-domain.example ».",
    "Faux : ce n'est pas le format documenté (l'ordre et les underscores sont différents).",
    "Faux : le nom et le protocole du port sont préfixés par un underscore dans le vrai format.",
    "Faux : les SRV Records sont bien créés pour les ports nommés, que ce soit sur un Service normal ou headless."
  ],
  "explain": "Kubernetes crée un enregistrement DNS SRV pour chaque port nommé d'un Service normal ou headless, sous la forme _port-name._port-protocol.my-svc.my-namespace.svc.cluster-domain.example ; pour un Service headless, la résolution renvoie une entrée par Pod backing le Service.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
  "en": {
    "q": "For a named port on a Service, what is the format of the automatically created DNS SRV record?",
    "choices": [
      "_port-name._port-protocol.my-svc.my-namespace.svc.cluster-domain.example",
      "my-svc._port-name.my-namespace.svc.cluster-domain.example",
      "port-name.port-protocol.my-svc.my-namespace.cluster-domain.example",
      "No SRV record is ever created for a Service's named ports"
    ]
  }
},
{
  "id": "t9-n10",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Un Pod tourne dans le namespace `test` avec le cluster-domain par défaut `cluster.local`. D'après le `/etc/resolv.conf` généré par le kubelet, quelle est la liste `search` par défaut ?",
  "choices": [
    "cluster.local uniquement",
    "test.svc.cluster.local svc.cluster.local cluster.local",
    "svc.cluster.local test.cluster.local cluster.local",
    "Aucune liste search n'est générée par défaut ; il faut la configurer manuellement via dnsConfig"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la liste par défaut contient trois entrées, pas une seule.",
    "Vrai : la doc montre l'exemple `search <namespace>.svc.cluster.local svc.cluster.local cluster.local` — soit ici `test.svc.cluster.local svc.cluster.local cluster.local`.",
    "Faux : l'ordre et le format de ces entrées ne correspondent pas à ce que documente Kubernetes.",
    "Faux : le kubelet configure ce fichier automatiquement pour chaque Pod, sans configuration manuelle requise."
  ],
  "explain": "Le kubelet configure automatiquement /etc/resolv.conf de chaque Pod avec une liste search composée du namespace du Pod suivi du domaine svc, puis du domaine svc seul, puis du cluster-domain — permettant de résoudre des noms courts comme `data` vers `data.test.svc.cluster.local`.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
  "en": {
    "q": "A Pod runs in the `test` namespace with the default cluster-domain `cluster.local`. According to the /etc/resolv.conf generated by the kubelet, what is the default `search` list?",
    "choices": [
      "cluster.local only",
      "test.svc.cluster.local svc.cluster.local cluster.local",
      "svc.cluster.local test.cluster.local cluster.local",
      "No search list is generated by default; it must be configured manually via dnsConfig"
    ]
  }
},
{
  "id": "t9-n2",
  "domain": "networking",
  "difficulty": "medium",
  "q": "En mode IPVS de kube-proxy, quel est l'algorithme de répartition de charge utilisé par défaut si aucun n'est configuré ?",
  "choices": [
    "lc (least connection)",
    "rr (round robin)",
    "sh (source hashing)",
    "nq (never queue)"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : lc est un algorithme disponible, mais ce n'est pas le défaut.",
    "Vrai : rr (round robin) est l'algorithme de répartition par défaut du mode IPVS si le scheduler n'est pas configuré.",
    "Faux : sh est un algorithme disponible basé sur le hachage de la source, mais ce n'est pas le défaut.",
    "Faux : nq est un algorithme disponible, mais ce n'est pas le défaut."
  ],
  "explain": "Le mode IPVS de kube-proxy propose plusieurs algorithmes de répartition (rr, lc, dh, sh, sed, nq), configurables via le champ scheduler de la ConfigMap kube-proxy ou le flag --ipvs-scheduler ; round robin (rr) est utilisé par défaut si aucun n'est spécifié.",
  "ref": "https://kubernetes.io/blog/2018/07/09/ipvs-based-in-cluster-load-balancing-deep-dive/",
  "en": {
    "q": "In kube-proxy's IPVS mode, which load-balancing scheduling algorithm is used by default if none is configured?",
    "choices": [
      "lc (least connection)",
      "rr (round robin)",
      "sh (source hashing)",
      "nq (never queue)"
    ]
  }
},
{
  "id": "t9-n3",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Dans un objet Ingress, à quoi sert un « resource backend » ?",
  "choices": [
    "Il permet de cibler un objet personnalisé (custom resource, via une CRD) comme backend, au lieu d'un Service classique",
    "Il permet de limiter les ressources CPU/mémoire allouées au contrôleur Ingress",
    "Il déclare un quota de bande passante réseau pour le backend",
    "C'est un synonyme de defaultBackend, sans différence de comportement"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise qu'un backend est « a combination of Service and port names... or a custom resource backend by way of a CRD ».",
    "Faux : ce n'est pas lié à des quotas de ressources de calcul.",
    "Faux : aucune notion de quota de bande passante n'est associée à ce mécanisme.",
    "Faux : defaultBackend traite les requêtes non appariées ; un resource backend cible une ressource personnalisée pour n'importe quelle règle, ce sont deux notions distinctes."
  ],
  "explain": "Un backend d'Ingress est normalement une combinaison Service+port, mais la spec permet aussi un « resource backend » pointant vers un objet personnalisé défini par une CustomResourceDefinition, offrant une alternative aux Services classiques pour router le trafic.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/",
  "en": {
    "q": "In an Ingress object, what is a \"resource backend\" used for?",
    "choices": [
      "It targets a custom resource (via a CRD) as the backend, instead of a regular Service",
      "It limits the CPU/memory resources allocated to the Ingress controller",
      "It declares a network bandwidth quota for the backend",
      "It's just a synonym for defaultBackend, with no behavioral difference"
    ]
  }
},
{
  "id": "t9-n4",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Concernant le champ `spec.controller` d'un objet IngressClass, quelle affirmation est correcte ?",
  "choices": [
    "Il doit être un chemin préfixé par un domaine (ex. acme.io/ingress-controller), limité à 250 caractères, et il est immuable",
    "Il accepte n'importe quelle chaîne libre, modifiable à tout moment après création",
    "Il référence directement le nom d'un Pod exécutant le contrôleur Ingress",
    "Il est obligatoire uniquement pour les IngressClass marquées comme classe par défaut"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « This should be specified as a domain-prefixed path no more than 250 characters in length, e.g. \"acme.io/ingress-controller\". This field is immutable. ».",
    "Faux : le format est contraint (chemin préfixé par domaine, 250 caractères max) et le champ est immuable.",
    "Faux : il identifie un contrôleur (par convention de nommage), pas un Pod précis.",
    "Faux : ce champ est requis pour toute IngressClass, qu'elle soit ou non la classe par défaut du cluster."
  ],
  "explain": "`spec.controller` d'une IngressClass identifie, via un chemin préfixé par un domaine (max 250 caractères, champ immuable), quel contrôleur doit traiter les Ingress rattachés à cette classe — permettant à un même contrôleur de gérer plusieurs « flavors » de configuration.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/networking/ingress-class-v1/",
  "en": {
    "q": "Regarding the `spec.controller` field of an IngressClass object, which statement is correct?",
    "choices": [
      "It must be a domain-prefixed path (e.g. acme.io/ingress-controller), limited to 250 characters, and it is immutable",
      "It accepts any free-form string, modifiable at any time after creation",
      "It directly references the name of a Pod running the Ingress controller",
      "It is only required for IngressClasses marked as the cluster's default class"
    ]
  }
},
{
  "id": "t9-n5",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Quel flag du kube-apiserver permet de modifier la plage de ports par défaut utilisée pour les Services NodePort (30000-32767) ?",
  "choices": [
    "--nodeport-range",
    "--service-node-port-range",
    "--node-port-range",
    "--service-port-range"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : ce n'est pas le nom exact du flag.",
    "Vrai : --service-node-port-range est le flag documenté du kube-apiserver pour redéfinir cette plage.",
    "Faux : ce n'est pas le nom exact du flag.",
    "Faux : ce n'est pas le nom exact du flag."
  ],
  "explain": "La plage de ports NodePort par défaut (30000-32767) peut être redéfinie via le flag --service-node-port-range du kube-apiserver.",
  "ref": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/",
  "en": {
    "q": "Which kube-apiserver flag lets you change the default port range used for NodePort Services (30000-32767)?",
    "choices": [
      "--nodeport-range",
      "--service-node-port-range",
      "--node-port-range",
      "--service-port-range"
    ]
  }
},
{
  "id": "t9-n6",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Que fait la commande `kubectl proxy` ?",
  "choices": [
    "Elle transfère un port local vers un Pod ou Service spécifique, sans passer par l'API server",
    "Elle fait agir kubectl comme un reverse proxy vers l'API server : elle localise l'apiserver et gère l'authentification",
    "Elle crée un Service de type LoadBalancer temporaire",
    "Elle bascule kube-proxy en mode IPVS"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le rôle de `kubectl port-forward`, pas de `kubectl proxy`.",
    "Vrai : la doc précise que kubectl en mode proxy « acts as a reverse proxy. It handles locating the apiserver and authenticating ».",
    "Faux : `kubectl proxy` n'a rien à voir avec la création de Service.",
    "Faux : `kubectl proxy` ne modifie pas le mode de fonctionnement de kube-proxy sur les nœuds."
  ],
  "explain": "`kubectl proxy` lance kubectl en mode reverse proxy vers l'API server : il localise l'apiserver, vérifie son certificat et ajoute l'authentification, exposant ainsi l'API sur une adresse locale en HTTP simple, à la différence de `kubectl port-forward` qui cible directement un Pod ou Service applicatif.",
  "ref": "https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/",
  "en": {
    "q": "What does the `kubectl proxy` command do?",
    "choices": [
      "It forwards a local port to a specific Pod or Service, without going through the API server",
      "It makes kubectl act as a reverse proxy to the API server: it locates the apiserver and handles authentication",
      "It creates a temporary Service of type LoadBalancer",
      "It switches kube-proxy into IPVS mode"
    ]
  }
},
{
  "id": "t9-n7",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Parmi les protocoles suivants, lesquels une NetworkPolicy peut-elle contrôler au niveau IP/port ? (plusieurs réponses)",
  "choices": [
    "TCP",
    "UDP",
    "SCTP",
    "ICMP"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Vrai : TCP est un des protocoles explicitement supportés.",
    "Vrai : UDP est un des protocoles explicitement supportés.",
    "Vrai : la doc précise « If you want to control traffic flow at the IP address or port level for TCP, UDP, and SCTP protocols... ».",
    "Faux : ICMP n'est pas listé parmi les protocoles contrôlables par une NetworkPolicy au niveau port."
  ],
  "explain": "Les NetworkPolicies Kubernetes permettent de contrôler le trafic au niveau IP/port pour les protocoles TCP, UDP et SCTP ; ICMP n'entre pas dans ce mécanisme de filtrage par port.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
  "en": {
    "q": "Which of the following protocols can a NetworkPolicy control at the IP/port level? (select all that apply)",
    "choices": [
      "TCP",
      "UDP",
      "SCTP",
      "ICMP"
    ]
  }
},
{
  "id": "t9-n8",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Une NetworkPolicy ne définit pas le champ `policyTypes`, mais possède une règle `egress`. Que se passe-t-il par défaut ?",
  "choices": [
    "Seul Ingress est actif ; Egress est ignoré tant que policyTypes ne le mentionne pas explicitement",
    "Ingress est toujours actif par défaut, et Egress est également actif car la NetworkPolicy contient une règle egress",
    "La NetworkPolicy entière est invalide et rejetée par l'API server",
    "Seul Egress est actif ; Ingress est désactivé par défaut dans ce cas"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la présence d'une règle egress active bien Egress même sans le préciser dans policyTypes.",
    "Vrai : la doc précise « If no policyTypes are specified on a NetworkPolicy then by default Ingress will always be set and Egress will be set if the NetworkPolicy has any egress rules. »",
    "Faux : l'omission de policyTypes est parfaitement valide et gérée par une règle d'inférence par défaut.",
    "Faux : Ingress reste actif par défaut, quelle que soit la présence de règles egress."
  ],
  "explain": "Quand `policyTypes` n'est pas précisé, Kubernetes active toujours Ingress par défaut, et active Egress uniquement si la NetworkPolicy contient au moins une règle egress — ce qui est le cas ici, donc les deux directions sont actives.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
  "en": {
    "q": "A NetworkPolicy does not set the `policyTypes` field, but it has an `egress` rule. What happens by default?",
    "choices": [
      "Only Ingress is active; Egress is ignored until policyTypes explicitly mentions it",
      "Ingress is always active by default, and Egress is also active because the NetworkPolicy contains an egress rule",
      "The whole NetworkPolicy is invalid and rejected by the API server",
      "Only Egress is active; Ingress is disabled by default in this case"
    ]
  }
},
{
  "id": "t9-n9",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Dans la règle d'un Ingress, comment référence-t-on le port d'un Service backend ?",
  "choices": [
    "Uniquement via service.port.number, service.port.name n'existe pas",
    "Via service.port.name OU service.port.number (l'un ou l'autre, pas les deux)",
    "Les deux champs service.port.name et service.port.number sont obligatoires simultanément",
    "Le port n'a pas besoin d'être précisé, Kubernetes le déduit automatiquement du Service"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : service.port.name existe aussi et permet de référencer un port nommé.",
    "Vrai : la doc décrit le backend comme défini avec « a service.name and a service.port.name or service.port.number », donc l'un ou l'autre.",
    "Faux : ce ne sont pas deux champs obligatoires simultanément, il faut en choisir un.",
    "Faux : le port du Service cible doit être précisé explicitement dans le backend."
  ],
  "explain": "Le backend d'une règle Ingress référence le port du Service ciblé soit par son nom (service.port.name), soit par son numéro (service.port.number), les deux étant des alternatives exclusives et non des champs à renseigner simultanément.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/",
  "en": {
    "q": "In an Ingress rule, how is the backend Service's port referenced?",
    "choices": [
      "Only via service.port.number, service.port.name does not exist",
      "Via service.port.name OR service.port.number (either one, not both)",
      "Both service.port.name and service.port.number are required simultaneously",
      "The port doesn't need to be specified, Kubernetes infers it automatically from the Service"
    ]
  }
},
{
  "id": "t9-s1",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Un conteneur monte une clé d'un ConfigMap via `subPath` dans son volumeMount. Que se passe-t-il si le ConfigMap est ensuite modifié ?",
  "choices": [
    "Le fichier monté est mis à jour automatiquement, comme pour un montage sans subPath",
    "Le conteneur ne reçoit PAS la mise à jour : un montage ConfigMap via subPath ne se met pas à jour automatiquement",
    "Le Pod redémarre automatiquement pour appliquer la nouvelle valeur",
    "La mise à jour est appliquée, mais avec un délai fixe garanti de 60 secondes"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le comportement d'un montage SANS subPath, pas avec.",
    "Vrai : la doc précise « A container using a ConfigMap as a subPath volume mount will not receive updates when the ConfigMap changes ».",
    "Faux : aucun redémarrage automatique du Pod n'est déclenché par ce mécanisme.",
    "Faux : il n'y a pas de mise à jour du tout dans ce cas, donc pas de délai applicable."
  ],
  "explain": "Monter une clé de ConfigMap (ou de Secret) via subPath fige le contenu du fichier au moment du montage : contrairement à un montage de volume complet, les mises à jour ultérieures du ConfigMap ne sont pas répercutées dans le conteneur.",
  "ref": "https://kubernetes.io/docs/concepts/storage/volumes/",
  "en": {
    "q": "A container mounts a ConfigMap key via `subPath` in its volumeMount. What happens if the ConfigMap is later updated?",
    "choices": [
      "The mounted file is updated automatically, just like a mount without subPath",
      "The container does NOT receive the update: a ConfigMap volume mount via subPath does not update automatically",
      "The Pod automatically restarts to apply the new value",
      "The update is applied, but with a guaranteed fixed delay of 60 seconds"
    ]
  }
},
{
  "id": "t9-s2",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Concernant la reclaimPolicy `Recycle` d'un PersistentVolume, quelle affirmation est correcte ?",
  "choices": [
    "Elle est dépréciée ; quand elle est supportée, elle effectue un nettoyage basique (équivalent à rm -rf) et ne fonctionne que pour NFS et HostPath",
    "C'est la politique recommandée pour tout nouveau cluster, car elle est plus rapide que Delete",
    "Elle fonctionne avec tous les provisioners CSI modernes",
    "Elle supprime le PV et provisionne automatiquement un nouveau volume vide en remplacement"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : Recycle est dépréciée, effectue un nettoyage basique du volume (scrub) quand le plugin la supporte, et n'est disponible que pour les volumes NFS et HostPath.",
    "Faux : c'est l'inverse — Recycle est dépréciée et non recommandée ; le provisionnement dynamique est préféré.",
    "Faux : les provisioners CSI modernes ne supportent pas Recycle, qui est un mécanisme des anciens plugins in-tree.",
    "Faux : Recycle ne supprime pas le PV lui-même, elle nettoie son contenu pour le rendre disponible à une nouvelle PVC."
  ],
  "explain": "La reclaimPolicy `Recycle` est dépréciée : quand elle est supportée par le plugin de volume, elle effectue un nettoyage basique du contenu (équivalent à un rm -rf) puis rend le volume disponible pour une nouvelle claim, mais elle n'est disponible que pour les volumes NFS et HostPath — le provisionnement dynamique est l'approche recommandée aujourd'hui.",
  "ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/",
  "en": {
    "q": "Regarding the `Recycle` reclaim policy of a PersistentVolume, which statement is correct?",
    "choices": [
      "It is deprecated; when supported, it performs a basic scrub (equivalent to rm -rf) and only works for NFS and HostPath",
      "It is the recommended policy for any new cluster, since it's faster than Delete",
      "It works with all modern CSI provisioners",
      "It deletes the PV and automatically provisions a new empty volume as a replacement"
    ]
  }
},
{
  "id": "t9-s3",
  "domain": "storage",
  "difficulty": "easy",
  "q": "Une PVC créée à partir d'une StorageClass tente une expansion (augmentation de `requests.storage`). Que faut-il que la StorageClass ait défini pour que cela fonctionne ?",
  "choices": [
    "reclaimPolicy: Retain",
    "allowVolumeExpansion: true",
    "volumeBindingMode: Immediate",
    "Rien de particulier, l'expansion est toujours possible par défaut"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : reclaimPolicy contrôle le devenir du PV à la suppression de la PVC, sans rapport avec l'expansion.",
    "Vrai : la doc précise que l'expansion n'est supportée « when the underlying StorageClass has the field allowVolumeExpansion set to true ».",
    "Faux : volumeBindingMode contrôle le moment du binding, pas l'expansion.",
    "Faux : l'expansion n'est pas activée par défaut, elle nécessite ce champ explicite."
  ],
  "explain": "L'expansion d'une PersistentVolumeClaim (édition de spec.resources.requests.storage) n'est possible que si la StorageClass sous-jacente définit explicitement allowVolumeExpansion: true.",
  "ref": "https://kubernetes.io/docs/concepts/storage/storage-classes/",
  "en": {
    "q": "A PVC created from a StorageClass attempts an expansion (increasing `requests.storage`). What must the StorageClass have set for this to work?",
    "choices": [
      "reclaimPolicy: Retain",
      "allowVolumeExpansion: true",
      "volumeBindingMode: Immediate",
      "Nothing special, expansion is always possible by default"
    ]
  }
},
{
  "id": "t9-s4",
  "domain": "storage",
  "difficulty": "hard",
  "q": "Sur un objet CSIDriver, à quoi sert le champ `podInfoOnMount`, et quelle est sa valeur par défaut ?",
  "choices": [
    "Il indique si le kubelet doit transmettre des informations sur le Pod (nom, namespace, uid) au driver CSI lors du montage, via VolumeContext ; défaut false",
    "Il active la collecte de métriques Prometheus pour le driver CSI ; défaut true",
    "Il force le driver CSI à créer un Pod miroir pour chaque volume monté ; défaut false",
    "Il définit l'utilisateur Linux (UID) utilisé pour monter le volume ; défaut root"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « podInfoOnMount indicates this CSI volume driver requires additional pod information... during mount operations, if set to true... Default is false. If true, Kubelet will pass pod information as VolumeContext ».",
    "Faux : ce champ n'a aucun rapport avec des métriques Prometheus.",
    "Faux : aucune notion de Pod miroir n'est associée à ce champ.",
    "Faux : ce champ ne définit pas d'UID Linux, il contrôle la transmission de métadonnées du Pod."
  ],
  "explain": "`podInfoOnMount` (défaut false) indique si le kubelet doit transmettre au driver CSI, via VolumeContext lors des appels NodePublishVolume, des informations sur le Pod telles que csi.storage.k8s.io/pod.name, pod.namespace et pod.uid.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/csi-driver-v1/",
  "en": {
    "q": "On a CSIDriver object, what does the `podInfoOnMount` field do, and what is its default value?",
    "choices": [
      "It indicates whether the kubelet should pass Pod information (name, namespace, uid) to the CSI driver on mount, via VolumeContext; default false",
      "It enables Prometheus metrics collection for the CSI driver; default true",
      "It forces the CSI driver to create a mirror Pod for each mounted volume; default false",
      "It sets the Linux user (UID) used to mount the volume; default root"
    ]
  }
},
{
  "id": "t9-s5",
  "domain": "storage",
  "difficulty": "easy",
  "q": "Par défaut, sur quel support un volume `emptyDir` est-il stocké, et que se passe-t-il si on définit `emptyDir.medium: \"Memory\"` ?",
  "choices": [
    "Par défaut sur le support qui héberge le nœud (disque, SSD...) ; avec Memory, Kubernetes monte un tmpfs (système de fichiers en RAM)",
    "Par défaut toujours en RAM ; Memory n'a alors aucun effet supplémentaire",
    "Par défaut sur un stockage réseau dédié ; Memory désactive complètement le volume",
    "Le champ medium n'existe pas pour les volumes emptyDir"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « By default emptyDir volumes are stored on whatever medium that backs the node... If you set the emptyDir.medium field to Memory, Kubernetes mounts a tmpfs... instead ».",
    "Faux : le support par défaut n'est pas la RAM, mais celui du nœud (disque/SSD/réseau selon l'environnement).",
    "Faux : ce n'est pas le comportement par défaut documenté, et Memory ne désactive rien.",
    "Faux : emptyDir.medium est un champ bien réel et documenté."
  ],
  "explain": "Un volume emptyDir utilise par défaut le support de stockage du nœud sous-jacent ; en définissant emptyDir.medium à \"Memory\", Kubernetes monte à la place un tmpfs (système de fichiers en RAM), ce qui accélère les accès mais consomme la mémoire du nœud.",
  "ref": "https://kubernetes.io/docs/concepts/storage/volumes/",
  "en": {
    "q": "By default, what medium is an `emptyDir` volume stored on, and what happens if you set `emptyDir.medium: \"Memory\"`?",
    "choices": [
      "By default on whatever medium backs the node (disk, SSD...); with Memory, Kubernetes mounts a tmpfs (RAM-backed filesystem) instead",
      "By default always in RAM; Memory then has no additional effect",
      "By default on dedicated network storage; Memory completely disables the volume",
      "The medium field does not exist for emptyDir volumes"
    ]
  }
},
{
  "id": "t9-s6",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Dans un volume `hostPath`, que fait la valeur `DirectoryOrCreate` du champ `type` ?",
  "choices": [
    "Elle exige qu'un répertoire existe déjà au chemin donné, sinon le Pod échoue",
    "Si rien n'existe au chemin donné, un répertoire vide est créé avec les permissions 0755, appartenant au même groupe/utilisateur que le kubelet",
    "Elle convertit automatiquement un fichier existant en répertoire",
    "Elle crée un socket UNIX au chemin donné si rien n'existe"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le comportement de la valeur `Directory` (sans OrCreate), qui exige l'existence préalable.",
    "Vrai : `DirectoryOrCreate` crée un répertoire vide avec les permissions 0755 si rien n'existe au chemin indiqué, avec le même groupe/propriétaire que le kubelet.",
    "Faux : cette valeur ne convertit pas un fichier existant, elle crée un répertoire seulement si rien n'existe.",
    "Faux : c'est le rôle de la valeur `Socket`, pas de `DirectoryOrCreate`."
  ],
  "explain": "Le champ `type` d'un volume hostPath propose plusieurs valeurs (Directory, DirectoryOrCreate, File, FileOrCreate, Socket, CharDevice, BlockDevice) ; DirectoryOrCreate crée un répertoire vide (permissions 0755, propriété kubelet) si le chemin n'existe pas encore, alors que Directory exige son existence préalable.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/",
  "en": {
    "q": "In a `hostPath` volume, what does the `DirectoryOrCreate` value of the `type` field do?",
    "choices": [
      "It requires a directory to already exist at the given path, otherwise the Pod fails",
      "If nothing exists at the given path, an empty directory is created with 0755 permissions, owned by the same group/user as the kubelet",
      "It automatically converts an existing file into a directory",
      "It creates a UNIX socket at the given path if nothing exists"
    ]
  }
},
{
  "id": "t9-t1",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Un objet reste bloqué en état `Terminating` après un `kubectl delete`. Quelle en est la cause la plus probable, d'après la documentation sur les finalizers ?",
  "choices": [
    "Le contrôleur a perdu la connexion à l'API server",
    "Un ou plusieurs finalizers présents dans metadata.finalizers empêchent la suppression tant que leurs conditions ne sont pas satisfaites",
    "Le champ deletionTimestamp n'a pas été positionné par erreur",
    "Le Pod concerné a un restartPolicy: Always"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : ce n'est pas la cause typique documentée pour un blocage en Terminating.",
    "Vrai : la doc précise que l'objet « enters a Terminating status, but the controller can't delete it because the finalizer exists » ; la suppression complète n'intervient que quand metadata.finalizers est vidé.",
    "Faux : c'est justement la présence de deletionTimestamp (positionné dès le delete) combinée aux finalizers non résolus qui cause le blocage.",
    "Faux : restartPolicy concerne le redémarrage des conteneurs, sans rapport avec le blocage de suppression d'un objet."
  ],
  "explain": "Quand un objet a des finalizers, sa suppression positionne un deletionTimestamp mais l'objet reste visible (Terminating) jusqu'à ce que chaque finalizer soit retiré du champ metadata.finalizers une fois sa condition satisfaite ; un finalizer qui ne se résout jamais bloque indéfiniment la suppression.",
  "ref": "https://kubernetes.io/docs/concepts/overview/working-with-objects/finalizers/",
  "en": {
    "q": "An object stays stuck in `Terminating` status after a `kubectl delete`. According to the finalizers documentation, what is the most likely cause?",
    "choices": [
      "The controller lost its connection to the API server",
      "One or more finalizers in metadata.finalizers are blocking deletion until their conditions are satisfied",
      "The deletionTimestamp field was mistakenly never set",
      "The Pod involved has restartPolicy: Always"
    ]
  }
},
{
  "id": "t9-t10",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "Quelle est la différence entre `kubectl apply --dry-run=client` et `kubectl apply --dry-run=server` ?",
  "choices": [
    "Elles sont strictement identiques, seul le nom du flag change",
    "client se contente d'afficher localement l'objet qui serait envoyé sans le transmettre ; server soumet la requête à l'API server sans persister la ressource",
    "client contacte le cluster tandis que server reste entièrement local",
    "server modifie réellement le cluster, contrairement à client qui ne fait rien"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : les deux stratégies ont un comportement bien distinct concernant le contact avec le serveur.",
    "Vrai : la doc précise « If client strategy, only print the object that would be sent, without sending it. If server strategy, submit server-side request without persisting the resource. »",
    "Faux : c'est l'inverse — client reste local, server contacte l'API server.",
    "Faux : ni client ni server ne persistent réellement la ressource dans le cluster, les deux sont des modes dry-run."
  ],
  "explain": "`--dry-run=client` n'envoie rien au serveur et se contente d'imprimer localement ce qui serait envoyé ; `--dry-run=server` envoie réellement la requête à l'API server (validation, admission incluses) mais sans persister le résultat, offrant une simulation plus fidèle.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/",
  "en": {
    "q": "What is the difference between `kubectl apply --dry-run=client` and `kubectl apply --dry-run=server`?",
    "choices": [
      "They are strictly identical, only the flag name differs",
      "client only prints locally the object that would be sent, without sending it; server submits the request to the API server without persisting the resource",
      "client contacts the cluster while server stays entirely local",
      "server actually modifies the cluster, unlike client which does nothing"
    ]
  }
},
{
  "id": "t9-t11",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "Concernant `kubectl delete pod mypod --grace-period=0 --force`, quelles affirmations sont exactes ? (plusieurs réponses)",
  "choices": [
    "--grace-period ne peut être positionné à 0 que si --force vaut true",
    "La suppression forcée n'attend pas de confirmation que les processus du Pod ont bien été terminés",
    "Cette combinaison garantit qu'aucun processus du conteneur ne continue de s'exécuter après la commande",
    "--grace-period=-1 (valeur par défaut) signifie qu'aucune valeur n'est ignorée par le serveur"
  ],
  "correct": [
    0,
    1
  ],
  "why": [
    "Vrai : la doc précise « Can only be set to 0 when --force is true (force deletion). »",
    "Vrai : la doc avertit « Force deleting pods does not wait for confirmation that the pod's processes have been terminated ».",
    "Faux : c'est l'inverse — le processus peut continuer à tourner jusqu'à ce que le nœud détecte la suppression et termine le nettoyage.",
    "Faux : -1 (négatif) signifie que la valeur du flag est ignorée, pas qu'elle vaut « aucune valeur ignorée »."
  ],
  "explain": "`--grace-period=0` n'est autorisé qu'en combinaison avec `--force`, et cette suppression forcée ne garantit pas que les processus du Pod soient effectivement arrêtés immédiatement — ils peuvent continuer à s'exécuter jusqu'à ce que le nœud constate la suppression et finalise le nettoyage.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/",
  "en": {
    "q": "Regarding `kubectl delete pod mypod --grace-period=0 --force`, which statements are correct? (select all that apply)",
    "choices": [
      "--grace-period can only be set to 0 when --force is true",
      "Force deletion does not wait for confirmation that the pod's processes have actually terminated",
      "This combination guarantees that no container process keeps running after the command",
      "--grace-period=-1 (the default) means the server never ignores the value"
    ]
  }
},
{
  "id": "t9-t12",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Quels opérateurs le flag `--field-selector` de `kubectl get` accepte-t-il, d'après la documentation ?",
  "choices": [
    "Uniquement =",
    "=, == et !=",
    "=, !=, <, et >",
    "Seulement des expressions regex arbitraires"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : ce n'est pas la seule syntaxe supportée.",
    "Vrai : la doc précise « supports '=', '==', and '!=' » pour ce flag.",
    "Faux : les opérateurs de comparaison < et > ne sont pas documentés pour --field-selector.",
    "Faux : --field-selector ne fonctionne pas sur la base de regex arbitraires."
  ],
  "explain": "`--field-selector` de `kubectl get` supporte les opérateurs d'égalité =, == et de différence !=, avec possibilité de combiner plusieurs conditions séparées par des virgules (ex. --field-selector key1=value1,key2=value2), mais le serveur ne supporte qu'un nombre limité de champs interrogeables selon le type de ressource.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
  "en": {
    "q": "Which operators does the `--field-selector` flag of `kubectl get` accept, according to the documentation?",
    "choices": [
      "Only =",
      "=, == and !=",
      "=, !=, <, and >",
      "Only arbitrary regex expressions"
    ]
  }
},
{
  "id": "t9-t13",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Quelle commande crée manuellement un Job de test à partir d'un CronJob existant nommé `a-cronjob`, sans attendre sa prochaine exécution planifiée ?",
  "choices": [
    "kubectl trigger cronjob/a-cronjob",
    "kubectl create job test-job --from=cronjob/a-cronjob",
    "kubectl run test-job --from=a-cronjob",
    "kubectl apply cronjob/a-cronjob --now"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : `kubectl trigger` n'est pas une commande kubectl existante.",
    "Vrai : la doc montre l'exemple exact « kubectl create job test-job --from=cronjob/a-cronjob ».",
    "Faux : `kubectl run` ne dispose pas d'un flag --from pour cloner un CronJob.",
    "Faux : `kubectl apply ... --now` n'est pas une syntaxe documentée pour déclencher un CronJob."
  ],
  "explain": "`kubectl create job <nom> --from=cronjob/<nom-cronjob>` crée immédiatement un Job basé sur le template du CronJob indiqué, ce qui permet de tester manuellement une tâche planifiée sans attendre son prochain déclenchement automatique.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_job/",
  "en": {
    "q": "Which command manually creates a test Job from an existing CronJob named `a-cronjob`, without waiting for its next scheduled run?",
    "choices": [
      "kubectl trigger cronjob/a-cronjob",
      "kubectl create job test-job --from=cronjob/a-cronjob",
      "kubectl run test-job --from=a-cronjob",
      "kubectl apply cronjob/a-cronjob --now"
    ]
  }
},
{
  "id": "t9-t14",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "Que fait la commande `kubectl scale --current-replicas=2 --replicas=3 deployment/mysql` si le Deployment `mysql` a actuellement 4 réplicas (et non 2) ?",
  "choices": [
    "Elle scale quand même le Deployment à 3 réplicas, --current-replicas n'étant qu'informatif",
    "L'opération de scale est rejetée avant d'être envoyée au serveur, car la précondition --current-replicas=2 ne correspond pas à l'état réel (4)",
    "Elle scale le Deployment à 2 réplicas d'abord, puis à 3",
    "Elle ignore --replicas et laisse le Deployment à 4 réplicas"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : --current-replicas agit bien comme une précondition bloquante, pas comme une simple information.",
    "Vrai : la doc précise que la précondition « is validated before the scale is attempted, and it is guaranteed that the precondition holds true when the scale is sent to the server » — un mismatch bloque l'opération.",
    "Faux : il n'y a pas d'étape intermédiaire à 2 réplicas, l'opération est simplement rejetée en cas de mismatch.",
    "Faux : --replicas n'est pas ignoré, c'est toute la commande qui échoue si la précondition n'est pas remplie."
  ],
  "explain": "`--current-replicas` sert de précondition de sécurité : Kubernetes vérifie que la taille actuelle du Deployment correspond à cette valeur avant d'envoyer la requête de scale au serveur ; en cas de désaccord (ici 4 au lieu de 2 attendu), l'opération est rejetée sans effet.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/",
  "en": {
    "q": "What does `kubectl scale --current-replicas=2 --replicas=3 deployment/mysql` do if the `mysql` Deployment currently has 4 replicas (not 2)?",
    "choices": [
      "It scales the Deployment to 3 replicas anyway, since --current-replicas is only informational",
      "The scale operation is rejected before being sent to the server, because the --current-replicas=2 precondition doesn't match the real state (4)",
      "It scales the Deployment to 2 replicas first, then to 3",
      "It ignores --replicas and leaves the Deployment at 4 replicas"
    ]
  }
},
{
  "id": "t9-t2",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "À quoi sert `kubectl rollout pause deployment/<nom>` d'après la documentation, et que faut-il faire ensuite pour déclencher un nouveau rollout ?",
  "choices": [
    "Il met en pause pour appliquer plusieurs correctifs au PodTemplateSpec sans déclencher de rollout à chaque changement ; il faut ensuite exécuter `kubectl rollout resume` pour démarrer le nouveau rollout",
    "Il arrête définitivement le Deployment ; il faut le recréer entièrement",
    "Il stoppe uniquement les futurs scale up/down, sans effet sur les mises à jour d'image",
    "Aucune action supplémentaire n'est nécessaire, le rollout reprend automatiquement après 5 minutes"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc décrit ce cas d'usage comme « Pause the rollout of a Deployment to apply multiple fixes to its PodTemplateSpec and then resume it to start a new rollout. »",
    "Faux : pause ne détruit pas le Deployment, il suspend seulement le déclenchement de nouveaux rollouts.",
    "Faux : la pause bloque tout nouveau rollout déclenché par une modification du template, pas seulement le scaling.",
    "Faux : il n'y a pas de reprise automatique après un délai, `kubectl rollout resume` est nécessaire."
  ],
  "explain": "Mettre en pause un Deployment permet d'accumuler plusieurs modifications du PodTemplateSpec sans déclencher un rollout à chaque changement ; `kubectl rollout resume` reprend ensuite la main pour démarrer un seul nouveau rollout consolidé.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
  "en": {
    "q": "What does `kubectl rollout pause deployment/<name>` do according to the documentation, and what must you do afterward to trigger a new rollout?",
    "choices": [
      "It pauses to apply multiple fixes to the PodTemplateSpec without triggering a rollout on each change; you must then run `kubectl rollout resume` to start the new rollout",
      "It permanently stops the Deployment; it must be fully recreated",
      "It only stops future scale up/down operations, with no effect on image updates",
      "No further action is needed, the rollout automatically resumes after 5 minutes"
    ]
  }
},
{
  "id": "t9-t3",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Quelle commande retire le taint `key1=value1:NoSchedule` du nœud `node1`, d'après la syntaxe documentée ?",
  "choices": [
    "kubectl taint nodes node1 key1=value1:NoSchedule-",
    "kubectl untaint nodes node1 key1=value1:NoSchedule",
    "kubectl taint nodes node1 --remove key1=value1:NoSchedule",
    "kubectl delete taint node1 key1=value1"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc montre l'exemple exact « kubectl taint nodes node1 key1=value1:NoSchedule- » : le tiret final indique la suppression du taint.",
    "Faux : `kubectl untaint` n'est pas une commande kubectl existante.",
    "Faux : il n'existe pas de flag --remove pour `kubectl taint`.",
    "Faux : `kubectl delete taint` n'est pas une commande valide ; les taints se gèrent uniquement via `kubectl taint`."
  ],
  "explain": "Pour retirer un taint, on réutilise `kubectl taint` avec la même clé/valeur/effet suivie d'un tiret final (-), qui indique à kubectl de retirer ce taint plutôt que de l'ajouter.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
  "en": {
    "q": "Which command removes the taint `key1=value1:NoSchedule` from node `node1`, according to the documented syntax?",
    "choices": [
      "kubectl taint nodes node1 key1=value1:NoSchedule-",
      "kubectl untaint nodes node1 key1=value1:NoSchedule",
      "kubectl taint nodes node1 --remove key1=value1:NoSchedule",
      "kubectl delete taint node1 key1=value1"
    ]
  }
},
{
  "id": "t9-t4",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait le flag `--since` de `kubectl logs` ?",
  "choices": [
    "Il affiche uniquement les N dernières lignes du log",
    "Il n'affiche que les logs plus récents qu'une durée relative donnée (ex. 5s, 2m, 3h)",
    "Il affiche les logs depuis la création du Pod jusqu'à maintenant, sans filtrage possible",
    "Il combine les logs de tous les conteneurs du Pod en un seul flux horodaté"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le rôle du flag --tail, distinct de --since.",
    "Vrai : la doc précise « Only return logs newer than a relative duration like 5s, 2m, or 3h. Defaults to all logs. »",
    "Faux : --since permet justement de filtrer, contrairement à l'absence de filtrage par défaut.",
    "Faux : combiner les logs de plusieurs conteneurs est le rôle de --all-containers ou --prefix, pas de --since."
  ],
  "explain": "`kubectl logs --since=<durée>` filtre les logs pour n'afficher que ceux plus récents que la durée relative indiquée (5s, 2m, 3h...), le comportement par défaut sans ce flag étant d'afficher tous les logs disponibles.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/",
  "en": {
    "q": "What does the `--since` flag of `kubectl logs` do?",
    "choices": [
      "It shows only the last N lines of the log",
      "It only returns logs newer than a given relative duration (e.g. 5s, 2m, 3h)",
      "It shows logs from Pod creation until now, with no filtering possible",
      "It merges the logs of all the Pod's containers into a single timestamped stream"
    ]
  }
},
{
  "id": "t9-t5",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait le flag `--containers` de `kubectl top pod` ?",
  "choices": [
    "Il liste uniquement les Pods qui ont plus d'un conteneur",
    "Il affiche l'utilisation de ressources de chaque conteneur au sein du Pod, et non seulement le total du Pod",
    "Il limite l'affichage aux conteneurs en état Running",
    "Il compte le nombre total de conteneurs sur le nœud"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : ce n'est pas un filtre sur le nombre de conteneurs par Pod.",
    "Vrai : la doc précise « If present, print usage of containers within a pod. »",
    "Faux : ce flag ne filtre pas par état de conteneur.",
    "Faux : kubectl top pod --containers reste centré sur les Pods, pas sur un décompte au niveau nœud."
  ],
  "explain": "Par défaut, `kubectl top pod` agrège l'utilisation CPU/mémoire au niveau du Pod ; le flag --containers détaille cette utilisation conteneur par conteneur au sein de chaque Pod.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_top/kubectl_top_pod/",
  "en": {
    "q": "What does the `--containers` flag of `kubectl top pod` do?",
    "choices": [
      "It only lists Pods that have more than one container",
      "It shows resource usage for each container within the Pod, not just the Pod total",
      "It limits the output to containers in the Running state",
      "It counts the total number of containers on the node"
    ]
  }
},
{
  "id": "t9-t6",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait la commande `kubectl config use-context minikube` ?",
  "choices": [
    "Elle crée un nouveau contexte nommé minikube dans le kubeconfig",
    "Elle définit le current-context du fichier kubeconfig sur minikube",
    "Elle bascule uniquement le namespace par défaut, sans changer de cluster",
    "Elle fusionne le kubeconfig de minikube avec le kubeconfig courant"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est le rôle de `kubectl config set-context`, pas de `use-context`.",
    "Vrai : la doc décrit cette commande comme « Set the current-context in a kubeconfig file ».",
    "Faux : use-context bascule tout le contexte (cluster, utilisateur, namespace associés), pas seulement le namespace.",
    "Faux : use-context ne fusionne rien, il change simplement quel contexte existant est actif."
  ],
  "explain": "`kubectl config use-context <nom>` positionne le champ current-context du kubeconfig sur le contexte indiqué, ce qui détermine quel cluster, utilisateur et namespace par défaut sont utilisés par les commandes kubectl suivantes.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_config/kubectl_config_use-context/",
  "en": {
    "q": "What does the `kubectl config use-context minikube` command do?",
    "choices": [
      "It creates a new context named minikube in the kubeconfig",
      "It sets the current-context of the kubeconfig file to minikube",
      "It only switches the default namespace, without changing cluster",
      "It merges minikube's kubeconfig with the current kubeconfig"
    ]
  }
},
{
  "id": "t9-t7",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Que fait le flag `--force` de `kubectl replace`, d'après l'exemple documenté ?",
  "choices": [
    "Il force une mise à jour en place sans jamais supprimer la ressource",
    "Il supprime puis recrée la ressource (delete puis re-create)",
    "Il ignore silencieusement les erreurs de validation du schéma",
    "Il force l'application même si le fichier YAML est syntaxiquement invalide"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est l'inverse d'une mise à jour en place — --force implique une suppression.",
    "Vrai : la doc illustre cet usage avec le commentaire « Force replace, delete and then re-create the resource ».",
    "Faux : --force ne désactive pas la validation du schéma des ressources.",
    "Faux : un YAML syntaxiquement invalide reste rejeté, --force n'a aucun effet sur ce point."
  ],
  "explain": "`kubectl replace --force` supprime immédiatement la ressource existante puis la recrée à partir du manifeste fourni, ce qui peut être utile pour forcer un remplacement bloqué par une mise à jour classique, mais au prix d'une brève interruption.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_replace/",
  "en": {
    "q": "What does the `--force` flag of `kubectl replace` do, according to the documented example?",
    "choices": [
      "It forces an in-place update without ever deleting the resource",
      "It deletes then re-creates the resource (delete then re-create)",
      "It silently ignores schema validation errors",
      "It forces the apply even if the YAML file is syntactically invalid"
    ]
  }
},
{
  "id": "t9-t8",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Pourquoi doit-on utiliser `--` avant la commande dans `kubectl exec mypod -i -t -- ls -t /usr` ?",
  "choices": [
    "Pour indiquer à bash que la commande doit s'exécuter en arrière-plan",
    "Parce que si la commande à exécuter partage des flags avec kubectl (comme -i), il faut deux tirets pour séparer les flags de kubectl de ceux de la commande",
    "C'est purement stylistique, sans effet fonctionnel",
    "Pour forcer l'exécution dans le premier conteneur du Pod uniquement"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : -- n'a aucun rapport avec l'exécution en arrière-plan.",
    "Vrai : la doc précise « If the command you want to execute in the pod has any flags in common (e.g. -i), you must use two dashes (--) to separate your command's flags/arguments ».",
    "Faux : sans --, kubectl tenterait d'interpréter les flags de la commande cible comme les siens, ce qui a un effet fonctionnel réel.",
    "Faux : le choix du conteneur se fait via -c/--container, pas via --."
  ],
  "explain": "Le séparateur -- indique à kubectl où s'arrêtent ses propres options et où commence la commande à exécuter dans le conteneur ; sans lui, des flags partagés (comme -i) seraient mal interprétés par kubectl lui-même plutôt que transmis à la commande cible.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/",
  "en": {
    "q": "Why must you use `--` before the command in `kubectl exec mypod -i -t -- ls -t /usr`?",
    "choices": [
      "To tell bash the command should run in the background",
      "Because if the command to run shares flags with kubectl (like -i), two dashes are needed to separate kubectl's flags from the command's",
      "It's purely stylistic, with no functional effect",
      "To force execution in only the Pod's first container"
    ]
  }
},
{
  "id": "t9-t9",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Que fait la commande `kubectl diff -f pod.json` ?",
  "choices": [
    "Elle compare deux fichiers YAML entre eux, sans contacter le cluster",
    "Elle compare la version actuellement en ligne (live) dans le cluster avec la configuration telle qu'elle serait après application du fichier",
    "Elle applique directement le fichier si des différences sont détectées",
    "Elle affiche l'historique des modifications passées de la ressource"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : kubectl diff compare bien le cluster réel au fichier fourni, pas deux fichiers entre eux.",
    "Vrai : la doc décrit la commande comme « Diff configurations specified by file name or stdin between the current online configuration, and the configuration as it would be if applied ».",
    "Faux : kubectl diff se contente de comparer, elle n'applique jamais automatiquement le changement.",
    "Faux : ce n'est pas un historique de versions, mais une comparaison instantanée live-vs-proposé."
  ],
  "explain": "`kubectl diff` calcule et affiche (en YAML) l'écart entre l'état actuellement déployé dans le cluster et ce que serait cet état si le fichier fourni était appliqué, sans jamais réaliser l'application elle-même ; le code de sortie vaut 0 si aucune différence, 1 si des différences existent.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_diff/",
  "en": {
    "q": "What does the `kubectl diff -f pod.json` command do?",
    "choices": [
      "It compares two YAML files against each other, without contacting the cluster",
      "It compares the currently live version in the cluster against the configuration as it would be after applying the file",
      "It directly applies the file if differences are detected",
      "It shows the past modification history of the resource"
    ]
  }
}
  ];
  DATA.forEach((o) => Q.push(Object.assign({ type: "theory" }, o)));
  window.CKA._t9 = DATA.length;
})();
