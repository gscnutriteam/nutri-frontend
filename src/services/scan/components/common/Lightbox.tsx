import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSource: string;
  alt: string;
}

const Lightbox = ({ isOpen, onClose, imageSource, alt }: LightboxProps) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
        <button 
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>
        <div 
          className="relative w-full h-full max-h-[80vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image 
            src={imageSource} 
            alt={alt} 
            className="object-contain max-h-full rounded-lg animate-scale-in shadow-2xl" 
            width={1200}
            height={800}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Lightbox; 