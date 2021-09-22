import React from 'react';
import propTypes from 'prop-types';
import SearchHeader from '../../components/SearchHeader';

function Drinks({ match }) {
  return (
    <SearchHeader match={ match } />
  );
}

Drinks.propTypes = {
  match: propTypes.shape({
    path: propTypes.string,
  }).isRequired,
};

export default Drinks;
