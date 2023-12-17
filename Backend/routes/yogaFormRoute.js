const express = require('express');
const { createUser } = require('../controllers/yogaForm');

const router = express.Router();

// Define routes for user-related operations
router.post('/createUser', createUser);

module.exports = router;
