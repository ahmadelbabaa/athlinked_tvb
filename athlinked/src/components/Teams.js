import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';

function Teams() {
  const [searchTerm, setSearchTerm] = useState('');
  const [leagueFilter, setLeagueFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('userRole') !== null;

  const teams = [
    {
      id: 1,
      name: "Madrid FC",
      league: "La Liga",
      country: "Spain",
      logo: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      description: "One of the most successful clubs in Spanish football with a rich history of developing world-class talent.",
      founded: 1902,
      stadium: "Santiago Bernabéu Stadium (81,044 capacity)",
      stats: {
        leagueTitles: 35,
        europeanTitles: 14,
        worldRanking: 1
      },
      achievements: [
        "14-time European Champions",
        "35-time La Liga Champions",
        "Record 5 FIFA Club World Cup titles"
      ],
      featured: true
    },
    {
      id: 2,
      name: "Liverpool",
      league: "Premier League",
      country: "England",
      logo: "https://images.unsplash.com/photo-1623607915241-8933ea4e5c64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      description: "Historic English club known for passionate fans and attacking football philosophy.",
      founded: 1892,
      stadium: "Anfield (53,394 capacity)",
      stats: {
        leagueTitles: 19,
        europeanTitles: 6,
        worldRanking: 5
      },
      achievements: [
        "6-time European Champions",
        "19-time English Champions",
        "8-time FA Cup Winners"
      ],
      featured: true
    },
    {
      id: 3,
      name: "Bayern Munich",
      league: "Bundesliga",
      country: "Germany",
      logo: "https://images.unsplash.com/photo-1518559198631-147122e4e5d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      description: "Germany's most successful club with a tradition of excellence and developing national talent.",
      founded: 1900,
      stadium: "Allianz Arena (75,000 capacity)",
      stats: {
        leagueTitles: 32,
        europeanTitles: 6,
        worldRanking: 3
      },
      achievements: [
        "6-time European Champions",
        "32-time Bundesliga Champions",
        "20-time German Cup Winners"
      ],
      featured: false
    },
    {
      id: 4,
      name: "FC Barcelona",
      league: "La Liga",
      country: "Spain",
      logo: "https://images.unsplash.com/photo-1589723935412-6286f21a424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      description: "Catalan club known for its distinctive style of play and emphasis on youth development.",
      founded: 1899,
      stadium: "Camp Nou (99,354 capacity)",
      stats: {
        leagueTitles: 26,
        europeanTitles: 5,
        worldRanking: 7
      },
      achievements: [
        "5-time European Champions",
        "26-time La Liga Champions",
        "31-time Copa del Rey Winners"
      ],
      featured: false
    },
    {
      id: 5,
      name: "Juventus",
      league: "Serie A",
      country: "Italy",
      logo: "https://images.unsplash.com/photo-1535970061542-9a0438982cb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      description: "Italy's most successful club with a reputation for defensive solidity and tactical awareness.",
      founded: 1897,
      stadium: "Allianz Stadium (41,507 capacity)",
      stats: {
        leagueTitles: 36,
        europeanTitles: 2,
        worldRanking: 8
      },
      achievements: [
        "2-time European Champions",
        "36-time Serie A Champions",
        "14-time Coppa Italia Winners"
      ],
      featured: false
    },
    {
      id: 6,
      name: "PSG",
      league: "Ligue 1",
      country: "France",
      logo: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
      description: "Modern powerhouse backed by substantial investment, focusing on attracting global superstars.",
      founded: 1970,
      stadium: "Parc des Princes (47,929 capacity)",
      stats: {
        leagueTitles: 10,
        europeanTitles: 0,
        worldRanking: 6
      },
      achievements: [
        "10-time Ligue 1 Champions",
        "14-time French Cup Winners",
        "Champions League Finalists (2020)"
      ],
      featured: true
    }
  ];

  // Filter teams
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         team.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLeague = leagueFilter === '' || team.league === leagueFilter;
    const matchesCountry = countryFilter === '' || team.country === countryFilter;
    
    return matchesSearch && matchesLeague && matchesCountry;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setLeagueFilter('');
    setCountryFilter('');
  };

  const leagues = ['', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'];
  const countries = ['', 'England', 'Spain', 'Germany', 'Italy', 'France'];

  return (
    <>
      <PageHeader 
        title="Football Teams" 
        subtitle="Explore top professional clubs and their achievements"
        backgroundImage="url(https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)"
      />
      
      <div className="athletes-page">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search teams by name or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="filter-container">
            <select 
              className="filter-select"
              value={leagueFilter}
              onChange={(e) => setLeagueFilter(e.target.value)}
            >
              <option value="">All Leagues</option>
              {leagues.filter(league => league !== '').map((league) => (
                <option key={league} value={league}>{league}</option>
              ))}
            </select>
            
            <select 
              className="filter-select"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
            >
              <option value="">All Countries</option>
              {countries.filter(country => country !== '').map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            
            <button className="filter-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
        
        <div className="players-grid">
          {filteredTeams.map((team) => (
            <div className={`player-card ${team.featured ? 'featured-card' : ''}`} key={team.id}>
              {team.featured && <div className="rank-badge">Featured</div>}
              <div className="player-image-container">
                <img 
                  src={team.logo} 
                  alt={team.name} 
                  className="player-image"
                />
              </div>
              <div className="player-content">
                <div className="player-header">
                  <h3 className="player-name">{team.name}</h3>
                  <div className="player-info">
                    <div className="player-position">{team.league}</div>
                    <div className="player-club">{team.country}</div>
                  </div>
                </div>
                
                <p className="player-story">{team.description}</p>
                
                <div className="player-stats">
                  <div className="player-stat">
                    <div className="stat-value">{team.stats.leagueTitles}</div>
                    <div className="stat-label">League Titles</div>
                  </div>
                  <div className="player-stat">
                    <div className="stat-value">{team.stats.europeanTitles}</div>
                    <div className="stat-label">European Cups</div>
                  </div>
                  <div className="player-stat">
                    <div className="stat-value">#{team.stats.worldRanking}</div>
                    <div className="stat-label">World Rank</div>
                  </div>
                </div>
                
                <div className="team-achievements" style={{
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
                    {team.achievements.map((achievement, i) => (
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
                  <p><strong>Founded:</strong> {team.founded}</p>
                  <p style={{marginBottom: "0"}}><strong>Stadium:</strong> {team.stadium}</p>
                </div>
                
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link to={`/team/${team.id}`} className="view-player-button" style={{ 
                    flex: isLoggedIn ? "3" : "initial",
                    fontSize: "0.75rem",
                    padding: "0.6rem 0"
                  }}>
                    VIEW TEAM PROFILE
                  </Link>
                  
                  {isLoggedIn && (
                    <Link 
                      to={`/messaging?contact=team-${team.id}`} 
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
        
        {filteredTeams.length === 0 && (
          <div className="no-results" style={{
            textAlign: "center",
            padding: "3rem",
            backgroundColor: "var(--secondary-color)",
            borderRadius: "12px",
            margin: "2rem 0"
          }}>
            <p>No teams found matching your criteria</p>
            <button className="filter-button" onClick={resetFilters} style={{marginTop: "1rem"}}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Teams; 