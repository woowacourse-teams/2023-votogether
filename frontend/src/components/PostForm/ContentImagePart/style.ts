import { styled } from 'styled-components';

export const ContentImageContainer = styled.div<{ $isVisible: boolean }>`
  display: grid;
  grid-template-columns: 40px auto;

  visibility: ${props => !props.$isVisible && 'hidden'};
`;

export const ContentImageWrapper = styled.div`
  width: 60%;

  position: relative;
`;

export const ContentImage = styled.img`
  width: 100%;
  border-radius: 4px;

  aspect-ratio: 1/1;
  object-fit: cover;
`;

export const FileInputContainer = styled.div<{ $isVisible: boolean }>`
  width: 100%;
  margin: 5px;
  border-radius: 50%;

  visibility: ${props => !props.$isVisible && 'hidden'};
`;

export const FileInput = styled.input`
  visibility: hidden;
`;

export const Label = styled.label`
  display: block;

  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  padding: 5px 0;

  background-color: var(--primary-color);
  color: var(--white);

  font: var(--text-body);
  text-align: center;

  cursor: pointer;
`;
