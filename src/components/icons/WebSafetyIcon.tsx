import React from 'react';

interface WebSafetyIconProps {
  className?: string;
  color?: string;
}

export function WebSafetyIcon({ className = "w-6 h-6", color = "#a55302" }: WebSafetyIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        fill={color}
        opacity="0.15"
      />
      
      {/* Main shield/globe shape */}
      <circle 
        cx="12" 
        cy="12" 
        r="7" 
        fill="none"
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      
      {/* Globe grid lines - vertical */}
      <path 
        d="M12 5v14" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Globe grid lines - horizontal */}
      <ellipse 
        cx="12" 
        cy="12" 
        rx="7" 
        ry="3" 
        fill="none"
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      
      {/* Central shield/protection symbol */}
      <path 
        d="M12 8.5l2.5 1.5v3c0 1.5-2.5 2.5-2.5 2.5s-2.5-1-2.5-2.5v-3L12 8.5z" 
        fill={color}
        opacity="0.8"
      />
      

    </svg>
  );
}