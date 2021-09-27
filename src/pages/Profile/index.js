import React from 'react';
import propTypes from 'prop-types';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import './styles.css';

function Profile({ history }) {
  const { email } = JSON.parse(localStorage.user);
  return (
    <main className="profile">
      <Header title="Perfil" />
      <p data-testid="profile-email" className="profile-email">{email}</p>
      <div className="profile-buttons-container">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => {
            history.push('/receitas-feitas');
          } }
        >
          Receitas Feitas

        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => {
            history.push('/receitas-favoritas');
          } }
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
