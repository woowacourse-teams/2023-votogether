import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 16px 12px;
  border-radius: 4px;

  font-size: 1.6rem;

  background-color: var(--gray);
`;

export const Badge = styled.span`
  margin-bottom: 7px;
`;

export const NickName = styled.span`
  margin-bottom: 12px;

  font-size: 2rem;

  color: var(--red);
`;

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextCardLink = styled(Link)`
  display: flex;
  flex-direction: column;

  text-decoration: none;
  color: initial;
`;

export const TextCardTitle = styled.span`
  font-size: 1.4rem;
`;

export const TextCardContent = styled.span`
  font-size: 1.2rem;
`;
