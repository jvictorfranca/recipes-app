const through = 'line-through';

export function checkInput(currentIngredients, check) {
  const arrayLength = check.current.children.length;
  for (let index = 0; index < arrayLength; index += 1) {
    const ingredient = check.current.children[index].innerText;
    const checked = check.current.children[index];

    currentIngredients.forEach((element) => {
      if (element.includes(ingredient.split(' ')[0])) {
        check.current.children[index].style.textDecoration = through;
        checked.children[0].checked = true;
      }
    });
  }
}

export function handleCocktails(target, completeIngredients, id) {
  const { checked, value } = target;

  let currentProgressRecipes = {};

  if (Object.prototype.hasOwnProperty.call(localStorage, 'inProgressRecipes')) {
    currentProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  }

  if (checked) {
    target.parentNode.style.textDecoration = through;
    completeIngredients.push(value);
    currentProgressRecipes.cocktails = {
      ...currentProgressRecipes.cocktails, [id]: completeIngredients };
  } else {
    target.parentNode.style.textDecoration = '';
    const index = currentProgressRecipes.cocktails[id].findIndex((e) => e === value);
    currentProgressRecipes.cocktails[id].splice(index, 1);
    completeIngredients.splice(index, 1);
  }

  localStorage.setItem('inProgressRecipes', JSON.stringify(currentProgressRecipes));
}

export function handleMeals(target, completeIngredients, id) {
  const { checked, value } = target;

  let currentProgressRecipes = {};

  if (Object.prototype.hasOwnProperty.call(localStorage, 'inProgressRecipes')) {
    currentProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  }

  if (checked) {
    target.parentNode.style.textDecoration = through;
    completeIngredients.push(value);
    currentProgressRecipes.meals = {
      ...currentProgressRecipes.meals, [id]: completeIngredients };
  } else {
    target.parentNode.style.textDecoration = '';
    const index = currentProgressRecipes.meals[id].findIndex((e) => e === value);
    currentProgressRecipes.meals[id].splice(index, 1);
    completeIngredients.splice(index, 1);
  }

  localStorage.setItem('inProgressRecipes', JSON.stringify(currentProgressRecipes));
}
