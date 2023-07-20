import { Category } from '@type/category';

import { deleteFetch, getFetch, postFetch } from '@utils/fetch';

const transformCategoryListResponse = (categoryList: Category[]) => {
  return categoryList.map(category => ({
    id: category.id,
    name: category.name,
    isFavorite: category.isFavorite,
  }));
};

export const getUserCategoryList = async () => {
  const categoryList = await getFetch<Category[]>('/categories');

  return transformCategoryListResponse(categoryList);
};

export const getGuestCategoryList = async () => {
  const categoryList = await getFetch<Category[]>('/categories/guest');

  return transformCategoryListResponse(categoryList);
};

export const addFavoriteCategory = async (categoryId: number) => {
  await postFetch(`/categories/${categoryId}/like`, '');
};

export const removeFavoriteCategory = async (categoryId: number) => {
  await deleteFetch(`/categories/${categoryId}/like`);
};
