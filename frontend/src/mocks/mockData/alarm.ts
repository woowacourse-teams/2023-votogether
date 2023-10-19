const random = <T>(arr: T[]): T[] => {
  return arr.sort(() => Math.random() - 0.5);
};

const randomBoolean = () => {
  return random([true, false])[0];
};

// 1 ~ 9
const randomNum = () => {
  return random(new Array(9).fill(0).map((_, index) => index + 1))[0];
};

const contentAlarmAtPost = () => ({
  alarmId: Math.round(Math.random() * 1000),
  createdAt: `201${randomNum()}-0${randomNum()}-1${randomNum()} 11:34`,
  isChecked: randomBoolean(),
  detail: {
    postId: Math.round(Math.random() * 1000), //post
    postTitle: '이것은 게시물 제목입니다만', //post
    commentWriter: '누가 댓글을?', //댓글 작성자
  },
});

const contentAlarmAtComment = () => ({
  alarmId: Math.round(Math.random() * 1000),
  createdAt: `201${randomNum()}-0${randomNum()}-1${randomNum()} 11:34`,
  isChecked: randomBoolean(),
  detail: {
    postId: Math.round(Math.random() * 1000), //post
    postTitle: '이것은 게시물 제목입니다만', //post
    commentWriter: '', //댓글 작성자
  },
});

const reportAlarmAtPost = () => ({
  alarmId: Math.round(Math.random() * 1000),
  isChecked: randomBoolean(),
  detail: {
    createdAt: `201${randomNum()}-0${randomNum()}-1${randomNum()} 11:34`,
    reportId: Math.round(Math.random() * 1000),
    reasons: [],
    type: 'POST',
    content: '신고되어 삭제된 게시물',
  },
});

const reportAlarmAtComment = () => ({
  alarmId: Math.round(Math.random() * 1000),
  isChecked: randomBoolean(),
  detail: {
    createdAt: `201${randomNum()}-0${randomNum()}-1${randomNum()} 11:34`,
    reportId: Math.round(Math.random() * 1000),
    reasons: [],
    type: 'COMMENT',
    content: '삭제된 댓글 내용',
  },
});

const reportAlarmAtNickName = () => ({
  alarmId: Math.round(Math.random() * 1000),
  isChecked: randomBoolean(),
  detail: {
    createdAt: `201${randomNum()}-0${randomNum()}-1${randomNum()} 11:34`,
    reportId: Math.round(Math.random() * 1000),
    reasons: [],
    type: 'NICKNAME',
    content: '변경처리된 닉네임',
  },
});

export const MOCK_CONTENT_ALARM_LIST = () =>
  random([
    new Array(10).fill(0).map(_ => random([contentAlarmAtPost(), contentAlarmAtComment()])[0]),
    [],
  ])[0];

export const MOCK_REPORT_ALARM_LIST = () =>
  random([
    new Array(10)
      .fill(0)
      .map(_ => random([reportAlarmAtPost(), reportAlarmAtComment(), reportAlarmAtNickName()])[0]),
  ])[0];
