import { getPathFragment } from '@utils/getPathFragment';

describe('getPathFragment 사용했을 때 path의 값만 나오도록 한다.', () => {
  test('/posts/category/12인 경우, /posts/category를 반환한다.', () => {
    const result = getPathFragment('/posts/category/12');

    expect(result).toBe('/posts/category');
  });

  test('/인 경우, /를 반환한다.', () => {
    const result = getPathFragment('/');

    expect(result).toBe('/');
  });

  test('/users/posts인 경우, /users/posts를 반환한다.', () => {
    const result = getPathFragment('/users/posts');

    expect(result).toBe('/users/posts');
  });
});
