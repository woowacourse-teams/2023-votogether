import { Component, ErrorInfo, ReactNode } from 'react';

import styled from 'styled-components';

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

      const error: { status: number; message: string } = JSON.parse(this.state.errorMessage);

      if (error.status === 404) {
        errorItemProps.retryInteraction = false;

        return (
          <ErrorWrapper>
            <ErrorItem
              text="해당 페이지는 존재하지 않습니다. 확인 후 다시 요청해주세요."
              {...errorItemProps}
            />
          </ErrorWrapper>
        );
      }

      return (
        <ErrorWrapper>
          <ErrorItem {...errorItemProps} />
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}

const ErrorWrapper = styled.div`
  margin: 70px 10px 20px 10px;
`;

export default ErrorBoundary;
