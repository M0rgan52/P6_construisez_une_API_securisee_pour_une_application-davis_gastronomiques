// Création des constantes
const express = require('express');
const mongoose = require('mongoose');
// const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const app = express();

// Gestion des requêtes Express en JSON
app.use(express.json()); 

// Connexion API MongoDB
mongoose.connect('mongodb+srv://Morgan:PiiquanteP6@cluster0.uodwo5p.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// Création des headers pour les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

// Enregistrement des routeurs 
app.use('/api/auth', userRoutes);


app.use ((req, res, next) => {
    console.log('Requête reçue');
    next();
});

app.use ((req, res, next) => {
    res.status(201);
    next()
});

app.use ((req, res, next) => {
    res.json({message : 'Le server est en fonctionnement'});
    next();
});

app.use ((req, res) => {
    console.log('Réponse envoyée avec succès !');
});


// Export de la constante
module.exports = app;