import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

export function Logo({ className = 'h-8 w-auto' }: LogoProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Logo failed to load:', e);
  };

  const handleLoad = () => {
    console.log('Logo loaded successfully');
  };

  return (
    <img
      src="/images/logo.svg"
      alt="SHELTR"
      className={className}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
} 