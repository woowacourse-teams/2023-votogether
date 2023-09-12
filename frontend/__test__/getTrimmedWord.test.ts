import { getTrimmedWord } from '@utils/getTrimmedWord';

test.each([
  ['검색어       입니다', '검색어 입니다'],
  ['    완전히     갤럭시    임  ', '완전히 갤럭시 임'],
  ['   ', ''],
  ['', ''],
])(
  'getTrimmedWord 함수에서 단어를 입력했을 때 중복된 공백을 제거한 단어를 반환한다.',
  (word, expectedWord) => {
    const result = getTrimmedWord(word);

    expect(result).toBe(expectedWord);
  }
);
