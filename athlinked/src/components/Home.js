import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  // Updated state for top prospects with data inspired by design mockup
  const [topProspects] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      age: 19,
      position: "Striker",
      potential: "Exceptional Potential",
      country: "England",
      profileImage: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stats: {
        pace: 8.7,
        shooting: 9.2,
        passing: 7.8
      }
    },
    {
      id: 2,
      name: "Marcus Silva",
      age: 20,
      position: "Midfielder",
      potential: "Very High Potential",
      country: "Brazil",
      profileImage: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stats: {
        pace: 8.2,
        shooting: 7.5,
        passing: 9.3
      }
    },
    {
      id: 3,
      name: "Ibrahim Diallo",
      age: 18,
      position: "Defender",
      potential: "High Potential",
      country: "Senegal",
      profileImage: "https://images.unsplash.com/photo-1667389368348-3c4df8d9b6dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stats: {
        pace: 8.5,
        shooting: 6.8,
        passing: 8.1
      }
    },
    {
      id: 4,
      name: "Javier Hernandez",
      age: 21,
      position: "Goalkeeper",
      potential: "Good Potential",
      country: "Spain",
      profileImage: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stats: {
        reflexes: 9.1,
        positioning: 8.7,
        handling: 8.4
      }
    }
  ]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>One swipe away from your football career</h1>
          <p className="hero-subtitle">
            A lean, data-driven football ecosystem connecting talent with opportunities
          </p>
          <div className="user-types">
            <Link to="/athletes" className="user-type-button">
              <span className="user-type-icon">👤</span>
              Player
            </Link>
            <Link to="/teams" className="user-type-button">
              <span className="user-type-icon">🏆</span>
              Club
            </Link>
            <Link to="/agents" className="user-type-button">
              <span className="user-type-icon">📋</span>
              Agent
            </Link>
          </div>
        </div>
      </section>

      {/* Players & Clubs Section */}
      <section className="players-clubs-section">
        <h2>For Players & Clubs</h2>
        
        <div className="two-column-layout">
          <div className="column">
            <h3>For Players</h3>
            <div className="content-box">
              <p>Aspiring footballer with no time to search for opportunities? Get discovered by top clubs and agents with our AI-powered platform.</p>
              <Link to="/register" className="get-started-button">Get Started</Link>
            </div>
          </div>
          
          <div className="column">
            <h3>For Clubs</h3>
            <div className="content-box">
              <p>Club or academy with no time for extensive scouting? Find the perfect talent that matches your specific requirements and playing style.</p>
              <Link to="/register" className="get-started-button">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works-section">
        <h2>How it works</h2>
        
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">👥</div>
            <h3>Smart Matching</h3>
            <p>Our advanced algorithm uses machine learning to suggest personalized matches based on your profile and preferences.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">✅</div>
            <h3>Profile Verification</h3>
            <p>Trust and transparency are paramount. We verify player credentials and club profiles to ensure a secure experience.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">💬</div>
            <h3>Instant Messaging</h3>
            <p>Seamlessly communicate with matches through our integrated messaging platform, making it easy to schedule trials.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">⚙️</div>
            <h3>Customizable Preferences</h3>
            <p>Tailor your search criteria to find the perfect match that aligns with your specific requirements and goals.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>See it in action</h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-number">250+</h3>
            <p className="stat-label">Players</p>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-number">45</h3>
            <p className="stat-label">Clubs</p>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-number">85%</h3>
            <p className="stat-label">Match Rate</p>
          </div>
        </div>
        
        <p className="stats-description">
          We gave access to 25 players and 10 clubs in our beta test, and these are the results 30 days after they installed the app.
        </p>
        
        <div className="cta-container">
          <Link to="/waitlist" className="waitlist-button">Join the Waitlist</Link>
        </div>
      </section>

      {/* Top Prospects Section */}
      <section className="prospects-section">
        <h2>Top Prospects</h2>
        <p className="section-description">
          Discover rising football talent from around the world. These players have been highly rated by our AI scouting system.
        </p>
        
        <div className="prospects-grid">
          {topProspects.map((prospect) => (
            <div className="prospect-card" key={prospect.id}>
              <div className="potential-badge">{prospect.potential.split(' ')[0]}</div>
              <div className="prospect-image">
                <img src={prospect.profileImage} alt={prospect.name} />
              </div>
              <div className="prospect-info">
                <h3>{prospect.name}</h3>
                <p className="prospect-meta">{prospect.position} • {prospect.age} yrs • {prospect.country}</p>
                
                <div className="prospect-stats">
                  {prospect.position === "Goalkeeper" ? (
                    <>
                      <div className="stat-item">
                        <span className="stat-name">Reflexes:</span>
                        <span className="stat-value">{prospect.stats.reflexes}/10</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-name">Positioning:</span>
                        <span className="stat-value">{prospect.stats.positioning}/10</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-name">Handling:</span>
                        <span className="stat-value">{prospect.stats.handling}/10</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="stat-item">
                        <span className="stat-name">Pace:</span>
                        <span className="stat-value">{prospect.stats.pace}/10</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-name">Shooting:</span>
                        <span className="stat-value">{prospect.stats.shooting}/10</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-name">Passing:</span>
                        <span className="stat-value">{prospect.stats.passing}/10</span>
                      </div>
                    </>
                  )}
                </div>
                
                <Link to={`/athletes/${prospect.id}`} className="view-profile-button">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <h2>Watch how it works</h2>
        <div className="video-container">
          <video 
            autoPlay
            loop
            muted
            playsInline
            className="promo-video"
          >
            <source src="/videos/CV_clip.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="video-description">
          See how AthleX is transforming football scouting
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Users Say</h2>
        
        <div className="testimonials-grid">
          <div className="testimonial">
            <div className="testimonial-avatar"></div>
            <p className="testimonial-quote">
              "AthleX found us talent fast! The AI recommendations were spot on for our needs."
            </p>
            <div className="testimonial-author">
              <h4>John Smith</h4>
              <p>Talent Scout, FC Barcelona</p>
            </div>
          </div>
          
          <div className="testimonial">
            <div className="testimonial-avatar"></div>
            <p className="testimonial-quote">
              "As an agent, I've been able to connect my players with opportunities I wouldn't have found otherwise."
            </p>
            <div className="testimonial-author">
              <h4>Sarah Johnson</h4>
              <p>Football Agent</p>
            </div>
          </div>
          
          <div className="testimonial">
            <div className="testimonial-avatar"></div>
            <p className="testimonial-quote">
              "The platform gave me visibility to clubs that matched my playing style and career goals."
            </p>
            <div className="testimonial-author">
              <h4>Carlos Rodriguez</h4>
              <p>Midfielder, Rising Star</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <h2>Ready to transform your football journey?</h2>
        <p>Join AthleX today and connect with the opportunities that match your profile and ambitions.</p>
        
        <div className="waitlist-form">
          <input type="email" placeholder="Enter your email" className="email-input" />
          <button className="waitlist-button">Join Waitlist</button>
        </div>
      </section>
    </div>
  );
}

export default Home; 