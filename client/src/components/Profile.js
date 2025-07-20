// client/src/components/Profile.js
import React from 'react';

const getInitials = (name = '') => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1 && nameParts[0] && nameParts[nameParts.length - 1]) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

const Profile = ({ user, onLogout }) => {
  if (!user) {
    return <div className="p-8">Loading profile...</div>;
  }
  const initials = getInitials(user.name);

  return (
    <div>
      <header className="main-header">
        <h2 className="main-title">My Profile</h2>
      </header>
      <div className="profile-card">
        <div className="profile-avatar">
          {initials}
        </div>
        <h3 className="profile-name">{user.name}</h3>
        <p className="profile-email">{user.email}</p>
        <p className="profile-member-since">Member since: {new Date(user.register_date).toLocaleDateString('en-GB')}</p>
        <button onClick={onLogout} className="btn btn-logout mt-6">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
