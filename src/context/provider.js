import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import drinksContext from './drinksContext';
import recipesContext from './recipesContext';

function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [recipesCategory, setRecipesCategory] = useState([]);
  const [recipesIngredients, setRecipesIngredients] = useState([]);
  const [recipesAreas, setRecipesAreas] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const [drinks, setDrinks] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const [searchedDrinks, setSearchedDrinks] = useState([]);

  const drinksObject = {
    drinks,
    drinksCategory,
    searchedDrinks,
    setSearchedDrinks,
  };

  const recipesObject = {
    recipes,
    recipesCategory,
    recipesIngredients,
    recipesAreas,
    searchedRecipes,
    setRecipesIngredients,
    setSearchedRecipes,
  };

  async function getData(url, setState, param) {
    const response = await fetch(url);
    const data = await response.json();
    setState(data[param]);
  }

  useEffect(() => {
    getData('https://www.themealdb.com/api/json/v1/1/search.php?s=', setRecipes, 'meals');
    /* getData('https://www.themealdb.com/api/json/v1/1/list.php?i=list', setRecipesIngredients, 'meals'); */
    getData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setRecipesCategory, 'meals');
    getData('https://www.themealdb.com/api/json/v1/1/list.php?a=list', setRecipesAreas, 'meals');

    getData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s', setDrinks, 'drinks');
    getData('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', setDrinksCategory, 'drinks');
  }, []);

  return (
    <drinksContext.Provider value={ drinksObject }>
      <recipesContext.Provider value={ recipesObject }>
        {children}
      </recipesContext.Provider>
    </drinksContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
