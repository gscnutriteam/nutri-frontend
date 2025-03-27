"use client";

import dynamic from "next/dynamic";

// Dynamic import with no SSR to avoid hydration issues
const FloatingBackToTop = dynamic(
  () => import('./floating-back-to-top'),
  { ssr: false }
);

export default function FloatingBackToTopWrapper() {
  return <FloatingBackToTop />;
} 