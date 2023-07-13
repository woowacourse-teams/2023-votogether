import { styled } from 'styled-components';

export const Container = styled.li`
  display: flex;
  gap: 10px;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 20px;
  border-radius: 4px;

  background-color: #e6e6e6;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  width: 100%;
`;

export const ContentTextArea = styled.textarea`
  width: 100%;
  padding: 8px;

  font-size: 1.3rem;
  line-height: 2.4rem;

  background-color: #e6e6e6;

  resize: none;
`;

export const ImageContainer = styled.div`
  width: 80%;
  margin-top: 20px;

  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 4px;

  aspect-ratio: 1/1;
  object-fit: cover;
`;

export const ImageCancelWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const CancelButtonWrapper = styled.div`
  width: 34px;
  height: 100%;
`;

export const ButtonCssText = `
display: flex;
justify-content: center;
align-items: center;

height: 24px;
width: 24px;
border-radius: 50%;

background-color: #bebebe;

cursor: pointer;;
`;
