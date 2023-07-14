import type { Preview } from '@storybook/react';

import { initialize, mswDecorator } from 'msw-storybook-addon';

import { GlobalStyle } from '../src/styles/globalStyle';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    mswDecorator,
    Story => (
      <>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Story />
        </QueryClientProvider>
      </>
    ),
  ],
};

if (typeof global.process === 'undefined') {
  const { worker } = require('../src/mocks/worker');
  worker.start();
}

export default preview;
