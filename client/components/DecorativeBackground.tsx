export default function DecorativeBackground() {
  return (
    <>
      {/* Global CSS animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gentle-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-15px) rotate(2deg); }
            66% { transform: translateY(-8px) rotate(-1deg); }
          }

          @keyframes sparkle-twinkle {
            0%, 100% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 0.8; transform: scale(1.2); }
          }

          @keyframes heart-pulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
            50% { transform: scale(1.1) rotate(5deg); opacity: 0.6; }
          }

          @keyframes petal-drift {
            0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.4; }
            25% { transform: translateY(-10px) translateX(5px) rotate(90deg); opacity: 0.6; }
            50% { transform: translateY(-5px) translateX(-3px) rotate(180deg); opacity: 0.5; }
            75% { transform: translateY(-15px) translateX(8px) rotate(270deg); opacity: 0.7; }
            100% { transform: translateY(-20px) translateX(-5px) rotate(360deg); opacity: 0.3; }
          }

          @keyframes gradient-shift {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
          }

          @keyframes ribbon-flow {
            0% { transform: translateX(-100%) rotateZ(0deg); }
            100% { transform: translateX(100vw) rotateZ(360deg); }
          }

          .floating-decoration {
            animation: gentle-float 12s ease-in-out infinite;
          }

          .floating-decoration:nth-child(2n) {
            animation-delay: -2s;
            animation-duration: 15s;
          }

          .floating-decoration:nth-child(3n) {
            animation-delay: -4s;
            animation-duration: 18s;
          }

          .floating-decoration:nth-child(4n) {
            animation-delay: -6s;
            animation-duration: 10s;
          }

          .sparkle-element {
            animation: sparkle-twinkle 3s ease-in-out infinite;
          }

          .sparkle-element:nth-child(2n) {
            animation-delay: -1s;
          }

          .sparkle-element:nth-child(3n) {
            animation-delay: -2s;
          }

          .heart-element {
            animation: heart-pulse 8s ease-in-out infinite;
          }

          .heart-element:nth-child(2n) {
            animation-delay: -3s;
          }

          .petal-element {
            animation: petal-drift 20s linear infinite;
          }

          .petal-element:nth-child(2n) {
            animation-delay: -5s;
            animation-duration: 25s;
          }

          .petal-element:nth-child(3n) {
            animation-delay: -10s;
            animation-duration: 18s;
          }

          .gradient-overlay {
            animation: gradient-shift 6s ease-in-out infinite;
          }

          .ribbon-decoration {
            animation: ribbon-flow 30s linear infinite;
          }

          .ribbon-decoration:nth-child(2n) {
            animation-delay: -15s;
            animation-duration: 40s;
          }
        `
      }} />

      {/* Fixed background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Gradient background animations */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/20 via-transparent to-cream-100/20 gradient-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blush-50/15 via-transparent to-rose-100/15 gradient-overlay" style={{ animationDelay: '-3s' }}></div>

        {/* Minimal corner decorative elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-radial from-rose-100/10 to-transparent floating-decoration"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-radial from-rose-100/10 to-transparent floating-decoration" style={{ animationDelay: '-6s' }}></div>
      </div>
    </>
  );
}
