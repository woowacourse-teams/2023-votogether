import { styled } from 'styled-components';

import { TIMEBOX_CHILD_HEIGHT } from './constants';

export const Container = styled.div`
  width: 33.3%;
  height: 99px;

  position: relative;
`;

export const TimeBox = styled.div`
  width: 100%;
  height: ${`${TIMEBOX_CHILD_HEIGHT * 3}px`};

  position: absolute;

  background-color: rgba(0, 0, 0, 0);

  text-align: center;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const PickedTimeOverlay = styled.div`
  width: 100%;
  height: 33px;

  position: absolute;
  top: 33%;

  background-color: rgba(128, 128, 128, 0.2);

  z-index: -1;
`;

export const Time = styled.div<{ $isPicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${`${TIMEBOX_CHILD_HEIGHT}px`};

  color: ${props => !props.$isPicked && 'gray'};

  font: var(--text-body);
  font-weight: ${props => (props.$isPicked ? 'bold' : 'light')};
`;

export const Empty = styled.div`
  height: ${`${TIMEBOX_CHILD_HEIGHT}px`};
`;
