# 🔐 Guide des Clés API - Chatbot Univers

## ✅ Status Actuel

Votre configuration est **COMPLÈTE ET OPÉRATIONNELLE** ✅

```
┌─────────────────────────────────────────────────────────┐
│ HF_API_TOKEN          ✅ CONFIGURÉE                    │
│ UNSPLASH_ACCESS_KEY   ✅ CONFIGURÉE                    │
│ NASA_API_KEY          ⭕ OPTIONNELLE (non configurée)  │
│ HF_MODEL              ✅ gpt2 (Par défaut)             │
│ PORT                  ✅ 3000                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Clés Actuelles

### 1️⃣ Hugging Face API Token
```
Token: ebgUTSPrQ5W200gZqDCSYIW2GbqRuUoIOcVSN2D3
Service: Intelligence Artificielle (Modèles de langage)
Modèles disponibles: gpt2, flan-t5, bart-large-cnn
Status: ✅ ACTIF
```

**Usage**:
- Réponses aux questions non-reconnues
- Modèle par défaut: `gpt2` (gratuit, rapide)

**Limites**:
- ~30,000 requêtes/jour gratuit
- Lenteur possible (5-30s par requête)

### 2️⃣ Unsplash API Key
```
Token: wy-WZxO2WqzirHGfWgwZw9wbYrjRWEE1BNjWWkQToj8
Service: Images Haute Qualité (HD)
Usage: Récupération d'images pour les réponses
Status: ✅ ACTIF
```

**Usage**:
- Images de planètes, univers, etc.
- Recherche par mots-clés
- Qualité: Excellente (HD)

**Limites**:
- 50 requêtes/heure gratuit
- 50,000 requêtes/mois

### 3️⃣ NASA API Key (Optionnel)
```
Service: NASA Imagery Library
Status: ⭕ NON CONFIGURÉE
```

**Avantages si configurée**:
- Images officielles NASA
- Très pertinentes scientifiquement
- Excellente qualité

**Comment ajouter** (si vous avez une clé):
```
1. Aller sur https://api.nasa.gov/
2. Générer une clé gratuite
3. Ajouter dans .env:
   NASA_API_KEY=votre_clé_ici
4. Redémarrer le serveur
```

---

## 🔍 Configuration Actuelle

### Fichier .env
```
# Configuration du Chatbot - IA INTELLIGENTE ACTIVÉE ✅

# Clé Hugging Face (IA Llama 2 - EXCELLENTE!)
HF_API_TOKEN=ebgUTSPrQ5W200gZqDCSYIW2GbqRuUoIOcVSN2D3

# Clé Unsplash (Images HD - MAGNIFIQUES!)
UNSPLASH_ACCESS_KEY=wy-WZxO2WqzirHGfWgwZw9wbYrjRWEE1BNjWWkQToj8

# Modèle IA (utilise un modèle stable et gratuit)
HF_MODEL=gpt2

# Port
PORT=3000

# Mode debug
DEBUG=true
```

---

## 📊 Priorités d'Images

### Ordre de Récupération
1. **Unsplash** (si clé fournie)
   - Images HD haute qualité
   - Grande variété
   - 1-5 secondes

2. **Wikimedia Commons** (toujours disponible)
   - Images scientifiques gratuites
   - Bien indexées
   - 2-8 secondes

3. **Fallback** (si aucune trouvée)
   - Placeholder générique
   - Instantané

---

## 🧪 Tester les Clés

### Script de Test
```bash
npm test:api
```

ou

```bash
node test-api-keys.js
```

### Résultats Attendus
```
✅ Hugging Face API: WORKING
✅ Unsplash API: WORKING  
⚠️  NASA API: NOT CONFIGURED
✅ Wikimedia: WORKING (fallback)
```

---

## 🚀 Modèles IA Disponibles

### Modèles Testés & Recommandés

#### 1. gpt2 (Par défaut) ⭐
```
HF_MODEL=gpt2
Vitesse: ⚡⚡⚡ Très rapide (5-10s)
Qualité: ⭐⭐ Basique mais correct
Coût: GRATUIT (gratuit, utilise crédits)
Recommandé: Pour questions simples
```

#### 2. google/flan-t5-base (Équilibré)
```
HF_MODEL=google/flan-t5-base
Vitesse: ⚡⚡ Moyen (10-20s)
Qualité: ⭐⭐⭐ Bon et cohérent
Coût: GRATUIT (utilise crédits)
Recommandé: Usage général
```

#### 3. facebook/bart-large-cnn (Excellent)
```
HF_MODEL=facebook/bart-large-cnn
Vitesse: ⚡ Lent (15-30s)
Qualité: ⭐⭐⭐⭐ Excellent, résumés
Coût: GRATUIT (utilise crédits)
Recommandé: Pour excellentes réponses
```

---

## 💰 Coûts & Limites

### Hugging Face (IA)
```
Plan: GRATUIT (utilisation limitée)
Limite: ~30,000 requêtes/jour
Dépassement: Compte temporairement limité
Réinitialisation: Quotidienne à minuit UTC
Coût additionnel: ~$0.0001 par requête si premium
```

### Unsplash (Images)
```
Limite gratuite: 50 requêtes/heure
Limite mensuelle: 50,000 requêtes
Dépassement: Requêtes rejetées (retour 429)
Coût: Gratuit, requiert attribution
```

### Wikimedia Commons
```
Limite: Illimitée
Temps: Parfois lent (2-8s)
Fiabilité: Excellente
Coût: 100% Gratuit
```

---

## ⚙️ Changer de Modèle IA

### Étape par Étape

1. **Ouvrir le fichier .env**
   ```
   C:\Users\aniss\lptf\projets\chatbotunivers\.env
   ```

2. **Changer la ligne**
   ```
   HF_MODEL=gpt2
   ↓
   HF_MODEL=google/flan-t5-base
   ```

3. **Sauvegarder** (CTRL+S)

4. **Redémarrer le serveur**
   ```bash
   Appuyer sur CTRL+C (arrêter ancien)
   node server-enhanced.js (démarrer nouveau)
   ```

5. **Tester** avec une question

---

## 🔑 Obtenir Nouvelles Clés (Si Besoin)

### Hugging Face API
**Lien**: https://huggingface.co/settings/tokens

1. Créer compte Hugging Face (gratuit)
2. Aller à Settings → Access Tokens
3. Créer nouveau token (Read)
4. Copier le token
5. Remplacer dans .env

### Unsplash API
**Lien**: https://unsplash.com/oauth/applications

1. Créer compte Unsplash (gratuit)
2. Créer nouvelle application
3. Accepter les termes
4. Copier "Access Key"
5. Remplacer dans .env

### NASA API
**Lien**: https://api.nasa.gov/

1. Remplir le formulaire
2. Vérifier votre email
3. Copier la clé
4. Ajouter dans .env: `NASA_API_KEY=...`

---

## 🆘 Troubleshooting Clés

### Problème: "Unauthorized"
```
Cause: Clé API incorrecte
Solution: 
  1. Vérifier .env a la bonne clé
  2. Copier-coller exactement
  3. Redémarrer serveur
