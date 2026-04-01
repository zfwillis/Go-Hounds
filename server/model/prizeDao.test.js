const prizeDao = require('./prizeDao');

test('getAllPrizes returns the seeded prizes', function() {
    const prizes = prizeDao.getAllPrizes();
    expect(prizes.length).toBeGreaterThan(0);
    expect(prizes[0]._id).toBeDefined();
});

test('createPrize can be read back and deleted', function() {
    const newPrize = { name: 'Blanket', category: 'Home', pointsCost: 120 };
    const created = prizeDao.createPrize(newPrize);

    const found = prizeDao.readPrize(created._id);
    const deleted = prizeDao.deletePrize(created._id);
    const missing = prizeDao.readPrize(created._id);

    expect(created._id).toBeDefined();
    expect(found.name).toBe(created.name);
    expect(deleted._id).toBe(created._id);
    expect(missing).toBeNull();
});

test('updatePrize updates an existing prize', function() {
    const existingPrize = prizeDao.getAllPrizes()[0];
    const originalPrize = { ...existingPrize };
    const result = prizeDao.updatePrize(existingPrize._id, {
        name: 'Updated Prize',
        description: 'Updated Description',
        category: 'Home',
        pointsCost: 50
    });

    expect(result._id).toBe(existingPrize._id);
    expect(result.name).toBe('Updated Prize');
    expect(result.pointsCost).toBe(50);

    prizeDao.updatePrize(originalPrize._id, originalPrize);
});

test('missing prize operations return null', function() {
    expect(prizeDao.readPrize(-1)).toBeNull();
    expect(prizeDao.updatePrize(-1, { name: 'X', category: 'Y', pointsCost: 10 })).toBeNull();
    expect(prizeDao.deletePrize(-1)).toBeNull();
});

test('createPrize starts ids at 1 when the list is empty', function() {
    const originalPrizes = prizeDao.lstPrizes;
    prizeDao.lstPrizes = [];

    const created = prizeDao.createPrize({ name: 'Starter Prize', category: 'Test', pointsCost: 10 });

    expect(created._id).toBe(1);

    prizeDao.lstPrizes = originalPrizes;
});
