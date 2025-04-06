import { useState, useEffect } from "react";
import { ArrowUp, X, PhoneCall } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/lib/theme-context";
import { scrollToSection } from "@/lib/utils";
import { useLocation } from "wouter";

interface HeaderProps {
  isSticky: boolean;
}

export default function Header({ isSticky }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const { theme } = useTheme();
  const [location] = useLocation();

  const navLinks = [
    { href: location === "/" ? "#hero" : "/", label: "Home", sectionId: "hero", isExternal: false },
    { href: location === "/" ? "#services-section" : "/#services-section", label: "Services", sectionId: "services-section", isExternal: false },
    { href: "/insights", label: "Insights", sectionId: "", isExternal: true },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOpenContactForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContactForm(true);
    setIsMobileMenuOpen(false);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header 
        className={`py-4 px-6 lg:px-12 fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md 
          ${isSticky ? "py-2 shadow-lg backdrop-blur-lg" : "py-4"}
          bg-white/90 text-[#212121]`}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <a 
              href={location === "/" ? "#hero" : "/"}
              onClick={(e) => { 
                setIsMobileMenuOpen(false); 
                if (location === "/") {
                  scrollToSection('hero', e);
                }
              }}
              className="flex items-center group transition-transform duration-300 hover:scale-105"
            >
              <img src="/assets/logo.png" alt="Softworks Logo" className="w-10 h-10 mr-3 object-contain" />
              <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold transition-colors duration-300 text-[#212121] tracking-wide">
                  SOFTWORKS
                </h1>
                <p className="text-xs tracking-widest text-[#00BCD4] w-full text-center">TRADING COMPANY</p>
              </div>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <nav className="flex items-center space-x-6 mr-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { 
                      setIsMobileMenuOpen(false);
                      if (!link.isExternal && location === "/" && link.sectionId) {
                        scrollToSection(link.sectionId, e);
                      }
                    }}
                    className={`font-medium transition-all duration-300 hover:text-[#00BCD4]
                      border-b-2 ${location === link.href ? 'border-[#00BCD4] text-[#00BCD4]' : 'border-transparent'} hover:border-[#00BCD4] pb-1
                      text-[#212121]`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleOpenContactForm}
                  className="flex items-center gap-1 bg-[#00BCD4] hover:bg-[#00ACC1] text-white px-4 py-2 rounded-md transition-all duration-300 transform hover:-translate-y-0.5 shadow hover:shadow-lg text-sm font-medium"
                >
                  <PhoneCall className="w-4 h-4 mr-1" />
                  Schedule a Consultation
                </button>
                <ThemeToggle />
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <ThemeToggle className="mr-3" />
              <button 
                className="focus:outline-none focus:ring-2 focus:ring-[#00BCD4] rounded p-1 text-[#212121]"
                aria-label="Menu"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 pt-24 px-6 md:hidden transition-opacity duration-300 backdrop-blur-lg
          bg-white/95 text-[#212121]
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col space-y-6 text-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { 
                setIsMobileMenuOpen(false);
                if (!link.isExternal && location === "/" && link.sectionId) {
                  scrollToSection(link.sectionId, e);
                }
              }}
              className="py-2 text-lg font-medium border-b text-[#212121] border-gray-200"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={handleOpenContactForm}
            className="flex items-center justify-center gap-1 bg-[#00BCD4] hover:bg-[#00ACC1] text-white px-4 py-2 rounded-md transition-all duration-300 shadow w-full mt-4"
          >
            <PhoneCall className="w-4 h-4 mr-1" />
            Schedule a Consultation
          </button>
        </nav>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-[#00BCD4] text-white rounded-full p-3 shadow-lg hover:bg-[#00ACC1] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,188,212,0.4)] z-50 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCD4]"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#101520] border border-[#00BCD4]/10 rounded-xl shadow-xl overflow-hidden w-full max-w-md animate-scale-in">
            <div className="border-b border-[#00BCD4]/20 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <PhoneCall className="w-5 h-5 mr-2 text-[#00BCD4]" />
                <span className="font-medium text-white">Schedule a Consultation</span>
              </div>
              <button 
                onClick={handleCloseContactForm}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#1A2331] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for your request! We'll contact you shortly.");
                handleCloseContactForm();
              }}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    className="w-full rounded-md bg-[#1A2331] border border-[#00BCD4]/30 text-white p-2 focus:outline-none focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    className="w-full rounded-md bg-[#1A2331] border border-[#00BCD4]/30 text-white p-2 focus:outline-none focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    className="w-full rounded-md bg-[#1A2331] border border-[#00BCD4]/30 text-white p-2 focus:outline-none focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    id="company"
                    name="company"
                    className="w-full rounded-md bg-[#1A2331] border border-[#00BCD4]/30 text-white p-2 focus:outline-none focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-1">
                    Service Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full rounded-md bg-[#1A2331] border border-[#00BCD4]/30 text-white p-2 focus:outline-none focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]"
                    required
                  >
                    <option value="" disabled selected>Select an AI service...</option>
                    <option value="ai-strategy">AI Strategy Consulting</option>
                    <option value="autonomous-agents">Autonomous Agents</option>
                    <option value="workflow-automation">Workflow Automation</option>
                    <option value="prompt-engineering">Prompt Engineering</option>
                    <option value="custom-solutions">Custom AI Solutions</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Project Description *
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your project needs and business goals"
                    className="w-full rounded-md bg-[#1A2331] border border-[#00BCD4]/30 text-white p-2 focus:outline-none focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4] resize-none"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-400 mb-1">
                    Project Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline" 
                    className="w-full rounded-md bg-[#1A2331] border border-[#00BCD4]/30 text-white p-2 focus:outline-none focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]"
                  >
                    <option value="" disabled selected>When do you need this implemented?</option>
                    <option value="immediate">Immediately</option>
                    <option value="1-3months">1-3 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="6-12months">6-12 months</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full p-2 mt-2 rounded-md bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-medium transition-colors"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
