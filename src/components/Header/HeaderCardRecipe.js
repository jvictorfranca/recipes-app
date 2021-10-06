import React from 'react';
import propTypes from 'prop-types';

function HeaderCardRecipe({ recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="header-card"
    >
      <h2 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h2>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid={ `${index}-card-img` }
        className="header-card-image"
      />
    </div>

  );
}

HeaderCardRecipe.propTypes = {
  recipe: propTypes.shape({
    strMealThumb: propTypes.string,
    strMeal: propTypes.string,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default HeaderCardRecipe;
