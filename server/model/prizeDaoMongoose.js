const mongoose = require('mongoose');

const prizeSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, required: true },
    pointsCost: { type: Number, required: true }
});

const prizeModel = mongoose.model('prize', prizeSchema);

exports.getAllPrizes = async function() {
    const prizes = await prizeModel.find();
    return prizes;
};

exports.readPrize = async function(id) {
    const prize = await prizeModel.findById(id);
    return prize;
};

exports.createPrize = async function(prizeData) {
    const prize = new prizeModel(prizeData);
    await prize.save();
    return prize;
};

exports.updatePrize = async function(id, prizeData) {
    const prize = await prizeModel.findByIdAndUpdate(
        id,
        prizeData,
        { returnDocument: 'after' }
    );
    return prize;
};

exports.deletePrize = async function(id) {
    const prize = await prizeModel.findByIdAndDelete(id);
    return prize;
};

exports.deleteAll = async function(check) {
    if (check === 'test') {
        await prizeModel.deleteMany();
    }
};
