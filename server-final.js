const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const astronomyKnowledge = require('./astronomy-knowledge-v2.js');
const AstrononyConnector = require('./nasa-wiki-connector.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ✅ CONFIGURATION DES CLÉS API
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || null;
const HF_TOKEN = process.env.HF_API_TOKEN || null;
const PORT = process.env.PORT || 3000;

const connector = new AstrononyConnector();

console.log('🌌 ChatBot Expert Astronomie - Démarrage...');
console.log(`📡 NASA API Key: ${NASA_API_KEY === 'DEMO_KEY' ? '⚠️ DEMO_KEY (limité)' : '✅ Configuration personnalisée'}`);
console.log(`🖼️ Unsplash: ${UNSPLASH_KEY ? '✅ Activé' : '❌ Non configuré'}`);
console.log(`🧠 Hugging Face: ${HF_TOKEN ? '✅ Activé' : '❌ Non configuré'}`);

// ✅ RECHERCHE INTELLIGENTE
function findBestMatch(query) {
  const q = query.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const [key, data] of Object.entries(astronomyKnowledge)) {
    let score = 0;

    if (data.keywords) {
      for (const keyword of data.keywords) {
        if (q.includes(keyword)) {
          score += keyword.length * 3;
        }
      }
    }

    if (data.searchTerms) {
      for (const term of data.searchTerms) {
        if (q.includes(term)) {
          score += term.length * 2;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = { key, data, score };
    }
  }

  return bestMatch;
}

// ✅ RÉCUPÈRE LES IMAGES AVEC CLÉS API
async function fetchImagesWithAPI(query) {
  const images = [];

  // 1. NASA Images (avec clé API)
  if (NASA_API_KEY !== 'DEMO_KEY') {
    try {
      console.log(`🔍 Recherche NASA Images pour: "${query}"`);
      const nasaImages = await connector.getNasaImages(query, 5);
      images.push(...nasaImages.map(img => ({
        url: img.image,
        title: img.title,
        source: 'NASA'
      })));
      console.log(`✅ ${nasaImages.length} images NASA trouvées`);
    } catch (error) {
      console.error('Erreur NASA:', error.message);
    }
  }

  // 2. Unsplash Images (optionnel)
  if (UNSPLASH_KEY && images.length < 10) {
    try {
      console.log(`🎨 Recherche Unsplash pour: "${query}"`);
      const unsplashRes = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: query,
          client_id: UNSPLASH_KEY,
          per_page: 5
        },
        timeout: 5000
      });
      
      images.push(...unsplashRes.data.results.map(img => ({
        url: img.urls.regular,
        title: img.alt_description || query,
        source: 'Unsplash'
      })));
      console.log(`✅ ${unsplashRes.data.results.length} images Unsplash trouvées`);
    } catch (error) {
      console.error('Erreur Unsplash:', error.message);
    }
  }

  // 3. Images par défaut depuis la base locale
  if (images.length === 0) {
    console.log(`📦 Utilisation des images locales`);
  }

  return images;
}

// ✅ ENDPOINT PRINCIPAL: /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message || '';
    console.log(`\n💬 Question reçue: "${userMessage}"`);

    if (!userMessage.trim()) {
      return res.json({
        response: '❌ Veuillez poser une question.',
        images: []
      });
    }

    // 1. Recherche locale
    const localMatch = findBestMatch(userMessage);
    console.log(`🎯 Match local trouvé: ${localMatch ? localMatch.key : 'Aucun'}`);

    let response = '';
    let images = [];

    if (localMatch) {
      response = localMatch.data.description || 'Information trouvée mais pas de description.';
      
      // Ajouter des images locales si disponibles
      if (localMatch.data.images && localMatch.data.images.length > 0) {
        images.push({
          url: localMatch.data.images[0],
          title: localMatch.key,
          source: 'Local Database'
        });
      }
    } else {
      response = `Je n'ai pas d'information directe sur "${userMessage}", mais voici ce que je peux chercher...`;
    }

    // 2. Chercher des images supplémentaires avec les clés API
    const searchQuery = localMatch ? localMatch.key : userMessage;
    const apiImages = await fetchImagesWithAPI(searchQuery);
    images.push(...apiImages);

    // Limiter à 5 images
    images = images.slice(0, 5);

    console.log(`📊 Total: ${images.length} images collectées`);
    console.log(`✅ Réponse prête`);

    res.json({
      response,
      images,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({
      response: `Erreur serveur: ${error.message}`,
      images: []
    });
  }
});

