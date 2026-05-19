import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner2Desktop from "@/assets/banner2.png";
import banner2Mobile from "@/assets/banner2mobile.png";
import banner1Desktop from "@/assets/banner.jpg";
import banner1Mobile from "@/assets/bannermobile.jpg";

const BannerSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDES = [
    {
      id: "banner2",
      desktop: banner2Desktop,
      mobile: banner2Mobile,
      alt: "Banner Especial Megaprint Itaúna",
    },
    {
      id: "banner1",
      desktop: banner1Desktop,
      mobile: banner1Mobile,
      alt: "Banner Principal Megaprint Itaúna",
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // 5 seconds auto-play

    return () => clearInterval(interval);
  }, [isHovered, SLIDES.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  // Touch handlers for mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    if (diffX > 50) {
      // Swipe left -> next slide
      handleNext();
    } else if (diffX < -50) {
      // Swipe right -> prev slide
      handlePrev();
    }
    // Reset touch coordinates
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="w-full pt-20 pb-0 bg-background">
      <div 
        className="relative w-full overflow-hidden select-none group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slide Wrapper with CSS Cross-fade */}
        <div className="relative w-full h-auto">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.id}
                className={`w-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10 relative" : "opacity-0 z-0 absolute inset-0 pointer-events-none"
                }`}
              >
                <img 
                  src={isMobile ? slide.mobile : slide.desktop} 
                  alt={slide.alt} 
                  className="w-full h-auto object-cover max-h-[600px] md:max-h-[800px]"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-background/60 backdrop-blur-md text-foreground border border-border/20 shadow-lg opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground focus:outline-none"
          aria-label="Banner anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-background/60 backdrop-blur-md text-foreground border border-border/20 shadow-lg opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground focus:outline-none"
          aria-label="Próximo banner"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Glassmorphic Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 px-3 py-2 rounded-full bg-background/40 backdrop-blur-md border border-border/20 shadow-sm">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                idx === currentSlide 
                  ? "w-6 bg-primary shadow-md shadow-primary/20" 
                  : "w-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Ir para o banner ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
