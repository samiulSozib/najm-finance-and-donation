const db = require('../database/db');

// Create a new ExpenseCategory
const createExpenseCategory = async ({ name, description }) => {
    const transaction = await db.sequelize.transaction();
    try {
        const newCategory = await db.ExpenseCategory.create({
            name,
            description
        }, { transaction });

        await transaction.commit();
        return newCategory;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Update an ExpenseCategory by ID
const updateExpenseCategory = async (categoryId, { name, description }) => {
    const transaction = await db.sequelize.transaction();
    try {
        const category = await db.ExpenseCategory.findByPk(categoryId, { transaction });
        if (!category) {
            throw new Error('Expense Category not found');
        }

        await db.ExpenseCategory.update({
            name,
            description
        }, {
            where: { id: categoryId },
            transaction
        });

        const updatedCategory = await db.ExpenseCategory.findByPk(categoryId, { transaction });
        await transaction.commit();
        return updatedCategory;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Delete an ExpenseCategory by ID
const deleteExpenseCategory = async (categoryId) => {
    const transaction = await db.sequelize.transaction();
    try {
        const category = await db.ExpenseCategory.findByPk(categoryId, { transaction });
        if (!category) {
            throw new Error('Expense Category not found');
        }

        await db.ExpenseCategory.destroy({
            where: { id: categoryId },
            transaction
        });

        await transaction.commit();
        return { message: 'Expense Category deleted successfully' };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Get all ExpenseCategories with pagination
const getAllExpenseCategories = async (page, item_per_page=null) => {

    if (!page || !item_per_page) {
        try {
            return await db.ExpenseCategory.findAndCountAll();
        } catch (error) {
            throw error;
        }
    }

    const offset = (page - 1) * item_per_page;
    try {
        return await db.ExpenseCategory.findAndCountAll({
            limit: item_per_page,
            offset: offset
        });
    } catch (error) {
        throw error;
    }
};

// Get ExpenseCategory by ID
const getExpenseCategoryById = async (categoryId) => {
    try {
        const category = await db.ExpenseCategory.findByPk(categoryId);
        if (!category) {
            throw new Error('Expense Category not found');
        }
        return category;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
    getAllExpenseCategories,
    getExpenseCategoryById
};
