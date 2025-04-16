import React from 'react';

interface ElectricCarIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const ElectricCarIcon: React.FC<ElectricCarIconProps> = ({ 
  className = '', 
  width = 36, 
  height = 36 
}) => {
  return (
    <img 
      src="/assets/icon.png" 
      alt="Electric Car Icon" 
      className={className}
      width={width}
      height={height}
    />
  );
};

export default ElectricCarIcon;
