import React, { useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import '../App.css'; // make sure this is imported for styling

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      onLogin(res.data.user, res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', color: '#0073b1' }}>Login</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don’t have an account?{' '}
        <Link to="/signup" style={{ color: '#0073b1', textDecoration: 'none' }}>
          Sign up here
        </Link>
      </p>
    </div>
  );
}
