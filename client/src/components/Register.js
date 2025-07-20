// client/src/components/Register.js
import React, { useState } from 'react';

const Register = ({ setCurrentPage, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data.token);
      } else {
        setError(data.msg || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Your Account</h1>
        <form onSubmit={onSubmit}>
          {error && <p className="auth-error">{error}</p>}
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
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
          <button type="submit" className="btn btn-primary w-full mt-4">Register</button>
        </form>
        <p className="auth-switch">
          Already have an account?{' '}
          <button onClick={() => setCurrentPage('login')} className="auth-link">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
