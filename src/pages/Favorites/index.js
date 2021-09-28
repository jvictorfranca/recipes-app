import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';

import HorizontalCardDrink from '../../components/HorizontalCardDrink';
import HorizontalCardFood from '../../components/HorizontalCardFood';

import './styles.css';

function Favorites() {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [showFoods, setShowFoods] = useState(false);
  const [showDrinks, setShowDrinks] = useState(false);
  const [favoriteFoods, setFavoriteFoods] = useState(localStorage.favoriteRecipes
    ? JSON.parse(localStorage.favoriteRecipes) : []);

  useEffect(() => {
    const allRecipesWithIndex = favoriteFoods
      .map((recipe, index) => ({ ...recipe, index }));
    const foodsToSet = allRecipesWithIndex
      .filter((recipe) => recipe.type === 'comida');
    const drinksToSet = allRecipesWithIndex.filter((recipe) => recipe.type === 'bebida');

    if (foodsToSet) setShowFoods(true);
    if (drinksToSet) setShowDrinks(true);
    setFoods(foodsToSet);
    setDrinks(drinksToSet);
  }, [favoriteFoods]);

  return (
    <section className="favorite-recipes">
      <Header title="Receitas Favoritas" />
      <div className="favorite-recipes-buttons-div">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            setShowFoods(true);
            setShowDrinks(true);
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {
            setShowFoods(true);
            setShowDrinks(false);
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setShowFoods(false);
            setShowDrinks(true);
          } }
        >
          Drinks
        </button>
      </div>
      {showFoods && foods.map((food, index) => (<HorizontalCardFood
        recipe={ food }
        index={ food.index }
        key={ index }
        isFavorite
        setFavoriteFoods={ setFavoriteFoods }
      />))}
      {showDrinks && drinks.map((drink, index) => (<HorizontalCardDrink
        recipe={ drink }
        index={
          showFoods
            ? drink.index
            : index
        }
        key={ index }
        isFavorite
        setFavoriteFoods={ setFavoriteFoods }
      />))}
    </section>
  );
}

export default Favorites;
