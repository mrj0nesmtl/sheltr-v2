import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// General utility functions
export { cn, formatDate } from '@/features/shared/maps/utils';

// Add any additional general utilities here
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1
  }).format(value / 100);
}