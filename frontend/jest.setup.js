import 'whatwg-fetch';

import dotenv from 'dotenv';
import { setupServer } from 'msw/node';

import { handlers } from './src/mocks/handlers';

dotenv.config({ path: './.env.test' });

/**
 * 이 코드가 없다면 jest에서 upload-images-converter 패키지에 관한 에러가 발생합니다.
 * 
 *    SyntaxError: Unexpected token 'export'

    > 1 | import { imageConverter } from 'upload-images-converter';
    
    https://github.com/nrwl/nx/issues/7844#issuecomment-1220559108
 */
jest.mock('upload-images-converter', () => ({
  __esModule: true,
}));

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
