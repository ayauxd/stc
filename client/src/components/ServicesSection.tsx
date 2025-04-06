import { BrainCircuit, Bot, Workflow, BarChart3 } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { scrollToSection } from "@/lib/utils";
import { useEffect, useState } from "react";
import { X, PhoneCall } from "lucide-react";

export default function ServicesSection() {
  const { theme } = useTheme();
  const [showContactForm, setShowContactForm] = useState(false);
  
  const services = [
    {
      icon: <BrainCircuit className="w-12 h-12 text-[#00BCD4] mb-5" />,
      title: "AI Strategy Consulting",
      description: "Maximize ROI and transform your business with a tailored AI roadmap designed for impact.",
      image: "/assets/ai-strategy.png"
    },
    {
      icon: <Bot className="w-12 h-12 text-[#00BCD4] mb-5" />,
      title: "Autonomous Agents",
      description: "Increase efficiency by building specialized AI assistants that handle complex workflows autonomously.",
      image: "/assets/autonomous-agents.png"
    },
    {
      icon: <Workflow className="w-12 h-12 text-[#00BCD4] mb-5" />,
      title: "Workflow Automation",
      description: "Achieve continuous operation and adaptability with self-optimizing, AI-driven automated systems.",
      image: "/assets/workflow-automation.png"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-[#00BCD4] mb-5" />,
      title: "Prompt Engineering",
      description: "Measure AI system effectiveness with real-time metrics and continuous improvement insights for your operations.",
      image: "/assets/prompt-engineering.png"
    }
  ];

  useEffect(() => {
    console.log("[Services] VITE_BASE_URL:", import.meta.env.BASE_URL);
    services.forEach((service, index) => {
      console.log(`[Services ${index}] Using image path:`, service.image);
    });
  }, []);

  const handleOpenContactForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  // Removed local scrollToSection function, using imported utility

  return (
    <section id="services-section" className={`py-24 md:py-28 px-6 lg:px-12 ${
      theme === 'dark' 
        ? 'bg-[#002B36]' 
        : 'bg-[#F5F5F5]'
    }`}>
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-[#F5F5F5]' : 'text-[#212121]'
          }`}>
            AI Solutions for Modern Businesses
          </h2>
          <div className={`w-20 h-1 bg-[#00BCD4] mx-auto mb-6`}></div>
          <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-[#E0E0E0]' : 'text-[#424242]'
          }`}>
            From initial proof of concept to enterprise-scale deployment, our AI services help you achieve immediate value with long-term adaptability.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            return (
              <div
                key={index} 
                className={`rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  theme === 'dark'
                    ? 'bg-[#001B26] hover:shadow-[0_8px_30px_rgba(0,188,212,0.15)]' 
                    : 'bg-white'
                }`}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={`${service.title} illustration`} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-[#F5F5F5]' : 'text-[#212121]'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`${
                    theme === 'dark' ? 'text-[#B0BEC5]' : 'text-[#616161]'
                  }`}>
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-20 text-center">
          <button
            onClick={handleOpenContactForm}
            className="inline-flex items-center bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-medium py-3 px-8 rounded-md shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,188,212,0.4)]"
          >
            <PhoneCall className="w-5 h-5 mr-2" />
            <span>Schedule a Consultation</span>
          </button>
        </div>
      </div>

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
    </section>
  );
}