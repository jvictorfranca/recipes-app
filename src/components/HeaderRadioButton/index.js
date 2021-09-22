import React from 'react';

import propTypes from 'prop-types';

function HeaderRadioButton({ value, onChange, text, dataTest }) {
  return (
    <label htmlFor={ text }>
      {text}
      <input
        id={ text }
        type="radio"
        checked={ value }
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
};

export default HeaderRadioButton;
