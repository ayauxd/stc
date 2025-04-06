import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-context";
import { scrollToSection } from "@/lib/utils";
import { ArrowRight, X, PhoneCall } from "lucide-react";
import heroImage from "/assets/hero-image.png";

export default function Hero() {
  const { theme } = useTheme();
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  
  const heroImagePath = heroImage;

  useEffect(() => {
    console.log("[Hero] VITE_BASE_URL:", import.meta.env.BASE_URL);
    console.log("[Hero] Using image path:", heroImagePath);
  }, []);
  
  const handleOpenForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConsultationForm(true);
  };
  
  const handleCloseForm = () => {
    setShowConsultationForm(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to your backend or API
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    });
    // Close modal
    setShowConsultationForm(false);
    // Show success message
    alert("Thank you! We'll be in touch shortly.");
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[80vh] w-full flex items-center mb-[-1px]"
    >
      {/* Full-screen background image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={heroImagePath}
          alt="AI Neural Network Visualization" 
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for better text contrast with extended gradient */}
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-black/60 via-[#001B26]/85 to-[#002B36]' 
            : 'bg-gradient-to-b from-black/30 via-white/70 to-[#F5F5F5]'
        }`}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white drop-shadow-md">
            Design Autonomous Systems That Think, Act, and Scale.
          </h1>
          <p className="text-base sm:text-lg mb-6 max-w-xl leading-relaxed text-white/90 drop-shadow">
            We don't just integrate AI—we rewire how your operations think using adaptive agentic workflows (AI systems that can act independently to achieve goals).
          </p>
          <div className="flex flex-wrap gap-5">
            <a 
              href="#services-section" 
              onClick={(e) => scrollToSection('services-section', e)}
              className="inline-flex items-center gap-2 font-medium py-3 px-6 md:px-8 h-[44px] rounded-md transition-all duration-300 transform hover:-translate-y-0.5 bg-[#00BCD4] hover:bg-[#00ACC1] text-white shadow-lg hover:shadow-xl"
              aria-label="Learn More"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#101520] border border-[#00BCD4]/10 rounded-xl shadow-xl overflow-hidden w-full max-w-md animate-scale-in">
            <div className="border-b border-[#00BCD4]/20 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <PhoneCall className="w-5 h-5 mr-2 text-[#00BCD4]" />
                <span className="font-medium text-white">Schedule a Consultation</span>
              </div>
              <button 
                onClick={handleCloseForm}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#1A2331] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.phone}
                    onChange={handleChange}
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
                    value={formData.company}
                    onChange={handleChange}
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
                    value={formData.message}
                    onChange={handleChange}
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
