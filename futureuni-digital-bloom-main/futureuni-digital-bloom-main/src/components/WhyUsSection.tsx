import { Zap, Target, TrendingUp, Globe } from 'lucide-react';
import HexagonBackground from './HexagonBackground';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const features = [
  { icon: Zap, title: 'Fast Delivery', desc: 'We move at the speed of the digital world. Quick turnarounds without sacrificing quality.' },
  { icon: Target, title: 'Conversion-Focused Designs', desc: 'Every pixel is placed with purpose — to turn visitors into loyal customers.' },
  { icon: TrendingUp, title: 'Affordable & Scalable', desc: 'Premium solutions that grow with your brand, at prices that make sense.' },
  { icon: Globe, title: 'Built for Global & Nigerian Markets', desc: 'We understand both worlds — local insights with international standards.' },
];

const WhyUsSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="why-us" className="relative py-20 overflow-hidden section-even">
      <HexagonBackground />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary mb-4">
            Why FutureUni
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
            Why Choose <span className="text-gradient-primary">Us</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
            We combine creativity, strategy, and technology to deliver results that matter.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-xl border border-transparent dark:border-primary/15 bg-card dark:bg-primary/[0.04] p-5 sm:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(108,99,225,0.2)] hover:-translate-y-1 text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s ease-out ${i * 0.1}s`,
              }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <f.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-lg sm:text-[22px] leading-tight">{f.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
