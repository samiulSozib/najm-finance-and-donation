const express = require('express');
const router = express.Router();
const expenseCategoryController = require('../controllers/expenceCategoryController');
const checkPermission = require('../middlewares/checkPermission');

// Create ExpenseCategory
router.post('/', expenseCategoryController.createExpenseCategory);

// Update ExpenseCategory by ID
router.put('/:id', expenseCategoryController.updateExpenseCategory);

// Delete ExpenseCategory by ID
router.delete('/:id', expenseCategoryController.deleteExpenseCategory);

// Get All ExpenseCategories
router.get('/', expenseCategoryController.getAllExpenseCategories);

// Get ExpenseCategory by ID
router.get('/:id', expenseCategoryController.getExpenseCategoryById);

module.exports = router;
