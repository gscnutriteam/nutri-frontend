"use client";
import type React from 'react';
import { Card } from '@/components/ui/card';
import { 
  ScanLine, 
  MessageCircle, 
  BarChart2, 
  ClipboardList, 
  Scale 
} from 'lucide-react';
import Diamond from '../icons/diamond';
import Scan from '../icons/scan';
import BookOpen from '../icons/book_open';
import Statistic from '../icons/statistic';
import Book from '../icons/book';
import Track from '../icons/track';
import Link from 'next/link';
import LinkAPP from '@/components/util/link';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  variant: 'default' | 'primary';
}

const menuItems: MenuItem[] = [
  {
    icon: <Scan className="w-12 h-12" />,
    label: 'Scan Makanan',
    href: '/scan',
    variant: 'primary',
  },
  {
    icon: <Diamond className="w-12 h-12" />,
    label: 'Chat Nubo',
    href: '/chat-nubo',
    variant: 'default',
  },
  {
    icon: <BookOpen className="w-12 h-12" />,
    label: 'Info Kesehatan',
    href: '/info-kesehatan',
    variant: 'default',
  },
  {
    icon: <Statistic className="w-12 h-12" />,
    label: 'Statistik',
    href: '/statistic',
    variant: 'primary',
  },
  {
    icon: <Book className="w-12 h-12" />,
    label: 'Resep Makanan',
    href: '/resep-makanan',
    variant: 'primary',
  },
  {
    icon: <Track className="w-12 h-12" />,
    label: 'Track Berat Badan',
    href: '/statistic/berat',
    variant: 'default',
  },
];

const MenuGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-5 p-4">
      {menuItems.map((item, index) => (
        <LinkAPP
          key={index}
          href={item.href}
        >
          <Card
            variant={item.variant}
            className="p-4 flex flex-col items-start justify-center h-auto aspect-square hover:opacity-90 transition-opacity border-2 border-black"
          >
            {item.icon}
            <span className="font-semibold text-start mt-2 text-2xl">{item.label}</span>
          </Card>
        </LinkAPP>
      ))}
    </div>
  );
};

export default MenuGrid;
