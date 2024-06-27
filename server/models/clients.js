const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nome: String, 
    email: String,
    celular: String, 
    cidade: String
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;