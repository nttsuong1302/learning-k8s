// CloudNativePG (CNPG) — contenu basé STRICTEMENT sur la doc officielle.
// Source : https://cloudnative-pg.io/docs/1.29/  (ne rien inventer, tout sourcer)
(function () {
  const CN = "https://cloudnative-pg.io/docs/1.29/";
  const L = (window.CKA.techniques = window.CKA.techniques || []);
  const Q = (window.CKA.questions = window.CKA.questions || []);
  const T = (o) => L.push(Object.assign({ domain: "cnpg" }, o));
  const TH = (o) => Q.push(Object.assign({ type: "theory", domain: "cnpg" }, o));

  /* ---------------- TECHNIQUES ---------------- */
  T({ id: "cn-overview", title: "CloudNativePG : vue d'ensemble",
    summary: "Opérateur Kubernetes open-source pour gérer des charges PostgreSQL, créé à l'origine par EDB, sous licence Apache 2.0.",
    points: [
      "Niveau de maturité « Level V — Auto Pilot » (Operator Capability Levels).",
      "Ressource personnalisée centrale : `Cluster` (1 primaire + réplicas optionnels).",
      "N'utilise PAS de StatefulSets : gère directement les PersistentVolumeClaims (PVC).",
      "Gestion déclarative des settings, rôles, bases, tablespaces PostgreSQL.",
      "Plugin kubectl `cnpg` pour les opérations courantes.",
    ],
    cmds: ["kubectl get clusters", "kubectl cnpg status <cluster>", "kubectl describe cluster <cluster>"],
    ref: CN });

  T({ id: "cn-archi", title: "Architecture HA et les 3 Services",
    summary: "Un primaire (écritures) + hot standby (lectures) ; CNPG crée trois Services pour l'accès applicatif.",
    points: [
      "`<cluster>-rw` : connexion au primaire uniquement (lectures/écritures).",
      "`<cluster>-ro` : lectures seules routées vers les hot standby.",
      "`<cluster>-r` : lecture seule vers n'importe quelle instance.",
      "Réplication streaming PostgreSQL (asynchrone ou synchrone).",
      "Failover transparent : le service `-rw` bascule automatiquement vers une autre instance.",
    ],
    cmds: ["kubectl get svc -l cnpg.io/cluster=<cluster>", "# écriture : <cluster>-rw   lecture : <cluster>-ro"],
    ref: CN + "architecture/" });

  T({ id: "cn-bootstrap", title: "Bootstrap d'un Cluster",
    summary: "Trois méthodes d'amorçage (une seule par manifeste) sous spec.bootstrap.",
    points: [
      "`spec.bootstrap.initdb` : créer un nouveau cluster PostgreSQL vide (méthode par défaut).",
      "`spec.bootstrap.recovery` : restaurer depuis une base backup (object store / volume snapshot), avec PITR possible.",
      "`spec.bootstrap.pg_basebackup` : cloner un cluster existant de même version majeure via streaming.",
    ],
    cmds: ["# spec.bootstrap.initdb: { database, owner, ... }", "# spec.bootstrap.recovery: { source, recoveryTarget }", "# spec.bootstrap.pg_basebackup: { source }"],
    ref: CN + "bootstrap/" });

  T({ id: "cn-replication", title: "Réplication synchrone",
    summary: "PostgreSQL fait de la réplication streaming asynchrone ou synchrone ; CNPG supporte le mode synchrone quorum et priorité.",
    points: [
      "Synchronous Replication basée sur le quorum (quorum-based) ou sur la priorité (priority-based).",
      "Le mode synchrone garantit qu'un commit est répliqué avant d'être confirmé.",
      "Approche « shared-nothing » : les instances ne partagent que le réseau.",
    ],
    cmds: ["kubectl cnpg status <cluster>   # affiche l'état de la réplication"],
    ref: CN + "architecture/" });

  T({ id: "cn-backup", title: "Sauvegarde continue et PITR",
    summary: "L'archivage des WAL + une base backup permettent la restauration à un instant T (PITR).",
    points: [
      "Méthodes : plugin CNPG-I (Barman Cloud pour object store) ou `volumeSnapshot`.",
      "`method: barmanObjectStore` existe encore par défaut mais est déprécié depuis v1.26.",
      "« Un WAL archive seul est inutile : sans base backup, pas de restauration. »",
      "Ressources : `Backup` (à la demande) et `ScheduledBackup` (cron 6 champs, avec secondes).",
      "RPO ≤ 5 minutes quand l'archivage WAL est configuré.",
    ],
    cmds: ["kubectl cnpg backup <cluster>", "# ScheduledBackup: spec.schedule (6 champs), immediate, suspend"],
    ref: CN + "backup/" });

  T({ id: "cn-connect", title: "Connexion applicative (bon Service)",
    summary: "Router les écritures vers le primaire et les lectures vers les réplicas.",
    points: [
      "Écritures → toujours via `<cluster>-rw`.",
      "Lectures seules → `<cluster>-ro` (réplicas) ou `<cluster>-r` (n'importe quelle instance).",
      "Pooling de connexions possible via PgBouncer (Pooler).",
    ],
    cmds: ["# app d'écriture -> host: <cluster>-rw", "# app de lecture  -> host: <cluster>-ro"],
    ref: CN + "architecture/" });

  T({ id: "cn-placement", title: "Répartition des instances (anti-affinité)",
    summary: "Étaler les instances sur des nœuds/zones différents pour une vraie haute disponibilité.",
    points: [
      "Les instances PostgreSQL devraient résider sur des worker nodes différents.",
      "Idéalement réparties sur plusieurs zones de disponibilité.",
      "Isoler les charges via le label `node-role.kubernetes.io/postgres` et des taints.",
      "Déployer en multiples de trois — idéalement un nœud par zone.",
    ],
    cmds: ["kubectl label node <node> node-role.kubernetes.io/postgres=", "kubectl taint node <node> node-role.kubernetes.io/postgres=:NoSchedule"],
    ref: CN + "architecture/" });

  /* ---------------- QUESTIONS (théorie) ---------------- */
  TH({ id: "cn-th-1", difficulty: "easy",
    q: "Quelle ressource personnalisée est au cœur de CloudNativePG ?",
    choices: ["Database", "Cluster", "PostgresServer", "PGDeployment"], correct: [1],
    why: [
      "Faux : `Database` n'est pas la CRD centrale de CNPG.",
      "Correct : la ressource `Cluster` décrit un primaire + réplicas optionnels.",
      "Faux : `PostgresServer` n'existe pas dans CNPG.",
      "Faux : `PGDeployment` n'existe pas ; CNPG n'utilise pas de Deployment pour les instances.",
    ],
    explain: "Tout se pilote de façon déclarative via la CRD `Cluster`.",
    ref: CN });

  TH({ id: "cn-th-2", difficulty: "easy",
    q: "Pour les ÉCRITURES, une application doit se connecter à quel Service d'un Cluster nommé `pg` ?",
    choices: ["pg-ro", "pg-r", "pg-rw", "pg-primary"], correct: [2],
    why: [
      "Faux : `-ro` route vers les réplicas en lecture seule.",
      "Faux : `-r` cible n'importe quelle instance, en lecture.",
      "Correct : `-rw` pointe uniquement vers le primaire (lectures/écritures).",
      "Faux : `-primary` ne fait pas partie des Services créés par CNPG.",
    ],
    explain: "Écritures → -rw ; lectures → -ro (réplicas) ou -r (toute instance).",
    ref: CN + "architecture/" });

  TH({ id: "cn-th-3", difficulty: "medium",
    q: "CloudNativePG s'appuie-t-il sur des StatefulSets pour la persistance ?",
    choices: ["Oui, un StatefulSet par Cluster", "Non, il gère directement les PVC", "Oui, mais seulement pour le primaire", "Non, il utilise des emptyDir"], correct: [1],
    why: [
      "Faux : CNPG n'utilise pas de StatefulSet.",
      "Correct : il gère directement les PersistentVolumeClaims (PVC).",
      "Faux : aucun StatefulSet, même pour le primaire.",
      "Faux : emptyDir est éphémère, inadapté à une base de données.",
    ],
    explain: "La gestion directe des PVC donne plus de contrôle sur les volumes.",
    ref: CN });

  TH({ id: "cn-th-4", difficulty: "medium",
    q: "Quelles sont les méthodes de bootstrap d'un Cluster ? (plusieurs réponses)",
    choices: ["initdb", "recovery", "pg_basebackup", "helm"], correct: [0, 1, 2],
    why: [
      "Correct : initdb crée un nouveau cluster vide (méthode par défaut).",
      "Correct : recovery restaure depuis une sauvegarde (PITR possible).",
      "Correct : pg_basebackup clone un cluster existant de même version majeure.",
      "Faux : Helm est un gestionnaire de packages, pas une méthode de bootstrap CNPG.",
    ],
    explain: "spec.bootstrap accepte une seule de ces méthodes par manifeste.",
    ref: CN + "bootstrap/" });

  TH({ id: "cn-th-5", difficulty: "medium",
    q: "Pour une restauration à un instant T (PITR), que faut-il impérativement en plus de l'archive WAL ?",
    choices: ["Rien, le WAL suffit", "Une base backup (physical base backup)", "Un StatefulSet", "Un Service -ro"], correct: [1],
    why: [
      "Faux : « un WAL archive seul est inutile ».",
      "Correct : sans base backup physique, on ne peut pas restaurer le cluster.",
      "Faux : CNPG n'utilise pas de StatefulSet.",
      "Faux : le Service -ro sert l'accès en lecture, pas la restauration.",
    ],
    explain: "WAL + base backup = PITR (RPO ≤ 5 min si WAL archivé).",
    ref: CN + "backup/" });

  TH({ id: "cn-th-6", difficulty: "easy",
    q: "Sur quel port l'exporter de métriques Prometheus de CloudNativePG écoute-t-il ?",
    choices: ["8080", "9090", "9187", "5432"], correct: [2],
    why: [
      "Faux : 8080 n'est pas le port des métriques CNPG.",
      "Faux : 9090 est le port du serveur Prometheus, pas de l'exporter CNPG.",
      "Correct : CNPG expose les métriques sur 9187.",
      "Faux : 5432 est le port PostgreSQL lui-même.",
    ],
    explain: "9187 est le port standard d'un postgres exporter.",
    ref: CN });

  TH({ id: "cn-th-7", difficulty: "hard",
    q: "Quelles ressources gèrent les sauvegardes dans CloudNativePG ?",
    choices: ["Backup et ScheduledBackup", "BackupJob et CronBackup", "Snapshot et Restore", "PGBackup uniquement"], correct: [0],
    why: [
      "Correct : `Backup` (à la demande) et `ScheduledBackup` (planifiée).",
      "Faux : `BackupJob`/`CronBackup` n'existent pas dans CNPG.",
      "Faux : `Snapshot`/`Restore` ne sont pas ces CRD CNPG.",
      "Faux : `PGBackup` n'existe pas.",
    ],
    explain: "ScheduledBackup utilise un cron à 6 champs (secondes incluses).",
    ref: CN + "backup/" });

  TH({ id: "cn-th-8", difficulty: "hard",
    q: "Quels modes de réplication synchrone PostgreSQL CloudNativePG supporte-t-il ?",
    choices: ["Basée sur le quorum et basée sur la priorité", "Uniquement asynchrone", "Basée sur le stockage (block-level)", "Multi-maître"], correct: [0],
    why: [
      "Correct : réplication synchrone quorum-based et priority-based.",
      "Faux : CNPG supporte aussi le synchrone, pas seulement l'asynchrone.",
      "Faux : la réplication est au niveau applicatif (PostgreSQL), pas au niveau stockage.",
      "Faux : PostgreSQL/CNPG n'est pas multi-maître.",
    ],
    explain: "La réplication s'appuie sur le streaming natif de PostgreSQL.",
    ref: CN + "architecture/" });

  TH({ id: "cn-th-9", difficulty: "medium",
    q: "Sous quelle licence CloudNativePG est-il distribué ?",
    choices: ["GPLv3", "MIT", "Apache License 2.0", "BSD"], correct: [2],
    why: [
      "Faux : ce n'est pas du GPLv3.",
      "Faux : ce n'est pas du MIT.",
      "Correct : CNPG (créé par EDB) est sous Apache License 2.0.",
      "Faux : ce n'est pas du BSD.",
    ],
    explain: "Projet open-source, aujourd'hui sous gouvernance CNCF (sandbox).",
    ref: CN });

  TH({ id: "cn-th-10", difficulty: "hard",
    q: "En cas d'indisponibilité du primaire au sein d'un même cluster K8s, que fait CloudNativePG ?",
    choices: ["Rien, intervention manuelle obligatoire", "Un failover automatique : le service -rw bascule vers une autre instance", "Il supprime le Cluster", "Il bascule en lecture seule définitivement"], correct: [1],
    why: [
      "Faux : au sein d'un même cluster, le failover est automatique.",
      "Correct : CNPG déclenche un failover et fait pointer -rw vers une autre instance.",
      "Faux : il ne supprime jamais le Cluster.",
      "Faux : il ne reste pas bloqué en lecture seule.",
    ],
    explain: "En multi-cluster (replica cluster), la promotion reste manuelle.",
    ref: CN + "architecture/" });
})();
