import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import './styles.css';

function HorizontalCardDrink({ recipe, index, setFavoriteFoods }) {
  const { image, category, name, alcoholicOrNot, date, type, id, tags } = recipe;
  const [showMessage, setShowmessage] = useState(false);

  const handleClick = () => {
    const link = `http://${window.location.href.split('/')[2]}/${type}s/${id}`;
    Copy(link);

    setShowmessage(true);
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

      {/* <p data-testid={ `${index}-${tag}-horizontal-tag` }>{stringTags}</p> */}

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
};

export default HorizontalCardDrink;
