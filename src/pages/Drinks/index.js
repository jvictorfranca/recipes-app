import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HorizontalCardDrinkList from '../../components/HorizontalCardDrinkList';

const BASIC_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Drinks({ match, history }) {
  const [stateDrinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState('all');

  useEffect(() => {
    const fetchCategories = async () => {
      const MAX_NUMBER_CATEGORIES = 5;
      const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const array = await responseDrinks.json();
      const { drinks } = array;
      const arrayCategories = drinks.map((drink) => drink.strCategory);
      const arrayCategoriesLimited = arrayCategories
        .filter((__, index) => index < MAX_NUMBER_CATEGORIES);
      setCategories(arrayCategoriesLimited);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDrinks = async () => {
      const MAX_NUMBER_DRINKS = 12;
      const responseDrinks = await fetch(BASIC_URL);
      const array = await responseDrinks.json();
      const { drinks } = array;
      const drinksLimited = drinks
        .filter((__, index) => index < MAX_NUMBER_DRINKS);
      setDrinks(drinksLimited);
    };

    fetchDrinks();
  }, []);

  const drinksCorrect = stateDrinks.map((drink) => ({
    image: drink.strDrinkThumb,
    category: drink.strCategory,
    name: drink.strDrink,
    area: drink.strArea,
    id: drink.idDrink,
    type: history.location.pathname.substring(1, history.location.pathname.length - 1)
    ,
  }));

  const handleButtonCategory = async (category) => {
    if (categorySelected !== category) {
      const MAX_NUMBER_DRINKS = 12;
      const responseDrinks = await fetch(
        ` https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      console.log(responseDrinks);
      const array = await responseDrinks.json();
      console.log(array);
      const { drinks } = array;
      const drinksLimited = drinks
        .filter((__, index) => index < MAX_NUMBER_DRINKS);
      setDrinks(drinksLimited);
      setCategorySelected(category);
    } else {
      const MAX_NUMBER_DRINKS = 12;
      const responseDrinks = await fetch(BASIC_URL);
      const array = await responseDrinks.json();
      console.log(array);
      const { drinks } = array;
      const drinksLimited = drinks
        .filter((__, index) => index < MAX_NUMBER_DRINKS);
      setDrinks(drinksLimited);
      setCategorySelected('all');
    }
  };

  const handleButtonAll = async () => {
    const MAX_NUMBER_FOODS = 12;
    const responseDrinks = await fetch(BASIC_URL);
    const array = await responseDrinks.json();
    console.log(array);
    const { drinks } = array;
    const drinksLimited = drinks
      .filter((__, index) => index < MAX_NUMBER_FOODS);
    setDrinks(drinksLimited);
    setCategorySelected('all');
  };

  return (
    <div className="drinks">
      <Header title="Comidas" search match={ match } history={ history } />

      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => handleButtonAll() }
      >
        All
      </button>

      {categories
        ? (
          categories.map((category, index) => (
            <button
              key={ index }
              data-testid={ `${category}-category-filter` }
              type="button"
              onClick={ () => handleButtonCategory(category) }
            >
              {category}
            </button>)))
        : <p>Loading...</p>}

      {stateDrinks ? drinksCorrect.map((drink, index) => (

        <div data-testid={ `${index}-recipe-card` } key={ index }>

          <HorizontalCardDrinkList
            recipe={ drink }
            index={ index }

            history={ history }
          />

        </div>
      ))
        : <p>Loading...</p>}
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: propTypes.shape({
    path: propTypes.string,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func,
    location: propTypes.shape({
      pathname: propTypes.string,
    }),
  }).isRequired,
};

export default Drinks;
