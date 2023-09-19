import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Category } from '@type/category';

import { addFavoriteCategory, removeFavoriteCategory } from '@api/categoryList';

import { QUERY_KEY } from '@constants/queryKey';

export const useCategoryFavoriteToggle = () => {
  const queryClient = useQueryClient();
  const LOGGED_IN = true;
  const queryKey = [QUERY_KEY.CATEGORIES, LOGGED_IN];

  const { mutate, isLoading, isError, error } = useMutation(
    ({ id, isFavorite }: Omit<Category, 'name'>) =>
      isFavorite ? removeFavoriteCategory(id) : addFavoriteCategory(id),
    {
      onMutate: async ({ id }: Omit<Category, 'name'>) => {
        const oldCategoryList: Category[] | undefined = queryClient.getQueryData(queryKey);

        if (oldCategoryList) {
          await queryClient.cancelQueries(queryKey);
          const updatedCategoryList = oldCategoryList.map(item =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
          );
          queryClient.setQueryData(queryKey, updatedCategoryList);

          return () => queryClient.setQueryData(queryKey, oldCategoryList);
        }
      },
      onError: (error, _, rollback) => {
        if (rollback) {
          rollback();
          return;
        }
        window.console.log('Category favorite toggle error', error);
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return { mutate, isLoading, isError, error };
};
