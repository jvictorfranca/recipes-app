import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Pages from './pages';
import Provider from './context/provider';

import './styles/Global.css';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact component={ Pages.Login } path="/" />
        <Route exact component={ Pages.Foods } path="/comidas" />
        <Route exact component={ Pages.Drinks } path="/bebidas" />
        <Route exact component={ Pages.Details } path="/comidas/:id" />
        <Route exact component={ Pages.Details } path="/bebidas/:id" />
        <Route exact component={ Pages.ProgressFood } path="/comidas/:id/in-progress" />
        <Route exact component={ Pages.ProgressDrink } path="/bebidas/:id/in-progress" />
        <Route exact component={ Pages.Explore } path="/explorar" />
        <Route exact component={ Pages.ExploreFoods } path="/explorar/comidas" />
        <Route exact component={ Pages.ExploreDrinks } path="/explorar/bebidas" />
        <Route
          exact
          component={ Pages.ExploreIngredientsFoods }
          path="/explorar/comidas/ingredientes"
        />
        <Route
          exact
          component={ Pages.ExploreIngredientsDrinks }
          path="/explorar/bebidas/ingredientes"
        />
        <Route exact component={ Pages.ExploreAreas } path="/explorar/comidas/area" />
        <Route exact component={ Pages.Profile } path="/perfil" />
        <Route exact component={ Pages.Made } path="/receitas-feitas" />
        <Route exact component={ Pages.Favorites } path="/receitas-favoritas" />
      </Switch>
    </Provider>
  );
}

export default App;
