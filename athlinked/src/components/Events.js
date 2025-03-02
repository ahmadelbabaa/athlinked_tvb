import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';

function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const events = [
    {
      id: 1,
      title: "Regional Football Tournament",
      category: "Tournament",
      date: "2023-06-15",
      time: "10:00 AM - 6:00 PM",
      location: "City Sports Complex, Phoenix, AZ",
      description: "A regional tournament featuring top amateur football teams from across the state. Great opportunity for players to showcase their skills to scouts.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29jY2VyJTIwdG91cm5hbWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
      organizer: "Arizona Sports Association",
      registrationDeadline: "2023-06-01",
      registrationFee: "$250 per team",
      maxParticipants: 16,
      currentParticipants: 12,
      featured: true
    },
    {
      id: 2,
      title: "Premier League Scouting Camp",
      category: "Scouting",
      date: "2023-07-10",
      time: "9:00 AM - 4:00 PM",
      location: "Elite Training Center, Tucson, AZ",
      description: "Official scouting camp with representatives from Premier League clubs looking for young talent. Open to players aged 16-21 with exceptional skills.",
      image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvY2NlciUyMHNjb3V0aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      organizer: "Premier Talent Scouts",
      registrationDeadline: "2023-06-25",
      registrationFee: "$75 per player",
      maxParticipants: 100,
      currentParticipants: 68,
      featured: true
    },
    {
      id: 3,
      title: "Youth Soccer Camp",
      category: "Training",
      date: "2023-08-05",
      time: "9:00 AM - 3:00 PM",
      location: "Memorial Park, Flagstaff, AZ",
      description: "Three-day intensive soccer camp for youth players aged 8-14. Professional coaches will focus on fundamental skills, teamwork, and game strategy.",
      image: "https://images.unsplash.com/photo-1591187488025-95966eca0a5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29jY2VyJTIwdHJhaW5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      organizer: "Elite Youth Development",
      registrationDeadline: "2023-07-20",
      registrationFee: "$120 per player",
      maxParticipants: 50,
      currentParticipants: 35,
      featured: false
    },
    {
      id: 4,
      title: "5-a-side Football League",
      category: "League",
      date: "2023-09-12",
      time: "6:00 PM - 10:00 PM",
      location: "Urban Football Center, Tempe, AZ",
      description: "Weekly 5-a-side football league running for 10 weeks. Perfect for friends and colleagues looking for competitive matches in a fun environment.",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NWElMjBzaWRlJTIwZm9vdGJhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      organizer: "Urban Football Association",
      registrationDeadline: "2023-08-30",
      registrationFee: "$300 per team",
      maxParticipants: 24,
      currentParticipants: 16,
      featured: false
    },
    {
      id: 5,
      title: "Football Coaching Workshop",
      category: "Workshop",
      date: "2023-07-22",
      time: "10:00 AM - 4:00 PM",
      location: "Sports Academy, Scottsdale, AZ",
      description: "Professional development workshop for football coaches at all levels. Learn modern coaching techniques, tactical analysis, and player development strategies.",
      image: "https://images.unsplash.com/photo-1611224885990-ab7363d7f2a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNvY2NlciUyMGNvYWNoaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      organizer: "Coaches Association",
      registrationDeadline: "2023-07-15",
      registrationFee: "$150 per person",
      maxParticipants: 40,
      currentParticipants: 25,
      featured: false
    },
    {
      id: 6,
      title: "Women's Football Showcase",
      category: "Showcase",
      date: "2023-08-19",
      time: "11:00 AM - 5:00 PM",
      location: "University Stadium, Phoenix, AZ",
      description: "Showcase event for women's football featuring exhibition matches, skills competitions, and networking opportunities with professional clubs and college scouts.",
      image: "https://images.unsplash.com/photo-1615371788807-4b7c5379fffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVuJTIwc29jY2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      organizer: "Women's Football Alliance",
      registrationDeadline: "2023-08-05",
      registrationFee: "$50 per player",
      maxParticipants: 120,
      currentParticipants: 85,
      featured: true
    }
  ];

  // Filter events based on search term, category filter, and date filter
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || event.category === categoryFilter;
    
    // Simple date filtering (upcoming, past, today)
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const isUpcoming = eventDate > today;
    const isPast = eventDate < today;
    const isToday = eventDate.toDateString() === today.toDateString();
    
    const matchesDate = dateFilter === '' || 
                       (dateFilter === 'upcoming' && isUpcoming) ||
                       (dateFilter === 'past' && isPast) ||
                       (dateFilter === 'today' && isToday);
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setDateFilter('');
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <PageHeader 
        title="Football Events" 
        subtitle="Find and register for upcoming tournaments, leagues, and training camps"
        backgroundImage="url(https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)"
      />
      
      <div className="elevo-page">
        <div className="elevo-search-container">
          <input
            type="text"
            className="elevo-search-input"
            placeholder="Search events, locations, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="elevo-filter-container">
            <select 
              className="elevo-filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Tournament">Tournaments</option>
              <option value="League">Leagues</option>
              <option value="Training">Training Camps</option>
              <option value="Scouting">Scouting Events</option>
              <option value="Workshop">Workshops</option>
              <option value="Showcase">Showcases</option>
            </select>
            
            <select 
              className="elevo-filter-select"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="today">Today</option>
              <option value="past">Past</option>
            </select>
            
            <button className="elevo-filter-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
        
        <div className="elevo-players-grid">
          {filteredEvents.map((event) => (
            <div className={`elevo-player-card ${event.featured ? 'elevo-featured-card' : ''}`} key={event.id}>
              {event.featured && <div className="elevo-featured-badge">Featured</div>}
              <div className="elevo-player-image-container">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="elevo-player-image"
                />
              </div>
              <div className="elevo-event-content">
                <h3 className="elevo-event-title">{event.title}</h3>
                <p className="elevo-event-subtitle">{event.category}</p>
                
                <div className="elevo-event-details">
                  <div className="elevo-event-detail">
                    <span className="elevo-detail-icon">📅</span>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="elevo-event-detail">
                    <span className="elevo-detail-icon">⏰</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="elevo-event-detail">
                    <span className="elevo-detail-icon">📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="elevo-event-detail">
                    <span className="elevo-detail-icon">👥</span>
                    <span>{event.currentParticipants}/{event.maxParticipants} Participants</span>
                  </div>
                </div>
                
                <p className="elevo-event-description">{event.description}</p>
                
                <div className="elevo-event-registration">
                  <div className="elevo-registration-info">
                    <p><strong>Registration:</strong> {event.registrationFee}</p>
                    <p><strong>Deadline:</strong> {formatDate(event.registrationDeadline)}</p>
                  </div>
                </div>
                
                <div className="elevo-card-footer">
                  <Link to={`/event/${event.id}`} className="elevo-view-profile-button">
                    VIEW DETAILS
                  </Link>
                  <button className="elevo-register-button">
                    REGISTER NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="elevo-no-results">
            <p>No events found matching your criteria</p>
            <button className="elevo-filter-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Events; 