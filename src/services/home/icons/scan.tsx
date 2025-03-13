import type React from 'react';

interface ScanProps {
  className?: string;
}

const Scan: React.FC<ScanProps> = ({ className = '' }) => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M35 17.5L35 15.75C35 14.1225 35 13.3088 34.8211 12.6412C34.3357 10.8295 32.9205 9.41434 31.1088 8.92889C30.4412 8.75 29.6275 8.75 28 8.75" stroke="#FEFEFE" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M35 24.5L35 26.25C35 27.8775 35 28.6912 34.8211 29.3588C34.3357 31.1705 32.9205 32.5857 31.1088 33.0711C30.4412 33.25 29.6275 33.25 28 33.25" stroke="#FEFEFE" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M17.5 33.25L15.75 33.25C12.4788 33.25 10.8433 33.25 9.625 32.5466C8.8269 32.0858 8.16415 31.4231 7.70337 30.625C7 29.4067 7 27.7712 7 24.5" stroke="#FEFEFE" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M17.5 8.75L15.75 8.75C12.4788 8.75 10.8433 8.75 9.625 9.45337C8.8269 9.91415 8.16415 10.5769 7.70337 11.375C7 12.5933 7 14.2288 7 17.5" stroke="#FEFEFE" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M17.5 36.75L17.5 5.25" stroke="#FEFEFE" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default Scan;
