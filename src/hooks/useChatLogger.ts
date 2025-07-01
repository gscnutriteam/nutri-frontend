"use client";

import { useEffect, useRef, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { Message } from 'ai';

export const useChatLogger = (messages: Message[]) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const hasLoggedInitialWelcomeRef = useRef(false);

  // Safely get session ID on the client side after mount
  useEffect(() => {
    const getSessionId = () => {
      const key = 'NutriCare-chat-session-id';
      let sid = sessionStorage.getItem(key);
      if (!sid) {
        sid = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem(key, sid);
      }
      return sid;
    };
    setSessionId(getSessionId());
  }, []); // Empty dependency array ensures this runs only once on the client

  useEffect(() => {
    // Do not log until the session ID has been established
    if (!sessionId) {
      return;
    }

    const logMessages = async () => {
      // Don't log empty messages array or only the initial welcome message
      if (messages.length <= 1) {
        // Log the initial message only once
        if (messages.length === 1 && !hasLoggedInitialWelcomeRef.current) {
           hasLoggedInitialWelcomeRef.current = true;
        } else {
           return;
        }
      }
      
      const lastMessage = messages[messages.length - 1];
      // Only log when the last message is from the user,
      // this ensures we log the question and its subsequent answer together on the next turn.
      if (lastMessage.role !== 'user' && messages.length > 1) {
        return;
      }

      try {
        const sessionDocRef = doc(db, 'chat_logs', sessionId);
        
        await setDoc(sessionDocRef, {
          updatedAt: serverTimestamp(),
          messages: messages.map(({ id, role, content }) => ({ id, role, content })),
        }, { merge: true });

      } catch (error) {
        console.error("Error logging chat messages to Firestore:", error);
      }
    };

    logMessages();
  }, [messages, sessionId]); // Re-run when messages or session ID change
}; 