import type { Preview } from '@storybook/react';

import { GlobalStyle } from '../src/styles/globalStyle';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

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
    Story => (
      <BrowserRouter>
        <GlobalStyle />
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default preview;
