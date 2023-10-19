import { Component, ErrorInfo, ReactNode } from 'react';

interface BannerErrorBoundaryProps {
  children: ReactNode;
}

interface BannerErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class BannerErrorBoundary extends Component<BannerErrorBoundaryProps, BannerErrorBoundaryState> {
  constructor(props: BannerErrorBoundaryProps) {
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

export default BannerErrorBoundary;
