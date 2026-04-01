const prizeDao = require('../model/prizeDao');

test('getAllPrizes returns a list', function() {
    const prizes = prizeDao.getAllPrizes();
    expect(prizes).toBeDefined();
    expect(prizes.length).toBeGreaterThan(0);
});

test('createPrize adds a new prize', function() {
    const newPrize = { name: 'Blanket', category: 'Home', pointsCost: 120 };
    const created = prizeDao.createPrize(newPrize);
    expect(created).toBeDefined();
    expect(created._id).toBeDefined();
});

test('readPrize returns null for a prize that does not exist', function() {
    const prize = prizeDao.readPrize(-1);
    expect(prize).toBeNull();
});

test('updatePrize returns null for a prize that does not exist', function() {
    const result = prizeDao.updatePrize(-1, { name: 'X', category: 'Y', pointsCost: 10 });
    expect(result).toBeNull();
});

test('deletePrize returns null for a prize that does not exist', function() {
    const result = prizeDao.deletePrize(-1);
    expect(result).toBeNull();
});

test('updatePrize updates an existing prize', function() {
    const prizes = prizeDao.getAllPrizes();
    const existingId = prizes[0]._id;
    const result = prizeDao.updatePrize(existingId, { name: 'Updated Prize', category: 'Home', pointsCost: 50 });
    expect(result).toBeDefined();
    expect(result._id).toBe(existingId);
});
