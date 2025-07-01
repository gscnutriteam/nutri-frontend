"use client";
import React, { useState, useEffect } from "react";
import type { ProfileProps } from "../type/types";
import { useProfileForm } from "../hooks/useProfileForm";
import ProfilePhotoUploader from "./ProfilePhotoUploader";
import ProfileForm from "./ProfileForm";

const EditProfileSection = (user: ProfileProps) => {
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [profilePictureError, setProfilePictureError] = useState<string | undefined>(undefined);
  
  const {
    form,
    onSubmit,
    updateMutation,
    newProfilePicture,
    handleProfilePictureChange,
    formatDateForInput
  } = useProfileForm(user);

  // Get profile picture error message when form validation runs
  useEffect(() => {
    const errorMessage = form.formState.errors.profilePicture?.message as string | undefined;
    setProfilePictureError(errorMessage);
  }, [form.formState.errors.profilePicture]);

  return (
    <div className="px-4 pt-20 pb-10">
      <div className="relative mb-8">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-16">
          <ProfilePhotoUploader
            userId={user.id}
            currentPhoto={user.profile_picture}
            onPhotoChange={(url) => {
              setIsUploadingPhoto(true);
              handleProfilePictureChange(url);
              setIsUploadingPhoto(false);
            }}
            errorMessage={profilePictureError}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <ProfileForm
          form={form}
          onSubmit={onSubmit}
          updateMutation={updateMutation}
          isUploadingPhoto={isUploadingPhoto}
          formatDateForInput={formatDateForInput}
          isEmailVerified={user.verified_email}
        />
      </div>
    </div>
  );
};

export default EditProfileSection;