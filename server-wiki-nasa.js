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

const connector = new AstrononyConnector();
const HF_TOKEN = process.env.HF_API_TOKEN || null;
const MODEL = process.env.HF_MODEL || 'google/flan-t5-base';
const PORT = process.env.PORT || 3000;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || null;
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

console.log('🌌 ChatBot Astronomie - Wiki + NASA Connected...');

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

// ✅ RECHERCHE D'IMAGES
async function findBestImage(query, category) {
  const q = query.toLowerCase();

  if (category && category.data && category.data.images && category.data.images.length > 0) {
    return category.data.images[0];
  }

  const imageTerms = {
    'aurore': 'aurora borealis',
    'aurore boréale': 'aurora borealis northern lights',
    'éclipse': 'eclipse',
    'météorite': 'meteor shower',
    'lune': 'moon lunar',
    'mars': 'mars planet',
    'saturne': 'saturn rings',
    'jupiter': 'jupiter',
  };

  for (const [keyword, searchTerm] of Object.entries(imageTerms)) {
    if (q.includes(keyword)) {
      try {
        const nasaImages = await connector.getNasaImages(searchTerm, 1);
        if (nasaImages && nasaImages.length > 0) {
          return nasaImages[0].image;
        }
      } catch (e) {
        console.error('NASA image error:', e.message);
      }
    }
  }

  if (category && category.data.images) {
    return category.data.images[0];
  }

  return 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop';
}

// ✅ FORMAT RÉPONSE
function formatResponse(category) {
  if (!category || !category.data) return 'Information non trouvée.';

  const data = category.data;
  const lines = [];

  if (data.definition) {
    lines.push(`📖 ${data.definition}`);
    lines.push('');
  }

  const keys = Object.keys(data).filter(k => 
    !['keywords', 'searchTerms', 'images', 'definition'].includes(k)
  );

  for (let i = 0; i < Math.min(keys.length, 8); i++) {
    const key = keys[i];
    const value = data[key];
    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
    lines.push(`• ${formattedKey}: ${value}`);
  }

  return lines.join('\n');
}

