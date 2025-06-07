"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface IntroductionProps {
    companyName: string;
    tagline: string;
    about: string;
}

const Introduction: React.FC<IntroductionProps> = ({ companyName, tagline, about }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-neobrutalism border-2 mt-10 border-black"
        >
            <h1 className="text-4xl font-heading text-secondaryBlack mb-4">{companyName}</h1>
            <h2 className="text-2xl font-sans text-primaryText mb-4">{tagline}</h2>
            <p className="text-base font-sans text-textGray mb-6">{about}</p>
            <Button className="bg-primary text-white font-bold py-2 px-4 rounded-lg shadow-neobrutalism-sm border-2 border-black hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-transform">
                Learn More
            </Button>
        </motion.div>
    );
};

export default Introduction; 