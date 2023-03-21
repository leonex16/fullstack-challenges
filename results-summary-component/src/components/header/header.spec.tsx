import { test, expect } from 'vitest';
import { createDOM } from '@builder.io/qwik/testing';
import { Header } from './header';

test('renders header with correct text', async () => {
  const { screen, render } = await createDOM();
  await render(<Header />);
  const title = screen.querySelector('.header__title-text') as HTMLElement;
  const score = screen.querySelector('.header__result-score') as HTMLElement;
  const outOf = screen.querySelector('.header__result-outof') as HTMLElement;
  const desc = screen.querySelector('.header__desc-content-text') as HTMLElement;
  
  expect(title.textContent).toBe('Your Result');
  expect(score.textContent).toBe('76');
  expect(outOf.textContent).toBe('of 100');
  expect(desc.textContent).toBe('Your scored higher than 65% of the people who have taken these tests.');
});
