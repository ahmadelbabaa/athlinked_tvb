import React, { useState } from 'react';
import PageHeader from './PageHeader';

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
    <>
      <PageHeader 
        title="University Programs" 
        subtitle="Explore top collegiate soccer programs and scholarship opportunities"
        backgroundImage="url(https://images.unsplash.com/photo-1498079022511-d15614cb1c02?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)"
      />
      
      <div className="elevo-page">
        <div className="elevo-search-container">
          <input
            type="text"
            placeholder="Search universities..."
            className="elevo-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="elevo-filter-select"
            value={filterConference}
            onChange={(e) => setFilterConference(e.target.value)}
          >
            {conferences.map(conf => (
              <option key={conf} value={conf}>
                {conf === 'all' ? 'All Conferences' : conf}
              </option>
            ))}
          </select>
          
          <button className="elevo-filter-button" onClick={() => {
            setSearchTerm('');
            setFilterConference('all');
          }}>
            Reset Filters
          </button>
        </div>

        <div className="elevo-players-grid">
          {filteredUniversities.map((university, index) => (
            <div key={index} className="elevo-player-card">
              <div className="elevo-university-header">
                <h3>{university.name}</h3>
                <p className="elevo-university-fullname">{university.fullName}</p>
              </div>
              
              <div className="elevo-university-info">
                <p className="elevo-location">{university.location}</p>
                <p className="elevo-division">{university.division} • {university.conference}</p>
              </div>

              <div className="elevo-player-stats">
                <div className="elevo-stat">
                  <div className="elevo-stat-value">{university.stats.nationalTitles}</div>
                  <div className="elevo-stat-label">National Titles</div>
                </div>
                <div className="elevo-stat">
                  <div className="elevo-stat-value">{university.stats.conferenceChampionships}</div>
                  <div className="elevo-stat-label">Conference Titles</div>
                </div>
                <div className="elevo-stat">
                  <div className="elevo-stat-value">#{university.stats.currentRanking}</div>
                  <div className="elevo-stat-label">Current Rank</div>
                </div>
              </div>

              <div className="elevo-university-programs">
                <h4>Soccer Programs</h4>
                <div className="elevo-programs-info">
                  {university.program.mensSoccer && <span className="elevo-program-tag">Men's Soccer</span>}
                  {university.program.womensSoccer && <span className="elevo-program-tag">Women's Soccer</span>}
                </div>
                <p className="elevo-scholarships">{university.program.scholarships}</p>
              </div>

              <div className="elevo-university-achievements">
                <h4>Recent Achievements</h4>
                <ul>
                  {university.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <button className="elevo-view-profile-button">LEARN MORE</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Universities; 