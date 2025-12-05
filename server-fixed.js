const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

const HF_TOKEN = process.env.HF_API_TOKEN || null;
const MODEL = process.env.HF_MODEL || 'google/flan-t5-base';
const PORT = process.env.PORT || 3000;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || null;

console.log('🚀 ChatBot Univers Server Starting...');
console.log(`Model: ${MODEL}`);
console.log(`HF Token: ${HF_TOKEN ? '✅ Configuré' : '❌ Non configuré'}`);
console.log(`Unsplash Key: ${UNSPLASH_KEY ? '✅ Configuré' : '❌ Non configuré'}`);

// ✅ ENDPOINT CHAT - AVEC FALLBACK
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.json({ reply: 'Veuillez poser une question' });
  }

  try {
    if (!HF_TOKEN) {
      // Mode démo - réponse locale
      const localResponse = generateLocalResponse(message);
      return res.json({ reply: localResponse });
    }

    // Appeler Hugging Face API
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const data = response.data;
    let text = '';

    if (Array.isArray(data) && data.length > 0) {
      text = data[0]?.generated_text || data[0]?.text || '';
    } else if (data?.generated_text) {
      text = data.generated_text;
    } else if (data?.text) {
      text = data.text;
    } else {
      text = generateLocalResponse(message);
    }

    res.json({ reply: text || generateLocalResponse(message) });
  } catch (error) {
    console.error('❌ Erreur API:', error.message);
    
    // Fallback: réponse locale
    const fallback = generateLocalResponse(message);
    res.json({ reply: fallback });
  }
});

// ✅ ENDPOINT IMAGE - AVEC FALLBACK
app.get('/api/image', async (req, res) => {
  const q = (req.query.q || 'universe').trim();

  try {
    if (UNSPLASH_KEY) {
      // Essayer Unsplash
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: q, per_page: 1, client_id: UNSPLASH_KEY },
        timeout: 10000
      });

      if (response.data.results && response.data.results.length > 0) {
        const url = response.data.results[0].urls.regular;
        return res.json({ url });
      }
    }

    // Fallback: Wikimedia Commons
    const wikiResponse = await axios.get(
      `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&srlimit=1`,
      { timeout: 10000 }
    );

    if (wikiResponse.data.query.search && wikiResponse.data.query.search.length > 0) {
      const title = wikiResponse.data.query.search[0].title;
      const imageUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${title.slice(0, 1).toLowerCase()}/${title.slice(0, 2).toLowerCase()}/${title.replace(/ /g, '_')}/440px-${title.replace(/ /g, '_')}`;
      return res.json({ url: imageUrl });
    }

    // Fallback final: image par défaut
    const defaultImages = [
      'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&h=300&fit=crop'
    ];
    const randomImage = defaultImages[Math.floor(Math.random() * defaultImages.length)];
    
    res.json({ url: randomImage });
  } catch (error) {
    console.error('❌ Erreur image:', error.message);
    
    // Fallback ultime
    res.json({ 
      url: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop' 
    });
  }
});

// ✅ RÉPONSES LOCALES DE FALLBACK
function generateLocalResponse(question) {
  const q = question.toLowerCase();

  const responses = {
    'mars': 'Mars est la 4e planète du système solaire. C\'est une planète rocheuse connue pour sa couleur rouge due à l\'oxyde de fer (rouille) à sa surface. La température moyenne est d\'environ -63°C.',
    'vie': 'La vie est un processus naturel qui se caractérise par la croissance, la reproduction, l\'homéostasie et l\'adaptation. Sur Terre, on trouve une grande diversité de formes de vie, des microorganismes aux mammifères.',
    'univers': 'L\'univers est tout ce qui existe : la matière, l\'énergie, l\'espace et le temps. Son âge estimé est d\'environ 13,8 milliards d\'années. On pense qu\'il contient des milliards de galaxies.',
    'soleil': 'Le Soleil est une étoile au centre de notre système solaire. C\'est une boule de plasma très chaude. Son diamètre est d\'environ 1,39 million de kilomètres.',
    'terre': 'La Terre est la 3e planète du système solaire et l\'unique planète connue à abriter la vie. Son atmosphère contient de l\'oxygène et du dioxyde de carbone.',
  };

  for (const [key, value] of Object.entries(responses)) {
    if (q.includes(key)) {
      return value;
    }
  }

  return `À propos de votre question: "${question}"\n\nJe suis en mode démo. Pour des réponses plus complètes:\n1. Configurez HF_API_TOKEN dans votre fichier .env\n2. Redémarrez le serveur avec: npm start\n\nLes questions supportées en mode démo incluent: Mars, Vie, Univers, Soleil, Terre`;
}

// ✅ VÉRIFICATION SANTÉ
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    model: MODEL,
    hf_token: HF_TOKEN ? 'Configured' : 'Not configured',
    unsplash_key: UNSPLASH_KEY ? 'Configured' : 'Not configured'
  });
});

// ✅ DÉMARRER SERVEUR
app.listen(PORT, () => {
  console.log(`\n✅ Serveur lancé sur http://localhost:${PORT}`);
  console.log(`📊 Santé: http://localhost:${PORT}/health`);
  console.log(`\n💡 Pour les réponses complètes de l'IA:`);
  console.log(`   1. Créez un fichier .env avec:`);
  console.log(`      HF_API_TOKEN=sk_xxxxxxx`);
  console.log(`      HF_MODEL=google/flan-t5-base`);
  console.log(`   2. Redémarrez: npm start`);
  console.log(`\n🚀 Le chatbot est prêt!\n`);
});
