// client/src/components/ExpenseChart.js
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// A professional color map for the light theme
const CATEGORY_COLORS = {
  "Food": "#3b82f6",       // blue-500
  "Shopping": "#ec4899",    // pink-500
  "Bills": "#14b8a6",       // teal-500
  "Transport": "#f97316",   // orange-500
  "Entertainment": "#8b5cf6", // violet-500
  "Other": "#6b7280",       // gray-500
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
};

const ExpenseChart = ({ transactions }) => {
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

  const chartLabels = Object.keys(expenseData);
  const chartValues = Object.values(expenseData);

  // Dynamically create the background color array based on the labels
  const backgroundColors = chartLabels.map(label => CATEGORY_COLORS[label] || '#a1a1aa'); // Fallback color

  const chartData = {
    labels: chartLabels,
    datasets: [{
      data: chartValues,
      backgroundColor: backgroundColors,
      borderColor: '#ffffff', // Use a white border to match the card background
      borderWidth: 4,
      hoverOffset: 15,
      hoverBorderColor: '#f9fafb',
    }]
  };

  // Improved options for a professional light theme look
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#4b5563', // gray-600, for better readability
          boxWidth: 14,
          padding: 20,
          font: {
            size: 14,
            weight: '500',
          }
        },
        // Hide legend on smaller screens to save space
        display: window.innerWidth >= 768, 
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += formatCurrency(context.parsed);
            }
            return label;
          }
        }
      }
    },
    cutout: '75%',
  };

  return (
    <div className="summary-card h-full flex flex-col">
      <h3 className="summary-card-title">Expense Breakdown</h3>
      <div className="relative flex-grow mt-4">
        {chartData.labels.length > 0 ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No expense data to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
