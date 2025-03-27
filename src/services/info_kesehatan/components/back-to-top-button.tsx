"use client";

import { ArrowUpIcon } from "lucide-react";

export default function BackToTopButton() {
  // Simple direct approach to scroll to top
  const handleClick = () => {
    // For modern browsers
    window.scrollTo(0, 0);
    
    // For Safari and older browsers
    if (typeof document !== 'undefined') {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-full bg-primary text-white px-4 py-2 text-sm"
      type="button"
    >
      <ArrowUpIcon size={16} className="mr-2" />
      Kembali ke atas
    </button>
  );
} 