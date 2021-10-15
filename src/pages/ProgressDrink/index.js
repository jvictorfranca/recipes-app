import React, { useEffect, useRef, useState } from 'react';
import Copy from 'clipboard-copy';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import helper from '../Details/helper';
import { handleCocktails, getIngredientsCocktails, handleButton, checkInput } from './Helper';

import '../ProgressFood/style.css';
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

  useEffect(() => {
    checkInput(currentIngredients, check);
  });

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
    <div className="container">
      <img
        className="progress-img"
        data-testid="recipe-photo"
        style={ { height: '150px' } }
        src={ drink.strDrinkThumb }
        alt=""
      />
      <div className="container-progress">
        <div className="title-style">
          <div>
            <h2 data-testid="recipe-title">{ drink.strDrink }</h2>
            <h4 data-testid="recipe-category">{ drink.strAlcoholic }</h4>
          </div>
          <div className="icon-style">
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
          </div>
        </div>
        <h3>Ingredients</h3>
        <div className="ing-style">
          <ul ref={ check }>
            {ingredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-step` }
                key={ index }
                /* style={ currentIngredients.includes(ingredient)
                  ? { textDecoration: 'line-through' } : undefined } */
              >
                {`${ingredient} ${quantity[index]}`}
                <input
                  /* checked={ currentIngredients.includes(ingredient) || undefined } */
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
        </div>
        <h3>Instructions</h3>
        <div className="inst-style">
          <p data-testid="instructions">{ drink.strInstructions }</p>
        </div>
        <button
          className="progress-recipe-btn"
          disabled={ button }
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ handleRedirect }
        >
          Finalizar Receita
        </button>

      </div>
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
