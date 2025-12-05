# 🔑 GUIDE COMPLET - UTILISER LES CLÉS API

## 📌 RÉSUMÉ RAPIDE

Votre chatbot a besoin des **clés API** pour **récupérer les images** automatiquement. Voici comment les configurer:

---

## 🚀 ÉTAPE 1: CRÉER LE FICHIER .env

### Sur Windows (PowerShell):
```powershell
# Créer le fichier
notepad .env
```

### Sur Mac/Linux:
```bash
nano .env
```

### Copier-coller CECI:
```env
# NASA API (gratuit - https://api.nasa.gov)
NASA_API_KEY=sk_xxxxxxxxxxxxxx

# Unsplash (optionnel - https://unsplash.com/developers)
UNSPLASH_ACCESS_KEY=sk_xxxxxxxxxxxxxx

# Hugging Face (optionnel - https://huggingface.co/settings/tokens)
HF_API_TOKEN=sk_xxxxxxxxxxxxxx

# Configuration
PORT=3000
NODE_ENV=development
```

Sauvegarder: **Ctrl+S** ou **Cmd+S**

---

## 🔑 ÉTAPE 2: OBTENIR LES CLÉS API

### 🚀 NASA API (ESSENTIEL)

**Le plus important!** C'est l'API officielle de la NASA.

1. Aller sur: **https://api.nasa.gov**
2. Remplir le formulaire:
   ```
   First Name: Votre prénom
   Last Name: Votre nom
   Email: votre@email.com
   Application Name: ChatBot Univers
   ```
3. Cliquer **"Générer une clé"**
4. Copier la clé générée
5. Coller dans `.env`:
   ```env
   NASA_API_KEY=sk_abcd1234efgh5678ijkl9012mnop3456
   ```

**Capacités:**
- ✅ 30,000 requêtes/jour (illimité pratiquement!)
- ✅ Images NASA officielles
- ✅ Photo du jour (APOD)
- ✅ Données Mars Rover
- ✅ Gratuit à vie

---

### 🎨 Unsplash API (OPTIONNEL)

Pour avoir **plus d'images** si NASA ne suffit pas.

1. Aller sur: **https://unsplash.com/developers**
2. Cliquer **"Create an application"**
3. Accepter les conditions
4. Remplir:
   ```
   Application name: ChatBot Univers
   Description: Chatbot d'astronomie
   ```
5. Cliquer **"Create application"**
6. Voir **"Access Keys"** section
7. Copier **Access Key**
8. Coller dans `.env`:
   ```env
   UNSPLASH_ACCESS_KEY=sk_photo_abcd1234efgh5678
   ```

**Capacités:**
- ✅ 50 requêtes/heure (gratuit)
- ✅ Images haute qualité
- ✅ Moteur de recherche excellent

---

### 🧠 Hugging Face (OPTIONNEL)

Pour des réponses IA plus intelligentes.

1. Aller sur: **https://huggingface.co**
2. Créer un compte (gratuit)
3. Aller sur: **https://huggingface.co/settings/tokens**
4. Cliquer **"New token"**
5. Nommer: `chatbot-univers`
6. Type: **"Read"**
7. Cliquer **"Create token"**
8. Copier le token
9. Coller dans `.env`:
   ```env
   HF_API_TOKEN=sk_hf_abcdefghijklmnopqrst
   ```

**Capacités:**
- ✅ Modèles IA (Google FLAN-T5)
- ✅ Réponses intelligentes
- ✅ Gratuit (limité)

---

## ✅ ÉTAPE 3: VÉRIFIER LES CLÉS

### Test des clés API:

```bash
# Tester si les clés fonctionnent
npm install
node test-api-keys.js
```

**Vous devriez voir:**
```
✅ NASA API APOD: OK
✅ NASA API Images: OK
✅ NASA Mars Rover: OK
✅ Wikipedia API: OK
⚠️ Unsplash API: Non configuré (optionnel)
⚠️ Hugging Face: Non configuré (optionnel)
```

---

## 🎯 ÉTAPE 4: LANCER LE SERVEUR

### Démarrer le serveur FINAL:

```bash
# Utiliser le nouveau serveur
del server.js
copy server-final.js server.js

# Windows PowerShell
npm start

# Mac/Linux
npm start
```

Attendre:
```
✅ Serveur lancé sur http://localhost:3000
```

---

## 📊 ÉTAPE 5: TESTER LE CHATBOT

### Ouvrir le navigateur:
```
http://localhost:3000
```

### Tester ces questions:

1. **"Mars"**
   ```
   Réponse: Description + 5 images NASA
   ```

2. **"Aurore boréale"**
   ```
   Réponse: Description + Images NASA/Unsplash
   ```

3. **"Y a-t-il de la vie sur Mars?"**
   ```
   Réponse: Complète + Images de Mars
   ```

4. **"Lune"**
   ```
   Réponse: Article Wikipedia + Images NASA
   ```

5. **"Trou noir"**
   ```
   Réponse: Explication + Images scientifiques
   ```

---

## 🔍 VÉRIFIER QUE LES IMAGES VIENNENT DES CLÉS API

