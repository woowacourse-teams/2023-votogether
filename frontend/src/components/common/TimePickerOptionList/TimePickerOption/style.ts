import { styled } from 'styled-components';

export const TimeBox = styled.div`
  width: 33.3%;
  height: 155px;
  border: 1px solid white;

  background-color: #f2f2f2;

  text-align: center;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Time = styled.div<{ $isPicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;
  border-top: 1px solid gray;

  background: ${props => (props.$isPicked ? '#F2F2F2' : 'var(--white)')};

  font: var(--text-body);
  font-weight: ${props => (props.$isPicked ? 'bold' : 'light')};
`;
