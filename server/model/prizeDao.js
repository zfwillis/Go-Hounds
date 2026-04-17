const seedPrizes = require('../../prizes.json');

exports.lstPrizes = seedPrizes.map(function(prize) {
    return { ...prize };
});

function pos(id) {
    for (let i = 0; i < exports.lstPrizes.length; i++) {
        if (exports.lstPrizes[i]._id === id) {
            return i;
        }
    }
    return -1;
}

exports.getAllPrizes = function() {
    return exports.lstPrizes;
};

exports.readPrize = function(id) {
    const index = pos(id);
    if (index >= 0) {
        return exports.lstPrizes[index];
    }
    return null;
};

exports.createPrize = function(prizeData) {
    const newPrize = {
        name: prizeData.name,
        description: prizeData.description || '',
        category: prizeData.category,
        pointsCost: prizeData.pointsCost
    };

    if (exports.lstPrizes.length === 0) {
        newPrize._id = 1;
    } else {
        newPrize._id = exports.lstPrizes[exports.lstPrizes.length - 1]._id + 1;
    }

    exports.lstPrizes.push(newPrize);
    return newPrize;
};

exports.updatePrize = function(id, prizeData) {
    const index = pos(id);
    if (index === -1) {
        return null;
    }

    exports.lstPrizes[index].name = prizeData.name;
    exports.lstPrizes[index].description = prizeData.description || '';
    exports.lstPrizes[index].category = prizeData.category;
    exports.lstPrizes[index].pointsCost = prizeData.pointsCost;
    return exports.lstPrizes[index];
};

exports.deletePrize = function(id) {
    const index = pos(id);
    let prize = null;

    if (index >= 0) {
        prize = exports.lstPrizes[index];
        exports.lstPrizes.splice(index, 1);
    }

    return prize;
};
