"use client";

import { useEffect, useState } from 'react';

interface EnvData {
  status: string;
  message: string;
  timestamp: string;
  environment: string;
  data: Record<string, string | undefined>;
}

export default function EnvironmentDebugPage() {
  const [envData, setEnvData] = useState<EnvData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnvData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/debug/env');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setEnvData(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch environment data');
      } finally {
        setLoading(false);
      }
    };

    fetchEnvData();
  }, []);

  // Function untuk mendapatkan gaya warna berdasarkan nilai
  const getValueStyle = (value: string | undefined) => {
    if (!value) return "text-red-500 font-semibold";
    if (value === "placeholder") return "text-red-500 font-semibold";
    if (value.includes("Hidden")) return "text-blue-500 font-semibold";
    return "text-green-500 font-semibold";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4">
          <h1 className="text-2xl font-bold">Environment Variables Debug</h1>
          <p className="text-blue-100">
            {envData?.environment === 'production' 
              ? 'Production Environment' 
              : 'Development Environment'}
          </p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="mb-6 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-500">Last Updated: {new Date(envData?.timestamp || '').toLocaleString()}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Firebase Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(envData?.data || {})
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

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">API & Authentication</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(envData?.data || {})
                    .filter(([key]) => ['BASE_API_URL', 'JWT_SECRET', 'OPENAI_API_KEY', 'GOOGLE_GENAI_API_KEY'].includes(key))
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
                <h2 className="text-xl font-bold mb-4 text-gray-800">Next.js Environment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(envData?.data || {})
                    .filter(([key]) => ['NODE_ENV', 'NEXT_RUNTIME'].includes(key))
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
            </>
          )}
        </div>
        
        <div className="bg-gray-100 px-6 py-4">
          <p className="text-xs text-gray-500">
            Note: Sensitive variables like API keys and secrets are hidden for security reasons.
            This page is only available for debugging purposes.
          </p>
        </div>
      </div>
    </div>
  );
} 