import { styled } from 'styled-components';

import { ModalContainerProps } from '.';

export const All = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.35);
`;

export const Container = styled.div<ModalContainerProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: grid;
  grid-template-rows: 1fr 6fr;

  width: ${props => (props.size === 'sm' ? '290px' : '700px')};
  height: 290px;

  font-size: 1rem;
  border-radius: 12px;
  border: 2px solid #f6f6f6;

  background-color: white;

  padding: 5px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  alignt-items: center;

  width: 100%;

  padding: 10px;

  border-bottom: 1px solid #f6f6f6;

  font-size: 1.5rem;
  font-weight: bold;
`;

export const Body = styled.div`
  font-size: 1.2rem;
  padding: 10px;
`;

export const Description = styled.div`
  color: gray;
  padding: 10px;
`;

export const CloseButton = styled.button`
  width: 20px;
  height: 20px;
`;
