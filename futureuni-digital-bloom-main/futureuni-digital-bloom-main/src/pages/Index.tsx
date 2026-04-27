import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SeeWhoWeAreSection from '@/components/SeeWhoWeAreSection';
import StatsBar from '@/components/StatsBar';
import ServicesSection from '@/components/ServicesSection';
import WhyUsSection from '@/components/WhyUsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TrainingProgramsSection from '@/components/TrainingProgramsSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import StartProjectSection from '@/components/StartProjectSection';
import Footer from '@/components/Footer';
import SpotifyWidget from '@/components/SpotifyWidget';
import WhatsAppButton from '@/components/WhatsAppButton';
import ChatbotWidget from '@/components/ChatbotWidget';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      <div className={`min-h-screen bg-background ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Navbar />
        <HeroSection />
        <SeeWhoWeAreSection />
        <StatsBar />
        <ServicesSection />
        <WhyUsSection />
        <HowItWorksSection />
        <TrainingProgramsSection />
        <PortfolioSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <StartProjectSection />
        <Footer />
        <SpotifyWidget />
        <WhatsAppButton />
        <ChatbotWidget />
      </div>
    </>
  );
};

export default Index;
