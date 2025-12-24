import React, { useEffect, useState } from 'react';
import { LETTER_CONTENT } from '../constants';

interface LetterViewProps {
  isVisible: boolean;
}

const LetterView: React.FC<LetterViewProps> = ({ isVisible }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Delay showing the text content slightly for the "paper unfolding" effect
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
        setShowContent(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  // Split content by newlines to render paragraphs properly
  const paragraphs = LETTER_CONTENT.split('\n').map((line, index) => {
      // Handle empty lines as spacers
      if (line.trim() === '') return <br key={index} className="my-2" />;
      return <p key={index} className="mb-4 indent-8 text-gray-800 leading-loose">{line}</p>;
  });

  return (
    <div 
      className={`fixed inset-0 z-40 flex items-center justify-center p-4 transition-all duration-1000 ${showContent ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
    >
        {/* Paper Background */}
        <div className="relative w-full max-w-2xl h-[85vh] bg-[#fdfbf7] shadow-2xl rounded-sm overflow-hidden flex flex-col transform rotate-0 sm:rotate-1">
            
            {/* Paper Texture/Pattern Overlay (optional subtle noise) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

            {/* Decorative Top */}
            <div className="h-16 w-full border-b-2 border-red-900/10 flex items-center justify-center">
                <span className="font-serif italic text-red-900/40 text-sm tracking-[0.3em]">A LETTER FOR YOU</span>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                <div className="font-['Noto_Serif_SC',_serif] text-base sm:text-lg text-gray-800">
                   {paragraphs}
                </div>
                
                <div className="mt-12 flex justify-end">
                    <div className="font-['Dancing_Script',_cursive] text-2xl sm:text-3xl text-red-800 opacity-80 rotate-[-5deg]">
                        Yours truly
                    </div>
                </div>
                
                <div className="h-10"></div> {/* Bottom spacer */}
            </div>

            {/* Decorative Bottom */}
            <div className="h-8 w-full bg-red-900/5"></div>
        </div>
    </div>
  );
};

export default LetterView;