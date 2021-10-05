import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import drinksContext from '../../context/drinksContext';

function ExploreIngredientsDrinks() {
  const { setDrinksIngredients } = useContext(drinksContext);
  const [ingredientes, setIngredientes] = useState([]);
  const history = useHistory();
  useEffect(() => {
    async function getData() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      const QUANTITY = 12;
      setIngredientes(data.drinks.filter((__, index) => index < QUANTITY));
    }
    getData();
  }, []);

  async function redirecionar(ingredient) {
    // const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`);
    // const data = await response.json();
    // console.log(data.ingredients[0].idIngredient);
    setDrinksIngredients(ingredient);

    history.push('/bebidas');
  }

  if (!ingredientes) return <h1>Loading</h1>;

  return (
    <div className="explore-ingredients-drinks">
      <Header title="Explorar Ingredientes" />
      {
        ingredientes.map(
          (item, index) => (
            <button
              type="button"
              onClick={ () => redirecionar(item.strIngredient1) }
              key={ item.strIngredient1 }
              data-testid={ `${index}-ingredient-card` }
              aria-hidden="true"
              style={ { marginTop: '50px' } }
            >
              <img data-testid={ `${index}-card-img` } src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` } alt={ item.strIngredient1 } />
              <p data-testid={ `${index}-card-name` }>{ item.strIngredient1 }</p>
            </button>
          ),
        )
      }
      <Footer />
    </div>
  );
}

export default ExploreIngredientsDrinks;
