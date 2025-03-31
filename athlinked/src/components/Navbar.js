import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if there's a saved role in localStorage
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole);
    }
    
    // Listen for role changes from other components
    const handleRoleChange = () => {
      const updatedRole = localStorage.getItem('userRole');
      setUserRole(updatedRole);
    };
    
    window.addEventListener('userRoleChanged', handleRoleChange);
    
    return () => {
      window.removeEventListener('userRoleChanged', handleRoleChange);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole('');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">AthleX</Link>
        </div>
        
        {/* Center Navigation */}
        <div className="navbar-center">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        
        {/* Right Actions */}
        <div className="navbar-actions">
          {userRole ? (
            <>
              <Link to="/profile" className="profile-button">
                Your Profile
              </Link>
              <button onClick={handleLogout} className="logout-button">
                Log Out
              </button>
            </>
          ) : (
            <Link to="/login" className="sign-in-button">
              <span className="sign-in-icon">→</span>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 