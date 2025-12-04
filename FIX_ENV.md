# 🔧 CONFIGURATION MANUELLE - Windows PowerShell

## Le problème:
Le fichier `.env` a été sécurisé. Les clés ont été supprimées.

## ✅ Solution: Configurer manuellement en PowerShell

---

## 📋 ÉTAPE 1: Ouvrir PowerShell

1. Appuyez sur: **Windows + X**
2. Sélectionnez: **Windows PowerShell (Admin)**
3. Validez (Yes si demandé)

---

## 📝 ÉTAPE 2: Aller au dossier du projet

```powershell
cd C:\Users\aniss\lptf\projets\chatbotunivers
```

---

## 🔑 ÉTAPE 3: Configurer les clés (Copiez/Collez)

### Clé 1: Hugging Face
```powershell
$env:HF_API_TOKEN = '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'
```

Appuyez sur **Entrée**

### Clé 2: Unsplash
```powershell
$env:UNSPLASH_ACCESS_KEY = 'wy-WZxO2WqzirHGfWgwZw9wbYrjRWEE1BNjWWkQToj8'
```

Appuyez sur **Entrée**

### Modèle IA
```powershell
$env:HF_MODEL = 'meta-llama/Llama-2-7b-hf'
```

Appuyez sur **Entrée**

---

## 🚀 ÉTAPE 4: Lancer le serveur

```powershell
npm start
```

Vous verrez:
```
Server listening on http://localhost:3000
```

---

## ✅ ÉTAPE 5: Tester

1. Ouvrez: **http://localhost:3000**
2. Posez une question: **"Parle-moi de la photosynthèse"**
3. Attendez 20-30 secondes (première requête)

---

## ✨ Résultat Attendu:

- ✅ IMAGE pertinente s'affiche
- ✅ RÉPONSE longue et détaillée
- ✅ SOURCE visible (Unsplash)

---

## 💾 Alternative: Créer fichier .env.local

Si PowerShell pose problème, créez un fichier `.env.local`:

1. Ouvrez **Notepad**
2. Collez ceci:
```
HF_API_TOKEN=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
UNSPLASH_ACCESS_KEY=wy-WZxO2WqzirHGfWgwZw9wbYrjRWEE1BNjWWkQToj8
HF_MODEL=meta-llama/Llama-2-7b-hf
PORT=3000
DEBUG=true
```

3. **File → Save As**
4. Nom: `.env.local`
5. Dossier: `C:\Users\aniss\lptf\projets\chatbotunivers`
6. Format: **All Files**
7. **Save**

Puis lancez: `npm start`

---

## 🎯 Utilisez UNE des méthodes ci-dessus, puis testez!

Dites-moi quel message d'erreur vous voyez exactement! 👈
