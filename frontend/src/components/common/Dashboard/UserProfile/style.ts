import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

export const Badge = styled.span`
  margin-bottom: 7px;
`;

export const NickName = styled.span`
  margin-bottom: 12px;
  margin-left: 5px;

  font: var(--text-title);

  color: var(--red);
`;

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const TextCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextCardLink = styled(Link)`
  display: flex;
  flex-direction: column;

  color: initial;
`;

export const TextCardTitle = styled.span`
  font: var(--text-caption);
  font-weight: 600;
  text-decoration: none;
`;

export const TextCardContent = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font: var(--text-caption);
  text-align: center;
`;

export const LinkImg = styled.img`
  width: 12px;
  height: 12px;

  margin-top: 3px;
`;
