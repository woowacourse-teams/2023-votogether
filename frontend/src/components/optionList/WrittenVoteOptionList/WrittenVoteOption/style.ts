import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.li<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;

  border: ${({ $isSelected }) =>
    $isSelected ? '2px solid var(--primary-color)' : '1px solid rgba(0, 0, 0, 0.1)'};
  border-radius: 4px;
  padding: 15px 20px;

  color: #5b5b5b;

  cursor: pointer;

  @media (min-width: ${theme.breakpoint.md}) {
    padding: 20px 30px;
  }
`;

export const Image = styled.img`
  border-radius: 4px;
  margin-bottom: 12px;

  width: 100%;

  aspect-ratio: 1/1;
  object-fit: cover;
  @media (min-width: ${theme.breakpoint.md}) {
    margin-bottom: 24px;
  }
`;

export const PreviewContent = styled.p`
  display: -webkit-box;

  font: var(--text-caption);
  font-weight: 500;
  text-overflow: ellipsis;
  word-break: break-word;

  overflow: hidden;

  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;

  @media (min-width: ${theme.breakpoint.md}) {
    font: var(--text-body);
  }
`;

export const DetailContent = styled.p`
  font: var(--text-caption);
  font-weight: 500;

  @media (min-width: ${theme.breakpoint.md}) {
    font: var(--text-body);
  }
`;

export const ProgressContainer = styled.div`
  margin-top: 12px;

  @media (min-width: ${theme.breakpoint.md}) {
    margin-top: 18px;
  }
`;

export const TextContainer = styled.div`
  margin-top: 8px;

  text-align: end;
  font-weight: 500;

  @media (min-width: ${theme.breakpoint.md}) {
    margin-top: 12px;

    font: var(--text-body);
  }
`;

export const PeopleText = styled.span`
  font: var(--text-caption);

  @media (min-width: ${theme.breakpoint.md}) {
    font: var(--text-body);
  }
`;

export const PercentText = styled.span`
  margin-left: 4px;

  font: var(--text-small);

  opacity: 0.7;

  @media (min-width: ${theme.breakpoint.md}) {
    font: var(--text-caption);
  }
`;
