import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 225px;
  height: 100vh;
  padding: 20px;
  border-right: 2px solid var(--gray);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  width: 100%;
  margin-bottom: 70px;

  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ButtonWrapper = styled.div`
  width: 90px;
  height: 40px;

  position: absolute;
  bottom: 30px;
`;

export const SelectCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-self: start;

  width: 100%;
  border-bottom: 2px solid var(--gray);
  padding-bottom: 20px;
  margin-top: 32px;
`;

export const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;

  background-color: var(--red);
`;

export const SelectCategoryText = styled.span`
  font: var(--text-body);
`;

export const CategoryToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-top: 20px;
`;

export const ProfileCSSText = `  
display: flex;
flex-direction: column;

width:100%;
padding: 16px 12px;
border-radius: 4px;

font-size: 1.6rem;

background-color: var(--gray);
`;
