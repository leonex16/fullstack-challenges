import { test, expect } from 'vitest';
import { createDOM } from '@builder.io/qwik/testing';
import { Summary } from './summary';

const data = [
  { category: 'Category 1', score: 80, icon: 'icon1.png' },
  { category: 'Category 2', score: 60, icon: 'icon2.png' },
  { category: 'Category 3', score: 40, icon: 'icon3.png' },
];

test('renders summary with correct classes', async () => {
  const { render, screen } = await createDOM();
  await render(<Summary data={data} />);
  
  expect(screen.querySelector('.summary__header')?.classList.contains('summary__header')).toBe(true);
  expect(screen.querySelector('.summary__title')?.classList.contains('summary__title')).toBe(true);
  expect(screen.querySelector('.summary__content')?.classList.contains('summary__content')).toBe(true);
  expect(screen.querySelectorAll('.summary__section').length).toBe(data.length);
  expect(screen.querySelector('.summary__footer')?.classList.contains('summary__footer')).toBe(true);
  expect(screen.querySelector('.summary__button')?.classList.contains('summary__button')).toBe(true);
});

test('renders correct category, score, and icon for each summary item', async () => {
  const { render, screen } = await createDOM();
  await render(<Summary data={data} />);

  Array.from(screen.querySelectorAll('.summary__section')).forEach((section, index) => {
    const summary = data[index];
    const icon = section.querySelector('.summary__icon') as HTMLElement;
    const text = section.querySelector('.summary__text') as HTMLElement;
    const score = section.querySelector('.summary__score') as HTMLElement;
console.log(icon.getAttribute('style'), 'icon')
    expect(section.classList.contains('summary__section')).toBe(true);
    expect(section.getAttribute('data-category')).toBe(summary.category);

    expect(icon.classList.contains('summary__icon')).toBe(true);
    expect(icon.getAttribute('style')).toBe(`--summary-icon:url(${summary.icon})`);

    expect(text.classList.contains('summary__text')).toBe(true);
    expect(text.textContent).toBe(summary.category);

    expect(score.classList.contains('summary__score')).toBe(true);
    expect(score.textContent).toBe(summary.score.toString());
  });
});
