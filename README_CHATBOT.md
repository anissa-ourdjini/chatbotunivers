# 🤖 ChatBot Univers - Conversationnel et Multidomaine

Un chatbot intelligent et interactif capable de répondre à **TOUTES vos questions** sur l'astronomie, la vie, l'histoire, la géographie, la technologie et bien plus encore!

## ✨ Caractéristiques Principales

### 🎯 Capacités du Chatbot
- ✅ Répond à toute question sur **Mars et la vie** avec images pertinentes
- ✅ Explications détaillées sur les **8 planètes du système solaire**
- ✅ Informations sur les **concepts astronomiques** (galaxies, étoiles, trous noirs, etc.)
- ✅ Réponses sur **l'astronomie et l'univers**
- ✅ Discussions sur la **biologie et la vie**
- ✅ Informations historiques et géographiques
- ✅ Explications technologiques

### 📸 Images Automatiques
Chaque réponse est accompagnée d'une image pertinente:
- Récupération depuis **Wikimedia Commons** et **Unsplash**
- Sélection intelligente basée sur la question
- Fallback sur une base de données intégrée si nécessaire

### 🧠 Intelligence du Chatbot
- Algorithme de **similarité textuelle** (distance de Levenshtein)
- **60+ questions fréquentes** préenregistrées
- **10+ sujets généraux** avec explications complètes
- **60+ concepts astronomiques**
- Intégration avec l'**API Hugging Face** pour les questions avancées

### 🎨 Interface Utilisateur
- Design moderne et réactif
- Chat en temps réel
- Questions rapides prédéfinies
- Cartes visuelles des planètes
- Visualisation 3D de l'univers (bonus)
- Navigation par onglets

## 🚀 Démarrage Rapide

### 1. Installation
```bash
# Cloner le projet
git clone <votre-repo>
cd chatbotunivers

# Installer les dépendances
npm install
```

### 2. Configuration
Créez un fichier `.env` avec:
```env
HF_API_TOKEN=sk_xxxxxxxxxxxxxxxxxxxxxxxx
HF_MODEL=google/flan-t5-base
PORT=3000
UNSPLASH_ACCESS_KEY=votre_clé_unsplash (optionnel)
WIKI_USER_AGENT=chatbotunivers/1.0
```

### 3. Démarrer le serveur
```bash
npm start
```

Le chatbot sera accessible à: **http://localhost:3000**

## 📖 Documentation

- 📚 [Guide Complet des Fonctionnalités](./CHATBOT_FEATURES.md) - Tous les domaines couverts
- 💬 [Exemples d'Utilisation](./CHATBOT_EXAMPLES.md) - Cas d'usage pratiques
- 🔧 [Configuration Avancée](./CONFIG.md) - Personnalisation du système

## 🎓 Exemples de Questions

### Y a-t-il de la vie sur Mars?
```
Q: "Y a-t-il de la vie sur Mars?"
A: [Réponse détaillée avec image de Mars]
- Aucune vie intelligente détectée
- Mars a eu de l'eau par le passé
- Rovers cherchent des signatures de vie passée
- Conditions actuelles très hostiles
```

### Questions sur les Planètes
```
Q: "Parle-moi de Jupiter"
A: [Réponse avec image de Jupiter]
- Diamètre: 139,820 km
- Plus grande planète du système solaire
- Peut contenir 1,300 Terres
- 95 lunes connues
```

### Questions Générales
```
Q: "C'est quoi la biologie?"
A: [Réponse avec images scientifiques]
- Définition et branches
- Concepts clés (ADN, évolution, écosystèmes)
- Applications pratiques
```

## 🏗️ Architecture

```
Frontend (HTML/CSS/JS)
├── index.html (Interface utilisateur)
├── styles.css (Styles)
└── script.js (Logique du chatbot)

Backend (Node.js/Express)
├── server.js (Serveur principal)
└── API Endpoints:
    ├── POST /api/chat (Réponses du chatbot)
    └── GET /api/image (Images pertinentes)

Data
├── Planètes (8 entrées détaillées)
├── Concepts (10+ domaines)
├── Questions fréquentes (60+)
├── Sujets généraux (5+ domaines)
└── Mots-clés spécialisés (30+)
```

## 🔄 Flux de Traitement des Questions

1. **Réception** - Question de l'utilisateur
2. **Analyse** - Calcul de similarité textuelle
3. **Recherche** - Parcours de toutes les bases de données
4. **Sélection** - Meilleure correspondance trouvée
5. **Image** - Récupération d'une image pertinente
6. **Réponse** - Affichage du résultat avec image

## 🌐 Intégrations

- **Hugging Face Inference API** - Pour les questions avancées
- **Wikimedia Commons** - Source d'images scientifiques
- **Unsplash API** - Images de haute qualité (optionnel)

## 📊 Couverture du Contenu

| Domaine | Questions | Concepts | Statut |
|---------|-----------|----------|--------|
| Astronomie | 15+ | 10+ | ✅ Complet |
| Planètes | 20+ détails | 8 | ✅ Complet |
| Biologie | 10+ | 5+ | ✅ Complet |
| Histoire | 10+ | 6 civilisations | ✅ Complet |
| Géographie | 5+ | 7 continents | ✅ Complet |
| Technologie | 8+ | 8 domaines | ✅ Complet |

## 🎯 Cas d'Usage

### 👨‍🎓 Éducation
- Apprentissage de l'astronomie
- Étude de la vie et des sciences
- Révisions en histoire et géographie

### 🔬 Recherche
- Informations scientifiques rapides
- Clarifications sur les concepts
- Références et contexte

### 🎮 Divertissement
- Questions ludiques sur l'univers
- Exploration interactive de l'espace
- Découverte de faits surprenants

### 💼 Professionnel
- Formation et documentation
- Création de contenu
- Recherche d'informations

## 🚀 Améliorations Futures

- [ ] Support de vidéos explicatives
- [ ] Mode hors-ligne avec base de données locale
- [ ] Enregistrement de l'historique des conversations
- [ ] Recommandations d'apprentissage
- [ ] Support multilingue (anglais, espagnol, etc.)
- [ ] Intégration avec des APIs scientifiques (NASA, ESA, etc.)
- [ ] Quiz interactifs
- [ ] Forum de discussion communautaire

## 🐛 Dépannage

### Le chatbot ne répond pas
- Vérifiez la connexion internet
- Assurez-vous que HF_API_TOKEN est configuré
- Consultez les logs du serveur

### Les images ne s'affichent pas
- Vérifiez votre connexion
- Wikimedia Commons peut être temporairement indisponible
- Essayez une nouvelle question

### API Hugging Face refuse
- Vérifiez votre token
- Vérifiez les limites de l'API
- Le chatbot bascule sur la base locale

## 📝 Fichiers Importants

```
chatbotunivers/
├── index.html                    # Interface principale
├── script.js                     # Logique du chatbot (avec base de données)
├── styles.css                    # Styles CSS
├── server.js                     # Serveur Express
├── package.json                  # Dépendances npm
├── .env                          # Configuration (à créer)
├── CHATBOT_FEATURES.md           # Guide complet des fonctionnalités
├── CHATBOT_EXAMPLES.md           # Exemples d'utilisation
└── assets/                       # Images et ressources
```

## 📄 Licence

MIT License - Libre d'utilisation

## 👤 Auteur

Créé avec ❤️ pour l'exploration et l'apprentissage

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à:
1. Forker le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commiter vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pusher la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème:
- 📧 Email: support@chatbotunivers.dev
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Prêt à explorer l'univers?** Lancez le chatbot et posez vos questions! 🚀✨
