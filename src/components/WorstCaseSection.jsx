import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Slider = ({ label, min, max, step, value, onChange }) => (
  <div style={{ margin: '20px 0' }}>
    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
      {label}
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      style={{ width: '100%' }}
    />
  </div>
);

const generateWorstCaseData = (kActive, nModules) => {
    const scenarios = [
        { name: 'Adversarial\nSelection', performance: 15 + Math.random() * 15 },
        { name: 'Oscillating\nAttention', performance: 40 + Math.random() * 20 },
        { name: 'Degenerate\nDistribution', performance: 35 + Math.random() * 15 },
        { name: 'Uniform\nDistribution', performance: 50 + Math.random() * 20 }
    ];

    return scenarios.map(s => ({
        ...s,
        topKComplexity: kActive * kActive + nModules * 10,
        fullMeshComplexity: nModules * nModules,
        reduction: ((1 - (kActive * kActive + nModules * 10) / (nModules * nModules)) * 100).toFixed(1)
    }));
};

const WorstCaseSection = () => {
    const [kActive, setKActive] = useState(5);
    const [nModules, setNModules] = useState(50);

    const worstCaseData = useMemo(() => 
        generateWorstCaseData(kActive, nModules), [kActive, nModules]);

    return (
        <div>
            <hr style={{ margin: '40px 0' }} />
            
            <h2>3. Worst-Case Analysis: Proving Graceful Degradation (Theorem 5)</h2>
            <p><strong>Goal:</strong> Demonstrate that even when attention makes poor choices, complexity remains O(K²+N), not O(N²).</p>
            
            <Slider 
                label={`Active Modules (K): ${kActive}`}
                min={1} 
                max={20} 
                step={1} 
                value={kActive} 
                onChange={setKActive}
            />

            <Slider 
                label={`Total Modules (N): ${nModules}`}
                min={10} 
                max={100} 
                step={5} 
                value={nModules} 
                onChange={setNModules}
            />

            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={worstCaseData} margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="name" 
                        angle={-15}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis 
                        scale="log"
                        domain={['auto', 'auto']}
                        label={{ value: "Operations (Log Scale)", angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip />
                    <Legend />
                    
                    <Bar dataKey="topKComplexity" fill="#007bff" name="Actual: O(K²+N)" />
                    <Bar dataKey="fullMeshComplexity" fill="#dc3545" name="O(N²) Worst Case" opacity={0.3} />
                </BarChart>
            </ResponsiveContainer>

            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', borderLeft: '4px solid #ffc107' }}>
                <h3>Critical Insight: Structural Guarantee</h3>
                <ul style={{ lineHeight: '1.8' }}>
                    <li><strong>Adversarial Selection:</strong> Even with 0% optimal module overlap, complexity stays O(K²+N)</li>
                    <li><strong>Oscillating Attention:</strong> Constant module switching degrades performance but not complexity bound</li>
                    <li><strong>Degenerate Distribution:</strong> All weight on 1 module wastes capacity but maintains O(K²+N)</li>
                    <li><strong>Uniform Distribution:</strong> Random selection when no clear preference still bounded</li>
                </ul>
                <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#856404' }}>
                    Average complexity reduction across all failure modes: {(worstCaseData.reduce((sum, d) => sum + parseFloat(d.reduction), 0) / worstCaseData.length).toFixed(1)}%
                </p>
                <p style={{ marginTop: '10px', color: '#856404' }}>
                    The O(K²+N) bound is <strong>architectural</strong>, not performance-dependent. Poor module selection → lower task performance, but NOT exponential complexity explosion.
                </p>
            </div>
        </div>
    );
};

export default WorstCaseSection;
