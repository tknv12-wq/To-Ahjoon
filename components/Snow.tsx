import React from 'react';

const Snow: React.FC = () => {
  // Generate random snowflakes
  const flakes = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 3 + 5}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.5 + 0.3,
    size: Math.random() * 4 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            left: flake.left,
            top: '-10px',
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration} linear infinite`,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) translateX(0px);
          }
          50% {
             transform: translateY(50vh) translateX(20px);
          }
          100% {
            transform: translateY(105vh) translateX(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default Snow;