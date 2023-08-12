import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
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
    // You can also log the error to an error reporting service
    window.console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.state.errorMessage}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
