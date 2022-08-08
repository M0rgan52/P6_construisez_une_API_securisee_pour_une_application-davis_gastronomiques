// Création des constantes
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const userRoutes = require('./routes/user');


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
    next();s
})

app.use ((req, res, next) => {
    console.log('Requête reçue');
    next();
});

app.use ((req, res, next) => {
    res.status(201);
    next()
});
// Création de la réponse de base de la requête
app.use ((req, res, next) => {
    res.json({message : 'Le server est en fonctionnement'});
    next();
});

app.use ((req, res) => {
    console.log('Réponse envoyée avec succès !');
});

// Enregistrement des routeurs 
app.use('/api/auth', userRoutes);

// Export de la constante
module.exports = app;