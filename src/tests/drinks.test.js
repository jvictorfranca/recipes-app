import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';

import App from '../App';

import fetch from '../../cypress/mocks/fetch';

describe(('testes para a pagina Foods'), () => {
  const mockedFetch = jest.spyOn(global, 'fetch').mockImplementation(fetch);
  it(('Testa se as bebidas aparecem na tela'), async () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    history.push('/bebidas');
    const firstCard = await screen.findByRole('heading', {
      level: 2,
      name: 'GG',
    });
    expect(firstCard).toBeInTheDocument();
    expect(mockedFetch).toBeCalled();
    expect(mockedFetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
  it(('Testa o header da página foods'), async () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    history.push('/bebidas');
    const headerButton = await screen.findByTestId('search-top-btn');
    expect(headerButton).toBeInTheDocument();
    // expect(await screen.findByRole('form')).not.toBeInTheDocument();
    fireEvent.click(headerButton);
    const formHeader = await screen.findAllByRole('radio');
    formHeader.forEach((radio) => expect(radio).toBeInTheDocument());
    const nameRadio = await screen.findByRole('radio', {
      name: 'Nome',
    });
    fireEvent.click(nameRadio);
    const headerSearchBar = await screen.findByTestId('search-input');
    expect(headerSearchBar.value).toBe('');
    await act(async () => {
      fireEvent.change(headerSearchBar, { target: { value: 'gin' } });
      const buttonSearch = await screen.getByTestId('exec-search-btn');
      fireEvent.click(buttonSearch);
    });

    expect(mockedFetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');

    const headerSearchCard = await screen.getByText('Gin Fizz');
    expect(headerSearchCard).toBeInTheDocument();
  });
});
