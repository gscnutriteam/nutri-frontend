"use client";
import React from 'react';
import { motion } from 'framer-motion';

const NoJobs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-neobrutalism border-2 border-black text-center"
    >
      <h2 className="text-3xl font-heading text-secondaryBlack mb-4">😔 Maaf!</h2>
      <p className="text-lg font-sans text-textGray">
        Saat ini tidak ada lowongan pekerjaan yang tersedia. Silakan periksa kembali nanti!
      </p>
    </motion.div>
  );
};

export default NoJobs; 