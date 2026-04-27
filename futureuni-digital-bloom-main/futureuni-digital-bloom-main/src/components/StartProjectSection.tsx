import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Rocket, Mail, Phone, MapPin, Upload, CheckCircle2, AlertCircle, MessageCircle, Loader2 } from 'lucide-react';
import HexagonBackground from './HexagonBackground';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import logoImg from '@/assets/Future_Uni_Logo.png';

const WA_START = 'https://wa.me/2347056213076?text=Hi%20FutureUni!%20I%27d%20like%20to%20start%20a%20project%20with%20you.';
const WA_AFTER = 'https://wa.me/2347056213076?text=Hi%20FutureUni!%20I%20just%20submitted%20my%20project%20brief%20on%20your%20website.';
const FORM_ENDPOINT = 'https://formspree.io/f/xpqklblq';

const SERVICES = ['Social Media Design', 'Sales / Landing Page', 'Web Design', 'Video Ads'] as const;
type ServiceKey = typeof SERVICES[number];

const PACKAGES: Record<ServiceKey, string[]> = {
  'Social Media Design': ['Basic Page — ₦100,000 / $74', 'Convert Page — ₦150,000 / $110', 'Sales Page — ₦200,000 / $147'],
  'Sales / Landing Page': ['Basic Page — ₦100,000 / $74', 'Convert Page — ₦150,000 / $110', 'Sales Page — ₦200,000 / $147'],
  'Web Design': ['Starter Site — ₦550,000 / $400', 'Growth Site — ₦850,000 / $600', 'Premium Site — ₦999,999 / $900'],
  'Video Ads': ['Starter Video Pack — ₦100,000 / $74', 'Growth Video Pack — ₦150,000 / $110', 'Dominance Video Pack — ₦200,000 / $147'],
};

