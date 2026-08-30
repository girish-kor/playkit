import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * The one sanctioned way to assemble Tailwind class strings in this library
 * (docs/DESIGN-SYSTEM.md § Composition/merge rule): `clsx` for conditional assembly,
 * then `tailwind-merge` for conflict resolution/de-duplication. Raw string
 * concatenation is prohibited (docs/CODING-STANDARDS.md).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
