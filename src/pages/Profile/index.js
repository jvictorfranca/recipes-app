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
      <p data-testid="profile-email" className="profile-email">{answer}</p>
      <div className="profile-buttons-container">
        <button
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
