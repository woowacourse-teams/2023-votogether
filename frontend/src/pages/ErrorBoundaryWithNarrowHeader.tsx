import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';

import ErrorBoundary from './ErrorBoundary';
import * as S from './ErrorBoundaryWithNarrowHeaderStyle';

class ErrorBoundaryWithNarrowHeader extends ErrorBoundary {
  render() {
    if (this.state.hasError) {
      return (
        <>
          <NarrowTemplateHeader />
          <S.Wrapper>{this.state.errorMessage}</S.Wrapper>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWithNarrowHeader;
