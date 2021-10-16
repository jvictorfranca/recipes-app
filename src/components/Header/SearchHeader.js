import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import HeaderRadioButton from './HeaderRadioButton';
import getURLtoFetch from '../../helpers/getURLtoFetch';
import drinksContext from '../../context/drinksContext';
import recipesContext from '../../context/recipesContext';
import HeaderCardRecipe from './HeaderCardRecipe';
import HeaderCardDrink from './HeaderCardDrinks';

import './searchHeader.css';

function SearchHeader({ match, history }) {
  const [radioIngredient, setRadioIngredient] = useState(false);
  const [radioName, setRadioName] = useState(false);
  const [radioFirstLetter, setRadioFirstLetter] = useState(false);
  const [radioSelected, setRadioSelected] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [itens, setItens] = useState([]);
  const { searchedDrinks, setSearchedDrinks } = useContext(drinksContext);
  const { searchedRecipes, setSearchedRecipes } = useContext(recipesContext);

  const MAX_SHOW_NUMBER = 12;

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
    fetch(URL).then((results) => results.json()).then((items) => {
      setItens(items);
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
    if (match.path === '/comidas' && itens.meals) { setSearchedRecipes(itens.meals); }
    if (match.path === '/bebidas' && itens.drinks) {
      setSearchedDrinks(itens.drinks);
    }
  }, [itens, match.path, setSearchedDrinks, setSearchedRecipes]);

  useEffect(() => {
    function selectRadio() {
      if (radioIngredient) { setRadioSelected('radioIngredient'); }
      if (radioName) { setRadioSelected('radioName'); }
      if (radioFirstLetter) { setRadioSelected('radioFirstLetter'); }
    } selectRadio();
  }, [radioFirstLetter, radioName, radioIngredient]);

  useEffect(() => {
    function fixDrinks() {
      if (searchedDrinks && searchedDrinks.length > MAX_SHOW_NUMBER
         && match.path === '/bebidas') {
        setSearchedRecipes([]);
        setSearchedDrinks(searchedDrinks.slice(0, MAX_SHOW_NUMBER));
      }
    } fixDrinks();
  }, [match.path, searchedDrinks, setSearchedDrinks, setSearchedRecipes]);

  useEffect(() => {
    function fixRecipes() {
      if (searchedRecipes && searchedRecipes.length > MAX_SHOW_NUMBER
         && match.path === '/comidas') {
        setSearchedDrinks([]);
        setSearchedRecipes(searchedRecipes.slice(0, MAX_SHOW_NUMBER));
      }
    } fixRecipes();
  }, [match.path, searchedRecipes, setSearchedDrinks, setSearchedRecipes]);

  return (
    <section className="search-header-container">

      <form action="GET" className="form-search-header">
        <div className="search-input-div">
          <input
            type="text"
            data-testid="search-input"
            className="search-input"
            value={ inputValue }
            placeholder="Insira um valor"
            onChange={ (e) => setInputValue(e.target.value) }
          />
          <button
            type="button"
            onClick={ handleButtonClick }
            data-testid="exec-search-btn"
            className="exec-search-btn"
          >
            Busca
          </button>
        </div>
        <div className="search-radio-div">
          <HeaderRadioButton
            value={ radioIngredient }
            text="Ingredientes"
            onChange={ handleRadioIngredient }
            dataTest="ingredient-search-radio"
            className="first-letter-search-radio"
          />
          <HeaderRadioButton
            value={ radioName }
            text="Nome"
            onChange={ handleRadioName }
            dataTest="name-search-radio"
            className="first-letter-search-radio"
          />
          <HeaderRadioButton
            value={ radioFirstLetter }
            text="Primeira Letra"
            onChange={ handleRadioFirstLetter }
            dataTest="first-letter-search-radio"
            className="first-letter-search-radio"
          />
        </div>
        {/* <div className="search-button-div">
          <button
            type="button"
            onClick={ handleButtonClick }
            data-testid="exec-search-btn"
            className="exec-search-btn"
          >
            Busca
          </button>
        </div> */}
      </form>

      {match.path === '/comidas'
      && (
        <div
          className="recipes-cards-container"
        >
          {searchedRecipes.map((recipe, index) => (<HeaderCardRecipe
            recipe={ recipe }
            index={ index }
            key={ recipe.idMeal }
          />))}
        </div>)}

      {match.path === '/bebidas'
      && (
        <div
          className="drinks-cards-container"
        >
          {searchedDrinks.map((drink, index) => (<HeaderCardDrink
            drink={ drink }
            index={ index }
            key={ drink.idDrink }
          />))}
        </div>)}

    </section>
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