// ✅ ENDPOINT CHAT - AVEC WIKI + NASA
app.post('/api/chat', async (req, res) => {
  const { message, useWikiNasa } = req.body;
  
  if (!message) {
    return res.json({ 
      reply: 'Posez une question sur l\'astronomie, l\'univers, les planètes...',
      image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    });
  }

  try {
    // 1. RECHERCHE LOCALE D'ABORD
    const category = findBestMatch(message);
    let reply = '';
    let image = '';

    if (category && category.score > 0) {
      reply = formatResponse(category);
      image = await findBestImage(message, category);

      // 2. ENRICHIR AVEC WIKI + NASA (OPTIONNEL)
      if (useWikiNasa !== false) {
        console.log(`📚 Enrichissant avec Wikipedia et NASA...`);
        try {
          const wikiData = await connector.getWikipediaSummary(category.key);
          
          if (wikiData) {
            reply += `\n\n📚 **Wikipedia:**\n${wikiData.extract}`;
            if (!image) image = wikiData.image;
          }

          // Chercher images NASA
          const nasaImages = await connector.getNasaImages(message, 3);
          if (nasaImages.length > 0) {
            reply += `\n\n🚀 **Images NASA:**\n`;
            nasaImages.forEach((img, i) => {
              reply += `${i + 1}. ${img.title}\n`;
            });
            if (!image) image = nasaImages[0].image;
          }
        } catch (enrichError) {
          console.error('Enrichment error:', enrichError.message);
          // Continue without enrichment
        }
      }

      return res.json({ 
        reply,
        image: image || 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop',
        source: 'Base locale + Wikipedia + NASA'
      });
    }

    // 3. SI PAS TROUVÉ LOCALEMENT - CHERCHER SUR WIKI + NASA
    console.log(`🔍 Cherchant sur Wikipedia et NASA...`);
    const wikiResult = await connector.getWikipediaSummary(message);
    
    if (wikiResult) {
      let wikiReply = `📚 **Wikipedia - ${wikiResult.title}**\n${wikiResult.extract}`;
      
      const nasaImages = await connector.getNasaImages(message, 3);
      if (nasaImages.length > 0) {
        wikiReply += `\n\n🚀 **Images NASA:**\n`;
        nasaImages.forEach((img, i) => {
          wikiReply += `${i + 1}. ${img.title}\n`;
        });
      }

      return res.json({
        reply: wikiReply,
        image: wikiResult.image || (nasaImages[0]?.image) || 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop',
        source: 'Wikipedia + NASA'
      });
    }

    // 4. FALLBACK - RÉPONSE PAR DÉFAUT
    return res.json({
      reply: `Je n'ai pas trouvé d'information sur "${message}" dans ma base de données. 
Essayez avec des questions plus spécifiques comme:
• "Mars"
• "Aurore boréale"
• "Trou noir"
• "Lune"`,
      image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop',
      source: 'Par défaut'
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.json({
      reply: 'Une erreur s\'est produite. Posez votre question à nouveau.',
      image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop',
      error: error.message
    });
  }
});

// ✅ ENDPOINT WIKI
app.get('/api/wiki/:query', async (req, res) => {
  try {
    const result = await connector.getWikipediaSummary(req.params.query);
    
    if (result) {
      res.json(result);
    } else {
      res.json({ error: 'Pas trouvé sur Wikipedia' });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ✅ ENDPOINT NASA IMAGES
app.get('/api/nasa/images/:query', async (req, res) => {
  try {
    const images = await connector.getNasaImages(req.params.query, 10);
    res.json({
      query: req.params.query,
      count: images.length,
      images
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ✅ ENDPOINT NASA APOD
app.get('/api/nasa/apod', async (req, res) => {
  try {
    const apod = await connector.getNasaAPOD();
    res.json(apod || { error: 'Impossible de récupérer APOD' });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ✅ ENDPOINT MARS ROVER
app.get('/api/nasa/mars-rover', async (req, res) => {
  try {
    const data = await connector.getMarsCuriosityData();
    res.json(data || { error: 'Impossible de récupérer données Mars' });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ✅ ENDPOINT SANTÉ
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    mode: 'Expert Astronomie + Wiki + NASA',
    categories: Object.keys(astronomyKnowledge).length,
    connectors: ['Wikipedia', 'NASA'],
    nasaKey: NASA_API_KEY === 'DEMO_KEY' ? 'DEMO (limité)' : 'Configuré',
    features: [
      'Recherche locale',
      'Wikipedia intégré',
      'NASA Images intégré',
      'NASA APOD',
      'Mars Rover données'
    ]
  });
});

// ✅ ENDPOINT SEARCH COMPLET
app.get('/api/search/:query', async (req, res) => {
  const query = req.params.query;
  
  try {
    const localMatch = findBestMatch(query);
    const wikiData = await connector.getWikipediaSummary(query);
    const nasaImages = await connector.getNasaImages(query, 5);

    res.json({
      query,
      local: localMatch ? {
        category: localMatch.key,
        score: localMatch.score
      } : null,
      wikipedia: wikiData ? {
        title: wikiData.title,
        url: wikiData.url
      } : null,
      nasa_images: nasaImages.length,
      results: {
        local: !!localMatch,
        wikipedia: !!wikiData,
        nasa: nasaImages.length > 0
      }
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ✅ DÉMARRER
app.listen(PORT, () => {
  console.log(`\n✅ Serveur Expert Astronomie lancé sur http://localhost:${PORT}`);
  console.log(`🔭 Catégories locales: ${Object.keys(astronomyKnowledge).length}`);
  console.log(`📚 Wikipedia: Intégré`);
  console.log(`🚀 NASA: Intégré`);
  console.log(`🔑 NASA API: ${NASA_API_KEY === 'DEMO_KEY' ? 'DEMO (limité)' : 'Configuré'}`);
  console.log(`\n💬 Posez vos questions - Réponses en temps réel!\n`);
});
