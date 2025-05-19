'use client'

import * as React from "react"

import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  trackColor?: string
  fillColor?: string
  variant?: "default" | "calories" | "success" | "warning" | "danger"
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, trackColor, fillColor, variant = "default", ...props }, ref) => {
    const percentage = value !== undefined ? (value / max) * 100 : 0

    // Kita tentukan warna berdasarkan variant
    const getVariantStyles = () => {
      switch (variant) {
        case "calories":
          // Warna berdasarkan persentase untuk variant calories
          if (percentage < 30) return "bg-emerald-500" // Hijau
          if (percentage < 70) return "bg-blue-500" // Biru
          if (percentage < 90) return "bg-amber-500" // Oranye
          return "bg-rose-500" // Merah
        case "success":
          return "bg-emerald-500"
        case "warning":
          return "bg-amber-500"
        case "danger":
          return "bg-rose-500"
        default:
          return "bg-main" // Default dari style asli
      }
    }

    // Gunakan fillColor jika disediakan, jika tidak gunakan warna variant
    const barColor = fillColor ? fillColor : getVariantStyles()

    return (
      <div
        ref={ref}
        className={cn(
          'relative h-4 w-full overflow-hidden rounded-base border-2 border-black',
          trackColor ? "" : "bg-bw",
          className
        )}
        style={trackColor ? { backgroundColor: trackColor } : {}}
        {...props}
      >
        <div
          className={cn("h-full w-full flex-1 border-r-2 border-black transition-all", barColor)}
          style={{ width: `${Math.max(percentage, 2)}%` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }