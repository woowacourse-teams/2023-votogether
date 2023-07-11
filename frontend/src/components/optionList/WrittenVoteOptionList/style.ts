import { styled } from 'styled-components';

export const VoteOptionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;

  @media (min-width: 960px) {
    gap: 32px;
  }
`;
