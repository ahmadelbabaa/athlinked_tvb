import React from 'react';

function Events() {
  const communityEvents = [
    {
      type: "Tryout",
      title: "Youth Academy Trials",
      organization: "Manchester City Academy",
      ageGroup: "Under-16",
      date: "March 15, 2024",
      time: "09:00 - 14:00",
      venue: "City Football Academy",
      location: "Manchester, England",
      spotsAvailable: 30,
      requirements: "Bring boots, shin guards, and water bottle",
      description: "Open trials for Manchester City's Youth Academy. Looking for talented players aged 14-16."
    },
    {
      type: "Training Camp",
      title: "Advanced Striker Workshop",
      organization: "Elite Football Development",
      ageGroup: "16+",
      date: "March 20-22, 2024",
      time: "10:00 - 15:00",
      venue: "St. George's Park",
      location: "Burton upon Trent, England",
      spotsAvailable: 20,
      requirements: "Previous club experience required",
      description: "Three-day intensive training camp focused on attacking skills and finishing techniques."
    },
    {
      type: "Meetup",
      title: "5-a-side Football Social",
      organization: "Local Football Community",
      ageGroup: "All Ages",
      date: "Every Saturday",
      time: "14:00 - 16:00",
      venue: "Community Sports Complex",
      location: "Liverpool, England",
      spotsAvailable: 25,
      requirements: "Basic football gear",
      description: "Weekly casual football meetup. All skill levels welcome. Great way to meet new people and stay active!"
    },
    {
      type: "Workshop",
      title: "Goalkeeper Masterclass",
      organization: "Pro Keeper Academy",
      ageGroup: "14-21",
      date: "March 30, 2024",
      time: "09:30 - 16:30",
      venue: "Arsenal Training Centre",
      location: "London, England",
      spotsAvailable: 12,
      requirements: "Must bring goalkeeper gloves and appropriate footwear",
      description: "Intensive one-day goalkeeper training session led by professional coaching staff."
    }
  ];

  return (
    <div className="events-page">
      <h2>Football Community Events</h2>
      <div className="search-section">
        <input type="text" placeholder="Search events..." className="search-input" />
        <select className="filter-select">
          <option value="">All Events</option>
          <option value="tryout">Tryouts</option>
          <option value="training">Training Camps</option>
          <option value="meetup">Meetups</option>
          <option value="workshop">Workshops</option>
        </select>
      </div>
      <div className="events-grid">
        {communityEvents.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-type-badge">{event.type}</div>
            <div className="event-header">
              <h3>{event.title}</h3>
              <p className="organization">{event.organization}</p>
            </div>
            <div className="event-details">
              <div className="detail-row">
                <span className="detail-label">Age Group:</span>
                <span className="detail-value">{event.ageGroup}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{event.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{event.time}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{event.venue}, {event.location}</span>
              </div>
            </div>
            <div className="event-description">
              <p>{event.description}</p>
            </div>
            <div className="requirements-section">
              <h4>Requirements</h4>
              <p>{event.requirements}</p>
            </div>
            <div className="spots-section">
              <span className="spots-available">
                {event.spotsAvailable} spots available
              </span>
            </div>
            <button className="register-button">
              Register Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events; 