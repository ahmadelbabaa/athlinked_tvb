import React from 'react';

function Athletes() {
  const footballPlayers = [
    {
      name: "Marcus Silva",
      position: "Striker",
      club: "City United FC",
      stats: {
        appearances: 28,
        goals: 22,
        assists: 8
      },
      age: 24,
      isVerified: true
    },
    {
      name: "James Wilson",
      position: "Midfielder",
      club: "Royal Athletic",
      stats: {
        appearances: 30,
        goals: 7,
        assists: 15
      },
      age: 26,
      isVerified: false
    },
    {
      name: "David Lee",
      position: "Defender",
      club: "United City FC",
      stats: {
        appearances: 25,
        goals: 2,
        assists: 3
      },
      age: 23,
      isVerified: true
    },
    {
      name: "Tom Rodriguez",
      position: "Goalkeeper",
      club: "Metro Rangers",
      stats: {
        appearances: 32,
        cleanSheets: 14,
        saves: 86
      },
      age: 28,
      isVerified: false
    }
  ];

  return (
    <div className="athletes-page">
      <h2>Football Players</h2>
      <div className="search-section">
        <input type="text" placeholder="Search players..." className="search-input" />
        <select className="filter-select">
          <option value="">All Positions</option>
          <option value="striker">Striker</option>
          <option value="midfielder">Midfielder</option>
          <option value="defender">Defender</option>
          <option value="goalkeeper">Goalkeeper</option>
        </select>
      </div>
      <div className="athletes-grid">
        {footballPlayers.map((player, index) => (
          <div key={index} className="athlete-card">
            <div className="athlete-image"></div>
            <div className="player-name">
              <h3>{player.name}</h3>
              {player.isVerified && <span className="verified-badge" title="Verified Player">✓</span>}
            </div>
            <p className="player-position">{player.position}</p>
            <p className="player-club">{player.club}</p>
            <div className="player-stats">
              <div className="stat">
                <span className="stat-label">Apps</span>
                <span className="stat-value">{player.stats.appearances}</span>
              </div>
              <div className="stat">
                <span className="stat-label">{player.position === "Goalkeeper" ? "Clean Sheets" : "Goals"}</span>
                <span className="stat-value">
                  {player.position === "Goalkeeper" ? player.stats.cleanSheets : player.stats.goals}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">{player.position === "Goalkeeper" ? "Saves" : "Assists"}</span>
                <span className="stat-value">
                  {player.position === "Goalkeeper" ? player.stats.saves : player.stats.assists}
                </span>
              </div>
            </div>
            <button className="connect-button">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Athletes; 