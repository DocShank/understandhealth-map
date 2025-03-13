
import { motion, useTransform } from "framer-motion";
import { ScrollProgress } from "@/types/animation";

interface HeroSectionProps {
  scrollProgress: ScrollProgress;
}

const HeroSection = ({ scrollProgress }: HeroSectionProps) => {
  const { scrollY } = scrollProgress;
  
  // Advanced parallax effects with 3D depth
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleY = useTransform(scrollY, [0, 300], [0, -100]);
  const titleZ = useTransform(scrollY, [0, 300], [0, -100]);
  
  return (
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
  );
};

export default HeroSection;
