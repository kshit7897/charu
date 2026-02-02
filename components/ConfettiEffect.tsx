
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

export const ConfettiEffect: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const colors = ['#ec4899', '#f472b6', '#fb7185', '#db2777', '#fdf2f8', '#ff0000'];

  useEffect(() => {
    const newParticles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
      rotation: Math.random() * 360
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
          }
          .confetti-particle {
            position: absolute;
            animation: fall linear forwards;
          }
        `}
      </style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.x}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
      
      {/* Heart spray effect from center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
         {[...Array(30)].map((_, i) => (
           <div 
            key={i} 
            className="absolute text-pink-500 text-2xl animate-ping"
            style={{
              transform: `rotate(${i * 12}deg) translateY(-200px)`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '2s'
            }}
           >
             ❤
           </div>
         ))}
      </div>
    </div>
  );
};
