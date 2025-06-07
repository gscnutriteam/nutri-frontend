"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Building } from 'lucide-react';

type Job = {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  department: string;
};

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {jobs.map((job) => (
        <motion.div
          key={job.id}
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <Card className="bg-white rounded-lg shadow-neobrutalism border-2 border-black hover:shadow-neobrutalism-lg transition-shadow duration-300 flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary">{job.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="flex items-center gap-2 text-textGray">
                <Building size={16} /> <span>{job.department}</span>
              </div>
              <div className="flex items-center gap-2 text-textGray">
                <MapPin size={16} /> <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-textGray">
                <Briefcase size={16} /> <span>{job.type}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-4 flex justify-end">
              <Button asChild className="bg-primary text-white font-bold py-2 px-4 rounded-lg shadow-neobrutalism-sm border-2 border-black hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-transform">
                <Link href={`/careers/${job.slug}`}>Lihat Detail</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default JobList; 