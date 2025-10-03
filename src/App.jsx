import React, { useState } from 'react';
import TechnicalView from './components/TechnicalView';
import LaymanView from './components/LaymanView';
import './App.css'; // Use App.css for basic styling

function App() {
  const [activeTab, setActiveTab] = useState('technical');

  const TabButton = ({ id, label }) => (
    <button 
      onClick={() => setActiveTab(id)}
      style={{ 
        padding: '10px 20px', 
        marginRight: '10px', 
        cursor: 'pointer',
        fontWeight: activeTab === id ? 'bold' : 'normal',
        border: activeTab === id ? '2px solid #007bff' : '1px solid #ccc',
        backgroundColor: activeTab === id ? '#e9f7ff' : '#fff'
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>OGI Mathematical Proofs: Interactive Demo</h1>
      <div style={{ marginBottom: '20px' }}>
        <TabButton id="technical" label="Technical Rigor (The Math)" />
        <TabButton id="layman" label="Layman's Explanation (The Story)" />
      </div>
      <hr />
      <div>
        {activeTab === 'technical' && <TechnicalView />}
        {activeTab === 'layman' && <LaymanView />}
      </div>
    </div>
  );
}

export default App;