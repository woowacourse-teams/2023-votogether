import { convertDayToSecond } from '@utils/time/convertDayToSecond';

/**
 * 유저의 나이, 성별을 입력했는지 여부를 확인하는 쿠키의 저장하는 기간을 뜻 합니다.
 * 365일
 */
export const ESSENTIAL_MAX_AGE = convertDayToSecond(365);
export const APP_VISIBLE_MAX_AGE = convertDayToSecond(7);
export const BANNER_VISIBLE_MAX_AGE = convertDayToSecond(1);
