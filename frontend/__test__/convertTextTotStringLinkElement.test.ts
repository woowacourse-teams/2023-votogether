import { convertTextTotStringLinkElement } from '@utils/post/convertTextTotStringLinkElement';

describe('text를 입력받아 링크가 있다면 span의 링크 스타일을 준 html을 반환한다.', () => {
  test('링크가 포함된 text가 있다면 span이 포함되어 반환된다.', () => {
    const word = 'www.naver.com 이걸 어째';
    const expectedWord = '<a>www.naver.com</a> 이걸 어째';

    const result = convertTextTotStringLinkElement(word);

    expect(result).toBe(expectedWord);
  });
});
