(function () {
  const Q = window.CKA.questions;
  const DATA = [
{
"id": "t5-a1",
"domain": "architecture",
"difficulty": "easy",
"q": "Pod Security Admission propose trois modes appliqués au niveau du namespace. Que fait le mode « audit » ?",
"choices": [
"Il rejette la création du pod en cas de violation de la politique",
"Il ajoute une annotation dans le journal d'audit mais laisse passer le pod",
"Il affiche un avertissement à l'utilisateur mais laisse passer le pod",
"Il modifie automatiquement le pod pour le rendre conforme"
],
"correct": [
1
],
"why": [
"C'est le comportement du mode « enforce » : la violation entraîne le rejet du pod.",
"Correct : « audit » consigne une annotation d'audit sur les violations mais autorise quand même le pod.",
"C'est le comportement du mode « warn » : un avertissement visible pour l'utilisateur, sans blocage.",
"Pod Security Admission ne mute jamais les pods ; il ne fait que vérifier."
],
"explain": "Pod Security Admission a trois modes indépendants au niveau du namespace : « enforce » rejette, « warn » avertit, et « audit » ajoute une annotation dans le journal d'audit tout en laissant le pod être créé. Aucun de ces modes ne modifie l'objet.",
"ref": "https://kubernetes.io/docs/concepts/security/pod-security-admission/#pod-security-admission-labels-for-namespaces",
"en": {
"q": "Pod Security Admission offers three modes applied at the namespace level. What does the \"audit\" mode do?",
"choices": [
"It rejects pod creation when the policy is violated",
"It adds an annotation to the audit log but still allows the pod",
"It shows a user-facing warning but still allows the pod",
"It automatically mutates the pod to make it compliant"
]
}
},
{
"id": "t5-a2",
"domain": "architecture",
"difficulty": "easy",
"q": "Quels sont les trois niveaux définis par les Pod Security Standards ?",
"choices": [
"privileged, baseline, restricted",
"allow, warn, deny",
"low, medium, high",
"none, standard, hardened"
],
"correct": [
0
],
"why": [
"Correct : les trois niveaux cumulatifs sont privileged (non restreint), baseline (restrictions minimales) et restricted (durci).",
"Ce sont des modes/décisions d'admission, pas les niveaux des Pod Security Standards.",
"Ces libellés n'existent pas dans les Pod Security Standards.",
"Ces libellés n'existent pas dans les Pod Security Standards."
],
"explain": "Les Pod Security Standards définissent trois politiques cumulatives : privileged (ouverte et non restreinte), baseline (restrictions minimales empêchant les élévations de privilèges connues) et restricted (fortement durcie, suivant les bonnes pratiques actuelles).",
"ref": "https://kubernetes.io/docs/concepts/security/pod-security-standards/#the-profiles",
"en": {
"q": "What are the three levels defined by the Pod Security Standards?",
"choices": [
"privileged, baseline, restricted",
"allow, warn, deny",
"low, medium, high",
"none, standard, hardened"
]
}
},
{
"id": "t5-a3",
"domain": "architecture",
"difficulty": "easy",
"q": "À quel moment un contrôleur d'admission intervient-il dans le traitement d'une requête par l'API server ?",
"choices": [
"Avant l'authentification, pour filtrer les requêtes anonymes",
"Après l'authentification et l'autorisation, mais avant la persistance de l'objet dans etcd",
"Uniquement lors des lectures (get, list, watch)",
"Après l'écriture de l'objet dans etcd, en post-traitement"
],
"correct": [
1
],
"why": [
"L'admission intervient après authn/authz, pas avant l'authentification.",
"Correct : les contrôleurs d'admission interceptent les requêtes après authentification/autorisation et avant la persistance dans etcd.",
"Les contrôleurs d'admission ne s'appliquent pas aux opérations de lecture.",
"L'admission a lieu avant la persistance, pas après."
],
"explain": "Un contrôleur d'admission est du code compilé dans le kube-apiserver qui intercepte les requêtes de création, modification ou suppression après l'authentification et l'autorisation, mais avant que l'objet ne soit persisté dans etcd. Il ne s'applique pas aux lectures.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#what-are-they",
"en": {
"q": "At what point does an admission controller act during request processing by the API server?",
"choices": [
"Before authentication, to filter out anonymous requests",
"After authentication and authorization, but before the object is persisted to etcd",
"Only during read operations (get, list, watch)",
"After the object is written to etcd, as post-processing"
]
}
},
{
"id": "t5-a4",
"domain": "architecture",
"difficulty": "medium",
"q": "Quel label de namespace configure Pod Security Admission pour rejeter (mode enforce) les pods au niveau restricted ?",
"choices": [
"pod-security.kubernetes.io/enforce: restricted",
"security.kubernetes.io/level: restricted",
"podsecurity/enforce=restricted",
"pod-security.kubernetes.io/restricted: enforce"
],
"correct": [
0
],
"why": [
"Correct : le label a la forme pod-security.kubernetes.io/<MODE>: <NIVEAU>, ici enforce et restricted.",
"Ce préfixe de label n'existe pas pour Pod Security Admission.",
"La syntaxe des labels Kubernetes n'utilise pas ce format.",
"Le mode et le niveau sont inversés : le mode est la clé, le niveau est la valeur."
],
"explain": "Pod Security Admission se configure via des labels de namespace de la forme pod-security.kubernetes.io/<mode>: <niveau>, où le mode est enforce, audit ou warn, et le niveau est privileged, baseline ou restricted. Des labels -version optionnels permettent d'épingler la politique à une version.",
"ref": "https://kubernetes.io/docs/concepts/security/pod-security-admission/#pod-security-admission-labels-for-namespaces",
"en": {
"q": "Which namespace label configures Pod Security Admission to reject (enforce mode) pods at the restricted level?",
"choices": [
"pod-security.kubernetes.io/enforce: restricted",
"security.kubernetes.io/level: restricted",
"podsecurity/enforce=restricted",
"pod-security.kubernetes.io/restricted: enforce"
]
}
},
{
"id": "t5-a5",
"domain": "architecture",
"difficulty": "medium",
"q": "À quoi sert le label optionnel pod-security.kubernetes.io/enforce-version sur un namespace ?",
"choices": [
"À choisir la version de l'API server qui applique la politique",
"À épingler la politique à une version mineure précise de Kubernetes (ou « latest »)",
"À indiquer le numéro de version du pod concerné",
"À activer ou désactiver le contrôleur PodSecurity"
],
"correct": [
1
],
"why": [
"Le label ne sélectionne pas une version de l'API server.",
"Correct : le label -version épingle la politique à une version mineure de Kubernetes (ex. v1.31) ou à « latest ».",
"Le label ne concerne pas la version des pods.",
"L'activation du contrôleur ne se fait pas via ce label mais côté API server."
],
"explain": "Les labels -version (enforce-version, audit-version, warn-version) permettent d'épingler la politique appliquée à une version mineure précise de Kubernetes (ex. v1.31) ou à « latest ». Cela garantit un comportement stable même quand le cluster est mis à niveau.",
"ref": "https://kubernetes.io/docs/concepts/security/pod-security-admission/#pod-security-admission-labels-for-namespaces",
"en": {
"q": "What is the purpose of the optional pod-security.kubernetes.io/enforce-version label on a namespace?",
"choices": [
"To choose which API server version enforces the policy",
"To pin the policy to a specific Kubernetes minor version (or \"latest\")",
"To indicate the version number of the affected pod",
"To enable or disable the PodSecurity controller"
]
}
},
{
"id": "t5-a6",
"domain": "architecture",
"difficulty": "medium",
"q": "Dans quel ordre s'exécutent les deux phases de l'admission control ?",
"choices": [
"Les contrôleurs validating d'abord, puis les mutating",
"Les contrôleurs mutating d'abord, puis les validating",
"Les deux phases s'exécutent en parallèle sans ordre défini",
"L'ordre dépend uniquement du flag --enable-admission-plugins"
],
"correct": [
1
],
"why": [
"L'ordre est inverse : la mutation précède la validation.",
"Correct : la phase mutating s'exécute en premier (peut modifier l'objet), puis la phase validating (peut seulement valider).",
"Les phases sont séquentielles, pas parallèles.",
"L'ordre mutating puis validating est structurel, il ne découle pas de l'ordre du flag."
],
"explain": "L'admission control se déroule en deux phases séquentielles : d'abord les contrôleurs mutating, qui peuvent modifier l'objet, puis les contrôleurs validating, qui ne peuvent que valider. Si un contrôleur rejette la requête, celle-ci est immédiatement rejetée.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#what-are-they",
"en": {
"q": "In what order do the two phases of admission control run?",
"choices": [
"Validating controllers first, then mutating",
"Mutating controllers first, then validating",
"Both phases run in parallel with no defined order",
"The order depends solely on the --enable-admission-plugins flag"
]
}
},
{
"id": "t5-a7",
"domain": "architecture",
"difficulty": "medium",
"q": "Parmi ces contrôleurs d'admission intégrés, lequel est de type mutating (il peut modifier l'objet) ?",
"choices": [
"NamespaceLifecycle",
"ResourceQuota",
"LimitRanger",
"DefaultStorageClass"
],
"correct": [
3
],
"why": [
"NamespaceLifecycle est validating : il rejette les requêtes vers un namespace inexistant ou en suppression.",
"ResourceQuota est validating : il vérifie que la requête ne dépasse pas les quotas.",
"LimitRanger est validating : il vérifie le respect des contraintes d'un LimitRange.",
"Correct : DefaultStorageClass est mutating ; il ajoute la storage class par défaut aux PVC qui n'en demandent aucune."
],
"explain": "DefaultStorageClass est un contrôleur mutating : il observe la création des PersistentVolumeClaim sans storage class et leur ajoute automatiquement la classe par défaut. NamespaceLifecycle, ResourceQuota et LimitRanger sont des contrôleurs validating.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#defaultstorageclass",
"en": {
"q": "Among these built-in admission controllers, which one is mutating (it can modify the object)?",
"choices": [
"NamespaceLifecycle",
"ResourceQuota",
"LimitRanger",
"DefaultStorageClass"
]
}
},
{
"id": "t5-a8",
"domain": "architecture",
"difficulty": "medium",
"q": "Quelle est la différence de rôle entre les contrôleurs d'admission MutatingAdmissionWebhook et ValidatingAdmissionWebhook ?",
"choices": [
"MutatingAdmissionWebhook traite les MutatingWebhookConfiguration (appelées en premier, peuvent modifier l'objet) ; ValidatingAdmissionWebhook traite les ValidatingWebhookConfiguration (appelées ensuite, ne peuvent que rejeter)",
"Les deux traitent indifféremment tout type de webhook, sans distinction",
"MutatingAdmissionWebhook ne fonctionne que pour les CRD",
"ValidatingAdmissionWebhook s'exécute avant l'authentification"
],
"correct": [
0
],
"why": [
"Correct : chacun pilote son type de configuration de webhook, avec les mutating appelées avant les validating.",
"Chaque contrôleur ne traite que son type de configuration de webhook.",
"Les webhooks mutating s'appliquent aux ressources selon leurs rules, pas seulement aux CRD.",
"Les webhooks d'admission s'exécutent après l'authentification, comme toute l'admission control."
],
"explain": "Le contrôleur MutatingAdmissionWebhook exécute les webhooks déclarés par les objets MutatingWebhookConfiguration ; ils sont appelés en premier et peuvent modifier l'objet. ValidatingAdmissionWebhook exécute les ValidatingWebhookConfiguration, appelées après les mutations, qui ne peuvent que valider ou rejeter. Les deux contrôleurs doivent être activés pour que les webhooks fonctionnent.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#admission-webhooks",
"en": {
"q": "What is the difference in role between the MutatingAdmissionWebhook and ValidatingAdmissionWebhook admission controllers?",
"choices": [
"MutatingAdmissionWebhook processes MutatingWebhookConfiguration objects (called first, can modify the object); ValidatingAdmissionWebhook processes ValidatingWebhookConfiguration objects (called afterward, can only reject)",
"Both handle any type of webhook interchangeably, with no distinction",
"MutatingAdmissionWebhook only works for CRDs",
"ValidatingAdmissionWebhook runs before authentication"
]
}
},
{
"id": "t5-a9",
"domain": "architecture",
"difficulty": "medium",
"q": "À quoi sert un objet APIService dans la couche d'agrégation (aggregation layer) de l'API Kubernetes ?",
"choices": [
"À définir un nouveau type de ressource stocké directement dans etcd par le kube-apiserver",
"À enregistrer un groupe/version d'API et le rediriger (proxy) vers un extension API server externe",
"À créer un contrôleur d'admission personnalisé",
"À déclarer un webhook de validation en CEL sans serveur externe"
],
"correct": [
1
],
"why": [
"C'est le rôle d'une CRD, dont les ressources sont servies et stockées par le kube-apiserver lui-même.",
"Correct : l'APIService revendique un chemin d'API et fait proxy des requêtes vers un extension API server (via un Service).",
"Un contrôleur d'admission n'est pas défini par un APIService.",
"C'est le rôle de ValidatingAdmissionPolicy, pas d'un APIService."
],
"explain": "La couche d'agrégation s'exécute en processus dans le kube-apiserver. Un objet APIService enregistre un groupe/version d'API et indique le Service de l'extension API server qui traitera ces requêtes ; le kube-apiserver fait alors proxy des requêtes vers ce serveur. Contrairement aux CRD, le stockage est géré par le serveur d'extension.",
"ref": "https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/apiserver-aggregation/",
"en": {
"q": "What is the purpose of an APIService object in the Kubernetes API aggregation layer?",
"choices": [
"To define a new resource type stored directly in etcd by the kube-apiserver",
"To register an API group/version and proxy it to an external extension API server",
"To create a custom admission controller",
"To declare a CEL validation webhook without an external server"
]
}
},
{
"id": "t5-a10",
"domain": "architecture",
"difficulty": "medium",
"q": "Dans une KubeSchedulerConfiguration, comment un pod est-il associé à un profil de scheduling ?",
"choices": [
"Par l'ordre de déclaration des profils dans le fichier de configuration",
"Par le profil dont le schedulerName correspond au spec.schedulerName du pod (défaut : default-scheduler)",
"Par un label pod-scheduler.kubernetes.io sur le pod",
"Par le namespace du pod, chaque namespace ayant son propre profil"
],
"correct": [
1
],
"why": [
"L'association ne dépend pas de l'ordre des profils.",
"Correct : un pod est planifié par le profil dont le schedulerName correspond à son spec.schedulerName ; à défaut, default-scheduler.",
"Aucun label de ce type ne gouverne le choix du profil.",
"Le choix du profil ne dépend pas du namespace."
],
"explain": "Le champ profiles permet de configurer plusieurs profils de scheduling, chacun avec un schedulerName unique. Un pod est planifié par le profil dont le schedulerName correspond à son spec.schedulerName ; si le pod n'en spécifie aucun, il utilise default-scheduler.",
"ref": "https://kubernetes.io/docs/reference/scheduling/config/#multiple-profiles",
"en": {
"q": "In a KubeSchedulerConfiguration, how is a pod associated with a scheduling profile?",
"choices": [
"By the declaration order of the profiles in the config file",
"By the profile whose schedulerName matches the pod's spec.schedulerName (default: default-scheduler)",
"By a pod-scheduler.kubernetes.io label on the pod",
"By the pod's namespace, each namespace having its own profile"
]
}
},
{
"id": "t5-a11",
"domain": "architecture",
"difficulty": "medium",
"q": "Quelle affirmation distingue correctement une CustomResourceDefinition (CRD) d'une API agrégée ?",
"choices": [
"Une CRD nécessite d'écrire et déployer son propre API server, contrairement à l'API agrégée",
"Avec une CRD, le kube-apiserver sert et stocke la ressource dans etcd sans programmation d'un serveur dédié",
"Une CRD ne peut être que de scope Cluster, jamais Namespaced",
"Les ressources d'une CRD ne sont pas accessibles via kubectl"
],
"correct": [
1
],
"why": [
"C'est l'inverse : c'est l'API agrégée qui requiert un API server dédié, pas la CRD.",
"Correct : définir une CRD crée une ressource dont le kube-apiserver assure le service et le stockage dans etcd, sans programmation.",
"Une CRD peut être de scope Namespaced ou Cluster.",
"Les ressources personnalisées d'une CRD sont pleinement accessibles via kubectl."
],
"explain": "Une CRD permet de définir une ressource personnalisée sans écrire d'API server : le kube-apiserver la sert et la stocke dans etcd. Elle peut être de scope Namespaced ou Cluster et supporte plusieurs versions avec conversion. L'API agrégée, elle, requiert un extension API server programmé et déployé.",
"ref": "https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions",
"en": {
"q": "Which statement correctly distinguishes a CustomResourceDefinition (CRD) from an aggregated API?",
"choices": [
"A CRD requires writing and deploying your own API server, unlike an aggregated API",
"With a CRD, the kube-apiserver serves and stores the resource in etcd without programming a dedicated server",
"A CRD can only be Cluster-scoped, never Namespaced",
"A CRD's resources are not accessible via kubectl"
]
}
},
{
"id": "t5-a12",
"domain": "architecture",
"difficulty": "hard",
"q": "Pour être conforme au niveau restricted des Pod Security Standards, quelles conditions le pod doit-il remplir ? (plusieurs réponses)",
"choices": [
"securityContext.runAsNonRoot doit être true",
"allowPrivilegeEscalation doit être false",
"Les capabilities doivent inclure drop: [\"ALL\"]",
"hostNetwork doit être true"
],
"correct": [
0,
1,
2
],
"why": [
"Correct : le niveau restricted exige runAsNonRoot: true.",
"Correct : le niveau restricted exige allowPrivilegeEscalation: false (Linux).",
"Correct : le niveau restricted exige de retirer toutes les capabilities via drop: [\"ALL\"].",
"Faux : au contraire, hostNetwork doit être false (déjà interdit dès le niveau baseline)."
],
"explain": "Le niveau restricted cumule les restrictions du niveau baseline et ajoute notamment : runAsNonRoot: true, allowPrivilegeEscalation: false, un seccompProfile RuntimeDefault ou Localhost, et le retrait de toutes les capabilities (drop: [\"ALL\"]). Les namespaces hôtes comme hostNetwork sont déjà interdits par baseline.",
"ref": "https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
"en": {
"q": "To comply with the restricted level of the Pod Security Standards, which conditions must the pod meet? (multiple answers)",
"choices": [
"securityContext.runAsNonRoot must be true",
"allowPrivilegeEscalation must be false",
"capabilities must include drop: [\"ALL\"]",
"hostNetwork must be true"
]
}
},
{
"id": "t5-w1",
"domain": "workloads",
"difficulty": "easy",
"q": "Avec la stratégie de déploiement Recreate, comment les Pods sont-ils remplacés lors d'une mise à jour du template ?",
"choices": [
"Tous les Pods existants sont supprimés avant que les nouveaux soient créés",
"Les Pods sont remplacés progressivement, un par un, sans interruption",
"Un nouveau ReplicaSet monte en puissance pendant que l'ancien descend",
"Seuls les Pods non prêts sont recréés, les autres restent en place"
],
"correct": [
0
],
"why": [
"Correct : Recreate tue tous les Pods existants avant d'en créer de nouveaux, ce qui provoque une interruption de service.",
"Non : ce comportement progressif décrit RollingUpdate, pas Recreate.",
"Non : la coexistence contrôlée ancien/nouveau ReplicaSet est propre à RollingUpdate.",
"Non : Recreate ne fait pas de tri, il supprime l'intégralité des anciens Pods."
],
"explain": "La stratégie Recreate supprime la totalité des Pods existants avant de créer les nouveaux. Elle est plus simple mais provoque une indisponibilité, contrairement à RollingUpdate qui remplace les Pods de façon contrôlée.",
"ref": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy",
"en": {
"q": "With the Recreate deployment strategy, how are Pods replaced when the template is updated?",
"choices": [
"All existing Pods are killed before the new ones are created",
"Pods are replaced gradually, one by one, with no downtime",
"A new ReplicaSet scales up while the old one scales down",
"Only the not-ready Pods are recreated, the others stay in place"
]
}
},
{
"id": "t5-w2",
"domain": "workloads",
"difficulty": "easy",
"q": "À propos du hook de cycle de vie postStart d'un conteneur, quelles affirmations sont exactes ? (plusieurs réponses)",
"choices": [
"Le statut du conteneur ne passe pas à RUNNING tant que le handler postStart n'est pas terminé",
"postStart est envoyé immédiatement après la création du conteneur",
"Il est garanti que postStart s'exécute avant l'ENTRYPOINT du conteneur",
"postStart est appelé juste avant la terminaison du conteneur"
],
"correct": [
0,
1
],
"why": [
"Correct : la gestion du conteneur par Kubernetes bloque, et le statut ne passe pas à RUNNING avant la fin du handler postStart.",
"Correct : Kubernetes envoie l'événement postStart immédiatement après la création du conteneur.",
"Non : il n'y a aucune garantie que postStart soit appelé avant l'ENTRYPOINT du conteneur.",
"Non : c'est le hook preStop qui est envoyé juste avant la terminaison du conteneur."
],
"explain": "postStart est envoyé immédiatement après la création du conteneur et bloque le passage au statut RUNNING jusqu'à sa fin. En revanche, aucune garantie n'existe qu'il s'exécute avant l'ENTRYPOINT du conteneur.",
"ref": "https://kubernetes.io/docs/tasks/configure-pod-container/attach-handler-lifecycle-event/",
"en": {
"q": "Regarding a container's postStart lifecycle hook, which statements are correct? (multiple answers)",
"choices": [
"The container's status is not set to RUNNING until the postStart handler completes",
"postStart is sent immediately after the container is created",
"It is guaranteed that postStart runs before the container's ENTRYPOINT",
"postStart is called just before the container is terminated"
]
}
},
{
"id": "t5-w3",
"domain": "workloads",
"difficulty": "medium",
"q": "Quelle est la valeur par défaut de progressDeadlineSeconds d'un Deployment, et que se passe-t-il lorsqu'elle est dépassée ?",
"choices": [
"600 secondes ; le Deployment signale une condition Progressing avec la raison ProgressDeadlineExceeded",
"30 secondes ; le Deployment effectue automatiquement un rollback vers la révision précédente",
"600 secondes ; les Pods bloqués sont immédiatement supprimés par le contrôleur",
"10 secondes ; le Deployment passe en état Failed et arrête tous ses Pods"
],
"correct": [
0
],
"why": [
"Correct : la valeur par défaut est 600 s ; au-delà, la condition Progressing porte la raison ProgressDeadlineExceeded.",
"Non : la valeur par défaut n'est pas 30 s, et il n'y a pas de rollback automatique déclenché par ce dépassement.",
"Non : le dépassement du délai ne supprime pas immédiatement les Pods bloqués.",
"Non : la valeur par défaut n'est pas 10 s et il n'existe pas d'état Failed déclenchant l'arrêt des Pods."
],
"explain": "progressDeadlineSeconds vaut 600 s par défaut. S'il est dépassé, Kubernetes marque la condition Progressing du Deployment avec la raison ProgressDeadlineExceeded, ce qui sert d'indicateur qu'un rollout est bloqué (sans rollback automatique).",
"ref": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#progress-deadline-seconds",
"en": {
"q": "What is the default value of a Deployment's progressDeadlineSeconds, and what happens when it is exceeded?",
"choices": [
"600 seconds; the Deployment reports a Progressing condition with reason ProgressDeadlineExceeded",
"30 seconds; the Deployment automatically rolls back to the previous revision",
"600 seconds; the stuck Pods are immediately deleted by the controller",
"10 seconds; the Deployment goes to Failed state and stops all its Pods"
]
}
},
{
"id": "t5-w4",
"domain": "workloads",
"difficulty": "medium",
"q": "Avec la stratégie de mise à jour OnDelete d'un DaemonSet, quand les nouveaux Pods sont-ils créés après modification du template ?",
"choices": [
"Uniquement lorsque vous supprimez manuellement les anciens Pods du DaemonSet",
"Automatiquement et progressivement, à raison d'au plus un Pod indisponible par nœud",
"Immédiatement sur tous les nœuds, en parallèle",
"Jamais : OnDelete interdit toute mise à jour du template"
],
"correct": [
0
],
"why": [
"Correct : avec OnDelete, les nouveaux Pods ne sont créés que lorsque vous supprimez manuellement les anciens.",
"Non : la mise à jour automatique et contrôlée par nœud décrit RollingUpdate, la stratégie par défaut.",
"Non : OnDelete n'agit pas automatiquement, encore moins en parallèle sur tous les nœuds.",
"Non : le template peut être modifié ; la mise à jour effective se fait à la suppression manuelle des Pods."
],
"explain": "Avec la stratégie OnDelete d'un DaemonSet, après mise à jour du template, les nouveaux Pods ne sont créés que lorsque vous supprimez manuellement les anciens Pods. C'est le comportement historique (K8s 1.5 et avant) ; la stratégie par défaut est désormais RollingUpdate.",
"ref": "https://kubernetes.io/docs/tasks/manage-daemon/update-daemon-set/",
"en": {
"q": "With a DaemonSet's OnDelete update strategy, when are the new Pods created after the template is modified?",
"choices": [
"Only when you manually delete the old DaemonSet Pods",
"Automatically and gradually, with at most one unavailable Pod per node",
"Immediately on all nodes, in parallel",
"Never: OnDelete forbids any template update"
]
}
},
{
"id": "t5-w5",
"domain": "workloads",
"difficulty": "medium",
"q": "Un StatefulSet de 5 Pods (ordinaux 0 à 4) utilise updateStrategy RollingUpdate avec partition: 3. Après modification du template, quels Pods sont mis à jour ?",
"choices": [
"Seuls les Pods d'ordinal supérieur ou égal à 3 (Pods 3 et 4)",
"Seuls les Pods d'ordinal inférieur à 3 (Pods 0, 1 et 2)",
"Tous les Pods, du plus grand ordinal au plus petit",
"Aucun Pod tant que partition n'est pas remis à 0"
],
"correct": [
0
],
"why": [
"Correct : avec partition: 3, tous les Pods d'ordinal supérieur ou égal à 3 sont mis à jour (Pods 3 et 4).",
"Non : les Pods d'ordinal inférieur à la partition ne sont justement PAS mis à jour.",
"Non : la partition limite précisément la mise à jour aux ordinaux supérieurs ou égaux au seuil.",
"Non : les Pods 3 et 4 sont bien mis à jour immédiatement ; seuls les ordinaux inférieurs sont figés."
],
"explain": "Avec RollingUpdate et partition: 3, seuls les Pods d'ordinal supérieur ou égal à 3 sont mis à jour. Les Pods d'ordinal inférieur ne le sont pas, même supprimés ils sont recréés dans l'ancienne version. Cela permet des déploiements canari/étagés en abaissant progressivement la partition.",
"ref": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#partitions",
"en": {
"q": "A StatefulSet of 5 Pods (ordinals 0 to 4) uses the RollingUpdate updateStrategy with partition: 3. After the template is modified, which Pods are updated?",
"choices": [
"Only Pods with ordinal greater than or equal to 3 (Pods 3 and 4)",
"Only Pods with ordinal less than 3 (Pods 0, 1 and 2)",
"All Pods, from the highest ordinal to the lowest",
"No Pod until partition is reset to 0"
]
}
},
{
"id": "t5-w6",
"domain": "workloads",
"difficulty": "medium",
"q": "Concernant un PodDisruptionBudget (PDB), quelles affirmations sont exactes ? (plusieurs réponses)",
"choices": [
"On ne peut pas spécifier à la fois minAvailable et maxUnavailable dans le même PDB",
"Un PDB ne protège pas contre les perturbations involontaires (panne matérielle, éviction manque de ressources)",
"kubectl drain respecte le PDB via l'API Eviction et peut être bloqué s'il le violerait",
"minAvailable et maxUnavailable doivent toujours être renseignés ensemble pour être valides"
],
"correct": [
0,
1,
2
],
"why": [
"Correct : minAvailable et maxUnavailable sont mutuellement exclusifs, on en choisit un seul.",
"Correct : les PDB ne contraignent que les perturbations volontaires ; les involontaires ne sont pas empêchées (mais comptent dans le budget).",
"Correct : drain passe par l'API Eviction qui vérifie le PDB ; une éviction qui le violerait est rejetée et le drain patiente.",
"Non : c'est l'inverse, les deux champs ne peuvent pas coexister dans un même PDB."
],
"explain": "Un PDB se définit avec soit minAvailable, soit maxUnavailable, jamais les deux. Il protège uniquement contre les perturbations volontaires (drain, mises à jour) via l'API Eviction que respecte kubectl drain ; les perturbations involontaires ne sont pas empêchées.",
"ref": "https://kubernetes.io/docs/concepts/workloads/pods/disruptions/#pod-disruption-budgets",
"en": {
"q": "Regarding a PodDisruptionBudget (PDB), which statements are correct? (multiple answers)",
"choices": [
"You cannot specify both minAvailable and maxUnavailable in the same PDB",
"A PDB does not protect against involuntary disruptions (hardware failure, out-of-resource eviction)",
"kubectl drain respects the PDB via the Eviction API and can be blocked if it would violate it",
"minAvailable and maxUnavailable must always be set together to be valid"
]
}
},
{
"id": "t5-w7",
"domain": "workloads",
"difficulty": "hard",
"q": "Un HPA cible 100m de CPU par Pod. Le Deployment tourne avec 3 réplicas et la valeur mesurée moyenne est de 200m par Pod. Combien de réplicas l'HPA vise-t-il selon l'algorithme ?",
"choices": [
"6",
"3",
"2",
"9"
],
"correct": [
0
],
"why": [
"Correct : desiredReplicas = ceil(3 x (200/100)) = ceil(6) = 6.",
"Non : 3 est le nombre actuel de réplicas, pas la cible calculée par le ratio de métriques.",
"Non : 2 serait le simple ratio 200/100 sans multiplier par le nombre courant de réplicas.",
"Non : 9 ne correspond à aucune application correcte de la formule."
],
"explain": "L'HPA applique desiredReplicas = ceil(currentReplicas x currentMetric / desiredMetric). Ici ceil(3 x 200/100) = ceil(6) = 6 réplicas. Le nombre courant de réplicas fait partie intégrante du calcul.",
"ref": "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#algorithm-details",
"en": {
"q": "An HPA targets 100m CPU per Pod. The Deployment runs with 3 replicas and the average measured value is 200m per Pod. How many replicas does the HPA aim for according to the algorithm?",
"choices": [
"6",
"3",
"2",
"9"
]
}
},
{
"id": "t5-w8",
"domain": "workloads",
"difficulty": "hard",
"q": "Dans la configuration spec.behavior d'un HPA, quelle est la valeur par défaut de la fenêtre de stabilisation (stabilizationWindowSeconds) pour le scaleDown ?",
"choices": [
"300 secondes",
"0 seconde",
"60 secondes",
"600 secondes"
],
"correct": [
0
],
"why": [
"Correct : la fenêtre de stabilisation par défaut du scaleDown est de 300 secondes.",
"Non : 0 seconde est la valeur par défaut du scaleUp, qui monte immédiatement.",
"Non : 60 secondes ne correspond pas à la valeur par défaut documentée.",
"Non : 600 secondes est la valeur de progressDeadlineSeconds d'un Deployment, sans rapport ici."
],
"explain": "Sous spec.behavior, la fenêtre de stabilisation par défaut vaut 300 s pour le scaleDown (pour éviter les oscillations à la baisse) et 0 s pour le scaleUp (montée immédiate). L'HPA choisit la plus haute recommandation sur cette fenêtre avant de réduire.",
"ref": "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#stabilization-window",
"en": {
"q": "In an HPA's spec.behavior configuration, what is the default value of the stabilization window (stabilizationWindowSeconds) for scaleDown?",
"choices": [
"300 seconds",
"0 seconds",
"60 seconds",
"600 seconds"
]
}
},
{
"id": "t5-n1",
"domain": "networking",
"difficulty": "easy",
"q": "Un Pod ne définit pas le champ spec.dnsPolicy. Quelle politique DNS s'applique par défaut ?",
"choices": [
"ClusterFirst",
"Default",
"None",
"ClusterFirstWithHostNet"
],
"correct": [
0
],
"why": [
"Correct : si dnsPolicy n'est pas précisé, c'est ClusterFirst qui est utilisé.",
"Piège : la valeur nommée Default n'est justement PAS la politique par défaut ; elle fait hériter la config DNS du nœud.",
"None impose de fournir toute la configuration via dnsConfig ; ce n'est pas le défaut.",
"ClusterFirstWithHostNet ne s'applique que si on le déclare explicitement, pour les Pods en hostNetwork."
],
"explain": "Quand spec.dnsPolicy est absent, Kubernetes applique ClusterFirst : toute requête ne correspondant pas au suffixe du domaine de cluster est transmise à un serveur amont. Attention, la valeur littérale Default n'est pas le défaut.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy",
"en": {
"q": "A Pod does not set spec.dnsPolicy. Which DNS policy applies by default?",
"choices": [
"ClusterFirst",
"Default",
"None",
"ClusterFirstWithHostNet"
]
}
},
{
"id": "t5-n2",
"domain": "networking",
"difficulty": "medium",
"q": "Vous voulez qu'un Pod ignore complètement la configuration DNS de l'environnement Kubernetes et fournisse lui-même ses serveurs de noms. Quelle dnsPolicy choisir et qu'est-ce qui devient obligatoire ?",
"choices": [
"dnsPolicy: None, et fournir toute la configuration via le champ dnsConfig",
"dnsPolicy: Default, qui vide automatiquement la configuration DNS",
"dnsPolicy: ClusterFirst, en laissant dnsConfig vide",
"dnsPolicy: ClusterFirstWithHostNet, obligatoire même hors hostNetwork"
],
"correct": [
0
],
"why": [
"Correct : None fait ignorer les réglages DNS du cluster ; toute la config doit alors être fournie via dnsConfig.",
"Faux : Default fait hériter la configuration DNS du nœud, elle ne la vide pas.",
"Faux : ClusterFirst utilise le DNS du cluster, ce n'est pas ignorer la config.",
"Faux : ClusterFirstWithHostNet est destiné aux Pods en hostNetwork."
],
"explain": "dnsPolicy: None indique au Pod d'ignorer les réglages DNS de l'environnement Kubernetes. Dans ce cas, tous les paramètres DNS doivent être fournis par le champ dnsConfig du spec du Pod.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy",
"en": {
"q": "You want a Pod to fully ignore the Kubernetes environment DNS settings and provide its own nameservers. Which dnsPolicy do you choose and what becomes mandatory?",
"choices": [
"dnsPolicy: None, and provide all configuration via the dnsConfig field",
"dnsPolicy: Default, which automatically clears the DNS configuration",
"dnsPolicy: ClusterFirst, leaving dnsConfig empty",
"dnsPolicy: ClusterFirstWithHostNet, mandatory even without hostNetwork"
]
}
},
{
"id": "t5-n3",
"domain": "networking",
"difficulty": "medium",
"q": "Un Pod tourne avec hostNetwork: true et doit continuer à résoudre les noms de services du cluster. Que faut-il configurer ?",
"choices": [
"dnsPolicy: ClusterFirstWithHostNet",
"Rien : ClusterFirst fonctionne à l'identique avec hostNetwork",
"dnsPolicy: None sans dnsConfig",
"hostAliases pour chaque service du cluster"
],
"correct": [
0
],
"why": [
"Correct : pour un Pod en hostNetwork, il faut positionner explicitement ClusterFirstWithHostNet.",
"Faux : un Pod en hostNetwork avec ClusterFirst retombe sur le comportement de la politique Default.",
"Faux : None sans dnsConfig ne fournit aucune résolution.",
"Faux : hostAliases ne remplace pas le DNS du cluster et n'est pas maintenable ici."
],
"explain": "Pour les Pods qui utilisent hostNetwork, il faut définir explicitement dnsPolicy: ClusterFirstWithHostNet. Sinon, un Pod en hostNetwork avec ClusterFirst se comporte comme avec la politique Default (résolution héritée du nœud). Non supporté sous Windows.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy",
"en": {
"q": "A Pod runs with hostNetwork: true and must still resolve cluster service names. What must you configure?",
"choices": [
"dnsPolicy: ClusterFirstWithHostNet",
"Nothing: ClusterFirst behaves identically with hostNetwork",
"dnsPolicy: None without dnsConfig",
"hostAliases for every cluster service"
]
}
},
{
"id": "t5-n4",
"domain": "networking",
"difficulty": "medium",
"q": "Dans le dnsConfig d'un Pod, comment exprime-t-on l'option ndots:2 ?",
"choices": [
"Dans options, un objet avec name: ndots et value: '2'",
"Dans nameservers, une entrée ndots=2",
"Dans searches, une entrée ndots.2",
"Directement via un champ spec.ndots: 2"
],
"correct": [
0
],
"why": [
"Correct : options est une liste d'objets ayant chacun une propriété name et éventuellement value (ex. ndots).",
"Faux : nameservers ne contient que des adresses IP de serveurs DNS.",
"Faux : searches ne contient que des domaines de recherche.",
"Faux : il n'existe pas de champ spec.ndots dédié."
],
"explain": "Le champ dnsConfig.options est une liste d'objets où chaque objet peut avoir une propriété name et une propriété value. Une option ndots s'écrit donc name: ndots avec value: '2'. nameservers liste des IP de serveurs DNS et searches des domaines de recherche.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config",
"en": {
"q": "In a Pod's dnsConfig, how do you express the option ndots:2?",
"choices": [
"In options, an object with name: ndots and value: '2'",
"In nameservers, an entry ndots=2",
"In searches, an entry ndots.2",
"Directly via a spec.ndots: 2 field"
]
}
},
{
"id": "t5-n5",
"domain": "networking",
"difficulty": "hard",
"q": "Un Pod a spec.hostname: foo et spec.subdomain: bar dans le namespace my-namespace. Quelle condition permet d'obtenir un enregistrement DNS A/AAAA pour le FQDN foo.bar.my-namespace.svc.cluster.local ?",
"choices": [
"Il faut un Service headless nommé bar (identique au subdomain) dans le même namespace",
"Il suffit de définir subdomain ; hostname est facultatif pour l'enregistrement du Pod",
"Il faut un Service ClusterIP classique nommé foo",
"Aucune ressource supplémentaire : le FQDN du Pod est toujours résolu"
],
"correct": [
0
],
"why": [
"Correct : s'il existe un Service headless de même nom que le subdomain dans le même namespace, le DNS renvoie les A/AAAA du FQDN du Pod.",
"Faux : sans hostname, aucun A/AAAA n'est créé pour le Pod ; seul l'enregistrement du Service headless existe.",
"Faux : il faut un Service headless (clusterIP: None) portant le nom du subdomain, pas un ClusterIP nommé comme le hostname.",
"Faux : sans Service headless correspondant, le FQDN du Pod n'est pas résolu."
],
"explain": "Le FQDN d'un Pod se construit à partir de hostname et subdomain. Pour que le DNS retourne des A/AAAA pointant vers ce FQDN, il faut qu'un Service headless portant le même nom que le subdomain existe dans le même namespace. Sans hostname, aucun enregistrement A/AAAA n'est créé pour le Pod lui-même.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-hostname-and-subdomain-field",
"en": {
"q": "A Pod has spec.hostname: foo and spec.subdomain: bar in namespace my-namespace. What condition allows getting an A/AAAA DNS record for the FQDN foo.bar.my-namespace.svc.cluster.local?",
"choices": [
"A headless Service named bar (same as the subdomain) must exist in the same namespace",
"Setting subdomain is enough; hostname is optional for the Pod record",
"A regular ClusterIP Service named foo is required",
"No extra resource: a Pod's FQDN is always resolved"
]
}
},
{
"id": "t5-n6",
"domain": "networking",
"difficulty": "easy",
"q": "Quelle est la façon recommandée d'ajouter des entrées personnalisées dans le fichier /etc/hosts d'un Pod ?",
"choices": [
"Le champ spec.hostAliases (avec ip et hostnames)",
"Un init container qui édite /etc/hosts directement",
"Le champ spec.dnsConfig.searches",
"Une NetworkPolicy en egress"
],
"correct": [
0
],
"why": [
"Correct : hostAliases (ip + liste hostnames) ajoute des entrées au /etc/hosts du Pod ; c'est la méthode recommandée.",
"Faux : le projet Kubernetes recommande hostAliases plutôt que d'éditer /etc/hosts via un init container.",
"Faux : searches concerne les domaines de recherche DNS, pas /etc/hosts.",
"Faux : une NetworkPolicy filtre le trafic, elle ne modifie pas /etc/hosts."
],
"explain": "Le champ hostAliases du spec du Pod permet un override au niveau du Pod de la résolution de noms en ajoutant des entrées au /etc/hosts. Chaque entrée associe une ip à une liste de hostnames. C'est la méthode recommandée plutôt que d'éditer le fichier directement.",
"ref": "https://kubernetes.io/docs/tasks/network/customize-hosts-file-for-pods/#adding-additional-entries-with-hostaliases",
"en": {
"q": "What is the recommended way to add custom entries to a Pod's /etc/hosts file?",
"choices": [
"The spec.hostAliases field (with ip and hostnames)",
"An init container that edits /etc/hosts directly",
"The spec.dnsConfig.searches field",
"An egress NetworkPolicy"
]
}
},
{
"id": "t5-n7",
"domain": "networking",
"difficulty": "medium",
"q": "À propos de spec.ipFamilyPolicy d'un Service, quelles affirmations sont exactes ?",
"choices": [
"Sans réglage explicite, un Service est créé en SingleStack",
"RequireDualStack échoue à la création si le dual-stack n'est pas activé/supporté",
"PreferDualStack retombe en single-stack si le dual-stack n'est pas disponible",
"SingleStack alloue toujours à la fois une IP IPv4 et une IPv6"
],
"correct": [
0,
1,
2
],
"why": [
"Correct : à la création sans ipFamilyPolicy explicite, Kubernetes met SingleStack.",
"Correct : RequireDualStack fait échouer la création de l'objet si le dual-stack n'est pas activé ou supporté.",
"Correct : PreferDualStack retombe sur le comportement single-stack si le dual-stack n'est pas activé/supporté.",
"Faux : SingleStack n'alloue qu'une seule clusterIP (première plage configurée), pas les deux familles."
],
"explain": "Par défaut un Service est SingleStack (une seule clusterIP). PreferDualStack alloue IPv4 et IPv6 si le dual-stack est activé, sinon retombe en single-stack. RequireDualStack exige le dual-stack : si absent ou non supporté, la création de l'objet Service échoue.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/dual-stack/#services",
"en": {
"q": "Regarding a Service's spec.ipFamilyPolicy, which statements are correct?",
"choices": [
"Without an explicit setting, a Service is created as SingleStack",
"RequireDualStack fails object creation if dual-stack is not enabled/supported",
"PreferDualStack falls back to single-stack if dual-stack is unavailable",
"SingleStack always allocates both an IPv4 and an IPv6 IP"
]
}
},
{
"id": "t5-n8",
"domain": "networking",
"difficulty": "hard",
"q": "Sur un Service dual-stack, à quoi sert l'ordre du tableau spec.ipFamilies (par ex. ['IPv6','IPv4']) ?",
"choices": [
"La première famille listée est utilisée pour le champ historique spec.clusterIP",
"Il fixe l'ordre de préférence DNS, sans effet sur clusterIP",
"Il n'a aucun effet : l'ordre est toujours IPv4 puis IPv6",
"Il détermine le protocole (TCP/UDP) du Service"
],
"correct": [
0
],
"why": [
"Correct : la première famille du tableau ipFamilies sert au champ legacy spec.clusterIP.",
"Faux : ipFamilies porte sur les familles d'adresses IP, pas sur un ordre de préférence DNS.",
"Faux : l'ordre est configurable (['IPv4','IPv6'] ou ['IPv6','IPv4']) et il compte.",
"Faux : ipFamilies ne concerne pas le protocole de transport."
],
"explain": "spec.ipFamilies peut valoir ['IPv4'], ['IPv6'], ['IPv4','IPv6'] ou ['IPv6','IPv4']. La première famille de la liste est celle utilisée pour le champ historique spec.clusterIP, ce qui détermine la famille d'adresse principale du Service.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/dual-stack/#services",
"en": {
"q": "On a dual-stack Service, what does the order of the spec.ipFamilies array (e.g. ['IPv6','IPv4']) control?",
"choices": [
"The first family listed is used for the legacy spec.clusterIP field",
"It sets DNS preference order, with no effect on clusterIP",
"It has no effect: the order is always IPv4 then IPv6",
"It determines the Service's protocol (TCP/UDP)"
]
}
},
{
"id": "t5-n9",
"domain": "networking",
"difficulty": "hard",
"q": "Avec l'annotation service.kubernetes.io/topology-mode: Auto, comment le contrôleur EndpointSlice répartit-il les endpoints entre zones via les hints ?",
"choices": [
"Proportionnellement aux cœurs CPU allouables des nœuds de chaque zone",
"En parts strictement égales entre toutes les zones",
"Selon la latence réseau mesurée entre zones",
"Selon le nombre de Pods déjà présents dans chaque zone"
],
"correct": [
0
],
"why": [
"Correct : le contrôleur alloue une part d'endpoints proportionnelle aux CPU allouables des nœuds de la zone.",
"Faux : la répartition est proportionnelle aux CPU, pas égale entre zones.",
"Faux : la latence n'est pas le critère utilisé par cette heuristique.",
"Faux : le critère est le CPU allouable par zone, pas le nombre de Pods."
],
"explain": "Avec topology-mode: Auto, le contrôleur EndpointSlice place des hints (forZones) sur les EndpointSlices. Il alloue à chaque zone une part d'endpoints proportionnelle au CPU allouable des nœuds de cette zone : une zone avec 2 cœurs reçoit deux fois plus d'endpoints qu'une zone à 1 cœur.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/topology-aware-routing/#endpointslice-controller",
"en": {
"q": "With the annotation service.kubernetes.io/topology-mode: Auto, how does the EndpointSlice controller distribute endpoints across zones via hints?",
"choices": [
"Proportionally to the allocatable CPU cores of nodes in each zone",
"In strictly equal shares across all zones",
"According to measured network latency between zones",
"According to the number of Pods already present in each zone"
]
}
},
{
"id": "t5-n10",
"domain": "networking",
"difficulty": "medium",
"q": "Dans une NetworkPolicy, vous voulez autoriser une plage de ports en TCP à l'aide de endPort. Quelles règles s'appliquent ?",
"choices": [
"port doit être défini, être un port numérique (pas nommé), et endPort doit être supérieur ou égal à port",
"endPort peut s'utiliser seul, sans définir port",
"port peut être un port nommé quand endPort est utilisé",
"endPort doit être strictement inférieur à port"
],
"correct": [
0
],
"why": [
"Correct : port est requis, doit être numérique (non nommé), et endPort doit être supérieur ou égal à port.",
"Faux : endPort exige que port soit défini.",
"Faux : avec endPort, port doit être un port numérique, pas un port nommé.",
"Faux : endPort doit être supérieur ou égal à port, jamais inférieur."
],
"explain": "Le champ endPort autorise la plage de ports allant de port à endPort incluse. Il impose que port soit défini et soit un port numérique (pas un nom de port), et endPort doit être supérieur ou égal à port. Le protocole par défaut est TCP.",
"ref": "https://kubernetes.io/docs/concepts/services-networking/network-policies/#targeting-a-range-of-ports",
"en": {
"q": "In a NetworkPolicy, you want to allow a range of TCP ports using endPort. Which rules apply?",
"choices": [
"port must be defined, be a numerical port (not named), and endPort must be greater than or equal to port",
"endPort can be used alone, without defining port",
"port may be a named port when endPort is used",
"endPort must be strictly lower than port"
]
}
},
{
"id": "t5-s1",
"domain": "storage",
"difficulty": "easy",
"q": "Un PersistentVolume dont le PVC associé vient d'être supprimé, mais dont la ressource n'a pas encore été récupérée par le cluster, se trouve dans quelle phase ?",
"choices": [
"Available",
"Bound",
"Released",
"Failed"
],
"correct": [
2
],
"why": [
"Available désigne un PV libre, disponible et pas encore lié à un PVC.",
"Bound désigne un PV actuellement lié à un PVC.",
"Correct : Released signifie que le PVC a été supprimé mais que la ressource n'est pas encore récupérée par le cluster.",
"Failed indique que la récupération automatique (reclaim) du volume a échoué."
],
"explain": "Un PV traverse quatre phases : Available (libre), Bound (lié à un PVC), Released (le PVC a été supprimé mais la ressource n'est pas encore récupérée) et Failed (échec de la récupération automatique). Après suppression du PVC, le PV passe donc en Released.",
"ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#phase",
"en": {
"q": "A PersistentVolume whose associated PVC has just been deleted, but whose resource has not yet been reclaimed by the cluster, is in which phase?",
"choices": [
"Available",
"Bound",
"Released",
"Failed"
]
}
},
{
"id": "t5-s2",
"domain": "storage",
"difficulty": "medium",
"q": "Dans le champ spec.dataSource d'un PVC, quels types (kind) sont acceptés pour pré-remplir le volume au moment de sa création ?",
"choices": [
"PersistentVolumeClaim (clone) et VolumeSnapshot (restauration depuis un snapshot)",
"ConfigMap et Secret",
"Pod et Deployment",
"StorageClass uniquement"
],
"correct": [
0
],
"why": [
"Correct : dataSource accepte un PersistentVolumeClaim (clone d'un PVC existant) ou un VolumeSnapshot (restauration depuis un snapshot).",
"ConfigMap et Secret ne sont pas des sources de données pour un PVC.",
"Pod et Deployment sont des workloads, pas des sources de volume.",
"La StorageClass définit le provisionnement, elle n'est pas une dataSource."
],
"explain": "Le champ dataSource permet de pré-remplir un nouveau PVC. Les deux kinds pris en charge sont PersistentVolumeClaim (pour cloner un volume existant) et VolumeSnapshot (pour restaurer depuis un instantané). Le champ dataSourceRef, plus récent et extensible, gère en plus les volume populators.",
"ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#data-sources",
"en": {
"q": "In a PVC's spec.dataSource field, which kinds are accepted to pre-populate the volume at creation time?",
"choices": [
"PersistentVolumeClaim (clone) and VolumeSnapshot (restore from a snapshot)",
"ConfigMap and Secret",
"Pod and Deployment",
"StorageClass only"
]
}
},
{
"id": "t5-s3",
"domain": "storage",
"difficulty": "medium",
"q": "Dans un volume downwardAPI, comment exposer respectivement les labels du Pod et la limite CPU d'un conteneur ?",
"choices": [
"fieldRef avec fieldPath metadata.labels pour les labels ; resourceFieldRef avec resource limits.cpu et containerName pour la limite CPU",
"resourceFieldRef pour les deux valeurs",
"fieldRef pour les deux valeurs",
"valueFrom.secretKeyRef dans les deux cas"
],
"correct": [
0
],
"why": [
"Correct : fieldRef expose des champs du Pod (ex. metadata.labels) et resourceFieldRef expose des ressources d'un conteneur (ex. limits.cpu), en précisant containerName.",
"resourceFieldRef ne sait pas lire les labels du Pod ; ceux-ci passent par fieldRef.",
"fieldRef ne peut pas lire les ressources d'un conteneur ; il faut resourceFieldRef.",
"secretKeyRef sert aux variables d'environnement issues de Secrets, pas au volume downwardAPI."
],
"explain": "Le volume downwardAPI utilise fieldRef (avec fieldPath, ex. metadata.labels, metadata.annotations, metadata.name, metadata.namespace) pour les champs du Pod, et resourceFieldRef (avec containerName et resource, ex. limits.cpu, requests.memory) pour les ressources d'un conteneur. Chaque entrée items définit le path du fichier projeté.",
"ref": "https://kubernetes.io/docs/concepts/storage/projected-volumes/",
"en": {
"q": "In a downwardAPI volume, how do you expose the Pod's labels and a container's CPU limit respectively?",
"choices": [
"fieldRef with fieldPath metadata.labels for the labels; resourceFieldRef with resource limits.cpu and containerName for the CPU limit",
"resourceFieldRef for both values",
"fieldRef for both values",
"valueFrom.secretKeyRef in both cases"
]
}
},
{
"id": "t5-s4",
"domain": "storage",
"difficulty": "medium",
"q": "Dans un volume configMap ou secret, à quoi sert le tableau items ?",
"choices": [
"Projeter seulement certaines clés vers des chemins de fichiers choisis (clé key vers chemin path), avec un mode de permission facultatif par entrée",
"Définir la taille maximale du volume",
"Lister les Pods autorisés à monter le volume",
"Fixer la StorageClass utilisée"
],
"correct": [
0
],
"why": [
"Correct : items permet de sélectionner des clés précises et de les projeter vers des chemins donnés (key vers path), avec un champ mode optionnel par entrée.",
"La taille n'est pas gérée par items ; un configMap/secret n'a pas de champ de capacité de ce type.",
"items ne contrôle pas quels Pods montent le volume.",
"La StorageClass concerne les PVC provisionnés dynamiquement, pas un volume configMap/secret."
],
"explain": "Sans items, toutes les clés du ConfigMap/Secret deviennent des fichiers portant le nom de la clé. Avec items, on choisit les clés à exposer et le chemin (path) de chaque fichier ; un champ mode peut fixer les permissions par entrée, tandis que defaultMode s'applique globalement.",
"ref": "https://kubernetes.io/docs/concepts/storage/volumes/#configmap",
"en": {
"q": "In a configMap or secret volume, what is the items array used for?",
"choices": [
"To project only specific keys to chosen file paths (key to path), with an optional permission mode per entry",
"To define the volume's maximum size",
"To list the Pods allowed to mount the volume",
"To set the StorageClass used"
]
}
},
{
"id": "t5-s5",
"domain": "storage",
"difficulty": "hard",
"q": "Dans une StorageClass, à quoi sert le champ allowedTopologies avec matchLabelExpressions ?",
"choices": [
"Restreindre le provisionnement des volumes à des topologies précises (ex. certaines zones) via une clé (key) et une liste de valeurs (values)",
"Autoriser le redimensionnement des volumes existants",
"Définir la politique de récupération (reclaimPolicy) du volume",
"Choisir le mode de liaison volumeBindingMode"
],
"correct": [
0
],
"why": [
"Correct : allowedTopologies limite les topologies de provisionnement ; chaque matchLabelExpressions porte une key (ex. topology.kubernetes.io/zone) et une liste de values autorisées.",
"L'expansion est contrôlée par allowVolumeExpansion, pas par allowedTopologies.",
"La récupération est gérée par reclaimPolicy, un champ distinct.",
"Le mode de liaison est réglé par volumeBindingMode, indépendant d'allowedTopologies."
],
"explain": "allowedTopologies contraint les zones/régions où le provisionneur peut créer un volume. Il se structure en matchLabelExpressions, chacune avec une key de topologie (ex. topology.kubernetes.io/zone) et une liste de values acceptées. C'est utile pour cantonner les volumes à des zones données.",
"ref": "https://kubernetes.io/docs/concepts/storage/storage-classes/#allowed-topologies",
"en": {
"q": "In a StorageClass, what is the allowedTopologies field with matchLabelExpressions used for?",
"choices": [
"To restrict volume provisioning to specific topologies (e.g. certain zones) via a key and a list of values",
"To allow resizing of existing volumes",
"To define the volume's reclaimPolicy",
"To choose the volumeBindingMode"
]
}
},
{
"id": "t5-s6",
"domain": "storage",
"difficulty": "hard",
"q": "Après avoir augmenté spec.resources.requests.storage d'un PVC, la condition FileSystemResizePending apparaît sur le PVC. Que signifie-t-elle, et qu'est-ce qui reste toujours vrai ?",
"choices": [
"Le volume sous-jacent a été agrandi mais le système de fichiers doit encore être redimensionné ; par ailleurs on ne peut jamais réduire (shrink) un PVC",
"Le PVC a été réduit avec succès à une taille inférieure",
"L'expansion a échoué et le PVC est revenu à sa taille d'origine",
"Il faut obligatoirement recréer le PVC car l'expansion d'un volume monté est impossible"
],
"correct": [
0
],
"why": [
"Correct : FileSystemResizePending indique que le volume sous-jacent est agrandi mais que le système de fichiers reste à redimensionner ; et la réduction d'un PVC n'est pas autorisée, seule l'expansion l'est.",
"La réduction de taille d'un PVC n'est pas prise en charge.",
"La condition ne signale pas un échec ni un retour arrière : l'agrandissement du volume a réussi, seule l'étape système de fichiers reste.",
"L'expansion en ligne (volume monté) est possible selon le plugin ; recréer le PVC n'est pas requis."
],
"explain": "On agrandit un PVC en éditant spec.resources.requests.storage (la StorageClass doit permettre l'expansion). La condition FileSystemResizePending signifie que le volume sous-jacent a été étendu mais que le système de fichiers doit encore être redimensionné, souvent en ligne au prochain (re)démarrage ou pendant l'utilisation selon le plugin. La réduction de taille n'est jamais possible.",
"ref": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#expanding-persistent-volumes-claims",
"en": {
"q": "After increasing a PVC's spec.resources.requests.storage, the FileSystemResizePending condition appears on the PVC. What does it mean, and what always remains true?",
"choices": [
"The underlying volume has been expanded but the file system still needs to be resized; also, you can never shrink a PVC",
"The PVC was successfully shrunk to a smaller size",
"The expansion failed and the PVC reverted to its original size",
"You must recreate the PVC because expanding a mounted volume is impossible"
]
}
},
{
"id": "t5-t1",
"domain": "troubleshooting",
"difficulty": "easy",
"q": "Sur un cluster récent, quels endpoints de santé de l'API server remplacent /healthz, désormais déprécié ?",
"choices": [
"/livez et /readyz",
"/metrics et /status",
"/alive et /ready",
"/health et /ping"
],
"correct": [
0
],
"why": [
"Correct : depuis la v1.16, /healthz est déprécié au profit de /livez (liveness) et /readyz (readiness).",
"Non : /metrics expose des métriques, pas l'état de santé ; /status n'est pas un endpoint de santé.",
"Non : ces chemins n'existent pas sur l'API server.",
"Non : ces chemins n'existent pas ; les endpoints réels sont /livez et /readyz."
],
"explain": "L'endpoint /healthz de l'API server est déprécié depuis Kubernetes v1.16. On utilise désormais /livez pour savoir si l'API server doit être redémarré, et /readyz pour savoir s'il est prêt à recevoir du trafic.",
"ref": "https://kubernetes.io/docs/reference/using-api/health-checks/",
"en": {
"q": "On a recent cluster, which API server health endpoints replace the now-deprecated /healthz ?",
"choices": [
"/livez and /readyz",
"/metrics and /status",
"/alive and /ready",
"/health and /ping"
]
}
},
{
"id": "t5-t2",
"domain": "troubleshooting",
"difficulty": "easy",
"q": "Quelle commande kubeadm renouvelle tous les certificats du plan de contrôle gérés par kubeadm ?",
"choices": [
"kubeadm certs renew all",
"kubeadm certs refresh",
"kubeadm renew certificates",
"kubeadm certs rotate --all"
],
"correct": [
0
],
"why": [
"Correct : kubeadm certs renew all renouvelle l'ensemble des certificats gérés par kubeadm.",
"Non : refresh n'est pas une sous-commande kubeadm certs.",
"Non : cette syntaxe n'existe pas.",
"Non : rotate --all n'est pas une commande kubeadm."
],
"explain": "kubeadm certs renew all renouvelle tous les certificats du plan de contrôle stockés dans /etc/kubernetes/pki. kubeadm ne peut pas gérer les certificats signés par une CA externe. Le renouvellement se fait aussi automatiquement lors d'un kubeadm upgrade.",
"ref": "https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/",
"en": {
"q": "Which kubeadm command renews all the control-plane certificates managed by kubeadm ?",
"choices": [
"kubeadm certs renew all",
"kubeadm certs refresh",
"kubeadm renew certificates",
"kubeadm certs rotate --all"
]
}
},
{
"id": "t5-t3",
"domain": "troubleshooting",
"difficulty": "easy",
"q": "Un Pod affiche le statut Init:1/2. Que signifie-t-il ?",
"choices": [
"Le Pod a 2 init containers et 1 s'est terminé avec succès jusqu'ici",
"Le Pod a redémarré 1 fois sur 2 tentatives autorisées",
"1 conteneur applicatif sur 2 est prêt",
"L'init container 1 a échoué après 2 essais"
],
"correct": [
0
],
"why": [
"Correct : Init:N/M signifie que le Pod a M init containers et que N se sont terminés.",
"Non : ce compteur ne concerne pas les redémarrages.",
"Non : il concerne les init containers, pas les conteneurs applicatifs ni la readiness.",
"Non : un échec s'afficherait comme Init:Error ou Init:CrashLoopBackOff."
],
"explain": "Dans le statut d'un Pod, Init:N/M indique que le Pod possède M init containers et que N d'entre eux se sont déjà terminés avec succès. Les init containers s'exécutent séquentiellement, dans l'ordre, jusqu'à complétion avant les conteneurs applicatifs.",
"ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-init-containers/",
"en": {
"q": "A Pod shows the status Init:1/2. What does it mean ?",
"choices": [
"The Pod has 2 init containers and 1 has completed so far",
"The Pod has restarted 1 out of 2 allowed times",
"1 of 2 application containers is ready",
"Init container 1 failed after 2 attempts"
]
}
},
{
"id": "t5-t4",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Quelle est la différence entre les endpoints /livez et /readyz de l'API server ?",
"choices": [
"/livez indique s'il faut redémarrer l'API server ; /readyz indique s'il est prêt à recevoir du trafic",
"/livez concerne les nœuds ; /readyz concerne les Pods",
"/livez renvoie les métriques ; /readyz renvoie les logs",
"Les deux sont strictement équivalents, seul le nom change"
],
"correct": [
0
],
"why": [
"Correct : un échec de /livez signale un état non récupérable (redémarrage) ; /readyz indique la disponibilité pour le trafic.",
"Non : ces endpoints concernent l'API server lui-même, pas les nœuds ou les Pods.",
"Non : ni l'un ni l'autre ne renvoie de métriques ou de logs.",
"Non : ils ont des rôles distincts (liveness vs readiness)."
],
"explain": "/livez (liveness) sert à décider si l'API server doit être redémarré : un échec traduit un état non récupérable comme un deadlock. /readyz (readiness) indique si l'API server est prêt à servir le trafic ; un échec peut signifier qu'il attend encore etcd. On route le trafic ailleurs plutôt que de redémarrer.",
"ref": "https://kubernetes.io/docs/reference/using-api/health-checks/",
"en": {
"q": "What is the difference between the API server /livez and /readyz endpoints ?",
"choices": [
"/livez tells whether the API server should be restarted ; /readyz tells whether it is ready to serve traffic",
"/livez is about nodes ; /readyz is about Pods",
"/livez returns metrics ; /readyz returns logs",
"They are strictly equivalent, only the name differs"
]
}
},
{
"id": "t5-t5",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Dans la sortie de kubeadm certs check-expiration, quelle colonne indique si un certificat est géré en dehors de kubeadm ?",
"choices": [
"EXTERNALLY MANAGED",
"RESIDUAL TIME",
"CERTIFICATE AUTHORITY",
"EXPIRES"
],
"correct": [
0
],
"why": [
"Correct : la colonne EXTERNALLY MANAGED (yes/no) indique si le certificat est géré hors kubeadm.",
"Non : RESIDUAL TIME donne le temps restant avant expiration.",
"Non : CERTIFICATE AUTHORITY indique la CA signataire.",
"Non : EXPIRES donne la date et l'heure d'expiration."
],
"explain": "kubeadm certs check-expiration liste chaque certificat avec les colonnes EXPIRES (date d'expiration), RESIDUAL TIME (temps restant), CERTIFICATE AUTHORITY (CA signataire) et EXTERNALLY MANAGED (yes/no) qui signale les certificats gérés par une CA externe, que kubeadm ne peut pas renouveler.",
"ref": "https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/",
"en": {
"q": "In the output of kubeadm certs check-expiration, which column indicates whether a certificate is managed outside of kubeadm ?",
"choices": [
"EXTERNALLY MANAGED",
"RESIDUAL TIME",
"CERTIFICATE AUTHORITY",
"EXPIRES"
]
}
},
{
"id": "t5-t6",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Quelle commande liste toutes les actions que l'utilisateur courant est autorisé à effectuer dans un namespace ?",
"choices": [
"kubectl auth can-i --list",
"kubectl auth whoami --verbose",
"kubectl get rbac --me",
"kubectl auth can-i show all"
],
"correct": [
0
],
"why": [
"Correct : kubectl auth can-i --list énumère toutes les actions autorisées pour l'utilisateur.",
"Non : whoami affiche l'identité, pas la liste des permissions.",
"Non : rbac n'est pas une ressource interrogeable ainsi et --me n'existe pas.",
"Non : cette syntaxe n'existe pas."
],
"explain": "kubectl auth can-i vérifie les autorisations. Avec --list, il énumère toutes les actions (verbes sur ressources) que l'utilisateur courant peut effectuer, ce qui est pratique pour déboguer une configuration RBAC. On peut restreindre au besoin avec --namespace.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#checking-api-access",
"en": {
"q": "Which command lists all actions the current user is allowed to perform in a namespace ?",
"choices": [
"kubectl auth can-i --list",
"kubectl auth whoami --verbose",
"kubectl get rbac --me",
"kubectl auth can-i show all"
]
}
},
{
"id": "t5-t7",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Comment consulter les logs d'un init container nommé init-myservice dans le Pod myapp-pod ?",
"choices": [
"kubectl logs myapp-pod -c init-myservice",
"kubectl logs myapp-pod --init init-myservice",
"kubectl describe init myapp-pod/init-myservice",
"kubectl logs init-myservice"
],
"correct": [
0
],
"why": [
"Correct : l'option -c cible un conteneur précis, y compris un init container.",
"Non : --init n'est pas une option de kubectl logs.",
"Non : describe init n'est pas une commande valide.",
"Non : il faut nommer le Pod et cibler le conteneur avec -c."
],
"explain": "On accède aux logs d'un init container précis avec kubectl logs <pod> -c <init-container>. Pour diagnostiquer un init container qui échoue (Init:Error ou Init:CrashLoopBackOff), kubectl describe pod montre en plus l'état, le code de sortie et le nombre de redémarrages dans la section Init Containers.",
"ref": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-init-containers/",
"en": {
"q": "How do you view the logs of an init container named init-myservice in the Pod myapp-pod ?",
"choices": [
"kubectl logs myapp-pod -c init-myservice",
"kubectl logs myapp-pod --init init-myservice",
"kubectl describe init myapp-pod/init-myservice",
"kubectl logs init-myservice"
]
}
},
{
"id": "t5-t8",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Depuis un Pod de test (dnsutils), quelle commande teste en premier la résolution DNS interne du cluster ?",
"choices": [
"kubectl exec -i -t dnsutils -- nslookup kubernetes.default",
"kubectl exec -i -t dnsutils -- ping coredns",
"kubectl exec -i -t dnsutils -- curl kube-dns",
"kubectl dns test kubernetes.default"
],
"correct": [
0
],
"why": [
"Correct : nslookup kubernetes.default vérifie la résolution du Service kubernetes du namespace default.",
"Non : ping coredns ne teste pas la résolution du Service kube-dns et coredns n'est pas un nom résoluble.",
"Non : curl kube-dns ne constitue pas un test DNS canonique.",
"Non : kubectl dns test n'existe pas."
],
"explain": "Le premier test consiste à lancer nslookup kubernetes.default depuis un Pod dnsutils : la réponse doit renvoyer l'IP du Service kubernetes. En cas d'échec, on vérifie que les Pods CoreDNS tournent (kubectl get pods -n kube-system -l k8s-app=kube-dns) et que le Service kube-dns existe dans kube-system.",
"ref": "https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/",
"en": {
"q": "From a test Pod (dnsutils), which command first tests the cluster's internal DNS resolution ?",
"choices": [
"kubectl exec -i -t dnsutils -- nslookup kubernetes.default",
"kubectl exec -i -t dnsutils -- ping coredns",
"kubectl exec -i -t dnsutils -- curl kube-dns",
"kubectl dns test kubernetes.default"
]
}
},
{
"id": "t5-t9",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Un Pod reste en Pending. kubectl describe pod affiche un événement FailedScheduling avec la raison 'Insufficient cpu'. Que faut-il en conclure ?",
"choices": [
"Aucun nœud n'a assez de CPU allouable pour satisfaire les requests du Pod",
"Le conteneur consomme trop de CPU à l'exécution et est throttlé",
"Le kubelet du Pod est en panne",
"L'image du Pod est trop volumineuse à télécharger"
],
"correct": [
0
],
"why": [
"Correct : le scheduler ne trouve aucun nœud dont le CPU allouable couvre les requests demandées.",
"Non : le throttling à l'exécution n'empêche pas la planification et ne produit pas FailedScheduling.",
"Non : un Pod Pending n'est pas encore assigné à un kubelet.",
"Non : un problème d'image donnerait plutôt ImagePullBackOff, pas FailedScheduling."
],
"explain": "Un événement FailedScheduling remonté par kubectl describe pod indique que le scheduler n'a pu placer le Pod sur aucun nœud. 'Insufficient cpu' signifie que les requests CPU du Pod dépassent le CPU allouable restant sur tous les nœuds. D'autres raisons fréquentes : taints non tolérées ou aucun nœud disponible.",
"ref": "https://kubernetes.io/docs/tasks/debug/debug-application/",
"en": {
"q": "A Pod stays Pending. kubectl describe pod shows a FailedScheduling event with reason 'Insufficient cpu'. What should you conclude ?",
"choices": [
"No node has enough allocatable CPU to satisfy the Pod's requests",
"The container uses too much CPU at runtime and is throttled",
"The Pod's kubelet is down",
"The Pod's image is too large to pull"
]
}
},
{
"id": "t5-t10",
"domain": "troubleshooting",
"difficulty": "medium",
"q": "Comment interroger à distance, via kubectl, le détail des vérifications de readiness de l'API server ?",
"choices": [
"kubectl get --raw='/readyz?verbose'",
"kubectl readyz --verbose",
"kubectl get healthz -o wide",
"kubectl describe apiserver readyz"
],
"correct": [
0
],
"why": [
"Correct : kubectl get --raw permet d'accéder directement au chemin /readyz?verbose de l'API.",
"Non : readyz n'est pas une sous-commande kubectl.",
"Non : healthz n'est pas une ressource récupérable ainsi.",
"Non : apiserver n'est pas un objet describable."
],
"explain": "kubectl get --raw='/readyz?verbose' accède directement à l'endpoint de readiness de l'API server et renvoie le détail de chaque check (lignes [+]<check> ok). Le paramètre ?verbose fonctionne aussi sur /livez et /healthz pour lister les vérifications individuelles.",
"ref": "https://kubernetes.io/docs/reference/using-api/health-checks/",
"en": {
"q": "How do you remotely query, via kubectl, the detailed readiness checks of the API server ?",
"choices": [
"kubectl get --raw='/readyz?verbose'",
"kubectl readyz --verbose",
"kubectl get healthz -o wide",
"kubectl describe apiserver readyz"
]
}
},
{
"id": "t5-t11",
"domain": "troubleshooting",
"difficulty": "hard",
"q": "Le check etcd de /readyz échoue temporairement. Comment obtenir un /readyz qui ignore ce check tout en affichant le détail des vérifications ?",
"choices": [
"curl -k 'https://localhost:6443/readyz?verbose&exclude=etcd'",
"curl -k 'https://localhost:6443/readyz?skip=etcd'",
"curl -k 'https://localhost:6443/readyz?disable=etcd'",
"curl -k 'https://localhost:6443/readyz?verbose=etcd'"
],
"correct": [
0
],
"why": [
"Correct : le paramètre exclude=<check> exclut un check, combinable avec verbose ; le check apparaît alors comme 'excluded: ok'.",
"Non : skip n'est pas le paramètre reconnu.",
"Non : disable n'est pas le paramètre reconnu.",
"Non : verbose ne prend pas de valeur ; il active le détail, il n'exclut rien."
],
"explain": "Le paramètre de requête exclude=<nom-du-check> retire un check de l'évaluation de /readyz (ou /livez), utile quand une dépendance comme etcd est temporairement indisponible. Combiné à ?verbose, le check exclu s'affiche sous la forme [+]etcd excluded: ok.",
"ref": "https://kubernetes.io/docs/reference/using-api/health-checks/",
"en": {
"q": "The etcd check of /readyz is failing temporarily. How do you get a /readyz that ignores that check while still showing the detailed checks ?",
"choices": [
"curl -k 'https://localhost:6443/readyz?verbose&exclude=etcd'",
"curl -k 'https://localhost:6443/readyz?skip=etcd'",
"curl -k 'https://localhost:6443/readyz?disable=etcd'",
"curl -k 'https://localhost:6443/readyz?verbose=etcd'"
]
}
},
{
"id": "t5-t12",
"domain": "troubleshooting",
"difficulty": "hard",
"q": "Pourquoi kubelet.conf n'apparaît-il pas dans la sortie de kubeadm certs check-expiration ?",
"choices": [
"Parce que kubeadm configure le kubelet pour le renouvellement automatique de son certificat, avec des certificats renouvelables sous /var/lib/kubelet/pki",
"Parce que le kubelet n'utilise aucun certificat",
"Parce que kubelet.conf est stocké dans etcd et non sur disque",
"Parce que ce certificat n'expire jamais"
],
"correct": [
0
],
"why": [
"Correct : kubeadm active la rotation automatique du certificat kubelet, stocké sous /var/lib/kubelet/pki, donc il n'est pas listé.",
"Non : le kubelet utilise bien un certificat client pour s'authentifier auprès de l'API server.",
"Non : les certificats sont sur disque, pas dans etcd.",
"Non : le certificat expire mais est renouvelé automatiquement."
],
"explain": "kubeadm certs check-expiration ne liste pas kubelet.conf car kubeadm configure le kubelet pour la rotation automatique de son certificat client, avec des certificats renouvelables sous /var/lib/kubelet/pki. Les autres certificats du plan de contrôle, eux, se renouvellent lors d'un kubeadm upgrade ou via kubeadm certs renew.",
"ref": "https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/",
"en": {
"q": "Why does kubelet.conf not appear in the output of kubeadm certs check-expiration ?",
"choices": [
"Because kubeadm configures the kubelet for automatic certificate renewal, with rotatable certificates under /var/lib/kubelet/pki",
"Because the kubelet uses no certificate at all",
"Because kubelet.conf is stored in etcd and not on disk",
"Because that certificate never expires"
]
}
},
{
"id": "t5-t13",
"domain": "troubleshooting",
"difficulty": "hard",
"q": "Le Node Problem Detector remonte les problèmes d'un nœud à l'API server. Comment distingue-t-il un problème permanent d'un problème temporaire ?",
"choices": [
"Un problème permanent est remonté comme NodeCondition ; un problème temporaire comme Event",
"Un problème permanent comme Event ; un problème temporaire comme NodeCondition",
"Les deux sont uniquement écrits dans les logs du kubelet",
"Il ne remonte rien à l'API server, seulement à Prometheus"
],
"correct": [
0
],
"why": [
"Correct : les problèmes permanents deviennent des NodeConditions, les temporaires des Events.",
"Non : c'est l'inverse ; permanent = NodeCondition, temporaire = Event.",
"Non : le Node Problem Detector remonte bien à l'API server via son exporter Kubernetes.",
"Non : l'exporter Prometheus est optionnel ; l'exporter Kubernetes remonte à l'API server."
],
"explain": "Le Node Problem Detector est un daemon (souvent déployé en DaemonSet) qui surveille la santé du nœud et remonte les problèmes à l'API server : les problèmes permanents apparaissent comme NodeConditions et les problèmes temporaires comme Events.",
"ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/monitor-node-health/",
"en": {
"q": "The Node Problem Detector reports a node's problems to the API server. How does it distinguish a permanent problem from a temporary one ?",
"choices": [
"A permanent problem is reported as a NodeCondition ; a temporary one as an Event",
"A permanent problem as an Event ; a temporary one as a NodeCondition",
"Both are only written to the kubelet logs",
"It reports nothing to the API server, only to Prometheus"
]
}
},
{
"id": "t5-t14",
"domain": "troubleshooting",
"difficulty": "hard",
"q": "Vous soupçonnez que l'utilisateur 'dave' n'a pas le droit de lister les secrets du namespace dev. Comment le vérifier sans vous connecter en tant que dave ?",
"choices": [
"kubectl auth can-i list secrets --namespace dev --as dave",
"kubectl get secrets --namespace dev --user dave",
"kubectl auth can-i list secrets --impersonate dave",
"kubectl rbac check dave secrets dev"
],
"correct": [
0
],
"why": [
"Correct : --as réalise l'impersonation et can-i renvoie yes ou no pour l'action testée.",
"Non : --user sélectionne un contexte kubeconfig, il ne teste pas l'autorisation de dave.",
"Non : l'option d'impersonation de kubectl est --as, pas --impersonate.",
"Non : rbac check n'est pas une commande kubectl."
],
"explain": "kubectl auth can-i permet de tester une autorisation et renvoie yes ou no. Avec le flag global --as, on usurpe l'identité (impersonation) d'un autre utilisateur : kubectl auth can-i list secrets --namespace dev --as dave indique si dave a ce droit, sans avoir ses identifiants.",
"ref": "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#checking-api-access",
"en": {
"q": "You suspect user 'dave' cannot list secrets in the dev namespace. How do you verify this without logging in as dave ?",
"choices": [
"kubectl auth can-i list secrets --namespace dev --as dave",
"kubectl get secrets --namespace dev --user dave",
"kubectl auth can-i list secrets --impersonate dave",
"kubectl rbac check dave secrets dev"
]
}
}
];
  DATA.forEach((o) => Q.push(Object.assign({ type: "theory" }, o)));
  window.CKA._t5 = DATA.length;
})();
