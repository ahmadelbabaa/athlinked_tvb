import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Profile({ userRole, viewMode }) {
  const { id } = useParams();
  const [isOwnProfile, setIsOwnProfile] = useState(true);

  // Determine if this is the user's own profile or viewing another player
  useEffect(() => {
    if (viewMode === 'player' && id) {
      setIsOwnProfile(false);
    } else {
      setIsOwnProfile(true);
    }
  }, [viewMode, id]);

  // Sample player data - in a real app, this would come from a database
  const playersData = {
    "1": {
      name: "Alex Johnson",
      age: 24,
      nationality: "English",
      position: "Striker",
      currentClub: "City FC",
      experience: 6,
      bio: "Talented striker with a natural instinct for goals. Raised through the City FC youth academy and now a regular starter.",
      isVerified: true,
      stats: {
        matches: 42,
        goals: 28,
        assists: 12,
        hoursPlayed: 58,
        yellowCards: 4,
        redCards: 0
      },
      achievements: [
        { title: "Golden Boot Award", year: "2022" },
        { title: "Player of the Month", year: "2023" },
        { title: "Champions Cup Winner", year: "2021" }
      ],
      skills: [
        { name: "Dribbling", value: 85 },
        { name: "Speed", value: 88 },
        { name: "Shooting", value: 92 },
        { name: "Passing", value: 79 },
        { name: "Physical", value: 83 },
        { name: "Defending", value: 65 }
      ],
      highlights: [
        {
          id: 1,
          title: "Season Highlights",
          duration: "3:24",
          views: "32.6K",
          thumbnail: "https://images.unsplash.com/photo-1627461696668-d6118767e614?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
        },
        {
          id: 2,
          title: "Top 10 Goals",
          duration: "4:15",
          views: "18.9K",
          thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
        }
      ]
    },
    "2": {
      name: "Carlos Rodriguez",
      age: 26,
      nationality: "Spanish",
      position: "Midfielder",
      currentClub: "Madrid United",
      experience: 8,
      bio: "Creative midfielder known for his precise passing. Has been a key player for Madrid United since his transfer from Barcelona Juniors.",
      isVerified: true,
      stats: {
        matches: 38,
        goals: 5,
        assists: 18,
        hoursPlayed: 52,
        yellowCards: 3,
        redCards: 0
      },
      achievements: [
        { title: "Best Midfielder Award", year: "2022" },
        { title: "Most Assists", year: "2021" },
        { title: "Cup Winner", year: "2020" }
      ],
      skills: [
        { name: "Dribbling", value: 88 },
        { name: "Speed", value: 80 },
        { name: "Shooting", value: 75 },
        { name: "Passing", value: 93 },
        { name: "Physical", value: 78 },
        { name: "Defending", value: 72 }
      ],
      highlights: [
        {
          id: 1,
          title: "Midfield Mastery",
          duration: "2:48",
          views: "21.3K",
          thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
        }
      ]
    },
    "3": {
      name: "Emma Wilson",
      age: 22,
      nationality: "British",
      position: "Defender",
      currentClub: "Northern Ladies",
      experience: 4,
      bio: "Solid defender with excellent tackling abilities. Rising star in the women's league and a fan favorite at Northern Ladies.",
      isVerified: false,
      stats: {
        matches: 45,
        goals: 2,
        assists: 5,
        hoursPlayed: 61,
        yellowCards: 5,
        redCards: 1
      },
      achievements: [
        { title: "Best Young Player", year: "2022" },
        { title: "League Cup Winner", year: "2023" }
      ],
      skills: [
        { name: "Dribbling", value: 72 },
        { name: "Speed", value: 78 },
        { name: "Shooting", value: 65 },
        { name: "Passing", value: 77 },
        { name: "Physical", value: 86 },
        { name: "Defending", value: 90 }
      ],
      highlights: [
        {
          id: 1,
          title: "Defensive Highlights",
          duration: "2:12",
          views: "8.5K",
          thumbnail: "https://images.unsplash.com/photo-1530259152377-3a013c126799?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
        }
      ]
    },
    "4": {
      name: "Tom Rodriguez",
      age: 28,
      nationality: "English",
      position: "Goalkeeper",
      currentClub: "Metro Rangers",
      experience: 9,
      bio: "Reliable shot-stopper with excellent reflexes. Known for his penalty-saving abilities.",
      isVerified: false,
      stats: {
        matches: 32,
        cleanSheets: 14,
        saves: 86,
        hoursPlayed: 48,
        yellowCards: 1,
        redCards: 0
      },
      achievements: [
        { title: "Golden Glove Award", year: "2022" },
        { title: "Best Save of the Season", year: "2021" }
      ],
      skills: [
        { name: "Reflexes", value: 92 },
        { name: "Positioning", value: 88 },
        { name: "Handling", value: 85 },
        { name: "Kicking", value: 78 },
        { name: "Communication", value: 83 },
        { name: "Leadership", value: 80 }
      ],
      highlights: [
        {
          id: 1,
          title: "Incredible Saves",
          duration: "2:35",
          views: "15.2K",
          thumbnail: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
        }
      ]
    }
  };

  // Default user data (when viewing your own profile)
  const defaultUserData = {
    name: "Omar Khatib",
    age: 18,
    nationality: "Syrian",
    position: "Left Winger",
    currentClub: "Al Wasl FC",
    experience: 5,
    bio: "Talented young winger with exceptional dribbling skills and pace. Looking to take the next step in my career and showcase my abilities at a higher level.",
    isVerified: true,
    stats: {
      matches: 28,
      goals: 12,
      assists: 8,
      hoursPlayed: 32,
      yellowCards: 2,
      redCards: 0
    },
    achievements: [
      { title: "Youth League Top Scorer", year: "2023" },
      { title: "Best Young Player", year: "2023" },
      { title: "First Team Debut", year: "2022" }
    ],
    skills: [
      { name: "Dribbling", value: 92 },
      { name: "Speed", value: 89 },
      { name: "Shooting", value: 78 },
      { name: "Passing", value: 81 },
      { name: "Physical", value: 75 },
      { name: "Defending", value: 62 }
    ],
    highlights: [
      {
        id: 1,
        title: "2023 Season Highlights",
        duration: "2:36",
        views: "14.2K",
        thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      {
        id: 2,
        title: "Goals & Skills Compilation",
        duration: "3:15",
        views: "8.7K",
        thumbnail: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" 
      },
      {
        id: 3,
        title: "Youth Cup Final Performance",
        duration: "4:21",
        views: "23.5K",
        thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      {
        id: 4,
        title: "Training Session Skills",
        duration: "1:47",
        views: "5.3K",
        thumbnail: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      }
    ]
  };

  // Select which data to use based on whether it's your own profile or viewing another player
  const userData = isOwnProfile ? defaultUserData : (playersData[id] || defaultUserData);

  // Function to render skill bars with varying percentage
  const renderSkillBar = (value) => {
    return (
      <div className="skill-bar-container">
        <div 
          className="skill-bar" 
          style={{ 
            width: `${value}%`,
            backgroundColor: value > 85 ? 'var(--accent-color)' : (value > 70 ? '#2ecc71' : '#f39c12')
          }}
        ></div>
      </div>
    );
  };

  // Generate radar chart data based on player position
  const getRadarChartData = () => {
    // Common chart options
    const chartOptions = {
      scales: {
        r: {
          angleLines: {
            display: true,
            color: 'rgba(255, 255, 255, 0.15)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            color: '#fff',
            font: {
              size: 12
            }
          },
          ticks: {
            display: false,
            stepSize: 20
          },
          min: 0,
          max: 100
        }
      },
      plugins: {
        legend: {
          display: false
        }
      },
      maintainAspectRatio: false
    };

    // Default chart colors
    const chartColors = {
      backgroundColor: 'rgba(123, 46, 142, 0.5)',
      borderColor: 'rgba(123, 46, 142, 1)',
      pointBackgroundColor: '#ffffff',
      pointBorderColor: 'rgba(123, 46, 142, 1)',
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: 'rgba(123, 46, 142, 1)'
    };

    // Convert skills array to object for easier access
    const skillsObj = {};
    userData.skills.forEach(skill => {
      skillsObj[skill.name.toLowerCase()] = skill.value;
    });

    // Generate different radar data based on position
    let radarData = {};
    let labels = [];
    let data = [];

    switch(userData.position) {
      case 'Striker':
      case 'Forward':
      case 'Left Winger':
      case 'Right Winger':
        labels = ['Pace', 'Shooting', 'Dribbling', 'Physical', 'Finishing', 'Positioning'];
        data = [
          skillsObj['speed'] || 70,
          skillsObj['shooting'] || 75,
          skillsObj['dribbling'] || 80,
          skillsObj['physical'] || 65,
          skillsObj['shooting'] + 5 || 80, // Approximate finishing from shooting
          skillsObj['positioning'] || (skillsObj['shooting'] - 5) || 70 // Approximate positioning
        ];
        break;

      case 'Midfielder':
      case 'Central Midfielder':
      case 'Defensive Midfielder':
      case 'Attacking Midfielder':
        labels = ['Passing', 'Vision', 'Stamina', 'Dribbling', 'Defending', 'Shooting'];
        data = [
          skillsObj['passing'] || 85,
          skillsObj['passing'] + 5 || 85, // Approximate vision from passing
          skillsObj['physical'] + 5 || 80, // Approximate stamina from physical
          skillsObj['dribbling'] || 75,
          skillsObj['defending'] || 70,
          skillsObj['shooting'] || 65
        ];
        break;

      case 'Defender':
      case 'Centre-Back':
      case 'Left-Back':
      case 'Right-Back':
        labels = ['Defending', 'Physical', 'Heading', 'Tackling', 'Positioning', 'Speed'];
        data = [
          skillsObj['defending'] || 85,
          skillsObj['physical'] || 80,
          skillsObj['physical'] - 5 || 75, // Approximate heading from physical
          skillsObj['defending'] + 5 || 85, // Approximate tackling from defending
          skillsObj['defending'] - 5 || 75, // Approximate positioning from defending
          skillsObj['speed'] || 70
        ];
        break;

      case 'Goalkeeper':
        labels = ['Reflexes', 'Handling', 'Positioning', 'Kicking', 'Communication', 'Leadership'];
        data = [
          skillsObj['reflexes'] || 85,
          skillsObj['handling'] || 80,
          skillsObj['positioning'] || 82,
          skillsObj['kicking'] || 75,
          skillsObj['communication'] || 78,
          skillsObj['leadership'] || 76
        ];
        break;
        
      default:
        // Generic chart for any other position
        labels = userData.skills.map(skill => skill.name);
        data = userData.skills.map(skill => skill.value);
    }

    // Construct chart data object
    radarData = {
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: chartColors.backgroundColor,
            borderColor: chartColors.borderColor,
            borderWidth: 2,
            pointBackgroundColor: chartColors.pointBackgroundColor,
            pointBorderColor: chartColors.pointBorderColor,
            pointHoverBackgroundColor: chartColors.pointHoverBackgroundColor,
            pointHoverBorderColor: chartColors.pointHoverBorderColor,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: chartOptions
    };

    return radarData;
  };

  // Generate field heatmap data based on player position
  const getPositionHeatmap = () => {
    const position = userData.position;
    
    // Use SVG-based heatmap representation instead of external images
    // This ensures we don't have missing images and gives us more control
    return (
      <div className="heatmap-field">
        <div className="field-outline">
          <div className="field-center-line"></div>
          <div className="field-center-circle"></div>
          <div className="penalty-area penalty-area-top"></div>
          <div className="penalty-area penalty-area-bottom"></div>
          <div className="goal goal-top"></div>
          <div className="goal goal-bottom"></div>
          
          {/* Position-specific heat overlay */}
          <div className={`heat-overlay heat-overlay-${position.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}></div>
        </div>
      </div>
    );
  };

  // Get chart data
  const radarChartData = getRadarChartData();

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={`https://via.placeholder.com/300x300/3498db/ffffff?text=${userData.name.charAt(0)}${userData.name.split(' ')[1]?.charAt(0) || ''}`} alt={userData.name} />
        </div>
        <h1 className="profile-name">
          {userData.name}
          {userData.isVerified && <span className="verified-badge">✓</span>}
        </h1>
        <p className="profile-position">{userData.position} | {userData.currentClub}</p>
        
        <div className="profile-details">
          <div className="profile-detail">
            <span>Age: {userData.age}</span>
          </div>
          <div className="profile-detail">
            <span>Nationality: {userData.nationality}</span>
          </div>
          <div className="profile-detail">
            <span>Experience: {userData.experience} years</span>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <section className="profile-section">
          <h2>Bio</h2>
          <p className="profile-bio">{userData.bio}</p>
        </section>

        <section className="profile-section">
          <h2>Skills & Abilities</h2>
          <div className="skills-container">
            {userData.skills.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-value">{skill.value}</span>
                </div>
                {renderSkillBar(skill.value)}
              </div>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <h2>Performance Analysis</h2>
          
          <div className="visualizations-container">
            <div className="visualization-card">
              <h3>Skills Radar</h3>
              <div className="radar-chart-container">
                <Radar data={radarChartData.data} options={radarChartData.options} />
              </div>
            </div>
            
            <div className="visualization-card">
              <h3>Position Heatmap</h3>
              {getPositionHeatmap()}
              <p className="heatmap-caption">Field coverage based on {userData.position} position</p>
            </div>
          </div>
          
          <p className="visualization-note">
            Data visualizations are based on player position and performance metrics. 
            The radar chart shows key attributes for a {userData.position.toLowerCase()}, 
            while the heatmap displays typical field coverage.
          </p>
        </section>

        <section className="profile-section">
          <h2>Career Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{userData.stats.matches}</div>
              <div className="stat-label">Matches</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.stats.goals || userData.stats.cleanSheets}</div>
              <div className="stat-label">{userData.position === "Goalkeeper" ? "Clean Sheets" : "Goals"}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.stats.assists || userData.stats.saves}</div>
              <div className="stat-label">{userData.position === "Goalkeeper" ? "Saves" : "Assists"}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.stats.hoursPlayed}</div>
              <div className="stat-label">Hours Played</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.stats.yellowCards}</div>
              <div className="stat-label">Yellow Cards</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.stats.redCards}</div>
              <div className="stat-label">Red Cards</div>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2>Achievements</h2>
          <div className="achievements-list">
            {userData.achievements.map((achievement, index) => (
              <div className="achievement-item" key={index}>
                <div className="achievement-title">{achievement.title}</div>
                <div className="achievement-year">{achievement.year}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <h2>Highlight Videos</h2>
          <div className="highlights-grid">
            {userData.highlights.map((video) => (
              <div className="video-card" key={video.id}>
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                      <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.5)" />
                      <path d="M10 8l6 4-6 4V8z" fill="#ffffff" />
                    </svg>
                  </div>
                  <div className="video-duration">{video.duration}</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-views">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Only show contact button if viewing another player's profile as a team */}
        {!isOwnProfile && userRole === 'team' && (
          <section className="profile-section">
            <h2>Join My Team</h2>
            <p className="section-description">
              Interested in this player? Contact them to learn more or schedule a trial.
            </p>
            <button className="contact-button">
              CONTACT PLAYER
            </button>
          </section>
        )}

        {/* Only show this section if viewing your own profile */}
        {isOwnProfile && (
          <section className="profile-section">
            <h2>Join My Team</h2>
            <p className="section-description">
              I'm currently looking for new opportunities to showcase my skills at a higher level.
              If you're interested in learning more or scheduling a trial, please contact me.
            </p>
            <button className="contact-button">
              CONTACT PLAYER
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

export default Profile; 