const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    delete sauceObjet._id;
    delete sauceObjet._userId;
    const sauce = new Sauce({
        ...sauceObjet,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObjet = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete sauceObjet._userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé'})
            } else {
                Sauce.updateOne({ _id: req.params.id}, {...sauceObjet, _id: req.params.id})
                    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé'})
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id})
                        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                        .catch( error => res.status(401).json({ message: 'Non autorisé'}));
                })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};

exports.likesDislikes = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;

    if (like === 1) {
        Sauce.updateOne({ _id: req.params.id}, {$push: {userLiked: userId}, $inc: {likes: +1}})
            .then(() => res.status(200).json({ message : "J'aime cette sauce ! "}))
            .catch((error) => res.status(400).json({ error }));
    }

    if (like === -1) {
        Sauce.updateOne({ _id: req.params.id }, {$push: {usersDisliked: userId}, $inc: {dislikes: +1}})
            .then(() => res.status(200).json({ message: "Je n'aime pas cette sauce !"}))
            .catch((error) => res.status(400).json({ error }));
    }

    if (like === 0) { 
        Sauce.findOne({ _id: req.params.id })
          .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) {
              Sauce.updateOne({ _id: req.params.id }, {$pull: {usersLiked: userId}, $inc: {likes: -1}})
                .then(() => res.status(200).json({ message: "J'aime retiré !" }))
                .catch((error) => res.status(400).json({ error }))
            }
            if (sauce.usersDisliked.includes(userId)) {
              Sauce.updateOne({ _id: req.params.id }, {$pull: {usersDisliked: userId}, $inc: {dislikes: -1}})
                .then(() => res.status(200).json({ message: "Je n'aime pas retiré !" }))
                .catch((error) => res.status(400).json({ error }))
            }
            })
          .catch((error) => res.status(404).json({ error }))
      }
}