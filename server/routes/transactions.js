// server/routes/transactions.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Correctly import all functions from the controller using destructuring
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

// Add the 'auth' middleware to protect these routes
router.route('/')
  .get(auth, getTransactions)
  .post(auth, addTransaction);

router.route('/:id')
  .put(auth, updateTransaction)
  .delete(auth, deleteTransaction);

module.exports = router;
