//const DotEnv = require('dotenv');
//DotEnv.config();
require('dotenv').config();
const dbcon = require('./server/model/DbConnection.js');
dbcon.connect();

const ExpApp = require('./app');


const server = ExpApp.app.listen(process.env.PORT,process.env.HOSTNAME,function(){ // Asynchronous Listen to client requests in hostname:port
    console.log(`Server running on ${process.env.HOSTNAME}:${process.env.PORT}`); // Must be here due to the asynchronous nature of the app.listen()
});
