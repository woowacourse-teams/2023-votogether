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
    label: '전체',
    value: 'all',
  },
  {
    label: '진행중',
    value: 'progress',
  },
  {
    label: '마감완료',
    value: 'closed',
  },
];

const MOCK_SORTING_OPTION = [
  {
    label: '인기순',
    value: 'popular',
  },
  {
    label: '최신순',
    value: 'latest',
  },
  {
    label: '엄청나게 긴 옵션',
    value: 'latest',
  },
];

export const Status: Story = {
  render: () => (
    <Select
      ariaLabel="게시글 진행 상태 선택"
      selectedLabel="진행중"
      optionList={MOCK_STATUS_OPTION}
      handleOptionChange={() => {}}
    />
  ),
};

export const Sorting: Story = {
  render: () => (
    <Select
      ariaLabel="게시글 정렬 방법 선택"
      selectedLabel="최신순"
      optionList={MOCK_SORTING_OPTION}
      handleOptionChange={() => {}}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select
      ariaLabel="게시글 정렬 방법 선택"
      isDisabled={true}
      selectedLabel="최신순"
      optionList={MOCK_SORTING_OPTION}
      handleOptionChange={() => {}}
    />
  ),
};

export const SelectExample = () => {
  const [selectedOption, setSelectedOption] = useState<OptionItemProps>({
    label: '진행 게시글을 선택해주세요',
    value: '',
  });

  const handelOptionChange = (option: OptionItemProps) => {
    setSelectedOption(option);
  };

  return (
    <Select
      ariaLabel="게시글 정렬 방법 선택"
      selectedLabel={selectedOption.label}
      optionList={MOCK_SORTING_OPTION}
      handleOptionChange={handelOptionChange}
    />
  );
};
