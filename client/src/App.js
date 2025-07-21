// client/src/App.js
import React, { useState, useEffect, useRef } from 'react';
import transactionService from './services/transactionService';
import api from './utils/api';
import ConfirmModal from './components/ConfirmModal';
import UndoToast from './components/UndoToast';
import SummaryCards from './components/SummaryCards';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [lastDeleted, setLastDeleted] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState('login');
  const [user, setUser] = useState(null);
  
  const undoTimeoutRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadUserAndTransactions();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    calculateSummary();
  }, [transactions]);

  const loadUserAndTransactions = async () => {
    try {
      const [userRes, transactionsRes] = await Promise.all([
        api.get('/auth/user'),
        transactionService.getTransactions()
      ]);
      setUser(userRes.data);
      setTransactions(transactionsRes.data);
    } catch (error) {
      console.error("Failed to load data:", error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await transactionService.getTransactions();
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const calculateSummary = () => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    setSummary({ income, expense, balance: income - expense });
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const res = await transactionService.addTransaction(newTransaction);
      setTransactions(prev => [res.data, ...prev]);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  const handleDeleteRequest = (id) => {
    setTransactionToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (transactionToDelete) {
      try {
        const txToDelete = transactions.find(t => t._id === transactionToDelete);
        setLastDeleted(txToDelete);
        setTransactions(transactions.filter(t => t._id !== transactionToDelete));
        if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
        undoTimeoutRef.current = setTimeout(() => setLastDeleted(null), 5000);
        await transactionService.deleteTransaction(transactionToDelete);
      } catch (error) {
        console.error("Failed to delete transaction:", error);
        fetchTransactions();
      } finally {
        setTransactionToDelete(null);
        setIsModalOpen(false);
      }
    }
  };

  const handleUndoDelete = async () => {
    if (lastDeleted) {
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
      try {
        const { _id, ...txData } = lastDeleted;
        await transactionService.addTransaction(txData);
        fetchTransactions();
      } catch (error) {
        console.error("Failed to undo delete:", error);
      } finally {
        setLastDeleted(null);
      }
    }
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setTransactions([]);
    setCurrentPage('dashboard');
    setAuthPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about': return <About />;
      case 'profile': return <Profile user={user} onLogout={handleLogout} />;
      case 'dashboard':
      default:
        return (
          <>
            <header className="main-header">
              <h2 className="main-title">Dashboard</h2>
            </header>
            <SummaryCards summary={summary} />
            <AddTransactionForm onAdd={handleAddTransaction} />
            <TransactionList 
              transactions={transactions} 
              setTransactions={setTransactions} 
              onDeleteRequest={handleDeleteRequest} 
            />
          </>
        );
    }
  };

  if (!isAuthenticated) {
    return authPage === 'login' ? (
      <Login setCurrentPage={setAuthPage} onLoginSuccess={handleLoginSuccess} />
    ) : (
      <Register setCurrentPage={setAuthPage} onLoginSuccess={handleLoginSuccess} />
    );
  }

  return (
    <>
      <div className="app-container">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
        <div className="content-wrapper">
          <Navbar user={user} onProfileClick={() => setCurrentPage('profile')} />
          <main className="main-content">
            {renderPage()}
          </main>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction"
        message="Are you sure you want to permanently delete this transaction?"
      />
      
      {lastDeleted && <UndoToast onUndo={handleUndoDelete} />}
    </>
  );
}

export default App;
