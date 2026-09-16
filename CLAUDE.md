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

## 📏 Principes de fidélité (IMPORTANT — priment sur tout le reste)

1. **Ne JAMAIS inventer.** Aucune affirmation, commande, champ, valeur par défaut
   ou comportement ne doit être écrit « de mémoire » ou supposé.
2. **Se baser strictement sur la documentation OFFICIELLE :**
   - Kubernetes / CKA → **https://kubernetes.io/docs/**
   - CloudNativePG (CNPG) → **https://cloudnative-pg.io/docs/**
3. **Chaque question et chaque technique porte un lien `ref`** vers la page
   officielle qui la justifie. Si on ne peut pas sourcer, on n'écrit pas.
4. **En cas de doute, on va vérifier la doc** (WebFetch) plutôt que de deviner.
5. On peut reformuler/traduire en français, mais **sans altérer le fond** ni
   ajouter de détails non documentés.

## 🧭 Domaines CKA (pondération officielle)

| id | Domaine | Poids |
|----|---------|-------|
| `architecture` | Cluster Architecture, Installation & Configuration | 25 % |
| `workloads` | Workloads & Scheduling | 15 % |
| `networking` | Services & Networking | 20 % |
| `storage` | Storage | 10 % |
| `troubleshooting` | Troubleshooting | 30 % |

## 🐘 Sujet complémentaire (hors CKA)

| id | Sujet | Source officielle |
|----|-------|-------------------|
| `cnpg` | CloudNativePG — opérateur PostgreSQL sur Kubernetes | https://cloudnative-pg.io/docs/ |

## 🎓 Notes de formation (hors CKA, pas de QCM)

`window.CKA.formation` (fichier `data/formation.js`) contient des **notes de cours** prises
pendant les sessions de formation Kubernetes de l'utilisateur — pas des questions, juste de la
lecture organisée et sourcée (rubrique « 🎓 Notes de formation » sur l'accueil, même mécanique
de navigation que les Techniques).

Modèle d'une fiche :
```js
{ id, day, section, title, lead, diagram: "img/...svg"?, body: [...], points: [...]?, note: [...]?, refs: [...] }
```

`diagram` (optionnel) pointe vers un SVG statique dans `img/` (palette du site, pas de bibliothèque externe),
affiché sous le `lead` dans le lecteur de fiche. Il visualise des faits déjà sourcés dans la fiche (ou dans une
fiche liée) — ce n'est pas une source en soi, donc les `refs` de la fiche restent celles qui justifient le contenu.

Pour cette rubrique uniquement, les sources officielles autorisées s'étendent au-delà de
kubernetes.io / cloudnative-pg.io, à celles déjà validées par l'utilisateur dans ses notes :
**etcd.io**, **raft.github.io**, **external-secrets.io**, **developer.hashicorp.com/vault**,
**kubespray.io** / **github.com/kubernetes-sigs/kubespray**, **kubernetes-csi.github.io**
(doc officielle du SIG-Storage pour le développement/déploiement des CSI drivers), **sonobuoy.io** et
**github.com/cncf/k8s-conformance** (doc officielle du programme de certification CNCF Certified Kubernetes),
**cri-o.io** / **github.com/cri-o/cri-o** (projet CNCF graduated, doc officielle du runtime CRI-O),
**docs.tigera.io/calico** (doc officielle du plugin CNI Calico, référence pour les notions génériques
de CNI comme overlay vs native routing), **docs.cilium.io** / **www.cncf.io** (doc officielle du CNI
Cilium et statut de maturité CNCF), **docs.rke2.io** (doc officielle de RKE2, la distribution
Kubernetes derrière Rancher), **ranchermanager.docs.rancher.com** (doc officielle de Rancher,
la plateforme de gestion multi-cluster).
Les mêmes principes de fidélité
s'appliquent : ne rien inventer, chaque fiche porte ses `refs` vers la doc officielle du projet
concerné.

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

## 🌐 Bilingue FR / EN (conditions d'examen)

