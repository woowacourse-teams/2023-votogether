import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.li`
  width: 100%;

  position: relative;

  font: var(--text-small);
  letter-spacing: 0.5px;
  line-height: 1.5;

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-caption);
  }
`;

export const Category = styled.span`
  font: var(--text-small);

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-caption);
  }
`;

export const ActivateState = styled.div<{ $isActive: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;

  position: absolute;
  right: 0;
  top: 0;

  background-color: ${({ $isActive }) => ($isActive ? 'var(--active-post)' : 'var(--dark-gray)')};
`;

export const Title = styled.p<{ $isPreview: boolean }>`
  display: -webkit-box;

  font: var(--text-title);
  text-overflow: ellipsis;
  word-break: break-word;

  overflow: hidden;

  -webkit-line-clamp: ${props => props.$isPreview && '2'};
  -webkit-box-orient: vertical;

  @media (min-width: ${theme.breakpoint.sm}) {
    font-size: 2.2rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font: var(--text-small);

  & > :nth-child(2) {
    margin-left: 10px;
  }

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-caption);
  }
`;

export const Content = styled.div<{ $isPreview: boolean }>`
  display: -webkit-box;

  margin: 10px 0;

  font: var(--text-caption);
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-wrap;

  overflow: hidden;

  -webkit-line-clamp: ${props => props.$isPreview && '10'};
  -webkit-box-orient: vertical;

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;

export const DetailLink = styled(Link)<{ $isPreview: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Image = styled.img`
  width: 80%;
  border-radius: 4px;
  margin-bottom: 10px;
  border: 1px solid var(--gray);
  align-self: center;

  aspect-ratio: 1/1;
  object-fit: contain;

  @media (min-width: ${theme.breakpoint.md}) {
    margin-bottom: 20px;
  }
`;

export const PreviewBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;

  height: 30px;
  margin-top: 10px;
`;

export const IconUint = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;

  font: var(--text-caption);
`;

export const Icon = styled.img`
  height: 24px;
  width: 24px;
`;
