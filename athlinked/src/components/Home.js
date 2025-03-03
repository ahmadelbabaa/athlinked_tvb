import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  const videoRef = useRef(null);

  // Updated state for top prospects with data inspired by teamsdataset.csv
  const [topProspects] = useState([
    {
      id: 1,
      name: "Juan Martínez",
      age: 22,
      position: "Forward",
      potential: "Very High",
      status: "Paris Saint-Germain",
      country: "France",
      profileImage: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seasonStats: {
        goals: 18,
        assists: 7,
        gamesPlayed: 30,
        minutesPlayed: 2520
      }
    },
    {
      id: 2,
      name: "Marco Silva",
      age: 23,
      position: "Central Midfielder",
      potential: "High",
      status: "Ajax",
      country: "Netherlands",
      profileImage: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seasonStats: {
        goals: 5,
        assists: 14,
        gamesPlayed: 32,
        minutesPlayed: 2760
      }
    },
    {
      id: 3,
      name: "Daniel Robertson",
      age: 21,
      position: "Central Defender",
      potential: "Very High",
      status: "Celtic",
      country: "Scotland",
      profileImage: "https://images.unsplash.com/photo-1667389368348-3c4df8d9b6dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seasonStats: {
        goals: 1,
        assists: 2,
        gamesPlayed: 26,
        minutesPlayed: 2340
      }
    },
    {
      id: 4,
      name: "Carlos Mendoza",
      age: 19,
      position: "Striker",
      potential: "High",
      status: "River Plate",
      country: "Argentina",
      profileImage: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      seasonStats: {
        goals: 21,
        assists: 4,
        gamesPlayed: 29,
        minutesPlayed: 2465
      }
    }
  ]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('play', () => {
        console.log('Video started playing');
      });
      
      videoElement.addEventListener('error', (e) => {
        console.error('Video error:', e);
      });

      // Force play the video
      const playVideo = async () => {
        try {
          await videoElement.play();
        } catch (err) {
          console.error('Error auto-playing video:', err);
        }
      };
      
      playVideo();
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', () => {});
        videoElement.removeEventListener('error', () => {});
      }
    };
  }, []);

  return (
    <div className="home-container">
      <section className="elevo-hero">
        <div className="elevo-hero-content">
          <h1>Talent exists everywhere</h1>
          <p className="elevo-hero-subtitle">
            Through AthleX, we connect aspiring footballers with clubs and universities
          </p>
          <div className="elevo-hero-cta">
            <Link to="/athletes" className="elevo-cta-button primary">DISCOVER PLAYERS</Link>
            <Link to="/join" className="elevo-cta-button secondary">JOIN US</Link>
          </div>
        </div>
      </section>

      <section className="elevo-about-section">
        <h2>About AthleX</h2>
        <p className="elevo-about-description">
          AthleX is revolutionizing the way athletes are discovered and developed. Our platform connects<br />
          talented players with opportunities they deserve, based purely on their performance and potential.
        </p>
        
        <div className="elevo-features">
          <div className="elevo-feature-box">
            <h3>Player Analytics</h3>
            <p>Track performance metrics and<br />development over time</p>
          </div>
          
          <div className="elevo-feature-box">
            <h3>AI Matchmaking</h3>
            <p>Connect with teams and opportunities that<br />match your skills and potential</p>
          </div>
          
          <div className="elevo-feature-box">
            <h3>Scout Network</h3>
            <p>Connect with scouts and recruiters<br />worldwide</p>
          </div>
        </div>
      </section>

      {/* Top Prospects Section */}
      <section className="elevo-prospects-section">
        <div className="elevo-container">
          <h2 className="elevo-section-title">Top Prospects</h2>
          <p className="elevo-section-description">
            Discover rising stars with exceptional potential from around the world
          </p>
          
          <div className="elevo-prospects-grid">
            {topProspects.map((prospect) => (
              <div className="elevo-prospect-card" key={prospect.id}>
                <div className="elevo-prospect-image">
                  <img src={prospect.profileImage} alt={prospect.name} />
                </div>
                <div className="elevo-prospect-info">
                  <h3 className="elevo-prospect-name">{prospect.name}</h3>
                  <div className="elevo-prospect-details">
                    <div className="elevo-prospect-detail">
                      <span className="elevo-detail-label">Age:</span> 
                      <span className="elevo-detail-value">{prospect.age}</span>
                    </div>
                    <div className="elevo-prospect-detail">
                      <span className="elevo-detail-label">Position:</span> 
                      <span className="elevo-detail-value">{prospect.position}</span>
                    </div>
                    <div className="elevo-prospect-detail">
                      <span className="elevo-detail-label">Potential:</span> 
                      <span className="elevo-detail-value" style={{ 
                        color: prospect.potential === 'Very High' ? '#178012' : // Dark green for Very High
                              prospect.potential === 'High' ? '#2ecc71' : // Lighter green for High
                              '#f39c12' // Orange for other values (Medium, etc.)
                      }}>
                        {prospect.potential}
                      </span>
                    </div>
                    <div className="elevo-prospect-detail">
                      <span className="elevo-detail-label">Club:</span> 
                      <span className="elevo-detail-value">{prospect.status}, {prospect.country}</span>
                    </div>
                  </div>
                  
                  {/* Season Stats Section */}
                  <div className="elevo-season-stats">
                    <h4 className="elevo-stats-header">Season Stats</h4>
                    <div className="elevo-stats-grid">
                      <div className="elevo-stat-item">
                        <div className="elevo-stat-number">{prospect.seasonStats.goals}</div>
                        <div className="elevo-stat-label">Goals</div>
                      </div>
                      <div className="elevo-stat-item">
                        <div className="elevo-stat-number">{prospect.seasonStats.assists}</div>
                        <div className="elevo-stat-label">Assists</div>
                      </div>
                      <div className="elevo-stat-item">
                        <div className="elevo-stat-number">{prospect.seasonStats.gamesPlayed}</div>
                        <div className="elevo-stat-label">Games</div>
                      </div>
                      <div className="elevo-stat-item">
                        <div className="elevo-stat-number">{prospect.seasonStats.minutesPlayed}</div>
                        <div className="elevo-stat-label">Minutes</div>
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/athletes/${prospect.id}`} className="elevo-view-profile-btn">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="elevo-view-all-container">
            <Link to="/athletes" className="elevo-view-all-btn">
              View All Prospects
            </Link>
          </div>
        </div>
      </section>

      <section className="elevo-video-section">
        <div className="elevo-container">
          <h2 className="elevo-section-title">Watch AthleX in Action</h2>
          <div className="elevo-video-container">
            <video 
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="elevo-video"
            >
              <source src="/videos/CV_clip.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="elevo-video-description">
            See how AthleX is transforming the scouting experience for players and clubs worldwide.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to discover your next opportunity?</h2>
        <Link to="/login" className="cta-button">JOIN ATHLEX</Link>
      </section>
    </div>
  );
}

export default Home; 