import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Copy from 'clipboard-copy';

import RemoveFavorite from './helper';

import WhiteHeart from '../../images/whiteHeartIcon.svg';
import BlackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

import './styles.css';

function HorizontalCardDrink({ recipe, index, isFavorite, setFavoriteFoods }) {
  const { image, category, name, alcoholicOrNot, date, type, id, tags } = recipe;

  const [showMessage, setShowmessage] = useState(false);
  const [favorite, setFavorite] = useState(true);

  const handleClick = () => {
    const link = `http://${window.location.href.split('/')[2]}/${type}s/${id}`;
    Copy(link);
    console.log(window.location.href.split('/'));

    setShowmessage(true);
  };

  const handleFavorite = () => {
    RemoveFavorite(recipe, type, isFavorite);
    setFavorite(!favorite);
    setFavoriteFoods(JSON.parse(localStorage.favoriteRecipes));
  };

  return (
    <section className="done-card">
      <Link to={ `/${type}s/${id}` }>
        <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt="recipe"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{date}</p>
      <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
      <button
        type="button"
        onClick={ handleClick }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="" />
      </button>
      {showMessage && <p>Link copiado!</p>}
      {tags && tags.map((tag, tagIndex) => (
        <p
          key={ tagIndex }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </p>))}
      {
        isFavorite && <input
          type="image"
          src={ favorite ? BlackHeart : WhiteHeart }
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="Favorite"
          onClick={ handleFavorite }
        />
      }
    </section>
  );
}

HorizontalCardDrink.propTypes = {
  recipe: propTypes.shape({
    image: propTypes.string,
    category: propTypes.string,
    name: propTypes.string,
    date: propTypes.string,
    type: propTypes.string,
    id: propTypes.string,
    tags: propTypes.arrayOf(propTypes.string),
    alcoholicOrNot: propTypes.string,

  }).isRequired,
  index: propTypes.number.isRequired,
  isFavorite: propTypes.bool,
  setFavoriteFoods: propTypes.func,
};

HorizontalCardDrink.defaultProps = {
  isFavorite: false,
  setFavoriteFoods: () => {},
};

export default HorizontalCardDrink;
