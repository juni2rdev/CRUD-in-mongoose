const express = require('express');
const router = express.Router();
const Client = require('../models/clients'); // Aqui deve ser '../models/client' (singular)

// READ all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        return res.send(clients); // Use 'res' em vez de 'response'
    } catch (e) {
        console.log(e);
        res.status(500).send('Erro ao buscar clientes');
    }
});
router.get('/client/:id', async (req, res) => {
    try {
        const clients = await Client.findById(req.params.id);
        return res.send(clients); // Use 'res' em vez de 'response'
    } catch (e) {
        console.log(e);
        res.status(500).send('Erro ao buscar clientes');
    }
});

// CREATE a new client
router.post('/createClient', async (req, res) => {
    try {
        const client = new Client(req.body); // Use 'req.body' em vez de 'require.body'
        await client.save();
        return res.send(client);
    } catch (e) {
        console.log(e);
        res.status(500).send('Erro ao criar cliente');
    }
});

// UPDATE a client
router.put('/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.send(client);
    } catch (e) {
        console.log(e);
        res.status(500).send('Erro ao atualizar cliente');
    }
});

// DELETE a client
router.delete('/delete/:id', async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        return res.send({ message: 'Cliente deletado com sucesso' });
    } catch (e) {
        console.log(e);
        res.status(500).send('Erro ao deletar cliente');
    }
});

module.exports = router;
