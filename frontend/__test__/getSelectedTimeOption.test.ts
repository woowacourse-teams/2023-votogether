import { getSelectedDHMTimeOption } from '@utils/post/getSelectedTimeOption';

describe('getSelectedTimeOption 함수에서 day, hour, minute 객체를 입력받아 "1일" | "3일" | "5일" | "7일" | "14일" | "사용자 지정" | null 을 반환한다.', () => {
  test('1일 객체를 입력했을 때 1일을 반환한다.', () => {
    const time = {
      day: 1,
      hour: 0,
      minute: 0,
    };

    const result = getSelectedDHMTimeOption(time);

    expect(result).toBe('1일');
  });

  test('3일 객체를 입력했을 때 3일을 반환한다.', () => {
    const time = {
      day: 3,
      hour: 0,
      minute: 0,
    };

    const result = getSelectedDHMTimeOption(time);

    expect(result).toBe('3일');
  });

  test('5일 객체를 입력했을 때 5일을 반환한다.', () => {
    const time = {
      day: 5,
      hour: 0,
      minute: 0,
    };

    const result = getSelectedDHMTimeOption(time);

    expect(result).toBe('5일');
  });

  test('7일 객체를 입력했을 때 7일을 반환한다.', () => {
    const time = {
      day: 7,
      hour: 0,
      minute: 0,
    };

    const result = getSelectedDHMTimeOption(time);

    expect(result).toBe('7일');
  });

  test('14일 객체를 입력했을 때 14일을 반환한다.', () => {
    const time = {
      day: 14,
      hour: 0,
      minute: 0,
    };

    const result = getSelectedDHMTimeOption(time);

    expect(result).toBe('14일');
  });

  test('2일 객체를 입력했을 때 사용자지정을 반환한다.', () => {
    const time = {
      day: 2,
      hour: 0,
      minute: 0,
    };

    const result = getSelectedDHMTimeOption(time);

    expect(result).toBe('사용자지정');
  });

  test('3분 객체를 입력했을 때 사용자지정을 반환한다.', () => {
    const time = {
      day: 0,
      hour: 0,
      minute: 3,
    };

    const result = getSelectedDHMTimeOption(time);

    expect(result).toBe('사용자지정');
  });

  test('0일 0시간 0분 객체를 입력했을 때 null을 반환한다.', () => {
    const time = {
      day: 0,
      hour: 0,
      minute: 0,
    };

    const result = getSelectedDHMTimeOption(time);

    expect(result).toBe(null);
  });
});
