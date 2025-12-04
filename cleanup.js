const fs = require('fs');
const path = require('path');

const filesToDelete = [
  // HTML doublons
  '3d-explorer.html',
  '3d-explorer-fixed.html',
  '3d-universe-final.html',
  '3d-universe-simple.html',
  '3d-universe-working-v2.html',
  '3d-universe-working.html',
  '3d-universe.html',
  '3d-working.html',
  'explorer3d-revamp.html',
  'index-3d.html',
  'universe-3d-working.html',
  'universe-3d.html',
  'TEST.html',
  'TEST_IMAGES.html',

  // JS doublons
  'controls-module.js',
  'controls-shim.js',
  'debug.js',
  'download_textures.js',
  'explorer3d-enhanced.js',
  'explorer3d-final.js',
  'explorer3d-revamp.js',
  'explorer3d.js',
  'universe3d.js',
  'viz3d-planets.js',
  'viz3d.js',
  'show-summary.js',
  'setup-ai.js',
  'test-images.js',
  'start.js',
  'start-server.js',
  'server-simple.js',
  'TEST.js',

  // MD redondants
  '00_READ_ME_FIRST.md',
  '3D_EXPLORER_GUIDE.md',
  '3D_FIXED.md',
  '3D_READY.md',
  '3D_VISUALIZATION.md',
  'ACTIVATE.md',
  'ACTIVATE_NOW.md',
  'AI_SETUP.md',
  'AI_SOLUTION.md',
  'CHANGELOG_IMAGES.md',
  'CLEANUP.md',
  'COMPLETE_GUIDE.md',
  'CONCLUSION.md',
  'CONFIGURE_NOW.md',
  'CRASH_FIX.md',
  'EXAMPLES.txt',
  'FINAL_SUMMARY.md',
  'FINAL_SUMMARY.txt',
  'FIXED.md',
  'FIX_EASY.md',
  'FIX_ENV.md',
  'FIX_NOW.md',
  'FIX_WORKING.md',
  'IMAGES_FIXES.md',
  'IMAGES_STATUS.md',
  'IMAGES_SYSTEM.md',
  'IMAGE_CORRECTIONS.md',
  'IMPROVEMENTS.txt',
  'IMPROVEMENTS_IMAGES.md',
  'INDEX.md',
  'MANIFEST.md',
  'PROJECT_COMPLETE.md',
  'QUICKSTART.md',
  'QUICKSTART_IMAGES.md',
  'QUICK_AI_SETUP.md',
  'README_FINAL.md',
  'RESUME_EXECUTIF.md',
  'RESUME_FINAL.md',
  'SERVER_FIX.md',
  'SETUP_IMAGES.md',
  'START.md',
  'START_HERE.md',
  'SUMMARY.txt',
  'SYSTEM_COMPLETE.md',
  'TLDR.md',
  'VERIFICATION.md',
  'WELCOME.md',
  'CLEANUP_STATUS.md',
  'cleanup.js'
];

const projectRoot = __dirname;
let deletedCount = 0;

console.log('🧹 Nettoyage du projet...\n');

filesToDelete.forEach(file => {
  const filePath = path.join(projectRoot, file);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ Supprimé: ${file}`);
      deletedCount++;
    }
  } catch (err) {
    console.log(`❌ Erreur avec ${file}: ${err.message}`);
  }
});

console.log(`\n✅ Nettoyage terminé! ${deletedCount} fichiers supprimés.\n`);
console.log('📁 Structure finale:');
console.log('  - index.html (chatbot)');
console.log('  - 3d-universe-pro.html (univers 3D)');
console.log('  - 3d-planets.html (planètes)');
console.log('  - styles.css');
console.log('  - script.js');
console.log('  - server.js');
console.log('  - package.json');
console.log('\n🚀 Démarrez avec: npm run dev');
