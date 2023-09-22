import { imageConverter } from 'upload-images-converter';

import { calculateAspectRatioSize } from './calculateAspectRatioSize';
import { getImageSize } from './getImageSize';

export const convertImageToWebP = async (imageFile: File) => {
  const { width: originWidth, height: originHeight } = await getImageSize(imageFile);

  const { width, height } = calculateAspectRatioSize({
    originWidth,
    originHeight,
    maxWidthOrHeight: 1280,
  });

  const compressedBlob = await imageConverter({
    files: [imageFile],
    width,
    height,
  });

  const outputWebpFile = new File([compressedBlob[0]], `${Date.now().toString()}.webp`);

  const dataTransfer = new DataTransfer();

  dataTransfer.items.add(outputWebpFile);

  return dataTransfer.files;
};
