
import SignupForm from "@/components/SignupForm";
import ServiceCard from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";
import PreRegisterForm from "@/components/PreRegisterForm";
import { Mail, MapPin, CalendarIcon } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: containerRef });
  const { user } = useAuth();
  
  // Advanced parallax effects with 3D depth
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleY = useTransform(scrollY, [0, 300], [0, -100]);
  const titleZ = useTransform(scrollY, [0, 300], [0, -100]);
  
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
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 py-4 px-6"
        style={{ opacity: navOpacity }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            className="text-primary font-semibold text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Empower Health
          </motion.div>
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Services</a>
            <a href="#innovations" className="text-gray-700 hover:text-primary transition-colors">Innovations</a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
            {user?.isAuthenticated ? (
              <Link to="/admin" className="text-primary hover:text-primary/80 transition-colors">Admin</Link>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
      
      {/* User profile display */}
      {user?.isAuthenticated && (
        <div className="fixed top-16 right-6 z-50 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              {user.firstName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.firstName} {user.lastName}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Hero Section with 3D Parallax Effect */}
        <div className="h-screen flex items-center justify-center relative overflow-hidden">
          <motion.div 
            className="text-center relative z-10"
            style={{ 
              scale: titleScale, 
              opacity: titleOpacity, 
              y: titleY,
              z: titleZ,
              perspective: "1000px",
              rotateX: useTransform(scrollY, [0, 300], [0, -10])
            }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Empower Your Health
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Your Guide to Understanding Your Health Like Never Before
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.a 
                href="#services"
                className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Services</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* 3D Animated Background Elements */}
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div 
              className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
              style={{ 
                y: useTransform(scrollY, [0, 300], [0, -50]),
                scale: useTransform(scrollY, [0, 300], [1, 1.2]),
              }}
            />
            <motion.div 
              className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              style={{ 
                y: useTransform(scrollY, [0, 300], [0, -20]),
                scale: useTransform(scrollY, [0, 300], [1, 0.8]),
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              style={{ 
                y: useTransform(scrollY, [0, 300], [0, 30]),
                scale: useTransform(scrollY, [0, 300], [1, 1.1]),
              }}
            />
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center">
              <motion.div 
                className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* About Doctor Section with Image */}
        <motion.div 
          className="py-24 relative z-10"
          style={{ opacity: profileSectionOpacity, y: profileSectionY }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal 
              delay={0.2} 
              direction="left"
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div 
                  className="relative w-64 h-80 mx-auto md:mx-0 mb-8 overflow-hidden rounded-2xl shadow-lg"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)",
                    transition: { duration: 0.4 }
                  }}
                >
                  <motion.div 
                    className="w-full h-full"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <img
                      src="/lovable-uploads/904e6abc-6924-451a-9c55-df1221a38ba7.png"
                      alt="Dr. Shashank Neupane"
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">Dr. Shashank Neupane</p>
                      <p className="text-xs">Health Educator</p>
                    </div>
                  </motion.div>
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
            
            <AnimatePresence mode="wait">
              {!user?.isAuthenticated ? <SignupForm /> : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-4">Welcome, {user.firstName}!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for joining us on this journey to better health understanding. Explore our services below or visit your profile to manage your appointments.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div 
          id="services" 
          className="py-24 relative z-10"
          style={{ opacity: servicesSectionOpacity, y: servicesSectionY }}
        >
          <ScrollReveal className="mb-16" delay={0.3}>
            <motion.h2 
              className="text-4xl font-semibold text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 text-center max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Experience personalized health education designed to make complex medical information easy to understand.
            </motion.p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ServiceCard
              title="In-Person Consultation"
              price="NPR 1,000"
              description="Experience personalized health education at your doorstep"
              imageSrc="/lovable-uploads/in-person.jpeg"
              details="Experience personalized health education at your doorstep. We use interactive demonstrations, models, and real-time explanations to help you fully understand your health condition."
            />
            
            <ServiceCard
              title="Virtual Consultation"
              price="NPR 500"
              description="Connect with us from anywhere"
              imageSrc="/lovable-uploads/virtual.jpeg"
              details="Connect with us virtually for comprehensive health guidance. Get detailed explanations and visual aids to understand your condition better, all from the comfort of your home."
            />
          </div>
        </motion.div>
        
        {/* Future Innovations Section */}
        <motion.div 
          id="innovations" 
          className="py-24 relative z-10"
          style={{ opacity: innovationSectionOpacity, y: innovationSectionY }}
        >
          <ScrollReveal delay={0.4} direction="up" distance={80}>
            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="p-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-semibold text-center mb-8">Future Innovations</h2>
                <div className="max-w-5xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-1/3">
                      <motion.img 
                        src="/lovable-uploads/airpurifier.jpeg" 
                        alt="Smart Air Purifier" 
                        className="rounded-xl shadow-md object-cover w-full h-64"
                        whileHover={{ scale: 1.05, rotate: -1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                      <h3 className="text-2xl font-medium text-gray-900">Smart Air Purifier</h3>
                      <p className="text-gray-600">
                        Our upcoming smart air purifier features advanced HEPA filtration technology, designed specifically for Kathmandu's challenging air quality. Be the first to know when it launches!
                      </p>
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                        <p className="font-medium text-primary">NPR 14,000 (Early-bird price)</p>
                      </div>
                      
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                        <h4 className="text-lg font-medium mb-4">Pre-register Now</h4>
                        <PreRegisterForm productName="Smart Air Purifier" price="NPR 14,000" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </motion.div>
        
        {/* Contact Section */}
        <div id="contact" className="py-16 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
            <div className="flex flex-col items-center justify-center space-y-4">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-700">Kathmandu, Nepal</span>
              </motion.div>
              <motion.a 
                href="mailto:Shashankneupane5107@gmail.com"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Mail className="h-5 w-5 text-primary" />
                <span>Shashankneupane5107@gmail.com</span>
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Index;
