import React, { useState, useEffect, useContext } from 'react';
import { MeasurementContext } from '../context/MeasurementContext';
import './Card.scss';

const ComparisonCard = () => {
  const { unitType, units } = useContext(MeasurementContext);
  const [v1, setV1] = useState(1);
  const [v2, setV2] = useState(1000);
  const [u1, setU1] = useState('');
  const [u2, setU2] = useState('');
  const [resultMsg, setResultMsg] = useState('A ? B');

  // Reset safely when changing categories
  useEffect(() => {
    if (units && units.length > 0) {
      setU1(units[0]);
      setU2(units[1] || units[0]);
      setResultMsg('A ? B');
    }
  }, [units]);

  const handleCompare = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/quantity/compare', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          value1: v1, 
          value2: v2, 
          unit1: u1, 
          unit2: u2,
          measurementType: unitType, 
          operation: 'COMPARE'
        }),
      });

      if (!response.ok) {
        throw new Error('Comparison failed');
      }

      const data = await response.json();
      
      setResultMsg(data.comparisonResult);
      
    } catch (err) { 
      console.error("Comparison error:", err); 
      setResultMsg('Error');
    }
  };

  return (
    <div className="card comparison">
      <h3>Comparison</h3>
      
      <label>VALUE A</label>
      <div className="row">
        <input type="number" value={v1} onChange={(e) => setV1(e.target.value)} />
        <select value={u1} onChange={(e) => setU1(e.target.value)}>
          {units.map(u => <option key={u}>{u}</option>)}
        </select>
      </div>

      <div className="op-selector">
        <button className="op-btn" onClick={handleCompare} style={{fontSize: '16px', fontWeight: 'bold'}}>VS</button>
      </div>

      <label>VALUE B</label>
      <div className="row">
        <input type="number" value={v2} onChange={(e) => setV2(e.target.value)} />
        <select value={u2} onChange={(e) => setU2(e.target.value)}>
          {units.map(u => <option key={u}>{u}</option>)}
        </select>
      </div>

      <div className="compare-box" onClick={handleCompare} style={{cursor: 'pointer'}}>
        <span style={{height:"20px",fontSize:"15px"}}>Result (A?B)</span>
        <h2>{resultMsg}</h2>
      </div>
    </div>
  );
};

export default ComparisonCard;  