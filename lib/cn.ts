import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge Tailwind class names safely
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}