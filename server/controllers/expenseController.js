const expenseService = require('../services/expenseService');

// Create a new Expense
exports.createExpense = async (req, res) => {
    const { admin_id, event_id, category, reason, amount, payment_date } = req.body;

    try {
        const newExpense = await expenseService.createExpense({
            admin_id,
            event_id,
            category,
            reason,
            amount,
            payment_date
        });

        

        return res.status(201).json({
            status: true,
            message: 'Expense created successfully',
            data: newExpense
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Update an Expense by ID
exports.updateExpense = async (req, res) => {
    const expenseId = req.params.id;
    const { admin_id, event_id, category, reason, amount, payment_date } = req.body;

    try {
        const updatedExpense = await expenseService.updateExpense(expenseId, {
            admin_id,
            event_id,
            category,
            reason,
            amount,
            payment_date
        });
        return res.status(200).json({
            status: true,
            message: 'Expense updated successfully',
            data: updatedExpense
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Delete an Expense by ID
exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;

    try {
        await expenseService.deleteExpense(expenseId);
        return res.status(200).json({
            status: true,
            message: 'Expense deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get all Expenses
exports.getAllExpenses = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const item_per_page = parseInt(req.query.item_per_page) || 10;

    try {
        const expenses = await expenseService.getAllExpenses(page, item_per_page);
        const total_pages = Math.ceil(expenses.count / item_per_page);
        return res.status(200).json({
            status: true,
            data: expenses.rows,
            payload: {
                pagination: {
                    current_page: page,
                    per_page: item_per_page,
                    total_items: expenses.count,
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

// Get Expense by ID
exports.getExpenseById = async (req, res) => {
    const expenseId = req.params.id;

    try {
        const expense = await expenseService.getExpenseById(expenseId);
        return res.status(200).json({
            status: true,
            data: expense
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};
