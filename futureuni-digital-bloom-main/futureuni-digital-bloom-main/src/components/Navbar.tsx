import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import logoImg from '@/assets/Future_Uni_Logo.png';

const WA_URL = 'https://wa.me/2347056213076?text=Hi%20FutureUni!%20I%20just%20visited%20your%20website%20and%20I%27m%20interested%20in%20your%20services.%20I%27d%20love%20to%20discuss%20my%20project.';

const navLinks = [
  { label: 'Services', target: 'services' },
  { label: 'Why Us', target: 'why-us' },
  { label: 'Portfolio', target: 'portfolio' },
  { label: 'Contact', target: 'start-project' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const handleScroll = useCallback(() => {
    const sections = ['start-project', 'cta', 'portfolio', 'why-us', 'services', 'hero'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSection(id);
          return;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border"
      style={{ background: 'var(--nav-bg)' }}
    >
      <style>{`
        :root { --nav-bg: rgba(255,255,255,0.9); }
        .dark { --nav-bg: rgba(0,5,57,0.9); }
        .dark .nav-logo { filter: none !important; }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
          <img src={logoImg} alt="FutureUni" className="nav-logo h-[30px] md:h-[36px] w-auto object-contain" style={{ filter: 'brightness(0) saturate(100%)' }} />
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className={`relative text-base font-medium transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left ${
                activeSection === link.target
                  ? 'text-primary after:scale-x-100 after:origin-left'
                  : 'text-muted-foreground hover:text-foreground after:scale-x-0'
              }`}
            >
              {link.label}
            </button>
          ))}
          <ThemeToggle />
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-base font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(250,216,232,0.5)]"
          >
            Get Started
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="p-2">
            {open ? <X size={24} className="text-foreground" /> : <Menu size={24} className="text-foreground" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden backdrop-blur-md border-b border-border overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[400px] pb-4' : 'max-h-0'
        }`}
        style={{ background: 'var(--nav-bg)' }}
      >
        <div className="px-4 space-y-1 pt-2">
          {navLinks.map(link => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className={`block w-full text-left py-3 text-base font-medium transition-colors min-h-[48px] ${
                activeSection === link.target ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-5 py-3 rounded-full bg-primary text-primary-foreground text-base font-semibold mt-2 min-h-[48px]"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
