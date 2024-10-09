const db = require('../database/db');

// Create a new Expense
const createExpense = async ({ admin_id, event_id, category, reason, amount, payment_date }) => {
    const transaction = await db.sequelize.transaction();
    try {
        const createdExpense = await db.Expense.create({
            admin_id,
            event_id,
            category,
            reason,
            amount,
            payment_date
        }, { transaction });

        const newExpense=await db.Expense.findByPk(createdExpense.id,{
            include:[
                { model: db.User,attributes: { exclude: ['password'] }},
                { model: db.Event },
                { model: db.ExpenseCategory }
            ],transaction
        })

        await transaction.commit();
        return newExpense;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Update an Expense by ID
const updateExpense = async (expenseId, { admin_id, event_id, category, reason, amount, payment_date }) => {
    const transaction = await db.sequelize.transaction();
    try {
        const expense = await db.Expense.findByPk(expenseId, { transaction });
        if (!expense) {
            throw new Error('Expense not found');
        }

        await db.Expense.update({
            admin_id,
            event_id,
            category,
            reason,
            amount,
            payment_date
        }, {
            where: { id: expenseId },
            transaction
        });

        const updatedExpense = await db.Expense.findByPk(expenseId,{
            include:[
                { model: db.User,attributes: { exclude: ['password'] }},
                { model: db.Event },
                { model: db.ExpenseCategory }
            ],transaction
        })
        await transaction.commit();
        return updatedExpense;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Delete an Expense by ID
const deleteExpense = async (expenseId) => {
    const transaction = await db.sequelize.transaction();
    try {
        const expense = await db.Expense.findByPk(expenseId, { transaction });
        if (!expense) {
            throw new Error('Expense not found');
        }

        await db.Expense.destroy({
            where: { id: expenseId },
            transaction
        });

        await transaction.commit();
        return { message: 'Expense deleted successfully' };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Get all Expenses with pagination
const getAllExpenses = async (page, item_per_page) => {
    const offset = (page - 1) * item_per_page;
    try {
        return await db.Expense.findAndCountAll({
            limit: item_per_page,
            offset: offset,
            include: [
                { model: db.User,attributes: { exclude: ['password'] }},
                { model: db.Event },
                { model: db.ExpenseCategory }
            ]
        });
    } catch (error) {
        throw error;
    }
};

// Get Expense by ID
const getExpenseById = async (expenseId) => {
    try {
        const expense = await db.Expense.findByPk(expenseId, {
            include: [
                { model: db.User,attributes: { exclude: ['password'] }},
                { model: db.Event },
                { model: db.ExpenseCategory }
            ]
        });

        if (!expense) {
            throw new Error('Expense not found');
        }

        return expense;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createExpense,
    updateExpense,
    deleteExpense,
    getAllExpenses,
    getExpenseById
};
