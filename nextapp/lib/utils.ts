import localStorageHelper from "@/hooks/localStorageHelper";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tokenHelper = () => {
  return localStorageHelper<string>("token");
};

export function newAbortSignal(timeoutMs: number) {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), timeoutMs || 0);
  const originalAbort = abortController.abort.bind(abortController);
  abortController.abort = () => {
    clearTimeout(timeoutId);
    originalAbort();
  };
  return abortController.signal;
}


export const handleSmoothScrollById = (dockId:string) => {
  const secondElement = document.getElementById(dockId);
  if (secondElement) {
    secondElement.scrollIntoView({ behavior: "smooth" });
  }
};