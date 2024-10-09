const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const checkPermission = require('../middlewares/checkPermission');

// Create Event
router.post('/', eventController.createEvent);

// Update Event by ID
router.put('/:id', eventController.updateEvent);

// Delete Event by ID
router.delete('/:id', eventController.deleteEvent);

// Get All Events
router.get('/', eventController.getAllEvents);

// Get Event by ID
router.get('/:id', eventController.getEventById);

module.exports = router;
