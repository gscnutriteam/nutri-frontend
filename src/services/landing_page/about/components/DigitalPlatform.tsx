"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Feature {
    title: string;
    description: string;
    capabilities: string[];
}

interface DigitalPlatformProps {
    platformName: string;
    features: {
        [key: string]: Feature;
    };
}

const DigitalPlatform: React.FC<DigitalPlatformProps> = ({ platformName, features }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-neobrutalism border-2 border-black"
        >
            <h3 className="text-3xl font-heading text-secondaryBlack mb-6 text-center">💻 {platformName} 📱</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(features).map((feature, index) => (
                    <Card key={index} className="bg-white rounded-lg shadow-neobrutalism-sm border-2 border-black transform hover:-translate-y-1 transition-transform duration-300">
                        <CardHeader>
                            <CardTitle className="text-xl font-heading text-primary">
                                {feature.title === 'Food Scanning' && '📸 '}
                                {feature.title === 'Nutrition Tracking' && '📊 '}
                                {feature.title === 'AI Nutrition Assistant (Nubo)' && '🤖 '}
                                {feature.title === 'Recipe Recommendations' && '🍳 '}
                                {feature.title === 'Health Information' && '📚 '}
                                {feature.title === 'Additional Services' && '⚙️ '}
                                {feature.title}
                            </CardTitle>
                            <CardDescription className="font-sans text-textGray">{feature.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {feature.capabilities.map((capability, i) => (
                                    <Badge key={i} variant="secondary" className="bg-secondaryLight text-secondaryBlack">{capability}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </motion.div>
    );
};

export default DigitalPlatform; 