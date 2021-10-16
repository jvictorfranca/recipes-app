import React, { useEffect, useRef, useState } from 'react';
import Copy from 'clipboard-copy';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import helper from '../Details/helper';
import { handleMeals, getIngredientsMels, handleButton, checkInput } from '../ProgressDrink/Helper';

import WhiteHeart from '../../images/whiteHeartIcon.svg';
import BlackHeart from '../../images/blackHeartIcon.svg';
import Share from '../../images/shareIcon.svg';

import './style.css';


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

  useEffect(() => {
    checkInput(currentIngredients, check);
  });

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
    <div className="container">
      <img
        data-testid="recipe-photo"
        className="progress-img"
        style={ { height: '150px' } }
        src={ meal.strMealThumb }
        alt=""
      />
      <div className="container-progress">
        <div className="title-style">
          <div>
            <h2 data-testid="recipe-title">{ meal.strMeal }</h2>
            <h4 data-testid="recipe-category">{ meal.strCategory }</h4>
          </div>
          <div className="icon-style">
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
          </div>
          {
            copied
            && 'Link copiado!'
          }
        </div>
      <h3>Ingredients</h3>
      <div className="ing-style">
        <ul ref={ check }>
          {ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-step` }
              key={ index }
            >
              {`${ingredient} ${quantity[index]}`}
              <input
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
      </div>
      <h3>Instructions</h3>
      <div className="inst-style">
        <p data-testid="instructions">{ meal.strInstructions }</p>
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

ProgressFood.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  }).isRequired,
};
