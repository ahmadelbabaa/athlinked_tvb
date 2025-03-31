import React, { useState } from 'react';
import '../App.css';

function PlayerProfile() {
  const [userData] = useState({
    name: "Omar Khatib",
    age: 18,
    nationality: "Syrian",
    position: "Left Winger",
    currentClub: "Al Wasl FC",
    experience: 5,
    bio: "Talented young winger with exceptional dribbling skills and pace. Looking to take the next step in my career and showcase my abilities at a higher level.",
    isVerified: true,
    stats: {
      matches: 28,
      goals: 12,
      assists: 8,
      hoursPlayed: 32,
      yellowCards: 2,
      redCards: 0
    },
    achievements: [
      {
        title: "Youth League Top Scorer",
        year: "2023"
      },
      {
        title: "Best Young Player",
        year: "2023"
      },
      {
        title: "First Team Debut",
        year: "2022"
      }
    ],
    skills: [
      { name: "Dribbling", value: 92 },
      { name: "Speed", value: 89 },
      { name: "Shooting", value: 78 },
      { name: "Passing", value: 81 },
      { name: "Physical", value: 75 },
      { name: "Defending", value: 62 }
    ],
    highlights: [
      {
        id: 1,
        title: "Best Goals Compilation",
        duration: "2:45",
        views: "12.5K",
        thumbnail: "https://images.unsplash.com/photo-1580891034942-d73a1683519a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      {
        id: 2,
        title: "Skills and Tricks",
        duration: "1:58",
        views: "8.3K",
        thumbnail: "https://images.unsplash.com/photo-1518650860001-3a1c23ddf8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      }
    ]
  });

  // Function to render skill bars with varying percentage
  const renderSkillBar = (value) => {
    return (
      <div className="skill-bar-container">
        <div 
          className="skill-bar" 
          style={{ 
            width: `${value}%`,
            backgroundColor: value > 85 ? 'var(--accent-color)' : (value > 70 ? '#2ecc71' : '#f39c12')
          }}
        ></div>
      </div>
    );
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-picture">
          <img src="https://via.placeholder.com/300x300/3498db/ffffff?text=OK" alt={userData.name} />
        </div>
        <h1 className="profile-name">
          {userData.name}
          {userData.isVerified && <span className="verified-badge">✓</span>}
        </h1>
        <p className="profile-position">{userData.position} | {userData.currentClub}</p>
        
        <div className="profile-details">
          <div className="profile-detail">
            <span>Age: {userData.age}</span>
          </div>
          <div className="profile-detail">
            <span>Nationality: {userData.nationality}</span>
          </div>
          <div className="profile-detail">
            <span>Experience: {userData.experience} years</span>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <section className="profile-section">
          <h2>Bio</h2>
          <p className="profile-bio">{userData.bio}</p>
        </section>

        <section className="profile-section">
          <h2>Skills & Abilities</h2>
          <div className="skills-container">
            {userData.skills.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-value">{skill.value}</span>
                </div>
                {renderSkillBar(skill.value)}
              </div>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <h2>Career Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{userData.stats.matches}</div>
              <div className="stat-label">Matches</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.stats.goals}</div>
              <div className="stat-label">Goals</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.stats.assists}</div>
              <div className="stat-label">Assists</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.stats.hoursPlayed}</div>
              <div className="stat-label">Hours Played</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.stats.yellowCards}</div>
              <div className="stat-label">Yellow Cards</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.stats.redCards}</div>
              <div className="stat-label">Red Cards</div>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2>Achievements</h2>
          <div className="achievements-list">
            {userData.achievements.map((achievement, index) => (
              <div className="achievement-item" key={index}>
                <div className="achievement-title">{achievement.title}</div>
                <div className="achievement-year">{achievement.year}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <h2>Highlight Videos</h2>
          <div className="highlights-grid">
            {userData.highlights.map((video) => (
              <div className="video-card" key={video.id}>
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                      <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.5)" />
                      <path d="M10 8l6 4-6 4V8z" fill="#ffffff" />
                    </svg>
                  </div>
                  <div className="video-duration">{video.duration}</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-views">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <h2>Join My Team</h2>
          <p className="section-description">
            I'm currently looking for new opportunities to showcase my skills at a higher level.
            If you're interested in learning more or scheduling a trial, please contact me.
          </p>
          <button className="contact-button">
            CONTACT PLAYER
          </button>
        </section>
      </div>
    </div>
  );
}

export default PlayerProfile; 