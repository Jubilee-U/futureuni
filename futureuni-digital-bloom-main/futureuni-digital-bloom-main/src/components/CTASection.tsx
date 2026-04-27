import { ArrowRight, MessageCircle, Rocket } from 'lucide-react';
import HexagonBackground from './HexagonBackground';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const WA_START = 'https://wa.me/2347056213076?text=Hi%20FutureUni!%20I%20just%20visited%20your%20website%20and%20I%27m%20ready%20to%20start%20my%20project.%20Let%27s%20talk!';
const WA_CHAT = 'https://wa.me/2347056213076?text=Hi%20FutureUni!%20I%20just%20visited%20your%20website%20and%20I%27d%20love%20to%20chat%20about%20my%20project.';

const CTASection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="cta" className="relative py-24 overflow-hidden section-cta">
      <HexagonBackground />
      <div
        ref={ref}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease-out',
        }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary mb-6">
          <Rocket size={12} /> Ready to grow?
        </span>
        <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
          Don't miss the opportunity to make your brand{' '}
          <span className="text-gradient-primary">stand out</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-base sm:text-lg">
          Let's work together to create something amazing. Your next level of digital growth starts here.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mt-8">
          <a
            href={WA_START}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(250,216,232,0.5)] min-h-[48px]"
          >
            Start Your Project <ArrowRight size={16} />
          </a>
          <a
            href={WA_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-border text-muted-foreground font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:border-primary hover:text-primary hover:scale-105 min-h-[48px]"
          >
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
