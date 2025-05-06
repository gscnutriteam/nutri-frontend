"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAnimation } from 'framer-motion';

// Animation variants
export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 40 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const staggerChildren = {
  animate: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

// Viewport configuration for animations
export const viewportConfig = {
  once: true,
  margin: "0px",
  amount: 0.1
};

// Utility classes
export const mobileFirstClass = "block w-full md:w-auto";
export const essentialContentClass = "block opacity-100 visible";

// Define context type
interface AnimationContextType {
  controls: ReturnType<typeof useAnimation>;
  isMobile: boolean;
  loaded: boolean;
}

// Create context
const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function useAnimationContext() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationContext must be used within an AnimationProvider');
  }
  return context;
}

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Initialize and preload animations
  useEffect(() => {
    setLoaded(true);
    
    const timer = setTimeout(() => {
      controls.start('animate');
    }, 500);
    
    return () => clearTimeout(timer);
  }, [controls]);

  // Detect mobile device and trigger animations
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (mobile) {
        controls.start('animate');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [controls]);

  return (
    <AnimationContext.Provider value={{ controls, isMobile, loaded }}>
      <div className={loaded ? 'animate-fadeIn' : ''}>
        {children}
      </div>
    </AnimationContext.Provider>
  );
} 