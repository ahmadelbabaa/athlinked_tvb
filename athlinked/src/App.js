import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Athletes from './components/Athletes';
import Teams from './components/Teams';
import Events from './components/Events';
import Profile from './components/Profile';
import TeamProfile from './components/TeamProfile';
import Universities from './components/Universities';
import Login from './components/Login';

function NavBar({ userRole }) {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/athletes">Athletes</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/universities">Universities</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li>
          {userRole === 'team' ? (
            <Link to="/team-profile">Profile</Link>
          ) : (
            <Link to="/profile">Profile</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check for user role in localStorage
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1><Link to="/" className="logo-link">AthLinked</Link></h1>
          <NavBar userRole={userRole} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/team-profile" element={<TeamProfile />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 AthLinked. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
