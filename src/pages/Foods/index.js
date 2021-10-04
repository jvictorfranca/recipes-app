import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HorizontalCardFoodList from '../../components/HorizontalCardFoodList';

const BASIC_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function Foods({ match, history }) {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState('all');

  useEffect(() => {
    const fetchCategories = async () => {
      const MAX_NUMBER_CATEGORIES = 5;
      const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const array = await responseMeals.json();
      const { meals } = array;
      const arrayCategories = meals.map((meal) => meal.strCategory);
      const arrayCategoriesLimited = arrayCategories
        .filter((__, index) => index < MAX_NUMBER_CATEGORIES);
      setCategories(arrayCategoriesLimited);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      const MAX_NUMBER_FOODS = 12;
      const responseMeals = await fetch(BASIC_URL);
      const array = await responseMeals.json();
      const { meals } = array;
      const mealsLimited = meals
        .filter((__, index) => index < MAX_NUMBER_FOODS);
      setFoods(mealsLimited);
    };

    fetchFoods();
  }, []);

  const mealsCorrect = foods.map((food) => ({
    image: food.strMealThumb,
    category: food.strCategory,
    name: food.strMeal,
    area: food.strArea,
    id: food.idMeal,
    type: history.location.pathname.substring(1, history.location.pathname.length - 1)
    ,
  }));

  const handleButtonCategory = async (category) => {
    if (categorySelected !== category) {
      const MAX_NUMBER_FOODS = 12;
      const responseMeals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      console.log(responseMeals);
      const array = await responseMeals.json();
      console.log(array);
      const { meals } = array;
      const mealsLimited = meals
        .filter((__, index) => index < MAX_NUMBER_FOODS);
      setFoods(mealsLimited);
      setCategorySelected(category);
    } else {
      const MAX_NUMBER_FOODS = 12;
      const responseMeals = await fetch(BASIC_URL);
      const array = await responseMeals.json();
      console.log(array);
      const { meals } = array;
      const mealsLimited = meals
        .filter((__, index) => index < MAX_NUMBER_FOODS);
      setFoods(mealsLimited);
      setCategorySelected('all');
    }
  };

  const handleButtonAll = async () => {
    const MAX_NUMBER_FOODS = 12;
    const responseMeals = await fetch(BASIC_URL);
    const array = await responseMeals.json();
    console.log(array);
    const { meals } = array;
    const mealsLimited = meals
      .filter((__, index) => index < MAX_NUMBER_FOODS);
    setFoods(mealsLimited);
    setCategorySelected('all');
  };

  return (
    <div className="foods">
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

      {foods ? mealsCorrect.map((food, index) => (

        <div data-testid={ `${index}-recipe-card` } key={ index }>

          <HorizontalCardFoodList
            recipe={ food }
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

Foods.propTypes = {
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

export default Foods;
