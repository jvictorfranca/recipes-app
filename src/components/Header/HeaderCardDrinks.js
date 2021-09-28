import React from 'react';
import propTypes from 'prop-types';

function HeaderCardDrink({ drink, index }) {
  console.log(drink);
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="header-card"
    >
      <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
      <img
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
        data-testid={ `${index}-card-img` }
        className="header-card-image"
      />
    </div>

  );
}

HeaderCardDrink.propTypes = {
  drink: propTypes.shape({
    strDrinkThumb: propTypes.string,
    strDrink: propTypes.string,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default HeaderCardDrink;