L'examen CKA se passe **en anglais** (contenu aussi dispo en chinois simplifié et
japonais ; surveillance en anglais). Le trainer propose donc un **basculement
FR/EN** sur les questions :

- Le **contenu de la question** (`q`) et les **options** (`choices`) peuvent être
  affichés en anglais pour reproduire les conditions réelles.
- Le **débriefing** (explication `explain` + `why` par option) **reste en
  français** : c'est l'aide à l'apprentissage.
- Modèle : chaque question peut porter `en: { q, choices, explain?, why? }`.
  Les traductions vivent dans `data/translations-en.js` (surcharge par id).
  **Repli automatique en FR** si une question n'a pas de version EN.
- La langue est mémorisée en `localStorage` (`cka-lang`).

## 🛠️ Pile technique

HTML + CSS + JavaScript **vanilla**. Données en fichiers JS (`window.CKA`).
Progression et langue stockées en `localStorage`.

## 📁 Organisation

```
index.html
css/style.css
js/
  kube-sim.js         # cluster simulé + parseur kubectl
  app.js              # moteur : routeur, quiz, terminal, techniques, résultats, langue
data/
  domains.js          # métadonnées des domaines (+ CNPG hors CKA)
  theory.js           # QCM lot 1 (avec why[] par option)
  theory2.js          # QCM lot 2 (+100)
  theory3.js          # QCM lot 3 (+50) — sourcé par scan de kubernetes.io, bilingue
  theory4.js          # QCM lot 4 (+50) — scan kubernetes.io (RBAC, etcd, probes, QoS…), bilingue
  theory5.js          # QCM lot 5 (+50) — scan kubernetes.io (PSA, admission, HPA, dual-stack, healthz…), bilingue
  theory6.js          # QCM lot 6 (+50) — scan kubernetes.io (AdmissionPolicy/CEL, API Priority&Fairness, Secrets/ConfigMap, subPath, eviction, rollout…), bilingue
  theory7.js          # QCM lot 7 (+50) — scan kubernetes.io (kubeadm phases, leader election, NodeLocal DNSCache, Ingress TLS, CSI capacity tracking, node-pressure eviction…), bilingue
  theory8.js          # QCM lot 8 (+50) — scan kubernetes.io (RuntimeClass, kustomize, native sidecars, EndpointSlice addressType, PVC retention policy, kubectl cp/explain…), bilingue
  theory9.js          # QCM lot 9 (+50) — scan kubernetes.io (kubeadm certs renew, RBAC impersonate, IngressClass.controller, CSIDriver, finalizers, kubectl diff/scale…), bilingue
  theory10.js         # QCM lot 10 (+50) — scan kubernetes.io (TokenRequest v1.22, APF FlowSchema, Gateway API, VolumeAttachment/VolumeAttributesClass, kubectl rollout restart/debug --profile…), bilingue
  theory11.js         # QCM lot 11 (+50) — scan kubernetes.io (control-plane-endpoint, ClusterRole view, CRD subresources, VolumeSnapshotContent, GatewayClass, crictl, kubectl attach/wait/drain…), bilingue
  theory12.js         # QCM lot 12 (ajout ponctuel depuis discussion) — méthodes d'authentification de kube-apiserver (certificats X.509, bearer tokens), bilingue
  practical.js        # scénarios pratiques (+ objectifs de validation)
  techniques.js       # catalogue de techniques à parcourir
  cnpg.js             # techniques + QCM CloudNativePG (doc officielle)
  formation.js        # notes de formation (pas de QCM) — Jour 1 : vanilla/Kubespray, control plane, etcd/Raft, scheduler filtering & scoring, Secrets/ESO/Vault
  explain-rich.js     # surcharge : explications en paragraphes (par id)
  translations-en.js  # surcharge : traductions EN des questions (par id)
```

> Les fichiers `*-rich` / `translations-*` **surchargent** des champs par id,
> chargés après les banques. Ils permettent d'enrichir/traduire par lots sans
> toucher aux banques de questions.

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
