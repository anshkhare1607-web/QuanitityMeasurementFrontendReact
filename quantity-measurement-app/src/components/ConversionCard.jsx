import React, { useState, useEffect, useContext } from 'react';
import { MeasurementContext } from '../context/MeasurementContext';
import './Card.scss';

const ConversionCard = () => {
  const { unitType, units } = useContext(MeasurementContext);
  const [val, setVal] = useState(100);
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState(0);
  
  // NEW: A separate state just for the unit shown in the purple box
  const [displayedUnit, setDisplayedUnit] = useState(''); 

  // Reset everything cleanly when you change categories (Length -> Weight)
  useEffect(() => {
    if (units && units.length > 0) {
      setFromUnit(units[0]);
      setToUnit(units[1] || units[0]);
      setResult(0); 
      setDisplayedUnit(units[1] || units[0]);
    }
  }, [units]);

  const handleConvert = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/quantity/convert', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          value1: val,
          unit1: fromUnit,
          unit2: toUnit,
          measurementType: unitType,
          operation: 'CONVERT'
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setResult(data.result);
      setDisplayedUnit(toUnit); 
      
    } catch (err) { 
      console.error("Conversion failed:", err); 
    }
  };

  return (
    <div className="card conversion">
      <h3>Conversion 🔄</h3>
      
      <label>Input Value</label>
      <input 
        type="number" 
        value={val} 
        onChange={(e) => setVal(e.target.value)} 
        onBlur={handleConvert} 
      />
      
      <label>From</label>
      {/* Notice we removed the auto-calculate from onChange so it waits for your click */}
      <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
        {units.map(u => <option key={u}>{u}</option>)}
      </select>
      
      <label>To</label>
      <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
        {units.map(u => <option key={u}>{u}</option>)}
      </select>

      <div className="result-box" onClick={handleConvert} style={{cursor: 'pointer'}}>
        <span style={{fontSize:"15px"}}>Result</span>
        <h1>{result} {displayedUnit}</h1>
      </div>
    </div>
  );
};

export default ConversionCard;