"use client";
import { uploadImageToStorage } from "@/lib/storage";
import useScanStore, { ScanPhase } from "../store/scan_store";
import { v4 as uuidv4 } from "uuid";
import type { CameraType } from "react-camera-pro";
import { predictNutrition } from "@/services/ai/generate";
import { useAppRouter } from "@/hooks/useAppRouter";
import { toast } from "sonner";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Function to upload image to Firebase and handle the scan process
export const uploadImage = async (imageData: string, source: 'camera' | 'upload', router: AppRouterInstance) => {
    const { setPhase, setIsLoading, setScanImageLink, setScanResult } = useScanStore.getState();
    try {
      setIsLoading(true);
      
      // First phase: Upload
      setPhase(ScanPhase.UPLOAD);
      const fileName = `${source}_${uuidv4()}.jpg`;
      const downloadURL = await uploadImageToStorage(imageData, fileName);
      
      // Save the image URL to the scan store
      setScanImageLink(downloadURL);
      
      // Second phase: Detecting/Analyzing
      setPhase(ScanPhase.DETECTING);
      
      // Simulate detection process (replace with actual API call)
      const detectionResult = await predictNutrition(downloadURL);

      if (!detectionResult) {
        throw new Error("Error in detecting image, try again");
      }

      setScanResult(detectionResult);
      
      // Third phase: Preparing results
      setPhase(ScanPhase.RESULT);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to results page
      router.push('scan/detail');
    } catch (error) {
      console.error("Error in image upload process:", error);
      toast.error("Error in image upload process, please try again");
      // Handle error (e.g., show a notification)
    } finally {
    //   setIsLoading(false);
      setPhase(ScanPhase.FINISHED);
    }
};

// Function to capture photo from camera
export const capturePhoto = async (cameraRef: React.RefObject<CameraType | null>, router: AppRouterInstance) => {
  if (cameraRef.current) {
    const photo = cameraRef.current.takePhoto();
    if (photo instanceof ImageData) {
      // Convert ImageData to a base64 string if needed
      const canvas = document.createElement('canvas');
      canvas.width = photo.width;
      canvas.height = photo.height;
      const ctx = canvas.getContext('2d');
      ctx?.putImageData(photo, 0, 0);
      const base64String = canvas.toDataURL('image/jpeg');
      await uploadImage(base64String, 'camera', router);
    } else {
      await uploadImage(photo, 'camera', router);
    }
  }
};

// Function to handle image upload from device
export const handleFileUpload = (router: AppRouterInstance) => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.onchange = (e) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        await uploadImage(base64data, 'upload', router);
      };
      reader.readAsDataURL(file);
    }
  };
  fileInput.click();
};

// Function to switch camera
export const switchCamera = (cameraRef: React.RefObject<CameraType | null>) => {
  if (cameraRef.current) {
    cameraRef.current.switchCamera();
  }
};

// Function to toggle torch
export const toggleTorch = (
  cameraRef: React.RefObject<CameraType | null>, 
  setIsTorchOn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (cameraRef.current?.torchSupported) {
    const newTorchState = cameraRef.current.toggleTorch();
    setIsTorchOn(newTorchState);
  }
};

export default {
  uploadImage,
  capturePhoto,
  handleFileUpload,
  switchCamera,
  toggleTorch
};