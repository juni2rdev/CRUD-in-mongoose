const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const clientRoutes = require('./routes/clientsroutes');

const app = express();
const port = 3000;

connectDB();


//Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use('/clients', clientRoutes);
    
//Servir arquivos estaticos
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`the server is running http://localhost:${port}`);
});