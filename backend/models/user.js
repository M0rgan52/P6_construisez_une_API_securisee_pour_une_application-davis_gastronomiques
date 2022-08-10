// Création des constantes
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/* Création du schéma utilisateurs 
email -> doit être unique
password
Ajout du plugin Mongoose Unique Validator pour vérifier
que le mot de passe soit bien unique avant l'exportation comme modèle
*/
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
