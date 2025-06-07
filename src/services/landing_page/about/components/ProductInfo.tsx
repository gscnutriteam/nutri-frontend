"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Variant {
    name: string;
    description: string;
}

interface ProductInfoProps {
    productName: string;
    productDescription: string;
    variants: Variant[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productName, productDescription, variants }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white p-8 rounded-lg shadow-neobrutalism border-2 border-black"
        >
            <h3 className="text-3xl font-heading text-secondaryBlack mb-2 text-center">✨ {productName} ✨</h3>
            <p className="text-lg font-sans text-textGray mb-6 text-center">{productDescription}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {variants.map((variant, index) => (
                    <Card key={index} className="bg-white rounded-lg shadow-neobrutalism-sm border-2 border-black transform hover:-translate-y-1 transition-transform duration-300">
                        <CardHeader>
                            <CardTitle className="text-xl font-heading text-primary">
                                {index === 0 && '🥗 '}
                                {index === 1 && '🏃‍♀️ '}
                                {index === 2 && '🍬 '}
                                {index === 3 && '🏋️‍♂️ '}
                                {variant.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-sans text-textGray">{variant.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </motion.div>
    );
};

export default ProductInfo; 