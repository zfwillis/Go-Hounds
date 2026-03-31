const fs = require('fs/promises');
const path = require('path');

const prizesFilePath = path.join(__dirname, '..', '..', 'prizes.json');

async function readPrizes() {
    const prizesJson = await fs.readFile(prizesFilePath, 'utf8');
    return JSON.parse(prizesJson);
}

async function writePrizes(prizes) {
    await fs.writeFile(prizesFilePath, JSON.stringify(prizes, null, 4), 'utf8');
}

function pos(prizes, id) { // not exported, finds the pos in the array
    for (let i = 0; i < prizes.length; i++)
        if (prizes[i]._id === id) { return i; }
    return -1;
}

exports.getAllPrizes = async function() {
    return readPrizes();
};

exports.createPrize = async function(prizeData) {
    const prizes = await readPrizes();
    const newPrize = {
        name: prizeData.name,
        description: prizeData.description || '',
        category: prizeData.category,
        pointsCost: prizeData.pointsCost,
        stock: prizeData.stock ?? 0,
    };

    if (prizes.length === 0) newPrize._id = 1;
    else newPrize._id = prizes[prizes.length - 1]._id + 1;

    prizes.push(newPrize);
    await writePrizes(prizes);
    return newPrize;
};

exports.readPrize = async function(id) {
    const prizes = await readPrizes();
    const index = pos(prizes, id);
    if (index >= 0) { return prizes[index]; }
    return null;
};

exports.deletePrize = async function(id) {
    const prizes = await readPrizes();
    const index = pos(prizes, id);
    let prize = null;
    if (index >= 0) { prize = prizes[index]; prizes.splice(index, 1); }
    await writePrizes(prizes);
    return prize;
};

exports.updatePrize = async function(id, prizeData) {
    const prizes = await readPrizes();
    const index = pos(prizes, id);
    if (index === -1) return null;
    prizes[index].name = prizeData.name;
    prizes[index].category = prizeData.category;
    prizes[index].pointsCost = prizeData.pointsCost;
    await writePrizes(prizes);
    return prizes[index];
};
