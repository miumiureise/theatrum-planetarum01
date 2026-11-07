import React from 'react';
import { ZODIAC_SIGNS } from '../../data/zodiac';
import { PlanetPosition } from '../../models/ptolemaic/calculator';

interface EquatoriumDiskProps {
  position: PlanetPosition;
  planetName: string;
  size?: number;
}

const EquatoriumDisk: React.FC<EquatoriumDiskProps> = ({ position, planetName, size = 600 }) => {
  const center = size / 2;
  const radius = size * 0.45;
  const innerRadius = radius * 0.8;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>
      <defs>
        <radialGradient id="brassGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fceabb" />
          <stop offset="50%" stopColor="#f8b500" />
          <stop offset="100%" stopColor="#b8860b" />
        </radialGradient>
        <filter id="engrave">
          <feOffset dx="0.5" dy="0.5" result="offOut" />
          <feGaussianBlur stdDeviation="0.2" result="blur" />
          <feComposite operator="out" in="SourceGraphic" in2="blur" result="edge" />
          <feFlood floodColor="#4a3a1a" result="color" />
          <feComposite operator="in" in="color" in2="edge" />
        </filter>
      </defs>

      {/* Main Brass Plate */}
      <circle cx={center} cy={center} r={radius} fill="url(#brassGradient)" stroke="#8b4513" strokeWidth="2" />
      
      {/* Outer Scale / Ring */}
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#4a3a1a" strokeWidth="1" opacity="0.5" />
      
      {/* Zodiac Ring */}
      {ZODIAC_SIGNS.map((sign, i) => {
        const angle = (sign.startDegree * Math.PI) / 180;
        const x1 = center + radius * Math.cos(angle);
        const y1 = center - radius * Math.sin(angle);
        const x2 = center + innerRadius * Math.cos(angle);
        const y2 = center - innerRadius * Math.sin(angle);
        
        const labelAngle = (sign.startDegree + 15) * Math.PI / 180;
        const lx = center + (radius + innerRadius) / 2 * Math.cos(labelAngle);
        const ly = center - (radius + innerRadius) / 2 * Math.sin(labelAngle);

        return (
          <g key={sign.name}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4a3a1a" strokeWidth="1" opacity="0.6" />
            <text 
              x={lx} y={ly} 
              fill="#4a3a1a" 
              fontSize="12" 
              textAnchor="middle" 
              dominantBaseline="middle"
              transform={`rotate(${(sign.startDegree + 15) * (Math.PI/180) * (180/Math.PI) + 90, lx, ly})`}
              style={{ fontFamily: 'serif', fontWeight: 'bold' }}
            >
              {sign.symbol}
            </text>
          </g>
        );
      })}

      {/* Inner Decorative Circles */}
      <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="#4a3a1a" strokeWidth="1" opacity="0.3" />
      <circle cx={center} cy={center} r={innerRadius * 0.6} fill="none" stroke="#4a3a1a" strokeWidth="1" opacity="0.2" />

      {/* Planet Pointer / Rule */}
      {/* The rule points from the Earth (center) to the current longitude of the planet */}
      <line 
        x1={center} y1={center} 
        x2={center + radius * Math.cos((position.longitude * Math.PI) / 180)} 
        y2={center - radius * Math.sin((position.longitude * Math.PI) / 180)} 
        stroke="#800000" strokeWidth="3" strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }}
      />
      
      {/* Planet Indicator */}
      <circle 
        cx={center + radius * Math.cos((position.longitude * Math.PI) / 180)} 
        cy={center - radius * Math.sin((position.longitude * Math.PI) / 180)} 
        r="6" fill="#B22222" stroke="#fff" strokeWidth="1"
      />
      
      {/* Center Earth */}
      <circle cx={center} cy={center} r="4" fill="#4a3a1a" />
      <text x={center + 8} y={center - 8} fill="#4a3a1a" fontSize="10" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>Terra</text>
    </svg>
  );
};

export default EquatoriumDisk;
