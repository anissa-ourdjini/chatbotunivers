const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const astronomyKnowledge = require('./astronomy-knowledge-v2.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const HF_TOKEN = process.env.HF_API_TOKEN || null;
const MODEL = process.env.HF_MODEL || 'google/flan-t5-base';
const PORT = process.env.PORT || 3000;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || null;

console.log('🌌 ChatBot Astronomie Intelligent - Server Starting...');

// ✅ RECHERCHE INTELLIGENTE - COMPREND TOUTES LES QUESTIONS
function findBestMatch(query) {
  const q = query.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  // Analyser chaque catégorie
  for (const [key, data] of Object.entries(astronomyKnowledge)) {
    let score = 0;

    // Chercher dans les keywords
    if (data.keywords) {
      for (const keyword of data.keywords) {
        if (q.includes(keyword)) {
          score += keyword.length * 3; // Poids important pour keywords
        }
      }
    }

    // Chercher dans searchTerms
    if (data.searchTerms) {
      for (const term of data.searchTerms) {
        if (q.includes(term)) {
          score += term.length * 2;
        }
      }
    }

    // Chercher dans la définition
    if (data.definition && q.includes(data.definition.toLowerCase().substring(0, 10))) {
      score += 5;
    }

    // Chercher dans d'autres champs
    if (data.caracteristiques && q.includes(data.caracteristiques.substring(0, 10))) {
      score += 3;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = { key, data, score };
    }
  }

  return bestMatch;
}

// ✅ RECHERCHE D'IMAGES DYNAMIQUE - CHERCHE LA BONNE IMAGE
async function findBestImage(query, category) {
  const q = query.toLowerCase();

  // 1. Images spécifiques de la catégorie
  if (category && category.data && category.data.images && category.data.images.length > 0) {
    return category.data.images[0];
  }

  // 2. Chercher des termes visuels dans la requête
  const imageTerms = {
    'aurore': 'aurora borealis',
    'aurore boréale': 'aurora borealis northern lights',
    'éclipse': 'eclipse',
    'météorite': 'meteor shower',
    'pluie de météorites': 'meteor shower',
    'lune': 'moon lunar',
    'mars rouge': 'mars planet red',
    'saturne anneaux': 'saturn rings',
    'jupiter tache': 'jupiter great red spot',
    'noir': 'black hole',
    'nébuleuse': 'nebula',
    'galaxie': 'galaxy spiral',
    'voie lactée': 'milky way',
    'andromède': 'andromeda galaxy'
  };

  // Chercher un terme visuel correspondant
  for (const [keyword, searchTerm] of Object.entries(imageTerms)) {
    if (q.includes(keyword)) {
      return await fetchImageFromUnsplash(searchTerm);
    }
  }

  // 3. Si token Unsplash, chercher l'image
  if (UNSPLASH_KEY) {
    return await fetchImageFromUnsplash(q);
  }

  // 4. Sinon, image par défaut correspondant à la catégorie
  if (category && category.data.images) {
    return category.data.images[0];
  }

  return 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop';
}

// ✅ REQUÊTE UNSPLASH OPTIMISÉE
async function fetchImageFromUnsplash(searchTerm) {
  try {
    if (!UNSPLASH_KEY) return null;

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: searchTerm,
        per_page: 1,
        client_id: UNSPLASH_KEY,
        orientation: 'landscape'
      },
      timeout: 5000
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    }
  } catch (error) {
    console.error('Unsplash error:', error.message);
  }
  return null;
}

