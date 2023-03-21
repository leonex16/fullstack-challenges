import { component$ } from '@builder.io/qwik';
import './summary.css';

interface Summary {
  category: string;
  score: number;
  icon: string;
}

interface SummaryProps {
  data: Summary[];
}

export const Summary = component$(({ data }: SummaryProps) => {
  return (
    <article class="summary">
      <header class="summary__header">
        <h2 class="summary__title">Summary</h2>
      </header>

      <div class="summary__content">
        {
          data.map(summary => (
            <section key={summary.category} class="summary__section" data-category={summary.category}>
              <span class="summary__icon" style={{ '--summary-icon': `url(${summary.icon})` }} />
              <span class="summary__text">{summary.category}</span>
              <span class="summary__score">{summary.score}</span>
            </section>
          ))
        }
      </div>

      <footer class="summary__footer">
        <button class="summary__button">Continue</button>
      </footer>
    </article>
  )
})