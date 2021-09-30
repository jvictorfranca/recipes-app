import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import { handleCocktails } from './Helper';

export default function ProgressDrink({ match: { params: { id } } }) {
  const [drink, setDrink] = useState({});
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const completeIngredients = currentIngredients;
  const check = useRef();

  useEffect(() => {
    async function getDrink() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDrink(...data.drinks);
    }

    if (Object.prototype.hasOwnProperty.call(localStorage, 'inProgressRecipes')) {
      const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (cocktails[id]) {
        setCurrentIngredients(cocktails[id]);
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
    if (drink[key]) {
      ingredients.push(drink[key]);
    }
    if (drink[measureKey]) {
      quantity.push(drink[measureKey]);
    }
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        style={ { height: '150px' } }
        src={ drink.strDrinkThumb }
        alt=""
      />
      <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
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
              onChange={
                ({ target }) => handleCocktails(target, completeIngredients, id)
              }
              value={ ingredient }
              id={ ingredient }
              type="checkbox"
            />
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <button data-testid="finish-recipe-btn" type="button">Favoritar</button>
    </div>
  );
}

ProgressDrink.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  }).isRequired,
};
