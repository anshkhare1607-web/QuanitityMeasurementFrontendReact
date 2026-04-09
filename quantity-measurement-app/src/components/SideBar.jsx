import React, { useContext } from 'react';
import { MeasurementContext } from '../context/MeasurementContext';
import './SideBar.scss';

const SideBar = () => {
  const { unitType, setUnitType, allCategories, view, setView } = useContext(MeasurementContext);

  const categoryEmojis = {
    LENGTH: '📏',
    WEIGHT: '⚖️',
    TEMPERATURE: '🌡️',
    VOLUME: '💧'
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Quantity Measurement App</h2>
      <nav>
        {allCategories.map((item) => (
          <button 
            key={item}
            className={view === 'TOOLS' && unitType === item ? 'active' : ''} 
            onClick={() => {
              setUnitType(item);
              setView('TOOLS'); 
            }}
          >
            <span className="emoji">{categoryEmojis[item] || '📐'}</span>
            {item}
          </button>
        ))}
      </nav>
      <div className="bottom-nav">
        <button 
          className={view === 'HISTORY' ? 'active' : ''}
          onClick={() => setView('HISTORY')} 
        >
          <span className="emoji">🕒</span> HISTORY
        </button>
      </div>
    </div>
  );
};

export default SideBar;