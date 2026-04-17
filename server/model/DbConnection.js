require('dotenv').config();
const mongoose = require("mongoose");

exports.connect = async function(where){
    let uri = process.env.MONGO_URI || process.env.DB_URI;
    if(where === 'test') uri = process.env.TESTDB_URI;
    if(process.env.CI) uri = "mongodb://adm:secret@localhost:27017"; //CI test

    if (!uri) {
        throw new Error('Missing MongoDB connection string. Set MONGO_URI in your environment.');
    }

    try{
        await mongoose.connect(uri);
    }catch(error){
        console.log(error);
    }
}

exports.disconnect = async function(){
    await mongoose.connection.close();
}
