import { useState, useEffect } from 'react';
import logoImg from '@/assets/futureuni-logo.png';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundColor: '#000539' }}
    >
      <div className="animate-[scale-fade-in_0.8s_ease-out]">
        <img src={logoImg} alt="FutureUni" className="h-16 sm:h-20 object-contain" />
      </div>
      <p
        className="mt-4 text-sm font-medium animate-[scale-fade-in_0.8s_ease-out_0.4s_both]"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        Closing the Digital Gap
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: 'rgba(108,99,225,0.2)' }}>
        <div
          className="h-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%`, backgroundColor: '#6c63e1' }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
