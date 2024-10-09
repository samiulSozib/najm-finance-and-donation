const db = require('../database/db');

// Create a new Payment
const createPayment = async ({ member_id, payment_date, amount, payment_type, event_id }) => {
    const transaction = await db.sequelize.transaction();
    try {
        // Check if the member exists
        const member = await db.Member.findByPk(member_id, { transaction });
        if (!member) {
            throw new Error('Member not found');
        }

        // Check if the event exists (if event_id is provided)
        if (event_id) {
            const event = await db.Event.findByPk(event_id, { transaction });
            if (!event) {
                throw new Error('Event not found');
            }
        }

        // Create the payment
        const createdPayment = await db.Payment.create({
            member_id,
            payment_date,
            amount,
            payment_type,
            event_id,
            status:'pending'
        }, { transaction });

        const newPayment=await db.Payment.findByPk(createdPayment.id,{
            include:[
                { model: db.Member },
                { model: db.Event, required: false }
            ],transaction
        })

        await transaction.commit();
        return newPayment;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Update a Payment by ID
const updatePayment = async (paymentId, { member_id, payment_date, amount, payment_type, event_id }) => {
    const transaction = await db.sequelize.transaction();
    try {
        const payment = await db.Payment.findByPk(paymentId, { transaction });
        if (!payment) {
            throw new Error('Payment not found');
        }

        // Check if the member exists
        const member = await db.Member.findByPk(member_id, { transaction });
        if (!member) {
            throw new Error('Member not found');
        }

        // Check if the event exists (if event_id is provided)
        if (event_id) {
            const event = await db.Event.findByPk(event_id, { transaction });
            if (!event) {
                throw new Error('Event not found');
            }
        }

        // Update the payment
        await db.Payment.update({
            member_id,
            payment_date,
            amount,
            payment_type,
            event_id
        }, {
            where: { id: paymentId },
            transaction
        });

        const updatedPayment = await db.Payment.findByPk(paymentId, {
            include:[
                { model: db.Member },
                { model: db.Event, required: false }
            ], transaction }
        );
        await transaction.commit();
        return updatedPayment;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Delete a Payment by ID
const deletePayment = async (paymentId) => {
    const transaction = await db.sequelize.transaction();
    try {
        const payment = await db.Payment.findByPk(paymentId, { transaction });
        if (!payment) {
            throw new Error('Payment not found');
        }

        await db.Payment.destroy({
            where: { id: paymentId },
            transaction
        });

        await transaction.commit();
        return { message: 'Payment deleted successfully' };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Get all Payments with pagination
const getAllPayments = async (page, item_per_page) => {
    const offset = (page - 1) * item_per_page;
    try {
        const payments = await db.Payment.findAndCountAll({
            include: [
                { model: db.Member },
                { model: db.Event, required: false } // If event is optional
            ],
            limit: item_per_page,
            offset: offset
        });
        return payments;
    } catch (error) {
        throw error;
    }
};

// Get Payment by ID
const getPaymentById = async (paymentId) => {
    try {
        const payment = await db.Payment.findByPk(paymentId, {
            include: [
                { model: db.Member },
                { model: db.Event, required: false } // If event is optional
            ]
        });

        if (!payment) {
            throw new Error('Payment not found');
        }

        return payment;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPayment,
    updatePayment,
    deletePayment,
    getAllPayments,
    getPaymentById
};
