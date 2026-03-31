const prizeDao = require('../model/prizeDao');

exports.getAllPrizes = async function(req, res, next) {
    try {
        const prizes = await prizeDao.getAllPrizes();
        res.status(200).json(prizes);
    } catch (error) {
        next(error);
    }
};

exports.getPrizeById = async function(req, res, next) {
    try {
        const id = Number(req.params.id);
        const prize = await prizeDao.readPrize(id);
        res.status(200).json(prize);
    } catch (error) {
        next(error);
    }
};

exports.createPrize = async function(req, res, next) {
    try {
        const prize = req.body;
        const createdPrize = await prizeDao.createPrize(prize);
        res.status(201).json(createdPrize);
    } catch (error) {
        next(error);
    }
};

exports.updatePrize = async function(req, res, next) {
    try {
        const id = Number(req.params.id);
        const prize = req.body;
        const updatedPrize = await prizeDao.updatePrize(id, prize);
        res.status(200).json(updatedPrize);
    } catch (error) {
        next(error);
    }
};

exports.deletePrize = async function(req, res, next) {
    try {
        const id = Number(req.params.id);
        const deletedPrize = await prizeDao.deletePrize(id);
        res.status(200).json(deletedPrize);
    } catch (error) {
        next(error);
    }
};
