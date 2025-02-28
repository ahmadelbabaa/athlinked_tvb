import React from 'react';

function Home() {
  return (
    <div>
      <section className="hero">
        <h2>Connect with Athletes and Teams</h2>
        <p>Your platform for athletic networking and team management</p>
      </section>
      <section className="features">
        <div className="feature">
          <h3>Find Athletes</h3>
          <p>Discover and connect with athletes in your area</p>
        </div>
        <div className="feature">
          <h3>Join Teams</h3>
          <p>Find and join local sports teams</p>
        </div>
        <div className="feature">
          <h3>Track Events</h3>
          <p>Stay updated with local sports events</p>
        </div>
      </section>
    </div>
  );
}

export default Home; 