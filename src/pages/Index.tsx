
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

// Import our new components
import HeroSection from "@/components/home/HeroSection";
import ProfileSection from "@/components/home/ProfileSection";
import ServicesSection from "@/components/home/ServicesSection";
import InnovationSection from "@/components/home/InnovationSection";
import ContactSection from "@/components/home/ContactSection";
import Navbar from "@/components/home/Navbar";
import UserInfo from "@/components/home/UserInfo";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: containerRef });
  const { user } = useAuth();
  
  // Parallax effects for different sections
  const profileSectionY = useTransform(scrollY, [200, 500], [100, 0]);
  const profileSectionOpacity = useTransform(scrollY, [200, 500], [0, 1]);
  
  const servicesSectionY = useTransform(scrollY, [600, 900], [100, 0]);
  const servicesSectionOpacity = useTransform(scrollY, [600, 900], [0, 1]);
  
  const innovationSectionY = useTransform(scrollY, [1000, 1300], [100, 0]);
  const innovationSectionOpacity = useTransform(scrollY, [1000, 1300], [0, 1]);
  
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  
  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden"
    >
      {/* Fixed navigation */}
      <Navbar navOpacity={navOpacity} user={user} />
      
      {/* User profile display */}
      {user?.isAuthenticated && <UserInfo user={user} />}

      <div className="container mx-auto px-4">
        {/* Hero Section with 3D Parallax Effect */}
        <HeroSection scrollProgress={{ scrollY }} />

        {/* About Doctor Section with Image */}
        <ProfileSection 
          profileSectionY={profileSectionY} 
          profileSectionOpacity={profileSectionOpacity}
          user={user}
        />

        {/* Services Section */}
        <ServicesSection 
          servicesSectionY={servicesSectionY} 
          servicesSectionOpacity={servicesSectionOpacity}
        />
        
        {/* Future Innovations Section */}
        <InnovationSection 
          innovationSectionY={innovationSectionY} 
          innovationSectionOpacity={innovationSectionOpacity}
        />
        
        {/* Contact Section */}
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
