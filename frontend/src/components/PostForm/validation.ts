import { DHMTime } from '@type/time';

import { WritingVoteOptionType } from '@hooks/useWritingOption';

import { Option } from '@components/common/MultiSelect/types';

import {
  POST_CATEGORY_POLICY,
  POST_CONTENT_POLICY,
  POST_DEADLINE_POLICY,
  POST_OPTION_POLICY,
  POST_TITLE_POLICY,
} from '@constants/policyMessage';

export const checkValidationPost = (
  categoryList: Option[],
  title: string,
  content: string,
  optionList: WritingVoteOptionType[],
  time: DHMTime
) => {
  if (categoryList.length < 1) return POST_CATEGORY_POLICY.MIN;
  if (categoryList.length > 3) return POST_CATEGORY_POLICY.MAX;

  if (title.trim() === '') return POST_TITLE_POLICY.REQUIRED;

  if (content.trim() === '') return POST_CONTENT_POLICY.REQUIRED;

  if (optionList.length < 2) return POST_OPTION_POLICY.MIN;
  if (optionList.length > 5) return POST_OPTION_POLICY.MAX;
  if (optionList.some(option => option.text.trim() === '')) return POST_OPTION_POLICY.REQUIRED;

  const isTimeOptionZero = Object.values(time).reduce((a, b) => a + b, 0) < 1;
  if (isTimeOptionZero) return POST_DEADLINE_POLICY.REQUIRED;
};
