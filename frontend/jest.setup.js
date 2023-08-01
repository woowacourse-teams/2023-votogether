import 'whatwg-fetch';

import dotenv from 'dotenv';
import { setupServer } from 'msw/node';

import { handlers } from './src/mocks/handlers';

dotenv.config({ path: './.env.test' });

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
