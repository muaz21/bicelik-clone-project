import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function convertToLocalTime(isoDateString: string) {
  // Create a Date object from the ISO date string
  const date = new Date(isoDateString);

  // Extract the local date and time components
  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString();

  // Combine local date and time into a single string
  const localDateTime = `${localDate} ${localTime}`;

  return localDateTime;
}
