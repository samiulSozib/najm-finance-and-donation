const paymentService = require('../services/paymentService');

// Create a new Payment
exports.createPayment = async (req, res) => {
    const { member_id, payment_date, amount, payment_type, event_id } = req.body;

    try {
        if (!member_id || !payment_date || !amount || !payment_type) {
            return res.status(400).json({
                status: false,
                message: 'Missing required fields'
            });
        }

        const newPayment = await paymentService.createPayment({
            member_id,
            payment_date,
            amount,
            payment_type,
            event_id
        });

        return res.status(201).json({
            status: true,
            message: 'Payment created successfully',
            data: newPayment
        });
    } catch (error) {
        if (error.message === 'Member or Event not found') {
            return res.status(404).json({
                status: false,
                message: error.message
            });
        }

        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get all Payments
exports.getAllPayments = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const item_per_page = parseInt(req.query.item_per_page) || 10;

    try {
        const payments = await paymentService.getAllPayments(page, item_per_page);
        const total_pages = Math.ceil(payments.count / item_per_page);
        
        return res.status(200).json({
            status: true,
            data: payments.rows,
            payload: {
                pagination: {
                    current_page: page,
                    per_page: item_per_page,
                    total_items: payments.count,
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

// Get a Payment by ID
exports.getPaymentById = async (req, res) => {
    const paymentId = req.params.id;

    try {
        const payment = await paymentService.getPaymentById(paymentId);

        if (!payment) {
            return res.status(404).json({
                status: false,
                message: 'Payment not found'
            });
        }

        return res.status(200).json({
            status: true,
            data: payment
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Update a Payment by ID
exports.updatePayment = async (req, res) => {
    const paymentId = req.params.id;
    const { member_id, payment_date, amount, payment_type, event_id } = req.body;

    try {
        if (!member_id || !payment_date || !amount || !payment_type) {
            return res.status(400).json({
                status: false,
                message: 'Missing required fields'
            });
        }

        const updatedPayment = await paymentService.updatePayment(paymentId, {
            member_id,
            payment_date,
            amount,
            payment_type,
            event_id
        });

        if (!updatedPayment) {
            return res.status(404).json({
                status: false,
                message: 'Payment not found'
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Payment updated successfully',
            data: updatedPayment
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Delete a Payment by ID
exports.deletePayment = async (req, res) => {
    const paymentId = req.params.id;

    try {
        const payment = await paymentService.deletePayment(paymentId);

        if (!payment) {
            return res.status(404).json({
                status: false,
                message: 'Payment not found'
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Payment deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};
