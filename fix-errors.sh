#!/bin/bash

# 🔧 Script de Correction Automatique - ChatBot Univers

echo "🚀 Correction des Erreurs du ChatBot..."
echo ""

# Vérifier Node.js
echo "📋 Vérification des prérequis..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    echo "   Installez Node.js depuis: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Vérifier le fichier .env
echo "📋 Vérification de .env..."
if [ ! -f .env ]; then
    echo "⚠️  .env n'existe pas, création..."
    cat > .env << EOF
# Configuration ChatBot Univers
PORT=3000

# Hugging Face (optionnel)
# HF_API_TOKEN=sk_xxxxxxx
# HF_MODEL=google/flan-t5-base

# Unsplash (optionnel)
# UNSPLASH_ACCESS_KEY=xxxxxxx
EOF
    echo "✅ .env créé avec valeurs par défaut"
else
    echo "✅ .env existe"
fi

echo ""

# Vérifier le serveur
echo "📋 Vérification du serveur..."
if [ -f server.js ]; then
    echo "ℹ️  server.js existe (ancien)"
    echo "   Remplacement par server-fixed.js..."
    rm server.js
    echo "✅ Ancien serveur supprimé"
fi

if [ ! -f server-fixed.js ]; then
    echo "❌ server-fixed.js n'existe pas"
    echo "   Veuillez télécharger le fichier corrigé"
    exit 1
fi

# Renommer le serveur corrigé
cp server-fixed.js server.js
echo "✅ Nouveau serveur activé"

echo ""

# Installer les dépendances
echo "📋 Installation des dépendances..."
npm install

echo ""
echo "✅ Correction terminée!"
echo ""
echo "🚀 Pour démarrer le ChatBot:"
echo "   npm start"
echo ""
echo "🌐 Accès:"
echo "   http://localhost:3000"
echo ""
echo "📊 Vérifier la santé:"
echo "   curl http://localhost:3000/health"
echo ""
