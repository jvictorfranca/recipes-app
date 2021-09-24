import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HorizontalCardDrink from '../../components/HorizontalCardDrink';
import HorizontalCardFood from '../../components/HorizontalCardFood';

function Made() {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [showFoods, setShowFoods] = useState(true);
  const [showDrinks, setShowDrinks] = useState(false);

  return (

    <main className="made-recipes">
      {/* <Header title="Receitas Feitas" /> */}

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

      <Footer />
    </main>

  );
}
export default Made;
