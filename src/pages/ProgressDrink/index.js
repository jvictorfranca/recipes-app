import React, { useEffect, useState } from 'react';

export default function ProgressDrink({ match: { params: { id } } }) {
  const [drink, setDrink] = useState({});

  useEffect(() => {
    async function getDrink() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDrink(...data.drinks);
      console.log(data);
    }
    getDrink();
  }, [id]);

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

  function handleChange({ target }) {
    console.log(target.value);
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
      {ingredients.map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-step` } key={ index }>
          {`${ingredient} ${quantity[index]}`}
          <input
            onChange={ handleChange }
            value={ ingredient }
            id={ ingredient }
            type="checkbox"
          />
        </p>
      ))}
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <button data-testid="finish-recipe-btn" type="button">Favoritar</button>
    </div>
  );
}
