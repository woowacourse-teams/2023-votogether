import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  padding: 0 10px 30px 10px;
`;

export const Title = styled.span`
  font: var(--text-title);
  font-size: 2.4rem;
  text-align: center;

  padding: 48px 0;
`;
