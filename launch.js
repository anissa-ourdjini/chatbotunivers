#!/usr/bin/env node

/**
 * 🚀 DÉMARRAGE RAPIDE AVEC CLÉS API
 * 
 * Ce script:
 * 1. Vérifie que .env existe
 * 2. Vérifie les clés API
 * 3. Lance le serveur FINAL
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log('\n🌌 ChatBot Expert Astronomie - Démarrage\n');

// ✅ Vérifier .env
const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.log('⚠️ Fichier .env non trouvé!');
  console.log('\n📝 Créer .env avec:');
  console.log(`
NASA_API_KEY=sk_xxxxxxxxxxxxx
UNSPLASH_ACCESS_KEY=sk_xxxxxxxxxxxxx  (optionnel)
HF_API_TOKEN=sk_xxxxxxxxxxxxx         (optionnel)
PORT=3000
  `);
  console.log('\nPuis relancer: npm start\n');
  process.exit(1);
}

// ✅ Charger .env
require('dotenv').config();

const NASA_KEY = process.env.NASA_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
const HF_TOKEN = process.env.HF_API_TOKEN;

console.log('✅ .env trouvé\n');

if (!NASA_KEY) {
  console.log('⚠️ NASA_API_KEY manquante dans .env');
  console.log('🌐 Obtenir gratuitement: https://api.nasa.gov\n');
}

if (NASA_KEY && NASA_KEY !== 'DEMO_KEY') {
  console.log('✅ NASA_API_KEY: Configurée');
} else {
  console.log('⚠️ NASA_API_KEY: DEMO_KEY (limité)');
}

if (UNSPLASH_KEY) {
  console.log('✅ UNSPLASH_ACCESS_KEY: Configurée');
} else {
  console.log('⚠️ UNSPLASH_ACCESS_KEY: Non configurée (optionnel)');
}

if (HF_TOKEN) {
  console.log('✅ HF_API_TOKEN: Configuré');
} else {
  console.log('⚠️ HF_API_TOKEN: Non configuré (optionnel)');
}

console.log('\n' + '='.repeat(50));
console.log('🚀 Lancement du serveur...\n');

// ✅ Lancer le serveur
require('./server-final.js');
