const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log('MongoDB connected');
    }catch(e){
        console.log('Mongo db connection error', e);
        process.exit(1);
    };
};
module.exports = connectDB;