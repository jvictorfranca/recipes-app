import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const PASSWORD_MINIMUM_LENGHT = 6;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { email } = user;

    localStorage.mealsToken = 1;
    localStorage.cocktailsToken = 1;
    localStorage.user = JSON.stringify({ email });
    history.push('/comidas');
  };

  const canBeSubmitted = () => {
    const { email, password } = user;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(validEmail) && password.length > PASSWORD_MINIMUM_LENGHT) {
      return true;
    }
  };

  return (
    <>
      <label htmlFor="email-input">
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="Insira seu e-mail"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="insira sua senha"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
        disabled={ !canBeSubmitted() }
      >
        Entrar
      </button>
    </>
  );
}

export default Login;
