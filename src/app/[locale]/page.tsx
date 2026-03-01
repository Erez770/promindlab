import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TechStrip from '@/components/TechStrip';
import ProblemSolution from '@/components/ProblemSolution';
import WhyUs from '@/components/WhyUs/WhyUs';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Services from '@/components/Services';
import PricingCalculator from '@/components/PricingCalculator';
import HowWeWork from '@/components/HowWeWork';
import Technologies from '@/components/Technologies';
import CmsSection from '@/components/CmsSection';
import TeamSection from '@/components/TeamSection';
import Statistics from '@/components/Statistics';
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

export default function Home() {
  return (
    <ThemeProvider>
    <div className="w-full min-h-screen flex flex-col">
      <Preloader />
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <TechStrip />
        <ProblemSolution />
        <WhyUs />
        <Portfolio />
        <Testimonials />
        <Services />
        <PricingCalculator />
        <HowWeWork />
        <Technologies />
        <CmsSection />
        <TeamSection />
        <Statistics />
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
