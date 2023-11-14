import {
  POST_CATEGORY_POLICY,
  POST_CONTENT_POLICY,
  POST_DEADLINE_POLICY,
  POST_OPTION_POLICY,
  POST_TITLE_POLICY,
} from '@constants/policyMessage';

import { WritingPostInfo } from './type';

export const checkValidationPost = ({
  categoryOptionList,
  title,
  content,
  optionList,
  deadline,
}: WritingPostInfo) => {
  if (categoryOptionList.length < 1) return POST_CATEGORY_POLICY.MIN;
  if (categoryOptionList.length > 3) return POST_CATEGORY_POLICY.MAX;

  if (title.trim() === '') return POST_TITLE_POLICY.REQUIRED;

  if (content.trim() === '') return POST_CONTENT_POLICY.REQUIRED;

  if (optionList.length < 2) return POST_OPTION_POLICY.MIN;
  if (optionList.length > 5) return POST_OPTION_POLICY.MAX;
  if (optionList.some(option => option.text.trim() === '')) return POST_OPTION_POLICY.REQUIRED;

  if (Number(new Date(deadline)) <= Date.now()) return POST_DEADLINE_POLICY.DEFAULT;
};
