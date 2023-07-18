import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import Select from '.';

const meta: Meta<typeof Select> = {
  component: Select,
  decorators: [storyFn => <div style={{ width: '100px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof Select>;

const postStatus = ['all', 'progress', 'closed'] as const;
const sortingOption = ['popular', 'latest', 'longLong'] as const;

type PostStatusType = (typeof postStatus)[number];
type SortingOptionType = (typeof sortingOption)[number];

const MOCK_STATUS_OPTION: Record<PostStatusType, string> = {
  all: '전체',
  progress: '진행중',
  closed: '마감완료',
};

const MOCK_SORTING_OPTION: Record<SortingOptionType, string> = {
  popular: '인기순',
  latest: '최신순',
  longLong: '엄청나게 긴 옵션',
};

export const PostStatus: Story = {
  render: () => (
    <Select<PostStatusType>
      aria-label="게시글 진행 상태 선택"
      selectedOption="진행중"
      optionList={MOCK_STATUS_OPTION}
      handleOptionChange={() => {}}
    />
  ),
};

export const Sorting: Story = {
  render: () => (
    <Select
      aria-label="게시글 정렬 방법 선택"
      selectedOption="최신순"
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
      selectedOption="최신순"
      optionList={MOCK_SORTING_OPTION}
      handleOptionChange={() => {}}
    />
  ),
};

export const SelectExample = () => {
  const [selectedOption, setSelectedOption] = useState<SortingOptionType>('popular');

  const handelOptionChange = (option: SortingOptionType) => {
    setSelectedOption(option);
  };

  return (
    <Select<SortingOptionType>
      aria-label="게시글 정렬 방법 선택"
      selectedOption={MOCK_SORTING_OPTION[selectedOption]}
      optionList={MOCK_SORTING_OPTION}
      handleOptionChange={handelOptionChange}
    />
  );
};
