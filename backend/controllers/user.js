// Création des constantes
const User = require('../models/user');

/*Fonction signup :
Appel de la fonction bscrypt pour hacher le mot de passe 10 fois
Création d'un nouvel utilisateur avec :
    un email présent dans la requête
    un mot de passe hashé
Sauvegarde de ce nouvel utilisateur
Message d'erreur 400 ou 500
*/
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then (hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.statuts.json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {

};