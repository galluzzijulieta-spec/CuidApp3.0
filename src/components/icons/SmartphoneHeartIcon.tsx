import React from 'react';

interface SmartphoneHeartIconProps {
  className?: string;
  color?: string;
}

export function SmartphoneHeartIcon({ className = "w-6 h-6", color = "#af1575" }: SmartphoneHeartIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Smartphone */}
      <rect 
        x="6" 
        y="2" 
        width="8" 
        height="16" 
        rx="2" 
        stroke={color} 
        strokeWidth="2.5" 
        fill="none"
      />
      <line 
        x1="9" 
        y1="15" 
        x2="11" 
        y2="15" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      <rect 
        x="7" 
        y="4" 
        width="6" 
        height="9" 
        fill={color} 
        opacity="0.1"
      />
      
      {/* Heart overlapping */}
      <path 
        d="M15.5 6c1.5 0 2.5 1 2.5 2.5 0 2.5-4 6-4 6s-4-3.5-4-6c0-1.5 1-2.5 2.5-2.5s2 .5 2.5 1.5c.5-1 1-1.5 2.5-1.5z" 
        fill={color}
        stroke="white"
        strokeWidth="1"
      />
    </svg>
  );
}