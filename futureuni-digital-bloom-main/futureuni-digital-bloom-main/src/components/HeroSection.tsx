import { ArrowRight, Play } from 'lucide-react';
import flyerImg from '@/assets/FU_Services_New.png';
import websiteSS from '@/assets/FutureUni_web_SS.png';

const WA_URL = 'https://wa.me/447538598770?text=Hi%20FutureUni!%20I%20just%20visited%20your%20website%20and%20I%27m%20interested%20in%20your%20services.%20I%27d%20love%20to%20discuss%20my%20project.';

const avatars = ['A', 'B', 'C', 'D'];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Solid backgrounds — no gradients */}
      <div className="absolute inset-0 hidden dark:block" style={{ background: '#000539' }} />
      <div className="absolute inset-0 dark:hidden" style={{ background: '#f0f2f8' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full">
        <div className="space-y-5 sm:space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 max-md:px-4 max-md:py-2 rounded-full border border-primary/40 text-xs max-md:text-[13px] font-medium text-secondary dark:text-primary-foreground bg-primary/10">
            <span className="w-2 h-2 max-md:w-2 max-md:h-2 rounded-full bg-primary" />
            Digital Media Agency
          </span>

          <h1 className="text-[40px] sm:text-[48px] lg:text-[72px] font-extrabold leading-[1.1]">
            <span className="block text-secondary dark:text-white">Closing the</span>
            <span className="text-secondary dark:text-white">Digital </span>
            <span className="text-gradient-primary">Gap</span>
          </h1>

          <p className="text-[15px] sm:text-lg max-w-lg max-md:max-w-full leading-relaxed" style={{ color: '#4a4a6a' }}>
            <span className="dark:text-white/75">
              Helping brands grow with powerful digital solutions — from stunning designs to high-converting websites and viral video content.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(250,216,232,0.5)] min-h-[48px]"
            >
              Get Started <ArrowRight size={16} />
            </a>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full border border-secondary/20 dark:border-white/30 text-secondary/85 dark:text-white/85 font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:border-primary hover:text-primary hover:scale-105 hover:shadow-[0_0_15px_rgba(108,99,225,0.3)] min-h-[48px]"
            >
              <Play size={14} /> View Offers
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-4">
            <div className="flex -space-x-2">
              {avatars.map((a, i) => (
                <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/80 border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {a}
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-bold text-secondary dark:text-white">100+ Happy Clients</span> — Trusted worldwide
            </p>
          </div>
        </div>

        <div className="relative h-[220px] sm:h-[300px] lg:h-[400px]">
          <div className="grid grid-cols-2 lg:block gap-3 lg:gap-0 h-full">
            {/* Card 1 — Flyer Image */}
            <div
              className="lg:absolute lg:top-0 lg:right-4 w-[160px] h-[190px] lg:w-[200px] lg:h-[240px] rounded-[16px] overflow-hidden shadow-lg"
              style={{ animation: 'float1 5s ease-in-out infinite' }}
            >
              <img src={flyerImg} alt="FutureUni Services" className="w-full h-full object-cover" />
            </div>

            {/* Card 2 — Browser Mockup */}
            <a
              href="https://nextgen-african-glow.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:absolute lg:top-28 lg:right-32 w-[190px] h-[160px] lg:w-[240px] lg:h-[200px] rounded-[16px] overflow-hidden shadow-lg block bg-white dark:bg-card/40"
              style={{ animation: 'float2 6s ease-in-out infinite 0.5s' }}
            >
              <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-2 flex-1 h-4 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <img src={websiteSS} alt="TNAC Website Preview" className="w-full h-[calc(100%-32px)] object-cover object-top" />
            </a>

            {/* Card 3 — Video Card */}
            <a
              href="https://youtu.be/cqXtXFkX5iA"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:absolute lg:bottom-8 lg:right-12 lg:w-48 lg:h-32 w-full h-28 rounded-[16px] overflow-hidden shadow-lg col-span-2 mx-auto max-w-[200px] lg:max-w-none block relative"
              style={{ animation: 'float3 4.5s ease-in-out infinite 1s' }}
            >
              <img src="https://img.youtube.com/vi/cqXtXFkX5iA/maxresdefault.jpg" alt="Our Story" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Play size={16} className="text-primary ml-0.5" fill="currentColor" />
                </div>
              </div>
              <span className="absolute bottom-2 left-0 right-0 text-center text-[11px] font-medium text-white z-10">Our Story</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
