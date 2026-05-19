import { useState, useEffect } from "react";
import bannerDesktop from "@/assets/banner.jpg";
import bannerMobile from "@/assets/bannermobile.jpg";

const BannerSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full pt-20 pb-0 bg-background">
      <div className="w-full overflow-hidden">
        <img 
          src={isMobile ? bannerMobile : bannerDesktop} 
          alt="Banner Principal" 
          className="w-full h-auto object-cover max-h-[600px] md:max-h-[800px]"
          loading="eager"
        />
      </div>
    </section>
  );
};

export default BannerSection;
