# 🧪 Guide de Test - ChatBot Univers

## Avant de Commencer

1. Assurez-vous que le serveur est en cours d'exécution:
   ```bash
   npm start
   ```

2. Accédez à http://localhost:3000

3. Vous devriez voir l'interface du chatbot avec le titre "Univers Explorer"

## ✅ Tests Recommandés

### Test 1: Question Simple sur Mars
**Étapes:**
1. Tapez: `Y a-t-il de la vie sur Mars?`
2. Appuyez sur Entrée ou cliquez sur "Envoyer"

**Résultat attendu:**
- ✅ Réponse détaillée sur la vie sur Mars
- ✅ Image de Mars s'affiche
- ✅ Informations sur les rovers et les missions

---

### Test 2: Variante de la Même Question
**Étapes:**
1. Tapez: `Est-ce qu'il y a une vie martienne?`
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Le chatbot comprend la variation
- ✅ Réponse similaire au Test 1
- ✅ Image pertinente s'affiche

---

### Test 3: Question sur les Planètes
**Étapes:**
1. Tapez: `Parle-moi de Jupiter`
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Informations détaillées sur Jupiter
- ✅ Image de Jupiter s'affiche
- ✅ Données scientifiques affichées

---

### Test 4: Utilisation des Boutons Rapides
**Étapes:**
1. Cliquez sur le bouton "🪐 Planètes"

**Résultat attendu:**
- ✅ Question pré-remplie dans le champ
- ✅ Message envoyé automatiquement
- ✅ Réponse sur les planètes affichée

---

### Test 5: Sujets Généraux - Biologie
**Étapes:**
1. Tapez: `C'est quoi la biologie?`
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Explication complète de la biologie
- ✅ Image scientifique s'affiche
- ✅ Branches et concepts listés

---

### Test 6: Questions sur la Vie
**Étapes:**
1. Tapez: `Parle-moi de la vie`
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Définition et caractéristiques de la vie
- ✅ Image biologique s'affiche
- ✅ Origines et diversité expliquées

---

### Test 7: Sujets Généraux - Histoire
**Étapes:**
1. Tapez: `Histoire`
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Périodes historiques listées
- ✅ Civilisations majeures décrites
- ✅ Image historique s'affiche

---

### Test 8: Géographie
**Étapes:**
1. Tapez: `Géographie`
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Caractéristiques de la Terre
- ✅ Continents et océans
- ✅ Image du monde s'affiche

---

### Test 9: Technologie
**Étapes:**
1. Tapez: `Technologie`
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Domaines technologiques listés
- ✅ Révolutions technologiques expliquées
- ✅ Image tech s'affiche

---

### Test 10: Concept Astronomique
**Étapes:**
1. Tapez: `Qu'est-ce qu'un trou noir?`
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Explication détaillée
- ✅ Formation et caractéristiques
- ✅ Image pertinente s'affiche

---

### Test 11: Navigation 3D
**Étapes:**
1. Cliquez sur le bouton "🌌 Univers 3D Interactive"
2. Explorez l'univers 3D

**Résultat attendu:**
- ✅ Page 3D se charge
- ✅ Vous pouvez naviguer dans l'univers
- ✅ Les planètes sont visibles

---

## 🔍 Tests Avancés

### Test 12: Mauvaise Orthographe
**Étapes:**
1. Tapez: `Mar` (au lieu de "Mars")
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Le chatbot comprend malgré l'orthographe
- ✅ Réponse sur Mars s'affiche
- ✅ La similarité textuelle fonctionne

---

### Test 13: Question Très Vague
**Étapes:**
1. Tapez: `Parle-moi`
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Message d'aide affiche
- ✅ Suggestions de sujets
- ✅ Invitation à reformuler

---

### Test 14: Questions Multiples
**Étapes:**
1. Tapez: `Combien de lunes a Mars?`
2. Appuyez sur Entrée

**Résultat attendu:**
- ✅ Réponse: 2 lunes (Phobos et Déimos)
- ✅ Informations détaillées
- ✅ Image s'affiche

---

