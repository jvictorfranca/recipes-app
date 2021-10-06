import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import './style.css';

function redirecionar(id, history) {
  history.push(`/comidas/${id}`);
}

function verify(param) {
  if (param === 'All') {
    return 'https://www.themealdb.com/api/json/v1/1/search.php?s';
  }
  return `https://www.themealdb.com/api/json/v1/1/filter.php?a=${param}`;
}

function transform(data) {
  const temp = [];
  const max = 12;
  for (let index = 0; index < max; index += 1) {
    if (data.meals[index]) {
      temp.push(data.meals[index]);
    }
  }
  return temp;
}

function ExploreAreas() {
  const [areas, setAreas] = useState();
  const [foods, setFoods] = useState();
  const history = useHistory();

  useEffect(() => {
    async function getFoods() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const min = 12;
      const max = 15;
      data.meals.splice(min, max);
      setFoods(data.meals);
    }

    async function getData() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      let indexFinal = 0;

      for (let index = 0; index < data.meals.length; index += 1) {
        if (data.meals[index].strArea === 'Croatian') {
          indexFinal = index;
        }
      }

      if (indexFinal !== 0) {
        data.meals.splice(indexFinal, 1);
      }
      setAreas(data.meals);
      getFoods();
    }

    getData();
  }, []);

  async function handleChange({ target: { value } }) {
    const url = verify(value);

    const response = await fetch(url);
    const data = await response.json();
    setFoods(transform(data));
  }

  if (!areas || !foods) return <h1>Loading</h1>;

  return (
    <div className="explore-areas">
      <Header title="Explorar Origem" search />
      <select
        name="explore-by-area-dropdown"
        data-testid="explore-by-area-dropdown"
        style={ { marginTop: '70px' } }
        onChange={ handleChange }
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        {
          areas.map(
            (area) => (
              <option
                value={ area.strArea }
                key={ area.strArea }
                data-testid={ `${area.strArea}-option` }
              >
                {area.strArea}
              </option>
            ),
          )
        }
      </select>

      <ul className="cardAreaOrigin">

        {
          foods.map(
            (comida, index) => (
              <div
                key={ comida.idMeal }
                data-testid={ `${index}-recipe-card` }
                className="cardOrigin"
                onClick={ () => redirecionar(comida.idMeal, history) }
                aria-hidden="true"
              >
                <h4
                  className="cardTitleOrigin"
                  data-testid={ `${index}-card-name` }
                >
                  { comida.strMeal }
                </h4>
                <img
                  src={ comida.strMealThumb }
                  alt={ `${index}-card-name` }
                  style={ { height: '50px' } }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            ),
          )

        }

      </ul>
      <Footer />
    </div>
  );
}

ExploreAreas.propTypes = {
  match: propTypes.shape({
    path: propTypes.string,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func }).isRequired,
};

export default ExploreAreas;
