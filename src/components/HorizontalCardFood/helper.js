function RemoveFavorite(recipe, type, isFavorite) {
  let favoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(recipe, type, recipe[type], favoritas);

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
