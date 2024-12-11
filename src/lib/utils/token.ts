import { customAlphabet } from 'nanoid';

export function generateVerificationToken(): string {
  // Use a custom alphabet for more readable tokens
  const nanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 8);
  return nanoid();
} 