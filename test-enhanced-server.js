// Test script for enhanced server
const http = require('http');

const testQuestions = [
  "Y a-t-il de la vie sur Mars?",
  "Parle-moi de la Lune",
  "Qu'est-ce que la Voie Lactée?",
  "Comment s'appelle le plus grand volcan du système solaire?"
];

async function testServer() {
  console.log('🧪 Testing Enhanced Server...\n');

  for (const question of testQuestions) {
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question })
      });

      if (!response.ok) {
        console.log(`❌ ${question}: Status ${response.status}`);
        continue;
      }

      const data = await response.json();
      console.log(`✅ ${question}`);
      console.log(`   Reply length: ${data.reply.length} chars`);
      if (data.facts) console.log(`   Facts: ${data.facts.length} items`);
      if (data.expeditions) console.log(`   Expeditions: ${data.expeditions.length} items`);
      console.log();

    } catch (err) {
      console.log(`❌ ${question}: ${err.message}`);
    }
  }

  console.log('\n✨ Test complete!');
}

// Wait for server to start
setTimeout(testServer, 2000);
