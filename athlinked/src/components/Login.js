import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the role in localStorage for persistence
    localStorage.setItem('userRole', selectedRole);
    
    // Navigate to the appropriate profile page based on role
    if (selectedRole === 'team') {
      navigate('/team-profile');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome to AthLinked</h2>
        <p className="login-subtitle">Select your role to continue</p>
        
        <div className="role-selector">
          <div 
            className={`role-option ${selectedRole === 'player' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('player')}
          >
            <div className="role-icon">⚽</div>
            <h3>Player</h3>
            <p>Create your profile and connect with teams</p>
          </div>

          <div 
            className={`role-option ${selectedRole === 'team' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('team')}
          >
            <div className="role-icon">🏆</div>
            <h3>Team</h3>
            <p>Scout talent and manage your club</p>
          </div>

          <div 
            className={`role-option ${selectedRole === 'agent' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('agent')}
          >
            <div className="role-icon">👔</div>
            <h3>Agent</h3>
            <p>Represent players and manage opportunities</p>
          </div>
        </div>

        {selectedRole && (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </button>
            <div className="login-footer">
              <a href="#forgot-password">Forgot Password?</a>
              <span className="separator">•</span>
              <a href="#register">Create Account</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login; 