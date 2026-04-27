import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import HexagonBackground from './HexagonBackground';

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Timelines vary by service. Social media designs take 3–7 days. Landing pages take 5–10 days. Full websites take 2–4 weeks. Video ads take 5–14 days depending on complexity. We always confirm timelines before starting.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes! We work with clients globally. Our pricing includes both Naira (₦) options for Nigerian clients and USD ($) options for international clients.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept bank transfers (Nigerian banks), international wire transfers, and major payment platforms. We require a deposit before starting work.',
  },
  {
    q: 'Can I request changes after delivery?',
    a: 'Yes. Each package includes a set number of revisions as listed. Additional revisions beyond the package limit can be arranged at a small fee.',
  },
  {
    q: 'How do I get started?',
    a: 'Simply click "Get Started" or "Chat on WhatsApp" anywhere on the site. We\'ll respond within 24 hours to discuss your project.',
  },
  {
    q: 'Do you offer ongoing monthly services?',
    a: 'Yes! We offer monthly retainer packages for social media management and content creation. Chat with us on WhatsApp to get a custom quote.',
  },
];

const FAQSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 overflow-hidden section-odd">
      <HexagonBackground />
      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary mb-4">
            Got Questions?
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-primary/15 bg-card dark:bg-primary/[0.03] px-5 overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${i * 0.1}s`,
              }}
            >
              <AccordionTrigger className="text-base font-medium text-foreground hover:text-primary hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
