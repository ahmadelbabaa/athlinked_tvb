import React, { useState } from 'react';

function Universities() {
  const [universities] = useState([
    {
      name: "UMBC",
      fullName: "University of Maryland, Baltimore County",
      location: "Baltimore, Maryland",
      division: "NCAA Division I",
      conference: "America East",
      stats: {
        nationalTitles: 0,
        conferenceChampionships: 4,
        proPlayersProduced: 8,
        currentRanking: 85
      },
      facilities: "Retriever Soccer Park (2,500 capacity)",
      program: {
        mensSoccer: true,
        womensSoccer: true,
        scholarships: "Partial athletic scholarships available"
      },
      achievements: [
        "2014 America East Champions",
        "2021 Conference Semifinalists",
        "Notable upset victory over Wake Forest in 2019"
      ]
    },
    {
      name: "Loyola",
      fullName: "Loyola University Chicago",
      location: "Chicago, Illinois",
      division: "NCAA Division I",
      conference: "Atlantic 10",
      stats: {
        nationalTitles: 0,
        conferenceChampionships: 2,
        proPlayersProduced: 5,
        currentRanking: 92
      },
      facilities: "Loyola Soccer Park (1,200 capacity)",
      program: {
        mensSoccer: true,
        womensSoccer: true,
        scholarships: "Limited athletic scholarships available"
      },
      achievements: [
        "2022 Atlantic 10 Quarterfinalists",
        "2023 Most Improved Program",
        "8 consecutive winning seasons"
      ]
    },
    {
      name: "FGCU",
      fullName: "Florida Gulf Coast University",
      location: "Fort Myers, Florida",
      division: "NCAA Division I",
      conference: "ASUN",
      stats: {
        nationalTitles: 0,
        conferenceChampionships: 3,
        proPlayersProduced: 6,
        currentRanking: 78
      },
      facilities: "FGCU Soccer Complex (1,500 capacity)",
      program: {
        mensSoccer: true,
        womensSoccer: true,
        scholarships: "Athletic and academic scholarships available"
      },
      achievements: [
        "2023 ASUN Regular Season Champions",
        "2021 Conference Tournament Runners-up",
        "12 players signed to USL teams"
      ]
    },
    {
      name: "Mercer",
      fullName: "Mercer University",
      location: "Macon, Georgia",
      division: "NCAA Division I",
      conference: "Southern Conference",
      stats: {
        nationalTitles: 0,
        conferenceChampionships: 1,
        proPlayersProduced: 4,
        currentRanking: 95
      },
      facilities: "Bear Field (1,000 capacity)",
      program: {
        mensSoccer: true,
        womensSoccer: true,
        scholarships: "Merit-based athletic scholarships available"
      },
      achievements: [
        "2022 Southern Conference Champions",
        "2023 Academic Excellence Award",
        "First NCAA Tournament appearance in 2022"
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterConference, setFilterConference] = useState('all');

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesConference = filterConference === 'all' || uni.conference === filterConference;
    return matchesSearch && matchesConference;
  });

  const conferences = ['all', 'America East', 'Atlantic 10', 'ASUN', 'Southern Conference'];

  return (
    <div className="universities-page">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search universities..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterConference}
          onChange={(e) => setFilterConference(e.target.value)}
        >
          {conferences.map(conf => (
            <option key={conf} value={conf}>
              {conf === 'all' ? 'All Conferences' : conf}
            </option>
          ))}
        </select>
      </div>

      <div className="universities-grid">
        {filteredUniversities.map((university, index) => (
          <div key={index} className="university-card">
            <div className="university-header">
              <h3>{university.name}</h3>
              <p className="university-fullname">{university.fullName}</p>
            </div>
            
            <div className="university-info">
              <p className="location">{university.location}</p>
              <p className="division">{university.division} • {university.conference}</p>
            </div>

            <div className="university-stats">
              <div className="stat">
                <span className="stat-value">{university.stats.nationalTitles}</span>
                <span className="stat-label">National Titles</span>
              </div>
              <div className="stat">
                <span className="stat-value">{university.stats.conferenceChampionships}</span>
                <span className="stat-label">Conference Titles</span>
              </div>
              <div className="stat">
                <span className="stat-value">#{university.stats.currentRanking}</span>
                <span className="stat-label">Current Rank</span>
              </div>
            </div>

            <div className="university-programs">
              <h4>Soccer Programs</h4>
              <div className="programs-info">
                {university.program.mensSoccer && <span className="program-tag">Men's Soccer</span>}
                {university.program.womensSoccer && <span className="program-tag">Women's Soccer</span>}
              </div>
              <p className="scholarships">{university.program.scholarships}</p>
            </div>

            <div className="university-achievements">
              <h4>Recent Achievements</h4>
              <ul>
                {university.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>

            <button className="connect-button">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Universities; 