import type { Meta, StoryObj } from '@storybook/react';

import React, { MouseEvent, useState } from 'react';

import styled from 'styled-components';

import { useDialog } from '@hooks/useDialog';

import { theme } from '@styles/theme';

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
  const { closeDialog, dialogRef, handleCloseClick, openDialog } = useDialog();

  const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
    const src = event.currentTarget.src;
    setImageSrc(src);
    openDialog();
  };

  return (
    <>
      <Container>
        {IMAGE_URL_LIST.map(item => (
          <Image key={item} src={item} onClick={handleImageClick} />
        ))}
      </Container>
      <ImageZoomModal
        src={imageSrc}
        closeDialog={closeDialog}
        handleCloseClick={handleCloseClick}
        ref={dialogRef}
      />
    </>
  );
}

const getRandomImageUrl = (signal: number) => `https://source.unsplash.com/random/sig=${signal}`;

const IMAGE_URL_LIST = Array.from({ length: 50 }, (__, index) => getRandomImageUrl(index));

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  @media (min-width: ${theme.breakpoint.md}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${theme.breakpoint.lg}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;

  cursor: pointer;
`;
