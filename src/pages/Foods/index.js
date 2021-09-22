import React from 'react';
import propTypes from 'prop-types';
import SearchHeader from '../../components/SearchHeader';

function Foods({ match }) {
  return (
    <SearchHeader match={ match } />
  );
}

Foods.propTypes = {
  match: propTypes.shape({
    path: propTypes.string,
  }).isRequired,
};

export default Foods;
