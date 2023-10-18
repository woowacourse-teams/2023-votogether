import { MouseEvent, useState } from 'react';

import { useDialog } from './useDialog';

export const useImageZoomModal = () => {
  const [imageSrc, setImageSrc] = useState('');
  const { closeDialog, dialogRef, handleCloseClick, openDialog } = useDialog();

  const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    const src = event.currentTarget.src;
    setImageSrc(src);
    openDialog();
  };

  return {
    imageSrc,
    closeZoomModal: closeDialog,
    handleCloseClick,
    zoomModalRef: dialogRef,
    handleImageClick,
  };
};
