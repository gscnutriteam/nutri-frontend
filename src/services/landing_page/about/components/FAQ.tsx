"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: {
        [key: string]: FaqItem[];
    };
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
    const allFaqs = Object.values(faqs).flat();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-neobrutalism border-2 border-black"
        >
            <h3 className="text-3xl font-heading text-secondaryBlack mb-6 text-center">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
                {allFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b-2 border-black">
                        <AccordionTrigger className="text-lg font-sans font-bold text-primaryText hover:no-underline">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base font-sans text-textGray">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </motion.div>
    );
};

export default FAQ; 