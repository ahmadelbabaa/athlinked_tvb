import React, { useState } from 'react';

function TeamProfile() {
  const [teamData] = useState({
    name: "CD Leganés",
    location: "Leganés, Madrid, Spain",
    league: "LaLiga 2",
    founded: 1928,
    isVerified: true,
    achievements: [
      { title: "LaLiga 2 Promotion", year: "2016" },
      { title: "Copa del Rey Quarter-Finals", year: "2018" },
      { title: "Primera División (3 seasons)", year: "2016-2020" }
    ],
    stats: {
      playersPromoted: 8,
      totalPlayers: 25,
      successRate: "75%",
      averageAge: 26
    }
  });

  const [prospects] = useState([
    {
      name: "José Arnaiz",
      age: 21,
      position: "Forward",
      potential: "High",
      status: "First Team"
    },
    {
      name: "Miguel de la Fuente",
      age: 19,
      position: "Forward",
      potential: "Very High",
      status: "B Team"
    },
    {
      name: "Jorge Sáenz",
      age: 20,
      position: "Defender",
      potential: "Medium",
      status: "First Team"
    }
  ]);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-image-container">
          <div className="profile-image"></div>
          <button className="edit-profile-button">Edit Profile</button>
        </div>
        
        <div className="profile-info">
          <div className="profile-name">
            <h2>{teamData.name}</h2>
            {teamData.isVerified && <span className="verified-badge" title="Verified Team">✓</span>}
          </div>
          
          <div className="profile-details">
            <span>{teamData.location}</span>
            <span>•</span>
            <span>{teamData.league}</span>
            <span>•</span>
            <span>Est. {teamData.founded}</span>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3>Academy Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Players Promoted to First Team</span>
            <span className="stat-value">{teamData.stats.playersPromoted}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Academy Players</span>
            <span className="stat-value">{teamData.stats.totalPlayers}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Professional Success Rate</span>
            <span className="stat-value">{teamData.stats.successRate}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Player Age</span>
            <span className="stat-value">{teamData.stats.averageAge}</span>
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h3>Academy Achievements</h3>
        <div className="achievements-list">
          {teamData.achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">🏆</div>
              <div className="achievement-details">
                <h4>{achievement.title}</h4>
                <p>{achievement.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="prospects-section stats-section">
        <h3>Top Prospects</h3>
        <div className="prospects-grid stats-grid">
          {prospects.map((prospect, index) => (
            <div key={index} className="prospect-card stat-item">
              <h4>{prospect.name}</h4>
              <div className="prospect-details">
                <p>Age: {prospect.age}</p>
                <p>Position: {prospect.position}</p>
                <p>Potential: {prospect.potential}</p>
                <p>Status: {prospect.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamProfile; 