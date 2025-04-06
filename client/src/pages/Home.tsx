import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import TrustedBySection from "@/components/TrustedBySection";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";
import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-context";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      {/* Grid pattern overlay - applied globally */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-grid-pattern"></div>
      
      <div className={`min-h-screen relative z-10 ${
        theme === 'dark' 
          ? 'bg-[#002B36] text-white' 
          : 'bg-white text-[#212121]'
      }`}>
        <Header isSticky={isScrolled} />
        <main>
          <div className="mb-0">
            <Hero />
          </div>
          <TrustedBySection />
          <div className="mb-0">
            <ServicesSection />
          </div>
          <div className="mb-16 md:mb-20">
            <TestimonialsSection />
          </div>
          <BlogSection />
        </main>
        <ChatAssistant />
        <Footer />
      </div>
      
      {/* CSS for grid pattern */}
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 188, 212, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 188, 212, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}} />
    </div>
  );
}
