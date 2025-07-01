'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Phone, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import usePageVisits from '@/hooks/usePageVisits';

export default function Footer() {
  const visits = usePageVisits();

  return (
    <footer className="bg-white pt-16 pb-8 border-t-2 border-black">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Image 
                src="/assets/img/logo.png" 
                alt="NutriCare Logo" 
                width={40} 
                height={40} 
                className="mr-2"
              />
              <span className="font-bold text-xl text-black">NutriCare</span>
            </div>
            <p className="text-sm text-black mb-4">
              Piring pintar dengan teknologi QR code untuk mengontrol porsi makan dan hidup lebih sehat.
            </p>
            <div className="flex space-x-3">
              <a href="https://api.whatsapp.com/send/?phone=6285717035472&text&type=phone_number&app_absent=0" className="bg-primary rounded-full p-2 text-white hover:opacity-80 transition-opacity">
                <Phone size={18} />
              </a>
              <a href="https://instagram.com/NutriCareid" className="bg-primary rounded-full p-2 text-white hover:opacity-80 transition-opacity">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com/NutriCareid" className="bg-primary rounded-full p-2 text-white hover:opacity-80 transition-opacity">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com/@NutriCareid" className="bg-primary rounded-full p-2 text-white hover:opacity-80 transition-opacity">
                <Youtube size={18} />
              </a>
            </div>
            <div className="mt-4 bg-secondaryLight border-2 border-black shadow-neobrutalism-sm rounded-lg p-3 text-center">
              <h4 className="font-bold text-sm flex items-center justify-center gap-2">
                <Eye size={18} className="text-primaryText" />
                Total Kunjungan
              </h4>
              <p className="text-2xl font-bold text-secondaryBlack">
                {visits !== null ? visits.toLocaleString('id-ID') : '...'}
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-4">Perusahaan</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-black hover:text-primary transition-colors">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-black hover:text-primary transition-colors">
                    Karir
                  </Link>
                </li>
                {/* <li>
                  <Link href="/blog" className="text-black hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-black hover:text-primary transition-colors">
                    Press Kit
                  </Link>
                </li> */}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Produk</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#product" className="text-black hover:text-primary transition-colors">
                    NutriCare
                  </Link>
                </li>
                <li>
                  <Link href="/app" className="text-black hover:text-primary transition-colors">
                    Aplikasi
                  </Link>
                </li>
                <li>
                  <Link href="#price" className="text-black hover:text-primary transition-colors">
                    Paket Berlangganan
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="text-black hover:text-primary transition-colors">
                    Panduan Pengguna
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://api.whatsapp.com/send/?phone=6285717035472&text&type=phone_number&app_absent=0" className="text-black hover:text-primary transition-colors">
                    Pusat Bantuan
                  </Link>
                </li>
                <li>
                  <Link href="https://api.whatsapp.com/send/?phone=6285717035472&text&type=phone_number&app_absent=0" className="text-black hover:text-primary transition-colors">
                    Kontak Kami
                  </Link>
                </li>
                <li>
                  <Link href="/app/legal/terms" className="text-black hover:text-primary transition-colors">
                    Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link href="/app/legal/privacy-policy" className="text-black hover:text-primary transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-black">
              &copy; {new Date().getFullYear()} NutriCare. All rights reserved.
            </p>
            
            <div className="mt-4 md:mt-0">
              <Button
                asChild
                variant="neutral"
                size="sm"
                className="rounded-lg"
              >
                <Link href="https://api.whatsapp.com/send/?phone=6285717035472&text&type=phone_number&app_absent=0">
                  Hubungi Kami
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 