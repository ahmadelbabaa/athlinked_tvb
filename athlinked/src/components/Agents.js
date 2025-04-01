import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';

function Agents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('userRole') !== null;

  const agents = [
    {
      id: 1,
      name: "Michael Thompson",
      yearsExperience: 15,
      specialty: "Player Development",
      location: "London, UK",
      isVerified: true,
      story: "Experienced agent specializing in youth development and academy players. Known for nurturing young talent and securing successful transfers.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      stats: {
        athletesRepresented: 25,
        successfulTransfers: 45,
        clientValue: "£150M+"
      },
      achievements: [
        "2022 Agent of the Year",
        "Top 10 Most Influential Agents",
        "Youth Development Excellence Award"
      ],
      featured: true
    },
    {
      id: 2,
      name: "Sarah Martinez",
      yearsExperience: 12,
      specialty: "Women's Football",
      location: "Madrid, Spain",
      isVerified: true,
      story: "Leading agent in women's football, representing top players in major leagues worldwide. Strong advocate for gender equality in sports.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      stats: {
        athletesRepresented: 18,
        successfulTransfers: 32,
        clientValue: "£80M+"
      },
      achievements: [
        "Women's Football Pioneer Award",
        "Top Female Agent 2023",
        "Equality in Sports Advocate"
      ],
      featured: true
    },
    {
      id: 3,
      name: "David Chen",
      yearsExperience: 8,
      specialty: "Asian Market",
      location: "Singapore",
      isVerified: false,
      story: "Specializing in Asian football talent, bridging the gap between Asian and European markets. Expert in international transfers.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      stats: {
        athletesRepresented: 15,
        successfulTransfers: 28,
        clientValue: "£60M+"
      },
      achievements: [
        "Asian Market Expert 2023",
        "International Transfer Specialist",
        "Market Development Award"
      ],
      featured: false
    },
    {
      id: 4,
      name: "Emma Wilson",
      yearsExperience: 10,
      specialty: "Scouting",
      location: "Manchester, UK",
      isVerified: true,
      story: "Former professional scout turned agent, combining deep scouting knowledge with modern transfer market expertise.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      stats: {
        athletesRepresented: 20,
        successfulTransfers: 35,
        clientValue: "£100M+"
      },
      achievements: [
        "Scouting Excellence Award",
        "Talent Discovery Specialist",
        "Top 20 Agents Under 40"
      ],
      featured: false
    }
  ];

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         agent.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExperience = experienceFilter === '' || 
                            (experienceFilter === 'under5' && agent.yearsExperience < 5) ||
                            (experienceFilter === '5to10' && agent.yearsExperience >= 5 && agent.yearsExperience <= 10) ||
                            (experienceFilter === 'over10' && agent.yearsExperience > 10);
    const matchesSpecialty = specialtyFilter === '' || agent.specialty === specialtyFilter;
    
    return matchesSearch && matchesExperience && matchesSpecialty;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setExperienceFilter('');
    setSpecialtyFilter('');
  };

  return (
    <>
      <PageHeader 
        title="Football Agents" 
        subtitle="Connect with experienced agents who can help advance your career"
        backgroundImage="url(https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)"
      />
      
      <div className="athletes-page">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search agents by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="filter-container">
            <select 
              className="filter-select"
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
            >
              <option value="">All Experience Levels</option>
              <option value="under5">Under 5 Years</option>
              <option value="5to10">5-10 Years</option>
              <option value="over10">Over 10 Years</option>
            </select>
            
            <select 
              className="filter-select"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
            >
              <option value="">All Specialties</option>
              <option value="Player Development">Player Development</option>
              <option value="Women's Football">Women's Football</option>
              <option value="Asian Market">Asian Market</option>
              <option value="Scouting">Scouting</option>
            </select>
            
            <button className="filter-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
        
        <div className="players-grid">
          {filteredAgents.map((agent) => (
            <div className={`player-card ${agent.featured ? 'featured-card' : ''}`} key={agent.id}>
              {agent.featured && <div className="rank-badge">Featured</div>}
              <div className="player-image-container" style={{
                width: "100%",
                height: "220px",
                overflow: "hidden",
                borderRadius: "8px 8px 0 0",
                position: "relative"
              }}>
                <img 
                  src={agent.image} 
                  alt={agent.name} 
                  className="player-image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top"
                  }}
                />
              </div>
              <div className="player-content">
                <div className="player-header">
                  <h3 className="player-name">
                    {agent.name} {agent.isVerified && <span className="verified-badge">✓</span>}
                  </h3>
                  <div className="player-info">
                    <div className="player-position">{agent.specialty}</div>
                    <div className="player-club">{agent.location}</div>
                  </div>
                </div>
                
                <p className="player-story">{agent.story}</p>
                
                <div className="player-stats" style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "8px",
                  margin: "1rem 0"
                }}>
                  <div className="player-stat" style={{
                    flex: "1",
                    textAlign: "center",
                    padding: "0.5rem 0",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <div className="stat-value" style={{
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                      width: "100%"
                    }}>{agent.stats.athletesRepresented}</div>
                    <div className="stat-label" style={{
                      fontSize: "0.8rem",
                      color: "rgba(255, 255, 255, 0.7)",
                      width: "100%",
                      textAlign: "center"
                    }}>Athletes</div>
                  </div>
                  <div className="player-stat" style={{
                    flex: "1",
                    textAlign: "center",
                    padding: "0.5rem 0",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <div className="stat-value" style={{
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                      width: "100%"
                    }}>{agent.stats.successfulTransfers}</div>
                    <div className="stat-label" style={{
                      fontSize: "0.8rem",
                      color: "rgba(255, 255, 255, 0.7)",
                      width: "100%",
                      textAlign: "center"
                    }}>Transfers</div>
                  </div>
                  <div className="player-stat" style={{
                    flex: "1",
                    textAlign: "center",
                    padding: "0.5rem 0",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <div className="stat-value" style={{
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                      width: "100%"
                    }}>{agent.stats.clientValue}</div>
                    <div className="stat-label" style={{
                      fontSize: "0.8rem",
                      color: "rgba(255, 255, 255, 0.7)",
                      width: "100%",
                      textAlign: "center"
                    }}>Value</div>
                  </div>
                </div>
                
                <div style={{
                  marginBottom: "1.5rem",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  padding: "1rem"
                }}>
                  <h4 style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    color: "var(--accent-color)"
                  }}>Key Achievements</h4>
                  <ul style={{
                    listStylePosition: "inside",
                    paddingLeft: "0",
                    margin: "0"
                  }}>
                    {agent.achievements.map((achievement, i) => (
                      <li key={i} style={{
                        marginBottom: "0.5rem",
                        fontSize: "0.9rem",
                        color: "rgba(255, 255, 255, 0.8)"
                      }}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="team-info" style={{
                  marginBottom: "1.5rem",
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.8)"
                }}>
                  <p><strong>Experience:</strong> {agent.yearsExperience} years</p>
                </div>
                
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link to={`/agent/${agent.id}`} className="view-player-button" style={{ 
                    flex: isLoggedIn ? "3" : "initial",
                    fontSize: "0.75rem",
                    padding: "0.6rem 0"
                  }}>
                    VIEW PROFILE
                  </Link>
                  
                  {isLoggedIn && (
                    <Link 
                      to={`/messaging?contact=agent-${agent.id}`} 
                      className="message-button"
                      style={{
                        flex: "2",
                        padding: "0.6rem 0",
                        textAlign: "center",
                        backgroundColor: "rgba(123, 46, 142, 0.8)",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontWeight: "500",
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "3px"
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor" />
                      </svg>
                      MSG
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAgents.length === 0 && (
          <div className="no-results" style={{
            textAlign: "center",
            padding: "3rem",
            backgroundColor: "var(--secondary-color)",
            borderRadius: "12px",
            margin: "2rem 0"
          }}>
            <p>No agents found matching your criteria</p>
            <button className="filter-button" onClick={resetFilters} style={{marginTop: "1rem"}}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Agents; 