import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import BrowseOpportunities from './components/BrowseOpportunities';
import Chat from './components/Chat';
import AccommodationList from './components/AccommodationList';
import './App.css';

function App() {
  const [user, setUser] = useState({
    isPremium: false,
    applicationsLeft: 1,
    profile: {
      name: '',
      age: '',
      stats: { pace: '', passing: '' },
      footage: '',
      endorsements: ''
    }
  });
  const [view, setView] = useState('profile');

  return (
    <div className="App">
      <Navbar setView={setView} />
      {view === 'profile' && <Profile user={user} setUser={setUser} />}
      {view === 'browse' && <BrowseOpportunities user={user} />}
      {view === 'chat' && <Chat />}
      {view === 'accommodation' && <AccommodationList />}
    </div>
  );
}

export default App;