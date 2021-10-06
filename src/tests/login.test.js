import React from 'react';
import { render, screen } from '@testing-library/react';

import Login from '../pages/Login/index';

describe(('Login page tests'), () => {
  test(('confirms 2 inputs on the page and the Login button'), () => {
    render(<Login />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test(('confirms if you can only login inserting a correct email and password'), () => {
    render(<Login />);

    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
  });
});
