import horizontalCardDrinkHelper from '../components/HorizontalCardDrink/helper';
import horizontalCardDrinkListHelper from '../components/HorizontalCardDrinkList/helper';
import horizontalCardFoodHelper from '../components/HorizontalCardFood/helper';
import horizontalCardFoodListHelper from '../components/HorizontalCardFoodList/helper';

const favoritesMock = [
  {
    id: '52804',
    type: 'comida',
    area: 'Canadian',
    category: 'Miscellaneous',
    alcoholicOrNot: '',
    name: 'Poutine',
    image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
  },
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
    id: '52977',
    type: 'comida',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    index: 0,
  },
];

const foodFavoriteMock = {
  id: '52977',
  type: 'comida',
  area: 'Turkish',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  index: 0,
};

describe(('testa os helpers do horizontalCardDrinkListHelper'), () => {
  afterEach(() => {
    localStorage.clear();
  });

  it(('testa o horizontalCardDrinkListHelper com local storage'), () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesMock));
    expect(localStorage.favoriteRecipes).toBe(JSON.stringify(favoritesMock));
    horizontalCardDrinkListHelper(foodFavoriteMock, 'comida', true);
    expect(JSON.stringify(favoritesMock.filter((recipe) => recipe.id
    !== foodFavoriteMock.id))).toBe(localStorage.favoriteRecipes);
  });
  it(('testa o horizontalCardDrinkListHelper com false'), () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesMock));
    expect(localStorage.favoriteRecipes).toBe(JSON.stringify(favoritesMock));
    horizontalCardDrinkListHelper(foodFavoriteMock, 'comida', false);
    expect(JSON.stringify([])).toBe(localStorage.favoriteRecipes);
  });
});

describe(('testa os helpers do horizontalCardDrinkHelper'), () => {
  afterEach(() => {
    localStorage.clear();
  });

  it(('testa o horizontalCardDrinkHelper com local storage'), () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesMock));
    expect(localStorage.favoriteRecipes).toBe(JSON.stringify(favoritesMock));
    horizontalCardDrinkHelper(foodFavoriteMock, 'comida', true);
    expect(JSON.stringify(favoritesMock.filter((recipe) => recipe.id
    !== foodFavoriteMock.id))).toBe(localStorage.favoriteRecipes);
  });
  it(('testa o horizontalCardDrinkHelper com false'), () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesMock));
    expect(localStorage.favoriteRecipes).toBe(JSON.stringify(favoritesMock));
    horizontalCardDrinkHelper(foodFavoriteMock, 'comida', false);
    expect(JSON.stringify([])).toBe(localStorage.favoriteRecipes);
  });
});

describe(('testa os helpers do horizontalCardFoodListHelper'), () => {
  afterEach(() => {
    localStorage.clear();
  });

  it(('testa o horizontalCardFoodListHelper com local storage'), () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesMock));
    expect(localStorage.favoriteRecipes).toBe(JSON.stringify(favoritesMock));
    horizontalCardFoodListHelper(foodFavoriteMock, 'comida', true);
    expect(JSON.stringify(favoritesMock.filter((recipe) => recipe.id
    !== foodFavoriteMock.id))).toBe(localStorage.favoriteRecipes);
  });
  it(('testa o horizontalCardFoodListHelper com false'), () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesMock));
    expect(localStorage.favoriteRecipes).toBe(JSON.stringify(favoritesMock));
    horizontalCardFoodListHelper(foodFavoriteMock, 'comida', false);
    expect(JSON.stringify([])).toBe(localStorage.favoriteRecipes);
  });
});

describe(('testa os helpers do horizontalCardFoodHelper'), () => {
  afterEach(() => {
    localStorage.clear();
  });

  it(('testa o horizontalCardFoodHelper com local storage'), () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesMock));
    expect(localStorage.favoriteRecipes).toBe(JSON.stringify(favoritesMock));
    horizontalCardFoodHelper(foodFavoriteMock, 'comida', true);
    expect(JSON.stringify(favoritesMock.filter((recipe) => recipe.id
    !== foodFavoriteMock.id))).toBe(localStorage.favoriteRecipes);
  });
  it(('testa o horizontalCardFoodHelper com false'), () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesMock));
    expect(localStorage.favoriteRecipes).toBe(JSON.stringify(favoritesMock));
    horizontalCardFoodHelper(foodFavoriteMock, 'comida', false);
    expect(JSON.stringify([])).toBe(localStorage.favoriteRecipes);
  });
});
