import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Make sure a role is selected
    if (!selectedRole) {
      alert('Please select a role');
      return;
    }
    
    console.log(`Logging in as ${selectedRole} with email: ${email}`);
    
    // Store the role in localStorage for persistence
    localStorage.setItem('userRole', selectedRole);
    
    // Trigger a custom event to notify App component of role change
    window.dispatchEvent(new Event('userRoleChanged'));
    
    // Navigate to the appropriate profile page based on role
    if (selectedRole === 'team') {
      navigate('/team-profile');
    } else {
      navigate('/profile');
    }
    
    // Force a page reload to ensure the user role is properly updated
    // This is a fallback in case the event listener doesn't work
    window.location.reload();
  };

  return (
    <div className="login-page">
      <div className="login-container" data-aos="zoom-in">
        <h2 data-aos="fade-down" data-aos-delay="200">Welcome to Elevo</h2>
        <p className="login-subtitle" data-aos="fade-up" data-aos-delay="300">Select your role to continue</p>
        
        <div className="role-selector">
          <div 
            className={`role-option ${selectedRole === 'player' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('player')}
            data-aos="fade-right" 
            data-aos-delay="400"
          >
            <div className="role-icon">⚽</div>
            <h3>Player</h3>
            <p>Create your player profile, showcase your skills, and connect with teams and scouts.</p>
          </div>
          
          <div 
            className={`role-option ${selectedRole === 'team' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('team')}
            data-aos="fade-up" 
            data-aos-delay="500"
          >
            <div className="role-icon">🏆</div>
            <h3>Team</h3>
            <p>Represent your club, discover talent, and connect with players looking for opportunities.</p>
          </div>
          
          <div 
            className={`role-option ${selectedRole === 'agent' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('agent')}
            data-aos="fade-left" 
            data-aos-delay="600"
          >
            <div className="role-icon">👔</div>
            <h3>Agent</h3>
            <p>Find promising talent, manage your clients, and connect them with the right opportunities.</p>
          </div>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="700">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
              required 
            />
          </div>
          
          <button type="submit" className="login-button">
            {selectedRole ? `Login as ${selectedRole}` : 'Login'}
          </button>
          
          <div className="login-footer" data-aos="fade-up" data-aos-delay="800">
            <a href="#">Create an account</a>
            <span className="separator">|</span>
            <a href="#">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login; 