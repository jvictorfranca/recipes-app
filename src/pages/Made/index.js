import React, { useState } from 'react';
import HorizontalCardDrink from '../../components/HorizontalCardDrink';
import HorizontalCardFood from '../../components/HorizontalCardFood';

function Made() {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [showFoods, setShowFoods] = useState(true);
  const [showDrinks, setShowDrinks] = useState(false);

  return (
    <main>

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

      <p>oi</p>
      {showFoods && foods.map((food, index) => (<HorizontalCardFood
        recipe={ food }
        index={ food.index }
        key={ index }
      />))}
      {showDrinks && drinks.map((drink, index) => (<HorizontalCardDrink
        recipe={ drink }
        index={ drink.index }
        key={ index }
      />))}

    </main>

  );
}
export default Made;
