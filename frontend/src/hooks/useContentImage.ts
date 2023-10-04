import { ChangeEvent, ClipboardEvent, useRef, useState } from 'react';

import { uploadImage } from '@utils/post/uploadImage';

export const useContentImage = (imageUrl: string = '') => {
  const [contentImage, setContentImage] = useState(imageUrl);
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  const handlePasteImage = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    const file = event.clipboardData.files[0];

    if (!file) return;

    if (file.type.slice(0, 5) === 'image') {
      event.preventDefault();

      uploadImage({
        imageFile: file,
        inputElement: contentInputRef.current,
        setPreviewImageUrl: setContentImage,
      });
    }
  };

  const removeImage = () => {
    setContentImage('');
    if (contentInputRef.current) contentInputRef.current.value = '';
  };

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    uploadImage({
      imageFile: file,
      inputElement: contentInputRef.current,
      setPreviewImageUrl: setContentImage,
    });
  };

  return { contentImage, contentInputRef, removeImage, handleUploadImage, handlePasteImage };
};
