import { Component, ErrorInfo, ReactNode } from 'react';

import ErrorItem, { ErrorItemProps } from '@components/common/ErrorItem';

interface ErrorBoundaryProps extends ErrorItemProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    window.console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errorItemProps = { ...this.props };
      delete errorItemProps.children;

      return <ErrorItem {...errorItemProps} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