// ✅ ENDPOINT: /api/nasa-apod (Photo du jour NASA)
app.get('/api/nasa-apod', async (req, res) => {
  try {
    console.log('📸 Récupération APOD...');
    const apod = await connector.getNasaAPOD();
    
    if (!apod) {
      return res.status(404).json({ error: 'APOD not found' });
    }

    res.json({
      title: apod.title,
      explanation: apod.explanation,
      image: apod.image,
      date: apod.date,
      source: 'NASA APOD'
    });
  } catch (error) {
    console.error('APOD error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ ENDPOINT: /api/nasa/images/:query
app.get('/api/nasa/images/:query', async (req, res) => {
  try {
    const query = req.params.query;
    console.log(`🔍 Recherche NASA pour: "${query}"`);

    if (!query) {
      return res.status(400).json({ error: 'Query required' });
    }

    const images = await connector.getNasaImages(query, 10);
    console.log(`✅ ${images.length} images trouvées`);

    res.json({
      query,
      count: images.length,
      images,
      source: 'NASA'
    });
  } catch (error) {
    console.error('NASA Images error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ ENDPOINT: /api/mars-rover
app.get('/api/mars-rover', async (req, res) => {
  try {
    console.log('🤖 Récupération données Mars Rover...');
    const marsData = await connector.getMarsCuriosityData();
    
    if (!marsData) {
      return res.status(404).json({ error: 'Mars data not found' });
    }

    res.json(marsData);
  } catch (error) {
    console.error('Mars data error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ ENDPOINT: /api/wiki/:query
app.get('/api/wiki/:query', async (req, res) => {
  try {
    const query = req.params.query;
    console.log(`📚 Recherche Wikipedia: "${query}"`);

    if (!query) {
      return res.status(400).json({ error: 'Query required' });
    }

    const wikiData = await connector.getWikipediaSummary(query);
    
    if (!wikiData) {
      return res.status(404).json({ error: 'Not found on Wikipedia' });
    }

    res.json(wikiData);
  } catch (error) {
    console.error('Wikipedia error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ ENDPOINT: /api/search/:query (Recherche combinée)
app.get('/api/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    console.log(`🔍 Recherche combinée: "${query}"`);

    const results = await connector.searchAstronomy(query);
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ ENDPOINT: /api/status (Vérification des clés API)
app.get('/api/status', (req, res) => {
  res.json({
    server: 'Online ✅',
    nasa: {
      configured: NASA_API_KEY !== 'DEMO_KEY',
      key: NASA_API_KEY === 'DEMO_KEY' ? 'DEMO_KEY (limité)' : 'Personnalisée ✅',
      limit: NASA_API_KEY === 'DEMO_KEY' ? '1000 req/jour' : '30000 req/jour'
    },
    unsplash: {
      configured: !!UNSPLASH_KEY,
      status: UNSPLASH_KEY ? 'Activé ✅' : 'Non configuré'
    },
    huggingface: {
      configured: !!HF_TOKEN,
      status: HF_TOKEN ? 'Activé ✅' : 'Non configuré'
    }
  });
});

// ✅ PAGE D'ACCUEIL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// ✅ DÉMARRAGE
app.listen(PORT, () => {
  console.log(`\n✅ Serveur lancé sur http://localhost:${PORT}`);
  console.log(`🌌 ChatBot Expert en Astronomie`);
  console.log(`📡 Connecté à: Wikipedia + NASA API`);
  console.log(`\n📌 Endpoints disponibles:`);
  console.log(`   POST   /api/chat                 - Chat principal`);
  console.log(`   GET    /api/nasa-apod             - Photo du jour NASA`);
  console.log(`   GET    /api/nasa/images/:query    - Recherche images NASA`);
  console.log(`   GET    /api/mars-rover            - Données Mars Rover`);
  console.log(`   GET    /api/wiki/:query           - Articles Wikipedia`);
  console.log(`   GET    /api/search/:query         - Recherche combinée`);
  console.log(`   GET    /api/status                - État des services\n`);
});
