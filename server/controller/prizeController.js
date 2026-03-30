const prizeDao = require('../model/prizeDao');

function parseId(idValue) {
    const id = Number(idValue);
    return Number.isInteger(id) ? id : null;
}

function normalizePrizeInput(body) {
    return {
        name: typeof body.name === 'string' ? body.name.trim() : '',
        category: typeof body.category === 'string' ? body.category.trim() : '',
        pointsCost: Number(body.pointsCost),
    };
}

exports.getAllPrizes = async function(req, res, next) {
    try {
        const prizes = await prizeDao.getAllPrizes();
        res.status(200).json(prizes);
    } catch (error) {
        next(error);
    }
};

exports.createPrize = async function(req, res, next) {
    try {
        const prize = normalizePrizeInput(req.body);

        if (!prize.name || !prize.category || !Number.isFinite(prize.pointsCost) || prize.pointsCost < 0) {
            return res.status(400).json({
                error: 'Name, category, and a non-negative points cost are required.',
            });
        }

        const createdPrize = await prizeDao.createPrize(prize);
        res.status(201).json(createdPrize);
    } catch (error) {
        next(error);
    }
};

exports.updatePrize = async function(req, res, next) {
    try {
        const id = parseId(req.params.id);
        const prize = normalizePrizeInput(req.body);

        if (id === null) {
            return res.status(400).json({ error: 'Prize id must be a number.' });
        }

        if (!prize.name || !prize.category || !Number.isFinite(prize.pointsCost) || prize.pointsCost < 0) {
            return res.status(400).json({
                error: 'Name, category, and a non-negative points cost are required.',
            });
        }

        const updatedPrize = await prizeDao.updatePrize(id, prize);

        if (!updatedPrize) {
            return res.status(404).json({ error: 'Prize not found.' });
        }

        res.status(200).json(updatedPrize);
    } catch (error) {
        next(error);
    }
};

exports.deletePrize = async function(req, res, next) {
    try {
        const id = parseId(req.params.id);

        if (id === null) {
            return res.status(400).json({ error: 'Prize id must be a number.' });
        }

        const deletedPrize = await prizeDao.deletePrize(id);

        if (!deletedPrize) {
            return res.status(404).json({ error: 'Prize not found.' });
        }

        res.status(200).json(deletedPrize);
    } catch (error) {
        next(error);
    }
};
