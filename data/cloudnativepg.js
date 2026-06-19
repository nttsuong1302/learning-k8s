// Contenu des slides du RDC — CloudNativePG
// Chaque entrée = un objet de la maison. La clé correspond à l'id de la zone
// cliquable dans le SVG (index.html).
//
// La fiche "porte" est elle-même une mini-scène : une PORTE avec plusieurs
// OBJETS ; chaque objet = une RUBRIQUE de la page de doc indiquée.
// Tout en français ; les termes techniques anglais sont conservés avec une
// explication française à côté.
//
// Source : https://cloudnative-pg.io/docs/1.29/

window.SLIDES = window.SLIDES || {};

window.SLIDES["porte"] = {
  title: "La Porte — CloudNativePG",
  subtitle: "Vue d'ensemble · docs 1.29",
  source: "https://cloudnative-pg.io/docs/1.29/",
  sourceLabel: "cloudnative-pg.io/docs/1.29",
  door: {
    hint: "Clique un objet de la porte → sa rubrique s'ouvre à droite.",
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
  },
};
