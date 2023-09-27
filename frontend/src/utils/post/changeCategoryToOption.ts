import { Category } from '@type/category';

import { Option } from '@components/common/MultiSelect/types';

/**
 * 카테고리 타입을 다중 셀렉트를 위한 옵션 타입으로 변환한다.
 */
export const changeCategoryToOption = (categoryList: Category[]): Option[] => {
  return categoryList.map(category => ({ id: category.id, name: category.name }));
};
