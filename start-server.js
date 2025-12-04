#!/usr/bin/env node
/**
 * 🚀 Démarreur de Serveur Simple et Fiable
 */

const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();

console.log('\n🚀 DÉMARRAGE DU SERVEUR...\n');

// Vérifier les clés
console.log('📋 Vérification...');
if (!process.env.HF_API_TOKEN) {
    console.error('❌ HF_API_TOKEN manquant dans .env');
    process.exit(1);
}
console.log('✅ HF_API_TOKEN présent');

// Lancer le serveur
const server = spawn('node', ['server-simple.js'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
});

server.on('error', (err) => {
    console.error('❌ Erreur serveur:', err);
    process.exit(1);
});

server.on('exit', (code) => {
    console.log('\n⚠️  Serveur arrêté (code:', code + ')');
    process.exit(code);
});

// Gestion Ctrl+C
process.on('SIGINT', () => {
    console.log('\n\n👋 Arrêt du serveur...');
    server.kill();
    process.exit(0);
});
