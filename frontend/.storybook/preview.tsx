import React from 'react';

import type { Preview } from '@storybook/react';

import { initialize, mswDecorator } from 'msw-storybook-addon';

import { GlobalStyle } from '../src/styles/globalStyle';

import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '../../frontend/src/hooks/context/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { handlers } from '../src/mocks/handlers';

const queryClient = new QueryClient();
initialize();

const preview: Preview = {
  parameters: {
    msw: handlers,
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
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GlobalStyle />
          <AuthProvider>
            <Story />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    ),
  ],
};

if (typeof global.process === 'undefined') {
  const { worker } = require('../src/mocks/worker');
  worker.start();
}

export default preview;
