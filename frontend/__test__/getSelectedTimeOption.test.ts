import { getSelectedTimeOption } from '@utils/post/getSelectedTimeOption';

describe('getSelectedTimeOption 함수에서 day, hour, minute 객체를 입력받아 "10분" | "30분" | "1시간" | "6시간" | "1일" | "사용자 지정" | null 을 반환한다.', () => {
  test('10분 객체를 입력했을 때 10분을 반환한다.', () => {
    const time = {
      day: 0,
      hour: 0,
      minute: 10,
    };

    const result = getSelectedTimeOption(time);

    expect(result).toBe('10분');
  });

  test('30분 객체를 입력했을 때 30분을 반환한다.', () => {
    const time = {
      day: 0,
      hour: 0,
      minute: 30,
    };

    const result = getSelectedTimeOption(time);

    expect(result).toBe('30분');
  });

  test('1시간 객체를 입력했을 때 1시간을 반환한다.', () => {
    const time = {
      day: 0,
      hour: 1,
      minute: 0,
    };

    const result = getSelectedTimeOption(time);

    expect(result).toBe('1시간');
  });

  test('6시간 객체를 입력했을 때 6시간을 반환한다.', () => {
    const time = {
      day: 0,
      hour: 6,
      minute: 0,
    };

    const result = getSelectedTimeOption(time);

    expect(result).toBe('6시간');
  });

  test('1일 객체를 입력했을 때 1일을 반환한다.', () => {
    const time = {
      day: 1,
      hour: 0,
      minute: 0,
    };

    const result = getSelectedTimeOption(time);

    expect(result).toBe('1일');
  });

  test('2일 객체를 입력했을 때 사용자지정을 반환한다.', () => {
    const time = {
      day: 2,
      hour: 0,
      minute: 0,
    };

    const result = getSelectedTimeOption(time);

    expect(result).toBe('사용자지정');
  });

  test('3분 객체를 입력했을 때 사용자지정을 반환한다.', () => {
    const time = {
      day: 0,
      hour: 0,
      minute: 3,
    };

    const result = getSelectedTimeOption(time);

    expect(result).toBe('사용자지정');
  });

  test('0일 0시간 0분 객체를 입력했을 때 null을 반환한다.', () => {
    const time = {
      day: 0,
      hour: 0,
      minute: 0,
    };

    const result = getSelectedTimeOption(time);

    expect(result).toBe(null);
  });
});
