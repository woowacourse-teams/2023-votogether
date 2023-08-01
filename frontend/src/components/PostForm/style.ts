import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;

export const HeaderButton = styled.button`
  width: 30px;

  color: white;

  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  margin: 70px 10px 20px 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    grid-template-columns: 2fr 1fr;
    gap: 50px;

    margin: 30px 80px 20px 80px;
    height: 100%;
  }
`;

export const LeftSide = styled.div<{ $hasImage: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 35px 40px 400px ${props => (props.$hasImage ? '170px' : '50px')};
  gap: 5px;

  @media (min-width: ${theme.breakpoint.md}) {
    grid-template-rows: 40px 50px auto ${props => (props.$hasImage ? '180px' : '60px')};
  }
`;

export const Title = styled.input`
  color: gray;

  font: var(--text-title);

  @media (min-width: ${theme.breakpoint.md}) {
    font-size: 2.4rem;
  }

  @media (min-width: ${theme.breakpoint.lg}) {
    font-size: 2.8rem;
  }
`;

export const Content = styled.textarea`
  color: gray;

  resize: none;

  font: var(--text-caption);
  font-family: 'Raleway', sans-serif;

  @media (min-width: ${theme.breakpoint.md}) {
    font-size: 1.8rem;
  }

  @media (min-width: ${theme.breakpoint.lg}) {
    height: 670px;

    font-size: 2rem;
  }
`;

export const ContentImagePartWrapper = styled.div<{ $hasImage: boolean }>`
  @media (min-width: ${theme.breakpoint.sm}) {
    width: ${props => props.$hasImage && '50%'};
  }
`;

export const RightSide = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  margin: 0 5px;

  @media (min-width: ${theme.breakpoint.sm}) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 400px auto 50px;
  }
`;

export const OptionListWrapper = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  overflow-x: hidden;

  @media (min-width: ${theme.breakpoint.sm}) {
    overflow-y: auto;
  }
`;

export const Deadline = styled.div`
  font: var(--text-body);
  font-weight: bold;
  text-align: center;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin: 10px 0;
    height: 160px;
  }
`;

export const DeadlineDescription = styled.div`
  display: flex;
  flex-direction: column;

  margin: 10px 0;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin: 10px 0;
    min-height: 40px;
  }
`;

export const Description = styled.div`
  color: gray;

  font: var(--text-small);
`;

export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 46px);
  gap: 10px;

  margin-bottom: 30px;
`;

export const SaveButtonWrapper = styled.div`
  display: none;

  visibility: hidden;

  @media (min-width: ${theme.breakpoint.sm}) {
    display: flex;

    width: 100%;
    height: 100%;

    visibility: visible;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  padding: 10px;

  font: var(--text-body);
  font-weight: bold;
`;

export const CloseButton = styled.button`
  width: 25px;
  height: 20px;

  background: white;

  font: var(--text-body);

  cursor: pointer;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  align-items: center;
  gap: 10px;

  padding: 10px 0;

  font: var(--text-caption);
`;

export const ResetButtonWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 50%;
  height: 40px;
`;
