import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const simulatedDate = `${dateFormatted}, 2021`; // e.g., "Oct 5, 2021"

  return (
    <header>
      <NavLink to="/">
        <i className="fa-solid fa-earth-americas" />
      </NavLink>
      <h2>Covid19 in South America</h2>
      <p>
        Historical WHO dataset
        (
        {simulatedDate}
        )
      </p>
    </header>
  );
};

export default Header;
