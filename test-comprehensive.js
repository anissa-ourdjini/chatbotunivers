/**
 * Test Complet du Chatbot Univers Amélioré
 * Teste les réponses, images, et faits astronomiques
 */

const http = require('http');

// Couleurs ANSI pour console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Test cases
const testCases = [
  {
    question: "Y a-t-il de la vie sur Mars?",
    expectedTopics: ['Mars', 'vie', 'expéditions'],
    expectedFields: ['reply', 'facts', 'expeditions']
  },
  {
    question: "Parle-moi de la Lune",
    expectedTopics: ['Lune', 'Apollo', 'alunissage'],
    expectedFields: ['reply', 'facts', 'expeditions']
  },
  {
    question: "Qu'est-ce que la Voie Lactée?",
    expectedTopics: ['Voie Lactée', 'galaxie', 'étoiles'],
    expectedFields: ['reply', 'facts']
  },
  {
    question: "Parle-moi de Jupiter",
    expectedTopics: ['Jupiter', 'géante', 'lunes'],
    expectedFields: ['reply', 'facts']
  },
  {
    question: "Comment fonctionne le Soleil?",
    expectedTopics: ['Soleil', 'fusion', 'hydrogène'],
    expectedFields: ['reply', 'facts']
  }
];

async function runTests() {
  console.log(`${colors.cyan}╔═══════════════════════════════════════════════╗`);
  console.log(`║  🧪 Test Chatbot Univers Amélioré             ║`);
  console.log(`╚═══════════════════════════════════════════════╝${colors.reset}\n`);

  let passedTests = 0;
  let failedTests = 0;

  for (const testCase of testCases) {
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`❓ Question: "${testCase.question}"`);
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    try {
      const response = await testQuestion(testCase.question);
      
      // Check response structure
      let testPassed = true;
      const issues = [];

      // Vérifier les champs
      for (const field of testCase.expectedFields) {
        if (!response.hasOwnProperty(field)) {
          testPassed = false;
          issues.push(`  ${colors.red}✗${colors.reset} Champ manquant: ${field}`);
        } else {
          console.log(`  ${colors.green}✓${colors.reset} ${field}: ${typeof response[field]}`);
        }
      }

      // Vérifier la réponse
      if (response.reply && response.reply.length > 10) {
        console.log(`  ${colors.green}✓${colors.reset} Réponse: ${response.reply.length} caractères`);
      } else {
        testPassed = false;
        issues.push(`  ${colors.red}✗${colors.reset} Réponse vide ou trop courte`);
      }

      // Vérifier les faits
      if (response.facts && Array.isArray(response.facts) && response.facts.length > 0) {
        console.log(`  ${colors.green}✓${colors.reset} Faits: ${response.facts.length} items`);
      } else if (testCase.expectedFields.includes('facts')) {
        console.log(`  ${colors.yellow}⚠${colors.reset} Pas de faits fournis`);
      }

      // Vérifier les expéditions
      if (response.expeditions && Array.isArray(response.expeditions) && response.expeditions.length > 0) {
        console.log(`  ${colors.green}✓${colors.reset} Expéditions: ${response.expeditions.length} items`);
      }

      // Afficher les résultats
      if (testPassed && issues.length === 0) {
        console.log(`\n${colors.green}✅ TEST RÉUSSI${colors.reset}\n`);
        passedTests++;
      } else {
        console.log(`\n${colors.red}❌ TEST ÉCHOUÉ${colors.reset}`);
        if (issues.length > 0) {
          issues.forEach(issue => console.log(issue));
        }
        console.log();
        failedTests++;
      }

    } catch (err) {
      console.log(`${colors.red}❌ ERREUR: ${err.message}${colors.reset}\n`);
      failedTests++;
    }
  }

  // Résumé
  console.log(`${colors.cyan}╔═══════════════════════════════════════════════╗`);
  console.log(`║  📊 Résumé des Tests                           ║`);
  console.log(`╚═══════════════════════════════════════════════╝${colors.reset}\n`);
  
  console.log(`${colors.green}Réussis: ${passedTests}/${testCases.length}${colors.reset}`);
  console.log(`${colors.red}Échoués: ${failedTests}/${testCases.length}${colors.reset}`);
  
  if (failedTests === 0) {
    console.log(`\n${colors.green}🎉 Tous les tests sont passés!${colors.reset}\n`);
  } else {
    console.log(`\n${colors.yellow}⚠️  Certains tests ont échoué. Vérifiez les erreurs ci-dessus.${colors.reset}\n`);
  }

  process.exit(failedTests > 0 ? 1 : 0);
}

async function testQuestion(question) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ message: question });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 30000
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (err) {
          reject(new Error(`Invalid JSON response: ${err.message}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`Request failed: ${err.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(postData);
    req.end();
  });
}

// Attendre que le serveur démarre
console.log(`${colors.yellow}Attente du serveur (2 secondes)...${colors.reset}\n`);

setTimeout(() => {
  runTests();
}, 2000);
