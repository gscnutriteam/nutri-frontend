'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const ChatWithNubo = () => {
  return (
    <Link href="/app/chat-nubo" className="flex items-center justify-between p-4 bg-primary rounded-xl border-2 border-black shadow-neobrutalism animate-fade-in-slide-up">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-white">
          <Image
            src="/assets/img/nubo-avatar.png"
            alt="Nubo"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Chat with Nubo</h3>
          <p className="text-sm text-white opacity-80">Your AI nutrition assistant</p>
        </div>
      </div>
      <ChevronRight size={24} className="text-white" />
    </Link>
  );
};

export default ChatWithNubo; 