// Création des constantes
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connexion API MongoDB
mongoose.connect(process.env.SECRET_DB,
{ useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Création des headers pour les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

// Gestion des requêtes Express en JSON
app.use(express.json()); 

// Enregistrement des routeurs 
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Export de la constante
module.exports = app;