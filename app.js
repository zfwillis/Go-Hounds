const prizeCont = require("./server/controller/prizeController");
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Prize Routes
app.get('/prize', prizeCont.getAllPrizes);
app.get('/prize/:id', prizeCont.getPrizeById);
app.post('/prize', prizeCont.createPrize);
app.patch('/prize/:id', prizeCont.updatePrize);
app.delete('/prize/:id', prizeCont.deletePrize);

exports.app = app;
