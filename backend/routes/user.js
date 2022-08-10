// Création des constantes
const express = require('express');
const userCtrl = require('../controllers/user');
const router = express.Router();


// Création des routes prévues par le frontend
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;