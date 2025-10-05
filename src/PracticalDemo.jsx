import React, { useState, useEffect } from 'react';
import { Play, Zap } from 'lucide-react';

const PracticalDemo = () => {
  const [selectedModules, setSelectedModules] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle');

  const modules = [
    { id: 1, name: 'Vision', icon: '👁️', color: 'bg-blue-500', x: 150, y: 50 },
    { id: 2, name: 'Language', icon: '💬', color: 'bg-green-500', x: 300, y: 80 },
    { id: 3, name: 'Code', icon: '💻', color: 'bg-purple-500', x: 420, y: 120 },
    { id: 4, name: 'Math', icon: '🔢', color: 'bg-red-500', x: 480, y: 250 },
    { id: 5, name: 'Data', icon: '📊', color: 'bg-yellow-500', x: 450, y: 380 },
    { id: 6, name: 'Email', icon: '📧', color: 'bg-pink-500', x: 320, y: 450 },
    { id: 7, name: 'Calendar', icon: '📅', color: 'bg-indigo-500', x: 180, y: 420 },
    { id: 8, name: 'Search', icon: '🔍', color: 'bg-cyan-500', x: 80, y: 350 },
    { id: 9, name: 'Audio', icon: '🎵', color: 'bg-orange-500', x: 50, y: 220 },
    { id: 10, name: 'Memory', icon: '🧠', color: 'bg-teal-500', x: 90, y: 120 }
  ];

  const toggleModule = (id) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
    setShowAnimation(false);
    setAnimationPhase('idle');
  };

  const runAnimation = async () => {
    setShowAnimation(true);
    setAnimationPhase('traditional');
    await new Promise(r => setTimeout(r, 3000));
    setAnimationPhase('ogi');
    await new Promise(r => setTimeout(r, 3000));
    setAnimationPhase('comparison');
  };

  const totalModules = 10;
  const activeCount = selectedModules.length;

  const traditionalConnections = totalModules * (totalModules - 1);
  const traditionalCost = traditionalConnections * 100;

  const ogiConnections = activeCount > 0 ? activeCount * (activeCount - 1) : 0;
  const ogiTotalCost = (ogiConnections * 100) + (totalModules * 50);

  const savings = activeCount > 0 ? ((traditionalCost - ogiTotalCost) / traditionalCost * 100).toFixed(1) : 0;

  // Generate all possible connections for traditional
  const allConnections = [];
  for (let i = 0; i < modules.length; i++) {
    for (let j = i + 1; j < modules.length; j++) {
      allConnections.push({ from: modules[i], to: modules[j] });
    }
  }

  // Generate connections only between selected modules for OGI
  const selectedModuleObjects = modules.filter(m => selectedModules.includes(m.id));
  const ogiConnectionsArray = [];
  for (let i = 0; i < selectedModuleObjects.length; i++) {
    for (let j = i + 1; j < selectedModuleObjects.length; j++) {
      ogiConnectionsArray.push({ from: selectedModuleObjects[i], to: selectedModuleObjects[j] });
    }
  }

  const ConnectionLines = ({ connections, isActive, color, animated }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {connections.map((conn, idx) => (
        <line
          key={idx}
          x1={conn.from.x}
          y1={conn.from.y}
          x2={conn.to.x}
          y2={conn.to.y}
          stroke={color}
          strokeWidth="2"
          opacity={isActive ? "0.6" : "0"}
          className={animated ? "transition-all duration-500" : ""}
          style={{
            animation: animated && isActive ? `pulse 1.5s ease-in-out infinite ${idx * 0.05}s` : 'none'
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12 pt-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            The AGI Scaling Problem
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            Why can't we run smart AI on normal computers?
          </p>
          <p className="text-xl text-gray-400">
            Watch the difference between traditional AI and the OGI Framework
          </p>
        </div>

        {/* Module Selection */}
        <div className="bg-slate-800/50 rounded-3xl p-8 mb-8 border border-purple-500/30">
          <h2 className="text-3xl font-bold mb-4 text-center">Step 1: Pick Which "Brains" You Need</h2>
          <p className="text-gray-300 mb-6 text-center text-lg">
            For your task, select which expert modules are actually needed
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => toggleModule(module.id)}
                className={`
                  p-6 rounded-xl border-2 transition-all transform hover:scale-105
                  ${selectedModules.includes(module.id)
                    ? `${module.color} border-white text-white shadow-2xl scale-105 ring-4 ring-white/30`
                    : 'bg-slate-700/30 border-slate-600 text-gray-400 hover:border-slate-500'}
                `}
              >
                <div className="text-5xl mb-2">{module.icon}</div>
                <div className="text-sm font-bold">{module.name}</div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="text-2xl text-purple-300">
              Selected: <span className="text-4xl font-bold text-white">{activeCount}</span> modules
            </div>
          </div>
        </div>

        {/* Run Button */}
        {activeCount > 0 && !showAnimation && (
          <div className="text-center mb-8">
            <button
              onClick={runAnimation}
              className="px-16 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl font-bold text-3xl shadow-2xl transform hover:scale-105 transition-all flex items-center gap-4 mx-auto"
            >
              <Play className="w-10 h-10" />
              Watch the Magic
            </button>
          </div>
        )}

        {/* Animation Area */}
        {showAnimation && (
          <div className="space-y-8">
            
            {/* Traditional AI Visualization */}
            {(animationPhase === 'traditional' || animationPhase === 'comparison') && (
              <div className="bg-red-900/30 rounded-3xl p-8 border-2 border-red-500">
                <div className="text-center mb-6">
                  <h3 className="text-4xl font-bold text-red-300 mb-3">
                    ⚠️ Traditional AI (Today's Approach)
                  </h3>
                  <p className="text-2xl text-red-200">
                    Every module talks to every other module - even the ones you don't need!
                  </p>
                </div>

                <div className="relative bg-red-950/30 rounded-2xl p-8" style={{ height: '550px' }}>
                  <ConnectionLines 
                    connections={allConnections}
                    isActive={animationPhase === 'traditional'}
                    color="#ef4444"
                    animated={true}
                  />
                  
                  {modules.map(module => (
                    <div
                      key={module.id}
                      className="absolute"
                      style={{ 
                        left: `${module.x}px`, 
                        top: `${module.y}px`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10
                      }}
                    >
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center text-3xl
                        bg-red-500 border-4 border-red-300 shadow-lg
                        ${animationPhase === 'traditional' ? 'animate-pulse' : ''}
                      `}>
                        {module.icon}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div className="bg-red-950/50 rounded-xl p-6 text-center">
                    <div className="text-red-300 mb-2 text-lg">Active Connections</div>
                    <div className="text-7xl font-bold text-red-400">{traditionalConnections}</div>
                    <div className="text-red-300 mt-2">All talking at once = Chaos!</div>
                  </div>
                  <div className="bg-red-950/50 rounded-xl p-6 text-center">
                    <div className="text-red-300 mb-2 text-lg">Computing Cost</div>
                    <div className="text-7xl font-bold text-red-400">{traditionalCost.toLocaleString()}</div>
                    <div className="text-red-300 mt-2">Needs a data center</div>
                  </div>
                </div>
              </div>
            )}

            {animationPhase === 'traditional' && (
              <div className="text-center">
                <div className="inline-block bg-yellow-500/20 border-2 border-yellow-500 rounded-xl px-8 py-4">
                  <div className="text-2xl text-yellow-300 font-bold animate-pulse">
                    ⏳ Now watch what OGI does differently...
                  </div>
                </div>
              </div>
            )}

            {/* OGI Visualization */}
            {(animationPhase === 'ogi' || animationPhase === 'comparison') && (
              <div className="bg-green-900/30 rounded-3xl p-8 border-2 border-green-500">
                <div className="text-center mb-6">
                  <h3 className="text-4xl font-bold text-green-300 mb-3">
                    ✨ OGI Framework (The Fix)
                  </h3>
                  <p className="text-2xl text-green-200">
                    Only the {activeCount} modules you selected communicate. The rest stay quiet!
                  </p>
                </div>

                <div className="relative bg-green-950/30 rounded-2xl p-8" style={{ height: '550px' }}>
                  <ConnectionLines 
                    connections={ogiConnectionsArray}
                    isActive={animationPhase === 'ogi' || animationPhase === 'comparison'}
                    color="#22c55e"
                    animated={true}
                  />
                  
                  {modules.map(module => {
                    const isActive = selectedModules.includes(module.id);
                    return (
                      <div
                        key={module.id}
                        className="absolute"
                        style={{ 
                          left: `${module.x}px`, 
                          top: `${module.y}px`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: 10
                        }}
                      >
                        <div className={`
                          w-16 h-16 rounded-full flex items-center justify-center text-3xl
                          border-4 shadow-lg transition-all duration-500
                          ${isActive 
                            ? `bg-green-500 border-green-300 scale-110 ${animationPhase === 'ogi' ? 'animate-pulse' : ''}`
                            : 'bg-gray-700 border-gray-600 opacity-30 scale-75'}
                        `}>
                          {module.icon}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div className="bg-green-950/50 rounded-xl p-6 text-center">
                    <div className="text-green-300 mb-2 text-lg">Active Connections</div>
                    <div className="text-7xl font-bold text-green-400">{ogiConnections}</div>
                    <div className="text-green-300 mt-2">Clean and efficient!</div>
                  </div>
                  <div className="bg-green-950/50 rounded-xl p-6 text-center">
                    <div className="text-green-300 mb-2 text-lg">Computing Cost</div>
                    <div className="text-7xl font-bold text-green-400">{ogiTotalCost.toLocaleString()}</div>
                    <div className="text-green-300 mt-2">Runs on your laptop</div>
                  </div>
                </div>
              </div>
            )}

            {/* Final Comparison */}
            {animationPhase === 'comparison' && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12">
                <h2 className="text-5xl font-bold text-center mb-10">The Result</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
                    <Zap className="w-20 h-20 mx-auto mb-4 text-yellow-300" />
                    <div className="text-7xl font-bold mb-3">{savings}%</div>
                    <div className="text-2xl">Cost Savings</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
                    <div className="text-7xl font-bold mb-3">{traditionalConnections}</div>
                    <div className="text-4xl mb-2">→</div>
                    <div className="text-7xl font-bold text-green-300 mb-3">{ogiConnections}</div>
                    <div className="text-2xl">Connections</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
                    <div className="text-8xl mb-4">🎉</div>
                    <div className="text-2xl">AGI on Your Device</div>
                  </div>
                </div>

                <div className="mt-10 text-center">
                  <p className="text-3xl leading-relaxed">
                    Instead of needing Amazon's data center,<br />
                    <strong>AGI could run on your laptop.</strong>
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => {
                      setShowAnimation(false);
                      setAnimationPhase('idle');
                    }}
                    className="px-12 py-4 bg-white text-purple-600 rounded-xl font-bold text-xl hover:bg-gray-100 transition-colors"
                  >
                    Try Different Modules
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeCount === 0 && (
          <div className="text-center text-gray-400 text-2xl py-12">
            Select some modules above to see the visualization
          </div>
        )}

        <footer className="text-center mt-16 text-gray-400">
          <p className="text-lg mb-2">This is the mathematical breakthrough in the OGI Framework</p>
          <a href="https://github.com/singleton2787/ogi-interactive-demo" className="text-purple-400 hover:underline text-lg">
            Read the Technical Paper
          </a>
        </footer>
      </div>
    </div>
  );
};

export default PracticalDemo;
