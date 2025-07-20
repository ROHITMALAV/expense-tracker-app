// server/controllers/transactionController.js
const Transaction = require('../models/Transaction');

// @desc    Get all transactions for a user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Get Transactions Error:', error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new transaction for a user
exports.addTransaction = async (req, res) => {
  try {
    const { description, amount, category, type, date } = req.body;
    const newTransaction = new Transaction({
      user: req.user.id,
      description,
      amount,
      category,
      type,
      date,
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Add Transaction Error:', error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a transaction for a user
exports.updateTransaction = async (req, res) => {
  try {
    const { description, amount, category, type } = req.body;
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { description, amount, category, type },
      { new: true, runValidators: true }
    );
    res.json(updatedTransaction);
  } catch (error) {
    console.error('Update Transaction Error:', error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a transaction for a user
exports.deleteTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await transaction.deleteOne();
    res.json({ msg: 'Transaction removed' });
  } catch (error) {
    console.error('Delete Transaction Error:', error.message);
    res.status(500).send('Server Error');
  }
};
