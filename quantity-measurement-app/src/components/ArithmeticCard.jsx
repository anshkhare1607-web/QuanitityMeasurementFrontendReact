import React, { useState, useEffect, useContext } from 'react';
import { MeasurementContext } from '../context/MeasurementContext';
import './Card.scss';

const ArithmeticCard = () => {
  const { unitType, units } = useContext(MeasurementContext);
  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(0);
  const [u1, setU1] = useState('');
  const [u2, setU2] = useState('');
  const [outUnit, setOutUnit] = useState('');
  const [op, setOp] = useState('ADD');
  const [showOps, setShowOps] = useState(false);
  const [result, setResult] = useState(0);
  const [displayedUnit, setDisplayedUnit] = useState('');

  useEffect(() => {
    if (units && units.length > 0) {
      setU1(units[0]);
      setU2(units[0]);
      setOutUnit(units[0]);
      setResult(0);
      setDisplayedUnit(units[0]);
    }
  }, [units]);

  const calculate = async (selectedOp, targetOutput = outUnit) => {
    setOp(selectedOp);
    setShowOps(false);
    
    try {
      const response = await fetch('http://localhost:8080/api/quantity/calculate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          value1: Number(v1), 
          value2: Number(v2), 
          unit1: u1, 
          unit2: u2,
          operation: selectedOp, 
          measurementType: unitType
        }),
      });

      if (!response.ok) {
        throw new Error('Calculation failed');
      }

      const data = await response.json();
      let finalResult = data.result;
      
      if ((selectedOp === 'ADD' || selectedOp === 'SUBTRACT') && u1 !== targetOutput) {
        const convResponse = await fetch('http://localhost:8080/api/quantity/convert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value1: finalResult,
            unit1: u1,
            unit2: targetOutput,
            measurementType: unitType,
            operation: 'CONVERT'
          }),
        });
        const convData = await convResponse.json();
        finalResult = convData.result;
      }
      
      setResult(finalResult);
      
      if (selectedOp === 'ADD' || selectedOp === 'SUBTRACT') {
        setDisplayedUnit(targetOutput);
      } else {
        setDisplayedUnit(''); 
      }
      
    } catch (e) { 
      console.error("Arithmetic error:", e); 
    }
  };

  const handleOutputUnitChange = (newUnit) => {
    setOutUnit(newUnit);
    if (result !== 0) {
      calculate(op, newUnit);
    } else {
      setDisplayedUnit(newUnit);
    }
  };

  const getOpSymbol = (operation) => {
    if (operation === 'ADD') return '+';
    if (operation === 'SUBTRACT') return '-';
    if (operation === 'MULTIPLY') return '*';
    return '/';
  };

  return (
    <div className="card arithmetic">
      <h3>Arithmetic</h3>
      
      <div className="row">
        <input type="number" value={v1} onChange={(e) => setV1(e.target.value)} />
        <select value={u1} onChange={(e) => setU1(e.target.value)}>
          {units.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>

      <div className="op-selector">
        {!showOps ? (
          <button onClick={() => setShowOps(true)} className="op-btn">
            {getOpSymbol(op)}
          </button>
        ) : (
          <div className="symbols">
            {['ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE'].map(s => (
              <button key={s} onClick={() => calculate(s, outUnit)}>
                {getOpSymbol(s)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <input type="number" value={v2} onChange={(e) => setV2(e.target.value)} />
        <select value={u2} onChange={(e) => setU2(e.target.value)}>
          {units.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>

      <div className="total-box" onClick={() => calculate(op, outUnit)} style={{cursor: 'pointer'}}>
        <span>TOTAL (Click to Calculate)</span>
        <h2>{result} {displayedUnit}</h2>
      </div>

      <div className="output-unit-selector">
        <label style={{display: 'block', textAlign: 'center', marginBottom: '8px'}}>OUTPUT UNIT</label>
        <div className="unit-buttons">
          {units.map(u => (
            <button 
              key={u} 
              className={outUnit === u ? 'active' : ''} 
              onClick={() => handleOutputUnitChange(u)}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArithmeticCard;