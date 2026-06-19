// Contenu des slides du RDC — CloudNativePG
// Chaque entrée = un objet de la maison. La clé correspond soit à l'id d'une zone
// cliquable du SVG principal (index.html), soit à une scène atteinte par navigation.
//
// Une slide-scène : { scene:"<blueprint>", hint, objects:[{id,object,label,en,points}], nav:[...] }
//   -> mini-scène : un décor avec des OBJETS numérotés ; chaque objet = une RUBRIQUE.
//   -> "scene" choisit le décor SVG (voir SCENE_BLUEPRINTS dans js/app.js).
//   -> "nav" = boutons de navigation vers d'autres scènes.
//
// Tout en français ; les termes techniques anglais sont conservés avec une
// explication française à côté.
//
// Sources :
//   porte  -> https://cloudnative-pg.io/docs/1.29/
//   entree -> https://cloudnative-pg.io/docs/1.29/before_you_start

window.SLIDES = window.SLIDES || {};

/* ============================ LA PORTE (1 clic) ============================ */
window.SLIDES["porte"] = {
  title: "La Porte — CloudNativePG",
  subtitle: "Vue d'ensemble · docs 1.29",
  source: "https://cloudnative-pg.io/docs/1.29/",
  sourceLabel: "cloudnative-pg.io/docs/1.29",
  scene: "porte",
  hint: "Clique un objet de la porte → sa rubrique s'ouvre à droite.",
  nav: [{ slide: "entree", label: "Entrer dans le genkan (l'entrée) →" }],
  objects: [
    {
      id: "presentation",
      object: "Le noren 関 (le rideau)",
      label: "Qu'est-ce que CloudNativePG ?",
      en: null,
      points: [
        "Opérateur open-source qui gère des charges PostgreSQL sur n'importe quel cluster Kubernetes supporté.",
        "« Cloud-neutral » (neutre vis-à-vis du cloud) : déploiement fluide en cloud privé, public, hybride et multi-cloud.",
        "Principes DevOps : configuration déclarative et infrastructure immuable (immutable = on ne modifie pas, on remplace).",
        "Cœur de l'offre : la ressource personnalisée `Cluster` = 1 instance primaire (écritures) + réplicas optionnels (haute dispo + montée en charge des lectures).",
      ],
    },
    {
      id: "k8s",
      object: "La lanterne",
      label: "Distributions Kubernetes supportées",
      en: "Supported Kubernetes distributions",
      points: [
        "Chaque version mineure vise une plage de versions Kubernetes.",
        "Généralement celles supportées par la CNCF (Cloud Native Computing Foundation) au moment de la sortie de cette version mineure.",
        "Les versions précises sont listées sur la page « Supported releases » (versions supportées).",
      ],
    },
    {
      id: "images",
      object: "La caisse / le colis",
      label: "Images conteneur",
      en: "Container images",
      points: [
        "Images de l'opérateur : sur la GitHub Container Registry de CloudNativePG, en 2 saveurs — Debian 12 distroless (sans shell ni outils, minimal) et Red Hat UBI 9 micro.",
        "Toutes signées avec attestations SBOM (Software Bill of Materials, inventaire des composants) et provenance (traçabilité de la chaîne de build).",
        "Images « operand » (= l'image PostgreSQL gérée) : basées sur Debian slim, publiées pour linux/amd64 et linux/arm64, via le registre postgres-containers.",
        "3 saveurs : minimal, standard, system (system = dépréciée).",
        "Par défaut en 1.29 : `ghcr.io/cloudnative-pg/postgresql:18.3-system-trixie`.",
      ],
    },
    {
      id: "features",
      object: "Le heurtoir (panneau central)",
      label: "Fonctionnalités principales",
      en: "Main features",
      points: [
        "Haute disponibilité & self-healing (auto-réparation) : failover (bascule automatique), réplication synchrone/quorum, recréation auto des réplicas, switchover (bascule planifiée).",
        "Gestion déclarative : settings PostgreSQL, rôles, bases, extensions, tablespaces, schémas, FDW (foreign data wrappers, accès à des données externes).",
        "Sauvegarde & persistance : modèles de PVC (PersistentVolumeClaim, demande de volume), backup physique continu (architecture pluggable CNPG-I), PITR (Point-In-Time Recovery, restauration à un instant T), Barman Cloud.",
        "Scaling & exploitation : redimensionnement dynamique, services R/W et R/O (lecture-écriture / lecture seule), rolling updates (mises à jour progressives), pooling de connexions via PgBouncer.",
        "Topologie distribuée : replica clusters (réplicas multi-Kubernetes), réplicas retardés (delayed, accès à des données historiques).",
        "Observabilité & sécurité : logs au format JSON, métriques Prometheus (port 9187), TLS + cert-manager, SBOM.",
        "Import de bases : hors-ligne, ou en ligne via réplication logique.",
        "À retenir : n'utilise PAS de StatefulSet — gère directement les PVC. Plugin kubectl `cnpg`. Installation via OLM (Operator Lifecycle Manager). Hibernation et fencing (mise à l'écart d'une instance) supportés.",
      ],
    },
    {
      id: "guide",
      object: "L'écriteau (la boîte aux lettres)",
      label: "À propos de ce guide",
      en: "About this guide",
      points: [
        "Renvoie vers la section « Quickstart » (démarrage rapide) pour tester CloudNativePG en local avec Kind ou Minikube.",
        "Recommande la section « Before you start » (avant de commencer) pour le vocabulaire Kubernetes/PostgreSQL et les concepts de cluster non familiers.",
      ],
    },
  ],
};

/* =================== L'ENTRÉE / GENKAN (double-clic la porte) =================== */
window.SLIDES["entree"] = {
  title: "L'Entrée — Avant de commencer",
  subtitle: "Le genkan · Before you start · docs 1.29",
  source: "https://cloudnative-pg.io/docs/1.29/before_you_start",
  sourceLabel: "cloudnative-pg.io/docs/1.29/before_you_start",
  scene: "entree",
  hint: "On enlève ses chaussures (les termes) au getabako avant d'avancer.",
  nav: [{ slide: "porte", label: "← Revenir à la porte" }],
  objects: [
    {
      id: "tapis",
      object: "Le paillasson ようこそ",
      label: "Introduction",
      en: null,
      points: [
        "Avant de démarrer, il faut maîtriser un peu de vocabulaire propre à Kubernetes ET à PostgreSQL.",
        "Cette page = le glossaire d'entrée : on « enlève ses chaussures » (on assimile les termes) avant d'avancer dans la maison.",
      ],
    },
    {
      id: "term_k8s",
      object: "Les chaussures — étagère du haut",
      label: "Terminologie Kubernetes",
      en: "Kubernetes terminology",
      points: [
        "Node (nœud) : machine de travail (VM ou physique) qui exécute les pods, pilotée par le(s) nœud(s) du control plane (plan de contrôle).",
        "Postgres Node (nœud Postgres) : nœud worker dédié à PostgreSQL via le label et le taint `node-role.kubernetes.io`.",
        "Pod : la plus petite unité déployable ; 1 ou plusieurs conteneurs partageant réseau et stockage.",
        "Service : abstraction qui expose un groupe de pods comme service réseau (découverte de service, load balancing, failover).",
        "Secret : objet qui stocke des données sensibles (mots de passe, clés d'accès, tokens) pour les pods.",
        "Storage Class (classe de stockage) : définit un type de stockage (provisioner, politique de récupération, options de montage, expansion de volume).",
        "Persistent Volume / PV (volume persistant) : ressource de stockage (provisionnée à la main ou dynamiquement), au cycle de vie indépendant du pod.",
        "Persistent Volume Claim / PVC (demande de volume) : requête de stockage (taille, mode d'accès, classe souhaitée).",
        "Namespace (espace de noms) : sous-ensemble isolé du cluster, un « cluster virtuel » dans le cluster physique.",
        "RBAC (Role-Based Access Control) : contrôle d'accès basé sur les rôles, limité aux utilisateurs autorisés.",
        "CRD (Custom Resource Definition) : extension de l'API Kubernetes par une ressource personnalisée.",
        "Operator (opérateur) : automatise les gestes qu'un opérateur humain ferait pour gérer une application.",
        "kubectl : l'outil en ligne de commande pour piloter un cluster Kubernetes.",
      ],
    },
    {
      id: "term_pg",
      object: "Les chaussures — étagère du milieu",
      label: "Terminologie PostgreSQL",
      en: "PostgreSQL terminology",
      points: [
        "Instance : un processus serveur Postgres à l'écoute sur une (des) IP et un port TCP (en général 5432).",
        "Primary (primaire) : l'instance PostgreSQL qui accepte lectures ET écritures.",
        "Replica (réplica) : instance qui réplique depuis la primaire via les enregistrements WAL ; aussi appelée « standby » ou « secondaire ».",
        "Hot Standby : fonctionnalité PostgreSQL permettant à un réplica d'accepter des charges en lecture seule.",
        "Cluster : grappe haute disponibilité = 1 primaire + réplicas optionnels.",
        "Replica Cluster (cluster réplica) : Cluster CloudNativePG en recovery continu depuis un autre cluster PostgreSQL (déploiements multi-clusters).",
        "Designated Primary (primaire désigné) : standby d'un replica cluster destiné à devenir primaire si ce cluster réplica devient primaire.",
        "Superuser : rôle PostgreSQL ayant les privilèges `LOGIN` et `SUPERUSER`.",
        "WAL (Write-Ahead Logging) : journalisation avant écriture, méthode standard garantissant l'intégrité des données.",
        "PVC group (groupe de PVC) : les PVC liés à une même instance PostgreSQL (volume principal + volume WAL).",
        "RTO (Recovery Time Objective) : temps d'arrêt maximal acceptable du système.",
        "RPO (Recovery Point Objective) : niveau de perte de données acceptable après une reprise sur sinistre.",
      ],
    },
    {
      id: "term_cloud",
      object: "Les chaussures — étagère du bas",
      label: "Terminologie Cloud",
      en: "Cloud terminology",
      points: [
        "Region (région) : zone géographique isolée et indépendante, organisée en zones de disponibilité, avec une latence réseau minimale entre ces zones.",
        "Zone (zone de disponibilité) : endroit où déployer des ressources cloud, correspondant en général à un data center.",
      ],
    },
    {
      id: "suite",
      object: "Les pantoufles",
      label: "Et après ?",
      en: "What to do next",
      points: [
        "Le vocabulaire acquis, on peut tester CloudNativePG sur son laptop avec un cluster local…",
        "…avant de déployer l'opérateur dans l'environnement cloud choisi.",
      ],
    },
  ],
};
