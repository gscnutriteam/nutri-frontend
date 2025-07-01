import type React from 'react';
import Link from 'next/link';

interface LinkAPPProps {
    href: string;
    as?: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
    onClick?: () => void;
}

const LinkAPP: React.FC<LinkAPPProps> = ({ href, as, children, className, target = "_self", onClick }) => {
    let prefixedHref: string = href;
    let prefixedAs: string | undefined ;
    if (href != "#") {
        prefixedHref = (href.startsWith('/app') || href.startsWith('http')) ? href : `/app${href.startsWith('/') ? href : `/${href}`}`;
        prefixedAs = as ? (as.startsWith('/app') ? as : `/app${as.startsWith('/') ? as : `/${as}`}`) : undefined;
    }
   
    
    return (
        <Link className={className} href={prefixedHref} as={prefixedAs} target={target} onClick={onClick}>
            {children}
        </Link>
    );
};

export default LinkAPP;