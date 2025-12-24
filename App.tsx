import React, { useState } from 'react';
import Envelope from './components/Envelope';
import LetterView from './components/LetterView';
import Snow from './components/Snow';
import { RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Wait for envelope animation to partly finish before showing the full letter view
    setTimeout(() => {
      setShowLetter(true);
    }, 800);
  };

  const handleReset = () => {
    setShowLetter(false);
    // Wait for fade out
    setTimeout(() => {
        setIsOpen(false);
    }, 500);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#1a2a3a] to-[#2c3e50] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Ambience */}
      <Snow />
      
      {/* Decorative Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[100px] transition-all duration-1000 ${isOpen ? 'scale-150 opacity-20' : 'scale-100 opacity-10'}`}></div>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4">
        
        {/* The Envelope - It fades out/moves away when letter is shown */}
        <Envelope isOpen={isOpen} onClick={handleOpen} />

        {/* The Letter - Appears after envelope opens */}
        <LetterView isVisible={showLetter} />
        
      </main>

      {/* Footer / Reset Control */}
      {showLetter && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
           <button 
             onClick={handleReset}
             className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/80 p-3 rounded-full transition-colors duration-300 shadow-lg border border-white/10"
             title="Close Letter"
           >
             <RotateCcw className="w-5 h-5" />
           </button>
        </div>
      )}

      {/* Audio hint (Visual only, implying music) */}
      {!isOpen && (
        <div className="absolute bottom-10 text-white/30 text-xs font-serif tracking-widest uppercase">
          With Love
        </div>
      )}

    </div>
  );
};

export default App;