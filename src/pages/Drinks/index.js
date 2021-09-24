import React from 'react';
import propTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Drinks({ match, history }) {
  return (
    <div className="drinks">
      <Header title="Bebidas" search match={ match } history={ history } />
      <Footer />
    </div>
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
