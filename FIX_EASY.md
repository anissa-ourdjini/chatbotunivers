# 🎯 SOLUTION FINALE - SIMPLE ET RAPIDE

## Le Problème:
Les clés ne sont pas chargées au démarrage du serveur.

## ✅ SOLUTION: Utilisez cette commande exacte

---

## 🚀 À FAIRE MAINTENANT:

### Dans votre PowerShell (Windows + X → PowerShell Admin):

**Copiez/collez TOUT d'un coup:**

```powershell
cd C:\Users\aniss\lptf\projets\chatbotunivers; $env:HF_API_TOKEN = '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'; $env:UNSPLASH_ACCESS_KEY = 'wy-WZxO2WqzirHGfWgwZw9wbYrjRWEE1BNjWWkQToj8'; $env:HF_MODEL = 'meta-llama/Llama-2-7b-hf'; npm start
```

**C'EST TOUT!** ✅

---

## ✨ Ce que vous verrez:

```
🤖 CHATBOT UNIVERS - Configuration
📋 Vérification de la configuration:
   HF_API_TOKEN: ✅ Présent
   UNSPLASH_KEY: ✅ Présent
   Modèle: meta-llama/Llama-2-7b-hf
   Port: 3000

🚀 Démarrage du serveur...
Server listening on http://localhost:3000
```

---

## 🧪 Testez immédiatement:

1. Ouvrez: **http://localhost:3000**
2. Posez: **"Explique la photosynthèse"**
3. Attendez 20-30 secondes (première requête)

---

## ✅ Vous verrez:

- ✅ **IMAGE** au-dessus (magnifique!)
- ✅ **RÉPONSE** très détaillée
- ✅ **SOURCE** visible (Unsplash)

**C'EST FINI!** 🎉

---

## 💡 Si ça ne marche pas:

### Alternative 1: Modifier package.json

Ouvrez `package.json` et changez:

```json
"start": "node server.js"
```

À:

```json
"start": "set HF_API_TOKEN=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 && set UNSPLASH_ACCESS_KEY=wy-WZxO2WqzirHGfWgwZw9wbYrjRWEE1BNjWWkQToj8 && set HF_MODEL=meta-llama/Llama-2-7b-hf && node server.js"
```

Puis: `npm start`

### Alternative 2: Créer .env.local

Dans **Notepad**, collez:

```
HF_API_TOKEN=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
UNSPLASH_ACCESS_KEY=wy-WZxO2WqzirHGfWgwZw9wbYrjRWEE1BNjWWkQToj8
HF_MODEL=meta-llama/Llama-2-7b-hf
PORT=3000
```

Sauvegardez comme `.env.local` dans le dossier chatbotunivers

Puis: `npm start`

---

## 🎯 LA COMMANDE MAGIQUE:

```powershell
cd C:\Users\aniss\lptf\projets\chatbotunivers; $env:HF_API_TOKEN = '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'; $env:UNSPLASH_ACCESS_KEY = 'wy-WZxO2WqzirHGfWgwZw9wbYrjRWEE1BNjWWkQToj8'; $env:HF_MODEL = 'meta-llama/Llama-2-7b-hf'; npm start
```

**Copiez/collez et testez!** 🚀
