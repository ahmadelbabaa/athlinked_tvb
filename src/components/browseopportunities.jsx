import React, { useState } from 'react';

function BrowseOpportunities({ user }) {
  const [opportunities] = useState([
    { id: 1, type: 'club', name: 'Getafe', requirements: 'Pace > 8 m/s, Passing > 85%', fee: '€400' },
    { id: 2, type: 'university', name: 'NCAA D1 School', requirements: 'GPA > 3.0, SAT > 1200' }
  ]);
  const [applications, setApplications] = useState([]);

  const handleApply = (opp) => {
    if (!user.isPremium && user.applicationsLeft === 0) {
      alert('Upgrade to premium for unlimited applications!');
      return;
    }
    setApplications([...applications, { ...opp, status: 'pending' }]);
    if (!user.isPremium) {
      user.applicationsLeft -= 1;
    }
  };

  return (
    <div>
      <h2>Browse Opportunities</h2>
      {opportunities.map(opp => (
        <div key={opp.id}>
          <h3>{opp.name} ({opp.type})</h3>
          <p>Requirements: {opp.requirements}</p>
          {opp.fee && <p>Fee: {opp.fee}</p>}
          <button onClick={() => handleApply(opp)}>Apply</button>
        </div>
      ))}
      <h3>Your Applications</h3>
      {applications.map((app, index) => (
        <p key={index}>{app.name} - Status: {app.status}</p>
      ))}
    </div>
  );
}

export default BrowseOpportunities;