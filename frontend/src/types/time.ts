/**
 * DHM이란, Day Hour Minute을 가진 객체를 의미합니다.
 */
export interface DHMTime {
  day: number;
  hour: number;
  minute: number;
}

/**
 * yyyy-mm-dd HH-MM
 */
export type StringDate = `${number}-${number | string}-${number | string} ${number | string}:${
  | number
  | string}`;

/**
 * yyyy-mm-dd
 */
export type StringDateUpToDay = `${number}-${number}-${number}`;
