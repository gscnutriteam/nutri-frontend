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
          ? "bg-white shadow-md backdrop-blur-md bg-opacity-90" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-40">
            <Image 
              src="/assets/img/logo.png" 
              alt="NutriPlate Logo" 
              fill
              style={{ objectFit: 'contain' }}
              className="transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/blog">Blog</NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            asChild 
            variant="default" 
            size="default" 
            className="bg-primary text-white rounded-base border-2 border-black shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
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
            className="rounded-base hover:bg-gray-100 transition-colors border-2 border-black"
          >
            <Link href="/login">Login</Link>
          </Button>
          
          <Button 
            asChild 
            variant="neutralNoShadow" 
            size="default" 
            className="rounded-base hover:bg-gray-100 transition-colors border-2 border-black"
          >
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden p-2 text-gray-800 hover:text-primary focus:outline-none transition-colors"
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
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              <NavLink href="/" className="text-lg py-2">Home</NavLink>
              <NavLink href="/about" className="text-lg py-2">About</NavLink>
              <NavLink href="/features" className="text-lg py-2">Features</NavLink>
              <NavLink href="/blog" className="text-lg py-2">Blog</NavLink>
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Button 
                  asChild 
                  variant="default" 
                  size="default" 
                  className="w-full bg-primary text-white rounded-base border-2 border-black shadow-shadow"
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
                  className="w-full rounded-base border-2 border-black"
                >
                  <Link href="/login">Login</Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="neutralNoShadow" 
                  size="default" 
                  className="w-full rounded-base border-2 border-black"
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