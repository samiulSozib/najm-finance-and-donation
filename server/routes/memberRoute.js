const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const checkPermission = require('../middlewares/checkPermission');


// get members whos payment is left in this month
router.get('/payment-left', memberController.getMembersWithoutPaymentsForCurrentMonth);

// Create a new member
router.post('/', memberController.createMember);

// Update an existing member by ID
router.put('/:id', memberController.updateMember);

// Delete a member by ID
router.delete('/:id', memberController.deleteMember);

// Get all members with optional Usra filtering and pagination
router.get('/', memberController.getAllMembers);

// Get a single member by ID
router.get('/:id', memberController.getMemberById);



module.exports = router;
