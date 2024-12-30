interface PageBackgroundProps {
  imagePath: string;
  alt: string;
  opacity?: number;
  overlay?: boolean;
  fadeHeight?: string;
}

export function PageBackground({ 
  imagePath, 
  alt, 
  opacity = 40, 
  overlay = true,
  fadeHeight = '65%'
}: PageBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0" style={{ height: fadeHeight }}>
      <img
        src={imagePath}
        alt={alt}
        className={`w-full h-full object-cover opacity-${opacity}`}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
      )}
    </div>
  );
} 