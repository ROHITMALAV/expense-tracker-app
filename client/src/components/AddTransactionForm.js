// client/src/components/AddTransactionForm.js
import React, { useState } from 'react';

const CATEGORIES = ["Food", "Shopping", "Bills", "Transport", "Entertainment", "Other"];

// --- Helper function to format number with commas ---
const formatNumberWithCommas = (value) => {
    // Remove all non-digit characters to handle copy-pasting
    const numberString = value.replace(/[^0-9]/g, '');
    if (numberString === '') return '';
    // Format with commas for Indian numbering system
    return Number(numberString).toLocaleString('en-IN');
};

// --- Helper function to remove commas before submitting ---
const unformatNumber = (value) => {
    return value.replace(/,/g, '');
};

const FormInput = ({ label, className, ...props }) => (
    <div className={className}>
      <label htmlFor={props.name} className="form-label">{label}</label>
      <input {...props} id={props.name} className="form-input" />
    </div>
);
  
const FormSelect = ({ label, className, options, ...props }) => (
    <div className={className}>
      <label htmlFor={props.name} className="form-label">{label}</label>
      <select {...props} id={props.name} className="form-select">
        {options.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
      </select>
    </div>
);

const AddTransactionForm = ({ onAdd, isLoading }) => {
  const [formData, setFormData] = useState({ description: '', amount: '', type: 'expense', category: 'Food' });

  const handleChange = (event) => {
    const { name, value } = event.target;

    // --- Handle amount formatting and validation ---
    if (name === 'amount') {
        let numberString = value.replace(/[^0-9]/g, '');
        if (numberString) {
            let number = parseInt(numberString, 10);
            // --- NEW: Cap the amount at 10 lakh ---
            if (number > 1000000) {
                number = 1000000;
            }
            const formattedValue = number.toLocaleString('en-IN');
            setFormData({ ...formData, [name]: formattedValue });
        } else {
            setFormData({ ...formData, [name]: '' });
        }
        return;
    }
    
    // --- NEW: Handle description length validation ---
    if (name === 'description' && value.length > 250) {
        // Do not update state if description exceeds 250 characters
        // The maxLength attribute on the input will prevent typing more.
        return;
    }

    const newFormData = { ...formData, [name]: value };
    if (name === 'type') {
      newFormData.category = value === 'income' ? 'Income' : 'Food';
    }
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // --- NEW: Add validation for description and amount ---
    if (!formData.description.trim() || !formData.amount) {
        alert('Please fill out both Description and Amount.');
        return;
    }
    // Unformat the amount before sending
    const amountWithoutCommas = unformatNumber(formData.amount);
    onAdd({ ...formData, amount: parseFloat(amountWithoutCommas) });
    // Reset form after submission
    setFormData({ description: '', amount: '', type: 'expense', category: 'Food' });
  };

  return (
    <div className="mb-8">
      <h3 className="section-title">Add New Transaction</h3>
      <form onSubmit={handleSubmit} className="form-container">
        {/* --- REORDERED FIELDS --- */}
        <FormSelect name="type" label="Type" value={formData.type} onChange={handleChange} options={['expense', 'income']} />
        <FormSelect name="category" label="Category" value={formData.category} onChange={handleChange} options={formData.type === 'income' ? ['Income'] : CATEGORIES} disabled={formData.type === 'income'} />
        <FormInput name="amount" label="Amount (Max: 10 Lakh)" type="text" value={formData.amount} onChange={handleChange} placeholder="e.g., 1,000" required />
        <FormInput name="description" label="Description (Max: 250 chars)" value={formData.description} onChange={handleChange} placeholder="e.g., Groceries" className="md:col-span-2" maxLength="250" required />
        
        <button type="submit" className="btn btn-primary flex items-center justify-center md:col-start-5" disabled={isLoading}>
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Add Transaction'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
