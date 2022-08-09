// Création des constantes
const jwt = require('jsonwebtoken');

/*Récupération du token après l'espace dans le header de la requête
On décode le token pour vérifier sa validité
On extrait l'id pour l'exploitation sur toutes les routes
 */

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
}