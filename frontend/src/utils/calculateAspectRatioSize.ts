export const calculateAspectRatioSize = ({
  originWidth,
  originHeight,
  maxWidthOrHeight,
}: {
  originWidth: number;
  originHeight: number;
  maxWidthOrHeight: number;
}) => {
  const maxSize = Math.max(originWidth, originHeight);

  if (maxSize <= maxWidthOrHeight) {
    return { width: originWidth, height: originHeight };
  }

  if (originWidth === maxSize) {
    const width = maxWidthOrHeight;
    const height = Number(((originHeight * maxWidthOrHeight) / originWidth).toFixed(1));

    return { width, height };
  }

  const width = Number(((originWidth * maxWidthOrHeight) / originHeight).toFixed(1));
  const height = maxWidthOrHeight;

  return { width, height };
};
