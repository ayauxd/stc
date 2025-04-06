import { useRef, useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';
import useEmblaCarousel from 'embla-carousel-react';
import { useDebouncedCallback } from 'use-debounce';
// Import logos from simple-icons
import * as SimpleIcons from 'simple-icons';

// Define partner companies with their simple-icons identifiers - only the ones requested
const partnerCompanies = [
  { name: 'OpenAI', icon: SimpleIcons.siOpenai },
  { name: 'Anthropic', icon: SimpleIcons.siArtifacthub },
  { name: 'Eleven Labs', icon: SimpleIcons.siAudiomack },
  { name: 'Google Gemini', icon: SimpleIcons.siGoogle },
  { name: 'Make', icon: SimpleIcons.siMake },
  { name: 'n8n', icon: SimpleIcons.siNodedotjs },
  { name: 'Zapier', icon: SimpleIcons.siZapier }
];

export default function TrustedBySection() {
  const { theme } = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: true,
  });

  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Function to scroll to next slide
  const scrollNext = useDebouncedCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, 50);

  // Setup auto-scrolling
  useEffect(() => {
    if (!emblaApi) return;

    // Clear any existing interval
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    // Set up auto-scrolling interval
    autoPlayRef.current = setInterval(() => {
      scrollNext();
    }, 3000); // scroll every 3 seconds

    // Clean up on unmount
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [emblaApi, scrollNext]);

  return (
    <section
      className={`py-16 ${
        theme === 'dark' ? 'bg-[#001B26]' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-center text-2xl sm:text-3xl font-bold mb-12 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Technology Supported By
        </h2>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-center">
            {/* Double the companies for smoother infinite scrolling */}
            {[...partnerCompanies, ...partnerCompanies].map((company, index) => (
              <div 
                key={`${company.name}-${index}`} 
                className="flex-shrink-0 mx-8 h-20 flex items-center justify-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="110" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  className="transition-all duration-300 hover:opacity-100"
                  style={{
                    fill: 'none',
                    stroke: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)',
                    strokeWidth: '0.5',
                    opacity: theme === 'dark' ? 0.7 : 0.6,
                    filter: 'grayscale(100%)',
                  }}
                >
                  <path
                    d={company.icon.path}
                    fill={theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)'}
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 