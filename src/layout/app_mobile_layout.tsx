import BottomBar from '@/components/ui/bottom_bar';
import Head from 'next/head';
import type React from 'react';

interface Props {
  children: React.ReactNode;
  withBottomBar?: boolean;
}

const AppMobileLayout: React.FC<Props> = ({ children, withBottomBar = true }) => {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        {/* favicon */}
        <link rel="icon" href="/assets/img/logo.png" />
      </Head>
      <div className="relative max-w-md mx-auto ">{children}</div>
      {withBottomBar && <BottomBar/>}
    </div>
  );
};

export default AppMobileLayout;
