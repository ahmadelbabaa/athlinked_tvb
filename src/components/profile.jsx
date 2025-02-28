import React from 'react';

function Profile({ user, setUser }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      profile: { ...prev.profile, [name]: value }
    }));
  };

  return (
    <div className="profile">
      <h2>Player Profile</h2>
      <input
        name="name"
        value={user.profile.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="age"
        value={user.profile.age}
        onChange={handleChange}
        placeholder="Age (15-25)"
      />
      <input
        name="pace"
        value={user.profile.stats.pace}
        onChange={(e) => setUser(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            stats: { ...prev.profile.stats, pace: e.target.value }
          }
        }))}
        placeholder="Pace (m/s)"
      />
      <input
        name="passing"
        value={user.profile.stats.passing}
        onChange={(e) => setUser(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            stats: { ...prev.profile.stats, passing: e.target.value }
          }
        }))}
        placeholder="Passing (%)"
      />
      <input
        name="footage"
        value={user.profile.footage}
        onChange={handleChange}
        placeholder="Footage URL"
      />
      <input
        name="endorsements"
        value={user.profile.endorsements}
        onChange={handleChange}
        placeholder="Endorsements"
      />
      <p>Applications Left: {user.isPremium ? 'Unlimited' : user.applicationsLeft}</p>
      {!user.isPremium && (
        <button onClick={() => setUser(prev => ({ ...prev, isPremium: true }))}>
          Upgrade to Premium (€15/month)
        </button>
      )}
    </div>
  );
}

export default Profile;