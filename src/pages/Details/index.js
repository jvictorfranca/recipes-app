import RenderDrink from './RenderDrinks';
import RenderFood from './RenderFood';

function Details({ match: { params: { id }, path } }) {
  if (path.includes('comidas')) {
    return RenderFood(id);
  }
  return RenderDrink(id);
}

export default Details;
