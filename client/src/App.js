import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, redirect } from 'react-router-dom';
import { CartProvider } from './CartContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FoodList from './FoodList';
import Cart from './Cart';
import Login from './components/Login';
import Register from './components/Register';
import './index.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <CartProvider>
        <div>
          <nav className="navbar">
            <Link to="/"  className='link'>Home</Link>
            <Link to="/about"  className='link'>About</Link>

            {isAuthenticated ? (
              <>
                <Link to="/foodlist" className='link'>Menu</Link>
                <Link to="/cart" className='link'>Cart</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className='link'>Login</Link>
                <Link to="/register" className='link'>Register</Link>
              </>
            )}
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/foodlist" element={isAuthenticated ? <FoodList /> : <Login />} />
            <Route path="/cart" element={isAuthenticated ? <Cart /> : <Login />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
    </CartProvider>
  );
};

export default App;
