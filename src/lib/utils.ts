import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const MILLISECONDS_TO_SECONDS = 1000;
export const SECONDS_TO_MINUTES = 60;
export const TIMER_UPDATE_INTERVAL = 1000;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function formatTime(seconds: number) {
  const mins = Math.floor(seconds / SECONDS_TO_MINUTES);
  const hours = Math.floor(mins / SECONDS_TO_MINUTES);
  const secs = seconds % SECONDS_TO_MINUTES;

  if (mins >= SECONDS_TO_MINUTES) {
    return `${hours.toString().padStart(2, "0")}:${(mins % SECONDS_TO_MINUTES)
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// biome-ignore lint/suspicious/useAwait: not necessary
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
