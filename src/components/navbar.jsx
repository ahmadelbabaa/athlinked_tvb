import React from 'react';

function Navbar({ setView }) {
  return (
    <nav>
      <h1>AthLinked</h1>
      <button onClick={() => setView('profile')}>Profile</button>
      <button onClick={() => setView('browse')}>Browse Opportunities</button>
      <button onClick={() => setView('chat')}>Chat</button>
      <button onClick={() => setView('accommodation')}>Accommodation</button>
    </nav>
  );
}

export default Navbar;