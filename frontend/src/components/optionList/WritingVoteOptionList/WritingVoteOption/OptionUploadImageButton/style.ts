import { styled } from 'styled-components';

import { ButtonCssText, IconImage } from '../style';

export const Container = styled.div<{ $isVisible: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;

  visibility: ${props => props.$isVisible && 'hidden'};
`;

export const Label = styled.label`
  ${ButtonCssText}
`;

export const FileInput = styled.input`
  position: absolute;
  left: 0;

  visibility: hidden;
`;

export const Image = styled(IconImage)``;
