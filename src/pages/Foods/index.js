import React from 'react';
import propTypes from 'prop-types';
import SearchHeader from '../../components/SearchHeader';

function Foods({ match, history }) {
  return (
    <SearchHeader match={ match } history={ history } />
  );
}

Foods.propTypes = {
  match: propTypes.shape({
    path: propTypes.string,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func }).isRequired,
};

export default Foods;
