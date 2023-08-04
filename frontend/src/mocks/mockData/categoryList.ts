import { CategoryResponse } from '@type/category';

export const MOCK_CATEGORY_LIST: CategoryResponse[] = [
  { id: 1, name: '음식', isFavorite: false },
  { id: 2, name: '연애', isFavorite: true },
  { id: 3, name: '패션', isFavorite: false },
  { id: 4, name: '금융', isFavorite: false },
  { id: 5, name: '여행', isFavorite: false },
  { id: 6, name: '게임', isFavorite: false },
  { id: 7, name: '재테크', isFavorite: false },
  { id: 8, name: '요리', isFavorite: true },
  { id: 9, name: '개발', isFavorite: true },
  { id: 10, name: '전자기기', isFavorite: true },
];

export const MOCK_GUEST_CATEGORY_LIST: CategoryResponse[] = [
  { id: 1, name: '음식', isFavorite: false },
  { id: 2, name: '연애', isFavorite: false },
  { id: 3, name: '패션', isFavorite: false },
  { id: 4, name: '금융', isFavorite: false },
  { id: 5, name: '여행', isFavorite: false },
  { id: 6, name: '게임', isFavorite: false },
  { id: 7, name: '재테크', isFavorite: false },
  { id: 8, name: '요리', isFavorite: false },
  { id: 9, name: '개발', isFavorite: false },
  { id: 10, name: '전자기기', isFavorite: false },
];
