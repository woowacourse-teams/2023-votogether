import { Time } from '@type/post';

import { WritingVoteOptionType } from '@hooks/useWritingOption';

import { Option } from '@components/common/MultiSelect/types';

export const checkValidationPost = (
  categoryList: Option[],
  title: string,
  content: string,
  optionList: WritingVoteOptionType[],
  time: Time
) => {
  if (categoryList.length < 1) return '카테고리를 최소 1개 골라주세요.';
  if (categoryList.length > 3) return '카테고리를 최대 3개 골라주세요.';

  if (title.trim() === '') return '제목은 필수로 입력해야 합니다.';

  if (content.trim() === '') return '내용은 필수로 입력해야 합니다.';

  if (optionList.length < 2) return '선택지는 최소 2개 입력해주세요.';
  if (optionList.length > 5) return '선택지는 최대 5개 입력할 수 있습니다.';
  if (optionList.some(option => option.text.trim() === '')) return '선택지에 글을 입력해주세요.';

  const isTimeOptionZero = Object.values(time).reduce((a, b) => a + b, 0) < 1;
  if (isTimeOptionZero) return '시간은 필수로 입력해야 합니다.';
};
