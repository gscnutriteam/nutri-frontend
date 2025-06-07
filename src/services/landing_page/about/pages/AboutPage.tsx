"use client";
import React from 'react';
import Introduction from '../components/Introduction';
import CompanyInfo from '../components/CompanyInfo';
import DigitalPlatform from '../components/DigitalPlatform';
import ProductInfo from '../components/ProductInfo';
import { AnimationProvider } from '@/app/(landing_page)/components/AnimationProvider';
import styles from '@/app/(landing_page)/landing.module.css';

import companyData from '@/app/api/chat/knowledge/company_info.json';
import platformData from '@/app/api/chat/knowledge/digital_platform_features.json';
import productData from '@/app/api/chat/knowledge/product_info.json';
import { Chatbot } from '@/app/(landing_page)/components/Chatbot';

const AboutPage = () => {
    return (
        <AnimationProvider>
            <main className={styles.landingContainer}>
                <div className="bg-gray-50 min-h-screen">
                    <div className="container mx-auto px-4 py-12">
                        <div className="space-y-12">
                            <Introduction
                                companyName={companyData.company_name}
                                tagline={companyData.tagline}
                                about={companyData.about}
                            />
                            <CompanyInfo
                                vision={companyData.vision}
                                mission={companyData.mission}
                            />
                            {/* <ProductInfo
                                productName={productData.product_name}
                                productDescription={productData.product_description}
                                variants={productData.variants}
                            />
                            <DigitalPlatform
                                platformName={platformData.platform_name}
                                features={platformData.features}
                            /> */}
                            <Chatbot />
                        </div>
                    </div>
                </div>
            </main>
        </AnimationProvider>
    );
};

export default AboutPage;
