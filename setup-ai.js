#!/usr/bin/env node

/**
 * Setup AI - Script d'installation automatique
 * Configure l'IA en 3 étapes simples
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.clear();
console.log(`
╔════════════════════════════════════════════════════╗
║                                                    ║
║   🤖 SETUP IA - Configuration Automatique         ║
║                                                    ║
║   Configurer l'IA en 3 étapes (15 minutes)       ║
║                                                    ║
╚════════════════════════════════════════════════════╝
`);

console.log(`\n✨ Ce script va vous guider pour:
  1️⃣  Entrer votre clé Hugging Face
  2️⃣  Entrer votre clé Unsplash
  3️⃣  Configurer le fichier .env
  4️⃣  Redémarrer le serveur\n`);

const envPath = path.join(__dirname, '.env');

// Fonction pour poser une question
function ask(question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

async function main() {
  try {
    console.log(`\n📝 ÉTAPE 1: Clé Hugging Face`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`\n📌 Comment obtenir votre clé Hugging Face:
  1. Allez sur: https://huggingface.co/
  2. Créez un compte (email + password)
  3. Allez sur: https://huggingface.co/settings/tokens
  4. Cliquez "New token"
  5. COPIEZ le token (commence par hf_)
  
Exemple: hf_AbCdEfGhIjKlMnOpQrStUvWxYz123456\n`);
    
    const hfToken = await ask('🔑 Entrez votre clé Hugging Face: ');
    
    if (!hfToken.startsWith('hf_')) {
      console.log('❌ Erreur: La clé doit commencer par "hf_"');
      process.exit(1);
    }

    console.log(`\n✅ Clé Hugging Face acceptée!\n`);

    console.log(`\n📝 ÉTAPE 2: Clé Unsplash`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`\n📌 Comment obtenir votre clé Unsplash:
  1. Allez sur: https://unsplash.com/
  2. Créez un compte (email + password)
  3. Allez sur: https://unsplash.com/oauth/applications
  4. Cliquez "New Application"
  5. Remplissez le formulaire (n'importe quoi)
  6. COPIEZ "Access Key"
  
Exemple: abc123def456ghi789jkl012mno345pqr\n`);
    
    const unsplashKey = await ask('🖼️  Entrez votre clé Unsplash: ');
    
    if (unsplashKey.length < 10) {
      console.log('❌ Erreur: La clé semble trop courte');
      process.exit(1);
    }

    console.log(`\n✅ Clé Unsplash acceptée!\n`);

    console.log(`\n⚙️  ÉTAPE 3: Configuration du fichier .env`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    // Lire le fichier .env actuel
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Remplacer les valeurs
    envContent = envContent.replace(
      /HF_API_TOKEN=.*/,
      `HF_API_TOKEN=${hfToken}`
    );
    envContent = envContent.replace(
      /UNSPLASH_ACCESS_KEY=.*/,
      `UNSPLASH_ACCESS_KEY=${unsplashKey}`
    );
    envContent = envContent.replace(
      /HF_MODEL=.*/,
      `HF_MODEL=meta-llama/Llama-2-7b-hf`
    );

    // Écrire le fichier .env
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log(`✅ Fichier .env configuré avec succès!\n`);

    // Afficher un résumé
    console.log(`\n📊 Résumé de la Configuration`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`✅ Hugging Face Token: ${hfToken.substring(0, 20)}...`);
    console.log(`✅ Unsplash Key: ${unsplashKey.substring(0, 20)}...`);
    console.log(`✅ Modèle IA: meta-llama/Llama-2-7b-hf (Excellent!)\n`);

    console.log(`\n🚀 PROCHAINES ÉTAPES`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    console.log(`1️⃣  Arrêtez le serveur (Ctrl+C dans le terminal)`);
    console.log(`2️⃣  Relancez le serveur: npm start`);
    console.log(`3️⃣  Ouvrez: http://localhost:3000`);
    console.log(`4️⃣  Posez une question\n`);
    console.log(`⏱️  Première requête: 20-30 secondes (normal)`);
    console.log(`⏱️  Requêtes suivantes: 5-10 secondes\n`);

    console.log(`\n✨ Configuration Terminée! ✨\n`);
    console.log(`Vous avez maintenant:`);
    console.log(`  ✅ IA Intelligente (Llama 2)`);
    console.log(`  ✅ Images Pertinentes (Unsplash)`);
    console.log(`  ✅ Réponses Détaillées\n`);

    rl.close();
    process.exit(0);

  } catch (err) {
    console.error('❌ Erreur:', err.message);
    rl.close();
    process.exit(1);
  }
}

main();
