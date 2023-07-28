import { PostInfo } from '@type/post';

export const MOCK_POST_LIST: PostInfo[] = [];

const getMockPost = () => ({
  postId: Math.floor(Math.random() * 100000),
  title:
    '어느 곳에서 정보를 찾아야 할지도 막막한 사람들을 위한, 심심풀이로 나의 취향과 남의 취향을 비교해보고 싶은 사람들을 위한 프로젝트',
  writer: {
    id: 2,
    nickname: '우아한 잔치국수',
  },
  content:
    '이는 사람들에게 재미와 정보, 두 가지를 줄 수 있습니다. 사람들은 MBTI, 밸런스게임처럼 나와 같은 사람들을 찾고, 나와 다른 사람들과 비교하는 것을 즐깁니다. 이를 컨텐츠화하여 보다 빠르게 질문하고 답변하며, 사람들의 반응을 확인할 수 있다면 사람들은 충분한 즐거움을 느낄 것입니다. 또한 20대가 많은 대학가에 창업을 하고 싶지만 20대의 의견을 모르겠을 때, 확실한 답은 아닐지라도 어느 정도의 가이드를 줄 수 있을 것입니다. 질문자에게 제공되는 성별/나이대별 투표 결과 정보는 질문자가 하고자 하는 의사결정의 근거가 될 수 있을 것입니다.',
  category: [
    {
      id: 1,
      name: '개발',
    },
    {
      id: 2,
      name: '연애',
    },
    {
      id: 3,
      name: '상담',
    },
  ],
  startTime: '2023-07-12 12:40',
  endTime: '2023-07-13 18:40',
  voteInfo: {
    selectedOptionId: 9,
    allPeopleCount: 123,
    options: [
      {
        id: 6,
        text: '당선',
        peopleCount: 30,
        percent: 30,
      },
      {
        id: 7,
        text: 'votogether',
        peopleCount: 40,
        percent: 40,
      },
      {
        id: 8,
        text: '인스타그램, 블라인드와 같은 SNS의 형식을 차용합니다. 누군가는 글을 쓰고, 누군가는 반응합니다. 다만, 댓글은 없습니다. 투표로 자신의 의견을 표현하고 이를 사람들에게 보여줍니다.',
        peopleCount: 20,
        percent: 20,
      },
      {
        id: 9,
        text: 'fun from choice, 오늘도 즐거운 한 표 ',
        imageUrl: 'https://source.unsplash.com/random',
        peopleCount: 10,
        percent: 10,
      },
    ],
  },
});

for (let index = 0; index < 10; index += 1) {
  MOCK_POST_LIST.push(getMockPost());
}
