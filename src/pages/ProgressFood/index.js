import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import { handleMeals } from '../ProgressDrink/Helper';

export default function ProgressFood({ match: { params: { id } } }) {
  const [meal, setMeal] = useState({});
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const completeIngredients = currentIngredients;
  const check = useRef();

  useEffect(() => {
    async function getDrink() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(...data.meals);
    }

    if (Object.prototype.hasOwnProperty.call(localStorage, 'inProgressRecipes')) {
      const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (meals[id]) {
        setCurrentIngredients(meals[id]);
      }
    }
    getDrink();
  }, [id]);

  /* useEffect(() => {
    checkInput(currentIngredients, check);
  }); */

  const ingredients = [];
  const quantity = [];
  const max = 20;
  for (let index = 1; index <= max; index += 1) {
    const key = `strIngredient${index}`;
    const measureKey = `strMeasure${index}`;
    if (meal[key]) {
      ingredients.push(meal[key]);
    }
    if (meal[measureKey]) {
      quantity.push(meal[measureKey]);
    }
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        style={ { height: '150px' } }
        src={ meal.strMealThumb }
        alt=""
      />
      <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="recipe-category">{ meal.strCategory }</p>
      <ul ref={ check }>
        {ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-step` }
            key={ index }
            style={ currentIngredients.includes(ingredient)
              ? { textDecoration: 'line-through' } : undefined }
          >
            {`${ingredient} ${quantity[index]}`}
            <input
              checked={ currentIngredients.includes(ingredient) || undefined }
              onChange={ ({ target }) => handleMeals(target, completeIngredients, id) }
              name={ ingredient }
              value={ ingredient }
              id={ ingredient }
              type="checkbox"
            />
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ meal.strInstructions }</p>
      <button data-testid="finish-recipe-btn" type="button">Favoritar</button>
    </div>
  );
}

ProgressFood.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  }).isRequired,
};