const REFERRAL_OPTIONS = ['Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'WhatsApp', 'Referral from a friend', 'Google Search', 'Other'];
const REFERENCE_OPTIONS = [
  'I have a design ready',
  'I have a reference/inspiration',
  'I have both',
  "I don't have anything yet — FutureUni will handle everything",
];

const inputClass =
  "w-full bg-transparent text-foreground rounded-[10px] px-4 py-3.5 text-[15px] border border-[#6c63e1]/40 focus:border-[#6c63e1] focus:outline-none focus:shadow-[0_0_0_4px_rgba(108,99,225,0.15)] transition-all duration-200 placeholder:text-muted-foreground/60";
const labelClass = "block text-[14px] font-semibold text-foreground mb-2";

const StartProjectSection = () => {
  const { ref, visible } = useScrollReveal();
  const [service, setService] = useState<ServiceKey | ''>('');
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Listen for service preselect events from service modals
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ service: ServiceKey }>).detail;
      if (detail?.service && SERVICES.includes(detail.service)) {
        setService(detail.service);
      }
    };
    window.addEventListener('preselect-service', handler);
    return () => window.removeEventListener('preselect-service', handler);
  }, []);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) { setFileName(''); return; }
    if (f.size > 5 * 1024 * 1024) {
      alert('File too large. Max 5MB.');
      e.target.value = '';
      setFileName('');
      return;
    }
    setFileName(f.name);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setFileName('');
        setService('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const reset = () => setStatus('idle');

  return (
    <section id="start-project" className="relative py-20 sm:py-24 overflow-hidden section-cta">
      <HexagonBackground />
      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease-out',
        }}
      >
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary mb-5">
            <Rocket size={12} /> Get Started
          </span>
          <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold text-foreground leading-tight">
            Start Your <span className="text-gradient-primary">Project</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Fill in the form below and we'll get back to you within 24 hours. Prefer to chat? Reach us directly on WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          {/* LEFT: Form / Success */}
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-8">
            {status === 'success' ? (
              <div className="text-center py-8 animate-[scale-fade-in_0.4s_ease-out]">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#6c63e1]/10 mb-5 animate-pulse">
                  <CheckCircle2 size={48} className="text-[#6c63e1]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Project Brief Sent! 🎉</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Thank you! We've received your brief and will get back to you within 24 hours. In the meantime feel free to chat with us on WhatsApp.
                </p>
                <a
                  href={WA_AFTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(250,216,232,0.5)]"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp →
                </a>
                <div className="mt-5">
                  <button onClick={reset} className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4">
                    Submit Another Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="_subject" value="New Project Enquiry — FutureUni" />

                <div>
                  <label className={labelClass} htmlFor="full_name">Full Name</label>
                  <input id="full_name" name="full_name" type="text" required placeholder="e.g. John Adeyemi" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass} htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" required placeholder="e.g. john@yourbrand.com" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass} htmlFor="whatsapp_number">WhatsApp Number</label>
                  <input id="whatsapp_number" name="whatsapp_number" type="tel" required placeholder="e.g. +234 801 234 5678" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass} htmlFor="business_name">Business Name</label>
                  <input id="business_name" name="business_name" type="text" placeholder="e.g. GlowSkin Nigeria" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass} htmlFor="service">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value as ServiceKey)}
                    className={inputClass}
                  >
                    <option value="" disabled>Select a service...</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="package">Package</label>
                  <select id="package" name="package" required disabled={!service} className={inputClass}>
                    <option value="">{service ? 'Select a package...' : 'Choose a service first'}</option>
                    {service && PACKAGES[service].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="project_description">Tell Us About Your Project</label>
                  <textarea
                    id="project_description"
                    name="project_description"
                    required
                    rows={5}
                    placeholder="Describe what you need, your goals, target audience, timeline or anything that will help us understand your project better..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <p className={labelClass}>Do you have a design or reference?</p>
                  <div className="space-y-2">
                    {REFERENCE_OPTIONS.map(opt => (
                      <label key={opt} className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="reference_status"
                          value={opt}
                          required
                          className="mt-1 w-4 h-4 accent-[#6c63e1] cursor-pointer shrink-0"
                        />
                        <span className="text-[14px] text-foreground group-hover:text-primary transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Upload Your Design, Reference or Brief (Optional)</label>
                  <label
                    htmlFor="file_upload"
                    className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#6c63e1]/40 rounded-[10px] p-6 cursor-pointer hover:border-[#6c63e1] hover:bg-[#6c63e1]/5 transition-all"
                  >
                    <Upload size={24} className="text-[#6c63e1]" />
                    <p className="text-sm text-foreground font-medium">
                      {fileName || 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-muted-foreground">Accepted: JPG, PNG, PDF, DOC, DOCX. Max 5MB</p>
                    <input
                      id="file_upload"
                      name="file_upload"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className={labelClass} htmlFor="referral_source">How Did You Hear About Us?</label>
                  <select id="referral_source" name="referral_source" className={inputClass} defaultValue="">
                    <option value="">Select an option...</option>
                    {REFERRAL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 rounded-[10px] border border-destructive/50 bg-destructive/10">
                    <AlertCircle size={20} className="text-destructive shrink-0 mt-0.5" />
                    <div className="text-sm text-foreground">
                      Oops! Something went wrong. Please try again or reach us directly on{' '}
                      <a href={WA_START} target="_blank" rel="noopener noreferrer" className="text-primary underline">WhatsApp</a>.
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#6c63e1] text-white font-bold text-base transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(250,216,232,0.6)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'submitting' ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending...</>
                  ) : (
                    <>Send My Project Brief →</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Contact summary */}
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: 'rgba(108,99,225,0.08)',
              border: '1px solid rgba(108,99,225,0.30)',
            }}
          >
            <img src={logoImg} alt="FutureUni" className="h-9 w-auto object-contain mb-5" />
            <h3 className="text-xl font-bold text-foreground mb-4">Prefer to talk directly?</h3>
            <a
              href={WA_START}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(250,216,232,0.5)] mb-6"
            >
              <MessageCircle size={16} /> Chat on WhatsApp →
            </a>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-foreground">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:futureuni0@gmail.com" className="hover:text-primary transition-colors break-all">futureuni0@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+2347056213076" className="hover:text-primary transition-colors">+234 705 621 3076</a>
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <MapPin size={16} className="text-primary shrink-0" />
                Benin City, Nigeria
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">We typically respond within 24 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartProjectSection;
