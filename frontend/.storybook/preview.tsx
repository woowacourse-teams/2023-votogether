import type { Preview } from '@storybook/react';

import { GlobalStyle } from '../src/styles/globalStyle';
import React from 'react';

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
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
};

export default preview;
