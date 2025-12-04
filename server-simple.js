#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
const HF_TOKEN = process.env.HF_API_TOKEN;
const HF_MODEL = process.env.HF_MODEL || 'gpt2';

console.log('✅ Serveur démarrant...');
console.log('   Token HF:', HF_TOKEN ? '✅ Présent' : '❌ Manquant');
console.log('   Modèle:', HF_MODEL);

// Route simple de test
app.get('/health', (req, res) => {
    res.json({ status: 'OK', time: new Date().toISOString() });
});

// API Chat
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        const axios = require('axios');
        
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${HF_MODEL}`,
            { inputs: message },
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        console.log('✅ Réponse reçue de HF API');
        const data = response.data;
        
        let text = '';
        if (Array.isArray(data) && data.length > 0) {
            text = data.map(item => item.generated_text || item.text || '').join('\n').trim();
        } else if (typeof data === 'object' && data !== null) {
            text = data.generated_text || data.text || JSON.stringify(data);
        } else {
            text = String(data);
        }

        res.json({ reply: text });
    } catch (error) {
        console.error('❌ Erreur API:', error.message);
        res.status(500).json({ 
            error: 'Chat request failed',
            message: error.message 
        });
    }
});

// API Image (simple)
app.get('/api/image', (req, res) => {
    const q = (req.query.q || 'space').toLowerCase();
    
    // Retourner une SVG simple
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'>
        <rect width='400' height='300' fill='#000814'/>
        <circle cx='200' cy='150' r='80' fill='#fdb813' opacity='0.8'/>
        <circle cx='100' cy='80' r='20' fill='#4da6ff'/>
        <circle cx='280' cy='120' r='15' fill='#e27b58'/>
    </svg>`;
    
    const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    res.json({ url: dataUrl, source: 'generated' });
});

// Démarrer serveur
app.listen(PORT, () => {
    console.log('\n✅ SERVEUR DÉMARRÉ AVEC SUCCÈS!\n');
    console.log(`   🌐 URL: http://localhost:${PORT}`);
    console.log(`   🌌 3D: http://localhost:${PORT}/3d-universe-simple.html`);
    console.log(`   📊 Health: http://localhost:${PORT}/health\n`);
});

// Gestion des erreurs non capturées
process.on('uncaughtException', (err) => {
    console.error('❌ ERREUR NON GÉRÉE:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ PROMISE REJETÉE:', err);
    process.exit(1);
});
