const express = require('express');
const router = express.Router();
const groupTypeController = require('../controllers/groupTypeController');

router.post('/', groupTypeController.createGroupType);
router.put('/:id', groupTypeController.updateGroupType);
router.delete('/:id', groupTypeController.deleteGroupType);
router.get('/', groupTypeController.getAllGroupTypes);
router.get('/:id', groupTypeController.getGroupTypeById);

module.exports = router;
