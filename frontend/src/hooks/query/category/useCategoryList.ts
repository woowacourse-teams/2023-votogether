import { useQuery } from '@tanstack/react-query';

import { Category } from '@type/category';

import { getGuestCategoryList, getUserCategoryList } from '@api/categoryList';

import { QUERY_KEY } from '@constants/queryKey';

export const useCategoryList = (isLoggedIn: boolean) => {
  const { data, error, isLoading, isError } = useQuery<Category[]>(
    [QUERY_KEY.CATEGORIES],
    isLoggedIn ? getUserCategoryList : getGuestCategoryList
  );

  return { data, error, isLoading, isError };
};
