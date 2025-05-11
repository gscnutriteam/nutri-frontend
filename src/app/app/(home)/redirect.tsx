'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToV2() {
  const router = useRouter();

  useEffect(() => {
    router.push('/app/v2');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 rounded-md shadow-neobrutalism border-2 border-black bg-white">
        <h2 className="font-bold text-lg">Redirecting to new home page...</h2>
        <p className="text-sm mt-2">Please wait while we redirect you to the new and improved home page.</p>
      </div>
    </div>
  );
} 