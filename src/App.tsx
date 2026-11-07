import React, { useState, useEffect, useMemo } from 'react';
import { PLANET_DATA } from './data/planets';
import { ZODIAC_SIGNS } from './data/zodiac';
import { calculatePtolemaicPosition } from './models/ptolemaic/calculator';
import EquatoriumDisk from './components/instrument/EquatoriumDisk';
import CosmologicalDiagram from './components/diagram/CosmologicalDiagram';

const App: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState('mars');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'instrument' | 'diagram'>('instrument');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setDate(prev => new Date(prev.getTime() + 24 * 60 * 60 * 1000));
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const planetParams = PLANET_DATA[selectedPlanet];
  
  const position = useMemo(() => {
    const epoch = new Date('2000-01-01');
    const daysSinceEpoch = (date.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24);
    return calculatePtolemaicPosition(planetParams, daysSinceEpoch);
  }, [selectedPlanet, date]);

  const currentZodiac = useMemo(() => {
    const sign = ZODIAC_SIGNS.find(s => position.longitude >= s.startDegree && position.longitude < s.startDegree + 30);
    return sign || ZODIAC_SIGNS[0];
  }, [position]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      fontFamily: 'serif', 
      backgroundColor: '#2c241a', 
      color: '#e0d5c0',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem', margin: '0', color: '#f8b500' }}>THEATRUM PLANETARUM</h1>
        <p style={{ fontStyle: 'italic', color: '#b8860b' }}>Digital Equatorium of the Ptolemaic Universe</p>
      </header>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        justifyContent: 'center',
        alignItems: 'flex-start' 
      }}>
        {/* Left Panel: Controls */}
        <div style={{ 
          backgroundColor: '#3d3326', 
          padding: '20px', 
          borderRadius: '12px', 
          width: '300px', 
          boxShadow: 'inset 0 0 10px #000' 
        }}>
          <h3 style={{ color: '#f8b500', marginTop: 0 }}>Controls</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Planet</label>
            <select 
              value={selectedPlanet} 
              onChange={(e) => setSelectedPlanet(e.target.value)}
              style={{ width: '100%', padding: '8px', backgroundColor: '#2c241a', color: '#e0d5c0', border: '1px solid #b8860b' }}
            >
              {Object.keys(PLANET_DATA).map(id => (
                <option key={id} value={id}>{PLANET_DATA[id].name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Date</label>
            <input 
              type="date" 
              value={date.toISOString().split('T')[0]} 
              onChange={(e) => setDate(new Date(e.target.value))}
              style={{ width: '100%', padding: '8px', backgroundColor: '#2c241a', color: '#e0d5c0', border: '1px solid #b8860b' }}
            />
          </div>

          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              style={{ flex: 1, padding: '10px', backgroundColor: isPlaying ? '#800000' : '#b8860b', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {isPlaying ? 'Stop' : 'Play'}
            </button>
            <button 
              onClick={() => setDate(prev => new Date(prev.getTime() + 24 * 60 * 60 * 1000))}
              style={{ padding: '10px', backgroundColor: '#4a3a1a', color: '#e0d5c0', border: '1px solid #b8860b', cursor: 'pointer' }}
            >
              +1 Day
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>View Mode</label>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button 
                onClick={() => setMode('instrument')}
                style={{ 
                  flex: 1, 
                  padding: '8px', 
                  backgroundColor: mode === 'instrument' ? '#f8b500' : '#4a3a1a', 
                  color: mode === 'instrument' ? '#000' : '#e0d5c0', 
                  border: '1px solid #b8860b', 
                  cursor: 'pointer',
                  fontWeight: mode === 'instrument' ? 'bold' : 'normal'
                }}
              >
                Instrument
              </button>
              <button 
                onClick={() => setMode('diagram')}
                style={{ 
                  flex: 1, 
                  padding: '8px', 
                  backgroundColor: mode === 'diagram' ? '#f8b500' : '#4a3a1a', 
                  color: mode === 'diagram' ? '#000' : '#e0d5c0', 
                  border: '1px solid #b8860b', 
                  cursor: 'pointer',
                  fontWeight: mode === 'diagram' ? 'bold' : 'normal'
                }}
              >
                Diagram
              </button>
            </div>
          </div>
        </div>

        {/* Center: The Visualizer */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          maxWidth: '650px',
          width: '100%'
        }}>
          {mode === 'instrument' ? (
            <EquatoriumDisk position={position} planetName={planetParams.name} />
          ) : (
            <CosmologicalDiagram position={position} planetName={planetParams.name} />
          )}
        </div>

        {/* Right Panel: Info */}
        <div style={{ 
          backgroundColor: '#3d3326', 
          padding: '20px', 
          borderRadius: '12px', 
          width: '300px', 
          boxShadow: 'inset 0 0 10px #000' 
        }}>
          <h3 style={{ color: '#f8b500', marginTop: 0 }}>Planet Information</h3>
          <div style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
            <div style={{ marginBottom: '5px' }}>
              <strong>{planetParams.latinName}</strong>
            </div>
            <div style={{ marginBottom: '5px' }}>
              Longitude: <span style={{ color: '#f8b500' }}>{position.longitude.toFixed(2)}°</span>
            </div>
            <div style={{ marginBottom: '5px' }}>
              Longitude: <span style={{ color: '#f8b500' }}>{currentZodiac.symbol} {currentZodiac.name}</span>
            </div>
          </div>
          <div style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#c0b090' }}>
            <p><strong>Model:</strong> Ptolemaic Geocentric</p>
            <p><strong>Geometry:</strong> Deferent and Epicycle</p>
            <p><strong>Insight:</strong> The apparent retrograde motion of {planetParams.name} is a result of the planet's movement on its epicycle while the epicycle's center moves along the deferent.</p>
            <hr style={{ borderColor: '#4a3a1a' }} />
            <p style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>
              This simulation is based on a historical geometric model for educational purposes.
            </p>
          </div>
        </div>
      </div>

      <footer style={{ 
        marginTop: 'auto', 
        textAlign: 'center', 
        padding: '20px', 
        fontSize: '0.8rem', 
        color: '#b8860b',
        opacity: 0.8 
      }}>
        <p>© 2026 Theatrum Planetarum - An exploration of Renaissance astronomy</p>
      </footer>
    </div>
  );
};

export default App;
