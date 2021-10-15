import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function HeaderCardDrink({ drink, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="header-card"
    >
      <Link to={ `/bebidas/${drink.idDrink}` } className="title-text">
        <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid={ `${index}-card-img` }
          className="header-card-image"
        />
      </Link>
    </div>

  );
}

HeaderCardDrink.propTypes = {
  drink: propTypes.shape({
    strDrinkThumb: propTypes.string,
    strDrink: propTypes.string,
    idDrink: propTypes.string,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default HeaderCardDrink;
