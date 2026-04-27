import { ArrowRight, Monitor, Video, Palette, Layout } from 'lucide-react';
import HexagonBackground from './HexagonBackground';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const programs = [
  { icon: Monitor, name: 'Frontend Web Development', cost: '₦150,000' },
  { icon: Video, name: 'Video Editing', cost: '₦150,000' },
  { icon: Palette, name: 'Graphic Design', cost: '₦100,000' },
  { icon: Layout, name: 'UI/UX Design', cost: '₦100,000' },
];

const WA_URL = 'https://wa.me/447538598770?text=Hi%20FutureUni!%20I%27m%20interested%20in%20your%20training%20programs.%20Can%20I%20get%20more%20details%3F';

const TrainingProgramsSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="training" className="relative py-20 overflow-hidden section-even">
      <HexagonBackground />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary mb-4">
            Learn With Us
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
            Our Training <span className="text-gradient-primary">Programs</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
            Gain industry-ready skills with hands-on training and real-world internship experience.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {programs.map((p, i) => (
            <div
              key={p.name}
              className="rounded-xl border border-transparent dark:border-primary/15 bg-card dark:bg-primary/[0.04] p-5 sm:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(108,99,225,0.2)] hover:-translate-y-1 text-center flex flex-col items-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s ease-out ${i * 0.1}s`,
              }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <p.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-base sm:text-lg leading-tight flex-1">{p.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">6 Weeks Training + 4 Weeks Internship</p>
              <span className="inline-block text-lg sm:text-xl font-bold text-primary mt-auto">{p.cost}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(108,99,225,0.4)] min-h-[48px]"
          >
            Apply Now <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrainingProgramsSection;