// ✅ FORMAT LA RÉPONSE DE MANIÈRE LISIBLE
function formatResponse(category) {
  if (!category || !category.data) return 'Information non trouvée.';

  const data = category.data;
  const lines = [];

  // Ajouter la définition
  if (data.definition) {
    lines.push(`📖 ${data.definition}`);
    lines.push('');
  }

  // Ajouter les autres infos (max 10 lignes)
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

// ✅ ENDPOINT CHAT PRINCIPAL
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.json({ 
      reply: 'Posez une question sur l\'astronomie, l\'univers, les planètes, les phénomènes célestes...',
      image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    });
  }

  try {
    // 1. RECHERCHE INTELLIGENTE
    const category = findBestMatch(message);

    if (category && category.score > 0) {
      // 2. TROUVER L'IMAGE APPROPRIÉE
      const image = await findBestImage(message, category);

      // 3. FORMATTER LA RÉPONSE
      const reply = formatResponse(category);

      return res.json({ 
        reply,
        image: image || category.data.images[0] || 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
      });
    }

    // 4. SI PAS TROUVÉ DANS LA BASE - UTILISER L'IA
    if (HF_TOKEN) {
      try {
        const response = await axios.post(
          `https://api-inference.huggingface.co/models/${MODEL}`,
          { inputs: `Tu es un expert en astronomie. Réponds à: ${message}` },
          {
            headers: { Authorization: `Bearer ${HF_TOKEN}`, 'Content-Type': 'application/json' },
            timeout: 30000
          }
        );

        const text = response.data[0]?.generated_text || response.data.generated_text || '';
        const image = await findBestImage(message, null);

        return res.json({ 
          reply: text || 'Réponse IA non disponible',
          image: image || 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
        });
      } catch (aiError) {
        console.error('IA error:', aiError.message);
      }
    }

    // 5. RÉPONSE PAR DÉFAUT INTELLIGENTE
    return res.json({
      reply: `Je n'ai pas trouvé d'information spécifique sur "${message}" dans ma base de données astronomique. 
Essayez des questions comme: 
• "Parle-moi de Mars"
• "Qu'est-ce que l'aurore boréale?"
• "Expliquez les trous noirs"
• "Y a-t-il de la vie sur Mars?"
• "Décris Saturne et ses anneaux"`,
      image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.json({
      reply: 'Une erreur s\'est produite. Posez votre question à nouveau.',
      image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    });
  }
});

// ✅ ENDPOINT IMAGE AMÉLIORÉ
app.get('/api/image', async (req, res) => {
  const q = (req.query.q || 'universe').trim();

  try {
    const image = await findBestImage(q, null);
    if (image) {
      return res.json({ url: image });
    }
  } catch (error) {
    console.error('Image error:', error.message);
  }

  res.json({ url: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop' });
});

// ✅ ENDPOINT SANTÉ
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    mode: 'Expert Astronomie Intelligent',
    categories: Object.keys(astronomyKnowledge).length,
    intelligence: 'Recherche intelligente + Images dynamiques',
    unsplash: UNSPLASH_KEY ? 'Activé' : 'Désactivé',
    hf_token: HF_TOKEN ? 'Configuré' : 'Non configuré'
  });
});

// ✅ ENDPOINT CATÉGORIES
app.get('/api/categories', (req, res) => {
  const categories = Object.keys(astronomyKnowledge).map(key => {
    const data = astronomyKnowledge[key];
    return {
      name: key,
      definition: data.definition,
      keywords: data.keywords || []
    };
  });

  res.json({
    total: categories.length,
    categories,
    message: 'Posez n\'importe quelle question astronomique!'
  });
});

// ✅ ENDPOINT RECHERCHE
app.get('/api/search', (req, res) => {
  const q = req.query.q || '';
  const match = findBestMatch(q);

  if (match) {
    res.json({
      found: true,
      category: match.key,
      score: match.score,
      definition: match.data.definition,
      keywords: match.data.keywords
    });
  } else {
    res.json({
      found: false,
      message: 'Aucune catégorie ne correspond exactement, essayez d\'autres mots-clés.'
    });
  }
});

// ✅ DÉMARRER LE SERVEUR
app.listen(PORT, () => {
  console.log(`\n✅ Serveur Expert Astronomie Intelligent lancé sur http://localhost:${PORT}`);
  console.log(`🔭 Catégories: ${Object.keys(astronomyKnowledge).length}`);
  console.log(`🎯 Intelligence: Recherche intelligente + Images dynamiques`);
  console.log(`🖼️  Images: ${UNSPLASH_KEY ? 'Unsplash activé' : 'Images locales'}`);
  console.log(`🧠 Modèle IA: ${HF_TOKEN ? 'Hugging Face activé' : 'Fallback local'}`);
  console.log(`\n💬 Posez vos questions en langage naturel!\n`);
});
