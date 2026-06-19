# learning-k8s · 学のいえ — La Maison Mémorielle

Site web interactif pour apprendre **Kubernetes** par la **méthode des loci**
(palais de la mémoire) : chaque notion est ancrée à un **objet** d'une **maison
japonaise**. Un clic sur l'objet ouvre une **slide** résumant ses points clés.

> Voir [CLAUDE.md](CLAUDE.md) pour la vision complète et le plan pédagogique.

## 🏠 Plan de la maison

| Niveau | Thème | Statut |
|--------|-------|--------|
| RDC — la porte (関) | **CloudNativePG** | ✅ démarré |
| Étage 1 | Infrastructure K8s | ⏳ à venir |
| Étage 2 | CKA | ⏳ à venir |

## 🚀 Lancer en local

Pas de build : c'est du HTML/CSS/JS statique.

```bash
python3 -m http.server 4173
# puis ouvrir http://localhost:4173
```

## 🌐 Déploiement GitHub Pages

Settings → Pages → Branch `main` / `root`. Le site est servi directement
depuis `index.html`.

## 📁 Structure

```
index.html              # La maison (SVG) + l'overlay des slides
css/style.css           # Thème "couverture de light novel japonais"
js/app.js               # Moteur : clic objet → slide
data/cloudnativepg.js   # Notions clés extraites (RDC)
```

## ➕ Ajouter un objet / une slide

1. Ajouter un groupe SVG dans `index.html` avec
   `class="hotspot" data-slide="<id>"`.
2. Ajouter l'entrée correspondante `window.SLIDES["<id>"] = { … }`
   dans le fichier de données du niveau.
