// Lot 2 : +100 questions théoriques. Chaque réponse = une source d'apprentissage
// (explication PAR OPTION via why[] + synthèse + lien doc officielle).
// Basé sur kubernetes.io / cloudnative-pg.io.
(function () {
  const Q = window.CKA.questions;
  const T = (o) => Q.push(Object.assign({ type: "theory" }, o));
  const K = "https://kubernetes.io/docs/";
  const CN = "https://cloudnative-pg.io/docs/1.29/";

  /* ============ ARCHITECTURE (22) ============ */
  T({ id: "t2-a1", domain: "architecture", difficulty: "easy", q: "Quel port TCP écoute le client etcd par défaut ?", choices: ["2379", "6443", "10250", "8080"], correct: [0],
    why: ["Correct : etcd sert les clients sur 2379 (2380 pour le peer).", "Faux : 6443 est le port HTTPS de l'API server.", "Faux : 10250 est le port du kubelet.", "Faux : 8080 est l'ancien port HTTP non sécurisé (désactivé)."],
    explain: "L'API server se connecte à etcd sur 2379.", ref: K + "concepts/overview/components/#etcd" });
  T({ id: "t2-a2", domain: "architecture", difficulty: "easy", q: "Sur quel port l'API server écoute-t-il en HTTPS par défaut ?", choices: ["443", "6443", "8443", "2379"], correct: [1],
    why: ["Faux : 443 est le HTTPS standard, mais pas le port par défaut de kube-apiserver.", "Correct : kube-apiserver sert l'API sécurisée sur 6443.", "Faux : 8443 n'est pas le défaut.", "Faux : 2379 est le port client d'etcd."],
    explain: "Le kubeconfig pointe vers https://<ip>:6443.", ref: K + "reference/networking/ports-and-protocols/" });
  T({ id: "t2-a3", domain: "architecture", difficulty: "easy", q: "Quel composant exécute les boucles de contrôle (reconcile désiré/réel) ?", choices: ["kube-scheduler", "kube-controller-manager", "kubelet", "etcd"], correct: [1],
    why: ["Faux : le scheduler ne fait que placer les Pods.", "Correct : kube-controller-manager héberge les contrôleurs (node, replication, endpoints, CSR…).", "Faux : le kubelet agit au niveau d'un nœud.", "Faux : etcd stocke l'état."],
    explain: "Chaque contrôleur rapproche l'état réel de l'état désiré.", ref: K + "concepts/overview/components/#kube-controller-manager" });
  T({ id: "t2-a4", domain: "architecture", difficulty: "easy", q: "Quelle commande liste les types de ressources et leurs noms courts ?", choices: ["kubectl api-resources", "kubectl get all", "kubectl explain", "kubectl types"], correct: [0],
    why: ["Correct : `api-resources` liste ressources, shortnames, kind et scope.", "Faux : `get all` liste des objets courants, pas les types.", "Faux : `explain` documente les champs d'une ressource.", "Faux : `kubectl types` n'existe pas."],
    explain: "Pratique pour retrouver un shortname (ex. po, deploy, svc).", ref: K + "reference/kubectl/" });
  T({ id: "t2-a5", domain: "architecture", difficulty: "medium", q: "kubeadm active quels modes d'autorisation par défaut ?", choices: ["ABAC seul", "AlwaysAllow", "Node et RBAC", "Webhook seul"], correct: [2],
    why: ["Faux : ABAC est basé sur des fichiers de policy, non utilisé par défaut.", "Faux : AlwaysAllow désactiverait toute autorisation (dangereux).", "Correct : kubeadm configure les authorizers Node,RBAC.", "Faux : Webhook délègue à un service externe, pas le défaut."],
    explain: "Node autorise les kubelets ; RBAC gère les rôles.", ref: K + "reference/access-authn-authz/authorization/" });
  T({ id: "t2-a6", domain: "architecture", difficulty: "medium", q: "Pour donner tous les droits cluster à un sujet, on le lie à quel ClusterRole intégré ?", choices: ["admin", "edit", "cluster-admin", "view"], correct: [2],
    why: ["Faux : `admin` est puissant mais namespacé, pas total sur le cluster.", "Faux : `edit` permet de modifier des objets, sans droits d'admin.", "Correct : `cluster-admin` accorde un accès complet (via ClusterRoleBinding).", "Faux : `view` est en lecture seule."],
    explain: "cluster-admin est le rôle le plus privilégié fourni.", ref: K + "reference/access-authn-authz/rbac/#user-facing-roles" });
  T({ id: "t2-a7", domain: "architecture", difficulty: "medium", q: "Quel flag de `kubeadm init` définit le CIDR réseau des Pods ?", choices: ["--service-cidr", "--pod-network-cidr", "--cni-cidr", "--cluster-cidr"], correct: [1],
    why: ["Faux : `--service-cidr` concerne les IP des Services.", "Correct : `--pod-network-cidr` fixe la plage des Pods (à accorder au CNI).", "Faux : `--cni-cidr` n'existe pas.", "Faux : `--cluster-cidr` n'est pas le flag de kubeadm init."],
    explain: "Ex. 10.244.0.0/16 pour Flannel.", ref: K + "reference/setup-tools/kubeadm/kubeadm-init/" });
  T({ id: "t2-a8", domain: "architecture", difficulty: "easy", q: "Quel objet étend l'API Kubernetes avec un nouveau type de ressource ?", choices: ["CustomResourceDefinition", "APIService add-on", "ConfigMap", "Aggregator"], correct: [0],
    why: ["Correct : une CRD déclare un nouveau kind géré par l'API.", "Faux : APIService sert l'aggregation d'API externes, cas plus avancé.", "Faux : un ConfigMap stocke de la config, pas un type.", "Faux : l'aggregation layer est un mécanisme, pas l'objet déclarant un type."],
    explain: "Les opérateurs s'appuient sur des CRD (ex. Cluster de CNPG).", ref: K + "concepts/extend-kubernetes/api-extension/custom-resources/" });
  T({ id: "t2-a9", domain: "architecture", difficulty: "medium", q: "Durée de vie par défaut d'un token de jointure kubeadm ?", choices: ["1 heure", "24 heures", "7 jours", "illimité"], correct: [1],
    why: ["Faux : trop court, ce n'est pas le défaut.", "Correct : le token expire après 24h par défaut.", "Faux : 7 jours n'est pas la valeur par défaut.", "Faux : un token illimité serait un risque de sécurité."],
    explain: "On régénère avec `kubeadm token create --print-join-command`.", ref: K + "reference/setup-tools/kubeadm/kubeadm-token/" });
  T({ id: "t2-a10", domain: "architecture", difficulty: "medium", q: "Comment changer le namespace par défaut du contexte kubectl courant ?", choices: ["kubectl config set-context --current --namespace=dev", "kubectl set namespace dev", "kubectl namespace dev", "kubectl config namespace dev"], correct: [0],
    why: ["Correct : met à jour le namespace du contexte courant.", "Faux : `kubectl set namespace` n'existe pas.", "Faux : `kubectl namespace` n'est pas une commande.", "Faux : `config namespace` n'est pas une sous-commande valide."],
    explain: "Évite de répéter -n à chaque commande.", ref: K + "reference/kubectl/generated/kubectl_config/kubectl_config_set-context/" });
  T({ id: "t2-a11", domain: "architecture", difficulty: "hard", q: "Quel contrôleur signe les CertificateSigningRequests approuvées ?", choices: ["kube-scheduler", "kube-controller-manager", "kubelet", "etcd"], correct: [1],
    why: ["Faux : le scheduler place les Pods.", "Correct : le csrsigning controller (dans kube-controller-manager) signe les CSR approuvées.", "Faux : le kubelet demande des certificats, il ne les signe pas.", "Faux : etcd ne signe rien."],
    explain: "L'approbation et la signature sont deux étapes distinctes.", ref: K + "reference/access-authn-authz/certificate-signing-requests/" });
  T({ id: "t2-a12", domain: "architecture", difficulty: "medium", q: "Où kubeadm écrit-il le kubeconfig administrateur ?", choices: ["/root/.kube/config", "/etc/kubernetes/admin.conf", "/var/lib/kubelet/config.yaml", "/etc/kubernetes/pki/admin"], correct: [1],
    why: ["Faux : ~/.kube/config est la copie de destination, pas la source générée.", "Correct : kubeadm génère /etc/kubernetes/admin.conf.", "Faux : c'est la config du kubelet, pas le kubeconfig admin.", "Faux : /etc/kubernetes/pki contient les certificats, pas le kubeconfig."],
    explain: "On copie admin.conf dans ~/.kube/config pour utiliser kubectl.", ref: K + "setup/production-environment/tools/kubeadm/create-cluster-kubeadm/" });
  T({ id: "t2-a13", domain: "architecture", difficulty: "hard", q: "Quel objet limite la consommation agrégée de ressources d'un namespace ?", choices: ["LimitRange", "ResourceQuota", "PriorityClass", "PodDisruptionBudget"], correct: [1],
    why: ["Faux : LimitRange fixe des bornes par conteneur/Pod, pas la somme.", "Correct : ResourceQuota plafonne la somme (CPU, mémoire, nombre d'objets) du namespace.", "Faux : PriorityClass définit une priorité de scheduling.", "Faux : PDB protège la disponibilité pendant les évictions."],
    explain: "ResourceQuota agit à l'échelle du namespace entier.", ref: K + "concepts/policy/resource-quotas/" });
  T({ id: "t2-a14", domain: "architecture", difficulty: "medium", q: "Quel objet fixe des defaults/min/max de requests-limits par conteneur dans un namespace ?", choices: ["ResourceQuota", "LimitRange", "HorizontalPodAutoscaler", "PriorityClass"], correct: [1],
    why: ["Faux : ResourceQuota borne la somme du namespace, pas par conteneur.", "Correct : LimitRange applique defaults et bornes aux conteneurs/Pods.", "Faux : HPA ajuste le nombre de répliques.", "Faux : PriorityClass concerne la priorité, pas les ressources."],
    explain: "LimitRange complète ResourceQuota (par objet vs global).", ref: K + "concepts/policy/limit-range/" });
  T({ id: "t2-a15", domain: "architecture", difficulty: "hard", q: "Un PodDisruptionBudget protège contre quoi ?", choices: ["Les crashs applicatifs", "Les disruptions volontaires (drain) en garantissant un minimum de Pods", "Les attaques réseau", "La perte de données etcd"], correct: [1],
    why: ["Faux : un crash est une disruption involontaire, hors périmètre du PDB.", "Correct : le PDB limite les Pods simultanément indisponibles lors d'évictions volontaires (drain).", "Faux : la sécurité réseau relève des NetworkPolicies.", "Faux : la sauvegarde etcd est un autre sujet."],
    explain: "Utile pour garantir la dispo pendant la maintenance des nœuds.", ref: K + "tasks/run-application/configure-pdb/" });
  T({ id: "t2-a16", domain: "architecture", difficulty: "easy", q: "Quelle commande renouvelle les certificats gérés par kubeadm ?", choices: ["kubeadm certs renew all", "kubeadm reset certs", "kubectl renew certs", "openssl renew"], correct: [0],
    why: ["Correct : `kubeadm certs renew all` renouvelle tous les certificats.", "Faux : `kubeadm reset` détruit l'installation, ce n'est pas un renew.", "Faux : `kubectl renew` n'existe pas.", "Faux : `openssl renew` n'est pas une commande."],
    explain: "`kubeadm certs check-expiration` affiche les échéances.", ref: K + "tasks/administer-cluster/kubeadm/kubeadm-certs/" });
  T({ id: "t2-a17", domain: "architecture", difficulty: "medium", q: "Quel fichier de config le kubelet installé par kubeadm utilise-t-il ?", choices: ["/etc/kubernetes/kubelet.conf uniquement", "/var/lib/kubelet/config.yaml", "/etc/kubelet.yaml", "/etc/systemd/kubelet"], correct: [1],
    why: ["Faux : kubelet.conf est le kubeconfig d'authentification, pas la config de comportement.", "Correct : la config du kubelet est /var/lib/kubelet/config.yaml.", "Faux : chemin inexistant.", "Faux : le fichier systemd règle le service, pas la config kubelet."],
    explain: "Distinguer kubelet.conf (auth) et config.yaml (paramètres).", ref: K + "reference/config-api/kubelet-config.v1beta1/" });
  T({ id: "t2-a18", domain: "architecture", difficulty: "medium", q: "Quelle commande crée un ClusterRoleBinding donnant cluster-admin à l'utilisateur bob ?", choices: ["kubectl create clusterrolebinding bob-admin --clusterrole=cluster-admin --user=bob", "kubectl bind bob cluster-admin", "kubectl create rolebinding bob --role=cluster-admin", "kubectl grant bob admin"], correct: [0],
    why: ["Correct : crée un ClusterRoleBinding vers le ClusterRole cluster-admin pour user=bob.", "Faux : `kubectl bind` n'existe pas.", "Faux : un rolebinding est namespacé et --role ne référence pas un ClusterRole ici.", "Faux : `kubectl grant` n'existe pas."],
    explain: "Pour un droit cluster-wide, il faut un ClusterRoleBinding.", ref: K + "reference/access-authn-authz/rbac/" });
  T({ id: "t2-a19", domain: "architecture", difficulty: "hard", q: "Que fait `kubeadm upgrade apply v1.31.1` ?", choices: ["Met à niveau les composants du control plane vers cette version", "Met à niveau uniquement kubelet", "Sauvegarde etcd", "Réinitialise le cluster"], correct: [0],
    why: ["Correct : sur le 1er control plane, met à niveau api-server, controller-manager, scheduler…", "Faux : kubelet se met à jour séparément (paquet + restart).", "Faux : ce n'est pas une commande de sauvegarde.", "Faux : `kubeadm reset` réinitialise, pas `upgrade apply`."],
    explain: "Les workers se mettent à jour ensuite via `kubeadm upgrade node`.", ref: K + "tasks/administer-cluster/kubeadm/kubeadm-upgrade/" });
  T({ id: "t2-a20", domain: "architecture", difficulty: "easy", q: "Quel composant s'exécute sur chaque nœud pour piloter containers et Pods ?", choices: ["kube-proxy", "kubelet", "container-runtime seul", "etcd"], correct: [1],
    why: ["Faux : kube-proxy gère le réseau des Services, pas le cycle de vie des Pods.", "Correct : le kubelet applique les PodSpecs via le CRI.", "Faux : le runtime exécute les conteneurs mais est piloté par le kubelet.", "Faux : etcd est côté control plane."],
    explain: "Le kubelet rend le nœud Ready et surveille les Pods.", ref: K + "concepts/overview/components/#kubelet" });
  T({ id: "t2-a21", domain: "architecture", difficulty: "medium", q: "Quel add-on assure la résolution DNS interne du cluster ?", choices: ["kube-proxy", "CoreDNS", "etcd", "metrics-server"], correct: [1],
    why: ["Faux : kube-proxy programme les règles réseau des Services.", "Correct : CoreDNS fournit le DNS des Services et Pods.", "Faux : etcd stocke l'état.", "Faux : metrics-server sert les métriques (top/HPA)."],
    explain: "CoreDNS tourne dans kube-system.", ref: K + "tasks/administer-cluster/coredns/" });
  T({ id: "t2-a22", domain: "architecture", difficulty: "medium", q: "Sur un nœud, quelle commande systemd inspecte l'état du kubelet ?", choices: ["systemctl status kubelet", "kubectl get kubelet", "service apiserver status", "journalctl kube-proxy"], correct: [0],
    why: ["Correct : `systemctl status kubelet` (et journalctl -u kubelet) diagnostique le nœud.", "Faux : le kubelet n'est pas une ressource kubectl.", "Faux : l'API server n'est pas le sujet ici.", "Faux : la syntaxe journalctl est incorrecte et vise kube-proxy."],
    explain: "Réflexe pour un nœud NotReady.", ref: K + "tasks/debug/debug-cluster/" });

  /* ============ WORKLOADS (18) ============ */
  T({ id: "t2-w1", domain: "workloads", difficulty: "easy", q: "Quel champ définit le nombre de répliques d'un Deployment ?", choices: ["spec.count", "spec.replicas", "status.replicas", "spec.scale"], correct: [1],
    why: ["Faux : `spec.count` n'existe pas.", "Correct : `spec.replicas` fixe le nombre désiré.", "Faux : `status.replicas` est observé (lecture), pas désiré.", "Faux : `spec.scale` n'existe pas."],
    explain: "`kubectl scale` modifie ce champ.", ref: K + "concepts/workloads/controllers/deployment/" });
  T({ id: "t2-w2", domain: "workloads", difficulty: "medium", q: "À quelle stratégie appartiennent maxSurge et maxUnavailable ?", choices: ["Recreate", "RollingUpdate", "Canary", "OnDelete"], correct: [1],
    why: ["Faux : Recreate supprime tout d'un coup, sans surge/unavailable.", "Correct : maxSurge/maxUnavailable pilotent le RollingUpdate.", "Faux : le canary n'est pas une stratégie native du Deployment.", "Faux : OnDelete concerne StatefulSet/DaemonSet."],
    explain: "Ils règlent la vitesse/tolérance de la mise à jour.", ref: K + "concepts/workloads/controllers/deployment/#rolling-update-deployment" });
  T({ id: "t2-w3", domain: "workloads", difficulty: "medium", q: "Quelle commande met en pause un rollout en cours ?", choices: ["kubectl rollout pause deployment/web", "kubectl pause deployment web", "kubectl rollout stop web", "kubectl scale --pause"], correct: [0],
    why: ["Correct : `rollout pause` fige les mises à jour.", "Faux : `kubectl pause` n'existe pas.", "Faux : `rollout stop` n'existe pas.", "Faux : `scale --pause` n'existe pas."],
    explain: "Utile pour empiler plusieurs changements avant de reprendre.", ref: K + "reference/generated/kubectl/kubectl-commands#rollout" });
  T({ id: "t2-w4", domain: "workloads", difficulty: "medium", q: "Quand s'exécutent les initContainers ?", choices: ["En parallèle des conteneurs applicatifs", "Séquentiellement, avant les conteneurs applicatifs", "Après l'arrêt du Pod", "Uniquement en cas d'erreur"], correct: [1],
    why: ["Faux : ils ne tournent pas en parallèle des conteneurs principaux.", "Correct : ils s'exécutent l'un après l'autre, jusqu'à réussite, avant les conteneurs applicatifs.", "Faux : ils précèdent le démarrage, pas l'arrêt.", "Faux : ils tournent toujours, pas seulement en erreur."],
    explain: "Idéal pour préparer des prérequis (attendre un service, initialiser un volume).", ref: K + "concepts/workloads/pods/init-containers/" });
  T({ id: "t2-w5", domain: "workloads", difficulty: "medium", q: "Quelle sonde détermine si un conteneur peut recevoir du trafic ?", choices: ["livenessProbe", "readinessProbe", "startupProbe", "healthProbe"], correct: [1],
    why: ["Faux : liveness décide s'il faut redémarrer le conteneur.", "Correct : readiness conditionne l'ajout du Pod aux Endpoints du Service.", "Faux : startup protège le démarrage lent.", "Faux : `healthProbe` n'existe pas."],
    explain: "Un Pod non Ready ne reçoit pas de trafic de Service.", ref: K + "tasks/configure-pod-container/configure-liveness-readiness-startup-probes/" });
  T({ id: "t2-w6", domain: "workloads", difficulty: "medium", q: "Que provoque l'échec répété d'une livenessProbe ?", choices: ["Le Pod est supprimé définitivement", "Le conteneur est redémarré", "Le Service est recréé", "Rien"], correct: [1],
    why: ["Faux : le Pod n'est pas supprimé, le conteneur est relancé.", "Correct : le kubelet redémarre le conteneur.", "Faux : le Service n'est pas concerné par la liveness.", "Faux : il y a bien une action (restart)."],
    explain: "La readiness, elle, retire le Pod du trafic sans le redémarrer.", ref: K + "tasks/configure-pod-container/configure-liveness-readiness-startup-probes/" });
  T({ id: "t2-w7", domain: "workloads", difficulty: "hard", q: "À quoi sert une startupProbe ?", choices: ["Remplacer readiness", "Protéger les conteneurs à démarrage lent avant d'activer liveness/readiness", "Vérifier le stockage", "Lancer un Job"], correct: [1],
    why: ["Faux : elle ne remplace pas readiness.", "Correct : elle laisse le temps au démarrage ; liveness/readiness ne s'appliquent qu'après son succès.", "Faux : elle ne teste pas le stockage.", "Faux : elle ne lance pas de Job."],
    explain: "Évite qu'une liveness tue un conteneur qui démarre lentement.", ref: K + "tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-startup-probes" });
  T({ id: "t2-w8", domain: "workloads", difficulty: "easy", q: "Quel contrôleur convient à une appli avec identité réseau stable et stockage par Pod ?", choices: ["Deployment", "StatefulSet", "DaemonSet", "Job"], correct: [1],
    why: ["Faux : un Deployment donne des Pods interchangeables sans identité stable.", "Correct : StatefulSet fournit des noms stables (web-0…) et un PVC par Pod.", "Faux : un DaemonSet vise un Pod par nœud.", "Faux : un Job est une tâche ponctuelle."],
    explain: "Adapté aux bases de données, files, etc.", ref: K + "concepts/workloads/controllers/statefulset/" });
  T({ id: "t2-w9", domain: "workloads", difficulty: "medium", q: "Comment injecter une clé de Secret en variable d'environnement ?", choices: ["valueFrom.secretKeyRef", "envFrom.configMapRef", "secretMount", "valueFrom.fieldRef"], correct: [0],
    why: ["Correct : `env.valueFrom.secretKeyRef: {name, key}` injecte une valeur de Secret.", "Faux : configMapRef vise un ConfigMap, pas un Secret.", "Faux : `secretMount` n'existe pas.", "Faux : fieldRef expose des champs du Pod (downward API), pas un Secret."],
    explain: "`envFrom.secretRef` injecte toutes les clés d'un Secret.", ref: K + "concepts/configuration/secret/#using-secrets-as-environment-variables" });
  T({ id: "t2-w10", domain: "workloads", difficulty: "hard", q: "Que fait le champ nodeName dans un Pod ?", choices: ["Ajoute un label", "Assigne le Pod à un nœud précis en contournant le scheduler", "Définit le hostname", "Crée un taint"], correct: [1],
    why: ["Faux : ce n'est pas un label.", "Correct : nodeName force le placement sur ce nœud sans passer par le scheduler.", "Faux : le hostname se règle ailleurs (hostname/subdomain).", "Faux : un taint se pose sur un nœud, pas via nodeName."],
    explain: "Placement 'manuel' : le scheduler est court-circuité.", ref: K + "concepts/scheduling-eviction/assign-pod-node/#nodename" });
  T({ id: "t2-w11", domain: "workloads", difficulty: "medium", q: "Quel composant est requis pour un HorizontalPodAutoscaler sur CPU ?", choices: ["metrics-server", "CoreDNS", "kube-proxy", "cert-manager"], correct: [0],
    why: ["Correct : le HPA lit les métriques via metrics-server (metrics.k8s.io).", "Faux : CoreDNS fait le DNS.", "Faux : kube-proxy gère le réseau des Services.", "Faux : cert-manager gère les certificats TLS."],
    explain: "Sans metrics-server, le HPA ne connaît pas la charge CPU.", ref: K + "tasks/run-application/horizontal-pod-autoscale/" });
  T({ id: "t2-w12", domain: "workloads", difficulty: "easy", q: "Quelle ressource planifie l'exécution récurrente d'un Job ?", choices: ["DaemonSet", "CronJob", "ReplicaSet", "Deployment"], correct: [1],
    why: ["Faux : un DaemonSet fait tourner un Pod par nœud.", "Correct : un CronJob crée des Jobs selon une expression cron.", "Faux : un ReplicaSet maintient des répliques.", "Faux : un Deployment gère un service durable."],
    explain: "CronJob = Job + planification (cron 5 champs).", ref: K + "concepts/workloads/controllers/cron-jobs/" });
  T({ id: "t2-w13", domain: "workloads", difficulty: "medium", q: "Le champ completions d'un Job signifie :", choices: ["Le nombre de Pods parallèles", "Le nombre de complétions réussies requises", "Le nombre de tentatives", "La durée max"], correct: [1],
    why: ["Faux : c'est `parallelism` qui règle le parallélisme.", "Correct : `completions` = combien de Pods doivent réussir.", "Faux : les tentatives dépendent de `backoffLimit`.", "Faux : la durée max est `activeDeadlineSeconds`."],
    explain: "completions et parallelism se combinent pour les Jobs indexés.", ref: K + "concepts/workloads/controllers/job/" });
  T({ id: "t2-w14", domain: "workloads", difficulty: "easy", q: "Quel champ plafonne le CPU d'un conteneur ?", choices: ["resources.requests.cpu", "resources.limits.cpu", "spec.cpu", "resources.max.cpu"], correct: [1],
    why: ["Faux : requests sert au scheduling (réservation), pas au plafond.", "Correct : `resources.limits.cpu` plafonne (throttling).", "Faux : `spec.cpu` n'existe pas.", "Faux : `resources.max.cpu` n'existe pas."],
    explain: "requests = garanti, limits = plafond.", ref: K + "concepts/configuration/manage-resources-containers/" });
  T({ id: "t2-w15", domain: "workloads", difficulty: "hard", q: "Un Pod avec requests = limits (CPU et mémoire) obtient quelle classe QoS ?", choices: ["BestEffort", "Burstable", "Guaranteed", "Critical"], correct: [2],
    why: ["Faux : BestEffort = aucune requests/limits.", "Faux : Burstable = requests < limits (ou partiels).", "Correct : requests = limits sur toutes les ressources ⇒ Guaranteed.", "Faux : `Critical` n'est pas une classe QoS."],
    explain: "Les Pods Guaranteed sont évincés en dernier sous pression.", ref: K + "concepts/workloads/pods/pod-qos/" });
  T({ id: "t2-w16", domain: "workloads", difficulty: "medium", q: "Forcer une nouvelle création de tous les Pods d'un Deployment ?", choices: ["kubectl rollout restart deployment/web", "kubectl delete deployment web", "kubectl refresh web", "kubectl scale web --replicas=0"], correct: [0],
    why: ["Correct : `rollout restart` recrée les Pods progressivement sans changer le spec.", "Faux : delete supprime le Deployment (et l'appli).", "Faux : `kubectl refresh` n'existe pas.", "Faux : scaler à 0 coupe le service au lieu d'un rolling restart."],
    explain: "Pratique pour relire une config/Secret monté.", ref: K + "reference/generated/kubectl/kubectl-commands#rollout" });
  T({ id: "t2-w17", domain: "workloads", difficulty: "medium", q: "Taille maximale approximative d'un ConfigMap ?", choices: ["1 KiB", "1 MiB", "1 GiB", "Illimitée"], correct: [1],
    why: ["Faux : 1 KiB serait très insuffisant.", "Correct : ~1 MiB (limite liée à etcd).", "Faux : 1 GiB dépasse la limite.", "Faux : ce n'est pas illimité."],
    explain: "Pour de gros fichiers, préférer un volume dédié.", ref: K + "concepts/configuration/configmap/#motivation" });
  T({ id: "t2-w18", domain: "workloads", difficulty: "easy", q: "Quel champ associe un Pod à des nœuds par correspondance exacte de labels ?", choices: ["nodeSelector", "nodeName", "affinity.podAffinity", "tolerations"], correct: [0],
    why: ["Correct : `nodeSelector` exige les labels indiqués sur le nœud.", "Faux : nodeName vise un nœud précis par son nom.", "Faux : podAffinity co-localise selon d'autres Pods.", "Faux : les tolerations concernent les taints."],
    explain: "nodeAffinity offre une version plus expressive.", ref: K + "concepts/scheduling-eviction/assign-pod-node/#nodeselector" });

  /* ============ NETWORKING (18) ============ */
  T({ id: "t2-n1", domain: "networking", difficulty: "easy", q: "Quel est le type de Service par défaut ?", choices: ["NodePort", "ClusterIP", "LoadBalancer", "ExternalName"], correct: [1],
    why: ["Faux : NodePort doit être demandé explicitement.", "Correct : sans `type`, un Service est ClusterIP.", "Faux : LoadBalancer requiert un provider cloud.", "Faux : ExternalName est un cas particulier (alias DNS)."],
    explain: "ClusterIP = IP interne stable.", ref: K + "concepts/services-networking/service/" });
  T({ id: "t2-n2", domain: "networking", difficulty: "medium", q: "Que retourne le DNS pour un Service headless (clusterIP: None) ?", choices: ["Une IP virtuelle unique", "Les adresses IP des Pods (A records)", "Rien", "L'IP du nœud"], correct: [1],
    why: ["Faux : justement il n'y a pas d'IP virtuelle unique.", "Correct : il renvoie directement les IP des Pods.", "Faux : il retourne bien des enregistrements.", "Faux : ce n'est pas l'IP du nœud."],
    explain: "Utile pour la découverte pair-à-pair (ex. StatefulSet).", ref: K + "concepts/services-networking/service/#headless-services" });
  T({ id: "t2-n3", domain: "networking", difficulty: "medium", q: "Quel type de Service crée un alias CNAME vers un nom DNS externe ?", choices: ["NodePort", "LoadBalancer", "ExternalName", "ClusterIP"], correct: [2],
    why: ["Faux : NodePort ouvre un port sur les nœuds.", "Faux : LoadBalancer provisionne un équilibreur externe.", "Correct : ExternalName mappe vers un nom DNS externe (sans proxy ni selector).", "Faux : ClusterIP donne une IP interne."],
    explain: "Aucun trafic n'est proxifié : c'est une redirection DNS.", ref: K + "concepts/services-networking/service/#externalname" });
  T({ id: "t2-n4", domain: "networking", difficulty: "easy", q: "Dans un Service, que représente targetPort ?", choices: ["Le port exposé du Service", "Le port du conteneur cible", "Le NodePort", "Le port DNS"], correct: [1],
    why: ["Faux : le port exposé du Service, c'est `port`.", "Correct : `targetPort` est le port du conteneur des Pods.", "Faux : le NodePort est un champ distinct.", "Faux : il n'y a pas de 'port DNS' ici."],
    explain: "Trafic : port (Service) → targetPort (conteneur).", ref: K + "concepts/services-networking/service/#defining-a-service" });
  T({ id: "t2-n5", domain: "networking", difficulty: "medium", q: "Quel nom DNS complet joint le Service api du namespace prod ?", choices: ["api.prod.pod.cluster.local", "api.prod.svc.cluster.local", "prod.api.cluster.local", "api.cluster.local"], correct: [1],
    why: ["Faux : `pod` est pour les enregistrements de Pods, pas de Services.", "Correct : format <service>.<namespace>.svc.cluster.local.", "Faux : l'ordre est inversé.", "Faux : il manque le namespace et `svc`."],
    explain: "Depuis le même namespace, `api` suffit souvent.", ref: K + "concepts/services-networking/dns-pod-service/" });
  T({ id: "t2-n6", domain: "networking", difficulty: "medium", q: "Un objet Ingress nécessite quoi pour fonctionner ?", choices: ["Un Ingress Controller", "Un DaemonSet obligatoire", "Un LoadBalancer cloud", "Rien"], correct: [0],
    why: ["Correct : sans Ingress Controller, les règles Ingress ne sont pas appliquées.", "Faux : un DaemonSet n'est pas obligatoire (dépend du controller).", "Faux : un LB cloud n'est pas indispensable.", "Faux : un Ingress seul ne fait rien."],
    explain: "Ex. de controllers : nginx, traefik, HAProxy.", ref: K + "concepts/services-networking/ingress-controllers/" });
  T({ id: "t2-n7", domain: "networking", difficulty: "hard", q: "Quel type de Secret est attendu pour le TLS d'un Ingress ?", choices: ["Opaque", "kubernetes.io/tls", "kubernetes.io/dockerconfigjson", "bootstrap.kubernetes.io/token"], correct: [1],
    why: ["Faux : Opaque est générique, pas le type attendu pour le TLS.", "Correct : kubernetes.io/tls contient tls.crt et tls.key.", "Faux : dockerconfigjson sert au pull d'images privées.", "Faux : bootstrap token concerne kubeadm."],
    explain: "L'Ingress référence ce Secret dans sa section tls.", ref: K + "concepts/services-networking/ingress/#tls" });
  T({ id: "t2-n8", domain: "networking", difficulty: "medium", q: "Quelle direction de trafic contrôle policyTypes: [Egress] ?", choices: ["Entrant vers les Pods", "Sortant depuis les Pods", "Interne au conteneur", "DNS uniquement"], correct: [1],
    why: ["Faux : l'entrant, c'est Ingress.", "Correct : Egress = trafic sortant des Pods sélectionnés.", "Faux : ce n'est pas 'interne au conteneur'.", "Faux : ce n'est pas restreint au DNS."],
    explain: "On peut combiner Ingress et Egress dans une même policy.", ref: K + "concepts/services-networking/network-policies/" });
  T({ id: "t2-n9", domain: "networking", difficulty: "hard", q: "Les NetworkPolicies sont appliquées à condition que :", choices: ["metrics-server soit installé", "le plugin CNI les supporte (Calico, Cilium…)", "un Ingress existe", "kube-proxy soit en mode ipvs"], correct: [1],
    why: ["Faux : metrics-server sert aux métriques, pas au réseau.", "Correct : sans CNI qui implémente les NetworkPolicies, elles sont ignorées.", "Faux : un Ingress n'est pas requis.", "Faux : le mode de kube-proxy n'est pas déterminant."],
    explain: "Vérifier que le CNI installé supporte les policies.", ref: K + "concepts/services-networking/network-policies/" });
  T({ id: "t2-n10", domain: "networking", difficulty: "medium", q: "Quels sont des modes de fonctionnement de kube-proxy ?", choices: ["iptables et ipvs", "tcp et udp", "sync et async", "host et bridge"], correct: [0],
    why: ["Correct : kube-proxy programme les Services en mode iptables ou ipvs.", "Faux : tcp/udp sont des protocoles, pas des modes.", "Faux : sync/async ne sont pas des modes kube-proxy.", "Faux : host/bridge sont des modes réseau Docker."],
    explain: "ipvs passe mieux à l'échelle sur de nombreux Services.", ref: K + "concepts/services-networking/service/#proxy-mode-iptables" });
  T({ id: "t2-n11", domain: "networking", difficulty: "easy", q: "Quelle commande transfère un port local vers un Pod/Service ?", choices: ["kubectl port-forward", "kubectl expose", "kubectl proxy-pass", "kubectl tunnel"], correct: [0],
    why: ["Correct : `port-forward` mappe un port local pour un accès temporaire.", "Faux : `expose` crée un Service, pas un tunnel local.", "Faux : `proxy-pass` n'existe pas.", "Faux : `kubectl tunnel` n'existe pas."],
    explain: "Idéal pour tester une appli non exposée.", ref: K + "tasks/access-application-cluster/port-forward-access-application-cluster/" });
  T({ id: "t2-n12", domain: "networking", difficulty: "medium", q: "Quel objet a remplacé Endpoints à grande échelle ?", choices: ["EndpointSlice", "ServiceProxy", "Ingress", "PodSlice"], correct: [0],
    why: ["Correct : EndpointSlice découpe les endpoints en tranches (scalabilité).", "Faux : `ServiceProxy` n'existe pas.", "Faux : Ingress est du routage L7.", "Faux : `PodSlice` n'existe pas."],
    explain: "Les EndpointSlices évitent des objets Endpoints énormes.", ref: K + "concepts/services-networking/endpoint-slices/" });
  T({ id: "t2-n13", domain: "networking", difficulty: "hard", q: "Une NetworkPolicy sélectionnant des Pods avec policyTypes: [Ingress] mais sans règle ingress :", choices: ["autorise tout l'ingress", "bloque tout l'ingress vers ces Pods", "n'a aucun effet", "bloque l'egress"], correct: [1],
    why: ["Faux : l'absence de règle ne signifie pas 'tout autorisé'.", "Correct : sélection + Ingress sans règle = deny-all ingress.", "Faux : elle a bien un effet.", "Faux : l'egress n'est pas visé ici."],
    explain: "Pattern d'isolation 'default deny ingress'.", ref: K + "concepts/services-networking/network-policies/#default-deny-all-ingress-traffic" });
  T({ id: "t2-n14", domain: "networking", difficulty: "easy", q: "Plage de ports par défaut pour NodePort ?", choices: ["1024–2048", "30000–32767", "8000–9000", "40000–65535"], correct: [1],
    why: ["Faux : hors plage par défaut.", "Correct : 30000–32767 par défaut.", "Faux : plage arbitraire.", "Faux : hors plage par défaut."],
    explain: "Configurable via --service-node-port-range.", ref: K + "concepts/services-networking/service/#type-nodeport" });
  T({ id: "t2-n15", domain: "networking", difficulty: "medium", q: "Comment vérifier qu'un Service a bien des cibles ?", choices: ["kubectl get endpoints <svc>", "kubectl get svc -o wide", "kubectl top svc", "kubectl describe node"], correct: [0],
    why: ["Correct : `get endpoints <svc>` confirme les Pods cibles (vide = selector KO).", "Faux : `get svc -o wide` montre le Service, pas les endpoints détaillés.", "Faux : `top svc` n'existe pas.", "Faux : describe node ne concerne pas les cibles d'un Service."],
    explain: "Ou `kubectl get endpointslices`.", ref: K + "concepts/services-networking/service/" });
  T({ id: "t2-n16", domain: "networking", difficulty: "medium", q: "Dans quel namespace tourne CoreDNS ?", choices: ["default", "kube-system", "kube-public", "dns-system"], correct: [1],
    why: ["Faux : default héberge les charges utilisateur.", "Correct : les Pods CoreDNS tournent dans kube-system.", "Faux : kube-public est pour des données publiques limitées.", "Faux : `dns-system` n'existe pas par défaut."],
    explain: "Label k8s-app=kube-dns.", ref: K + "tasks/administer-cluster/dns-debugging-resolution/" });
  T({ id: "t2-n17", domain: "networking", difficulty: "hard", q: "La communication Pod-à-Pod entre nœuds est fournie par :", choices: ["kube-proxy", "le plugin réseau CNI", "CoreDNS", "l'API server"], correct: [1],
    why: ["Faux : kube-proxy gère le routage des Services, pas le réseau Pod plat.", "Correct : le CNI (Calico, Cilium, Flannel…) implémente le réseau inter-Pods.", "Faux : CoreDNS fait la résolution de noms.", "Faux : l'API server ne route pas le trafic."],
    explain: "Sans CNI, les nœuds restent NotReady.", ref: K + "concepts/cluster-administration/networking/" });
  T({ id: "t2-n18", domain: "networking", difficulty: "easy", q: "Quelle commande crée rapidement un Service ClusterIP pour un Deployment web ?", choices: ["kubectl expose deployment web --port=80", "kubectl service create web", "kubectl run web --expose", "kubectl create svc web"], correct: [0],
    why: ["Correct : `expose deployment web --port=80` génère un Service ciblant les Pods.", "Faux : `kubectl service create` n'est pas la bonne syntaxe.", "Faux : `run --expose` crée un Pod, pas un Service pour un Deployment existant.", "Faux : `create svc web` est incomplet (type/ports requis)."],
    explain: "Le Service reprend le selector du Deployment.", ref: K + "concepts/services-networking/connect-applications-service/" });

  /* ============ STORAGE (12) ============ */
  T({ id: "t2-s1", domain: "storage", difficulty: "medium", q: "Sur quels critères un PVC se lie-t-il à un PV ?", choices: ["Nom identique", "Taille, accessModes et storageClassName compatibles", "Même namespace uniquement", "Ordre de création"], correct: [1],
    why: ["Faux : le binding ne se fait pas par nom.", "Correct : taille demandée, accessModes et storageClass doivent correspondre.", "Faux : un PV est cluster-scoped, pas lié à un namespace.", "Faux : l'ordre de création ne détermine pas le binding."],
    explain: "Un PV trop petit ou de mauvaise classe ne se lie pas.", ref: K + "concepts/storage/persistent-volumes/#binding" });
  T({ id: "t2-s2", domain: "storage", difficulty: "easy", q: "Quel accessMode = lecture/écriture par un seul nœud ?", choices: ["ReadWriteMany", "ReadOnlyMany", "ReadWriteOnce", "ReadWriteOncePod"], correct: [2],
    why: ["Faux : RWX = plusieurs nœuds en écriture.", "Faux : ROX = lecture seule multi-nœuds.", "Correct : RWO = RW par un seul nœud.", "Faux : RWOP restreint à un seul Pod (plus strict)."],
    explain: "RWO est le mode le plus courant (disques block).", ref: K + "concepts/storage/persistent-volumes/#access-modes" });
  T({ id: "t2-s3", domain: "storage", difficulty: "medium", q: "Quelle reclaimPolicy conserve les données du PV après suppression du PVC ?", choices: ["Delete", "Retain", "Recycle", "Purge"], correct: [1],
    why: ["Faux : Delete supprime PV et stockage.", "Correct : Retain conserve le PV (Released) et ses données.", "Faux : Recycle est déprécié.", "Faux : `Purge` n'existe pas."],
    explain: "Retain nécessite une récupération manuelle ensuite.", ref: K + "concepts/storage/persistent-volumes/#reclaiming" });
  T({ id: "t2-s4", domain: "storage", difficulty: "easy", q: "Quel objet permet le provisionnement dynamique de PV ?", choices: ["StorageClass", "ConfigMap", "PriorityClass", "Endpoints"], correct: [0],
    why: ["Correct : une StorageClass + provisioner crée des PV à la demande.", "Faux : un ConfigMap stocke de la config.", "Faux : PriorityClass concerne le scheduling.", "Faux : Endpoints liste les cibles d'un Service."],
    explain: "Le PVC référence la StorageClass pour déclencher la création.", ref: K + "concepts/storage/storage-classes/" });
  T({ id: "t2-s5", domain: "storage", difficulty: "easy", q: "Quel volume est éphémère, partagé entre conteneurs du Pod et effacé avec lui ?", choices: ["emptyDir", "hostPath", "nfs", "persistentVolumeClaim"], correct: [0],
    why: ["Correct : emptyDir vit le temps du Pod et se partage entre ses conteneurs.", "Faux : hostPath persiste sur le nœud.", "Faux : NFS est un stockage réseau persistant.", "Faux : un PVC est persistant."],
    explain: "Idéal pour du cache/scratch inter-conteneurs.", ref: K + "concepts/storage/volumes/#emptydir" });
  T({ id: "t2-s6", domain: "storage", difficulty: "medium", q: "Que monte un volume hostPath ?", choices: ["Un bucket S3", "Un chemin du système de fichiers du nœud", "Un ConfigMap", "Un PVC distant"], correct: [1],
    why: ["Faux : S3 n'est pas un hostPath.", "Correct : hostPath monte un fichier/dossier du nœud.", "Faux : un ConfigMap se monte via un volume dédié.", "Faux : un PVC est une autre notion."],
    explain: "À éviter en prod (portabilité/sécurité).", ref: K + "concepts/storage/volumes/#hostpath" });
  T({ id: "t2-s7", domain: "storage", difficulty: "hard", q: "Quelle condition permet d'agrandir un PVC existant ?", choices: ["allowVolumeExpansion: true sur la StorageClass", "reclaimPolicy: Retain", "accessMode RWX", "volumeMode: Block"], correct: [0],
    why: ["Correct : l'expansion exige allowVolumeExpansion: true sur la StorageClass.", "Faux : la reclaimPolicy ne concerne pas l'expansion.", "Faux : l'accessMode ne conditionne pas l'agrandissement.", "Faux : volumeMode ne l'autorise pas à lui seul."],
    explain: "Le provisioner doit aussi supporter l'expansion.", ref: K + "concepts/storage/persistent-volumes/#expanding-persistent-volumes-claims" });
  T({ id: "t2-s8", domain: "storage", difficulty: "medium", q: "Quelle annotation marque une StorageClass comme celle par défaut ?", choices: ["storageclass.kubernetes.io/is-default-class: \"true\"", "default: \"true\"", "storage/default: yes", "sc.k8s.io/default"], correct: [0],
    why: ["Correct : c'est l'annotation officielle pour la SC par défaut.", "Faux : `default: true` n'est pas reconnu.", "Faux : annotation inventée.", "Faux : annotation inventée."],
    explain: "Un PVC sans storageClassName utilise alors la SC par défaut.", ref: K + "tasks/administer-cluster/change-default-storage-class/" });
  T({ id: "t2-s9", domain: "storage", difficulty: "easy", q: "Un PV provisionné statiquement est créé par :", choices: ["l'utilisateur via un PVC", "l'administrateur manuellement", "le scheduler", "kubelet"], correct: [1],
    why: ["Faux : le PVC est la demande, pas la création du PV en statique.", "Correct : en statique, l'admin crée les PV à l'avance.", "Faux : le scheduler place les Pods.", "Faux : le kubelet monte les volumes, il ne crée pas les PV."],
    explain: "En dynamique, c'est le provisioner qui crée le PV.", ref: K + "concepts/storage/persistent-volumes/#static" });
  T({ id: "t2-s10", domain: "storage", difficulty: "medium", q: "Comment un conteneur utilise-t-il un volume déclaré au niveau du Pod ?", choices: ["via volumeMounts (mountPath)", "automatiquement", "via env", "via hostAliases"], correct: [0],
    why: ["Correct : chaque conteneur monte le volume via volumeMounts.mountPath.", "Faux : ce n'est pas automatique, il faut le monter.", "Faux : env injecte des variables, pas un volume.", "Faux : hostAliases modifie /etc/hosts."],
    explain: "Le Pod déclare `volumes`, le conteneur `volumeMounts`.", ref: K + "concepts/storage/volumes/" });
  T({ id: "t2-s11", domain: "storage", difficulty: "medium", q: "Monté en volume, un ConfigMap expose ses clés comme :", choices: ["variables d'env", "fichiers dans le répertoire monté", "arguments CLI", "labels"], correct: [1],
    why: ["Faux : ça, c'est l'injection en env (envFrom/valueFrom).", "Correct : chaque clé devient un fichier dans le mountPath.", "Faux : pas des arguments CLI.", "Faux : pas des labels."],
    explain: "subPath permet de ne monter qu'une seule clé.", ref: K + "tasks/configure-pod-container/configure-pod-configmap/#add-configmap-data-to-a-volume" });
  T({ id: "t2-s12", domain: "storage", difficulty: "hard", q: "État d'un PV (reclaim Retain) après suppression de son PVC ?", choices: ["Available", "Bound", "Released", "Failed"], correct: [2],
    why: ["Faux : il ne redevient pas Available automatiquement.", "Faux : Bound = encore lié à un PVC.", "Correct : avec Retain, le PV passe Released (données conservées).", "Faux : Failed indique une erreur de récupération."],
    explain: "Un PV Released n'est pas réutilisable tel quel.", ref: K + "concepts/storage/persistent-volumes/#reclaiming" });

  /* ============ TROUBLESHOOTING (25) ============ */
  T({ id: "t2-t1", domain: "troubleshooting", difficulty: "easy", q: "Première commande pour comprendre pourquoi un Pod est Pending ?", choices: ["kubectl logs", "kubectl describe pod (Events)", "kubectl top", "kubectl get cm"], correct: [1],
    why: ["Faux : pas de logs sans conteneur démarré.", "Correct : les Events du describe montrent FailedScheduling.", "Faux : top montre la conso, pas la cause.", "Faux : lister les ConfigMaps n'aide pas."],
    explain: "Ex : ressources insuffisantes, taints, affinités.", ref: K + "tasks/debug/debug-application/debug-pods/" });
  T({ id: "t2-t2", domain: "troubleshooting", difficulty: "easy", q: "Lire les logs de l'instance précédente d'un conteneur qui a crashé ?", choices: ["kubectl logs <pod> --previous", "kubectl logs <pod> --old", "kubectl logs -f", "kubectl describe"], correct: [0],
    why: ["Correct : `--previous` lit les logs du conteneur mort avant redémarrage.", "Faux : `--old` n'existe pas.", "Faux : `-f` suit les logs en direct de l'instance actuelle.", "Faux : describe montre les Events, pas les logs applicatifs."],
    explain: "Indispensable pour diagnostiquer un CrashLoopBackOff.", ref: K + "tasks/debug/debug-application/debug-running-pod/" });
  T({ id: "t2-t3", domain: "troubleshooting", difficulty: "medium", q: "CrashLoopBackOff signifie :", choices: ["Image introuvable", "Le conteneur démarre puis se termine en boucle", "Nœud NotReady", "PVC Pending"], correct: [1],
    why: ["Faux : image introuvable = ImagePullBackOff.", "Correct : le process sort (souvent code ≠ 0) et est relancé avec back-off.", "Faux : un nœud NotReady est un autre symptôme.", "Faux : un PVC Pending bloque le démarrage, ce n'est pas un CrashLoop."],
    explain: "Analyser logs --previous et les Events.", ref: K + "tasks/debug/debug-application/debug-pods/" });
  T({ id: "t2-t4", domain: "troubleshooting", difficulty: "medium", q: "ImagePullBackOff indique typiquement :", choices: ["Un crash applicatif", "Un problème de pull d'image (nom/tag/credentials/registre)", "Un manque de mémoire", "Un souci DNS interne"], correct: [1],
    why: ["Faux : un crash applicatif = CrashLoopBackOff.", "Correct : K8s n'arrive pas à télécharger l'image.", "Faux : un manque de mémoire donne OOMKilled/Pending.", "Faux : le DNS interne concerne les Services."],
    explain: "Vérifier nom/tag et imagePullSecret.", ref: K + "concepts/containers/images/" });
  T({ id: "t2-t5", domain: "troubleshooting", difficulty: "medium", q: "Un nœud NotReady : quel service vérifier d'abord ?", choices: ["kubelet", "etcd", "scheduler", "coredns"], correct: [0],
    why: ["Correct : le kubelet rend le nœud Ready (status/logs).", "Faux : etcd est côté control plane.", "Faux : le scheduler ne tourne pas sur les workers.", "Faux : CoreDNS est un Pod, pas un service du nœud."],
    explain: "Vérifier ensuite le CNI.", ref: K + "tasks/debug/debug-cluster/" });
  T({ id: "t2-t6", domain: "troubleshooting", difficulty: "easy", q: "Quelle commande affiche la conso CPU/mémoire des Pods ?", choices: ["kubectl top pod", "kubectl usage", "kubectl metrics", "kubectl stat"], correct: [0],
    why: ["Correct : `top pod` (metrics-server requis).", "Faux : `usage` n'existe pas.", "Faux : `metrics` n'est pas une commande.", "Faux : `stat` n'existe pas."],
    explain: "`kubectl top node` pour les nœuds.", ref: K + "tasks/debug/debug-cluster/resource-usage-monitoring/" });
  T({ id: "t2-t7", domain: "troubleshooting", difficulty: "medium", q: "Afficher les événements d'un namespace triés par date ?", choices: ["kubectl get events --sort-by=.metadata.creationTimestamp", "kubectl events --time", "kubectl logs --events", "kubectl describe events"], correct: [0],
    why: ["Correct : trie par date de création pour corréler les incidents.", "Faux : `events --time` n'est pas la bonne syntaxe.", "Faux : `logs --events` n'existe pas.", "Faux : `describe events` n'est pas valide ainsi."],
    explain: "Ajouter -A pour tout le cluster.", ref: K + "tasks/debug/debug-application/" });
  T({ id: "t2-t8", domain: "troubleshooting", difficulty: "hard", q: "Erreur « connection to the server localhost:8080 was refused ». Cause probable ?", choices: ["Pod Pending", "kubeconfig manquant/incorrect (KUBECONFIG)", "Service sans endpoints", "PV Retain"], correct: [1],
    why: ["Faux : un Pod Pending n'affecte pas l'accès à l'API.", "Correct : sans kubeconfig valide, kubectl retombe sur localhost:8080.", "Faux : un Service sans endpoints donne un autre symptôme.", "Faux : la reclaimPolicy n'a aucun lien."],
    explain: "Vérifier KUBECONFIG ou ~/.kube/config.", ref: K + "tasks/access-application-cluster/configure-access-multiple-clusters/" });
  T({ id: "t2-t9", domain: "troubleshooting", difficulty: "easy", q: "Ouvrir un shell dans un conteneur en cours ?", choices: ["kubectl exec -it <pod> -- sh", "kubectl shell <pod>", "kubectl ssh <pod>", "kubectl attach --tty"], correct: [0],
    why: ["Correct : `exec -it <pod> -- sh` ouvre un shell interactif.", "Faux : `kubectl shell` n'existe pas.", "Faux : `kubectl ssh` n'existe pas.", "Faux : attach se connecte au process, sans lancer de shell."],
    explain: "Utiliser -c pour cibler un conteneur précis.", ref: K + "tasks/debug/debug-application/get-shell-running-container/" });
  T({ id: "t2-t10", domain: "troubleshooting", difficulty: "hard", q: "Déboguer un conteneur sans shell/outils, sans le redéployer ?", choices: ["kubectl debug (ephemeral container)", "kubectl exec --root", "kubectl cp", "kubectl patch"], correct: [0],
    why: ["Correct : `kubectl debug` ajoute un conteneur éphémère partageant les namespaces.", "Faux : `exec --root` n'ajoute pas d'outils absents.", "Faux : `cp` copie des fichiers seulement.", "Faux : `patch` modifie une ressource, pas le debug live."],
    explain: "Ex : --image=busybox --target=<ctr>.", ref: K + "tasks/debug/debug-application/debug-running-pod/" });
  T({ id: "t2-t11", domain: "troubleshooting", difficulty: "medium", q: "Un Service ne route rien : cause la plus fréquente ?", choices: ["CoreDNS éteint", "Selector du Service qui ne matche aucun Pod prêt", "Trop de namespaces", "Ingress manquant"], correct: [1],
    why: ["Faux : un DNS KO empêche la résolution, pas le remplissage des endpoints.", "Correct : Endpoints vides = mismatch de labels ou Pods non Ready.", "Faux : le nombre de namespaces n'a aucun effet.", "Faux : un ClusterIP fonctionne sans Ingress."],
    explain: "Vérifier `kubectl get endpoints <svc>`.", ref: K + "concepts/services-networking/service/" });
  T({ id: "t2-t12", domain: "troubleshooting", difficulty: "medium", q: "Tester la résolution DNS depuis un Pod jetable ?", choices: ["kubectl run test --image=busybox:1.28 -it --rm -- nslookup <svc>", "kubectl dns test", "kubectl nslookup", "kubectl get dns"], correct: [0],
    why: ["Correct : un Pod busybox permet `nslookup <svc>.<ns>`.", "Faux : `kubectl dns` n'existe pas.", "Faux : `kubectl nslookup` n'existe pas.", "Faux : `get dns` ne teste pas la résolution."],
    explain: "busybox:1.28 a un nslookup fiable.", ref: K + "tasks/administer-cluster/dns-debugging-resolution/" });
  T({ id: "t2-t13", domain: "troubleshooting", difficulty: "hard", q: "Un Pod bloqué en ContainerCreating : cause courante ?", choices: ["Volume/Secret/ConfigMap manquant ou souci CNI", "Deployment supprimé", "Trop de répliques", "Service ClusterIP"], correct: [0],
    why: ["Correct : montage impossible (Secret/CM/PVC) ou réseau CNI en cause.", "Faux : un Deployment supprimé ne laisse pas de Pod en création.", "Faux : le nombre de répliques n'explique pas cet état.", "Faux : un ClusterIP est sans rapport."],
    explain: "describe pod révèle souvent l'erreur de montage.", ref: K + "tasks/debug/debug-application/debug-pods/" });
  T({ id: "t2-t14", domain: "troubleshooting", difficulty: "medium", q: "Consulter les logs du kubelet sur un nœud ?", choices: ["journalctl -u kubelet", "kubectl logs kubelet", "cat /var/log/kubelet", "systemctl logs"], correct: [0],
    why: ["Correct : `journalctl -u kubelet` lit les logs du service.", "Faux : le kubelet n'est pas un Pod loggable via kubectl.", "Faux : ce chemin de log n'est pas garanti.", "Faux : `systemctl logs` n'existe pas (c'est journalctl)."],
    explain: "Combiner avec `systemctl status kubelet`.", ref: K + "tasks/debug/debug-cluster/" });
  T({ id: "t2-t15", domain: "troubleshooting", difficulty: "medium", q: "Où trouver les manifests des composants du control plane (kubeadm) ?", choices: ["/etc/kubernetes/manifests", "/var/lib/kubelet", "/etc/k8s/pods", "/opt/manifests"], correct: [0],
    why: ["Correct : Static Pods dans /etc/kubernetes/manifests.", "Faux : /var/lib/kubelet contient l'état d'exécution.", "Faux : chemin inexistant.", "Faux : chemin inexistant."],
    explain: "Une erreur de YAML y fait disparaître le composant.", ref: K + "tasks/configure-pod-container/static-pod/" });
  T({ id: "t2-t16", domain: "troubleshooting", difficulty: "medium", q: "Quelles Conditions un describe node peut-il signaler ?", choices: ["MemoryPressure, DiskPressure, PIDPressure", "CrashLoop, ImagePull", "Bound, Released", "Ready seulement"], correct: [0],
    why: ["Correct : les Conditions du nœud incluent MemoryPressure/DiskPressure/PIDPressure/Ready.", "Faux : CrashLoop/ImagePull sont des états de Pod.", "Faux : Bound/Released concernent les PV.", "Faux : il y a plusieurs Conditions, pas seulement Ready."],
    explain: "Une pression déclenche des évictions.", ref: K + "concepts/architecture/nodes/#condition" });
  T({ id: "t2-t17", domain: "troubleshooting", difficulty: "hard", q: "Un conteneur « OOMKilled » a été tué parce que :", choices: ["Le CPU a dépassé la limite", "La mémoire a dépassé sa limite", "Le disque est plein", "Le réseau a coupé"], correct: [1],
    why: ["Faux : un dépassement CPU provoque du throttling, pas un kill.", "Correct : OOMKilled = dépassement de la limite mémoire (SIGKILL kernel).", "Faux : un disque plein est un autre symptôme.", "Faux : le réseau n'entraîne pas d'OOMKilled."],
    explain: "Augmenter la limite mémoire ou corriger la fuite.", ref: K + "tasks/configure-pod-container/assign-memory-resource/#exceed-a-container-s-memory-limit" });
  T({ id: "t2-t18", domain: "troubleshooting", difficulty: "easy", q: "Voir le spec + status complet d'un Pod en YAML ?", choices: ["kubectl get pod <pod> -o yaml", "kubectl describe -o yaml", "kubectl yaml pod", "kubectl show pod"], correct: [0],
    why: ["Correct : `get pod <pod> -o yaml` affiche la ressource complète.", "Faux : describe n'a pas d'option -o yaml.", "Faux : `kubectl yaml` n'existe pas.", "Faux : `kubectl show` n'existe pas."],
    explain: "Utile pour le status détaillé (conditions, containerStatuses).", ref: K + "reference/kubectl/" });
  T({ id: "t2-t19", domain: "troubleshooting", difficulty: "medium", q: "Copier un fichier depuis un Pod vers la machine locale ?", choices: ["kubectl cp <ns>/<pod>:/chemin ./local", "kubectl scp", "kubectl download", "kubectl get file"], correct: [0],
    why: ["Correct : `kubectl cp` copie vers/depuis un conteneur (tar requis).", "Faux : `kubectl scp` n'existe pas.", "Faux : `kubectl download` n'existe pas.", "Faux : `get file` n'existe pas."],
    explain: "L'image doit contenir tar pour que cp fonctionne.", ref: K + "reference/generated/kubectl/kubectl-commands#cp" });
  T({ id: "t2-t20", domain: "troubleshooting", difficulty: "hard", q: "Des Pods sont « Evicted ». Cause la plus probable ?", choices: ["Pression de ressources sur le nœud (mémoire/disque)", "Selector invalide", "Image trop grosse", "Service manquant"], correct: [0],
    why: ["Correct : le kubelet évince sous MemoryPressure/DiskPressure.", "Faux : un selector invalide ne provoque pas d'éviction.", "Faux : la taille d'image n'évince pas.", "Faux : un Service manquant n'évince pas les Pods."],
    explain: "Vérifier les Conditions du nœud.", ref: K + "concepts/scheduling-eviction/node-pressure-eviction/" });
  T({ id: "t2-t21", domain: "troubleshooting", difficulty: "medium", q: "Le scheduler n'a pas placé un Pod : où voir la raison ?", choices: ["Events du describe pod (FailedScheduling)", "kubectl top", "kubectl logs scheduler seul", "kubectl get sc"], correct: [0],
    why: ["Correct : l'event FailedScheduling détaille la cause.", "Faux : top montre la conso, pas la raison.", "Faux : les logs du scheduler seuls sont moins directs que l'event.", "Faux : get sc liste les StorageClasses."],
    explain: "Ex : 'Insufficient cpu', taints non tolérés.", ref: K + "tasks/debug/debug-application/debug-pods/" });
  T({ id: "t2-t22", domain: "troubleshooting", difficulty: "hard", q: "kubectl échoue avec une erreur x509 « certificate has expired ». Que faire (kubeadm) ?", choices: ["kubeadm certs renew all puis redémarrer le control plane", "kubectl delete certs", "Réinstaller le cluster", "Ignorer"], correct: [0],
    why: ["Correct : renouveler puis redémarrer les Static Pods concernés.", "Faux : `kubectl delete certs` n'existe pas.", "Faux : réinstaller est disproportionné.", "Faux : ignorer laisse le cluster inaccessible."],
    explain: "Vérifier avec `kubeadm certs check-expiration`.", ref: K + "tasks/administer-cluster/kubeadm/kubeadm-certs/" });
  T({ id: "t2-t23", domain: "troubleshooting", difficulty: "hard", q: "Sur un nœud, quel outil inspecte conteneurs/images au niveau du runtime CRI ?", choices: ["crictl", "docker-compose", "kubeadm", "etcdctl"], correct: [0],
    why: ["Correct : `crictl` (ps, logs, inspect) débogue le runtime.", "Faux : docker-compose n'est pas l'outil CRI de K8s.", "Faux : kubeadm gère l'installation.", "Faux : etcdctl pilote etcd."],
    explain: "Utile quand l'API/kubelet est indisponible.", ref: K + "tasks/debug/debug-cluster/crictl/" });
  T({ id: "t2-t24", domain: "troubleshooting", difficulty: "medium", q: "Un Pod reste Pending car son PVC est Pending. Que vérifier ?", choices: ["Qu'un PV compatible existe ou qu'une StorageClass provisionne", "Le Service", "Le HPA", "Le nombre de répliques"], correct: [0],
    why: ["Correct : un PVC non lié bloque le Pod ; vérifier PV/StorageClass.", "Faux : le Service n'a pas de rôle ici.", "Faux : le HPA concerne le scaling.", "Faux : le nombre de répliques n'est pas en cause."],
    explain: "describe pvc montre pourquoi le binding échoue.", ref: K + "concepts/storage/persistent-volumes/#lifecycle-of-a-volume-and-claim" });
  T({ id: "t2-t25", domain: "troubleshooting", difficulty: "easy", q: "Redémarrer proprement tous les Pods d'un Deployment ?", choices: ["kubectl rollout restart deployment/<nom>", "kubectl restart <nom>", "kubectl delete pods --all", "kubectl reboot"], correct: [0],
    why: ["Correct : `rollout restart` recrée les Pods en rolling.", "Faux : `kubectl restart` n'existe pas.", "Faux : delete --all coupe le service brutalement.", "Faux : `kubectl reboot` n'existe pas."],
    explain: "Pas d'interruption grâce au rolling.", ref: K + "reference/generated/kubectl/kubectl-commands#rollout" });

  /* ============ CNPG (5) ============ */
  T({ id: "t2-c1", domain: "cnpg", difficulty: "easy", q: "Quelle commande du plugin affiche l'état d'un Cluster CNPG ?", choices: ["kubectl cnpg status <cluster>", "kubectl cnpg get", "kubectl pg status", "kubectl cnpg health"], correct: [0],
    why: ["Correct : `kubectl cnpg status <cluster>` (rôles, réplication…).", "Faux : `cnpg get` n'est pas la commande de statut.", "Faux : `kubectl pg` n'existe pas.", "Faux : `cnpg health` n'existe pas."],
    explain: "Le plugin cnpg facilite les opérations courantes.", ref: CN });
  T({ id: "t2-c2", domain: "cnpg", difficulty: "medium", q: "Pour des LECTURES seules sur les réplicas, quel Service utiliser (cluster pg) ?", choices: ["pg-rw", "pg-ro", "pg-r", "pg-primary"], correct: [1],
    why: ["Faux : `-rw` pointe vers le primaire (écritures).", "Correct : `-ro` route vers les hot standby (lecture seule).", "Faux : `-r` cible n'importe quelle instance, pas spécifiquement les réplicas.", "Faux : `-primary` n'est pas un des Services créés."],
    explain: "CNPG crée -rw, -ro et -r pour un Cluster.", ref: CN + "architecture/" });
  T({ id: "t2-c3", domain: "cnpg", difficulty: "medium", q: "Quelle ressource déclenche une sauvegarde CNPG à la demande ?", choices: ["Backup", "ScheduledBackup", "Snapshot", "Dump"], correct: [0],
    why: ["Correct : `Backup` = sauvegarde ponctuelle.", "Faux : `ScheduledBackup` planifie (cron), il ne déclenche pas 'à la demande'.", "Faux : `Snapshot` n'est pas la ressource CNPG dédiée.", "Faux : `Dump` n'existe pas ici."],
    explain: "ScheduledBackup utilise un cron à 6 champs.", ref: CN + "backup/" });
  T({ id: "t2-c4", domain: "cnpg", difficulty: "easy", q: "Méthode de bootstrap par défaut d'un Cluster CNPG ?", choices: ["recovery", "pg_basebackup", "initdb", "clone"], correct: [2],
    why: ["Faux : recovery restaure depuis une sauvegarde.", "Faux : pg_basebackup clone un cluster existant.", "Correct : `spec.bootstrap.initdb` crée un cluster vide (défaut).", "Faux : `clone` n'est pas une méthode CNPG."],
    explain: "Une seule méthode de bootstrap par manifeste.", ref: CN + "bootstrap/" });
  T({ id: "t2-c5", domain: "cnpg", difficulty: "hard", q: "Pour un PITR, que faut-il en plus de l'archive WAL ?", choices: ["Rien", "Une base backup physique", "Un StatefulSet", "Un Ingress"], correct: [1],
    why: ["Faux : le WAL seul ne suffit pas.", "Correct : « sans base backup physique, pas de restauration ».", "Faux : CNPG n'utilise pas de StatefulSet.", "Faux : un Ingress n'a aucun rapport."],
    explain: "WAL + base backup = PITR (RPO ≤ 5 min).", ref: CN + "backup/" });
})();
