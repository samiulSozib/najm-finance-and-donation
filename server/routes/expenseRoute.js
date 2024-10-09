const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const checkPermission = require('../middlewares/checkPermission');

// Create Expense
router.post('/', expenseController.createExpense);

// Update Expense by ID
router.put('/:id', expenseController.updateExpense);

// Delete Expense by ID
router.delete('/:id', expenseController.deleteExpense);

// Get All Expenses
router.get('/', expenseController.getAllExpenses);

// Get Expense by ID
router.get('/:id', expenseController.getExpenseById);

module.exports = router;
