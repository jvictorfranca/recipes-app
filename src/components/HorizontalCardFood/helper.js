function RemoveFavorite(recipe, type, isFavorite) {
  let favoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (isFavorite) {
    const newFavoritas = favoritas.filter((a) => a.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritas));
  } else {
    favoritas = [];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritas));
  }
}

export default RemoveFavorite;
