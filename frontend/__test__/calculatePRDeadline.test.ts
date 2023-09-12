describe('calculatePRDeadline 함수를 이용해서 PR 생성시간에 따른 코드리뷰 마감시간이 올바른지 테스트한다.', () => {
  test('PR 생성시간(한국 기준)이 2023-09-04T01:30:55Z (오늘 9월 4일 월요일 새벽 1시 반) 이면 마감시간은 오늘 20시이다.', () => {
    const prCreatedAt = '2023-09-04T01:30:55Z';
    const prReviewDeadline = '9월 4일 20시 00분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-04T11:30:55Z (오늘 9월 4일 월요일 오전 11시 반) 이면 마감시간은 오늘 21시 30분이다.', () => {
    const prCreatedAt = '2023-09-04T11:30:55Z';
    const prReviewDeadline = '9월 4일 21시 30분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-05T01:30:55Z (오늘 9월 5일 화요일 새벽 1시 반) 이면 마감시간은 오늘 20시이다.', () => {
    const prCreatedAt = '2023-09-05T01:30:55Z';
    const prReviewDeadline = '9월 5일 20시 00분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-05T09:30:55Z (오늘 9월 5일 화요일 오전 9시 반) 이면 마감시간은 오늘 20시이다.', () => {
    const prCreatedAt = '2023-09-05T09:30:55Z';
    const prReviewDeadline = '9월 5일 20시 00분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-05T22:30:55Z (오늘 9월 5일 화요일 오후 10시 반) 이면 마감시간은 내일 오후 8시이다.', () => {
    const prCreatedAt = '2023-09-05T22:30:55Z';
    const prReviewDeadline = '9월 6일 20시 00분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-05T11:30:55Z (오늘 9월 5일 화요일 오전 11시 반) 이면 마감시간은 오늘 21시 30분이다.', () => {
    const prCreatedAt = '2023-09-05T11:30:55Z';
    const prReviewDeadline = '9월 5일 21시 30분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-05T13:30:55Z (오늘 9월 5일 화요일 오후 1시 반) 이면 마감시간은 내일 오전 11시 반이다.', () => {
    const prCreatedAt = '2023-09-05T13:30:55Z';
    const prReviewDeadline = '9월 6일 11시 30분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-05T17:30:55Z (오늘 9월 5일 화요일 오후 5시 반) 이면 마감시간은 내일 오후 3시 반이다.', () => {
    const prCreatedAt = '2023-09-05T17:30:55Z';
    const prReviewDeadline = '9월 6일 15시 30분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-08-31T17:30:55Z (오늘 8월 31일 오후 5시 반) 이면 마감시간은 내일 오후 3시 반이다.', () => {
    const prCreatedAt = '2023-08-31T17:30:55Z';
    const prReviewDeadline = '9월 1일 15시 30분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-08-31T17:30:55Z (오늘 8월 31일 목요일 오후 5시 반) 이면 마감시간은 내일 오후 3시 반이다.', () => {
    const prCreatedAt = '2023-08-31T17:30:01Z';
    const prReviewDeadline = '9월 1일 15시 30분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-01T10:30:55Z (오늘 9월 1일 금요일 오전 10시 반) 이면 마감시간은 오늘 오후 8시 반이다.', () => {
    const prCreatedAt = '2023-09-01T10:30:55Z';
    const prReviewDeadline = '9월 1일 20시 30분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-01T17:30:55Z (오늘 9월 1일 금요일 오후 5시 반) 이면 마감시간은 다음주 월요일 오후 3시 반이다.', () => {
    const prCreatedAt = '2023-09-01T17:30:01Z';
    const prReviewDeadline = '9월 4일 15시 30분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-01T22:30:55Z (오늘 9월 1일 금요일 오후 10시 반) 이면 마감시간은 다음주 월요일 오후 8시이다.', () => {
    const prCreatedAt = '2023-09-01T22:30:01Z';
    const prReviewDeadline = '9월 4일 20시 00분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-15T21:30:55Z (오늘 9월 15일 금요일 오후 9시 반) 이면 마감시간은 다음주 월요일 오후 7시 반이다.', () => {
    const prCreatedAt = '2023-09-15T21:30:01Z';
    const prReviewDeadline = '9월 18일 19시 30분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-02T17:30:55Z (오늘 9월 2일 토요일 오후 5시 반) 이면 마감시간은 다음주 월요일 오후 3시 반이다.', () => {
    const prCreatedAt = '2023-09-02T17:30:01Z';
    const prReviewDeadline = '9월 4일 20시 00분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-03T17:30:55Z (오늘 9월 3일 일요일 오후 5시 반) 이면 마감시간은 내일 오후 8시이다.', () => {
    const prCreatedAt = '2023-09-03T17:30:01Z';
    const prReviewDeadline = '9월 4일 20시 00분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-09-30T17:30:55Z (오늘 9월 30일 토요일 오후 5시 반) 이면 마감시간은 다음주 월요일 오후 8시이다.', () => {
    const prCreatedAt = '2023-09-30T17:30:01Z';
    const prReviewDeadline = '10월 2일 20시 00분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });

  test('PR 생성시간(한국 기준)이 2023-10-01T11:30:55Z (오늘 10월 1일 일요일 오전 11시 반) 이면 마감시간은 내일 오후 8시이다.', () => {
    const prCreatedAt = '2023-10-01T11:30:01Z';
    const prReviewDeadline = '10월 2일 20시 00분';

    const result = calculatePRDeadline(prCreatedAt);

    expect(result).toEqual(prReviewDeadline);
  });
});

function calculatePRDeadline(prCreatedAtKST: string) {
  const prCreatedAt = new Date(String(prCreatedAtKST));

  const prCreatedMinute = prCreatedAt.getUTCMinutes();
  const prCreatedHour = prCreatedAt.getUTCHours();
  const prCreatedDate = prCreatedAt.getUTCDate();
  const prCreatedDay = prCreatedAt.getUTCDay();
  const prCreatedMonth = prCreatedAt.getUTCMonth() + 1; // getUTCMonth()는 0부터 시작하므로 1을 더해줍니다.

  const isFridayAfterTenPM = prCreatedDay === 5 && prCreatedHour >= 22; // 금요일 오후 10시 이후 (금요일: 5, 오후 12시: 12)
  const isWeekend = prCreatedDay === 6 || prCreatedDay === 0; // 주말인 경우

  // 주어진 근무시간(월요일 오전 10시~금요일 오후 10시) 내에 올린 pr인지 판별
  const isNotWorkingTime = isFridayAfterTenPM || isWeekend;

  let nextDay = new Date(prCreatedAt);
  nextDay.setUTCDate(prCreatedDate + 1); // 다음 날의 날짜를 설정합니다.

  const nextDayDate = nextDay.getUTCDate();
  const nextDayMonth = nextDay.getUTCMonth() + 1;

  let nextWeekMonday = new Date(prCreatedAt);
  const daysUntilMonday = 8 - prCreatedDay;
  nextWeekMonday.setUTCDate(
    prCreatedDay === 0 ? prCreatedDate + 1 : prCreatedDate + daysUntilMonday
  );
  const nextWeekMondayDate = nextWeekMonday.getUTCDate();
  const nextWeekMondayMonth = nextWeekMonday.getUTCMonth() + 1;

  const isFriday = prCreatedDay === 5;

  if (isNotWorkingTime) {
    return `${nextWeekMondayMonth}월 ${nextWeekMondayDate}일 20시 00분`;
  }

  if (prCreatedHour < 10 && prCreatedHour > 0)
    return `${prCreatedMonth}월 ${prCreatedDate}일 20시 00분`;
  else if (prCreatedHour === 22 || prCreatedHour === 23)
    return `${nextDayMonth}월 ${nextDayDate}일 20시 00분`;
  else if (prCreatedHour >= 12)
    return `${isFriday ? nextWeekMondayMonth : nextDayMonth}월 ${
      isFriday ? nextWeekMondayDate : nextDayDate
    }일 ${prCreatedHour - 2}시 ${prCreatedMinute}분`;
  else return `${prCreatedMonth}월 ${prCreatedDate}일 ${prCreatedHour + 10}시 ${prCreatedMinute}분`;
}
