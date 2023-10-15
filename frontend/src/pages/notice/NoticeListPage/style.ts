import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  padding-bottom: 30px;
`;

export const Title = styled.span`
  font: var(--text-title);
  font-size: 2.4rem;
  text-align: center;

  padding: 48px 0;
`;

export const ButtonWrapper = styled.div`
  width: 80px;
  height: 46px;

  margin-top: 18px;
`;