### 1. Ouvrir la Console Navigateur (F12)
```
Console → Network → XHR
```

### 2. Poser une question
```
"Mars"
```

### 3. Vérifier les appels API
```
POST /api/chat

Console affichera:
🔍 Recherche NASA Images pour: "mars"
✅ 5 images NASA trouvées
```

### 4. Dans le Code Source (F12 → Elements)
```html
<!-- Images venant de NASA -->
<img src="https://images.nasa.gov/..." />

<!-- Images venant d'Unsplash -->
<img src="https://images.unsplash.com/..." />
```

---

## ⚙️ MODES DE FONCTIONNEMENT

### Mode 1: NASA SEUL (Recommandé)
```env
NASA_API_KEY=sk_xxxxx
```
- ✅ Images NASA officielles
- ✅ 30,000 requêtes/jour
- ✅ Parfait pour l'astronomie
- ⚠️ Peut être limité si trop de questions

### Mode 2: NASA + Unsplash (Optimal)
```env
NASA_API_KEY=sk_xxxxx
UNSPLASH_ACCESS_KEY=sk_xxxxx
```
- ✅ Images NASA + alternatives
- ✅ Meilleure couverture
- ✅ Ne jamais être à court d'images
- ✅ RECOMMANDÉ

### Mode 3: Tout Activé (Puissant)
```env
NASA_API_KEY=sk_xxxxx
UNSPLASH_ACCESS_KEY=sk_xxxxx
HF_API_TOKEN=sk_xxxxx
```
- ✅ Images NASA
- ✅ Images Unsplash
- ✅ IA Hugging Face
- ✅ Réponses intelligentes
- ✅ MEILLEUR

---

## 🆘 TROUBLESHOOTING

### ❌ "Module not found"
```bash
npm install
```

### ❌ "NASA API: ERREUR 401"
```
La clé API est mauvaise ou invalide
1. Vérifier .env existe
2. Vérifier que la clé est correcte
3. Vérifier qu'il n'y a pas d'espaces
4. Redémarrer: npm start
```

### ❌ "Pas d'images dans le chatbot"
```
1. Ouvrir Console (F12)
2. Vérifier que la NASA API est testée avec:
   node test-api-keys.js
3. Relancer le serveur:
   npm start
```

### ❌ "Port 3000 déjà utilisé"
```bash
# Changer le port dans .env
PORT=3001

# Puis relancer
npm start
```

### ❌ "Réponses lentes"
```
Normal! Les appels API NASA prennent:
- 1ère réponse: 2-5 secondes
- Après: Plus rapide (cache)

Patience! ⏳
```

---

## 📊 ENDPOINTS API DISPONIBLES

### Avec les clés API configurées:

```bash
# Chat principal (utilise NASA)
POST /api/chat
Params: { message: "Mars" }
Returns: { response, images[] }

# Images NASA
GET /api/nasa/images/mars
Returns: { query, count, images[] }

# Photo du jour NASA
GET /api/nasa-apod
Returns: { title, explanation, image, date }

# Mars Rover en direct
GET /api/mars-rover
Returns: { rover, camera, date, image }

# Articles Wikipedia
GET /api/wiki/mars
Returns: { title, extract, image, url }

# Vérifier les clés
GET /api/status
Returns: { nasa: {...}, unsplash: {...}, ... }
```

---

## 🎯 EXEMPLE COMPLET

### Fichier .env final:
```env
NASA_API_KEY=sk_demo_key_1234567890
UNSPLASH_ACCESS_KEY=sk_photo_abcd1234efgh5678
HF_API_TOKEN=sk_hf_abcdefghijklmnopqrst
PORT=3000
NODE_ENV=development
```

### Lancer:
```bash
npm start
```

### Résultat:
```
✅ Serveur lancé sur http://localhost:3000
🚀 NASA API: ✅ Configurée
🎨 Unsplash: ✅ Configurée
🧠 Hugging Face: ✅ Configuré
```

### Utiliser:
```
Question: "Mars"

Réponse: 
📖 Mars est la 4ème planète...

🖼️ Images (via NASA API):
1. NASA Perseverance Rover
2. NASA Mars Landscape
3. NASA Dust Storm
4. [Unsplash fallback]
5. [Unsplash fallback]
```

---

## ✨ RÉSUMÉ

```
✅ Créer .env
✅ Ajouter NASA_API_KEY
✅ Optionnel: Unsplash + HF
✅ Tester: node test-api-keys.js
✅ Lancer: npm start
✅ Utiliser: http://localhost:3000
✅ Les images viennent des APIs!
```

---

## 🌟 PROCHAINES ÉTAPES

1. Créer `.env`
2. Obtenir clés API
3. Configurer .env
4. Tester les clés: `node test-api-keys.js`
5. Remplacer serveur: `copy server-final.js server.js`
6. Lancer: `npm start`
7. Poser des questions!

**Le chatbot récupérera AUTOMATIQUEMENT les images avec vos clés API!** 🚀

---

Date: 2024-12-05
Version: API Keys Complete Guide v1
État: ✅ Production Ready
