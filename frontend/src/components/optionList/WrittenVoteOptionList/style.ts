import { styled } from 'styled-components';

export const VoteOptionListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  @media (min-width: 960px) {
    gap: 18px;
  }
`;
