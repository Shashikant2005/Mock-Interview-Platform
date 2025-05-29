// dbConnect.js
const mongoose = require( 'mongoose');
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable not set');
}

async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports= {dbConnect};
