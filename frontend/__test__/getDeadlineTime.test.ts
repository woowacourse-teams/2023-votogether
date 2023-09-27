import { getDeadlineMessage } from '@utils/post/getDeadlineMessage';

describe('getDeadlineTime를 이용하여 사용자에게 마감 시간을 알려준다.', () => {
  test('5분을 설정했을 때 5분으로 표시된다', () => {
    const result = getDeadlineMessage({
      day: 0,
      hour: 0,
      minute: 5,
    });

    expect(result).toBe('5분 후에 마감됩니다.');
  });

  test('1시간 5분을 설정했을 때 1시간 5분으로 표시된다', () => {
    const result = getDeadlineMessage({
      day: 0,
      hour: 1,
      minute: 5,
    });

    expect(result).toBe('1시간 5분 후에 마감됩니다.');
  });

  test('2일 23시간 59분을 설정했을 때 2일 23시간 59분으로 표시된다', () => {
    const result = getDeadlineMessage({
      day: 2,
      hour: 23,
      minute: 59,
    });

    expect(result).toBe('2일 23시간 59분 후에 마감됩니다.');
  });

  test('0일 0시간 0분을 설정했을 때 "마감 시간을 선택해주세요"를 표시된다', () => {
    const result = getDeadlineMessage({
      day: 0,
      hour: 0,
      minute: 0,
    });

    expect(result).toBe('마감 시간을 선택해주세요');
  });

  test('-1일 -1시간 -1분을 설정했을 때 "마감 시간을 다시 설정해주세요"를 표시된다', () => {
    const result = getDeadlineMessage({
      day: -1,
      hour: -1,
      minute: -1,
    });

    expect(result).toBe('마감 시간을 다시 설정해주세요');
  });
});
