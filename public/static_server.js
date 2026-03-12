const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(morgan('dev'));

let hostname = 'localhost';
let port = 4000;

// Serve static files from /public.
app.use(express.static('public'));

// RESTful GET action: returns an array of items stored in a JSON file.
app.get('/items', function (req, res, next) {
  const itemsPath = path.join(__dirname, '..', 'data', 'items.json');

  fs.readFile(itemsPath, 'utf8', function (err, data) {
    if (err) {
      res.status(500);
      res.send({ error: 'Unable to load items.' });
      return;
    }

    const lstItems = JSON.parse(data);
    res.status(200); // OK status
    res.send(lstItems); // Sending the array
    // res.end(); // optional in Express when using res.send/res.json
  });
});

app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}`);
});
