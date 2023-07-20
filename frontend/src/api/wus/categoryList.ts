import { ServerCategory } from '@type/category';

import { deleteFetch, getFetch, postFetch } from '@utils/fetch';

export const transformCategoryListResponse = (categoryList: ServerCategory[]) => {
  return categoryList.map(category => ({
    id: category.id,
    name: category.name,
    isFavorite: category.favorite,
  }));
};

export const getUserCategoryList = async () => {
  const categoryList = await getFetch<ServerCategory[]>('/categories');

  return transformCategoryListResponse(categoryList);
};

export const getGuestCategoryList = async () => {
  const categoryList = await getFetch<ServerCategory[]>('/categories/guest');

  return transformCategoryListResponse(categoryList);
};

export const addFavoriteCategory = async (categoryId: number) => {
  await postFetch(`/categories/${categoryId}/like`, '');
};

export const removeFavoriteCategory = async (categoryId: number) => {
  await deleteFetch(`/categories/${categoryId}/like`);
};
