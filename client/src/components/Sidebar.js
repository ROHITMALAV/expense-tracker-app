// client/src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ currentPage, setCurrentPage, onLogout }) => {
  const NavLink = ({ pageName, children }) => {
    const isActive = currentPage === pageName.toLowerCase();
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(pageName.toLowerCase());
        }}
        className={isActive ? 'nav-link-active' : 'nav-link'}
      >
        {children}
      </a>
    );
  };

  return (
    <aside className="sidebar">
      <div>
        <h1 className="sidebar-title">Expense Pro</h1>
        <nav className="mt-10 space-y-2">
          <NavLink pageName="Dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            Dashboard
          </NavLink>
          <NavLink pageName="Profile">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            Profile
          </NavLink>
          <NavLink pageName="About">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            About
          </NavLink>
        </nav>
      </div>
      <div className="mt-10">
        <button onClick={onLogout} className="btn-logout">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
