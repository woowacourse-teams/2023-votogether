import type { Meta, StoryObj } from '@storybook/react';

import { styled } from 'styled-components';

import WrittenVoteOption from '.';

const meta: Meta<typeof WrittenVoteOption> = {
  component: WrittenVoteOption,
};

export default meta;
type Story = StoryObj<typeof WrittenVoteOption>;

const WrittenVoteWrapper = styled.div`
  max-width: 460px;
`;

export const Select: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOption
        ariaLabel="0번 선택지"
        handleVoteClick={() => {}}
        isPreview={true}
        text="자유를 찾게 냅둔다"
        peopleCount={2}
        percent={70.9}
        isSelected={true}
        isStatisticsVisible={true}
        imageUrl=""
      />
    </WrittenVoteWrapper>
  ),
};

export const NotSelectAndLongText: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOption
        ariaLabel="0번 선택지"
        handleVoteClick={() => {}}
        isPreview={true}
        text="또는 JavaScript로 컴포넌트의 텍스트를 가져와서 원하는 길이로 자르고, 생략 부호를"
        percent={80}
        peopleCount={6}
        isSelected={false}
        isStatisticsVisible={true}
        imageUrl=""
      />
    </WrittenVoteWrapper>
  ),
};

export const ImageAndSelect: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOption
        ariaLabel="0번 선택지"
        handleVoteClick={() => {}}
        isPreview={true}
        imageUrl="https://source.unsplash.com/random"
        text="또는 JavaScript로 컴포넌트의 텍스트를 가져와서 원하는 길이로 자르고, 생략 부호를"
        percent={80}
        peopleCount={6}
        isSelected={true}
        isStatisticsVisible={true}
      />
    </WrittenVoteWrapper>
  ),
};

export const NotVote: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOption
        ariaLabel="0번 선택지"
        handleVoteClick={() => {}}
        isPreview={true}
        text="또는 JavaScript로 컴포넌트의 텍스트를 가져와서 원하는 길이로 자르고, 생략 부호를"
        percent={0}
        peopleCount={0}
        isSelected={false}
        isStatisticsVisible={false}
        imageUrl=""
      />
    </WrittenVoteWrapper>
  ),
};

export const ImageAndNotVote: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOption
        ariaLabel="0번 선택지"
        handleVoteClick={() => {}}
        isPreview={true}
        imageUrl="https://source.unsplash.com/random"
        text="또는 JavaScript로 컴포넌트의 텍스트를 가져와서 원하는 길이로 자르고, 생략 부호를"
        percent={0}
        peopleCount={0}
        isSelected={false}
        isStatisticsVisible={false}
      />
    </WrittenVoteWrapper>
  ),
};

export const PreviewContent: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOption
        ariaLabel="0번 선택지"
        handleVoteClick={() => {}}
        isPreview={true}
        imageUrl="https://source.unsplash.com/random"
        text="isVote는 변수명으로서는 영문법상으로 볼 때는 어색하진 않습니다. is는 보통 boolean 타입을 나타낼 때 사용되는 접두사이며, Vote는 투표를 의미하는 명사입니다. 따라서 isVote는 투표 여부를 나타내는지를 의미하는 변수명으로 적합합니다. 그러나 개인적인 취향에 따라 다른 변수명을 선호할 수도 있습니다. 예를 들면 hasVoted와 같이 투표를 했는지 여부를 나타내는 변수명을 사용하는 것도 가능합니다. 중요한 것은 코드의 가독성과 일관성을 유지하는 것이며, 개발자들과의 커뮤니케이션을 원활하게 하기 위해 명확하고 이해하기 쉬운 변수명을 선택하는 것이 좋습니다."
        percent={0}
        peopleCount={0}
        isSelected={false}
        isStatisticsVisible={false}
      />
    </WrittenVoteWrapper>
  ),
};

export const DetailContent: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOption
        ariaLabel="0번 선택지"
        handleVoteClick={() => {}}
        isPreview={false}
        imageUrl="https://source.unsplash.com/random"
        text="isVote는 변수명으로서는 영문법상으로 볼 때는 어색하진 않습니다. is는 보통 boolean 타입을 나타낼 때 사용되는 접두사이며, Vote는 투표를 의미하는 명사입니다. 따라서 isVote는 투표 여부를 나타내는지를 의미하는 변수명으로 적합합니다. 그러나 개인적인 취향에 따라 다른 변수명을 선호할 수도 있습니다. 예를 들면 hasVoted와 같이 투표를 했는지 여부를 나타내는 변수명을 사용하는 것도 가능합니다. 중요한 것은 코드의 가독성과 일관성을 유지하는 것이며, 개발자들과의 커뮤니케이션을 원활하게 하기 위해 명확하고 이해하기 쉬운 변수명을 선택하는 것이 좋습니다."
        percent={0}
        peopleCount={0}
        isSelected={false}
        isStatisticsVisible={false}
      />
    </WrittenVoteWrapper>
  ),
};

export const NoImageAndDetailContent: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOption
        ariaLabel="0번 선택지"
        handleVoteClick={() => {}}
        isPreview={false}
        text="isVote는 변수명으로서는 영문법상으로 볼 때는 어색하진 않습니다. is는 보통 boolean 타입을 나타낼 때 사용되는 접두사이며, Vote는 투표를 의미하는 명사입니다. 따라서 isVote는 투표 여부를 나타내는지를 의미하는 변수명으로 적합합니다. 그러나 개인적인 취향에 따라 다른 변수명을 선호할 수도 있습니다. 예를 들면 hasVoted와 같이 투표를 했는지 여부를 나타내는 변수명을 사용하는 것도 가능합니다. 중요한 것은 코드의 가독성과 일관성을 유지하는 것이며, 개발자들과의 커뮤니케이션을 원활하게 하기 위해 명확하고 이해하기 쉬운 변수명을 선택하는 것이 좋습니다."
        percent={60}
        peopleCount={8}
        isSelected={true}
        isStatisticsVisible={true}
        imageUrl=""
      />
    </WrittenVoteWrapper>
  ),
};

export const ImageAndSelectAndDetailContent: Story = {
  render: () => (
    <WrittenVoteWrapper>
      <WrittenVoteOption
        ariaLabel="0번 선택지"
        handleVoteClick={() => {}}
        isPreview={false}
        imageUrl="https://source.unsplash.com/random"
        text="isVote는 변수명으로서는 영문법상으로 볼 때는 어색하진 않습니다. is는 보통 boolean 타입을 나타낼 때 사용되는 접두사이며, Vote는 투표를 의미하는 명사입니다. 따라서 isVote는 투표 여부를 나타내는지를 의미하는 변수명으로 적합합니다. 그러나 개인적인 취향에 따라 다른 변수명을 선호할 수도 있습니다. 예를 들면 hasVoted와 같이 투표를 했는지 여부를 나타내는 변수명을 사용하는 것도 가능합니다. 중요한 것은 코드의 가독성과 일관성을 유지하는 것이며, 개발자들과의 커뮤니케이션을 원활하게 하기 위해 명확하고 이해하기 쉬운 변수명을 선택하는 것이 좋습니다."
        percent={60}
        peopleCount={8}
        isSelected={true}
        isStatisticsVisible={true}
      />
    </WrittenVoteWrapper>
  ),
};
