import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '@pages/Home';

import Example from '@components/Example';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
    <Home />
  </QueryClientProvider>
);

export default App;
