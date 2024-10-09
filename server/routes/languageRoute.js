const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');




// Route to get all Usras (with pagination)
router.get('/:iso_code', languageController.getTranslation);



module.exports = router;