import type { Meta } from '@storybook/react';

import { useMultiSelect } from '@hooks/useMultiSelect';

import MultiSelect from '.';

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  decorators: [storyFn => storyFn()],
};

export default meta;

const MOCK_OPTION_LIST = [
  { id: 1, name: '옵션1' },
  { id: 2, name: '옵션2' },
  { id: 5, name: '옵션3' },
  { id: 7, name: '옵션4' },
  { id: 9, name: '옵션5' },
  { id: 10, name: '옵션6' },
  { id: 11, name: '옵션7' },
  { id: 13, name: '옵션8' },
  { id: 15, name: '옵션9' },
  { id: 16, name: '매우 긴----------~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~옵션10' },
];

const MOCK_CATEGORY_LIST = [
  { id: 1, name: '음식' },
  { id: 2, name: '패션' },
  { id: 5, name: '금융' },
  { id: 7, name: '게임' },
  { id: 9, name: '개발' },
  { id: 10, name: '연애' },
  { id: 11, name: '취미' },
  { id: 13, name: '주식' },
  { id: 15, name: '연예' },
  { id: 16, name: '정치' },
];

export const NotSelected = () => {
  const { selectedOptionList, handleOptionAdd, handleOptionDelete } = useMultiSelect([]);

  return (
    <MultiSelect
      selectedOptionList={selectedOptionList}
      optionList={MOCK_OPTION_LIST}
      handleOptionAdd={handleOptionAdd}
      handleOptionDelete={handleOptionDelete}
      placeholder="여러 개의 옵션을 선택해주세요."
    />
  );
};

export const Selected = () => {
  const initialSelectedOptionList = MOCK_OPTION_LIST.filter(
    option => option.name === '옵션1' || option.name === '옵션7'
  );

  const { selectedOptionList, handleOptionAdd, handleOptionDelete } =
    useMultiSelect(initialSelectedOptionList);

  return (
    <MultiSelect
      selectedOptionList={selectedOptionList}
      optionList={MOCK_OPTION_LIST}
      handleOptionAdd={handleOptionAdd}
      handleOptionDelete={handleOptionDelete}
    />
  );
};

export const CategoryNotSelected = () => {
  const CATEGORY_COUNT_LIMIT = 3;

  const { selectedOptionList, handleOptionAdd, handleOptionDelete } = useMultiSelect(
    [],
    CATEGORY_COUNT_LIMIT
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
  const initialSelectedOptionList = MOCK_OPTION_LIST.filter(
    option => option.name === '옵션1' || option.name === '옵션7'
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
