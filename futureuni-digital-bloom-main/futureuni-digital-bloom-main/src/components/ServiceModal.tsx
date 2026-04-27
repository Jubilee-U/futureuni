import { X, Star, Check, Palette, Rocket, Monitor, Video } from 'lucide-react';
import { useEffect } from 'react';
import type { Service, Offer } from '@/data/services';
import HexagonBackground from './HexagonBackground';

interface ServiceModalProps {
  service: Service;
  offer: Offer;
  onClose: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Palette,
  Rocket,
  Monitor,
  Video,
};

const serviceWaLinks: Record<string, string> = {
  'Social Media Design': 'https://wa.me/447538598770?text=Hi%20FutureUni!%20I%27m%20interested%20in%20your%20Social%20Media%20Design%20service.%20I%27d%20love%20to%20discuss%20my%20project.',
  'Sales / Landing Page': 'https://wa.me/2347056213076?text=Hi%20FutureUni!%20I%27m%20interested%20in%20your%20Sales%20and%20Landing%20Page%20service.%20I%27d%20love%20to%20discuss%20my%20project.',
  'Web Design': 'https://wa.me/2347056213076?text=Hi%20FutureUni!%20I%27m%20interested%20in%20your%20Web%20Design%20service.%20I%27d%20love%20to%20discuss%20my%20project.',
  'Video Ads': 'https://wa.me/2347056213076?text=Hi%20FutureUni!%20I%27m%20interested%20in%20your%20Video%20Ads%20service.%20I%27d%20love%20to%20discuss%20my%20project.',
};

const WA_DEFAULT = 'https://wa.me/2347056213076?text=Hi%20FutureUni!%20I%27m%20interested%20in%20your%20services.%20I%27d%20love%20to%20discuss%20my%20project.';

const ServiceModal = ({ service, offer, onClose }: ServiceModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const waLink = serviceWaLinks[service.name] || WA_DEFAULT;
  const IconComponent = iconMap[service.icon];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div
        className="relative w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[90vh] overflow-y-auto sm:rounded-2xl bg-card border-0 sm:border border-border shadow-2xl animate-[scale-fade-in_0.3s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <HexagonBackground />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                {IconComponent && <IconComponent size={20} className="text-primary" />}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{offer.name}</p>
              </div>
              {offer.popular && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Star size={10} className="fill-current" /> Popular
                </span>
              )}
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
              <X size={20} className="text-foreground" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-0">
            <div className="p-5 bg-primary/5 border-r border-border">
              <p className="text-xs font-bold text-muted-foreground mb-2">NIGERIAN MARKET</p>
              <p className="text-2xl font-bold text-primary">{offer.ng.price}</p>
              <p className="text-sm text-muted-foreground mb-4">{offer.ng.label}</p>
              <ul className="space-y-2">
                {offer.ng.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Check size={14} className="text-primary mt-0.5 shrink-0" />
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5" style={{ backgroundColor: 'rgba(250,216,232,0.08)' }}>
              <p className="text-xs font-bold text-muted-foreground mb-2">FOREIGN MARKET</p>
              <p className="text-2xl font-bold text-primary">{offer.usd.price}</p>
              <p className="text-sm text-muted-foreground mb-4">{offer.usd.label}</p>
              <ul className="space-y-2">
                {offer.usd.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Check size={14} className="text-primary mt-0.5 shrink-0" />
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-5 border-t border-border text-center space-y-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                setTimeout(() => {
                  document.getElementById('start-project')?.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('preselect-service', { detail: { service: service.name } }));
                }, 100);
              }}
              className="inline-block w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(250,216,232,0.5)]"
            >
              Get Started with This Plan →
            </button>
            <p className="text-xs text-muted-foreground">
              Have questions? Chat with us on{' '}
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a>{' '}
              or email{' '}
              <a href="mailto:futureuni0@gmail.com" className="text-primary hover:underline">futureuni0@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
