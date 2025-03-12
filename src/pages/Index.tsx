
import SignupForm from "@/components/SignupForm";
import ServiceCard from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, MapPin, CalendarIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: containerRef });
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is logged in by looking for email in localStorage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  // Parallax effects
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleY = useTransform(scrollY, [0, 300], [0, -100]);
  
  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden"
    >
      {/* Header with user email if logged in */}
      {userEmail && (
        <div className="fixed top-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-sm rounded-bl-lg shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{userEmail}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-24">
        {/* Hero Section with Parallax Effect */}
        <motion.div 
          className="text-center mb-36 relative"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Empower Your Health
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Your Guide to Understanding Your Health Like Never Before
          </motion.p>
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </motion.div>
        </motion.div>

        {/* About Doctor Section with Image */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-36">
          <ScrollReveal 
            delay={0.2} 
            direction="left"
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div 
                className="relative w-64 h-80 mx-auto md:mx-0 mb-8 overflow-hidden rounded-2xl shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src="/lovable-uploads/904e6abc-6924-451a-9c55-df1221a38ba7.png"
                  alt="Dr. Shashank Neupane"
                  className="object-cover w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
              <h2 className="text-3xl font-semibold text-gray-900">Dr. Shashank Neupane</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                A dedicated physician, researcher, and health educator with experience in Nepal and the United States.
                Specializing in making complex medical information easily understandable through interactive demonstrations and personalized care.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <motion.a 
                href="https://maps.google.com" 
                target="_blank"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-5 w-5" />
                <span>Kathmandu, Nepal</span>
              </motion.a>
              <motion.a 
                href="mailto:Shashankneupane5107@gmail.com"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-5 w-5" />
                <span>Shashankneupane5107@gmail.com</span>
              </motion.a>
            </div>
          </ScrollReveal>
          
          <SignupForm />
        </div>

        {/* Services Section */}
        <ScrollReveal className="mb-36" delay={0.3}>
          <h2 className="text-4xl font-semibold text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="In-Person Consultation"
              price="NPR 1,000"
              description="Experience personalized health education at your doorstep"
              icon="/icons/home-visit.png"
              imageSrc="/lovable-uploads/in-person.jpeg"
              qrCode="/lovable-uploads/f23102a4-77e9-4620-a683-330f02767496.png"
              details="Experience personalized health education at your doorstep. We use interactive demonstrations, models, and real-time explanations to help you fully understand your health condition."
            />
            
            <ServiceCard
              title="Virtual Consultation"
              price="NPR 500"
              description="Connect with us from anywhere"
              icon="/icons/virtual-consult.png"
              imageSrc="/lovable-uploads/virtual.jpeg"
              qrCode="/lovable-uploads/f23102a4-77e9-4620-a683-330f02767496.png"
              details="Connect with us virtually for comprehensive health guidance. Get detailed explanations and visual aids to understand your condition better, all from the comfort of your home."
            />
            
            <ServiceCard
              title="Smart Air Purifier"
              price="Coming Soon - $80 to $100"
              description="Advanced HEPA Filtration"
              icon="/icons/air-purifier.png"
              imageSrc="/lovable-uploads/airpurifier.jpeg"
              details="Our upcoming smart air purifier features advanced HEPA filtration technology, perfect for Kathmandu's challenging air quality. Pre-register now to be the first to know when it launches."
            />
          </div>
        </ScrollReveal>
        
        {/* Future Innovations Section */}
        <ScrollReveal delay={0.4} direction="up" distance={80}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-12 rounded-3xl shadow-sm">
            <h2 className="text-3xl font-semibold text-center mb-8">Future Innovations</h2>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center space-x-8">
                <div className="w-1/3">
                  <motion.img 
                    src="/lovable-uploads/airpurifier.jpeg" 
                    alt="Smart Air Purifier" 
                    className="rounded-xl shadow-md"
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="w-2/3 space-y-4">
                  <h3 className="text-2xl font-medium text-gray-900">Smart Air Purifier</h3>
                  <p className="text-gray-600">Our upcoming smart air purifier features advanced HEPA filtration technology, designed specifically for Kathmandu's challenging air quality. Be the first to know when it launches!</p>
                  <div className="flex items-center space-x-4">
                    <p className="font-medium text-primary">$80 - $100</p>
                    <motion.button 
                      className="px-4 py-2 bg-primary text-white rounded-lg flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Pre-register Now</span>
                      <CalendarIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Index;
