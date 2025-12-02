// Base de connaissances astronomiques
const astronomyKnowledge = {
    planetes: {
        mercure: {
            nom: "Mercure",
            description: "Mercure est la plus petite planète du système solaire et la plus proche du Soleil.",
            details: [
                "Distance du Soleil: 57,9 millions de km",
                "Diamètre: 4,879 km",
                "Température: de -173°C à 427°C",
                "Jour mercurien: 58,6 jours terrestres",
                "Année mercurienne: 87,97 jours terrestres",
                "Gravité: 3,7 m/s²",
                "Atmosphère: Quasi inexistante",
                "Particularité: Fait 3 rotations pour 2 révolutions autour du Soleil"
            ]
        },
        venus: {
            nom: "Vénus",
            description: "Vénus est la planète la plus chaude du système solaire malgré sa distance du Soleil.",
            details: [
                "Distance du Soleil: 108,2 millions de km",
                "Diamètre: 12,104 km",
                "Température: environ 464°C",
                "Jour vénusien: 243 jours terrestres",
                "Année vénusienne: 224,7 jours terrestres",
                "Gravité: 8,9 m/s²",
                "Atmosphère: CO2 dense avec nuages d'acide sulfurique",
                "Particularité: Tourne à l'envers (rétrograde)"
            ]
        },
        terre: {
            nom: "Terre",
            description: "La Terre est notre planète, l'unique endroit connu où existe la vie dans l'univers.",
            details: [
                "Distance du Soleil: 149,6 millions de km (1 UA)",
                "Diamètre: 12,742 km",
                "Température moyenne: 15°C",
                "Jour: 24 heures",
                "Année: 365,25 jours",
                "Gravité: 9,8 m/s²",
                "Atmosphère: N2 (78%), O2 (21%), autres gaz",
                "Particularité: Possède 1 satellite naturel (la Lune)"
            ]
        },
        mars: {
            nom: "Mars",
            description: "Mars est la planète rouge, objet de nombreuses missions d'exploration spatiale.",
            details: [
                "Distance du Soleil: 227,9 millions de km",
                "Diamètre: 6,779 km",
                "Température moyenne: -65°C",
                "Jour martien: 24,6 heures",
                "Année martienne: 687 jours terrestres",
                "Gravité: 3,7 m/s²",
                "Atmosphère: CO2 très fine",
                "Particularité: Possède 2 petites lunes (Phobos et Déimos)"
            ]
        },
        jupiter: {
            nom: "Jupiter",
            description: "Jupiter est la plus grande planète du système solaire, une géante gazeuse.",
            details: [
                "Distance du Soleil: 778,5 millions de km",
                "Diamètre: 139,820 km",
                "Température des nuages: -110°C",
                "Jour jovien: 9,9 heures",
                "Année jovienne: 11,86 années terrestres",
                "Gravité: 24,79 m/s²",
                "Atmosphère: Hydrogène et hélium",
                "Satellites: 95 lunes connues, dont les 4 galiléennes (Io, Europe, Ganymède, Callisto)"
            ]
        },
        saturne: {
            nom: "Saturne",
            description: "Saturne est célèbre pour ses magnifiques anneaux de glace et de roche.",
            details: [
                "Distance du Soleil: 1,434 milliards de km",
                "Diamètre: 116,460 km",
                "Température des nuages: -140°C",
                "Jour saturnien: 10,7 heures",
                "Année saturnienne: 29,46 années terrestres",
                "Gravité: 10,44 m/s²",
                "Anneaux: Composés principalement de glaçons",
                "Satellites: 146 lunes connues, dont Titan"
            ]
        },
        uranus: {
            nom: "Uranus",
            description: "Uranus est une géante de glace caractérisée par sa rotation très inclinée.",
            details: [
                "Distance du Soleil: 2,873 milliards de km",
                "Diamètre: 50,724 km",
                "Température: -195°C",
                "Jour uranien: 17,2 heures",
                "Année uranienne: 84 années terrestres",
                "Gravité: 8,87 m/s²",
                "Atmosphère: Hydrogène, hélium et méthane",
                "Particularité: Tourne sur son côté (inclinaison de 98°)"
            ]
        },
        neptune: {
            nom: "Neptune",
            description: "Neptune est la plus éloignée du système solaire et caractérisée par les vents les plus forts.",
            details: [
                "Distance du Soleil: 4,495 milliards de km",
                "Diamètre: 49,244 km",
                "Température: -200°C",
                "Jour neptunien: 16,1 heures",
                "Année neptunienne: 164,79 années terrestres",
                "Gravité: 11,15 m/s²",
                "Vents: Jusqu'à 2100 km/h",
                "Satellites: 16 lunes connues, dont Triton"
            ]
        }
    },
    concepts: {
        galaxie: "Une galaxie est un immense système constitué de milliards d'étoiles liées par la gravité. Notre galaxie, la Voie Lactée, contient environ 100-200 milliards d'étoiles.",
        etoile: "Une étoile est une boule de plasma maintenue en équilibre par la gravité. Elle brille par la fusion nucléaire de l'hydrogène en hélium.",
        trou_noir: "Un trou noir est une région de l'espace où la gravité est si intense qu'aucune matière, pas même la lumière, ne peut s'en échapper.",
        nebuleuse: "Une nébuleuse est un nuage de gaz et de poussière dans l'espace. C'est un lieu de formation des étoiles.",
        lune: "Une lune (satellite naturel) est un objet céleste qui orbite autour d'une planète. La Terre en possède une, nommée Lune.",
        constellation: "Une constellation est un groupe d'étoiles apparemment proches les unes des autres dans le ciel nocturne.",
        eclipse: "Une éclipse se produit quand un objet céleste en cache un autre. L'éclipse lunaire: la Terre se place entre le Soleil et la Lune.",
        comete: "Une comète est un petit objet gelé qui orbite le Soleil. En s'en rapprochant, elle développe une queue de gaz et de poussière.",
        asteroide: "Un astéroïde est un petit corps rocheux qui orbite le Soleil, généralement entre Mars et Jupiter.",
        anneau_planetaire: "Les anneaux planétaires sont des structures composées de glaçons, de rochers et de poussière qui orbitent une planète."
    },
    questions_frequentes: {
        "Combien de planètes": "Il y a 8 planètes dans notre système solaire: Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus et Neptune. Pluton a été reclassifiée en planète naine en 2006.",
        "Quelle est la plus grande": "Jupiter est la plus grande planète du système solaire, avec un diamètre de 139,820 km. Elle pourrait contenir 1,300 Terres!",
        "Quelle est la plus proche": "Mercure est la plus proche planète du Soleil, à une distance moyenne de 57,9 millions de km.",
        "Quelle est la plus éloignée": "Neptune est la plus éloignée du Soleil, à une distance moyenne de 4,495 milliards de km.",
        "Combien de lunes": "La Terre possède 1 lune. Jupiter en a 95, Saturne en a 146, Mars en a 2, et Mercure et Vénus n'en ont pas.",
        "Qu'est-ce que Pluton": "Pluton est une planète naine du système solaire, reclassifiée en 2006. Elle se trouve au-delà de l'orbite de Neptune, dans la ceinture de Kuiper.",
        "Quelle est l'âge du Soleil": "Le Soleil a environ 4,6 milliards d'années. Il en a environ 5 milliards avant de devenir une géante rouge.",
        "Combien de temps pour": "Mercure: 88 jours, Vénus: 225 jours, Terre: 365 jours, Mars: 687 jours, Jupiter: 11,9 ans, Saturne: 29,5 ans, Uranus: 84 ans, Neptune: 165 ans"
    }
};

