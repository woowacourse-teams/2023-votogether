import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '@hooks/context/auth';

import router from '@routes/router';

import { GlobalStyle } from '@styles/globalStyle';
import { theme } from '@styles/theme';

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
