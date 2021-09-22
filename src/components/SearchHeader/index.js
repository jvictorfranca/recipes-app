import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import HeaderRadioButton from '../HeaderRadioButton';
import getURLtoFetch from '../../helpers/getURLtoFetch';
import drinksContext from '../../context/drinksContext';
import recipesContext from '../../context/recipesContext';

function SearchHeader({ match, history }) {
  const [radioIngredient, setRadioIngredient] = useState(false);
  const [radioName, setRadioName] = useState(false);
  const [radioFirstLetter, setRadioFirstLetter] = useState(false);
  const [radioSelected, setRadioSelected] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [itens, setItens] = useState([]);
  const { setSearchedDrinks } = useContext(drinksContext);
  const { setSearchedRecipes } = useContext(recipesContext);

  const handleRadioIngredient = () => {
    if (!radioIngredient) {
      setRadioIngredient(true);
      setRadioName(false);
      setRadioFirstLetter(false);
    }
  };

  const handleRadioName = () => {
    if (!radioName) {
      setRadioIngredient(false);
      setRadioName(true);
      setRadioFirstLetter(false);
    }
  };

  const handleRadioFirstLetter = () => {
    if (!radioFirstLetter) {
      setRadioIngredient(false);
      setRadioName(false);
      setRadioFirstLetter(true);
    }
  };

  const handleButtonClick = () => {
    const URL = getURLtoFetch(match.path, radioSelected, inputValue);
    console.log(URL);
    fetch(URL).then((results) => results.json()).then((items) => {
      setItens(items);
      console.log((items));
      if (match.path === '/comidas' && items.meals) { setSearchedRecipes(itens); }
      if (match.path === '/bebidas' && items.drinks) { setSearchedDrinks(itens); }
      if ((match.path === '/comidas' && items.meals === null)
      || (match.path === '/bebidas' && items.drinks === null)) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (match.path === '/comidas' && items.meals && items.meals.length === 1) {
        history.push(`/comidas/${items.meals[0].idMeal}`);
      } else if (match.path === '/bebidas' && items.drinks && items.drinks.length === 1) {
        history.push(`/bebidas/${items.drinks[0].idDrink}`);
      }
    });
  };

  useEffect(() => {
    function selectRadio() {
      if (radioIngredient) { setRadioSelected('radioIngredient'); }
      if (radioName) { setRadioSelected('radioName'); }
      if (radioFirstLetter) { setRadioSelected('radioFirstLetter'); }
    } selectRadio();
  }, [radioFirstLetter, radioName, radioIngredient]);

  return (
    <form action="GET">
      <button type="button" data-testid="search-top-btn">Clica</button>
      <input
        type="text"
        data-testid="search-input"
        value={ inputValue }
        onChange={ (e) => setInputValue(e.target.value) }
      />
      <HeaderRadioButton
        value={ radioIngredient }
        text="radioIngredient"
        onChange={ handleRadioIngredient }
        dataTest="ingredient-search-radio"
      />
      <HeaderRadioButton
        value={ radioName }
        text="radioName"
        onChange={ handleRadioName }
        dataTest="name-search-radio"
      />
      <HeaderRadioButton
        value={ radioFirstLetter }
        text="radioFirstLetter"
        onChange={ handleRadioFirstLetter }
        dataTest="first-letter-search-radio"
      />
      <button
        type="button"
        onClick={ handleButtonClick }
        data-testid="exec-search-btn"
      >
        Busca
      </button>

    </form>
  );
}

SearchHeader.propTypes = {
  match: propTypes.shape({
    path: propTypes.string,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func }).isRequired,
};

export default SearchHeader;
