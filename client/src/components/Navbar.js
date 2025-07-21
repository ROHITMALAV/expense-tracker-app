// client/src/components/Navbar.js
import React from 'react';

const getInitials = (name = '') => {
  const nameParts = name.split(' ');
  if (nameParts.length > 1 && nameParts[0] && nameParts[nameParts.length - 1]) {
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const Navbar = ({ user, onProfileClick, onMenuClick }) => {
  const initials = getInitials(user?.name);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Hamburger Menu Button - Mobile Only */}
        <button onClick={onMenuClick} className="mobile-menu-button">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Spacer to push profile icon to the right */}
        <div className="flex-grow"></div>

        {/* Right side: Profile Icon */}
        <div className="navbar-profile">
          <button onClick={onProfileClick} className="profile-button">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              {initials}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
