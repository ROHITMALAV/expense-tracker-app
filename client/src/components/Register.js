// client/src/components/Register.js
import React, { useState } from 'react';
import api from '../utils/api';

const Register = ({ setCurrentPage, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      onLoginSuccess(res.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Promo Section for Desktop */}
        <div className="auth-promo-section">
          <h2 className="auth-promo-title">Join Expense Pro Today</h2>
          <p className="auth-promo-text">Start tracking your finances in minutes. Sign up for free and take the first step towards financial freedom.</p>
        </div>

        {/* Form Section */}
        <div className="auth-form-section">
          <h1 className="auth-title">Create Your Account</h1>
          <form onSubmit={onSubmit}>
            {error && <p className="auth-error">{error}</p>}
            <div className="mb-4">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
                className="form-input"
              />
            </div>
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
                minLength="6"
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-primary w-full mt-4">Register</button>
          </form>
          <p className="auth-switch">
            Already have an account?{' '}
            <button onClick={() => setCurrentPage('login')} className="auth-link">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