// Fonction pour obtenir une réponse du chatbot
function getChatbotResponse(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Vérifications pour les planètes
    for (const [key, planet] of Object.entries(astronomyKnowledge.planetes)) {
        if (input.includes(key) || input.includes(planet.nom.toLowerCase())) {
            return `🪐 ${planet.nom}\n\n${planet.description}\n\nInformations clés:\n• ${planet.details.join('\n• ')}`;
        }
    }
    
    // Vérifications pour les concepts
    for (const [key, concept] of Object.entries(astronomyKnowledge.concepts)) {
        if (input.includes(key.replace(/_/g, ' ')) || input.includes(key.replace(/_/g, ''))) {
            return `✨ ${key.replace(/_/g, ' ').toUpperCase()}\n\n${concept}`;
        }
    }
    
    // Vérifications pour les questions fréquentes
    for (const [question, answer] of Object.entries(astronomyKnowledge.questions_frequentes)) {
        if (input.includes(question.toLowerCase().split(' ').pop())) {
            return `📚 ${answer}`;
        }
    }
    
    // Réponses génériques basées sur les mots-clés
    if (input.includes('soleil')) {
        return `☀️ LE SOLEIL\n\nLe Soleil est l'étoile au centre de notre système solaire. C'est une boule de plasma composée à 73% d'hydrogène et 25% d'hélium.\n\nFaits importants:\n• Diamètre: 1,391 million de km\n• Distance Terre-Soleil: 149,6 millions de km (1 UA)\n• Âge: 4,6 milliards d'années\n• Température de surface: 5 778 K\n• Puissance produite: 386 milliards de milliards de MW\n• Le Soleil contient 99,86% de la masse du système solaire entier`;
    }
    
    if (input.includes('lune') || input.includes('satellite')) {
        return `🌙 LA LUNE\n\nLa Lune est le satellite naturel de la Terre.\n\nFaits importants:\n• Diamètre: 3 474 km\n• Distance Terre-Lune: 384 400 km\n• Période orbitale: 27,3 jours\n• Surface couverte de cratères dues aux impacts de météorites\n• Responsable des marées sur Terre\n• Première destination humaine dans l'espace (Apollo 11, 1969)`;
    }
    
    if (input.includes('univers') || input.includes('cosmos')) {
        return `🌌 L'UNIVERS\n\nL'univers est l'ensemble de tout ce qui existe: matière, énergie, espace et temps.\n\nInformations fascinantes:\n• Âge estimé: 13,8 milliards d'années\n• Diamètre observable: 93 milliards de lumière-années\n• Contient 100-200 milliards de galaxies\n• Chaque galaxie contient environ 100-200 milliards d'étoiles\n• Se dilate continuellement\n• La majorité est composée de matière sombre (85%)`;
    }
    
    if (input.includes('système solaire')) {
        return `☀️ SYSTÈME SOLAIRE\n\nNotre système solaire comprend:\n\n• Le Soleil (étoile centrale)\n• 8 Planètes: Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune\n• Planètes naines: Pluton, Eris, et autres\n• Centaines de lunes\n• Milliards d'astéroïdes\n• Comètes de la ceinture de Kuiper\n\nFormé il y a 4,6 milliards d'années à partir d'un nuage de gaz et de poussière.`;
    }
    
    if (input.includes('voie lactée')) {
        return `🌀 LA VOIE LACTÉE\n\nLa Voie Lactée est notre galaxie spirale.\n\nCaractéristiques:\n• Type: Galaxie spirale barrée\n• Diamètre: 100 000-180 000 années-lumière\n• Épaisseur: 1 000 années-lumière\n• Nombre d'étoiles: 100-200 milliards\n• Âge: 13,6 milliards d'années\n• Noyau: Trou noir supermassif (Sagittarius A*)\n• Notre Soleil: En orbite à 26 000 années-lumière du centre\n• Période orbitale complète: 225-250 millions d'années`;
    }
    
    if (input.includes('trou noir')) {
        return `⚫ TROU NOIR\n\nUn trou noir est une région de l'espace où la gravité est si puissante que rien ne peut s'en échapper.\n\nCaractéristiques:\n• Se forme après la mort d'une étoile massive\n• Horizon des événements: Point de non-retour\n• Singularité: Concentration infinie de masse\n• Espace-temps extrêmement courbé\n• Les trous noirs peuvent avoir différentes tailles\n• Deux types: trous noirs stellaires et supermassifs\n• Exemple: Sagittarius A* au centre de la Voie Lactée`;
    }
    
    if (input.includes('galaxie')) {
        return `🌀 GALAXIES\n\nUne galaxie est un immense système gravitationnel regroupant étoiles, gaz et poussière.\n\nTypes de galaxies:\n• SPIRALES: Bras rotatifs (comme la Voie Lactée)\n• ELLIPTIQUES: Forme ovoïde\n• IRRÉGULIÈRES: Pas de forme définie\n• LENTICULAIRES: Entre spirale et elliptique\n\nFaits fascinants:\n• L'univers contient 100-200 milliards de galaxies\n• Chaque galaxie contient 100-200 milliards d'étoiles\n• Les plus grandes galaxies s'étendent sur 6 millions d'années-lumière\n• Andromède, la galaxie spirale la plus proche, est à 2,5 millions d'années-lumière`;
    }
    
    if (input.includes('étoile') || input.includes('star')) {
        return `⭐ LES ÉTOILES\n\nUne étoile est une boule de plasma maintenue en équilibre par la gravité.\n\nComposition:\n• Hydrogène: 73%\n• Hélium: 25%\n• Métaux lourds: 2%\n\nCycle de vie:\n1. Formation à partir d'un nuage de gaz\n2. Fusion nucléaire (jeunesse)\n3. Géante rouge (fin de vie)\n4. Naine blanche ou supernova\n\nNos voisins stellaires:\n• Proxima Centauri: 4,24 années-lumière\n• Sirius: 8,6 années-lumière\n• Rigel, Bételgeuse, Canopus...`;
    }
    
    // Réponse par défaut
    return `Je suis désolé, je n'ai pas trouvé d'informations précises sur votre question. 🤔\n\nJe peux vous parler de:\n• Les 8 planètes du système solaire\n• Le Soleil, la Lune, et les satellites\n• Les galaxies et l'univers\n• Les étoiles et les phénomènes célestes\n• La Voie Lactée et les concepts d'astronomie\n\nN'hésitez pas à reformuler votre question!`;
}

