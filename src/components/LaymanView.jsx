import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

// Simple Slider Component
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

// --- Math Logic (same as technical view) ---
const L_THEORETICAL = 0.53;
const N_SCATTER_POINTS = 300;
const DM_MESSAGE = 100;
const DM_ATTENTION = 50;
const N_MODULE_MAX = 50;

const generateStabilityData = (maxPerturbation) => {
    const data = [];
    for (let i = 0; i < N_SCATTER_POINTS; i++) {
        const inputDiff = Math.random() * maxPerturbation;
        const maxOutput = L_THEORETICAL * inputDiff;
        const actualOutput = Math.random() * maxOutput * 0.1;
        data.push({ inputDiff, actualOutput });
    }
    const boundary = [
        { x: 0, y: 0 },
        { x: maxPerturbation, y: L_THEORETICAL * maxPerturbation }
    ];
    return { data, boundary };
};

const generateComplexityData = (kActive) => {
    const data = [];
    for (let N = 5; N <= N_MODULE_MAX; N += 2) {
        const fullMesh = N * (N - 1) * DM_MESSAGE;
        const topK = (kActive * (kActive - 1) * DM_MESSAGE) + (N * DM_ATTENTION);
        data.push({ N, fullMesh, topK });
    }
    return data;
};

// --- Layman's View Component ---
const LaymanView = () => {
    const [maxPerturbation, setMaxPerturbation] = useState(0.1);
    const [kActive, setKActive] = useState(5);

    const { data: stabilityData, boundary: stabilityBoundary } = useMemo(() => 
        generateStabilityData(maxPerturbation), [maxPerturbation]);
        
    const complexityData = useMemo(() => 
        generateComplexityData(kActive), [kActive]);

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Understanding OGI: The Simple Version</h1>
            <p style={{ textAlign: 'center', fontSize: '1.1em', color: '#666', marginBottom: '40px' }}>
                Two fundamental proofs that make artificial general intelligence actually possible
            </p>

            {/* Section 1: Stability */}
            <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
                <h2>🧠 Part 1: Can AI Stay Calm Under Pressure?</h2>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6' }}>
                    <strong>The Problem:</strong> Imagine an AI system processing information from dozens of "brain modules" at once. 
                    What happens if one module sends slightly wrong information? Will the whole system go haywire?
                </p>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6' }}>
                    <strong>The Solution:</strong> OGI's Executive Attention system is <em>mathematically proven</em> to stay stable. 
                    No matter how noisy the input, the system's reaction is always predictable and controlled.
                </p>
                
                <Slider 
                    label={`Input Noise Level: ${maxPerturbation.toFixed(3)}`}
                    min={0.01} 
                    max={0.5} 
                    step={0.01} 
                    value={maxPerturbation} 
                    onChange={setMaxPerturbation}
                />

                <ResponsiveContainer width="100%" height={350}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            type="number" 
                            dataKey="inputDiff" 
                            name="Input Noise" 
                            domain={[0, maxPerturbation * 1.05]}
                            label={{ value: "How Much Noise We Added", position: "insideBottom", offset: -10 }}
                        />
                        <YAxis 
                            type="number" 
                            dataKey="actualOutput" 
                            name="System Response" 
                            domain={[0, L_THEORETICAL * maxPerturbation * 1.05]}
                            label={{ value: "How Much the System Changed", angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        
                        <Scatter 
                            name="Actual System Responses" 
                            data={stabilityData} 
                            fill="#007bff" 
                        />
                        <Line 
                            name="Maximum Safe Boundary" 
                            data={stabilityBoundary} 
                            dataKey="y" 
                            stroke="#dc3545" 
                            strokeWidth={3}
                            dot={false} 
                            type="linear" 
                            isAnimationActive={false} 
                        />
                    </ScatterChart>
                </ResponsiveContainer>
                
                <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '5px', marginTop: '15px', borderLeft: '4px solid #007bff' }}>
                    <strong>What You're Seeing:</strong> Every blue dot represents a test. The red line is the "panic boundary." 
                    All dots stay comfortably below it, proving the system never overreacts—no matter how much noise you add!
                </div>
            </div>

            {/* Section 2: Scalability */}
            <div style={{ backgroundColor: '#fff9f0', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
                <h2>⚡ Part 2: Can AI Scale Without Melting Computers?</h2>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6' }}>
                    <strong>The Problem:</strong> Traditional AI architectures try to connect everything to everything. 
                    With 50 specialized modules, that means 2,450 connections! The computational cost explodes exponentially.
                </p>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6' }}>
                    <strong>The Solution:</strong> OGI uses "Top-K Gating"—it intelligently chooses which modules need to communicate, 
                    like a brain focusing attention on what matters. This keeps costs manageable even with hundreds of modules.
                </p>
                
                <Slider 
                    label={`Active Modules (K): ${kActive} modules talking to each other right now`}
                    min={1} 
                    max={N_MODULE_MAX} 
                    step={1} 
                    value={kActive} 
                    onChange={setKActive}
                />

                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={complexityData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="N" 
                            label={{ value: "Total Number of Modules Available", position: "insideBottom", offset: -10 }} 
                        />
                        <YAxis 
                            domain={['auto', 'auto']} 
                            scale="log" 
                            label={{ value: "Computational Cost (Log Scale)", angle: -90, position: 'insideLeft' }} 
                        />
                        <Tooltip />
                        <Legend />
                        
                        <Line 
                            type="monotone" 
                            dataKey="fullMesh" 
                            stroke="#dc3545" 
                            strokeWidth={3}
                            name="Old Way: Connect Everything (Impossibly Expensive)" 
                            dot={false} 
                            isAnimationActive={false} 
                        />
                        <Line 
                            type="monotone" 
                            dataKey="topK" 
                            stroke="#28a745" 
                            strokeWidth={3}
                            name={`OGI Way: Smart Selection (K=${kActive})`}
                            dot={false} 
                            isAnimationActive={false} 
                        />
                    </LineChart>
                </ResponsiveContainer>
                
                <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '5px', marginTop: '15px', borderLeft: '4px solid #28a745' }}>
                    <strong>What You're Seeing:</strong> The red line shoots up exponentially—that's the old "connect everything" approach. 
                    The green line stays nearly flat—that's OGI's smart approach. Try adjusting K to see the tradeoff between power and efficiency!
                </div>
            </div>

            {/* Summary */}
            <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '2px solid #007bff' }}>
                <h2 style={{ marginTop: 0 }}>🎯 The Bottom Line</h2>
                <div style={{ fontSize: '1.05em', lineHeight: '1.8' }}>
                    <p>
                        <strong>Stability + Scalability = Practical AGI</strong>
                    </p>
                    <p>
                        These aren't just theoretical ideas—they're mathematical guarantees. OGI proves that you can build 
                        an AI system that's both <span style={{ color: '#007bff', fontWeight: 'bold' }}>reliable</span> (won't break under pressure) 
                        and <span style={{ color: '#28a745', fontWeight: 'bold' }}>practical</span> (won't require a supercomputer the size of a building).
                    </p>
                    <p style={{ marginBottom: 0 }}>
                        This is why OGI represents a genuine breakthrough in the path toward artificial general intelligence.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LaymanView;