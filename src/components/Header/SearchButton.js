import React from 'react';
import propTypes from 'prop-types';

import searchIcon from '../../images/searchIcon.svg';

function SearchButton({ handleActive }) {
  return (
    <div className="button-icon">
      <button type="button" data-testid="search-top-btn" onClick={ handleActive }>
        <img src={ searchIcon } alt="Search Button" />
      </button>
    </div>
  );
}

SearchButton.propTypes = {
  handleActive: propTypes.func.isRequired,
};

export default SearchButton;
