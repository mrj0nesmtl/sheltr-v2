import { Home, RefreshCw, XCircle } from 'lucide-react';
import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  variant?: 'default' | 'participant' | 'shelter-admin';
  className?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class BaseErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error(`Error in ${this.props.variant || 'default'} boundary:`, {
      error,
      componentStack: errorInfo.componentStack,
      variant: this.props.variant
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    this.props.onReset?.();
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className={cn(
          "flex flex-col items-center justify-center min-h-screen p-4",
          "bg-gray-50 dark:bg-gray-900",
          this.props.className
        )}>
          <div className="w-full max-w-md p-8 space-y-4 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <XCircle className="w-16 h-16 mx-auto text-red-500" />
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Something went wrong
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>

            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">
                  Error Details
                </summary>
                <pre className="mt-2 p-4 text-left text-sm bg-gray-100 dark:bg-gray-700 rounded overflow-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center mt-6">
              <button
                onClick={this.handleReset}
                className={cn(
                  "inline-flex items-center justify-center px-4 py-2 text-sm font-medium",
                  "text-white bg-indigo-600 rounded-md",
                  "hover:bg-indigo-700 focus:outline-none focus:ring-2",
                  "focus:ring-offset-2 focus:ring-indigo-500"
                )}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>

              <Link
                to="/"
                className={cn(
                  "inline-flex items-center justify-center px-4 py-2 text-sm font-medium",
                  "text-gray-700 bg-white border border-gray-300 rounded-md",
                  "hover:bg-gray-50 focus:outline-none focus:ring-2",
                  "focus:ring-offset-2 focus:ring-indigo-500"
                )}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 