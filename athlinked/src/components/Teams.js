import React, { useState } from 'react';

function Teams() {
  const [teams] = useState([
    {
      name: "Sacramento Republic FC",
      league: "USL Championship",
      location: "Sacramento, California",
      founded: 2012,
      stats: {
        position: 5,
        gamesPlayed: 34,
        wins: 15,
        draws: 8,
        losses: 11,
        goalsFor: 45,
        goalsAgainst: 38,
        points: 53
      },
      manager: "Mark Briggs",
      stadium: "Heart Health Park",
      capacity: 11569,
      achievements: [
        "2022 US Open Cup Finalists",
        "2014 USL Championship Winners",
        "3-time Western Conference Finalists"
      ]
    },
    {
      name: "Detroit City FC",
      league: "USL Championship",
      location: "Detroit, Michigan",
      founded: 2012,
      stats: {
        position: 8,
        gamesPlayed: 34,
        wins: 12,
        draws: 11,
        losses: 11,
        goalsFor: 38,
        goalsAgainst: 35,
        points: 47
      },
      manager: "Trevor James",
      stadium: "Keyworth Stadium",
      capacity: 7933,
      achievements: [
        "2022 NISA Champions",
        "2019 Members Cup Winners",
        "2021 Independent Club of the Year"
      ]
    },
    {
      name: "Forward Madison FC",
      league: "USL League One",
      location: "Madison, Wisconsin",
      founded: 2018,
      stats: {
        position: 6,
        gamesPlayed: 32,
        wins: 11,
        draws: 9,
        losses: 12,
        goalsFor: 35,
        goalsAgainst: 39,
        points: 42
      },
      manager: "Matt Glaeser",
      stadium: "Breese Stevens Field",
      capacity: 5000,
      achievements: [
        "2021 USL League One Playoffs",
        "2019 Fan Experience of the Year",
        "Best Kit Design 2020"
      ]
    },
    {
      name: "Chattanooga Red Wolves SC",
      league: "USL League One",
      location: "Chattanooga, Tennessee",
      founded: 2018,
      stats: {
        position: 7,
        gamesPlayed: 32,
        wins: 10,
        draws: 8,
        losses: 14,
        goalsFor: 32,
        goalsAgainst: 41,
        points: 38
      },
      manager: "Jimmy Obleda",
      stadium: "CHI Memorial Stadium",
      capacity: 5500,
      achievements: [
        "2022 USL League One Playoffs",
        "2021 Community Impact Award",
        "First Professional Soccer Team in Chattanooga"
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterLeague, setFilterLeague] = useState('all');

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLeague = filterLeague === 'all' || team.league === filterLeague;
    return matchesSearch && matchesLeague;
  });

  const leagues = ['all', 'USL Championship', 'USL League One'];

  return (
    <div className="teams-page">
      <h2>Football Clubs</h2>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search clubs..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterLeague}
          onChange={(e) => setFilterLeague(e.target.value)}
        >
          {leagues.map(league => (
            <option key={league} value={league}>
              {league === 'all' ? 'All Leagues' : league}
            </option>
          ))}
        </select>
      </div>
      <div className="teams-grid">
        {filteredTeams.map((team, index) => (
          <div key={index} className="team-card">
            <div className="team-logo"></div>
            <h3>{team.name}</h3>
            <p className="team-league">{team.league}</p>
            <p className="team-location">{team.location}</p>
            
            <div className="team-stats">
              <div className="stat-row">
                <span>Position</span>
                <span>{team.stats.position}th</span>
              </div>
              <div className="stat-row">
                <span>Record</span>
                <span>{team.stats.wins}W {team.stats.draws}D {team.stats.losses}L</span>
              </div>
              <div className="stat-row">
                <span>Goals</span>
                <span>{team.stats.goalsFor} : {team.stats.goalsAgainst}</span>
              </div>
              <div className="stat-row">
                <span>Points</span>
                <span>{team.stats.points}</span>
              </div>
            </div>

            <div className="team-info">
              <p><strong>Manager:</strong> {team.manager}</p>
              <p><strong>Stadium:</strong> {team.stadium} ({team.capacity.toLocaleString()} capacity)</p>
            </div>

            <div className="team-achievements">
              <h4>Recent Achievements</h4>
              <ul>
                {team.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>

            <button className="connect-button">View Team</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams; 