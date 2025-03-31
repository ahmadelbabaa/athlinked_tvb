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
    <nav className="elevo-navbar">
      <div className="elevo-navbar-container">
        <div className="elevo-navbar-brand">
          <div className="elevo-brand-badge">AX</div>
          <Link to="/" className="elevo-brand-text">AthleX</Link>
        </div>
        
        <div className="elevo-navbar-links">
          <Link to="/athletes" className="elevo-nav-link">Athletes</Link>
          <Link to="/universities" className="elevo-nav-link">Universities</Link>
          <Link to="/teams" className="elevo-nav-link">Teams</Link>
          <Link to="/events" className="elevo-nav-link">Events</Link>
        </div>
        
        <div className="elevo-navbar-actions">
          <Link to="/profile" className="elevo-profile-button">
            Your Profile
          </Link>
          <Link to="/" onClick={handleLogout} className="elevo-logout-button">
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 