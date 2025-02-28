import React, { useState } from 'react';

function Profile() {
  const [userData] = useState({
    name: "Omar Khatib",
    age: 18,
    nationality: "Syrian",
    position: "Left Winger",
    currentClub: "Al Wasl FC",
    experience: 5,
    isVerified: true,
    stats: {
      matches: 28,
      goals: 12,
      assists: 8,
      minutesPlayed: 1890,
      yellowCards: 2,
      redCards: 0
    },
    achievements: [
      {
        title: "Youth League Top Scorer",
        year: "2023",
        description: "17 goals in U19 League"
      },
      {
        title: "Best Young Player",
        year: "2023",
        description: "Al Wasl FC Academy"
      },
      {
        title: "First Team Debut",
        year: "2023",
        description: "UAE Pro League"
      }
    ],
    highlights: [
      {
        title: "Season Highlights 2023",
        views: "2.5K",
        duration: "4:30",
        thumbnail: "highlight1.jpg"
      },
      {
        title: "First Team Debut Goals",
        views: "1.8K",
        duration: "3:15",
        thumbnail: "highlight2.jpg"
      }
    ]
  });

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-image-container">
          <div className="profile-image"></div>
          <button className="edit-profile-button">Edit Profile</button>
        </div>
        
        <div className="profile-info">
          <div className="profile-name">
            <h2>{userData.name}</h2>
            {userData.isVerified && <span className="verified-badge" title="Verified Player">✓</span>}
          </div>
          
          <div className="profile-details">
            <span>{userData.age} years old</span>
            <span>•</span>
            <span>{userData.nationality}</span>
            <span>•</span>
            <span>{userData.position}</span>
          </div>

          <div className="club-info">
            <p>Current Club: {userData.currentClub}</p>
            <p>Years of Experience: {userData.experience}</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3>Season Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Matches Played</span>
            <span className="stat-value">{userData.stats.matches}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Goals</span>
            <span className="stat-value">{userData.stats.goals}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Assists</span>
            <span className="stat-value">{userData.stats.assists}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Minutes Played</span>
            <span className="stat-value">{userData.stats.minutesPlayed}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Yellow Cards</span>
            <span className="stat-value">{userData.stats.yellowCards}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Red Cards</span>
            <span className="stat-value">{userData.stats.redCards}</span>
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h3>Achievements</h3>
        <div className="achievements-list">
          {userData.achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">🏆</div>
              <div className="achievement-details">
                <h4>{achievement.title}</h4>
                <p>{achievement.year} - {achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="highlights-section">
        <h3>Career Highlights</h3>
        <div className="videos-grid">
          {userData.highlights.map((video, index) => (
            <div key={index} className="video-card">
              <div className="video-thumbnail">
                <span className="play-icon">▶</span>
              </div>
              <div className="video-info">
                <h4>{video.title}</h4>
                <div className="video-stats">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.duration}</span>
                </div>
                <a href="#watch" className="watch-button">Watch Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile; 