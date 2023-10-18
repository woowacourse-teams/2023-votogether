import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.button<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  border: ${({ $isSelected }) =>
    $isSelected ? '2px solid var(--primary-color)' : '1px solid rgba(0, 0, 0, 0.1)'};
  border-radius: 4px;
  padding: 10px 15px;

  color: #5b5b5b;

  text-align: left;

  cursor: pointer;

  @media (min-width: ${theme.breakpoint.md}) {
    padding: 15px 25px;
  }
`;

export const Image = styled.img`
  width: 80%;
  border-radius: 4px;
  border: 1px solid var(--bright-gray);
  margin: 0 auto 10px auto;

  aspect-ratio: 1/1;
  object-fit: contain;

  @media (min-width: ${theme.breakpoint.md}) {
    margin-bottom: 20px;
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

  color: var(--text-dark-gray);

  font: var(--text-small);

  @media (min-width: ${theme.breakpoint.md}) {
    font: var(--text-caption);
  }
`;
