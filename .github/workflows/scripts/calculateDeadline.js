const prCreatedAtKST = process.env.PR_CREATED_AT_KST;
const prCreatedAt = new Date(String(prCreatedAtKST));

const prCreatedMinute = prCreatedAt.getUTCMinutes();
const prCreatedHour = prCreatedAt.getUTCHours();
const prCreatedDate = prCreatedAt.getUTCDate();
const prCreatedMonth = prCreatedAt.getUTCMonth() + 1; // getUTCMonth()는 0부터 시작하므로 1을 더해줍니다.

let nextDay = new Date(prCreatedAt);
nextDay.setUTCDate(prCreatedDate + 1); // 다음 날의 날짜를 설정합니다.

const nextDayHour = nextDay.getUTCHours();
const nextDayDate = nextDay.getUTCDate();
const nextDayMonth = nextDay.getUTCMonth() + 1;
console.log(nextDayHour, nextDayDate, nextDayMonth);

if (prCreatedHour < 10 && prCreatedHour > 0) {
  deadline = `오늘(${prCreatedMonth}월 ${prCreatedDate}일) 20시 00분`;
} else if (prCreatedHour === 22 || prCreatedHour === 23) {
  deadline = `내일(${nextDayMonth}월 ${nextDayDate}일) 20시 00분`;
} else if (prCreatedHour + 10 >= 22) {
  deadline = `내일(${nextDayMonth}월 ${nextDayDate}일) ${
    prCreatedHour - 2
  }시 ${prCreatedMinute}분`;
} else {
  // 근무시간에 생성된
  deadline = `오늘(${prCreatedMonth}월 ${prCreatedDate}일) ${
    prCreatedHour + 10
  }시 ${prCreatedMinute}분`;
}

console.log(`::set-output name=DEADLINE::${deadline}`);
