import React from 'react';

const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.setItem('is_authenticated', false);
    setIsAuthenticated(false);
    alert("Logout successfully!");
  };

  return (
    <button
      style={{ marginTop: '15px' }}
      className="muted-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
