const db = require('../database/db');

// Create a new Event
const createEvent = async ({ name, description, start_date, end_date }) => {
    const transaction = await db.sequelize.transaction();
    try {
        const newEvent = await db.Event.create({
            name,
            description,
            start_date,
            end_date
        }, { transaction });

        await transaction.commit();
        return newEvent;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Update an existing Event by ID
const updateEvent = async (eventId, { name, description, start_date, end_date }) => {
    const transaction = await db.sequelize.transaction();
    try {
        const event = await db.Event.findByPk(eventId, { transaction });
        if (!event) {
            throw new Error('Event not found');
        }

        await db.Event.update({
            name,
            description,
            start_date,
            end_date
        }, {
            where: { id: eventId },
            transaction
        });

        const updatedEvent = await db.Event.findByPk(eventId, { transaction });
        await transaction.commit();
        return updatedEvent;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Delete an Event by ID
const deleteEvent = async (eventId) => {
    const transaction = await db.sequelize.transaction();
    try {
        const event = await db.Event.findByPk(eventId, { transaction });
        if (!event) {
            throw new Error('Event not found');
        }

        await db.Event.destroy({
            where: { id: eventId },
            transaction
        });

        await transaction.commit();
        return { message: 'Event deleted successfully' };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Get all Events with pagination
const getAllEvents = async (page, item_per_page=null) => {

    if (!page || !item_per_page) {
        try {
            return await db.Event.findAndCountAll();
        } catch (error) {
            throw error;
        }
    }

    const offset = (page - 1) * item_per_page;
    try {
        return await db.Event.findAndCountAll({
            limit: item_per_page,
            offset: offset
        });
    } catch (error) {
        throw error;
    }
};

// Get Event by ID
const getEventById = async (eventId) => {
    try {
        const event = await db.Event.findByPk(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        return event;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
    getEventById
};
