import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'petal' | 'sparkle' | 'heart';
}

export default function BackgroundAnimations() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];

      // Generate fewer rose petals - only 4
      for (let i = 0; i < 4; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 12 + 14,
          duration: Math.random() * 15 + 20,
          delay: Math.random() * 10,
          type: 'petal'
        });
      }

      // Generate fewer sparkles - only 3
      for (let i = 4; i < 7; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 8,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 12,
          type: 'sparkle'
        });
      }

      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute opacity-10 ${
            element.type === 'petal'
              ? 'text-rose-300'
              : 'text-yellow-200'
          }`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            animation: `float-${element.type} ${element.duration}s infinite ease-in-out`,
            animationDelay: `${element.delay}s`,
          }}
        >
          {element.type === 'petal' && '🌸'}
          {element.type === 'sparkle' && '✨'}
          {element.type === 'heart' && '💕'}
        </div>
      ))}

      {/* Gradient overlay animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/10 via-transparent to-blush-50/10 animate-pulse-slow"></div>
      
      {/* Subtle moving waves */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-rose-100/20 to-transparent animate-wave"></div>
      </div>

      <style jsx>{`
        @keyframes float-petal {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.1;
          }
          25% { 
            transform: translateY(-20px) rotate(5deg); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-10px) rotate(-3deg); 
            opacity: 0.2;
          }
          75% { 
            transform: translateY(-30px) rotate(8deg); 
            opacity: 0.25;
          }
        }

        @keyframes float-sparkle {
          0%, 100% { 
            transform: scale(0.5) rotate(0deg); 
            opacity: 0.2;
          }
          50% { 
            transform: scale(1.2) rotate(180deg); 
            opacity: 0.6;
          }
        }

        @keyframes float-heart {
          0%, 100% { 
            transform: translateY(0px) scale(0.8); 
            opacity: 0.15;
          }
          33% { 
            transform: translateY(-15px) scale(1.1); 
            opacity: 0.3;
          }
          66% { 
            transform: translateY(-25px) scale(0.9); 
            opacity: 0.25;
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }

        @keyframes wave {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
