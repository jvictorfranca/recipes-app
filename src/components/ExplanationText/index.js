import React from 'react';
import './ExplanationTextStyles.css';

import textImage from '../../images/text.gif';

function ExplanationText() {
  return (
    <section>
      <h1 className="explanation_title">Recipes App</h1>
      <p className="explanation_p">Esta é a aplicação Recipes App. Um site de receitas no idioma Inglês. Produzido por André Pessoa, Diego Demontier, Joao Victor Cristino e Ygor Lage. </p>
      <p className="explanation_p">A aplicação foi feita para mobile, então para melhor testa-la use seu smarthphone. Mesmo assim é possível testa-la em um desktop, basta testar com o emulador de smartphone ao lado. Obrigado e nos dê seu feedback :D</p>
      <img src={ textImage } alt="recipe-taking" className="text-image" />
    </section>
  );
}

export default ExplanationText;
