import Link from 'next/link';

export default function DebugIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-purple-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">NutriFe Debug Tools</h1>
            <p className="text-purple-100">
              Tools for debugging application configuration and environment
            </p>
          </div>

          <div className="p-6">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <p className="text-gray-600">
                These debug tools help you verify that your application is configured correctly.
                They should only be used in development or for troubleshooting purposes.
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/debug/env" 
                className="block bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500 transition">
                <h2 className="text-lg font-semibold text-blue-700">Server Environment Variables</h2>
                <p className="text-blue-600 text-sm mt-1">
                  View all environment variables accessible on the server, including API keys and configuration.
                </p>
              </Link>

              <Link href="/debug/client-env" 
                className="block bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500 transition">
                <h2 className="text-lg font-semibold text-yellow-700">Client Environment Variables</h2>
                <p className="text-yellow-600 text-sm mt-1">
                  View environment variables available in the browser (NEXT_PUBLIC_* variables only).
                </p>
              </Link>

              <Link href="/api/debug/env" 
                className="block bg-green-50 hover:bg-green-100 p-4 rounded-lg border-l-4 border-green-500 transition">
                <h2 className="text-lg font-semibold text-green-700">Environment API Response</h2>
                <p className="text-green-600 text-sm mt-1">
                  View the raw JSON response from the environment variables API endpoint.
                </p>
              </Link>
            </div>
          </div>

          <div className="bg-gray-100 px-6 py-4">
            <p className="text-xs text-gray-500">
              <strong>Security Note:</strong> These debug pages should be disabled or password-protected in production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 