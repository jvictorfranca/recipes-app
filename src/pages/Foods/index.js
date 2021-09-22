import React from 'react';
import propTypes from 'prop-types';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function Foods({ match, history }) {
  return (
    <div className="foods">
      <Header title="Comidas" search match={ match } history={ history } />
      <Footer />
    </div>
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
