const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const HF_TOKEN = process.env.HF_API_TOKEN;
const MODEL = process.env.HF_MODEL || 'gpt2';
const PORT = process.env.PORT || 3000;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || null;
const NASA_API_KEY = process.env.NASA_API_KEY || null;
const LOCAL_IMAGES_DIR = path.join(__dirname, 'unsplash_images');

// Base de connaissances astronomiques riche
const astronomyDatabase = {
  mars: {
    name: "Mars",
    facts: [
      "Mars est la 4ème planète du système solaire",
      "Surnommée la planète rouge en raison de l'oxyde de fer",
      "Diamètre: 6,779 km (moitié de la Terre)",
      "Distance du Soleil: 227,9 millions de km",
      "Année martienne: 687 jours terrestres",
      "Mars a 2 lunes: Phobos et Déimos",
      "Olympus Mons: plus grand volcan du système solaire (25 km de haut)",
      "Valles Marineris: plus grand canyon du système solaire"
    ],
    expeditions: [
      { name: "Mariner 4", year: 1965, details: "Premier survol réussi de Mars" },
      { name: "Viking 1", year: 1975, details: "Premier atterrissage réussi avec analyses du sol" },
      { name: "Mars Pathfinder", year: 1997, details: "Première exploration avec rover Sojourner" },
      { name: "Spirit & Opportunity", year: 2004, details: "Rovers jumeaux, Opportunity actif 14 ans" },
      { name: "Curiosity", year: 2012, details: "Rover actuel explorant le cratère Gale" },
      { name: "Perseverance", year: 2021, details: "Recherche de traces de vie microbienne ancienne" }
    ],
    life: "Aucune vie confirmée actuellement. Perseverance recherche des signatures chimiques de vie passée."
  },

  lune: {
    name: "Lune",
    facts: [
      "Diamètre: 3,474 km (1/4 de la Terre)",
      "Distance moyenne: 384,400 km",
      "Même face toujours tournée vers la Terre",
      "Créée il y a ~4,5 milliards d'années par collision géante",
      "Contrôle les marées terrestres",
      "Surface couverte de cratères d'impacts",
      "Pas d'atmosphère, température: -173°C à 127°C"
    ],
    expeditions: [
      { name: "Apollo 11", year: 1969, details: "Neil Armstrong et Buzz Aldrin premiers sur la Lune" },
      { name: "Apollo missions", year: "1969-1972", details: "12 astronautes au total sur la Lune" },
      { name: "Chang'e 5", year: 2020, details: "Récupération d'échantillons lunaires" }
    ]
  },

  soleil: {
    name: "Soleil",
    facts: [
      "Étoile de type G (naine jaune)",
      "Diamètre: 1,392 million de km",
      "Température surface: 5,500°C | Cœur: 15,7 millions°C",
      "Composition: 73% Hydrogène, 25% Hélium",
      "Masse: 99,86% de la masse du système solaire",
      "Fusion: 620 millions de tonnes d'hydrogène/sec",
      "Cycle de 11 ans avec taches solaires",
      "Durée de vie: ~10 milliards d'années"
    ]
  },

  voieLactee: {
    name: "Voie Lactée",
    facts: [
      "Galaxie spirale contenant notre système solaire",
      "Diamètre: ~100,000 années-lumière",
      "Contient 100-400 milliards d'étoiles",
      "Âge: ~13,6 milliards d'années",
      "Trou noir supermassif au centre: Sagittarius A*",
      "Orbite complète: 230-250 millions d'années",
      "4 bras spiraux principaux",
      "Épaisseur du disque: 1,000 années-lumière"
    ]
  },

  univers: {
    name: "Univers",
    facts: [
      "Contient ~2 trillions de galaxies",
      "Âge: 13,8 milliards d'années depuis le Big Bang",
      "Diamètre observable: 93 milliards d'années-lumière",
      "En expansion accélérée",
      "68% énergie noire, 27% matière noire, 5% matière ordinaire",
      "Température rayonnement cosmique de fond: 2,7 K",
      "Peut être plat, ouvert ou fermé",
      "Origines: Big Bang il y a 13,8 milliards d'années"
    ]
  },

  venus: {
    name: "Vénus",
    facts: [
      "Deuxième planète, presque même taille que Terre",
      "Diamètre: 12,104 km",
      "Température: 462°C (la plus chaude du système solaire!)",
      "Atmosphère: 92 fois plus dense que la Terre",
      "Composée de CO2 et nuages d'acide sulfurique",
      "Tourne en sens inverse (rétrograde)",
      "Jour vénusien: 243 jours terrestres"
    ]
  },

  terre: {
    name: "Terre",
    facts: [
      "Notre planète, seule avec vie complexe connue",
      "Diamètre: 12,742 km",
      "Distance du Soleil: 149,6 millions de km (1 UA)",
      "Période orbitale: 365,25 jours",
      "70% couverte d'eau",
      "Atmosphère: N2 (78%), O2 (21%)",
      "Température moyenne: 15°C",
      "Âge: 4,54 milliards d'années"
    ]
  },

  jupiter: {
    name: "Jupiter",
    facts: [
      "Plus grande planète du système solaire",
      "Diamètre: 139,820 km (11 fois la Terre)",
      "Grande Tache Rouge: tempête géante depuis 300+ ans",
      "79 lunes découvertes",
      "Dégages plus de chaleur qu'elle n'en reçoit du Soleil",
      "Puissant champ magnétique",
      "Dégage plus de chaleur qu'elle n'en reçoit du Soleil"
    ]
  },

  saturne: {
    name: "Saturne",
    facts: [
      "Célèbre pour ses magnifiques anneaux",
      "Diamètre: 116,460 km (9 fois la Terre)",
      "82 lunes connues, dont Titan",
      "Anneaux composés de glace et roches",
      "Moins dense que l'eau",
      "Vents extrêmes jusqu'à 1,800 km/h"
    ]
  },

  mercure: {
    name: "Mercure",
    facts: [
      "Planète la plus proche du Soleil",
      "Diamètre: 4,879 km",
      "Surface extrêmement chaude: 430°C le jour, -180°C la nuit",
      "Année de 88 jours terrestres",
      "Sans atmosphère appréciable",
      "Beaucoup de cratères d'impacts"
    ]
  },

  uranus: {
    name: "Uranus",
    facts: [
      "Géante glacée, 3ème plus grande",
      "Diamètre: 50,724 km",
      "Tourne sur le côté (inclinaison 98°)",
      "Couleur bleu-vert due au méthane",
      "27 lunes connues",
      "Température extrême: -224°C"
    ]
  },

  neptune: {
    name: "Neptune",
    facts: [
      "Géante glacée la plus éloignée",
      "Diamètre: 49,244 km",
      "Bleu profond dû au méthane",
      "Vents les plus rapides: 2,100 km/h",
      "14 lunes connues",
      "Température: -200°C"
    ]
  }
};

