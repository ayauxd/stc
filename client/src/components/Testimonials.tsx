import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, BarChart3, ArrowUpRight, ThumbsUp } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      quote: "Softworks transformed our operations. Their agentic AI automated processes we never thought possible, boosting efficiency significantly.",
      author: "Alex Chen",
      position: "CTO",
      company: "TechSolutions Inc.",
      industry: "Software",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
      stats: [
        { label: "Efficiency Increase", value: "87%" },
        { label: "Cost Reduction", value: "42%" },
        { label: "ROI Timeframe", value: "6 months" }
      ]
    },
    {
      quote: "The ROI from Softworks' autonomous systems exceeded expectations by 300%. It's been a complete game-changer for our global logistics.",
      author: "Sarah Johnson",
      position: "Operations Director",
      company: "GlobalTrade Ltd.",
      industry: "Logistics",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
      stats: [
        { label: "ROI", value: "300%" },
        { label: "Shipping Time", value: "-35%" },
        { label: "Error Rate", value: "-78%" }
      ]
    },
    {
      quote: "Seamless AI integration and immediate workflow improvements. Softworks delivered exactly what they promised, making us far more agile.",
      author: "Michael Rodriguez",
      position: "CEO",
      company: "Innovate Partners",
      industry: "Consulting",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
      stats: [
        { label: "Delivery Speed", value: "+65%" },
        { label: "Client Satisfaction", value: "97%" },
        { label: "Process Automation", value: "82%" }
      ]
    },
    {
      quote: "What impressed me most was how quickly their AI models adapted to our specific industry challenges. We've seen a 45% reduction in decision-making time.",
      author: "Emily Zhang",
      position: "Innovation Director",
      company: "NextGen Systems",
      industry: "Healthcare",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
      stats: [
        { label: "Decision Time", value: "-45%" },
        { label: "Patient Care", value: "+32%" },
        { label: "Compliance", value: "100%" }
      ]
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setFlippedCard(null);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setFlippedCard(null);
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
    setFlippedCard(null);
  };

  const toggleFlip = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
    
    // Reset autoplay when a card is flipped
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = setTimeout(() => {
        nextTestimonial();
      }, 10000); // Extend timeout when user is interacting
    }
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If swipe is significant enough (over 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, show next
        nextTestimonial();
      } else {
        // Swipe right, show previous
        prevTestimonial();
      }
      setTouchStart(0);
    }
  };

  // Auto-rotate testimonials unless a card is flipped
  useEffect(() => {
    if (flippedCard === null) {
      autoplayRef.current = setTimeout(() => {
        nextTestimonial();
      }, 8000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [activeIndex, flippedCard]);

  // Visibility API to pause when not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      } else if (!document.hidden && flippedCard === null) {
        autoplayRef.current = setTimeout(() => {
          nextTestimonial();
        }, 8000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [flippedCard]);

  // For desktop, get the three visible testimonials (current, current+1, current+2)
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((activeIndex + i) % testimonials.length);
    }
    return indices;
  };

  return (
    <section id="testimonials-section" className="py-8 md:py-12 px-4 bg-[#002B36]">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#F5F5F5]">
            Client Feedback
          </h2>
          <div className="w-20 h-1 bg-[#00BCD4] mx-auto mb-4"></div>
          <p className="text-lg text-[#E0E0E0] max-w-2xl mx-auto">
            See how our AI solutions have transformed businesses across industries
          </p>
        </div>

        {/* Industry Filter Pills - New Feature */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button className="px-4 py-1.5 rounded-full text-sm bg-[#00BCD4] text-white">
            All Industries
          </button>
          {Array.from(new Set(testimonials.map(t => t.industry))).map((industry, idx) => (
            <button key={idx} className="px-4 py-1.5 rounded-full text-sm bg-[#003747] text-[#E0E0E0] hover:bg-[#004757] transition-colors">
              {industry}
            </button>
          ))}
        </div>

        {/* Desktop Testimonials - Card Grid with Flip Effect */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
            {getVisibleIndices().map((index) => (
              <div 
                key={index}
                className="group"
                onClick={() => toggleFlip(index)}
              >
                <div className={`relative w-full h-[400px] cursor-pointer perspective-1000`}>
                  <div 
                    className={`absolute w-full h-full transition-all duration-700 preserve-3d
                              ${flippedCard === index ? 'rotate-y-180' : ''}`}
                  >
                    {/* Front of card */}
                    <div className="absolute w-full h-full backface-hidden rounded-xl bg-[#001B26] border border-[#00BCD4]/20 
                                  transition-all duration-300 hover:shadow-lg hover:shadow-[#00BCD4]/10 p-6 flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#00BCD4] p-0.5 flex-shrink-0">
                          <img 
                            src={testimonials[index].image} 
                            alt={testimonials[index].author} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-[#F5F5F5]">
                            {testimonials[index].author}
                          </h4>
                          <p className="text-xs text-[#B0BEC5]">
                            {testimonials[index].position} • {testimonials[index].company}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-[#003747] text-[#00BCD4]">
                            {testimonials[index].industry}
                          </span>
                        </div>
                      </div>
                      
                      <div className="relative flex-grow">
                        <Quote className="absolute top-0 left-0 w-8 h-8 text-[#00BCD4] opacity-10" />
                        <p className="text-[#E0E0E0] italic pt-6 pl-2">
                          "{testimonials[index].quote}"
                        </p>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-[#00BCD4]/10 flex justify-between items-center">
                        <div className="flex">
                          {[...Array(testimonials[index].rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#00BCD4] text-[#00BCD4]" />
                          ))}
                        </div>
                        <button className="text-[#00BCD4] text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          View Results <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Back of card - Statistics */}
                    <div className="absolute w-full h-full backface-hidden rounded-xl bg-[#003747] border border-[#00BCD4]/40
                                   rotate-y-180 p-6 flex flex-col">
                      <h4 className="text-xl font-semibold text-[#F5F5F5] mb-2 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-[#00BCD4]" /> 
                        Result Metrics
                      </h4>
                      <p className="text-sm text-[#B0BEC5] mb-6">
                        Verified improvements after implementing our solutions at {testimonials[index].company}
                      </p>
                      
                      <div className="flex-grow space-y-6">
                        {testimonials[index].stats.map((stat, idx) => (
                          <div key={idx} className="group">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-[#E0E0E0]">{stat.label}</span>
                              <span className="text-[#00BCD4] font-semibold">{stat.value}</span>
                            </div>
                            <div className="h-2 w-full bg-[#001B26] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] rounded-full transform origin-left transition-all duration-1000 ease-out"
                                style={{
                                  width: idx === 0 ? '90%' : idx === 1 ? '75%' : '65%',
                                  animation: `growWidth 1.5s ease-out ${idx * 0.2}s`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-4 flex justify-between items-center">
                        <div className="flex items-center text-[#E0E0E0] text-sm">
                          <ThumbsUp className="w-4 h-4 mr-1 text-[#00BCD4]" /> 
                          Verified Results
                        </div>
                        <button className="text-[#00BCD4] text-sm flex items-center">
                          Back to Review <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={prevTestimonial}
              className="p-2.5 rounded-full transition-colors duration-300 border shadow-md 
                        focus:outline-none focus:ring-2 focus:ring-[#00BCD4] z-10
                        bg-[#003747]/90 hover:bg-[#004757] border-[#00BCD4]/30 text-[#E0E0E0]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Pagination dots */}
            <div className="flex justify-center items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`transition-all duration-300 
                            focus:outline-none focus:ring-2 focus:ring-[#00BCD4] 
                            rounded-full flex items-center justify-center
                            ${getVisibleIndices().includes(index) ? 'w-8 h-2 bg-[#00BCD4]' : 'w-2 h-2 bg-[#00BCD4]/40'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={getVisibleIndices().includes(index) ? 'true' : 'false'}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="p-2.5 rounded-full transition-colors duration-300 border shadow-md 
                        focus:outline-none focus:ring-2 focus:ring-[#00BCD4] z-10
                        bg-[#003747]/90 hover:bg-[#004757] border-[#00BCD4]/30 text-[#E0E0E0]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Testimonials - Swipeable Cards */}
        <div 
          className="md:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          ref={testimonialRef}
        >
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-all duration-500 ease-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)`, width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 p-2">
                  <div 
                    className={`rounded-xl bg-[#001B26] border border-[#00BCD4]/20 p-5
                              ${flippedCard === index ? 'bg-[#003747] border-[#00BCD4]/40' : ''}`}
                    onClick={() => toggleFlip(index)}
                  >
                    {flippedCard !== index ? (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#00BCD4] p-0.5 flex-shrink-0">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.author} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-[#F5F5F5]">
                              {testimonial.author}
                            </h4>
                            <p className="text-xs text-[#B0BEC5]">
                              {testimonial.position} • {testimonial.company}
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <Quote className="absolute top-0 left-0 w-6 h-6 text-[#00BCD4] opacity-10" />
                          <p className="text-[#E0E0E0] italic text-sm pt-5 pl-2 mb-4">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#00BCD4] text-[#00BCD4]" />
                            ))}
                          </div>
                          <button className="text-[#00BCD4] text-xs flex items-center">
                            View Results <ArrowUpRight className="w-3 h-3 ml-1" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="text-lg font-semibold text-[#F5F5F5] mb-2 flex items-center">
                          <BarChart3 className="w-4 h-4 mr-1.5 text-[#00BCD4]" /> 
                          Result Metrics
                        </h4>
                        
                        <div className="space-y-4 my-4">
                          {testimonial.stats.map((stat, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-[#E0E0E0]">{stat.label}</span>
                                <span className="text-[#00BCD4] font-semibold">{stat.value}</span>
                              </div>
                              <div className="h-1.5 w-full bg-[#001B26] rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] rounded-full"
                                  style={{
                                    width: idx === 0 ? '90%' : idx === 1 ? '75%' : '65%',
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <button className="text-[#00BCD4] text-xs flex items-center">
                          Back to Review <ArrowUpRight className="w-3 h-3 ml-1" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`mx-1 transition-all duration-300 
                          rounded-full ${
                  activeIndex === index 
                    ? 'w-6 h-2 bg-[#00BCD4]' 
                    : 'w-2 h-2 bg-[#00BCD4]/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center px-6 py-2.5 text-sm font-medium 
                           bg-transparent border border-[#00BCD4]/30 text-[#00BCD4] 
                           hover:bg-[#00BCD4]/10 rounded-md transition-colors duration-300 
                           focus:outline-none focus:ring-2 focus:ring-[#00BCD4]">
            View all client results
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
      
      {/* Extra CSS for 3D card flip effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes growWidth {
          from { width: 0; }
          to { width: 100%; }
        }
      `}} />
    </section>
  );
};

export default Testimonials; 