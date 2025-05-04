'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/assets/img/logo.png" 
              alt="NutriPlate Logo" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            <span className="font-bold text-xl text-black">NutriPlate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-black font-medium hover:text-primary transition-colors">
              Tentang
            </Link>
            <Link href="/product" className="text-black font-medium hover:text-primary transition-colors">
              Produk
            </Link>
            <Link href="/articles" className="text-black font-medium hover:text-primary transition-colors">
              Artikel
            </Link>
            <Link href="/contact" className="text-black font-medium hover:text-primary transition-colors">
              Kontak
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              asChild 
              variant="neutral"
              className="rounded-lg"
            >
              <Link href="/app/login">
                Login
              </Link>
            </Button>
            <Button 
              asChild 
              variant="default"
              className="rounded-lg"
            >
              <Link href="/app/register">
                Daftar
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-black" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t-2 border-black">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4 py-6">
              <Link 
                href="/about" 
                className="text-black font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link 
                href="/product" 
                className="text-black font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Produk
              </Link>
              <Link 
                href="/articles" 
                className="text-black font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Artikel
              </Link>
              <Link 
                href="/contact" 
                className="text-black font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
              
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  asChild 
                  variant="neutral"
                  className="w-full rounded-lg"
                >
                  <Link href="/app/login">
                    Login
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="default"
                  className="w-full rounded-lg"
                >
                  <Link href="/app/register">
                    Daftar
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 