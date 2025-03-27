"use client";

import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to check scroll position
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    toggleVisibility();
    
    // Add event listener
    window.addEventListener("scroll", toggleVisibility);
    
    // Clean up
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon size={20} />
        </button>
      )}
    </>
  );
} 