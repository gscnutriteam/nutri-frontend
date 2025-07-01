'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => (
  <Link 
    href={href} 
    className={cn(
      "text-gray-800 font-medium hover:text-primary transition-colors duration-200",
      className
    )}
  >
    {children}
  </Link>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-4 md:px-8",
        isScrolled 
          ? "bg-white border-b-4 border-black" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-40">
            <Image 
              src="/assets/img/logo.png" 
              alt="NutriCare Logo" 
              fill
              style={{ objectFit: 'contain' }}
              className="transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" className="text-black font-bold hover:text-[#53C2C6]">Home</NavLink>
          <NavLink href="/about" className="text-black font-bold hover:text-[#53C2C6]">About</NavLink>
          <NavLink href="/features" className="text-black font-bold hover:text-[#53C2C6]">Features</NavLink>
          <NavLink href="/blog" className="text-black font-bold hover:text-[#53C2C6]">Blog</NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            asChild 
            variant="default" 
            size="default" 
            className="bg-[#53C2C6] text-black rounded-lg text-base font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <Link href="/products" className="flex items-center gap-2">
              Dapatkan Produk
              <ArrowRight size={16} />
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="neutralNoShadow" 
            size="default" 
            className="bg-white text-black rounded-lg border-4 border-black hover:bg-[#FFDC58] transition-colors"
          >
            <Link href="/login">Login</Link>
          </Button>
          
          <Button 
            asChild 
            variant="neutralNoShadow" 
            size="default" 
            className="bg-[#FFDC58] text-black rounded-lg border-4 border-black hover:bg-white transition-colors"
          >
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden p-2 text-black bg-white rounded-lg border-4 border-black"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t-4 border-b-4 border-black z-50 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              <NavLink href="/" className="text-lg py-2 font-bold">Home</NavLink>
              <NavLink href="/about" className="text-lg py-2 font-bold">About</NavLink>
              <NavLink href="/features" className="text-lg py-2 font-bold">Features</NavLink>
              <NavLink href="/blog" className="text-lg py-2 font-bold">Blog</NavLink>
              
              <div className="flex flex-col space-y-3 pt-4 border-t-4 border-black">
                <Button 
                  asChild 
                  variant="default" 
                  size="default" 
                  className="w-full bg-[#53C2C6] text-black rounded-lg text-base font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Link href="/products" className="flex items-center justify-center gap-2">
                    Dapatkan Produk
                    <ArrowRight size={16} />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="neutralNoShadow" 
                  size="default" 
                  className="w-full bg-white text-black rounded-lg border-4 border-black hover:bg-[#FFDC58] transition-colors"
                >
                  <Link href="/login">Login</Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="neutralNoShadow" 
                  size="default" 
                  className="w-full bg-[#FFDC58] text-black rounded-lg border-4 border-black hover:bg-white transition-colors" 
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}; 