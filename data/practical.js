// Scénarios pratiques : l'utilisateur tape des commandes kubectl dans le
// terminal simulé, puis "Vérifier" évalue les goals contre l'état du cluster.
(function () {
  const Q = window.CKA.questions;
  const P = (o) => Q.push(Object.assign({ type: "practical" }, o));

  P({
    id: "pr-work-1", domain: "workloads", difficulty: "easy",
    title: "Créer et scaler un Deployment",
    scenario: "Le cluster est vide de charges applicatives. On veut y déployer nginx et le mettre à l'échelle.",
    tasks: [
      "Créer un Deployment nommé `web` avec l'image `nginx` (namespace default).",
      "Le scaler à 3 répliques.",
    ],
    goals: [
      { label: "Deployment `web` existe avec une image nginx", check: (c) => { const d = c.getObj("Deployment", "web", "default"); return !!d && /nginx/.test(d.image); } },
      { label: "3 répliques", check: (c) => { const d = c.getObj("Deployment", "web", "default"); return !!d && d.replicas === 3; } },
    ],
    hints: ["`kubectl create deployment <nom> --image=<img>`", "`kubectl scale deployment <nom> --replicas=<n>`"],
    solution: ["kubectl create deployment web --image=nginx", "kubectl scale deployment web --replicas=3"],
  });

  P({
    id: "pr-work-2", domain: "workloads", difficulty: "easy",
    title: "Lancer un Pod simple",
    scenario: "Besoin d'un Pod de test rapide, sans contrôleur.",
    tasks: ["Lancer un Pod nommé `nginx-pod` avec l'image `nginx` dans le namespace default."],
    goals: [
      { label: "Pod `nginx-pod` en cours avec image nginx", check: (c) => { const p = c.getObj("Pod", "nginx-pod", "default"); return !!p && /nginx/.test(p.image); } },
    ],
    hints: ["`kubectl run <nom> --image=<img>`"],
    solution: ["kubectl run nginx-pod --image=nginx"],
  });

  P({
    id: "pr-arch-1", domain: "architecture", difficulty: "medium",
    title: "Namespace + Pod dédié",
    scenario: "On isole une nouvelle application dans son propre namespace.",
    tasks: [
      "Créer le namespace `dev`.",
      "Y lancer un Pod `cache` basé sur l'image `redis`.",
    ],
    goals: [
      { label: "Namespace `dev` existe", check: (c) => !!c.getObj("Namespace", "dev", null) },
      { label: "Pod `cache` (image redis) dans `dev`", check: (c) => { const p = c.getObj("Pod", "cache", "dev"); return !!p && /redis/.test(p.image); } },
    ],
    hints: ["`kubectl create namespace <nom>`", "`kubectl run cache --image=redis -n dev`"],
    solution: ["kubectl create namespace dev", "kubectl run cache --image=redis -n dev"],
  });

  P({
    id: "pr-net-1", domain: "networking", difficulty: "medium",
    title: "Exposer un Deployment via un Service",
    scenario: "Un Deployment `frontend` (2 répliques, nginx) existe déjà. Il faut le rendre joignable dans le cluster.",
    seed: (c) => { c.add("Deployment", "frontend", "default", { image: "nginx", replicas: 2, available: 2, labels: { app: "frontend" } }); c.syncDeployPods(c.getObj("Deployment", "frontend", "default")); },
    tasks: ["Exposer le Deployment `frontend` sur le port 80 (Service ClusterIP nommé `frontend`)."],
    goals: [
      { label: "Service `frontend` existe", check: (c) => !!c.getObj("Service", "frontend", "default") },
      { label: "Il cible les Pods `app=frontend` sur le port 80", check: (c) => { const s = c.getObj("Service", "frontend", "default"); return !!s && /frontend/.test(s.selector || "") && /(^|[^0-9])80\//.test(s.ports || ""); } },
    ],
    hints: ["`kubectl expose deployment <nom> --port=80`", "Le Service reprend par défaut le nom du Deployment."],
    solution: ["kubectl expose deployment frontend --port=80"],
  });

  P({
    id: "pr-work-3", domain: "workloads", difficulty: "medium",
    title: "Rolling update d'image",
    scenario: "Le Deployment `api` tourne en `nginx:1.14`. On déploie une nouvelle version.",
    seed: (c) => { c.add("Deployment", "api", "default", { image: "nginx:1.14", replicas: 2, available: 2, labels: { app: "api" } }); c.syncDeployPods(c.getObj("Deployment", "api", "default")); },
    tasks: ["Mettre à jour l'image du Deployment `api` vers `nginx:1.16`."],
    goals: [
      { label: "Le Deployment `api` utilise nginx:1.16", check: (c) => { const d = c.getObj("Deployment", "api", "default"); return !!d && d.image === "nginx:1.16"; } },
    ],
    hints: ["`kubectl set image deployment/<nom> <container>=<image>`", "Le container par défaut créé par `create deployment` porte le nom du deployment... ici utilise `nginx=nginx:1.16`."],
    solution: ["kubectl set image deployment api nginx=nginx:1.16"],
  });

  P({
    id: "pr-arch-2", domain: "architecture", difficulty: "hard",
    title: "Vider un nœud pour maintenance",
    scenario: "Le nœud `node01` doit passer en maintenance. Il faut le rendre non planifiable et évacuer ses Pods.",
    seed: (c) => { c.makePods("legacy", "default", 2, "nginx"); c.list("Pod", "default").forEach((p) => { p.node = "node01"; }); },
    tasks: [
      "Marquer `node01` comme non planifiable et évacuer ses Pods (drain).",
    ],
    goals: [
      { label: "`node01` est SchedulingDisabled", check: (c) => c.node("node01") && c.node("node01").schedulable === false },
      { label: "Plus aucun Pod applicatif sur `node01`", check: (c) => c.list("Pod", null).filter((p) => p.node === "node01").length === 0 },
    ],
    hints: ["`kubectl drain <node> --ignore-daemonsets --force`", "drain effectue un cordon puis évacue les Pods."],
    solution: ["kubectl drain node01 --ignore-daemonsets --force"],
  });

  P({
    id: "pr-ts-1", domain: "troubleshooting", difficulty: "hard",
    title: "Service sans Endpoints (mauvais label)",
    scenario: "Le Service `db` (selector `app=db`) ne route rien. Le Pod `db-0` porte par erreur le label `app=mysql`. Corrige le label du Pod pour qu'il soit sélectionné.",
    seed: (c) => {
      c.add("Service", "db", "default", { svcType: "ClusterIP", selector: "app=db", ports: "3306/TCP", clusterIP: "10.96.0.40" });
      c.add("Pod", "db-0", "default", { status: "Running", ready: "1/1", image: "mysql", node: "node01", labels: { app: "mysql" } });
    },
    tasks: [
      "Inspecte le Service et le Pod (`kubectl get svc,pod --show-labels` ou describe).",
      "Réaligne le label du Pod `db-0` sur `app=db`.",
    ],
    goals: [
      { label: "Le Pod `db-0` porte le label `app=db`", check: (c) => { const p = c.getObj("Pod", "db-0", "default"); return !!p && p.labels && p.labels.app === "db"; } },
    ],
    hints: ["`kubectl label pod db-0 app=db --overwrite`", "Le selector du Service doit matcher les labels du Pod pour remplir les Endpoints."],
    solution: ["kubectl label pod db-0 app=db --overwrite"],
  });

  P({
    id: "pr-arch-3", domain: "architecture", difficulty: "medium",
    title: "Taint d'un nœud (réserver aux GPU)",
    scenario: "On réserve `node01` à des charges spécifiques en le taintant.",
    tasks: ["Ajouter sur `node01` le taint `gpu=true:NoSchedule`."],
    goals: [
      { label: "`node01` a le taint gpu=true:NoSchedule", check: (c) => { const n = c.node("node01"); return !!n && (n.taints || []).some((t) => t.key === "gpu" && t.effect === "NoSchedule"); } },
    ],
    hints: ["`kubectl taint nodes <node> <clé>=<valeur>:<effet>`"],
    solution: ["kubectl taint nodes node01 gpu=true:NoSchedule"],
  });
})();
