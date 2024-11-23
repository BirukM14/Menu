// /src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation

const Header = () => {
  const handleLogout = () => {
    // Logic for logging out user (e.g., clearing tokens)
    localStorage.removeItem('auth_token'); // Or use your auth logic
    window.location.href = '/'; // Redirect to homepage after logout
  };

  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <h1>  This is the homepage</h1>
          <p>please register if you haven't yet if so get login to 
            see the food lists available.
          </p>
          </ul>
      </nav>
    </header>
  );
};

export default Header;
