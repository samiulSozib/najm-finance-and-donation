const expenseCategoryService = require('../services/expenceCategoryService');

// Create a new ExpenseCategory
exports.createExpenseCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newCategory = await expenseCategoryService.createExpenseCategory({
            name,
            description
        });
        return res.status(201).json({
            status: true,
            message: 'Expense Category created successfully',
            data: newCategory
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Update an ExpenseCategory by ID
exports.updateExpenseCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    try {
        const updatedCategory = await expenseCategoryService.updateExpenseCategory(categoryId, {
            name,
            description
        });
        return res.status(200).json({
            status: true,
            message: 'Expense Category updated successfully',
            data: updatedCategory
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Delete an ExpenseCategory by ID
exports.deleteExpenseCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        await expenseCategoryService.deleteExpenseCategory(categoryId);
        return res.status(200).json({
            status: true,
            message: 'Expense Category deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get all ExpenseCategories
exports.getAllExpenseCategories = async (req, res) => {
    const page = parseInt(req.query.page) || null;
    const item_per_page = parseInt(req.query.item_per_page) || null;

    try {
        const categories = await expenseCategoryService.getAllExpenseCategories(page, item_per_page);
        const total_pages = item_per_page ? Math.ceil(categories.count / item_per_page) : 1;
        return res.status(200).json({
            status: true,
            data: categories.rows,
            payload: {
                pagination: {
                    current_page: page||1,
                    per_page: item_per_page||categories.count,
                    total_items: categories.count,
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

// Get ExpenseCategory by ID
exports.getExpenseCategoryById = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await expenseCategoryService.getExpenseCategoryById(categoryId);
        return res.status(200).json({
            status: true,
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};
