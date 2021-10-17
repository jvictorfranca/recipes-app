import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import recipesContext from '../../context/recipesContext';
import Loading from '../../components/Loading';

function ExploreIngredientsFoods({ history }) {
  const { setRecipesIngredients } = useContext(recipesContext);
  const [ingredientes, setIngredientes] = useState();

  useEffect(() => {
    async function getData() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      const QUANTITY = 100;
      setIngredientes(data.meals.filter((__, index) => index < QUANTITY));
    }
    getData();
  }, []);
  if (!ingredientes) return <Loading />;

  return (
    <div className="explore-ingredients-foods application-container">
      <Header title="Explorar Ingredientes" />
      <ul>
        {
          ingredientes.map(
            (item, index) => (
              <button
                type="button"
                onClick={ () => {
                  setRecipesIngredients(item.strIngredient);
                  history.push('/comidas');
                } }
                key={ item.idIngredient }
                data-testid={ `${index}-ingredient-card` }
              >
                <img data-testid={ `${index}-card-img` } src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` } alt={ item.strIngredient } />
                <p data-testid={ `${index}-card-name` }>{ item.strIngredient }</p>
              </button>
            ),
          )
        }
      </ul>
      <Footer />
    </div>
  );
}

ExploreIngredientsFoods.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default ExploreIngredientsFoods;
