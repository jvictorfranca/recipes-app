import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

function Login() {
  const history = useHistory();
  const PASSWORD_MINIMUM_LENGHT = 6;

  const [user, setUser] = useState({
    email: 'exampleuser@example.com',
    password: 'thatsAgoodPassword',
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
    <div className="container-login">
      <img className="login-img" src="https://yt3.ggpht.com/ytc/AKedOLT_0KTDhZEuw3jfp_7Y2RPy_zG7sp5ly3RdlYTk=s900-c-k-c0x00ffffff-no-rj" />
      <div className="login">
      <label htmlFor="email-input">
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="Insira seu e-mail"
          onChange={ handleChange }
          value={user.email}
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="insira sua senha"
          onChange={ handleChange }
          value={user.password}
        />
      </label>
      <button
        className="btn-login"
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
        disabled={ !canBeSubmitted() }
      >
        Entrar
      </button>
      </div>
    </div>
  );
}

export default Login;
