import { calculateAspectRatioSize } from '@utils/image/calculateAspectRatioSize';

test.each([
  [
    { originWidth: 3000, originHeight: 820, maxWidthOrHeight: 1280 },
    { width: 1280, height: 349.9 },
  ],
  [
    { originWidth: 1280, originHeight: 1303, maxWidthOrHeight: 1280 },
    { width: 1257.4, height: 1280 },
  ],
  [
    { originWidth: 2403, originHeight: 603, maxWidthOrHeight: 1280 },
    { width: 1280, height: 321.2 },
  ],
  [
    { originWidth: 1200, originHeight: 820, maxWidthOrHeight: 1280 },
    { width: 1200, height: 820 },
  ],
  [
    { originWidth: 200, originHeight: 200, maxWidthOrHeight: 1280 },
    { width: 200, height: 200 },
  ],
])(
  'calculateAspectRatioSize에서 입력받은 너비, 높이가 `maxWidthOrHeight`보다 크다면, 너비를 `maxWidthOrHeight`로 설정하고, 높이를 원래의 가로 세로 비율을 유지하며 계산하여 반환합니다. 너비, 높이 둘 중 긴 값이 최대 너비 혹은 높이보다 작다면 기존의 너비, 높이를 반환합니다.',
  ({ originWidth, originHeight, maxWidthOrHeight }, expected) => {
    const result = calculateAspectRatioSize({ originWidth, originHeight, maxWidthOrHeight });

    expect(result).toEqual(expected);
  }
);
