const express = require('express');
const { createUser } = require('../controllers/yogaForm');
const { updateBatch } = require('../controllers/updateForm');
const router = express.Router();

// Define routes for user-related operations
router.post('/createUser', createUser);
// router.post('/confirm/:userId', confirmAdmission);
router.put('/updateBatch', updateBatch);

module.exports = router;
