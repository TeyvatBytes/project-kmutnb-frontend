import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formInputToJson(inputs) {
  return Object.fromEntries(inputs.map((input) => [input.id, input.value]));
}
