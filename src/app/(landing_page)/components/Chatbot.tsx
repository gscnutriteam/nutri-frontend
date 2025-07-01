"use client";

import React, { useState, useEffect } from 'react';
import { ChatbotButton } from './ChatbotButton';
import { ChatbotPanel } from './ChatbotPanel';
import { motion, AnimatePresence } from 'framer-motion';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  // Show greeting bubble after a delay when user first visits
  useEffect(() => {
    const hasSeenGreeting = localStorage.getItem('NutriCare-greeting-seen');
    
    if (!hasSeenGreeting) {
      const timer = setTimeout(() => {
        setShowGreeting(true);
      }, 5000); // Show after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleChat = () => {
    if (showGreeting) {
      setShowGreeting(false);
      localStorage.setItem('NutriCare-greeting-seen', 'true');
    }
    
    setIsOpen(prev => !prev);
  };

  // Hide greeting when chat opens
  useEffect(() => {
    if (isOpen && showGreeting) {
      setShowGreeting(false);
      localStorage.setItem('NutriCare-greeting-seen', 'true');
    }
  }, [isOpen, showGreeting]);

  return (
    <>
      <ChatbotButton isOpen={isOpen} toggleChat={toggleChat} />
      <ChatbotPanel isOpen={isOpen} />
      
      {/* Greeting Bubble */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div 
            className="fixed bottom-28 right-8 z-30 max-w-60 bg-white p-4 rounded-xl rounded-br-none border-2 border-black shadow-neobrutalism"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="text-sm font-medium">
              <p>Hi! Ada yang bisa Nutri bantu tentang produk NutriCare?</p>
              <button 
                onClick={toggleChat}
                className="mt-2 text-primary font-bold hover:underline"
              >
                Chat sekarang
              </button>
            </div>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r-2 border-b-2 border-black rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 