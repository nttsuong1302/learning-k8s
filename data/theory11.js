// Lot 11 : +50 questions théoriques sourcées sur kubernetes.io (scan de la doc).
// Chaque question porte why[] par option, explain (synthèse) et ref (doc officielle),
// plus la traduction en:{q,choices}. Répartition par pondération CKA.
(function () {
  const Q = window.CKA.questions;
  const DATA = [
{
  "id": "t11-a1",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Dans un cluster HA monté avec kubeadm, à quoi sert le flag `--control-plane-endpoint` de `kubeadm init` ?",
  "choices": [
    "Il définit l'adresse ou le nom DNS et le port du load balancer servant de point d'accès stable partagé par tous les nœuds control-plane",
    "Il définit l'adresse IP du premier worker qui rejoindra le cluster",
    "Il configure l'endpoint de santé /healthz exposé par le kube-apiserver",
    "Il n'a d'effet que sur les clusters mono-nœud (single control-plane)"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « The --control-plane-endpoint flag should be set to the address or DNS and port of the load balancer », qui doit rester cohérent avec l'adresse réelle du load balancer.",
    "Faux : ce flag ne concerne pas l'identification d'un worker.",
    "Faux : il n'a aucun rapport avec l'endpoint /healthz.",
    "Faux : c'est justement pour les clusters HA multi-control-plane qu'il est nécessaire."
  ],
  "explain": "--control-plane-endpoint fournit un point d'accès stable (adresse ou DNS + port d'un load balancer) partagé par tous les nœuds control-plane d'un cluster HA, garantissant que les clients et composants du cluster utilisent toujours le même endpoint quel que soit le nœud control-plane actif.",
  "ref": "https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/",
  "en": {
    "q": "In an HA cluster set up with kubeadm, what is the `--control-plane-endpoint` flag of `kubeadm init` used for?",
    "choices": [
      "It sets the address or DNS name and port of the load balancer acting as a stable endpoint shared by all control-plane nodes",
      "It sets the IP address of the first worker that will join the cluster",
      "It configures the /healthz health endpoint exposed by the kube-apiserver",
      "It only has an effect on single-node (single control-plane) clusters"
    ]
  }
},
{
  "id": "t11-a10",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Avec l'API Priority and Fairness (APF) activée, que se passe-t-il pour une requête arrivant alors que sa limite de concurrence de niveau de priorité est déjà atteinte ?",
  "choices": [
    "Elle est immédiatement rejetée avec une erreur, sans exception",
    "Elle est mise en file d'attente (queuing) plutôt que rejetée, pour absorber les pics de charge brefs, et distribuée via une technique de fair queuing",
    "Elle est automatiquement reroutée vers un autre niveau de priorité disponible",
    "APF ignore la limite dans ce cas et laisse passer la requête sans contrôle"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est précisément ce qu'APF évite grâce à la mise en file d'attente.",
    "Vrai : la doc précise « It also introduces a limited amount of queuing, so that no requests are rejected in cases of very brief bursts » et que la distribution se fait « using a fair queuing technique ».",
    "Faux : la requête n'est pas reroutée vers un autre niveau de priorité, elle reste dans la file de son niveau assigné.",
    "Faux : la limite de concurrence reste appliquée, seule la stratégie de traitement (queue plutôt que rejet immédiat) change par rapport à l'absence d'APF."
  ],
  "explain": "Grâce à APF, une requête dépassant temporairement la limite de concurrence de son niveau de priorité est mise en file d'attente plutôt que rejetée immédiatement, une technique de fair queuing garantissant qu'un client mal comporté n'affame pas les autres au sein du même niveau ; les niveaux de priorité sous-utilisés peuvent aussi temporairement prêter de la concurrence aux niveaux fortement sollicités.",
  "ref": "https://kubernetes.io/docs/concepts/cluster-administration/flow-control/",
  "en": {
    "q": "With API Priority and Fairness (APF) enabled, what happens to a request arriving when its priority level's concurrency limit is already reached?",
    "choices": [
      "It is immediately rejected with an error, no exception",
      "It is queued rather than rejected, to absorb brief load bursts, and dispatched using a fair queuing technique",
      "It is automatically rerouted to another available priority level",
      "APF ignores the limit in this case and lets the request through unchecked"
    ]
  }
},
{
  "id": "t11-a11",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Quelles sont les valeurs par défaut des flags `--max-requests-inflight` et `--max-mutating-requests-inflight` du kube-apiserver ?",
  "choices": [
    "400 pour les requêtes non-mutantes, 200 pour les requêtes mutantes",
    "200 pour les requêtes non-mutantes, 400 pour les requêtes mutantes",
    "Les deux valent 0 par défaut (illimité)",
    "Les deux valent 1000 par défaut"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : --max-requests-inflight (requêtes de lecture GET/LIST/WATCH) vaut 400 par défaut, et --max-mutating-requests-inflight (requêtes d'écriture POST/PUT/PATCH/DELETE) vaut 200 par défaut.",
    "Faux : les valeurs sont inversées par rapport à la documentation.",
    "Faux : 0 signifierait illimité, ce qui n'est pas le comportement par défaut.",
    "Faux : ce ne sont pas les valeurs documentées par défaut."
  ],
  "explain": "Sans API Priority and Fairness, la concurrence globale du kube-apiserver est plafonnée par ces deux flags : 400 pour les requêtes non-mutantes (lecture) et 200 pour les requêtes mutantes (écriture) par défaut ; au-delà, le serveur rejette les requêtes excédentaires. Avec APF activée, ces limites sont sommées puis réparties entre les niveaux de priorité configurés.",
  "ref": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/",
  "en": {
    "q": "What are the default values of the `--max-requests-inflight` and `--max-mutating-requests-inflight` flags of kube-apiserver?",
    "choices": [
      "400 for non-mutating requests, 200 for mutating requests",
      "200 for non-mutating requests, 400 for mutating requests",
      "Both default to 0 (unlimited)",
      "Both default to 1000"
    ]
  }
},
{
  "id": "t11-a12",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Sur un objet RuntimeClass définissant `scheduling.nodeSelector`, comment ce nodeSelector interagit-il avec le nodeSelector défini directement sur le Pod, et que se passe-t-il en cas de conflit ?",
  "choices": [
    "Le nodeSelector de la RuntimeClass est fusionné avec celui du Pod lors de l'admission, en prenant l'intersection des deux ensembles de nœuds sélectionnés ; en cas de conflit, le Pod est rejeté",
    "Le nodeSelector de la RuntimeClass remplace totalement celui du Pod, qui est ignoré",
    "Le nodeSelector du Pod est prioritaire, celui de la RuntimeClass n'est appliqué qu'en son absence",
    "scheduling.nodeSelector n'a aucun effet si le Pod définit déjà son propre nodeSelector"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « The RuntimeClass's nodeSelector is merged with the pod's nodeSelector in admission, effectively taking the intersection of the set of nodes selected by each » et « If there is a conflict, the pod will be rejected. »",
    "Faux : il ne remplace pas le nodeSelector du Pod, les deux sont fusionnés.",
    "Faux : aucune priorité n'est donnée à l'un sur l'autre, c'est une fusion par intersection.",
    "Faux : scheduling.nodeSelector s'applique bien en complément d'un nodeSelector déjà défini sur le Pod, via fusion à l'admission."
  ],
  "explain": "Le champ scheduling.nodeSelector d'une RuntimeClass est fusionné, lors de l'admission, avec le nodeSelector propre au Pod : l'ensemble de nœuds éligibles devient l'intersection des deux sélections ; si cette fusion produit un conflit (labels contradictoires sur une même clé), le Pod est rejeté. Si scheduling n'est pas défini du tout, la RuntimeClass est considérée comme supportée par tous les nœuds.",
  "ref": "https://kubernetes.io/docs/concepts/containers/runtime-class/",
  "en": {
    "q": "On a RuntimeClass defining `scheduling.nodeSelector`, how does this nodeSelector interact with a nodeSelector defined directly on the Pod, and what happens on conflict?",
    "choices": [
      "The RuntimeClass's nodeSelector is merged with the Pod's at admission, taking the intersection of both sets of selected nodes; on conflict, the Pod is rejected",
      "The RuntimeClass's nodeSelector fully replaces the Pod's, which is ignored",
      "The Pod's nodeSelector takes priority, the RuntimeClass's is only applied in its absence",
      "scheduling.nodeSelector has no effect if the Pod already defines its own nodeSelector"
    ]
  }
},
{
  "id": "t11-a2",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Le ClusterRole utilisateur intégré `view` permet-il de lire les Secrets d'un namespace ?",
  "choices": [
    "Oui, view donne un accès en lecture à toutes les ressources sans exception, Secrets compris",
    "Non, view exclut délibérément la lecture des Secrets pour éviter un risque d'escalade de privilèges",
    "Seulement si le Secret est de type Opaque",
    "Non, view ne permet de lire aucune ressource, il ne sert qu'à lister les noms d'objets"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est justement l'exception documentée — view ne donne pas accès aux Secrets.",
    "Vrai : le ClusterRole view exclut délibérément l'accès en lecture aux Secrets, une donnée sensible pouvant permettre une escalade de privilèges si elle était lisible par un rôle de simple consultation.",
    "Faux : l'exclusion s'applique à tous les types de Secrets, pas seulement Opaque.",
    "Faux : view donne bien un accès en lecture à la plupart des objets (Pods, Services, Deployments...), pas seulement aux noms."
  ],
  "explain": "Le ClusterRole intégré view accorde un accès en lecture seule à la plupart des ressources d'un namespace, mais exclut délibérément les Secrets afin d'éviter qu'un accès en apparence anodin ne permette de récupérer des identifiants sensibles.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
  "en": {
    "q": "Does the built-in `view` user-facing ClusterRole allow reading a namespace's Secrets?",
    "choices": [
      "Yes, view grants read access to all resources with no exception, Secrets included",
      "No, view deliberately excludes reading Secrets to avoid a privilege escalation risk",
      "Only if the Secret is of type Opaque",
      "No, view doesn't allow reading any resource, it only lists object names"
    ]
  }
},
{
  "id": "t11-a3",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Une CustomResourceDefinition active le `status` subresource. Que se passe-t-il si un client envoie un PUT sur la ressource principale (pas sur /status) en y incluant des modifications du champ status ?",
  "choices": [
    "Les modifications du champ status sont ignorées ; seul l'endpoint dédié /status permet de le modifier",
    "Les modifications du champ status sont appliquées normalement, comme n'importe quel autre champ",
    "La requête entière échoue avec une erreur de validation",
    "Le champ status est supprimé de la ressource"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : quand le status subresource est activé, les requêtes PUT/POST/PATCH sur la ressource principale ignorent les changements de la section status, qui ne peut être modifiée que via l'endpoint dédié /status.",
    "Faux : c'est précisément l'inverse du but du status subresource — séparer la mise à jour de status des autres champs.",
    "Faux : la requête n'échoue pas, elle est simplement appliquée en ignorant le champ status.",
    "Faux : rien ne supprime le champ status, ses modifications via ce canal sont juste ignorées."
  ],
  "explain": "Activer le status subresource sur une CRD sépare la mise à jour de spec de celle de status : les requêtes PUT/POST/PATCH vers la ressource principale ignorent tout changement du champ status, qui ne peut être modifié que via l'endpoint dédié .../status, lui-même ignorant les changements hors de ce champ.",
  "ref": "https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/",
  "en": {
    "q": "A CustomResourceDefinition enables the `status` subresource. What happens if a client sends a PUT to the main resource (not /status) including changes to the status field?",
    "choices": [
      "Changes to the status field are ignored; only the dedicated /status endpoint can modify it",
      "Changes to the status field are applied normally, like any other field",
      "The whole request fails with a validation error",
      "The status field is removed from the resource"
    ]
  }
},
{
  "id": "t11-a4",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Depuis quelle version de Kubernetes le mécanisme de « server-side printing » permet-il de personnaliser les colonnes affichées par `kubectl get` pour une ressource personnalisée, via `additionalPrinterColumns` ?",
  "choices": [
    "Depuis la v1.11, où le serveur décide des colonnes affichées plutôt que kubectl côté client",
    "Depuis les tout débuts de Kubernetes (v1.0), sans changement depuis",
    "Cette fonctionnalité n'existe pas pour les ressources personnalisées, uniquement pour les ressources natives",
    "Uniquement depuis v1.30, en tant que fonctionnalité alpha"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : depuis Kubernetes 1.11, kubectl utilise le server-side printing, où le serveur détermine les colonnes affichées par kubectl get, ce qui permet de personnaliser cet affichage via additionalPrinterColumns sur une CRD.",
    "Faux : ce mécanisme n'est pas présent depuis la toute première version, il a été introduit en 1.11.",
    "Faux : additionalPrinterColumns s'applique justement aux ressources personnalisées définies par une CRD.",
    "Faux : ce n'est pas une fonctionnalité récente ou alpha, elle est stable depuis 1.11."
  ],
  "explain": "Depuis Kubernetes 1.11, le server-side printing délègue au serveur (plutôt qu'au client kubectl) la détermination des colonnes affichées par kubectl get ; cela permet à une CustomResourceDefinition de définir des colonnes personnalisées via additionalPrinterColumns, affichant des champs pertinents du spec ou du status au lieu des seules colonnes NAME et AGE par défaut.",
  "ref": "https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/",
  "en": {
    "q": "Since which Kubernetes version does the \"server-side printing\" mechanism allow customizing the columns shown by `kubectl get` for a custom resource, via `additionalPrinterColumns`?",
    "choices": [
      "Since v1.11, where the server decides which columns are shown rather than kubectl on the client side",
      "Since Kubernetes' very early days (v1.0), unchanged since then",
      "This feature doesn't exist for custom resources, only for native resources",
      "Only since v1.30, as an alpha feature"
    ]
  }
},
{
  "id": "t11-a5",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Sur une CertificateSigningRequest, quand le champ `.status.certificate` est-il rempli, et sous quel format ?",
  "choices": [
    "Il est vide dès la création et reste vide jusqu'à ce que le signer termine le processus de signature ; il contient alors un certificat X.509 encodé en PEM",
    "Il est rempli immédiatement à la création avec un certificat auto-signé temporaire",
    "Il contient une clé privée, pas un certificat",
    "Il est toujours vide, le certificat signé n'est jamais stocké sur l'objet CSR"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « The CertificateSigningRequest status.certificate field is empty until the signer does this » et qu'une fois rempli il « contains a X.509 certificate, encoded in PEM format ».",
    "Faux : aucun certificat auto-signé temporaire n'est placé à la création.",
    "Faux : status.certificate contient le certificat signé, pas une clé privée.",
    "Faux : une fois la CSR approuvée et signée, le certificat est bien stocké dans ce champ, permettant aux clients de le récupérer."
  ],
  "explain": "Le champ status.certificate d'une CertificateSigningRequest reste vide tant que le contrôleur signataire n'a pas terminé le processus de signature ; une fois rempli, il contient le certificat X.509 signé, encodé en PEM, que les clients peuvent alors récupérer depuis la ressource CSR.",
  "ref": "https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/",
  "en": {
    "q": "On a CertificateSigningRequest, when is the `.status.certificate` field populated, and in what format?",
    "choices": [
      "It's empty at creation and stays empty until the signer completes the signing process; it then contains a PEM-encoded X.509 certificate",
      "It's filled immediately at creation with a temporary self-signed certificate",
      "It contains a private key, not a certificate",
      "It's always empty, the signed certificate is never stored on the CSR object"
    ]
  }
},
{
  "id": "t11-a6",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "À quoi sert le flag `--cluster-signing-cert-file` du kube-controller-manager ?",
  "choices": [
    "Il fournit le fichier contenant le certificat CA X509 encodé en PEM utilisé pour signer les certificats cluster-scoped ; si précisé, aucun flag --cluster-signing-* plus spécifique ne peut être utilisé",
    "Il définit la durée de validité par défaut de tous les certificats du cluster",
    "Il liste les CSR déjà approuvées en attente de signature",
    "Il n'existe que sur le kube-apiserver, pas sur le kube-controller-manager"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « Filename containing a PEM-encoded X509 CA certificate used to issue cluster-scoped certificates. If specified, no more specific --cluster-signing-* flag may be specified. »",
    "Faux : ce flag ne définit pas de durée de validité, seulement le certificat CA utilisé pour signer.",
    "Faux : ce flag ne liste rien, il configure le matériel de signature.",
    "Faux : --cluster-signing-cert-file est bien un flag du kube-controller-manager."
  ],
  "explain": "--cluster-signing-cert-file désigne le certificat CA (PEM) utilisé par le contrôleur de signature de certificats du kube-controller-manager pour signer les certificats cluster-scoped ; son usage est mutuellement exclusif avec les flags --cluster-signing-* plus spécifiques (par type de signer).",
  "ref": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/",
  "en": {
    "q": "What is the `--cluster-signing-cert-file` flag of kube-controller-manager used for?",
    "choices": [
      "It provides the PEM-encoded X509 CA certificate file used to issue cluster-scoped certificates; if specified, no more specific --cluster-signing-* flag may be used",
      "It sets the default validity duration for all certificates in the cluster",
      "It lists already-approved CSRs pending signature",
      "It only exists on kube-apiserver, not on kube-controller-manager"
    ]
  }
},
{
  "id": "t11-a7",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Dans un fichier de configuration kubeadm, quelle est la différence entre les kinds `InitConfiguration` et `ClusterConfiguration` ?",
  "choices": [
    "InitConfiguration configure les paramètres spécifiques au nœud exécutant kubeadm (NodeRegistration, LocalAPIEndpoint) ; ClusterConfiguration configure les paramètres partagés par tout le cluster (networking, etcd, composants control-plane)",
    "Ce sont deux noms différents pour exactement le même objet de configuration",
    "InitConfiguration ne s'utilise qu'avec kubeadm join, jamais avec kubeadm init",
    "ClusterConfiguration ne peut être définie qu'après l'initialisation, jamais dans le fichier de config initial"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise qu'InitConfiguration « should be used to configure runtime settings... specific to the node », incluant NodeRegistration et LocalAPIEndpoint, tandis que ClusterConfiguration « should be used to configure cluster-wide settings » comme networking, etcd et les composants control-plane.",
    "Faux : ce sont deux kinds distincts avec des portées différentes, pas des synonymes.",
    "Faux : InitConfiguration s'utilise justement avec kubeadm init, pas kubeadm join.",
    "Faux : ClusterConfiguration se définit dans le même fichier de configuration initial, avant l'exécution de kubeadm init."
  ],
  "explain": "Un fichier de configuration kubeadm peut combiner plusieurs kinds : InitConfiguration porte les réglages propres au nœud exécutant kubeadm (registration du nœud, endpoint API local), tandis que ClusterConfiguration porte les réglages partagés par l'ensemble du cluster (réseau, etcd, personnalisation des composants control-plane).",
  "ref": "https://kubernetes.io/docs/reference/config-api/kubeadm-config.v1beta4/",
  "en": {
    "q": "In a kubeadm configuration file, what is the difference between the `InitConfiguration` and `ClusterConfiguration` kinds?",
    "choices": [
      "InitConfiguration configures settings specific to the node running kubeadm (NodeRegistration, LocalAPIEndpoint); ClusterConfiguration configures settings shared across the whole cluster (networking, etcd, control-plane components)",
      "These are two different names for the exact same configuration object",
      "InitConfiguration is only used with kubeadm join, never with kubeadm init",
      "ClusterConfiguration can only be defined after initialization, never in the initial config file"
    ]
  }
},
{
  "id": "t11-a8",
  "domain": "architecture",
  "difficulty": "hard",
  "q": "Dans le mécanisme d'authentification par proxy de la couche d'agrégation, à quoi servent les flags `--requestheader-username-headers` et `--requestheader-group-headers` du kube-apiserver ?",
  "choices": [
    "Ils indiquent au kube-apiserver dans quels en-têtes HTTP il doit placer le username et le groupe de l'utilisateur authentifié lorsqu'il relaie (proxy) la requête vers l'extension API server",
    "Ils définissent les en-têtes HTTP que les clients externes doivent utiliser pour s'authentifier directement auprès du kube-apiserver",
    "Ils chiffrent les en-têtes de requête contenant des informations sensibles",
    "Ils n'ont aucun rapport avec l'authentification, ils servent uniquement au logging"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise que « When the Kubernetes apiserver proxies the request to the extension apiserver, it informs the extension apiserver of the username and group... It provides these in http headers... You must inform the Kubernetes apiserver of the names of the headers to be used » via ces deux flags.",
    "Faux : ces en-têtes sont utilisés en interne entre le kube-apiserver et l'extension API server, pas par les clients externes.",
    "Faux : ces flags ne chiffrent rien, ils nomment simplement les en-têtes utilisés.",
    "Faux : ces flags sont au cœur du mécanisme d'authentification par proxy de la couche d'agrégation."
  ],
  "explain": "Quand le kube-apiserver relaie une requête vers un extension API server (couche d'agrégation), il doit lui communiquer l'identité déjà authentifiée de l'appelant via des en-têtes HTTP dédiés ; --requestheader-username-headers et --requestheader-group-headers définissent les noms de ces en-têtes, également renseignés dans la configmap extension-apiserver-authentication du namespace kube-system.",
  "ref": "https://kubernetes.io/docs/tasks/extend-kubernetes/configure-aggregation-layer/",
  "en": {
    "q": "In the aggregation layer's authenticating proxy mechanism, what are the `--requestheader-username-headers` and `--requestheader-group-headers` kube-apiserver flags for?",
    "choices": [
      "They tell the kube-apiserver which HTTP headers to place the authenticated user's username and group into when proxying the request to the extension API server",
      "They define the HTTP headers external clients must use to authenticate directly to the kube-apiserver",
      "They encrypt request headers containing sensitive information",
      "They have nothing to do with authentication, they're only used for logging"
    ]
  }
},
{
  "id": "t11-a9",
  "domain": "architecture",
  "difficulty": "medium",
  "q": "Que stocke l'annotation `kubectl.kubernetes.io/last-applied-configuration` ajoutée par `kubectl apply`, et à quoi sert-elle ?",
  "choices": [
    "Elle stocke le contenu du fichier de configuration utilisé au moment de l'apply, permettant à kubectl de calculer un merge à trois voies (fichier, objet live, dernière config appliquée) lors des applies suivants",
    "Elle stocke un hash de sécurité empêchant toute modification manuelle ultérieure de l'objet",
    "Elle stocke l'historique complet de toutes les configurations jamais appliquées à l'objet",
    "Elle n'est utilisée que par kubectl diff, jamais par kubectl apply lui-même"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « The annotation contains the contents of the object configuration file that was used to create the object », utilisée avec la config du fichier et l'objet live pour calculer les différences lors d'un apply ultérieur (three-way merge).",
    "Faux : ce n'est pas un hash de sécurité, mais une copie de la configuration précédemment appliquée.",
    "Faux : seule la DERNIÈRE configuration appliquée est stockée, pas un historique complet.",
    "Faux : cette annotation est au cœur du fonctionnement de kubectl apply lui-même, pas seulement de kubectl diff."
  ],
  "explain": "kubectl apply maintient cette annotation contenant la dernière configuration appliquée à l'objet ; combinée à la configuration du fichier actuel et à l'état live de l'objet, elle permet à apply de calculer un merge à trois voies déterminant précisément quels champs modifier, y compris la suppression de champs retirés du fichier source.",
  "ref": "https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/",
  "en": {
    "q": "What does the `kubectl.kubernetes.io/last-applied-configuration` annotation added by `kubectl apply` store, and what is it used for?",
    "choices": [
      "It stores the content of the configuration file used at apply time, letting kubectl compute a three-way merge (file, live object, last applied config) on subsequent applies",
      "It stores a security hash preventing any later manual modification of the object",
      "It stores the complete history of every configuration ever applied to the object",
      "It's only used by kubectl diff, never by kubectl apply itself"
    ]
  }
},
{
  "id": "t11-w1",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Sur un HorizontalPodAutoscaler, quels sont les types de métriques (`spec.metrics[].type`) documentés, et depuis quelles API sont-elles récupérées ?",
  "choices": [
    "Resource, Pods, Object et External, récupérées respectivement via metrics.k8s.io, custom.metrics.k8s.io ou external.metrics.k8s.io",
    "Uniquement CPU et Memory, sans autre type possible",
    "Seul le type Resource existe ; Pods, Object et External n'existent pas dans l'API HPA",
    "Les métriques sont toujours récupérées directement depuis Prometheus, sans passer par une API Kubernetes"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc décrit les métriques par-Pod de ressource (Resource), les métriques par-Pod personnalisées, les métriques d'objet (Object) et externes (External), récupérées via les API agrégées metrics.k8s.io, custom.metrics.k8s.io ou external.metrics.k8s.io.",
    "Faux : les métriques Resource ne se limitent pas à CPU/Memory, et d'autres types existent (Pods, Object, External).",
    "Faux : Pods, Object et External sont bien des types de métriques documentés pour l'HPA.",
    "Faux : Prometheus n'est pas la source directe ; l'HPA passe par les API agrégées Kubernetes, qui peuvent elles-mêmes s'appuyer sur un adaptateur Prometheus en coulisses."
  ],
  "explain": "Un HorizontalPodAutoscaler peut utiliser des métriques de type Resource (métriques par-Pod comme CPU, via metrics.k8s.io), des métriques personnalisées par-Pod (custom.metrics.k8s.io), ou des métriques Object/External décrivant un objet ou une source externe (external.metrics.k8s.io), chacune comparée à une valeur cible pour calculer le ratio de scaling.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/",
  "en": {
    "q": "On a HorizontalPodAutoscaler, what metric types (`spec.metrics[].type`) are documented, and from which APIs are they fetched?",
    "choices": [
      "Resource, Pods, Object and External, fetched respectively via metrics.k8s.io, custom.metrics.k8s.io or external.metrics.k8s.io",
      "Only CPU and Memory, no other type possible",
      "Only the Resource type exists; Pods, Object and External don't exist in the HPA API",
      "Metrics are always fetched directly from Prometheus, without going through a Kubernetes API"
    ]
  }
},
{
  "id": "t11-w2",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Un Job définit `.spec.ttlSecondsAfterFinished: 100`. Une fois ce délai écoulé après la fin du Job, que se passe-t-il ?",
  "choices": [
    "Seul l'objet Job est supprimé, ses Pods restent visibles indéfiniment",
    "Le Job devient éligible à une suppression en cascade : il est supprimé avec l'ensemble de ses objets dépendants (dont ses Pods)",
    "Le Job est mis en pause plutôt que supprimé",
    "Rien ne se passe tant qu'un administrateur ne supprime pas manuellement le Job"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la suppression est cascading, elle n'épargne pas les Pods dépendants.",
    "Vrai : la doc précise « When the TTL-after-finished controller cleans up a job, it will delete it cascadingly, that is to say it will delete its dependent objects together with it » une fois le TTL expiré après que le Job soit devenu Complete ou Failed.",
    "Faux : le mécanisme TTL supprime le Job, il ne le met pas en pause.",
    "Faux : c'est justement l'objectif de ce champ que d'automatiser cette suppression sans intervention manuelle."
  ],
  "explain": "Le contrôleur TTL-after-finished considère un Job éligible au nettoyage TTL secondes après son passage à l'état Complete ou Failed ; une fois ce délai expiré, il supprime le Job de façon cascading, entraînant la suppression de ses objets dépendants (Pods notamment) avec lui.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/",
  "en": {
    "q": "A Job defines `.spec.ttlSecondsAfterFinished: 100`. Once that delay has passed after the Job finishes, what happens?",
    "choices": [
      "Only the Job object is deleted, its Pods remain visible indefinitely",
      "The Job becomes eligible for cascading deletion: it's deleted along with all its dependent objects (including its Pods)",
      "The Job is paused rather than deleted",
      "Nothing happens until an administrator manually deletes the Job"
    ]
  }
},
{
  "id": "t11-w3",
  "domain": "workloads",
  "difficulty": "easy",
  "q": "Que signifie `.spec.minReadySeconds` sur un StatefulSet, et quelle est sa valeur par défaut ?",
  "choices": [
    "Le nombre minimum de secondes pendant lesquelles un nouveau Pod doit être Running et Ready sans crash pour être considéré comme available ; défaut 0",
    "Le délai minimum avant que le StatefulSet ne commence à créer son premier Pod ; défaut 30",
    "Le temps d'attente minimum entre deux scale up successifs ; défaut 10",
    "Ce champ n'existe pas pour StatefulSet, seulement pour Deployment"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « minReadySeconds is an optional field that specifies the minimum number of seconds for which a newly created Pod should be running and ready without any of its containers crashing, for it to be considered available... This field defaults to 0 ».",
    "Faux : ce n'est pas un délai avant la création du premier Pod.",
    "Faux : ce n'est pas un délai entre scale up successifs.",
    "Faux : minReadySeconds existe bien pour StatefulSet, avec la même sémantique que sur Deployment."
  ],
  "explain": "minReadySeconds sur un StatefulSet définit la durée minimale pendant laquelle un Pod nouvellement créé doit rester Running et Ready sans qu'aucun de ses conteneurs ne crashe pour être considéré available, utilisé pour évaluer la progression d'un Rolling Update ; sa valeur par défaut est 0, rendant un Pod immédiatement available dès qu'il est Ready.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/",
  "en": {
    "q": "What does `.spec.minReadySeconds` mean on a StatefulSet, and what is its default value?",
    "choices": [
      "The minimum number of seconds a newly created Pod must be Running and Ready without crashing to be considered available; default 0",
      "The minimum delay before the StatefulSet starts creating its first Pod; default 30",
      "The minimum wait time between two successive scale-ups; default 10",
      "This field doesn't exist for StatefulSet, only for Deployment"
    ]
  }
},
{
  "id": "t11-w4",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Dans une règle `requiredDuringSchedulingIgnoredDuringExecution` de nodeAffinity, quelle est la relation logique entre plusieurs `nodeSelectorTerms`, et entre plusieurs `matchExpressions` au sein d'UN MÊME terme ?",
  "choices": [
    "Plusieurs nodeSelectorTerms sont combinés en OR (un seul suffit) ; plusieurs matchExpressions dans un même terme sont combinés en AND (tous requis)",
    "Plusieurs nodeSelectorTerms sont combinés en AND (tous requis) ; plusieurs matchExpressions dans un même terme sont combinés en OR (un seul suffit)",
    "Tout est toujours combiné en AND, qu'il s'agisse de nodeSelectorTerms ou de matchExpressions",
    "Tout est toujours combiné en OR, qu'il s'agisse de nodeSelectorTerms ou de matchExpressions"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « If you specify multiple terms in nodeSelectorTerms... the Pod can be scheduled onto a node if one of the specified terms can be satisfied (terms are ORed) » et « If you specify multiple expressions in a single matchExpressions field... only if all the expressions are satisfied (expressions are ANDed) ».",
    "Faux : c'est exactement l'inverse des règles documentées.",
    "Faux : les nodeSelectorTerms multiples sont en OR, pas en AND.",
    "Faux : les matchExpressions au sein d'un même terme sont en AND, pas en OR."
  ],
  "explain": "Kubernetes combine plusieurs nodeSelectorTerms avec une logique OR (satisfaire un seul terme suffit à rendre le nœud éligible), tandis que plusieurs matchExpressions au sein d'un même nodeSelectorTerm sont combinés en AND (toutes les expressions doivent être satisfaites) — permettant de construire des règles de placement combinant alternatives et critères cumulatifs.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/",
  "en": {
    "q": "In a `requiredDuringSchedulingIgnoredDuringExecution` nodeAffinity rule, what is the logical relationship between multiple `nodeSelectorTerms`, and between multiple `matchExpressions` within a SINGLE term?",
    "choices": [
      "Multiple nodeSelectorTerms are combined with OR (one is enough); multiple matchExpressions within a single term are combined with AND (all required)",
      "Multiple nodeSelectorTerms are combined with AND (all required); multiple matchExpressions within a single term are combined with OR (one is enough)",
      "Everything is always combined with AND, whether nodeSelectorTerms or matchExpressions",
      "Everything is always combined with OR, whether nodeSelectorTerms or matchExpressions"
    ]
  }
},
{
  "id": "t11-w5",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Quelle est la différence de comportement entre un hook `postStart` qui échoue et un hook `postStart` qui reste bloqué (hang) trop longtemps ?",
  "choices": [
    "Un hook qui échoue tue le conteneur ; un hook qui reste bloqué empêche seulement le conteneur de passer à l'état Running, sans le tuer directement",
    "Les deux cas tuent systématiquement le conteneur de la même façon",
    "Les deux cas sont ignorés silencieusement sans aucun effet sur l'état du conteneur",
    "Un hook qui échoue redémarre automatiquement le Pod entier, pas seulement le conteneur"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « If either a PostStart or PreStop hook fails, it kills the Container » d'une part, et « If the PostStart hook takes too long to execute or if it hangs, it can prevent the container from transitioning to a running state » d'autre part.",
    "Faux : ce sont deux comportements distincts documentés séparément, pas un seul et même effet.",
    "Faux : ni l'échec ni le blocage ne sont ignorés silencieusement, ils ont un impact documenté sur l'état du conteneur.",
    "Faux : c'est le conteneur qui est tué en cas d'échec du hook, pas l'ensemble du Pod redémarré."
  ],
  "explain": "Un hook postStart qui échoue provoque la mise à mort (kill) du conteneur ; en revanche, un hook postStart qui prend trop de temps ou reste bloqué ne tue pas le conteneur mais l'empêche de transitionner vers l'état Running tant que le hook n'a pas terminé, puisqu'il s'exécute en parallèle du process principal du conteneur.",
  "ref": "https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/",
  "en": {
    "q": "What is the behavioral difference between a `postStart` hook that fails and a `postStart` hook that hangs for too long?",
    "choices": [
      "A hook that fails kills the container; a hook that hangs only prevents the container from transitioning to Running, without killing it directly",
      "Both cases always kill the container in the same way",
      "Both cases are silently ignored with no effect on the container's state",
      "A hook that fails automatically restarts the whole Pod, not just the container"
    ]
  }
},
{
  "id": "t11-w6",
  "domain": "workloads",
  "difficulty": "medium",
  "q": "Sur une toleration, que signifie laisser le champ `effect` vide (non spécifié) ?",
  "choices": [
    "La toleration ne matche aucun taint tant que effect n'est pas explicitement précisé",
    "Une effect vide matche TOUS les effets (NoSchedule, PreferNoSchedule, NoExecute) pour la clé donnée",
    "Une effect vide équivaut automatiquement à NoSchedule",
    "Cela provoque une erreur de validation, effect est un champ obligatoire"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est l'inverse — une effect vide élargit la correspondance plutôt que de la bloquer.",
    "Vrai : la doc précise « An empty effect matches all effects with key key1. »",
    "Faux : une effect vide ne se limite pas à NoSchedule, elle couvre tous les effets.",
    "Faux : effect n'est pas un champ obligatoire, il peut être omis pour élargir le matching."
  ],
  "explain": "Une toleration sans effect précisé matche tous les effets de taint possibles (NoSchedule, PreferNoSchedule, NoExecute) pour la clé donnée, offrant une toleration plus permissive qu'une toleration ciblant un effet unique.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
  "en": {
    "q": "On a toleration, what does leaving the `effect` field empty (unspecified) mean?",
    "choices": [
      "The toleration matches no taint until effect is explicitly specified",
      "An empty effect matches ALL effects (NoSchedule, PreferNoSchedule, NoExecute) for the given key",
      "An empty effect automatically defaults to NoSchedule",
      "This causes a validation error, effect is a required field"
    ]
  }
},
{
  "id": "t11-w7",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "À quoi sert le champ `.spec.ordinals.start` d'un StatefulSet ?",
  "choices": [
    "Il permet de numéroter les Pods à partir d'une valeur autre que 0 : avec start: 5 et 3 réplicas, les Pods reçoivent les ordinaux 5, 6 et 7",
    "Il définit le nombre minimum de réplicas Ready avant de commencer le rolling update",
    "Il indique l'index du Pod à partir duquel commence la partition d'un rolling update",
    "Ce champ contrôle l'ordre alphabétique d'affichage des Pods, sans effet sur leur nommage réel"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « If the .spec.ordinals.start field is set, Pods will be assigned ordinals from .spec.ordinals.start up through .spec.ordinals.start + .spec.replicas - 1 ».",
    "Faux : ce n'est pas lié à un nombre minimum de réplicas Ready, c'est le rôle d'un PodDisruptionBudget ou de minReadySeconds.",
    "Faux : c'est le rôle du champ partition de updateStrategy.rollingUpdate, distinct de spec.ordinals.start.",
    "Faux : ce champ affecte réellement le nommage des Pods (leur suffixe ordinal), pas seulement leur affichage."
  ],
  "explain": "Par défaut, les Pods d'un StatefulSet sont numérotés de 0 à N-1 ; le champ spec.ordinals.start (optionnel, nil par défaut) permet de choisir un point de départ différent pour cette numérotation, les ordinaux s'étendant alors de start à start + replicas - 1.",
  "ref": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/",
  "en": {
    "q": "What is the `.spec.ordinals.start` field of a StatefulSet used for?",
    "choices": [
      "It lets you number Pods starting from a value other than 0: with start: 5 and 3 replicas, Pods get ordinals 5, 6, and 7",
      "It sets the minimum number of Ready replicas before starting the rolling update",
      "It indicates the Pod index from which a rolling update partition starts",
      "This field controls the alphabetical display order of Pods, with no effect on their actual naming"
    ]
  }
},
{
  "id": "t11-w8",
  "domain": "workloads",
  "difficulty": "hard",
  "q": "Sur une toleration, si le champ `key` est laissé vide, quel `operator` est alors obligatoire, et quel est l'effet de cette combinaison ?",
  "choices": [
    "L'operator Equal est requis, et la toleration ne matche que les taints sans aucune clé",
    "L'operator Exists est requis, ce qui matche toutes les clés et toutes les valeurs (l'effect devant tout de même correspondre)",
    "Aucun operator n'est nécessaire quand key est vide, tous les taints sont automatiquement tolérés",
    "Une key vide est invalide et provoque le rejet de la toleration à la création du Pod"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : c'est Exists, pas Equal, qui est requis dans ce cas.",
    "Vrai : la doc précise que si key est vide, l'operator doit être Exists, ce qui matche toutes les clés et valeurs — l'effect devant néanmoins toujours correspondre.",
    "Faux : un operator (Exists) reste requis même avec une key vide, et l'effect doit tout de même correspondre.",
    "Faux : une key vide est une syntaxe valide et documentée, à condition d'utiliser l'operator Exists."
  ],
  "explain": "Laisser le champ key vide sur une toleration exige d'utiliser l'operator Exists, ce qui produit une toleration passe-partout matchant n'importe quelle clé et valeur de taint — l'effect restant néanmoins un critère de correspondance, sauf à le laisser également vide pour matcher tous les effets.",
  "ref": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
  "en": {
    "q": "On a toleration, if the `key` field is left empty, which `operator` is then required, and what is the effect of this combination?",
    "choices": [
      "The Equal operator is required, and the toleration only matches taints with no key at all",
      "The Exists operator is required, which matches all keys and values (the effect still needing to match)",
      "No operator is needed when key is empty, all taints are automatically tolerated",
      "An empty key is invalid and causes the toleration to be rejected at Pod creation"
    ]
  }
},
{
  "id": "t11-n1",
  "domain": "networking",
  "difficulty": "medium",
  "q": "À quoi sert le champ `controllerName` d'un objet `GatewayClass` de l'API Gateway ?",
  "choices": [
    "Il identifie le nom du contrôleur qui implémente cette classe ; tous les Gateway référençant cette GatewayClass seront gérés par ce contrôleur",
    "Il définit le nom du premier Gateway créé avec cette classe",
    "Il liste les namespaces autorisés à créer des Gateway de cette classe",
    "Il n'a aucun rapport avec le contrôleur, c'est un simple champ d'affichage"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « A Gateway must reference a GatewayClass that contains the name of the controller that implements the class » avec l'exemple controllerName: example.com/gateway-controller.",
    "Faux : controllerName ne désigne pas un Gateway spécifique, mais le contrôleur logiciel responsable de l'implémentation.",
    "Faux : la restriction par namespace se fait via allowedRoutes sur le Gateway, pas via controllerName sur la GatewayClass.",
    "Faux : controllerName détermine effectivement quel contrôleur gère les Gateway de cette classe."
  ],
  "explain": "Le champ controllerName d'une GatewayClass identifie, par une chaîne conventionnelle (ex. example.com/gateway-controller), le contrôleur logiciel responsable de gérer tous les objets Gateway qui référencent cette GatewayClass.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/gateway/",
  "en": {
    "q": "What is the `controllerName` field of a Gateway API `GatewayClass` object used for?",
    "choices": [
      "It identifies the name of the controller that implements this class; all Gateways referencing this GatewayClass will be managed by that controller",
      "It sets the name of the first Gateway created with this class",
      "It lists the namespaces allowed to create Gateways of this class",
      "It has nothing to do with the controller, it's a simple display field"
    ]
  }
},
{
  "id": "t11-n10",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Dans une règle Ingress, si le champ `host` est omis, à quel trafic la règle s'applique-t-elle ?",
  "choices": [
    "À aucun trafic, une règle sans host est totalement ignorée",
    "À tout le trafic HTTP entrant via l'adresse IP spécifiée, quel que soit l'en-tête Host",
    "Uniquement au trafic destiné à localhost",
    "Une règle sans host provoque systématiquement une erreur de validation"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : une règle sans host n'est pas ignorée, elle s'applique justement plus largement.",
    "Vrai : la doc précise « no host is specified, so the rule applies to all inbound HTTP traffic through the IP address specified. »",
    "Faux : rien ne limite cette règle à localhost spécifiquement.",
    "Faux : host est un champ optionnel, son omission est parfaitement valide."
  ],
  "explain": "host est un champ optionnel d'une règle Ingress : lorsqu'il est omis, la règle s'applique à tout le trafic HTTP entrant par l'adresse IP de l'Ingress, sans filtrage par en-tête Host ; s'il est précisé (ex. foo.bar.com), la règle ne s'applique qu'aux requêtes portant cet en-tête Host, permettant l'hébergement virtuel par nom.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/",
  "en": {
    "q": "In an Ingress rule, if the `host` field is omitted, what traffic does the rule apply to?",
    "choices": [
      "No traffic at all, a rule without a host is entirely ignored",
      "All inbound HTTP traffic through the specified IP address, regardless of the Host header",
      "Only traffic destined for localhost",
      "A rule without a host always causes a validation error"
    ]
  }
},
{
  "id": "t11-n2",
  "domain": "networking",
  "difficulty": "hard",
  "q": "Pour que le mode IPVS de kube-proxy fonctionne, quels modules noyau doivent notamment être chargés sur le nœud ?",
  "choices": [
    "ip_vs, un module de scheduler comme ip_vs_rr, ainsi que nf_conntrack",
    "Uniquement iptables, aucun module IPVS spécifique n'est requis",
    "overlay et br_netfilter uniquement",
    "Aucun module noyau n'est nécessaire, IPVS fonctionne entièrement en espace utilisateur"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : le mode IPVS nécessite le chargement du module central ip_vs, d'au moins un module de scheduler (ip_vs_rr, ip_vs_wrr, ip_vs_sh...), et de nf_conntrack pour le suivi de connexion.",
    "Faux : iptables est un mécanisme distinct, pas un prérequis du mode IPVS.",
    "Faux : overlay et br_netfilter sont des prérequis plus généraux liés aux CNI/conteneurs, pas spécifiquement au mode IPVS.",
    "Faux : IPVS s'appuie précisément sur des structures de données du noyau Linux, pas uniquement sur de l'espace utilisateur."
  ],
  "explain": "Le mode IPVS de kube-proxy s'appuie sur les structures de données IPVS du noyau Linux ; il nécessite que le module ip_vs soit chargé, ainsi qu'au moins un module de scheduler (comme ip_vs_rr pour round-robin) et nf_conntrack pour le suivi des connexions.",
  "ref": "https://kubernetes.io/docs/reference/networking/virtual-ips/",
  "en": {
    "q": "For kube-proxy's IPVS mode to work, which kernel modules must notably be loaded on the node?",
    "choices": [
      "ip_vs, a scheduler module such as ip_vs_rr, and nf_conntrack",
      "Only iptables, no specific IPVS module is required",
      "overlay and br_netfilter only",
      "No kernel module is needed, IPVS runs entirely in user space"
    ]
  }
},
{
  "id": "t11-n3",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Avec `kubectl create ingress simple --rule=\"foo.com/bar=svc1:8080,tls=my-cert\"`, que se passe-t-il si le path indiqué commence par le caractère `*` ?",
  "choices": [
    "Une erreur de syntaxe est levée, `*` n'est pas autorisé dans un path",
    "Le path est automatiquement considéré comme pathType=Prefix",
    "Le path est automatiquement considéré comme pathType=Exact",
    "Le caractère `*` est ignoré et retiré du path final"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : `*` en tête de path n'est pas une erreur, il a une signification documentée précise.",
    "Vrai : la doc précise « Paths containing the leading character * are considered pathType=Prefix ».",
    "Faux : c'est l'inverse — un `*` en tête indique Prefix, pas Exact.",
    "Faux : le `*` n'est pas simplement supprimé, il détermine le pathType attribué."
  ],
  "explain": "`kubectl create ingress` permet de créer un Ingress de façon impérative via --rule=host/path=service:port[,tls[=secret]] ; si le path fourni commence par le caractère *, kubectl lui attribue automatiquement pathType=Prefix.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_ingress/",
  "en": {
    "q": "With `kubectl create ingress simple --rule=\"foo.com/bar=svc1:8080,tls=my-cert\"`, what happens if the given path starts with the character `*`?",
    "choices": [
      "A syntax error is raised, `*` is not allowed in a path",
      "The path is automatically treated as pathType=Prefix",
      "The path is automatically treated as pathType=Exact",
      "The `*` character is silently ignored and stripped from the final path"
    ]
  }
},
{
  "id": "t11-n4",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Depuis quelle version de Kubernetes l'API `Endpoints` (legacy, distincte des EndpointSlices) est-elle documentée comme dépréciée ?",
  "choices": [
    "Depuis v1.19, en même temps que l'introduction des EndpointSlices",
    "Depuis v1.33+, avec discoveryv1.EndpointSlice comme remplacement recommandé",
    "Elle n'a jamais été dépréciée, elle reste l'API principale",
    "Depuis v1.11, en même temps que le server-side printing"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : les EndpointSlices existent depuis plus longtemps, mais la dépréciation formelle de l'API Endpoints est plus récente.",
    "Vrai : la doc précise « Deprecated: This API is deprecated in v1.33+. Use discoveryv1.EndpointSlice. »",
    "Faux : l'API Endpoints est bien marquée comme dépréciée dans la référence API actuelle.",
    "Faux : v1.11 concerne le server-side printing pour kubectl get, sans rapport avec la dépréciation d'Endpoints."
  ],
  "explain": "L'API Endpoints (legacy), qui ne contient pas toutes les informations disponibles via EndpointSlice, est officiellement documentée comme dépréciée depuis Kubernetes v1.33+, avec discoveryv1.EndpointSlice recommandée comme remplacement complet.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/service-resources/endpoints-v1/",
  "en": {
    "q": "Since which Kubernetes version is the legacy `Endpoints` API (distinct from EndpointSlices) documented as deprecated?",
    "choices": [
      "Since v1.19, at the same time EndpointSlices were introduced",
      "Since v1.33+, with discoveryv1.EndpointSlice as the recommended replacement",
      "It has never been deprecated, it remains the primary API",
      "Since v1.11, at the same time as server-side printing"
    ]
  }
},
{
  "id": "t11-n5",
  "domain": "networking",
  "difficulty": "hard",
  "q": "À quoi sert le label `endpointslice.kubernetes.io/managed-by` sur un objet EndpointSlice ?",
  "choices": [
    "Il indique quelle entité (contrôleur) gère cet EndpointSlice, permettant à plusieurs entités de gérer des EndpointSlices sans interférer entre elles",
    "Il indique le nom du Service auquel appartient l'EndpointSlice",
    "Il stocke la date de dernière modification de l'EndpointSlice",
    "Il n'existe pas ; seul kubernetes.io/service-name est un label documenté pour EndpointSlice"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « Kubernetes defines the label endpointslice.kubernetes.io/managed-by, which indicates the entity managing an EndpointSlice », le contrôleur natif y plaçant la valeur endpointslice-controller.k8s.io.",
    "Faux : c'est le rôle du label kubernetes.io/service-name, distinct de managed-by.",
    "Faux : aucune information de date n'est stockée par ce label, c'est le rôle des champs standards de métadonnées.",
    "Faux : endpointslice.kubernetes.io/managed-by est bien un label documenté, en plus de kubernetes.io/service-name."
  ],
  "explain": "Le label endpointslice.kubernetes.io/managed-by identifie l'entité (contrôleur natif ou tiers) responsable de la gestion d'un EndpointSlice donné ; le contrôleur natif Kubernetes y place la valeur endpointslice-controller.k8s.io, permettant à plusieurs gestionnaires de coexister sans se marcher dessus.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/",
  "en": {
    "q": "What is the `endpointslice.kubernetes.io/managed-by` label on an EndpointSlice object used for?",
    "choices": [
      "It indicates which entity (controller) manages this EndpointSlice, letting multiple entities manage EndpointSlices without interfering with each other",
      "It indicates the name of the Service the EndpointSlice belongs to",
      "It stores the EndpointSlice's last modification date",
      "It doesn't exist; only kubernetes.io/service-name is a documented label for EndpointSlice"
    ]
  }
},
{
  "id": "t11-n6",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Quelle contrainte de format s'applique au champ `externalName` (`spec.externalName`) d'un Service ?",
  "choices": [
    "Il doit être un nom d'hôte RFC-1123 en minuscules, et exige que type soit défini à ExternalName",
    "Il peut contenir n'importe quelle chaîne arbitraire, sans validation de format",
    "Il doit obligatoirement se terminer par .svc.cluster.local",
    "Il doit être une adresse IP valide, jamais un nom de domaine"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « Must be a lowercase RFC-1123 hostname... and requires type to be \"ExternalName\" ».",
    "Faux : une validation de format RFC-1123 est bien appliquée, ce n'est pas une chaîne libre.",
    "Faux : externalName référence un nom externe (ex. foo.bar.example.com), pas un suffixe cluster.local.",
    "Faux : externalName est justement pensé pour référencer un nom de domaine, pas une adresse IP."
  ],
  "explain": "Le champ externalName d'un Service doit respecter le format d'un nom d'hôte RFC-1123 en minuscules, et ne peut être utilisé que si le champ type du Service vaut ExternalName ; les mécanismes de découverte renverront alors ce nom comme alias (via un enregistrement DNS CNAME), sans aucun proxying.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/service-resources/service-v1/",
  "en": {
    "q": "What format constraint applies to a Service's `externalName` (`spec.externalName`) field?",
    "choices": [
      "It must be a lowercase RFC-1123 hostname, and requires type to be set to ExternalName",
      "It can be any arbitrary string, with no format validation",
      "It must always end with .svc.cluster.local",
      "It must be a valid IP address, never a domain name"
    ]
  }
},
{
  "id": "t11-n7",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Concernant le champ `host` d'une règle Ingress, quelles restrictions de validation la documentation précise-t-elle ? (plusieurs réponses)",
  "choices": [
    "Les adresses IP ne sont pas autorisées comme valeur de host",
    "Un simple caractère `-` seul n'est pas un hostname valide",
    "Les hostnames Kubernetes peuvent aller jusqu'à 253 caractères, plus long que les noms DNS classiques",
    "Le champ host est obligatoire sur chaque règle, il ne peut jamais être omis"
  ],
  "correct": [
    0,
    1,
    2
  ],
  "why": [
    "Vrai : la doc précise explicitement « IPs are not allowed » parmi les déviations par rapport aux règles de validation CNAME classiques.",
    "Vrai : la doc précise « A literal - is not a valid hostname. »",
    "Vrai : la doc précise « Unlike DNS names, kubernetes hostnames may be up to 253 characters long. »",
    "Faux : host est un champ optionnel ; s'il est omis, la règle s'applique à tout le trafic HTTP entrant via l'IP indiquée."
  ],
  "explain": "Le champ host d'une règle Ingress doit être un FQDN conforme à la RFC 1123, avec des déviations documentées : les adresses IP sont interdites, un simple « - » n'est pas un hostname valide, et la longueur maximale tolérée par Kubernetes (253 caractères) dépasse celle des noms DNS classiques ; par ailleurs, host reste un champ optionnel.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/service-resources/ingress-v1/",
  "en": {
    "q": "Regarding the `host` field of an Ingress rule, which validation restrictions does the documentation specify? (select all that apply)",
    "choices": [
      "IP addresses are not allowed as a host value",
      "A single literal `-` is not a valid hostname",
      "Kubernetes hostnames can be up to 253 characters long, longer than standard DNS names",
      "The host field is mandatory on every rule, it can never be omitted"
    ]
  }
},
{
  "id": "t11-n8",
  "domain": "networking",
  "difficulty": "medium",
  "q": "Un objet Ingress possède-t-il son propre champ `status.loadBalancer`, indépendamment de tout Service backend ?",
  "choices": [
    "Oui, IngressStatus définit un champ loadBalancer contenant le statut actuel du load-balancer associé à l'Ingress lui-même",
    "Non, seul un Service peut avoir un status.loadBalancer, jamais un Ingress",
    "Oui, mais uniquement si l'Ingress référence un Service de type ExternalName",
    "Ce champ existe mais n'est jamais rempli, quelle que soit la configuration"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « loadBalancer contains the current status of the load-balancer » comme champ de type IngressLoadBalancerStatus sur l'objet Ingress.",
    "Faux : un Ingress possède bien son propre status.loadBalancer, distinct de celui d'un Service.",
    "Faux : rien ne conditionne ce champ au type ExternalName du Service backend.",
    "Faux : ce champ est rempli une fois que le load balancer associé à l'Ingress a été provisionné."
  ],
  "explain": "Indépendamment de tout Service backend, un objet Ingress possède son propre champ status.loadBalancer (de type IngressLoadBalancerStatus), reflétant l'état du load-balancer géré par le contrôleur Ingress pour cette ressource spécifique.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/service-resources/ingress-v1/",
  "en": {
    "q": "Does an Ingress object have its own `status.loadBalancer` field, independent of any backend Service?",
    "choices": [
      "Yes, IngressStatus defines a loadBalancer field containing the current status of the load-balancer associated with the Ingress itself",
      "No, only a Service can have a status.loadBalancer, never an Ingress",
      "Yes, but only if the Ingress references a Service of type ExternalName",
      "This field exists but is never populated, regardless of configuration"
    ]
  }
},
{
  "id": "t11-n9",
  "domain": "networking",
  "difficulty": "easy",
  "q": "Quelle contrainte s'applique au nom (`metadata.name`) d'un objet Ingress ?",
  "choices": [
    "Il doit être un nom de sous-domaine DNS valide",
    "Il peut être n'importe quelle chaîne arbitraire, y compris des majuscules et des espaces",
    "Il doit obligatoirement commencer par « ingress- »",
    "Il n'existe aucune contrainte de nommage particulière pour un Ingress"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « The name of an Ingress object must be a valid DNS subdomain name. »",
    "Faux : un nom de sous-domaine DNS valide exclut notamment les majuscules et les espaces.",
    "Faux : aucun préfixe obligatoire de ce type n'est documenté.",
    "Faux : la contrainte de nom de sous-domaine DNS s'applique bien spécifiquement à un Ingress, comme à la plupart des objets Kubernetes nommés."
  ],
  "explain": "Comme de nombreux objets Kubernetes, le nom d'un Ingress doit respecter les règles d'un nom de sous-domaine DNS valide (caractères alphanumériques minuscules, tirets, points, longueur limitée), en plus des champs structurels obligatoires apiVersion, kind, metadata et spec.",
  "ref": "https://kubernetes.io/docs/concepts/services-networking/ingress/",
  "en": {
    "q": "What constraint applies to the name (`metadata.name`) of an Ingress object?",
    "choices": [
      "It must be a valid DNS subdomain name",
      "It can be any arbitrary string, including uppercase letters and spaces",
      "It must always start with \"ingress-\"",
      "There is no particular naming constraint for an Ingress"
    ]
  }
},
{
  "id": "t11-s1",
  "domain": "storage",
  "difficulty": "hard",
  "q": "Sur `VolumeAttachmentStatus`, quelle entité est autorisée à positionner les champs `attached`, `attachError` et `detachError` ?",
  "choices": [
    "N'importe quel contrôleur du cluster peut les modifier librement",
    "Seule l'entité qui complète l'opération d'attach/detach (typiquement le external-attacher CSI) doit positionner ces champs",
    "Uniquement le kubelet du nœud concerné",
    "Ces champs sont en lecture seule et ne sont jamais positionnés par aucune entité"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la doc restreint explicitement qui peut positionner ces champs.",
    "Vrai : la doc précise pour chacun « This field must only be set by the entity completing the attach [ou detach] operation, i.e. the external-attacher. »",
    "Faux : ce n'est pas le kubelet mais le contrôleur external-attacher CSI qui est visé.",
    "Faux : ces champs sont bien renseignés, par l'entité qui termine l'opération d'attachement."
  ],
  "explain": "Les champs attached (booléen confirmant le succès de l'attachement), attachError et detachError (dernière erreur rencontrée, de type VolumeError avec message/time/errorCode) de VolumeAttachmentStatus ne doivent être positionnés que par l'entité qui termine l'opération correspondante, typiquement le contrôleur external-attacher CSI.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/volume-attachment-v1/",
  "en": {
    "q": "On `VolumeAttachmentStatus`, which entity is allowed to set the `attached`, `attachError`, and `detachError` fields?",
    "choices": [
      "Any controller in the cluster can freely modify them",
      "Only the entity completing the attach/detach operation (typically the CSI external-attacher) should set these fields",
      "Only the kubelet of the node in question",
      "These fields are read-only and are never set by any entity"
    ]
  }
},
{
  "id": "t11-s2",
  "domain": "storage",
  "difficulty": "hard",
  "q": "Sur un objet `CSIStorageCapacity`, que représente le champ `maximumVolumeSize`, par rapport au champ `capacity` ?",
  "choices": [
    "capacity indique la capacité disponible totale du stockage ; maximumVolumeSize indique la plus grande taille utilisable pour créer UN SEUL volume avec les mêmes paramètres",
    "Ce sont deux noms différents pour exactement la même valeur",
    "maximumVolumeSize est obsolète et n'est plus renseigné depuis la CSI spec 1.4.0",
    "capacity concerne les volumes Block, maximumVolumeSize concerne uniquement les volumes Filesystem"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise que capacity est « the available capacity, in bytes, of the storage that can be used to provision volumes », tandis que maximumVolumeSize (depuis CSI spec 1.4.0) est « the largest size that may be used in a CreateVolumeRequest... to create a volume with the same parameters ».",
    "Faux : ce sont deux champs distincts avec des sémantiques différentes, pas des synonymes.",
    "Faux : c'est l'inverse — maximumVolumeSize a été introduit avec la CSI spec 1.4.0, il n'est pas obsolète.",
    "Faux : rien dans la doc ne restreint ces champs selon le type de volume (Block vs Filesystem)."
  ],
  "explain": "capacity représente la capacité de stockage disponible totale rapportée par le driver CSI, tandis que maximumVolumeSize (introduit avec la CSI spec 1.4.0) indique la taille maximale qu'un seul volume pourrait atteindre avec les mêmes paramètres de topologie — une distinction utile car un stockage fragmenté peut avoir beaucoup de capacité totale sans pouvoir provisionner un unique gros volume.",
  "ref": "https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/csi-storage-capacity-v1/",
  "en": {
    "q": "On a `CSIStorageCapacity` object, what does the `maximumVolumeSize` field represent compared to the `capacity` field?",
    "choices": [
      "capacity indicates the total available storage capacity; maximumVolumeSize indicates the largest usable size for creating a SINGLE volume with the same parameters",
      "These are two different names for the exact same value",
      "maximumVolumeSize is deprecated and no longer populated since CSI spec 1.4.0",
      "capacity concerns Block volumes, maximumVolumeSize concerns only Filesystem volumes"
    ]
  }
},
{
  "id": "t11-s3",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Concernant la propriété (ownership) d'un volume éphémère générique (generic ephemeral volume), quelle affirmation est correcte ?",
  "choices": [
    "Le Pod qui déclare ce stockage éphémère est le propriétaire (owner) de la PVC créée automatiquement ; sa suppression déclenche celle de la PVC via le garbage collector",
    "La PVC créée est totalement indépendante du Pod et doit être supprimée manuellement",
    "C'est la PVC qui possède le Pod, et non l'inverse",
    "Aucune relation d'ownership n'est établie entre le Pod et la PVC générée"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « a Pod that has generic ephemeral storage is the owner of the PersistentVolumeClaim(s)... When the Pod is deleted, the Kubernetes garbage collector deletes the PVC ».",
    "Faux : la PVC est justement liée au cycle de vie du Pod via une relation d'ownership, pas indépendante.",
    "Faux : c'est le Pod qui est owner de la PVC, pas l'inverse.",
    "Faux : une relation d'ownership (via ownerReference) est bien établie pour permettre la suppression automatique."
  ],
  "explain": "Pour un volume éphémère générique, le contrôleur crée une PersistentVolumeClaim dont le Pod est owner ; à la suppression du Pod, le garbage collector Kubernetes supprime automatiquement la PVC, ce qui déclenche généralement la suppression du volume sous-jacent (la reclaimPolicy par défaut des StorageClass étant Delete).",
  "ref": "https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/",
  "en": {
    "q": "Regarding ownership of a generic ephemeral volume, which statement is correct?",
    "choices": [
      "The Pod declaring this ephemeral storage owns the automatically created PVC; deleting it triggers the PVC's deletion via the garbage collector",
      "The created PVC is entirely independent of the Pod and must be deleted manually",
      "The PVC owns the Pod, not the other way around",
      "No ownership relationship is established between the Pod and the generated PVC"
    ]
  }
},
{
  "id": "t11-s4",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Pour un volume éphémère générique déclaré dans un Pod nommé `ephemeral-example-7f795798f9-kbplx` avec un volume nommé `scratch-volume`, quel est le nom de la PVC créée automatiquement ?",
  "choices": [
    "scratch-volume-ephemeral-example-7f795798f9-kbplx",
    "ephemeral-example-7f795798f9-kbplx-scratch-volume",
    "pvc-ephemeral-example-7f795798f9-kbplx",
    "Un nom aléatoire (UUID) sans rapport avec le nom du Pod ou du volume"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : l'ordre est inversé par rapport à la convention documentée.",
    "Vrai : le nommage suit le motif <pod-name>-<volume-name>, donnant ici ephemeral-example-7f795798f9-kbplx-scratch-volume.",
    "Faux : ce préfixe pvc- n'est pas la convention utilisée pour les volumes éphémères génériques.",
    "Faux : le nommage est déterministe (basé sur pod-name et volume-name), pas aléatoire."
  ],
  "explain": "Le nommage de la PVC créée automatiquement pour un volume éphémère générique est déterministe, suivant le motif <pod-name>-<volume-name> ; cette prévisibilité facilite l'inspection de la PVC sans avoir à la rechercher, connaissant simplement le nom du Pod et du volume.",
  "ref": "https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/",
  "en": {
    "q": "For a generic ephemeral volume declared in a Pod named `ephemeral-example-7f795798f9-kbplx` with a volume named `scratch-volume`, what is the name of the automatically created PVC?",
    "choices": [
      "scratch-volume-ephemeral-example-7f795798f9-kbplx",
      "ephemeral-example-7f795798f9-kbplx-scratch-volume",
      "pvc-ephemeral-example-7f795798f9-kbplx",
      "A random name (UUID) unrelated to the Pod or volume name"
    ]
  }
},
{
  "id": "t11-s5",
  "domain": "storage",
  "difficulty": "medium",
  "q": "Quelle est la relation entre les objets `VolumeSnapshot` et `VolumeSnapshotContent`, par analogie avec un autre couple d'objets Kubernetes ?",
  "choices": [
    "VolumeSnapshot est la requête de l'utilisateur (comme une PVC) ; VolumeSnapshotContent est la ressource cluster réelle (comme un PV), liés par un binding one-to-one",
    "VolumeSnapshotContent est la requête de l'utilisateur ; VolumeSnapshot est la ressource cluster provisionnée par l'administrateur",
    "Ce sont deux noms strictement interchangeables pour le même objet",
    "VolumeSnapshot et VolumeSnapshotContent n'ont aucune relation, ils gèrent des snapshots totalement indépendants"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « Similar to how API resources PersistentVolume and PersistentVolumeClaim are used to provision volumes... VolumeSnapshotContent and VolumeSnapshot API resources are provided to create volume snapshots », avec « The binding is a one-to-one mapping. »",
    "Faux : c'est l'inverse — VolumeSnapshot est la requête utilisateur, VolumeSnapshotContent la ressource cluster.",
    "Faux : ce sont deux objets distincts avec des rôles différents, pas des synonymes.",
    "Faux : le contrôleur de snapshot gère justement le binding entre les deux, comme pour PV/PVC."
  ],
  "explain": "VolumeSnapshot et VolumeSnapshotContent reproduisent la relation PersistentVolumeClaim/PersistentVolume : VolumeSnapshot est la requête d'un utilisateur pour un snapshot, tandis que VolumeSnapshotContent est la ressource cluster réelle représentant le snapshot pris sur un volume, le contrôleur de snapshot assurant un binding one-to-one entre les deux, que le provisionnement soit statique (pré-provisionné) ou dynamique.",
  "ref": "https://kubernetes.io/docs/concepts/storage/volume-snapshots/",
  "en": {
    "q": "What is the relationship between `VolumeSnapshot` and `VolumeSnapshotContent` objects, by analogy with another pair of Kubernetes objects?",
    "choices": [
      "VolumeSnapshot is the user's request (like a PVC); VolumeSnapshotContent is the actual cluster resource (like a PV), bound one-to-one",
      "VolumeSnapshotContent is the user's request; VolumeSnapshot is the cluster resource provisioned by the administrator",
      "These are two strictly interchangeable names for the same object",
      "VolumeSnapshot and VolumeSnapshotContent are unrelated, they manage entirely independent snapshots"
    ]
  }
},
{
  "id": "t11-s6",
  "domain": "storage",
  "difficulty": "hard",
  "q": "Un utilisateur exécute `kubectl delete pvc mypvc` alors que cette PVC est activement utilisée comme SOURCE d'un VolumeSnapshot en cours de création. Que se passe-t-il ?",
  "choices": [
    "La PVC est supprimée immédiatement, ce qui interrompt la création du snapshot",
    "La suppression de la PVC est reportée jusqu'à ce que le snapshot soit readyToUse ou abandonné (aborted)",
    "La commande échoue immédiatement, aucune suppression n'est possible tant qu'un snapshot existe",
    "Le snapshot est automatiquement copié sur un autre volume avant la suppression de la PVC"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la suppression n'est pas immédiate dans ce cas précis.",
    "Vrai : la doc précise « If you delete a PersistentVolumeClaim API object in active use as a snapshot source, the PersistentVolumeClaim object is not removed immediately. Instead, removal... is postponed until the snapshot is readyToUse or aborted. »",
    "Faux : la commande n'échoue pas immédiatement, elle est acceptée mais la suppression effective est reportée.",
    "Faux : aucune copie automatique du snapshot vers un autre volume n'est documentée."
  ],
  "explain": "Une PVC utilisée comme source d'un VolumeSnapshot bénéficie d'une protection similaire à celle appliquée aux PVC utilisées par un Pod : sa suppression demandée reste en attente jusqu'à ce que le snapshot associé atteigne l'état readyToUse ou soit abandonné, évitant de corrompre un snapshot en cours de création.",
  "ref": "https://kubernetes.io/docs/concepts/storage/volume-snapshots/",
  "en": {
    "q": "A user runs `kubectl delete pvc mypvc` while that PVC is actively used as the SOURCE of a VolumeSnapshot currently being created. What happens?",
    "choices": [
      "The PVC is deleted immediately, interrupting the snapshot creation",
      "The PVC deletion is postponed until the snapshot is readyToUse or aborted",
      "The command fails immediately, no deletion is possible while any snapshot exists",
      "The snapshot is automatically copied to another volume before the PVC is deleted"
    ]
  }
},
{
  "id": "t11-t1",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "À quoi sert la commande `kubectl attach mypod`, par rapport à `kubectl exec` ?",
  "choices": [
    "Elle se connecte à un processus déjà en cours d'exécution dans un conteneur existant, alors que kubectl exec lance une nouvelle commande",
    "Elle fait exactement la même chose que kubectl exec, ce sont deux alias",
    "Elle ne fonctionne que sur des conteneurs déjà arrêtés",
    "Elle télécharge les logs complets du conteneur dans un fichier local"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc décrit kubectl attach comme permettant de « attach to a process that is already running inside an existing container », par opposition à exec qui exécute une nouvelle commande.",
    "Faux : ce sont deux commandes aux comportements distincts, pas des alias.",
    "Faux : attach cible un conteneur en cours d'exécution, pas un conteneur arrêté.",
    "Faux : ce n'est pas le rôle d'attach, c'est celui de kubectl logs."
  ],
  "explain": "kubectl attach se connecte directement aux flux stdin/stdout/stderr d'un processus déjà en cours d'exécution dans un conteneur, contrairement à kubectl exec qui lance une nouvelle commande/processus dans le conteneur ; le flag --detach-keys (défaut ctrl-p,ctrl-q) permet de se détacher sans terminer le processus.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_attach/",
  "en": {
    "q": "What is `kubectl attach mypod` used for, compared to `kubectl exec`?",
    "choices": [
      "It attaches to a process already running inside an existing container, whereas kubectl exec launches a new command",
      "It does exactly the same thing as kubectl exec, they're aliases",
      "It only works on already-stopped containers",
      "It downloads the container's complete logs to a local file"
    ]
  }
},
{
  "id": "t11-t10",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "La commande `kubectl port-forward pod/mypod 5000 6000` est-elle valide, et que fait-elle ?",
  "choices": [
    "Elle est invalide, kubectl port-forward n'accepte qu'un seul port à la fois",
    "Elle est valide : elle écoute localement sur les ports 5000 ET 6000, en les redirigeant respectivement vers les ports 5000 et 6000 du Pod",
    "Elle est valide mais redirige uniquement le port 6000, 5000 étant ignoré",
    "Elle nécessite obligatoirement la syntaxe LOCAL:REMOTE pour chaque port, sinon elle échoue"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : plusieurs paires de ports sont explicitement supportées dans une seule commande.",
    "Vrai : la doc illustre exactement cet exemple « Listen on ports 5000 and 6000 locally, forwarding data to/from ports 5000 and 6000 in the pod ».",
    "Faux : les deux ports sont bien redirigés simultanément.",
    "Faux : la syntaxe [LOCAL_PORT:]REMOTE_PORT permet d'omettre le port local, auquel cas il est identique au port distant."
  ],
  "explain": "kubectl port-forward accepte plusieurs paires de ports en une seule commande (syntaxe [LOCAL_PORT:]REMOTE_PORT [...[LOCAL_PORT_N:]REMOTE_PORT_N]) ; en omettant le préfixe LOCAL_PORT:, le port local utilisé est identique au port distant, permettant de rediriger plusieurs ports simultanément sans lancer plusieurs commandes.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/",
  "en": {
    "q": "Is the command `kubectl port-forward pod/mypod 5000 6000` valid, and what does it do?",
    "choices": [
      "It's invalid, kubectl port-forward only accepts one port at a time",
      "It's valid: it listens locally on both ports 5000 AND 6000, forwarding them respectively to ports 5000 and 6000 on the Pod",
      "It's valid but only forwards port 6000, with 5000 being ignored",
      "It requires the LOCAL:REMOTE syntax for each port, otherwise it fails"
    ]
  }
},
{
  "id": "t11-t11",
  "domain": "troubleshooting",
  "difficulty": "hard",
  "q": "Quelle est la valeur par défaut du flag `--address` de `kubectl port-forward`, et que se passe-t-il précisément quand cette valeur par défaut est utilisée ?",
  "choices": [
    "Défaut \"localhost\" ; kubectl tente de se lier à la fois sur 127.0.0.1 et ::1, et échoue seulement si aucune des deux n'est disponible",
    "Défaut \"0.0.0.0\" ; kubectl écoute sur toutes les interfaces réseau du poste",
    "Défaut \"127.0.0.1\" uniquement, sans tentative sur l'IPv6 ::1",
    "Il n'existe aucune valeur par défaut, --address doit toujours être précisé explicitement"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « Default: \"localhost\" » et « When localhost is supplied, kubectl will try to bind on both 127.0.0.1 and ::1 and will fail if neither of these addresses are available to bind. »",
    "Faux : 0.0.0.0 n'est pas la valeur par défaut, c'est localhost.",
    "Faux : la valeur localhost par défaut tente bien aussi ::1 (IPv6), pas seulement 127.0.0.1.",
    "Faux : --address a bien une valeur par défaut documentée (localhost)."
  ],
  "explain": "Par défaut, --address vaut \"localhost\", ce qui pousse kubectl à tenter un bind simultané sur 127.0.0.1 (IPv4) et ::1 (IPv6) ; l'échec ne survient que si aucune de ces deux adresses n'est disponible pour l'écoute — le flag accepte aussi des adresses IP explicites, séparées par des virgules.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/",
  "en": {
    "q": "What is the default value of the `--address` flag of `kubectl port-forward`, and what precisely happens when this default is used?",
    "choices": [
      "Default \"localhost\"; kubectl tries to bind on both 127.0.0.1 and ::1, and only fails if neither is available",
      "Default \"0.0.0.0\"; kubectl listens on all network interfaces of the machine",
      "Default \"127.0.0.1\" only, with no attempt on IPv6 ::1",
      "There is no default value, --address must always be explicitly specified"
    ]
  }
},
{
  "id": "t11-t12",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Peut-on utiliser simultanément les flags `--since` et `--since-time` de `kubectl logs` ?",
  "choices": [
    "Non, la documentation précise qu'un seul des deux peut être utilisé (since-time / since)",
    "Oui, les deux peuvent être combinés pour affiner encore plus la fenêtre temporelle",
    "Oui, mais uniquement si --timestamps est également précisé",
    "Ces deux flags n'existent pas, seul --tail permet de filtrer les logs par date"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise pour --since-time « Only one of since-time / since may be used. »",
    "Faux : la doc interdit explicitement de les combiner.",
    "Faux : aucune condition liée à --timestamps n'autorise leur combinaison.",
    "Faux : --since et --since-time sont bien deux flags distincts et documentés, --tail ne filtrant pas par date mais par nombre de lignes."
  ],
  "explain": "--since (durée relative, ex. 5m) et --since-time (date absolue au format RFC3339) sont mutuellement exclusifs sur kubectl logs : la documentation précise qu'un seul des deux peut être utilisé à la fois pour délimiter la fenêtre temporelle des logs affichés.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/",
  "en": {
    "q": "Can the `--since` and `--since-time` flags of `kubectl logs` be used together?",
    "choices": [
      "No, the documentation states only one of the two may be used (since-time / since)",
      "Yes, both can be combined to further narrow the time window",
      "Yes, but only if --timestamps is also specified",
      "Neither of these flags exists, only --tail can filter logs by date"
    ]
  }
},
{
  "id": "t11-t13",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Sur `kubectl delete pods --all`, que devient le comportement du flag `--ignore-not-found` ?",
  "choices": [
    "Il n'a aucun rapport avec --all, il garde toujours sa valeur explicite",
    "Il passe automatiquement à true dès lors que --all est spécifié",
    "Il passe automatiquement à false, forçant une erreur si aucun pod n'existe",
    "--all et --ignore-not-found sont mutuellement exclusifs, la commande échoue"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : la doc précise justement un couplage entre les deux flags.",
    "Vrai : la doc précise que quand --all est spécifié, --ignore-not-found passe par défaut à true.",
    "Faux : c'est l'inverse — --all fait passer --ignore-not-found à true, pas à false.",
    "Faux : ces deux flags ne sont pas mutuellement exclusifs, --all influence simplement le défaut de l'autre."
  ],
  "explain": "kubectl delete --all supprime toutes les ressources du type spécifié dans le namespace ciblé ; quand ce flag est utilisé, --ignore-not-found passe automatiquement à true, évitant une erreur si, par exemple, aucune ressource du type donné n'existe déjà.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/",
  "en": {
    "q": "On `kubectl delete pods --all`, what happens to the `--ignore-not-found` flag's behavior?",
    "choices": [
      "It has nothing to do with --all, it always keeps its explicit value",
      "It automatically defaults to true whenever --all is specified",
      "It automatically defaults to false, forcing an error if no pod exists",
      "--all and --ignore-not-found are mutually exclusive, the command fails"
    ]
  }
},
{
  "id": "t11-t14",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait le flag `-i`/`--interactive` de `kubectl delete` ?",
  "choices": [
    "Il supprime la ressource uniquement si l'utilisateur confirme, en demandant une validation avant chaque suppression",
    "Il ouvre un terminal interactif dans le Pod avant de le supprimer",
    "Il liste les ressources qui seraient supprimées sans les supprimer réellement (dry-run)",
    "Ce flag n'existe pas pour kubectl delete"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « If true, delete resource only when user confirms », avec l'exemple kubectl delete pods --all --interactive.",
    "Faux : --interactive ne lance aucun terminal, il ne fait que demander une confirmation textuelle.",
    "Faux : c'est le rôle de --dry-run, distinct de --interactive.",
    "Faux : -i/--interactive est un flag bien réel et documenté de kubectl delete."
  ],
  "explain": "Le flag -i/--interactive de kubectl delete demande une confirmation à l'utilisateur avant de supprimer chaque ressource ciblée, utile en combinaison avec --all pour éviter une suppression accidentelle massive.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/",
  "en": {
    "q": "What does the `-i`/`--interactive` flag of `kubectl delete` do?",
    "choices": [
      "It deletes the resource only if the user confirms, asking for validation before each deletion",
      "It opens an interactive terminal in the Pod before deleting it",
      "It lists the resources that would be deleted without actually deleting them (dry-run)",
      "This flag doesn't exist for kubectl delete"
    ]
  }
},
{
  "id": "t11-t2",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Quelle est la valeur par défaut du flag `--restart` de `kubectl run`, et quelles sont les valeurs légales ?",
  "choices": [
    "Défaut Always ; valeurs légales Always, OnFailure, Never",
    "Défaut Never ; valeurs légales Never, OnFailure uniquement",
    "Défaut OnFailure ; aucune autre valeur n'est acceptée",
    "Ce flag n'existe pas pour kubectl run"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « The restart policy for this Pod. Legal values [Always, OnFailure, Never] » avec Always comme valeur par défaut.",
    "Faux : Never n'est pas la valeur par défaut, c'est Always.",
    "Faux : OnFailure n'est ni le défaut, ni la seule valeur possible.",
    "Faux : --restart est un flag bien réel et documenté de kubectl run."
  ],
  "explain": "Le flag --restart de kubectl run définit la restartPolicy du Pod créé, avec Always comme valeur par défaut ; les trois valeurs légales documentées sont Always, OnFailure et Never.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_run/",
  "en": {
    "q": "What is the default value of the `--restart` flag of `kubectl run`, and what are the legal values?",
    "choices": [
      "Default Always; legal values Always, OnFailure, Never",
      "Default Never; legal values Never, OnFailure only",
      "Default OnFailure; no other value is accepted",
      "This flag doesn't exist for kubectl run"
    ]
  }
},
{
  "id": "t11-t3",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Après `kubectl delete pod/busybox1`, que fait `kubectl wait --for=delete pod/busybox1 --timeout=60s` ?",
  "choices": [
    "Elle attend que le Pod soit recréé automatiquement, jusqu'à 60 secondes",
    "Elle attend que le Pod soit totalement supprimé du cluster, avec un délai maximum de 60 secondes",
    "Elle force la suppression immédiate du Pod, sans attendre",
    "Elle échoue systématiquement car le Pod n'existe déjà plus"
  ],
  "correct": [
    1
  ],
  "why": [
    "Faux : rien ne recrée automatiquement le Pod après un delete simple.",
    "Vrai : la doc illustre exactement ce scénario, --for=delete attendant que la ressource soit supprimée, avec l'exemple « Wait for the pod busybox1 to be deleted, with a timeout of 60s, after having issued the delete command ».",
    "Faux : kubectl wait ne force aucune suppression, il observe seulement l'état.",
    "Faux : --for=delete est justement conçu pour ce cas d'usage et ne provoque pas d'échec automatique."
  ],
  "explain": "kubectl wait --for=delete permet d'attendre la disparition effective d'une ressource après une commande delete, avec un timeout configurable ; c'est l'une des valeurs possibles de --for aux côtés de create, condition=... et jsonpath='...'=....",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_wait/",
  "en": {
    "q": "After `kubectl delete pod/busybox1`, what does `kubectl wait --for=delete pod/busybox1 --timeout=60s` do?",
    "choices": [
      "It waits for the Pod to be automatically recreated, up to 60 seconds",
      "It waits for the Pod to be fully removed from the cluster, with a maximum delay of 60 seconds",
      "It forces the Pod's immediate deletion, without waiting",
      "It always fails because the Pod no longer exists"
    ]
  }
},
{
  "id": "t11-t4",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Quelle est la différence entre `crictl ps` et `crictl ps -a` ?",
  "choices": [
    "crictl ps liste uniquement les conteneurs en cours d'exécution (Running) ; crictl ps -a liste tous les conteneurs, y compris ceux à l'état Exited",
    "crictl ps -a n'affiche que les conteneurs déjà supprimés",
    "Les deux commandes produisent exactement la même sortie",
    "crictl ps -a nécessite des droits root supplémentaires que crictl ps ne nécessite pas"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : l'exemple documenté de crictl ps -a montre un conteneur supplémentaire avec State: Exited, absent de la sortie de crictl ps seul, confirmant que -a inclut les conteneurs arrêtés en plus des conteneurs en cours d'exécution.",
    "Faux : -a affiche les conteneurs en cours ET arrêtés, pas seulement les supprimés.",
    "Faux : la sortie diffère précisément par l'inclusion des conteneurs Exited.",
    "Faux : aucune différence de droits n'est documentée entre les deux formes de la commande."
  ],
  "explain": "Par défaut, crictl ps liste uniquement les conteneurs actuellement en état Running ; le flag -a (--all) étend la liste à tous les conteneurs gérés par le runtime CRI, y compris ceux à l'état Exited, utile pour diagnostiquer un conteneur qui a crashé.",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/",
  "en": {
    "q": "What is the difference between `crictl ps` and `crictl ps -a`?",
    "choices": [
      "crictl ps only lists running containers; crictl ps -a lists all containers, including ones in the Exited state",
      "crictl ps -a only shows already-removed containers",
      "Both commands produce exactly the same output",
      "crictl ps -a requires additional root privileges that crictl ps does not require"
    ]
  }
},
{
  "id": "t11-t5",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Que fait la commande `crictl logs --tail=1 87d3992f84f74` ?",
  "choices": [
    "Elle affiche uniquement la dernière ligne de log du conteneur identifié par cet ID",
    "Elle affiche les logs des 1 dernières minutes",
    "Elle supprime tous les logs sauf le dernier",
    "Le flag --tail n'existe pas pour crictl logs, seulement pour kubectl logs"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : l'exemple documenté « Get only the latest N lines of logs » avec crictl logs --tail=1 87d3992f84f74 confirme cet usage, --tail=1 affichant la dernière ligne.",
    "Faux : --tail concerne un nombre de lignes, pas une durée en minutes.",
    "Faux : crictl logs ne modifie ni ne supprime aucun log, il se contente de les afficher.",
    "Faux : --tail est bien un flag documenté de crictl logs, distinct de kubectl logs."
  ],
  "explain": "crictl logs récupère les logs d'un conteneur identifié par son ID (obtenu via crictl ps) ; le flag --tail=N limite l'affichage aux N dernières lignes, comme le montre l'exemple documenté avec --tail=1.",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/",
  "en": {
    "q": "What does the `crictl logs --tail=1 87d3992f84f74` command do?",
    "choices": [
      "It shows only the last log line of the container identified by that ID",
      "It shows the logs from the last 1 minute",
      "It deletes all logs except the last one",
      "The --tail flag doesn't exist for crictl logs, only for kubectl logs"
    ]
  }
},
{
  "id": "t11-t6",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Comment filtrer la sortie de `crictl pods` pour ne voir que les pods portant le label `run=nginx` ?",
  "choices": [
    "crictl pods --label run=nginx",
    "crictl pods --selector run=nginx",
    "crictl pods -l=run:nginx",
    "crictl ne permet pas de filtrer par label, seulement par nom"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc illustre exactement cette syntaxe pour filtrer par label : « crictl pods --label run=nginx ».",
    "Faux : ce n'est pas la syntaxe documentée pour crictl (--selector est une convention kubectl, pas crictl).",
    "Faux : ce n'est pas non plus la syntaxe documentée.",
    "Faux : crictl pods permet bien de filtrer à la fois par --name et par --label, d'après les exemples documentés."
  ],
  "explain": "crictl pods liste les sandbox pods gérés par le runtime CRI ; on peut filtrer cette liste par nom (--name) ou par label (--label clé=valeur), comme illustré par l'exemple crictl pods --label run=nginx.",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/",
  "en": {
    "q": "How do you filter `crictl pods` output to only see pods with the label `run=nginx`?",
    "choices": [
      "crictl pods --label run=nginx",
      "crictl pods --selector run=nginx",
      "crictl pods -l=run:nginx",
      "crictl doesn't support filtering by label, only by name"
    ]
  }
},
{
  "id": "t11-t7",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait le flag `-q` de la commande `crictl images` ?",
  "choices": [
    "Il n'affiche que les identifiants (IDs) des images, sans les autres colonnes",
    "Il met la commande en mode silencieux, sans aucune sortie",
    "Il filtre les images par nom de repository",
    "Il supprime les images inutilisées (équivalent d'un prune)"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc illustre « Only list image IDs: crictl images -q », confirmant que -q restreint la sortie aux seuls identifiants d'image.",
    "Faux : la commande produit toujours une sortie (la liste des IDs), elle n'est pas totalement silencieuse.",
    "Faux : c'est le rôle d'un argument positionnel comme crictl images nginx, pas de -q.",
    "Faux : -q ne supprime aucune image, il modifie seulement la présentation de la liste."
  ],
  "explain": "crictl images liste toutes les images connues du runtime CRI (repository, tag, ID, taille) ; le flag -q réduit cette sortie aux seuls IDs d'image, utile pour être chaîné avec d'autres commandes scriptées.",
  "ref": "https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/",
  "en": {
    "q": "What does the `-q` flag of the `crictl images` command do?",
    "choices": [
      "It only shows image IDs, without the other columns",
      "It puts the command in silent mode, with no output at all",
      "It filters images by repository name",
      "It removes unused images (equivalent to a prune)"
    ]
  }
},
{
  "id": "t11-t8",
  "domain": "troubleshooting",
  "difficulty": "medium",
  "q": "Que fait le flag `--disable-eviction` de `kubectl drain` ?",
  "choices": [
    "Il force drain à utiliser delete plutôt que l'Eviction API, contournant ainsi la vérification des PodDisruptionBudgets",
    "Il désactive complètement la commande drain, qui ne fait alors rien",
    "Il empêche tout Pod d'être supprimé du nœud, même avec drain",
    "Il n'a d'effet que sur les DaemonSets"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « Force drain to use delete, even if eviction is supported. This will bypass checking PodDisruptionBudgets, use with caution. »",
    "Faux : le drain continue de fonctionner, mais via delete plutôt que via l'Eviction API.",
    "Faux : ce n'est pas un blocage total de la suppression, seulement un changement de mécanisme.",
    "Faux : rien ne restreint cet effet aux seuls DaemonSets."
  ],
  "explain": "Par défaut, kubectl drain utilise l'Eviction API (qui respecte les PodDisruptionBudgets) quand le serveur la supporte ; --disable-eviction force l'utilisation d'un DELETE classique à la place, contournant ainsi la protection des PDB — à utiliser avec prudence selon la documentation.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_drain/",
  "en": {
    "q": "What does the `--disable-eviction` flag of `kubectl drain` do?",
    "choices": [
      "It forces drain to use delete instead of the Eviction API, bypassing PodDisruptionBudget checks",
      "It completely disables the drain command, which then does nothing",
      "It prevents any Pod from being removed from the node, even with drain",
      "It only has an effect on DaemonSets"
    ]
  }
},
{
  "id": "t11-t9",
  "domain": "troubleshooting",
  "difficulty": "easy",
  "q": "Que fait le flag `--no-preserve` de `kubectl cp` ?",
  "choices": [
    "L'ownership et les permissions du fichier/répertoire copié ne seront pas préservés dans le conteneur",
    "Il empêche kubectl cp de préserver une copie locale du fichier après le transfert",
    "Il supprime le fichier source après la copie",
    "Ce flag n'existe pas pour kubectl cp"
  ],
  "correct": [
    0
  ],
  "why": [
    "Vrai : la doc précise « The copied file/directory's ownership and permissions will not be preserved in the container ».",
    "Faux : ce flag concerne l'ownership/permissions dans le conteneur cible, pas une copie locale.",
    "Faux : kubectl cp ne supprime jamais le fichier source, quel que soit ce flag.",
    "Faux : --no-preserve est un flag bien réel et documenté de kubectl cp."
  ],
  "explain": "Par défaut, kubectl cp tente de préserver l'ownership et les permissions du fichier copié ; --no-preserve désactive cette préservation, ce qui peut être utile ou nécessaire selon le contexte du conteneur cible.",
  "ref": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cp/",
  "en": {
    "q": "What does the `--no-preserve` flag of `kubectl cp` do?",
    "choices": [
      "The copied file/directory's ownership and permissions will not be preserved in the container",
      "It prevents kubectl cp from keeping a local copy of the file after the transfer",
      "It deletes the source file after copying",
      "This flag doesn't exist for kubectl cp"
    ]
  }
}
  ];
  DATA.forEach((o) => Q.push(Object.assign({ type: "theory" }, o)));
  window.CKA._t11 = DATA.length;
})();
