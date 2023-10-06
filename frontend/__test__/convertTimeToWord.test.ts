import { convertTimeToWord } from '@utils/time/convertTimeToWord';

describe('게시글 작성시간을 숫자 문자열로 받아 현재 시간과 비교해 반올림한 차이를 한글로 반환하는 유틸함수를 테스트한다.', () => {
  test('2023-01-01 12:00에 작성한 글은 2023-01-01 12:05을 기준으로 "5분"이 반환된다.', () => {
    const nowDate = new Date('2023-01-01 12:05');
    const result = convertTimeToWord('2023-01-01 12:00', nowDate);

    expect(result).toBe('5분 전 작성');
  });

  test('2023-01-01 12:00에 작성한 글은 2023-01-01 20:10을 기준으로 "8시간"이 반환된다.', () => {
    const nowDate = new Date('2023-01-01 20:10');
    const result = convertTimeToWord('2023-01-01 12:00', nowDate);

    expect(result).toBe('8시간 전 작성');
  });

  test('2023-01-01 12:00에 작성한 글은 2023-01-02 13:00을 기준으로 "1일"이 반환된다.', () => {
    const nowDate = new Date('2023-01-02 13:00');
    const result = convertTimeToWord('2023-01-01 12:00', nowDate);

    expect(result).toBe('1일 전 작성');
  });

  test('2023-01-01 12:00에 작성한 글은 2023-01-12 13:00을 기준으로 "11일"이 반환된다.', () => {
    const nowDate = new Date('2023-01-12 13:00');
    const result = convertTimeToWord('2023-01-01 12:00', nowDate);

    expect(result).toBe('11일 전 작성');
  });

  test('작성된지 30일 이상이라면 작성 날짜를 반환한다.', () => {
    const nowDate = new Date('2023-02-01 13:00');
    const result = convertTimeToWord('2023-01-01 12:00', nowDate);

    expect(result).toBe('2023-01-01');
  });
});

describe('게시글 마감시간을 숫자 문자열로 받아 현재 시간과 비교해 반올림한 차이를 한글로 반환하는 유틸함수를 테스트한다.', () => {
  test('2023-01-01 12:00 기준으로 2023-01-01 12:10가 마감인 경우 "10분 후 마감"이 반환된다.', () => {
    const nowDate = new Date('2023-01-01 12:00');
    const result = convertTimeToWord('2023-01-01 12:10', nowDate);

    expect(result).toBe('10분 후 마감');
  });

  test('2023-01-01 12:00 기준으로 2023-01-01 18:00가 마감인 경우 "6시간 후 마감"이 반환된다.', () => {
    const nowDate = new Date('2023-01-01 12:00');
    const result = convertTimeToWord('2023-01-01 18:00', nowDate);

    expect(result).toBe('6시간 후 마감');
  });

  test('2023-01-01 12:00 기준으로 2023-01-03 12:00가 마감인 경우 "2일 후 마감"이 반환된다.', () => {
    const nowDate = new Date('2023-01-01 12:00');
    const result = convertTimeToWord('2023-01-03 12:00', nowDate);

    expect(result).toBe('2일 후 마감');
  });
});
