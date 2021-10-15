import React from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function ExploreFoods() {
  const history = useHistory();
  async function aleatory() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const id = data.meals[0].idMeal;
    history.push(`/comidas/${id}`);
  }
  return (
    <div className="explore-foods">
      <Header title="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
        style={ { marginTop: '50px' } }
        className="selecting-button"
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
        style={ { marginTop: '50px' } }
        className="selecting-button"
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        style={ { marginTop: '50px' } }
        onClick={ aleatory }
        className="selecting-button"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
