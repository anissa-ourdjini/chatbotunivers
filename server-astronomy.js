const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

// ✅ IMPORTER LA BASE DE CONNAISSANCE ASTRONOMIQUE
const astronomyKnowledge = require('./astronomy-knowledge.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const HF_TOKEN = process.env.HF_API_TOKEN || null;
const MODEL = process.env.HF_MODEL || 'google/flan-t5-base';
const PORT = process.env.PORT || 3000;

console.log('🌌 ChatBot Astronomie Expert - Server Starting...');
console.log(`🔭 Mode: Expert en Astronomie & Univers`);
console.log(`📚 Base de données: ${Object.keys(astronomyKnowledge).length} catégories`);

// ✅ ENDPOINT CHAT AVEC BASE DE CONNAISSANCE ASTRONOMIQUE
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.json({ reply: 'Veuillez poser une question sur l\'astronomie, l\'univers ou les planètes' });
  }

  try {
    // Rechercher dans la base de connaissance astronomique
    const astronomyResponse = searchAstronomyKnowledge(message);
    if (astronomyResponse) {
      return res.json({ 
        reply: astronomyResponse.text,
        image: astronomyResponse.image 
      });
    }

    // Si pas trouvé dans la base, et si token disponible, utiliser l'API
    if (HF_TOKEN) {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${MODEL}`,
        { inputs: `Tu es un expert en astronomie et univers. Réponds à cette question: ${message}` },
        {
          headers: { Authorization: `Bearer ${HF_TOKEN}`, 'Content-Type': 'application/json' },
          timeout: 30000
        }
      );

      const data = response.data;
      let text = '';
      if (Array.isArray(data) && data.length > 0) {
        text = data[0]?.generated_text || data[0]?.text || '';
      } else if (data?.generated_text) {
        text = data.generated_text;
      }

      return res.json({ reply: text || getFallbackAstronomyResponse(message) });
    }

    // Sinon, réponse générique
    return res.json({ reply: getFallbackAstronomyResponse(message) });

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return res.json({ reply: getFallbackAstronomyResponse(message) });
  }
});

// ✅ FONCTION DE RECHERCHE DANS LA BASE DE CONNAISSANCE
function searchAstronomyKnowledge(query) {
  const q = query.toLowerCase();
  
  // Mots-clés mappés aux catégories
  const keywordMap = {
    // Univers
    'univers': 'univers',
    'big bang': 'univers',
    'expansion': 'univers',
    'cosmos': 'univers',
    
    // Système solaire
    'système solaire': 'systemeSolaire',
    'solar system': 'systemeSolaire',
    'planète': 'systemeSolaire',
    'planet': 'systemeSolaire',
    
    // Soleil
    'soleil': 'soleil',
    'sun': 'soleil',
    'étoile': 'soleil',
    'star': 'soleil',
    
    // Mercure
    'mercure': 'mercure',
    'mercury': 'mercure',
    
    // Vénus
    'vénus': 'venus',
    'venus': 'venus',
    
    // Terre
    'terre': 'terre',
    'earth': 'terre',
    
    // Mars
    'mars': 'mars',
    'vie sur mars': 'mars',
    'martien': 'mars',
    'rouge': 'mars',
    
    // Jupiter
    'jupiter': 'jupiter',
    'géante gazeuse': 'jupiter',
    'tache rouge': 'jupiter',
    
    // Saturne
    'saturne': 'saturne',
    'anneaux': 'saturne',
    'rings': 'saturne',
    
    // Uranus
    'uranus': 'uranus',
    'géante glace': 'uranus',
    'bleu-vert': 'uranus',
    
    // Neptune
    'neptune': 'neptune',
    'planète du vent': 'neptune',
    
    // Exoplanètes
    'exoplanète': 'exoplanetes',
    'exoplanet': 'exoplanetes',
    'autre planète': 'exoplanetes',
    'zone habitable': 'exoplanetes',
    
    // Étoiles
    'étoile': 'etoiles',
    'star': 'etoiles',
    'proximité': 'etoiles',
    
    // Galaxies
    'galaxie': 'galaxies',
    'galaxy': 'galaxies',
    'voie lactée': 'galaxies',
    'andromède': 'galaxies',
    'milky way': 'galaxies',
    
    // Trous noirs
    'trou noir': 'trous_noirs',
    'black hole': 'trous_noirs',
    'singularité': 'trous_noirs',
    
    // Nébuleuses
    'nébuleuse': 'nebuleuses',
    'nebula': 'nebuleuses',
    'orion': 'nebuleuses',
    
    // Lunes
    'lune': 'lunes',
    'moon': 'lunes',
    'satellite': 'lunes',
    
    // Comètes
    'comète': 'cometes',
    'comet': 'cometes',
    'halley': 'cometes',
    
    // Astéroïdes
    'astéroïde': 'asteroides',
    'asteroid': 'asteroides',
    'ceinture': 'asteroides',
    
    // Constellations
    'constellation': 'constellations',
    'constellation': 'constellations',
    'ourse': 'constellations',
    'cassiopée': 'constellations',
    
    // Phénomènes
    'éclipse': 'phenomenes',
    'eclipse': 'phenomenes',
    'aurore': 'phenomenes',
    'météorite': 'phenomenes',
    
    // Concepts
    'année-lumière': 'concepts',
    'light year': 'concepts',
    'parsec': 'concepts',
    'ua': 'concepts',
    'gravité': 'concepts',
    'relativité': 'concepts',
    
    // Missions
    'mission': 'missions',
    'nasa': 'missions',
    'rover': 'missions',
    'télescope': 'missions',
    'telescope': 'missions',
    'hubble': 'missions',
    'jwst': 'missions',
    'voyager': 'missions',
    
    // Astronomie moderne
    'découverte': 'astronomie_moderne',
    'recherche': 'astronomie_moderne',
    'seti': 'astronomie_moderne',
    'onde gravitationnelle': 'astronomie_moderne'
  };

  // Chercher le meilleur match
  let bestMatch = null;
  let bestScore = 0;

  for (const [keyword, category] of Object.entries(keywordMap)) {
    if (q.includes(keyword)) {
      const score = keyword.length; // Mots les plus longs ont priorité
      if (score > bestScore) {
        bestScore = score;
        bestMatch = category;
      }
    }
  }

  // Si un match trouvé, retourner la réponse
  if (bestMatch && astronomyKnowledge[bestMatch]) {
    const entry = astronomyKnowledge[bestMatch];
    const text = formatAstronomyEntry(entry);
    return {
      text: text,
      image: entry.image || 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop'
    };
  }

  return null;
}

// ✅ FORMAT LA RÉPONSE ASTRONOMIQUE
function formatAstronomyEntry(entry) {
  let text = '';
  
  // Si c'est juste un objet simple (dictionnaire)
  if (typeof entry === 'object') {
    // Lister les infos principales
    const keys = Object.keys(entry).filter(k => k !== 'image');
    const info = keys.slice(0, 8).map(key => {
      const value = entry[key];
      const keyFormatted = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
      return `• ${keyFormatted}: ${value}`;
    }).join('\n');
    
    text = info || JSON.stringify(entry).substring(0, 500);
  }

  return text || 'Information trouvée dans la base de données astronomique.';
}

// ✅ RÉPONSE DE FALLBACK ASTRONOMIQUE
function getFallbackAstronomyResponse(question) {
  const responses = [
    'Votre question est intéressante! Notre base de données astronomique contient des infos sur l\'univers, les planètes, les étoiles, les galaxies et bien plus. Essayez des questions comme: "Parle-moi de Mars", "C\'est quoi un trou noir?", "Combien de lunes a Jupiter?"',
    'Je suis un expert en astronomie et univers! Je peux vous expliquer les planètes, étoiles, galaxies, phénomènes astronomiques, missions spatiales et concepts clés. Posez votre question!',
    'Curieux de l\'univers? Je connais l\'astronomie! Questions comme "Y a-t-il de la vie sur Mars?", "Expliquez les trous noirs", "Quelle est la plus grande planète?" sont bienvenues.'
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// ✅ ENDPOINT IMAGE
app.get('/api/image', async (req, res) => {
  const q = (req.query.q || 'universe').trim();

  try {
    // Unsplash avec fallback
    const unsplashUrls = {
      'mars': 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
      'jupiter': 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop',
      'saturne': 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&h=300&fit=crop',
      'univers': 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop',
      'soleil': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
      'lune': 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop',
      'galaxie': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
      'étoile': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
      'terre': 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop'
    };

    // Chercher une image correspondante
    const qLower = q.toLowerCase();
    for (const [keyword, url] of Object.entries(unsplashUrls)) {
      if (qLower.includes(keyword)) {
        return res.json({ url });
      }
    }

    // Image par défaut
    const defaultUrl = 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop';
    res.json({ url: defaultUrl });

  } catch (error) {
    res.json({ url: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop' });
  }
});

// ✅ ENDPOINT SANTÉ
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    mode: 'Expert Astronomie',
    knowledge_base: Object.keys(astronomyKnowledge).length + ' catégories',
    hf_token: HF_TOKEN ? 'Configuré' : 'Non configuré'
  });
});

// ✅ ENDPOINT LISTE CATÉGORIES
app.get('/api/categories', (req, res) => {
  const categories = Object.keys(astronomyKnowledge);
  res.json({ 
    categories,
    total: categories.length,
    message: 'Posez une question sur n\'importe quel sujet astronomique!'
  });
});

// ✅ DÉMARRER LE SERVEUR
app.listen(PORT, () => {
  console.log(`\n✅ Serveur Expert Astronomie lancé sur http://localhost:${PORT}`);
  console.log(`🔭 Base de connaissances: ${Object.keys(astronomyKnowledge).length} catégories`);
  console.log(`📚 Sujets couverts: Univers, Planètes, Étoiles, Galaxies, Missions, et plus!`);
  console.log(`\n🌍 Posez n'importe quelle question sur l'astronomie!\n`);
});
