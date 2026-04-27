import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 100, suffix: '+', label: 'Happy Clients' },
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '', label: 'Core Services' },
];

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(stats.map(s => Math.round(s.value * eased)));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [started]);

  return (
    <div ref={ref} className="relative py-10 sm:py-14" style={{ background: 'linear-gradient(135deg, #6c63e1 0%, #000539 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`text-center ${i < 3 ? 'sm:border-r sm:border-white/20' : ''}`}>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {counts[i]}{stat.suffix}
              </p>
              <p className="text-xs sm:text-sm mt-1" style={{ color: '#fad8e8' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
