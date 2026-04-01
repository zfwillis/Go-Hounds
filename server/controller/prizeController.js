const prizeDao = require('../model/prizeDao');

exports.getAllPrizes = function(req, res) {
    const prizes = prizeDao.getAllPrizes();
    res.status(200).json(prizes);
    res.end()
};

exports.getPrizeById = function(req, res) {
    const id = Number(req.params.id);
    const prize = prizeDao.readPrize(id);
    res.status(200).json(prize);
    res.end()
};

exports.createPrize = function(req, res) {
    const prize = req.body;
    const createdPrize = prizeDao.createPrize(prize);
    res.status(201).json(createdPrize);
    res.end()
};

exports.updatePrize = function(req, res) {
    const id = Number(req.params.id);
    const prize = req.body;
    const updatedPrize = prizeDao.updatePrize(id, prize);
    res.status(200).json(updatedPrize);
    res.end();
};

exports.deletePrize = function(req, res) {
    const id = Number(req.params.id);
    const deletedPrize = prizeDao.deletePrize(id);
    res.status(200).json(deletedPrize);
    res.end();
};
