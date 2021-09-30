import React, { useEffect, useRef, useState } from 'react';
import Copy from 'clipboard-copy';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import helper from '../Details/helper';
import { handleMeals, getIngredientsMels, handleButton } from '../ProgressDrink/Helper';

import WhiteHeart from '../../images/whiteHeartIcon.svg';
import BlackHeart from '../../images/blackHeartIcon.svg';
import Share from '../../images/shareIcon.svg';

export default function ProgressFood({ match: { params: { id } } }) {
  const [meal, setMeal] = useState({});
  const [button, setButton] = useState(true);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const check = useRef();
  const history = useHistory();
  const completeIngredients = currentIngredients;

  useEffect(() => {
    async function getDrink() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(...data.meals);
    }

    getIngredientsMels(id, setCurrentIngredients);
    helper.verifyFavorite(id, setFavorite);
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

  function handleRedirect() {
    history.push('/receitas-feitas');
  }

  function shareButton() {
    Copy(`http://localhost:3000/comidas/${id}`);
    setCopied(true);
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
      <input
        type="image"
        src={ favorite ? BlackHeart : WhiteHeart }
        data-testid="favorite-btn"
        alt="Favorite"
        onClick={
          () => helper.saveFavoriteLocalstorage(meal, favorite, setFavorite, 'idMeal')
        }
      />
      <input
        type="image"
        alt="share"
        src={ Share }
        data-testid="share-btn"
        onClick={ shareButton }
      />
      {
        copied
        && 'Link copiado!'
      }
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
              onChange={ ({ target }) => {
                handleMeals(target, completeIngredients, id);
                handleButton(completeIngredients, ingredients, setButton, history);
              } }
              name={ ingredient }
              value={ ingredient }
              id={ ingredient }
              type="checkbox"
            />
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ meal.strInstructions }</p>
      <button
        disabled={ button }
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleRedirect }
      >
        Favoritar
      </button>
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
