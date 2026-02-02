
import React from 'react';
import { ValentineApp } from './components/ValentineApp';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-pink-50 flex items-center justify-center overflow-hidden">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse text-pink-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          >
            ❤
          </div>
        ))}
      </div>
      
      <ValentineApp />
    </div>
  );
};

export default App;
