import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './header.css';

import profileIcon from '../../images/profileIcon.svg';
import SearchHeader from '../SearchHeader';

function Header({ title, search, match, history }) {
  return (
    <div className="header">
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
      </Link>
      <p data-testid="page-title">{title}</p>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => {} }
      >
        Clica

      </button>
      {
        search
        && <SearchHeader match={ match } history={ history } />
      }
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  search: propTypes.bool.isRequired,
  match: propTypes.shape({
    path: propTypes.string,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func }).isRequired,
};

export default Header;
