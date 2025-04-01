"use client";

import { useEffect, useState } from 'react';

export default function ClientEnvDebugPage() {
  const [mounted, setMounted] = useState(false);
  
  // Client-side only variables
  const clientEnvVars = {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    NODE_ENV: process.env.NODE_ENV,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function untuk mendapatkan gaya warna berdasarkan nilai
  const getValueStyle = (value: string | undefined) => {
    if (!value) return "text-red-500 font-semibold";
    if (value === "placeholder") return "text-red-500 font-semibold";
    return "text-green-500 font-semibold";
  };

  // Pastikan kode dibawah ini hanya dijalankan di client-side
  if (!mounted) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-yellow-600 text-white px-6 py-4">
          <h1 className="text-2xl font-bold">Client-Side Environment Variables</h1>
          <p className="text-yellow-100">
            Showing only NEXT_PUBLIC_* variables accessible in the browser
          </p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
              <p className="font-bold">Important Note</p>
              <p>
                Only variables prefixed with NEXT_PUBLIC_ are available in the browser.
                Other environment variables are only accessible on the server.
              </p>
            </div>
            
            <h2 className="text-xl font-bold mb-4 text-gray-800">Firebase Configuration (Client-Side)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(clientEnvVars)
                .filter(([key]) => key.includes('FIREBASE'))
                .map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-600">{key}</p>
                    <p className={getValueStyle(value)}>
                      {value || 'Not Set'}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Other Client Variables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(clientEnvVars)
                .filter(([key]) => !key.includes('FIREBASE'))
                .map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-600">{key}</p>
                    <p className="text-gray-800 font-medium">
                      {value || 'Not Set'}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 px-6 py-4">
          <p className="text-xs text-gray-500">
            This page demonstrates which environment variables are accessible in the browser (client-side).
            Server-side environment variables are not available here.
          </p>
        </div>
      </div>
    </div>
  );
} 