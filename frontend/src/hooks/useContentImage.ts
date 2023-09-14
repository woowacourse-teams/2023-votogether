import { ChangeEvent, useRef, useState } from 'react';

import { MAX_FILE_SIZE } from '@components/PostForm/constants';

import { convertImageToWebP } from '@utils/resizeImage';

export const useContentImage = (imageUrl: string = '') => {
  const [contentImage, setContentImage] = useState(imageUrl);
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  const removeImage = () => {
    setContentImage('');
    if (contentInputRef.current) contentInputRef.current.value = '';
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    const webpFileList = await convertImageToWebP(file);

    event.target.files = webpFileList;

    const reader = new FileReader();

    const webpFile = webpFileList[0];

    reader.readAsDataURL(webpFile);

    event.target.setCustomValidity('');

    if (file.size > MAX_FILE_SIZE) {
      event.target.setCustomValidity('사진의 용량은 1.5MB 이하만 가능합니다.');
      event.target.reportValidity();

      return;
    }

    reader.onloadend = () => {
      setContentImage(reader.result?.toString() ?? '');
    };
  };

  return { contentImage, contentInputRef, removeImage, handleUploadImage };
};
