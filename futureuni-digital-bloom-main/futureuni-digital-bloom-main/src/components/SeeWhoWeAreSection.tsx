import { ArrowRight } from 'lucide-react';
import HexagonBackground from './HexagonBackground';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const WA_URL = 'https://wa.me/447538598770?text=Hi%20FutureUni!%20I%20just%20watched%20your%20brand%20video%20and%20I%27m%20interested%20in%20your%20services.';

const SeeWhoWeAreSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 hidden dark:block" style={{ background: '#000539' }} />
      <div className="absolute inset-0 dark:hidden" style={{ background: '#f0f2f8' }} />
      <HexagonBackground />

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease-out',
        }}
      >
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary mb-4">
            Our Story
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
            See Who We <span className="text-gradient-primary">Are</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            30 seconds. That's all it takes to understand who FutureUni is, what we stand for, and why we're different.
          </p>
        </div>

        {/* YouTube Embed */}
        <div className="flex justify-center mb-10">
          <div
            className="w-full max-w-[800px] rounded-[16px] overflow-hidden shadow-[0_0_30px_rgba(108,99,225,0.3)]"
            style={{ border: '1px solid rgba(108,99,225,0.3)' }}
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/cqXtXFkX5iA"
                title="FutureUni Brand Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(108,99,225,0.4)] min-h-[48px]"
          >
            Start Your Project <ArrowRight size={16} />
          </a>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-full border border-border text-muted-foreground font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:border-primary hover:text-primary hover:scale-105 min-h-[48px]"
          >
            View Our Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default SeeWhoWeAreSection;
