import { MouseEvent, useRef } from 'react';

export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (!dialogRef.current) return;

    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (!dialogRef.current) return;

    dialogRef.current.close();
  };

  const handleCloseClick = (event: MouseEvent<HTMLDialogElement>) => {
    const modalBoundary = event.currentTarget.getBoundingClientRect();

    if (
      modalBoundary.left > event.clientX ||
      modalBoundary.right < event.clientX ||
      modalBoundary.top > event.clientY ||
      modalBoundary.bottom < event.clientY
    ) {
      closeDialog();
    }
  };

  return { dialogRef, openDialog, closeDialog, handleCloseClick };
};
