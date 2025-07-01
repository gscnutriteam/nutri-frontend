"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatbotButtonProps {
  isOpen: boolean;
  toggleChat: () => void;
}

export function ChatbotButton({ isOpen, toggleChat }: ChatbotButtonProps) {
  const [isPulsing, setIsPulsing] = useState(false);
  
  // Add a pulsing effect to draw attention
  useEffect(() => {
    if (!isOpen) {
      // Start pulsing after page load
      const timer = setTimeout(() => {
        setIsPulsing(true);
      }, 10000); // Start pulsing after 10 seconds
      
      return () => clearTimeout(timer);
    } else {
      setIsPulsing(false);
    }
  }, [isOpen]);
  
  // Stop pulsing if user already interacted with chat
  useEffect(() => {
    const hasInteracted = localStorage.getItem('NutriCare-chat-interacted');
    if (hasInteracted) {
      setIsPulsing(false);
    }
  }, []);
  
  const handleClick = () => {
    setIsPulsing(false);
    localStorage.setItem('NutriCare-chat-interacted', 'true');
    toggleChat();
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Pulse effect ring */}
      {isPulsing && !isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 1.6 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      )}
      
      <Button 
        onClick={handleClick} 
        size="lg" 
        className={`rounded-full w-16 h-16 shadow-neobrutalism border-2 border-black relative z-10
          ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <MessageSquare className="h-8 w-8" />
            )}
          </motion.div>
        </AnimatePresence>
      </Button>
    </motion.div>
  );
} 