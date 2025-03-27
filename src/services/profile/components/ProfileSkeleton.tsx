"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="px-4 pt-20 pb-10">
      {/* Profile Picture Skeleton */}
      <div className="relative mb-8">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-16">
          <div className="relative">
            <Skeleton className="w-32 h-32 rounded-full" />
            <Skeleton className="absolute bottom-1 right-1 w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* Form Container Skeleton */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Birth Date Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Height and Weight Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Physical Activity Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Medical History Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton; 