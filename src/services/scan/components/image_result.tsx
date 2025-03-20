"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react"; // Import X icon for close button
import useScanStore from "../store/scan_store";
import { useAppRouter } from "@/hooks/useAppRouter";

const ImageResult = ({
  image = "/assets/img/nubo-large.png",
  alt = "Food plate image",
  title = "Pilih Komponen Makanan yang Sesuai",
  imageSize = 72,
  containerSize = 96,
  borderColors = ["border-teal-600", "border-teal-400", "border-cyan-100"],
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { scanImageLink } = useScanStore();
  const router = useAppRouter();

  // Remove the redirection - use the default image if scanImageLink is empty
  // if (!scanImageLink) {
  //   router.push("/app/scan");
  //   return;
  // }

  // Use for debugging
  useEffect(() => {
    // Log the image source being used
    console.log("Image source:", scanImageLink || image);
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, [scanImageLink, image]);

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  // Use the actual image source or fall back to the default
  const imageSource = scanImageLink || image;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-4">
      {scanImageLink && <div className="relative w-full flex justify-center">
        {/* Fixed size container for the image and animations */}
        <div
          className={`relative flex items-center justify-center transition-all duration-1000 aspect-square w-[70%] ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Image container */}
          <div 
            className="rounded-full w-[50%] border-border border-2 relative aspect-square overflow-hidden shadow-lg z-10 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={openLightbox}
          >
            <Image src={imageSource} alt={alt} fill className="object-cover" />
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
      </div>}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button 
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              onClick={closeLightbox}
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
        </div>
      )}

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

export default ImageResult;
