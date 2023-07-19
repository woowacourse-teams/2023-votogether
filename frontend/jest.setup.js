import 'whatwg-fetch';

import { setupServer } from 'msw/node';

import { handlers } from './src/mocks/handlers';

export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
