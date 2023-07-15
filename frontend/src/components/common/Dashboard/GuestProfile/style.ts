import { styled } from 'styled-components';

import { ProfileCSSText } from '../style';

export const Container = styled.div`
  ${ProfileCSSText}
  align-items: center;
`;

export const Image = styled.img`
  width: 183px;
  height: 40px;
`;

export const TextCard = styled.span`
  margin-top: 20px;

  font: var(--text-caption);

  color: var(--dark-gray);
`;
