import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Category } from '@type/category';

import { addFavoriteCategory, removeFavoriteCategory } from '@api/categoryList';

import { QUERY_KEY } from '@constants/queryKey';

export const useCategoryFavoriteToggle = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation(
    ({ id, isFavorite }: Omit<Category, 'name'>) =>
      isFavorite ? removeFavoriteCategory(id) : addFavoriteCategory(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.CATEGORIES]);
      },
      onError: error => {
        window.console.log('Category favorite toggle error', error);
      },
    }
  );

  return { mutate, isLoading, isError, error };
};
