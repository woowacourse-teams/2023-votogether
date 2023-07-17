import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;

  font-size: 1.2rem;
  letter-spacing: 0.5px;
  line-height: 1.5;

  @media (${theme.breakpoint.sm}) {
    font-size: 1.4rem;
  }
`;

export const Category = styled.span`
  font-size: 1.2rem;

  @media (${theme.breakpoint.sm}) {
    font-size: 1.4rem;
  }
`;

export const Title = styled.p<{ $isPreview: boolean }>`
  display: -webkit-box;

  font-size: 2rem;
  text-overflow: ellipsis;
  word-break: break-word;

  overflow: hidden;

  -webkit-line-clamp: ${props => props.$isPreview && '2'};
  -webkit-box-orient: vertical;

  @media (${theme.breakpoint.sm}) {
    font-size: 2.2rem;
  }
`;

export const Writer = styled.span``;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.2rem;

  :nth-child(2) {
    margin-left: 10px;
  }

  @media (${theme.breakpoint.sm}) {
    font-size: 1.4rem;
  }
`;

export const Time = styled.span``;

export const Content = styled.p<{ $isPreview: boolean }>`
  display: -webkit-box;

  font-size: 1.4rem;
  text-overflow: ellipsis;
  word-break: break-word;

  margin: 10px 0;

  overflow: hidden;

  -webkit-line-clamp: ${props => props.$isPreview && '10'};
  -webkit-box-orient: vertical;

  @media (${theme.breakpoint.sm}) {
    font-size: 1.6rem;
  }
`;
