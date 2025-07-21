// client/src/components/Login.js
import React, { useState } from 'react';
import api from '../utils/api';

const Login = ({ setCurrentPage, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      onLoginSuccess(res.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Promo Section for Desktop */}
        <div className="auth-promo-section">
          <h2 className="auth-promo-title">Financial Clarity, Simplified.</h2>
          <p className="auth-promo-text">Track your income and expenses with ease. Take control of your financial future with Expense Pro.</p>
        </div>

        {/* Form Section */}
        <div className="auth-form-section">
          <h1 className="auth-title">Welcome Back</h1>
          <form onSubmit={onSubmit}>
            {error && <p className="auth-error">{error}</p>}
            <div className="mb-4">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="form-input"
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-primary w-full mt-4">Login</button>
          </form>
          <p className="auth-switch">
            Don't have an account?{' '}
            <button onClick={() => setCurrentPage('register')} className="auth-link">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
