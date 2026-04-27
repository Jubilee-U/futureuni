import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Map, PenTool, Rocket } from 'lucide-react';
import HexagonBackground from './HexagonBackground';

const steps = [
  { icon: MessageCircle, num: 1, title: 'Reach Out', desc: 'Tell us about your project via WhatsApp or email.' },
  { icon: Map, num: 2, title: 'We Plan', desc: 'We map out your goals, timeline, and deliverables.' },
  { icon: PenTool, num: 3, title: 'We Build', desc: 'Our team designs and delivers your solution.' },
  { icon: Rocket, num: 4, title: 'You Launch', desc: 'Go live and start growing your brand immediately.' },
];

const HowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 overflow-hidden section-even">
      <HexagonBackground />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary mb-4">
            Our Process
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
            From idea to launch — simple, fast, and effective.
          </p>
        </div>

        <div className="hidden lg:flex items-start justify-between relative">
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-primary/30" />
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex flex-col items-center text-center w-1/4 relative"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s ease-out ${i * 0.15}s`,
              }}
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mb-4 relative z-10">
                <step.icon size={24} />
              </div>
              <span className="text-xs font-bold text-primary mb-1">Step {step.num}</span>
              <h3 className="font-bold text-foreground mb-1 text-lg">{step.title}</h3>
              <p className="text-base text-muted-foreground max-w-[180px]">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="lg:hidden space-y-0 relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-primary/30" />
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex gap-5 relative pl-14 py-5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.5s ease-out ${i * 0.15}s`,
              }}
            >
              <div className="absolute left-1 top-5 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <step.icon size={18} className="text-primary-foreground" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary">Step {step.num}</span>
                <h3 className="font-bold text-foreground text-lg">{step.title}</h3>
                <p className="text-base text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
