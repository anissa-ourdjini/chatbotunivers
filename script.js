// Base de connaissances astronomiques avec images
const astronomyKnowledge = {
    planetes: {
        mercure: {
            nom: "Mercure",
            description: "Mercure est la plus petite planète du système solaire et la plus proche du Soleil.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_real_color.jpg/400px-Mercury_in_real_color.jpg",
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/400px-Venus-real_color.jpg",
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_ISS.jpg/400px-The_Earth_seen_from_ISS.jpg",
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/400px-OSIRIS_Mars_true_color.jpg",
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/400px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/400px-Saturn_during_Equinox.jpg",
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/400px-Uranus2.jpg",
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829033445845%29_flatten_q98.jpg/400px-Neptune_-_Voyager_2_%2829033445845%29_flatten_q98.jpg",
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
        galaxie: {
            text: "Une galaxie est un immense système constitué de milliards d'étoiles liées par la gravité. Notre galaxie, la Voie Lactée, contient environ 100-200 milliards d'étoiles.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Andromeda_galaxy.jpg/400px-Andromeda_galaxy.jpg"
        },
        etoile: {
            text: "Une étoile est une boule de plasma maintenue en équilibre par la gravité. Elle brille par la fusion nucléaire de l'hydrogène en hélium.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Etoiles.jpg/400px-Etoiles.jpg"
        },
        trou_noir: {
            text: "Un trou noir est une région de l'espace où la gravité est si intense qu'aucune matière, pas même la lumière, ne peut s'en échapper.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Black_hole_-_simulation.jpg/400px-Black_hole_-_simulation.jpg"
        },
        nebuleuse: {
            text: "Une nébuleuse est un nuage de gaz et de poussière dans l'espace. C'est un lieu de formation des étoiles.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pillars_of_creation.jpg/400px-Pillars_of_creation.jpg"
        },
        lune: {
            text: "Une lune (satellite naturel) est un objet céleste qui orbite autour d'une planète. La Terre en possède une, nommée Lune.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/400px-FullMoon2010.jpg"
        },
        constellation: {
            text: "Une constellation est un groupe d'étoiles apparemment proches les unes des autres dans le ciel nocturne.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Orion_Nebula_-_Hubble_2006_Full_res.jpg/400px-Orion_Nebula_-_Hubble_2006_Full_res.jpg"
        },
        eclipse: {
            text: "Une éclipse se produit quand un objet céleste en cache un autre. L'éclipse lunaire: la Terre se place entre le Soleil et la Lune.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/2017_Solar_Eclipse_%2833701274935%29.jpg/400px-2017_Solar_Eclipse_%2833701274935%29.jpg"
        },
        comete: {
            text: "Une comète est un petit objet gelé qui orbite le Soleil. En s'en rapprochant, elle développe une queue de gaz et de poussière.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Comet_Hale-Bopp.jpg/400px-Comet_Hale-Bopp.jpg"
        },
        asteroide: {
            text: "Un astéroïde est un petit corps rocheux qui orbite le Soleil, généralement entre Mars et Jupiter.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Eros_from_NEAR_Shoemaker.jpg/400px-Eros_from_NEAR_Shoemaker.jpg"
        },
        anneau_planetaire: {
            text: "Les anneaux planétaires sont des structures composées de glaçons, de rochers et de poussière qui orbitent une planète.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/400px-Saturn_during_Equinox.jpg"
        }
    },
    questions_frequentes: {
        "Combien de planètes": {
            text: "Il y a 8 planètes dans notre système solaire: Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus et Neptune. Pluton a été reclassifiée en planète naine en 2006.",
            image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop"
        },
        "Quelle est la plus grande": {
            text: "Jupiter est la plus grande planète du système solaire, avec un diamètre de 139,820 km. Elle pourrait contenir 1,300 Terres!",
            image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop"
        },
        "Quelle est la plus proche": {
            text: "Mercure est la plus proche planète du Soleil, à une distance moyenne de 57,9 millions de km.",
            image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop"
        },
        "Quelle est la plus éloignée": {
            text: "Neptune est la plus éloignée du Soleil, à une distance moyenne de 4,495 milliards de km.",
            image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&h=300&fit=crop"
        },
        "Combien de lunes": {
            text: "La Terre possède 1 lune. Jupiter en a 95, Saturne en a 146, Mars en a 2, et Mercure et Vénus n'en ont pas.",
            image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop"
        },
        "Qu'est-ce que Pluton": {
            text: "Pluton est une planète naine du système solaire, reclassifiée en 2006. Elle se trouve au-delà de l'orbite de Neptune, dans la ceinture de Kuiper.",
            image: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=400&h=300&fit=crop"
        },
        "Quelle est l'âge du Soleil": {
            text: "Le Soleil a environ 4,6 milliards d'années. Il en a environ 5 milliards avant de devenir une géante rouge.",
            image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
        },
        "Combien de temps pour": {
            text: "Mercure: 88 jours, Vénus: 225 jours, Terre: 365 jours, Mars: 687 jours, Jupiter: 11,9 ans, Saturne: 29,5 ans, Uranus: 84 ans, Neptune: 165 ans",
            image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop"
        },
        "Quelle est la température": {
            text: "Les températures varient énormément: Mercure: 427°C, Vénus: 464°C, Terre: 15°C, Mars: -65°C, Jupiter: -110°C, Saturne: -140°C, Uranus: -195°C, Neptune: -200°C",
            image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop"
        },
        "Comment se forment les étoiles": {
            text: "Les étoiles se forment dans les nébuleuses, à partir de nuages de gaz et de poussière. Sous l'effet de la gravité, ces nuages s'effondrent et se condensent jusqu'à amorcer la fusion nucléaire.",
            image: "https://images.unsplash.com/photo-1542173159-c1c4a4d5b2c5?w=400&h=300&fit=crop"
        },
        "Qu'est-ce que la Voie Lactée": {
            text: "La Voie Lactée est notre galaxie spirale contenant environ 100-200 milliards d'étoiles. Le Soleil se situe à environ 26,000 années-lumière du centre galactique.",
            image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
        },
        "Qu'est-ce qu'un trou noir": {
            text: "Un trou noir est une région de l'espace-temps où la gravité est si intense qu'aucune matière, pas même la lumière, ne peut s'en échapper après franchir son horizon.",
            image: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=400&h=300&fit=crop"
        }
    }
};

// Fonction pour calculer la similarité entre deux strings
function calculateSimilarity(str1, str2) {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();
    
    if (s1 === s2) return 1;
    
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    
    if (longer.length === 0) return 1;
    
    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

// Calcul de la distance de Levenshtein
function getEditDistance(s1, s2) {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) costs[j] = j;
            else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

// Fonction pour obtenir une réponse du chatbot avec meilleure correspondance et images
function getChatbotResponse(userInput) {
    const input = userInput.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;
    let bestResponse = null;
    let bestImage = null;
    
    // Vérifications pour les planètes
    for (const [key, planet] of Object.entries(astronomyKnowledge.planetes)) {
        const keyScore = Math.max(
            input.includes(key) ? 1 : calculateSimilarity(input, key),
            input.includes(planet.nom.toLowerCase()) ? 1 : calculateSimilarity(input, planet.nom.toLowerCase())
        );
        
        if (keyScore > 0.5 && keyScore > bestScore) {
            bestScore = keyScore;
            bestResponse = `🪐 ${planet.nom}\n\n${planet.description}\n\nInformations clés:\n• ${planet.details.join('\n• ')}`;
            bestImage = planet.image;
        }
    }
    
    // Vérifications pour les concepts
    for (const [key, concept] of Object.entries(astronomyKnowledge.concepts)) {
        const keyScore = Math.max(
            input.includes(key.replace(/_/g, ' ')) ? 1 : calculateSimilarity(input, key.replace(/_/g, ' ')),
            input.includes(key.replace(/_/g, '')) ? 1 : calculateSimilarity(input, key.replace(/_/g, ''))
        );
        
        if (keyScore > 0.5 && keyScore > bestScore) {
            bestScore = keyScore;
            bestResponse = `✨ ${key.replace(/_/g, ' ').toUpperCase()}\n\n${concept.text}`;
            bestImage = concept.image;
        }
    }
    
    // Vérifications pour les questions fréquentes
    for (const [question, answer] of Object.entries(astronomyKnowledge.questions_frequentes)) {
        const questionScore = calculateSimilarity(input, question);
        if (questionScore > 0.4 && questionScore > bestScore) {
            bestScore = questionScore;
            bestResponse = `📚 ${answer.text}`;
            bestImage = answer.image;
        }
    }
    
    // Réponses génériques basées sur les mots-clés avec meilleure détection
    const keywords = {
        'soleil': {
            text: `☀️ LE SOLEIL\n\nLe Soleil est l'étoile au centre de notre système solaire. C'est une boule de plasma composée à 73% d'hydrogène et 25% d'hélium.\n\nFaits importants:\n• Diamètre: 1,391 million de km\n• Distance Terre-Soleil: 149,6 millions de km (1 UA)\n• Âge: 4,6 milliards d'années\n• Température de surface: 5 778 K\n• Puissance produite: 386 milliards de milliards de MW\n• Le Soleil contient 99,86% de la masse du système solaire entier`,
            image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop'
        },
        'lune': {
            text: `🌙 LA LUNE\n\nLa Lune est le satellite naturel de la Terre.\n\nFaits importants:\n• Diamètre: 3 474 km\n• Distance Terre-Lune: 384 400 km\n• Période orbitale: 27,3 jours\n• Surface couverte de cratères dues aux impacts de météorites\n• Responsable des marées sur Terre\n• Première destination humaine dans l'espace (Apollo 11, 1969)`,
            image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop'
        },
        'satellite': {
            text: `🌙 SATELLITES\n\nLes satellites naturels sont des objets célestes qui orbitent autour des planètes. La Terre en possède une (la Lune), Mars en a deux (Phobos et Déimos), tandis que Jupiter en a 95 et Saturne en a 146.`,
            image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop'
        },
        'univers': {
            text: `🌌 L'UNIVERS\n\nL'univers est l'ensemble de tout ce qui existe: matière, énergie, espace et temps.\n\nInformations fascinantes:\n• Âge estimé: 13,8 milliards d'années\n• Diamètre observable: 93 milliards de lumière-années\n• Contient 100-200 milliards de galaxies\n• Chaque galaxie contient environ 100-200 milliards d'étoiles\n• Se dilate continuellement\n• La majorité est composée de matière sombre (85%)`,
            image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop'
        },
        'cosmos': {
            text: `🌌 LE COSMOS\n\nLe cosmos est un autre terme pour désigner l'univers dans son ensemble - tout ce qui existe, des galaxies aux atomes.`,
            image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop'
        },
        'système solaire': {
            text: `☀️ SYSTÈME SOLAIRE\n\nNotre système solaire comprend:\n\n• Le Soleil (étoile centrale)\n• 8 Planètes: Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune\n• Planètes naines: Pluton, Eris, et autres\n• Centaines de lunes\n• Milliards d'astéroïdes\n• Comètes de la ceinture de Kuiper\n\nFormé il y a 4,6 milliards d'années à partir d'un nuage de gaz et de poussière.`,
            image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop'
        },
        'voie lactée': {
            text: `🌀 LA VOIE LACTÉE\n\nLa Voie Lactée est notre galaxie spirale.\n\nCaractéristiques:\n• Type: Galaxie spirale barrée\n• Diamètre: 100 000-180 000 années-lumière\n• Épaisseur: 1 000 années-lumière\n• Nombre d'étoiles: 100-200 milliards\n• Âge: 13,6 milliards d'années\n• Noyau: Trou noir supermassif (Sagittarius A*)\n• Notre Soleil: En orbite à 26 000 années-lumière du centre\n• Période orbitale complète: 225-250 millions d'années`,
            image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop'
        },
        'trou noir': {
            text: `⚫ TROU NOIR\n\nUn trou noir est une région de l'espace où la gravité est si puissante que rien ne peut s'en échapper.\n\nCaractéristiques:\n• Se forme après la mort d'une étoile massive\n• Horizon des événements: Point de non-retour\n• Singularité: Concentration infinie de masse\n• Espace-temps extrêmement courbé\n• Les trous noirs peuvent avoir différentes tailles\n• Deux types: trous noirs stellaires et supermassifs\n• Exemple: Sagittarius A* au centre de la Voie Lactée`,
            image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop'
        },
        'galaxie': {
            text: `🌀 GALAXIES\n\nUne galaxie est un immense système gravitationnel regroupant étoiles, gaz et poussière.\n\nTypes de galaxies:\n• SPIRALES: Bras rotatifs (comme la Voie Lactée)\n• ELLIPTIQUES: Forme ovoïde\n• IRRÉGULIÈRES: Pas de forme définie\n• LENTICULAIRES: Entre spirale et elliptique\n\nFaits fascinants:\n• L'univers contient 100-200 milliards de galaxies\n• Chaque galaxie contient environ 100-200 milliards d'étoiles\n• Les plus grandes galaxies s'étendent sur 6 millions d'années-lumière\n• Andromède, la galaxie spirale la plus proche, est à 2,5 millions d'années-lumière`,
            image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop'
        },
        'étoile': {
            text: `⭐ LES ÉTOILES\n\nUne étoile est une boule de plasma maintenue en équilibre par la gravité.\n\nComposition:\n• Hydrogène: 73%\n• Hélium: 25%\n• Métaux lourds: 2%\n\nCycle de vie:\n1. Formation à partir d'un nuage de gaz\n2. Fusion nucléaire (jeunesse)\n3. Géante rouge (fin de vie)\n4. Naine blanche ou supernova\n\nNos voisins stellaires:\n• Proxima Centauri: 4,24 années-lumière\n• Sirius: 8,6 années-lumière\n• Rigel, Bételgeuse, Canopus...`,
            image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop'
        },
        'star': {
            text: `⭐ STARS / ÉTOILES\n\nUne étoile est une boule de plasma maintenue en équilibre par la gravité. Elle brille par la fusion nucléaire en son cœur.`,
            image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop'
        },
        'planète': {
            text: `🪐 PLANÈTES\n\nUne planète est un corps céleste en orbite autour d'une étoile.\n\nCritères IAU pour être une planète:\n1. Orbite autour du Soleil\n2. Masse suffisante pour avoir une forme ronde\n3. A éliminé les autres objets de son orbite\n\nDans notre système solaire:\n• Planètes intérieures (rocheuses): Mercure, Vénus, Terre, Mars\n• Planètes extérieures (gazeuses/glacées): Jupiter, Saturne, Uranus, Neptune\n\nTotal: 8 planètes`,
            image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop'
        },
        'nébuleuse': {
            text: `☁️ NÉBULEUSES\n\nUne nébuleuse est un nuage géant de gaz et de poussière dans l'espace interstellaire.\n\nTypes de nébuleuses:\n• NÉBULEUSES D'ÉMISSION: Gaz ionisé brillant (roses/rouges)\n• NÉBULEUSES SOMBRES: Bloquent la lumière (noires)\n• NÉBULEUSES PAR RÉFLEXION: Réfléchissent la lumière (bleues)\n• NÉBULEUSES PLANÉTAIRES: Éjectées par les étoiles mourant\n\nImportance:\n• Lieux de naissance des étoiles\n• Contiennent les éléments pour former des planètes\n• Magnifiques à observer au télescope`,
            image: 'https://images.unsplash.com/photo-1542173159-c1c4a4d5b2c5?w=400&h=300&fit=crop'
        },
        'comète': {
            text: `☄️ COMÈTES\n\nUne comète est un petit corps glacé qui orbite autour du Soleil.\n\nComposition:\n• Noyau rocheux\n• Manteau de glace (eau, méthane, ammoniac)\n• Atmosphère gazeuse\n\nCaractéristiques:\n• Développe une queue en s'approchant du Soleil\n• Certaines sont visibles à l'œil nu\n• Comet de Halley: Visible tous les 75-76 ans\n• Prochaine apparition: 2061\n• Peuvent avoir des périodes orbitales de millions d'années`,
            image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop'
        },
        'astéroïde': {
            text: `🪨 ASTÉROÏDES\n\nUn astéroïde est un petit corps rocheux orbitant autour du Soleil.\n\nFaits importants:\n• Taille: De quelques mètres à des centaines de km\n• Ceinture d'astéroïdes: Entre Mars et Jupiter\n• Composition: Roche et métaux\n• Origine: Résidus de la formation du système solaire\n• Danger potentiel: Certains croisent l'orbite terrestre\n• Nombre estimé: Des millions\n• Certains ont des lunes (astéroïdes binaires)`,
            image: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=400&h=300&fit=crop'
        },
        'exoplanète': {
            text: `🌍 EXOPLANÈTES\n\nUne exoplanète est une planète orbitant autour d'une autre étoile que notre Soleil.\n\nDécouvertes:\n• Première découverte: 1992 (pulsar) et 1995 (étoile normale)\n• Total découvert: Plus de 5 600 exoplanètes (2024)\n• Continuent à être découvertes chaque année\n\nTypes d'exoplanètes:\n• JUPITERS CHAUDS: Géantes gazeuses proches de leur étoile\n• SUPER-TERRES: Taille intermédiaire entre Terre et Neptune\n• TERRES POTENTIELLEMENT HABITABLES: Dans la zone habitable\n\nObjectif: Trouver de la vie`,
            image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop'
        },
        'constellation': {
            text: `⭐ CONSTELLATIONS\n\nUne constellation est un groupe d'étoiles apparemment proches dans le ciel nocturne.\n\nFaits:\n• 88 constellations officielles reconnues\n• Les étoiles n'ont aucun lien physique réel\n• Perspective depuis la Terre crée l'illusion\n• Utilisées pour navigation et mythologie\n• Certaines contiennent des objets célèbres\n\nConstellations célèbres:\n• La Grande Ourse\n• Orion le Chasseur\n• Cassiopée\n• La Croix du Sud\n• Persée\n• Andromède`,
            image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop'
        },
        'éclipse': {
            text: `🌑 ÉCLIPSES\n\nUne éclipse se produit quand un objet céleste en cache un autre du point de vue d'un observateur.\n\nTypes d'éclipses:\n\n• ÉCLIPSE SOLAIRE: La Lune passe devant le Soleil\n  - Totale: Lune cache complètement le Soleil\n  - Partielle: Lune cache partiellement le Soleil\n  - Annulaire: Lune trop loin, crée un anneau\n\n• ÉCLIPSE LUNAIRE: La Terre se place entre le Soleil et la Lune\n  - Totale: Lune complètement dans l'ombre\n  - Partielle: Lune partiellement dans l'ombre\n\nFréquence: 2-5 éclipses par an`,
            image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop'
        },
        'année-lumière': {
            text: `📏 ANNÉE-LUMIÈRE\n\nUne année-lumière est une unité de distance, non de temps!\n\nDéfinition:\n• Distance parcourue par la lumière en un an dans le vide\n• Environ 9,46 billions de kilomètres\n• Environ 63 241 UA (unités astronomiques)\n\nUtilisation:\n• Mesure les distances entre étoiles et galaxies\n• Permet de mieux comprendre l'échelle cosmique\n\nExemples de distances:\n• Proxima Centauri: 4,24 années-lumière\n• Sirius: 8,6 années-lumière\n• Galaxie d'Andromède: 2,5 millions d'années-lumière\n• Univers observable: ~46,5 milliards d'années-lumière`,
            image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop'
        },
        'télescope': {
            text: `🔭 TÉLESCOPES\n\nUn télescope est un instrument optique pour observer les objets célestes.\n\nTypes de télescopes:\n• RÉFRACTEURS: Utilisent une lentille\n• RÉFLECTEURS: Utilisent des miroirs\n• CATADIOPTRIQUES: Combinaison des deux\n\nTélescopes spatiaux célèbres:\n• Hubble: Missions réussies depuis 1990\n• James Webb: Plus puissant, infrarouge\n• Kepler: Découverte d'exoplanètes\n• Chandra: Rayons X\n\nTélescopes au sol:\n• VLT: Très Grand Télescope (Chili)\n• Keck: Plus grand télescope optique\n• Arecibo: Radioastronomie (désactivé)`,
            image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop'
        },
        'astronaute': {
            text: `👨‍🚀 ASTRONAUTES\n\nUn astronaute (ou cosmonaute) est une personne entraînée pour le vol spatial.\n\nHistoire:\n• Yuri Gagarin: Premier humain en orbite (1961)\n• John Glenn: Premier Américain en orbite (1962)\n• Neil Armstrong: Premier sur la Lune (1969)\n• Valentina Tereshkova: Première femme en espace (1963)\n• Sally Ride: Première Américaine en espace (1983)\n\nEntraînement:\n• Physique intense\n• Pilotage et mécanique\n• Sciences\n• Survie\n• Sorties spatiales\n\nAgences spatiales principales: NASA, Roscosme, ESA, JAXA, CNSA`,
            image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop'
        }
    };
    
    for (const [keyword, response] of Object.entries(keywords)) {
        const keywordScore = calculateSimilarity(input, keyword);
        if (keywordScore > 0.5 && keywordScore > bestScore) {
            bestScore = keywordScore;
            bestResponse = response.text;
            bestImage = response.image;
        }
    }
    
    if (bestResponse) {
        return { text: bestResponse, image: bestImage };
    }
    
    // Réponse par défaut améliorée
    return {
        text: `Je suis désolé, je n'ai pas trouvé d'informations précises sur votre question. 🤔\n\nJe peux vous parler de:\n• Les 8 planètes du système solaire (Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune)\n• Le Soleil, la Lune, et les satellites\n• Les galaxies et l'univers\n• Les étoiles et les phénomènes célestes\n• La Voie Lactée et les concepts d'astronomie\n• Les trous noirs, nébuleuses, comètes et astéroïdes\n\nN'hésitez pas à reformuler votre question ou à être plus précis!`,
        image: 'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop'
    };
}

// Get image URL using backend proxy (/api/image). Backend will prefer Unsplash (if configured) and fall back to Wikimedia/Wikipedia.
async function fetchImageForQuery(query) {
    try {
        if (!query || !query.trim()) return null;
        const res = await fetch(`/api/image?q=${encodeURIComponent(query)}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data && data.url ? data.url : null;
    } catch (err) {
        console.warn('fetchImageForQuery proxy failed:', err && err.toString());
        return null;
    }
}

// Gestion du chat
async function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return;

    // Afficher le message utilisateur
    addMessageToChat(userInput, 'user');
    document.getElementById('userInput').value = '';

    // Afficher message temporaire du bot (indicateur de saisie)
    const tempBotEl = addMessageToChat('⏳ En cours...', 'bot');

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });

        const data = await res.json();
        const textEl = tempBotEl.querySelector('.message-text');
        if (res.ok && data.reply) {
            if (textEl) textEl.textContent = data.reply;
            // essayer de récupérer une image pertinente depuis Wikimedia Commons
            try {
                const imgUrl = await fetchImageForQuery(userInput);
                if (imgUrl) {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = 'Image de réponse';
                    img.style.maxWidth = '100%';
                    img.style.borderRadius = '8px';
                    img.style.marginTop = '8px';
                    tempBotEl.appendChild(img);
                }
            } catch (err) {
                console.warn('Image fetch failed after backend reply:', err && err.toString());
            }
            return;
        }

        // si API répond mais sans reply, on tombe sur le fallback
        console.warn('Backend returned no reply, falling back to local knowledge', data);
    } catch (err) {
        console.warn('Erreur fetch /api/chat, fallback to local:', err && err.toString());
    }

    // Fallback local: utiliser la base de connaissances intégrée
    try {
        const response = getChatbotResponse(userInput);
        const textEl = tempBotEl.querySelector('.message-text');
        if (textEl) textEl.textContent = response.text;
        // premièrement, essayer d'obtenir une image pertinente depuis Wikimedia
        try {
            const imgUrl = await fetchImageForQuery(userInput);
            if (imgUrl) {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = 'Image de réponse';
                img.style.maxWidth = '100%';
                img.style.borderRadius = '8px';
                img.style.marginTop = '8px';
                tempBotEl.appendChild(img);
            } else if (response.image) {
                // fallback: utiliser l'image fournie par la base de connaissances
                const img = document.createElement('img');
                img.src = response.image;
                img.alt = 'Image de réponse';
                img.style.maxWidth = '100%';
                img.style.borderRadius = '8px';
                img.style.marginTop = '8px';
                tempBotEl.appendChild(img);
            }
        } catch (err) {
            console.warn('Image fallback failed:', err && err.toString());
            if (response.image) {
                const img = document.createElement('img');
                img.src = response.image;
                img.alt = 'Image de réponse';
                img.style.maxWidth = '100%';
                img.style.borderRadius = '8px';
                img.style.marginTop = '8px';
                tempBotEl.appendChild(img);
            }
        }
    } catch (err) {
        const textEl = tempBotEl.querySelector('.message-text');
        if (textEl) textEl.textContent = 'Erreur interne: impossible de générer une réponse.';
        console.error('Fallback local failed:', err);
    }
}

function askQuestion(question) {
    document.getElementById('userInput').value = question;
    sendMessage();
}

function addMessageToChat(message, sender, imageUrl = null) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;

    if (sender === 'bot' && imageUrl) {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = 'Image de réponse';
        imgElement.style.maxWidth = '100%';
        imgElement.style.borderRadius = '8px';
        imgElement.style.marginBottom = '10px';
        messageElement.appendChild(imgElement);
    }

    const textElement = document.createElement('div');
    textElement.className = 'message-text';
    textElement.style.whiteSpace = 'pre-wrap';
    textElement.style.wordWrap = 'break-word';
    textElement.textContent = message;
    messageElement.appendChild(textElement);

    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    return messageElement;
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
