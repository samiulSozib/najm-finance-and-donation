const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const checkPermission =require('../middlewares/checkPermission')

// Route to create a new group
router.post('/', groupController.createGroup);

// Route to update a group by ID
router.put('/:id', groupController.updateGroup);

// Route to delete a group by ID
router.delete('/:id', groupController.deleteGroup);

// Route to get all groups (with pagination)
router.get('/group-type', groupController.getAllGroupsByGroupType);

// Route to get a group by ID
router.get('/:id', groupController.getGroupById);

module.exports = router;
