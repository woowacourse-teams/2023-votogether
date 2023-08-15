import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';

import Error from './Error';
import ErrorBoundary from './ErrorBoundary';

class ErrorBoundaryWithNarrowHeader extends ErrorBoundary {
  render() {
    if (this.state.hasError) {
      return (
        <>
          <NarrowTemplateHeader />
          <Error message={this.state.errorMessage} />
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWithNarrowHeader;
