# 🌌 Chatbot Univers - Guide de Démarrage Rapide

## 🚀 En 30 secondes

### 1. Démarrer le serveur
```bash
# Option A: Serveur amélioré (Recommandé) ⭐
node server-enhanced.js

# Option B: Avec launcher
node start-enhanced.js

# Option C: Serveur original
node server.js
```

### 2. Ouvrir dans le navigateur
```
http://localhost:3000
```

### 3. Poser vos questions!
- "Y a-t-il de la vie sur Mars?"
- "Parle-moi de la Lune"
- "Qu'est-ce que la Voie Lactée?"

## ✨ Nouvelles Fonctionnalités

### Questions Astronomiques Intelligentes
Le chatbot reconnaît automatiquement:
- 🔴 **Mars**: Vie, expéditions (Viking, Curiosity, Perseverance)
- 🌙 **Lune**: Apollo missions, formations
- ☀️ **Soleil**: Fusion nucléaire, cycles solaires
- 🌀 **Voie Lactée**: Structure galactique, trou noir central
- 🪐 **Planètes**: Tous les 8 planètes avec détails
- 🌌 **Univers**: Big Bang, expansion, composition

### Réponses Enrichies
Chaque réponse inclut:
- 📚 **Faits scientifiques** vérifiés
- 🚀 **Missions historiques** avec dates
- 🎨 **Images pertinentes** (Unsplash, Wikimedia)
- 🔬 **Détails complémentaires** spécialisés

## 📦 Pré-requis

### Déjà Configuré ✅
- **HF_API_TOKEN**: API Hugging Face (Intelligence Artificielle)
- **UNSPLASH_ACCESS_KEY**: Accès aux images HD

### Node.js (Vérifier)
```bash
node --version  # Doit être v12+
npm --version   # Doit être v6+
```

### Installer dépendances (si nécessaire)
```bash
npm install
```

## 🧪 Questions de Test

Essayez ces questions pour voir le système en action:

1. **"Y a-t-il de la vie sur Mars?"**
   - Réponse: Statut actuel + Expéditions de recherche
   
2. **"Parle-moi de la Lune"**
   - Réponse: Facts + Apollo missions
   
3. **"Qu'est-ce que la Voie Lactée?"**
   - Réponse: Structure + Nombre d'étoiles + Trou noir
   
4. **"Comment fonctionne le Soleil?"**
   - Réponse: Fusion nucléaire + Caractéristiques
   
5. **"Parle-moi de Jupiter"**
   - Réponse: Grande Tache Rouge + Lunes + Propriétés

## 📊 Structure Serveur

```
Port 3000
├── GET  / → Interface web (index.html)
├── POST /api/chat → Réponses intelligentes
│   ├── Extraction de sujet
│   ├── Base de données astronomique
│   └── Fallback IA généraliste
└── GET  /api/image → Images (Unsplash + Wikimedia)
```

## 🔧 Personnalisation

### Changer le Modèle IA
Modifier `.env`:
```
HF_MODEL=facebook/bart-large-cnn
```

Modèles recommandés:
- `gpt2` (Rapide) ⚡
- `google/flan-t5-base` (Équilibré) ⚖️
- `facebook/bart-large-cnn` (Excellentes résumés) ⭐

### Changer le Port
```
PORT=3001
```

## 🛠️ Troubleshooting

### "Cannot find module 'express'"
```bash
npm install express axios cors dotenv
```

### "Port 3000 already in use"
```bash
# Tuer le processus
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

### "API Key not working"
- Vérifier `.env` a les bonnes clés
- Vérifier les clés ne sont pas expirées
- Relancer le serveur après modification

## 📱 Fonctionnalités UI

### Onglets de Visualisation
- **Système Solaire**: Vue 3D interactive
- **Planètes**: Cartes détaillées
- **Univers**: Historique et galaxies

### Boutons Rapides
- 🪐 Planètes
- 🌀 Galaxies
- ⭐ Étoiles
- 🌙 Lune
- 🔴 Mars & Vie
- 🌌 Voie Lactée

## 🎯 Prochaines Étapes

1. ✅ Le serveur est lancé
2. ✅ L'interface est ouverte
3. 📝 Posez vos questions!
4. 🎨 Admirez les images
5. 🔬 Apprenez l'astronomie!

## 📞 Support

### Si ça ne fonctionne pas:
1. Vérifier que le serveur est lancé (vous devez voir "✅ Chatbot Univers running")
2. Vérifier le port (par défaut 3000)
3. Vérifier les clés API dans `.env`
4. Essayer de rafraîchir la page (F5)

### Logs du serveur
```bash
# Quand le serveur démarre, vous devez voir:
✅ Chatbot Univers running on http://localhost:3000
🎨 Unsplash API: Configured
🤖 AI Model: gpt2
```

---

## 📚 Ressources Supplémentaires

- Voir `ENHANCED_CHATBOT_SUMMARY.md` pour plus de détails
- Voir `ASTRONOMICAL_KNOWLEDGE.md` pour la base de données
- Voir `API_KEYS_GUIDE.md` pour configurer des clés

---

**Bonne exploration de l'univers! 🌌**
