# learning-k8s — Instructions du projet

## 🎯 Vision

Site web **interactif** pour apprendre **Kubernetes (K8s)** en s'appuyant sur la
**méthode des loci** (« palais de la mémoire ») : on associe chaque notion à un
**objet** placé dans une **grande maison**. En cliquant sur un objet, on ouvre
une **popup en forme de slide de présentation** qui résume les points marquants
de la notion.

L'objectif n'est **pas de résumer en supprimant** du contenu, mais d'**extraire
les notions clés** de chaque page fournie par l'utilisateur, tout en conservant
l'intégralité de l'information source.

## 🏠 Métaphore : la maison japonaise

L'illustration centrale est une **maison japonaise** dans le style des
**couvertures de romans (light novels) japonais** : ambiance douce, lignes
épurées, palette chaleureuse, éléments traditionnels (shoji, tatami, engawa,
jardin, lanternes).

Chaque **zone / objet** de la maison = un point d'ancrage mémoriel pour une
notion. Cliquer sur l'objet ouvre la slide correspondante.

### Plan de la maison (structure pédagogique)

| Niveau | Thème | Statut |
|--------|-------|--------|
| **RDC (genkan / entrée)** | **CloudNativePG** | 🔨 En cours — **on commence ici** |
| **Étage 1** | Infrastructure K8s | ⏳ À venir |
| **Étage 2** | CKA (Certified Kubernetes Administrator) | ⏳ À venir |

> La **porte d'entrée** de la maison renvoie au dépôt :
> https://github.com/nttsuong1302/learning-k8s.git

## 🧩 Mécanique d'interaction

1. La maison est affichée comme une **scène cliquable** (image / SVG / zones interactives).
2. Chaque **objet** est une zone cliquable associée à **une page de notions**.
3. Au clic → **popup type slide de présentation** contenant :
   - le **titre** de la notion,
   - les **points marquants** (bullet points),
   - éventuellement schéma / commande / exemple.
4. La popup se ferme et on revient à la maison (navigation fluide, sans rechargement).

## 📐 Principes de travail

- **Itératif** : on ne construit pas tout d'un coup. On suit les instructions de
  l'utilisateur, **étape par étape**, niveau par niveau, objet par objet.
- **On commence par le RDC = CloudNativePG.**
- Pour chaque page fournie par l'utilisateur :
  - extraire les **notions clés** sans rien retirer du fond,
  - les mapper à un **objet** de la maison,
  - produire la **slide** correspondante.
- **Langue du contenu** : français (sauf termes techniques K8s conservés en anglais).

## 🛠️ Pile technique

À confirmer avec l'utilisateur avant de coder. Proposition par défaut (simple,
sans backend, facile à héberger sur GitHub Pages) :

- **HTML + CSS + JavaScript** vanilla, ou un framework léger si demandé.
- Scène de la maison en **SVG** (zones cliquables précises + animation douce).
- Contenu des slides stocké en **données structurées** (ex. `data/*.json` ou JS)
  pour séparer le contenu de la présentation.

## 📁 Organisation suggérée

```
/
├── index.html              # La maison + le moteur de popups
├── assets/                 # Illustrations, SVG de la maison
├── css/
├── js/
└── data/
    └── cloudnativepg/      # Notions clés extraites, par objet/slide
```

## ✅ État d'avancement

- [x] Instructions du projet (ce fichier)
- [ ] RDC — CloudNativePG : scène + objets + slides
- [ ] Étage 1 — Infrastructure K8s
- [ ] Étage 2 — CKA
