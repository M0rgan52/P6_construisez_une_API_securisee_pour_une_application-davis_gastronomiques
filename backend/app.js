// Création des constantes
const express = require('express');
const app = express();

// Création de la réponse de base de la requête
app.use ((req, res) => {
    res.json({message : 'Le server est en fonctionnement'});
});

// Export de la constante
module.exports = app;