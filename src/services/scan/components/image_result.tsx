"use client";
import { useState } from "react";
import useScanStore from "../store/scan_store";
import PulseImage from "./common/PulseImage";
import Lightbox from "./common/Lightbox";

const ImageResult = ({
  image = "/assets/img/nubo-large.png",
  alt = "Food plate image",
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { scanImageLink } = useScanStore();

  // Use the actual image source or fall back to the default
  const imageSource = scanImageLink || image;

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-4">
      {scanImageLink && (
        <PulseImage 
          src={imageSource} 
          alt={alt} 
          onClick={openLightbox}
        />
      )}

      {/* Lightbox Modal */}
      <Lightbox 
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        imageSource={imageSource}
        alt={alt}
      />
    </div>
  );
};

export default ImageResult;