// Gestion du chat
function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return;
    
    // Afficher le message utilisateur
    addMessageToChat(userInput, 'user');
    document.getElementById('userInput').value = '';
    
    // Simuler une réaction de saisie
    setTimeout(() => {
        const response = getChatbotResponse(userInput);
        addMessageToChat(response, 'bot');
    }, 500);
}

function askQuestion(question) {
    document.getElementById('userInput').value = question;
    sendMessage();
}

function addMessageToChat(message, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Gestion de l'envoi
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});

// Gestion des onglets
function showTab(tabName) {
    // Cacher tous les contenus
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    
    // Désactiver tous les boutons
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    // Afficher le bon onglet
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Gestion des informations de planète
const planetInfo = {
    mercure: {
        nom: "Mercure",
        image: "☿️",
        info: `<h2>☿️ Mercure</h2>
        <p><strong>La plus petite et la plus rapide</strong></p>
        <p>Mercure est la plus petite planète du système solaire et la plus proche du Soleil. Elle est ainsi extrêmement rapide dans son orbite.</p>
        <h3>Caractéristiques principales:</h3>
        <ul>
            <li><strong>Distance du Soleil:</strong> 57,9 millions de km</li>
            <li><strong>Diamètre:</strong> 4,879 km</li>
            <li><strong>Masse:</strong> 0,330 fois celle de la Terre</li>
            <li><strong>Température:</strong> -173°C à 427°C</li>
            <li><strong>Jour:</strong> 58,6 jours terrestres</li>
            <li><strong>Année:</strong> 87,97 jours terrestres</li>
            <li><strong>Lunes:</strong> 0</li>
            <li><strong>Atmosphère:</strong> Quasi inexistante</li>
        </ul>
        <h3>Particularités:</h3>
        <p>Mercure est la seule planète du système solaire qui ne possède pas d'atmosphère. Elle effectue 3 rotations pour 2 révolutions autour du Soleil (résonance 3:2). Son nom vient du dieu romain du commerce.</p>`
    },
    venus: {
        nom: "Vénus",
        image: "♀️",
        info: `<h2>♀️ Vénus</h2>
        <p><strong>La planète la plus chaude</strong></p>
        <p>Vénus est plus chaude que Mercure malgré sa distance accrue du Soleil, en raison d'un effet de serre catastrophique.</p>
        <h3>Caractéristiques principales:</h3>
        <ul>
            <li><strong>Distance du Soleil:</strong> 108,2 millions de km</li>
            <li><strong>Diamètre:</strong> 12,104 km</li>
            <li><strong>Masse:</strong> 0,815 fois celle de la Terre</li>
            <li><strong>Température:</strong> Environ 464°C en moyenne</li>
            <li><strong>Jour:</strong> 243 jours terrestres</li>
            <li><strong>Année:</strong> 224,7 jours terrestres</li>
            <li><strong>Lunes:</strong> 0</li>
            <li><strong>Atmosphère:</strong> CO2 dense avec acide sulfurique</li>
        </ul>
        <h3>Particularités:</h3>
        <p>Vénus tourne à l'envers (rétrograde) comparée aux autres planètes. Son jour est plus long que son année! La pression atmosphérique est 92 fois celle de la Terre.</p>`
    },
    terre: {
        nom: "Terre",
        image: "🌍",
        info: `<h2>🌍 Terre</h2>
        <p><strong>Notre maison dans l'univers</strong></p>
        <p>La Terre est la seule planète connue pour abriter une vie diverse et riche. Elle possède une atmosphère propice à la vie et une température modérée.</p>
        <h3>Caractéristiques principales:</h3>
        <ul>
            <li><strong>Distance du Soleil:</strong> 149,6 millions de km (1 UA)</li>
            <li><strong>Diamètre:</strong> 12,742 km</li>
            <li><strong>Masse:</strong> 5,972 × 10²⁴ kg</li>
            <li><strong>Température moyenne:</strong> 15°C</li>
            <li><strong>Jour:</strong> 24 heures (exactement 23h 56min 4s)</li>
            <li><strong>Année:</strong> 365,25 jours</li>
            <li><strong>Lunes:</strong> 1 (la Lune)</li>
            <li><strong>Atmosphère:</strong> N₂ 78%, O₂ 21%, autres 1%</li>
        </ul>
        <h3>Particularités:</h3>
        <p>La Terre est la seule planète avec de l'eau liquide en abondance. Son atmosphère riche en oxygène soutient la vie telle que nous la connaissons. Elle possède une seule lune qui stabilise son axe de rotation.</p>`
    },
    mars: {
        nom: "Mars",
        image: "♂️",
        info: `<h2>♂️ Mars</h2>
        <p><strong>La planète rouge, objectif de l'exploration spatiale</strong></p>
        <p>Mars est la cible principale de la future colonisation spatiale. Des traces d'eau ancienne ont été découvertes à sa surface.</p>
        <h3>Caractéristiques principales:</h3>
        <ul>
            <li><strong>Distance du Soleil:</strong> 227,9 millions de km</li>
            <li><strong>Diamètre:</strong> 6,779 km</li>
            <li><strong>Masse:</strong> 0,107 fois celle de la Terre</li>
            <li><strong>Température moyenne:</strong> -65°C</li>
            <li><strong>Jour martien:</strong> 24,6 heures (très proche du jour terrestre!)</li>
            <li><strong>Année martienne:</strong> 687 jours terrestres</li>
            <li><strong>Lunes:</strong> 2 (Phobos et Déimos)</li>
            <li><strong>Atmosphère:</strong> CO₂ très fine (1% de celle de la Terre)</li>
        </ul>
        <h3>Particularités:</h3>
        <p>Mars tire sa couleur rouge de l'oxyde de fer (rouille) présent à sa surface. Son jour est presque identique au jour terrestre, ce qui en fait un candidat favorable pour la colonisation. Des rovers explorent actuellement sa surface.</p>`
    },
    jupiter: {
        nom: "Jupiter",
        image: "♃",
        info: `<h2>♃ Jupiter</h2>
        <p><strong>La géante gazeuse, reine du système solaire</strong></p>
        <p>Jupiter est la plus grande planète du système solaire. Elle pourrait contenir 1,300 Terres! Son atmosphère turbulente crée des tempêtes gigantesques.</p>
        <h3>Caractéristiques principales:</h3>
        <ul>
            <li><strong>Distance du Soleil:</strong> 778,5 millions de km</li>
            <li><strong>Diamètre:</strong> 139,820 km (11 fois celui de la Terre)</li>
            <li><strong>Masse:</strong> 317,8 fois celle de la Terre</li>
            <li><strong>Température des nuages:</strong> -110°C</li>
            <li><strong>Jour jovien:</strong> 9,9 heures (rotation très rapide)</li>
            <li><strong>Année jovienne:</strong> 11,86 années terrestres</li>
            <li><strong>Lunes:</strong> 95 lunes connues</li>
            <li><strong>Atmosphère:</strong> 90% H₂, 10% He</li>
        </ul>
        <h3>Particularités:</h3>
        <p>La Grande Tache Rouge de Jupiter est une tempête qui dure depuis au moins 300 ans! Les 4 plus grandes lunes (Io, Europe, Ganymède, Callisto) sont aussi grandes que des planètes terrestres.</p>`
    },
    saturne: {
        nom: "Saturne",
        image: "♄",
        info: `<h2>♄ Saturne</h2>
        <p><strong>La planète aux anneaux spectaculaires</strong></p>
        <p>Saturne est célèbre pour ses magnifiques anneaux composés de glaçons et de rochers. Ces anneaux s'étendent sur des centaines de milliers de kilomètres.</p>
        <h3>Caractéristiques principales:</h3>
        <ul>
            <li><strong>Distance du Soleil:</strong> 1,434 milliards de km</li>
            <li><strong>Diamètre:</strong> 116,460 km (9 fois celui de la Terre)</li>
            <li><strong>Masse:</strong> 95,2 fois celle de la Terre</li>
            <li><strong>Température des nuages:</strong> -140°C</li>
            <li><strong>Jour saturnien:</strong> 10,7 heures</li>
            <li><strong>Année saturnienne:</strong> 29,46 années terrestres</li>
            <li><strong>Lunes:</strong> 146 lunes connues</li>
            <li><strong>Anneaux:</strong> Composés principalement de glaçons</li>
        </ul>
        <h3>Particularités:</h3>
        <p>Les anneaux de Saturne sont les structures les plus spectaculaires du système solaire. Titan, la plus grande lune, possède une atmosphère épaisse et des lacs d'hydrocarbures liquides à sa surface.</p>`
    },
    uranus: {
        nom: "Uranus",
        image: "♅",
        info: `<h2>♅ Uranus</h2>
        <p><strong>La géante de glace qui roule</strong></p>
        <p>Uranus est unique car elle tourne sur son côté. Son axe de rotation est incliné à 98°, probablement à cause d'une collision ancienne.</p>
        <h3>Caractéristiques principales:</h3>
        <ul>
            <li><strong>Distance du Soleil:</strong> 2,873 milliards de km</li>
            <li><strong>Diamètre:</strong> 50,724 km</li>
            <li><strong>Masse:</strong> 14,5 fois celle de la Terre</li>
            <li><strong>Température:</strong> -195°C</li>
            <li><strong>Jour uranien:</strong> 17,2 heures</li>
            <li><strong>Année uranienne:</strong> 84 années terrestres</li>
            <li><strong>Lunes:</strong> 28 lunes connues</li>
            <li><strong>Atmosphère:</strong> H₂, He et CH₄ (méthane)</li>
        </ul>
        <h3>Particularités:</h3>
        <p>Uranus présente une teinte bleu-vert à cause du méthane de son atmosphère. Sa rotation très inclinée (98°) en ferait une géante de glace roulant autour du Soleil. Elle possède aussi des anneaux, mais bien moins visibles que ceux de Saturne.</p>`
    },
    neptune: {
        nom: "Neptune",
        image: "♆",
        info: `<h2>♆ Neptune</h2>
        <p><strong>La plus éloignée et la plus venteuse</strong></p>
        <p>Neptune est la planète la plus éloignée de notre système solaire. Elle est caractérisée par les vents les plus forts jamais mesurés (jusqu'à 2100 km/h).</p>
        <h3>Caractéristiques principales:</h3>
        <ul>
            <li><strong>Distance du Soleil:</strong> 4,495 milliards de km</li>
            <li><strong>Diamètre:</strong> 49,244 km</li>
            <li><strong>Masse:</strong> 17 fois celle de la Terre</li>
            <li><strong>Température:</strong> -200°C</li>
            <li><strong>Jour neptunien:</strong> 16,1 heures</li>
            <li><strong>Année neptunienne:</strong> 164,79 années terrestres</li>
            <li><strong>Lunes:</strong> 16 lunes connues</li>
            <li><strong>Vents:</strong> Jusqu'à 2100 km/h</li>
        </ul>
        <h3>Particularités:</h3>
        <p>Neptune a une teinte bleu profond due au méthane de son atmosphère. C'est la planète la plus venteuse du système solaire avec des tempêtes gigantesques. Triton, sa plus grande lune, orbite en direction rétrograde et possède des geysers d'azote.</p>`
    }
};

function showPlanetInfo(planetName) {
    const modal = document.getElementById('planetInfoModal');
    const content = document.getElementById('planetInfoContent');
    
    if (planetInfo[planetName]) {
        content.innerHTML = planetInfo[planetName].info;
        modal.style.display = 'block';
    }
}

function closePlanetInfo() {
    document.getElementById('planetInfoModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('planetInfoModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
