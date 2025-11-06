import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      alert('Registered. Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  }

  return (
    <form onSubmit={submit} className="auth-form">
      <h2>Signup</h2>
      <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
      <button type="submit">Sign up</button>
    </form>
  );
}
