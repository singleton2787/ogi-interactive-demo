import React, { useState } from 'react';
import { BookOpen, Zap } from 'lucide-react';
import EnhancedOGIDemo from './components/EnhancedOGIDemo';
import PracticalDemo from './components/PracticalDemo';

function App() {
  const [mode, setMode] = useState('practical');

  return (
    <div className="min-h-screen">
      {/* Mode Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
        <button
          onClick={() => setMode('practical')}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            mode === 'practical'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Live Demo</span>
        </button>
        <button
          onClick={() => setMode('academic')}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            mode === 'academic'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Math Proofs</span>
        </button>
      </div>

      {mode === 'practical' ? <PracticalDemo /> : <EnhancedOGIDemo />}
    </div>
  );
}

export default App;
