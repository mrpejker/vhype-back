import React from 'react';

interface RemoveIcon2Props {
  className?: string;
}

// Cross icon with className prop
const RemoveIcon2: React.FC<RemoveIcon2Props> = ({ className }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.3">
      <line
        x1="0.5"
        y1="-0.5"
        x2="17.0529"
        y2="-0.5"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 13.1006 1)"
        stroke="#3D3D3D"
        strokeLinecap="round"
      />
      <line
        x1="0.5"
        y1="-0.5"
        x2="17.0529"
        y2="-0.5"
        transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 12.4111 13.4116)"
        stroke="#3D3D3D"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default RemoveIcon2;
