import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TimeUnit = {
  value: number;
  unit: string;
  maxValue: number;
};

export const formatTimeAgo = (last_crawled: Date): string => {
  const now = new Date();
  const diff = now.getTime() - last_crawled.getTime();

  const timeUnits: TimeUnit[] = [
    { value: diff / 1000, unit: "second", maxValue: 60 },
    { value: diff / (1000 * 60), unit: "minute", maxValue: 60 },
    { value: diff / (1000 * 60 * 60), unit: "hour", maxValue: 24 },
    { value: diff / (1000 * 60 * 60 * 24), unit: "day", maxValue: 30 },
    { value: diff / (1000 * 60 * 60 * 24 * 30), unit: "month", maxValue: 12 },
    {
      value: diff / (1000 * 60 * 60 * 24 * 365),
      unit: "year",
      maxValue: Infinity,
    },
  ];

  const unit =
    timeUnits.find((unit) => unit.value < unit.maxValue) ??
    timeUnits[timeUnits.length - 1];
  const value = Math.floor(unit?.value ?? 0);

  if (value <= 0) {
    return "just now";
  }

  return `${value} ${unit?.unit}${value !== 1 ? "s" : ""} ago`;
};
