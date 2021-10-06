import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';

import App from '../App';

import fetch from '../../cypress/mocks/fetch';

describe(('testes para a pagina Foods'), () => {
  const mockedFetch = jest.spyOn(global, 'fetch').mockImplementation(fetch);
  it(('Testa se as comidas aparecem na tela'), async () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    history.push('/comidas');
    const firstCard = await screen.findByRole('heading', {
      level: 2,
      name: 'Corba',
    });
    expect(firstCard).toBeInTheDocument();
    expect(mockedFetch).toBeCalled();
    expect(mockedFetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});
