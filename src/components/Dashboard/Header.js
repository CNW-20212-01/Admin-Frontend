import React from 'react';

import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
      <div>
      <div style={{float: "right"}}>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
      <h1>Book Store Management System</h1>
      </div>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add New Book</button>
      </div>
    </header>
  );
};

export default Header;
