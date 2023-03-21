import { component$, useResource$, Resource } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { Header } from '~/components/header/header';
import { Summary } from '~/components/summary/summary';

import './index.css';

const getSummary = async () => {
  const { default: data } = await import('../../public/data.json');
  return data;
}

export default component$(() => {
  const summaryResource = useResource$(() => getSummary());
  return (
    <main>
      <Resource
        value={summaryResource}
        onResolved={(data) => (
        <div class='container'>
          <Header />
          <Summary data={data} />
        </div>)}
      />
    </main>
  );
});

export const head: DocumentHead = {
  title: 'Summary',
  meta: [
    {
      name: 'description',
      content: 'Results Summary',
    },
  ],
};
