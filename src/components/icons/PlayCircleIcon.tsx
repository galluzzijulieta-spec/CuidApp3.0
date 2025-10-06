import React from 'react';

interface PlayCircleIconProps {
  className?: string;
  color?: string;
}

export function PlayCircleIcon({ className = "w-6 h-6", color = "#8e1100" }: PlayCircleIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Incomplete circle (like letter C) */}
      <path 
        d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.5 0 4.77 1.02 6.42 2.67" 
        stroke={color} 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Play triangle with extended line */}
      <path 
        d="M10 8l6 4-6 4V8z" 
        fill={color}
      />
      
      {/* Extended line connecting to circle */}
      <line 
        x1="16" 
        y1="12" 
        x2="19" 
        y2="9" 
        stroke={color} 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );
}