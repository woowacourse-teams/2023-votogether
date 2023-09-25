import type { Meta } from '@storybook/react';

import { useMultiSelect } from '@hooks/useMultiSelect';

import { POST_CATEGORY } from '@constants/policy';

import { MOCK_CATEGORY_LIST, MOCK_OPTION_CATEGORY_LIST } from '@mocks/mockData/categoryList';

import MultiSelect from '.';

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  decorators: [storyFn => storyFn()],
};

export default meta;

export const NotSelected = () => {
  const { selectedOptionList, handleOptionAdd, handleOptionDelete } = useMultiSelect([]);

  return (
    <MultiSelect
      selectedOptionList={selectedOptionList}
      optionList={MOCK_OPTION_CATEGORY_LIST}
      handleOptionAdd={handleOptionAdd}
      handleOptionDelete={handleOptionDelete}
      placeholder="여러 개의 옵션을 선택해주세요."
    />
  );
};

export const Selected = () => {
  const initialSelectedOptionList = MOCK_OPTION_CATEGORY_LIST.filter(
    option => option.name === '옵션1' || option.name === '옵션7'
  );

  const { selectedOptionList, handleOptionAdd, handleOptionDelete } =
    useMultiSelect(initialSelectedOptionList);

  return (
    <MultiSelect
      selectedOptionList={selectedOptionList}
      optionList={MOCK_OPTION_CATEGORY_LIST}
      handleOptionAdd={handleOptionAdd}
      handleOptionDelete={handleOptionDelete}
    />
  );
};

export const CategoryNotSelected = () => {
  const { selectedOptionList, handleOptionAdd, handleOptionDelete } = useMultiSelect(
    [],
    POST_CATEGORY.MAX_AMOUNT
  );

  return (
    <MultiSelect
      selectedOptionList={selectedOptionList}
      optionList={MOCK_CATEGORY_LIST}
      handleOptionAdd={handleOptionAdd}
      handleOptionDelete={handleOptionDelete}
      placeholder="카테고리를 선택해주세요."
    />
  );
};

export const CategorySelected = () => {
  const CATEGORY_COUNT_LIMIT = 3;
  const initialSelectedOptionList = MOCK_CATEGORY_LIST.filter(
    option => option.id === 7 || option.id === 9
  );

  const { selectedOptionList, handleOptionAdd, handleOptionDelete } = useMultiSelect(
    initialSelectedOptionList,
    CATEGORY_COUNT_LIMIT
  );

  return (
    <MultiSelect
      selectedOptionList={selectedOptionList}
      optionList={MOCK_CATEGORY_LIST}
      handleOptionAdd={handleOptionAdd}
      handleOptionDelete={handleOptionDelete}
    />
  );
};
