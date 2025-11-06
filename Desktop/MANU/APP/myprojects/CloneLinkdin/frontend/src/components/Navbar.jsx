import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">LinkedIn Clone</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
