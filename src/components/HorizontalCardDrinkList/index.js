import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Copy from 'clipboard-copy';

import RemoveFavorite from './helper';

import WhiteHeart from '../../images/whiteHeartIcon.svg';
import BlackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

import './styles.css';

function HorizontalCardDrinkList({ recipe, index, isFavorite, setFavoriteFoods }) {
  const { image, category, name, doneDate: date, id, type, tags } = recipe;

  const [showMessage, setShowmessage] = useState(false);
  const [favorite, setFavorite] = useState(true);

  const handleClick = () => {
    const link = `http://${window.location.href.split('/')[2]}/${type}s/${id}`;
    Copy(link);
    setShowmessage(true);
  };

  const handleFavorite = () => {
    RemoveFavorite(recipe, type, isFavorite);
    setFavorite(!favorite);
    setFavoriteFoods(JSON.parse(localStorage.favoriteRecipes));
  };

  return (
    <section className="done-card" data-testid={ `${index}-recipe-card` }>
      <Link to={ `/${type}s/${id}` }>
        <h2 data-testid={ `${index}-card-name` }>{name}</h2>
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <img src={ image } alt="recipe" data-testid={ `${index}-card-img` } />
      </Link>
      {category && <p data-testid={ `${index}-card-top-text` }>{ `${category}`}</p>}
      {date && <p data-testid={ `${index}-card-done-date` }>{date}</p>}
      {/* <button
        type="button"
        onClick={ handleClick }
        data-testid={ `${index}-card-share-btn` }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="" />
      </button>
      {showMessage && <p>Link copiado!</p>}
      {tags && tags.map((tag, tagIndex) => (
        <p
          key={ tagIndex }
          data-testid={ `${index}-${tag}-card-tag` }
        >
          {tag}
        </p>))}
      {
        isFavorite && <input
          type="image"
          src={ favorite ? BlackHeart : WhiteHeart }
          data-testid={ `${index}-card-favorite-btn` }
          alt="Favorite"
          onClick={ handleFavorite }
        />
      } */}
    </section>
  );
}

HorizontalCardDrinkList.propTypes = {
  recipe: propTypes.shape({
    image: propTypes.string,
    category: propTypes.string,
    name: propTypes.string,
    doneDate: propTypes.string,
    type: propTypes.string,
    id: propTypes.string,
    tags: propTypes.arrayOf(propTypes.string),
    area: propTypes.string,
  }).isRequired,
  index: propTypes.number.isRequired,
  isFavorite: propTypes.bool,
  setFavoriteFoods: propTypes.func,
};

HorizontalCardDrinkList.defaultProps = {
  isFavorite: false,
  setFavoriteFoods: () => {},
};

export default HorizontalCardDrinkList;
