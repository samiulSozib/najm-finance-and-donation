const eventService = require('../services/eventService');

// Create a new Event
exports.createEvent = async (req, res) => {
    const { name, description, start_date, end_date } = req.body;

    try {
        const newEvent = await eventService.createEvent({
            name,
            description,
            start_date,
            end_date
        });
        return res.status(201).json({
            status: true,
            message: 'Event created successfully',
            data: newEvent
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Update an Event by ID
exports.updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const { name, description, start_date, end_date } = req.body;

    try {
        const updatedEvent = await eventService.updateEvent(eventId, {
            name,
            description,
            start_date,
            end_date
        });
        return res.status(200).json({
            status: true,
            message: 'Event updated successfully',
            data: updatedEvent
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Delete an Event by ID
exports.deleteEvent = async (req, res) => {
    const eventId = req.params.id;

    try {
        await eventService.deleteEvent(eventId);
        return res.status(200).json({
            status: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get all Events
exports.getAllEvents = async (req, res) => {
    const page = parseInt(req.query.page) || null;
    const item_per_page = parseInt(req.query.item_per_page) || null;

    try {
        const events = await eventService.getAllEvents(page, item_per_page);
        const total_pages = item_per_page ? Math.ceil(events.count / item_per_page) : 1;
        return res.status(200).json({
            status: true,
            data: events.rows,
            payload: {
                pagination: {
                    current_page: page||1,
                    per_page: item_per_page||events.count,
                    total_items: events.count,
                    total_pages: total_pages
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get Event by ID
exports.getEventById = async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await eventService.getEventById(eventId);
        return res.status(200).json({
            status: true,
            data: event
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};
