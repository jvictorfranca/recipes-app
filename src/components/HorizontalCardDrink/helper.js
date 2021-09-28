function RemoveFavorite(recipe, type, isFavorite) {
  let favoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let indexFinal = null;
  if (favoritas) {
    for (let indexFood = 0; indexFood < favoritas.length; indexFood += 1) {
      if (favoritas[indexFood].id === recipe[type]) {
        indexFinal = indexFood;
      }
    }
  } else {
    favoritas = [];
  }

  if (isFavorite) {
    favoritas.splice(indexFinal, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritas));
  } else {
    favoritas = [];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritas));
  }
}

export default RemoveFavorite;
