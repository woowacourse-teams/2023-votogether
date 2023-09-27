import { MAX_FILE_SIZE } from '@constants/policy';
import { POST_PHOTO } from '@constants/policyMessage';

import { convertImageToWebP } from '@utils/image/convertImageToWebP';

export const uploadImage = async ({
  imageFile,
  inputElement,
  setPreviewImageUrl,
}: {
  imageFile: File;
  inputElement: HTMLInputElement | null;
  setPreviewImageUrl: (previewUrl: string) => void;
}) => {
  if (!inputElement) return;

  const webpFileList = await convertImageToWebP(imageFile);

  inputElement.files = webpFileList;

  const reader = new FileReader();

  const webpFile = webpFileList[0];

  reader.readAsDataURL(webpFile);

  inputElement.setCustomValidity('');

  if (imageFile.size > MAX_FILE_SIZE) {
    inputElement.setCustomValidity(POST_PHOTO.PHOTO_CAPACITY);
    inputElement.reportValidity();

    return;
  }

  reader.onloadend = () => {
    setPreviewImageUrl(reader.result?.toString() ?? '');
  };
};
