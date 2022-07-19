import React from 'react';

const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.setItem('is_authenticated', false);
    setIsAuthenticated(false);
  };

  return (
    <button
      style={{ marginLeft: '12px' }}
      className="muted-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
