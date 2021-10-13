import functions from '../pages/Details/helper';

const mockedFavoritas = [
  {
    id: '53013',
    type: 'comida',
    area: 'American',
    category: 'Beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
  },
  {
    id: '52978',
    type: 'comida',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Kumpir',
    image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
  },
  {
    id: '52804',
    type: 'comida',
    area: 'Canadian',
    category: 'Miscellaneous',
    alcoholicOrNot: '',
    name: 'Poutine',
    image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
  },
];

const mockedRecipe = {
  idMeal: '52844',
  strMeal: 'Lasagne',
  strDrinkAlternate: null,
  strCategory: 'Pasta',
  strArea: 'Italian',
  strInstructions: 'Heat th',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
  strTags: null,
  strYoutube: 'https://www.youtube.com/watch?v=gfhfsBPt46s',
  strIngredient1: 'Olive Oil',
  strIngredient2: 'Bacon',
  strIngredient3: 'Onion',
  strIngredient4: 'Celery',
  strIngredient5: 'Carrots',
  strIngredient6: 'Garlic',
  strIngredient7: 'Minced Beef',
  strIngredient8: 'Tomato Puree',
  strIngredient9: 'Chopped Tomatoes',
  strIngredient10: 'Honey',
  strIngredient11: 'Lasagne Sheets',
  strIngredient12: 'Creme Fraiche',
  strIngredient13: 'Mozzarella Balls',
  strIngredient14: 'Parmesan Cheese',
  strIngredient15: 'Basil Leaves',
  strIngredient16: '',
  strIngredient17: '',
  strIngredient18: '',
  strIngredient19: '',
  strIngredient20: '',
  strMeasure1: '1 tblsp ',
  strMeasure2: '2',
  strMeasure3: '1 finely chopped ',
  strMeasure4: '1 Stick',
  strMeasure5: '1 medium',
  strMeasure6: '2 cloves chopped',
  strMeasure7: '500g',
  strMeasure8: '1 tbls',
  strMeasure9: '800g',
  strMeasure10: '1 tblsp ',
  strMeasure11: '500g',
  strMeasure12: '400ml',
  strMeasure13: '125g',
  strMeasure14: '50g',
  strMeasure15: 'Topping',
  strMeasure16: '',
  strMeasure17: '',
  strMeasure18: '',
  strMeasure19: '',
  strMeasure20: '',
  strSource: 'https://www.bbcgoodfood.com/recipes/classic-lasagne',
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

const mockedId = '53013';

describe(('Testa a função saveFavoriteLocalstorage'), () => {
  afterEach(() => {
    localStorage.clear();
  });

  test(('testa a função'), () => {
    localStorage.favoriteRecipes = JSON.stringify(mockedFavoritas);
    const array = [];
    const setArray = (item) => {
      array.push(item);
    };
    functions.saveFavoriteLocalstorage(mockedRecipe, true, setArray, 'idMeal');
    expect(array).toEqual([false]);
  });
});

// describe(('testa sharebutton'), () => {
//   jest.mock('clipboard-copy', () => ({
//     ...(jest.requireActual('clipboard-copy')),
//     clipboardCopy: jest.fn(() => {}),
//   }));
//   test(('Testa a função'), () => {
//     const state = {
//       letme: false,
//     };
//     const setLetme = () => {
//       state.letme = true;
//     };
//     functions.shareButton(setLetme);
//     expect(state.letme).toEqual('fajnuiefa');
//   });
// });

describe(('testa verifyLocalStorage'), (() => {
  test(('função'), () => {
    const state = {
      param: false,
    };
    const setMockedState = () => {
      state.param = true;
    };
    localStorage.doneRecipes = JSON.stringify(mockedFavoritas);
    functions.verifyLocalStorage(setMockedState, mockedId);
    expect(state.param).toEqual(true);
  });
}));

describe(('testa verifyFavorites'), () => {
  test(('testa função sem storage'), () => {
    const state = {
      param: false,
    };
    const setMockedState = () => {
      state.param = true;
    };
    functions.verifyFavorite(mockedId, setMockedState);
  });
  test(('testa função com storage'), () => {
    localStorage.favoriteRecipes = JSON.stringify(mockedFavoritas);
    const state = {
      param: false,
    };
    const setMockedState = () => {
      state.param = true;
    };
    functions.verifyFavorite(mockedId, setMockedState);
  });
});

describe(('testa verifyProgress'), () => {
  test(('testa função sem storage'), () => {
    const state = {
      param: false,
    };
    const setMockedState = () => {
      state.param = true;
    };
    functions.verifyProgress(mockedId, setMockedState, 'meals');
  });
  test(('testa função com storage'), () => {
    localStorage.inProgressRecipes = JSON.stringify(mockedFavoritas);
    const state = {
      param: false,
    };
    const setMockedState = () => {
      state.param = true;
    };
    functions.verifyProgress(mockedId, setMockedState, 'meals');
  });
});
