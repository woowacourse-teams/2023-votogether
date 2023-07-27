import { ChangeEvent, useState } from 'react';

import { MAX_FILE_SIZE } from './useWritingOption';

export const useContentImage = (imageUrl?: string) => {
  const [contentImage, setContentImage] = useState(imageUrl);

  const removeImage = () => {
    setContentImage('');
  };

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    event.target.setCustomValidity('');

    if (file.size > MAX_FILE_SIZE) {
      event.target.setCustomValidity('사진의 용량은 5MB 이하만 가능합니다.');
      event.target.reportValidity();

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setContentImage(reader.result?.toString());
    };
  };

  return { contentImage, removeImage, handleUploadImage };
};
