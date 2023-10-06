import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import styled from 'styled-components';

import { useImageZoomModal } from '@hooks/useImageZoomModal';

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
  const { closeZoomModal, handleCloseClick, handleImageClick, imageSrc, zoomModalRef } =
    useImageZoomModal();

  return (
    <>
      <Container>
        {IMAGE_URL_LIST.map(item => (
          <Image key={item} src={item} onClick={handleImageClick} />
        ))}
      </Container>
      <ImageZoomModal
        src={imageSrc}
        closeZoomModal={closeZoomModal}
        handleCloseClick={handleCloseClick}
        ref={zoomModalRef}
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
