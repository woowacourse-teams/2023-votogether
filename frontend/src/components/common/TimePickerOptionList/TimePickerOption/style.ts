import { styled } from 'styled-components';

export interface TimeProps {
  isPicked: boolean;
}
export const TimeBox = styled.div`
  width: 33.3%;
  height: 100px;

  background-color; #F2F2F2;

  text-align: center;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Time = styled.div<TimeProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;

  background: ${props => (props.isPicked ? '#F2F2F2' : '#FFFFFF')};

  font-size: 1.3rem;
  font-weight: ${props => (props.isPicked ? 'bold' : 'light')};
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  border: 1px solid #f2f2f2;
`;

export const PickedTimeText = styled.p`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  font-size: 1.5rem;
  font-weight: bold;
`;
