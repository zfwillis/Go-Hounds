const fs = require('fs/promises');
const path = require('path');

const prizesFilePath = path.join(__dirname, '..', '..', 'prizes.json');

async function readPrizes() {
    const prizesJson = await fs.readFile(prizesFilePath, 'utf8');
    return JSON.parse(prizesJson);
}

async function writePrizes(prizes) {
    await fs.writeFile(prizesFilePath, `${JSON.stringify(prizes, null, 4)}\n`, 'utf8');
}

exports.getAllPrizes = async function() {
    return readPrizes();
};

exports.createPrize = async function(prizeData) {
    const prizes = await readPrizes();
    const nextId = prizes.reduce(function(maxId, prize) {
        return Math.max(maxId, prize._id);
    }, 0) + 1;

    const newPrize = {
        _id: nextId,
        name: prizeData.name,
        description: `${prizeData.name} prize option`,
        pointsCost: prizeData.pointsCost,
        category: prizeData.category,
        stock: 0,
    };

    prizes.push(newPrize);
    await writePrizes(prizes);

    return newPrize;
};

exports.updatePrize = async function(id, prizeData) {
    const prizes = await readPrizes();
    const prizeIndex = prizes.findIndex(function(prize) {
        return prize._id === id;
    });

    if (prizeIndex === -1) {
        return null;
    }

    prizes[prizeIndex] = {
        ...prizes[prizeIndex],
        name: prizeData.name,
        category: prizeData.category,
        pointsCost: prizeData.pointsCost,
    };

    await writePrizes(prizes);
    return prizes[prizeIndex];
};

exports.deletePrize = async function(id) {
    const prizes = await readPrizes();
    const prizeIndex = prizes.findIndex(function(prize) {
        return prize._id === id;
    });

    if (prizeIndex === -1) {
        return null;
    }

    const deletedPrize = prizes[prizeIndex];
    prizes.splice(prizeIndex, 1);
    await writePrizes(prizes);

    return deletedPrize;
};
