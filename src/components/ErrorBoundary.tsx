import React, { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-4">An unexpected error occurred</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 mt-2 text-gray-400 hover:text-white"
          >
            Go Back
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}