// client/src/services/transactionService.js
import api from '../utils/api'; // Import our new api utility from the Canvas

const getTransactions = () => {
  return api.get('/transactions');
};

const addTransaction = (transaction) => {
  return api.post('/transactions', transaction);
};

const updateTransaction = (id, transaction) => {
  return api.put(`/transactions/${id}`, transaction);
};

const deleteTransaction = (id) => {
  return api.delete(`/transactions/${id}`);
};

const transactionService = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};

export default transactionService;
