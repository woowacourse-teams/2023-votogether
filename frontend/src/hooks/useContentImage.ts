import { ChangeEvent, useRef, useState } from 'react';

import { MAX_FILE_SIZE } from '@components/PostForm/constants';

export const useContentImage = (imageUrl: string = '') => {
  const [contentImage, setContentImage] = useState(imageUrl);
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  const removeImage = () => {
    setContentImage('');
    if (contentInputRef.current) contentInputRef.current.value = '';
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
      setContentImage(reader.result?.toString() ?? '');
    };
  };

  return { contentImage, contentInputRef, removeImage, handleUploadImage };
};
