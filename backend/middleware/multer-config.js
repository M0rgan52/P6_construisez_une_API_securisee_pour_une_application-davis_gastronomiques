// Création de constantes
const multer = require('multer');
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/*Modification du nom de l'image entrante :
Nom d'origine en remplaçant les espaces par des _
Date du téléchargement avec milliseconde
Extension défini dans la constantes MIME_TYPES

Enregistrement dans le dossier images
*/
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');