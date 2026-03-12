const express = require('express'); //imports express
const morgan = require('morgan'); //imports morgan
const fs = require('fs'); //imports fs to read JSON file
const app = express(); //creates a new Express Application
app.use(morgan('dev')); //For better logging, we use morgan

let hostname = 'localhost'; //address for this server
let port = 4000; //change the port if already in use

// Server will use the folder 'public'
app.use(express.static('public'));

// Read prizes data from JSON file
const lstPrizes = JSON.parse(fs.readFileSync('prizes.json', 'utf8'));

// REST - Read All (get)
app.get('/prize', function(req, res, next) {
    res.status(200); // Ok status
    res.send(lstPrizes); // Sending the array
    res.end(); // Ends the response (optional)
});

// Listen to client requests in hostname:port
const server = app.listen(port, hostname, function() {
    console.log(`Server running in ${hostname}:${port}`);
});