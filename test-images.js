#!/usr/bin/env node

/**
 * Test Script for Chatbot Univers Explorer
 * Vérifie que toutes les réponses ont une image
 */

// Base de données de test
const testQueries = [
    // Questions sur les planètes
    "Parle-moi de Mars",
    "Qu'est-ce que Jupiter?",
    "Vénus est comment?",
    "Mercure",
    "Saturne",
    
    // Questions sur les concepts
    "Qu'est-ce qu'une galaxie?",
    "Qu'est-ce qu'un trou noir?",
    "Comment se forment les étoiles?",
    "Qu'est-ce qu'une nébuleuse?",
    "Parle-moi de la Lune",
    
    // Questions fréquentes
    "Combien de planètes dans le système solaire?",
    "Quelle est la planète la plus grande?",
    "Quel est l'âge du Soleil?",
    "Qu'est-ce que Pluton?",
    
    // Questions génériques
    "Parle-moi du Soleil",
    "Qu'est-ce que l'univers?",
    "Qu'est-ce que la Voie Lactée?",
    "Comment fonctionne une éclipse?",
    "Qu'est-ce qu'une comète?",
    
    // Questions spéciales (peuvent ne pas être dans la base)
    "Quel est le plus grand astéroïde?",
    "Combien y a-t-il d'étoiles dans l'univers?",
    "Que sais-tu sur les exoplanètes?",
    "Parle-moi de la gravité",
    "Que sais-tu sur les éclipses totales?"
];

console.log('🧪 Test du Chatbot Univers Explorer\n');
console.log(`📝 ${testQueries.length} questions à tester\n`);

let passed = 0;
let failed = 0;

// Fonction pour tester une question
async function testQuery(query) {
    try {
        console.log(`🔍 Test: "${query}"`);
        
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: query })
        });
        
        if (!response.ok) {
            console.log(`   ❌ Erreur HTTP: ${response.status}\n`);
            failed++;
            return;
        }
        
        const data = await response.json();
        
        // Vérifier que nous avons une réponse
        if (!data.reply) {
            console.log(`   ❌ Pas de reply\n`);
            failed++;
            return;
        }
        
        // Vérifier que nous avons une image
        if (!data.image) {
            console.log(`   ❌ Pas d'image`);
            console.log(`   ✅ Réponse: ${data.reply.substring(0, 50)}...\n`);
            failed++;
            return;
        }
        
        // Vérifier le format de l'image
        let imageUrl = null;
        if (typeof data.image === 'string') {
            imageUrl = data.image;
        } else if (typeof data.image === 'object' && data.image.url) {
            imageUrl = data.image.url;
        }
        
        if (!imageUrl) {
            console.log(`   ❌ Image malformée\n`);
            failed++;
            return;
        }
        
        // Succès
        console.log(`   ✅ Réponse: ${data.reply.substring(0, 40)}...`);
        console.log(`   🖼️ Image: ${imageUrl.substring(0, 60)}...`);
        if (data.image && data.image.source) {
            console.log(`   📷 Source: ${data.image.source}`);
        }
        console.log();
        passed++;
        
    } catch (err) {
        console.log(`   ❌ Erreur: ${err.message}\n`);
        failed++;
    }
}

// Exécuter les tests
async function runTests() {
    for (const query of testQueries) {
        await testQuery(query);
        // Attendre un peu entre les requêtes
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Résultats
    console.log('\n' + '='.repeat(60));
    console.log('📊 Résultats du Test');
    console.log('='.repeat(60));
    console.log(`✅ Réussis: ${passed}/${testQueries.length}`);
    console.log(`❌ Échoués: ${failed}/${testQueries.length}`);
    console.log(`📈 Taux de réussite: ${Math.round(passed/testQueries.length*100)}%`);
    
    if (failed === 0) {
        console.log('\n🎉 Tous les tests sont passés!');
    } else {
        console.log(`\n⚠️ ${failed} test(s) échoué(s)`);
    }
    
    process.exit(failed > 0 ? 1 : 0);
}

// Vérifier que le serveur est accessible
fetch('http://localhost:3000')
    .then(() => {
        console.log('✅ Serveur accessible\n');
        runTests();
    })
    .catch(() => {
        console.log('❌ Serveur non accessible!');
        console.log('   Assurez-vous que le serveur tourne: npm start\n');
        process.exit(1);
    });
