const express = require('express');
const router = express.Router();
const { getClients, addClient, getClientById, updateClient, deleteClient } = require('../controllers/clientController');

// Route to get all clients
router.get('/', getClients);

// Route to add a new client
router.post('/', addClient);

// Route to get a specific client by ID
router.get('/:id', getClientById);

// Route to update a client
router.put('/:id', updateClient);

// Route to delete a client
router.delete('/:id', deleteClient);

module.exports = router;
