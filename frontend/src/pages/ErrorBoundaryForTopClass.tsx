import { styled } from 'styled-components';

import ErrorMessage from '@components/common/ErrorMessage';

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
            <ErrorMessage />
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
  margin-top: 20px;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin-top: 50px;
  }
`;

export default ErrorBoundaryForTopClass;
