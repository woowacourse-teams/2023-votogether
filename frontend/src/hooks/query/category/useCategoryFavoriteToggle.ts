import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Category } from '@type/category';

import { ToastContext } from '@hooks/context/toast';

import { addFavoriteCategory, removeFavoriteCategory } from '@api/categoryList';

import { QUERY_KEY } from '@constants/queryKey';

export const useCategoryFavoriteToggle = () => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);
  const LOGGED_IN = true;
  const queryKey = [QUERY_KEY.CATEGORIES, LOGGED_IN];

  const { mutate, isLoading } = useMutation(
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
        const message = error instanceof Error ? error.message : '카테고리 설정을 실패했습니다.';
        addMessage(message);
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return { mutate, isLoading };
};
