export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
}

export interface BasePageProps extends BaseComponentProps {
  title?: string;
  description?: string;
  metaTags?: MetaTags;
}

export interface MetaTags {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: Error | null;
}
