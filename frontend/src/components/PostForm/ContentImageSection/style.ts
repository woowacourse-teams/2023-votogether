import { styled } from 'styled-components';

import { Size } from '@type/style';

export const ContentImageContainer = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
`;

const IMAGE_SIZE = {
  sm: '25%',
  md: '50%',
  lg: '100%',
};

export const ContentImageWrapper = styled.div<{ $size: Size }>`
  width: ${props => IMAGE_SIZE[props.$size]};
  height: 100%;

  position: relative;
`;

export const ContentImage = styled.img`
  width: 100%;
  border-radius: 4px;

  aspect-ratio: 1/1;
  object-fit: contain;
`;

export const FileInputContainer = styled.div`
  width: 100%;
  border-radius: 50%;
`;

export const FileInput = styled.input`
  visibility: hidden;
`;

export const Button = styled.button<{ $isVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  padding: 5px 0;

  background-color: var(--primary-color);

  visibility: ${props => (props.$isVisible ? 'hidden' : '')};
  cursor: pointer;
`;

export const Label = styled.label`
  width: 100%;
  height: 100%;

  color: var(--white);

  font: var(--text-body);
  text-align: center;

  cursor: pointer;
`;
