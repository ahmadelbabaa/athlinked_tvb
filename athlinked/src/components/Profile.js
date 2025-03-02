import React, { useState } from 'react';
import '../App.css';

function Profile() {
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
    ],
    highlights: [
      {
        id: 1,
        title: "2023 Season Highlights",
        duration: "2:36",
        views: "14.2K",
        thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      {
        id: 2,
        title: "Goals & Skills Compilation",
        duration: "3:15",
        views: "8.7K",
        thumbnail: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" 
      },
      {
        id: 3,
        title: "Youth Cup Final Performance",
        duration: "4:21",
        views: "23.5K",
        thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      {
        id: 4,
        title: "Training Session Skills",
        duration: "1:47",
        views: "5.3K",
        thumbnail: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
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

        <section className="elevo-profile-section">
          <h2>Highlight Videos</h2>
          <div className="elevo-highlights-grid">
            {userData.highlights.map((video) => (
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

export default Profile; 