import { styled } from 'styled-components';

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  width: 90%;
  margin: 40px 20px 0px 16px;

  font: var(--text-caption);
`;

export const ModalTitle = styled.div`
  font: var(--text-title);
`;

export const ModalDescription = styled.div`
  padding-left: 25px;

  color: gray;
  font-size: 14px;
`;

export const ButtonListWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;

  width: 90%;
  height: 50px;
`;
