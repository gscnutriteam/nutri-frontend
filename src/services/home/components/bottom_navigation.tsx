'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Scan, BarChart3, User } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    {
      name: 'Home',
      icon: <Home size={24} />,
      path: '/app/v2',
    },
    {
      name: 'Recipes',
      icon: <Search size={24} />,
      path: '/app/resep-makanan',
    },
    {
      name: 'Scan',
      icon: <Scan size={28} />,
      path: '/app/scan',
      primary: true,
    },
    {
      name: 'Stats',
      icon: <BarChart3 size={24} />,
      path: '/app/statistic',
    },
    {
      name: 'Profile',
      icon: <User size={24} />,
      path: '/app/profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-black shadow-neobrutalism-sm h-16">
      <div className="max-w-md mx-auto grid grid-cols-5 h-full">
        {navItems.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className={`flex flex-col items-center justify-center relative ${
              isActive(item.path) ? 'text-primary' : 'text-textGray'
            }`}
          >
            {item.primary ? (
              <div className="absolute -top-5 flex items-center justify-center w-14 h-14 rounded-full bg-primary border-2 border-black shadow-neobrutalism-sm">
                <span className="text-white">{item.icon}</span>
              </div>
            ) : (
              <>
                {item.icon}
                <span className="text-xs mt-1">{item.name}</span>
                {isActive(item.path) && (
                  <div className="absolute bottom-0 w-10 h-1 bg-primary rounded-t"></div>
                )}
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
} 