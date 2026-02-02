
import React, { useState, useRef, useCallback } from 'react';
import { ConfettiEffect } from './ConfettiEffect';

export const ValentineApp: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonInitial, setNoButtonInitial] = useState(true);
  const [counter, setCounter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  // Hinglish messages for the 'No' button
  const noButtonTexts = [
    "No",
    "Pakka? 🤨",
    "Sach mein? 🥺",
    "Ek baar fir soch lo! 🧐",
    "Maan jao na? 🙏",
    "Aisa mat karo! 💔",
    "Kitne bure ho tum! 😭",
    "Ruko, thoda aur socho! ✨",
    "Aakhri mauka hai! 🛑",
    "Bus YES pe click karo! 😊"
  ];

  const handleNoInteraction = useCallback(() => {
    if (!containerRef.current || !noBtnRef.current) return;

    const btnRect = noBtnRef.current.getBoundingClientRect();

    const padding = 50;
    const maxX = window.innerWidth - btnRect.width - padding;
    const maxY = window.innerHeight - btnRect.height - padding;

    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);

    setNoButtonPos({ x: newX, y: newY });
    setNoButtonInitial(false);
    
    setCounter(prev => (prev + 1) % noButtonTexts.length);
  }, [noButtonTexts.length]);

  const handleYes = () => {
    setIsAccepted(true);
  };

  if (isAccepted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 z-10 animate-in fade-in zoom-in duration-700">
        <ConfettiEffect />
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-pink-200 max-w-md flex flex-col items-center">
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpwaWF6ZThhZHBmZGFwaHF6dnJmNmZzZTM1dm04ZWlqNXZoZW9uZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KztT2c4u8mYYUiMKdJ/giphy.gif" 
            alt="Happy Dance" 
            className="w-48 h-48 object-cover rounded-full mb-6 shadow-xl border-4 border-pink-400"
          />
          <h1 className="text-5xl font-romantic text-pink-600 mb-4">Yay! ❤️</h1>
          <p className="text-xl text-gray-700 mb-2 font-semibold">Mujhe pata tha tum YES hi bologe! 😍</p>
          <p className="text-lg text-pink-400 italic">I love you so much! 💖✨</p>
          <div className="mt-6 flex justify-center gap-2">
            <span className="text-3xl animate-bounce delay-75">🌸</span>
            <span className="text-3xl animate-bounce delay-150">🧸</span>
            <span className="text-3xl animate-bounce delay-300">🍫</span>
          </div>
        </div>
      </div>
    );
  }

  const yesScale = 1 + (counter * 0.05);

  return (
    <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center">
      <div className="z-10 flex flex-col items-center transition-all duration-500">
        <h1 className="text-4xl md:text-6xl font-romantic text-pink-600 mb-16 text-center px-4 drop-shadow-md">
          My sweetheart,
           <br/>will you be my Valentine?❤️
        </h1>

        <div className="flex items-center justify-center gap-10 w-full max-w-xs relative h-24">
          <button
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            className="px-12 py-5 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-2xl font-bold shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 z-20 whitespace-nowrap"
          >
            Yes! 💖
          </button>

          <button
            ref={noBtnRef}
            onMouseEnter={handleNoInteraction}
            onClick={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            className={`px-8 py-5 bg-gray-400 text-white rounded-full text-xl font-bold shadow-2xl transition-all duration-300 whitespace-nowrap ${
              noButtonInitial ? 'relative z-10' : 'fixed z-50'
            }`}
            style={!noButtonInitial ? { 
              left: `${noButtonPos.x}px`, 
              top: `${noButtonPos.y}px`,
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
            } : {}}
          >
            {noButtonTexts[counter]}
          </button>
        </div>
      </div>

      <div className="absolute top-10 left-10 text-5xl opacity-50 animate-bounce">🎈</div>
      <div className="absolute bottom-10 right-10 text-5xl opacity-50 animate-bounce delay-500">💌</div>
      <div className="absolute top-1/4 right-1/4 text-4xl opacity-30 animate-pulse">✨</div>
      <div className="absolute bottom-1/4 left-1/4 text-4xl opacity-30 animate-pulse delay-700">💖</div>
    </div>
  );
};
