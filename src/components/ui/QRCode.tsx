import { cn } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  bgColor?: string;
  fgColor?: string;
}

export function QRCode({
  value,
  size = 128,
  className,
  level = 'L',
  includeMargin = true,
  bgColor = '#ffffff',
  fgColor = '#000000'
}: QRCodeProps) {
  return (
    <div className={cn('inline-block', className)}>
      <QRCodeSVG
        value={value}
        size={size}
        level={level}
        includeMargin={includeMargin}
        bgColor={bgColor}
        fgColor={fgColor}
        className="rounded-lg"
      />
    </div>
  );
} 