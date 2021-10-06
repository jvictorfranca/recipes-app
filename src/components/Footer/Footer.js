import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css';

import drink from '../../images/drinkIcon.svg';
import explore from '../../images/exploreIcon.svg';
import meal from '../../images/mealIcon.svg';

export default function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" className="icon" src={ drink } alt="" />
      </Link>
      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" className="icon" src={ explore } alt="" />
      </Link>
      <Link to="/comidas">
        <img data-testid="food-bottom-btn" className="icon" src={ meal } alt="" />
      </Link>
    </div>
  );
}
