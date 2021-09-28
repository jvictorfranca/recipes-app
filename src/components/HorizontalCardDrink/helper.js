function RemoveFavorite(recipe, type, isFavorite) {
  let favoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let indexFinal = null;
  console.log(recipe, type, recipe[type], favoritas);

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
    const newFavoritas = favoritas.filter((a) => a.id !== recipe.id);
    console.log(newFavoritas);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritas));
  } else {
    favoritas = [];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritas));
  }
}

export default RemoveFavorite;