### Test 15: Variantes de Questions
**Étapes:**
Testez plusieurs variantes:
1. "Mars a-t-elle une vie?"
2. "Peut-on vivre sur Mars?"
3. "La vie existe-t-elle sur Mars?"
4. "Vie martienne"

**Résultat attendu:**
- ✅ Toutes les variantes sont comprises
- ✅ Réponses cohérentes
- ✅ Images pertinentes

---

## 📊 Tests de Performance

### Test 16: Temps de Réponse
**Étapes:**
1. Notez l'heure avant d'envoyer une question
2. Tapez: `Y a-t-il de la vie sur Mars?`
3. Notez l'heure de la réponse

**Résultat attendu:**
- ✅ Réponse en moins de 5 secondes
- ✅ Image s'affiche dans les 3 secondes
- ✅ Pas d'erreur JavaScript en console

---

### Test 17: Images Charger Correctement
**Étapes:**
1. Ouvrez la console (F12 > Console)
2. Posez plusieurs questions
3. Vérifiez qu'il n'y a pas d'erreurs 404

**Résultat attendu:**
- ✅ Aucune erreur image
- ✅ Toutes les images s'affichent
- ✅ Console propre

---

### Test 18: Chat Messages Scroll
**Étapes:**
1. Posez 10-15 questions
2. Vérifiez l'affichage du chat

**Résultat attendu:**
- ✅ Les messages scrollent correctement
- ✅ Les anciens messages restent visibles
- ✅ Les images restent affichées

---

## 🐛 Détection de Bugs

### Checklist de Bugs Potentiels
- [ ] Erreurs JavaScript en console
- [ ] Images cassées (erreurs 404)
- [ ] Texte non lisible
- [ ] Boutons non fonctionnels
- [ ] Chat qui ne scroll pas
- [ ] API ne répond pas

---

## ✨ Tests d'Expérience Utilisateur

### Test 19: Interface Intuitive
**Étapes:**
1. Un utilisateur non informé utilise le chatbot
2. Évaluation de la clarté de l'interface

**Critères d'évaluation:**
- ✅ Comprend où taper les questions
- ✅ Trouve les boutons rapides
- ✅ Peut naviguer vers la 3D
- ✅ Les réponses sont claires

---

### Test 20: Accessibilité
**Étapes:**
1. Testez avec un lecteur d'écran (si applicable)
2. Testez sur mobile
3. Testez avec zoom différents

**Résultat attendu:**
- ✅ Lisible sur mobile
- ✅ Responsive design
- ✅ Accessible au clavier

---

## 📋 Rapport de Test

### Template
```
Date: [DATE]
Testeur: [NOM]
Environnement: [NAVIGATEUR/OS]

Résumé des Résultats:
- Test 1: ✅ PASSÉ / ❌ ÉCHOUÉ
- Test 2: ✅ PASSÉ / ❌ ÉCHOUÉ
...

Bugs Trouvés:
- [Description du bug]
- Étapes pour reproduire
- Résultat attendu vs réel

Commentaires:
[Vos commentaires]
```

---

## 🎯 Points de Contrôle Essentiels

### ✅ Avant Déploiement
- [ ] Tous les tests passent
- [ ] Pas d'erreur JavaScript
- [ ] Images s'affichent correctement
- [ ] API fonctionne
- [ ] Mobile-friendly
- [ ] Temps de réponse acceptable

---

## 🚀 Test d'Intégration API

### Test 21: Intégration Hugging Face
**Étapes:**
1. Posez une question non-standard: "Explique quantum computing"
2. Vérifiez la réponse

**Résultat attendu:**
- ✅ API Hugging Face répond
- ✅ Réponse cohérente
- ✅ Fallback local si API échoue

---

### Test 22: Intégration Images
**Étapes:**
1. Posez une question: "Y a-t-il de la vie sur Mars?"
2. Vérifiez l'image chargée

**Résultat attendu:**
- ✅ Image de Unsplash ou Wikimedia
- ✅ Image pertinente
- ✅ Haute qualité

---

## 📞 Support des Tests

Si vous trouvez un bug:
1. Documentez-le avec le template
2. Fournissez des étapes exactes
3. Incluez des screenshots
4. Notez le navigateur/OS utilisé

---

**Merci de tester le ChatBot Univers!** 🎉
