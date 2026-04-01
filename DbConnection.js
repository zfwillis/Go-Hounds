// Just added this from code from class not for assignmetn #4
require('dotenv').config();
const mongoose = require('mongoose');

exports.connect = async function() {
   const uri = process.env.MONGO_URI || process.env.DB_URI;

   if (!uri) {
      throw new Error('Missing MongoDB connection string. Set MONGO_URI in your environment.');
   }

   try {
      await mongoose.connect(uri);
   } catch (error) {
      console.log(error);
      throw error;
   }
};

exports.disconnect = async function(){
   await mongoose.connection.close();
};


