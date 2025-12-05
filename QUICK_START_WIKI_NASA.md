# 🚀 ACTIVATION RAPIDE - Wiki + NASA

## ⚡ 5 MINUTES POUR DÉMARRER

### Étape 1: Clé NASA (2 min)

```
1. Aller sur: https://api.nasa.gov
2. Remplir formulaire (email, nom)
3. Cliquer "Générer la clé"
4. Copier la clé (arrivera par email aussi)
```

**Exemple de clé:**
```
sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Étape 2: Créer le fichier .env (1 min)

```bash
# Windows
notepad .env

# Mac/Linux
nano .env
```

Coller ceci:
```env
NASA_API_KEY=votre_clé_nasa_ici
PORT=3000
```

Sauvegarder (Ctrl+S ou Cmd+S).

### Étape 3: Remplacer le serveur (1 min)

```bash
# Windows (PowerShell)
del server.js
copy server-wiki-nasa.js server.js

# Mac/Linux
rm server.js
cp server-wiki-nasa.js server.js
```

### Étape 4: Lancer (1 min)

```bash
npm install
npm start
```

Attendre le message:
```
✅ Serveur Expert Astronomie lancé sur http://localhost:3000
```

### Étape 5: Tester

Ouvrir: **http://localhost:3000**

Poser une question:
```
"Parlez-moi de Mars"
```

---

## ✅ C'EST PRÊT!

Vous avez maintenant:
- ✅ Base de données locale (25 catégories)
- ✅ Wikipedia intégré
- ✅ NASA officiel en temps réel
- ✅ Images magnifiques
- ✅ Zéro erreur

---

## 🎯 QUESTIONS À TESTER

```
1. "Mars" → Image NASA + Wikipedia
2. "Aurore boréale" → Image spectaculaire
3. "Lune" → Article Wikipedia complet
4. "Trou noir" → Explication + images
5. "Photo du jour" → APOD NASA
```

---

## 🔧 CONFIGURATION OPTIONNELLE (Avancé)

### Ajouter Hugging Face (IA)
```bash
# 1. Aller sur: https://huggingface.co/settings/tokens
# 2. Créer un token "Read"
# 3. Ajouter à .env:

HF_API_TOKEN=sk_xxxxx
```

### Ajouter Unsplash (Plus d'images)
```bash
# 1. Aller sur: https://unsplash.com/developers
# 2. Créer une application
# 3. Copier Access Key
# 4. Ajouter à .env:

UNSPLASH_ACCESS_KEY=sk_xxxxx
```

---

## 📊 MODE (Avec quoi demarre?)

```
NASA_API_KEY = DEMO_KEY (ou vide)
→ Mode DEMO: 1000 requêtes/jour

NASA_API_KEY = Votre clé
→ Mode COMPLET: 30,000 requêtes/jour

+ HF_API_TOKEN
→ Ajoute l'IA pour questions complexes

+ UNSPLASH_ACCESS_KEY
→ Ajoute plus d'images
```

---

## ✨ RÉSULTAT FINAL

```
Question: "Parlez-moi de Mars"

Réponse:
📖 Base locale:
Mars est la 4ème planète, la planète rouge...

📚 Wikipedia:
Mars est la quatrième planète du Système solaire...

🚀 Images NASA:
1. Perseverance Rover
2. Mars Dust Storm
3. Valles Marineris

🖼️ Image: Photo officielle NASA de Mars
```

---

## 🆘 TROUBLESHOOTING

### "Module not found"
```bash
npm install
```

### "NASA API error"
```
Vérifier que NASA_API_KEY est dans .env
```

### "Port 3000 déjà utilisé"
```bash
PORT=3001 npm start
```

### "Pas de réponse"
```
Attendre 5 secondes (Wikipedia + NASA sont lents la 1ère fois)
```

---

Date: 2024-12-05
Version: Quick Start v1
