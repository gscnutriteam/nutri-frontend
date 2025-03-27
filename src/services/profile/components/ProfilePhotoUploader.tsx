"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { uploadImageToStorage } from "@/lib/storage";
import { FormMessage } from "@/components/ui/form";

interface ProfilePhotoUploaderProps {
  userId: string;
  currentPhoto: string;
  onPhotoChange: (url: string) => void;
  errorMessage?: string;
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  userId,
  currentPhoto,
  onPhotoChange,
  errorMessage,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const defaultPhoto = "/assets/img/no_pp.png";

  const handlePhotoUpload = () => {
    setIsUploading(true);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        try {
          setIsUploading(true);
          const reader = new FileReader();
          
          reader.onloadend = async () => {
            const base64data = reader.result as string;
            
            // Display preview immediately
            setPreviewPhoto(base64data);
            
            try {
              // Upload to Firebase
              const fileName = `profile_${userId}_${uuidv4()}.jpg`;
              const downloadURL = await uploadImageToStorage(base64data, fileName);
              
              // Set the uploaded image URL
              setPreviewPhoto(downloadURL);
              
              // Notify parent component
              onPhotoChange(downloadURL);
              
              toast.success("Profile picture updated successfully!");
            } catch (error) {
              console.error("Error uploading profile picture:", error);
              toast.error("Failed to upload profile picture. Please try again.");
              // Reset to original picture if upload fails
              setPreviewPhoto(null);
            } finally {
              setIsUploading(false);
            }
          };
          
          reader.readAsDataURL(file);
        } catch (error) {
          console.error("Error processing image:", error);
          toast.error("Failed to process image. Please try again.");
        } finally {
          setIsUploading(false);
        }
      }
    };
    
    fileInput.click();
  };

  // Use previewPhoto if available, or currentPhoto if it's not empty, otherwise use default photo
  const photoSrc = previewPhoto || (currentPhoto && currentPhoto !== "" ? currentPhoto : defaultPhoto);
  const isDefaultPhoto = photoSrc === defaultPhoto;

  return (
    <div className="relative group">
      <div className={`w-32 h-32 rounded-full border-2 ${isDefaultPhoto ? 'border-red-500' : 'border-black'} bg-gray-200 overflow-hidden`}>
        <img
          src={photoSrc}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={handlePhotoUpload}
        >
          <span className="text-white text-sm font-medium">
            {isUploading ? 'Uploading...' : isDefaultPhoto ? 'Upload Photo*' : 'Change Photo'}
          </span>
          {isDefaultPhoto && <span className="text-white text-xs mt-1">(Required)</span>}
        </div>
      </div>
      <div 
        className={`absolute bottom-1 right-1 ${isDefaultPhoto ? 'bg-red-500' : 'bg-primary'} rounded-full p-2 border-2 border-white cursor-pointer`}
        onClick={handlePhotoUpload}
      >
        {isUploading ? (
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        ) : (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>{isDefaultPhoto ? 'Upload Photo (Required)' : 'Change Photo'}</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        )}
      </div>
      {errorMessage && <FormMessage className="mt-2 text-center">{errorMessage}</FormMessage>}
      {isDefaultPhoto && !errorMessage && (
        <p className="text-red-500 text-xs mt-2 text-center">Photo profile wajib diisi</p>
      )}
    </div>
  );
};

export default ProfilePhotoUploader; 