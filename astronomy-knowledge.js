// 🌌 BASE DE DONNÉES ASTRONOMIQUE COMPLÈTE
// ChatBot Univers - Knowledge Base

const astronomyKnowledge = {
  // ========== UNIVERS ==========
  univers: {
    definition: "L'univers est l'ensemble de toute la matière, de l'énergie, de l'espace et du temps qui existe. C'est la totalité de tout ce qui a jamais existé.",
    age: "L'univers a environ 13,8 milliards d'années, selon les observations du rayonnement cosmique de fond.",
    taille: "L'univers observable a un diamètre d'environ 93 milliards d'années-lumière.",
    expansion: "L'univers est en expansion constante depuis le Big Bang. Cette expansion s'accélère avec le temps.",
    origine: "Le Big Bang est l'événement initial qui a créé l'univers, survenu il y a ~13,8 milliards d'années.",
    contenu: "L'univers contient environ 2 trillions de galaxies, chacune contenant des milliards d'étoiles.",
    forme: "L'univers est supposé être plat ou légèrement courbe selon la relativité générale d'Einstein.",
    composition: "L'univers est composé de 5% de matière ordinaire, 27% de matière noire et 68% d'énergie noire.",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== SYSTÈME SOLAIRE ==========
  systemeSolaire: {
    definition: "Le système solaire est un système planétaire constitué du Soleil et de tous les objets qui gravitent autour de lui.",
    age: "Le système solaire s'est formé il y a environ 4,6 milliards d'années.",
    composition: "Le Soleil (99,86% de la masse) + 8 planètes + lunes + astéroïdes + comètes.",
    diametre: "Le système solaire s'étend sur environ 287 milliards de km (19.2 UA).",
    planetes: "Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune",
    ceintures: "Ceinture d'astéroïdes entre Mars et Jupiter, Ceinture de Kuiper au-delà de Neptune.",
    noyau: "Le Soleil est l'étoile centrale qui fournit l'énergie et la gravité à tout le système.",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop"
  },

  // ========== SOLEIL ==========
  soleil: {
    nom: "Soleil (Sol)",
    type: "Étoile de type G (naine jaune)",
    composition: "73% Hydrogène, 25% Hélium, 2% métaux lourds",
    diametre: "1,392 million de km (109 fois plus large que la Terre)",
    masse: "1,989 × 10^30 kg (99,86% de la masse du système solaire)",
    temperature: "Surface: 5,500°C | Cœur: 15,7 millions°C",
    distance: "150 millions de km de la Terre (1 UA)",
    age: "4,6 milliards d'années, moitié de sa vie",
    duree_vie: "10 milliards d'années au total",
    lumiosity: "Le Soleil produit l'énergie par fusion nucléaire de l'hydrogène en hélium.",
    cycles: "Cycle solaire de 11 ans caractérisé par les taches solaires.",
    fusion: "620 millions de tonnes d'hydrogène fusionnent en hélium chaque seconde.",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop"
  },

  // ========== MERCURE ==========
  mercure: {
    nom: "Mercure",
    position: "1ère planète (plus proche du Soleil)",
    type: "Planète tellurique (rocheuse)",
    diametre: "4,879 km",
    masse: "3,285 × 10^23 kg",
    distance_soleil: "57,9 millions de km (0,39 UA)",
    periode_orbitale: "88 jours terrestres",
    periode_rotation: "59 jours terrestres",
    temperature: "Min: -180°C, Max: 430°C",
    atmosphere: "Pratiquement aucune, traces d'hydrogène et d'hélium",
    surface: "Couverte de cratères ressemblant à la Lune, surface rocheuse grise",
    lunes: "Zéro lune",
    caracteristiques: "Planète la plus rapide autour du Soleil, la plus petite planète",
    vitesse_orbitale: "47 km/s (plus rapide que toute autre planète)",
    densite: "5,43 g/cm³ (très dense pour sa taille)",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== VÉNUS ==========
  venus: {
    nom: "Vénus",
    position: "2ème planète",
    type: "Planète tellurique (rocheuse)",
    diametre: "12,104 km",
    masse: "4,867 × 10^24 kg",
    distance_soleil: "108,2 millions de km (0,72 UA)",
    periode_orbitale: "225 jours terrestres",
    periode_rotation: "243 jours terrestres (sens inverse!)",
    temperature_surface: "462°C (la plus chaude du système solaire)",
    atmosphere: "95,3% CO2, Pression 92 bars (comme 900m sous l'océan)",
    surface: "Volcans, hauts plateaux, plaines de lave",
    lunes: "Zéro lune",
    caracteristiques: "Souvent appelée 'jumelle malveillante' de la Terre, plus brillante dans le ciel",
    rotation: "Tourne dans le sens inverse (rétrograde)",
    climat: "Effet de serre extrême, nuages d'acide sulfurique",
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&h=300&fit=crop"
  },

  // ========== TERRE ==========
  terre: {
    nom: "Terre (Sol Tertius)",
    position: "3ème planète",
    type: "Planète tellurique (rocheuse)",
    diametre: "12,742 km",
    masse: "5,972 × 10^24 kg",
    distance_soleil: "150 millions de km (1 UA)",
    periode_orbitale: "365,25 jours",
    periode_rotation: "23h 56m 4s",
    temperature_moyenne: "15°C",
    atmosphere: "78% N2, 21% O2, 1% autres gaz",
    surface: "29% terres, 71% océans",
    lunes: "1 (la Lune)",
    caracteristiques: "Seule planète connue à avoir la vie, abondante eau liquide",
    biodiversite: "8,7 millions d'espèces estimées",
    inclinaison: "23,5° (cause les saisons)",
    champs_magnetiques: "Protègent de la radiation solaire",
    age: "4,54 milliards d'années",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop"
  },

  // ========== MARS ==========
  mars: {
    nom: "Mars (Planète Rouge)",
    position: "4ème planète",
    type: "Planète tellurique (rocheuse)",
    diametre: "6,779 km",
    masse: "6,417 × 10^23 kg",
    distance_soleil: "227,9 millions de km (1,52 UA)",
    periode_orbitale: "687 jours terrestres",
    periode_rotation: "24h 37m",
    temperature_moyenne: "-65°C",
    atmosphere: "95,3% CO2, 2,7% N2, 1,6% Ar",
    surface: "Volcans éteints, canyons profonds, poussière rouge (oxyde de fer)",
    lunes: "2 (Phobos et Déimos)",
    caracteristiques: "Planète où chercher les traces de vie passée, eau souterraine détectée",
    vie_potentielle: "Aucune vie détectée actuellement, mais signes de vie microbienne passée possible",
    eau: "Présence de glace polaire et d'eau souterraine",
    volcan: "Olympus Mons - le plus grand volcan connu du système solaire",
    canyon: "Valles Marineris - système de canyons enormes",
    exploration: "Rovers NASA (Curiosity, Perseverance) explorent actuellement",
    missions: "Mars est le prochain objectif d'exploration humaine",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop"
  },

  // ========== JUPITER ==========
  jupiter: {
    nom: "Jupiter (Roi des planètes)",
    position: "5ème planète",
    type: "Géante gazeuse",
    diametre: "139,820 km",
    masse: "1,898 × 10^27 kg (318 fois plus massive que la Terre)",
    distance_soleil: "778,5 millions de km (5,20 UA)",
    periode_orbitale: "12 ans",
    periode_rotation: "9h 56m (la plus rapide)",
    temperature_nuages: "-110°C",
    composition: "89% hydrogène, 10% hélium, traces d'autres gaz",
    atmosphere: "Tempêtes puissantes, bandes de nuages colorés",
    lunes: "95 lunes confirmées (la plus grande lune connue)",
    satellites_principaux: "Io, Europe, Ganymède, Callisto (lunes galiléennes)",
    grande_tache_rouge: "Ouragan géant visible depuis 350 ans, plus grand que la Terre",
    anneaux: "Anneau faible et discret (contrairement à Saturne)",
    magnetosphere: "Champ magnétique intense, radiations dangereuses",
    densite: "1,326 g/cm³ (planète moins dense que l'eau)",
    exploration: "Mission Juno en orbite depuis 2016",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== SATURNE ==========
  saturne: {
    nom: "Saturne (Planète aux anneaux)",
    position: "6ème planète",
    type: "Géante gazeuse",
    diametre: "116,460 km",
    masse: "5,683 × 10^26 kg (95 fois plus massive que la Terre)",
    distance_soleil: "1,434 milliards de km (9,58 UA)",
    periode_orbitale: "29 ans",
    periode_rotation: "10h 42m",
    temperature_nuages: "-140°C",
    composition: "96% hydrogène, 3% hélium, traces d'autres gaz",
    atmosphere: "Vents rapides jusqu'à 1,800 km/h",
    lunes: "146 lunes confirmées",
    satellites_principaux: "Titan (plus grande lune, atmosphère épaisse), Encelade",
    anneaux: "Système d'anneaux spectaculaire constitué de glaçons et poussière",
    anneaux_composition: "Particules de glace d'eau, roches et poussière",
    anneaux_largeur: "Jusqu'à 282,000 km de large",
    densite: "0,687 g/cm³ (moins dense que l'eau, flotterait)",
    exploration: "Mission Cassini-Huygens (2004-2017), découvertes majeures",
    geisers: "Geysers d'eau chaude détectés sur Encelade",
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&h=300&fit=crop"
  },

  // ========== URANUS ==========
  uranus: {
    nom: "Uranus (Géante de glace)",
    position: "7ème planète",
    type: "Géante de glace",
    diametre: "50,724 km",
    masse: "8,681 × 10^25 kg (14,5 fois plus massive que la Terre)",
    distance_soleil: "2,871 milliards de km (19,19 UA)",
    periode_orbitale: "84 ans",
    periode_rotation: "17h 14m (rétrograde)",
    temperature_nuages: "-200°C",
    composition: "Eau, méthane, ammoniac - ce qui lui donne sa couleur bleu-vert",
    atmosphere: "Winds jusqu'à 900 km/h",
    lunes: "28 lunes confirmées",
    satellites_principaux: "Titania, Obéron, Umbriel, Ariel, Miranda",
    anneaux: "13 anneaux découverts, très minces et sombres",
    inclinaison: "Tournée sur le côté (98° d'inclinaison axiale)",
    caracteristiques: "Planète la plus inclinée du système solaire",
    decouverte: "Découverte en 1781 par William Herschel",
    methane: "Le méthane absorbe la lumière rouge, d'où la couleur bleu-vert",
    exploration: "Survol Voyager 2 (1986), aucune mission orbitale",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== NEPTUNE ==========
  neptune: {
    nom: "Neptune (Planète du vent)",
    position: "8ème planète (la plus éloignée)",
    type: "Géante de glace",
    diametre: "49,244 km",
    masse: "1,024 × 10^26 kg (17 fois plus massive que la Terre)",
    distance_soleil: "4,495 milliards de km (30,07 UA)",
    periode_orbitale: "165 ans",
    periode_rotation: "16h 3m",
    temperature_nuages: "-200°C",
    composition: "Eau, méthane, ammoniac (semblable à Uranus)",
    atmosphere: "Winds les plus rapides du système solaire - 2,100 km/h!",
    lunes: "16 lunes confirmées",
    satellites_principaux: "Triton (orbite rétrograde, activité cryovolcanique)",
    anneaux: "14 anneaux découverts",
    densite: "1,638 g/cm³",
    decouverte: "Découverte en 1846 par prédiction mathématique avant observation",
    couleur: "Bleu vif dû au méthane absorbant la lumière rouge",
    taches: "Grande tache sombre (tempête géante), semblable à celle de Jupiter",
    exploration: "Survol Voyager 2 (1989), aucune mission orbitale",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== EXOPLANÈTES ==========
  exoplanetes: {
    definition: "Planètes qui orbitent autour d'autres étoiles que notre Soleil.",
    nombre: "Plus de 5,700 exoplanètes découvertes à ce jour (et toujours en augmentation)",
    premiere: "La première exoplanète (51 Pegasi b) découverte en 1995",
    detection: "Méthodes: transit, vélocité radiale, imagerie directe, micro-lentilles",
    zone_habitable: "Zone autour d'une étoile où l'eau liquide peut exister",
    vie_potentielle: "Des milliers d'exoplanètes pourraient potentiellement abriter la vie",
    types: "Jupiters chauds, super-Terres, géantes de glace, planètes océan, etc.",
    proxima_b: "Exoplanète la plus proche (4,24 années-lumière), dans la zone habitable",
    kepler: "Mission Kepler a découvert la majorité des exoplanètes",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop"
  },

  // ========== ÉTOILES ==========
  etoiles: {
    definition: "Masses gigantesques de plasma maintenuesensemble par gravité, produisant lumière et chaleur par fusion nucléaire.",
    nombre: "Estimé à 10^24 étoiles dans l'univers observable",
    composition: "Principalement hydrogène (73%) et hélium (25%)",
    types: "Naines, géantes, supergéantes, naines blanches, etc.",
    cycles: "Passage de nuages de gaz → étoile massive → fin de vie (explosion, effondrement)",
    luminosite: "Varie énormément (de 1/100,000 à 100,000 fois le Soleil)",
    temperature: "Varie de 2,600°C à plus de 50,000°C en surface",
    distance: "L'étoile la plus proche (Proxima Centauri) est à 4,24 années-lumière",
    fusion: "Produisent éléments lourds qui forment les planètes et la vie",
    mort: "Selon la masse: naine blanche, étoile à neutrons, ou trou noir",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop"
  },

  // ========== GALAXIES ==========
  galaxies: {
    definition: "Énormes systèmes contenant des milliards d'étoiles, planètes, gaz et poussière tenus ensemble par gravité.",
    nombre: "Estimé à 2 trillions de galaxies dans l'univers observable",
    types: "Spirale, elliptique, irrégulière",
    notre_galaxie: "Voie Lactée - galaxie spirale avec ~400 milliards d'étoiles",
    diametre_voie_lactee: "100,000 années-lumière",
    age_voie_lactee: "13,6 milliards d'années (presque aussi vieille que l'univers)",
    soleil_position: "Bras d'Orion, à ~26,000 années-lumière du centre",
    trou_noir_centre: "Sagittarius A* - trou noir supermassif au centre de la Voie Lactée",
    andromeda: "Galaxie spirale la plus proche (2,5 millions d'années-lumière)",
    collision: "Andromède se dirige vers la Voie Lactée, collision prévue dans 4,5 milliards d'années",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== TROUS NOIRS ==========
  trous_noirs: {
    definition: "Régions de l'espace-temps où la gravité est si intense que rien (pas même la lumière) ne peut s'échapper.",
    formation: "S'effondrement de étoiles massives à la fin de leur vie",
    rayons: "Petit (kilomètres) à supermassif (milliards de masses solaires)",
    horizon_evenement: "Limite au-delà de laquelle on ne peut pas s'échapper (point de non-retour)",
    singularite: "Point central où la courbure de l'espace-temps est infinie",
    evaporation: "Les trous noirs émettent la radiation de Hawking et s'évaporent lentement",
    detection: "Observés par émission de rayon-X d'accrétion et par effets gravitationnels",
    premiere_image: "La première image d'un trou noir prise en 2019 (M87)",
    trou_noir_nous: "Sagittarius A* au centre de notre Voie Lactée",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop"
  },

  // ========== NÉBULEUSES ==========
  nebuleuses: {
    definition: "Nuages de gaz et poussière dans l'espace, souvent berceau de formation d'étoiles.",
    types: "Émission, réflexion, planétaire, nébuleuse obscure",
    nebuleuse_d_orion: "Nébuleuse d'émission, l'une des plus brillantes visibles",
    crab_nebula: "Reste de supernova explosée en 1054, contient une étoile à neutrons",
    eagle_nebula: "Nébuleuse d'émission dans la constellation de l'Aigle",
    pillars_creation: "Zones de formation d'étoiles massives en perte de matière",
    couleurs: "Colorées selon la composition: rose (hydrogène), bleu (hélium), etc.",
    formation_etoiles: "Nébuleuses sont les usines de formation d'étoiles et planètes",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== LUNES ==========
  lunes: {
    definition: "Objets célestes qui orbitent autour des planètes.",
    notre_lune: "La seule lune naturelle de la Terre, distance 384,400 km",
    diametre_lune: "3,474 km (27% du diamètre terrestre)",
    formation: "Supposée formée par impact géant il y a 4,51 milliards d'années",
    influence: "Causes les marées, stabilise l'inclinaison axiale terrestre",
    phases: "Nouvelle, croissante, pleine, décroissante (cycle de 29,5 jours)",
    eclipses: "Lune peut couvrir le Soleil (éclipse solaire) ou entrer dans l'ombre terrestre (éclipse lunaire)",
    surface: "Couverte de cratères d'impacts, montagnes, vallées",
    eau: "Glace d'eau découverte aux pôles lunaires",
    exploration: "Colonisation humaine prévue (Artemis program de la NASA)",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop"
  },

  // ========== COMÈTES ==========
  cometes: {
    definition: "Petits corps glacés qui orbitent le Soleil, émettent une queue quand proches du Soleil.",
    composition: "Glace (eau, méthane, ammoniac) + roche + poussière",
    queue: "Formée par le vent solaire soufflant le gaz et la poussière (toujours opposée au Soleil)",
    origine: "Nuage d'Oort ou Ceinture de Kuiper",
    periode: "Certaines sont périodiques (Halley tous les 75-76 ans)",
    halley: "La comète la plus célèbre, dernière apparition 1986, prochaine 2061",
    impacts: "Impact de comète sur la Terre a causé l'extinction des dinosaures",
    observation: "Visibles à l'œil nu quand proches du Soleil",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== ASTÉROÏDES ==========
  asteroides: {
    definition: "Petits corps rocheux orbitant le Soleil, trop petits pour être des planètes.",
    nombre: "Millions d'astéroïdes connus, surtout entre Mars et Jupiter",
    ceinture: "Ceinture d'astéroïdes entre Mars et Jupiter",
    plus_grand: "Cérès - astéroïde plus grand, reclassifiée planète naine",
    taille: "De quelques mètres à plusieurs centaines de kilomètres",
    impacts: "Les astéroïdes qui frappent la Terre créent des cratères d'impact",
    dinosaures: "Astéroïde de 10 km frappant Yucatan il y a 66 millions d'années cause l'extinction",
    deflexion: "Des missions tentent de détourner les astéroïdes dangereux (DART 2022)",
    composition: "Pierres, métaux (nickel-fer), roches carbonées",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== CONSTELLATIONS ==========
  constellations: {
    definition: "Groupes d'étoiles formant des motifs reconnaissables vus de la Terre.",
    nombre: "88 constellations officiellement reconnues",
    zodiac: "12 constellations de l'zodiaque (Bélier, Taureau, Gémeaux, etc.)",
    grandes_ours: "Grande Ourse - constellation facilement reconnaissable",
    petite_ours: "Petite Ourse - contient l'Étoile Polaire",
    etoile_polaire: "Polaris - quasi-immobile au pôle céleste nord, aide à navigation",
    orion: "Constellation spectaculaire contenant des étoiles brillantes (Rigel, Bételgeuse)",
    cassiopée: "Constellation en W, visible toute l'année dans l'hémisphère nord",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== PHÉNOMÈNES ASTRONOMIQUES ==========
  phenomenes: {
    eclipse_solaire: "Lune passe entre le Soleil et la Terre, bloquant la lumière solaire. Spectaculaire mais rare pour un lieu donné.",
    eclipse_lunaire: "Terre passe entre le Soleil et la Lune, plongeant la Lune dans l'ombre terrestre. Lune devient rougeâtre.",
    pluie_meteorites: "Essaim de météorites apparaissant à certaines dates de l'année (Perséides, Géminides, etc.)",
    aurore_boreale: "Aurore spectaculaire causée par l'interaction du vent solaire avec la magnétosphère.",
    anneau_de_feu: "Éclipse solaire annulaire où la Lune ne couvre pas entièrement le Soleil.",
    occultation: "Une étoile ou planète passe derrière une autre depuis notre perspective.",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== CONCEPTS CLÉS ==========
  concepts: {
    annee_lumiere: "Distance parcourue par la lumière en une année dans le vide (9,46 trilions de km).",
    ua: "Unité Astronomique - distance moyenne Terre-Soleil (150 millions de km).",
    parsec: "Distance à laquelle 1 UA subtend un angle d'1 seconde d'arc (3,26 années-lumière).",
    perihelie: "Point de l'orbite le plus proche du Soleil.",
    aphelie: "Point de l'orbite le plus éloigné du Soleil.",
    periode_orbitale: "Temps pour compléter une orbite autour du Soleil.",
    periode_rotation: "Temps pour tourner sur son axe (1 jour).",
    inclinaison: "Angle entre le plan orbital et le plan de référence.",
    excentricite: "Mesure de l'ellipticité d'une orbite (0=cercle, 1=parabole).",
    gravite: "Force d'attraction entre deux masses (proportionnelle aux masses, inversement à la distance²).",
    relativite: "Théorie d'Einstein expliquant la gravité comme courbure de l'espace-temps.",
    big_bang: "Événement initial de l'univers il y a 13,8 milliards d'années.",
    expansion_univers: "L'univers s'étend continuellement depuis le Big Bang.",
    matiere_noire: "Matière invisible constituant 27% de l'univers, détectée par ses effets gravitationnels.",
    energie_noire: "Énergie invisible constituant 68% de l'univers, cause l'expansion accélérée.",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== MISSIONS SPATIALES ==========
  missions: {
    nasa: "Agence spatiale américaine - Apollo, Space Shuttle, Curiosity, Perseverance, James Webb",
    esa: "Agence Spatiale Européenne - Rosetta, Gaia, Euclid",
    roscosmos: "Agence spatiale russe - Soyouz, missions à l'ISS",
    cnsa: "Agence Spatiale Nationale Chinoise - Chang'e (Lune), Tianhe (station spatiale)",
    jaxaa: "Agence Spatiale Japonaise - explorations Lune et astéroïdes",
    jwst: "James Webb Space Telescope - télescope spatial le plus puissant (lancé 2021)",
    hubble: "Hubble Space Telescope - révolutionné notre compréhension de l'univers",
    voyager: "Sondes Voyager 1 et 2 - plus loin que toute autre sonde (interstellaire)",
    cassini: "Mission Cassini-Huygens à Saturne (2004-2017)",
    juno: "Mission Juno à Jupiter (2016-actuelle)",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  },

  // ========== ASTRONOMIE MODERNE ==========
  astronomie_moderne: {
    telescopes: "Observent depuis radio à rayons-X, révèlent l'univers invisible",
    spectroscopie: "Analyse la lumière pour déterminer composition chimique, température, mouvement",
    detections_gravitationnelles: "LIGO détecte les ondes gravitationnelles (fusion de trous noirs, etc.)",
    imagerie_directe: "Photographie directe des exoplanètes de plus en plus possible",
    missions_marsites: "Rovers cherchent des preuves de vie microbienne passée sur Mars",
    recherche_vie: "SETI écoute les signaux radio d'éventuelles civilisations alien",
    image: "https://images.unsplash.com/photo-1462331940975-31f4c1838cda?w=400&h=300&fit=crop"
  }
};

module.exports = astronomyKnowledge;
