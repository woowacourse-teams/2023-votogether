import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { OptionItemProps } from './type';

import Select from '.';

const meta: Meta<typeof Select> = {
  component: Select,
  decorators: [storyFn => <div style={{ width: '100px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof Select>;

const MOCK_STATUS_OPTION = [
  {
    name: '전체',
    value: 'all',
  },
  {
    name: '진행중',
    value: 'progress',
  },
  {
    name: '마감완료',
    value: 'closed',
  },
];

const MOCK_SORTING_OPTION = [
  {
    name: '인기순',
    value: 'popular',
  },
  {
    name: '최신순',
    value: 'latest',
  },
  {
    name: '엄청나게 긴 옵션',
    value: 'latest',
  },
];

export const PostStatus: Story = {
  render: () => (
    <Select
      aria-label="게시글 진행 상태 선택"
      selectedName="진행중"
      optionList={MOCK_STATUS_OPTION}
      handleOptionChange={() => {}}
    />
  ),
};

export const Sorting: Story = {
  render: () => (
    <Select
      aria-label="게시글 정렬 방법 선택"
      selectedName="최신순"
      optionList={MOCK_SORTING_OPTION}
      handleOptionChange={() => {}}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select
      aria-label="게시글 정렬 방법 선택"
      isDisabled={true}
      selectedName="최신순"
      optionList={MOCK_SORTING_OPTION}
      handleOptionChange={() => {}}
    />
  ),
};

export const SelectExample = () => {
  const [selectedOption, setSelectedOption] = useState<OptionItemProps>({
    name: '게시글 정렬 방법 선택',
    value: '',
  });

  const handelOptionChange = (option: OptionItemProps) => {
    setSelectedOption(option);
  };

  return (
    <Select
      aria-label="게시글 정렬 방법 선택"
      selectedName={selectedOption.name}
      optionList={MOCK_SORTING_OPTION}
      handleOptionChange={handelOptionChange}
    />
  );
};
