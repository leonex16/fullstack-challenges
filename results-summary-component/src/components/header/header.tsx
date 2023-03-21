import { component$ } from '@builder.io/qwik';
import './header.css';

export const Header = component$(() => {
  return (
    <section class='header'>
      <header class='header__title'>
        <h4 class='header__title-text'>Your Result</h4>
      </header>
      <div class='header__result'>
        <h1 class='header__result-score'>76</h1>
        <span class='header__result-outof'>of 100</span>
      </div>
      <footer class='header__desc'>
        <header class='header__desc-title'>
          <h3 class='header__desc-title-text'>Great</h3>
        </header>
        <div class='header__desc-content'>
          <p class='header__desc-content-text'>Your scored higher than 65% of the people who have taken these tests.</p>
        </div>
      </footer>
    </section>
  )
});