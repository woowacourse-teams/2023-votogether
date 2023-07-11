import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import * as S from './style';

import Modal from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <Modal size="sm" onModalClose={setIsOpen}>
          <p>This is Default Modal</p>
        </Modal>
      )}
    </>
  );
};

export const Wide = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <Modal size="lg" onModalClose={setIsOpen}>
          <p>This is Default Modal</p>
        </Modal>
      )}
    </>
  );
};

export const WithCloseButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    if (isOpen === true) setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <Modal size="sm" onModalClose={setIsOpen}>
          <>
            <S.Header>
              <p>Modal Title</p>
              <S.CloseButton onClick={closeModal}>X</S.CloseButton>
            </S.Header>
            <S.Body>
              <S.Description>This is Description</S.Description>
              This is Content
            </S.Body>
          </>
        </Modal>
      )}
    </>
  );
};
