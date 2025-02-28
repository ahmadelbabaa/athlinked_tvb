import React from 'react';

function AccommodationList() {
  const accommodations = [
    { name: 'Hostel Getafe', location: 'Near Getafe trials', price: '€30/night' },
    { name: 'NCAA Dorm', location: 'Campus vicinity', price: '€50/night' }
  ];

  return (
    <div>
      <h2>Accommodation Options</h2>
      {accommodations.map((acc, index) => (
        <div key={index}>
          <p>{acc.name} - {acc.location} - {acc.price}</p>
        </div>
      ))}
    </div>
  );
}

export default AccommodationList;