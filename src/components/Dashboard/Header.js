import React from 'react';

import Logout from '../Logout';

const Header = ({ setIsAuthenticated }) => {
  return (
    <header>
      <div>
        <div style={{float: "right"}}>
          <Logout setIsAuthenticated={setIsAuthenticated} />
        </div>
        <h1>Book Store Management System</h1>
      </div>
    </header>
  );
};

export default Header;
