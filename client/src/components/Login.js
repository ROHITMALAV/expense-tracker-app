// client/src/components/Login.js
import React, { useState } from 'react';

const Login = ({ setCurrentPage, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data.token);
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <form onSubmit={onSubmit}>
          {error && <p className="auth-error">{error}</p>}
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
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">Login</button>
        </form>
        <p className="auth-switch">
          Don't have an account?{' '}
          <button onClick={() => setCurrentPage('register')} className="auth-link">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
