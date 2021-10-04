import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function ExploreIngredientsDrinks() {
  const [ingredientes, setIngredientes] = useState([]);
  const history = useHistory();
  useEffect(() => {
    async function getData() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      const quantity = -12;
      setIngredientes(data.drinks.reverse().splice(quantity).reverse());
    }
    getData();
  }, []);

  async function redirecionar(ingredient) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`);
    const data = await response.json();
    console.log(data.ingredients[0].idIngredient);
    history.push('/bebidas');
  }

  if (!ingredientes) return <h1>Loading</h1>;

  return (
    <div className="explore-ingredients-drinks">
      <Header title="Explorar Ingredientes" />
      {
        ingredientes.map(
          (item, index) => (
            <div
              onClick={ () => redirecionar(item.strIngredient1) }
              key={ item.strIngredient1 }
              data-testid={ `${index}-ingredient-card` }
              aria-hidden="true"
              style={ { marginTop: '50px' } }
            >
              <img data-testid={ `${index}-card-img` } src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` } alt={ item.strIngredient1 } />
              <p data-testid={ `${index}-card-name` }>{ item.strIngredient1 }</p>
            </div>
          ),
        )
      }
      <Footer />
    </div>
  );
}

export default ExploreIngredientsDrinks;
