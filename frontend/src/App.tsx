import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '@hooks/context/auth';
import PostOptionProvider from '@hooks/context/postOption';

import router from '@routes/router';

import ErrorBoundaryForTopClass from '@pages/ErrorBoundaryForTopClass';

import ChannelTalk from '@components/ChannelTalk';
import Skeleton from '@components/common/Skeleton';

import { GlobalStyle } from '@styles/globalStyle';
import { theme } from '@styles/theme';

const queryClient = new QueryClient();

ChannelTalk.loadScript();
ChannelTalk.boot({
  pluginKey: process.env.VOTOGETHER_CHANNEL_TALK_KEY,
});

const App = () => (
  <ErrorBoundaryForTopClass>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <PostOptionProvider>
          <AuthProvider>
            <Suspense fallback={<Skeleton isLarge />}>
              <RouterProvider router={router} />
            </Suspense>
          </AuthProvider>
        </PostOptionProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ErrorBoundaryForTopClass>

);

export default App;
