import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;
  left: 0;

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

  padding: 70px 10px 20px 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    grid-template-columns: 2fr 1fr;
    gap: 30px;

    padding: 30px 40px 20px 40px;
  }

  @media (min-width: ${theme.breakpoint.md}) {
    grid-template-columns: 1fr 300px;
    padding: 30px 80px 20px 8cqb;
  }

  @media (min-width: ${theme.breakpoint.lg}) {
    grid-template-columns: 1fr 400px;
  }
`;

export const LeftSide = styled.div<{ $hasImage: boolean }>`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.breakpoint.sm}) {
    display: grid;
    grid-template-rows: max-content max-content minmax(max-content, 1fr) max-content;

    height: calc(100vh - 130px);

    overflow-y: ${({ $hasImage }) => $hasImage && 'scroll'};
  }
`;

export const Title = styled.input`
  padding: 10px;

  color: gray;

  font: var(--text-title);

  @media (min-width: ${theme.breakpoint.md}) {
    font-size: 2.4rem;
  }

  @media (min-width: ${theme.breakpoint.lg}) {
    font-size: 2.8rem;
    line-height: 3.6rem;
  }
`;

export const Content = styled.textarea`
  min-height: 300px;
  padding: 10px;
  margin-bottom: 10px;

  color: gray;

  resize: none;

  font: var(--text-caption);
  font-family: 'Raleway', sans-serif;

  @media (min-width: ${theme.breakpoint.md}) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }

  @media (min-width: ${theme.breakpoint.lg}) {
    font-size: 2rem;
    line-height: 2.8rem;
  }
`;

export const ContentImagePartWrapper = styled.div<{ $hasImage: boolean }>`
  justify-self: ${props => props.$hasImage && 'center'};
  height: 100%;

  @media (min-width: ${theme.breakpoint.sm}) {
    max-width: ${({ $hasImage }) => $hasImage && '800px'};
    width: ${({ $hasImage }) => $hasImage && '80%'};
  }
`;

export const RightSide = styled.div`
  display: grid;
  grid-template-rows: auto max-content max-content;

  @media (min-width: ${theme.breakpoint.sm}) {
    height: calc(100vh - 130px);
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
    height: 60px;

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
