import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '@hooks/context/auth';
import PostOptionProvider from '@hooks/context/postOption';

import router from '@routes/router';

import ErrorBoundaryForTopClass from '@pages/ErrorBoundaryForTopClass';

import ChannelTalk from '@components/ChannelTalk';
import GoogleTagManager from '@components/GoogleTagManager';

import { GlobalStyle } from '@styles/globalStyle';
import { theme } from '@styles/theme';

const queryClient = new QueryClient();

ChannelTalk.loadScript();
ChannelTalk.boot({
  pluginKey: process.env.VOTOGETHER_CHANNEL_TALK_KEY,
});

const App = () => (
  <>
    <ErrorBoundaryForTopClass>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <PostOptionProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </PostOptionProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundaryForTopClass>
    <GoogleTagManager gtmId={process.env.VOTOGETHER_GOOGLE_TAG_ID} />
  </>
);

export default App;
