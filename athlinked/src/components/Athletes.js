import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';

function Athletes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [isTeam, setIsTeam] = useState(false);
  const [similarityScores, setSimilarityScores] = useState({});
  const [sortBySimilarity, setSortBySimilarity] = useState(true);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('userRole') !== null;

  // Use useMemo to memoize the footballPlayers array
  const footballPlayers = useMemo(() => [
    {
      id: 1,
      name: "Alex Johnson",
      position: "Striker",
      club: "City FC",
      stats: {
        appearances: 42,
        goals: 28,
        assists: 12
      },
      age: 24,
      isVerified: true,
      story: "Talented striker with a natural instinct for goals. Raised through the City FC youth academy and now a regular starter.",
      image: "https://images.unsplash.com/photo-1627461696668-d6118767e614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb3RiYWxsJTIwcGxheWVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      location: "Manchester, UK"
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      position: "Midfielder",
      club: "Madrid United",
      stats: {
        appearances: 38,
        goals: 5,
        assists: 18
      },
      age: 26,
      isVerified: true,
      story: "Creative midfielder known for his precise passing. Has been a key player for Madrid United since his transfer from Barcelona Juniors.",
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbGwlMjBwbGF5ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      location: "Madrid, Spain"
    },
    {
      id: 3,
      name: "Emma Wilson",
      position: "Defender",
      club: "Northern Ladies",
      stats: {
        appearances: 45,
        goals: 2,
        assists: 5
      },
      age: 22,
      isVerified: false,
      story: "Solid defender with excellent tackling abilities. Rising star in the women's league and a fan favorite at Northern Ladies.",
      image: "https://images.unsplash.com/photo-1530259152377-3a013c126799?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwZm9vdGJhbGwlMjBwbGF5ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      location: "Leeds, UK"
    },
    {
      id: 4,
      name: "Tom Rodriguez",
      position: "Goalkeeper",
      club: "Metro Rangers",
      stats: {
        appearances: 32,
        cleanSheets: 14,
        saves: 86
      },
      age: 28,
      isVerified: false,
      story: "Reliable shot-stopper with excellent reflexes. Known for his penalty-saving abilities.",
      image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hbGtlZXBlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
      location: "Birmingham, UK"
    }
  ], []);

  // Check if user is logged in as a team
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsTeam(userRole === 'team');
    
    // Generate hypothetical similarity scores if user is a team
    if (userRole === 'team') {
      const scores = {};
      footballPlayers.forEach(player => {
        // Generate a random score between 40% and 95%
        scores[player.id] = Math.floor(Math.random() * 56) + 40;
      });
      setSimilarityScores(scores);
    }
  }, [footballPlayers]);

  // Filter players
  const filteredPlayers = footballPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          player.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          player.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === '' || player.position === positionFilter;
    const matchesAge = ageFilter === '' || 
                      (ageFilter === 'under20' && player.age < 20) ||
                      (ageFilter === '20to25' && player.age >= 20 && player.age <= 25) ||
                      (ageFilter === 'over25' && player.age > 25);
    return matchesSearch && matchesPosition && matchesAge;
  });

  // Sort players by similarity score if user is a team
  const sortedPlayers = [...filteredPlayers];
  if (isTeam && sortBySimilarity) {
    sortedPlayers.sort((a, b) => {
      return similarityScores[b.id] - similarityScores[a.id];
    });
  }

  const resetFilters = () => {
    setSearchTerm('');
    setPositionFilter('');
    setAgeFilter('');
  };

  // Function to determine score color based on percentage
  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green for high match
    if (score >= 60) return '#FFC107'; // Yellow/Amber for medium match
    return '#F44336'; // Red for low match
  };

  // Toggle sorting function
  const toggleSorting = () => {
    setSortBySimilarity(!sortBySimilarity);
  };

  return (
    <>
      <PageHeader 
        title="Player Talents" 
        subtitle="Discover unsigned players ready for professional opportunities"
        backgroundImage="url(https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)"
      />
      
      <div className="athletes-page">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search players, clubs, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="filter-container">
            <select 
              className="filter-select"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="">All Positions</option>
              <option value="Striker">Striker</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
            
            <select 
              className="filter-select"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
            >
              <option value="">All Ages</option>
              <option value="under20">Under 20</option>
              <option value="20to25">20-25</option>
              <option value="over25">Over 25</option>
            </select>
            
            <button className="filter-button" onClick={resetFilters}>
              Reset Filters
            </button>
            
            {isTeam && (
              <button 
                className={`filter-button ${sortBySimilarity ? "active" : ""}`}
                onClick={toggleSorting}
              >
                {sortBySimilarity ? "Sorted by Match %" : "Sort by Match %"}
              </button>
            )}
          </div>
        </div>
        
        <div className="players-grid">
          {sortedPlayers.map((player, index) => (
            <div className="player-card" key={player.id}>
              <div className="player-image-container">
                <img 
                  src={player.image} 
                  alt={player.name} 
                  className="player-image"
                />
                <div className="player-age">
                  <span>{player.age}</span>
                </div>
                {isTeam && (
                  <>
                    <div 
                      className="similarity-badge" 
                      style={{ backgroundColor: getScoreColor(similarityScores[player.id]) }}
                    >
                      {similarityScores[player.id]}% Match
                    </div>
                    {sortBySimilarity && (
                      <div className="rank-badge">
                        #{index + 1}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="player-content">
                <div className="player-header">
                  <h3 className="player-name">
                    {player.name} {player.isVerified && <span className="verified-badge">✓</span>}
                  </h3>
                  <div className="player-info">
                    <div className="player-position">{player.position}</div>
                    <div className="player-club">{player.club}</div>
                  </div>
                </div>
                <p className="player-story">
                  {player.story}
                </p>
                <div className="player-stats">
                  <div className="player-stat">
                    <div className="stat-value">{player.stats.appearances}</div>
                    <div className="stat-label">Apps</div>
                  </div>
                  <div className="player-stat">
                    <div className="stat-value">
                      {player.position === "Goalkeeper" ? player.stats.cleanSheets : player.stats.goals}
                    </div>
                    <div className="stat-label">
                      {player.position === "Goalkeeper" ? "Clean" : "Goals"}
                    </div>
                  </div>
                  <div className="player-stat">
                    <div className="stat-value">
                      {player.position === "Goalkeeper" ? player.stats.saves : player.stats.assists}
                    </div>
                    <div className="stat-label">
                      {player.position === "Goalkeeper" ? "Saves" : "Assists"}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link to={`/profile/${player.id}`} className="view-player-button" style={{ 
                    flex: isLoggedIn ? "3" : "initial",
                    fontSize: "0.75rem",
                    padding: "0.6rem 0"
                  }}>
                    VIEW PROFILE
                  </Link>
                  
                  {isLoggedIn && (
                    <Link 
                      to={`/messaging?contact=player-${player.id}`} 
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
        
        {sortedPlayers.length === 0 && (
          <div className="no-results" style={{
            textAlign: "center",
            padding: "3rem",
            backgroundColor: "var(--secondary-color)",
            borderRadius: "12px",
            margin: "2rem 0"
          }}>
            <p>No players found matching your criteria</p>
            <button className="filter-button" onClick={resetFilters} style={{marginTop: "1rem"}}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Athletes;