import { styled } from 'styled-components';

export const Button = styled.button`
  width: 60px;
  height: 60px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;

  background-color: var(--white);

  cursor: pointer;
`;

//이벤트를 위한 코드
export const Image = styled.img<{ $isMoving: boolean }>`
  width: 50px;
  height: 50px;

  position: absolute;
  right: 13px;
  bottom: 83px;
  z-index: -1;

  ${props =>
    props.$isMoving
      ? `animation: move 1s linear infinite;
  
  @keyframes move {
    0% {
      right:  13px;
    }
    50% {
      right: 200px;
    }
    100% {
      right:  13px;
    }
  }`
      : ''};
`;
