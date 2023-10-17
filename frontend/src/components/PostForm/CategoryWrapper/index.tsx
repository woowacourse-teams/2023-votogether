import { useContext } from 'react';

import { AuthContext } from '@hooks/context/auth';
import { useCategoryList } from '@hooks/query/category/useCategoryList';

import MultiSelect from '@components/common/MultiSelect';
import { Option } from '@components/common/MultiSelect/types';

import { POST_CATEGORY } from '@constants/policy';

import { changeCategoryToOption } from '@utils/post/changeCategoryToOption';

interface CategoryWrapperProps {
  multiSelectHook: {
    selectedOptionList: Option[];
    handleOptionAdd: (newItem: Option) => void;
    handleOptionDelete: (optionId: number) => void;
  };
}

export default function CategoryWrapper({ multiSelectHook }: CategoryWrapperProps) {
  const { selectedOptionList, handleOptionAdd, handleOptionDelete } = multiSelectHook;
  const { isLoggedIn } = useContext(AuthContext).loggedInfo;
  const { data: categoryList } = useCategoryList(isLoggedIn);

  const categoryOptionList = changeCategoryToOption(categoryList ?? []);

  return (
    <MultiSelect
      selectedOptionList={selectedOptionList}
      optionList={categoryOptionList}
      handleOptionAdd={handleOptionAdd}
      handleOptionDelete={handleOptionDelete}
      placeholder="카테고리를 선택해주세요."
      maxOptionCount={POST_CATEGORY.MAX_AMOUNT}
    />
  );
}
