import type { Meta } from '@storybook/react';

import { PostRequest } from '@type/post';

import PostForm from '.';

const meta: Meta<typeof PostForm> = {
  component: PostForm,
};

export default meta;

const MOCK_DATA: PostRequest = {
  texts: {
    categoryIds: [1, 2, 3],
    title: '당신의 최애 동물에 투표하세요!',
    content:
      '한자로 견(犬)·구(狗) 등으로 표기한다. 포유류 중 가장 오래된 가축으로 거의 전세계에서 사육되며 약 400여 품종이 있다.  개는 이리·자칼(jackal) 등이 조상이라고 하는데, 이는 개와 교배하여 계대(繼代) 번식의 가능성이 있는 새끼를 낳을 수 있다는 것을 뜻한다. 즉 개에 이들의 혈액이 혼혈될 가능성이 있다는 것이다. 그러나 두개골이나 치아의 구조를 보면 개는 혼합된 것이 아니며, 또 그들 중의 어느 것에서 생긴 것이라고도 여겨지지 않는다. 아마도 개는 오스트레일리아에 야생하는 딩고(dingo)나 남아시아에 반야생상태로 서식하는 개와 흡사한, 절멸된 야생종에서 생긴 것으로 추측된다.',
    postOptions: ['강아지가 세상을 구한다.', '고양이가 세상을 구한다.'],
    deadline: '2023-08-15 12:40',
  },
  images: [],
};

export const NewPost = () => {
  return (
    <>
      <PostForm mutate={() => {}} />
    </>
  );
};

export const OldPost = () => {
  return (
    <>
      <PostForm data={MOCK_DATA} mutate={() => {}} />
    </>
  );
};
