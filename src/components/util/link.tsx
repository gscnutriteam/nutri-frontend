import type React from 'react';
import Link from 'next/link';

interface LinkAPPProps {
    href: string;
    as?: string;
    children: React.ReactNode;
    className?: string;
}

const LinkAPP: React.FC<LinkAPPProps> = ({ href, as, children, className }) => {
    const prefixedHref = (href.startsWith('/app') || href.startsWith('http')) ? href : `/app${href.startsWith('/') ? href : `/${href}`}`;
    const prefixedAs = as ? (as.startsWith('/app') ? as : `/app${as.startsWith('/') ? as : `/${as}`}`) : undefined;
    
    return (
        <Link className={className} href={prefixedHref} as={prefixedAs}>
            {children}
        </Link>
    );
};

export default LinkAPP;