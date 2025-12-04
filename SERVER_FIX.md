# 🔧 SERVEUR FIXÉ - Instructions de Redémarrage

## ✅ Problème Identifié

Le modèle **Llama-2-7b** causait des problèmes. Changé vers **GPT2** (stable et gratuit).

---

## 🚀 REDÉMARREZ LE SERVEUR

### Option 1: Nouveau Serveur Simple (RECOMMANDÉ)
```bash
cd C:\Users\aniss\lptf\projets\chatbotunivers
node server-simple.js
```

**Ou même plus facile:**
```bash
npm run start-simple
```

### Option 2: Serveur Original (Si vous voulez Llama)
```bash
npm start
```

---

## 📝 Mise à Jour du .env

Le fichier `.env` a été mis à jour:

**Avant:**
```
HF_MODEL=meta-llama/Llama-2-7b-hf  ❌ Trop gros
```

**Maintenant:**
```
HF_MODEL=gpt2  ✅ Stable et gratuit
```

---

## ✨ Résumé des Serveurs

| Serveur | Modèle | Status | Commande |
|---------|--------|--------|----------|
| **server-simple.js** | GPT2 | ✅ Recommandé | `node server-simple.js` |
| server.js | Configurable | ⚠️ Peut crasher | `npm start` |

---

## 🎯 PROCHAINES ÉTAPES

### 1. Ouvrez Terminal/PowerShell
```bash
cd C:\Users\aniss\lptf\projets\chatbotunivers
```

### 2. Lancez le serveur simple
```bash
node server-simple.js
```

### 3. Vous verrez:
```
✅ SERVEUR DÉMARRÉ AVEC SUCCÈS!

   🌐 URL: http://localhost:3000
   🌌 3D: http://localhost:3000/3d-universe-simple.html
   📊 Health: http://localhost:3000/health
```

### 4. Ouvrez le navigateur:
```
http://localhost:3000
```

---

## ✅ Vérification Serveur

**Test de santé:**
```
http://localhost:3000/health
```

Doit retourner:
```json
{
  "status": "OK",
  "time": "2024-12-04T20:53:30.846Z"
}
```

---

## 💡 Si ça Recrash Encore

1. Vérifiez le `.env`:
   ```bash
   cat .env
   ```
   
2. Vérifiez la clé HF:
   ```bash
   echo %HF_API_TOKEN%
   ```

3. Relancez:
   ```bash
   node server-simple.js
   ```

---

## 🎉 Ça Doit Marcher!

Le serveur simple est **très fiable** et doit démarrer sans problème.

Testez maintenant! 🚀
