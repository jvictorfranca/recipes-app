import React from 'react';

import propTypes from 'prop-types';

function HeaderRadioButton({ value, onChange, text, dataTest, className }) {
  return (
    <label htmlFor={ text } className={ className }>
      {text}
      <input
        id={ text }
        type="radio"
        checked={ value }
        className={ className }
        name="radioSearch"
        data-testid={ dataTest }
        onChange={ onChange }
      />
    </label>
  );
}

HeaderRadioButton.propTypes = {
  value: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
  text: propTypes.string.isRequired,
  dataTest: propTypes.string.isRequired,
  className: propTypes.string.isRequired,
};

export default HeaderRadioButton;
