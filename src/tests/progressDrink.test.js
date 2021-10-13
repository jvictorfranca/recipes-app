import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';

import App from '../App';

import fetch from '../../cypress/mocks/fetch';

const CHECKBOXES_MOCK_LENGTH_NUMBER = 3;

describe(('testes para a pagina Drinks'), () => {
  const mockedFetch = jest.spyOn(global, 'fetch').mockImplementation(fetch);
  it(('Testa o redirecionar da página bebidas'), async () => {
    const { history } = renderWithRouter(<App />);
    let { pathname } = history.location;
    expect(pathname).toBe('/');
    history.push('/bebidas');
    const headerButton = await screen.findByTestId('search-top-btn');
    expect(headerButton).toBeInTheDocument();
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
      fireEvent.change(headerSearchBar, { target: { value: 'Aquamarine' } });
      const buttonSearch = await screen.getByTestId('exec-search-btn');
      fireEvent.click(buttonSearch);
    });

    expect(mockedFetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');
    pathname = history.location.pathname;
    expect(pathname).toBe('/bebidas/178319');

    const startRecipeButton = await screen.findByRole('button', {
      name: 'Iniciar',
    });
    await act(async () => {
      await fireEvent.click(startRecipeButton);
    });

    pathname = history.location.pathname;
    expect(pathname).toBe('/bebidas/178319/in-progress');
    const favoriteButton = await screen.findByTestId('favorite-btn');
    const shareButton = await screen.findByTestId('share-btn');
    const finishButton = await screen.findByTestId('finish-recipe-btn');
    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
    expect(shareButton).toHaveAttribute('src', 'shareIcon.svg');
    expect(finishButton).toHaveAttribute('disabled');
    act(() => {
      fireEvent.click(favoriteButton);
    });
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');
    const allCheckboxes = await screen.findAllByRole('checkbox');
    expect(allCheckboxes.length).toBe(CHECKBOXES_MOCK_LENGTH_NUMBER);
    const clickAllCheckboxes = () => {
      allCheckboxes.forEach(async (checkbox) => {
        await act(async () => {
          await fireEvent.click(checkbox);
        });
      });
    };
    clickAllCheckboxes();
    expect(finishButton).not.toHaveAttribute('disabled');
    clickAllCheckboxes();
  });
});
