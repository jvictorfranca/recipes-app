import Copy from 'clipboard-copy';

function verifyProgress(id, setState, chave) {
  const chaves = Object.keys(localStorage);
  const cocktails = chaves.includes('inProgressRecipes')
    ? Object.keys(JSON.parse(localStorage.inProgressRecipes)[chave])
    : false;
  if (cocktails && cocktails.includes(id)) {
    setState(true);
  }
}

function verifyFavorite(id, setState) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes) {
    const isFav = favoriteRecipes.find((rec) => rec.id === id);
    if (isFav) {
      setState(true);
    }
  }
}

function verifyLocalStorage(param, id) {
  const doneRecipes = localStorage.getItem('doneRecipes');
  if (doneRecipes) {
    const recipe = doneRecipes.find((rec) => rec.id === id);
    if (recipe) {
      param(true);
    }
  }
}

function shareButton(setState) {
  Copy(window.location.href);
  setState(true);
}

function saveFavoriteLocalstorage(recipe, isFavorite, setState, type) {
  let favoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let indexFinal = null;
  if (favoritas) {
    for (let index = 0; index < favoritas.length; index += 1) {
      if (favoritas[index].id === recipe[type]) {
        indexFinal = index;
      }
    }
  } else {
    favoritas = [];
  }
  const obj = {
    id: recipe[type],
    type: type === 'idMeal' ? 'comida' : 'bebida',
    area: type === 'idMeal' ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: type === 'idMeal' ? '' : recipe.strAlcoholic,
    name: recipe[type === 'idMeal' ? 'strMeal' : 'strDrink'],
    image: recipe[type === 'idMeal' ? 'strMealThumb' : 'strDrinkThumb'],
  };
  if (isFavorite) {
    favoritas.splice(indexFinal, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritas));
    setState(!isFavorite);
  } else {
    favoritas.push(obj);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritas));
    setState(!isFavorite);
  }
}

export default {
  verifyProgress,
  verifyFavorite,
  verifyLocalStorage,
  shareButton,
  saveFavoriteLocalstorage,
};
