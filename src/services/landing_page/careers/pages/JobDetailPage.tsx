"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { AnimationProvider } from '@/app/(landing_page)/components/AnimationProvider';
import styles from '@/app/(landing_page)/landing.module.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Building, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import jobData from '../data/jobs.json';

type Job = {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  applyEmail: string;
};

interface JobDetailPageProps {
  slug: string;
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ slug }) => {
  const job = jobData.find((j) => j.slug === slug);

  if (!job) {
    return (
      <div className="bg-gray-50 min-h-screen mt-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Lowongan tidak ditemukan</h1>
          <Link href="/careers">
            <Button className="mt-4">Kembali ke Karir</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AnimationProvider>
      <main className={styles.landingContainer}>
        <div className="bg-gray-50 mt-10 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/careers" className="flex items-center gap-2 text-primary mb-6 font-bold">
                <ArrowLeft size={20} />
                Kembali ke semua lowongan
              </Link>
              <div className="bg-white p-8 rounded-lg shadow-neobrutalism border-2 border-black">
                <header className="mb-6">
                  <h1 className="text-4xl font-heading text-secondaryBlack">{job.title}</h1>
                  <div className="flex items-center gap-4 text-textGray pt-2">
                    <span className="flex items-center gap-1"><Building size={16} /> {job.department}</span>
                    <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase size={16} /> {job.type}</span>
                  </div>
                </header>

                <div className="prose max-w-none">
                  <p className="text-lg">{job.description}</p>

                  <h3 className="font-heading text-2xl mt-6 mb-2">Tanggung Jawab</h3>
                  <ul className="list-disc pl-5">
                    {job.responsibilities.map((res, index) => <li key={index}>{res}</li>)}
                  </ul>

                  <h3 className="font-heading text-2xl mt-6 mb-2">Kualifikasi</h3>
                  <ul className="list-disc pl-5">
                    {job.qualifications.map((qual, index) => <li key={index}>{qual}</li>)}
                  </ul>
                </div>
                
                <footer className="mt-8 text-center">
                  <a href={`mailto:${job.applyEmail}?subject=Lamaran untuk posisi ${job.title}`}>
                    <Button size="lg" className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-neobrutalism-sm border-2 border-black hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-transform">
                      Lamar Sekarang
                    </Button>
                  </a>
                  <p className="text-sm text-textGray mt-4">Kirim email ke {job.applyEmail}</p>
                </footer>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </AnimationProvider>
  );
};

export default JobDetailPage; 