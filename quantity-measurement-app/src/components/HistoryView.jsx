import React, { useState, useEffect } from 'react';
import './HistoryView.scss';

const HistoryView = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/quantity/history');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        
        setHistory(data.reverse()); 
      } catch (err) {
        console.error("Error loading history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="history-loading">Loading History...</div>;

  return (
    <div className="history-view">
      <div className="history-list">
        {history.length === 0 ? (
          <p className="no-history">No calculation history found</p>
        ) : (
          history.map((item, index) => (
            <div className="history-card" key={index}>
              <div className="hist-header">
                <span className="hist-type">{item.measurementType || 'UNKNOWN'}</span>
                <span className="hist-op">{item.operation}</span>
              </div>
              
              <div className="hist-body">
                {item.operation === 'CONVERT' && (
                  <p>{item.value1} {item.unit1} ➔ <strong>{item.result} {item.unit2}</strong></p>
                )}
                
                {item.operation === 'COMPARE' && (
                  <p>{item.value1} {item.unit1} vs {item.value2} {item.unit2} ➔ <strong>{item.comparisonResult}</strong></p>
                )}
                
                {(item.operation === 'ADD' || item.operation === 'SUBTRACT' || item.operation === 'MULTIPLY' || item.operation === 'DIVIDE') && (
                  <p>
                    {item.value1} {item.unit1} 
                    <span className="op-symbol"> 
                      {item.operation === 'ADD' ? '+' : item.operation === 'SUBTRACT' ? '-' : item.operation === 'MULTIPLY' ? '×' : '÷'} 
                    </span> 
                    {item.value2} {item.unit2} ➔ <strong>{item.result}</strong>
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;