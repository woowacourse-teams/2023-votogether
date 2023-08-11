import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 30px 20px;
  border-top: 1px solid black;

  position: fixed;
  bottom: 0;
  left: 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 50px;
`;

export const LogoImage = styled.img`
  width: 80px;
  height: 80px;

  border-radius: 16px;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 24px;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
`;

export const Title = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
`;

export const Description = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

export const CancelButton = styled.button`
  padding: 10px;

  position: relative;
  bottom: 10px;
  left: 10px;

  cursor: pointer;
`;

export const IconImage = styled.img`
  width: 24px;
  height: 24px;
`;

export const InstallButton = styled.button`
  align-self: end;

  border-radius: 6px;

  width: 190px;
  height: 40px;

  font-size: 1.6rem;
  font-weight: 500;

  color: white;
  background-color: #5383ed;

  cursor: pointer;
`;
