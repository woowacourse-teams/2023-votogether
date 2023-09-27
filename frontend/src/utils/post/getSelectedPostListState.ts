import { Category } from '@type/category';

import { PostRequestKind } from '@pages/HomePage/types';

export interface SelectedPostListState {
  postType: PostRequestKind;
  categoryId: number;
  categoryList: Category[];
}

export const getSelectedPostListState = ({
  postType,
  categoryId,
  categoryList,
}: SelectedPostListState) => {
  if (postType === 'category') {
    const selectedCategory = categoryList.find(category => category.id === categoryId);

    return selectedCategory?.name ?? '전체';
  }

  if (postType === 'myPost') {
    return '내가 작성한 글';
  }

  if (postType === 'myVote') {
    return '내가 투표한 글';
  }

  return '전체';
};
