// Création des constantes
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

/*Fonction signup :
Appel de la fonction bcrypt pour hacher le mot de passe 10 fois
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
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/*Fonction login : 
On recherche l'email présent dans la requête
Si l'email est présent, on compare le mot de passe renseigné par celui enregistré grâce à bcrypt
Si le couple est correcte, la fonction est valide et renvoi un token utilisable 24h
Sinon erreur 500 ou 401
*/
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user === null) {
                return res.status(401).json({ message: 'Ensemble identifiant/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid){
                        return res.status(401).json({ message: 'Ensemble identifiant/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};