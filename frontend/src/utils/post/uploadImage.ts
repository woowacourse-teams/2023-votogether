import { MAX_FILE_SIZE } from '@constants/post';

import { convertImageToWebP } from '@utils/resizeImage';

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
    inputElement.setCustomValidity('사진의 용량은 10MB 이하만 가능합니다.');
    inputElement.reportValidity();

    return;
  }

  reader.onloadend = () => {
    setPreviewImageUrl(reader.result?.toString() ?? '');
  };
};
