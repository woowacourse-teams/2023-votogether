import ErrorItem from '@components/common/ErrorItem';
import MobileLayoutTemplate from '@components/common/MobileLayoutTemplate';

import ErrorBoundary from './ErrorBoundary';

class ErrorBoundaryWithNarrowHeader extends ErrorBoundary {
  render() {
    if (this.state.hasError) {
      const errorItemProps = { ...this.props };
      delete errorItemProps.children;

      const error: { status: number; message: string } = JSON.parse(this.state.errorMessage);

      if (error.status === 404) {
        errorItemProps.retryInteraction = false;

        return (
          <MobileLayoutTemplate>
            <ErrorItem
              text="해당 페이지는 존재하지 않습니다. 확인 후 다시 요청해주세요."
              {...errorItemProps}
            />
          </MobileLayoutTemplate>
        );
      }

      return (
        <MobileLayoutTemplate>
          <ErrorItem {...errorItemProps} />
        </MobileLayoutTemplate>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWithNarrowHeader;