// Fonction pour extraire le sujet
function extractTopic(message) {
  const msgLower = message.toLowerCase();
  const keywords = {
    mars: ['mars', 'planète rouge', 'vie sur mars', 'phobos', 'déimos'],
    lune: ['lune', 'lunar', 'alunissage', 'apollo', 'moon'],
    soleil: ['soleil', 'sol', 'sun', 'étoile'],
    venus: ['vénus', 'venus'],
    terre: ['terre', 'earth'],
    jupiter: ['jupiter', 'jovian'],
    saturne: ['saturne', 'saturn', 'anneaux'],
    mercure: ['mercure'],
    uranus: ['uranus'],
    neptune: ['neptune'],
    voieLactee: ['voie lactée', 'milky way', 'galaxie'],
    univers: ['univers', 'universe', 'big bang', 'cosmique']
  };

  for (const [topic, keys] of Object.entries(keywords)) {
    if (keys.some(k => msgLower.includes(k))) {
      return topic;
    }
  }
  return null;
}

// Endpoint pour chat intelligent
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  try {
    const topic = extractTopic(message);
    let response = { reply: '', facts: [], expeditions: [] };

    // Si sujet astronomique détecté
    if (topic && astronomyDatabase[topic]) {
      const data = astronomyDatabase[topic];
      let reply = `🌟 **${data.name}**\n\n`;
      
      reply += '📚 **Faits clés:**\n' + data.facts.slice(0, 5).join('\n• ');
      
      if (data.expeditions) {
        reply += '\n\n🚀 **Expéditions et missions:**\n';
        data.expeditions.slice(0, 3).forEach(exp => {
          reply += `• ${exp.name} (${exp.year}): ${exp.details}\n`;
        });
        response.expeditions = data.expeditions;
      }

      if (data.life && message.toLowerCase().includes('vie')) {
        reply += `\n\n🔬 **Vie sur ${data.name}:**\n${data.life}`;
      }

      response.reply = reply;
      response.facts = data.facts;
      return res.json(response);
    }

    // Sinon utiliser le modèle IA pour questions générales
    const aiResponse = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 120000
      }
    );

    const data = aiResponse.data;
    let text = '';
    if (Array.isArray(data) && data.length > 0) {
      text = data.map(item => item.generated_text || item.text || '').join('\n').trim();
    } else if (typeof data === 'object' && data !== null) {
      text = data.generated_text || data.text || JSON.stringify(data);
    } else if (typeof data === 'string') {
      text = data;
    }

    response.reply = text || 'Je n\'ai pas pu générer une réponse.';
    res.json(response);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ 
      reply: 'Je suis désolé, je n\'ai pas pu répondre. Essayez une question différente!'
    });
  }
});

// Endpoint pour images
app.get('/api/image', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.status(400).json({ error: 'Missing query' });

  try {
    // Essayer Unsplash d'abord
    if (UNSPLASH_KEY) {
      try {
        const uRes = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: q, per_page: 1, orientation: 'landscape' },
          headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
          timeout: 10000
        });
        
        if (uRes.data && uRes.data.results && uRes.data.results.length > 0) {
          const img = uRes.data.results[0];
          const url = (img.urls && (img.urls.regular || img.urls.full)) || null;
          if (url) return res.json({ url, source: 'Unsplash' });
        }
      } catch (err) {
        console.warn('Unsplash failed:', err.message);
      }
    }

    // Ensuite Wikimedia Commons
    try {
      const fileSearch = await axios.get('https://commons.wikimedia.org/w/api.php', {
        params: {
          action: 'query', format: 'json', list: 'search', srsearch: q, 
          srnamespace: 6, srlimit: 1, origin: '*'
        },
        timeout: 10000
      });
      
      const sdata = fileSearch.data;
      if (sdata && sdata.query && sdata.query.search && sdata.query.search.length > 0) {
        const title = sdata.query.search[0].title;
        const info = await axios.get('https://commons.wikimedia.org/w/api.php', {
          params: { 
            action: 'query', format: 'json', prop: 'imageinfo', 
            titles: title, iiprop: 'url', origin: '*' 
          },
          timeout: 10000
        });
        
        const pages = info.data && info.data.query && info.data.query.pages;
        if (pages) {
          for (const pid in pages) {
            const p = pages[pid];
            if (p.imageinfo && p.imageinfo[0] && p.imageinfo[0].url) {
              return res.json({ url: p.imageinfo[0].url, source: 'Wikimedia Commons' });
            }
          }
        }
      }
    } catch (err) {
      console.warn('Commons failed:', err.message);
    }

    // Fallback placeholder
    res.json({ url: 'https://via.placeholder.com/400x300?text=Image+non+disponible' });

  } catch (err) {
    console.error('Image error:', err.message);
    res.status(500).json({ error: 'Image retrieval failed' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Chatbot Univers running on http://localhost:${PORT}`);
  console.log(`🎨 Unsplash API: ${UNSPLASH_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`🤖 AI Model: ${MODEL}`);
});
