#!/usr/bin/env node

/**
 * Chatbot Univers - Launcher
 * Démarre le serveur avec les bonnes configurations
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('\n🚀 =====================================');
console.log('🌌 Chatbot Univers - Enhanced Launcher');
console.log('=====================================\n');

// Vérifier le fichier .env
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  File .env not found! Creating default...');
  const defaultEnv = `# Configuration du Chatbot Univers

# Hugging Face API Token (REQUIRED)
HF_API_TOKEN=ebgUTSPrQ5W200gZqDCSYIW2GbqRuUoIOcVSN2D3

# Unsplash API Key (for high-quality images)
UNSPLASH_ACCESS_KEY=wy-WZxO2WqzirHGfWgwZw9wbYrjRWEE1BNjWWkQToj8

# Model Selection
HF_MODEL=gpt2

# Server Port
PORT=3000

# Debug Mode
DEBUG=true
`;
  
  fs.writeFileSync(envPath, defaultEnv);
  console.log('✅ .env file created with default values\n');
}

// Vérifier les dépendances
console.log('📦 Checking dependencies...');
const requiredModules = ['express', 'axios', 'cors', 'dotenv'];
let missingModules = [];

for (const module of requiredModules) {
  try {
    require.resolve(module);
    console.log(`  ✅ ${module}`);
  } catch (err) {
    console.log(`  ❌ ${module} (missing)`);
    missingModules.push(module);
  }
}

if (missingModules.length > 0) {
  console.log(`\n⚠️  Installing missing modules: ${missingModules.join(', ')}`);
  console.log('Please wait...\n');
  
  const npm = spawn('npm', ['install', ...missingModules], {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  npm.on('close', (code) => {
    if (code !== 0) {
      console.error('\n❌ Installation failed!');
      process.exit(1);
    }
    startServer();
  });
} else {
  startServer();
}

function startServer() {
  console.log('\n🌟 Starting server...\n');
  
  require('dotenv').config();
  
  // Afficher les configurations
  console.log('📋 Configuration:');
  console.log(`   Port: ${process.env.PORT || 3000}`);
  console.log(`   Model: ${process.env.HF_MODEL || 'gpt2'}`);
  console.log(`   HF API: ${process.env.HF_API_TOKEN ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   Unsplash: ${process.env.UNSPLASH_ACCESS_KEY ? '✅ Configured' : '❌ Missing'}`);
  console.log('\n');
  
  // Démarrer le serveur amélioré
  try {
    require('./server-enhanced.js');
  } catch (err) {
    console.error('❌ Server startup failed:', err.message);
    process.exit(1);
  }
}

// Gestion des signaux
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n👋 Shutting down server...');
  process.exit(0);
});
