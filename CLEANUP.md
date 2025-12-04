# Nettoyage du Projet

## Fichiers à conserver (essentiels)
- `index.html` - Page principale du chatbot
- `server.js` - Serveur Express
- `styles.css` - Styles CSS
- `script.js` - Logique JavaScript du chatbot
- `package.json` - Dépendances
- `.env` - Variables d'environnement
- `3d-universe.html` - Visualisation 3D (à corriger)

## Fichiers à supprimer (doublons/obsolètes)
- Tous les fichiers `3d-*.html` sauf `3d-universe.html`
- Tous les fichiers `universe-3d*.html`
- Tous les fichiers `explorer3d*.html`
- `TEST.html`, `TEST.js`, `TEST_IMAGES.html`
- `test-images.js`, `debug.js`, `download_textures.js`
- Tous les fichiers `*.md` de documentation sauf README.md
- Les fichiers `*-simple.js`, `*-revamp.js`, `*-enhanced.js`, `*-final.js`
- `controls-module.js`, `controls-shim.js`
- Les scripts d'initialisation en double

## Structure finale
```
chatbotunivers/
├── index.html              (page principale)
├── server.js               (backend Express)
├── styles.css              (styles)
├── script.js               (logique chatbot)
├── 3d-universe.html        (visualisation 3D)
├── package.json
├── .env
├── node_modules/
└── README.md               (documentation)
```
