import { convertTextToUrl } from '@utils/post/convertTextToUrl';

test.each([
  ['www.naver.com 이걸 어째', '[[www.naver.com]] 이걸 어째'],
  [
    '반갑다 https://github.com/woowacourse-teams/2023-votogether/issues/703    임',
    '반갑다 [[https://github.com/woowacourse-teams/2023-votogether/issues/703]]    임',
  ],
  ['안녕 wwwww.naver.com', '안녕 ww[[www.naver.com]]'],
  ['하하 [www.naver.com]', '하하 [[[www.naver.com]]]'],
  ['http://localhost:3000/ 피카츄', '[[http://localhost:3000/]] 피카츄'],
  [
    'http://localhost:3000/http://localhost:3000/ 피카츄',
    '[[http://localhost:3000/http://localhost:3000/]] 피카츄',
  ],
  ['www.naver.com', '[[www.naver.com]]'],
  ['[[www.naver.com]] www.naver.com', '[[www.naver.com]] [[www.naver.com]]'],
  [
    '[[http://localhost:3000/]] http://localhost:3000/',
    '[[http://localhost:3000/]] [[http://localhost:3000/]]',
  ],
  [
    '[[https://votogether.com/ranking]] https://www.naver.com/',
    '[[https://votogether.com/ranking]] [[https://www.naver.com/]]',
  ],
  [
    'www.naver.com www.naver.com www.naver.com https://www.npmjs.com/package/dotenv-webpack',
    '[[www.naver.com]] [[www.naver.com]] [[www.naver.com]] [[https://www.npmjs.com/package/dotenv-webpack]]',
  ],
])(
  'convertTextToUrl 함수에서 링크가 포함된 문자를 입력했을 때 문자에서 링크는 [[]]로 감싸서 반환한다.',
  (word, expectedWord) => {
    const result = convertTextToUrl(word);

    expect(result).toBe(expectedWord);
  }
);
