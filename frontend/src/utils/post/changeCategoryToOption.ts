import { Category } from '@type/category';

import { Option } from '@components/common/MultiSelect/types';

export const changeCategoryToOption = (categoryList: Category[]): Option[] => {
  return categoryList.map(category => ({ id: category.id, name: category.name }));
};
