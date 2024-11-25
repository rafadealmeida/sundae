import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function linkifyText(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text
    .split(urlRegex)
    .map((part) => {
      if (part.match(urlRegex)) {
        return `<a href="${part}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${part}</a>`;
      }
      return part;
    })
    .join("");
}

export function formatDate(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}
