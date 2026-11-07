import React from 'react';
import { PlanetPosition } from '../../models/ptolemaic/calculator';

interface CosmologicalDiagramProps {
  position: PlanetPosition;
  planetName: string;
  size?: number;
}

const CosmologicalDiagram: React.FC<CosmologicalDiagramProps> = ({ position, planetName, size = 600 }) => {
  const center = size / 2;
  const scale = size * 0.003; // scale arbitrary units to pixels

  const eX = center + position.deferentCenterX * scale;
  const eY = center + position.deferentCenterY * scale;
  
  const epX = center + position.epicycleCenterX * scale;
  const epY = center + position.epicycleCenterY * scale;
  
  const pX = center + position.planetX * scale;
  const pY = center + position.planetY * scale;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ background: '#fdf6e3', borderRadius: '8px' }}>
      {/* Grid/Guidelines */}
      <circle cx={center} cy={center} r={size * 0.4} fill="none" stroke="#ddd" strokeWidth="1" strokeDasharray="4" />

      {/* Deferent */}
      <circle 
        cx={eX} cy={eY} 
        r={100 * scale} 
        fill="none" stroke="#aaa" strokeWidth="2" 
      />
      <text x={eX + 5} y={eY - 5} fill="#666" fontSize="12" style={{ fontFamily: 'serif' }}>Center of Deferent</text>

      {/* Epicycle */}
      <circle 
        cx={epX} cy={epY} 
        r={40 * scale} 
        fill="none" stroke="#888" strokeWidth="2" 
      />

      {/* Lines connecting them */}
      <line x1={center} y1={center} x2={epX} y2={epY} stroke="#4a3a1a" strokeWidth="1" opacity="0.5" />
      <line x1={epX} y1={epY} x2={pX} y2={pY} stroke="#4a3a1a" strokeWidth="1" opacity="0.5" />
      
      {/* Earth */}
      <circle cx={center} cy={center} r="5" fill="#4a3a1a" />
      <text x={center + 8} y={center + 15} fill="#4a3a1a" fontSize="12" style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Earth</text>

      {/* Planet */}
      <circle cx={pX} cy={pY} r="6" fill="#B22222" stroke="#fff" strokeWidth="1" />
      <text x={pX + 8} y={pY - 8} fill="#B22222" fontSize="12" style={{ fontFamily: 'serif', fontWeight: 'bold' }}>{planetName}</text>

      {/* Apparent Position Line */}
      <line 
        x1={center} y1={center} 
        x2={pX} y2={pY} 
        stroke="#B22222" strokeWidth="2" strokeDasharray="4" 
      />
    </svg>
  );
};

export default CosmologicalDiagram;
