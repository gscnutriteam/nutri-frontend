import JobDetailPage from '@/services/landing_page/careers/pages/JobDetailPage';
import React from 'react';

const Page = ({ params }: { params: { slug: string } }) => {
    return (
        <JobDetailPage slug={params.slug} />
    );
};

export default Page; 