import { styled } from 'styled-components';

import LogoButton from '@components/common/LogoButton';

import { theme } from '@styles/theme';

import ErrorBoundary from './ErrorBoundary';

/* 가장 최상단에서 에러가 난 경우 보여줄 에러 바운더리.
 * nav를 사용할 수 없고 글로벌 스타일드도 사용할 수 없음.
 * 때문에 nav를 제거한 빈 헤더를 정의하고, 에러메세지 컴포넌트를 사용
 */

class ErrorBoundaryForTopClass extends ErrorBoundary {
  render() {
    if (this.state.hasError) {
      return (
        <>
          <WideTemplateHeader />
          <NarrowTemplateHeader />
          <ErrorWrapper>
            <LogoButton content="icon" style={{ width: '80px', height: '80px' }} />
            <Title>'요청하신 데이터를 불러오는데 실패했습니다.'</Title>
            <Description>
              문제가 지속되는 경우 votogether2023@gmail.com 로 문의해주세요.
            </Description>
          </ErrorWrapper>
        </>
      );
    }

    return this.props.children;
  }
}

const WideTemplateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 70px;

  position: fixed;
  top: 0;

  //글로벌 스타일 바깥쪽이라 var 적용되지 않음
  background-color: #1f1f1f;

  padding: 0 80px;

  @media (max-width: ${theme.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`;

const NarrowTemplateHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  height: 55px;
  padding: 0 20px;

  position: fixed;
  top: 0;

  background-color: #1f1f1f;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  & > button {
    border: 0;

    cursor: auto;
  }

  margin: 90px 10px 20px 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin-top: 120px;
  }
`;

export const Title = styled.h1`
  width: 90%;
  margin-top: 20px;

  color: rgba(0, 0, 0, 0.7);

  font-size: 20px;
  font-weight: bold;

  text-align: center;
  word-break: keep-all;
`;

export const Description = styled.p`
  width: 90%;

  color: gray;

  font: var(--text-body);
  text-align: center;
  word-break: keep-all;
`;

export default ErrorBoundaryForTopClass;
