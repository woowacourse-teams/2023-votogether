import type { Meta, StoryObj } from '@storybook/react';

import { styled } from 'styled-components';

import WrittenVoteOptionList from '.';

const meta: Meta<typeof WrittenVoteOptionList> = {
  component: WrittenVoteOptionList,
};

export default meta;
type Story = StoryObj<typeof WrittenVoteOptionList>;

const WrittenVoteWrapper = styled.div`
  max-width: 460px;
`;

const MOCK_NOT_VOTED_DATA = {
  selectedOptionId: 0,
  allPeopleCount: 123,
  options: [
    {
      id: 12312,
      text: '또는 JavaScript로 컴포넌트의 텍스트를 가져와서 원하는 길이로 자르고, 생략 부호를',
      peopleCount: -1,
      percent: -1,
      imageUrl: '',
    },
    {
      id: 12314,
      text: '자유를 찾게 냅둔다',
      peopleCount: -1,
      imageUrl: '',
      percent: -1,
    },
    {
      id: 123152,
      text: 'isVote는 변수명으로서는 영문법상으로 볼 때는 어색하진 않습니다. is는 보통 boolean 타입을 나타낼 때 사용되는 접두사이며, Vote는 투표를 의미하는 명사입니다. 따라서 isVote는 투표 여부를 나타내는지를 의미하는 변수명으로 적합합니다. 그러나 개인적인 취향에 따라 다른 변수명을 선호할 수도 있습니다. 예를 들면 hasVoted와 같이 투표를 했는지 여부를 나타내는 변수명을 사용하는 것도 가능합니다. 중요한 것은 코드의 가독성과 일관성을 유지하는 것이며, 개발자들과의 커뮤니케이션을 원활하게 하기 위해 명확하고 이해하기 쉬운 변수명을 선택하는 것이 좋습니다.',
      peopleCount: -1,
      percent: -1,
      imageUrl: '',
    },
    {
      id: 123122,
      text: 'isVote는 변수명으로서는 영문법상으로 볼 때는 어색하진 않습니다. is는 보통 boolean 타입을 나타낼 때 사용되는 접두사이며, Vote는 투표를 의미하는 명사입니다. 따라서 isVote는 투표 여부를 나타내는지를 의미하는 변수명으로 적합합니다. 그러나 개인적인 취향에 따라 다른 변수명을 선호할 수도 있습니다. 예를 들면 hasVoted와 같이 투표를 했는지 여부를 나타내는 변수명을 사용하는 것도 가능합니다. 중요한 것은 코드의 가독성과 일관성을 유지하는 것이며, 개발자들과의 커뮤니케이션을 원활하게 하기 위해 명확하고 이해하기 쉬운 변수명을 선택하는 것이 좋습니다.',
      imageUrl: 'https://source.unsplash.com/random',
      peopleCount: -1,
      percent: -1,
    },
  ],
};

const MOCK_VOTED_DATA = {
  selectedOptionId: 123122,
  allPeopleCount: 123,
  options: [
    {
      id: 12312,
      text: '또는 JavaScript로 컴포넌트의 텍스트를 가져와서 원하는 길이로 자르고, 생략 부호를',
      peopleCount: 7,
      imageUrl: '',
      percent: 8,
    },
    {
      id: 12314,
      text: '자유를 찾게 냅둔다',
      peopleCount: 12,
      imageUrl: '',
      percent: 15,
    },
    {
      id: 123152,
      text: 'isVote는 변수명으로서는 영문법상으로 볼 때는 어색하진 않습니다. is는 보통 boolean 타입을 나타낼 때 사용되는 접두사이며, Vote는 투표를 의미하는 명사입니다. 따라서 isVote는 투표 여부를 나타내는지를 의미하는 변수명으로 적합합니다. 그러나 개인적인 취향에 따라 다른 변수명을 선호할 수도 있습니다. 예를 들면 hasVoted와 같이 투표를 했는지 여부를 나타내는 변수명을 사용하는 것도 가능합니다. 중요한 것은 코드의 가독성과 일관성을 유지하는 것이며, 개발자들과의 커뮤니케이션을 원활하게 하기 위해 명확하고 이해하기 쉬운 변수명을 선택하는 것이 좋습니다.',
      imageUrl: '',
      peopleCount: 0,
      percent: 0,
    },
    {
      id: 123122,
      text: 'isVote는 변수명으로서는 영문법상으로 볼 때는 어색하진 않습니다. is는 보통 boolean 타입을 나타낼 때 사용되는 접두사이며, Vote는 투표를 의미하는 명사입니다. 따라서 isVote는 투표 여부를 나타내는지를 의미하는 변수명으로 적합합니다. 그러나 개인적인 취향에 따라 다른 변수명을 선호할 수도 있습니다. 예를 들면 hasVoted와 같이 투표를 했는지 여부를 나타내는 변수명을 사용하는 것도 가능합니다. 중요한 것은 코드의 가독성과 일관성을 유지하는 것이며, 개발자들과의 커뮤니케이션을 원활하게 하기 위해 명확하고 이해하기 쉬운 변수명을 선택하는 것이 좋습니다.',
      imageUrl: 'https://source.unsplash.com/random',
      peopleCount: 85,
      percent: 60,
    },
  ],
};

export const PreviewNotVoted: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOptionList
        isStatisticsVisible={true}
        selectedOptionId={MOCK_NOT_VOTED_DATA.selectedOptionId}
        handleVoteClick={() => {}}
        isPreview={true}
        voteOptionList={MOCK_NOT_VOTED_DATA.options}
      />
    </WrittenVoteWrapper>
  ),
};

export const PreviewVoted: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOptionList
        isStatisticsVisible={true}
        selectedOptionId={MOCK_VOTED_DATA.selectedOptionId}
        handleVoteClick={() => {}}
        isPreview={true}
        voteOptionList={MOCK_VOTED_DATA.options}
      />
    </WrittenVoteWrapper>
  ),
};

export const DetailNotVoted: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOptionList
        isStatisticsVisible={true}
        selectedOptionId={MOCK_NOT_VOTED_DATA.selectedOptionId}
        handleVoteClick={() => {}}
        isPreview={false}
        voteOptionList={MOCK_NOT_VOTED_DATA.options}
      />
    </WrittenVoteWrapper>
  ),
};

export const DetailVoted: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOptionList
        isStatisticsVisible={true}
        selectedOptionId={MOCK_VOTED_DATA.selectedOptionId}
        handleVoteClick={() => {}}
        isPreview={false}
        voteOptionList={MOCK_VOTED_DATA.options}
      />
    </WrittenVoteWrapper>
  ),
};
