import { styled } from 'styled-components';

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

export const Container = styled.div<{ size: string }>`
  display: grid;
  grid-template-rows: 1fr 6fr;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${props => (props.size === 'sm' ? '290px' : '700px')};
  height: 290px;
  border-radius: 12px;
  border: 2px solid #f6f6f6;
  padding: 5px;

  background-color: white;

  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  alignt-items: center;

  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  padding: 10px;

  font-size: 1.5rem;
  font-weight: bold;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 5px;

  padding: 10px;

  font-size: 1.4rem;
`;

export const Description = styled.div`
  color: gray;

  font-size: 1.2rem;
`;

export const CloseButton = styled.button`
  width: 20px;
  height: 20px;
`;
