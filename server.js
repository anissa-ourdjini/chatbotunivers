const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (front-end) depuis le dossier du projet
app.use(express.static(__dirname));


const HF_TOKEN = process.env.HF_API_TOKEN;
const MODEL = process.env.HF_MODEL || 'google/flan-t5-base';
const PORT = process.env.PORT || 3000;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || null;
const LOCAL_IMAGES_DIR = path.join(__dirname, 'unsplash_images');

if (!HF_TOKEN) {
  console.warn('Warning: HF_API_TOKEN not set. Set it in your .env file.');
}

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  try {
    const response = await axios.post(
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

    const data = response.data;

    let text = '';
    if (Array.isArray(data) && data.length > 0) {
      // common format: [{ generated_text: '...' }]
      text = data.map(item => item.generated_text || item.text || '').join('\n').trim();
    } else if (typeof data === 'object' && data !== null) {
      text = data.generated_text || data.text || JSON.stringify(data);
    } else if (typeof data === 'string') {
      text = data;
    }

    res.json({ reply: text });
  } catch (err) {
    console.error('Error calling HF Inference API:', err && err.toString());
    const details = err.response && err.response.data ? err.response.data : err.message;
    res.status(500).json({ error: 'Model request failed', details });
  }
});

// Endpoint to get a relevant image URL for a query.
// Tries Unsplash (if UNSPLASH_ACCESS_KEY provided), otherwise falls back to Wikimedia/Wikipedia.
app.get('/api/image', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.status(400).json({ error: 'Missing query parameter q' });

  try {
    // 0) If a local directory of Unsplash images exists, try to find a match by filename
    try {
      if (fs.existsSync(LOCAL_IMAGES_DIR)) {
        const files = fs.readdirSync(LOCAL_IMAGES_DIR);
        const qLower = q.toLowerCase();
        // Tokenize query and look for filename that contains any token (prefer best match)
        const tokens = qLower.split(/\s+/).filter(Boolean);
        // Score files by number of token matches
        let best = null;
        let bestScore = 0;
        for (const f of files) {
          const name = f.toLowerCase();
          let score = 0;
          for (const t of tokens) if (name.includes(t)) score++;
          if (name.includes(qLower)) score += 2; // boost when full query present
          if (score > bestScore) { bestScore = score; best = f; }
        }
        if (best && bestScore > 0) {
          // Serve from static route /unsplash_images/<filename>
          return res.json({ url: `/unsplash_images/${encodeURIComponent(best)}`, source: 'local' });
        }
      }
    } catch (err) {
      console.warn('Local images search failed:', err && err.toString());
    }
    // 1) Try Unsplash if key is available
    if (UNSPLASH_KEY) {
      try {
        const uRes = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: q, per_page: 1, orientation: 'landscape' },
          headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
          timeout: 10000
        });
        if (uRes.data && uRes.data.results && uRes.data.results.length > 0) {
          const img = uRes.data.results[0];
          // prefer urls.regular
          const url = (img.urls && (img.urls.regular || img.urls.full || img.urls.raw)) || null;
          const author = img.user && img.user.name ? img.user.name : null;
          const source = 'unsplash';
          if (url) return res.json({ url, source, author });
        }
      } catch (err) {
        console.warn('Unsplash request failed, falling back to Wikimedia:', err && err.toString());
      }
    }

    // 2) Try Commons file search (namespace 6)
    try {
      const fileSearch = await axios.get('https://commons.wikimedia.org/w/api.php', {
        params: {
          action: 'query', format: 'json', list: 'search', srsearch: q, srnamespace: 6, srlimit: 1, origin: '*'
        },
        timeout: 10000
      });
      const sdata = fileSearch.data;
      if (sdata && sdata.query && sdata.query.search && sdata.query.search.length > 0) {
        const title = sdata.query.search[0].title;
        const info = await axios.get('https://commons.wikimedia.org/w/api.php', {
          params: { action: 'query', format: 'json', prop: 'imageinfo', titles: title, iiprop: 'url', origin: '*' },
          timeout: 10000
        });
        const pages = info.data && info.data.query && info.data.query.pages;
        if (pages) {
          for (const pid in pages) {
            const p = pages[pid];
            if (p.imageinfo && p.imageinfo[0] && p.imageinfo[0].url) {
              return res.json({ url: p.imageinfo[0].url, source: 'commons' });
            }
          }
        }
      }
    } catch (err) {
      console.warn('Commons search failed:', err && err.toString());
    }

    // 3) Try Wikipedia pageimage thumbnail via English Wikipedia
    try {
      const pageSearch = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: { action: 'query', format: 'json', list: 'search', srsearch: q, srnamespace: 0, srlimit: 1, origin: '*' },
        timeout: 10000
      });
      const pdata = pageSearch.data;
      if (pdata && pdata.query && pdata.query.search && pdata.query.search.length > 0) {
        const pageTitle = pdata.query.search[0].title;
        const pageInfo = await axios.get('https://en.wikipedia.org/w/api.php', {
          params: { action: 'query', format: 'json', prop: 'pageimages', titles: pageTitle, pithumbsize: 800, origin: '*' },
          timeout: 10000
        });
        const pages = pageInfo.data && pageInfo.data.query && pageInfo.data.query.pages;
        if (pages) {
          for (const pid in pages) {
            const p = pages[pid];
            if (p.thumbnail && p.thumbnail.source) return res.json({ url: p.thumbnail.source, source: 'wikipedia' });
          }
        }
      }
    } catch (err) {
      console.warn('Wikipedia pageimage search failed:', err && err.toString());
    }

    // 4) Give up
    return res.status(404).json({ error: 'No image found' });
  } catch (err) {
    console.error('Image endpoint error:', err && err.toString());
    return res.status(500).json({ error: 'Internal error' });
  }
});

// Serve local Unsplash images directory if present
if (fs.existsSync(LOCAL_IMAGES_DIR)) {
  app.use('/unsplash_images', express.static(LOCAL_IMAGES_DIR));
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

