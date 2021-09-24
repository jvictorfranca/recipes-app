import React from 'react';
import propTypes from 'prop-types';
import Header from '../../components/Header/Header';

function Drinks({ match, history }) {
  return (
    <Header title="Comidas" search match={ match } history={ history } />
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
