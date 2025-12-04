#!/usr/bin/env node

/**
 * Start server with environment variables properly set
 */

// Load environment variables BEFORE anything else
require('dotenv').config({ path: '.env.local' });
require('dotenv').config(); // Also load from .env

// Vérifier les clés
console.log('\n╔════════════════════════════════════════════╗');
console.log('║  🤖 CHATBOT UNIVERS - Configuration       ║');
console.log('╚════════════════════════════════════════════╝\n');

const HF_TOKEN = process.env.HF_API_TOKEN;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
const MODEL = process.env.HF_MODEL || 'meta-llama/Llama-2-7b-hf';
const PORT = process.env.PORT || 3000;

console.log('📋 Vérification de la configuration:');
console.log(`   HF_API_TOKEN: ${HF_TOKEN ? '✅ Présent' : '❌ ABSENT'}`);
console.log(`   UNSPLASH_KEY: ${UNSPLASH_KEY ? '✅ Présent' : '❌ ABSENT'}`);
console.log(`   Modèle: ${MODEL}`);
console.log(`   Port: ${PORT}\n`);

if (!HF_TOKEN || !UNSPLASH_KEY) {
  console.log('⚠️  ATTENTION: Les clés ne sont pas configurées!');
  console.log('');
  console.log('Solution rapide - Copiez/collez dans PowerShell:');
  console.log('');
  console.log('$env:HF_API_TOKEN = "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"');
  console.log('$env:UNSPLASH_ACCESS_KEY = "wy-WZxO2WqzirHGfWgwZw9wbYrjRWEE1BNjWWkQToj8"');
  console.log('$env:HF_MODEL = "meta-llama/Llama-2-7b-hf"');
  console.log('npm start');
  console.log('');
}

console.log('🚀 Démarrage du serveur...\n');

// Maintenant démarrer le serveur
require('./server.js');
