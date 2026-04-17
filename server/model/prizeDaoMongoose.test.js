const prizeDao = require('./prizeDaoMongoose');
const dbcon = require('./DbConnection');

beforeAll(async function() {
    await dbcon.connect('test');
    await prizeDao.deleteAll('test');
});

afterAll(async function() {
    await dbcon.disconnect();
});

afterEach(async function() {
    await prizeDao.deleteAll('test');
});

test('Create New Prize Mongoose', async function() {
    let newPrize = { name: 'Gold Medal', description: 'Top prize', category: 'Athletics', pointsCost: 100 };
    let created = await prizeDao.createPrize(newPrize);
    let found = await prizeDao.readPrize(created._id);
    expect(created._id).toBeDefined();
    expect(found).not.toBeNull();
    expect(created.name).toEqual(found.name);
});

test('Delete a Prize', async function() {
    let newPrize = { name: 'Silver Medal', description: 'Second prize', category: 'Swimming', pointsCost: 50 };
    let created = await prizeDao.createPrize(newPrize);
    let foundBeforeDel = await prizeDao.readPrize(created._id);
    let deleted = await prizeDao.deletePrize(created._id);
    let foundAfterDel = await prizeDao.readPrize(created._id);
    expect(foundBeforeDel).not.toBeNull();
    expect(foundAfterDel).toBeNull();
    expect(deleted.name).toEqual(created.name);
});

test('Read all prizes - Empty database', async function() {
    let lstPrizes = await prizeDao.getAllPrizes();
    expect(lstPrizes.length).toBe(0);
});

test('Read all prizes', async function() {
    let p1 = { name: 'Gold Medal', category: 'Athletics', pointsCost: 100 };
    let p2 = { name: 'Silver Medal', category: 'Swimming', pointsCost: 50 };
    let p3 = { name: 'Bronze Medal', category: 'Running', pointsCost: 25 };
    await prizeDao.createPrize(p1);
    await prizeDao.createPrize(p2);
    await prizeDao.createPrize(p3);
    let lstPrizes = await prizeDao.getAllPrizes();
    expect(lstPrizes.length).toBe(3);
});

test('Update a Prize', async function() {
    let newPrize = { name: 'Old Name', category: 'Tennis', pointsCost: 30 };
    let created = await prizeDao.createPrize(newPrize);
    let updated = await prizeDao.updatePrize(created._id, { name: 'New Name', category: 'Tennis', pointsCost: 40 });
    expect(updated.name).toEqual('New Name');
    expect(updated.pointsCost).toEqual(40);
});

test('Read a Prize by ID', async function() {
    let newPrize = { name: 'Trophy', category: 'Basketball', pointsCost: 75 };
    let created = await prizeDao.createPrize(newPrize);
    let found = await prizeDao.readPrize(created._id);
    expect(found).not.toBeNull();
    expect(found.name).toEqual(created.name);
});

test('Read a Prize that does not exist', async function() {
    let found = await prizeDao.readPrize('000000000000000000000000');
    expect(found).toBeNull();
});