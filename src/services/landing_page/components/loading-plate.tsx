'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingPlateProps {
  size?: number;
  className?: string;
}

const LoadingPlate: React.FC<LoadingPlateProps> = ({ 
  size = 200, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div style={{ width: size, height: size }} className="relative">
        {/* Plate */}
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-black bg-white"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2, 
            ease: "linear", 
            repeat: Infinity
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Plate divisions */}
            <motion.div 
              className="absolute inset-0"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black -ml-0.5"></div>
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-black -mt-0.5"></div>
            </motion.div>
            
            {/* QR Code center */}
            <motion.div 
              className="w-1/4 h-1/4 rounded-md border-2 border-black bg-white"
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-1">
                <div className="bg-black"></div>
                <div></div>
                <div className="bg-black"></div>
                <div></div>
                <div className="bg-black"></div>
                <div></div>
                <div className="bg-black"></div>
                <div></div>
                <div className="bg-black"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Text */}
        <div className="absolute -bottom-10 left-0 right-0 text-center font-bold text-lg text-black">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            Loading...
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPlate; 