import { Category } from '@type/category';

import { Option } from '@components/common/MultiSelect/types';

import { changeCategoryToOption } from '@utils/post/changeCategoryToOption';

describe('changeCategoryToOption 함수를 이용해서 카테고리 리스트를 셀렉트 컴포넌트에 사용되는 옵션 리스트로 변환한다.', () => {
  test('카테고리 리스트로 옵션 리스트를 만든다.', () => {
    const categoryList: Category[] = [
      { id: 1, isFavorite: false, name: '갤럭시' },
      { id: 2, isFavorite: true, name: '애플' },
    ];

    const result: Option[] = changeCategoryToOption(categoryList);

    expect(result).toEqual([
      {
        id: 1,
        name: '갤럭시',
      },
      {
        id: 2,
        name: '애플',
      },
    ]);
  });
});
