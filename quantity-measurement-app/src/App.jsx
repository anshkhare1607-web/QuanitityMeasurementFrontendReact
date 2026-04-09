import React, { useContext } from 'react';
import { MeasurementProvider, MeasurementContext } from './context/MeasurementContext';
import SideBar from './components/SideBar';
import ConversionCard from './components/ConversionCard';
import ComparisonCard from './components/ComparisonCard';
import ArithmeticCard from './components/ArithmeticCard';
import HistoryView from './components/HistoryView';

import './App.scss';

// Create a sub-component to consume the context
const AppContent = () => {
  const { view, unitType } = useContext(MeasurementContext);

  return (
    <div className="app-container">
      <SideBar />
      
      <main className="content">
        <header className="main-header">
          <h1>{view === 'TOOLS' ? 'Select Your Tool' : 'Calculation History'}</h1>
          <p>{view === 'TOOLS' ? 'Architectural precision for every calculation.' : 'Review your past measurements.'}</p>
        </header>

        {view === 'TOOLS' ? (
          <div className="tool-grid">
            <ConversionCard />
            <ComparisonCard />
            <ArithmeticCard />
          </div>
        ) : (
          <HistoryView />
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <MeasurementProvider>
      <AppContent />
    </MeasurementProvider>
  );
}

export default App;