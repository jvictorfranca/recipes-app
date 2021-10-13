import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';

import App from '../App';

import fetch from '../../cypress/mocks/fetch';

const HEADER_BUTTON_TEXT = 'search-top-btn';
const SEARCH_INPUT_TEXT = 'search-input';
const SEARCH_BUTTON_TEXT = 'exec-search-btn';
const FIRST_LETTER_TEXT = 'Primeira Letra';

describe(('testes para a pagina Foods'), () => {
  const mockedFetch = jest.spyOn(global, 'fetch').mockImplementation(fetch);
  const mockedAlert = jest.spyOn(global, 'alert').mockImplementation(() => {});
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
  it(('Testa o header da página foods'), async () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    history.push('/comidas');
    const headerButton = await screen.findByTestId(HEADER_BUTTON_TEXT);
    expect(headerButton).toBeInTheDocument();
    // expect(await screen.findByRole('form')).not.toBeInTheDocument();
    fireEvent.click(headerButton);
    const formHeader = await screen.findAllByRole('radio');
    formHeader.forEach((radio) => expect(radio).toBeInTheDocument());
    const ingredientRadio = await screen.findByRole('radio', {
      name: 'Ingredientes',
    });
    fireEvent.click(ingredientRadio);
    const headerSearchBar = await screen.findByTestId(SEARCH_INPUT_TEXT);
    expect(headerSearchBar.value).toBe('');
    await act(async () => {
      fireEvent.change(headerSearchBar, { target: { value: 'Chicken' } });
      const buttonSearch = await screen.getByTestId(SEARCH_BUTTON_TEXT);
      fireEvent.click(buttonSearch);
    });

    expect(mockedFetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');

    const headerSearchCard = await screen.getByText('Brown Stew Chicken');
    expect(headerSearchCard).toBeInTheDocument();
  });

  it(('Testa o header da página foods com mais de 12 foods'), async () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    history.push('/comidas');
    const headerButton = await screen.findByTestId(HEADER_BUTTON_TEXT);
    expect(headerButton).toBeInTheDocument();
    // expect(await screen.findByRole('form')).not.toBeInTheDocument();
    fireEvent.click(headerButton);
    const formHeader = await screen.findAllByRole('radio');
    formHeader.forEach((radio) => expect(radio).toBeInTheDocument());
    const ingredientRadio = await screen.findByRole('radio', {
      name: 'Ingredientes',
    });
    const nameRadio = await screen.findByRole('radio', {
      name: 'Nome',
    });
    const radioFirstLetter = await screen.findByRole('radio', {
      name: FIRST_LETTER_TEXT,
    });

    fireEvent.click(radioFirstLetter);
    fireEvent.click(radioFirstLetter);
    fireEvent.click(nameRadio);
    fireEvent.click(nameRadio);
    fireEvent.click(ingredientRadio);
    fireEvent.click(ingredientRadio);

    const headerSearchBar = await screen.findByTestId(SEARCH_INPUT_TEXT);
    expect(headerSearchBar.value).toBe('');
    await act(async () => {
      fireEvent.change(headerSearchBar, { target: { value: 'Chickenitos' } });
      const buttonSearch = await screen.getByTestId(SEARCH_BUTTON_TEXT);
      fireEvent.click(buttonSearch);
    });

    expect(mockedFetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chickenitos');

    const headerSearchCard = await screen.findAllByRole('heading', {
      name: 'Corba',
      level: 2,
    });
    headerSearchCard.forEach((card) => expect(card).toBeInTheDocument());
  });

  it(('Testa o redirecionar da página foods'), async () => {
    const { history } = renderWithRouter(<App />);
    let { pathname } = history.location;
    expect(pathname).toBe('/');
    history.push('/comidas');
    const headerButton = await screen.findByTestId(HEADER_BUTTON_TEXT);
    expect(headerButton).toBeInTheDocument();
    fireEvent.click(headerButton);
    const formHeader = await screen.findAllByRole('radio');
    formHeader.forEach((radio) => expect(radio).toBeInTheDocument());
    const nameRadio = await screen.findByRole('radio', {
      name: 'Nome',
    });
    const radioFirstLetter = await screen.findByRole('radio', {
      name: FIRST_LETTER_TEXT,
    });
    fireEvent.click(radioFirstLetter);
    expect(radioFirstLetter.checked).toBe(true);
    expect(nameRadio.checked).toBe(false);
    fireEvent.click(nameRadio);
    expect(radioFirstLetter.checked).toBe(false);
    expect(nameRadio.checked).toBe(true);
    const headerSearchBar = await screen.findByTestId(SEARCH_INPUT_TEXT);
    expect(headerSearchBar.value).toBe('');
    await act(async () => {
      fireEvent.change(headerSearchBar, { target: { value: 'Arrabiata' } });
      const buttonSearch = await screen.getByTestId(SEARCH_BUTTON_TEXT);
      fireEvent.click(buttonSearch);
    });

    expect(mockedFetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
    pathname = history.location.pathname;
    expect(pathname).toBe('/comidas/52771');
  });

  it(('Testa o redirecionar da página bebidas'), async () => {
    const { history } = renderWithRouter(<App />);
    let { pathname } = history.location;
    expect(pathname).toBe('/');
    history.push('/bebidas');
    const headerButton = await screen.findByTestId(HEADER_BUTTON_TEXT);
    expect(headerButton).toBeInTheDocument();
    fireEvent.click(headerButton);
    const formHeader = await screen.findAllByRole('radio');
    formHeader.forEach((radio) => expect(radio).toBeInTheDocument());
    const nameRadio = await screen.findByRole('radio', {
      name: 'Nome',
    });
    const radioFirstLetter = await screen.findByRole('radio', {
      name: FIRST_LETTER_TEXT,
    });
    fireEvent.click(radioFirstLetter);
    expect(radioFirstLetter.checked).toBe(true);
    expect(nameRadio.checked).toBe(false);
    fireEvent.click(nameRadio);
    expect(radioFirstLetter.checked).toBe(false);
    expect(nameRadio.checked).toBe(true);
    const headerSearchBar = await screen.findByTestId(SEARCH_INPUT_TEXT);
    expect(headerSearchBar.value).toBe('');
    await act(async () => {
      fireEvent.change(headerSearchBar, { target: { value: 'Aquamarine' } });
      const buttonSearch = await screen.getByTestId(SEARCH_BUTTON_TEXT);
      fireEvent.click(buttonSearch);
    });

    expect(mockedFetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');
    pathname = history.location.pathname;
    expect(pathname).toBe('/bebidas/178319');
  });

  it(('Testa nenhuma receita encontrada'), async () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    history.push('/bebidas');
    const headerButton = await screen.findByTestId(HEADER_BUTTON_TEXT);
    expect(headerButton).toBeInTheDocument();
    fireEvent.click(headerButton);
    const nameRadio = await screen.findByRole('radio', {
      name: 'Nome',
    });
    fireEvent.click(nameRadio);
    const headerSearchBar = await screen.findByTestId(SEARCH_INPUT_TEXT);
    expect(headerSearchBar.value).toBe('');
    await act(async () => {
      fireEvent.change(headerSearchBar, { target: { value: 'xablau' } });
      const buttonSearch = await screen.getByTestId(SEARCH_BUTTON_TEXT);
      fireEvent.click(buttonSearch);
    });
    expect(mockedFetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau');
    expect(mockedAlert).toBeCalled();
  });
});
