import { calculateDeadlineDHMTime } from '@utils/post/calculateDeadlineDHMTime';

describe('calculateDeadlineTime 함수를 이용해서 시작시간과 마감시간으로 몇일, 몇시간, 몇분을 설정했는지 구한다.', () => {
  test('시작 시간: 2023-07-12 12:40, 마감 시간: 2023-07-13 12:40 일 때 하루를 반환한다.', () => {
    const createdAt = '2023-07-12 12:40';
    const deadline = '2023-07-13 12:40';

    const result = calculateDeadlineDHMTime(createdAt, deadline);

    expect(result).toEqual({
      day: 1,
      hour: 0,
      minute: 0,
    });
  });

  test('시작 시간: 2023-07-12 12:40, 마감 시간: 2023-07-13 18:40 일 때 1일 6시간을 반환한다.', () => {
    const createdAt = '2023-07-12 12:40';
    const deadline = '2023-07-13 18:40';

    const result = calculateDeadlineDHMTime(createdAt, deadline);

    expect(result).toEqual({
      day: 1,
      hour: 6,
      minute: 0,
    });
  });

  test('시작 시간: 2023-07-12 12:40, 마감 시간: 2023-07-13 18:20 일 때 1일 5시간 40분을 반환한다.', () => {
    const createdAt = '2023-07-12 12:40';
    const deadline = '2023-07-13 18:20';

    const result = calculateDeadlineDHMTime(createdAt, deadline);

    expect(result).toEqual({
      day: 1,
      hour: 5,
      minute: 40,
    });
  });

  test('시작 시간: 2023-07-12 12:40, 마감 시간: 2023-07-12 12:50 일 때 10분을 반환한다.', () => {
    const createdAt = '2023-07-12 12:40';
    const deadline = '2023-07-12 12:50';

    const result = calculateDeadlineDHMTime(createdAt, deadline);

    expect(result).toEqual({
      day: 0,
      hour: 0,
      minute: 10,
    });
  });

  test('시작 시간: 2023-07-12 00:00, 마감 시간: 2023-07-14 23:59 일 때 2일 23시간 59분을 반환한다.', () => {
    const createdAt = '2023-07-12 00:00';
    const deadline = '2023-07-14 23:59';

    const result = calculateDeadlineDHMTime(createdAt, deadline);

    expect(result).toEqual({
      day: 2,
      hour: 23,
      minute: 59,
    });
  });

  test('시작 시간이 undefined, 마감 시간: 2023-07-14 23:59 일 때 0일 0시간 0분을 반환한다.', () => {
    const createdAt = undefined;
    const deadline = '2023-07-14 23:59';

    const result = calculateDeadlineDHMTime(createdAt, deadline);

    expect(result).toEqual({
      day: 0,
      hour: 0,
      minute: 0,
    });
  });

  test('시작 시간이 2023-07-14 23:59, 마감 시간: undefined 일 때 0일 0시간 0분을 반환한다.', () => {
    const createdAt = '2023-07-14 23:59';
    const deadline = undefined;

    const result = calculateDeadlineDHMTime(createdAt, deadline);

    expect(result).toEqual({
      day: 0,
      hour: 0,
      minute: 0,
    });
  });
});
