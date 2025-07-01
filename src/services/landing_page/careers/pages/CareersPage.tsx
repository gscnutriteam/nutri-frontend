"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimationProvider } from '@/app/(landing_page)/components/AnimationProvider';
import landingStyles from '@/app/(landing_page)/landing.module.css';
import careerStyles from '../careers.module.css';
import JobList from '../components/JobList';
import NoJobs from '../components/NoJobs';
import JobFilters from '../components/JobFilters';
import jobData from '../data/jobs.json';
import Image from 'next/image';

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');
  const [type, setType] = useState('all');
  const [sortBy, setSortBy] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobData);

  const departments = useMemo(() => [...new Set(jobData.map(job => job.department))], []);
  const types = useMemo(() => [...new Set(jobData.map(job => job.type))], []);

  useEffect(() => {
    let jobs = [...jobData];

    if (searchTerm) {
      jobs = jobs.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (department !== 'all') {
      jobs = jobs.filter(job => job.department === department);
    }
    if (type !== 'all') {
      jobs = jobs.filter(job => job.type === type);
    }
    if (sortBy === 'title-asc') {
      jobs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
      jobs.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredJobs(jobs);
  }, [searchTerm, department, type, sortBy]);

  return (
    <AnimationProvider>
      <main className={`${landingStyles.landingContainer} relative`}>
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10 animate-spin-slow" />
        <div className={`absolute bottom-0 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10 ${careerStyles['float-side']}`} />
        
        <div className="bg-transparent min-h-screen">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-6xl font-heading text-secondaryBlack mb-4">Karir di NutriCare</h1>
              <p className="text-xl font-sans text-textGray max-w-2xl mx-auto">
                🚀 Bergabunglah dengan tim kami yang bersemangat dan bantu kami membangun masa depan teknologi kesehatan.
              </p>
            </motion.div>
            
            <JobFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setDepartment={setDepartment}
              setType={setType}
              setSortBy={setSortBy}
              departments={departments}
              types={types}
            />

            {filteredJobs.length > 0 ? <JobList jobs={filteredJobs} /> : <NoJobs />}
          </div>
        </div>
      </main>
    </AnimationProvider>
  );
};

export default CareersPage; 