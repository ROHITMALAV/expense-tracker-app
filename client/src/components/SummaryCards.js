// client/src/components/SummaryCards.js
import React from 'react';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
};

const SummaryCard = ({ title, amount, color }) => (
    <div className="summary-card">
      <h3 className="summary-card-title">{title}</h3>
      <p className={`summary-card-amount ${color}`}>{formatCurrency(amount)}</p>
    </div>
);

const SummaryCards = ({ summary }) => {
  return (
    <div className="summary-grid">
      <SummaryCard title="Total Balance" amount={summary.balance} color="text-blue-600" />
      <SummaryCard title="Total Income" amount={summary.income} color="text-green-600" />
      <SummaryCard title="Total Expense" amount={summary.expense} color="text-red-600" />
    </div>
  );
};

export default SummaryCards;
