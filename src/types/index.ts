// Core exports
export * from '@auth/types/auth.types';
export * from '@lib/database.types';
export * from '@types/core/ui.types';
export * from '@types/core/shelter.types';

// Component types
export * from '@components/ui/Icon';

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Common type utilities
export type Nullable<T> = T | null;
export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;

// Re-export commonly used types
export type {
  ShelterProfile,
  IconType,
  IconBaseProps,
  WithIconProps
} from '@types/core/shelter.types';

// Ensure proper paths in tsconfig 