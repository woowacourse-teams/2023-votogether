import type { Meta } from '@storybook/react';

import { useSelect } from '@hooks';

import Select from '.';

const meta: Meta<typeof Select> = {
  component: Select,
  decorators: [storyFn => <div style={{ width: '100px' }}>{storyFn()}</div>],
};

export default meta;

const sortingOption = ['popular', 'latest', 'longLong'] as const;

type SortingOptionType = (typeof sortingOption)[number];

const MOCK_SORTING_OPTION: Record<SortingOptionType, string> = {
  popular: '인기순',
  latest: '최신순',
  longLong: '엄청나게 긴 옵션',
};

export const SelectExample = () => {
  const { handleOptionChange, isSelectOpen, selectedOption, toggleSelect } =
    useSelect<SortingOptionType>('popular');

  return (
    <Select<SortingOptionType>
      isOpen={isSelectOpen}
      toggleSelect={toggleSelect}
      aria-label="게시글 정렬 방법 선택"
      selectedOption={MOCK_SORTING_OPTION[selectedOption]}
      optionList={MOCK_SORTING_OPTION}
      handleOptionChange={handleOptionChange}
    />
  );
};

export const Disabled = () => {
  const { handleOptionChange, isSelectOpen, selectedOption, toggleSelect } =
    useSelect<SortingOptionType>('popular');

  return (
    <Select
      isOpen={isSelectOpen}
      toggleSelect={toggleSelect}
      aria-label="게시글 정렬 방법 선택"
      isDisabled={true}
      selectedOption={selectedOption}
      optionList={MOCK_SORTING_OPTION}
      handleOptionChange={handleOptionChange}
    />
  );
};
