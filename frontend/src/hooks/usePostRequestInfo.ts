import { useLocation, useParams } from 'react-router-dom';

import { PostRequestKind } from '@pages/HomePage/types';

import { POST_TYPE } from '@constants/api';
import { DEFAULT_CATEGORY_ID } from '@constants/api';
import { PATH } from '@constants/path';

import { getPathFragment } from '@utils/getPathFragment';

import { useCurrentKeyword } from './useCurrentKeyword';

const REQUEST_URL: Record<string, PostRequestKind> = {
  [PATH.HOME]: POST_TYPE.ALL,
  [PATH.POST_CATEGORY]: POST_TYPE.CATEGORY,
  [PATH.USER_POST]: POST_TYPE.MY_POST,
  [PATH.USER_VOTE]: POST_TYPE.MY_VOTE,
  [PATH.SEARCH]: POST_TYPE.SEARCH,
};

export const usePostRequestInfo = () => {
  const params = useParams<{ categoryId?: string }>();
  const { currentKeyword } = useCurrentKeyword();
  const { pathname } = useLocation();

  const categoryId = Number(params.categoryId ?? DEFAULT_CATEGORY_ID);

  const convertedPathname = getPathFragment(pathname);
  const postType = REQUEST_URL[convertedPathname];

  const postOptionalOption = {
    categoryId,
    keyword: currentKeyword,
  };

  if (!postType) {
    return { postType: REQUEST_URL[PATH.HOME], postOptionalOption };
  }

  return { postType, postOptionalOption };
};
