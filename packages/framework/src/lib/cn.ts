import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names using `clsx` for conditional joining and
 * `tailwind-merge` for deduplication of conflicting Tailwind utilities.
 *
 * @example
 * ```tsx
 * cn("od-button", isActive && "text-primary", className)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

