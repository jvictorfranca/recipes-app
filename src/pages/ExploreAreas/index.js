import React from 'react';
import propTypes from 'prop-types';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import './style.css';

function ExploreAreas() {
  return (
    <div className="explore-areas">
      <Header title="Explorar Origem" search />
      <select name="explore-by-area-dropdown" data-testid="explore-by-area-dropdown">
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
        <option value="area1" data-testid="area1-option">area1</option>
      </select>
      <Footer />
    </div>
  );
}

ExploreAreas.propTypes = {
  match: propTypes.shape({
    path: propTypes.string,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func }).isRequired,
};

export default ExploreAreas;
