const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');




// Route to get all Usras (with pagination)
router.get('/', userController.getAllUser);



module.exports = router;
