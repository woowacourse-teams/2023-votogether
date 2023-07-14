import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '@pages/Home';

import router from '@routes/router';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} >
      <Example />
      <Home />
    </RouterProvider>
  </QueryClientProvider>
);

export default App;
