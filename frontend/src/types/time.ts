/**
 * DHM이란, Day Hour Minute을 가진 객체를 의미합니다.
 */
export interface DHMTime {
  day: number;
  hour: number;
  minute: number;
}

export type StringDate = `${number}-${number}-${number} ${number}:${number}`;
