import React from 'react';
import semaforoMuySeguroImage from 'figma:asset/4c6dc2c53f5b0dca4b9b73336df3fed017f56d6d.png';
import semaforoUsoModeradoImage from 'figma:asset/e36d6a4604d5b17f8660e440ca6b92e8a8902c97.png';
import semaforoCriticoImage from 'figma:asset/42dff54507532e2caeaeed4f5a681e67b1512892.png';

interface SafetyMeterProps {
  level: 'safe' | 'caution' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function SafetyMeter({ level, size = 'md' }: SafetyMeterProps) {
  const getSafetyConfig = () => {
    switch (level) {
      case 'safe':
        return {
          image: semaforoMuySeguroImage,
          label: 'Muy Seguro',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200'
        };
      case 'caution':
        return {
          image: semaforoUsoModeradoImage,
          label: 'Uso moderado',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200'
        };
      case 'danger':
        return {
          image: semaforoCriticoImage,
          label: 'Critico',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200'
        };
    }
  };

  const config = getSafetyConfig();
  
  const sizeClasses = {
    sm: { 
      image: 'h-10',
      container: 'px-2 py-1 text-xs', 
      spacing: 'space-y-1.5' 
    },
    md: { 
      image: 'h-14',
      container: 'px-3 py-2 text-sm', 
      spacing: 'space-y-2' 
    },
    lg: { 
      image: 'h-20',
      container: 'px-4 py-3 text-base', 
      spacing: 'space-y-3' 
    }
  };

  return (
    <div className={`flex flex-col items-start ${sizeClasses[size].spacing}`}>
      <img 
        src={config.image}
        alt={config.label}
        className={`${sizeClasses[size].image} w-auto object-contain`}
      />
      <div className={`inline-flex items-center rounded-full border-2 ${config.bgColor} ${config.borderColor} ${sizeClasses[size].container}`}>
        <span className={`font-medium ${config.textColor}`}>
          {config.label}
        </span>
      </div>
    </div>
  );
}