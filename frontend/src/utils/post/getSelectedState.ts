import { Category } from '@type/category';

import { PostRequestKind } from '@components/post/PostListPage/types';

export interface SelectedState {
  postType: PostRequestKind;
  categoryId: number;
  keyword: string;
  categoryList: Category[];
}

const SLICED_LENGTH_NUMBER = 10;

export const getSelectedState = ({
  postType,
  categoryId,
  keyword,
  categoryList,
}: SelectedState) => {
  if (postType === 'category') {
    const selectedCategory = categoryList.find(category => category.id === categoryId);

    return selectedCategory?.name ?? '전체';
  }

  if (postType === 'search') {
    return keyword.length > SLICED_LENGTH_NUMBER
      ? `${keyword.slice(0, SLICED_LENGTH_NUMBER)}...`
      : keyword;
  }

  if (postType === 'myPost') {
    return '내가 작성한 글';
  }

  if (postType === 'myVote') {
    return '내가 투표한 글';
  }

  return '전체';
};
