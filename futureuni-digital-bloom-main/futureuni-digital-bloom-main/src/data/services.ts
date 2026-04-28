export interface OfferFeature {
  text: string;
}

export interface OfferPricing {
  label: string;
  price: string;
  features: OfferFeature[];
}

export interface Offer {
  name: string;
  popular?: boolean;
  ng: OfferPricing;
  usd: OfferPricing;
}

export interface Service {
  icon: string;
  name: string;
  description: string;
  offers: Offer[];
}

export const services: Service[] = [
  {
    icon: 'Palette',
    name: 'Social Media Design',
    description: 'Get up to 20 premium designs!',
    offers: [
      {
        name: 'Starter Growth Kit',
        ng: { label: 'Starter Growth Kit', price: '₦100,000', features: [{ text: '10 premium social media designs' }, { text: '1 brand style direction (colors + fonts)' }, { text: '1 revision per design' }, { text: 'Delivery: 5–7 days' }] },
        usd: { label: 'Starter Growth Kit', price: '$120', features: [{ text: '10 premium social media graphics' }, { text: 'Basic brand alignment' }, { text: '1 revision' }, { text: '5–7 days delivery' }] },
      },
      {
        name: 'Business Visibility Kit',
        ng: { label: 'Business Visibility Kit', price: '₦150,000', features: [{ text: '15 premium designs' }, { text: 'Content direction (captions + layout ideas)' }, { text: '2 revisions' }, { text: '1 animated post' }, { text: 'Delivery: 5 days' }] },
        usd: { label: 'Business Visibility Kit', price: '$180', features: [{ text: '15 designs + captions guide' }, { text: '2 revisions' }, { text: '1 motion graphic' }, { text: '5 days delivery' }] },
      },
      {
        name: 'Authority Brand Kit',
        popular: true,
        ng: { label: 'Authority Brand Kit', price: '₦200,000', features: [{ text: '20 premium designs' }, { text: 'Full content strategy (hooks + layout system)' }, { text: '3 animated posts' }, { text: 'Priority delivery (3–4 days)' }, { text: 'Unlimited revisions (within scope)' }] },
        usd: { label: 'Authority Brand Kit', price: '$250', features: [{ text: '20 designs + content strategy' }, { text: '3 motion graphics' }, { text: 'Priority delivery' }, { text: 'Unlimited revisions' }] },
      },
    ],
  },
  {
    icon: 'Rocket',
    name: 'Sales / Landing Page',
    description: 'Convert clicks into clients with a stunning sales page!',
    offers: [
      {
        name: 'Conversion Starter',
        ng: { label: 'Conversion Starter', price: '₦100,000', features: [{ text: '1 landing page (simple structure)' }, { text: 'Mobile responsive' }, { text: 'Basic copy structuring' }, { text: '1 revision' }] },
        usd: { label: 'Conversion Starter', price: '$150', features: [{ text: '1 responsive landing page' }, { text: 'Basic copy layout' }, { text: '1 revision' }] },
      },
      {
        name: 'Conversion Pro',
        ng: { label: 'Conversion Pro', price: '₦150,000', features: [{ text: 'High-converting landing page' }, { text: 'Copywriting assistance' }, { text: 'Lead capture integration' }, { text: '2 revisions' }] },
        usd: { label: 'Conversion Pro', price: '$250', features: [{ text: 'Conversion-focused landing page' }, { text: 'Lead capture integration' }, { text: 'Copy guidance' }, { text: '2 revisions' }] },
      },
      {
        name: 'Conversion Dominator',
        popular: true,
        ng: { label: 'Conversion Dominator', price: '₦200,000', features: [{ text: 'Full sales page (long-form)' }, { text: 'Advanced conversion structure (CTA, testimonials, etc.)' }, { text: 'Email/WhatsApp integration' }, { text: '3 revisions + optimization tips' }] },
        usd: { label: 'Conversion Dominator', price: '$400', features: [{ text: 'Full high-converting sales page' }, { text: 'Advanced UX structure' }, { text: 'Integrations (email/CRM)' }, { text: '3 revisions' }] },
      },
    ],
  },
  {
    icon: 'Monitor',
    name: 'Web Design',
    description: 'Ready to go live with a beautiful website that sells?',
    offers: [
      {
        name: 'Starter Site',
        ng: { label: 'Starter Site', price: '₦550,000', features: [{ text: '3–5 page website' }, { text: 'Mobile responsive' }, { text: 'Basic SEO setup' }, { text: '1 revision' }] },
        usd: { label: 'Starter Site', price: '$400', features: [{ text: '3–5 page website' }, { text: 'Responsive design' }, { text: 'Basic SEO' }] },
      },
      {
        name: 'Growth Site',
        ng: { label: 'Growth Site', price: '₦850,000', features: [{ text: '5–7 pages' }, { text: 'SEO optimization' }, { text: 'Speed optimization' }, { text: '2 revisions' }] },
        usd: { label: 'Growth Site', price: '$600', features: [{ text: '5–7 pages' }, { text: 'SEO + speed optimization' }, { text: '2 revisions' }] },
      },
      {
        name: 'Premium Site',
        popular: true,
        ng: { label: 'Premium Site', price: '₦999,999', features: [{ text: '8–10 pages' }, { text: 'Full brand integration' }, { text: 'Advanced UI/UX' }, { text: 'Blog/eCommerce ready' }, { text: '3 revisions + support' }] },
        usd: { label: 'Premium Site', price: '$900', features: [{ text: '8–10 pages' }, { text: 'Advanced UI/UX' }, { text: 'Blog/eCommerce ready' }, { text: 'Priority support' }] },
      },
    ],
  },
  {
    icon: 'Video',
    name: 'Video Ads',
    description: "Let's arm you with videos your targets can't overlook.",
    offers: [
      {
        name: 'Starter Video Pack',
        ng: { label: 'Starter Video Pack', price: '₦100,000', features: [{ text: '1 video (15–30 sec)' }, { text: 'Basic editing + captions' }, { text: '1 revision' }] },
        usd: { label: 'Starter Video Pack', price: '$120', features: [{ text: '1 short video ad' }, { text: 'Basic editing' }] },
      },
      {
        name: 'Growth Video Pack',
        ng: { label: 'Growth Video Pack', price: '₦150,000', features: [{ text: '2 videos' }, { text: 'Motion graphics + sound design' }, { text: '2 revisions' }] },
        usd: { label: 'Growth Video Pack', price: '$200', features: [{ text: '2 videos' }, { text: 'Motion graphics' }] },
      },
      {
        name: 'Dominance Video Pack',
        popular: true,
        ng: { label: 'Dominance Video Pack', price: '₦200,000', features: [{ text: '3 high-converting ads' }, { text: 'Script assistance' }, { text: 'Advanced motion + effects' }, { text: '3 revisions' }] },
        usd: { label: 'Dominance Pack', price: '$300', features: [{ text: '3 ad videos' }, { text: 'Script + strategy support' }, { text: 'High-end editing' }] },
      },
    ],
  },
];