// Création des constantes
const express = require('express');
const app = express();

// Création de la réponse de base de la requête
app.use ((req, res) => {
    res.json({message : 'Requête bien reçue !'});
});

// Export de la constante
module.exports = app;