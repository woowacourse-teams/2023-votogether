import { Comment } from '@type/comment';

import { CommentResponse, transformCommentListResponse } from '@api/comment';

export const MOCK_COMMENT_LIST: CommentResponse[] = [];

const commentList = [
  'Woah, your project looks awesome! How long have you been coding for? ',
  '일하기 싫어서 화장실에 앉아서 보는 중은 아닌데 아 원숭이 김종민보려고 눈뜬거 진짜웃겨ㅠㅠㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
  '진짜 다보고 나니 눈물이 ㅜㅜ 너무 참아서 눈물이 줄줄 ㅜㅜ 미쳤네요',
  'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 생일 축하드립니다 🎉🎉🎉 뭔가 예전에 무한도전에서 했던 돌+아이 콘테스트도 조금 생각나요',
  '1:08 4:01 4:20 6:04\n제가 계속 보고 싶어서 정리한 타임코드입니다\n역시나 생일파티 콘텐츠는 아무리봐도 안 질리네요\n유병재님 덕분에 오늘도 마음이 풍선해집니다💚❤️',
  '진짜ㅋㅋㅋㅋ레전드중 레전드인 컨텐츠인 것 같아요ㅋㅋㅋ큐ㅠㅠㅠ 몇번을 봐도 웃음이 멈추질 않는ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ!!>w<!!😂💞 ㅋㅋㅋㅋ살려주세요ㅠㅠㅠ 배가ㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
  '심판들의 엄격한 평가가 있어야 한다고 봅니다!!!',
  '나도 모르게 숨을 참게되네..',
  '정말 멋진 프로젝트네요! 코딩을 얼마나 오래하셨나요? 저는 아직 새내기인데, 곧 리액트를 배울 생각인데 어떻게 배울 수 있을까요? 조언 좀 부탁드려도 될까요? 감사합니다!',
  '방금 보다 너무 웃긴거 같아요ㅋㅋㅋ 글쎄요 원숭이 김종민이랑 수호랑 같이 보려고 일부러 눈뜬거 같았는데ㅋㅋㅋ 힌우해요ㅠㅠㅋㅋㅋㅋ',
  '이 영상을 보면서 눈물과 미소가 번갈아 오네요 ㅜㅜ 너무나 감동적이고 멋지네요',
];

const nicknameList = [
  '방방뛰는 코끼리',
  '환상의 드래곤',
  '컴퓨터 마법사',
  '무한한 상상력',
  '꿈을 향한 여행자',
  '플레이메이커',
  '뛰어난 전략가',
  '뚜렷한 개성',
];

const getMockComment = (): CommentResponse => ({
  id: Math.floor(Math.random() * 100000),
  content: commentList[Math.floor(Math.random() * 10)],
  createdAt: '2023.7.27. 07:43',
  member: {
    id: Math.floor(Math.random() * 100000),
    nickname: nicknameList[Math.floor(Math.random() * 8)],
  },
  updatedAt: Math.random() > 0.5 ? '2023.7.27. 07:43' : '2023.7.28. 07:43',
});

for (let index = 0; index < 50; index++) {
  MOCK_COMMENT_LIST.push(getMockComment());
}

export const MOCK_TRANSFORMED_COMMENT_LIST: Comment[] =
  transformCommentListResponse(MOCK_COMMENT_LIST);
