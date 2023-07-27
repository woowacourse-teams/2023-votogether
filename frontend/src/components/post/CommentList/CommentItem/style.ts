import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  font: var(--text-caption);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 7px;
`;

export const Title = styled.span`
  font-weight: 600;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: end;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

export const SubTitle = styled.span`
  font: var(--text-small);
  color: var(--dark-gray);

  &:nth-child(2) {
    margin-left: 6px;
  }
`;

export const MenuWrapper = styled.div`
  position: absolute;
  right: 0%;
`;

export const Description = styled.p``;

export const MenuContainer = styled.button`
  width: 24px;
  height: 24px;

  position: relative;

  color: #888;

  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
