"use client";

import React, { useState, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Chat } from '@/components/ui/chat';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ChatbotPanelProps {
  isOpen: boolean;
}

export function ChatbotPanel({ isOpen }: ChatbotPanelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [typingMessage, setTypingMessage] = useState('');
  
  const { messages, input, handleInputChange, handleSubmit, stop, append, isLoading: isChatLoading } = useChat({
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: "Halo! Saya Nubo, asisten virtual Nutriplate. Ada yang bisa saya bantu terkait produk dan layanan kami?"
      }
    ],
    api: '/api/chat/home',
    body: {
      botName: "Nubo"  // Set the bot name to Nubo
    }
  });

  // Simulate loading state and typing animation
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(loadingTimer);
    }
  }, [isOpen]);

  // Detect when AI is generating a response
  const isGenerating = isChatLoading;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-28 right-2 sm:right-8 z-40 w-[calc(100%-1rem)] sm:w-96 h-[500px] rounded-2xl border-2 border-black shadow-neobrutalism overflow-hidden bg-white"
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="bg-[#53C2C6] w-full py-4 px-4 border-b-2 border-black flex items-center gap-2">
            <motion.div 
              className="w-3 h-3 rounded-full bg-green-500"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h3 className="text-white font-bold text-lg">Nutriplate Assistant</h3>
          </div>
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                className="flex flex-col items-center justify-center h-[calc(100%-56px)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
                <p className="text-sm text-gray-600">Memuat percakapan...</p>
              </motion.div>
            ) : (
              <motion.div 
                className="h-[calc(100%-56px)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="h-full">
                  <Chat
                    className="h-full border-none bg-white px-3 pt-2"
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    input={input}
                    isGenerating={isGenerating}
                    messages={messages.map(msg => ({
                      ...msg,
                      // Add avatar for each message
                      avatar: msg.role === 'assistant' ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black">
                          <Image
                            src="/assets/img/nubo-avatar.png" 
                            alt="Nubo"
                            width={40}
                            height={40}
                            className="object-cover"
                            onError={(e) => {
                              // Fallback if image doesn't exist
                              const target = e.target as HTMLImageElement;
                              target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=nubo";
                            }}
                          />
                        </div>
                      ) : undefined
                    }))}
                    stop={stop}
                    append={append}
                    suggestions={[
                      "Apa itu Nutriplate?",
                      "Bagaimana cara menggunakan Nutriplate?",
                      "Harga Nutriplate",
                      "Manfaat Nutriplate untuk kesehatan"
                    ]}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 