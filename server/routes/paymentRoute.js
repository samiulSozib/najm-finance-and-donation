const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const checkPermission =require('../middlewares/checkPermission')

// Payment routes
router.post('/', paymentController.createPayment);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);

module.exports = router;
