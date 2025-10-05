import React, { useState, useEffect } from 'react';
import { Play, Zap, Brain, Clock, Cpu, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const PracticalDemo = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle');

  const modules = [
    { id: 1, name: 'Vision', icon: '👁️', color: 'bg-blue-500', borderColor: 'border-blue-400' },
    { id: 2, name: 'Language', icon: '💬', color: 'bg-green-500', borderColor: 'border-green-400' },
    { id: 3, name: 'Code', icon: '💻', color: 'bg-purple-500', borderColor: 'border-purple-400' },
    { id: 4, name: 'Math', icon: '🔢', color: 'bg-red-500', borderColor: 'border-red-400' },
    { id: 5, name: 'Data', icon: '📊', color: 'bg-yellow-500', borderColor: 'border-yellow-400' },
    { id: 6, name: 'Email', icon: '📧', color: 'bg-pink-500', borderColor: 'border-pink-400' },
    { id: 7, name: 'Calendar', icon: '📅', color: 'bg-indigo-500', borderColor: 'border-indigo-400' },
    { id: 8, name: 'Search', icon: '🔍', color: 'bg-cyan-500', borderColor: 'border-cyan-400' },
    { id: 9, name: 'Audio', icon: '🎵', color: 'bg-orange-500', borderColor: 'border-orange-400' },
    { id: 10, name: 'Memory', icon: '🧠', color: 'bg-teal-500', borderColor: 'border-teal-400' }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Analyze Sales Data',
      description: 'Parse CSV, create chart, email to team',
      activeModules: [2, 5, 6],
      input: 'sales_q4.csv',
      output: 'Chart generated and emailed to 5 team members',
      emoji: '📊'
    },
    {
      id: 2,
      title: 'Code Review',
      description: 'Review code, suggest fixes, update docs',
      activeModules: [2, 3, 10],
      input: 'pull_request_#234.py',
      output: 'Found 3 issues, suggested fixes, updated README',
      emoji: '💻'
    },
    {
      id: 3,
      title: 'Meeting Prep',
      description: 'Check calendar, search notes, draft agenda',
      activeModules: [2, 7, 8, 10],
      input: "Tomorrow's product review",
      output: 'Agenda created with 4 topics from past meetings',
      emoji: '📅'
    },
    {
      id: 4,
      title: 'Image Analysis',
      description: 'Analyze images, extract data, create report',
      activeModules: [1, 2, 4, 5],
      input: '15 lab result images',
      output: 'Measurements extracted, stats analyzed, PDF created',
      emoji: '🔬'
    },
    {
      id: 5,
      title: 'Video Learning',
      description: 'Transcribe lecture, summarize, create quiz',
      activeModules: [1, 2, 9, 10],
      input: '45-minute lecture video',
      output: 'Transcript, 5-point summary, 10 quiz questions',
      emoji: '🎓'
    }
  ];

  const calculateMetrics = (task) => {
    const n = modules.length;
    const k = task.activeModules.length;
    
    const traditionalConnections = n * (n - 1);
    const traditionalOps = traditionalConnections * 100;
    
    const ogiActiveConnections = k * (k - 1);
    const ogiAttentionOps = n * 50;
    const ogiOps = (ogiActiveConnections * 100) + ogiAttentionOps;
    
    const reduction = ((traditionalOps - ogiOps) / traditionalOps * 100).toFixed(1);
    
    return {
      traditional: {
        connections: traditionalConnections,
        operations: traditionalOps,
      },
      ogi: {
        connections: ogiActiveConnections,
        operations: ogiOps,
        activeModules: k
      },
      reduction,
      speedup: (traditionalOps / ogiOps).toFixed(1)
    };
  };

  const runTask = async (task) => {
    setSelectedTask(task);
    setIsProcessing(true);
    setShowComparison(false);
    setAnimationPhase('selecting');

    await new Promise(resolve => setTimeout(resolve, 1000));
    setAnimationPhase('processing');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAnimationPhase('complete');
    setShowComparison(true);
    setIsProcessing(false);
  };

  const ModuleCard = ({ module, isActive, delay }) => {
    const [show, setShow] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);

    return (
      <div 
        className={`
          relative p-6 rounded-xl border-2 transition-all duration-700
          ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          ${isActive 
            ? `${module.color} ${module.borderColor} border-4 text-white shadow-2xl scale-110` 
            : 'bg-slate-700/30 border-slate-600 text-gray-500'}
        `}
      >
        <div className="text-4xl mb-2 text-center">{module.icon}</div>
        <div className="text-sm font-bold text-center">{module.name}</div>
        {isActive && (
          <>
            <div className="absolute -top-2 -right-2">
              <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
            </div>
            <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
          </>
        )}
      </div>
    );
  };

  const metrics = selectedTask ? calculateMetrics(selectedTask) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        
        <header className="text-center mb-8 pt-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-16 h-16 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              OGI Framework
            </h1>
          </div>
          <p className="text-2xl text-purple-200 mb-2">
            See AGI Efficiency in Action
          </p>
          <p className="text-gray-400">
            Watch how selective attention reduces computational cost by up to 90%
          </p>
        </header>

        {/* Task Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Choose a Task to Run</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => runTask(task)}
                disabled={isProcessing}
                className={`
                  p-6 rounded-2xl text-left transition-all transform
                  ${selectedTask?.id === task.id 
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl scale-105 ring-4 ring-purple-400' 
                    : 'bg-slate-800/50 hover:bg-slate-700/50 hover:scale-105'}
                  ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}
                  border border-purple-500/30
                `}
              >
                <div className="text-4xl mb-3 text-center">{task.emoji}</div>
                <h3 className="font-bold text-lg mb-2 text-center">{task.title}</h3>
                <p className="text-xs text-gray-300 text-center mb-3">{task.description}</p>
                <div className="flex items-center justify-center gap-2 text-xs text-purple-300">
                  <Zap className="w-4 h-4" />
                  <span className="font-semibold">{task.activeModules.length}/{modules.length} modules</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Module Visualization */}
        {selectedTask && (
          <div className="bg-slate-800/50 backdrop-blur rounded-3xl p-8 mb-8 border border-purple-500/30 shadow-2xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="text-4xl">{selectedTask.emoji}</span>
                  {selectedTask.title}
                </h2>
                {animationPhase !== 'idle' && (
                  <div className="flex items-center gap-2 text-lg">
                    {animationPhase === 'selecting' && (
                      <span className="text-yellow-400 animate-pulse">⚡ Selecting modules...</span>
                    )}
                    {animationPhase === 'processing' && (
                      <span className="text-blue-400 animate-pulse">🔄 Processing...</span>
                    )}
                    {animationPhase === 'complete' && (
                      <span className="text-green-400">✅ Complete!</span>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-purple-900/30 rounded-xl p-4 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Input</div>
                    <div className="font-mono text-white bg-slate-900/50 p-3 rounded-lg">
                      {selectedTask.input}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Output</div>
                    <div className="font-mono text-white bg-slate-900/50 p-3 rounded-lg">
                      {selectedTask.output}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Active Modules</h3>
                <div className="text-sm bg-purple-600 px-4 py-2 rounded-lg font-semibold">
                  Only {selectedTask.activeModules.length} of {modules.length} modules needed
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-4">
                {modules.map((module, idx) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    isActive={selectedTask.activeModules.includes(module.id)}
                    delay={idx * 80}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Performance Comparison */}
        {metrics && showComparison && (
          <div className="bg-slate-800/50 backdrop-blur rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center">
              The Efficiency Breakthrough
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Traditional */}
              <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 border-2 border-red-500 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-9xl opacity-10">⚠️</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-8 h-8 text-red-400" />
                    <h3 className="text-2xl font-bold">Traditional AI</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-red-950/50 rounded-lg p-4">
                      <div className="text-sm text-red-300 mb-1">All Modules Connected</div>
                      <div className="text-4xl font-bold text-red-400">{metrics.traditional.connections}</div>
                      <div className="text-xs text-red-300">connections required</div>
                    </div>
                    
                    <div className="bg-red-950/50 rounded-lg p-4">
                      <div className="text-sm text-red-300 mb-1">Total Operations</div>
                      <div className="text-4xl font-bold text-red-400">
                        {metrics.traditional.operations.toLocaleString()}
                      </div>
                      <div className="text-xs text-red-300">computational cost</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-red-950/50 rounded-lg border-l-4 border-red-500">
                    <div className="text-sm font-semibold text-red-300">
                      ❌ Exponential scaling = Requires data center
                    </div>
                  </div>
                </div>
              </div>

              {/* OGI */}
              <div className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 border-2 border-green-500 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-9xl opacity-10">✨</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <h3 className="text-2xl font-bold">OGI Framework</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-green-950/50 rounded-lg p-4">
                      <div className="text-sm text-green-300 mb-1">Active Connections Only</div>
                      <div className="text-4xl font-bold text-green-400">{metrics.ogi.connections}</div>
                      <div className="text-xs text-green-300">
                        ({metrics.ogi.activeModules} modules communicating)
                      </div>
                    </div>
                    
                    <div className="bg-green-950/50 rounded-lg p-4">
                      <div className="text-sm text-green-300 mb-1">Total Operations</div>
                      <div className="text-4xl font-bold text-green-400">
                        {metrics.ogi.operations.toLocaleString()}
                      </div>
                      <div className="text-xs text-green-300">computational cost</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-950/50 rounded-lg border-l-4 border-green-500">
                    <div className="text-sm font-semibold text-green-300">
                      ✅ Linear scaling = Runs on single workstation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform">
                <Cpu className="w-12 h-12 mx-auto mb-3 text-purple-200" />
                <div className="text-5xl font-bold mb-2">{metrics.reduction}%</div>
                <div className="text-purple-200">Cost Reduction</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform">
                <Zap className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                <div className="text-5xl font-bold mb-2">{metrics.speedup}x</div>
                <div className="text-blue-200">Faster</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-200" />
                <div className="text-5xl font-bold mb-2">{metrics.ogi.activeModules}/{modules.length}</div>
                <div className="text-green-200">Modules Active</div>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center mt-12 text-gray-400">
          <p className="mb-2">OGI Framework: Making AGI computationally feasible through selective attention</p>
          <a 
            href="https://github.com/singleton2787/ogi-interactive-demo" 
            className="text-purple-400 hover:text-purple-300 underline"
          >
            View Source on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
};

export default PracticalDemo;
