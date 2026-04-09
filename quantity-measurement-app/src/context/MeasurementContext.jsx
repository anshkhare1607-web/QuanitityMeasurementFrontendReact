import React, { createContext, useState, useEffect } from 'react';

export const MeasurementContext = createContext();

export const MeasurementProvider = ({ children }) => {
  const [unitMap, setUnitMap] = useState({});
  const [unitType, setUnitType] = useState('');
  
  const [view, setView] = useState('TOOLS'); 

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/quantity/units'); 
        if (!response.ok) throw new Error('Failed to fetch units');
        const data = await response.json();
        setUnitMap(data);

        if (Object.keys(data).length > 0) {
          setUnitType(Object.keys(data)[0]);
        }
      } catch (error) {
        console.error("Error loading units:", error);
      }
    };

    fetchUnits();
  }, []);


  return (
    <MeasurementContext.Provider value={{
      unitType,
      setUnitType,
      units: unitMap[unitType] || [],
      allCategories: Object.keys(unitMap),
      view,    
      setView  
    }}>
      {children}
    </MeasurementContext.Provider>
  );
};