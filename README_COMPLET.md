# 🌌 Chatbot Univers - Système Complet

> Une application de chatbot astronomique intelligente avec base de connaissances complète, récupération d'images dynamique et visualisation 3D interactive.

## ✨ Caractéristiques Principales

### 🎯 Intelligence Astronomique
- ✅ Reconnaissance automatique de 11+ sujets astronomiques
- ✅ Base de données scientifique vérifiée
- ✅ Réponses enrichies avec faits et expéditions historiques
- ✅ Fallback IA intelligente pour questions générales

### 🖼️ Gestion d'Images Dynamique
- ✅ Unsplash (images HD haute qualité)
- ✅ Wikimedia Commons (images scientifiques gratuites)
- ✅ Fallback automatique
- ✅ Images pertinentes au contexte

### 🌌 Visualisations Interactives
- ✅ Système Solaire 3D
- ✅ Grille de planètes détaillées
- ✅ Voie Lactée 3D interactive
- ✅ Univers Explorer

### 🚀 API Complète
- ✅ `/api/chat` - Réponses intelligentes
- ✅ `/api/image` - Récupération d'images
- ✅ Web statique - Interface utilisateur

## 🚀 Démarrage Rapide

### 1. Installation
```bash
cd chatbotunivers
npm install
```

### 2. Configuration
Le fichier `.env` est déjà configuré avec:
- ✅ Hugging Face API Token
- ✅ Unsplash API Key
- ✅ Modèle par défaut: `gpt2`

### 3. Lancer le Serveur
```bash
# Méthode 1: Serveur amélioré (Recommandé)
node server-enhanced.js

# Méthode 2: Avec launcher automatique
node start-enhanced.js

# Méthode 3: Serveur original
node server.js
```

### 4. Ouvrir dans le Navigateur
```
http://localhost:3000
```

## 📚 Documentation Complète

| Document | Contenu |
|----------|---------|
| `QUICKSTART_ENHANCED.md` | Guide de démarrage en 30 secondes |
| `ASTRONOMICAL_KNOWLEDGE.md` | Base de données astronomique complète |
| `ENHANCED_CHATBOT_SUMMARY.md` | Résumé des améliorations |
| `README.md` | Documentation originale |

## 🎯 Exemples de Questions

### Mars & Vie Extraterrestre
```
"Y a-t-il de la vie sur Mars?"
→ Réponse: Status + Expéditions (Viking, Curiosity, Perseverance)
```

### Exploration Lunaire
```
"Parle-moi de la Lune"
→ Réponse: Faits + Apollo missions + Caractéristiques
```

### Galaxies
```
"Qu'est-ce que la Voie Lactée?"
→ Réponse: Structure + Nombre d'étoiles + Trou noir central
```

### Planètes
```
"Parle-moi de Jupiter"
→ Réponse: Grande Tache Rouge + Lunes + Propriétés
```

### Questions Générales
```
"Comment se forment les étoiles?"
→ Réponse: Utilise le modèle IA + Images pertinentes
```

## 📊 Architecture

```
chatbotunivers/
├── index.html              (Interface principale)
├── styles.css              (Styles CSS)
├── script.js               (Frontend JavaScript)
├── server-enhanced.js      (✨ Serveur amélioré)
├── server.js               (Serveur original)
├── .env                    (Configuration)
├── package.json            (Dépendances)
└── Documentation/
    ├── QUICKSTART_ENHANCED.md
    ├── ASTRONOMICAL_KNOWLEDGE.md
    ├── ENHANCED_CHATBOT_SUMMARY.md
    └── README_COMPLET.md
```

## 🔧 Configuration Avancée

### Changer le Modèle IA
Dans `.env`:
```
HF_MODEL=facebook/bart-large-cnn
```

Modèles recommandés:
- `gpt2` (Rapide, ~5s)
- `google/flan-t5-base` (Équilibré, ~10s)
- `facebook/bart-large-cnn` (Excellentes résumés, ~15s)

### Changer le Port
```
PORT=3001
```

### Activer Debug
```
DEBUG=true
```

## 🧪 Tests

### Test Complet
```bash
# Terminal 1
node server-enhanced.js

# Terminal 2
node test-comprehensive.js
```

