const getURLtoFetch = (type, radio, inputValue = '') => {
  let answer;

  if (radio === 'radioFirstLetter' && inputValue.length > 1) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  } else if (type === '/comidas') {
    if (radio === 'radioFirstLetter' && inputValue.length === 1) {
      answer = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
    } else if (radio === 'radioName') {
      answer = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
    } else if (radio === 'radioIngredient') {
      answer = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
    }
  } else if (type === '/bebidas') {
    if (radio === 'radioFirstLetter' && inputValue.length === 1) {
      answer = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
    } else if (radio === 'radioName') {
      answer = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
    } else if (radio === 'radioIngredient') {
      answer = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
    }
  }
  return answer;
};

export default getURLtoFetch;
