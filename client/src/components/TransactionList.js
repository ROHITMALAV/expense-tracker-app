// client/src/components/TransactionList.js
import React, { useState } from 'react';
import transactionService from '../services/transactionService';

const CATEGORIES = ["Food", "Shopping", "Bills", "Transport", "Entertainment", "Other"];

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
};
  
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
};

const FormInput = ({ label, className, ...props }) => ( <div className={className}> <label htmlFor={props.name} className="form-label">{label}</label> <input {...props} id={props.name} className="form-input" /> </div> );
const FormSelect = ({ label, className, options, ...props }) => ( <div className={className}> <label htmlFor={props.name} className="form-label">{label}</label> <select {...props} id={props.name} className="form-select"> {options.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)} </select> </div> );

const TransactionRow = ({ transaction, onEdit, onDelete }) => (
    // This is now a div that acts as a row on desktop and a card on mobile
    <div className="transaction-row grid grid-cols-2 md:grid-cols-5 items-center p-4 gap-4">
        {/* Cell 1: Description & Category */}
        <div className="col-span-2 md:col-span-2 transaction-details">
            <div className={`transaction-indicator ${transaction.type === 'income' ? 'indicator-income' : 'indicator-expense'}`}></div>
            <div>
                <p className="transaction-description">{transaction.description}</p>
                <p className="transaction-category">{transaction.category}</p>
            </div>
        </div>
        
        {/* Cell 2: Amount */}
        <div className="text-right md:text-right">
            {/* Mobile-only Label */}
            <p className="text-xs text-gray-500 md:hidden">Amount</p>
            <p className={`transaction-amount ${transaction.type === 'income' ? 'amount-income' : 'amount-expense'}`}>{formatCurrency(transaction.amount)}</p>
        </div>

        {/* Cell 3: Date */}
        <div className="text-right md:text-right">
            {/* Mobile-only Label */}
            <p className="text-xs text-gray-500 md:hidden">Date</p>
            <p className="transaction-date">{formatDate(transaction.date)}</p>
        </div>

        {/* Cell 4: Actions */}
        <div className="col-span-2 md:col-span-1 transaction-actions justify-center">
            <button onClick={() => onEdit(transaction)} className="action-btn action-btn-edit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
            </button>
            <button onClick={() => onDelete(transaction._id)} className="action-btn action-btn-delete">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            </button>
        </div>
    </div>
);
  
const EditRow = ({ editFormData, onFormChange, onUpdate, onCancel }) => (
    <div className="p-4 bg-blue-50">
      <form onSubmit={(e) => onUpdate(e, editFormData._id)} className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:space-x-2">
        <FormInput name="description" value={editFormData.description} onChange={onFormChange} className="flex-grow" />
        <FormInput name="amount" type="number" value={editFormData.amount} onChange={onFormChange} className="w-full md:w-32" />
        <FormSelect name="type" value={editFormData.type} onChange={onFormChange} options={['expense', 'income']} className="w-full md:w-32" />
        <FormSelect name="category" value={editFormData.category} onChange={onFormChange} options={editFormData.type === 'income' ? ['Income'] : CATEGORIES} disabled={editFormData.type === 'income'} className="w-full md:w-40" />
        <div className="flex space-x-2 justify-end">
          <button type="submit" className="btn btn-success">Save</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
);

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination-container">
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`pagination-btn ${currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-inactive'}`}
            >
                Previous
            </button>
            {[...Array(totalPages).keys()].map(number => (
                <button 
                    key={number + 1} 
                    onClick={() => onPageChange(number + 1)}
                    className={`pagination-btn ${currentPage === number + 1 ? 'pagination-btn-active' : 'pagination-btn-inactive'}`}
                >
                    {number + 1}
                </button>
            ))}
            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className={`pagination-btn ${currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-inactive'}`}
            >
                Next
            </button>
        </div>
    );
};

const TransactionList = ({ transactions, setTransactions, onDeleteRequest }) => {
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({ description: '', amount: '', type: '', category: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    const handleEditClick = (transaction) => {
        setEditingId(transaction._id);
        setEditFormData({ ...transaction });
    };

    const handleCancelClick = () => setEditingId(null);

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        const newFormData = { ...editFormData, [name]: value };
        if (name === 'type') {
            newFormData.category = value === 'income' ? 'Income' : 'Food';
        }
        setEditFormData(newFormData);
    };

    const handleUpdateSubmit = async (event, id) => {
        event.preventDefault();
        try {
            const res = await transactionService.updateTransaction(id, { ...editFormData, amount: parseFloat(editFormData.amount) });
            setTransactions(transactions.map(t => (t._id === id ? res.data : t)));
            setEditingId(null);
        } catch (error) {
            console.error("Failed to update transaction:", error);
        }
    };

    return (
        <div className="transactions-container">
            <h3 className="transactions-header">Recent Transactions</h3>
            {/* Desktop Header - Hidden on Mobile */}
            <div className="hidden md:grid md:grid-cols-5 text-left text-sm font-semibold text-gray-500 border-b border-gray-200 p-4">
                <div className="col-span-2">Transaction</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Date</div>
                <div className="text-center">Actions</div>
            </div>
            {/* List of Transactions */}
            <div>
                {currentTransactions.map(transaction => (
                    <div key={transaction._id} className="transaction-item">
                        {editingId === transaction._id ? (
                            <EditRow editFormData={editFormData} onFormChange={handleEditFormChange} onUpdate={handleUpdateSubmit} onCancel={handleCancelClick} />
                        ) : (
                            <TransactionRow transaction={transaction} onEdit={handleEditClick} onDelete={onDeleteRequest} />
                        )}
                    </div>
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
    );
};

export default TransactionList;
