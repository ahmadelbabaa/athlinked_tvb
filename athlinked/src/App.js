import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './colors.css'; // Import our color override CSS
import applyColorScheme from './modifyColorScheme'; // Import our color scheme script
import Home from './components/Home';
import Athletes from './components/Athletes';
import Teams from './components/Teams';
import Events from './components/Events';
import Profile from './components/Profile';
import TeamProfile from './components/TeamProfile';
import Universities from './components/Universities';
import Login from './components/Login';

function NavBar({ userRole, onLogout }) {
  // Inline styles for navbar elements
  const navbarStyles = {
    backgroundColor: '#1a3b8f',
    color: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
  };

  const navLinkStyles = {
    color: '#ffffff'
  };

  const badgeStyles = {
    backgroundColor: '#e94b8a', 
    color: '#1a3b8f'
  };

  const loginButtonStyles = {
    backgroundColor: '#e94b8a',
    color: '#1a3b8f'
  };

  const logoutButtonStyles = {
    backgroundColor: 'transparent',
    color: '#d0d5e9',
    border: '1px solid #d0d5e9'
  };

  return (
    <nav className="navbar" style={navbarStyles}>
      <div className="navbar-logo">
        <Link to="/" style={navLinkStyles}>ELEVO</Link>
      </div>
      <div className="navbar-brand">
        <div className="navbar-brand-title">
          <Link to="/" style={navLinkStyles}>ELEVO</Link>
        </div>
        <div className="navbar-brand-badge" style={badgeStyles}>
          <span>EL</span>
        </div>
      </div>
      <div className="navbar-links">
        <Link to="/athletes" style={navLinkStyles}>Athletes</Link>
        <Link to="/teams" style={navLinkStyles}>Teams</Link>
        <Link to="/universities" style={navLinkStyles}>Universities</Link>
        <Link to="/events" style={navLinkStyles}>Events</Link>
      </div>
      <div className="navbar-auth">
        {userRole ? (
          <>
            {userRole === 'team' ? (
              <Link to="/team-profile" className="profile-link" style={navLinkStyles}>Team Profile</Link>
            ) : (
              <Link to="/profile" className="profile-link" style={navLinkStyles}>Your Profile</Link>
            )}
            <button className="logout-button" onClick={onLogout} style={logoutButtonStyles}>Log Out</button>
          </>
        ) : (
          <Link to="/login" className="login-button" style={loginButtonStyles}>JOIN US</Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [userRole, setUserRole] = useState(null);

  // Function to update user role
  const updateUserRole = () => {
    const storedRole = localStorage.getItem('userRole');
    console.log('Current user role:', storedRole);
    setUserRole(storedRole);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
    window.location.href = '/';
  };

  useEffect(() => {
    // Check for user role in localStorage when component mounts
    updateUserRole();

    // Add event listener for storage changes
    window.addEventListener('storage', updateUserRole);
    
    // Add event listener for custom userRoleChanged event
    window.addEventListener('userRoleChanged', updateUserRole);

    // Apply color scheme
    applyColorScheme();

    // Clean up event listeners
    return () => {
      window.removeEventListener('storage', updateUserRole);
      window.removeEventListener('userRoleChanged', updateUserRole);
    };
  }, []);

  // Forcing color scheme styles
  const appStyles = {
    backgroundColor: '#1a3b8f',
    color: '#ffffff'
  };

  const footerStyles = {
    backgroundColor: '#183075',
    color: '#d0d5e9'
  };

  return (
    <Router>
      <div className="App" style={appStyles}>
        <NavBar userRole={userRole} onLogout={handleLogout} />
        <main className="main-content" style={appStyles}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile userRole={userRole} />} />
            <Route path="/team-profile" element={<TeamProfile userRole={userRole} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <footer className="footer" style={footerStyles}>
          <p>&copy; {new Date().getFullYear()} Elevo. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
