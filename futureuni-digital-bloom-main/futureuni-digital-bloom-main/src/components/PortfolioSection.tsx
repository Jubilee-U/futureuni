import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import HexagonBackground from './HexagonBackground';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import tnacScreenshot from '@/assets/FutureUni_web_SS.png';
import sorireScreenshot from '@/assets/sorire_screenshot.png';

const categories = ['All', 'Social Media', 'AI Videos', 'Web Design', 'Video Ads'];

const projects = [
  { title: 'Social Media Campaign for TFAC', category: 'Social Media', desc: 'Strategic social media video campaign for TFAC', link: 'https://www.youtube.com/shorts/3PVjMcbM3wo', image: 'https://img.youtube.com/vi/3PVjMcbM3wo/maxresdefault.jpg', isVideo: true },
  { title: 'The NextGen Africa', category: 'Web Design', desc: 'Pan-African youth innovation ecosystem platform built for NextGen leaders', link: 'https://nextgen-african-glow.lovable.app', image: tnacScreenshot },
  { title: 'Sorire E-Commerce', category: 'Web Design', desc: 'Luxury Adire fashion e-commerce platform with modern design', link: 'https://sorire.base44.app', image: sorireScreenshot },
  { title: 'FutureUni Brand Story', category: 'Video Ads', desc: '30-second brand film showcasing our identity, color psychology and vision', link: 'https://www.youtube.com/watch?v=cqXtXFkX5iA', image: 'https://img.youtube.com/vi/cqXtXFkX5iA/maxresdefault.jpg', isVideo: true },
  { title: 'Crown Dove Manor Resort', category: 'Video Ads', desc: 'Promotional video showcasing the hotel spaces, rooms, kitchen and full resort experience', link: 'https://www.youtube.com/shorts/cFb0ozjN2j4', image: 'https://img.youtube.com/vi/cFb0ozjN2j4/maxresdefault.jpg', isVideo: true },
  { title: 'Why God Created Us', category: 'AI Videos', desc: 'AI-generated short film exploring creation and purpose', link: 'https://www.youtube.com/shorts/aJoxW6hO5Xs', image: 'https://img.youtube.com/vi/aJoxW6hO5Xs/maxresdefault.jpg', isVideo: true },
  { title: "Don't Stop Church", category: 'AI Videos', desc: 'AI-generated inspirational church short', link: 'https://www.youtube.com/shorts/L59qaZ4C2SU', image: 'https://img.youtube.com/vi/L59qaZ4C2SU/hqdefault.jpg', isVideo: true },
];

const gradients = [
  'from-primary/40 to-primary/20',
  'from-primary/30 to-accent/30',
  'from-primary/50 to-primary/10',
  'from-accent/40 to-primary/30',
  'from-primary/20 to-accent/20',
  'from-primary/35 to-primary/15',
];

const PortfolioSection = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);
  const { ref, visible } = useScrollReveal();

  return (
    <section id="portfolio" className="relative py-20 overflow-hidden section-odd">
      <HexagonBackground />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary mb-4">
            Our Work
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-200 min-h-[44px] ${
                active === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            
              key={project.title}
              href={project.link || '#'}
              target={project.link ? '_blank' : undefined}
              rel={project.link ? 'noopener noreferrer' : undefined}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] flex flex-col transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s ease-out ${i * 0.1}s`,
              }}
            >
              {project.image ? (
                <>
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-secondary/50" />
                </>
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]}`} />
              )}

              {/* Always visible content */}
              <div className="relative z-10 flex-1 flex items-center justify-center">
                {(project as any).isVideo ? (
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play size={24} className="text-primary ml-1" fill="currentColor" />
                  </div>
                ) : (
                  <ExternalLink size={28} className="text-foreground/50 group-hover:text-primary-foreground transition-colors" />
                )}
              </div>
              <div className="relative z-10 p-4 pb-5">
                <h3 className={`font-bold text-lg ${project.image ? 'text-white' : 'text-foreground'}`}>{project.title}</h3>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-20">
                <HexagonBackground />
                <div className="relative z-10">
                  <h3 className="font-bold text-primary-foreground text-lg">{project.title}</h3>
                  <p className="text-xs text-primary-foreground/70 mt-1">{project.desc}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium bg-primary/20 text-primary">
                    {project.category}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;