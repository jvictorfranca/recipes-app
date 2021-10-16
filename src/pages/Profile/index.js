import React from 'react';
import propTypes from 'prop-types';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import './styles.css';

function Profile({ history }) {
  let answer;
  if (localStorage.user) {
    const { email } = JSON.parse(localStorage.user);
    answer = email;
  } else {
    answer = 'anonimo';
  }

  return (
    <main className="profile">
      <Header title="Perfil" />
      <h3 data-testid="profile-email" className="profile-email">{answer}</h3>
      <div className="profile-buttons-container">
        <div>
          <button
            type="button"
            className="recipes-buttons"
            data-testid="profile-done-btn"
            onClick={ () => {
              history.push('/receitas-feitas');
            } }
          >
            Receitas Feitas
          </button>
          <button
            className="recipes-buttons"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => {
              history.push('/receitas-favoritas');
            } }
          >
            Receitas Favoritas
          </button>
        </div>
        <button
<<<<<<< HEAD
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => {
            history.push('/receitas-feitas');
          } }
          className="selecting-button"
        >
          Receitas Feitas

        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => {
            history.push('/receitas-favoritas');
          } }
          className="selecting-button"
        >
          Receitas Favoritas

        </button>
        <button
=======
          className="recipes-buttons"
>>>>>>> 190c7b5b6ace6754776bfa88032e1e49b9d84e80
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
          className="selecting-button"
        >
          Sair
        </button>
      </div>
      <Footer />
    </main>
  );
}

Profile.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Profile;
