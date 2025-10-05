import React, { useState, useEffect } from 'react';
import { Play, Zap, Brain, Clock, Cpu, CheckCircle, AlertCircle } from 'lucide-react';

const OGIPracticalDemo = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [processTime, setProcessTime] = useState({ traditional: 0, ogi: 0 });

  // Define available modules
  const modules = [
    { id: 1, name: 'Vision', icon: '👁️', color: 'bg-blue-500' },
    { id: 2, name: 'Language', icon: '💬', color: 'bg-green-500' },
    { id: 3, name: 'Code', icon: '💻', color: 'bg-purple-500' },
    { id: 4, name: 'Math', icon: '🔢', color: 'bg-red-500' },
    { id: 5, name: 'Data', icon: '📊', color: 'bg-yellow-500' },
    { id: 6, name: 'Email', icon: '📧', color: 'bg-pink-500' },
    { id: 7, name: 'Calendar', icon: '📅', color: 'bg-indigo-500' },
    { id: 8, name: 'Search', icon: '🔍', color: 'bg-cyan-500' },
    { id: 9, name: 'Audio', icon: '🎵', color: 'bg-orange-500' },
    { id: 10, name: 'Memory', icon: '🧠', color: 'bg-teal-500' }
  ];

  // Sample tasks
  const tasks = [
    {
      id: 1,
      title: 'Analyze Sales Data',
      description: 'Parse CSV, create chart, email to team',
      activeModules: [2, 5, 6],
      input: 'sales_q4.csv',
      output: 'Generated chart and sent email to 5 team members'
    },
    {
      id: 2,
      title: 'Code Review Assistant',
      description: 'Review code, suggest improvements, update documentation',
      activeModules: [2, 3, 10],
      input: 'pull_request_#234.py',
      output: 'Found 3 issues, suggested fixes, updated README.md'
    },
    {
      id: 3,
      title: 'Meeting Preparation',
      description: 'Check calendar, search past notes, draft agenda',
      activeModules: [2, 7, 8, 10],
      input: 'Tomorrow\'s product review meeting',
      output: 'Agenda created with 4 topics from previous 3 meetings'
    },
    {
      id: 4,
      title: 'Image Analysis Report',
      description: 'Analyze images, extract data, create summary',
      activeModules: [1, 2, 4, 5],
      input: 'lab_results/*.jpg (15 images)',
      output: 'Extracted measurements, statistical analysis, PDF report'
    },
    {
      id: 5,
      title: 'Multi-Modal Learning',
      description: 'Process video lecture, transcribe, summarize, quiz',
      activeModules: [1, 2, 9, 10],
      input: 'lecture_video.mp4 (45 minutes)',
      output: 'Transcript, 5-point summary, 10 quiz questions'
    }
  ];

  const calculateMetrics = (task) => {
    const n = modules.length;
    const k = task.activeModules.length;
    
    // Traditional O(n²) - all modules communicate
    const traditionalConnections = n * (n - 1);
    const traditionalOps = traditionalConnections * 100; // message size factor
    
    // OGI O(k²+n) - only k modules communicate + attention computation
    const ogiActiveConnections = k * (k - 1);
    const ogiAttentionOps = n * 50; // attention computation
    const ogiOps = (ogiActiveConnections * 100) + ogiAttentionOps;
    
    const reduction = ((traditionalOps - ogiOps) / traditionalOps * 100).toFixed(1);
    
    return {
      traditional: {
        connections: traditionalConnections,
        operations: traditionalOps,
        complexity: `O(n²) = O(${n}²) = ${traditionalConnections}`
      },
      ogi: {
        connections: ogiActiveConnections,
        operations: ogiOps,
        complexity: `O(k²+n) = O(${k}²+${n}) = ${ogiActiveConnections + n}`,
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

    const metrics = calculateMetrics(task);
    
    // Simulate processing with realistic timing
    const traditionalTime = metrics.traditional.operations / 100;
    const ogiTime = metrics.ogi.operations / 100;

    // Animate traditional approach
    await new Promise(resolve => setTimeout(resolve, 500));
    setProcessTime(prev => ({ ...prev, traditional: traditionalTime }));
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Animate OGI approach
    setProcessTime(prev => ({ ...prev, ogi: ogiTime }));
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setShowComparison(true);
    setIsProcessing(false);
  };

  const ModuleNode = ({ module, isActive, delay }) => {
    const [show, setShow] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);

    return (
      <div 
        className={`
          relative p-4 rounded-lg border-2 transition-all duration-500
          ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          ${isActive 
            ? `${module.color} border-white text-white shadow-lg` 
            : 'bg-gray-100 border-gray-300 text-gray-400'}
        `}
      >
        <div className="text-3xl mb-1">{module.icon}</div>
        <div className="text-xs font-semibold">{module.name}</div>
        {isActive && (
          <div className="absolute -top-1 -right-1">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    );
  };

  const metrics = selectedTask ? calculateMetrics(selectedTask) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl font-bold">OGI Framework</h1>
          </div>
          <p className="text-xl text-purple-200">
            Practical Multi-Modal AI Assistant Demo
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Demonstrating O(k²+n) efficiency vs traditional O(n²) approaches
          </p>
        </header>

        {/* Task Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {tasks.map(task => (
            <button
              key={task.id}
              onClick={() => runTask(task)}
              disabled={isProcessing}
              className={`
                p-6 rounded-xl text-left transition-all
                ${selectedTask?.id === task.id 
                  ? 'bg-purple-600 shadow-xl scale-105' 
                  : 'bg-slate-800 hover:bg-slate-700'}
                ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                border border-purple-500/30
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg">{task.title}</h3>
                <Play className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-sm text-gray-300 mb-3">{task.description}</p>
              <div className="flex items-center gap-2 text-xs text-purple-300">
                <Zap className="w-4 h-4" />
                <span>{task.activeModules.length} of {modules.length} modules active</span>
              </div>
            </button>
          ))}
        </div>

        {/* Visualization */}
        {selectedTask && (
          <div className="bg-slate-800 rounded-2xl p-8 mb-8 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              Module Activation: {selectedTask.title}
            </h2>

            {/* Module Grid */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {modules.map((module, idx) => (
                <ModuleNode
                  key={module.id}
                  module={module}
                  isActive={selectedTask.activeModules.includes(module.id)}
                  delay={idx * 50}
                />
              ))}
            </div>

            {/* Task Details */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Input</div>
                <div className="font-mono text-sm">{selectedTask.input}</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Output</div>
                <div className="font-mono text-sm">{selectedTask.output}</div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison */}
        {metrics && showComparison && (
          <div className="bg-slate-800 rounded-2xl p-8 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-6">Performance Comparison</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Traditional */}
              <div className="bg-red-900/20 border-2 border-red-500 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold">Traditional (Full Mesh)</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-400">Complexity</div>
                    <div className="text-lg font-mono text-red-400">{metrics.traditional.complexity}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Connections</div>
                    <div className="text-2xl font-bold">{metrics.traditional.connections}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Operations</div>
                    <div className="text-2xl font-bold">{metrics.traditional.operations.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Processing Time</div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <div className="text-xl font-bold">{processTime.traditional.toFixed(1)}ms</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* OGI */}
              <div className="bg-green-900/20 border-2 border-green-500 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold">OGI (Top-K Gating)</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-400">Complexity</div>
                    <div className="text-lg font-mono text-green-400">{metrics.ogi.complexity}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Active Connections</div>
                    <div className="text-2xl font-bold">{metrics.ogi.connections}</div>
                    <div className="text-xs text-gray-400">({metrics.ogi.activeModules} modules)</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Operations</div>
                    <div className="text-2xl font-bold">{metrics.ogi.operations.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Processing Time</div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <div className="text-xl font-bold">{processTime.ogi.toFixed(1)}ms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-purple-500/20 rounded-lg p-6 text-center border border-purple-500/50">
                <Cpu className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-3xl font-bold text-purple-400">{metrics.reduction}%</div>
                <div className="text-sm text-gray-300">Computational Reduction</div>
              </div>
              <div className="bg-blue-500/20 rounded-lg p-6 text-center border border-blue-500/50">
                <Zap className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-3xl font-bold text-blue-400">{metrics.speedup}x</div>
                <div className="text-sm text-gray-300">Speedup Factor</div>
              </div>
              <div className="bg-green-500/20 rounded-lg p-6 text-center border border-green-500/50">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-3xl font-bold text-green-400">
                  {metrics.ogi.activeModules}/{modules.length}
                </div>
                <div className="text-sm text-gray-300">Modules Active</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-400 text-sm">
          <p>OGI Framework: Proving AGI is computationally feasible through selective attention</p>
          <p className="mt-2">
            <a href="https://github.com/singleton2787/ogi-interactive-demo" className="text-purple-400 hover:underline">
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default OGIPracticalDemo;
