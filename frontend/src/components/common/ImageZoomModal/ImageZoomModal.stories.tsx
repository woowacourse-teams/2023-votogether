import type { Meta, StoryObj } from '@storybook/react';

import React, { MouseEvent, useState } from 'react';

import { useDialog } from '@hooks/useDialog';

import ImageZoomModal from '.';

const meta: Meta<typeof ImageZoomModal> = {
  component: ImageZoomModal,
};

export default meta;
type Story = StoryObj<typeof ImageZoomModal>;

export const Default: Story = {
  render: () => <ImageZoomModalStory />,
};

function ImageZoomModalStory() {
  const [imageSrc, setImageSrc] = useState<string>('');
  const { closeDialog, dialogRef, handleCloseClick, handleKeyDown, openDialog } = useDialog();

  const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
    const src = event.currentTarget.src;
    setImageSrc(src);
    openDialog();
  };

  return (
    <>
      <img onClick={handleImageClick} src="https://source.unsplash.com/random" />
      <img onClick={handleImageClick} src="https://source.unsplash.com/random" />
      <ImageZoomModal
        src={imageSrc}
        closeDialog={closeDialog}
        handleCloseClick={handleCloseClick}
        handleCloseKeyDown={handleKeyDown}
        ref={dialogRef}
      />
    </>
  );
}
