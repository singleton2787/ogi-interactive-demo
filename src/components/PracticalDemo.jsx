import React, { useState } from 'react';
import { Play, Zap, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const PracticalDemo = () => {
  const [selectedModules, setSelectedModules] = useState([]);
  const [hasRun, setHasRun] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const modules = [
    { id: 1, name: 'Vision', icon: '👁️', example: 'Reads images', color: 'bg-blue-500' },
    { id: 2, name: 'Language', icon: '💬', example: 'Writes text', color: 'bg-green-500' },
    { id: 3, name: 'Code', icon: '💻', example: 'Programs', color: 'bg-purple-500' },
    { id: 4, name: 'Math', icon: '🔢', example: 'Calculates', color: 'bg-red-500' },
    { id: 5, name: 'Data', icon: '📊', example: 'Analyzes data', color: 'bg-yellow-500' },
    { id: 6, name: 'Email', icon: '📧', example: 'Sends messages', color: 'bg-pink-500' },
    { id: 7, name: 'Calendar', icon: '📅', example: 'Schedules', color: 'bg-indigo-500' },
    { id: 8, name: 'Search', icon: '🔍', example: 'Finds info', color: 'bg-cyan-500' },
    { id: 9, name: 'Audio', icon: '🎵', example: 'Processes sound', color: 'bg-orange-500' },
    { id: 10, name: 'Memory', icon: '🧠', example: 'Remembers', color: 'bg-teal-500' }
  ];

  const toggleModule = (id) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
    setHasRun(false);
  };

  const runComparison = async () => {
    setHasRun(false);
    setShowAnimation(true);
    await new Promise(r => setTimeout(r, 1500));
    setShowAnimation(false);
    setHasRun(true);
  };

  const totalModules = 10;
  const activeCount = selectedModules.length;

  // Traditional: Every module talks to every other module
  const traditionalConnections = totalModules * (totalModules - 1);
  const traditionalCost = traditionalConnections * 100;

  // OGI: Only active modules talk to each other
  const ogiConnections = activeCount > 0 ? activeCount * (activeCount - 1) : 0;
  const ogiCommunicationCost = ogiConnections * 100;
  const ogiAttentionCost = totalModules * 50; // Cost to figure out which modules to use
  const ogiTotalCost = ogiCommunicationCost + ogiAttentionCost;

  const savings = activeCount > 0 ? ((traditionalCost - ogiTotalCost) / traditionalCost * 100).toFixed(1) : 0;
  const speedup = activeCount > 0 ? (traditionalCost / ogiTotalCost).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 pt-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            The AGI Scaling Problem
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Why can't we run smart AI on normal computers?
          </p>
          <p className="text-gray-400">
            Let's build a simple AI system and see what happens...
          </p>
        </div>

        {/* Step 1: Select Modules */}
        <div className="bg-slate-800/50 rounded-3xl p-8 mb-8 border border-purple-500/30">
          <h2 className="text-3xl font-bold mb-4">Step 1: Pick Your AI "Brains"</h2>
          <p className="text-gray-300 mb-6">
            Real AI needs specialized modules (like having different experts on a team). 
            Select which ones you need for your task:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => toggleModule(module.id)}
                className={`
                  p-4 rounded-xl border-2 transition-all transform hover:scale-105
                  ${selectedModules.includes(module.id)
                    ? `${module.color} border-white text-white shadow-xl scale-105`
                    : 'bg-slate-700/30 border-slate-600 text-gray-400 hover:border-slate-500'}
                `}
              >
                <div className="text-4xl mb-2">{module.icon}</div>
                <div className="text-sm font-bold">{module.name}</div>
                <div className="text-xs opacity-75">{module.example}</div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <div className="text-lg text-purple-300">
              You selected <span className="text-3xl font-bold text-white">{activeCount}</span> modules
            </div>
          </div>
        </div>

        {/* Step 2: Run Button */}
        {activeCount > 0 && (
          <div className="text-center mb-8">
            <button
              onClick={runComparison}
              disabled={showAnimation}
              className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl font-bold text-2xl shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
            >
              <Play className="w-8 h-8" />
              Run The Experiment
            </button>
          </div>
        )}

        {/* Animation */}
        {showAnimation && (
          <div className="bg-slate-800/50 rounded-3xl p-8 mb-8 border border-yellow-500/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 animate-pulse mb-4">
                Computing costs...
              </div>
              <div className="flex justify-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {hasRun && activeCount > 0 && (
          <>
            <div className="bg-slate-800/50 rounded-3xl p-8 mb-8 border border-purple-500/30">
              <h2 className="text-3xl font-bold mb-8 text-center">The Problem: Old Method</h2>
              
              <div className="bg-red-900/40 border-2 border-red-500 rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-10 h-10 text-red-400" />
                  <h3 className="text-2xl font-bold">Traditional AI Architecture</h3>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 text-lg mb-4">
                    Every module must constantly communicate with every other module, even if they're not needed.
                  </p>
                  
                  {/* Visual: All modules connected */}
                  <div className="bg-red-950/50 rounded-xl p-6 mb-4">
                    <div className="text-center mb-4 text-red-300 font-semibold">
                      All {totalModules} modules are ALWAYS talking to each other
                    </div>
                    <div className="grid grid-cols-10 gap-2 mb-4">
                      {modules.map(m => (
                        <div key={m.id} className="text-2xl opacity-50">{m.icon}</div>
                      ))}
                    </div>
                    <div className="text-center text-red-400 text-sm">
                      ↕️ {traditionalConnections} active connections at all times ↕️
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-950/50 rounded-xl p-6">
                    <div className="text-sm text-red-300 mb-2">Phone Calls Happening</div>
                    <div className="text-5xl font-bold text-red-400 mb-2">
                      {traditionalConnections}
                    </div>
                    <div className="text-sm text-red-300">
                      Even though you only picked {activeCount}
                    </div>
                  </div>

                  <div className="bg-red-950/50 rounded-xl p-6">
                    <div className="text-sm text-red-300 mb-2">Computing Power Needed</div>
                    <div className="text-5xl font-bold text-red-400 mb-2">
                      {traditionalCost.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-300">units of energy</div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-red-950/50 rounded-xl border-l-4 border-red-500">
                  <div className="text-xl font-bold text-red-300 mb-2">The Result:</div>
                  <div className="text-lg text-white">
                    Requires massive data center. Too expensive for everyday use.
                    This is why AI can't run on your phone or laptop.
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center my-8">
                <ArrowRight className="w-12 h-12 text-purple-400" />
              </div>

              <div className="bg-green-900/40 border-2 border-green-500 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                  <h3 className="text-2xl font-bold">OGI Framework (The Fix)</h3>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 text-lg mb-4">
                    Only activate the modules you actually need. The others stay quiet.
                  </p>
                  
                  {/* Visual: Only selected modules */}
                  <div className="bg-green-950/50 rounded-xl p-6 mb-4">
                    <div className="text-center mb-4 text-green-300 font-semibold">
                      Only your {activeCount} selected modules communicate
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                      {modules.map(m => (
                        <div 
                          key={m.id} 
                          className={`text-3xl ${selectedModules.includes(m.id) ? '' : 'opacity-20 grayscale'}`}
                        >
                          {m.icon}
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-green-400 text-sm">
                      ↕️ Only {ogiConnections} active connections ↕️
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-950/50 rounded-xl p-6">
                    <div className="text-sm text-green-300 mb-2">Smart Routing Cost</div>
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      {ogiAttentionCost}
                    </div>
                    <div className="text-xs text-green-300">
                      Figure out which {activeCount} to use
                    </div>
                  </div>

                  <div className="bg-green-950/50 rounded-xl p-6">
                    <div className="text-sm text-green-300 mb-2">Communication Cost</div>
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      {ogiCommunicationCost}
                    </div>
                    <div className="text-xs text-green-300">
                      Only {activeCount} modules talking
                    </div>
                  </div>

                  <div className="bg-green-950/50 rounded-xl p-6">
                    <div className="text-sm text-green-300 mb-2">Total Power Needed</div>
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      {ogiTotalCost.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-300">units of energy</div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-green-950/50 rounded-xl border-l-4 border-green-500">
                  <div className="text-xl font-bold text-green-300 mb-2">The Result:</div>
                  <div className="text-lg text-white">
                    Runs on normal hardware. This is how AGI becomes practical.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-6">What This Means</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
                  <Zap className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
                  <div className="text-5xl font-bold mb-2">{savings}%</div>
                  <div className="text-lg">Less Energy Used</div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
                  <div className="text-5xl font-bold mb-2">{speedup}x</div>
                  <div className="text-lg">Faster Processing</div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
                  <div className="text-5xl font-bold mb-2">💡</div>
                  <div className="text-lg">Runs on Your Device</div>
                </div>
              </div>

              <div className="text-xl text-white/90">
                Instead of needing Amazon's data center, AGI could run on your laptop.
              </div>
            </div>
          </>
        )}

        {/* Prompt to select */}
        {activeCount === 0 && (
          <div className="text-center text-gray-400 text-lg">
            Select some modules above to see the magic happen
          </div>
        )}

        <footer className="text-center mt-12 text-gray-400 text-sm">
          <p>This is the mathematical breakthrough in the OGI Framework</p>
          <a href="https://github.com/singleton2787/ogi-interactive-demo" className="text-purple-400 hover:underline">
            View Technical Paper
          </a>
        </footer>
      </div>
    </div>
  );
};

export default PracticalDemo;