```

### Problème: "Rate Limit Exceeded"
```
Cause: Trop de requêtes
Solution:
  1. Attendre quelques minutes
  2. Utiliser un modèle plus rapide (gpt2)
  3. Espacer les requêtes
```

### Problème: "No Images Found"
```
Cause: Clé Unsplash en limite ou inexacte
Solution:
  1. Vérifier clé dans .env
  2. Utiliser Wikimedia (fallback)
  3. Réessayer plus tard
```

### Problème: "Connection Timeout"
```
Cause: Serveur Hugging Face surchargé
Solution:
  1. Attendre quelques secondes
  2. Relancer la requête
  3. Essayer un modèle différent
```

---

## 📊 Monitoring

### Voir l'Utilisation Actuelle

#### Hugging Face
Allez sur: https://huggingface.co/settings/usage

Vous verrez:
- Requêtes du jour
- % d'utilisation
- Limite restante

#### Unsplash
Allez sur: https://unsplash.com/oauth/applications

Vous verrez:
- Requêtes du mois
- Limite restante (50,000)

---

## ✅ Checklist Configuration

- [x] HF_API_TOKEN configurée
- [x] UNSPLASH_ACCESS_KEY configurée
- [x] HF_MODEL défini (gpt2)
- [x] PORT défini (3000)
- [x] Fichier .env existant
- [x] Variables pas d'espaces parasites
- [x] Clés valides testées
- [x] Serveur peut démarrer
- [x] Images se chargent
- [x] IA répond aux questions

**Status Global: ✅ TOUT OK!**

---

## 🎯 Prochaines Étapes

1. **Tester le système**
   ```bash
   npm test
   ```

2. **Utiliser le chatbot**
   ```bash
   node server-enhanced.js
   # Ouvrir http://localhost:3000
   ```

3. **Si besoin de NASA**
   - Obtenir clé https://api.nasa.gov/
   - Ajouter dans .env
   - Redémarrer

4. **Si besoin de personnalisation**
   - Consulter README_COMPLET.md
   - Modifier server-enhanced.js
   - Ajouter nouveaux modèles

---

## 📞 Support

### Question Fréquente
**Q: Peut-on utiliser le système sans les clés?**
A: Oui! Wikimedia Commons fonctionne sans clé (fallback automatique)

### Question Fréquente
**Q: Les clés vont-elles expirer?**
A: Non, tant qu'elles ne sont pas révoquées, elles restent valides

### Question Fréquente
**Q: Peut-on avoir plusieurs clés?**
A: Oui, vous pouvez en générer d'autres sur les sites respectifs

### Question Fréquente
**Q: Quid de la sécurité?**
A: Les clés ne sont jamais exposées au frontend (seulement .env)

---

## 🌟 Recommandations

### Pour Production
1. ✅ Garder les clés actuelles (working)
2. ✅ Activer NASA API pour images premium
3. ✅ Monter au plan payant Unsplash si +50k images/mois
4. ✅ Monitorer l'utilisation régulièrement
5. ✅ Faire backup des clés quelque part

### Pour Développement
1. ✅ Utiliser les clés actuelles (gratuites)
2. ✅ Tester avec différents modèles
3. ✅ Vérifier les limites
4. ✅ Optimiser les requêtes

---

**Dernière mise à jour: Décembre 2024**
**Status: Toutes clés opérationnelles ✅**
