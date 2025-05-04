'use client'

import * as React from "react"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number
    max?: number
    trackColor?: string
    fillColor?: string
  }
>(({ className, value, max = 100, ...props }, ref) => {
  const percentage = value !== undefined ? (value / max) * 100 : 0

  return (
    <div
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-base border-2 border-black bg-bw',
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 border-r-2 border-black bg-main transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }