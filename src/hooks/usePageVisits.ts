"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, increment, onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const usePageVisits = () => {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const counterRef = doc(db, 'counters', 'pageVisits');
    const visitsCollectionRef = collection(db, 'visits');
    
    const logVisit = async () => {
      const sessionKey = 'nutriplate-visit-logged';
      if (sessionStorage.getItem(sessionKey)) {
        return;
      }
      sessionStorage.setItem(sessionKey, 'true');

      // 1. Increment the main counter for live UI updates
      const docSnap = await getDoc(counterRef);
      if (docSnap.exists()) {
        await setDoc(counterRef, { count: increment(1) }, { merge: true });
      } else {
        await setDoc(counterRef, { count: 1 });
      }
      
      // 2. Get User Agent
      const userAgent = navigator.userAgent;

      // 3. Get Location from IP (no geo-permission needed)
      let locationData = {};
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          locationData = await response.json();
        }
      } catch (error) {
        console.error("Could not fetch location data:", error);
      }
      
      // 4. Add detailed visit log to a separate collection
      try {
        await addDoc(visitsCollectionRef, {
          timestamp: serverTimestamp(),
          userAgent,
          location: locationData,
        });
      } catch (error) {
        console.error("Error logging visit to Firestore:", error);
      }
    };
    
    logVisit();

    const unsubscribe = onSnapshot(counterRef, (doc) => {
      if (doc.exists()) {
        setVisits(doc.data().count + 1350);
      } else {
        setVisits(0);
      }
    });

    return () => unsubscribe();
  }, []);

  return visits;
};

export default usePageVisits; 