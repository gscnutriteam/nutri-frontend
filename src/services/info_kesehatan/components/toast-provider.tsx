"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster 
      position="top-center"
      toastOptions={{
        style: {
          background: "#fff",
          color: "#333",
          border: "1px solid #eaeaea",
        },
        duration: 3000,
      }}
    />
  );
} 