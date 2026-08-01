# PROMPT technique — recréer le « CKA Trainer »

Ce fichier est un **prompt réutilisable** : copie-le à un assistant (ou suis-le)
pour régénérer l'application de zéro. Il décrit le quoi et le comment, sans
dépendre du code existant.

---

## 🎯 Objectif

Construis un **site web statique** (HTML/CSS/JS **vanilla**, hébergeable sur
GitHub Pages, **sans backend**) de révision pour la certification **CKA**
(Certified Kubernetes Administrator), pour un profil **DBA** montant en
compétence sur Kubernetes. Interface en **français** ; termes techniques K8s en
**anglais**.

## 📏 Règles de fidélité (IMPÉRATIVES)

1. **Ne jamais inventer.** Aucune commande, champ, valeur par défaut ou
   comportement « de mémoire ».
2. Se baser **strictement sur la doc officielle** : Kubernetes →
   `https://kubernetes.io/docs/` ; CloudNativePG → `https://cloudnative-pg.io/docs/`.
3. **Chaque question et chaque technique porte un lien `ref`** vers la page
   officielle. Sans source → on n'écrit pas.
4. En cas de doute, **vérifier la doc** plutôt que deviner. Reformuler/traduire
   en français est permis, **sans altérer le fond** ni recopier des paragraphes
   entiers (synthèse, pas reproduction).

## 🧭 Domaines (pondération officielle CKA)

| id | Domaine | Poids |
|----|---------|-------|
| `architecture` | Cluster Architecture, Installation & Configuration | 25 % |
| `workloads` | Workloads & Scheduling | 15 % |
| `networking` | Services & Networking | 20 % |
| `storage` | Storage | 10 % |
| `troubleshooting` | Troubleshooting | 30 % |
| `cnpg` | CloudNativePG (hors CKA, opérateur PostgreSQL) | — |

## 🧩 Modèle de données (`window.CKA`)

Un fichier `data/domains.js` définit `window.CKA.domains` (id, short, name,
weight, badge, icon, color) et initialise `window.CKA.questions = []`.

**Question théorique**
```js
{ id, domain, type:'theory', difficulty:'easy|medium|hard',
  q, choices:[...], correct:[idx...],   // multi si correct.length>1
  why:[...],        // explication PAR OPTION (même longueur que choices)
  explain,          // synthèse (paragraphe)
  ref,              // lien doc officielle
  en:{ q, choices, explain?, why? } }   // traduction anglaise (optionnelle)
```

**Question pratique** (avec simulateur)
```js
{ id, domain, type:'practical', difficulty,
  title, scenario, tasks:[...],
  seed:(c)=>{...},                        // état initial (optionnel)
  goals:[ { label, check:(c)=>bool } ],   // validation via l'état du cluster
  hints:[...], solution:[...] }           // commandes kubectl de référence
```

**Surcharges par id** (chargées après les banques) : des fichiers peuvent
remplacer/compléter des champs par id — ex. `explain-rich.js` (paragraphes
d'explication) et `translations-en.js` (`en`). Cela permet d'enrichir par lots
sans réécrire les banques.

## 🖥️ Simulateur kubectl (`js/kube-sim.js`)

Un « cluster » = un ensemble d'objets en mémoire. Expose :
`KubeSim.createCluster(seedFn)` (crée un cluster + `seedBase()` : namespaces
default/kube-system/kube-public/kube-node-lease + nœuds `controlplane`/`node01`)
et `KubeSim.run(cluster, ligne)` (parse et exécute).

API pour les `check` des scénarios : `c.getObj(kind,name,ns)`, `c.list(kind,ns)`,
`c.node(name)`, `c.add(...)`, `c.remove(...)`.

Verbes à simuler (sous-ensemble), avec **sorties réalistes en tableau** :
`get`, `describe`, `run`, `create` (namespace/deployment/configmap/secret),
`expose`, `scale`, `set image`, `delete`, `label`, `annotate`, `rollout`
(status/restart/undo/history), `cordon`/`uncordon`/`drain`, `taint`, `version`,
`config`. Gérer `-n/--namespace`, `-A/--all-namespaces`, `-o wide`, `-l`.
Normaliser les kinds (po→Pod, deploy→Deployment, svc→Service, no→Node, pvc→…).
Créer un Deployment doit générer des Pods cohérents ; `scale` les recalcule ;
`drain` retire les Pods du nœud. Rien de réel n'est exécuté.

## 🕹️ Fonctionnalités (moteur `js/app.js`)

Application mono-page rendue dans `#app`. Vues :

1. **Accueil / dashboard** : titre, compteurs (nb questions, abordées,
   réussies), boutons (Tout réviser / Théorie / Pratique / Mode examen aléatoire
   / Parcourir les techniques / Mes résultats / Réinitialiser), cartes par
   domaine (progression, poids ou badge), **sélecteur de langue FR/EN**.
2. **Session de quiz** : en-tête (retour, titre, langue, compteur), barre de
   progression, tags (domaine/type/difficulté), la question, navigation
   Précédent/Suivant.
   - **Théorie** : options (radio/checkbox), bouton Valider → **débriefing
     complet** : chaque option annotée (✓ bonne réponse / ✗ ta réponse) + son
     `why`, puis « En résumé » (`explain`), puis « 📖 Lire le paragraphe
     officiel sur <host> ↗ » (lien `ref`).
   - **Pratique** : scénario + tâches + **terminal simulé** (saisie kubectl,
     historique ↑/↓, `clear`) + boutons Vérifier (évalue les `goals` contre
     l'état du cluster) / Indices / Solution (exécutable) / Réinitialiser le
     cluster.
3. **Techniques** : index groupé par domaine avec **recherche** en direct, et un
   **lecteur** Précédent/Suivant (titre, résumé, points clés, commandes, lien doc).
4. **Résultats** : taux global de bonnes réponses, **point fort / à travailler**
   (meilleur / pire domaine), et par domaine : taux (vert ≥75 %, orange ≥50 %,
   rouge sinon), questions maîtrisées, tentatives, erreurs.

**Langue** : FR par défaut, EN affiche `en.q`/`en.choices` (repli FR si absent) ;
le débriefing reste en FR. Stockée en `localStorage` (`cka-lang`).
**Progression** : par question `{ seen, attempts, ok, correct }` en `localStorage`
(`cka-progress-v1`), pour alimenter la page Résultats.

## 🎨 Style (`css/style.css`)

Thème sombre, accent bleu Kubernetes (`#326ce5`). Cartes arrondies, barres de
progression, terminal façon fenêtre (points rouge/jaune/vert, police mono).
Responsive (grilles auto-fill, empilement < 560–640 px).

## 📁 Structure attendue

```
index.html                # charge data/*.js puis js/kube-sim.js, js/app.js
css/style.css
js/kube-sim.js  js/app.js
data/domains.js  data/theory.js  data/theory2.js  data/practical.js
data/techniques.js  data/cnpg.js  data/explain-rich.js  data/translations-en.js
```
Ordre de chargement : `domains.js` d'abord (crée les tableaux), puis les banques,
puis les surcharges (`explain-rich.js`, `translations-en.js`), puis le moteur.

## 🚀 Lancer / déployer

Local : `python3 -m http.server 4173` → http://localhost:4173.
Prod : GitHub Pages (branche `main`, racine).

## 📐 Méthode

Construire par **lots** : d'abord moteur + simulateur + 1er lot de questions
couvrant les domaines, puis grossir la banque (cible 1000, puis +1000) et les
traductions/explications par lots thématiques, en gardant **exactitude** (chaque
item sourcé) et **non-doublons**.
