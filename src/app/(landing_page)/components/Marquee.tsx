'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface MarqueeProps {
  className?: string;
  vertical?: boolean;
  children: React.ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  fadeEdges?: boolean;
}

export function Marquee({
  className,
  vertical = false,
  children,
  pauseOnHover = false,
  reverse = false,
  fadeEdges = false,
}: MarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current || !contentRef.current) return;

    const scroller = scrollerRef.current;
    const content = contentRef.current;

    // Clone the content for a seamless loop
    scroller.appendChild(content.cloneNode(true));

    return () => {
      if (scroller.childNodes.length > 1) {
        scroller.removeChild(scroller.lastChild as Node);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        fadeEdges && 'after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-10',
        fadeEdges && !vertical && 'after:bg-gradient-to-r after:from-white after:from-0% after:via-transparent after:via-10% after:to-white after:to-90%',
        fadeEdges && vertical && 'after:bg-gradient-to-b after:from-white after:from-0% after:via-transparent after:via-10% after:to-white after:to-90%',
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          'animate-marquee flex w-fit max-w-none shrink-0 justify-around gap-4 [--duration:40s]',
          vertical && 'flex-col',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          reverse && 'direction-reverse',
          vertical && !reverse && 'animate-marquee-vertical',
          vertical && reverse && 'animate-marquee-vertical-reverse'
        )}
      >
        <div
          ref={contentRef}
          className={cn(
            'flex shrink-0 justify-around gap-4',
            vertical && 'flex-col'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
} 