#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || null;
const HF_TOKEN = process.env.HF_API_TOKEN || null;

console.log('\n🔍 TEST DES CLÉS API\n');
console.log('=' .repeat(50));

// ✅ TEST NASA API
async function testNasaAPI() {
  console.log('\n🚀 Test NASA API...');
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: NASA_API_KEY
      },
      timeout: 5000
    });
    console.log('✅ NASA API APOD: OK');
    console.log(`   Image: ${response.data.url.substring(0, 60)}...`);
  } catch (error) {
    console.log('❌ NASA API APOD: ERREUR');
    console.log(`   ${error.message}`);
  }

  try {
    const response = await axios.get('https://api.nasa.gov/search', {
      params: {
        q: 'mars',
        media_type: 'image',
        page_size: 1,
        api_key: NASA_API_KEY
      },
      timeout: 5000
    });
    console.log('✅ NASA API Images: OK');
    console.log(`   Résultats: ${response.data.collection.items.length}`);
  } catch (error) {
    console.log('❌ NASA API Images: ERREUR');
    console.log(`   ${error.message}`);
  }

  try {
    const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/latest_photos', {
      params: {
        api_key: NASA_API_KEY
      },
      timeout: 5000
    });
    console.log('✅ NASA Mars Rover: OK');
    console.log(`   Photos: ${response.data.latest_photos.length}`);
  } catch (error) {
    console.log('❌ NASA Mars Rover: ERREUR');
    console.log(`   ${error.message}`);
  }
}

// ✅ TEST UNSPLASH API
async function testUnsplashAPI() {
  console.log('\n🎨 Test Unsplash API...');
  if (!UNSPLASH_KEY) {
    console.log('⚠️ Unsplash API: Non configuré (optionnel)');
    return;
  }

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: 'aurora borealis',
        client_id: UNSPLASH_KEY,
        per_page: 1
      },
      timeout: 5000
    });
    console.log('✅ Unsplash API: OK');
    console.log(`   Résultats: ${response.data.results.length}`);
  } catch (error) {
    console.log('❌ Unsplash API: ERREUR');
    console.log(`   ${error.message}`);
  }
}

// ✅ TEST HUGGING FACE API
async function testHuggingFaceAPI() {
  console.log('\n🧠 Test Hugging Face API...');
  if (!HF_TOKEN) {
    console.log('⚠️ Hugging Face: Non configuré (optionnel)');
    return;
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/google/flan-t5-base',
      { inputs: 'What is astronomy?' },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`
        },
        timeout: 10000
      }
    );
    console.log('✅ Hugging Face API: OK');
    console.log(`   Réponse: ${response.data[0].generated_text.substring(0, 60)}...`);
  } catch (error) {
    console.log('❌ Hugging Face API: ERREUR');
    console.log(`   ${error.message}`);
  }
}

// ✅ WIKIPEDIA API (toujours disponible)
async function testWikipediaAPI() {
  console.log('\n📚 Test Wikipedia API...');
  try {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        titles: 'Mars',
        prop: 'extracts|pageimages',
        explaintext: true,
        exintro: true,
        piprop: 'thumbnail',
        pithumbsize: 500,
        format: 'json'
      },
      timeout: 5000
    });
    console.log('✅ Wikipedia API: OK');
    const pages = response.data.query.pages;
    const hasContent = Object.values(pages)[0].extract ? 'Oui' : 'Non';
    console.log(`   Contenu: ${hasContent}`);
  } catch (error) {
    console.log('❌ Wikipedia API: ERREUR');
    console.log(`   ${error.message}`);
  }
}

// ✅ RÉSUMÉ
async function summary() {
  console.log('\n' + '='.repeat(50));
  console.log('\n📊 RÉSUMÉ DES CLÉS API\n');
  console.log(`NASA_API_KEY: ${NASA_API_KEY === 'DEMO_KEY' ? '⚠️ DEMO_KEY' : '✅ Personnalisée'}`);
  console.log(`UNSPLASH_KEY: ${UNSPLASH_KEY ? '✅ Configurée' : '❌ Non configurée'}`);
  console.log(`HF_TOKEN: ${HF_TOKEN ? '✅ Configuré' : '❌ Non configuré'}`);
  console.log('\n' + '='.repeat(50) + '\n');
}

// ✅ EXÉCUTION
async function runTests() {
  await testNasaAPI();
  await testWikipediaAPI();
  await testUnsplashAPI();
  await testHuggingFaceAPI();
  await summary();
}

runTests().catch(console.error);
