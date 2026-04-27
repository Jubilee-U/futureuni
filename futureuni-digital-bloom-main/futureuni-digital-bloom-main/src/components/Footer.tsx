import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
  </svg>
);
import logoImg from '@/assets/Future_Uni_Logo.png';
import HexagonBackground from './HexagonBackground';

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 overflow-hidden border-t border-border section-footer">
      <HexagonBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-3">
              <img src={logoImg} alt="FutureUni" className="h-[30px] md:h-[36px] w-auto object-contain" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Closing the Digital Gap — Helping brands grow with powerful digital solutions.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Services</h4>
            <ul className="space-y-2">
              {['Social Media Design', 'Landing Pages', 'Web Design', 'Video Ads'].map(s => (
                <li key={s}>
                  <button onClick={() => scrollTo('services')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About Us', id: 'hero' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'Pricing', id: 'services' },
                { label: 'Contact', id: 'start-project' },
              ].map(l => (
                <li key={l.label}>
                  <button onClick={() => scrollTo(l.id)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:futureuni0@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={14} /> futureuni0@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+2347056213076" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={14} /> +234 705 621 3076
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} /> Cardiff, United Kingdom
              </li>
<li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} /> Benin City, Nigeria
              </li>

            </ul>
            <div className="flex gap-2 mt-4">
              {[
                { icon: TikTokIcon, href: 'https://www.tiktok.com/@futureuni.co' },
                { icon: Instagram, href: 'https://instagram.com/futureuni.co' },
                { icon: Linkedin, href: 'https://linkedin.com/company/futureuni.co' },
                { icon: Facebook, href: 'https://facebook.com/futureuni.co' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all hover:text-primary hover:shadow-[0_0_12px_rgba(250,216,232,0.4)]"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted-foreground">© 2026 FutureUni. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Closing the Digital Gap</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
