'use client';

import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import ProblemSolution from '@/components/ProblemSolution';
import Services from '@/components/Services';
import HowWeWork from '@/components/HowWeWork';
import Technologies from '@/components/Technologies';
import Portfolio from '@/components/Portfolio';
import Statistics from '@/components/Statistics';
import Testimonials from '@/components/Testimonials';
import WhyUs from '@/components/WhyUs/WhyUs';
import Advantages from '@/components/Advantages';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import SeoContent from '@/components/SeoContent';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import CookieBanner from '@/components/CookieBanner';
import ThemeProvider from '@/components/ThemeProvider';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import StickyCTA from '@/components/StickyCTA';
import PricingCalculator from '@/components/PricingCalculator';

export default function Home() {
  return (
    <ThemeProvider>
    <div className="w-full min-h-screen flex flex-col">
      <Preloader />
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <SocialProof />
        <ProblemSolution />
        <Services />
        <HowWeWork />
        <Technologies />
        <Portfolio />
        <Statistics />
        <Testimonials />
        <WhyUs />
        <PricingCalculator />
        <Advantages />
        <FAQ />
        <ContactForm />
      </main>
      <SeoContent />
      <Footer />
      <FloatingButtons />
      <StickyCTA />
      <ExitIntentPopup />
      <CookieBanner />
    </div>
    </ThemeProvider>
  );
}
