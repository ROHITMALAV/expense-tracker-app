// server/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  // --- NEW: Link to the User model ---
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