### Test Simple
```bash
node test-enhanced-server.js
```

## 📡 Points Terminaux API

### Chat
```bash
POST /api/chat
Content-Type: application/json

{
  "message": "Y a-t-il de la vie sur Mars?"
}

# Réponse
{
  "reply": "...",
  "facts": [...],
  "expeditions": [...]
}
```

### Images
```bash
GET /api/image?q=Mars

# Réponse
{
  "url": "https://...",
  "source": "Unsplash|Wikimedia|..."
}
```

## 🌟 Sujets Astronomiques Supportés

| Sujet | Mots-clés | Données |
|-------|-----------|---------|
| Mars | mars, planète rouge, vie | Faits + 6 expéditions |
| Lune | lune, lunar, apollo | Faits + 3 expéditions |
| Soleil | soleil, sol, sun | 8 faits clés |
| Vénus | vénus, venus | 7 faits clés |
| Terre | terre, earth | 8 faits clés |
| Mercure | mercure | 6 faits clés |
| Jupiter | jupiter | 8 faits clés |
| Saturne | saturne, anneaux | 7 faits clés |
| Uranus | uranus | 6 faits clés |
| Neptune | neptune | 5 faits clés |
| Voie Lactée | galaxie, milky way | 7 faits clés |
| Univers | big bang, cosmique | 8 faits clés |

## 🎨 Interface Utilisateur

### Sections Principales
1. **Assistant Astronomie** - Chat interactif
2. **Cartes de l'Univers** - 3 onglets:
   - Système Solaire 3D
   - Planètes Détaillées
   - Univers & Galaxies

### Boutons Rapides
- 🪐 Planètes
- 🌀 Galaxies
- ⭐ Étoiles
- 🌙 Lune
- 🔴 Mars & Vie
- 🌌 Voie Lactée

## 🔐 Sécurité

- ✅ Clés API stockées dans `.env` (ignoré par Git)
- ✅ Pas de données sensibles dans le frontend
- ✅ CORS configuré pour localhost
- ✅ Validation des entrées

## 📊 Performance

| Aspect | Temps |
|--------|-------|
| Reconnaissance sujet | <100ms |
| Réponse IA | 5-30s (dépend du modèle) |
| Images Unsplash | 1-5s |
| Images Wikimedia | 2-8s |

## 🐛 Troubleshooting

### "Port 3000 already in use"
```bash
# Tuer le processus Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "API Token not working"
- Vérifier le token dans `.env`
- Vérifier la connexion internet
- Vérifier le rate limit Hugging Face

### "Images non affichées"
- Vérifier les clés Unsplash/Wikimedia
- Vérifier la connexion internet
- Essayer avec un autre sujet

## 📚 Technologies Utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Axios** - Client HTTP
- **dotenv** - Gestion configuration

### Frontend
- **HTML5** - Structure
- **CSS3** - Styles modernes
- **JavaScript ES6+** - Logique
- **Three.js** - Visualisations 3D

### APIs Externes
- **Hugging Face** - Modèles IA
- **Unsplash** - Images HD
- **Wikimedia Commons** - Images scientifiques

## 🚀 Déploiement

### Déploiement Local
```bash
npm install
node server-enhanced.js
```

### Déploiement Heroku
```bash
heroku create votre-app-name
git push heroku main
heroku config:set HF_API_TOKEN=votre_token
heroku config:set UNSPLASH_ACCESS_KEY=votre_key
```

### Déploiement Docker
```bash
docker build -t chatbot-univers .
docker run -p 3000:3000 chatbot-univers
```

## 📝 Licence

Projet éducatif - Libre d'utilisation

## 👨‍💻 Support

Pour des questions ou problèmes:
1. Vérifiez la documentation
2. Consultez les exemples de test
3. Vérifiez les logs du serveur

## 🌟 Prochaines Améliorations

- [ ] Support multi-langues
- [ ] Cache des réponses
- [ ] Historique conversations
- [ ] Rating des réponses
- [ ] API NASA Imagery
- [ ] Authentification utilisateur
- [ ] Persistance des données

---

**Explorez l'univers avec intelligence! 🌌**

*Dernière mise à jour: Décembre 2024*
