# CKA Trainer

Site statique de révision pour la certification **CKA** (Certified Kubernetes
Administrator). Banque de questions **théoriques** (QCM) et **pratiques** avec un
**terminal `kubectl` simulé** intégré : on tape ses commandes puis on **vérifie**
que l'état du cluster atteint l'objectif du scénario.

Aucun backend — HTML/CSS/JS vanilla, hébergeable sur GitHub Pages.

> Vision, modèle de données et roadmap : voir [CLAUDE.md](CLAUDE.md).

## 🧭 Domaines (pondération CKA)

Architecture (25 %) · Workloads & Scheduling (15 %) · Services & Networking
(20 %) · Storage (10 %) · Troubleshooting (30 %).

## 🚀 Lancer en local

```bash
python3 -m http.server 4173
# http://localhost:4173
```

## 📁 Structure

```
index.html
css/style.css
js/
  kube-sim.js     # cluster simulé + parseur kubectl
  app.js          # moteur (accueil, quiz, terminal, progression)
data/
  domains.js      # 5 domaines CKA
  theory.js       # QCM (explication + lien doc)
  practical.js    # scénarios (objectifs validés par l'état du cluster)
```

## ➕ Ajouter des questions

- **Théorie** : `window.CKA.questions.push({ type:'theory', domain, q, choices, correct:[i], explain, ref })`
- **Pratique** : `push({ type:'practical', domain, title, scenario, tasks, seed, goals:[{label,check}], hints, solution })`

La progression est stockée en `localStorage` (par navigateur).

## 🗺️ Roadmap

- **v1** : moteur + simulateur + 1er lot de questions (5 domaines). ✅
- Montée progressive vers **1000** questions par lots thématiques, puis **+1000**.
