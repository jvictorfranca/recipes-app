import React, { useEffect, useRef, useState } from 'react';
import Copy from 'clipboard-copy';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import helper from '../Details/helper';
import { handleCocktails, getIngredientsCocktails, handleButton } from './Helper';

import WhiteHeart from '../../images/whiteHeartIcon.svg';
import BlackHeart from '../../images/blackHeartIcon.svg';
import Share from '../../images/shareIcon.svg';

export default function ProgressDrink({ match: { params: { id } } }) {
  const [drink, setDrink] = useState({});
  const [button, setButton] = useState(true);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const history = useHistory();
  const check = useRef();
  const completeIngredients = currentIngredients;

  useEffect(() => {
    async function getDrink() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDrink(...data.drinks);
    }

    getIngredientsCocktails(id, setCurrentIngredients);
    getDrink();

    helper.verifyFavorite(id, setFavorite);
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

  function handleRedirect() {
    history.push('/receitas-feitas');
  }

  function shareButton() {
    Copy(`http://localhost:3000/bebidas/${id}`);
    setCopied(true);
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
      <input
        type="image"
        src={ favorite ? BlackHeart : WhiteHeart }
        data-testid="favorite-btn"
        alt="Favorite"
        onClick={
          () => helper.saveFavoriteLocalstorage(drink, favorite, setFavorite, 'idDrink')
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
              onChange={ ({ target }) => {
                handleCocktails(target, completeIngredients, id);
                handleButton(completeIngredients, ingredients, setButton, history);
              } }
              value={ ingredient }
              id={ ingredient }
              type="checkbox"
            />
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <button
        disabled={ button }
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleRedirect }
      >
        Finalizar
      </button>
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
