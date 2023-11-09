import { deleteFetch, getFetch, postFetch } from '@utils/fetch';

export interface CategoryResponse {
  id: number;
  name: string;
  isFavorite: boolean;
}

export const transformCategoryListResponse = (categoryList: CategoryResponse[]) => {
  return categoryList.map(category => ({
    id: category.id,
    name: category.name,
    isFavorite: category.isFavorite,
  }));
};

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const getUserCategoryList = async () => {
  const categoryList = await getFetch<CategoryResponse[]>(`${BASE_URL}/categories`);

  return transformCategoryListResponse(categoryList);
};

export const getGuestCategoryList = async () => {
  const categoryList = await getFetch<CategoryResponse[]>(`${BASE_URL}/categories/guest`);

  return transformCategoryListResponse(categoryList);
};

export const addFavoriteCategory = async (categoryId: number) => {
  await postFetch(`${BASE_URL}/categories/${categoryId}/like`, '');
};

export const removeFavoriteCategory = async (categoryId: number) => {
  await deleteFetch(`${BASE_URL}/categories/${categoryId}/like`);
};
