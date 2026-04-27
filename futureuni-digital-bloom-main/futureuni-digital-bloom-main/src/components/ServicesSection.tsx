import { useState } from 'react';
import { ChevronRight, CheckCircle, Palette, Rocket, Monitor, Video } from 'lucide-react';
import HexagonBackground from './HexagonBackground';
import ServiceModal from './ServiceModal';
import { services, type Service, type Offer } from '@/data/services';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  Palette,
  Rocket,
  Monitor,
  Video,
};

const ServicesSection = () => {
  const [modal, setModal] = useState<{ service: Service; offer: Offer } | null>(null);
  const [currency, setCurrency] = useState<'ng' | 'usd'>('ng');
  const { ref, visible } = useScrollReveal();

  return (
    <section id="services" className="relative py-20 overflow-hidden section-odd">
      <HexagonBackground />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary mb-4">
            Our Services
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
            What We <span className="text-gradient-primary">Offer</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
            Choose from our tailored packages designed to elevate your brand and drive results.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-full border border-border p-1 bg-card">
            <button
              onClick={() => setCurrency('ng')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                currency === 'ng' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              ₦ Naira
            </button>
            <button
              onClick={() => setCurrency('usd')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                currency === 'usd' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, si) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.name}
                className="rounded-xl bg-card border border-border p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(108,99,225,0.15)] flex flex-col"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s ease-out ${si * 0.1}s`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  {IconComponent && <IconComponent size={24} className="text-primary" />}
                </div>
                <h3 className="font-bold text-foreground mb-1 text-lg sm:text-[22px]">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

                <div className="space-y-2 flex-1">
                  {service.offers.map((offer, i) => (
                    <button
                      key={i}
                      onClick={() => setModal({ service, offer })}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all duration-200 hover:shadow-[0_0_0_1.5px_#6c63e1,0_4px_15px_rgba(108,99,225,0.25)] group min-h-[44px]"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-sm">
                          <CheckCircle size={14} className="text-primary shrink-0" />
                          <span className="text-foreground font-medium truncate">{offer.name}</span>
                        </div>
                        <div className="mt-0.5">
                          <span className="text-base font-bold text-primary transition-all">
                            {currency === 'ng' ? offer.ng.price : offer.usd.price}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setModal({ service, offer: service.offers[service.offers.length - 1] })}
                  className="mt-4 w-full py-2.5 rounded-lg border border-primary/30 text-base font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-[1.02] min-h-[44px]"
                >
                  Select Plan
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {modal && (
        <ServiceModal
          service={modal.service}
          offer={modal.offer}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
};

export default ServicesSection;
