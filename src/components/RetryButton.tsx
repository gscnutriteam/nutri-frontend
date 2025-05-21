"use client";

import React from 'react';

export default function RetryButton() {
  return (
    <button 
      onClick={() => window.location.reload()} 
      className="bg-secondary border-2 border-black text-black px-6 py-2 rounded-base shadow-neobrutalism font-medium"
    >
      Try Again
    </button>
  );
} 