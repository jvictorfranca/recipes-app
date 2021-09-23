import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import helper from './helper';

import WhiteHeart from '../../images/whiteHeartIcon.svg';
import BlackHeart from '../../images/blackHeartIcon.svg';

function inProgressRedirect(history, id) {
  history.push(`/comidas/${id}/in-progress`);
}

export default function RenderFood(id) {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recomendations, setRecomendations] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();

  const initial = 6;
  const maxArr = 19;

  useEffect(() => {
    async function getData() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals[0]);

      const recomendationsFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const recomendationsData = await recomendationsFetch.json();
      recomendationsData.drinks.splice(initial, maxArr);
      setRecomendations(recomendationsData.drinks);

      setLoading(false);
    }
    getData();
    helper.verifyLocalStorage(setDone, id);
    helper.verifyProgress(id, setProgress, 'meals');
    helper.verifyFavorite(id, setFavorite);
  }, [id]); // teste

  if (loading) {
    return <h2>Loading</h2>;
  }
  const ingredients = [];
  const quantity = [];
  const max = 20;
  for (let index = 1; index <= max; index += 1) {
    const keyIngredient = `strIngredient${index}`;
    const keyMeasure = `strMeasure${index}`;

    if (recipe[keyIngredient] !== '') {
      ingredients.push(recipe[keyIngredient]);
    }
    if (recipe[keyMeasure] !== '') {
      quantity.push(recipe[keyMeasure]);
    }
  }
  const youtube = 32;
  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt="thumb"
        data-testid="recipe-photo"
        style={ { height: '150px' } }
      />
      <h2
        data-testid="recipe-title"
      >
        {recipe.strMeal}
      </h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => helper.shareButton(setCopied) }
      >
        Share
      </button>
      {
        copied
        && 'Link copiado!'
      }
      <input
        type="image"
        src={ favorite ? BlackHeart : WhiteHeart }
        data-testid="favorite-btn"
        alt="Favorite"
        onClick={
          () => helper.saveFavoriteLocalstorage(recipe, favorite, setFavorite, 'idMeal')
        }
      />
      <h3
        data-testid="recipe-category"
      >
        { recipe.strCategory }
      </h3>
      {
        ingredients.map(
          (ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredient} ${quantity[index] ? quantity[index] : ''}` }
            </p>
          ),
        )
      }
      <p
        data-testid="instructions"
      >
        { recipe.strInstructions }
      </p>
      <iframe
        src={ `https://www.youtube.com/embed/${recipe.strYoutube.slice(youtube)}` }
        frameBorder="0"
        allow="autoplay; encrypted-media"
        title="video"
        data-testid="video"
      />
      <div className="recomendationsArea" onScroll={ () => setDisabled(false) }>
        {
          recomendations.map(
            (receita, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="card"
                hidden={ index > 1 ? disabled : false }
              >
                <h1
                  data-testid={ `${index}-recomendation-title` }
                >
                  { receita.strDrink }
                </h1>
              </div>
            ),
          )
        }
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="startRecipe"
        disabled={ done }
        onClick={ () => inProgressRedirect(history, id) }
      >
        {
          progress
            ? 'Continuar Receita'
            : 'Iniciar'
        }
      </button>
    </div>
  );
}
