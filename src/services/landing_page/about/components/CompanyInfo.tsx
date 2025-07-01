"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface CompanyInfoProps {
    vision: string;
    mission: string[];
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ vision, mission }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
            <div className="bg-secondaryLight p-6 rounded-lg shadow-neobrutalism border-2 border-black">
                <h3 className="text-2xl font-heading text-secondaryBlack mb-4">🚀 Visi Kami</h3>
                <p className="text-base font-sans text-black">{vision}</p>
            </div>
            <div className="bg-primaryLight p-6 rounded-lg shadow-neobrutalism border-2 border-black">
                <h3 className="text-2xl font-heading text-secondaryBlack mb-4">🎯 Misi Kami</h3>
                <ul className="list-disc list-inside space-y-2">
                    {mission.map((item, index) => (
                        <li key={index} className="text-base font-sans text-black">
                            {index === 0 && '💡 '}
                            {index === 1 && '🍽️ '}
                            {index === 2 && '📱 '}
                            {index === 3 && '🧑‍⚕️ '}
                            {index === 4 && '🌍 '}
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default CompanyInfo; 