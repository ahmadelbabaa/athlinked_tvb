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
    ]
  });

  return (
    <div className="elevo-profile-page">
      <div className="elevo-profile-header">
        <div className="elevo-profile-picture">
          <img src="https://via.placeholder.com/300x300/3498db/ffffff?text=OK" alt={userData.name} />
        </div>
        <h1 className="elevo-profile-name">{userData.name}</h1>
        <p className="elevo-profile-position">{userData.position} | {userData.currentClub}</p>
        
        <div className="elevo-profile-details">
          <div className="elevo-profile-detail">
            <span>Age: {userData.age}</span>
          </div>
          <div className="elevo-profile-detail">
            <span>Nationality: {userData.nationality}</span>
          </div>
          <div className="elevo-profile-detail">
            <span>Experience: {userData.experience} years</span>
          </div>
        </div>
      </div>

      <div className="elevo-profile-sections">
        <section className="elevo-profile-section">
          <h2>Bio</h2>
          <p className="elevo-profile-bio">{userData.bio}</p>
        </section>

        <section className="elevo-profile-section">
          <h2>Career Stats</h2>
          <div className="elevo-stats-grid">
            <div className="elevo-stat-card">
              <div className="elevo-stat-value">{userData.stats.matches}</div>
              <div className="elevo-stat-label">Matches</div>
            </div>
            <div className="elevo-stat-card">
              <div className="elevo-stat-value">{userData.stats.goals}</div>
              <div className="elevo-stat-label">Goals</div>
            </div>
            <div className="elevo-stat-card">
              <div className="elevo-stat-value">{userData.stats.assists}</div>
              <div className="elevo-stat-label">Assists</div>
            </div>
            <div className="elevo-stat-card">
              <div className="elevo-stat-value">{userData.stats.hoursPlayed}</div>
              <div className="elevo-stat-label">Hours Played</div>
            </div>
            <div className="elevo-stat-card">
              <div className="elevo-stat-value">{userData.stats.yellowCards}</div>
              <div className="elevo-stat-label">Yellow Cards</div>
            </div>
            <div className="elevo-stat-card">
              <div className="elevo-stat-value">{userData.stats.redCards}</div>
              <div className="elevo-stat-label">Red Cards</div>
            </div>
          </div>
        </section>

        <section className="elevo-profile-section">
          <h2>Achievements</h2>
          <div className="elevo-achievements-list">
            {userData.achievements.map((achievement, index) => (
              <div className="elevo-achievement-item" key={index}>
                <div className="elevo-achievement-title">{achievement.title}</div>
                <div className="elevo-achievement-year">{achievement.year}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PlayerProfile; 