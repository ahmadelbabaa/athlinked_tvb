import React, { useState } from 'react';
import '../App.css';

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
      successRate: 75,
      averageAge: 26
    },
    highlights: [
      {
        id: 1,
        title: "Season Highlights 2022/23",
        duration: "3:45",
        views: "28.7K",
        thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      {
        id: 2,
        title: "Youth Academy Showcase",
        duration: "5:12",
        views: "14.3K",
        thumbnail: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" 
      },
      {
        id: 3,
        title: "Copa del Rey Best Moments",
        duration: "4:08",
        views: "32.1K",
        thumbnail: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      {
        id: 4,
        title: "Training Ground Sessions",
        duration: "2:23",
        views: "7.8K",
        thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      }
    ]
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

  // New state for recruitment needs
  const [recruitmentNeeds] = useState([
    {
      position: "Central Midfielder",
      description: "Looking for a technically skilled midfielder who can create scoring opportunities",
      requirements: [
        { name: "Passing", value: "Min. 85% accuracy" },
        { name: "Chances Created", value: "Min. 2.0 per game" },
        { name: "Age", value: "Under 23" },
        { name: "Preferred foot", value: "Left-footed" }
      ],
      priority: "High"
    },
    {
      position: "Central Defender",
      description: "Need a physical, aerially dominant center-back with good distribution skills",
      requirements: [
        { name: "Aerial duels won", value: "Min. 70%" },
        { name: "Passing accuracy", value: "Min. 80%" },
        { name: "Height", value: "Above 185cm" },
        { name: "Tackles", value: "Min. 2.5 per game" }
      ],
      priority: "Medium"
    },
    {
      position: "Striker",
      description: "Seeking a clinical finisher with good movement and link-up play",
      requirements: [
        { name: "Conversion rate", value: "Min. 20%" },
        { name: "Expected goals", value: "0.5+ per 90 mins" },
        { name: "Age", value: "Under 25" },
        { name: "Hold-up play", value: "Strong" }
      ],
      priority: "High"
    }
  ]);

  return (
    <div className="elevo-profile-page">
      <div className="elevo-profile-header">
        <div className="elevo-profile-picture">
          <img src="https://via.placeholder.com/300x300/3498db/ffffff?text=CD" alt={teamData.name} />
        </div>
        <h1 className="elevo-profile-name">
          {teamData.name}
          {teamData.isVerified && <span className="elevo-verified-badge">✓</span>}
        </h1>
        <p className="elevo-profile-position">{teamData.league} | Est. {teamData.founded}</p>
        
        <div className="elevo-profile-details">
          <div className="elevo-profile-detail">
            <span>Location: {teamData.location}</span>
          </div>
        </div>
      </div>

      <div className="elevo-profile-sections">
        {/* New Looking For Section */}
        <section className="elevo-profile-section">
          <h2>Looking For</h2>
          <p className="elevo-section-description">
            Our recruitment team is currently scouting for the following positions with specific profile requirements:
          </p>
          
          <div className="elevo-recruitment-needs">
            {recruitmentNeeds.map((need, index) => (
              <div className="elevo-recruitment-card" key={index}>
                <div className="elevo-recruitment-header">
                  <h3 className="elevo-position-title">{need.position}</h3>
                  <span className={`elevo-priority-badge elevo-priority-${need.priority.toLowerCase()}`}>
                    {need.priority} Priority
                  </span>
                </div>
                
                <p className="elevo-position-description">{need.description}</p>
                
                <div className="elevo-requirements-container">
                  <h4 className="elevo-requirements-title">Requirements</h4>
                  <div className="elevo-requirements-list">
                    {need.requirements.map((req, reqIndex) => (
                      <div className="elevo-requirement-item" key={reqIndex}>
                        <span className="elevo-requirement-name">{req.name}:</span>
                        <span className="elevo-requirement-value">{req.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="elevo-profile-section">
          <h2>Academy Statistics</h2>
          <div className="elevo-stats-grid">
            <div className="elevo-stat-card">
              <div className="elevo-stat-value">{teamData.stats.playersPromoted}</div>
              <div className="elevo-stat-label">Players Promoted</div>
            </div>
            <div className="elevo-stat-card">
              <div className="elevo-stat-value">{teamData.stats.totalPlayers}</div>
              <div className="elevo-stat-label">Academy Players</div>
            </div>
            <div className="elevo-stat-card">
              <div className="elevo-stat-value">{teamData.stats.successRate}%</div>
              <div className="elevo-stat-label">Success Rate</div>
            </div>
            <div className="elevo-stat-card">
              <div className="elevo-stat-value">{teamData.stats.averageAge}</div>
              <div className="elevo-stat-label">Average Age</div>
            </div>
          </div>
        </section>

        <section className="elevo-profile-section">
          <h2>Club Achievements</h2>
          <div className="elevo-achievements-list">
            {teamData.achievements.map((achievement, index) => (
              <div className="elevo-achievement-item" key={index}>
                <div className="elevo-achievement-title">{achievement.title}</div>
                <div className="elevo-achievement-year">{achievement.year}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="elevo-profile-section">
          <h2>Top Prospects</h2>
          <div className="elevo-stats-grid">
            {prospects.map((prospect, index) => (
              <div className="elevo-stat-card" key={index}>
                <h3 style={{ color: 'var(--elevo-blue)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                  {prospect.name}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <div><strong>Age:</strong> {prospect.age}</div>
                  <div><strong>Position:</strong> {prospect.position}</div>
                  <div><strong>Potential:</strong> 
                    <span style={{ 
                      color: prospect.potential === 'Very High' ? 'var(--elevo-pink)' : 
                             prospect.potential === 'High' ? '#2ecc71' : '#f39c12'
                    }}> {prospect.potential}</span>
                  </div>
                  <div><strong>Status:</strong> {prospect.status}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="elevo-profile-section">
          <h2>Highlight Videos</h2>
          <div className="elevo-highlights-grid">
            {teamData.highlights.map((video) => (
              <div className="elevo-video-card" key={video.id}>
                <div className="elevo-video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="elevo-play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                      <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.5)" />
                      <path d="M10 8l6 4-6 4V8z" fill="#ffffff" />
                    </svg>
                  </div>
                  <div className="elevo-video-duration">{video.duration}</div>
                </div>
                <div className="elevo-video-info">
                  <h3 className="elevo-video-title">{video.title}</h3>
                  <p className="elevo-video-views">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeamProfile; 