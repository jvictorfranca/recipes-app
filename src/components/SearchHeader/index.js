import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import HeaderRadioButton from '../HeaderRadioButton';
import getURLtoFetch from '../../helpers/getURLtoFetch';

function SearchHeader({ match }) {
  const [radioIngredient, setRadioIngredient] = useState(false);
  const [radioName, setRadioName] = useState(false);
  const [radioFirstLetter, setRadioFirstLetter] = useState(false);
  const [radioSelected, setRadioSelected] = useState('');
  const [inputValue, setInputValue] = useState('');

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
    console.log(match.path);
    console.log(radioSelected);
    console.log(inputValue);
    const URL = getURLtoFetch(match.path, radioSelected, inputValue);
    console.log(URL);
    fetch(URL).then((results) => results.json()).then((items) => console.log(items));
  };

  useEffect(() => {
    function selectRadio() {
      if (radioIngredient) { setRadioSelected('radioIngredient'); }
      if (radioName) { setRadioSelected('radioName'); }
      if (radioFirstLetter) { setRadioSelected('radioFirstLetter'); }
    }

    selectRadio();
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
};

export default SearchHeader;
