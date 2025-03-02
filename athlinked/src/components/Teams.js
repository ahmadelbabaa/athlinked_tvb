import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';

function Teams() {
  const [searchTerm, setSearchTerm] = useState('');
  const [leagueFilter, setLeagueFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

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
      
      <div className="elevo-page">
        <div className="elevo-search-container">
          <input
            type="text"
            className="elevo-search-input"
            placeholder="Search teams by name or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="elevo-filter-container">
            <select 
              className="elevo-filter-select"
              value={leagueFilter}
              onChange={(e) => setLeagueFilter(e.target.value)}
            >
              <option value="">All Leagues</option>
              {leagues.filter(league => league !== '').map((league) => (
                <option key={league} value={league}>{league}</option>
              ))}
            </select>
            
            <select 
              className="elevo-filter-select"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
            >
              <option value="">All Countries</option>
              {countries.filter(country => country !== '').map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            
            <button className="elevo-filter-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
        
        <div className="elevo-players-grid">
          {filteredTeams.map((team) => (
            <div className={`elevo-player-card ${team.featured ? 'elevo-featured-card' : ''}`} key={team.id}>
              {team.featured && <div className="elevo-featured-badge">Featured</div>}
              <div className="elevo-player-image-container">
                <img 
                  src={team.logo} 
                  alt={team.name} 
                  className="elevo-player-image"
                />
              </div>
              <div className="elevo-event-content">
                <h3 className="elevo-event-title">{team.name}</h3>
                <p className="elevo-event-subtitle">{team.league} • {team.country}</p>
                
                <p className="elevo-event-description">{team.description}</p>
                
                <div className="elevo-player-stats">
                  <div className="elevo-stat">
                    <div className="elevo-stat-value">{team.stats.leagueTitles}</div>
                    <div className="elevo-stat-label">League Titles</div>
                  </div>
                  <div className="elevo-stat">
                    <div className="elevo-stat-value">{team.stats.europeanTitles}</div>
                    <div className="elevo-stat-label">European Cups</div>
                  </div>
                  <div className="elevo-stat">
                    <div className="elevo-stat-value">#{team.stats.worldRanking}</div>
                    <div className="elevo-stat-label">World Rank</div>
                  </div>
                </div>
                
                <div className="elevo-university-achievements">
                  <h4>Key Achievements</h4>
                  <ul>
                    {team.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="elevo-team-info">
                  <p><strong>Founded:</strong> {team.founded}</p>
                  <p><strong>Stadium:</strong> {team.stadium}</p>
                </div>
                
                <Link to={`/team/${team.id}`} className="elevo-view-profile-button">
                  VIEW TEAM PROFILE
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTeams.length === 0 && (
          <div className="elevo-no-results">
            <p>No teams found matching your criteria</p>
            <button className="elevo-filter-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Teams; 