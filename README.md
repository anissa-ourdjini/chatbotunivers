# Chatbot Univers — Backend local (Hugging Face)

Ce petit backend permet de proxyfier les requêtes du front-end vers l'API Hugging Face Inference.

Prérequis
- Node.js (16+ recommandé)
- NPM ou Yarn
- Un token Hugging Face (gratuit, créer un compte sur https://huggingface.co)

Installation

1. Copier `.env.example` en `.env` et renseigner `HF_API_TOKEN`.

2. Installer les dépendances depuis PowerShell:

```powershell
cd 'C:\Users\aniss\lptf\projets\chatbotunivers'
npm install
```

3. Lancer le serveur:

```powershell
npm start
# ou pour développement avec rechargement automatique
npm run dev
```

Utilisation
- Le front-end doit appeler `POST /api/chat` avec un JSON `{ "message": "Votre question" }`.
- Le serveur renverra `{ "reply": "texte généré" }`.

Sécurité
- Ne mettez jamais votre token dans le code client (navigateur). Utilisez ce backend pour garder la clé secrète.

Modèle
- Le modèle par défaut est `google/flan-t5-base`. Vous pouvez changer `HF_MODEL` dans `.env` vers un autre modèle disponible.

Images (optionnel)
- Le serveur peut utiliser l'API Unsplash pour obtenir des photos haute qualité et esthétiques. C'est gratuit mais nécessite une clé d'accès (Créez un compte développeur sur https://unsplash.com/developers et copiez la clé dans `.env` sous `UNSPLASH_ACCESS_KEY`).
- Si `UNSPLASH_ACCESS_KEY` n'est pas fourni, le serveur utilise Wikimedia Commons / Wikipedia pour chercher des images gratuites.

Images locales (option avancée)
- Vous pouvez utiliser localement un jeu d'images (par ex. clone du dépôt `https://github.com/unsplash/datasets.git`) et placer les images dans le dossier du projet `unsplash_images/`.
- Le serveur tentera d'abord de trouver une image dans `unsplash_images/` correspondant à la requête (par nom de fichier). Si aucune image locale n'est trouvée, il essaiera Unsplash puis Wikimedia/Wikipedia.

Exemple de commandes pour préparer les images localement (PowerShell) :

```powershell
# cloner le dépôt (attention : très volumineux si vous clonez tout)
git clone https://github.com/unsplash/datasets.git

# Le dépôt contient des datasets/métadonnées; il ne contient pas toujours les images elles-mêmes.
# Si vous avez un dossier d'images (ou un sous-ensemble), copiez-les dans le projet :
mkdir unsplash_images
Copy-Item -Path 'chemin\vers\vos_images\*' -Destination '.\unsplash_images' -Recurse

# Redémarrer le serveur pour prendre en compte le dossier local
npm start
```

Remarques:
- Le dépôt `unsplash/datasets` contient principalement des métadonnées et exemples; les images peuvent ne pas être toutes incluses dans le dépôt principal. Pour récupérer des images Unsplash en masse, suivez les règles de l'API Unsplash (et respectez la licence/attribution quand c'est demandé).
- Utiliser des images locales évite les appels API et la nécessité d'une clé.

# 🌌 Univers Explorer - Chatbot Astronomie Interactif

Un chatbot astronomique avancé avec **affichage d'images** pour toutes les réponses.

## ✨ Fonctionnalités

### 💬 Chatbot Intelligent
- **Reconnaissance flexible** : Reconnaît les questions avec des variantes et des fautes de frappe
- **Images automatiques** : Chaque réponse s'accompagne d'une image Unsplash correspondante
- **Réponses détaillées** : Informations complètes sur 8 planètes, concepts astronomiques, et phénomènes célestes
- **Questions rapides** : Boutons de raccourci pour poser des questions fréquentes

### 🎨 Visuels Interactifs
- **Système solaire animé** : Visualisation animée des orbites planétaires
- **Cartes détaillées** : Grille des 8 planètes avec informations détaillées
- **Visualisation galactique** : Représentation de la Voie Lactée

## 📖 Utilisation

### Pour poser une question
1. Tapez votre question dans le champ de saisie
2. Appuyez sur Entrée ou cliquez sur "Envoyer"
3. Le chatbot affichera une réponse avec une image correspondante

### Questions Supportées
- **Planètes** : Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune
- **Concepts** : Galaxies, étoiles, trous noirs, nébuleuses, comètes, astéroïdes
- **Phénomènes** : Éclipses, constellations, anneaux planétaires
- **Généralités** : Soleil, Lune, univers, Voie Lactée, système solaire

## 🚀 Améliorations Récentes

### Version avec Images
- ✅ Ajout d'images Unsplash pour toutes les réponses
- ✅ Algorithme de similarité (distance de Levenshtein) pour meilleure reconnaissance
- ✅ Retours d'information structurés (texte + image)
- ✅ Affichage amélioré avec CSS pour les images dans le chat

### Structure des Données
```javascript
// Chaque réponse contient :
{
    text: "Description textuelle",
    image: "URL de l'image"
}
```

## 🎯 Exemples de Questions

Vous pouvez poser des questions comme :
- "Parle-moi de Jupiter"
- "C'est quoi une galaxie?"
- "Comment fonctionne une étoile?"
- "Quelle est la plus grande planète?"
- "Explique-moi les trous noirs"
- "Qu'est-ce que la Voie Lactée?"
- "Parle-moi du Soleil"
- Et bien d'autres...

## 🔧 Technologie

- **Frontend** : HTML5, CSS3 (avec dégradés et animations), JavaScript ES6+
- **Images** : API Unsplash pour les images astronomiques
- **Design** : Thème dark space avec effets visuels
- **Responsive** : Fonctionne sur desktop et mobile

## 📁 Structure des Fichiers

```
chatbotunivers/
├── index.html      # Page principale
├── script.js       # Logique du chatbot (avec image management)
├── styles.css      # Styles et animations
└── README.md       # Documentation
```

## 🌟 Fonctionnalités du Chatbot

### Reconnaissance Intelligente
- Distance de Levenshtein pour comparer les questions
- Détection de mots-clés avec scoring
- Meilleure correspondance sélectionnée automatiquement

### Sources de Réponses
1. **Planètes** (8) - Informations détaillées + image
2. **Concepts** (10) - Définitions + image
3. **Questions Fréquentes** (8) - Réponses courtes + image
4. **Mots-clés génériques** (11) - Textes spécialisés + image
5. **Réponse par défaut** - Suggestions + image

## 💡 Points Forts

✅ Algorithme de matching robuste  
✅ Images pour chaque réponse  
✅ Base de connaissances riche  
✅ Interface intuitive et moderne  
✅ Questions rapides (boutons)  
✅ Responsive design  
✅ Visualisations interactives  

---

**Créé pour explorer l'univers de manière interactive et visuelle! 🚀🌌**
