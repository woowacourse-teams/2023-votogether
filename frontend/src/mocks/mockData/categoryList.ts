import { CategoryResponse } from '@api/categoryList';

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

export const MOCK_OPTION_CATEGORY_LIST = [
  { id: 1, name: '옵션1' },
  { id: 2, name: '옵션2' },
  { id: 5, name: '옵션3' },
  { id: 7, name: '옵션4' },
  { id: 9, name: '옵션5' },
  { id: 10, name: '옵션6' },
  { id: 11, name: '옵션7' },
  { id: 13, name: '옵션8' },
  { id: 15, name: '옵션9' },
  { id: 16, name: '매우 긴----------~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~옵션10' },
];
