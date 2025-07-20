// client/src/components/Navbar.js
import React from 'react';

const getInitials = (name = '') => {
  const nameParts = name.split(' ');
  if (nameParts.length > 1 && nameParts[0] && nameParts[nameParts.length - 1]) {
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const Navbar = ({ user, onProfileClick }) => {
  const initials = getInitials(user?.name);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-search"></div>
        <div className="navbar-profile">
          <button onClick={onProfileClick} className="profile-button">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {initials}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
