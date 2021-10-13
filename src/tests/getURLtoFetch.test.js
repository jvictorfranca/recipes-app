import getURLtoFetch from '../helpers/getURLtoFetch';

describe(('testa a função getURLtoFetch'), () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation();
  test(('testa caso de mais de uma letra'), () => {
    const URL = getURLtoFetch('/comidas', 'radioFirstLetter', 'aa');
    expect(URL).toBe(undefined);
    expect(alertMock).toBeCalledTimes(1);
  });
  test(('testa caso de mais de uma letra bebida'), () => {
    const URL = getURLtoFetch('/bebidas', 'radioFirstLetter', 'aa');
    expect(URL).toBe(undefined);
    expect(alertMock).toBeCalledTimes(2);
  });
  test(('testa caso comidas e nome'), () => {
    const URL = getURLtoFetch('/comidas', 'radioName', 'pie');
    expect(URL).toEqual('https://www.themealdb.com/api/json/v1/1/search.php?s=pie');
  });
  test(('testa caso comidas e ingrediente'), () => {
    const URL = getURLtoFetch('/comidas', 'radioIngredient', 'a');
    expect(URL).toEqual('https://www.themealdb.com/api/json/v1/1/filter.php?i=a');
  });
  test(('testa caso comidas e primeira letra'), () => {
    const URL = getURLtoFetch('/comidas', 'radioFirstLetter', 'a');
    expect(URL).toEqual('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
  test(('testa caso bebidas e nome'), () => {
    const URL = getURLtoFetch('/bebidas', 'radioName', 'chocolateMilk');
    expect(URL).toEqual('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=chocolateMilk');
  });
  test(('testa caso bebidas e ingrediente'), () => {
    const URL = getURLtoFetch('/bebidas', 'radioIngredient', 'milk');
    expect(URL).toEqual('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=milk');
  });
  test(('testa caso bebidas e primeira letra'), () => {
    const URL = getURLtoFetch('/bebidas', 'radioFirstLetter', 'a');
    expect(URL).toEqual('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });
  test(('testa caso bebidas '), () => {
    const URL = getURLtoFetch('/bebidas');
    expect(URL).toEqual(undefined);
  });
  test(('testa caso comidas '), () => {
    const URL = getURLtoFetch('/comidas');
    expect(URL).toEqual(undefined);
  });

  test(('testa caso inputValue'), () => {
    const URL = getURLtoFetch(undefined, undefined, 'a');
    expect(URL).toBe(undefined);
  });
});
