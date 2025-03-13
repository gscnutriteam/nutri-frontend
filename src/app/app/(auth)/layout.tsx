// import { Head } from '@inertiajs/react';
import Head from 'next/head';
import type React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/img/logo.png" />
      </Head>
      <div className="relative max-w-md mx-auto p-4 ">{children}</div>
    </div>
  );
};

export default AuthLayout;
