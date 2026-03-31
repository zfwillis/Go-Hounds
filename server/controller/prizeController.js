const prizeDao = require('../model/prizeDao');

exports.getAll = function(req, res, next) {
    res.status(200);
    res.send(prizeDao.getAllPrizes());
    res.end();
};

exports.getById = function(req, res, next) {
    const id = Number(req.params.id);
    res.status(200);
    res.send(prizeDao.readPrize(id));
    res.end();
};

exports.postCreateOrUpdate = function(req, res, next) {
    const prize = req.body;
    if(prize._id) {
        res.status(200);
        res.send(prizeDao.updatePrize(prize._id, prize));
    } else {
        res.status(201);
        res.send(prizeDao.createPrize(prize));
    }
    res.end();
};

exports.remove = function(req, res, next) {
    const id = Number(req.params.id);
    res.status(200);
    res.send(prizeDao.deletePrize(id));
    res.end();
};