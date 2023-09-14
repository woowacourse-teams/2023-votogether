import { MAX_DEADLINE } from './post';

export const NICKNAME_POLICY = {
  LETTER_AMOUNT: '2자에서 15자 이내로 입력해주세요.',
  NO_DUPLICATION: '중복된 닉네임은 사용할 수 없습니다.',
  LIMIT_CHANGING: '닉네임 변경은 14일간 1회로 제한됩니다.',
  LIMIT_LETTER_TYPE: '한글/영어/숫자를 사용해 닉네임을 지어주세요.',
  LIMIT_KOREAN: '한글은 완전한 단어만 가능합니다.',
};

export const POST_CATEGORY_POLICY = {
  AMOUNT: '1개 ~ 3개의 카테고리를 작성해주세요.',
};

export const POST_TITLE_POLICY = {
  DEFAULT: '제목을 입력해주세요 (100자 이내)',
  LETTER_AMOUNT: '100자 이내로 입력해주세요.',
};

export const POST_CONTENT_POLICY = {
  DEFAULT: '내용을 입력해주세요 (1000자 이내)',
  LETTER_AMOUNT: '1000자 이내로 입력해주세요.',
  PHOTO_COUNT: '1장의 사진을 업로드 할 수 있습니다.',
  PHOTO_SHAPE: '사진은 정사각형으로 잘라져 업로드됩니다.',
  PHOTO_CAPACITY: '용량은 1.5MB으로 제한됩니다.',
};

export const POST_OPTION_POLICY = {
  DEFAULT: '선택지를 입력해주세요 (50자 이내)',
  LETTER_AMOUNT: '50자 이내로 입력해주세요.',
  AMOUNT: '2개 ~ 5개 선택지를 작성해주세요.',
  PHOTO_COUNT: '1장의 사진을 업로드 할 수 있습니다.',
  PHOTO_SHAPE: '사진은 정사각형으로 잘라져 업로드됩니다.',
  PHOTO_CAPACITY: '용량은 1.5MB으로 제한됩니다.',
};

export const POST_DEADLINE_POLICY = {
  DEFAULT: `${MAX_DEADLINE}일 이내로 마감시간을 정해주세요.`,
};

export const CONTENT_PLACEHOLDER = [
  POST_CONTENT_POLICY.DEFAULT,
  POST_CONTENT_POLICY.PHOTO_COUNT,
  POST_CONTENT_POLICY.PHOTO_CAPACITY,
  POST_CONTENT_POLICY.PHOTO_SHAPE,
].join('\n - ');
