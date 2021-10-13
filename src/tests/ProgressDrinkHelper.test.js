// import React from 'react';
// import { screen, fireEvent } from '@testing-library/react';

// import { act } from 'react-dom/test-utils';
// import renderWithRouter from './renderWithRouter';

// import App from '../App';

// import fetch from '../../cypress/mocks/fetch';

// import { checkInput, handleCocktails,
//   handleMeals, getIngredientsCocktails, getIngredientsMels } from '../pages/ProgressDrink/Helper';

import {
  getIngredientsCocktails, getIngredientsMels,
  handleMeals } from '../pages/ProgressDrink/Helper';

const mockedTarged = {
  value: 'Celery',
  checked: true,
  parentNode: {
    style: {
      textDecoration: 'through',
    },
  } };

const mockedCompletedIngredients = ['Celery'];

const mockedId = 13501;

describe(('Testa a função getIngredientsCocktails'), () => {
  const mockedDrinks = {
    13501: [
      'Amaretto',
    ],
    178319: [],
  };
  beforeEach(() => {
    localStorage.clear();
  });
  const array = [];
  const mockedSetItens = (item) => {
    array.push(item);
  };

  const mockedIdDrink = 13501;

  const mockedInprogressRecipes = {
    cocktails: mockedDrinks,
  };

  test(('testa a função especificada'), () => {
    localStorage.inProgressRecipes = JSON.stringify(mockedInprogressRecipes);
    getIngredientsCocktails(mockedIdDrink, mockedSetItens);
    expect(JSON.stringify(array)).toBe(JSON.stringify([['Amaretto']]));
  });
});

describe(('Testa a função getIngredientsMeals'), () => {
  const mockedMeal = {
    13501: [
      'Amaretto',
    ],
    178319: [],
  };
  beforeEach(() => {
    localStorage.clear();
  });
  const array = [];
  const mockedSetItens = (item) => {
    array.push(item);
  };

  const mockedIdMeal = 13501;

  const mockedInprogressRecipes = {
    meals: mockedMeal,
  };

  test(('testa a função'), () => {
    localStorage.inProgressRecipes = JSON.stringify(mockedInprogressRecipes);
    getIngredientsMels(mockedIdMeal, mockedSetItens);
    expect(JSON.stringify(array)).toBe(JSON.stringify([['Amaretto']]));
  });
});

describe(('testa handleMeals'), () => {
  test(('testa a função'), () => {
    handleMeals(mockedTarged, mockedCompletedIngredients, mockedId);
  });
});
