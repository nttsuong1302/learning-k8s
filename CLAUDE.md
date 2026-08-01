# learning-k8s — CKA Trainer

## 🎯 Vision

Site web **statique** de révision pour la certification **CKA** (Certified
Kubernetes Administrator), à destination d'un profil **DBA** qui monte en
compétence sur Kubernetes.

Objectif : une **grande banque de questions** (cible **1000**, puis +1000)
couvrant **tous les sujets Kubernetes / CKA**, avec deux natures de questions :

1. **Théoriques** — QCM (choix simple ou multiple) avec explication + lien vers
   la doc officielle.
2. **Pratiques** — un **scénario** façon examen CKA, avec un **simulateur
   `kubectl` intégré à côté de la question** : l'utilisateur tape ses commandes
   dans un terminal simulé, puis **valide** que l'état du cluster atteint
   l'objectif. Correction, indices et solution de référence fournis.

Pas de backend : tout tourne côté navigateur (hébergeable sur GitHub Pages).

## 🧭 Domaines CKA (pondération officielle)

| id | Domaine | Poids |
|----|---------|-------|
| `architecture` | Cluster Architecture, Installation & Configuration | 25 % |
| `workloads` | Workloads & Scheduling | 15 % |
| `networking` | Services & Networking | 20 % |
| `storage` | Storage | 10 % |
| `troubleshooting` | Troubleshooting | 30 % |

## 🧩 Modèle de données (une question = un objet JS)

Les questions vivent dans `data/*.js` et s'ajoutent à `window.CKA.questions`.

**Théorie**
```js
{ id, domain, type:'theory', difficulty:'easy|medium|hard',
  q, choices:[...], correct:[idx], explain, ref }
```

**Pratique** (avec simulateur)
```js
{ id, domain, type:'practical', difficulty,
  title, scenario, tasks:[...],
  seed:(c)=>{...},                 // état initial supplémentaire (optionnel)
  goals:[ { label, check:(c)=>bool } ],   // validation via l'état du cluster
  hints:[...], solution:[...] }    // commandes kubectl de référence
```

Le `check` interroge l'état du **cluster simulé** (`js/kube-sim.js`), qui expose
`c.getObj(kind,name,ns)`, `c.list(kind,ns)`, `c.node(name)`, etc.

## 🖥️ Simulateur kubectl (`js/kube-sim.js`)

Cluster en mémoire + parseur d'un sous-ensemble de `kubectl` (get, describe,
run, create, expose, scale, set image, delete, label, annotate, rollout,
cordon/uncordon, drain, taint…). Sorties réalistes en mode tableau. Le
simulateur n'exécute rien de réel : il fait évoluer un état d'objets et permet
de **vérifier** les objectifs d'un scénario.

## 🛠️ Pile technique

HTML + CSS + JavaScript **vanilla**. Données en fichiers JS (`window.CKA`).
Progression stockée en `localStorage`.

## 📁 Organisation

```
index.html
css/style.css
js/
  kube-sim.js       # cluster simulé + parseur kubectl
  app.js            # moteur : routeur, quiz, terminal, progression
data/
  domains.js        # métadonnées des 5 domaines
  theory.js         # questions théoriques (QCM)
  practical.js      # scénarios pratiques (+ objectifs de validation)
```

## 📐 Principes de travail

- **Itératif et par lots.** On construit d'abord le **v1** (moteur + simulateur
  + premier lot de questions couvrant les 5 domaines), puis on grossit la banque
  par **lots thématiques** jusqu'à 1000, en gardant qualité et non-doublons.
- **Exactitude d'abord** : chaque question théorique a une explication et un
  lien de doc ; chaque scénario a une solution de référence testée dans le
  simulateur.
- **Langue** : français (termes techniques K8s en anglais).

## ✅ Avancement

- [ ] v1 : moteur + simulateur + 1er lot de questions (5 domaines)
- [ ] Montée à 1000 questions (lots thématiques)
- [ ] Lot suivant (+1000)
