'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExtendedUserData } from '../types/homeTypes';

interface UserHeaderProps {
  user: ExtendedUserData;
}

const UserHeader = ({ user }: UserHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-primary shadow-neobrutalism-sm">
          <Image
            src={user.avatar || '/assets/img/default-avatar.png'}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-bold">Hello, {user.name}</p>
          <p className="text-sm text-textGray">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/app/notification" className="p-2 bg-white rounded-full border-2 border-black shadow-neobrutalism-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="black"/>
          </svg>
        </Link>
        <Link href="/app/profile" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black shadow-neobrutalism-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13ZM18 18H6V17.01C6.2 16.29 9.3 15 12 15C14.7 15 17.8 16.29 18 17V18Z" fill="black"/>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default UserHeader; 