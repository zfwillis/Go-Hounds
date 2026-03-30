const express = require('express');
const morgan = require('morgan');
const prizeController = require('./server/controller/prizeController');

const app = express();

let hostname = 'localhost';
let port = 4000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/prize', prizeController.getAllPrizes);
app.post('/prize', prizeController.createPrize);
app.patch('/prize/:id', prizeController.updatePrize);
app.delete('/prize/:id', prizeController.deletePrize);

app.use(express.static('public'));

app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
});

const server = app.listen(port, hostname, function() {
    console.log(`Server running in ${hostname}:${port}`);
});

module.exports = server;
