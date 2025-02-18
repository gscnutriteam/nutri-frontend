import React from 'react';

interface BookProps {
  className?: string;
}

const Book: React.FC<BookProps> = ({ className = '' }) => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="7" y="5.25" width="28" height="31.5" rx="3.5" fill="#FFDC58" stroke="black"/>
      <path d="M14.875 11.375L27.125 11.375" stroke="#FEFEFE" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M14.875 16.625L21.875 16.625" stroke="#FEFEFE" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M14.875 21.875L25.375 21.875" stroke="#FEFEFE" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M7 33.25C7 31.317 8.567 29.75 10.5 29.75H29.75C31.3808 29.75 32.1962 29.75 32.8394 29.4836C33.697 29.1283 34.3783 28.447 34.7336 27.5894C35 26.9462 35 26.1308 35 24.5V29.75C35 33.0498 35 34.6997 33.9749 35.7249C32.9497 36.75 31.2998 36.75 28 36.75H10.5C8.567 36.75 7 35.183 7 33.25Z" fill="#FEFEFE" stroke="black"/>
    </svg>
  );
};

export default Book;
