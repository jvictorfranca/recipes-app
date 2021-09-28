import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './header.css';

import profileIcon from '../../images/profileIcon.svg';
import SearchButton from './SearchButton';
import SearchHeader from './SearchHeader';

function Header({ title, search, match, history }) {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <>
      <div className="header">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {
          search && <SearchButton handleActive={ handleActive } />
        }
      </div>
      <div className={ active ? 'search-header active' : 'search-header' }>
        {
          active && <SearchHeader match={ match } history={ history } />
        }
      </div>
    </>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  search: propTypes.bool,
  match: propTypes.shape({
    path: propTypes.string,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func }).isRequired,
};

Header.defaultProps = {
  search: false,
};

export default Header;
