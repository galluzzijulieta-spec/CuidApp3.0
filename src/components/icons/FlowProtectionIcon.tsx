import React from 'react';

interface FlowProtectionIconProps {
  className?: string;
  color?: string;
}

export function FlowProtectionIcon({ className = "w-6 h-6", color = "#a55302" }: FlowProtectionIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Intertwined curved lines forming a dynamic spiral */}
      <path 
        d="M12 3c3 0 5.5 1.5 7 4-1.5 2.5-4 4-7 4s-5.5-1.5-7-4c1.5-2.5 4-4 7-4z" 
        stroke={color} 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      <path 
        d="M12 21c-3 0-5.5-1.5-7-4 1.5-2.5 4-4 7-4s5.5 1.5 7 4c-1.5 2.5-4 4-7 4z" 
        stroke={color} 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Central crossing lines */}
      <path 
        d="M9 9c1 1 2 2 3 3 1-1 2-2 3-3" 
        stroke={color} 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      <path 
        d="M15 15c-1-1-2-2-3-3-1 1-2 2-3 3" 
        stroke={color} 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Small accent dots for movement */}
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}