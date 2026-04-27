import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import HexagonBackground from './HexagonBackground';

const testimonials = [
  {
    text: 'FutureUni transformed our social media presence completely. Within 3 weeks of working with them, our engagement tripled and we started getting consistent inquiries from clients.',
    name: 'Adaeze Okafor',
    title: 'Founder, GlowSkin Nigeria',
    initials: 'AO',
  },
  {
    text: 'The landing page they built for us converted at over 12%. We had never seen numbers like that before. Absolutely world-class work at a Nigerian price.',
    name: 'Emeka Chukwu',
    title: 'CEO, SwiftPay Africa',
    initials: 'EC',
  },
  {
    text: 'From the first call to final delivery, the experience was seamless. They understood our brand voice immediately and the designs were stunning.',
    name: 'Fatima Al-Hassan',
    title: 'Marketing Lead, TechBridge Benin City',
    initials: 'FA',
  },
  {
    text: 'Our video ad got over 200,000 organic views in the first week. FutureUni knows how to create content that stops the scroll.',
    name: 'Biodun Adeleke',
    title: 'Brand Manager, NaijaFit',
    initials: 'BA',
  },
  {
    text: "We've worked with three agencies before FutureUni and none of them came close. Fast delivery, great communication, and results that actually matter.",
    name: 'Chisom Nwosu',
    title: 'Director, Elevate Schools NG',
    initials: 'CN',
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const touchStartX = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const next = useCallback(() => setCurrent(c => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(next, 5000);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden section-even">
      <HexagonBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary mb-4">
            Client Love
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
            Real results from real brands we've worked with.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <button onClick={() => { prev(); clearInterval(intervalRef.current); intervalRef.current = setInterval(next, 5000); }} className="hidden sm:flex absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border items-center justify-center hover:border-primary transition-colors">
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <button onClick={() => { next(); clearInterval(intervalRef.current); intervalRef.current = setInterval(next, 5000); }} className="hidden sm:flex absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border items-center justify-center hover:border-primary transition-colors">
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>

          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2">
                  <div
                    className="rounded-xl border border-primary/15 bg-card dark:bg-primary/[0.04] p-6 sm:p-8 transition-all duration-500"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(30px)',
                    }}
                  >
                    <span className="text-4xl text-primary font-serif leading-none">"</span>
                    <p className="text-foreground text-base leading-relaxed mt-2 mb-5">
                      {t.text}
                    </p>
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-base font-bold text-foreground">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); clearInterval(intervalRef.current); intervalRef.current = setInterval(next, 5000); }}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-muted-foreground/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
