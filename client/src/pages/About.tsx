import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Award, Globe, Target, Users, Check, ChevronRight, ArrowDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
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

  const teamMembers = [
    {
      name: 'Jennifer Patel',
      role: 'CEO & Co-Founder',
      bio: 'Ex-Google AI researcher with 15+ years experience in enterprise AI solutions.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    {
      name: 'David Chen',
      role: 'CTO & Co-Founder',
      bio: 'ML systems architect specialized in building production-grade AI infrastructure.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    {
      name: 'Maria Rodriguez',
      role: 'Head of AI Research',
      bio: 'PhD in Computer Science, leading our efforts in LLM fine-tuning and RAG systems.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    {
      name: 'Alex Kim',
      role: 'SVP Client Solutions',
      bio: 'Specializes in translating complex AI capabilities into practical business solutions.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
  ];

  const values = [
    {
      title: 'Ethical AI Development',
      description: 'We prioritize responsible AI with transparency, fairness, and accountability in all our systems.',
      icon: <Award className="w-6 h-6 text-[#00BCD4]" />,
    },
    {
      title: 'Client Success',
      description: 'Your business outcomes are our primary metric for success, not just technical achievements.',
      icon: <Target className="w-6 h-6 text-[#00BCD4]" />,
    },
    {
      title: 'Research-Driven',
      description: 'We continuously push the boundaries of what\'s possible through in-house R&D.',
      icon: <Globe className="w-6 h-6 text-[#00BCD4]" />,
    },
    {
      title: 'Collaborative Approach',
      description: 'We work as an extension of your team, ensuring knowledge transfer and capability building.',
      icon: <Users className="w-6 h-6 text-[#00BCD4]" />,
    },
  ];

  const milestones = [
    { year: '2018', title: 'Founded in San Francisco', description: 'Started as an AI research consultancy focused on NLP solutions.' },
    { year: '2020', title: 'First Enterprise Platform', description: 'Launched our flagship autonomous agent platform for business process automation.' },
    { year: '2021', title: 'Series A Funding', description: 'Secured $12M in funding to expand our team and AI capabilities.' },
    { year: '2022', title: 'Global Expansion', description: 'Opened offices in London and Singapore to serve international clients.' },
    { year: '2023', title: 'Agentic AI Focus', description: 'Pioneered specialized agentic AI systems for industry-specific applications.' },
  ];

  return (
    <div className="relative">
      {/* Grid pattern overlay - applied globally */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-grid-pattern"></div>
      
      <Header isSticky={isScrolled} />
      
      {/* Hero section - with improved visual design */}
      <section className="relative bg-[#001B26] pt-20 pb-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#00BCD4_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#002B36] to-transparent z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-10">
              <div className="text-sm font-medium text-[#00BCD4] mb-3 uppercase tracking-wider">About Us</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F5F5F5]">
                Building <span className="text-[#00BCD4]">Intelligent</span> Systems for Business
              </h1>
              <p className="text-xl leading-relaxed mb-8 text-[#E0E0E0]">
                Softworks is a team of AI researchers, engineers, and strategists dedicated to transforming how businesses operate through intelligent automation.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <Link href="/contact" className="inline-flex items-center bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-medium py-3 px-6 rounded-md shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCD4] focus:ring-offset-[#001B26]">
                  Contact Us
                  <ChevronRight className="ml-1 w-5 h-5" />
                </Link>
                
                <Link href="/services" className="inline-flex items-center border border-[#00BCD4]/30 hover:bg-[#00BCD4]/10 text-[#00BCD4] font-medium py-3 px-6 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 focus:ring-offset-[#001B26]">
                  Explore Services
                </Link>
              </div>
              
              <div className="hidden md:flex justify-center mt-12">
                <a href="#mission" className="animate-bounce text-[#00BCD4]">
                  <ArrowDown className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BCD4]/20 to-[#003747]/20 rounded-lg transform rotate-3"></div>
                <div className="absolute inset-0 bg-[radial-gradient(#00BCD4_1px,transparent_1px)] [background-size:20px_20px] opacity-20 rounded-lg transform rotate-3"></div>
                <img 
                  src="/assets/team-working.jpg" 
                  alt="Softworks team" 
                  className="relative z-10 rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#00BCD4] rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section - with improved contrast */}
      <section id="mission" className="relative py-16 bg-[#002B36]">
        <div className="absolute inset-0 z-0 opacity-5 bg-[linear-gradient(to_right,#00BCD4_1px,transparent_1px),linear-gradient(to_bottom,#00BCD4_1px,transparent_1px)] [background-size:40px_40px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#F5F5F5]">Our Mission</h2>
            <div className="w-16 h-1 bg-[#00BCD4] mx-auto mb-6"></div>
            <p className="text-xl leading-relaxed text-[#E0E0E0]">
              To democratize advanced AI capabilities by making them accessible, 
              practical, and transformative for businesses of all sizes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group bg-[#001B26] p-6 rounded-lg border border-[#00BCD4]/20 hover:border-[#00BCD4]/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3 text-[#F5F5F5] group-hover:text-[#00BCD4] transition-colors duration-300">What We Do</h3>
              <p className="text-[#E0E0E0] mb-4">
                We build custom AI systems that automate complex business workflows, 
                integrate with existing enterprise systems, and augment human capabilities 
                through cutting-edge agentic AI.
              </p>
              <ul className="space-y-2">
                {['Autonomous AI agents', 'Custom LLM fine-tuning', 'Process automation', 'Decision intelligence systems'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-[#00BCD4] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-[#E0E0E0]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="group bg-[#001B26] p-6 rounded-lg border border-[#00BCD4]/20 hover:border-[#00BCD4]/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3 text-[#F5F5F5] group-hover:text-[#00BCD4] transition-colors duration-300">Why Choose Us</h3>
              <p className="text-[#E0E0E0] mb-4">
                Our unique combination of academic research expertise and practical 
                implementation experience allows us to deliver AI solutions that create 
                measurable business impact.
              </p>
              <ul className="space-y-2">
                {['Proven ROI across industries', 'Deeply customized solutions', 'Enterprise-grade security', 'Ongoing optimization & support'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-[#00BCD4] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-[#E0E0E0]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section - with improved visuals */}
      <section className="relative py-16 bg-[#001B26]">
        <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#00BCD4_1.5px,transparent_1.5px)] [background-size:30px_30px]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#002B36] to-transparent z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#F5F5F5]">Our Leadership Team</h2>
            <div className="w-16 h-1 bg-[#00BCD4] mx-auto mb-6"></div>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto text-[#E0E0E0]">
              Meet the experts behind Softworks' AI innovations and business strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="group bg-[#002B36] rounded-lg overflow-hidden shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-[#00BCD4]/10 hover:border-[#00BCD4]/30">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001B26] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1 text-[#F5F5F5] group-hover:text-[#00BCD4] transition-colors duration-300">{member.name}</h3>
                  <p className="text-[#00BCD4] font-medium mb-2">{member.role}</p>
                  <p className="text-[#B0BEC5] text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/team" className="inline-flex items-center text-[#00BCD4] hover:text-[#00ACC1] font-medium transition-colors duration-300">
              View the entire team
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Values Section - with improved visuals */}
      <section className="relative py-16 bg-[#002B36]">
        <div className="absolute inset-0 z-0 opacity-5 bg-[linear-gradient(to_right,#00BCD4_1px,transparent_1px),linear-gradient(to_bottom,#00BCD4_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#001B26] to-transparent z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#F5F5F5]">Our Core Values</h2>
            <div className="w-16 h-1 bg-[#00BCD4] mx-auto mb-6"></div>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto text-[#E0E0E0]">
              The principles that guide our approach to AI development and client relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="group bg-[#001B26] p-6 rounded-lg border border-[#00BCD4]/20 hover:border-[#00BCD4]/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-[#00BCD4]/10 group-hover:bg-[#00BCD4]/20 flex items-center justify-center mb-4 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#F5F5F5] group-hover:text-[#00BCD4] transition-colors duration-300">{value.title}</h3>
                <p className="text-[#B0BEC5]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Company Timeline - with improved visuals */}
      <section className="relative py-16 bg-[#001B26]">
        <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#00BCD4_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#002B36] to-transparent z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#F5F5F5]">Our Journey</h2>
            <div className="w-16 h-1 bg-[#00BCD4] mx-auto mb-6"></div>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto text-[#E0E0E0]">
              Key milestones that have shaped Softworks' evolution.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#00BCD4]/50 via-[#00BCD4] to-[#00BCD4]/50 rounded hidden md:block"></div>
            
            <div className="space-y-12 relative">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start ${
                    index % 2 === 0 ? 'md:flex-row-reverse text-right' : 'text-left'
                  }`}
                >
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
                    {index % 2 === 0 ? (
                      <div className="group bg-[#002B36] p-6 rounded-lg shadow-lg hover:shadow-xl border border-[#00BCD4]/20 hover:border-[#00BCD4]/40 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-start md:items-end w-full max-w-md">
                        <div className="text-3xl font-bold text-[#00BCD4] mb-2 group-hover:scale-110 transform transition-transform duration-300">{milestone.year}</div>
                        <h3 className="text-xl font-semibold mb-1 text-[#F5F5F5] group-hover:text-[#00BCD4] transition-colors duration-300">{milestone.title}</h3>
                        <p className="text-[#B0BEC5]">{milestone.description}</p>
                      </div>
                    ) : null}
                  </div>
                  
                  <div className="relative flex justify-center items-center">
                    <div className="hidden md:block w-8 h-8 bg-[#00BCD4] rounded-full border-4 border-[#001B26] z-10"></div>
                  </div>
                  
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                    {index % 2 === 1 ? (
                      <div className="group bg-[#002B36] p-6 rounded-lg shadow-lg hover:shadow-xl border border-[#00BCD4]/20 hover:border-[#00BCD4]/40 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-start w-full max-w-md">
                        <div className="text-3xl font-bold text-[#00BCD4] mb-2 group-hover:scale-110 transform transition-transform duration-300">{milestone.year}</div>
                        <h3 className="text-xl font-semibold mb-1 text-[#F5F5F5] group-hover:text-[#00BCD4] transition-colors duration-300">{milestone.title}</h3>
                        <p className="text-[#B0BEC5]">{milestone.description}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-b from-[#001B26] to-[#002B36]">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#00BCD4_2px,transparent_2px)] [background-size:30px_30px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#F5F5F5]">
              Ready to transform your business with AI?
            </h2>
            <p className="text-xl leading-relaxed mb-8 text-[#E0E0E0]">
              Let's discuss how our AI solutions can drive growth and efficiency for your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-medium py-3 px-8 rounded-md shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,188,212,0.4)]">
                Schedule a Consultation
              </Link>
              <Link href="/services" className="inline-flex items-center border border-[#00BCD4]/30 hover:bg-[#00BCD4]/10 text-[#00BCD4] font-medium py-3 px-8 rounded-md transition-colors duration-300">
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
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
};

export default About; 