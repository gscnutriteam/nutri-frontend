import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBMI(weight: number, height: number) {
  const bmi = weight / ((height / 100) ** 2)
  return Number.parseFloat(bmi.toFixed(1))
}