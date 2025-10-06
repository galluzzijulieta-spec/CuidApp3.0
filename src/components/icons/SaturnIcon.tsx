import React from 'react';

interface SaturnIconProps {
  className?: string;
  color?: string;
}

export function SaturnIcon({ className = "w-6 h-6", color = "#8e1100" }: SaturnIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central circle (Saturn's core) */}
      <circle 
        cx="12" 
        cy="12" 
        r="4" 
        fill={color}
        stroke={color} 
        strokeWidth="1"
      />
      
      {/* First ring */}
      <ellipse 
        cx="12" 
        cy="12" 
        rx="8" 
        ry="3" 
        fill="none"
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      
      {/* Second ring (partial) */}
      <path 
        d="M4 12c0-1.5 3.5-2.8 8-2.8s8 1.3 8 2.8" 
        fill="none"
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Third ring (smaller, more dynamic) */}
      <ellipse 
        cx="12" 
        cy="12" 
        rx="6.5" 
        ry="2" 
        fill="none"
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}