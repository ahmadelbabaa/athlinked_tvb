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
import Login from './components/Login';
import Agents from './components/Agents';
import Messaging from './components/Messaging';

function NavBar({ userRole, onLogout }) {
  // Inline styles for navbar elements
  const navbarStyles = {
    backgroundColor: '#121212',
    color: '#ffffff',
    boxShadow: '0 3px 10px rgba(123, 46, 142, 0.3)',
    borderBottom: '1px solid rgba(123, 46, 142, 0.3)'
  };

  const navLinkStyles = {
    color: '#ffffff'
  };

  const badgeStyles = {
    backgroundColor: '#7b2e8e', 
    color: '#ffffff'
  };

  const loginButtonStyles = {
    backgroundColor: '#7b2e8e',
    color: '#ffffff'
  };

  const logoutButtonStyles = {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };

  // Add new profile link styles
  const profileLinkStyles = {
    backgroundColor: 'rgba(123, 46, 142, 0.2)',
    color: '#ffffff',
    border: '1px solid rgba(123, 46, 142, 0.5)',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    marginRight: '1rem',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease'
  };

  // Add messaging icon styles
  const messagingIconStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginRight: "1rem",
    backgroundColor: "rgba(123, 46, 142, 0.1)",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    transition: "all 0.3s ease"
  };

  const unreadBadgeStyles = {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "#7b2e8e",
    color: "white",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "0.7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  };

  return (
    <nav className="navbar" style={navbarStyles}>
      <div className="navbar-logo">
        <Link to="/" style={navLinkStyles}>AthleX</Link>
      </div>
      <div className="navbar-brand">
        <div className="navbar-brand-title">
          <Link to="/" style={navLinkStyles}>AthleX</Link>
        </div>
        <div className="navbar-brand-badge" style={badgeStyles}>
          <span>AX</span>
        </div>
      </div>
      <div className="navbar-links">
        <Link to="/athletes" style={navLinkStyles}>Athletes</Link>
        <Link to="/teams" style={navLinkStyles}>Teams</Link>
        <Link to="/events" style={navLinkStyles}>Events</Link>
        <Link to="/agents" style={navLinkStyles}>Agents</Link>
      </div>
      <div className="navbar-auth" style={{
        display: "flex",
        alignItems: "center"
      }}>
        {userRole ? (
          <>
            <Link to="/messaging" style={messagingIconStyles}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
              </svg>
              <span style={unreadBadgeStyles}>2</span>
            </Link>
            {userRole === 'team' ? (
              <Link to="/team-profile" className="profile-link" style={profileLinkStyles}>Team Profile</Link>
            ) : (
              <Link to="/profile" className="profile-link" style={profileLinkStyles}>Your Profile</Link>
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
    backgroundColor: '#121212',
    color: '#ffffff'
  };

  const footerStyles = {
    backgroundColor: '#1e1e1e',
    color: 'rgba(255, 255, 255, 0.7)'
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
            <Route path="/events" element={<Events />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/messaging" element={<Messaging userRole={userRole} />} />
            <Route path="/profile" element={<Profile userRole={userRole} />} />
            <Route path="/profile/:id" element={<Profile userRole={userRole} viewMode="player" />} />
            <Route path="/team-profile" element={<TeamProfile userRole={userRole} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <footer className="footer" style={footerStyles}>
          <p>&copy; {new Date().getFullYear()} AthleX. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
