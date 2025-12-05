@echo off
REM 🔧 Script de Correction - ChatBot Univers (Windows)

echo.
echo 🚀 Correction des Erreurs du ChatBot...
echo.

REM Vérifier Node.js
echo 📋 Vérification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé
    echo    Installez Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js installé
echo.

REM Vérifier .env
echo 📋 Vérification de .env...
if not exist .env (
    echo ⚠️  .env n'existe pas, création...
    (
        echo # Configuration ChatBot Univers
        echo PORT=3000
        echo.
        echo # Hugging Face (optionnel)
        echo # HF_API_TOKEN=sk_xxxxxxx
        echo # HF_MODEL=google/flan-t5-base
        echo.
        echo # Unsplash (optionnel)
        echo # UNSPLASH_ACCESS_KEY=xxxxxxx
    ) > .env
    echo ✅ .env créé avec valeurs par défaut
) else (
    echo ✅ .env existe
)

echo.

REM Vérifier et remplacer le serveur
echo 📋 Mise à jour du serveur...
if exist server.js (
    echo   Suppression de l'ancien server.js...
    del server.js
    echo ✅ Ancien serveur supprimé
)

if not exist server-fixed.js (
    echo ❌ server-fixed.js n'existe pas
    echo    Veuillez télécharger le fichier corrigé
    pause
    exit /b 1
)

echo   Copie du nouveau serveur...
copy server-fixed.js server.js >nul
echo ✅ Nouveau serveur activé

echo.

REM Installer les dépendances
echo 📋 Installation des dépendances npm...
call npm install

echo.
echo ✅ Correction terminée!
echo.
echo 🚀 Pour démarrer le ChatBot:
echo    npm start
echo.
echo 🌐 Accès:
echo    http://localhost:3000
echo.
echo 📊 Vérifier la santé du serveur:
echo    curl http://localhost:3000/health
echo.

pause
