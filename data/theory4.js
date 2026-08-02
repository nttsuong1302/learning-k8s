(function () {
  const Q = window.CKA.questions;
  const DATA = [
{
"id": "t4-a1",
"domain": "architecture",
"difficulty": "easy",
"q": "Dans une topologie HA montée avec kubeadm, qu'est-ce qui caractérise la topologie « stacked etcd » (etcd empilé) par rapport à la topologie « external etcd » ?",
"choices": [
"Les membres etcd sont co-localisés sur les mêmes machines que les nœuds du control plane",
"Les membres etcd tournent obligatoirement sur des machines dédiées séparées des nœuds control plane",
"etcd est remplacé par une base SQLite locale sur chaque nœud",
"Un seul nœud control plane suffit, sans réplication d'etcd"
],
"correct": [
0
],
"why": [
"Correct : en topologie stacked, les membres etcd et les composants du control plane sont co-localisés sur les mêmes machines, ce qui demande moins d'infrastructure.",
"Faux : c'est la définition de la topologie external etcd, où control plane et etcd sont séparés sur des machines différentes.",
"Faux : etcd reste le magasin clé-valeur ; SQLite (k3s/kine) n'a rien à voir avec les topologies kubeadm.",
"Faux : une topologie HA requiert au minimum trois nœuds control plane, quelle que soit la topologie."
],
"explain": "kubeadm documente deux topologies HA. En « stacked etcd », chaque membre etcd est co-localisé avec un nœud du control plane (moins d'infrastructure). En « external etcd », etcd tourne sur des machines dédiées, séparées du control plane (plus d'infrastructure, meilleure isolation des pannes).",
"ref": "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/ha-topology/#stacked-etcd-topology",
"en": {
"q": "In a kubeadm-based HA topology, what characterizes the 'stacked etcd' topology compared with the 'external etcd' topology?",
"choices": [
"etcd members are co-located on the same machines as the control plane nodes",
"etcd members must run on dedicated machines separate from the control plane nodes",
"etcd is replaced by a local SQLite database on each node",
"A single control plane node is enough, with no etcd replication"
]
}
},
{
"id": "t4-a2",
"domain": "architecture",
"difficulty": "easy",
"q": "Lors de la restauration d'un snapshot etcd (`etcdutl snapshot restore`), quel drapeau désigne le répertoire de données que la restauration doit créer ?",
"choices": [
"--data-dir",
"--endpoints",
"--cacert",
"--snapshot-dir"
],
"correct": [
0
],
"why": [
"Correct : `--data-dir` indique le répertoire de données etcd que la restauration initialise à partir du snapshot.",
"Faux : `--endpoints` sert à joindre un etcd en fonctionnement ; la restauration est locale et n'utilise pas d'endpoint.",
"Faux : `--cacert` fournit l'autorité de certification pour une connexion cliente sécurisée, pas pour la restauration hors-ligne.",
"Faux : ce drapeau n'existe pas ; le snapshot est passé en argument et la cible est `--data-dir`."
],
"explain": "La restauration d'un snapshot etcd est une opération locale hors-ligne : elle ne touche pas au réseau et n'a pas besoin d'endpoints ni de certificats. On passe le fichier snapshot en argument et `--data-dir` désigne le nouveau répertoire de données créé à partir de ce snapshot.",
"ref": "https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#restoring-an-etcd-cluster",
"en": {
"q": "When restoring an etcd snapshot (`etcdutl snapshot restore`), which flag specifies the data directory that the restore must create?",
"choices": [
"--data-dir",
"--endpoints",
"--cacert",
"--snapshot-dir"
]
}
},
{
"id": "t4-a3",
"domain": "architecture",
"difficulty": "easy",
"q": "Dans l'autorisation Kubernetes, à quel verbe de requête (request verb) correspond une requête HTTP POST sur une ressource ?",
"choices": [
"create",
"update",
"get",
"patch"
],
"correct": [
0
],
"why": [
"Correct : l'API server mappe la méthode HTTP POST vers le verbe d'autorisation `create`.",
"Faux : `update` correspond à la méthode HTTP PUT.",
"Faux : `get` correspond à un GET/HEAD sur une ressource individuelle.",
"Faux : `patch` correspond à la méthode HTTP PATCH."
],
"explain": "L'API server traduit la méthode HTTP en verbe d'autorisation. POST devient `create`, PUT devient `update`, PATCH devient `patch`, DELETE devient `delete` (ou `deletecollection` sur une collection). Ce verbe est ensuite confronté aux règles RBAC.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#determine-the-request-verb",
"en": {
"q": "In Kubernetes authorization, which request verb does an HTTP POST on a resource map to?",
"choices": [
"create",
"update",
"get",
"patch"
]
}
},
{
"id": "t4-a4",
"domain": "architecture",
"difficulty": "medium",
"q": "Plusieurs modules d'autorisation sont configurés en séquence sur le kube-apiserver. Que se passe-t-il dès qu'un module rend un avis d'approbation OU de refus sur une requête ?",
"choices": [
"Cette décision est renvoyée immédiatement et aucun autre module n'est consulté",
"La requête continue d'être évaluée par tous les modules suivants pour confirmation",
"Seuls les avis de refus arrêtent la chaîne ; une approbation est réévaluée",
"Les avis sont additionnés et un vote majoritaire tranche"
],
"correct": [
0
],
"why": [
"Correct : si un autorizer approuve OU refuse, la décision est renvoyée immédiatement et les modules suivants ne sont pas consultés.",
"Faux : la chaîne s'arrête à la première décision ferme ; il n'y a pas de reconfirmation par les modules suivants.",
"Faux : une approbation ferme arrête aussi la chaîne, pas seulement un refus.",
"Faux : il n'y a pas de vote majoritaire ; c'est le premier avis ferme qui tranche."
],
"explain": "Les modules d'autorisation sont évalués en séquence. Dès qu'un module rend un avis ferme (approuver ou refuser), cette décision est renvoyée immédiatement sans consulter les autres. Ce n'est que si tous les modules restent « sans opinion » que la requête est refusée.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#determining-whether-a-request-is-allowed-or-denied",
"en": {
"q": "Several authorization modules are configured in sequence on the kube-apiserver. What happens as soon as one module returns an approve OR deny opinion on a request?",
"choices": [
"That decision is returned immediately and no other module is consulted",
"The request keeps being evaluated by all remaining modules for confirmation",
"Only deny opinions stop the chain; an approval is re-evaluated",
"Opinions are summed and a majority vote decides"
]
}
},
{
"id": "t4-a5",
"domain": "architecture",
"difficulty": "medium",
"q": "Un kube-apiserver a plusieurs authorizers configurés, mais aucun ne rend d'avis (« no opinion ») sur une requête donnée. Quel est le résultat ?",
"choices": [
"La requête est refusée : l'accès est refusé par défaut",
"La requête est autorisée : l'accès est permis par défaut en absence de refus explicite",
"La requête est mise en file d'attente jusqu'à ce qu'un module tranche",
"L'API server renvoie une erreur 500 car aucun module n'a répondu"
],
"correct": [
0
],
"why": [
"Correct : si tous les modules restent sans opinion, la requête est refusée — l'accès est refusé par défaut (closed by default).",
"Faux : Kubernetes n'autorise pas par défaut ; l'absence d'avis positif conduit à un refus.",
"Faux : il n'y a pas de file d'attente ; l'évaluation est synchrone et se conclut par un refus.",
"Faux : ce n'est pas une erreur serveur mais un refus d'autorisation (HTTP 403)."
],
"explain": "Le modèle d'autorisation de Kubernetes est fermé par défaut : chaque partie d'une requête API doit être explicitement autorisée par un mécanisme. Si tous les modules restent « sans opinion », la requête est refusée et l'API server répond 403 Forbidden.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#determining-whether-a-request-is-allowed-or-denied",
"en": {
"q": "A kube-apiserver has several authorizers configured, but none returns an opinion ('no opinion') on a given request. What is the outcome?",
"choices": [
"The request is denied: access is denied by default",
"The request is allowed: access is permitted by default when there is no explicit deny",
"The request is queued until a module decides",
"The API server returns a 500 error because no module responded"
]
}
},
{
"id": "t4-a6",
"domain": "architecture",
"difficulty": "medium",
"q": "Un client envoie une requête HTTP GET sur une COLLECTION de ressources (par exemple tous les Pods d'un namespace). À quel verbe d'autorisation cela correspond-il ?",
"choices": [
"list",
"get",
"watch",
"read"
],
"correct": [
0
],
"why": [
"Correct : un GET sur une collection est mappé au verbe `list`.",
"Faux : `get` s'applique à un GET sur une ressource individuelle, pas sur une collection.",
"Faux : `watch` correspond à une requête de suivi (souvent GET avec `?watch=true`), pas à un simple GET de collection.",
"Faux : `read` n'est pas un verbe d'autorisation Kubernetes ; les verbes de lecture sont get/list/watch."
],
"explain": "L'API server distingue le GET d'une ressource individuelle (`get`) du GET d'une collection (`list`), et du suivi (`watch`). C'est pourquoi une Role qui donne seulement `get` ne permet pas de lister les objets : il faut aussi `list`.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#determine-the-request-verb",
"en": {
"q": "A client sends an HTTP GET on a COLLECTION of resources (for example all Pods in a namespace). Which authorization verb does this map to?",
"choices": [
"list",
"get",
"watch",
"read"
]
}
},
{
"id": "t4-a7",
"domain": "architecture",
"difficulty": "medium",
"q": "Dans une règle RBAC, le champ `resourceNames` permet de restreindre une permission à des instances nommées. Pour quels verbes `resourceNames` ne peut-il PAS être utilisé ?",
"choices": [
"create et deletecollection",
"get et list",
"update et patch",
"delete et watch"
],
"correct": [
0
],
"why": [
"Correct : `create` et `deletecollection` ne peuvent pas être restreints par `resourceNames` ; si ces verbes sont présents, `resourceNames` doit être vide.",
"Faux : `list` et `watch` fonctionnent avec resourceNames mais renvoient un résultat filtré ; ce ne sont pas les verbes interdits.",
"Faux : `update` et `patch` peuvent parfaitement être restreints à des ressources nommées.",
"Faux : `delete` (individuel) peut être restreint par resourceNames ; c'est `deletecollection` qui ne le peut pas."
],
"explain": "On peut cibler des instances précises via `resourceNames`, mais pas pour `create` (l'objet n'existe pas encore, donc son nom n'est pas connu au moment de l'autorisation) ni pour `deletecollection`. Si l'un de ces verbes figure dans la règle, `resourceNames` doit rester vide.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-resources",
"en": {
"q": "In an RBAC rule, the `resourceNames` field restricts a permission to named instances. For which verbs can `resourceNames` NOT be used?",
"choices": [
"create and deletecollection",
"get and list",
"update and patch",
"delete and watch"
]
}
},
{
"id": "t4-a8",
"domain": "architecture",
"difficulty": "medium",
"q": "Concernant le modèle d'autorisation RBAC de Kubernetes, quelle affirmation est correcte ?",
"choices": [
"Les permissions sont purement additives : il n'existe pas de règles de refus (deny), et tout est interdit par défaut",
"On peut écrire des règles « deny » explicites qui prévalent sur les règles « allow »",
"Un Role sans RoleBinding accorde quand même ses permissions à tous les ServiceAccounts du namespace",
"RBAC autorise tout par défaut, puis on retire des permissions avec des règles deny"
],
"correct": [
0
],
"why": [
"Correct : RBAC est additif et refuse par défaut ; aucune règle « deny » n'existe, un droit n'est accordé que si au moins une Role/ClusterRole l'accorde.",
"Faux : RBAC ne permet pas d'écrire des règles de refus explicites.",
"Faux : une Role n'accorde rien tant qu'elle n'est pas liée à un sujet via un RoleBinding/ClusterRoleBinding.",
"Faux : c'est l'inverse ; RBAC refuse par défaut et n'accorde que par ajout de permissions."
],
"explain": "RBAC est purement additif et fermé par défaut : il n'existe pas de règle de refus. Un sujet ne peut effectuer une action que si au moins une Role ou ClusterRole (via un binding) la lui accorde explicitement. On ne « retire » pas des droits avec des deny.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
"en": {
"q": "Regarding Kubernetes' RBAC authorization model, which statement is correct?",
"choices": [
"Permissions are purely additive: there are no deny rules, and everything is denied by default",
"You can write explicit 'deny' rules that take precedence over 'allow' rules",
"A Role without a RoleBinding still grants its permissions to all ServiceAccounts in the namespace",
"RBAC allows everything by default, then you remove permissions with deny rules"
]
}
},
{
"id": "t4-a9",
"domain": "architecture",
"difficulty": "medium",
"q": "Le cloud-controller-manager intègre Kubernetes au fournisseur cloud sous-jacent. Parmi les contrôleurs suivants, lesquels y sont documentés ? (plusieurs réponses)",
"choices": [
"Node controller (gestion des nœuds dans le cloud)",
"Route controller (mise en place des routes réseau dans l'infrastructure cloud)",
"Service controller (gestion des load balancers du cloud pour les Services)",
"Scheduler controller (placement des Pods sur les nœuds)"
],
"correct": [
0,
1,
2
],
"why": [
"Correct : le node controller gère les nœuds tournant dans l'environnement cloud.",
"Correct : le route controller configure les routes dans l'infrastructure cloud.",
"Correct : le service controller gère les load balancers du cloud pour les Services de type LoadBalancer.",
"Faux : le placement des Pods est le rôle du kube-scheduler, pas du cloud-controller-manager ; il n'existe pas de « scheduler controller » ici."
],
"explain": "Le cloud-controller-manager regroupe les boucles de contrôle spécifiques au cloud : node controller, route controller et service controller. Le placement des Pods relève du kube-scheduler, un composant distinct du control plane.",
"ref": "https://kubernetes.io/docs/concepts/overview/components/#cloud-controller-manager",
"en": {
"q": "The cloud-controller-manager integrates Kubernetes with the underlying cloud provider. Which of the following controllers are documented as part of it? (multiple answers)",
"choices": [
"Node controller (manages nodes running in the cloud)",
"Route controller (sets up network routes in the cloud infrastructure)",
"Service controller (manages the cloud's load balancers for Services)",
"Scheduler controller (places Pods on nodes)"
]
}
},
{
"id": "t4-a10",
"domain": "architecture",
"difficulty": "hard",
"q": "À propos de la restauration d'un snapshot etcd avec `etcdutl snapshot restore`, quelles affirmations sont exactes ? (plusieurs réponses)",
"choices": [
"La restauration n'accède pas au réseau : elle opère localement sur le fichier snapshot",
"La restauration initialise un nouveau répertoire de données et réécrit certaines métadonnées (member ID et cluster ID)",
"La restauration se connecte à l'etcd en cours via --endpoints et applique le snapshot à chaud",
"Un même snapshot peut être restauré pour amorcer chaque membre du nouveau cluster (--name, --initial-cluster, --initial-advertise-peer-urls)"
],
"correct": [
0,
1,
3
],
"why": [
"Correct : la restauration est une opération locale hors-ligne, sans accès réseau ni endpoints.",
"Correct : elle crée un nouveau data-dir et réécrit des métadonnées (member ID, cluster ID) pour donner une nouvelle identité au membre.",
"Faux : la restauration ne se connecte pas à un etcd en fonctionnement ; elle ne s'applique pas « à chaud » via des endpoints.",
"Correct : on restaure le même snapshot pour chaque membre en fournissant --name, --initial-cluster et --initial-advertise-peer-urls afin d'amorcer le cluster."
],
"explain": "`etcdutl snapshot restore` est hors-ligne : il lit le fichier snapshot et crée un nouveau `--data-dir`, en réécrivant le member ID et le cluster ID pour éviter que le membre rejoigne par erreur un ancien cluster. On répète l'opération pour chaque membre avec --name, --initial-cluster et --initial-advertise-peer-urls, puis on redémarre etcd et le kube-apiserver.",
"ref": "https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#restoring-an-etcd-cluster",
"en": {
"q": "Regarding restoring an etcd snapshot with `etcdutl snapshot restore`, which statements are accurate? (multiple answers)",
"choices": [
"The restore does not access the network: it operates locally on the snapshot file",
"The restore initializes a new data directory and rewrites some metadata (member ID and cluster ID)",
"The restore connects to the running etcd via --endpoints and applies the snapshot live",
"The same snapshot can be restored to bootstrap each member of the new cluster (--name, --initial-cluster, --initial-advertise-peer-urls)"
]
}
},
{
"id": "t4-a11",
"domain": "architecture",
"difficulty": "hard",
"q": "Quel est le principal inconvénient de la topologie « stacked etcd » en HA avec kubeadm, et pourquoi recommande-t-on un nombre impair de nœuds ?",
"choices": [
"La perte d'un nœud fait disparaître à la fois une instance d'apiserver ET un membre etcd ; un nombre impair de membres est requis pour un quorum de vote optimal",
"La topologie stacked interdit tout load balancer devant les apiservers",
"etcd empilé ne supporte qu'un seul nœud control plane, sans réplication possible",
"La topologie stacked exige au moins cinq nœuds etcd dédiés"
],
"correct": [
0
],
"why": [
"Correct : comme etcd est co-localisé, perdre un nœud supprime simultanément un apiserver et un membre etcd, ce qui réduit la tolérance aux pannes ; un nombre impair de membres etcd est requis pour le quorum de vote.",
"Faux : un load balancer devant les apiservers reste nécessaire et recommandé, quelle que soit la topologie.",
"Faux : la topologie stacked prévoit au minimum trois nœuds control plane répliqués.",
"Faux : la topologie stacked ne nécessite pas de nœuds etcd dédiés séparés ; c'est justement l'external etcd qui les impose."
],
"explain": "En topologie stacked, chaque nœud héberge à la fois un composant control plane et un membre etcd : sa perte retire les deux d'un coup, d'où un risque de panne couplée. Comme etcd élit un leader par quorum, un nombre impair de membres (typiquement 3) est recommandé pour tolérer au mieux les pannes.",
"ref": "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/ha-topology/#stacked-etcd-topology",
"en": {
"q": "What is the main drawback of the 'stacked etcd' topology in kubeadm HA, and why is an odd number of nodes recommended?",
"choices": [
"Losing one node removes both an apiserver instance AND an etcd member; an odd number of members is required for optimal voting quorum",
"The stacked topology forbids any load balancer in front of the apiservers",
"Stacked etcd supports only a single control plane node, with no replication possible",
"The stacked topology requires at least five dedicated etcd nodes"
]
}
},
{
"id": "t4-a12",
"domain": "architecture",
"difficulty": "hard",
"q": "À propos des mécanismes d'autorisation de Kubernetes, quelles affirmations sont exactes ? (plusieurs réponses)",
"choices": [
"Le mode Node est un authorizer à usage spécial qui accorde des permissions aux kubelets selon les Pods qu'ils sont censés exécuter",
"Le groupe intégré system:masters accorde un accès illimité à l'API et contourne les restrictions RBAC/Webhook",
"Le mode Webhook effectue un appel HTTP synchrone qui bloque la requête jusqu'à la réponse du service distant",
"Le mode Node remplace RBAC et interdit d'activer plusieurs authorizers simultanément"
],
"correct": [
0,
1,
2
],
"why": [
"Correct : le Node authorizer est un mode spécialisé qui accorde aux kubelets les droits déduits des Pods planifiés sur leur nœud.",
"Correct : appartenir à system:masters donne un accès total à l'API et court-circuite RBAC et Webhook.",
"Correct : le mode Webhook fait un appel HTTP synchrone et bloque la requête jusqu'à la réponse du service d'autorisation distant.",
"Faux : plusieurs authorizers peuvent être configurés ensemble (par ex. Node,RBAC) et évalués en séquence ; Node ne remplace pas RBAC."
],
"explain": "Kubernetes chaîne plusieurs authorizers. Node accorde aux kubelets des droits fondés sur les Pods qu'ils exécutent, Webhook délègue la décision via un appel HTTP synchrone, et RBAC gère les rôles. Le groupe intégré system:masters, lui, contourne ces mécanismes en donnant un accès illimité à l'API.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#authorization-modules",
"en": {
"q": "Regarding Kubernetes authorization mechanisms, which statements are accurate? (multiple answers)",
"choices": [
"Node mode is a special-purpose authorizer that grants permissions to kubelets based on the Pods they are meant to run",
"The built-in system:masters group grants unrestricted API access and bypasses RBAC/Webhook restrictions",
"Webhook mode makes a synchronous HTTP callout that blocks the request until the remote service responds",
"Node mode replaces RBAC and forbids enabling several authorizers at once"
]
}
},
{
"id": "t4-w1",
"domain": "workloads",
"difficulty": "easy",
"q": "Un CronJob a concurrencyPolicy: Forbid. Le job précédent tourne encore quand arrive l'heure de la prochaine exécution planifiée. Que fait le CronJob ?",
"choices": [
"Il saute la nouvelle exécution",
"Il remplace le job en cours par un nouveau",
"Il lance le nouveau job en parallèle du précédent",
"Il met la nouvelle exécution en file et la lance dès la fin du précédent"
],
"correct": [
0
],
"why": [
"Correct : Forbid interdit les runs concurrents ; si le run précédent n'est pas terminé à l'heure prévue, la nouvelle exécution est sautée.",
"Faux : remplacer le run en cours est le comportement de Replace, pas de Forbid.",
"Faux : lancer en parallèle correspond à Allow, la valeur par défaut.",
"Faux : le CronJob ne met rien en file d'attente, l'occurrence est simplement sautée."
],
"explain": "Avec Forbid, le CronJob n'autorise pas d'exécutions concurrentes : si le run précédent n'est pas terminé à l'heure planifiée, la nouvelle occurrence est sautée. Allow (défaut) autorise la concurrence et Replace remplace le run en cours par un nouveau.",
"ref": "https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#concurrency-policy",
"en": {
"q": "A CronJob has concurrencyPolicy: Forbid. The previous job is still running when the next scheduled time arrives. What does the CronJob do?",
"choices": [
"It skips the new run",
"It replaces the running job with a new one",
"It runs the new job in parallel with the previous one",
"It queues the new run and starts it when the previous one finishes"
]
}
},
{
"id": "t4-w2",
"domain": "workloads",
"difficulty": "easy",
"q": "Quelles valeurs de restartPolicy sont autorisées dans le template de Pod d'un Job ?",
"choices": [
"Always et OnFailure",
"Never et OnFailure",
"Always uniquement",
"Never uniquement"
],
"correct": [
1
],
"why": [
"Faux : Always n'est pas autorisé dans un Job.",
"Correct : seuls Never ou OnFailure sont autorisés pour le template de Pod d'un Job.",
"Faux : Always est le défaut d'un Pod ordinaire mais interdit dans un Job.",
"Faux : OnFailure est également autorisé, pas seulement Never."
],
"explain": "Le template de Pod d'un Job n'accepte que restartPolicy: Never ou OnFailure. Avec Never, un Pod en échec est remplacé par un nouveau Pod ; avec OnFailure, le conteneur est redémarré à l'intérieur du même Pod.",
"ref": "https://kubernetes.io/docs/concepts/workloads/controllers/job/#pod-template",
"en": {
"q": "Which restartPolicy values are allowed in the Pod template of a Job?",
"choices": [
"Always and OnFailure",
"Never and OnFailure",
"Always only",
"Never only"
]
}
},
{
"id": "t4-w3",
"domain": "workloads",
"difficulty": "medium",
"q": "À quoi sert le champ .spec.startingDeadlineSeconds d'un CronJob ?",
"choices": [
"Il fixe la durée maximale d'exécution d'un job avant qu'il soit tué",
"Il fixe le délai en secondes durant lequel un job peut encore démarrer après avoir raté son heure planifiée, sinon l'occurrence est sautée",
"Il fixe le nombre de jobs réussis à conserver dans l'historique",
"Il fixe le délai avant suppression automatique d'un job terminé"
],
"correct": [
1
],
"why": [
"Faux : la durée maximale d'exécution est fixée par activeDeadlineSeconds.",
"Correct : si l'écart entre l'heure prévue et maintenant dépasse cette valeur, le contrôleur saute cette exécution.",
"Faux : le nombre de jobs réussis conservés est successfulJobsHistoryLimit.",
"Faux : la suppression automatique d'un job terminé relève de ttlSecondsAfterFinished."
],
"explain": "startingDeadlineSeconds définit une deadline (en secondes) pour démarrer un job ayant raté son heure planifiée. Si le retard dépasse cette valeur, le contrôleur saute cette occurrence ; les occurrences futures restent planifiées.",
"ref": "https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#starting-deadline",
"en": {
"q": "What is the purpose of a CronJob's .spec.startingDeadlineSeconds field?",
"choices": [
"It sets the maximum runtime of a job before it is killed",
"It sets the deadline in seconds within which a job may still start after missing its scheduled time, otherwise that run is skipped",
"It sets the number of successful jobs to keep in history",
"It sets the delay before a finished job is automatically deleted"
]
}
},
{
"id": "t4-w4",
"domain": "workloads",
"difficulty": "medium",
"q": "Dans un Job, quelle est la relation entre .spec.activeDeadlineSeconds et .spec.backoffLimit ?",
"choices": [
"activeDeadlineSeconds prime : une fois ce délai atteint, le Job est terminé même s'il restait des tentatives au titre de backoffLimit",
"backoffLimit prime toujours sur activeDeadlineSeconds",
"Les deux champs sont mutuellement exclusifs et ne peuvent coexister",
"activeDeadlineSeconds compte des tentatives et backoffLimit compte des secondes"
],
"correct": [
0
],
"why": [
"Correct : activeDeadlineSeconds prime sur backoffLimit ; à l'expiration du délai, le Job est stoppé quel que soit le nombre de tentatives restantes.",
"Faux : c'est l'inverse, activeDeadlineSeconds prend le dessus.",
"Faux : les deux champs peuvent être définis ensemble sur un même Job.",
"Faux : activeDeadlineSeconds est une durée en secondes et backoffLimit un nombre de tentatives."
],
"explain": "activeDeadlineSeconds limite la durée de vie active du Job et prime sur backoffLimit : dès que la deadline est atteinte, le Job est terminé même s'il restait des retries possibles. backoffLimit (défaut 4) limite lui le nombre de tentatives avant échec.",
"ref": "https://kubernetes.io/docs/concepts/workloads/controllers/job/#job-termination-and-cleanup",
"en": {
"q": "In a Job, what is the relationship between .spec.activeDeadlineSeconds and .spec.backoffLimit?",
"choices": [
"activeDeadlineSeconds takes precedence: once the deadline is reached the Job is terminated even if backoffLimit retries remain",
"backoffLimit always takes precedence over activeDeadlineSeconds",
"The two fields are mutually exclusive and cannot both be set",
"activeDeadlineSeconds counts retries while backoffLimit counts seconds"
]
}
},
{
"id": "t4-w5",
"domain": "workloads",
"difficulty": "medium",
"q": "À quelles conditions un Pod reçoit-il la classe de QoS Burstable ?",
"choices": [
"Tous les conteneurs ont requests = limits pour le CPU et la mémoire",
"Le Pod ne remplit pas les critères de Guaranteed, mais au moins un conteneur définit une request ou une limit de CPU ou de mémoire",
"Aucun conteneur du Pod n'a de request ni de limit",
"Le Pod référence une PriorityClass avec une value élevée"
],
"correct": [
1
],
"why": [
"Faux : requests = limits sur CPU et mémoire pour tous les conteneurs donne la classe Guaranteed.",
"Correct : Burstable s'applique quand le Pod n'est pas Guaranteed mais qu'au moins un conteneur a une request ou une limit de CPU ou de mémoire.",
"Faux : aucune request ni limit sur aucun conteneur donne la classe BestEffort.",
"Faux : la classe de QoS dépend des requests/limits, pas de la priorité du Pod."
],
"explain": "Burstable s'applique quand le Pod ne satisfait pas les critères de Guaranteed (requests = limits sur CPU et mémoire pour tous les conteneurs) mais qu'au moins un conteneur définit une request ou une limit de CPU ou de mémoire. Sans aucune request ni limit, le Pod est BestEffort.",
"ref": "https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/#create-a-pod-that-gets-assigned-a-qos-class-of-burstable",
"en": {
"q": "Under what conditions is a Pod assigned the Burstable QoS class?",
"choices": [
"Every container has requests = limits for both CPU and memory",
"The Pod does not meet the Guaranteed criteria, but at least one container has a CPU or memory request or limit",
"No container in the Pod has any request or limit",
"The Pod references a PriorityClass with a high value"
]
}
},
{
"id": "t4-w6",
"domain": "workloads",
"difficulty": "medium",
"q": "Un nœud reçoit un taint d'effet NoExecute. Un Pod déjà en cours d'exécution tolère ce taint mais ne précise pas tolerationSeconds. Que se passe-t-il ?",
"choices": [
"Le Pod est expulsé immédiatement",
"Le Pod reste lié au nœud indéfiniment",
"Le Pod reste 300 secondes par défaut puis est expulsé",
"Le Pod est expulsé après un délai de grâce par défaut de 3600 secondes"
],
"correct": [
1
],
"why": [
"Faux : l'expulsion immédiate concerne les Pods qui ne tolèrent pas le taint.",
"Correct : un Pod qui tolère un taint NoExecute sans tolerationSeconds reste lié au nœud indéfiniment.",
"Faux : il n'y a pas de valeur par défaut de 300 s ici ; sans tolerationSeconds le Pod reste indéfiniment.",
"Faux : 3600 est seulement l'exemple donné par la doc, pas une valeur par défaut."
],
"explain": "Avec un taint NoExecute : un Pod qui ne tolère pas est expulsé immédiatement ; un Pod qui tolère sans tolerationSeconds reste lié indéfiniment ; avec tolerationSeconds: N, il reste N secondes puis est expulsé.",
"ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#concepts",
"en": {
"q": "A node gets a NoExecute taint. A Pod that is already running tolerates the taint but does not specify tolerationSeconds. What happens?",
"choices": [
"The Pod is evicted immediately",
"The Pod stays bound to the node forever",
"The Pod stays for a default 300 seconds and is then evicted",
"The Pod is evicted after a default 3600-second grace period"
]
}
},
{
"id": "t4-w7",
"domain": "workloads",
"difficulty": "hard",
"q": "Concernant les topologySpreadConstraints, quelles affirmations sont exactes ?",
"choices": [
"maxSkew est obligatoire et doit être strictement supérieur à zéro",
"whenUnsatisfiable: DoNotSchedule empêche le scheduling du Pod si la contrainte ne peut être satisfaite",
"minDomains ne peut être utilisé qu'avec whenUnsatisfiable: ScheduleAnyway",
"whenUnsatisfiable: ScheduleAnyway planifie quand même le Pod en priorisant les nœuds qui minimisent le skew"
],
"correct": [
0,
1,
3
],
"why": [
"Correct : maxSkew doit être spécifié et sa valeur doit être supérieure à zéro.",
"Correct : DoNotSchedule (défaut) demande au scheduler de ne pas planifier le Pod si la contrainte n'est pas respectée.",
"Faux : minDomains ne peut être combiné qu'avec whenUnsatisfiable: DoNotSchedule.",
"Correct : ScheduleAnyway planifie tout de même le Pod en priorisant les nœuds qui réduisent le skew."
],
"explain": "maxSkew (obligatoire, supérieur à zéro) décrit le déséquilibre autorisé entre domaines. whenUnsatisfiable vaut DoNotSchedule (défaut : ne pas planifier) ou ScheduleAnyway (planifier en priorisant la réduction du skew). minDomains ne se combine qu'avec DoNotSchedule.",
"ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/#spread-constraint-definition",
"en": {
"q": "Regarding topologySpreadConstraints, which statements are correct?",
"choices": [
"maxSkew is required and must be strictly greater than zero",
"whenUnsatisfiable: DoNotSchedule prevents the Pod from being scheduled if the constraint cannot be satisfied",
"minDomains can only be used with whenUnsatisfiable: ScheduleAnyway",
"whenUnsatisfiable: ScheduleAnyway still schedules the Pod while prioritizing nodes that minimize skew"
]
}
},
{
"id": "t4-w8",
"domain": "workloads",
"difficulty": "hard",
"q": "Une PriorityClass a preemptionPolicy: Never. Comment se comportent les Pods qui l'utilisent ?",
"choices": [
"Ils sont placés dans la file d'ordonnancement devant les Pods de priorité inférieure, mais ne peuvent préempter aucun Pod",
"Ils préemptent immédiatement tous les Pods de priorité inférieure sur le nœud choisi",
"Ils ne peuvent jamais eux-mêmes être préemptés par d'autres Pods",
"Ils sont ignorés par le scheduler jusqu'à ce qu'un administrateur libère des ressources"
],
"correct": [
0
],
"why": [
"Correct : ces Pods passent devant les Pods de priorité inférieure dans la file, mais ne préemptent personne et attendent que des ressources se libèrent.",
"Faux : la préemption des Pods inférieurs est le comportement par défaut PreemptLowerPriority, pas Never.",
"Faux : un Pod non-préempteur peut lui-même être préempté par des Pods de priorité supérieure.",
"Faux : le scheduler les traite normalement ; ils attendent simplement des ressources libres."
],
"explain": "Avec preemptionPolicy: Never, le Pod est placé dans la file d'ordonnancement devant les Pods de plus basse priorité mais ne préempte aucun Pod : il attend que des ressources se libèrent. Le défaut PreemptLowerPriority autorise la préemption. Un Pod non-préempteur peut malgré tout être préempté par des Pods de priorité supérieure.",
"ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#non-preempting-priority-class",
"en": {
"q": "A PriorityClass has preemptionPolicy: Never. How do Pods using it behave?",
"choices": [
"They are placed in the scheduling queue ahead of lower-priority Pods, but cannot preempt any Pod",
"They immediately preempt all lower-priority Pods on the chosen node",
"They can never themselves be preempted by other Pods",
"They are ignored by the scheduler until an administrator frees resources"
]
}
},
{
"id": "t4-n1",
"domain": "networking",
"difficulty": "easy",
"q": "Un Pod du namespace default a l'adresse IPv4 172.17.0.3 et le cluster-domain est cluster.local. Quel enregistrement DNS A peut être créé pour ce Pod ?",
"choices": [
"172-17-0-3.default.pod.cluster.local",
"172.17.0.3.default.pod.cluster.local",
"172-17-0-3.default.svc.cluster.local",
"pod-172-17-0-3.default.cluster.local"
],
"correct": [
0
],
"why": [
"Correct : l'adresse IP du Pod est convertie en remplaçant les points par des tirets, suivie de namespace.pod.cluster-domain.",
"Faux : les points de l'adresse IP sont remplacés par des tirets dans le nom d'hôte.",
"Faux : les Pods utilisent le suffixe .pod. ; .svc. est réservé aux Services.",
"Faux : le format ne préfixe pas par pod- ; c'est l'IP en tirets qui sert de nom d'hôte."
],
"explain": "Un Pod peut obtenir un enregistrement A/AAAA de la forme adresse-ip-en-tirets.namespace.pod.cluster-domain. Ainsi 172.17.0.3 dans le namespace default donne 172-17-0-3.default.pod.cluster.local.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#a-aaaa-records-1",
"en": {
"q": "A Pod in the default namespace has IPv4 address 172.17.0.3 and the cluster-domain is cluster.local. Which DNS A record can be created for this Pod?",
"choices": [
"172-17-0-3.default.pod.cluster.local",
"172.17.0.3.default.pod.cluster.local",
"172-17-0-3.default.svc.cluster.local",
"pod-172-17-0-3.default.cluster.local"
]
}
},
{
"id": "t4-n2",
"domain": "networking",
"difficulty": "easy",
"q": "Quelle est la valeur par défaut du champ internalTrafficPolicy d'un Service, et que signifie-t-elle ?",
"choices": [
"Cluster : le trafic interne peut être routé vers les endpoints situés sur n'importe quel nœud",
"Local : le trafic interne n'est routé que vers les endpoints du nœud local",
"Cluster : le trafic est réparti aléatoirement mais uniquement vers des nœuds sains",
"Le champ est obligatoire et n'a pas de valeur par défaut"
],
"correct": [
0
],
"why": [
"Correct : la valeur par défaut est Cluster, qui considère tous les endpoints du cluster, tous nœuds confondus.",
"Faux : Local existe mais n'est pas le défaut ; il restreint aux endpoints du même nœud que le client.",
"Faux : Cluster est bien le défaut, mais il considère tous les endpoints sans notion de tirage aléatoire limité aux nœuds sains.",
"Faux : le champ est optionnel et vaut Cluster par défaut."
],
"explain": "internalTrafficPolicy contrôle le routage du trafic interne au cluster. Par défaut (Cluster), kube-proxy considère tous les endpoints ; avec Local, seuls les endpoints locaux au nœud du client sont utilisés.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/service-traffic-policy/#using-service-internal-traffic-policy",
"en": {
"q": "What is the default value of a Service's internalTrafficPolicy field, and what does it mean?",
"choices": [
"Cluster: internal traffic can be routed to endpoints on any node",
"Local: internal traffic is only routed to node-local endpoints",
"Cluster: traffic is distributed randomly but only to healthy nodes",
"The field is mandatory and has no default value"
]
}
},
{
"id": "t4-n3",
"domain": "networking",
"difficulty": "medium",
"q": "Par défaut, un Pod doit être Ready pour qu'un enregistrement DNS soit publié pour lui. Quel réglage d'un Service permet de publier aussi les Pods non prêts ?",
"choices": [
"publishNotReadyAddresses: true sur le Service",
"Supprimer la readinessProbe du Pod",
"internalTrafficPolicy: Local sur le Service",
"sessionAffinity: None sur le Service"
],
"correct": [
0
],
"why": [
"Correct : publishNotReadyAddresses=true fait publier les adresses des Pods même non prêts.",
"Faux : retirer la readiness probe n'est pas le mécanisme documenté et modifie le comportement du Pod, pas la publication DNS.",
"Faux : internalTrafficPolicy concerne le routage par nœud, pas la publication des Pods non prêts.",
"Faux : sessionAffinity gère l'affinité de session, pas la publication d'adresses non prêtes."
],
"explain": "Par défaut, seuls les Pods Ready obtiennent un enregistrement DNS. En positionnant publishNotReadyAddresses=true sur le Service, les adresses des Pods non prêts sont aussi publiées, ce qui est notamment utile pour les Services headless.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#a-aaaa-records-1",
"en": {
"q": "By default, a Pod must be Ready for a DNS record to be published for it. Which Service setting also publishes not-ready Pods?",
"choices": [
"publishNotReadyAddresses: true on the Service",
"Removing the Pod's readinessProbe",
"internalTrafficPolicy: Local on the Service",
"sessionAffinity: None on the Service"
]
}
},
{
"id": "t4-n4",
"domain": "networking",
"difficulty": "medium",
"q": "Pour un Service de type LoadBalancer, que fait le champ allocateLoadBalancerNodePorts et quelle est sa valeur par défaut ?",
"choices": [
"Il contrôle l'allocation automatique de node ports ; par défaut true (des node ports sont alloués)",
"Il contrôle l'allocation automatique de node ports ; par défaut false",
"Il réserve une plage d'IP externes pour le load balancer ; par défaut true",
"Il active le partage des node ports entre plusieurs Services ; par défaut false"
],
"correct": [
0
],
"why": [
"Correct : allocateLoadBalancerNodePorts vaut true par défaut ; le passer à false empêche l'allocation de node ports pour le Service LoadBalancer.",
"Faux : la valeur par défaut est true, pas false.",
"Faux : ce champ concerne les node ports, pas la réservation d'IP externes.",
"Faux : il ne s'agit pas d'un partage de node ports entre Services."
],
"explain": "allocateLoadBalancerNodePorts (true par défaut) détermine si Kubernetes alloue automatiquement des node ports aux Services de type LoadBalancer. Le mettre à false évite cette allocation quand l'implémentation du load balancer n'en a pas besoin.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/service/#load-balancer-nodeport-allocation",
"en": {
"q": "For a LoadBalancer type Service, what does the allocateLoadBalancerNodePorts field do and what is its default value?",
"choices": [
"It controls automatic node port allocation; default true (node ports are allocated)",
"It controls automatic node port allocation; default false",
"It reserves a range of external IPs for the load balancer; default true",
"It enables sharing node ports across several Services; default false"
]
}
},
{
"id": "t4-n5",
"domain": "networking",
"difficulty": "medium",
"q": "Par défaut, combien d'endpoints un objet EndpointSlice contient-il au maximum, au-delà duquel de nouveaux slices sont créés ?",
"choices": [
"100",
"1000",
"10",
"256"
],
"correct": [
0
],
"why": [
"Correct : par défaut un EndpointSlice contient au plus 100 endpoints ; au-delà, plusieurs slices sont créés.",
"Faux : la limite par défaut est 100, pas 1000.",
"Faux : trop bas ; la valeur par défaut est 100.",
"Faux : la limite par défaut est 100, pas 256."
],
"explain": "Pour rester efficaces, les EndpointSlices sont plafonnés à 100 endpoints par défaut. Un Service comptant plus de 100 endpoints voit ceux-ci répartis sur plusieurs objets EndpointSlice.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/service/#endpointslices",
"en": {
"q": "By default, what is the maximum number of endpoints an EndpointSlice object holds before new slices are created?",
"choices": [
"100",
"1000",
"10",
"256"
]
}
},
{
"id": "t4-n6",
"domain": "networking",
"difficulty": "medium",
"q": "Que permet le champ spec.trafficDistribution: PreferClose sur un Service ?",
"choices": [
"Exprimer une préférence pour router le trafic vers des endpoints topologiquement proches (par exemple dans la même zone)",
"Forcer le drop du trafic s'il n'existe pas d'endpoint local au nœud",
"Garantir strictement qu'aucun trafic ne quitte jamais la zone du client",
"Répartir le trafic de façon strictement égale entre toutes les zones"
],
"correct": [
0
],
"why": [
"Correct : PreferClose exprime une préférence pour les endpoints proches (généralement même zone), quand le mécanisme le supporte.",
"Faux : ce comportement de drop correspond à internalTrafficPolicy/externalTrafficPolicy Local, pas à trafficDistribution.",
"Faux : c'est une préférence, pas une garantie stricte d'enfermement en zone.",
"Faux : il ne s'agit pas d'une répartition strictement égale mais d'une préférence de proximité."
],
"explain": "spec.trafficDistribution avec la valeur PreferClose indique à l'implémentation de privilégier les endpoints proches du client (par exemple dans la même zone) lorsque c'est possible. C'est une préférence, pas une contrainte stricte.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/service/#traffic-distribution",
"en": {
"q": "What does the spec.trafficDistribution: PreferClose field enable on a Service?",
"choices": [
"Expressing a preference for routing traffic to topologically close endpoints (for example, in the same zone)",
"Forcing traffic to be dropped when no node-local endpoint exists",
"Strictly guaranteeing that traffic never leaves the client's zone",
"Distributing traffic strictly evenly across all zones"
]
}
},
{
"id": "t4-n7",
"domain": "networking",
"difficulty": "medium",
"q": "Concernant les pathType d'un Ingress, quelles affirmations sont exactes ?",
"choices": [
"Exact fait correspondre le chemin d'URL exactement et de façon sensible à la casse",
"Avec ImplementationSpecific, la correspondance dépend de l'IngressClass (du contrôleur)",
"Exact ignore la casse du chemin d'URL",
"ImplementationSpecific se comporte toujours exactement comme Prefix"
],
"correct": [
0,
1
],
"why": [
"Correct : Exact fait une correspondance exacte du chemin, sensible à la casse.",
"Correct : avec ImplementationSpecific, l'interprétation de la correspondance est laissée à l'IngressClass, donc au contrôleur.",
"Faux : Exact est sensible à la casse.",
"Faux : ImplementationSpecific dépend du contrôleur et n'est pas défini comme identique à Prefix."
],
"explain": "Exact fait correspondre le chemin exactement et avec sensibilité à la casse. ImplementationSpecific laisse la logique de correspondance à l'IngressClass, donc au contrôleur d'Ingress utilisé.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types",
"en": {
"q": "Regarding Ingress pathType values, which statements are correct?",
"choices": [
"Exact matches the URL path exactly and with case sensitivity",
"With ImplementationSpecific, matching is up to the IngressClass (the controller)",
"Exact ignores the case of the URL path",
"ImplementationSpecific always behaves exactly like Prefix"
]
}
},
{
"id": "t4-n8",
"domain": "networking",
"difficulty": "hard",
"q": "Un Service normal my-svc du namespace my-namespace expose un port nommé http en TCP (cluster-domain cluster.local). Quel est le format de l'enregistrement SRV créé pour ce port ?",
"choices": [
"_http._tcp.my-svc.my-namespace.svc.cluster.local",
"_tcp._http.my-svc.my-namespace.svc.cluster.local",
"http.tcp.my-svc.my-namespace.svc.cluster.local",
"_http._tcp.my-svc.my-namespace.pod.cluster.local"
],
"correct": [
0
],
"why": [
"Correct : le format SRV est _nom-du-port._protocole.my-svc.my-namespace.svc.cluster-domain.",
"Faux : l'ordre est nom-du-port puis protocole, pas l'inverse.",
"Faux : les libellés du port et du protocole sont préfixés par un underscore.",
"Faux : un Service utilise le suffixe .svc. et non .pod."
],
"explain": "Des enregistrements SRV sont créés pour les ports nommés des Services (normaux ou headless), au format _nom-du-port._protocole.my-svc.my-namespace.svc.cluster-domain. Ici cela donne _http._tcp.my-svc.my-namespace.svc.cluster.local.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#srv-records",
"en": {
"q": "A normal Service my-svc in namespace my-namespace exposes a named port http over TCP (cluster-domain cluster.local). What is the format of the SRV record created for this port?",
"choices": [
"_http._tcp.my-svc.my-namespace.svc.cluster.local",
"_tcp._http.my-svc.my-namespace.svc.cluster.local",
"http.tcp.my-svc.my-namespace.svc.cluster.local",
"_http._tcp.my-svc.my-namespace.pod.cluster.local"
]
}
},
{
"id": "t4-n9",
"domain": "networking",
"difficulty": "hard",
"q": "Un Ingress définit une règle avec l'hôte *.foo.com. Pour quel(s) en-tête(s) Host la règle correspond-elle ?",
"choices": [
"bar.foo.com",
"baz.bar.foo.com",
"foo.com",
"www.foo.com"
],
"correct": [
0,
3
],
"why": [
"Correct : *.foo.com correspond à une étiquette DNS unique, donc bar.foo.com correspond.",
"Faux : baz.bar.foo.com comporte deux étiquettes sous foo.com ; le wildcard n'en couvre qu'une.",
"Faux : *.foo.com ne correspond pas à foo.com lui-même (aucune étiquette).",
"Correct : www.foo.com est une étiquette unique sous foo.com, donc correspond."
],
"explain": "Un hôte wildcard *.foo.com correspond à exactement une étiquette DNS. Il matche bar.foo.com ou www.foo.com, mais pas foo.com (aucune étiquette) ni baz.bar.foo.com (deux étiquettes).",
"ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/#hostname-wildcards",
"en": {
"q": "An Ingress defines a rule with host *.foo.com. Which Host header(s) does the rule match?",
"choices": [
"bar.foo.com",
"baz.bar.foo.com",
"foo.com",
"www.foo.com"
]
}
},
{
"id": "t4-n10",
"domain": "networking",
"difficulty": "hard",
"q": "Dans l'API Gateway, comment une HTTPRoute est-elle rattachée à l'infrastructure de trafic, et comment un Gateway référence-t-il sa classe ?",
"choices": [
"La HTTPRoute se rattache à un Gateway via parentRefs, et le Gateway référence sa GatewayClass via gatewayClassName",
"La HTTPRoute référence directement une GatewayClass via parentRefs, sans Gateway",
"Le Gateway se rattache à la HTTPRoute via parentRefs, et la HTTPRoute porte gatewayClassName",
"La HTTPRoute et le Gateway sont fusionnés en un unique objet Ingress"
],
"correct": [
0
],
"why": [
"Correct : parentRefs de la HTTPRoute pointe vers un Gateway, et gatewayClassName du Gateway désigne la GatewayClass.",
"Faux : parentRefs pointe vers un Gateway, pas directement vers une GatewayClass.",
"Faux : c'est la HTTPRoute (via parentRefs) qui s'attache au Gateway ; gatewayClassName est porté par le Gateway.",
"Faux : l'API Gateway sépare GatewayClass, Gateway et HTTPRoute ; ce ne sont pas des objets Ingress fusionnés."
],
"explain": "Le modèle de l'API Gateway distingue trois ressources : la GatewayClass (décrit le contrôleur), le Gateway (instance d'infrastructure, qui la référence via gatewayClassName) et les Routes comme HTTPRoute, qui s'attachent au Gateway via parentRefs.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/gateway/#api-kinds",
"en": {
"q": "In the Gateway API, how is an HTTPRoute attached to the traffic-handling infrastructure, and how does a Gateway reference its class?",
"choices": [
"The HTTPRoute attaches to a Gateway via parentRefs, and the Gateway references its GatewayClass via gatewayClassName",
"The HTTPRoute references a GatewayClass directly via parentRefs, without a Gateway",
"The Gateway attaches to the HTTPRoute via parentRefs, and the HTTPRoute carries gatewayClassName",
"The HTTPRoute and the Gateway are merged into a single Ingress object"
]
}
},
{
"id": "t4-s1",
"domain": "storage",
"difficulty": "easy",
"q": "Un volume `projected` regroupe plusieurs sources de volume existantes dans un même répertoire. Parmi ces propositions, laquelle est une source valide pour un volume `projected` ?",
"choices": [
"secret, configMap, downwardAPI et serviceAccountToken",
"persistentVolumeClaim et hostPath",
"emptyDir et nfs",
"storageClass et volumeSnapshot"
],
"correct": [
0
],
"why": [
"Correct : un volume projected regroupe des sources comme secret, configMap, downwardAPI et serviceAccountToken (ainsi que clusterTrustBundle) dans un même répertoire.",
"Faux : persistentVolumeClaim et hostPath ne sont pas des sources projetables.",
"Faux : emptyDir et nfs sont des types de volumes, pas des sources d'un projected.",
"Faux : storageClass et volumeSnapshot ne sont pas des sources d'un volume projeté."
],
"explain": "Un volume projected mappe plusieurs sources existantes dans le même répertoire. Les sources acceptées sont secret, downwardAPI, configMap, serviceAccountToken et clusterTrustBundle. Toutes doivent se trouver dans le même namespace que le Pod.",
"ref": "https://kubernetes.io/docs/concepts/storage/projected-volumes/",
"en": {
"q": "A `projected` volume maps several existing volume sources into the same directory. Which of the following is a valid source for a `projected` volume?",
"choices": [
"secret, configMap, downwardAPI and serviceAccountToken",
"persistentVolumeClaim and hostPath",
"emptyDir and nfs",
"storageClass and volumeSnapshot"
]
}
},
{
"id": "t4-s2",
"domain": "storage",
"difficulty": "medium",
"q": "Avec la politique de récupération `Retain`, après suppression du PVC le PV passe en `Released`. Que doit faire l'administrateur pour réutiliser le même actif de stockage ?",
"choices": [
"Le PV redevient automatiquement `Available` dès la suppression du PVC, car les données sont effacées.",
"Supprimer le PV, nettoyer manuellement les données de l'actif de stockage, puis recréer un PV pointant vers le même actif.",
"La politique `Retain` n'existe pas ; seule `Delete` est disponible pour les PV statiques.",
"Kubernetes déplace automatiquement les données vers un nouvel actif et lie un nouveau PVC."
],
"correct": [
1
],
"why": [
"Faux : après suppression du PVC, le PV est released mais pas disponible pour une autre réclamation, car les données du précédent demandeur restent présentes.",
"Correct : la récupération est manuelle — supprimer le PV, nettoyer puis supprimer l'actif de stockage, et recréer un PV avec la même définition si l'on veut réutiliser l'actif.",
"Faux : Retain est bien une politique de récupération documentée.",
"Faux : Kubernetes n'effectue aucun déplacement automatique de données."
],
"explain": "Avec Retain, la suppression du PVC laisse le PV en état released, mais il n'est pas réutilisable tel quel car les données du précédent demandeur subsistent. La récupération est manuelle : supprimer le PV, nettoyer et supprimer l'actif de stockage, puis recréer un PV avec la même définition pour réutiliser l'actif.",
"ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#retain",
"en": {
"q": "With the `Retain` reclaim policy, after the PVC is deleted the PV becomes `Released`. What must the administrator do to reuse the same storage asset?",
"choices": [
"The PV automatically becomes `Available` again as soon as the PVC is deleted, because the data is wiped.",
"Delete the PV, manually clean up the data on the storage asset, then recreate a PV pointing to the same asset.",
"The `Retain` policy does not exist; only `Delete` is available for static PVs.",
"Kubernetes automatically moves the data to a new asset and binds a new PVC."
]
}
},
{
"id": "t4-s3",
"domain": "storage",
"difficulty": "medium",
"q": "Dans une `StorageClass`, on définit des `mountOptions` pour les PV provisionnés. Que se passe-t-il si une option de montage est invalide ou non supportée par le plugin de volume ?",
"choices": [
"Les options invalides sont silencieusement ignorées et le volume se monte normalement.",
"Si le plugin ne supporte pas les mountOptions, le provisionnement échoue ; si une option est invalide, le montage du PV échoue.",
"Kubernetes valide les mountOptions à la création de la StorageClass et refuse l'objet.",
"Les mountOptions ne s'appliquent qu'aux volumes emptyDir."
],
"correct": [
1
],
"why": [
"Faux : les options ne sont pas ignorées silencieusement.",
"Correct : le provisionnement échoue si le plugin ne supporte pas les mountOptions, et le montage du PV échoue si une option est invalide, car les mountOptions ne sont pas validées à l'avance.",
"Faux : les mountOptions ne sont validées ni sur la classe ni sur le PV.",
"Faux : les mountOptions concernent les PV provisionnés, pas emptyDir."
],
"explain": "Les mountOptions d'une StorageClass ne sont validées ni sur la classe ni sur le PV. Si le plugin de volume ne supporte pas les options de montage indiquées, le provisionnement échoue ; si une option est invalide, c'est le montage du PV qui échoue.",
"ref": "https://kubernetes.io/docs/concepts/storage/storage-classes/#mount-options",
"en": {
"q": "In a `StorageClass` you define `mountOptions` for the provisioned PVs. What happens if a mount option is invalid or unsupported by the volume plugin?",
"choices": [
"Invalid options are silently ignored and the volume mounts normally.",
"If the plugin does not support mountOptions, provisioning fails; if an option is invalid, the PV mount fails.",
"Kubernetes validates mountOptions when the StorageClass is created and rejects the object.",
"mountOptions only apply to emptyDir volumes."
]
}
},
{
"id": "t4-s4",
"domain": "storage",
"difficulty": "medium",
"q": "Concernant les VolumeSnapshot dans Kubernetes, quelle affirmation est correcte ?",
"choices": [
"Un VolumeSnapshot est une requête de snapshot d'un volume par l'utilisateur, analogue à un PersistentVolumeClaim.",
"Un VolumeSnapshot stocke directement les données du snapshot dans l'objet API.",
"Le VolumeSnapshotClass sert à définir des quotas de stockage par namespace.",
"Un snapshot ne peut être créé qu'à partir d'un emptyDir."
],
"correct": [
0
],
"why": [
"Correct : un VolumeSnapshot est la requête d'un snapshot de volume par un utilisateur, similaire à un PVC ; le VolumeSnapshotContent représente le snapshot réel côté stockage.",
"Faux : les données réelles se trouvent sur le système de stockage (VolumeSnapshotContent), pas dans l'objet VolumeSnapshot.",
"Faux : le VolumeSnapshotClass décrit des attributs propres au snapshot, pas des quotas.",
"Faux : un snapshot se prend à partir d'un PVC / volume persistant, pas d'un emptyDir."
],
"explain": "Un VolumeSnapshot est la requête d'un utilisateur pour un snapshot de volume, comparable à un PVC (le PVC demande du stockage, le VolumeSnapshot demande un snapshot). Le VolumeSnapshotClass permet de préciser des attributs propres au snapshot qui ne peuvent pas être exprimés via la StorageClass du PVC.",
"ref": "https://kubernetes.io/docs/concepts/storage/volume-snapshots/",
"en": {
"q": "Regarding VolumeSnapshots in Kubernetes, which statement is correct?",
"choices": [
"A VolumeSnapshot is a user's request for a snapshot of a volume, analogous to a PersistentVolumeClaim.",
"A VolumeSnapshot stores the snapshot data directly inside the API object.",
"The VolumeSnapshotClass is used to define per-namespace storage quotas.",
"A snapshot can only be created from an emptyDir."
]
}
},
{
"id": "t4-s5",
"domain": "storage",
"difficulty": "hard",
"q": "En quoi un « generic ephemeral volume » se distingue-t-il d'un volume `emptyDir` ?",
"choices": [
"Il ne peut utiliser que du stockage local, exactement comme emptyDir.",
"Le stockage peut être local ou attaché en réseau, avec une taille fixe que le Pod ne peut pas dépasser ; un PVC est créé et supprimé automatiquement avec le Pod.",
"Il persiste après la suppression du Pod, contrairement à emptyDir.",
"Il ne supporte ni snapshot ni redimensionnement, à l'inverse d'emptyDir."
],
"correct": [
1
],
"why": [
"Faux : contrairement à emptyDir, le stockage peut aussi être attaché en réseau.",
"Correct : le stockage peut être local ou réseau, avec une taille fixe non dépassable ; le contrôleur crée un PVC dans le namespace du Pod (dont le Pod est propriétaire) et le supprime à la suppression du Pod.",
"Faux : le volume est créé et supprimé avec le Pod, il ne persiste pas.",
"Faux : selon le driver, snapshot, clonage et redimensionnement sont possibles."
],
"explain": "Un generic ephemeral volume ressemble à emptyDir (répertoire scratch par Pod) mais offre en plus un stockage local ou réseau, une taille fixe que le Pod ne peut pas dépasser, d'éventuelles données initiales et des opérations comme snapshot, clonage et redimensionnement selon le driver. Le contrôleur crée automatiquement un PVC dans le namespace du Pod, dont le Pod est propriétaire, et qui est supprimé avec le Pod.",
"ref": "https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/#generic-ephemeral-volumes",
"en": {
"q": "How does a generic ephemeral volume differ from an `emptyDir` volume?",
"choices": [
"It can only use local storage, exactly like emptyDir.",
"Storage can be local or network-attached with a fixed size the Pod cannot exceed; a PVC is automatically created and deleted along with the Pod.",
"It persists after the Pod is deleted, unlike emptyDir.",
"It supports neither snapshots nor resizing, unlike emptyDir."
]
}
},
{
"id": "t4-s6",
"domain": "storage",
"difficulty": "hard",
"q": "À propos du champ `provisioner` d'une StorageClass, quelles affirmations sont correctes ?",
"choices": [
"Il détermine le plugin de volume utilisé pour provisionner les PV et doit obligatoirement être renseigné.",
"On peut y indiquer un provisionneur externe (ex. un pilote CSI), pas seulement les provisionneurs internes préfixés kubernetes.io.",
"S'il est absent, Kubernetes utilise automatiquement hostPath par défaut.",
"Il définit la politique de récupération des PV provisionnés."
],
"correct": [
0,
1
],
"why": [
"Correct : chaque StorageClass a un provisioner qui détermine le plugin de volume utilisé pour provisionner les PV, et ce champ doit être spécifié.",
"Correct : on n'est pas limité aux provisionneurs internes (préfixés kubernetes.io) ; on peut spécifier des provisionneurs externes, par exemple un pilote CSI.",
"Faux : le champ est obligatoire ; il n'y a pas de repli automatique sur hostPath.",
"Faux : la politique de récupération est définie par reclaimPolicy, pas par provisioner."
],
"explain": "Le champ provisioner d'une StorageClass indique quel plugin de volume provisionne les PV ; il est obligatoire. On peut utiliser un provisionneur interne (préfixe kubernetes.io) ou un provisionneur externe, par exemple un pilote CSI dont on renseigne le nom comme valeur.",
"ref": "https://kubernetes.io/docs/concepts/storage/storage-classes/#provisioner",
"en": {
"q": "Regarding the `provisioner` field of a StorageClass, which statements are correct?",
"choices": [
"It determines the volume plugin used to provision PVs and must be specified.",
"You can specify an external provisioner (e.g. a CSI driver), not only the internal provisioners prefixed with kubernetes.io.",
"If it is absent, Kubernetes automatically defaults to hostPath.",
"It defines the reclaim policy of the provisioned PVs."
]
}
},
{
"id": "t4-t1",
"domain": "troubleshooting",
"difficulty": "easy",
"q": "Quel est le rôle de la readinessProbe (sonde de disponibilité) d'un conteneur ?",
"choices": [
"Retirer le Pod des endpoints du Service tant qu'elle échoue, sans redémarrer le conteneur",
"Tuer et redémarrer le conteneur dès qu'elle échoue",
"Retarder les sondes liveness et readiness jusqu'à ce que l'application ait démarré",
"Supprimer définitivement le Pod après trois échecs consécutifs"
],
"correct": [
0
],
"why": [
"Correct : un échec de readiness marque le Pod comme non prêt et le sort des endpoints du Service ; aucun trafic ne lui est envoyé mais le conteneur continue de tourner.",
"Non : c'est le comportement de la livenessProbe, qui provoque un redémarrage du conteneur.",
"Non : c'est la startupProbe qui protège les démarrages lents en retardant les autres sondes.",
"Non : une sonde ne supprime jamais le Pod ; readiness ne fait que couper le trafic."
],
"explain": "La readinessProbe conditionne l'appartenance du Pod aux endpoints du Service : tant qu'elle échoue, le Pod est marqué non prêt et ne reçoit pas de trafic, mais le conteneur n'est pas redémarré. C'est la différence clé avec la livenessProbe (redémarrage) et la startupProbe (démarrages lents).",
"ref": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes",
"en": {
"q": "What is the role of a container's readinessProbe?",
"choices": [
"Remove the Pod from the Service endpoints while it fails, without restarting the container",
"Kill and restart the container as soon as it fails",
"Delay the liveness and readiness probes until the application has started",
"Permanently delete the Pod after three consecutive failures"
]
}
},
{
"id": "t4-t2",
"domain": "troubleshooting",
"difficulty": "easy",
"q": "Quels mécanismes (handlers) une sonde de conteneur peut-elle utiliser pour vérifier son état ? (plusieurs réponses)",
"choices": [
"exec : exécuter une commande dans le conteneur (succès si code de sortie 0)",
"httpGet : envoyer une requête HTTP GET sur un chemin et un port",
"tcpSocket : ouvrir une connexion TCP sur un port donné",
"sqlQuery : exécuter une requête SQL sur la base de l'application"
],
"correct": [
0,
1,
2
],
"why": [
"Correct : le handler exec réussit si la commande renvoie le code de sortie 0.",
"Correct : httpGet réussit selon le code HTTP renvoyé par le serveur.",
"Correct : tcpSocket réussit si la connexion TCP peut être établie sur le port.",
"Non : il n'existe pas de handler sqlQuery ; les handlers documentés sont exec, httpGet, tcpSocket et grpc."
],
"explain": "Une sonde s'appuie sur un handler : exec (code de sortie de la commande), httpGet (code HTTP), tcpSocket (connexion TCP) ou grpc. Il n'existe pas de handler SQL. Ces mécanismes sont communs aux sondes liveness, readiness et startup.",
"ref": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes",
"en": {
"q": "Which handlers can a container probe use to check its state? (multiple answers)",
"choices": [
"exec: run a command inside the container (success if exit code 0)",
"httpGet: send an HTTP GET request to a path and port",
"tcpSocket: open a TCP connection on a given port",
"sqlQuery: run a SQL query against the application's database"
]
}
},
{
"id": "t4-t3",
"domain": "troubleshooting",
"difficulty": "easy",
"q": "Vous voulez suivre en continu (streaming) les logs d'un Pod, en n'affichant au départ que les 20 dernières lignes, avec l'horodatage sur chaque ligne. Quelle commande utilisez-vous ?",
"choices": [
"kubectl logs -f --tail=20 --timestamps monpod",
"kubectl logs --since=20 --watch monpod",
"kubectl logs --lines=20 --follow-time monpod",
"kubectl logs -w --tail 20 --time monpod"
],
"correct": [
0
],
"why": [
"Correct : -f (ou --follow) stream les logs, --tail=20 limite aux 20 dernières lignes initiales, --timestamps ajoute l'horodatage.",
"Non : --since prend une durée (ex. 20s), pas un nombre de lignes, et --watch n'existe pas pour logs.",
"Non : --lines et --follow-time ne sont pas des options de kubectl logs.",
"Non : -w et --time ne sont pas des options de kubectl logs."
],
"explain": "Pour kubectl logs : -f/--follow stream la sortie, --tail=N limite au nombre de lignes de départ, --timestamps préfixe chaque ligne d'un horodatage. --since attend une durée (5s, 2m, 3h), pas un nombre de lignes.",
"ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/",
"en": {
"q": "You want to continuously stream a Pod's logs, showing only the last 20 lines at first, with a timestamp on each line. Which command do you use?",
"choices": [
"kubectl logs -f --tail=20 --timestamps mypod",
"kubectl logs --since=20 --watch mypod",
"kubectl logs --lines=20 --follow-time mypod",
"kubectl logs -w --tail 20 --time mypod"
]
}
},
{
"id": "t4-t4",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Quelles sont les valeurs par défaut documentées de periodSeconds et failureThreshold pour une sonde ?",
"choices": [
"periodSeconds = 10, failureThreshold = 3",
"periodSeconds = 1, failureThreshold = 1",
"periodSeconds = 5, failureThreshold = 10",
"periodSeconds = 30, failureThreshold = 0"
],
"correct": [
0
],
"why": [
"Correct : par défaut la sonde est exécutée toutes les 10 s (periodSeconds=10) et 3 échecs consécutifs (failureThreshold=3) la font considérer comme en échec.",
"Non : timeoutSeconds et successThreshold valent 1 par défaut, mais pas periodSeconds ni failureThreshold.",
"Non : ces valeurs ne correspondent pas aux défauts documentés.",
"Non : failureThreshold ne peut pas valoir 0 ; sa valeur par défaut est 3."
],
"explain": "Défauts documentés des sondes : periodSeconds=10 (fréquence), failureThreshold=3 (échecs consécutifs avant échec), à comparer avec timeoutSeconds=1, successThreshold=1 et initialDelaySeconds=0.",
"ref": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes",
"en": {
"q": "What are the documented default values of periodSeconds and failureThreshold for a probe?",
"choices": [
"periodSeconds = 10, failureThreshold = 3",
"periodSeconds = 1, failureThreshold = 1",
"periodSeconds = 5, failureThreshold = 10",
"periodSeconds = 30, failureThreshold = 0"
]
}
},
{
"id": "t4-t5",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "À quoi sert la startupProbe (sonde de démarrage) d'un conteneur ?",
"choices": [
"Protéger les conteneurs à démarrage lent : tant qu'elle n'a pas réussi, les sondes liveness et readiness sont désactivées",
"Empêcher tout redémarrage du conteneur durant toute sa vie",
"Vérifier périodiquement la disponibilité pour router le trafic du Service",
"Exécuter une seule commande au premier démarrage puis ne plus jamais sonder"
],
"correct": [
0
],
"why": [
"Correct : la startupProbe protège les applications à initialisation longue ; les sondes liveness et readiness ne s'exécutent qu'une fois qu'elle a réussi.",
"Non : si la startupProbe échoue au-delà du seuil, le kubelet tue et redémarre le conteneur.",
"Non : c'est le rôle de la readinessProbe, pas de la startupProbe.",
"Non : la startupProbe sonde à intervalle régulier jusqu'à son succès, pas une seule fois."
],
"explain": "La startupProbe couvre les conteneurs lents à démarrer : elle retarde l'exécution des sondes liveness et readiness jusqu'à son premier succès, évitant qu'une liveness ne tue prématurément un conteneur encore en initialisation. Son échec persistant provoque un redémarrage.",
"ref": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#protect-slow-starting-containers-with-startup-probes",
"en": {
"q": "What is the purpose of a container's startupProbe?",
"choices": [
"Protect slow-starting containers: until it succeeds, the liveness and readiness probes are disabled",
"Prevent any restart of the container during its whole lifetime",
"Periodically check availability to route Service traffic",
"Run a single command at first startup and never probe again"
]
}
},
{
"id": "t4-t6",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Comment ne lister que les événements de type Warning concernant un Pod nommé web dans le namespace courant ?",
"choices": [
"kubectl get events --field-selector type=Warning,involvedObject.name=web",
"kubectl get events --label type=Warning,name=web",
"kubectl get events --filter warning:web",
"kubectl get events --where type=Warning and name=web"
],
"correct": [
0
],
"why": [
"Correct : --field-selector filtre sur des champs de l'objet event comme type et involvedObject.name, combinés par une virgule.",
"Non : --label filtre sur des labels, or type et involvedObject.name sont des champs, pas des labels.",
"Non : --filter n'est pas une option de kubectl get.",
"Non : --where et sa syntaxe SQL n'existent pas dans kubectl."
],
"explain": "kubectl get events --field-selector permet de filtrer sur les champs des événements (type, reason, involvedObject.name...), plusieurs critères étant séparés par des virgules. C'est distinct de --selector/--label qui portent sur les labels.",
"ref": "https://kubernetes.io/docs/reference/kubectl/quick-reference/#viewing-finding-resources",
"en": {
"q": "How do you list only Warning-type events about a Pod named web in the current namespace?",
"choices": [
"kubectl get events --field-selector type=Warning,involvedObject.name=web",
"kubectl get events --label type=Warning,name=web",
"kubectl get events --filter warning:web",
"kubectl get events --where type=Warning and name=web"
]
}
},
{
"id": "t4-t7",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "L'API Kubernetes d'un nœud est indisponible, mais vous devez inspecter les conteneurs réellement lancés par le runtime sur ce nœud. Quel outil, à quel niveau ?",
"choices": [
"crictl : une CLI qui parle directement au runtime compatible CRI (containerd, CRI-O) via son socket, indépendamment de l'API Kubernetes",
"kubectl : il interroge toujours le kube-apiserver et fonctionne même API HS",
"crictl : il interroge le kube-apiserver exactement comme kubectl",
"helm : il liste les conteneurs directement depuis le runtime du nœud"
],
"correct": [
0
],
"why": [
"Correct : crictl dialogue avec le runtime compatible CRI via son socket (ex. unix:///var/run/containerd/containerd.sock), au niveau runtime et non au niveau de l'API Kubernetes.",
"Non : kubectl passe par le kube-apiserver ; si l'API est HS, il ne peut rien inspecter.",
"Non : crictl n'utilise pas le kube-apiserver ; il parle au runtime, c'est justement sa différence avec kubectl.",
"Non : helm gère des releases via l'API Kubernetes, il n'inspecte pas le runtime."
],
"explain": "crictl est la CLI des runtimes compatibles CRI : elle parle directement au runtime (containerd, CRI-O) par son socket, au niveau nœud, sans passer par l'API Kubernetes. C'est l'outil de choix pour déboguer un nœud quand la couche API est indisponible.",
"ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/",
"en": {
"q": "A node's Kubernetes API is unavailable, but you must inspect the containers actually started by the runtime on that node. Which tool, at which level?",
"choices": [
"crictl: a CLI that talks directly to the CRI-compatible runtime (containerd, CRI-O) via its socket, independently of the Kubernetes API",
"kubectl: it always queries the kube-apiserver and works even when the API is down",
"crictl: it queries the kube-apiserver exactly like kubectl",
"helm: it lists containers directly from the node's runtime"
]
}
},
{
"id": "t4-t8",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Un conteneur basé sur une image « distroless » (sans shell ni outils) est en échec et vous devez l'inspecter de l'intérieur. Quelle approche est adaptée ?",
"choices": [
"Ajouter un conteneur éphémère au Pod en cours avec kubectl debug --image=... : il partage les namespaces du Pod sans le redémarrer",
"Modifier l'image du conteneur à chaud via kubectl edit pour y injecter un shell",
"kubectl exec -it -- /bin/bash, qui fonctionne même sans shell présent dans l'image",
"Redémarrer le Pod pour qu'un shell apparaisse automatiquement dans le conteneur"
],
"correct": [
0
],
"why": [
"Correct : un conteneur éphémère est ajouté au Pod en cours d'exécution ; il partage les namespaces du Pod et fournit des outils, sans redémarrer ni modifier le conteneur d'origine.",
"Non : kubectl edit ne réécrit pas l'image d'un conteneur en cours d'exécution.",
"Non : kubectl exec échoue si l'image ne contient ni /bin/bash ni /bin/sh.",
"Non : redémarrer ne fait pas apparaître de shell absent de l'image."
],
"explain": "Pour une image sans shell, on ajoute un conteneur éphémère avec kubectl debug : il s'attache au Pod en cours, partage ses namespaces et apporte les outils de diagnostic, sans redémarrer ni altérer le conteneur applicatif. kubectl exec échouerait faute de shell dans l'image.",
"ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#ephemeral-container",
"en": {
"q": "A container based on a 'distroless' image (no shell or tools) is failing and you must inspect it from the inside. Which approach is appropriate?",
"choices": [
"Add an ephemeral container to the running Pod with kubectl debug --image=...: it shares the Pod's namespaces without restarting it",
"Modify the container image on the fly with kubectl edit to inject a shell",
"kubectl exec -it -- /bin/bash, which works even without a shell in the image",
"Restart the Pod so a shell automatically appears in the container"
]
}
},
{
"id": "t4-t9",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Un conteneur reste à l'état Waiting. Où lire la raison (reason) expliquant pourquoi il ne démarre pas ?",
"choices": [
"Dans State: Waiting (champ Reason) du conteneur et dans les Events de kubectl describe pod",
"Uniquement dans la sortie de kubectl top pod",
"Dans la sortie de kubectl api-resources",
"Nulle part : l'état Waiting n'expose jamais de raison"
],
"correct": [
0
],
"why": [
"Correct : kubectl describe pod affiche l'état du conteneur (Waiting) avec un champ Reason, et la section Events détaille la cause (ex. image introuvable).",
"Non : kubectl top pod affiche l'usage CPU/mémoire, pas l'état Waiting ni sa raison.",
"Non : kubectl api-resources liste les types de ressources de l'API, sans rapport avec l'état d'un Pod.",
"Non : l'état Waiting est justement accompagné d'un champ Reason lisible via describe."
],
"explain": "Quand un conteneur reste Waiting, kubectl describe pod expose son état avec un champ Reason (ImagePullBackOff, CreateContainerConfigError...) et une section Events qui détaille les causes. C'est le premier réflexe de diagnostic d'un conteneur qui ne démarre pas.",
"ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/#my-pod-stays-waiting",
"en": {
"q": "A container stays in the Waiting state. Where do you read the reason it isn't starting?",
"choices": [
"In the container's State: Waiting (Reason field) and in the Events of kubectl describe pod",
"Only in the output of kubectl top pod",
"In the output of kubectl api-resources",
"Nowhere: the Waiting state never exposes a reason"
]
}
},
{
"id": "t4-t10",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Vous hésitez sur le nom exact d'une ressource (par exemple ep, endpoints, endpointslices) et son apiVersion. Quelle commande liste toutes les ressources de l'API avec leurs noms courts et groupes ?",
"choices": [
"kubectl api-resources",
"kubectl cluster-info dump",
"kubectl explain resources",
"kubectl get all-resources"
],
"correct": [
0
],
"why": [
"Correct : kubectl api-resources liste tous les types de ressources exposés par l'API, avec leurs noms courts, apiVersion (groupe) et portée namespacée ou non.",
"Non : kubectl cluster-info dump exporte un état massif du cluster pour diagnostic, il ne liste pas les types de ressources.",
"Non : kubectl explain documente les champs d'un type donné, il ne dresse pas la liste des ressources.",
"Non : all-resources n'est pas une ressource valide de kubectl get."
],
"explain": "kubectl api-resources énumère les types de ressources connus de l'API server, avec leurs noms courts, leur apiVersion et leur portée. Utile quand on ne se souvient plus du nom exact ou du groupe d'une ressource.",
"ref": "https://kubernetes.io/docs/reference/kubectl/quick-reference/#viewing-finding-resources",
"en": {
"q": "You are unsure of a resource's exact name (e.g. ep, endpoints, endpointslices) and its apiVersion. Which command lists all API resources with their short names and groups?",
"choices": [
"kubectl api-resources",
"kubectl cluster-info dump",
"kubectl explain resources",
"kubectl get all-resources"
]
}
},
{
"id": "t4-t11",
"domain": "troubleshooting",
"difficulty": "hard",
"q": "Après le redémarrage d'un conteneur, quels champs le bloc status.containerStatuses[].lastState.terminated expose-t-il sur l'instance précédente ? (plusieurs réponses)",
"choices": [
"exitCode : le code de sortie du processus du conteneur",
"reason : la raison machine de fin (ex. Completed, Error)",
"finishedAt : l'horodatage de fin du conteneur",
"restartPolicy : la politique de redémarrage définie sur le Pod"
],
"correct": [
0,
1,
2
],
"why": [
"Correct : lastState.terminated.exitCode donne le code de sortie de l'instance précédente.",
"Correct : reason indique la cause machine de la terminaison (Completed, Error...).",
"Correct : finishedAt (et startedAt) horodate la fin (et le début) de l'instance terminée.",
"Non : restartPolicy est un champ de spec du Pod, pas un champ de lastState.terminated."
],
"explain": "Pour comprendre pourquoi un conteneur a redémarré, on lit status.containerStatuses[].lastState.terminated (via kubectl get pod -o yaml) : exitCode, reason, message, startedAt et finishedAt décrivent l'instance précédente. restartPolicy, lui, est une donnée de la spec du Pod, pas du status.",
"ref": "https://kubernetes.io/docs/tasks/debug/debug-application/determine-reason-pod-failure/",
"en": {
"q": "After a container has restarted, which fields does status.containerStatuses[].lastState.terminated expose about the previous instance? (multiple answers)",
"choices": [
"exitCode: the exit code of the container process",
"reason: the machine-readable termination reason (e.g. Completed, Error)",
"finishedAt: the container's finish timestamp",
"restartPolicy: the restart policy defined on the Pod"
]
}
},
{
"id": "t4-t12",
"domain": "troubleshooting",
"difficulty": "hard",
"q": "Concernant metrics-server et la Metrics API (metrics.k8s.io), quelles affirmations sont exactes ? (plusieurs réponses)",
"choices": [
"Il ne conserve que les métriques les plus récentes en mémoire : ce n'est pas une solution de monitoring historique",
"kubectl top et le Horizontal Pod Autoscaler (HPA) s'appuient sur lui",
"Il fournit l'usage CPU et mémoire des nœuds et des Pods",
"Il stocke un historique long terme des métriques pour l'analyse de tendances"
],
"correct": [
0,
1,
2
],
"why": [
"Correct : metrics-server ne garde que les dernières mesures en mémoire ; il n'est pas conçu pour le monitoring historique.",
"Correct : kubectl top et le HPA consomment la Metrics API alimentée par metrics-server.",
"Correct : il expose l'usage CPU et mémoire des nœuds et des Pods via metrics.k8s.io.",
"Non : il ne conserve pas d'historique ; pour l'analyse long terme il faut une pipeline de monitoring complète."
],
"explain": "metrics-server agrège l'usage CPU/mémoire des nœuds et Pods depuis les kubelets et l'expose via la Metrics API (metrics.k8s.io), qui alimente kubectl top et le HPA. Il ne stocke que les dernières valeurs en mémoire : ce n'est pas un système de monitoring historique.",
"ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/",
"en": {
"q": "Regarding metrics-server and the Metrics API (metrics.k8s.io), which statements are correct? (multiple answers)",
"choices": [
"It only keeps the latest metrics in memory: it is not a historical monitoring solution",
"kubectl top and the Horizontal Pod Autoscaler (HPA) rely on it",
"It provides CPU and memory usage for nodes and Pods",
"It stores long-term historical metrics for trend analysis"
]
}
},
{
"id": "t4-t13",
"domain": "troubleshooting",
"difficulty": "hard",
"q": "Parmi les conditions d'un nœud (visibles avec kubectl describe node), lesquelles signalent une pression sur des ressources locales du nœud ? (plusieurs réponses)",
"choices": [
"DiskPressure : espace disque insuffisant sur le nœud",
"PIDPressure : trop de processus sur le nœud",
"Ready à False ou Unknown indique une pression disque",
"NetworkUnavailable : le réseau du nœud n'est pas correctement configuré"
],
"correct": [
0,
1
],
"why": [
"Correct : DiskPressure signale un manque d'espace disque sur le nœud.",
"Correct : PIDPressure signale un nombre excessif de processus sur le nœud.",
"Non : Ready indique la santé globale du nœud (prêt à accueillir des Pods), pas spécifiquement une pression disque.",
"Non : NetworkUnavailable est une condition réseau, pas une pression sur une ressource locale (disque/mémoire/PID)."
],
"explain": "Les conditions de pression de ressources locales sont DiskPressure (disque) et PIDPressure (processus), aux côtés de MemoryPressure (mémoire). Ready reflète la disponibilité globale du nœud et NetworkUnavailable un problème réseau : ni l'une ni l'autre n'est une condition de pression de ressource locale.",
"ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/#listing-your-cluster",
"en": {
"q": "Among a node's conditions (shown by kubectl describe node), which ones signal pressure on the node's local resources? (multiple answers)",
"choices": [
"DiskPressure: insufficient disk space on the node",
"PIDPressure: too many processes on the node",
"Ready being False or Unknown indicates disk pressure",
"NetworkUnavailable: the node's network is not correctly configured"
]
}
},
{
"id": "t4-t14",
"domain": "troubleshooting",
"difficulty": "hard",
"q": "Pour une sonde httpGet, quelle est la condition de succès et la valeur par défaut de timeoutSeconds ?",
"choices": [
"Succès si le code HTTP est compris entre 200 et 399 ; timeoutSeconds par défaut = 1",
"Succès uniquement si le code HTTP vaut exactement 200 ; timeoutSeconds par défaut = 10",
"Succès si le code HTTP est inférieur à 500 ; timeoutSeconds par défaut = 30",
"Succès si le port répond en TCP ; timeoutSeconds par défaut = 0"
],
"correct": [
0
],
"why": [
"Correct : une sonde httpGet est un succès pour tout code HTTP supérieur ou égal à 200 et inférieur à 400, et timeoutSeconds vaut 1 par défaut.",
"Non : le succès ne se limite pas au code 200, et timeoutSeconds vaut 1 (pas 10) par défaut.",
"Non : la borne haute de succès est 400 (exclu), pas 500, et le timeout par défaut n'est pas 30.",
"Non : tester le port en TCP correspond au handler tcpSocket, pas à httpGet ; timeoutSeconds ne vaut pas 0 par défaut."
],
"explain": "Une sonde httpGet réussit pour tout code HTTP dans l'intervalle 200-399 (supérieur ou égal à 200 et inférieur à 400) ; tout autre code est un échec. La valeur par défaut de timeoutSeconds est 1 seconde.",
"ref": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes",
"en": {
"q": "For an httpGet probe, what is the success condition and the default value of timeoutSeconds?",
"choices": [
"Success if the HTTP code is between 200 and 399; timeoutSeconds default = 1",
"Success only if the HTTP code is exactly 200; timeoutSeconds default = 10",
"Success if the HTTP code is below 500; timeoutSeconds default = 30",
"Success if the port responds over TCP; timeoutSeconds default = 0"
]
}
}
];
  DATA.forEach((o) => Q.push(Object.assign({ type: "theory" }, o)));
  window.CKA._t4 = DATA.length;
})();
