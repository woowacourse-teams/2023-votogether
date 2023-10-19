import { Component, ErrorInfo, ReactNode } from 'react';

interface NoRenderErrorBoundaryProps {
  children: ReactNode;
}

interface NoRenderErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class NoRenderErrorBoundary extends Component<
  NoRenderErrorBoundaryProps,
  NoRenderErrorBoundaryState
> {
  constructor(props: NoRenderErrorBoundaryProps) {
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
      return <></>;
    }

    return this.props.children;
  }
}

export default NoRenderErrorBoundary;
