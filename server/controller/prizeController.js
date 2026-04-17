const prizeDao = require('../model/prizeDaoMongoose');

exports.getAllPrizes = async function(req, res) {
    res.status(200);
    res.send(await prizeDao.getAllPrizes());
    res.end();
};

exports.getPrizeById = async function(req, res) {
    let id = req.params.id;
    let prize = await prizeDao.readPrize(id);
    if (prize != null) {
        res.status(200);
        res.send(prize);
    } else {
        res.status(404);
        res.send({ msg: 'Prize with this ID does not exist' });
    }
    res.end();
};

exports.createPrize = async function(req, res) {
    const createdPrize = await prizeDao.createPrize(req.body);
    res.status(201);
    res.send(createdPrize);
    res.end();
};

exports.updatePrize = async function(req, res) {
    const updatedPrize = await prizeDao.updatePrize(req.params.id, req.body);
    res.status(200);
    res.send(updatedPrize);
    res.end();
};

exports.deletePrize = async function(req, res) {
    const deletedPrize = await prizeDao.deletePrize(req.params.id);
    res.status(200);
    res.send(deletedPrize);
    res.end();
};