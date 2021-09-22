import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './header.css';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title, search }) {
  return (
    <div className="header">
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
      </Link>
      <p data-testid="page-title">{title}</p>
      {
        // Colocar o componente da search bar
        search
        && <button data-testid="search-top-btn" type="button">
          <img src={ searchIcon } alt="Search Button" />
        </button>
      }
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  search: propTypes.bool.isRequired,
};

export default Header;
