"use client"
import React, { useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";
import { ArrowLeft, Upload, Camera as CameraIcon, RefreshCw, Zap } from "lucide-react";

export const CameraScan = ()=> {
    const cameraRef = useRef<CameraType | null>(null);
    const [isTorchOn, setIsTorchOn] = useState(false);
    
    const handleCapturePhoto = () => {
      if (cameraRef.current) {
        const photo = cameraRef.current.takePhoto();
        // Handle the captured photo, e.g., save or process it
        console.log("Photo captured:", photo);
      }
    };
    
    const handleSwitchCamera = () => {
      if (cameraRef.current) {
        cameraRef.current.switchCamera();
      }
    };
    
    const handleToggleTorch = () => {
      if (cameraRef.current && cameraRef.current.torchSupported) {
        const newTorchState = cameraRef.current.toggleTorch();
        setIsTorchOn(newTorchState);
      }
    };
    
    const handleUploadImage = () => {
      // Create and trigger a file input element
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = (e) => {
        const file = (e.target as HTMLInputElement)?.files?.[0];
        if (file) {
          // Handle the uploaded image
          console.log("Image uploaded:", file);
        }
      };
      fileInput.click();
    };
    return (
        <>
        <div className="absolute top-0 left-0 w-full z-10 flex justify-between items-center p-4">
          <button 
            className="rounded-full bg-white/70 p-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </button>
          
          <button 
            className={`rounded-full ${isTorchOn ? 'bg-yellow-400' : 'bg-white/70'} p-2`}
            onClick={handleToggleTorch}
          >
            <Zap size={20} color={isTorchOn ? 'white' : 'black'} />
          </button>
        </div>
        
        {/* Camera Component */}
        <div className="flex-1 w-full h-full">
          <Camera
            ref={cameraRef}
            facingMode="environment"
            aspectRatio="cover"
            numberOfCamerasCallback={(number) => console.log(`Number of cameras: ${number}`)}
            videoReadyCallback={() => console.log('Video ready')}
            errorMessages={{
              noCameraAccessible: 'No camera available. Please connect a camera or try a different browser.',
              permissionDenied: 'Camera permission denied. Please refresh and allow camera access.',
              switchCamera: 'Unable to switch camera. Only one camera available.',
              canvas: 'Canvas not supported.',
            }}
          />
        </div>
        
        {/* Bottom Camera Controls */}
        <div className="absolute bottom-20 left-0 w-full flex justify-center items-center gap-10 p-4">
          <button 
            className="rounded-full bg-white p-4"
            onClick={handleUploadImage}
          >
            <Upload size={24} />
          </button>
          
          <button 
            className="rounded-full bg-white p-5"
            onClick={handleCapturePhoto}
          >
            <CameraIcon size={32} />
          </button>
          
          <button 
            className="rounded-full bg-white p-4"
            onClick={handleSwitchCamera}
          >
            <RefreshCw size={24} />
          </button>
        </div>
        </>
    )
}