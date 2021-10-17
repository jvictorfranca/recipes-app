import React from 'react';
import hamburgerLoading from './images/ezgif.com-gif-maker (4).gif';
import textLoading from './images/ezgif.com-gif-maker (1).gif';
import hamburgerJumping from './images/ezgif.com-gif-maker (2).gif';

import './loadingStyles.css';

function Loading() {
  return (
    <main className="loading-screen-container">
      <div className="loading-images-container">
        <img
          src={ hamburgerLoading }
          alt="hamburger-loading"
          className="hamburger-loading"
        />
        <img
          src={ textLoading }
          alt="text-loading"
          className="text-loading"
        />
      </div>
      <img
        src={ hamburgerJumping }
        alt="hamburger-jumping"
        className="hamburger-jumping"
      />
    </main>
  );
}
export default Loading;
