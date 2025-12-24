import React, { useState } from 'react';
import { Heart } from 'lucide-react';

// IMPORTANT: Save your photo as "photo.jpg" in the public/root folder.
const ENVELOPE_BG_IMAGE = "./photo.jpg";

interface EnvelopeProps {
  isOpen: boolean;
  onClick: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Common style for the background image to ensure seamless alignment
  const bgStyle = {
    backgroundImage: `url(${ENVELOPE_BG_IMAGE})`,
    backgroundSize: 'cover', // Ensures the photo covers the whole envelope
    backgroundPosition: 'center 30%', // Focus on the top-center (faces)
  };

  return (
    <div 
      className={`relative w-80 h-52 sm:w-96 sm:h-64 transition-transform duration-500 ease-in-out cursor-pointer z-10 ${isOpen ? 'translate-y-32 scale-90 opacity-0 pointer-events-none' : 'hover:scale-105'}`}
      onClick={!isOpen ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip hint */}
      <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 text-white/90 text-sm font-serif tracking-widest transition-opacity duration-300 ${isHovered && !isOpen ? 'opacity-100' : 'opacity-0'}`}>
        Click to open
      </div>

      <div className="perspective-1000 relative w-full h-full shadow-2xl drop-shadow-2xl">
        
        {/* 1. Envelope Inside Lining (Dark Red) - Visible when open */}
        <div className="absolute inset-0 bg-[#4a0e0e] rounded-sm z-0"></div>

        {/* 2. The Letter Preview (Peeking out) */}
        <div 
          className={`absolute left-4 right-4 bg-[#Fdfbf7] transition-all duration-1000 ease-in-out z-10 rounded-t-sm shadow-sm
            ${isOpen ? 'bottom-20 h-48 -translate-y-10' : 'bottom-2 h-40'}`}
        >
          <div className="p-4 flex flex-col gap-2 opacity-50">
            <div className="h-1 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-1 w-full bg-gray-200 rounded"></div>
            <div className="h-1 w-full bg-gray-200 rounded"></div>
            <div className="h-1 w-2/3 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* 3. Envelope Pocket (The Main Body) */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none rounded-sm bg-[#e8e4d9]" // Fallback color
          style={{
            ...bgStyle,
            clipPath: 'polygon(0 0, 50% 48%, 100% 0, 100% 100%, 0 100%)', // Cut out "V" for flap
          }}
        >
           {/* Texture Overlays */}
           <div className="absolute inset-0 bg-black/5 mix-blend-multiply"></div>
           <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>
           
           {/* Subtle Inner Border/Bevel */}
           <div className="absolute inset-0 border border-white/10 rounded-sm"></div>
        </div>

        {/* 4. Envelope Top Flap */}
        <div 
          className={`absolute top-0 left-0 right-0 h-1/2 z-30 origin-top transition-transform duration-700 ease-in-out transform-style-3d ${isOpen ? 'rotate-x-180 z-0' : ''}`}
        >
           {/* Front of Flap (Photo) */}
           <div 
             className="absolute inset-0 backface-hidden bg-[#e8e4d9]"
             style={{
               ...bgStyle,
               clipPath: 'polygon(0 0, 100% 0, 50% 100%)', // Triangle
             }}
           >
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply"></div>
              <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>
           </div>

           {/* Back of Flap (Paper color - visible when open) */}
           <div 
             className="absolute inset-0 rotate-x-180 backface-hidden bg-[#f0eee6]"
             style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
             }}
           >
             {/* Simple crease line */}
             <div className="absolute top-0 w-full h-[1px] bg-black/10"></div>
           </div>
           
           {/* Wax Seal - Red to match the "McD" party theme vibes */}
           {!isOpen && (
             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-40">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#d91c1c] to-[#991b1b] rounded-full shadow-lg border-2 border-[#500e0e]/20 flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform">
                  <div className="absolute inset-1 rounded-full border border-white/20 opacity-40"></div>
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-[#7a0b0b] fill-[#7a0b0b] drop-shadow-sm opacity-90" />
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Envelope;