import { deleteOverlappingNewLine } from '@utils/deleteOverlappingNewLine';

describe('연속된 개행은 하나의 개행으로 처리하는 유틸함수를 테스트한다.', () => {
  test('개행이 없는 문자열은 인자와 동일한 결과를 반환한다.', () => {
    const text =
      '안녕하세요. 이것은 유틸함수를 테스트하기 위한 문자열입니다. 동일한 결과물이 나와야 옳은 작동을 하는 유틸함수 입니다.';
    const changedText = deleteOverlappingNewLine(text);

    expect(changedText).toBe(text);
  });

  test('연속된 개행이 없는 문자열은 인자와 동일한 결과를 반환한다.', () => {
    const text =
      '안녕하세요. 이것은 유틸함수를 테스트하기 위한 문자열입니다.\n동일한 결과물이 나와야 옳은 작동을 하는 유틸함수 입니다.';
    const changedText = deleteOverlappingNewLine(text);

    expect(changedText).toBe(text);
  });

  test('2회 연속된 개행이 있는 문자열은 인자와 동일한 결과를 반환한다.', () => {
    const text =
      '안녕하세요. 이것은 유틸함수를 테스트하기 위한 문자열입니다.\n\n동일한 결과물이 나와야 옳은 작동을 하는 유틸함수 입니다.';
    const expectText =
      '안녕하세요. 이것은 유틸함수를 테스트하기 위한 문자열입니다.\n\n동일한 결과물이 나와야 옳은 작동을 하는 유틸함수 입니다.';
    const changedText = deleteOverlappingNewLine(text);

    expect(changedText).toBe(expectText);
  });

  test('5회 연속된 개행이 있는 문자열은 인자와 연속된 개행이 5회 개행으로 바뀐 결과를 반환한다.', () => {
    const text =
      '안녕하세요. 이것은 유틸함수를 테스트하기 위한 문자열입니다.\n\n\n\n\n동일한 결과물이 나와야 옳은 작동을 하는 유틸함수 입니다.';
    const expectText =
      '안녕하세요. 이것은 유틸함수를 테스트하기 위한 문자열입니다.\n\n\n\n\n동일한 결과물이 나와야 옳은 작동을 하는 유틸함수 입니다.';
    const changedText = deleteOverlappingNewLine(text);

    expect(changedText).toBe(expectText);
  });

  test('7회 연속된 개행이 있는 문자열은 인자와 연속된 개행이 5회 개행으로 바뀐 결과를 반환한다.', () => {
    const text =
      '안녕하세요. 이것은 유틸함수를 테스트하기 위한 문자열입니다.\n\n\n\n\n\n\n동일한 결과물이 나와야 옳은 작동을 하는 유틸함수 입니다.';
    const expectText =
      '안녕하세요. 이것은 유틸함수를 테스트하기 위한 문자열입니다.\n\n\n\n\n동일한 결과물이 나와야 옳은 작동을 하는 유틸함수 입니다.';
    const changedText = deleteOverlappingNewLine(text);

    expect(changedText).toBe(expectText);
  });

  test('10회 연속된 개행이 있는 문자열은 인자와 연속된 개행이 5회 개행으로 바뀐 결과를 반환한다.', () => {
    const text =
      '안녕하세요. 이것은 유틸함수를 테스트하기 위한 문자열입니다.\n\n\n\n\n\n\n\n\n\n동일한 결과물이 나와야 옳은 작동을 하는 유틸함수 입니다.';
    const expectText =
      '안녕하세요. 이것은 유틸함수를 테스트하기 위한 문자열입니다.\n\n\n\n\n동일한 결과물이 나와야 옳은 작동을 하는 유틸함수 입니다.';
    const changedText = deleteOverlappingNewLine(text);

    expect(changedText).toBe(expectText);
  });
});
