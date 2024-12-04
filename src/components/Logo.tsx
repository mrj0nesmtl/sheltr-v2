import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export function Logo({ className, linkClassName }: LogoProps) {
  return (
    <Link to="/" className={cn("flex items-center", linkClassName)}>
      <svg 
        className={cn("h-5 w-auto", className)} 
        viewBox="0 0 564 132" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <path d="m28.8 87.4c0 16.7 13 23.2 27.8 23.2 9.6 0 24.4-2.8 24.4-15.7 0-13.5-18.8-15.8-37.3-20.7-18.6-5-37.5-12.2-37.5-35.8 0-25.6 24.3-38 47-38 26.2 0 50.4 11.5 50.4 40.5h-26.8c-0.9-15.1-11.6-19-24.8-19-8.8 0-19 3.7-19 14.3 0 9.6 6 10.9 37.5 19 9.1 2.3 37.3 8.1 37.3 36.6 0 23-18.1 40.3-52.3 40.3-27.8 0-53.8-13.7-53.5-44.7z"/>
          <path d="m111.6 3.4h27.6v48.2h50.9v-48.2h27.6v125.7h-27.6v-54.2h-50.9v54.2h-27.6z"/>
          <path d="m224.4 3.4h94v23.3h-66.4v26.9h60.9v21.5h-60.9v30.8h67.8v23.2h-95.4z"/>
          <path d="m324.4 3.4h27.6v102.5h61.3v23.2h-88.9z"/>
          <path d="m454.1 3.4h67.8c22.5 0 36.8 15.7 36.8 34.7 0 14.8-6 25.9-19.9 31.5v0.4c13.5 3.5 17.4 16.7 18.3 29.3 0.5 8 0.3 22.7 5.2 29.8h-27.6c-3.3-7.9-3-20.1-4.4-30.1-1.9-13.2-7-19-20.9-19h-27.7v49.1h-27.6zm27.6 56.8h30.3c12.3 0 19-5.2 19-17.9 0-12.2-6.7-17.4-19-17.4h-30.3z"/>
          <path d="m448 128.2h-27.6v-102.4h-61.2v-23.2h88.8z"/>
        </g>
      </svg>
    </Link>
  );
}