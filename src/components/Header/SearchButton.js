import React from 'react';
import propTypes from 'prop-types';

import searchIcon from '../../images/searchIcon.svg';

function SearchButton({ handleActive }) {
  return (
    <div className="button-icon">
      <input
        type="image"
        alt="Search Button"
        className="search-button icon"
        data-testid="search-top-btn"
        src={ searchIcon }
        onClick={ handleActive }
      />
    </div>
  );
}

SearchButton.propTypes = {
  handleActive: propTypes.func.isRequired,
};

export default SearchButton;
