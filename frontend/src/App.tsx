import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '@hooks/context/auth';
import PostOptionProvider from '@hooks/context/postOption';

import router from '@routes/router';

import { GlobalStyle } from '@styles/globalStyle';
import { theme } from '@styles/theme';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PostOptionProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </PostOptionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
