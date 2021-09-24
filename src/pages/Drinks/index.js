import React from 'react';
import propTypes from 'prop-types';
import SearchHeader from '../../components/Header/SearchHeader';

function Drinks({ match, history }) {
  return (
    <SearchHeader match={ match } history={ history } />
  );
}

Drinks.propTypes = {
  match: propTypes.shape({
    path: propTypes.string,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func }).isRequired,
};

export default Drinks;
