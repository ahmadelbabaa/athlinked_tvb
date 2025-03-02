import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';

function Athletes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [isTeam, setIsTeam] = useState(false);
  const [similarityScores, setSimilarityScores] = useState({});
  const [sortBySimilarity, setSortBySimilarity] = useState(true);

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
  }, []);

  const footballPlayers = [
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
  ];

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
      
      <div className="elevo-page">
        <div className="elevo-search-container">
          <input
            type="text"
            className="elevo-search-input"
            placeholder="Search players, clubs, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="elevo-filter-container">
            <select 
              className="elevo-filter-select"
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
              className="elevo-filter-select"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
            >
              <option value="">All Ages</option>
              <option value="under20">Under 20</option>
              <option value="20to25">20-25</option>
              <option value="over25">Over 25</option>
            </select>
            
            <button className="elevo-filter-button" onClick={resetFilters}>
              Reset Filters
            </button>
            
            {isTeam && (
              <button 
                className="elevo-filter-button" 
                onClick={toggleSorting}
                style={{ 
                  backgroundColor: sortBySimilarity ? 'var(--elevo-pink)' : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                {sortBySimilarity ? "Sorted by Match %" : "Sort by Match %"}
              </button>
            )}
          </div>
        </div>
        
        <div className="elevo-players-grid">
          {sortedPlayers.map((player, index) => (
            <div className="elevo-player-card" key={player.id}>
              <div className="elevo-player-image-container">
                <img 
                  src={player.image} 
                  alt={player.name} 
                  className="elevo-player-image"
                />
                <div className="elevo-player-age">
                  <span>{player.age}</span>
                </div>
                {isTeam && (
                  <>
                    <div 
                      className="elevo-similarity-badge" 
                      style={{ backgroundColor: getScoreColor(similarityScores[player.id]) }}
                    >
                      {similarityScores[player.id]}% Match
                    </div>
                    {sortBySimilarity && (
                      <div className="elevo-rank-badge">
                        #{index + 1}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="elevo-player-content">
                <div className="elevo-player-header">
                  <h3 className="elevo-player-name">
                    {player.name} {player.isVerified && <span className="elevo-verified-badge">✓</span>}
                  </h3>
                  <div className="elevo-player-info">
                    <div className="elevo-player-position">{player.position}</div>
                    <div className="elevo-player-club">{player.club}</div>
                  </div>
                </div>
                <p className="elevo-player-story">
                  {player.story}
                </p>
                <div className="elevo-player-stats">
                  <div className="elevo-stat">
                    <div className="elevo-stat-value">{player.stats.appearances}</div>
                    <div className="elevo-stat-label">Apps</div>
                  </div>
                  <div className="elevo-stat">
                    <div className="elevo-stat-value">
                      {player.position === "Goalkeeper" ? player.stats.cleanSheets : player.stats.goals}
                    </div>
                    <div className="elevo-stat-label">
                      {player.position === "Goalkeeper" ? "Clean" : "Goals"}
                    </div>
                  </div>
                  <div className="elevo-stat">
                    <div className="elevo-stat-value">
                      {player.position === "Goalkeeper" ? player.stats.saves : player.stats.assists}
                    </div>
                    <div className="elevo-stat-label">
                      {player.position === "Goalkeeper" ? "Saves" : "Assists"}
                    </div>
                  </div>
                </div>
                <Link to="/profile" className="elevo-view-profile-button">
                  VIEW PROFILE
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {sortedPlayers.length === 0 && (
          <div className="elevo-no-results">
            <p>No players found matching your criteria</p>
            <button className="elevo-filter-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Athletes;