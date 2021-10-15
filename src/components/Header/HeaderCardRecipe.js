import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function HeaderCardRecipe({ recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="header-card"
    >
      <Link to={ `/comidas/${recipe.idMeal}` } className="title-text">
        <h2
          data-testid={ `${index}-card-name` }
        >
          {recipe.strMeal}

        </h2>
        <img
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
          data-testid={ `${index}-card-img` }
          className="header-card-image"
        />
      </Link>
    </div>

  );
}

HeaderCardRecipe.propTypes = {
  recipe: propTypes.shape({
    strMealThumb: propTypes.string,
    strMeal: propTypes.string,
    idMeal: propTypes.string,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default HeaderCardRecipe;
