import { styled } from 'styled-components';

export const Container = styled.li<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;

  border: ${({ isSelected }) =>
    isSelected ? '2px solid #ff7877' : '1px solid rgba(0, 0, 0, 0.1)'};
  border-radius: 4px;
  padding: 15px 20px;

  color: #5b5b5b;

  cursor: pointer;

  @media (min-width: 960px) {
    padding: 20px 30px;
  }
`;

export const Image = styled.img`
  border-radius: 4px;
  margin-bottom: 12px;

  width: 100%;

  aspect-ratio: 1/1;
  object-fit: cover;
  @media (min-width: 960px) {
    margin-bottom: 24px;
  }
`;

export const PreviewContent = styled.p`
  display: -webkit-box;

  font-size: 1.4rem;
  font-weight: 500;
  text-overflow: ellipsis;
  word-break: break-word;

  overflow: hidden;

  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;

  @media (min-width: 960px) {
    font-size: 1.6rem;
  }
`;

export const DetailContent = styled.p`
  font-size: 1.4rem;
  font-weight: 500;

  @media (min-width: 960px) {
    font-size: 1.6rem;
  }
`;

export const ProgressContainer = styled.div`
  margin-top: 12px;

  @media (min-width: 960px) {
    margin-top: 18px;
  }
`;

export const TextContainer = styled.div`
  margin-top: 8px;

  text-align: end;
  font-weight: 500;

  @media (min-width: 960px) {
    margin-top: 12px;

    font-size: 1.6rem;
  }
`;

export const PeopleText = styled.span`
  font-size: 1.4rem;

  @media (min-width: 960px) {
    font-size: 1.6rem;
  }
`;

export const PercentText = styled.span`
  margin-left: 4px;

  font-size: 1.2rem;

  opacity: 0.7;

  @media (min-width: 960px) {
    font-size: 1.4rem;
  }
`;
