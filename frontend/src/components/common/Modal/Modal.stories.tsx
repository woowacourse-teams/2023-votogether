import type { Meta } from '@storybook/react';

import { useState } from 'react';

import { styled } from 'styled-components';

import Modal from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

export const Default = () => {
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
        <Modal size="sm" onModalClose={closeModal}>
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

  const closeModal = () => {
    if (isOpen === true) setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <Modal size="lg" onModalClose={closeModal}>
          <p>This is Wide Modal</p>
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
        <Modal size="sm" onModalClose={closeModal}>
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  alignt-items: center;

  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  padding: 10px;

  font-size: 1.5rem;
  font-weight: bold;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 5px;

  padding: 10px;

  font-size: 1.4rem;
`;

const Description = styled.div`
  color: gray;

  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
`;

const S = {
  Header,
  Body,
  Description,
  CloseButton,
};
