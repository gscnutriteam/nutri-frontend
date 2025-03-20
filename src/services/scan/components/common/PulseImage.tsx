import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PulseImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const PulseImage = ({ src, alt, onClick }: PulseImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, [src]);

  return (
    <div className="relative w-full flex justify-center">
      {/* Fixed size container for the image and animations */}
      <div
        className={`relative flex items-center justify-center transition-all duration-1000 aspect-square w-[70%] ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Image container */}
        <div 
          className="rounded-full w-[50%] border-border border-2 relative aspect-square overflow-hidden shadow-lg z-10 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={onClick}
        >
          <Image src={src} alt={alt} fill className="object-cover" />
        </div>

        {/* First border set - dark teal */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 rounded-full border-2 border-teal-600 opacity-0 pulse-border-1" />
        </div>

        {/* Second border set - medium teal */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 rounded-full border-2 border-teal-400 opacity-0 pulse-border-2" />
        </div>

        {/* Third border set - light cyan */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-100 opacity-0 pulse-border-3" />
        </div>
      </div>
      
      {/* CSS Animation keyframes */}
      <style jsx>{`
        .pulse-border-1 {
          animation: ${isLoaded ? "pulse-1 4s infinite" : "none"};
        }

        .pulse-border-2 {
          animation: ${isLoaded ? "pulse-2 4s infinite" : "none"};
        }

        .pulse-border-3 {
          animation: ${isLoaded ? "pulse-3 4s infinite" : "none"};
        }

        @keyframes pulse-1 {
          0%,
          100% {
            transform: scale(0.5);
            opacity: 0;
          }
          10% {
            transform: scale(0.6);
            opacity: 0.9;
          }
          50% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          90% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes pulse-2 {
          0%,
          100% {
            transform: scale(0.6);
            opacity: 0;
          }
          10% {
            transform: scale(0.7);
            opacity: 0.8;
          }
          50% {
            transform: scale(0.9);
            opacity: 0.5;
          }
          90% {
            transform: scale(1.1);
            opacity: 0;
          }
        }

        @keyframes pulse-3 {
          0%,
          100% {
            transform: scale(0.7);
            opacity: 0;
          }
          10% {
            transform: scale(0.8);
            opacity: 0.7;
          }
          50% {
            transform: scale(1);
            opacity: 0.4;
          }
          90% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PulseImage; 