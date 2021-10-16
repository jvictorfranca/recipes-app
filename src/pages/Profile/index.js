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
          className="recipes-buttons"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
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
