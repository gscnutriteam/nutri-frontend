import type React from 'react';

interface BookOpenProps {
  className?: string;
}

const BookOpen: React.FC<BookOpenProps> = ({ className = '' }) => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.75 29.75H15.75C18.6495 29.75 21 32.1005 21 35V17.5C21 12.5503 21 10.0754 19.4623 8.53769C17.9246 7 15.4497 7 10.5 7H8.75C7.10008 7 6.27513 7 5.76256 7.51256C5.25 8.02513 5.25 8.85008 5.25 10.5V26.25C5.25 27.8999 5.25 28.7249 5.76256 29.2374C6.27513 29.75 7.10008 29.75 8.75 29.75Z"
        fill="#3E9295"
        stroke="black"
      />
      <path
        d="M33.25 29.75H28C25.1005 29.75 22.75 32.1005 22.75 35V17.5C22.75 12.5503 22.75 10.0754 24.2877 8.53769C25.8254 7 28.3003 7 33.25 7C34.8999 7 35.7249 7 36.2374 7.51256C36.75 8.02513 36.75 8.85008 36.75 10.5V26.25C36.75 27.8999 36.75 28.7249 36.2374 29.2374C35.7249 29.75 34.8999 29.75 33.25 29.75Z"
        fill="#FEFEFE"
        stroke="black"
      />
      <path
        d="M9.25 14.5429V7.5H13.5V14.5429L12.0379 13.0808C11.6718 12.7147 11.0782 12.7147 10.7121 13.0808L9.25 14.5429Z"
        fill="#FEFEFE"
        stroke="black"
      />
    </svg>
  );
};

export default BookOpen;
