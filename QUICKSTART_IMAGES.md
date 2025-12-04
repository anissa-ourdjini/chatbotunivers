# 🚀 Démarrage Rapide - Chatbot avec Images

## 30 secondes pour avoir une chatbot qui répond avec images!

### Étape 1: Installation
```bash
cd chatbotunivers
npm install
```

### Étape 2: Démarrage
```bash
npm start
```

Vous verrez:
```
Server listening on http://localhost:3000
```

### Étape 3: Ouvrir dans le navigateur
```
http://localhost:3000
```

## ✅ C'est Tout!

Votre chatbot fonctionne maintenant avec:
- 🖼️ **Images automatiques** avec chaque réponse
- 💬 **Questions illimitées** grâce à Wikipedia + Fallback
- 🎨 **Design moderne** avec animations

## 🧪 Tester

Posez ces questions:

1. **"Parle-moi de Jupiter"** → Image Wikipedia + Base locale
2. **"Qu'est-ce qu'un trou noir?"** → Image + Réponse
3. **"Combien de planètes?"** → Image + Réponse
4. **N'importe quelle autre question** → Image + Réponse de fallback

Chaque réponse affiche une **image illustrative** automatiquement! 📸

## ⚙️ Configuration Optionnelle (Amélioration)

Pour des réponses plus intelligentes, configurez Hugging Face:

### 1. Obtenez une clé Hugging Face (gratuit)
- Allez sur https://huggingface.co/
- Créez un compte
- Allez sur https://huggingface.co/settings/tokens
- Copiez votre token

### 2. Modifiez `.env`
```env
HF_API_TOKEN=hf_votre_token_ici
```

### 3. Redémarrez
```bash
npm start
```

Maintenant le chatbot peut répondre à **n'importe quelle question d'astronomie**! 🚀

## 🎨 Personnalisation

### Changer la couleur de l'arrière-plan
Modifiez `styles.css`:
```css
body {
    background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0d0520 100%);
    /* Changez les couleurs ici */
}
```

### Ajouter des questions rapides
Modifiez `index.html`:
```html
<button class="quick-btn" onclick="askQuestion('Ma question')">🚀 Ma question</button>
```

### Améliorer les images
Obtenez une clé Unsplash et ajoutez-la à `.env`:
```env
UNSPLASH_ACCESS_KEY=votre_cle_unsplash
```

## 🆘 Problèmes?

### "Cannot find module 'express'"
```bash
npm install
```

### "Server won't start"
```bash
# Vérifiez que le port 3000 est libre
# Ou changez le PORT dans .env
```

### "Pas d'images"
- Vérifiez votre connexion Internet
- Les images de Wikipedia devraient toujours fonctionner
- SVG généré est le dernier fallback

### "Réponses lentes"
- C'est normal sans clé Hugging Face
- Première requête avec HF peut prendre 30s
- Les suivantes sont plus rapides

## 📊 Architecture Complète

```
Utilisateur pose une question
          ↓
Frontend (script.js)
  └─ Envoie à /api/chat
          ↓
Backend (server.js)
  ├─ Wikipedia: contexte
  ├─ Hugging Face: réponse IA
  ├─ Wikimedia/Unsplash: image
  └─ SVG: fallback
          ↓
Frontend reçoit
  ├─ reply: "Jupiter est une..."
  ├─ image: {url: "...", source: "..."}
  └─ wikiTitle: "Jupiter"
          ↓
Affichage dans le chat
  [Image avec animation]
  [Crédit source]
  [Texte de réponse]
```

## 🎯 Points Clés

✅ **Sans configuration**: Fonctionne avec Wikipedia  
✅ **Avec HF_API_TOKEN**: Meilleure IA  
✅ **Avec UNSPLASH_KEY**: Meilleures images  
✅ **Fallbacks robustes**: Toujours une réponse  
✅ **Responsive**: Fonctionne sur mobile  
✅ **Production-ready**: Peut être déployé  

## 📚 Fichiers Importants

- `index.html` - Interface
- `script.js` - Logique frontend
- `styles.css` - Style
- `server.js` - API backend
- `.env` - Configuration

## 🔗 Ressources

- [Hugging Face API](https://huggingface.co/inference-api/pricing)
- [Unsplash API](https://unsplash.com/oauth/applications)
- [Wikipedia API](https://www.mediawiki.org/wiki/API)
- [Three.js (3D visualisation)](https://threejs.org/)

## 💡 Prochaines Améliorations

- [ ] Mémoriser les questions précédentes
- [ ] Partager les conversations
- [ ] Mode sombre/clair
- [ ] Traduction automatique
- [ ] Voice input/output
- [ ] Intégration avec Discord

---

**Besoin d'aide?** Vérifiez les logs avec `npm start` et regardez la console du navigateur (F12).

Bon développement! 🌌
