// Création des constantes
const express = require('express');
const app = express();

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

// Export de la constante
module.exports = app;