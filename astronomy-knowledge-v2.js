// 🌌 BASE DE DONNÉES ASTRONOMIQUE AVANCÉE
// Avec images dynamiques et recherche intelligente

const astronomyKnowledge = {
  // ========== UNIVERS ==========
  univers: {
    definition: "L'univers est l'ensemble de toute la matière, de l'énergie, de l'espace et du temps qui existe.",
    age: "L'univers a environ 13,8 milliards d'années.",
    taille: "L'univers observable a un diamètre d'environ 93 milliards d'années-lumière.",
    expansion: "L'univers est en expansion constante depuis le Big Bang.",
    origine: "Le Big Bang est l'événement initial qui a créé l'univers.",
    contenu: "L'univers contient environ 2 trillions de galaxies.",
    composition: "5% matière ordinaire, 27% matière noire, 68% énergie noire.",
    keywords: ['univers', 'cosmos', 'big bang', 'expansion', 'galaxies'],
    searchTerms: ['universe', 'cosmos', 'space', 'galaxy'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop'
    ]
  },

  systemeSolaire: {
    definition: "Le système solaire est un système planétaire constitué du Soleil et de tous les objets qui gravitent autour.",
    age: "Le système solaire s'est formé il y a environ 4,6 milliards d'années.",
    composition: "Le Soleil (99,86% de la masse) + 8 planètes + lunes + astéroïdes + comètes.",
    planetes: "Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune",
    keywords: ['système solaire', 'solaire', 'planète', 'orbite'],
    searchTerms: ['solar system', 'planets', 'solar', 'orbit'],
    images: [
      'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  soleil: {
    definition: "Le Soleil est une étoile de type G (naine jaune) au centre de notre système solaire.",
    composition: "73% Hydrogène, 25% Hélium, 2% métaux lourds",
    diametre: "1,392 million de km (109 fois plus large que la Terre)",
    temperature: "Surface: 5,500°C | Cœur: 15,7 millions°C",
    fusion: "620 millions de tonnes d'hydrogène fusionnent en hélium chaque seconde.",
    keywords: ['soleil', 'sun', 'étoile', 'star', 'lumière', 'chaleur'],
    searchTerms: ['sun', 'solar', 'star', 'light'],
    images: [
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  mercure: {
    definition: "Mercure est la 1ère planète, la plus proche du Soleil.",
    position: "1ère planète",
    diametre: "4,879 km",
    temperature: "Min: -180°C, Max: 430°C",
    caracteristiques: "Planète la plus rapide, la plus petite planète",
    keywords: ['mercure', 'mercury', 'première planète'],
    searchTerms: ['mercury planet', 'closest sun'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  venus: {
    definition: "Vénus est la 2ème planète, souvent appelée 'jumelle malveillante' de la Terre.",
    temperature_surface: "462°C (la plus chaude du système solaire)",
    atmosphere: "95,3% CO2, Pression 92 bars",
    caracteristiques: "Effet de serre extrême, nuages d'acide sulfurique, rotation rétrograde",
    keywords: ['venus', 'vénus', 'deuxième planète', 'chaude', 'acide'],
    searchTerms: ['venus planet', 'hot planet'],
    images: [
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  terre: {
    definition: "La Terre est la 3ème planète et l'unique planète connue à abriter la vie.",
    diametre: "12,742 km",
    temperature_moyenne: "15°C",
    atmosphere: "78% N2, 21% O2, 1% autres gaz",
    caracteristiques: "Seule planète avec vie, abondante eau liquide, biodiversité 8,7 millions d'espèces",
    keywords: ['terre', 'earth', 'notre planète', 'vie', 'biosphère'],
    searchTerms: ['earth', 'planet earth', 'life'],
    images: [
      'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop'
    ]
  },

  mars: {
    definition: "Mars est la 4ème planète, la planète rouge. C'est la cible principale de l'exploration humaine.",
    diametre: "6,779 km",
    temperature_moyenne: "-65°C",
    caracteristiques: "Planète rouge, eau souterraine, volcans éteints, canyons profonds",
    vie_potentielle: "Aucune vie détectée, mais signes de vie microbienne passée possible",
    exploration: "Rovers NASA (Curiosity, Perseverance) explorent actuellement",
    keywords: ['mars', 'planète rouge', 'rouge', 'vie sur mars', 'rover', 'perseverance'],
    searchTerms: ['mars planet', 'red planet', 'rover'],
    images: [
      'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  jupiter: {
    definition: "Jupiter est la 5ème planète, la plus grande du système solaire (géante gazeuse).",
    diametre: "139,820 km",
    caracteristiques: "318 fois plus massive que la Terre, tempêtes puissantes, 95 lunes",
    grande_tache_rouge: "Ouragan géant visible depuis 350 ans, plus grand que la Terre",
    lunes: "95 lunes confirmées, dont les 4 lunes galiléennes",
    keywords: ['jupiter', 'géante gazeuse', 'tache rouge', 'grande tache'],
    searchTerms: ['jupiter', 'gas giant', 'great red spot'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=600&fit=crop'
    ]
  },

  saturne: {
    definition: "Saturne est la 6ème planète, célèbre pour ses spectaculaires anneaux.",
    diametre: "116,460 km",
    caracteristiques: "Anneaux spectaculaires, 146 lunes, géante gazeuse",
    anneaux: "Système d'anneaux spectaculaire constitué de glaçons et poussière",
    lunes_principales: "Titan (atmosphère épaisse), Encelade (geysers d'eau)",
    keywords: ['saturne', 'anneaux', 'rings', 'titan', 'encelade'],
    searchTerms: ['saturn', 'rings', 'saturn rings'],
    images: [
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  uranus: {
    definition: "Uranus est la 7ème planète, une géante de glace qui tourne sur le côté.",
    diametre: "50,724 km",
    couleur: "Bleu-vert due au méthane",
    caracteristiques: "Tournée sur le côté (98° d'inclinaison), 28 lunes",
    decouverte: "Découverte en 1781 par William Herschel",
    keywords: ['uranus', 'bleu', 'glace', 'géante glace', 'inclinaison'],
    searchTerms: ['uranus', 'ice giant', 'blue planet'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  neptune: {
    definition: "Neptune est la 8ème et la plus éloignée planète du système solaire.",
    diametre: "49,244 km",
    caracteristiques: "Planète du vent (2,100 km/h!), couleur bleu vif, 16 lunes",
    decouverte: "Découverte en 1846 par prédiction mathématique",
    keywords: ['neptune', 'vent', 'bleu', 'planète du vent', 'éloignée'],
    searchTerms: ['neptune', 'wind planet', 'farthest'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  lune: {
    definition: "La Lune est le satellite naturel de la Terre et le 5ème plus grand satellite du système solaire.",
    diametre: "3,474 km",
    distance: "384,400 km de la Terre",
    phases: "Nouvelle, croissante, pleine, décroissante (cycle de 29,5 jours)",
    caracteristiques: "Cause les marées, stabilise l'inclinaison axiale terrestre",
    eclipses: "Peut couvrir le Soleil (éclipse solaire) ou entrer dans l'ombre terrestre (éclipse lunaire)",
    keywords: ['lune', 'moon', 'satellite', 'phase', 'éclipse', 'marées'],
    searchTerms: ['moon', 'lunar', 'eclipse'],
    images: [
      'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop'
    ]
  },

  etoiles: {
    definition: "Les étoiles sont des masses gigantesques de plasma maintenues par gravité, produisant lumière et chaleur.",
    nombre: "Estimé à 10^24 étoiles dans l'univers observable",
    composition: "73% Hydrogène, 25% Hélium",
    types: "Naines, géantes, supergéantes, naines blanches, étoiles à neutrons",
    plus_proche: "Proxima Centauri à 4,24 années-lumière",
    keywords: ['étoile', 'star', 'proxima', 'centauri', 'lumière', 'brillante'],
    searchTerms: ['star', 'stars', 'proxima centauri'],
    images: [
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  galaxies: {
    definition: "Les galaxies sont d'énormes systèmes contenant des milliards d'étoiles, planètes, gaz et poussière.",
    nombre: "Estimé à 2 trillions de galaxies dans l'univers observable",
    types: "Spirale, elliptique, irrégulière",
    voie_lactee: "Galaxie spirale avec ~400 milliards d'étoiles, notre galaxie",
    andromeda: "Galaxie spirale la plus proche (2,5 millions d'années-lumière)",
    collision: "Andromède se dirige vers la Voie Lactée, collision dans 4,5 milliards d'années",
    keywords: ['galaxie', 'galaxy', 'voie lactée', 'andromède', 'milky way'],
    searchTerms: ['galaxy', 'andromeda', 'milky way'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop'
    ]
  },

  trous_noirs: {
    definition: "Les trous noirs sont des régions de l'espace-temps où la gravité est si intense que rien ne peut s'échapper.",
    formation: "S'effondrement de étoiles massives à la fin de leur vie",
    horizon_evenement: "Limite au-delà de laquelle on ne peut pas s'échapper",
    singularite: "Point central où la courbure de l'espace-temps est infinie",
    detection: "Observés par émission de rayon-X d'accrétion et effets gravitationnels",
    keywords: ['trou noir', 'black hole', 'singularité', 'horizon'],
    searchTerms: ['black hole', 'singularity'],
    images: [
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  nebuleuses: {
    definition: "Les nébuleuses sont des nuages de gaz et poussière, souvent berceau de formation d'étoiles.",
    types: "Émission, réflexion, planétaire, nébuleuse obscure",
    nébuleuse_d_orion: "Nébuleuse d'émission, l'une des plus brillantes visibles",
    crab_nebula: "Reste de supernova explosée en 1054",
    eagle_nebula: "Nébuleuse d'émission dans la constellation de l'Aigle",
    keywords: ['nébuleuse', 'nebula', 'orion', 'crab', 'gaz', 'poussière'],
    searchTerms: ['nebula', 'orion nebula'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop'
    ]
  },

  cometes: {
    definition: "Les comètes sont des petits corps glacés qui orbitent le Soleil, émettent une queue quand proches du Soleil.",
    composition: "Glace (eau, méthane, ammoniac) + roche + poussière",
    queue: "Formée par le vent solaire soufflant le gaz et la poussière",
    halley: "La comète la plus célèbre, dernière apparition 1986, prochaine 2061",
    keywords: ['comète', 'comet', 'halley', 'queue', 'glaçon'],
    searchTerms: ['comet', 'halley comet'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  asteroides: {
    definition: "Les astéroïdes sont des petits corps rocheux orbitant le Soleil.",
    nombre: "Millions d'astéroïdes connus, surtout entre Mars et Jupiter",
    ceinture: "Ceinture d'astéroïdes entre Mars et Jupiter",
    impacts: "Les astéroïdes qui frappent la Terre créent des cratères d'impact",
    dinosaures: "Astéroïde de 10 km a causé l'extinction des dinosaures il y a 66 millions d'années",
    keywords: ['astéroïde', 'asteroid', 'ceinture', 'impact', 'roche'],
    searchTerms: ['asteroid', 'asteroid belt'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  constellations: {
    definition: "Les constellations sont des groupes d'étoiles formant des motifs reconnaissables.",
    nombre: "88 constellations officiellement reconnues",
    zodiac: "12 constellations de l'zodiaque",
    grandes_ours: "Grande Ourse - constellation facilement reconnaissable",
    orion: "Constellation spectaculaire avec des étoiles brillantes (Rigel, Bételgeuse)",
    keywords: ['constellation', 'ourse', 'orion', 'zodiaque', 'étoile'],
    searchTerms: ['constellation', 'orion', 'ursa major'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop'
    ]
  },

  phenomenes: {
    definition: "Les phénomènes astronomiques sont des événements célestes observables.",
    eclipse_solaire: "Lune passe entre le Soleil et la Terre, bloquant la lumière solaire.",
    eclipse_lunaire: "Terre passe entre le Soleil et la Lune, plongeant la Lune dans l'ombre.",
    pluie_meteorites: "Essaim de météorites apparaissant à certaines dates de l'année",
    aurore_boreale: "Aurore spectaculaire causée par l'interaction du vent solaire avec la magnétosphère.",
    keywords: ['éclipse', 'eclipse', 'aurore', 'météorite', 'phénomène', 'aurora'],
    searchTerms: ['eclipse', 'aurora borealis', 'northern lights'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop'
    ]
  },

  exoplanetes: {
    definition: "Les exoplanètes sont des planètes qui orbitent autour d'autres étoiles que notre Soleil.",
    nombre: "Plus de 5,700 exoplanètes découvertes à ce jour",
    zone_habitable: "Zone autour d'une étoile où l'eau liquide peut exister",
    vie_potentielle: "Des milliers d'exoplanètes pourraient potentiellement abriter la vie",
    proxima_b: "Exoplanète la plus proche (4,24 années-lumière), dans la zone habitable",
    keywords: ['exoplanète', 'exoplanet', 'habitable', 'autre étoile', 'zone habitable'],
    searchTerms: ['exoplanet', 'habitable zone'],
    images: [
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop'
    ]
  },

  concepts: {
    definition: "Les concepts clés de l'astronomie expliquent l'univers.",
    annee_lumiere: "Distance parcourue par la lumière en une année (9,46 trilions de km).",
    ua: "Unité Astronomique - distance moyenne Terre-Soleil (150 millions de km).",
    gravite: "Force d'attraction entre deux masses, proportionnelle aux masses.",
    relativite: "Théorie d'Einstein expliquant la gravité comme courbure de l'espace-temps.",
    big_bang: "Événement initial de l'univers il y a 13,8 milliards d'années.",
    keywords: ['année-lumière', 'light year', 'ua', 'gravité', 'relativité', 'parsec'],
    searchTerms: ['light year', 'gravity', 'relativity'],
    images: [
      'https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=800&h=600&fit=crop'
    ]
  },

  missions: {
    definition: "Les missions spatiales explorent notre univers.",
    nasa: "Agence spatiale américaine - Apollo, Space Shuttle, Curiosity, Perseverance, James Webb",
    esa: "Agence Spatiale Européenne - Rosetta, Gaia, Euclid",
    jwst: "James Webb Space Telescope - télescope spatial le plus puissant (lancé 2021)",
    hubble: "Hubble Space Telescope - révolutionné notre compréhension de l'univers",
    voyager: "Sondes Voyager 1 et 2 - plus loin que toute autre sonde",
    keywords: ['mission', 'nasa', 'rover', 'télescope', 'hubble', 'james webb', 'voyager'],
    searchTerms: ['nasa', 'space mission', 'hubble'],
    images: [
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop'
    ]
  }
};

module.exports = astronomyKnowledge;
